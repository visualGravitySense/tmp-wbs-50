/**
 * List all `_type` values in page document sections[].
 * Usage: node scripts/inspect-section-types.mjs
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

const PAGE_TYPES = [
  'mainPage',
  'koolitusPage',
  'aboutPage',
  'opstarProfit',
  'kontaktPage',
  'blogPage',
  'galleryPage',
]

const LEGACY_TYPES = new Set([
  'aboutHeroBlock',
  'koolitusHeroBlock',
  'homeChallengesBlock',
  'painBlock',
  'koolitusAudienceBlock',
  'opstarKoImSammastBlock',
])

const CANONICAL_IDS = {
  mainPage: 'mainPage',
  koolitusPage: 'koolitusPage',
  aboutPage: 'aboutPage',
  opstarProfit: 'opstarProfit',
  kontaktPage: 'kontaktPage',
  blogPage: 'blogPage',
  galleryPage: 'galleryPage',
}

const docs = await client.fetch(
  `*[_type in $types]{
    _id,
    _type,
    "title": coalesce(title, _id),
    "sectionCount": count(sections),
    "sectionTypes": sections[]._type,
    "hasSplitHero": count(sections[_type == "marketingSplitHeroBlock"]) > 0,
    "hasLegacyFieldHero": defined(hero),
    "heroHeadline": hero.headline
  } | order(_type asc, _id asc)`,
  { types: PAGE_TYPES },
)

console.log(`Dataset: ${client.config().dataset}`)
console.log(`Project: ${client.config().projectId}\n`)

for (const doc of docs) {
  const legacy = (doc.sectionTypes ?? []).filter((t) => LEGACY_TYPES.has(t))
  const canonicalId = CANONICAL_IDS[doc._type]
  const isCanonical = canonicalId ? doc._id === canonicalId : null
  console.log(`── ${doc.title} (${doc._type})`)
  console.log(`   _id: ${doc._id}${isCanonical === true ? ' ✓ canonical' : isCanonical === false ? ' ⚠ DUPLICATE (not served by site)' : ''}`)
  console.log(`   sections: ${doc.sectionCount ?? 0}`)
  console.log(`   types: ${(doc.sectionTypes ?? []).join(', ') || '(empty)'}`)
  if (legacy.length) console.log(`   ⚠ legacy blocks: ${legacy.join(', ')}`)
  console.log(`   marketingSplitHeroBlock: ${doc.hasSplitHero ? 'yes' : 'no'}`)
  console.log(`   legacy hero field: ${doc.hasLegacyFieldHero ? doc.heroHeadline ?? '(set)' : 'no'}`)
  console.log()
}

const unknown = await client.fetch(
  `*[_type in $types && defined(sections)]{
    _type,
    "unknown": sections[]._type
  }`,
  { types: PAGE_TYPES },
)

const registered = new Set([
  'marketingSplitHeroBlock',
  'homeHeroBlock',
  'aboutHeroBlock',
  'koolitusHeroBlock',
  ...LEGACY_TYPES,
  'homePartnersBlock',
  'aboutQuoteBlock',
  'painPointsBlock',
])

const allTypes = new Set()
for (const d of unknown) {
  for (const t of d.unknown ?? []) allTypes.add(t)
}
const unregistered = [...allTypes].filter((t) => !registered.has(t) && t)
if (unregistered.length) {
  console.log('All unique section types in CMS:')
  console.log([...allTypes].sort().join('\n'))
}