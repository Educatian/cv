from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CURRENT_CV_PATH = ROOT / "assets" / "current-cv.docx"
LEGACY_CV_PATH = ROOT / "assets" / "CV_202604_MOON.docx"
SITE_DATA_SCRIPT = ROOT / "scripts" / "generate_site_data.py"
ABSTRACTS_SCRIPT = ROOT / "scripts" / "update_publication_abstracts.py"
PLAYWRIGHT_SCRIPT = ROOT / "scripts" / "update_publication_abstracts_playwright.mjs"


def resolve_source_cv(explicit_path: Path | None) -> Path:
    if explicit_path:
        return explicit_path.resolve()
    if CURRENT_CV_PATH.exists():
        return CURRENT_CV_PATH
    if LEGACY_CV_PATH.exists():
        return LEGACY_CV_PATH
    raise FileNotFoundError("No CV file was found. Provide one with --cv.")


def sync_current_cv(source_path: Path) -> Path:
    source_path = source_path.resolve()
    CURRENT_CV_PATH.parent.mkdir(parents=True, exist_ok=True)

    if source_path != CURRENT_CV_PATH.resolve():
        shutil.copy2(source_path, CURRENT_CV_PATH)

    return CURRENT_CV_PATH


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
        "--with-playwright",
        action="store_true",
        help="Run the slower Playwright pass for missing abstracts after the base abstract refresh.",
    )
    args = parser.parse_args()

    source_cv = resolve_source_cv(args.cv)
    current_cv = sync_current_cv(source_cv)

    run_step(
        [sys.executable, str(SITE_DATA_SCRIPT), "--cv", str(current_cv)],
        "Generating site data",
    )

    if not args.skip_abstracts:
        run_step(
            [sys.executable, str(ABSTRACTS_SCRIPT), "--cv", str(current_cv)],
            "Refreshing publication abstracts",
        )

        if args.with_playwright:
            run_step(["node", str(PLAYWRIGHT_SCRIPT)], "Running Playwright abstract recovery")

    print(f"[site-update] Current CV: {current_cv}")
    print("[site-update] Done")


if __name__ == "__main__":
    main()
