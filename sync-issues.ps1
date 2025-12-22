# GitHub Issues Sync Script
# Syncs local issues.md with GitHub Issues for powerponypatrol/smart-meal-planner

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('list', 'create', 'help')]
    [string]$Action = 'list'
)

$repo = "powerponypatrol/smart-meal-planner"

function Show-Help {
    Write-Host @"
GitHub Issues Sync Script
========================

Usage:
  .\sync-issues.ps1 [action]

Actions:
  list     - List all open issues from GitHub (default)
  create   - Create a new issue on GitHub
  help     - Show this help message

Examples:
  .\sync-issues.ps1 list
  .\sync-issues.ps1 create

Note: You need GitHub CLI (gh) installed to use this script.
Install from: https://cli.github.com/

"@
}

function Test-GitHubCLI {
    try {
        $null = gh --version
        return $true
    } catch {
        Write-Host "❌ GitHub CLI (gh) is not installed." -ForegroundColor Red
        Write-Host "Install from: https://cli.github.com/" -ForegroundColor Yellow
        Write-Host "Or use: winget install --id GitHub.cli" -ForegroundColor Yellow
        return $false
    }
}

function Get-GitHubIssues {
    Write-Host "📋 Fetching issues from GitHub..." -ForegroundColor Cyan
    
    $issues = gh issue list --repo $repo --json number,title,state,labels,body --limit 100 | ConvertFrom-Json
    
    if ($issues.Count -eq 0) {
        Write-Host "No issues found in the repository." -ForegroundColor Yellow
        return
    }
    
    Write-Host "`n=== Open Issues ===" -ForegroundColor Green
    foreach ($issue in $issues) {
        $labels = ($issue.labels | ForEach-Object { $_.name }) -join ", "
        Write-Host "`n#$($issue.number): $($issue.title)" -ForegroundColor White
        if ($labels) {
            Write-Host "  Labels: $labels" -ForegroundColor Gray
        }
        if ($issue.body) {
            $preview = ($issue.body -split "`n")[0]
            if ($preview.Length -gt 80) {
                $preview = $preview.Substring(0, 80) + "..."
            }
            Write-Host "  $preview" -ForegroundColor Gray
        }
    }
    
    Write-Host "`n✅ Total: $($issues.Count) issues" -ForegroundColor Green
}

function New-GitHubIssue {
    Write-Host "📝 Create New GitHub Issue" -ForegroundColor Cyan
    Write-Host "=========================" -ForegroundColor Cyan
    
    $title = Read-Host "`nIssue Title"
    if (-not $title) {
        Write-Host "Title is required!" -ForegroundColor Red
        return
    }
    
    $description = Read-Host "Description (optional)"
    
    Write-Host "`nSelect Issue Type:"
    Write-Host "1. 🐛 Bug"
    Write-Host "2. ✨ Feature Request"
    Write-Host "3. 🔧 Enhancement"
    Write-Host "4. 📝 Other"
    
    $type = Read-Host "Choice (1-4)"
    
    $label = switch ($type) {
        "1" { "bug" }
        "2" { "enhancement" }
        "3" { "enhancement" }
        default { "" }
    }
    
    Write-Host "`nCreating issue..." -ForegroundColor Yellow
    
    $params = @("issue", "create", "--repo", $repo, "--title", $title)
    
    if ($description) {
        $params += @("--body", $description)
    }
    
    if ($label) {
        $params += @("--label", $label)
    }
    
    $result = & gh $params
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Issue created successfully!" -ForegroundColor Green
        Write-Host $result
    } else {
        Write-Host "❌ Failed to create issue." -ForegroundColor Red
    }
}

# Main script execution
if (-not (Test-GitHubCLI)) {
    exit 1
}

switch ($Action) {
    'list' {
        Get-GitHubIssues
    }
    'create' {
        New-GitHubIssue
    }
    'help' {
        Show-Help
    }
}
