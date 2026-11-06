# Research analytics sources

Run `node scripts/update_research_analytics_scholar.mjs`, then `py scripts/update_research_analytics.py` from the repository root, or use the existing `scripts/update_sites_now.ps1` update route.

The Scholar capture must contain the named author, complete publication pagination, all six summary statistics, consistent h/i10 indices, and annual citation observations. A blocked or incomplete response fails before the previous file is replaced. The aggregate builder also rejects invalid Scholar files and labels its OpenAlex fallback explicitly. Recent-period Scholar statistics remain unavailable on that fallback; they are not reported as zero.

Google Scholar supplies profile totals, recent-period indices, annual citations, and publication cited-by counts. OpenAlex supplies venue, access, topic, coauthor, and field benchmark enrichment. These sources index different works; their totals should not be combined or relabeled. The displayed annual range is the range actually supplied by the source, with the current year marked year-to-date. Growth requires both complete comparison windows; unavailable years are not imputed as zero. Projections are distinguished from observed citations.

The homepage snapshot and Analytics dashboard fetch the same `assets/research-analytics.json` with cache revalidation. Source refresh dates are shown in Analytics. A saved snapshot is not a live connection to Google Scholar.

Checks: `node --test scripts/scholar-validation.test.mjs` and `py scripts/test_research_analytics.py`. Publication/course source data remains independent of citation refreshes.
