from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import unicodedata
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any, Dict, Iterable, List, Tuple

import requests


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "assets" / "research-analytics.json"
SCHOLAR_INPUT_PATH = ROOT / "assets" / "research-analytics-scholar.json"
OPENALEX_AUTHOR_ID = "A5079348611"
OPENALEX_AUTHOR_URL = f"https://api.openalex.org/authors/{OPENALEX_AUTHOR_ID}"
SCHOLAR_PROFILE_URL = "https://scholar.google.com/citations?user=b-epW38AAAAJ&hl=en&oi=ao"


def clean_text(value: str | None) -> str:
    return " ".join((value or "").split()).strip()


def normalize_match_text(value: str | None) -> str:
    normalized = unicodedata.normalize("NFKD", clean_text(value))
    without_marks = "".join(char for char in normalized if not unicodedata.combining(char))
    lowered = without_marks.lower().replace("&", " and ")
    return "".join(char for char in lowered if char.isalnum())


def openalex_get(session: requests.Session, url: str, **params: Any) -> Dict[str, Any]:
    response = session.get(url, params=params, timeout=60)
    response.raise_for_status()
    return response.json()


def fetch_author(session: requests.Session, author_id: str) -> Dict[str, Any]:
    return openalex_get(session, f"https://api.openalex.org/authors/{author_id}")


def fetch_works(session: requests.Session, author_id: str) -> List[Dict[str, Any]]:
    results: List[Dict[str, Any]] = []
    page = 1
    per_page = 200

    while True:
        payload = openalex_get(
            session,
            "https://api.openalex.org/works",
            filter=f"author.id:https://openalex.org/{author_id}",
            sort="publication_year:desc",
            page=page,
            **{"per-page": per_page},
        )
        batch = payload.get("results", [])
        results.extend(batch)

        if len(batch) < per_page:
            break
        page += 1

    return results


def load_json(path: Path) -> Dict[str, Any] | None:
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def safe_int(value: Any) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


def slugify(value: str) -> str:
    return (
        value.lower()
        .replace("&", "and")
        .replace("/", "-")
        .replace(":", "")
        .replace(",", "")
        .replace(".", "")
        .replace("(", "")
        .replace(")", "")
        .replace(" ", "-")
    )


def classify_source_type(work: Dict[str, Any]) -> str:
    source = (((work.get("primary_location") or {}).get("source")) or {})
    source_type = clean_text(source.get("type"))
    raw_type = clean_text((work.get("primary_location") or {}).get("raw_type"))
    work_type = clean_text(work.get("type"))
    token = (source_type or raw_type or work_type).lower()

    mapping = {
        "journal": "Journal",
        "conference": "Conference",
        "book": "Book",
        "book-chapter": "Book Chapter",
        "book_series": "Book Series",
        "book-series": "Book Series",
        "repository": "Repository",
        "dissertation": "Dissertation",
        "peer-review": "Peer Review",
        "article": "Article",
    }

    if token in mapping:
        return mapping[token]

    if "conference" in token:
        return "Conference"
    if "journal" in token:
        return "Journal"
    if "book" in token and "chapter" in token:
        return "Book Chapter"
    if "book" in token:
        return "Book"

    return "Other"


def get_source_name(work: Dict[str, Any]) -> str:
    primary = work.get("primary_location") or {}
    source = primary.get("source") or {}
    return (
        clean_text(source.get("display_name"))
        or clean_text(primary.get("raw_source_name"))
        or clean_text(work.get("host_venue"))
        or classify_source_type(work)
    )


def get_work_url(work: Dict[str, Any]) -> str:
    best = work.get("best_oa_location") or {}
    primary = work.get("primary_location") or {}
    return (
        clean_text(best.get("landing_page_url"))
        or clean_text(primary.get("landing_page_url"))
        or clean_text(((work.get("ids") or {}).get("doi")))
    )


def compute_citations_per_year(citations: int, publication_year: int | None, current_year: int) -> float:
    if not publication_year:
        return float(citations)
    age = max(1, current_year - publication_year + 1)
    return round(citations / age, 2)


def build_annual_series(author: Dict[str, Any]) -> List[Dict[str, int]]:
    counts = {item["year"]: item for item in author.get("counts_by_year", [])}
    if not counts:
        return []

    years = range(min(counts), max(counts) + 1)
    return [
        {
            "year": year,
            "citations": safe_int(counts.get(year, {}).get("cited_by_count")),
            "works": safe_int(counts.get(year, {}).get("works_count")),
            "oaWorks": safe_int(counts.get(year, {}).get("oa_works_count")),
        }
        for year in years
    ]


