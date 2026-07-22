# Commit + push Get in Touch footer variant (run when shell works)
Set-Location $PSScriptRoot
$ErrorActionPreference = 'Stop'

Write-Output "=== grep footerVariant ==="
Select-String -Path 'sanity\schemas\siteSettings.ts' -Pattern 'footerVariant'

Write-Output "`n=== npm run build ==="
npm run build
if ($LASTEXITCODE -ne 0) { throw "build failed" }

git checkout template/clean 2>$null
git add `
  sanity/schemas/siteSettings.ts `
  sanity/schemas/objects/footer.ts `
  src/components/FooterContactForm.tsx `
  src/components/SiteChrome.tsx `
  src/components/Footer.tsx `
  src/app/layout.tsx `
  src/lib/sanity.ts `
  src/types/sanity.ts `
  src/app/globals.css `
  src/styles/theme-swiss.css `
  _commit-footer-variant.ps1

git status -sb
git commit -m "feat(footer): layout.footerVariant + Get in Touch contact form footer"
git push -u origin template/clean

Write-Output "`n=== git log --oneline -3 ==="
git log --oneline -3
Write-Output "`n=== git status -sb ==="
git status -sb
