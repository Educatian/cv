from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Dict, List, Optional
from urllib.parse import urljoin

import requests
from docx import Document
from lxml import html


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CV_PATH = ROOT / "CV_202605_MOON.docx"
FALLBACK_CV_PATH = ROOT / "assets" / "current-cv.docx"
LEGACY_CV_PATH = ROOT / "assets" / "CV_202604_MOON.docx"
DEFAULT_OUTPUT_PATH = ROOT / "assets" / "publication-abstracts.json"
OVERRIDES_PATH = ROOT / "assets" / "publication-abstract-overrides.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0 Safari/537.36"
    )
}

DOI_PATTERN = re.compile(r"10\.\d{4,9}/[-._;()/:A-Z0-9]+", re.I)
RECORD_START = re.compile(r"^\[\d+\]\s*")
META_PATTERNS = [
    ("name", "citation_abstract"),
    ("name", "dc.Description"),
    ("name", "dc.description"),
    ("name", "description"),
    ("property", "og:description"),
    ("name", "twitter:description"),
]
IMAGE_META_PATTERNS = [
    ("property", "og:image"),
    ("property", "og:image:secure_url"),
    ("name", "twitter:image"),
    ("name", "twitter:image:src"),
    ("name", "citation_cover_image_url"),
    ("name", "citation_image"),
]


def clean_text(value: str) -> str:
    return " ".join(value.replace("\u200b", "").split()).strip()


def choose_cv_path(explicit_path: Optional[Path]) -> Path:
    if explicit_path:
        return explicit_path.resolve()

    if DEFAULT_CV_PATH.exists():
        return DEFAULT_CV_PATH
    if FALLBACK_CV_PATH.exists():
        return FALLBACK_CV_PATH
    return LEGACY_CV_PATH


def parse_cv_entries(cv_path: Path) -> List[Dict[str, str]]:
    doc = Document(str(cv_path))
    paragraphs = [clean_text(p.text) for p in doc.paragraphs if p.text.strip()]

    start = next(
        index for index, text in enumerate(paragraphs) if text.startswith("SELECTED JOURNAL ARTICLES")
    )
    end = next(index for index, text in enumerate(paragraphs) if text.startswith("EDITORIAL BOOK"))

    entries: List[str] = []
    current: List[str] = []
    category = "International"

    for text in paragraphs[start + 1 : end]:
        if text.startswith("International and Peer-reviewed"):
            category = "International"
            continue
        if text.startswith("Korean-written and Peer-reviewed"):
            category = "Korean"
            continue
        if text.startswith("Note "):
            continue

        if RECORD_START.match(text):
            if current:
                entries.append((category, " ".join(current)))
            current = [RECORD_START.sub("", text)]
        elif current:
            current.append(text)

    if current:
        entries.append((category, " ".join(current)))

    parsed = []
    for category, citation in entries:
        doi_match = DOI_PATTERN.search(citation)
        doi = doi_match.group(0).rstrip(").,;]") if doi_match else ""
        parsed.append(
            {
                "category": category,
                "citation": citation,
                "doi": doi,
            }
        )

    return parsed


def decode_abstract_inverted_index(inverted_index: Optional[Dict[str, List[int]]]) -> str:
    if not inverted_index:
        return ""

    words: List[str] = []
    for word, positions in inverted_index.items():
        for position in positions:
            while len(words) <= position:
                words.append("")
            words[position] = word

    return re.sub(r"\s+([,.;:?!])", r"\1", " ".join(filter(None, words))).strip()


def strip_markup(value: str) -> str:
    return (
        value.replace("&nbsp;", " ")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&amp;", "&")
    )


def extract_title(citation: str) -> str:
    year_match = re.search(r"\([^)]*\d{4}\)\.\s*", citation)
    if not year_match:
        return citation[:120]

    after_year = citation[year_match.end() :]
    title_end = after_year.find(". ")
    return after_year[:title_end].strip() if title_end != -1 else after_year[:120].strip()


def fetch_openalex_abstract(session: requests.Session, doi: str) -> str:
    url = "https://api.openalex.org/works"
    response = session.get(url, params={"filter": f"doi:https://doi.org/{doi}"}, timeout=30)
    response.raise_for_status()
    data = response.json()
    if not data.get("results"):
      return ""
    return decode_abstract_inverted_index(data["results"][0].get("abstract_inverted_index"))