def trailing_window(values_by_year: Dict[int, int], end_year: int, years: int) -> int:
    return sum(values_by_year.get(year, 0) for year in range(end_year - years + 1, end_year + 1))


def growth_rate(previous: int, current: int) -> float | None:
    if previous <= 0:
        return None
    return round(((current - previous) / previous) * 100, 1)


def take_top(items: Iterable[Tuple[str, int]], limit: int) -> List[Tuple[str, int]]:
    return sorted(items, key=lambda item: (-item[1], item[0]))[:limit]


def build_work_records(works: List[Dict[str, Any]], current_year: int) -> List[Dict[str, Any]]:
    records: List[Dict[str, Any]] = []

    for work in works:
        year = work.get("publication_year")
        citations = safe_int(work.get("cited_by_count"))
        open_access = work.get("open_access") or {}
        source_name = get_source_name(work)
        source_type = classify_source_type(work)

        records.append(
            {
                "id": work.get("id"),
                "title": clean_text(work.get("display_name")),
                "year": year,
                "citations": citations,
                "citationsPerYear": compute_citations_per_year(citations, year, current_year),
                "source": source_name,
                "sourceType": source_type,
                "url": get_work_url(work),
                "isOpenAccess": bool(open_access.get("is_oa")),
                "oaStatus": clean_text(open_access.get("oa_status")) or "closed",
                "hasFulltext": bool(open_access.get("any_repository_has_fulltext")),
                "citationSource": "OpenAlex",
            }
        )

    return records


def build_top_works(work_records: List[Dict[str, Any]], limit: int = 10) -> List[Dict[str, Any]]:
    return sorted(
        work_records,
        key=lambda item: (-item["citations"], -safe_int(item.get("year")), item["title"]),
    )[:limit]


def build_source_distribution(work_records: List[Dict[str, Any]], limit: int = 10) -> Dict[str, Any]:
    source_rollup: Dict[str, Dict[str, Any]] = defaultdict(lambda: {"count": 0, "citations": 0, "type": "Other"})
    type_counter: Counter[str] = Counter()

    for work in work_records:
        entry = source_rollup[work["source"]]
        entry["count"] += 1
        entry["citations"] += work["citations"]
        entry["type"] = work["sourceType"]
        type_counter[work["sourceType"]] += 1

    top_sources = [
        {"name": name, **payload}
        for name, payload in sorted(
            source_rollup.items(),
            key=lambda item: (-item[1]["count"], -item[1]["citations"], item[0]),
        )[:limit]
    ]

    return {
        "topSources": top_sources,
        "typeBreakdown": [
            {"type": source_type, "count": count}
            for source_type, count in type_counter.most_common()
        ],
    }


def build_open_access_summary(work_records: List[Dict[str, Any]]) -> Dict[str, Any]:
    total = len(work_records)
    oa_count = sum(1 for work in work_records if work["isOpenAccess"])
    fulltext_count = sum(1 for work in work_records if work["hasFulltext"])
    status_counts = Counter(work["oaStatus"] for work in work_records)

    return {
        "totalWorks": total,
        "openAccessWorks": oa_count,
        "closedWorks": total - oa_count,
        "openAccessRate": round((oa_count / total) * 100, 1) if total else 0.0,
        "repositoryFulltextWorks": fulltext_count,
        "statusBreakdown": [
            {"status": status, "count": count}
            for status, count in status_counts.most_common()
        ],
    }


