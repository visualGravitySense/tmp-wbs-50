# One-shot: strip duplicate legacy fields from Sanity page documents.
# Usage: powershell -ExecutionPolicy Bypass -File apply-strip-legacy.ps1
#        powershell -ExecutionPolicy Bypass -File apply-strip-legacy.ps1 -DryRun

param([switch]$DryRun)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

function Read-DotEnv($path) {
  $vars = @{}
  if (-not (Test-Path $path)) { return $vars }
  Get-Content $path | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -notmatch '=') { return }
    $k, $v = $_ -split '=', 2
    $vars[$k.Trim()] = $v.Trim().Trim('"')
  }
  $vars
}

$envVars = Read-DotEnv '.env.local'
foreach ($k in (Read-DotEnv '.env').Keys) {
  if (-not $envVars.ContainsKey($k)) { $envVars[$k] = (Read-DotEnv '.env')[$k] }
}

$projectId = $envVars['NEXT_PUBLIC_SANITY_PROJECT_ID']
$dataset = $envVars['NEXT_PUBLIC_SANITY_DATASET']
$apiVersion = if ($envVars['NEXT_PUBLIC_SANITY_API_VERSION']) { $envVars['NEXT_PUBLIC_SANITY_API_VERSION'] } else { '2024-01-01' }
$token = $envVars['SANITY_API_WRITE_TOKEN']
if (-not $token) { $token = $envVars['SANITY_API_TOKEN'] }
if (-not $token) { $token = $envVars['SANITY_AUTH_TOKEN'] }

if (-not $projectId -or -not $dataset -or -not $token) {
  Write-Error 'Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or write token in .env'
}

$legacyMap = @{
  mainPage = @(
    'eyebrow','headline','scriptHeadline','subtitle','description','primaryCta','secondaryCta',
    'socialProof','stats','features','featuredReviews','seoConversionSection','challenges',
    'nineDaysProgram','aboutAndres','beforeAfter','grantSection','photoMarquee','pricingSection',
    'finalCTA','quiz','helpFormTeaser','nineDaysMini','partnersTitle','partners','testimonials'
  )
  koolitusPage = @(
    'hero','audienceSection','nineDaysProgram','featuresSection','buildingsSection','leanHouseSection',
    'investmentSection','leadFormTeaser','cohortsSection','certificateSection','pricesSection',
    'featuredReviews','testimonialsSection','kkk','kkkDocument','ctaSection','contactSection','finalCTA'
  )
  opstarProfit = @(
    'featuredReviews','orbitBlockRef','comparisonPartnerLogos','hero','contentSections','comparison',
    'kolmSammast','framework','eightComponents','leanVsOpstar','meodetavadTulemused','cases',
    'arvamused','kkk','cta'
  )
  aboutPage = @(
    'featuredReviews','hero','quoteSection','aboutSection','experienceSection','guaranteeSection',
    'ctaSection','keyAchievements','worldManufacturingVisits','expertise','testimonialsSection',
    'testimonials','services','kkkDocument','kkk','contactSection'
  )
  kontaktPage = @(
    'richText','hero','quickContact','messageForm','andresBlock','opstarBlock','servicesSection','legalNote'
  )
}

$headers = @{
  Authorization = "Bearer $token"
  'Content-Type' = 'application/json'
}

function Invoke-SanityQuery($query) {
  $encoded = [uri]::EscapeDataString($query)
  $url = "https://$projectId.api.sanity.io/v$apiVersion/data/query/$dataset`?query=$encoded"
  (Invoke-RestMethod -Uri $url -Headers $headers -Method Get).result
}

function Invoke-SanityMutate($mutations) {
  $url = "https://$projectId.api.sanity.io/v$apiVersion/data/mutate/$dataset"
  $body = @{ mutations = $mutations } | ConvertTo-Json -Depth 20
  Invoke-RestMethod -Uri $url -Headers $headers -Method Post -Body $body
}

function Test-HasValue($value) {
  if ($null -eq $value) { return $false }
  if ($value -is [System.Array]) { return $value.Count -gt 0 }
  if ($value -is [pscustomobject] -or $value -is [hashtable]) {
    return @($value.PSObject.Properties).Count -gt 0
  }
  return [string]$value -ne ''
}

Write-Host "Dataset: $dataset"
Write-Host "Mode: $(if ($DryRun) { 'dry-run' } else { 'APPLY' })"
Write-Host ''

$patched = 0

foreach ($type in $legacyMap.Keys) {
  $docs = Invoke-SanityQuery "*[_type == `"$type`"]{ _id }"
  foreach ($docMeta in $docs) {
    $id = $docMeta._id
    $doc = Invoke-SanityQuery "*[_id == `"$id`"][0]"
    $sectionCount = if ($doc.sections) { @($doc.sections).Count } else { 0 }
    $toUnset = @()
    foreach ($field in $legacyMap[$type]) {
      if (Test-HasValue $doc.$field) { $toUnset += $field }
    }

    if ($toUnset.Count -eq 0) {
      Write-Host "$id : no legacy fields to remove ($sectionCount sections)"
      continue
    }
    if ($sectionCount -eq 0) {
      Write-Host "$id : SKIP — sections[] empty ($($toUnset.Count) legacy fields kept)"
      continue
    }

    Write-Host "$id ($type) — unset $($toUnset.Count) fields, sections=$sectionCount"
    Write-Host "  $($toUnset -join ', ')"

    if (-not $DryRun) {
      Invoke-SanityMutate @(@{ patch = @{ id = $id; unset = $toUnset } })
      Write-Host '  patched'
      $patched++
    }
  }
}

Write-Host ''
if ($DryRun) {
  Write-Host 'Dry run complete. Re-run without -DryRun to apply.'
} else {
  Write-Host "Patched $patched document(s). Re-open Sanity Studio and publish."
}