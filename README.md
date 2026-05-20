# Dr. Jewoong Moon Research CV Site

Static academic CV website that can now be regenerated from a CV `.docx`.

## Core Files

- `index.html` - page structure
- `styles.css` - responsive visual system
- `app.js` - client-side rendering with generated-data fallback
- `publication.html` / `publication.js` - publication detail pages
- `CV_202605_MOON.docx` - canonical CV source and downloadable CV file used by the site
- `assets/current-cv.docx` - compatibility copy refreshed from the canonical CV
- `assets/site-data.generated.json` - parsed CV data for inspection
- `assets/site-data.js` - browser-ready generated data file
- `assets/publication-abstracts.json` - abstract library used by publication cards/detail pages

## CV-Driven Update Flow

Use the canonical root CV, `CV_202605_MOON.docx`, and run one command:

```bash
npm run site:update
```

This will:

1. parse `CV_202605_MOON.docx` into site data
2. refresh the compatibility copy at `assets/current-cv.docx`
3. refresh Google Scholar citation metrics and merge them with OpenAlex analytics
4. refresh the publication abstract library

When a `--cv` path is supplied, the updater first copies that file into the canonical root file, `CV_202605_MOON.docx`, then regenerates the site from that canonical copy. The website download link points directly to `CV_202605_MOON.docx`.

If you also want the slower Playwright recovery pass for missing abstracts:

```bash
npm run site:update:playwright -- --cv "C:\path\to\new-cv.docx"
```

## Biweekly Refresh

Register the 14-day Windows scheduled task once:

```bash
npm run update:biweekly:register
```

The task runs `npm run site:update:playwright` every 14 days. That refresh includes:

- canonical `CV_202605_MOON.docx` parsing and compatibility `assets/current-cv.docx` sync
- generated site data, including journal articles and working papers
- Google Scholar metrics and per-work citation counts
- OpenAlex author, venue, topic, open-access, and coauthor analytics
- DOI/frontpage abstract and thumbnail extraction, with bounded Playwright recovery for missing abstracts

Publisher thumbnails are parsed into `assets/publication-abstracts.json` as `thumbnailUrl` when available. Publications without a parsed image render an infographic-style journal card so the site never shows an empty thumbnail slot. To manually attempt additional browser-based thumbnail recovery, run:

```bash
node scripts/update_publication_abstracts_playwright.mjs --thumbnail-limit=8
```

Manual full refresh:

```bash
npm run update:biweekly
```

## Parsing Scripts

- `scripts/generate_site_data.py` - extracts profile, education, affiliations, teaching, grants, service, talks, and publications into structured site data
- `scripts/update_research_analytics_scholar.mjs` - scrapes public Google Scholar profile metrics and cited-by counts with Playwright
- `scripts/update_research_analytics.py` - merges Scholar citation data with OpenAlex network, topic, venue, and access analytics
- `scripts/update_publication_abstracts.py` - base DOI-driven abstract collection
- `scripts/update_publication_abstracts_playwright.mjs` - Playwright fallback for harder publisher pages
- `scripts/update_site_from_cv.py` - orchestration script for the full update cycle

## Publish on GitHub Pages

1. Create a repository for this folder.
2. Upload the folder contents to the repository root.
3. In GitHub, open `Settings > Pages`.
4. Set the source to `Deploy from a branch`.
5. Choose the default branch and `/ (root)`.

The site is static and does not need a build step.