def build_coauthor_network(works: List[Dict[str, Any]], self_author_id: str, limit: int = 22) -> Dict[str, Any]:
    collaborator_stats: Dict[str, Dict[str, Any]] = defaultdict(
        lambda: {"works": 0, "citations": 0, "institution": "", "orcid": "", "authorId": ""}
    )
    pair_counts: Counter[Tuple[str, str]] = Counter()

    for work in works:
        citations = safe_int(work.get("cited_by_count"))
        participants = []

        for authorship in work.get("authorships", []):
            author = authorship.get("author") or {}
            author_id = clean_text(author.get("id"))
            if author_id == f"https://openalex.org/{self_author_id}":
                participants.append("__self__")
                continue

            name = clean_text(author.get("display_name"))
            if not name:
                continue

            participants.append(name)
            collaborator_stats[name]["works"] += 1
            collaborator_stats[name]["citations"] += citations
            collaborator_stats[name]["orcid"] = collaborator_stats[name]["orcid"] or clean_text(author.get("orcid"))
            collaborator_stats[name]["authorId"] = collaborator_stats[name]["authorId"] or author_id

            institutions = authorship.get("institutions") or []
            if institutions and not collaborator_stats[name]["institution"]:
                collaborator_stats[name]["institution"] = clean_text(institutions[0].get("display_name"))

        unique_participants = list(dict.fromkeys(participants))
        for index, source in enumerate(unique_participants):
            for target in unique_participants[index + 1 :]:
                pair_counts[tuple(sorted((source, target)))] += 1

    top_names = {
        name
        for name, _ in take_top(
            ((name, stats["works"]) for name, stats in collaborator_stats.items()),
            limit,
        )
    }

    nodes = [
        {
            "id": "__self__",
            "label": "Jewoong Moon",
            "group": "self",
            "works": len(works),
            "citations": sum(safe_int(work.get("cited_by_count")) for work in works),
            "institution": "The University of Alabama",
        }
    ]

    for name in sorted(top_names):
        stats = collaborator_stats[name]
        nodes.append(
            {
                "id": name,
                "label": name,
                "group": "coauthor",
                "works": stats["works"],
                "citations": stats["citations"],
                "institution": stats["institution"],
                "orcid": stats["orcid"],
                "authorId": stats["authorId"],
            }
        )

    node_ids = {node["id"] for node in nodes}
    links = [
        {"source": source, "target": target, "weight": weight}
        for (source, target), weight in pair_counts.items()
        if source in node_ids and target in node_ids
    ]

    links.sort(key=lambda item: (-item["weight"], item["source"], item["target"]))

    return {"nodes": nodes, "links": links}


def build_topic_cluster(author: Dict[str, Any], works: List[Dict[str, Any]], limit: int = 20) -> List[Dict[str, Any]]:
    topic_weights: Dict[str, Dict[str, Any]] = defaultdict(lambda: {"count": 0, "weight": 0.0, "type": "keyword"})

    for topic in author.get("topics", [])[:10]:
        name = clean_text(topic.get("display_name"))
        if not name:
            continue
        topic_weights[name]["count"] += safe_int(topic.get("count"))
        topic_weights[name]["weight"] += float(topic.get("count") or 0)
        topic_weights[name]["type"] = "topic"

    for topic in author.get("topic_share", [])[:10]:
        name = clean_text(topic.get("display_name"))
        if not name:
            continue
        topic_weights[name]["count"] += 1
        topic_weights[name]["weight"] += float(topic.get("value") or 0) * 10000
        topic_weights[name]["type"] = "topic"

    for work in works:
        for topic in work.get("topics", [])[:3]:
            name = clean_text(topic.get("display_name"))
            if not name:
                continue
            topic_weights[name]["count"] += 1
            topic_weights[name]["weight"] += float(topic.get("score") or 0)
            topic_weights[name]["type"] = "topic"

        for keyword in work.get("keywords", [])[:8]:
            name = clean_text(keyword.get("display_name"))
            if not name:
                continue
            topic_weights[name]["count"] += 1
            topic_weights[name]["weight"] += float(keyword.get("score") or 0)
            if topic_weights[name]["type"] != "topic":
                topic_weights[name]["type"] = "keyword"

    items = [
        {
            "id": slugify(name),
            "label": name,
            "count": payload["count"],
            "weight": round(payload["weight"], 3),
            "type": payload["type"],
        }
        for name, payload in topic_weights.items()
    ]

    return sorted(items, key=lambda item: (-item["count"], -item["weight"], item["label"]))[:limit]


def build_growth_metrics(
    author: Dict[str, Any],
    work_records: List[Dict[str, Any]],
    annual_series: List[Dict[str, int]],
    scholar_payload: Dict[str, Any] | None = None,
) -> Dict[str, Any]:
    scholar_summary = (scholar_payload or {}).get("summary") or {}
    total_works = len(work_records) or safe_int(author.get("works_count"))
    total_citations = safe_int(scholar_summary.get("totalCitations")) or safe_int(author.get("cited_by_count"))
    current_year = max((item["year"] for item in annual_series), default=dt.date.today().year)
    yearly_citations = {item["year"]: item["citations"] for item in annual_series}

    recent3 = trailing_window(yearly_citations, current_year, 3)
    previous3 = trailing_window(yearly_citations, current_year - 3, 3)
    recent5 = trailing_window(yearly_citations, current_year, 5)
    previous5 = trailing_window(yearly_citations, current_year - 5, 5)

    citations_per_work = round(total_citations / total_works, 2) if total_works else 0.0
    normalized_values = [work["citationsPerYear"] for work in work_records if work.get("year")]
    mean_citations_per_year = round(sum(normalized_values) / len(normalized_values), 2) if normalized_values else 0.0

    return {
        "totalCitations": total_citations,
        "worksCount": total_works,
        "hIndex": safe_int(scholar_summary.get("hIndex")) or safe_int((author.get("summary_stats") or {}).get("h_index")),
        "i10Index": safe_int(scholar_summary.get("i10Index")) or safe_int((author.get("summary_stats") or {}).get("i10_index")),
        "twoYearMeanCitedness": round(float((author.get("summary_stats") or {}).get("2yr_mean_citedness") or 0), 2),
        "citationsPerWork": citations_per_work,
        "meanCitationsPerWorkYear": mean_citations_per_year,
        "recent3YearCitations": recent3,
        "previous3YearCitations": previous3,
        "recent5YearCitations": recent5,
        "previous5YearCitations": previous5,
        "threeYearGrowthRate": growth_rate(previous3, recent3),
        "fiveYearGrowthRate": growth_rate(previous5, recent5),
        "latestCitationYear": current_year,
        "sinceLabel": clean_text(scholar_summary.get("sinceLabel")),
        "sinceYearCitations": safe_int(scholar_summary.get("sinceYearCitations")),
        "sinceYearHIndex": safe_int(scholar_summary.get("sinceYearHIndex")),
        "sinceYearI10Index": safe_int(scholar_summary.get("sinceYearI10Index")),
    }


