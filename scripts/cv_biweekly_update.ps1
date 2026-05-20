param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"

Set-Location -LiteralPath $Root

$logDir = Join-Path $Root "logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$logPath = Join-Path $logDir "cv-update-$stamp.log"

function Write-RunLog {
  param([string]$Message)
  $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') $Message"
  $line | Tee-Object -FilePath $logPath -Append
}

Write-RunLog "[cv-update] Starting full CV refresh in $Root"

try {
  $npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
  if (-not $npm) {
    $npm = Get-Command npm -ErrorAction Stop
  }

  & $npm.Source run site:update:playwright 2>&1 | Tee-Object -FilePath $logPath -Append
  if ($LASTEXITCODE -ne 0) {
    throw "npm run site:update:playwright exited with code $LASTEXITCODE"
  }

  Write-RunLog "[cv-update] Completed full CV, Scholar, OpenAlex, and abstract refresh"
} catch {
  Write-RunLog "[cv-update] FAILED: $($_.Exception.Message)"
  throw
}
