/**
 * Inspect aboutPage sections[] — especially marketingSplitHeroBlock.
 * Usage: node scripts/inspect-about-hero.mjs
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

function envStr(...keys) {
  for (const k of keys) {
    const v = process.env[k]
    if (v == null) continue
    const t = String(v).trim().replace(/^["']|["']$/g, '')
    if (t) return t
  }
  return ''
}

const client = createClient({
  projectId: envStr('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID'),
  dataset: envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production',
  apiVersion: envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01',
  token: envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN', 'SANITY_API_WRITE_TOKEN'),
  useCdn: false,
})

const IDS = ['aboutPage', 'andresKasePage', 'drafts.aboutPage']

for (const id of IDS) {
  const doc = await client.fetch(
    `*[_id == $id][0]{
      _id,
      _type,
      title,
      "sectionCount": count(sections),
      "sectionTypes": sections[]._type,
      "heroBlocks": sections[_type in ["marketingSplitHeroBlock","aboutHeroBlock","homeHeroBlock"]],
      "legacyHero": hero
    }`,
    { id },
  )
  if (!doc) {
    console.log(`\n--- _id=${id}: NOT FOUND`)
    continue
  }
  console.log(`\n--- _id=${doc._id} (${doc._type})`)
  console.log(`title: ${doc.title}`)
  console.log(`sections: ${doc.sectionCount ?? 0}`)
  console.log(`types: ${(doc.sectionTypes ?? []).join(', ') || '(empty)'}`)
  console.log(`hero blocks in sections: ${JSON.stringify(doc.heroBlocks ?? [], null, 2)}`)
  console.log(`legacy hero field: ${doc.legacyHero ? 'present' : 'missing'}`)
}