def scholar_similarity_score(left: str, right: str) -> float:
    return SequenceMatcher(None, normalize_match_text(left), normalize_match_text(right)).ratio()


def find_best_openalex_match(
    scholar_work: Dict[str, Any],
    openalex_records: List[Dict[str, Any]],
    used_ids: set[str],
) -> Dict[str, Any] | None:
    title = clean_text(scholar_work.get("title"))
    year = safe_int(scholar_work.get("year"))
    normalized_title = normalize_match_text(title)

    exact_candidates = [
        record
        for record in openalex_records
        if record.get("_normalizedTitle") == normalized_title
        and safe_int(record.get("year")) == year
        and clean_text(record.get("id")) not in used_ids
    ]
    if exact_candidates:
        return exact_candidates[0]

    title_candidates = [
        record
        for record in openalex_records
        if record.get("_normalizedTitle") == normalized_title and clean_text(record.get("id")) not in used_ids
    ]
    if len(title_candidates) == 1:
        return title_candidates[0]

    year_candidates = [
        record
        for record in openalex_records
        if safe_int(record.get("year")) == year and clean_text(record.get("id")) not in used_ids
    ]
    if not year_candidates:
        year_candidates = [record for record in openalex_records if clean_text(record.get("id")) not in used_ids]

    best_match: Dict[str, Any] | None = None
    best_score = 0.0

    for candidate in year_candidates:
        score = scholar_similarity_score(title, clean_text(candidate.get("title")))
        if score > best_score:
            best_match = candidate
            best_score = score

    if best_match and best_score >= 0.93:
        return best_match

    return None


def build_citation_work_records(
    openalex_work_records: List[Dict[str, Any]],
    scholar_payload: Dict[str, Any] | None,
    current_year: int,
) -> List[Dict[str, Any]]:
    if not scholar_payload:
        return openalex_work_records

    prepared_openalex_records = [dict(record) for record in openalex_work_records]
    for record in prepared_openalex_records:
        record["_normalizedTitle"] = normalize_match_text(record.get("title"))

    scholar_works = [dict(work) for work in (scholar_payload.get("works") or [])]
    used_ids: set[str] = set()
    merged_records: List[Dict[str, Any]] = []

    for scholar_work in scholar_works:
        openalex_match = find_best_openalex_match(scholar_work, prepared_openalex_records, used_ids)
        if openalex_match:
            used_ids.add(clean_text(openalex_match.get("id")))

        year = safe_int(scholar_work.get("year")) or None
        citations = safe_int(scholar_work.get("citations"))
        source_name = clean_text((openalex_match or {}).get("source")) or clean_text(scholar_work.get("venue")) or "Google Scholar record"
        source_type = clean_text((openalex_match or {}).get("sourceType")) or "Other"
        url = clean_text((openalex_match or {}).get("url")) or clean_text(scholar_work.get("recordUrl")) or clean_text(
            scholar_work.get("citedByUrl")
        )

        merged_records.append(
            {
                "id": (openalex_match or {}).get("id") or scholar_work.get("id"),
                "title": clean_text(scholar_work.get("title")),
                "year": year,
                "citations": citations,
                "citationsPerYear": compute_citations_per_year(citations, year, current_year),
                "source": source_name,
                "sourceType": source_type,
                "url": url,
                "isOpenAccess": bool((openalex_match or {}).get("isOpenAccess")),
                "oaStatus": clean_text((openalex_match or {}).get("oaStatus")) or "unknown",
                "hasFulltext": bool((openalex_match or {}).get("hasFulltext")),
                "citationSource": "Google Scholar",
                "authors": clean_text(scholar_work.get("authors")),
                "scholarRecordUrl": clean_text(scholar_work.get("recordUrl")),
                "scholarCitedByUrl": clean_text(scholar_work.get("citedByUrl")),
            }
        )

    return sorted(
        merged_records,
        key=lambda item: (-item["citations"], -safe_int(item.get("year")), item["title"]),
    )


