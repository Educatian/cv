param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Continue"
Set-Location -LiteralPath $Root

$logDir = Join-Path $Root "logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$log = Join-Path $logDir ("cv-autopush-" + (Get-Date -Format 'yyyyMM') + ".log")

function L([string]$msg) {
  $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $msg"
  Add-Content -LiteralPath $log -Value $line
}

L "[autopush] start"

$docx = Join-Path $Root "CV_202605_MOON.docx"
$lockMarker = Join-Path $Root "~`$_202605_MOON.docx"

# Word's exclusive-edit marker — skip when user is actively editing.
if (Test-Path -LiteralPath $lockMarker) {
  L "[autopush] Word lock marker present; skip"
  return
}

# Probe file handle — Word may be mid-write right now.
try {
  $fs = [IO.File]::Open($docx, 'Open', 'Read', 'None')
  $fs.Close()
} catch {
  L "[autopush] docx file lock; skip and retry next cycle"
  return
}

& git fetch origin 2>&1 | Out-Null

# --- Always regenerate site-data and sanity-check parser output. ----------
# Rationale: docx mtime can lag actual edits (Word buffers saves) and the
# parser can race on a half-flushed file. Regenerating every cycle and
# verifying the publication count matches the docx's declared `(n = N)` is
# cheap insurance against silently-dropped entries (e.g. [57] CHAT-anchored
# was missed once on 2026-05-28 due to this exact race).
L "[autopush] regenerating site-data"
# Use the `py` launcher (-> Python311 with python-docx), not bare `python`:
# the hermes-agent venv now shadows `python` on PATH and lacks python-docx.
& py scripts/generate_site_data.py 2>&1 | ForEach-Object { L "[gen] $_" }
if ($LASTEXITCODE -ne 0) {
  L "[autopush] generate_site_data.py FAILED; abort"
  return
}

# Sanity check: parsed publication count must equal the (n = N) declared in
# the docx's "International and Peer-reviewed" header. If they disagree, the
# parser dropped an entry — abort so we never push a corrupted site.
$sanity = & py -c @"
import json, re, sys
from pathlib import Path
from docx import Document

doc = Document('CV_202605_MOON.docx')
paras = [p.text for p in doc.paragraphs if p.text.strip()]

def find_header_count(prefix):
    for p in paras:
        m = re.match(rf'{re.escape(prefix)}\s*[\[\(]n\s*=\s*(\d+)[\]\)]', p)
        if m:
            return int(m.group(1))
    return None

declared_intl = find_header_count('International and Peer-reviewed')
declared_wp_total = find_header_count('WORKING PAPERS')

data = json.loads(Path('assets/site-data.generated.json').read_text(encoding='utf-8'))
intl = sum(1 for r in data['completeJournalArticles'] if r['category'] == 'International')
wp_total = data['workingPaperSummary']['total']

print(f'intl declared={declared_intl} parsed={intl}; wp declared={declared_wp_total} parsed={wp_total}')
errors = []
if declared_intl is not None and intl != declared_intl:
    errors.append(f'International journals: declared {declared_intl} != parsed {intl}')
if declared_wp_total is not None and wp_total != declared_wp_total:
    errors.append(f'Working papers: declared {declared_wp_total} != parsed {wp_total}')
if errors:
    for e in errors: print(f'MISMATCH: {e}', file=sys.stderr)
    raise SystemExit(2)
"@ 2>&1
L "[sanity] $sanity"
if ($LASTEXITCODE -ne 0) {
  L "[autopush] SANITY CHECK FAILED -- parsed count != docx (n=N); not pushing"
  # Revert generated files so next run starts clean
  & git checkout -- assets/site-data.generated.json assets/site-data.js 2>&1 | Out-Null
  return
}

# --- Anything to commit? --------------------------------------------------
# Any of: docx changed, regenerated assets/site-data.* differ from HEAD.
& git add CV_202605_MOON.docx assets/site-data.generated.json assets/site-data.js 2>&1 | Out-Null

$staged = & git diff --cached --name-only
if (-not $staged) {
  L "[autopush] no diff vs HEAD; nothing to commit"
} else {
  $stagedList = ($staged -join ', ')
  L "[autopush] staged: $stagedList"
  $ts = Get-Date -Format 'yyyy-MM-dd HH:mm'
  $msg = "Update CV docx and regenerate site-data (autopush $ts)"
  & git commit -m $msg 2>&1 | ForEach-Object { L "[commit] $_" }
  if ($LASTEXITCODE -ne 0) {
    L "[autopush] commit failed; abort"
    return
  }
}

# --- Reconcile with remote without touching docx in working tree. ---------
# `merge -s ours` records origin/main as a parent but keeps OUR content
# verbatim (remote auto-regen commits are stale by construction).
$behind = (& git rev-list "HEAD..origin/main" --count) -as [int]
if ($behind -gt 0) {
  L "[autopush] $behind commit(s) behind origin/main; merging with -s ours"
  & git merge -s ours origin/main --no-edit 2>&1 | ForEach-Object { L "[merge] $_" }
  if ($LASTEXITCODE -ne 0) {
    L "[autopush] merge failed; aborting"
    & git merge --abort 2>&1 | Out-Null
    return
  }
}

# --- Push if ahead. -------------------------------------------------------
$ahead = (& git rev-list "origin/main..HEAD" --count) -as [int]
if ($ahead -le 0) {
  L "[autopush] nothing to push"
  return
}

& git push 2>&1 | ForEach-Object { L "[push] $_" }
if ($LASTEXITCODE -ne 0) {
  L "[autopush] push failed (will retry next cycle)"
  return
}

L "[autopush] SUCCESS ($ahead commit(s) pushed)"
