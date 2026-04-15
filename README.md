# Dr. Jewoong Moon Research CV Site

Static academic CV website that can now be regenerated from a CV `.docx`.

## Core Files

- `index.html` - page structure
- `styles.css` - responsive visual system
- `app.js` - client-side rendering with generated-data fallback
- `publication.html` / `publication.js` - publication detail pages
- `assets/current-cv.docx` - stable downloadable CV asset used by the site
- `assets/site-data.generated.json` - parsed CV data for inspection
- `assets/site-data.js` - browser-ready generated data file
- `assets/publication-abstracts.json` - abstract library used by publication cards/detail pages

## CV-Driven Update Flow

Drop in a new CV and run one command:

```bash
npm run site:update -- --cv "C:\path\to\new-cv.docx"
```

This will:

1. copy the file into `assets/current-cv.docx`
2. parse the CV into site data
3. refresh Google Scholar citation metrics and merge them with OpenAlex analytics
4. refresh the publication abstract library

If you also want the slower Playwright recovery pass for missing abstracts:

```bash
npm run site:update:playwright -- --cv "C:\path\to\new-cv.docx"
```

If the new CV is already saved as `assets/current-cv.docx`, you can simply run:

```bash
npm run site:update
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