def build_payload(author: Dict[str, Any], works: List[Dict[str, Any]], scholar_payload: Dict[str, Any] | None) -> Dict[str, Any]:
    current_year = dt.date.today().year
    openalex_annual_series = build_annual_series(author)
    annual_series = [
        {"year": safe_int(item.get("year")), "citations": safe_int(item.get("citations")), "works": 0, "oaWorks": 0}
        for item in (scholar_payload or {}).get("annualCitations", [])
        if safe_int(item.get("year"))
    ] or openalex_annual_series
    openalex_work_records = build_work_records(works, current_year)
    citation_work_records = build_citation_work_records(openalex_work_records, scholar_payload, current_year)
    growth = build_growth_metrics(author, citation_work_records, annual_series, scholar_payload)
    source_distribution = build_source_distribution(openalex_work_records)
    open_access = build_open_access_summary(openalex_work_records)
    generated_at = dt.datetime.now(dt.timezone.utc).isoformat()

    return {
        "generatedAt": generated_at,
        "source": {
            "provider": "Google Scholar + OpenAlex" if scholar_payload else "OpenAlex",
            "authorId": author.get("id"),
            "authorProfileUrl": OPENALEX_AUTHOR_URL,
            "scholarProfileUrl": SCHOLAR_PROFILE_URL,
            "summaryProvider": "Google Scholar" if scholar_payload else "OpenAlex",
            "annualTrendProvider": "Google Scholar" if scholar_payload else "OpenAlex",
            "worksProvider": "Google Scholar merged with OpenAlex metadata" if scholar_payload else "OpenAlex",
            "venueProvider": "OpenAlex",
            "networkProvider": "OpenAlex",
            "topicProvider": "OpenAlex",
            "openAccessProvider": "OpenAlex",
            "openalexGeneratedAt": generated_at,
            "scholarGeneratedAt": clean_text((scholar_payload or {}).get("generatedAt")),
        },
        "author": {
            "name": clean_text((scholar_payload or {}).get("author", {}).get("name") or author.get("display_name")),
            "orcid": clean_text(author.get("orcid")),
            "institution": clean_text(
                (scholar_payload or {}).get("author", {}).get("affiliation")
                or (author.get("last_known_institutions") or [{}])[0].get("display_name")
            ),
            "homepage": clean_text((scholar_payload or {}).get("author", {}).get("homepage")),
            "interests": (scholar_payload or {}).get("author", {}).get("interests") or [],
        },
        "scholar": {
            "available": bool(scholar_payload),
            "profileUrl": SCHOLAR_PROFILE_URL,
            "worksCount": safe_int((scholar_payload or {}).get("worksCount")),
            "summary": (scholar_payload or {}).get("summary") or {},
            "publicAccess": (scholar_payload or {}).get("publicAccess") or {},
        },
        "summary": growth,
        "annualCitations": annual_series,
        "openAccess": open_access,
        "topCitedWorks": build_top_works(citation_work_records, limit=10),
        "works": citation_work_records,
        "sourceDistribution": source_distribution,
        "coauthorNetwork": build_coauthor_network(works, OPENALEX_AUTHOR_ID),
        "topicCluster": build_topic_cluster(author, works),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Refresh researcher analytics data from OpenAlex and Scholar.")
    parser.add_argument("--output", type=Path, default=OUTPUT_PATH)
    parser.add_argument("--scholar-input", type=Path, default=SCHOLAR_INPUT_PATH)
    args = parser.parse_args()

    session = requests.Session()
    session.headers.update({"User-Agent": "jmoon-github-cv/1.0"})

    author = fetch_author(session, OPENALEX_AUTHOR_ID)
    works = fetch_works(session, OPENALEX_AUTHOR_ID)
    scholar_payload = load_json(args.scholar_input)
    payload = build_payload(author, works, scholar_payload)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"Wrote {args.output}")
    print(f"Author: {payload['author']['name']}")
    print(f"Works analyzed: {len(payload['works'])}")
    print(f"Citation summary source: {payload['source']['summaryProvider']}")


if __name__ == "__main__":
    main()
