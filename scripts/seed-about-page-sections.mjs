/**
 * Copy legacy aboutPage fields → sections[] for page builder.
 * Usage: node scripts/seed-about-page-sections.mjs
 *        node scripts/seed-about-page-sections.mjs --apply
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

function heroToMarketingSplitBlock(hero, key) {
  if (!hero || typeof hero !== 'object') return null
  return {
    _type: 'marketingSplitHeroBlock',
    _key: key,
    eyebrow: hero.eyebrow,
    headline: hero.headline ?? '',
    scriptHeadline: hero.subtitle ?? hero.scriptHeadline,
    description: hero.description,
    rightComponentType: 'aboutAndres',
    heroImage: hero.image ?? hero.heroImage,
    linkedinUrl: hero.linkedinUrl,
    floatingBadges: hero.floatingBadges,
    badges: hero.badges ?? hero.technologyBadges,
    primaryCta: hero.primaryButton
      ? {
          text: hero.primaryButton.text,
          link: {
            _type: 'link',
            linkType: String(hero.primaryButton.link ?? '').startsWith('http') ? 'external' : 'internal',
            url: hero.primaryButton.link,
          },
        }
      : undefined,
    secondaryCta: hero.secondaryButton
      ? {
          text: hero.secondaryButton.text,
          link: {
            _type: 'link',
            linkType: String(hero.secondaryButton.link ?? '').startsWith('http') ? 'external' : 'internal',
            url: hero.secondaryButton.link,
          },
        }
      : undefined,
  }
}

const BLOCK_ORDER = [
  { type: 'marketingSplitHeroBlock', field: 'hero', mapHero: true },
  { type: 'aboutQuoteBlock', field: 'quoteSection' },
  { type: 'aboutNarrativeBlock', field: 'aboutSection' },
  { type: 'aboutExperienceBlock', field: 'experienceSection' },
  { type: 'aboutCtaBlock', field: 'ctaSection' },
  { type: 'aboutKeyAchievementsBlock', field: 'keyAchievements' },
  { type: 'aboutWorldVisitsBlock', field: 'worldManufacturingVisits' },
  { type: 'homeTestimonialsBlock', always: true },
  { type: 'aboutKkkBlock', fields: ['kkkDocument', 'kkk'], always: true },
  { type: 'aboutContactBlock', field: 'contactSection' },
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
    if (!spec.field || !hasContent(value)) continue

    if (spec.mapHero && spec.type === 'marketingSplitHeroBlock') {
      const mapped = heroToMarketingSplitBlock(value, key)
      if (mapped) sections.push(mapped)
      continue
    }

    sections.push({
      _type: spec.type,
      _key: key,
      [spec.field]: value,
    })
  }

  return sections
}

const doc = await client.fetch(`*[_type == "aboutPage" && _id == "aboutPage"][0]`)
if (!doc) {
  console.error('aboutPage not found')
  process.exit(1)
}

const sections = buildSections(doc)
console.log(`Built ${sections.length} sections:`)
for (const s of sections) {
  console.log(`  - ${s._type}`)
}

if (!apply) {
  console.log('\nDry run. Pass --apply to patch aboutPage.')
  process.exit(0)
}

if (!token) {
  console.error('Set SANITY_API_TOKEN (Editor) in .env.local to apply.')
  process.exit(1)
}

await client.patch('aboutPage').set({ sections }).commit()
console.log('\nPatched aboutPage.sections — open Studio and Publish.')
