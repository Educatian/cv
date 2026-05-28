from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from pathlib import Path
from typing import Dict, List, Optional, Sequence

from docx import Document


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CV_PATH = ROOT / "CV_202605_MOON.docx"
FALLBACK_CV_PATH = ROOT / "assets" / "current-cv.docx"
LEGACY_CV_PATH = ROOT / "assets" / "CV_202604_MOON.docx"
DEFAULT_JSON_PATH = ROOT / "assets" / "site-data.generated.json"
DEFAULT_JS_PATH = ROOT / "assets" / "site-data.js"

HEADERS = {
    "contact": "CONTACT INFORMATION",
    "expertise": "RESEARCH EXPERTISE",
    "education": "EDUCATION",
    "experience": "PROFESSIONAL EXPERIENCES",
    "affiliations": "PROFESSIONAL AFFILIATIONS",
    "teaching": "TEACHING & MENTORING",
    "advising": "STUDENT ADVISING",
    "grants": "CONTRACTS, GRANTS, AND FELLOWSHIP",
    "journal_articles": "SELECTED JOURNAL ARTICLES",
    "editorial_book": "EDITORIAL BOOK",
    "book_chapters": "SELECTED BOOK CHAPTERS",
    "conference_proceedings": "REFEREED CONFERENCE PROFEEDINGS",
    "presentations": "CONFERENCE PRESENTATIONS",
    "working_papers": "WORKING PAPERS",
    "service": "SERVICE ACTIVITIES",
    "honors": "HONOR AND AWARD",
    "certificates": "CERTIFICATES",
}

RECORD_START = re.compile(r"^\[\d+\]\s*")
DOI_PATTERN = re.compile(r"10\.\d{4,9}/[-._;()/:A-Z0-9]+", re.I)
URL_PATTERN = re.compile(r"https?://\S+", re.I)
COUNT_PATTERN = re.compile(r"\[n\s*=\s*(\d+)\]", re.I)
MONEY_PATTERN = re.compile(r"\$([\d,]+(?:\.\d+)?)")

INSTITUTION_META = {
    "The University of Alabama": {
        "logo": "assets/institution-logos/ua-capstone-a-crimson.svg",
        "logoAlt": "The University of Alabama logo",
        "logoTheme": "ua",
    },
    "Florida State University": {
        "logo": "assets/institution-logos/fsu-wordmark-gold.svg",
        "logoAlt": "Florida State University logo",
        "logoTheme": "fsu",
    },
    "Chonnam National University": {
        "logo": "assets/institution-logos/chonnam-national-university.png",
        "logoAlt": "Chonnam National University logo",
        "logoTheme": "cnu",
    },
}

AFFILIATION_META = {
    "American Educational Research Association (AERA)": {
        "acronym": "AERA",
        "name": "American Educational Research Association",
        "label": "Research Association",
        "logo": "assets/affiliation-logos/aera.png",
        "alt": "AERA logo",
        "url": "https://www.aera.net/",
        "theme": "sand",
    },
    "Association for Education Communications and Technology (AECT)": {
        "acronym": "AECT",
        "name": "Association for Education Communications and Technology",
        "label": "Professional Association",
        "logo": "assets/affiliation-logos/aect.png",
        "alt": "AECT logo",
        "url": "https://www.aect.org/",
        "theme": "sky",
    },
    "International Society of Learning Sciences (ISLS)": {
        "acronym": "ISLS",
        "name": "International Society of the Learning Sciences",
        "label": "Scholarly Society",
        "logo": "assets/affiliation-logos/isls.png",
        "alt": "ISLS logo",
        "url": "https://www.isls.org/",
        "theme": "sage",
    },
    "International Society of the Learning Sciences (ISLS)": {
        "acronym": "ISLS",
        "name": "International Society of the Learning Sciences",
        "label": "Scholarly Society",
        "logo": "assets/affiliation-logos/isls.png",
        "alt": "ISLS logo",
        "url": "https://www.isls.org/",
        "theme": "sage",
    },
    "Immersive Learning Research Network (ILRN)": {
        "acronym": "iLRN",
        "name": "Immersive Learning Research Network",
        "label": "Research Network",
        "logo": "assets/affiliation-logos/ilrn.png",
        "alt": "Immersive Learning Research Network logo",
        "url": "https://www.immersivelrn.org/",
        "theme": "night",
    },
    "Immersive Learning Research Network (iLRN)": {
        "acronym": "iLRN",
        "name": "Immersive Learning Research Network",
        "label": "Research Network",
        "logo": "assets/affiliation-logos/ilrn.png",
        "alt": "Immersive Learning Research Network logo",
        "url": "https://www.immersivelrn.org/",
        "theme": "night",
    },
}

PUBLICATION_TAG_RULES = [
    ("genai", ["generative ai", "large language model", "chatgpt", "gpt-4", "ai chatbot", "ai-enhanced", "ai literacy", "artificial intelligence"]),
    ("xr", ["virtual reality", "extended reality", "xr", "immersive", "metaverse"]),
    ("analytics", ["learning analytics", "analytics", "process mining", "machine learning", "data mining", "diagnostic", "multimodal"]),
    ("game-based", ["game", "gaming", "gamified", "gamification"]),
    ("teacher-ed", ["teacher", "preservice", "pre-service"]),
    ("higher-ed", ["higher education", "online learning"]),
    ("autism", ["autism", "autistic"]),
    ("stem", ["stem", "mathematics", "engineering", "science"]),
    ("review", ["systematic review", "narrative review", "review"]),
    ("ethics", ["ethical", "ethics"]),
]

TAG_LABELS = {
    "genai": "GenAI",
    "xr": "XR",
    "analytics": "Analytics",
    "game-based": "Game-Based",
    "teacher-ed": "Teacher Ed",
    "higher-ed": "Higher Ed",
    "autism": "Autism",
    "stem": "STEM",
    "review": "Review",
    "ethics": "Ethics",
}

