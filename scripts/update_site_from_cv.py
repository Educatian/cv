from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Optional


ROOT = Path(__file__).resolve().parents[1]
# CV source is auto-discovered: newest CV_<date>_MOON.docx in the repo root.
CV_GLOB = "CV_*_MOON.docx"
CV_DATE_RE = re.compile(r"CV_(\d{4,8})_MOON\.docx$", re.I)
DEFAULT_CV_PATH = ROOT / "CV_202605_MOON.docx"
SITE_DATA_SCRIPT = ROOT / "scripts" / "generate_site_data.py"
ABSTRACTS_SCRIPT = ROOT / "scripts" / "update_publication_abstracts.py"
PLAYWRIGHT_SCRIPT = ROOT / "scripts" / "update_publication_abstracts_playwright.mjs"
ANALYTICS_SCRIPT = ROOT / "scripts" / "update_research_analytics.py"
SCHOLAR_ANALYTICS_SCRIPT = ROOT / "scripts" / "update_research_analytics_scholar.mjs"


def find_latest_cv() -> Optional[Path]:
    """Return the newest CV_<date>_MOON.docx in the repo root, or None."""
    candidates = list(ROOT.glob(CV_GLOB))
    if not candidates:
        return None

    def sort_key(path: Path):
        match = CV_DATE_RE.search(path.name)
        date_rank = int(match.group(1)) if match else -1
        return (date_rank, path.stat().st_mtime)

    return max(candidates, key=sort_key)


def resolve_source_cv(explicit_path: Path | None) -> Path:
    if explicit_path:
        return explicit_path.resolve()

    latest = find_latest_cv()
    if latest:
        return latest
    raise FileNotFoundError(
        "No CV file (CV_<date>_MOON.docx) was found in the repo root. Provide one with --cv."
    )


def sync_canonical_cv(source_path: Path) -> Path:
    """Ensure the source CV lives in the repo root and return that path.

    A CV supplied from outside the repo (via --cv) is copied in under its own
    name so it joins the dated set the parser scans; an in-root CV is used as-is.
    """
    source_path = source_path.resolve()
    if source_path.parent == ROOT:
        return source_path

    canonical = ROOT / source_path.name
    shutil.copy2(source_path, canonical)
    return canonical


def run_step(command: list[str], label: str) -> None:
    print(f"[site-update] {label}")
    subprocess.run(command, cwd=ROOT, check=True)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Update the CV site from a DOCX by refreshing parsed site data and publication abstracts."
    )
    parser.add_argument("--cv", type=Path, help="Path to the new CV DOCX.")
    parser.add_argument(
        "--skip-abstracts",
        action="store_true",
        help="Skip rebuilding the abstract library.",
    )
    parser.add_argument(
        "--skip-analytics",
        action="store_true",
        help="Skip refreshing external research analytics data.",
    )
    parser.add_argument(
        "--with-playwright",
        action="store_true",
        help="Run the slower Playwright pass for missing abstracts after the base abstract refresh.",
    )
    args = parser.parse_args()

    source_cv = resolve_source_cv(args.cv)
    canonical_cv = sync_canonical_cv(source_cv)

    run_step(
        [sys.executable, str(SITE_DATA_SCRIPT), "--cv", str(canonical_cv)],
        "Generating site data",
    )

    if not args.skip_analytics:
        run_step(
            ["node", str(SCHOLAR_ANALYTICS_SCRIPT)],
            "Refreshing Google Scholar citation analytics",
        )
        run_step(
            [sys.executable, str(ANALYTICS_SCRIPT)],
            "Refreshing research analytics",
        )

    if not args.skip_abstracts:
        run_step(
            [sys.executable, str(ABSTRACTS_SCRIPT), "--cv", str(canonical_cv)],
            "Refreshing publication abstracts",
        )

        if args.with_playwright:
            run_step(["node", str(PLAYWRIGHT_SCRIPT)], "Running Playwright abstract recovery")

    print(f"[site-update] Canonical CV: {canonical_cv}")
    print("[site-update] Done")


if __name__ == "__main__":
    main()
