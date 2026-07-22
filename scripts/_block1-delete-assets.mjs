/**
 * Block 1 — delete brand/personal static assets.
 * Run: node scripts/_block1-delete-assets.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const files = [
  'public/opstar-brand-logo.webp',
  'public/opstar-logo-glass.png',
  'src/app/icon.png',
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
]

const dirsToRemoveIfEmpty = ['public/partners', 'public/downloads']

const deleted = []
const missing = []
const errors = []

for (const rel of files) {
  const abs = path.join(root, rel)
  try {
    if (fs.existsSync(abs)) {
      fs.unlinkSync(abs)
      deleted.push(rel)
    } else {
      missing.push(rel)
    }
  } catch (e) {
    errors.push(`${rel}: ${e.message}`)
  }
}

for (const rel of dirsToRemoveIfEmpty) {
  const abs = path.join(root, rel)
  try {
    if (fs.existsSync(abs) && fs.readdirSync(abs).length === 0) {
      fs.rmdirSync(abs)
      deleted.push(`${rel}/ (empty dir)`)
    }
  } catch (e) {
    errors.push(`${rel}/: ${e.message}`)
  }
}

console.log(JSON.stringify({ deleted, missing, errors }, null, 2))
