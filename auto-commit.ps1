# ============================================================
#  Clean It Flip It — Auto Commit & Push to GitHub
#  Watches the project folder for file changes and
#  automatically commits + pushes to origin/master.
#
#  Run manually:  powershell -ExecutionPolicy Bypass -File auto-commit.ps1
#  Or register as a startup task with:  .\setup-auto-commit-task.ps1
# ============================================================

param(
    [string]$ProjectPath = $PSScriptRoot,
    [string]$Branch      = "master",
    [int]$DebounceSeconds = 10   # wait this long after last change before committing
)

Set-Location $ProjectPath
Write-Host "$(Get-Date -f 'HH:mm:ss') Auto-commit watcher started for: $ProjectPath" -ForegroundColor Cyan
Write-Host "$(Get-Date -f 'HH:mm:ss') Watching for changes... (Ctrl+C to stop)" -ForegroundColor Cyan

# ----- File System Watcher ----------------------------------
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path                  = $ProjectPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents   = $true
$watcher.NotifyFilter          = [System.IO.NotifyFilters]::LastWrite `
                               -bor [System.IO.NotifyFilters]::FileName `
                               -bor [System.IO.NotifyFilters]::DirectoryName

# Ignore git internals and OS noise
$ignorePatterns = @('.git', 'auto-commit.ps1', '.gitignore', 'Thumbs.db', 'desktop.ini')

$pendingCommit = $false
$lastChangeTime = [DateTime]::MinValue

$action = {
    $path = $Event.SourceEventArgs.FullPath
    # Skip ignored paths
    foreach ($pat in $ignorePatterns) {
        if ($path -like "*$pat*") { return }
    }
    $script:pendingCommit  = $true
    $script:lastChangeTime = Get-Date
}

Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null
Register-ObjectEvent $watcher Renamed -Action $action | Out-Null

# ----- Commit function --------------------------------------
function Invoke-AutoCommit {
    Set-Location $ProjectPath

    $status = git status --porcelain 2>&1
    if (-not $status) {
        Write-Host "$(Get-Date -f 'HH:mm:ss') No changes to commit." -ForegroundColor DarkGray
        return
    }

    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $msg       = "Auto-commit: $timestamp"

    git add -A 2>&1 | Out-Null

    $commitOut = git commit -m $msg 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "$(Get-Date -f 'HH:mm:ss') Commit skipped (nothing new)." -ForegroundColor DarkGray
        return
    }

    Write-Host "$(Get-Date -f 'HH:mm:ss') Committed: $msg" -ForegroundColor Green

    $pushOut = git push origin $Branch 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "$(Get-Date -f 'HH:mm:ss') Pushed to GitHub successfully." -ForegroundColor Green
    } else {
        Write-Host "$(Get-Date -f 'HH:mm:ss') Push failed. Will retry next change." -ForegroundColor Yellow
        Write-Host $pushOut -ForegroundColor Yellow
    }
}

# ----- Main loop --------------------------------------------
try {
    while ($true) {
        Start-Sleep -Seconds 2

        if ($pendingCommit) {
            $elapsed = (Get-Date) - $lastChangeTime
            if ($elapsed.TotalSeconds -ge $DebounceSeconds) {
                $pendingCommit = $false
                Invoke-AutoCommit
            }
        }
    }
} finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Get-EventSubscriber | Unregister-Event
    Write-Host "$(Get-Date -f 'HH:mm:ss') Watcher stopped." -ForegroundColor Cyan
}
