param(
  [string]$TaskName = "JewoongCvBiweeklyUpdate",
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,
  [string]$StartTime = "09:00"
)

$ErrorActionPreference = "Stop"

$updateScript = Join-Path $Root "scripts\cv_biweekly_update.ps1"
if (-not (Test-Path -LiteralPath $updateScript)) {
  throw "Missing update script: $updateScript"
}

$taskCommand = "powershell.exe"
$taskArgs = "-NoProfile -ExecutionPolicy Bypass -File `"$updateScript`" -Root `"$Root`""

schtasks.exe /Create /TN $TaskName /SC DAILY /MO 14 /ST $StartTime /TR "`"$taskCommand`" $taskArgs" /F | Out-String

Write-Output "Registered scheduled task '$TaskName' to run every 14 days at $StartTime."