SERVICE_THEME_BY_LABEL = {
    "Journal": "crimson",
    "Special Issue": "charcoal",
    "Society": "crimson",
    "Network": "charcoal",
    "SIG": "stone",
    "Conference": "crimson",
}

SPECIAL_SERVICE_BADGES = {
    "Behaviour & Information Technology": "BIT",
    "International Journal of Computer-Supported Collaborative Learning": "ijCSCL",
    "Artificial Intelligence in Language Education": "AILE",
    "Journal of Applied Instructional Design": "JAID",
    "Computers and Education: X Reality": "CEXR",
    "Computers & Education: X Reality": "CEXR",
    "The Mathematical Education": "MathEd",
    "APSCE SIG Educational Games and Gamification": "APSCE",
    "Immersive Learning Research Network": "iLRN",
    "Immersive Learning Research Network (iLRN)": "iLRN",
    "AERA SIG Instructional Technology": "AERA",
    "ICCE Educational Gamification and Game-based Learning Section": "ICCE",
    "iLRN Practitioner Stream": "iLRN",
}

FEATURED_EDITORIAL_TITLES = {
    "Behaviour & Information Technology",
    "International Journal of Computer-Supported Collaborative Learning",
    "Artificial Intelligence in Language Education",
    "Journal of Applied Instructional Design",
    "Computers and Education: X Reality",
    "Computers & Education: X Reality",
}

FEATURED_LEADERSHIP_ROLES = {
    ("Chair", "APSCE SIG Educational Games and Gamification"),
    ("Co-Chair", "Immersive Learning Research Network (iLRN)"),
    ("Communication Officer", "AERA SIG Instructional Technology"),
    ("Program Co-Chair", "ICCE Educational Gamification and Game-based Learning Section"),
    ("Program Co-Chair", "iLRN Practitioner Stream"),
}


def clean_text(value: str) -> str:
    return " ".join(value.replace("\u200b", "").replace("\xa0", " ").split()).strip()


def normalize_general_phrase(value: str) -> str:
    return re.sub(r"\blearning design\b", "learning experience design", value, flags=re.I)


def sentence_case(value: str) -> str:
    text = clean_text(value)
    return text[:1].upper() + text[1:] if text else text


def format_currency(value: Optional[float]) -> str:
    if value is None:
        return "pending"
    return f"${value:,.0f}"


def format_compact_currency(value: float) -> str:
    if value >= 1_000_000:
        return f"${value / 1_000_000:.1f}M+"
    if value >= 1_000:
        return f"${round(value / 1_000):.0f}K+"
    return f"${value:,.0f}"


def load_paragraphs(cv_path: Path) -> List[str]:
    doc = Document(str(cv_path))
    return [clean_text(paragraph.text) for paragraph in doc.paragraphs if paragraph.text.strip()]


def find_section_index(paragraphs: Sequence[str], heading: str) -> int:
    return next(index for index, text in enumerate(paragraphs) if text.startswith(heading))


def section_between(paragraphs: Sequence[str], start_heading: str, end_heading: str) -> List[str]:
    start = find_section_index(paragraphs, start_heading)
    end = find_section_index(paragraphs, end_heading)
    return list(paragraphs[start + 1 : end])


def split_numbered_entries(lines: Sequence[str]) -> List[str]:
    entries: List[str] = []
    current: List[str] = []

    for line in lines:
        if not line or line.startswith("Note "):
            continue

        parts = [part for part in re.split(r"(?=\[\d+\]\s*)", line) if part.strip()]
        for part in parts:
            text = clean_text(part)
            if RECORD_START.match(text):
                if current:
                    entries.append(" ".join(current))
                current = [RECORD_START.sub("", text)]
            elif current:
                current.append(text)

    if current:
        entries.append(" ".join(current))

    return [clean_text(entry) for entry in entries]


def extract_count(text: str) -> int:
    match = COUNT_PATTERN.search(text)
    return int(match.group(1)) if match else 0


def extract_first_money(text: str) -> Optional[float]:
    match = MONEY_PATTERN.search(text)
    return float(match.group(1).replace(",", "")) if match else None


def extract_last_money(text: str) -> Optional[float]:
    matches = MONEY_PATTERN.findall(text)
    return float(matches[-1].replace(",", "")) if matches else None


def extract_year(text: str) -> str:
    match = re.search(r"(19|20)\d{2}", text)
    return match.group(0) if match else ""


def extract_doi(text: str) -> str:
    match = DOI_PATTERN.search(text)
    return match.group(0).rstrip(").,;]") if match else ""


def extract_url(text: str) -> str:
    match = URL_PATTERN.search(text)
    return match.group(0).rstrip(").,;]") if match else ""


def parse_title_from_citation(citation: str) -> str:
    year_match = re.search(r"\([^)]*\d{4}[^)]*\)\.\s*", citation)
    if not year_match:
        return citation[:120]

    after_year = citation[year_match.end() :]
    title, _, _ = after_year.partition(". ")
    return clean_text(title)


def parse_authors_from_citation(citation: str) -> str:
    year_match = re.search(r"\([^)]*\d{4}[^)]*\)", citation)
    if not year_match:
        return clean_text(citation)
    authors = citation[: year_match.start()]
    return clean_text(authors.lstrip("*‡ "))


def parse_venue_from_citation(citation: str) -> str:
    year_match = re.search(r"\([^)]*\d{4}[^)]*\)\.\s*", citation)
    if not year_match:
        return ""

    after_year = citation[year_match.end() :]
    if ". " not in after_year:
        return ""

    _, _, venue_part = after_year.partition(". ")
    if not venue_part:
        return ""

    venue_part = re.split(r"https?://|10\.\d{4,9}/", venue_part, maxsplit=1)[0]
    venue_part = re.sub(r"\[[^\]]+\]", "", venue_part)
    venue_part = re.sub(r"[.,]\s*\d[\d()\-–,: ]*$", "", venue_part).strip(" .,;")
    return clean_text(venue_part)


