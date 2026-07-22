/**
 * Full template cleanup helper — run when shell/node is available:
 *
 *   node scripts/template-cleanup.mjs
 *
 * 1) Deletes brand assets, content dumps, junk scripts
 * 2) Prints remaining brand-string grep-style scan of src/
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const filesToDelete = [
  // Block 1 — brand assets
  'public/opstar-brand-logo.webp',
  'public/opstar-logo-glass.png',
  'src/app/icon.png',
  'src/app/apple-icon.png',
  'public/andres-koolitus-1.png',
  'public/audiit-koolitus.png',
  'public/tootmisjuhtimise-koolitus.png',
  'public/img-20190214-122845-1-scaled-e1772987974307 (1).jpg',
  'public/img-20190214-122845-1-scaled-e1772987974307.jpg',
  'public/img-20190214-143143-scaled-e1772988026412.jpg',
  'public/downloads/tunnistus-op.png',
  'public/downloads/tunnistus2026.pdf',
  'public/downloads/9-paeva-programm.pdf',
  'public/partners/abb.png',
  'public/partners/cleveron.png',
  'public/partners/ensto.png',
  'public/partners/gren.png',
  'public/partners/incap.png',
  'public/partners/mistra-autex.png',
  'public/partners/mrpeasy.png',
  'public/partners/scanfil.png',
  'public/partners/wendre.png',
  'public/raiskamine.png',
  'public/kvaliteet.png',
  'public/kiirem-tarne.png',
  'public/opstar-profit.jpg',
  'public/audiit-engine.png',
  'public/fors-mwimg-1398-2-scaled-e1772981815450.jpg',
  'public/0e0548e698dbe7c084a623ab29cc5faf46e52ab1-1024x1024.avif',
  // Block 4 — content dumps
  'content.json',
  'sanity-home.json',
  'sanity-koolitus.json',
  'sanity-text-export.md',
  'posts-page1.json',
  'posts-page2.json',
  'testimonials.json',
  // Block 6 — junk
  'backup-before-painpoints.tar.gz',
  'log.txt',
  'test-schema.js',
  'convert-logo.js',
  'convert_pdf.py',
  'find_objects.js',
  'parse.js',
  'patch.js',
  'querySanity.js',
  'refactor.js',
  'restore.js',
  'update-logo-src.js',
  'update.js',
  'import-theses.mjs',
  'sanity-update-days.js',
  'apply-restore-koolitus-hero.ps1',
  'apply-strip-legacy.ps1',
  'restore-koolitus-hero.ps1',
  'run-count-sanity-attributes.bat',
  'run-sanity-fix.bat',
  'website-start.md',
  'docs/meta-copy.md',
  'public/auth.md',
  // Client one-off scripts (migration / scrape / WP import)
  'scripts/apply-seo.mjs',
  'scripts/compare-wp-vs-custom-covers.mjs',
  'scripts/fetch-prod-blog-covers.mjs',
  'scripts/fetchBlogiPosts.mjs',
  'scripts/fetchWpPosts.mjs',
  'scripts/import-posts.mjs',
  'scripts/match-custom-by-dimensions.mjs',
  'scripts/migrate-andres-profile.mjs',
  'scripts/migrate-standards.mjs',
  'scripts/migrate-wp-posts.mjs',
  'scripts/restore-about-hero.mjs',
  'scripts/restore-blog-covers.mjs',
  'scripts/scrapeTestimonials.mjs',
  'scripts/uploadData.mjs',
  'scripts/wp-library.txt',
  'scripts/wp-types.txt',
  'scripts/_block1-delete-assets.mjs',
  'sanity/schemas/mainPage.ts.backup',
  'sanity/schemas/koolitusPage.ts.backup',
  'sanity/schemas/koolitusPage.ts.broken',
  'sanity/schemas/opstarProfit.ts.backup',
  'sanity/schemas/mainPage.ts.backup',
]

const dirsToDelete = [
  'public/partners',
  'public/downloads',
  'scratch',
  'doc/RVAE',
  'doc/scrshts',
  'doc/tmp',
  // One-off client migration tooling (keep this cleanup script only)
  'scripts/data',
  'scripts/lib',
]

const patterns = [
  /Opstar/i,
  /OPSTAR/,
  /Andres Kase/i,
  /Andres/,
  /tootmisjuhtimine/i,
  /andreskase\.ee/i,
  /opstar\.ee/i,
  /\+372\s*51\s*38\s*403/,
  /\+3725138403/,
  /andreskase@/,
  /andres@tootmisjuhtimine/,
  /andres@kase/,
]

function rm(rel) {
  const abs = path.join(root, rel)
  if (!fs.existsSync(abs)) return { rel, status: 'missing' }
  const stat = fs.statSync(abs)
  if (stat.isDirectory()) {
    fs.rmSync(abs, { recursive: true, force: true })
    return { rel, status: 'deleted-dir' }
  }
  fs.unlinkSync(abs)
  return { rel, status: 'deleted-file' }
}

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.(ts|tsx|js|jsx|mjs|md|txt|json|css)$/i.test(entry.name)) out.push(full)
  }
  return out
}

const results = { deleted: [], missing: [], errors: [], scanHits: [] }

for (const rel of filesToDelete) {
  try {
    const r = rm(rel)
    if (r.status === 'missing') results.missing.push(rel)
    else results.deleted.push(r)
  } catch (e) {
    results.errors.push(`${rel}: ${e.message}`)
  }
}

for (const rel of dirsToDelete) {
  try {
    const r = rm(rel)
    if (r.status === 'missing') results.missing.push(rel)
    else results.deleted.push(r)
  } catch (e) {
    results.errors.push(`${rel}: ${e.message}`)
  }
}

// Demo testimonials placeholder (optional leave for CMS seed)
const demoTestimonials = path.join(root, 'testimonials.demo.json')
fs.writeFileSync(
  demoTestimonials,
  JSON.stringify(
    [
      {
        name: 'Alex M.',
        role: 'Operations Manager',
        company: 'Example Manufacturing OÜ',
        quote: 'Clear process, measurable results, and a team that actually implements change.',
      },
      {
        name: 'Jordan K.',
        role: 'Plant Director',
        company: 'Demo Industry AS',
        quote: 'Practical training we could apply the next day on the shop floor.',
      },
    ],
    null,
    2,
  ),
)

// Scan remaining brand strings (excluding doc/rebranding prompt itself)
const files = walk(root)
for (const file of files) {
  const rel = path.relative(root, file).replace(/\\/g, '/')
  if (rel.startsWith('doc/rebranding/')) continue
  if (rel === 'scripts/template-cleanup.mjs') continue
  if (rel === 'scripts/_block1-delete-assets.mjs') continue
  let text
  try {
    text = fs.readFileSync(file, 'utf8')
  } catch {
    continue
  }
  for (const re of patterns) {
    if (re.test(text)) {
      results.scanHits.push({ file: rel, pattern: String(re) })
      break
    }
  }
}

console.log(JSON.stringify(results, null, 2))
console.log(`\nDeleted: ${results.deleted.length}, missing: ${results.missing.length}, errors: ${results.errors.length}, scan hits: ${results.scanHits.length}`)
