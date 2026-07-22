import { draftMode } from 'next/headers'

import PageSections, { type PageSectionsLegacy } from '@/components/page-builder/PageSections'
import type { KoolitusSectionRenderContext } from '@/components/page-builder/koolitus/renderKoolitusSection'
import type { OpstarSectionRenderContext } from '@/components/page-builder/opstar/renderOpstarSection'
import type { AboutSectionRenderContext } from '@/components/page-builder/about/renderAboutSection'
import { resolveGlobalFinalCtaBannerBackground } from '@/lib/globalFinalCtaBanner'
import { fetchReviewPool } from '@/lib/sanity/fetchReviewPool'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'
import { REVIEWS_LIST_QUERY } from '@/lib/sanity/queries/reviews'
import { getSiteSettings } from '@/lib/sanity'

type DocWithSections = { sections?: unknown } | null | undefined

/** Renders shared `sections[]` blocks when the page document has builder content. */
export async function MarketingPageBuilderLayer({
  doc,
  koolitusContext,
  opstarContext,
  aboutContext,
  legacy,
  legacyFeaturedReviews,
  hideHeroGlobalStatsStrip,
}: {
  doc: DocWithSections
  koolitusContext?: KoolitusSectionRenderContext
  opstarContext?: OpstarSectionRenderContext
  aboutContext?: AboutSectionRenderContext
  legacy?: PageSectionsLegacy
  legacyFeaturedReviews?: unknown
  hideHeroGlobalStatsStrip?: boolean
}) {
  const { usePageBuilder, sections } = getPageBuilderState(doc)
  if (!usePageBuilder) return null

  const { isEnabled: isDraft } = await draftMode()
  const [siteSettings, reviewsResult] = await Promise.all([
    getSiteSettings(),
    isDraft ? Promise.resolve([]) : fetchReviewPool(REVIEWS_LIST_QUERY),
  ])
  const globalFinalCtaBannerBackground =
    resolveGlobalFinalCtaBannerBackground(siteSettings)

  return (
    <PageSections
      sections={sections}
      reviewPool={reviewsResult}
      isDraft={isDraft}
      globalFinalCtaBannerBackground={globalFinalCtaBannerBackground}
      koolitusContext={koolitusContext}
      opstarContext={opstarContext}
      aboutContext={aboutContext}
      legacy={legacy}
      legacyFeaturedReviews={legacyFeaturedReviews}
      globalStats={siteSettings.globalStats?.stats}
      globalNineDaysProgram={
        siteSettings.globalNineDaysProgramDoc ?? siteSettings.nineDaysProgram
      }
      hideHeroGlobalStatsStrip={hideHeroGlobalStatsStrip}
    />
  )
}

export function marketingBuilderSkips(doc: DocWithSections) {
  const state = getPageBuilderState(doc)
  return {
    usePageBuilder: state.usePageBuilder,
    skipHero: state.usePageBuilder && state.hasBlock('marketingSplitHeroBlock'),
    skipTestimonials:
      state.usePageBuilder && state.hasBlock('homeTestimonialsBlock'),
    skipFinalCta: state.usePageBuilder && state.hasBlock('homeFinalCtaBlock'),
    skipPartners: state.usePageBuilder && state.hasBlock('homePartnersBlock'),
    skipPricing: state.usePageBuilder && state.hasBlock('homePricingBlock'),
    skipPhotoMarquee:
      state.usePageBuilder && state.hasBlock('homePhotoMarqueeBlock'),
    skipBeforeAfter:
      state.usePageBuilder && state.hasBlock('homeBeforeAfterBlock'),
    skipNewsletter: state.usePageBuilder && state.hasBlock('newsletterBlock'),
  }
}