def derive_publication_tags(title: str, venue: str, category: str) -> List[str]:
    haystack = f"{title} {venue}".lower()
    tags = [TAG_LABELS[key] for key, keywords in PUBLICATION_TAG_RULES if any(keyword in haystack for keyword in keywords)]
    if category == "Korean" and "Korean" not in tags:
        tags.append("Korean")
    if not tags:
        tags.append(category)
    return list(dict.fromkeys(tags))


def derive_publication_note(citation: str) -> str:
    if "‡" in citation:
        return "corresponding author"
    if "*" in citation:
        return "mentored collaboration"
    return ""


def parse_publication_status(citation: str) -> str:
    match = re.search(
        r"\((Accepted|In Press|Minor revision|Major revision|Revise and resubmit|Under review|Submitted),\s*(?:19|20)\d{2}\)",
        citation,
        re.I,
    )
    return sentence_case(match.group(1)) if match else ""


def abbreviate_name(name: str) -> str:
    if name in SPECIAL_SERVICE_BADGES:
        return SPECIAL_SERVICE_BADGES[name]

    parts = re.findall(r"[A-Za-z]+", name)
    if not parts:
        return "Role"
    if len(parts) == 1:
        return parts[0][:6]
    return "".join(part[0] for part in parts[:5]).upper()


def infer_initiative_name(title: str) -> str:
    if ":" in title:
        return clean_text(title.split(":", 1)[0])

    words = title.split()
    return clean_text(" ".join(words[:3]))


def parse_contact(paragraphs: Sequence[str]) -> Dict[str, str]:
    lines = section_between(paragraphs, HEADERS["contact"], HEADERS["expertise"])
    combined = " ".join(lines)
    pattern = re.compile(
        r"(E-mail address|Homepage|ResearchGate|Lab Website|University address):\s*",
        re.I,
    )

    key_map = {
        "e-mail address": "email",
        "homepage": "homepage",
        "researchgate": "researchgate",
        "lab website": "labWebsite",
        "university address": "universityAddress",
    }

    contact: Dict[str, str] = {}
    matches = list(pattern.finditer(combined))

    for index, match in enumerate(matches):
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(combined)
        key = key_map.get(match.group(1).lower())
        if key:
            contact[key] = clean_text(combined[start:end])

    return contact


def parse_focus_areas(paragraphs: Sequence[str]) -> List[str]:
    lines = section_between(paragraphs, HEADERS["expertise"], HEADERS["education"])
    text = normalize_general_phrase(" ".join(lines)).rstrip(".")
    return [clean_text(item) for item in text.split(",") if clean_text(item)]


def parse_appointments_education(paragraphs: Sequence[str]) -> List[Dict[str, str]]:
    education_lines = section_between(paragraphs, HEADERS["education"], HEADERS["experience"])
    experience_lines = section_between(paragraphs, HEADERS["experience"], HEADERS["affiliations"])

    items: List[Dict[str, str]] = []

    for line in experience_lines:
        match = re.match(
            r"(?P<year>\d{4})(?:\s+[A-Za-z]+)?\s+(?P<title>[^,]+),\s*(?P<area>[^,]+),\s*(?P<institution>[^,]+)",
            line,
        )
        if not match:
            continue

        institution = clean_text(match.group("institution"))
        institution_meta = INSTITUTION_META.get(institution, {})
        items.append(
            {
                "year": f"{match.group('year')}-present",
                "title": clean_text(match.group("title")),
                "detail": clean_text(f"{match.group('area')}, {institution}"),
                "institution": institution,
                **institution_meta,
            }
        )

    for index, line in enumerate(education_lines):
        degree_match = re.match(
            r"(?P<year>\d{4})\s+(?P<degree>Ph\.D\.|M\.A\.|B\.Ed\.),\s*(?P<institution>[^,]+)",
            line,
        )
        if not degree_match:
            continue

        institution = clean_text(degree_match.group("institution"))
        major_line = education_lines[index + 1] if index + 1 < len(education_lines) else ""
        major = clean_text(major_line.replace("Major:", "", 1)).rstrip(".")
        institution_meta = INSTITUTION_META.get(institution, {})
        degree = {
            "Ph.D.": "PhD",
            "M.A.": "MA",
            "B.Ed.": "BEd",
        }.get(degree_match.group("degree"), degree_match.group("degree"))

        items.append(
            {
                "year": degree_match.group("year"),
                "title": degree,
                "detail": clean_text(f"{major}, {institution}"),
                "institution": institution,
                **institution_meta,
            }
        )

    return items


def parse_affiliations(paragraphs: Sequence[str]) -> List[Dict[str, str]]:
    lines = section_between(paragraphs, HEADERS["affiliations"], HEADERS["teaching"])
    results = []
    for line in lines:
        meta = AFFILIATION_META.get(line)
        if not meta:
            continue
        results.append(meta)
    return results


def extract_course_titles(text: str) -> List[str]:
    matches = re.findall(r"([A-Z]{2,6}\s?\d{3,4}[A-Z]?\s+[^()]+?)\s*\(", text)
    cleaned = [clean_text(match).replace("  ", " ") for match in matches]
    return list(dict.fromkeys(cleaned))


