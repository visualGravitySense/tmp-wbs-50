import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from 'next/server'

import { hasOpstarComparisonContent } from '@/lib/opstar/comparisonDefaults'

const PAGE_LEGACY_FIELDS: Record<string, string[]> = {
  mainPage: [
    'eyebrow',
    'headline',
    'scriptHeadline',
    'subtitle',
    'description',
    'primaryCta',
    'secondaryCta',
    'socialProof',
    'stats',
    'features',
    'featuredReviews',
    'seoConversionSection',
    'challenges',
    'nineDaysProgram',
    'aboutAndres',
    'beforeAfter',
    'grantSection',
    'photoMarquee',
    'pricingSection',
    'finalCTA',
    'quiz',
    'helpFormTeaser',
    'nineDaysMini',
    'partnersTitle',
    'partners',
    'testimonials',
  ],
  koolitusPage: [
    'hero',
    'audienceSection',
    'nineDaysProgram',
    'featuresSection',
    'buildingsSection',
    'leanHouseSection',
    'investmentSection',
    'leadFormTeaser',
    'cohortsSection',
    'certificateSection',
    'pricesSection',
    'featuredReviews',
    'testimonialsSection',
    'kkk',
    'kkkDocument',
    'ctaSection',
    'contactSection',
    'finalCTA',
  ],
  opstarProfit: [
    'featuredReviews',
    'orbitBlockRef',
    'comparisonPartnerLogos',
    'hero',
    'contentSections',
    'comparison',
    'kolmSammast',
    'framework',
    'eightComponents',
    'leanVsOpstar',
    'meodetavadTulemused',
    'cases',
    'arvamused',
    'kkk',
    'cta',
  ],
  aboutPage: [
    'featuredReviews',
    'hero',
    'quoteSection',
    'aboutSection',
    'experienceSection',
    'guaranteeSection',
    'ctaSection',
    'keyAchievements',
    'worldManufacturingVisits',
    'expertise',
    'testimonialsSection',
    'testimonials',
    'services',
    'kkkDocument',
    'kkk',
    'contactSection',
  ],
  kontaktPage: [
    'richText',
    'hero',
    'quickContact',
    'messageForm',
    'andresBlock',
    'opstarBlock',
    'servicesSection',
    'legalNote',
  ],
}

function hasValue(value: unknown): boolean {
  if (value == null) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return value !== ''
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-admin-secret')
  const expected = process.env.SANITY_REVALIDATE_SECRET

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token =
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_AUTH_TOKEN

  if (!projectId || !dataset || !token) {
    return NextResponse.json({ error: 'Missing Sanity credentials' }, { status: 500 })
  }

  const dryRun = request.nextUrl.searchParams.get('dryRun') === '1'
  const typeFilter = request.nextUrl.searchParams.get('type')
  const types = typeFilter ? [typeFilter] : Object.keys(PAGE_LEGACY_FIELDS)

  const client = createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token,
    useCdn: false,
  })

  const results: Array<{
    id: string
    type: string
    sectionCount: number
    unset: string[]
    patched: boolean
    skipped?: string
  }> = []

  for (const type of types) {
    const legacyFields = PAGE_LEGACY_FIELDS[type]
    if (!legacyFields) continue

    const docs = await client.fetch<Array<{ _id: string }>>(
      `*[_type == $type]{ _id }`,
      { type },
    )

    for (const { _id } of docs) {
      const doc = await client.fetch<Record<string, unknown>>(`*[_id == $id][0]`, {
        id: _id,
      })
      const sections = doc.sections
      const sectionCount = Array.isArray(sections) ? sections.length : 0
      let fieldsToUnset = legacyFields.filter((field) => hasValue(doc[field]))

      if (type === 'opstarProfit' && fieldsToUnset.includes('comparison')) {
        const sections = doc.sections as Array<{ _type?: string; comparison?: { comparisonItems?: unknown[] } }> | undefined
        const blockHasRows = (sections ?? []).some(
          (s) =>
            s._type === 'opstarComparisonBlock' &&
            hasOpstarComparisonContent(s.comparison),
        )
        if (!blockHasRows) {
          fieldsToUnset = fieldsToUnset.filter((f) => f !== 'comparison')
        }
      }

      if (!fieldsToUnset.length) {
        results.push({
          id: _id,
          type,
          sectionCount,
          unset: [],
          patched: false,
          skipped: 'no legacy fields',
        })
        continue
      }

      if (sectionCount === 0) {
        results.push({
          id: _id,
          type,
          sectionCount,
          unset: fieldsToUnset,
          patched: false,
          skipped: 'sections empty',
        })
        continue
      }

      if (!dryRun) {
        await client
          .patch(_id)
          .unset(fieldsToUnset)
          .commit({ autoGenerateArrayKeys: true })
      }

      results.push({
        id: _id,
        type,
        sectionCount,
        unset: fieldsToUnset,
        patched: !dryRun,
      })
    }
  }

  const patched = results.filter((r) => r.patched).length

  return NextResponse.json({
    dataset,
    dryRun,
    patched,
    results,
  })
}