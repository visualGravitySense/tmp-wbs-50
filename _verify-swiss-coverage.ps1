# Swiss theme class coverage verification + build + git
Set-Location $PSScriptRoot
$ErrorActionPreference = 'Continue'

Write-Output "=== CLASS COUNTS (theme-swiss.css) ==="
$classes = @(
  'site-hero-cta','site-hero-overlay','site-hero','site-hero-quick-facts','site-hero-diagram',
  'chat-panel-container','chat-panel-glow','chat-message-bubble','chat-bubble-btn','chat-message-input','chat-send-btn','chat-welcome-icon-box',
  'challenges-card','challenges-badge','challenges-dot',
  'blog-article-prose','blog-article-h2','blog-article-h3','blog-article-h4','blog-article-figure','blog-article-display','ak-h1'
)
foreach ($c in $classes) {
  $count = (Select-String -Path 'src\styles\theme-swiss.css' -Pattern $c -AllMatches).Matches.Count
  Write-Output "$c : $count"
}

Write-Output ""
Write-Output "=== npm run build ==="
npm run build
$buildExit = $LASTEXITCODE
Write-Output "BUILD_EXIT=$buildExit"

Write-Output ""
Write-Output "=== git branch / commit ==="
git checkout template/clean 2>&1
if ($LASTEXITCODE -ne 0) {
  git checkout -b template/clean 2>&1
}
# Stage Swiss gap-closure (theme + hooks + TODO)
git add `
  src/styles/theme-swiss.css `
  src/components/sections/Hero.tsx `
  src/components/HeroCtaButtons.tsx `
  src/components/HeroFeatureCards.tsx `
  src/components/HeroStatsGridClient.tsx `
  src/components/HeroGlobalStatsStrip.tsx `
  src/components/about/AboutSplitHero.tsx `
  src/components/page-builder/kontakt/KontaktHero.tsx `
  src/components/page-builder/renderMarketingSplitHeroBlock.tsx `
  src/components/KoolitusHeroQuickFacts.tsx `
  src/components/OpstarProfitHeroDiagram.tsx `
  doc/rebranding/TODO-rename-FloatingContactAndres.md `
  _verify-swiss-coverage.ps1 `
  2>&1
git add -u src/components src/styles doc/rebranding 2>&1
git status -sb
git commit -m "swiss minimalism coverage: hero chat challenges blog" 2>&1
git push -u origin template/clean 2>&1

Write-Output ""
Write-Output "=== git log --oneline -3 ==="
git log --oneline -3

Write-Output ""
Write-Output "=== git diff --stat 5b4bcab..HEAD ==="
git rev-parse --verify 5b4bcab 2>$null
if ($LASTEXITCODE -eq 0) {
  git diff --stat 5b4bcab..HEAD
} else {
  git log --oneline -10
  git status
}

Write-Output ""
Write-Output "=== git status -sb ==="
git status -sb