def parse_teaching(paragraphs: Sequence[str]) -> Dict[str, object]:
    lines = section_between(paragraphs, HEADERS["teaching"], HEADERS["advising"])
    text = " ".join(lines)

    ua_chunk = text.split("Florida State University", 1)[0]
    fsu_chunk = text.split("Florida State University", 1)[1] if "Florida State University" in text else ""
    course_redesign_chunk = ua_chunk.split("Course Redesign", 1)[1] if "Course Redesign" in ua_chunk else ""
    course_redesign_chunk = course_redesign_chunk.split("Course Development", 1)[0]
    course_development_chunk = ua_chunk.split("Course Development", 1)[1] if "Course Development" in ua_chunk else ""

    recent_teaching_portfolio = extract_course_titles(ua_chunk.split("Course Redesign", 1)[0])
    redesigned_courses = extract_course_titles(course_redesign_chunk)
    developed_courses = extract_course_titles(course_development_chunk)
    fsu_courses = extract_course_titles(fsu_chunk)

    earlier_note = ""
    if fsu_courses:
        earlier_note = (
            "Earlier teaching at Florida State University included "
            + ", ".join(fsu_courses[:-1])
            + ("," if len(fsu_courses) > 2 else "")
            + (f" and {fsu_courses[-1]}" if len(fsu_courses) > 1 else fsu_courses[0])
            + "."
        )

    course_development = [f"Developed {item}" for item in developed_courses]
    if redesigned_courses:
        if len(redesigned_courses) == 1:
            course_development.append(f"Redesigned {redesigned_courses[0]}")
        else:
            redesign_label = ", ".join(redesigned_courses[:-1]) + f", and {redesigned_courses[-1]}"
            course_development.append(f"Redesigned {redesign_label}")

    return {
        "teachingPortfolio": recent_teaching_portfolio,
        "courseDevelopment": course_development,
        "earlierTeachingNote": earlier_note,
    }


def parse_mentoring_metrics(paragraphs: Sequence[str]) -> List[Dict[str, str]]:
    lines = section_between(paragraphs, HEADERS["advising"], HEADERS["grants"])
    text = " ".join(lines)

    dissertation_chunk = text.split("Course Advising", 1)[0]
    course_chunk = text.split("Course Advising", 1)[1].split("Research Projects", 1)[0]
    research_chunk = text.split("Research Projects", 1)[1] if "Research Projects" in text else ""

    chairs = len(re.findall(r"Doctoral Dissertation (?:Chair|Co-Chair)", dissertation_chunk))
    committees = len(re.findall(r"Doctoral Dissertation Committee(?: - External Member)?", dissertation_chunk))
    current_advisees = len(re.findall(r"20\d{2}\s*-\s*(?:Present|Current|\d{4})", course_chunk))
    research_mentees = len(re.findall(r"20\d{2}\s*-\s*(?:Present|Current|\d{4})", research_chunk))

    return [
        {"value": str(chairs), "label": "doctoral chairs or co-chairs"},
        {"value": str(committees), "label": "doctoral committee appointments"},
        {"value": str(current_advisees), "label": "current course advisees"},
        {"value": str(research_mentees), "label": "research mentees across projects"},
    ]


def parse_grants(paragraphs: Sequence[str]) -> Dict[str, object]:
    lines = section_between(paragraphs, HEADERS["grants"], HEADERS["journal_articles"])

    funded_header = next((line for line in lines if line.startswith("Funded")), "")
    pending_header = next((line for line in lines if line.startswith("Submitted/Pending")), "")

    buckets = {"funded": [], "pending": []}
    active_bucket: Optional[str] = None

    for line in lines:
        if line.startswith("Funded"):
            active_bucket = "funded"
            continue
        if line.startswith("Submitted/Pending"):
            active_bucket = "pending"
            continue
        if line.startswith("Unfunded"):
            active_bucket = None
            continue
        if not active_bucket:
            continue

        role_match = re.search(r"\(([^)]*(?:Lead PI|PI|External Evaluator|Key Personnel)[^)]*)\)", line)
        dates_match = re.search(r"\(([^)]*\d{4}[^)]*)\)", line)
        dates = clean_text(dates_match.group(1)) if dates_match else ""

        after_dates = line[dates_match.end() :].lstrip(". ").strip() if dates_match else line
        amount_value = extract_last_money(after_dates)
        amount = format_currency(amount_value) if amount_value is not None else "pending"

        cleaned_tail = re.sub(
            r"(?:Total award|Sub-award|Total Fellowship amount \(summer stipend\)|PENDING|NOT FUNDED)\s*\$[\d,]+(?:\.\d+)?",
            "",
            after_dates,
            flags=re.I,
        )
        cleaned_tail = re.sub(r"\$[\d,]+(?:\.\d+)?", "", cleaned_tail)
        parts = [clean_text(part.strip(" .")) for part in cleaned_tail.split(",") if clean_text(part.strip(" ."))]

        title = parts[0] if parts else clean_text(after_dates)
        sponsor = ", ".join(parts[1:]) if len(parts) > 1 else ""

        meta_parts = []
        if role_match:
            meta_parts.append(clean_text(role_match.group(1)))
        if sponsor:
            meta_parts.append(sponsor)
        if dates:
            meta_parts.append(dates.replace("–", "-"))

        buckets[active_bucket].append(
            {
                "title": title,
                "meta": " | ".join(meta_parts),
                "amount": amount,
                "amountValue": amount_value,
            }
        )

    grant_portfolio = {
        "fundedTotal": int(extract_first_money(funded_header) or sum(item["amountValue"] or 0 for item in buckets["funded"])),
        "pendingTotal": int(extract_first_money(pending_header) or sum(item["amountValue"] or 0 for item in buckets["pending"])),
        "fundedCount": len(buckets["funded"]),
        "pendingCount": len(buckets["pending"]),
    }

    return {
        "grants": buckets,
        "grantPortfolio": grant_portfolio,
    }


