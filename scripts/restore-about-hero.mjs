/**
 * Restores marketingSplitHeroBlock on aboutPage (Andres Kase /andres-kase).
 *
 * - Converts existing aboutHeroBlock in sections[]
 * - Or maps legacy top-level `hero` field
 * - Or prepends DEFAULT_ABOUT_MARKETING_SPLIT_HERO snapshot
 *
 * Usage:
 *   node scripts/restore-about-hero.mjs
 *   node scripts/restore-about-hero.mjs --apply
 *   node scripts/restore-about-hero.mjs --apply --include-draft
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { ensureAboutPageHeroSections } from './lib/aboutHeroBlock.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

const apply = process.argv.includes('--apply')
const includeDraft = process.argv.includes('--include-draft')

function envStr(...keys) {
  for (const k of keys) {
    const v = process.env[k]
    if (v == null) continue
    const t = String(v).trim().replace(/^["']|["']$/g, '')
    if (t) return t
  }
  return ''
}

const token = envStr('SANITY_API_WRITE_TOKEN', 'SANITY_API_TOKEN', 'SANITY_AUTH_TOKEN')

const client = createClient({
  projectId: envStr('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID'),
  dataset: envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production',
  apiVersion: envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01',
  token,
  useCdn: false,
})

const IDS = includeDraft ? ['aboutPage', 'drafts.aboutPage'] : ['aboutPage']

for (const id of IDS) {
  const doc = await client.fetch(
    `*[_id == $id][0]{ _id, sections, hero }`,
    { id },
  )

  if (!doc) {
    console.log(`\n[${id}] not found`)
    continue
  }

  const types = (doc.sections ?? []).map((s) => s?._type).join(', ') || '(empty)'
  console.log(`\n[${doc._id}] sections: ${doc.sections?.length ?? 0}`)
  console.log(`  types: ${types}`)

  const result = ensureAboutPageHeroSections(doc.sections, doc.hero)
  console.log(`  action: ${result.reason}`)

  if (!result.changed) continue

  console.log(`  → new first block: ${result.sections[0]?._type}`)

  if (!apply) continue

  if (!token) {
    console.error('Set SANITY_API_TOKEN in .env.local to apply.')
    process.exit(1)
  }

  await client.patch(doc._id).set({ sections: result.sections }).commit({
    autoGenerateArrayKeys: true,
  })
  console.log(`  ✓ Patched ${doc._id}`)
}

if (!apply) {
  console.log('\nDry run. Pass --apply to patch. Use --include-draft to fix drafts.aboutPage too.')
}