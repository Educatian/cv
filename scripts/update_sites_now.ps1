#requires -version 5
<#
  update_sites_now.ps1 - interactive "update both sites" runner (double-click via desktop shortcut).

  Reads the CANONICAL CV docx (the one the Desktop CV shortcut points to:
  ...\_projects\cv\CV_202605_MOON.docx) and refreshes both GitHub Pages sites.

  Step 1  Research analytics: refresh assets/research-analytics{,-scholar}.json
          from Google Scholar (Playwright scrape, best-effort) + OpenAlex
          (author + works, merged). app.js fetches research-analytics.json to
          render the live citation/metrics dashboard; cv_autopush (Step 2) then
          commits the regenerated files alongside site-data.
  Step 2  CV  (Educatian/cv): reuse the canonical cv_autopush.ps1 pipeline
          (Word-lock guard -> regenerate site-data from docx -> sanity check
           -> commit [incl. refreshed analytics] -> merge -s ours -> push).
  Step 3  Lab (Educatian/adie): refresh the bundled fallback cv-site-data.{json,js}
          from CV's freshly generated json -> commit -> push. The live lab page
          already auto-syncs from CV's live data on load; this keeps the repo and
          the offline/file:// fallback current too.

  Safe to run anytime: each step pushes only when something actually changed.
#>

$ErrorActionPreference = 'Continue'
$cvRoot      = Split-Path -Parent $PSScriptRoot                       # ...\_projects\cv
$projectsDir = Split-Path -Parent $cvRoot                            # ...\_projects
$adieRoot    = Join-Path $projectsDir 'adie'                         # ...\_projects\adie

function Section($t) { Write-Host ""; Write-Host "==== $t ====" -ForegroundColor Cyan }

Write-Host ""
Write-Host "  Update CV + Lab websites from the canonical CV docx" -ForegroundColor White
Write-Host "  $(Join-Path $cvRoot 'CV_202605_MOON.docx')" -ForegroundColor DarkGray

# -------------------------------------------------- Step 1: Research analytics
Section "Step 1/3  Research analytics  (OpenAlex + Google Scholar)"
$scholarMjs = Join-Path $PSScriptRoot 'update_research_analytics_scholar.mjs'
$openalexPy = Join-Path $PSScriptRoot 'update_research_analytics.py'

# 1a. Google Scholar (Playwright). Best-effort: Google may serve a bot
#     challenge or simply be slow. Run it in a background job with a hard
#     180s timeout so a hung scrape never blocks the whole update; on
#     failure/timeout we keep the previously-captured scholar JSON and still
#     refresh OpenAlex below (OpenAlex is the canonical source; Scholar only
#     enriches the summary/annual-trend numbers).
if (Test-Path -LiteralPath $scholarMjs) {
  Write-Host "  Google Scholar scrape (Playwright, up to 180s)..." -ForegroundColor DarkGray
  $job = Start-Job -ScriptBlock {
    param($root, $mjs)
    Set-Location -LiteralPath $root
    & node $mjs 2>&1
  } -ArgumentList $cvRoot, $scholarMjs
  if (Wait-Job $job -Timeout 180) {
    Receive-Job $job | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
    Write-Host "  Scholar data refreshed." -ForegroundColor Green
  } else {
    Stop-Job $job 2>&1 | Out-Null
    Write-Host "  Scholar scrape timed out (>180s); keeping previous Scholar data." -ForegroundColor Yellow
  }
  Remove-Job $job -Force 2>&1 | Out-Null
} else {
  Write-Host "  Scholar scraper not found ($scholarMjs); skipping." -ForegroundColor Yellow
}

# 1b. OpenAlex + merge -> assets/research-analytics.json (fetched by app.js).
if (Test-Path -LiteralPath $openalexPy) {
  Write-Host "  OpenAlex author + works refresh..." -ForegroundColor DarkGray
  & py $openalexPy 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
  if ($LASTEXITCODE -eq 0) { Write-Host "  Research analytics refreshed." -ForegroundColor Green }
  else { Write-Host "  OpenAlex refresh failed (network?); site keeps prior analytics." -ForegroundColor Red }
} else {
  Write-Host "  OpenAlex script not found ($openalexPy); skipping." -ForegroundColor Yellow
}

# ---------------------------------------------------------------- Step 2: CV
Section "Step 2/3  CV site  ->  https://educatian.github.io/cv/"
$cvAutopush = Join-Path $PSScriptRoot 'cv_autopush.ps1'
if (Test-Path -LiteralPath $cvAutopush) {
  & $cvAutopush
  $log = Join-Path $cvRoot ("logs\cv-autopush-" + (Get-Date -Format 'yyyyMM') + ".log")
  if (Test-Path -LiteralPath $log) {
    Write-Host "  --- recent CV pipeline log ---" -ForegroundColor DarkGray
    Get-Content -LiteralPath $log -Tail 12 | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
  }
} else {
  Write-Host "  cv_autopush.ps1 not found; cannot update CV." -ForegroundColor Red
}

# --------------------------------------------------------------- Step 3: Lab
Section "Step 3/3  Lab site  ->  https://educatian.github.io/adie/"
$genJson = Join-Path $cvRoot 'assets\site-data.generated.json'
if (-not (Test-Path -LiteralPath $genJson)) {
  Write-Host "  CV generated json not found ($genJson); skipping lab refresh." -ForegroundColor Yellow
} elseif (-not (Test-Path -LiteralPath $adieRoot)) {
  Write-Host "  adie repo not found at $adieRoot; skipping." -ForegroundColor Yellow
} else {
  $json   = [IO.File]::ReadAllText($genJson, [Text.Encoding]::UTF8)
  $dstJson = Join-Path $adieRoot 'assets\data\cv-site-data.json'
  $dstJs   = Join-Path $adieRoot 'assets\data\cv-site-data.js'

  # JSON: UTF-8 no BOM (matches existing). JS: UTF-8 BOM + window assignment wrapper.
  [IO.File]::WriteAllText($dstJson, $json, (New-Object Text.UTF8Encoding($false)))
  $js = "window.__cvSiteData = " + $json + "`r`n;`r`n"
  [IO.File]::WriteAllText($dstJs, $js, (New-Object Text.UTF8Encoding($true)))

  Set-Location -LiteralPath $adieRoot
  & git fetch origin 2>&1 | Out-Null
  & git add assets/data/cv-site-data.json assets/data/cv-site-data.js 2>&1 | Out-Null
  $staged = & git diff --cached --name-only
  if (-not $staged) {
    Write-Host "  Lab fallback already current; nothing to push." -ForegroundColor Green
  } else {
    $ts = Get-Date -Format 'yyyy-MM-dd HH:mm'
    & git commit -m "Refresh bundled CV data fallback ($ts)" 2>&1 | Out-Null
    $behind = (& git rev-list "HEAD..origin/main" --count) -as [int]
    if ($behind -gt 0) { & git merge -s ours origin/main --no-edit 2>&1 | Out-Null }
    & git push 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
    if ($LASTEXITCODE -eq 0) { Write-Host "  Lab repo pushed." -ForegroundColor Green }
    else { Write-Host "  Lab push failed (check network/credentials)." -ForegroundColor Red }
  }
}

Set-Location -LiteralPath $cvRoot
Write-Host ""
Write-Host "  Done. Changes go live in ~1-2 min:" -ForegroundColor Green
Write-Host "    CV  : https://educatian.github.io/cv/"
Write-Host "    Lab : https://educatian.github.io/adie/"
Write-Host ""
Read-Host "  Press Enter to close"