def parse_publications(paragraphs: Sequence[str]) -> Dict[str, object]:
    start = find_section_index(paragraphs, HEADERS["journal_articles"])
    end = find_section_index(paragraphs, HEADERS["editorial_book"])
    lines = paragraphs[start + 1 : end]

    category = "International"
    complete_records: List[Dict[str, str]] = []
    publication_details: List[Dict[str, object]] = []

    entries = split_numbered_entries(lines)

    for line in lines:
        if line.startswith("International and Peer-reviewed"):
            category = "International"
        elif line.startswith("Korean-written and Peer-reviewed"):
            category = "Korean"
        elif RECORD_START.match(line):
            break

    category_lines: List[tuple[str, str]] = []
    category = "International"
    buffer: List[str] = []
    for line in lines:
        if line.startswith("International and Peer-reviewed"):
            if buffer:
                category_lines.append((category, " ".join(buffer)))
                buffer = []
            category = "International"
            continue
        if line.startswith("Korean-written and Peer-reviewed"):
            if buffer:
                category_lines.append((category, " ".join(buffer)))
                buffer = []
            category = "Korean"
            continue
        if line.startswith("Note "):
            continue

        parts = [part for part in re.split(r"(?=\[\d+\]\s*)", line) if part.strip()]
        for part in parts:
            text = clean_text(part)
            if RECORD_START.match(text):
                if buffer:
                    category_lines.append((category, " ".join(buffer)))
                buffer = [RECORD_START.sub("", text)]
            elif buffer:
                buffer.append(text)

    if buffer:
        category_lines.append((category, " ".join(buffer)))

    for category, entry in category_lines:
        citation = clean_text(entry)
        year = extract_year(citation)
        link = extract_url(citation)
        doi = extract_doi(citation)
        if not link and doi:
            link = f"https://doi.org/{doi}"

        title = parse_title_from_citation(citation)
        authors = parse_authors_from_citation(citation)
        venue = parse_venue_from_citation(citation)
        note = derive_publication_note(citation)
        status = parse_publication_status(citation)
        tags = derive_publication_tags(title, venue, category)

        complete_records.append(
            {
                "year": year,
                "category": category,
                "citation": citation,
                "link": link,
            }
        )
        publication_details.append(
            {
                "year": year,
                "title": title,
                "authors": authors,
                "venue": venue,
                "link": link,
                "tags": tags,
                "note": note,
                "status": status,
            }
        )

    return {
        "completeJournalArticles": complete_records,
        "publications": publication_details,
    }


def parse_status_from_working_paper(citation: str) -> str:
    match = re.search(r"\((Submitted|Under review|In preparation|Revising to resubmit|abstract accepted[^)]*)\)", citation, re.I)
    return clean_text(match.group(1)) if match else "Working paper"


def parse_authors_from_working_paper(citation: str) -> str:
    status_match = re.search(r"\((Submitted|Under review|In preparation|Revising to resubmit|abstract accepted[^)]*)\)", citation, re.I)
    if not status_match:
        return parse_authors_from_citation(citation)
    return clean_text(citation[: status_match.start()])


def clean_working_paper_remainder(text: str) -> str:
    text = re.sub(r"\s*\([^)]*indexed[^)]*\)\s*\.?\s*$", "", text, flags=re.I)
    return clean_text(text.strip(" ."))


def parse_title_from_working_paper(citation: str) -> str:
    status_match = re.search(r"\((Submitted|Under review|In preparation|Revising to resubmit|abstract accepted[^)]*)\)\.\s*", citation, re.I)
    if not status_match:
        return parse_title_from_citation(citation)
    after_status = clean_working_paper_remainder(citation[status_match.end() :])
    title, _, _venue = after_status.rpartition(". ")
    return clean_text(title or after_status)


def parse_working_paper_venue(citation: str) -> str:
    status_match = re.search(r"\((Submitted|Under review|In preparation|Revising to resubmit|abstract accepted[^)]*)\)\.\s*", citation, re.I)
    if not status_match:
        return ""
    after_status = clean_working_paper_remainder(citation[status_match.end() :])
    if ". " not in after_status:
        return ""
    venue_part = after_status.rsplit(". ", 1)[-1]
    return clean_text(venue_part.strip(" ."))


def parse_working_papers(paragraphs: Sequence[str]) -> Dict[str, object]:
    lines = section_between(paragraphs, HEADERS["working_papers"], HEADERS["service"])

    items: List[Dict[str, str]] = []
    bucket = "Submitted or Under Review"
    paper_type = "Journal Manuscript"
    buffer: List[str] = []

    def flush_buffer() -> None:
        nonlocal buffer
        if not buffer:
            return
        citation = clean_text(" ".join(buffer))
        title = parse_title_from_working_paper(citation)
        status = parse_status_from_working_paper(citation)
        items.append(
            {
                "bucket": bucket,
                "type": paper_type,
                "status": sentence_case(status),
                "year": extract_year(citation) or "Pipeline",
                "title": title,
                "authors": parse_authors_from_working_paper(citation),
                "venue": parse_working_paper_venue(citation),
                "citation": citation,
                "link": extract_url(citation),
            }
        )
        buffer = []

    for raw_line in lines:
        line = clean_text(raw_line)
        if not line or line.startswith("Note "):
            continue
        if line.startswith("Submitted or Under Review"):
            flush_buffer()
            bucket = "Submitted or Under Review"
            continue
        if line.startswith("In Preparation"):
            flush_buffer()
            bucket = "In Preparation"
            continue
        if line.startswith("Journal Manuscript"):
            flush_buffer()
            paper_type = "Journal Manuscript"
            continue
        if line.startswith("Book Chapter"):
            flush_buffer()
            paper_type = "Book Chapter"
            continue
        if line.startswith("Conference Proposals"):
            flush_buffer()
            paper_type = "Conference Proposal"
            continue

        parts = [part for part in re.split(r"(?=\[\d+\]\s*)", line) if part.strip()]
        for part in parts:
            text = clean_text(part)
            if RECORD_START.match(text):
                flush_buffer()
                buffer = [RECORD_START.sub("", text)]
            elif buffer:
                buffer.append(text)

    flush_buffer()

    submitted = [item for item in items if item["bucket"] == "Submitted or Under Review"]
    preparation = [item for item in items if item["bucket"] == "In Preparation"]

    return {
        "workingPapers": items,
        "workingPaperSummary": {
            "total": len(items),
            "submittedOrUnderReview": len(submitted),
            "inPreparation": len(preparation),
            "journalManuscripts": sum(1 for item in items if item["type"] == "Journal Manuscript"),
            "bookChapters": sum(1 for item in items if item["type"] == "Book Chapter"),
            "conferenceProposals": sum(1 for item in items if item["type"] == "Conference Proposal"),
        },
    }


