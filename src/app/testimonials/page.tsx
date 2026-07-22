import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { client } from '@/lib/sanity/client'
import {
  REVIEWS_LIST_QUERY,
  PARTNER_INDUSTRIES_QUERY,
  normalizeReviewsFromGroq,
} from '@/lib/sanity/queries/reviews'
import {
  enrichReviewsWithIndustry,
  buildIndustryCountsFromReviews,
  type PartnerIndustryRef,
} from '@/lib/testimonials/resolveReviewIndustry'
import TestimonialsAdvancedClient from '@/components/testimonials/TestimonialsAdvancedClient'
import { urlFor } from '@/lib/sanity/client'
import { getSiteSettings } from '@/lib/sanity'
import { fetchReviewPool } from '@/lib/sanity/fetchReviewPool'
import { resolveGlobalFinalCtaBannerBackground } from '@/lib/globalFinalCtaBanner'
import PageSections from '@/components/page-builder/PageSections'
import { MARKETING_SECTIONS_QUERY } from '@/lib/sanity/marketingSectionsQuery'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const pageSettings = await client.fetch(`*[_type == "testimonialsPage"][0]{ seo }`)
  return {
    title: pageSettings?.seo?.metaTitle || 'Testimonials | Site Name',
    description: pageSettings?.seo?.metaDescription || 'Lõpetajate päris tagasiside tootmisjuhtimise koolitusest. Loe kõiki hinnanguid ja registreeru järgmisse gruppi.',
    keywords: pageSettings?.seo?.metaKeywords || undefined,
    openGraph: {
      images: pageSettings?.seo?.ogImage ? [urlFor(pageSettings.seo.ogImage).url()] : [],
    },
  }
}

const TESTIMONIALS_PAGE_SETTINGS_QUERY = `*[_type == "testimonialsPage"][0]{
  pageTitle,
  eyebrow,
  statRating,
  statOee,
  statTimeframe,
  ctaRegisterText,
  quizTitle,
  quizSubtitle,
  quizTimeframeQuestion,
  quizQuestion,
  quizOptions[]{
    label,
    textDescription,
    courseUrl,
    ctaText
  },
  "logos": *[_type == "partnerLogo"] | order(order asc, name asc) {
    "title": name,
    "url": logo.asset->url
  },
  ${MARKETING_SECTIONS_QUERY}
}`

export default async function TestimonialsPage() {
  const { isEnabled: isDraft } = await draftMode()
  const [rawAll, partnerRows, pageSettings, siteSettings, reviewsResult] = await Promise.all([
    client.fetch(REVIEWS_LIST_QUERY),
    client.fetch(PARTNER_INDUSTRIES_QUERY),
    client.fetch(TESTIMONIALS_PAGE_SETTINGS_QUERY),
    getSiteSettings(),
    isDraft ? Promise.resolve([]) : fetchReviewPool(REVIEWS_LIST_QUERY),
  ])
  const partners = (Array.isArray(partnerRows) ? partnerRows : []) as PartnerIndustryRef[]
  const allReviews = enrichReviewsWithIndustry(normalizeReviewsFromGroq(rawAll), partners)
  const industryCounts = buildIndustryCountsFromReviews(allReviews)
  const totalCount = allReviews.length
  const logos = Array.isArray(pageSettings?.logos) ? pageSettings.logos : []
  const { usePageBuilder, sections, hasBlock } = getPageBuilderState(
    pageSettings as { sections?: unknown },
  )
  const skipHero = usePageBuilder && hasBlock('marketingSplitHeroBlock')
  const globalFinalCtaBannerBackground = resolveGlobalFinalCtaBannerBackground(siteSettings)

  return (
    <div
      className="relative bg-background"
      data-page-builder={usePageBuilder ? 'on' : 'off'}
    >
      {usePageBuilder ? (
        <PageSections
          sections={sections}
          reviewPool={reviewsResult}
          isDraft={isDraft}
          globalFinalCtaBannerBackground={globalFinalCtaBannerBackground}
        />
      ) : null}
      <TestimonialsAdvancedClient
        allReviews={allReviews}
        totalCount={totalCount}
        industryCounts={industryCounts}
        contentSettings={pageSettings || undefined}
        logos={logos}
        skipHero={skipHero}
      />
    </div>
  )
}
