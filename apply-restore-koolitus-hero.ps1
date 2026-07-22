# Inserts marketingSplitHeroBlock at the start of koolitusPage.sections via Sanity API.
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

$headers = @{
  Authorization = "Bearer $token"
  'Content-Type' = 'application/json'
}

$q = '*[_id == "koolitusPage"][0]{ "hasHero": count(sections[_type == "marketingSplitHeroBlock"]), "sc": count(sections) }'
$encoded = [uri]::EscapeDataString($q)
$checkUrl = "https://$projectId.api.sanity.io/v$apiVersion/data/query/$dataset`?query=$encoded"
$check = (Invoke-RestMethod -Uri $checkUrl -Headers $headers -Method Get).result

Write-Host "Before: sections=$($check.sc), hero blocks=$($check.hasHero)"

if ($check.hasHero -gt 0) {
  Write-Host 'Hero already present — nothing to do.'
  exit 0
}

$heroBlock = @{
  _type = 'marketingSplitHeroBlock'
  _key = 'restore-koolitus-hero'
  eyebrow = 'OPSTAR PROFIT™ • PRAKTILINE KOOLITUS'
  headline = '9 päeva. Üks süsteem'
  scriptHeadline = 'Tootmisjuhtimise arenguprogramm'
  description = '9-päevane praktiline arenguprogramm, mis ühendab LEAN-i põhimõtted, süsteemse inimkeskse juhtimise ja sinu ettevõtte reaalse parendusprojekti. Kasva teadlikuks juhiks, tipptasemel spetsialistiks või tulemuslikuks meeskonnaliikmeks.'
  rightComponentType = 'quickFacts'
  isVisible = $true
  hideFromScrollNav = $false
  navLabel = 'Hero'
  primaryCta = @{
    text = 'Registreeru'
    link = @{
      _type = 'link'
      linkType = 'external'
      url = 'https://andres-kase-tootmisjuhtimine.vercel.app/koolitus#pricing'
    }
  }
  secondaryCta = @{
    text = 'Loe tagasisidet'
    link = @{
      _type = 'link'
      linkType = 'internal'
      reference = @{ _type = 'reference'; _ref = 'testimonialsPage' }
    }
  }
  quickFactsCard = @{
    durationPill = 'Faktid'
    eyebrow = 'Arenguprogrammi lühiülevaade'
    priceText = '12. grupp alustab | Sügis 2026'
    subsidyText = 'Registreerimine avatud'
    title = 'Praktiline korraldus ja programmi sisu:'
    rows = @(
      @{ _key = 'qf1'; icon = 'calendarDays'; label = 'Kuidas õpid?'; value = '9 neljapäeva 4 kuu jooksul'; hint = 'Õpid neljapäeval, kavandad reedel ja juurutad enne järgmist kohtumist.' },
      @{ _key = 'qf2'; icon = 'users'; label = 'Kellega õpid?'; value = 'Kuni 16 osalejat'; hint = 'Võimaldab kogemuste jagamist, sisukaid arutelusid ja personaalset tuge.' },
      @{ _key = 'qf3'; icon = 'clock'; label = 'Mida lahendad?'; value = 'Oma ettevõtte parendusprojekti'; hint = 'Lahendad päris väljakutse oma ettevõttes ja rakendad õpitut kohe praktikas.' },
      @{ _key = 'qf4'; icon = 'award'; label = 'Mida omandad?'; value = 'LEAN-juhtimise ja OPSTAR PROFIT™ raamistiku'; hint = 'Õpid tundma nii LEAN juhtimist kui ka süsteemse juhtimise põhiaspekte' },
      @{ _key = 'qf5'; icon = 'mapPin'; label = 'Kus õppimine toimub?'; value = 'Viljandi linnas'; hint = 'Seminarid Viljandis, õppekäigud Eesti tootmisettevõtetesse.' },
      @{ _key = 'qf6'; icon = 'calendarDays'; label = 'Aga peale koolitust?'; value = '3–12 kuud järelmentorlust'; hint = 'Jätkad õpituga. Soovi korral personaalne tugi ka pärast programmi lõppu.' }
    )
  }
}

$mutateUrl = "https://$projectId.api.sanity.io/v$apiVersion/data/mutate/$dataset"
$body = @{
  mutations = @(
    @{
      patch = @{
        id = 'koolitusPage'
        insert = @{
          before = 'sections[0]'
          items = @($heroBlock)
        }
      }
    }
  )
} | ConvertTo-Json -Depth 20

$result = Invoke-RestMethod -Uri $mutateUrl -Headers $headers -Method Post -Body $body
Write-Host 'Mutate OK. Transaction:' $result.transactionId

$after = (Invoke-RestMethod -Uri $checkUrl -Headers $headers -Method Get).result
Write-Host "After: sections=$($after.sc), hero blocks=$($after.hasHero)"
Write-Host 'Publish koolitusPage in Sanity Studio.'