def parse_talks(paragraphs: Sequence[str], limit: int = 8) -> List[Dict[str, str]]:
    lines = section_between(paragraphs, HEADERS["presentations"], HEADERS["working_papers"])
    talks = []

    for entry in split_numbered_entries(lines)[:limit]:
        year_match = re.search(r"\(\d{4},\s*[^)]+\)\.\s*", entry)
        if not year_match:
            continue
        remainder = entry[year_match.end() :]
        title, _, meta = remainder.partition(". ")
        talks.append(
            {
                "title": clean_text(title),
                "meta": clean_text(meta),
            }
        )

    return talks


def parse_honors(paragraphs: Sequence[str]) -> List[str]:
    lines = section_between(paragraphs, HEADERS["honors"], HEADERS["certificates"])
    return [clean_text(line) for line in lines if line]


def parse_service(paragraphs: Sequence[str]) -> Dict[str, object]:
    lines = section_between(paragraphs, HEADERS["service"], HEADERS["honors"])

    editorial_roles: List[Dict[str, str]] = []
    for raw in lines:
        if not raw.startswith(("Associate Editor", "Editorial Board", "Journal Special Issue Editor")):
            continue
        years_match = re.search(r"\((\d{4}[^()]*)\)\s*$", raw)
        if not years_match and "Computers and Education: X Reality" not in raw:
            continue
        years = years_match.group(1) if years_match else ""
        line = raw[: years_match.start()].strip() if years_match else raw
        role_split = re.split(r"\s+[–-]\s+", line, maxsplit=1)
        role_part = role_split[0]
        title_part = role_split[1] if len(role_split) > 1 else ""
        title = clean_text(re.sub(r"\([^)]*\)", "", title_part).strip(" ."))
        if title not in FEATURED_EDITORIAL_TITLES:
            continue
        label = "Special Issue" if "Special Issue" in role_part else "Journal"
        editorial_roles.append(
            {
                "badge": abbreviate_name(title),
                "label": label,
                "role": clean_text(role_part),
                "title": title,
                "years": years or ("2024-present" if "Computers and Education: X Reality" in title else ""),
                "theme": SERVICE_THEME_BY_LABEL.get(label, "stone"),
            }
        )

    leadership_roles: List[Dict[str, str]] = []
    for raw in lines:
        if raw.startswith("Conference Program Co-Chair"):
            years_match = re.search(r"(\d{4}-\d{4}|\d{4}-present)$", raw, re.I)
            years = years_match.group(1) if years_match else ""
            role = "Program Co-Chair"
            if "International Conference on Computers in Education" in raw:
                title = "ICCE Educational Gamification and Game-based Learning Section"
                label = "Conference"
            elif "International Learning Research Network" in raw or "Immersive Learning Research Network" in raw:
                title = "iLRN Practitioner Stream"
                label = "Conference"
            else:
                title = clean_text(raw)
                label = "Conference"
            leadership_roles.append(
                {
                    "badge": abbreviate_name(title),
                    "label": label,
                    "role": role,
                    "title": title,
                    "years": years,
                    "theme": SERVICE_THEME_BY_LABEL.get(label, "crimson"),
                }
            )
        elif raw.startswith(("Communication Officer", "Chair,", "Co-Chair,")):
            years_match = re.search(r"\((?:Appointed, |Elected, )?(\d{4}[^()]*)\)", raw)
            years = years_match.group(1) if years_match else ""
            line = raw[: years_match.start()].strip() if years_match else raw
            role, _, title = line.partition(", ")
            title = clean_text(title)
            if "AERA SIG" in title:
                label = "SIG"
            elif "Immersive Learning Research Network" in title:
                label = "Network"
            else:
                label = "Society"
            leadership_roles.append(
                {
                    "badge": abbreviate_name(title),
                    "label": label,
                    "role": clean_text(role),
                    "title": title,
                    "years": years,
                    "theme": SERVICE_THEME_BY_LABEL.get(label, "stone"),
                }
            )

    leadership_roles = [
        item for item in leadership_roles if (item["role"], item["title"]) in FEATURED_LEADERSHIP_ROLES
    ]

    reviewer_start = lines.index("Ad-Hoc Journal Reviewer") if "Ad-Hoc Journal Reviewer" in lines else -1
    grant_review_start = lines.index("Grant Proposal Review") if "Grant Proposal Review" in lines else -1
    review_journals = []
    review_agencies = []
    if reviewer_start != -1:
        reviewer_lines = lines[reviewer_start + 1 : grant_review_start if grant_review_start != -1 else len(lines)]
        review_journals = [clean_text(item) for item in reviewer_lines if item and not item.startswith("Grant Proposal Review")]
    if grant_review_start != -1:
        review_agencies = [clean_text(item) for item in lines[grant_review_start + 1 :] if item]

    agencies = [agency.split(",")[0] for agency in review_agencies[:2]]
    review_copy = ""
    if review_journals:
        review_copy = (
            f"Review service spans {len(review_journals)} journals across educational technology, "
            "learning sciences, and immersive learning"
        )
        if agencies:
            review_copy += ", alongside grant review for " + " and ".join(agencies)
        review_copy += "."

    return {
        "editorialRoles": editorial_roles,
        "leadershipRoles": leadership_roles,
        "serviceReviewCopy": review_copy,
    }


def join_readable(items: Sequence[str], conjunction: str = "and") -> str:
    cleaned = [clean_text(item) for item in items if clean_text(item)]
    if not cleaned:
        return ""
    if len(cleaned) == 1:
        return cleaned[0]
    if len(cleaned) == 2:
        return f"{cleaned[0]} {conjunction} {cleaned[1]}"
    return ", ".join(cleaned[:-1]) + f", {conjunction} {cleaned[-1]}"


