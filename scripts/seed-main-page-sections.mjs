/**
 * Seeds `mainPage.sections[]` from legacy top-level fields (Phase 2 builder migration).
 *
 * Usage:
 *   node scripts/seed-main-page-sections.mjs           # dry-run (default)
 *   node scripts/seed-main-page-sections.mjs --apply     # patch Sanity document
 *
 * Requires SANITY_API_TOKEN (write) in .env.local
 */
import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const apply = process.argv.includes('--apply')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-28',
  token,
  useCdn: false,
})

const MAIN_PAGE_ID = 'mainPage'

function randomKey() {
  return Math.random().toString(36).slice(2, 10)
}

function block(type, fields) {
  return {
    _type: type,
    _key: randomKey(),
    ...fields,
  }
}

function buildSections(doc) {
  const sections = []

  if (
    doc.eyebrow ||
    doc.headline ||
    doc.scriptHeadline ||
    doc.subtitle ||
    doc.primaryCta ||
    doc.secondaryCta ||
    doc.socialProof ||
    (Array.isArray(doc.stats) && doc.stats.length > 0) ||
    (Array.isArray(doc.features) && doc.features.length > 0)
  ) {
    sections.push(
      block('homeHeroBlock', {
        eyebrow: doc.eyebrow,
        headline: doc.headline,
        scriptHeadline: doc.scriptHeadline,
        subtitle: doc.subtitle,
        primaryCta: doc.primaryCta,
        secondaryCta: doc.secondaryCta,
        socialProof: doc.socialProof,
        stats: doc.stats,
        features: doc.features,
      }),
    )
  }

  if (doc.quiz || doc.helpFormTeaser || doc.seoConversionSection) {
    sections.push(
      block('homeQuizBandBlock', {
        quiz: doc.quiz,
        helpFormTeaser: doc.helpFormTeaser,
        seoConversionSection: doc.seoConversionSection,
      }),
    )
  }

  if (doc.challenges) {
    sections.push(
      block('homeChallengesBlock', {
        challenges: doc.challenges,
      }),
    )
  }

  if (doc.nineDaysMini) {
    sections.push(
      block('homeNineDaysMiniBlock', {
        nineDaysMini: doc.nineDaysMini,
      }),
    )
  }

  if (doc.partnersTitle || (Array.isArray(doc.partners) && doc.partners.length > 0)) {
    sections.push(
      block('homePartnersBlock', {
        partnersTitle: doc.partnersTitle,
        partners: doc.partners,
      }),
    )
  }

  if (doc.grantSection) {
    sections.push(
      block('homeGrantBlock', {
        grantSection: doc.grantSection,
      }),
    )
  }

  if (doc.aboutAndres) {
    sections.push(
      block('homeAboutBlock', {
        aboutAndres: doc.aboutAndres,
      }),
    )
  }

  if (
    (Array.isArray(doc.featuredReviews) && doc.featuredReviews.length > 0) ||
    doc.testimonials
  ) {
    sections.push(
      block('homeTestimonialsBlock', {
        featuredReviews: doc.featuredReviews,
        testimonials: doc.testimonials,
      }),
    )
  }

  if (doc.photoMarquee) {
    sections.push(
      block('homePhotoMarqueeBlock', {
        photoMarquee: doc.photoMarquee,
      }),
    )
  }

  if (doc.beforeAfter) {
    sections.push(
      block('homeBeforeAfterBlock', {
        beforeAfter: doc.beforeAfter,
      }),
    )
  }

  if (doc.pricingSection) {
    sections.push(
      block('homePricingBlock', {
        pricingSection: doc.pricingSection,
      }),
    )
  }

  if (doc.finalCTA) {
    sections.push(
      block('homeFinalCtaBlock', {
        finalCTA: doc.finalCTA,
      }),
    )
  }

  return sections
}

const doc = await client.fetch(`*[_type == "mainPage" && _id == $id][0]`, {
  id: MAIN_PAGE_ID,
})

if (!doc) {
  console.error(`mainPage document not found (_id: ${MAIN_PAGE_ID})`)
  process.exit(1)
}

const existingCount = Array.isArray(doc.sections) ? doc.sections.length : 0
if (existingCount > 0) {
  console.warn(
    `Warning: document already has ${existingCount} section block(s). This script will replace sections[].`,
  )
}

const sections = buildSections(doc)

console.log(`mainPage: ${doc.title || doc.headline || MAIN_PAGE_ID}`)
console.log(`Mode: ${apply ? 'APPLY' : 'dry-run'}`)
console.log(`Sections to write (${sections.length}):`)
for (const s of sections) {
  console.log(`  - ${s._type} (_key: ${s._key})`)
}

if (!apply) {
  console.log('\nDry run — pass --apply to patch the document.')
  process.exit(0)
}

await client
  .patch(MAIN_PAGE_ID)
  .set({ sections })
  .commit()

console.log('\nPatched mainPage.sections successfully.')
