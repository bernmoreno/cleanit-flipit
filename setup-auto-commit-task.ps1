# ============================================================
#  Setup Auto-Commit as a Windows Scheduled Task
#  Run this ONCE (as Administrator) to register the watcher
#  so it starts automatically at Windows login — no VS Code needed.
#
#  Usage:  Right-click -> "Run with PowerShell" (as Admin)
#       OR: powershell -ExecutionPolicy Bypass -File setup-auto-commit-task.ps1
# ============================================================

$TaskName   = "CleanItFlipIt-AutoCommit"
$ScriptPath = Join-Path $PSScriptRoot "auto-commit.ps1"
$PwshExe    = "powershell.exe"

# Remove existing task if it exists
if (Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue) {
    Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    Write-Host "Removed old task: $TaskName" -ForegroundColor Yellow
}

$action  = New-ScheduledTaskAction `
    -Execute $PwshExe `
    -Argument "-WindowStyle Hidden -ExecutionPolicy Bypass -File `"$ScriptPath`""

# Trigger: run at every user log on
$trigger = New-ScheduledTaskTrigger -AtLogOn

# Run as current user, no elevation required (git credentials stored in Windows Credential Manager)
$principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Limited

$settings = New-ScheduledTaskSettingsSet `
    -ExecutionTimeLimit (New-TimeSpan -Hours 0) `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1) `
    -StartWhenAvailable

Register-ScheduledTask `
    -TaskName  $TaskName `
    -Action    $action `
    -Trigger   $trigger `
    -Principal $principal `
    -Settings  $settings `
    -Description "Auto-commit & push cleanit-flipit changes to GitHub" | Out-Null

Write-Host ""
Write-Host "SUCCESS: Scheduled task '$TaskName' registered." -ForegroundColor Green
Write-Host "The watcher will start automatically at every Windows login." -ForegroundColor Green
Write-Host ""
Write-Host "To start it right now (without rebooting), run:" -ForegroundColor Cyan
Write-Host "   Start-ScheduledTask -TaskName '$TaskName'" -ForegroundColor White
Write-Host ""
Write-Host "To stop / remove the task:" -ForegroundColor Cyan
Write-Host "   Stop-ScheduledTask  -TaskName '$TaskName'" -ForegroundColor White
Write-Host "   Unregister-ScheduledTask -TaskName '$TaskName' -Confirm:`$false" -ForegroundColor White

# Start it immediately
$start = Read-Host "`nStart the watcher now? (Y/N)"
if ($start -match '^[Yy]') {
    Start-ScheduledTask -TaskName $TaskName
    Write-Host "Watcher started." -ForegroundColor Green
}
