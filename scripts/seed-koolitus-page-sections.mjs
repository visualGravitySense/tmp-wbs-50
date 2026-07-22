/**
 * Copy legacy koolitusPage fields → sections[] for page builder.
 * Usage: node scripts/seed-koolitus-page-sections.mjs
 *        node scripts/seed-koolitus-page-sections.mjs --apply
 *
 * Requires SANITY_API_TOKEN (Editor) in .env.local
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const apply = process.argv.includes('--apply')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'buc8lir0'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'andres-prod'
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_AUTH_TOKEN

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token,
  useCdn: false,
})

/** Mirrors /koolitus legacy section order. `always` = section shown on site even when CMS field is empty. */
const BLOCK_ORDER = [
  // Hero: use scripts/restore-koolitus-hero.mjs (maps to marketingSplitHeroBlock).
  // Legacy `hero` shape ≠ split-hero block fields — do not auto-seed from hero here.
  { type: 'koolitusNineDaysProgramBlock', field: 'nineDaysProgram' },
  { type: 'koolitusFeaturesBlock', field: 'featuresSection' },
  { type: 'koolitusBuildingsBlock', field: 'buildingsSection' },
  { type: 'koolitusLeanHouseBlock', field: 'leanHouseSection', always: true },
  { type: 'koolitusInvestmentBlock', field: 'investmentSection', always: true },
  { type: 'koolitusLeadFormBlock', field: 'leadFormTeaser', always: true },
  { type: 'koolitusCohortsBlock', field: 'cohortsSection', always: true },
  { type: 'koolitusCertificateBlock', field: 'certificateSection', always: true },
  { type: 'homePricingBlock', always: true, pricingField: 'pricesSection' },
  { type: 'homeTestimonialsBlock', always: true },
  { type: 'koolitusKkkBlock', fields: ['kkkDocument', 'kkk'], always: true },
  { type: 'koolitusCtaBlock', field: 'ctaSection' },
  { type: 'koolitusContactBlock', field: 'contactSection' },
  { type: 'homeFinalCtaBlock', field: 'finalCTA', always: true },
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

    if (spec.type === 'homePricingBlock') {
      if (!spec.always && !hasContent(doc.pricesSection)) continue
      const block = { _type: spec.type, _key: key }
      if (hasContent(doc.pricesSection)) block.pricingSection = doc.pricesSection
      sections.push(block)
      continue
    }

    if (spec.type === 'homeTestimonialsBlock') {
      if (
        !spec.always &&
        !hasContent(doc.featuredReviews) &&
        !hasContent(doc.testimonialsSection)
      ) {
        continue
      }
      const block = { _type: spec.type, _key: key }
      if (hasContent(doc.featuredReviews)) block.featuredReviews = doc.featuredReviews
      if (hasContent(doc.testimonialsSection)) block.testimonials = doc.testimonialsSection
      sections.push(block)
      continue
    }

    if (spec.fields) {
      const payload = {}
      for (const f of spec.fields) {
        if (hasContent(doc[f])) payload[f] = doc[f]
      }
      if (!spec.always && !Object.keys(payload).length) continue
      sections.push({ _type: spec.type, _key: key, ...payload })
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

const doc = await client.fetch(`*[_type == "koolitusPage" && _id == "koolitusPage"][0]`)
if (!doc) {
  console.error('koolitusPage not found')
  process.exit(1)
}

const sections = buildSections(doc)
console.log(`Built ${sections.length} sections:`)
for (const s of sections) {
  console.log(`  - ${s._type}`)
}

if (!apply) {
  console.log('\nDry run. Pass --apply to patch koolitusPage.')
  process.exit(0)
}

if (!token) {
  console.error('Set SANITY_API_TOKEN (Editor) in .env.local to apply.')
  process.exit(1)
}

await client.patch('koolitusPage').set({ sections }).commit()
console.log('\nPatched koolitusPage.sections — open Studio and Publish.')