def parse_stats(paragraphs: Sequence[str], grant_portfolio: Dict[str, int]) -> List[Dict[str, str]]:
    journal_count = extract_count(paragraphs[find_section_index(paragraphs, HEADERS["journal_articles"])])
    conference_count = extract_count(
        paragraphs[find_section_index(paragraphs, HEADERS["conference_proceedings"])]
    )
    book_count = extract_count(paragraphs[find_section_index(paragraphs, HEADERS["book_chapters"])])
    presentation_count = extract_count(paragraphs[find_section_index(paragraphs, HEADERS["presentations"])])
    working_paper_count = extract_count(paragraphs[find_section_index(paragraphs, HEADERS["working_papers"])])

    return [
        {"value": str(journal_count), "label": "Journal articles"},
        {"value": str(conference_count), "label": "Conference proceedings"},
        {"value": str(book_count), "label": "Book chapters"},
        {"value": str(working_paper_count), "label": "Working papers"},
        {"value": str(presentation_count), "label": "Presentations"},
        {
            "value": format_compact_currency(grant_portfolio["fundedTotal"]),
            "label": "Funded awards",
        },
    ]


def build_profile(
    paragraphs: Sequence[str],
    contact: Dict[str, str],
    focus_areas: Sequence[str],
    appointments_education: Sequence[Dict[str, str]],
) -> Dict[str, object]:
    name = paragraphs[1] if len(paragraphs) > 1 else "Dr. Jewoong Moon"
    cv_date = paragraphs[2] if len(paragraphs) > 2 else dt.date.today().isoformat()

    primary_role = next(
        (
            item
            for item in appointments_education
            if "present" in item.get("year", "").lower()
        ),
        appointments_education[0] if appointments_education else {},
    )

    primary_title = clean_text(primary_role.get("title", "Assistant Professor"))
    primary_detail = clean_text(primary_role.get("detail", "Instructional Technology, The University of Alabama"))
    department = "Department of Educational Leadership, Policy, and Technology Studies"
    institution = "The University of Alabama"

    address = contact.get("universityAddress", "")
    if "The University of Alabama" in address:
        department_part, _, trailing = address.partition("The University of Alabama")
        department_part = re.sub(r"\s+Autherine Lucy Hall.*$", "", department_part).strip(" ,")
        if clean_text(department_part):
            department = clean_text(department_part)
        institution = "The University of Alabama"
        trailing = clean_text(trailing)
    else:
        trailing = clean_text(address)
    if "Autherine Lucy Hall" in address:
        room_match = re.search(r"(Autherine Lucy Hall\s*\S*)", address)
        room = clean_text(room_match.group(1)) if room_match else ""
        trailing = join_readable([room, trailing], conjunction="and").replace(" and ", ", ", 1)

    expertise_summary = join_readable(
        [
            sentence_case(item)
            for item in focus_areas[:4]
        ]
    )
    hero_summary = (
        f"Research at {institution} focused on {expertise_summary}."
        if expertise_summary
        else f"Research at {institution} focused on AI, XR, learning analytics, and game-based learning."
    )
    hero_panel = (
        "A research agenda centered on teacher learning, immersive simulation, AI-enhanced pedagogy, "
        "and evidence-rich models of how learners act, adapt, and solve problems across digital settings."
    )

    return {
        "name": name,
        "cvDate": cv_date,
        "eyebrow": "Instructional Technology | College of Education",
        "heroTitleMeta": f"{primary_title} of {primary_detail}" if " of " not in primary_title else primary_title,
        "heroSummary": hero_summary,
        "heroPanelTitle": hero_panel,
        "roleLine": primary_title,
        "affiliationLines": [department, institution],
        "officeLocation": trailing or "Tuscaloosa, Alabama",
        "department": department,
        "institution": institution,
        "email": contact.get("email", "jmoon19@ua.edu"),
        "homepage": contact.get("homepage", ""),
        "researchgate": contact.get("researchgate", ""),
        "labWebsite": contact.get("labWebsite", ""),
        "cvDownloadPath": "CV_202605_MOON.docx",
        "cvDownloadFilename": "CV_202605_MOON.docx",
    }


def build_overview(profile: Dict[str, object], focus_areas: Sequence[str]) -> Dict[str, object]:
    focus_text = join_readable([sentence_case(item) for item in focus_areas[:5]])
    first_paragraph = (
        f"{profile['name']} studies how computationally rich learning environments can better support "
        "teacher education, inclusive STEM learning, and adaptive educational experiences."
    )
    second_paragraph = (
        f"The current CV foregrounds work in {focus_text}."
        if focus_text
        else "The current CV foregrounds work in AI, XR, analytics, and digital learning design."
    )

    return {
        "title": "Research at the intersection of AI, XR, analytics, and learning experience design",
        "paragraphs": [first_paragraph, second_paragraph],
    }


def extract_grant_year(meta: str) -> str:
    match = re.search(r"(20\d{2})", meta)
    return match.group(1) if match else "Recent"


