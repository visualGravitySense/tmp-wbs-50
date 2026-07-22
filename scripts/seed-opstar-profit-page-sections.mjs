/**
 * Copy legacy opstarProfit fields → sections[] for page builder.
 * Usage: node scripts/seed-opstar-profit-page-sections.mjs
 *        node scripts/seed-opstar-profit-page-sections.mjs --apply
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const apply = process.argv.includes('--apply')

const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'buc8lir0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'andres-prod',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

const BLOCK_ORDER = [
  { type: 'opstarHeroBlock', field: 'hero' },
  { type: 'opstarAcronymGridBlock', always: true },
  { type: 'opstarOrbitBlock', field: 'orbitBlockRef', always: true },
  { type: 'opstarComparisonBlock', field: 'comparison' },
  { type: 'opstarKolmSammastBlock', field: 'kolmSammast' },
  { type: 'opstarFrameworkBlock', field: 'framework' },
  { type: 'opstarEightComponentsBlock', field: 'eightComponents' },
  { type: 'opstarLeanVsOpstarBlock', field: 'leanVsOpstar' },
  { type: 'opstarMeasuredResultsBlock', field: 'meodetavadTulemused' },
  { type: 'opstarCasesBlock', field: 'cases' },
  { type: 'homeTestimonialsBlock', always: true },
  { type: 'opstarKkkBlock', field: 'kkk' },
  { type: 'opstarCtaBlock', field: 'cta' },
  { type: 'opstarContentSectionsBlock', field: 'contentSections' },
]

function hasContent(value) {
  if (value == null) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return Boolean(value)
}

function blockKey(type, index) {
  return `seed-${type}-${index}`
}

function buildSections(doc) {
  const sections = []

  for (const spec of BLOCK_ORDER) {
    const key = blockKey(spec.type, sections.length)

    if (spec.type === 'homeTestimonialsBlock') {
      const block = { _type: spec.type, _key: key }
      if (hasContent(doc.featuredReviews)) block.featuredReviews = doc.featuredReviews
      if (spec.always || hasContent(doc.featuredReviews)) sections.push(block)
      continue
    }

    if (spec.always && !spec.field) {
      sections.push({ _type: spec.type, _key: key })
      continue
    }

    const value = spec.field ? doc[spec.field] : undefined

    if (spec.always) {
      const block = { _type: spec.type, _key: key }
      if (spec.field && hasContent(value)) block[spec.field] = value
      sections.push(block)
      continue
    }

    if (!spec.field || !hasContent(value)) continue
    sections.push({
      _type: spec.type,
      _key: key,
      [spec.field]: value,
    })
  }

  return sections
}

const doc = await client.fetch(`*[_type == "opstarProfit" && _id == "opstarProfit"][0]`)
if (!doc) {
  console.error('opstarProfit not found')
  process.exit(1)
}

const sections = buildSections(doc)
console.log(`Built ${sections.length} sections:`)
for (const s of sections) {
  console.log(`  - ${s._type}`)
}

if (!apply) {
  console.log('\nDry run. Pass --apply to patch opstarProfit.')
  process.exit(0)
}

if (!token) {
  console.error('Set SANITY_API_TOKEN (Editor) in .env.local to apply.')
  process.exit(1)
}

await client.patch('opstarProfit').set({ sections }).commit()
console.log('\nPatched opstarProfit.sections — open Studio and Publish.')
