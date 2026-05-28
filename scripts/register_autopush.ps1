$ErrorActionPreference = "Stop"

$taskName = "JewoongCvAutoPush"
$scriptPath = "C:\Users\jewoo\Desktop\cv\scripts\cv_autopush.ps1"

if (-not (Test-Path -LiteralPath $scriptPath)) {
  throw "Watcher script not found: $scriptPath"
}

# Delete prior task if any (ignore failure). 2>&1 on native exes in PS 5.1
# wraps stderr as terminating errors, so call directly and swallow exit.
$ErrorActionPreference = "Continue"
& schtasks.exe /Delete /TN $taskName /F *> $null
$ErrorActionPreference = "Stop"

# Register via schtasks.exe — same toolchain as JewoongCvBiweeklyUpdate.
# Trigger: every 2 days at 09:00, runs as current interactive user.
$cmd = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""
$startTime = "09:00"

& schtasks.exe /Create `
  /TN $taskName `
  /TR $cmd `
  /SC DAILY `
  /MO 2 `
  /ST $startTime `
  /RL LIMITED `
  /F

if ($LASTEXITCODE -ne 0) {
  throw "schtasks /Create failed with exit code $LASTEXITCODE"
}

Write-Host ""
Write-Host "Registered scheduled task: $taskName"
Write-Host "Schedule: every 2 days at $startTime"
Write-Host "Script: $scriptPath"
Write-Host ""
Write-Host "Inspect:  schtasks /Query /TN $taskName /V /FO LIST"
Write-Host "Run now:  schtasks /Run /TN $taskName"
Write-Host "Disable:  schtasks /Change /TN $taskName /DISABLE"
Write-Host "Delete:   schtasks /Delete /TN $taskName /F"