def fetch_crossref_abstract(session: requests.Session, doi: str) -> str:
    response = session.get(
        f"https://api.crossref.org/works/{requests.utils.quote(doi, safe='')}",
        timeout=30,
    )
    response.raise_for_status()
    data = response.json()
    abstract = data.get("message", {}).get("abstract", "")
    if not abstract:
        return ""
    return clean_text(re.sub(r"<[^>]+>", " ", strip_markup(abstract)))


def find_html_abstract(tree: html.HtmlElement) -> str:
    for attr, name in META_PATTERNS:
        nodes = tree.xpath(f"//meta[@{attr}='{name}']/@content")
        for node in nodes:
            text = clean_text(node)
            if len(text) > 120 and "copyright" not in text.lower():
                return text

    for expr in [
        "//*[contains(translate(@class,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'abstract')]",
        "//*[contains(translate(@id,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'abstract')]",
    ]:
        candidates = []
        for node in tree.xpath(expr):
            text = clean_text(node.text_content())
            if 150 <= len(text) <= 6000:
                candidates.append(text)
        if candidates:
            return max(set(candidates), key=len)

    return ""


def normalize_image_url(base_url: str, value: str) -> str:
    image_url = clean_text(value)
    if not image_url or image_url.startswith("data:"):
        return ""
    return urljoin(base_url, image_url)


def candidate_score(image_url: str) -> int:
    lowered = image_url.lower()
    score = 0
    if any(fragment in lowered for fragment in ["cover", "journal", "issue", "article", "mediaobjects", "els-cdn", "static-content"]):
        score += 4
    if any(fragment in lowered for fragment in ["logo", "icon", "favicon", "apple-touch", "placeholder", "spinner"]):
        score -= 6
    if re.search(r"\.(?:jpe?g|png|webp)(?:[?#].*)?$", lowered):
        score += 2
    if lowered.endswith(".svg") or ".svg?" in lowered:
        score -= 2
    return score


def best_image_candidate(candidates: List[str]) -> str:
    unique = []
    seen = set()
    for candidate in candidates:
        if candidate and candidate not in seen:
            unique.append(candidate)
            seen.add(candidate)
    if not unique:
        return ""
    return max(unique, key=candidate_score)


def find_html_image(tree: html.HtmlElement, base_url: str) -> str:
    candidates: List[str] = []

    for attr, name in IMAGE_META_PATTERNS:
        for node in tree.xpath(f"//meta[@{attr}='{name}']/@content"):
            candidates.append(normalize_image_url(base_url, node))

    for node in tree.xpath("//link[translate(@rel,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='image_src']/@href"):
        candidates.append(normalize_image_url(base_url, node))

    for script_text in tree.xpath("//script[@type='application/ld+json']/text()"):
        try:
            payload = json.loads(script_text)
        except Exception:
            continue

        def visit(value: object) -> None:
            if isinstance(value, dict):
                image = value.get("image")
                if isinstance(image, str):
                    candidates.append(normalize_image_url(base_url, image))
                elif isinstance(image, list):
                    for item in image:
                        visit({"image": item})
                elif isinstance(image, dict):
                    content_url = image.get("contentUrl") or image.get("url")
                    if isinstance(content_url, str):
                        candidates.append(normalize_image_url(base_url, content_url))
                for child in value.values():
                    visit(child)
            elif isinstance(value, list):
                for item in value:
                    visit(item)

        visit(payload)

    return best_image_candidate(candidates)


