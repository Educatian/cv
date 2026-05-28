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

# Word's exclusive-edit marker — if present, user is actively editing; skip.
if (Test-Path -LiteralPath $lockMarker) {
  L "[autopush] Word lock marker present; skip"
  return
}

# Probe file accessibility — Word may be mid-write right now.
try {
  $fs = [IO.File]::Open($docx, 'Open', 'Read', 'None')
  $fs.Close()
} catch {
  L "[autopush] docx file lock; skip and retry next cycle"
  return
}

& git fetch origin 2>&1 | Out-Null

# If docx differs from HEAD, regenerate site-data so our commit carries both.
$docxDirty = & git status --porcelain -- CV_202605_MOON.docx
if ($docxDirty) {
  L "[autopush] docx modified vs HEAD -> regenerating site-data"
  & python scripts/generate_site_data.py 2>&1 | ForEach-Object { L "[gen] $_" }
  if ($LASTEXITCODE -ne 0) {
    L "[autopush] generate_site_data.py FAILED; abort"
    return
  }
}

# Stage anything dirty in our tracked set.
& git add CV_202605_MOON.docx assets/site-data.generated.json assets/site-data.js 2>&1 | Out-Null

$staged = & git diff --cached --name-only
if ($staged) {
  $ts = Get-Date -Format 'yyyy-MM-dd HH:mm'
  $msg = "Update CV docx and regenerate site-data (autopush $ts)"
  & git commit -m $msg 2>&1 | ForEach-Object { L "[commit] $_" }
  if ($LASTEXITCODE -ne 0) {
    L "[autopush] commit failed; abort"
    return
  }
}

# Reconcile with remote without touching docx in working tree.
# `merge -s ours` records origin/main as a second parent but keeps OUR content
# verbatim (we are authoritative; remote auto-regens are stale by construction).
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

# Nothing to push?
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
