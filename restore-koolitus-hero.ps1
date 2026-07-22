# Restores marketingSplitHeroBlock on koolitusPage.sections[]
param([switch]$DryRun)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
& node scripts/restore-koolitus-hero.mjs $(if ($DryRun) { } else { '--apply' })