def fetch_landing_page_metadata(session: requests.Session, doi: str) -> Dict[str, str]:
    response = session.get(f"https://doi.org/{doi}", headers=HEADERS, timeout=30, allow_redirects=True)
    response.raise_for_status()
    if "text/html" not in response.headers.get("content-type", ""):
        return {"resolvedUrl": response.url}

    tree = html.fromstring(response.text)
    metadata = {
        "resolvedUrl": response.url,
        "thumbnailUrl": find_html_image(tree, response.url),
    }
    abstract = find_html_abstract(tree)
    if abstract:
        metadata["abstract"] = abstract
        return metadata

    sciencedirect_match = re.search(r"sciencedirect\.com/science/article/pii/([^?/#]+)", response.url, re.I)
    if sciencedirect_match and "/article/abs/pii/" not in response.url:
        abs_url = f"https://www.sciencedirect.com/science/article/abs/pii/{sciencedirect_match.group(1)}"
        abs_response = session.get(abs_url, headers=HEADERS, timeout=30, allow_redirects=True)
        abs_response.raise_for_status()
        if "text/html" in abs_response.headers.get("content-type", ""):
            abs_tree = html.fromstring(abs_response.text)
            metadata["resolvedUrl"] = abs_response.url
            metadata["thumbnailUrl"] = find_html_image(abs_tree, abs_response.url) or metadata["thumbnailUrl"]
            metadata["abstract"] = find_html_abstract(abs_tree)
            return metadata

    return metadata


def fetch_landing_page_abstract(session: requests.Session, doi: str) -> str:
    return fetch_landing_page_metadata(session, doi).get("abstract", "")


def build_library(cv_path: Path) -> Dict[str, Dict[str, str]]:
    session = requests.Session()
    session.headers.update(HEADERS)

    entries = parse_cv_entries(cv_path)
    library: Dict[str, Dict[str, str]] = {}

    for entry in entries:
        doi = entry["doi"]
        if not doi:
            continue

        abstract = ""
        source = ""
        landing_metadata: Dict[str, str] = {}

        for label, fetcher in [
            ("openalex", fetch_openalex_abstract),
            ("crossref", fetch_crossref_abstract),
            ("landing_page", fetch_landing_page_abstract),
        ]:
            try:
                abstract = fetcher(session, doi)
            except Exception:
                abstract = ""
            if abstract:
                source = label
                break

        try:
            landing_metadata = fetch_landing_page_metadata(session, doi)
        except Exception:
            landing_metadata = {}

        if not abstract and landing_metadata.get("abstract"):
            abstract = landing_metadata["abstract"]
            source = "landing_page"

        library[doi] = {
            "title": extract_title(entry["citation"]),
            "citation": entry["citation"],
            "abstract": abstract,
            "source": source or "unavailable",
            "category": entry["category"],
            **({"thumbnailUrl": landing_metadata["thumbnailUrl"]} if landing_metadata.get("thumbnailUrl") else {}),
            **({"thumbnailSource": "landing_page"} if landing_metadata.get("thumbnailUrl") else {}),
            **({"resolvedUrl": landing_metadata["resolvedUrl"]} if landing_metadata.get("resolvedUrl") else {}),
        }

    apply_abstract_overrides(library)
    return library


def apply_abstract_overrides(library: Dict[str, Dict[str, str]]) -> None:
    if not OVERRIDES_PATH.exists():
        return

    overrides = json.loads(OVERRIDES_PATH.read_text(encoding="utf-8"))
    for doi, override in overrides.items():
        if doi not in library:
            continue
        if not library[doi].get("abstract") and override.get("abstract"):
            library[doi] = {
                **library[doi],
                "abstract": clean_text(override["abstract"]),
                "source": override.get("source", "override"),
            }
        for key in ["resolvedUrl", "thumbnailUrl", "thumbnailSource"]:
            if override.get(key):
                library[doi][key] = override[key]


def main() -> None:
    parser = argparse.ArgumentParser(description="Build a DOI-indexed abstract library from the CV.")
    parser.add_argument("--cv", type=Path, help="Path to the source CV DOCX.")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH)
    args = parser.parse_args()

    cv_path = choose_cv_path(args.cv)
    if not cv_path.exists():
        raise FileNotFoundError(f"CV not found: {cv_path}")

    args.output.parent.mkdir(parents=True, exist_ok=True)
    library = build_library(cv_path)
    args.output.write_text(json.dumps(library, indent=2, ensure_ascii=False), encoding="utf-8")

    total = len(library)
    with_abstract = sum(1 for item in library.values() if item["abstract"])
    print(f"Wrote {args.output}")
    print(f"Abstracts found for {with_abstract}/{total} DOI-backed journal articles")


if __name__ == "__main__":
    main()