def parse_news(
    publication_items: Sequence[Dict[str, object]],
    grant_items: Dict[str, List[Dict[str, object]]],
    honors: Sequence[str],
    talks: Sequence[Dict[str, str]],
) -> List[Dict[str, str]]:
    items: List[Dict[str, str]] = []

    for publication in publication_items[:3]:
        venue = publication.get("venue", "journal article")
        title = publication.get("title", "New publication")
        status = publication.get("status", "")
        if status and status.lower() not in {"accepted", "in press"}:
            text = f"{status} manuscript for {venue}: {title}."
        elif status:
            text = f"{status} article in {venue}: {title}."
        else:
            text = f"Journal article in {venue}: {title}."
        items.append(
            {
                "date": publication.get("year", "Recent"),
                "type": "Publication",
                "text": text,
            }
        )

    for grant in grant_items.get("funded", [])[:2]:
        amount = grant.get("amount", "")
        amount_copy = f" ({amount})" if amount and amount != "pending" else ""
        items.append(
            {
                "date": extract_grant_year(grant.get("meta", "")),
                "type": "Grant",
                "text": f"Funded project: {grant.get('title', 'Grant award')}{amount_copy}.",
            }
        )

    for honor in honors[:2]:
        items.append(
            {
                "date": extract_year(honor) or "Recent",
                "type": "Award",
                "text": honor,
            }
        )

    if len(items) < 6:
        for talk in talks[: 6 - len(items)]:
            items.append(
                {
                    "date": extract_year(talk.get("meta", "")) or "Recent",
                    "type": "Talk",
                    "text": f"Presentation: {talk.get('title', '')}.",
                }
            )

    return items[:6]


def derive_initiative_tags(meta: str, amount: str) -> List[str]:
    tags = []
    if amount and amount != "pending":
        tags.append(amount)

    for part in [clean_text(piece) for piece in meta.split("|") if clean_text(piece)]:
        if part.startswith("20"):
            continue
        tags.append(part)
        if len(tags) == 3:
            break

    return tags or ["Research project"]


def parse_initiatives(
    grants: Dict[str, List[Dict[str, object]]],
    publications: Sequence[Dict[str, object]],
) -> List[Dict[str, object]]:
    cards: List[Dict[str, object]] = []

    for status, badge in [("funded", "Funded"), ("pending", "Pending")]:
        for grant in grants.get(status, [])[: (3 if status == "funded" else 2)]:
            title = clean_text(grant.get("title", "Project"))
            cards.append(
                {
                    "name": infer_initiative_name(title),
                    "badge": badge,
                    "summary": title,
                    "tags": derive_initiative_tags(grant.get("meta", ""), grant.get("amount", "")),
                }
            )

    if not cards:
        for publication in publications[:5]:
            title = clean_text(publication.get("title", "Publication"))
            cards.append(
                {
                    "name": infer_initiative_name(title),
                    "badge": publication.get("year", "Recent"),
                    "summary": title,
                    "tags": publication.get("tags", [])[:3] or [publication.get("venue", "Publication")],
                }
            )

    return cards[:5]


def choose_cv_path(explicit_path: Optional[Path]) -> Path:
    if explicit_path:
        return explicit_path.resolve()

    if DEFAULT_CV_PATH.exists():
        return DEFAULT_CV_PATH
    if FALLBACK_CV_PATH.exists():
        return FALLBACK_CV_PATH
    return LEGACY_CV_PATH


def build_site_data(cv_path: Path) -> Dict[str, object]:
    paragraphs = load_paragraphs(cv_path)
    contact = parse_contact(paragraphs)
    focus_areas = parse_focus_areas(paragraphs)
    appointments_education = parse_appointments_education(paragraphs)
    affiliations = parse_affiliations(paragraphs)
    teaching = parse_teaching(paragraphs)
    mentoring_metrics = parse_mentoring_metrics(paragraphs)
    grants_data = parse_grants(paragraphs)
    publications_data = parse_publications(paragraphs)
    working_papers_data = parse_working_papers(paragraphs)
    talks = parse_talks(paragraphs)
    honors = parse_honors(paragraphs)
    service = parse_service(paragraphs)
    profile = build_profile(paragraphs, contact, focus_areas, appointments_education)
    overview = build_overview(profile, focus_areas)
    news = parse_news(publications_data["publications"], grants_data["grants"], honors, talks)
    initiatives = parse_initiatives(grants_data["grants"], publications_data["publications"])
    stats = parse_stats(paragraphs, grants_data["grantPortfolio"])

    return {
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "sourceCv": str(cv_path),
        "profile": profile,
        "contact": contact,
        "overview": overview,
        "stats": stats,
        "focusAreas": focus_areas,
        "affiliations": affiliations,
        "appointmentsEducation": appointments_education,
        "honors": honors[:8],
        "news": news,
        "initiatives": initiatives,
        "publications": publications_data["publications"],
        "completeJournalArticles": publications_data["completeJournalArticles"],
        "workingPapers": working_papers_data["workingPapers"],
        "workingPaperSummary": working_papers_data["workingPaperSummary"],
        "grants": grants_data["grants"],
        "grantPortfolio": grants_data["grantPortfolio"],
        "teaching": teaching,
        "mentoringMetrics": mentoring_metrics,
        "editorialRoles": service["editorialRoles"],
        "leadershipRoles": service["leadershipRoles"],
        "serviceReviewCopy": service["serviceReviewCopy"],
        "talks": talks,
    }


def write_outputs(site_data: Dict[str, object], json_path: Path, js_path: Path) -> None:
    json_path.parent.mkdir(parents=True, exist_ok=True)
    js_path.parent.mkdir(parents=True, exist_ok=True)

    json_path.write_text(
        json.dumps(site_data, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    js_path.write_text(
        "window.__cvSiteData = " + json.dumps(site_data, indent=2, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate browser-ready site data from a CV DOCX.")
    parser.add_argument("--cv", type=Path, help="Path to the source CV DOCX.")
    parser.add_argument("--json-output", type=Path, default=DEFAULT_JSON_PATH)
    parser.add_argument("--js-output", type=Path, default=DEFAULT_JS_PATH)
    args = parser.parse_args()

    cv_path = choose_cv_path(args.cv)
    if not cv_path.exists():
        raise FileNotFoundError(f"CV not found: {cv_path}")

    site_data = build_site_data(cv_path)
    write_outputs(site_data, args.json_output, args.js_output)

    print(f"Generated site data from {cv_path}")
    print(f"JSON output: {args.json_output}")
    print(f"JS output: {args.js_output}")


if __name__ == "__main__":
    main()
