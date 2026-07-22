/** Merge block-type groups and drop duplicates (Sanity `sections.of` requires unique types). */
export function uniqueBlockTypes<const T extends string>(
  ...groups: readonly (readonly T[])[]
): T[] {
  return [...new Set(groups.flat())]
}

export const SHARED_BLOCKS = [
  'painPointsBlock',
  'helpFormTeaserBlock',
  'clientsHeaderBlock',
  'andresBlock',
  'casesBlock',
  'thesesGridBlock',
  'programDaysTabs',
  'newsletterBlock',
] as const

/**
 * Hero / CTA / marquee blocks reused across secondary marketing pages
 * (juhendatud lõputööd, blog, galerii, privacy, edu standards, testimonials).
 */
export const SECONDARY_PAGE_LAYOUT_BLOCKS = [
  'marketingSplitHeroBlock',
  'homeHeroBlock',
  'homeFinalCtaBlock',
  'homePartnersBlock',
  'homeTestimonialsBlock',
  'homeKkkBlock',
  'newsletterBlock',
] as const

/** Legacy block types kept until CMS data is migrated (Studio validation only). */
export const LEGACY_BLOCKS = [
  'aboutHeroBlock',
  'koolitusHeroBlock',
  'homeChallengesBlock',
  'painBlock',
  'koolitusAudienceBlock',
  'opstarKoImSammastBlock',
] as const

/** Hero blocks for /andres-kase (aboutPage) — listed first in preset for Studio. */
export const ABOUT_PAGE_HERO_BLOCKS = [
  'marketingSplitHeroBlock',
  'homeHeroBlock',
] as const

/** Home blocks commonly composed on /andres-kase and other about-style pages. */
export const ABOUT_SHARED_HOME_BLOCKS = [
  'homePartnersBlock',
  'homeTestimonialsBlock',
  'homeFinalCtaBlock',
  'homePhotoMarqueeBlock',
] as const

/** Cross-page blocks already used on /andres-kase in production CMS. */
export const ABOUT_CROSS_PAGE_BLOCKS = [
  'koolitusStatsBlock',
  'opstarFrameworkBlock',
  'opstarKolmSammastBlock',
] as const

export const HOME_BLOCKS = [
  'homeHeroBlock',
  'marketingSplitHeroBlock',
  'homePartnersBlock',
  'homeTestimonialsBlock',
  'homeQuizBandBlock',
  'homeSeoConversionBlock',
  'homeNineDaysMiniBlock',
  'homeGrantBlock',
  'homeAboutBlock',
  'homePhotoMarqueeBlock',
  'homeBeforeAfterBlock',
  'homePricingBlock',
  'homeFinalCtaBlock',
  'homeHeroFeaturesBlock',
  'mainAndresCardBlock',
  'homeKkkBlock',
] as const

export const KOOLITUS_BLOCKS = [
  'koolitusProjectsBlock',
  'koolitusFeaturesBlock',
  'koolitusBuildingsBlock',
  'koolitusLeanHouseBlock',
  'koolitusInvestmentBlock',
  'koolitusLeadFormBlock',
  'koolitusCohortsBlock',
  'koolitusCertificateBlock',
  'koolitusKkkBlock',
  'koolitusCtaBlock',
  'koolitusContactBlock',
  'koolitusTrainingScheduleBlock',
  'koolitusLocationBlock',
  'koolitusStatsBlock',
  'koolitusLogoMarqueeBlock',
  'koolitusPhotoGalleryBlock',
] as const

/** Shared home blocks commonly composed on /koolitus (hero, pricing, testimonials, CTA). */
export const KOOLITUS_SHARED_HOME_BLOCKS = [
  'marketingSplitHeroBlock',
  'homePartnersBlock',
  'homeTestimonialsBlock',
  'homePricingBlock',
  'homeFinalCtaBlock',
] as const

/** Tehaste külastused / visiidid ettevõtetesse — shared about block. */
export const WORLD_MANUFACTURING_VISITS_BLOCKS = ['aboutWorldVisitsBlock'] as const

/** Cross-page blocks from other singleton pages already used on /koolitus in production CMS. */
export const KOOLITUS_CROSS_PAGE_BLOCKS = [
  'aboutGuaranteeBlock',
  ...WORLD_MANUFACTURING_VISITS_BLOCKS,
] as const

/** Comparison blocks on /opstar-profit (Mis on OPSTAR + LEAN vs OPSTAR). */
export const OPSTAR_COMPARISON_BLOCKS = [
  'opstarComparisonBlock',
  'opstarLeanVsOpstarBlock',
] as const

export const OPSTAR_BLOCKS = [
  'opstarAcronymGridBlock',
  'opstarOrbitBlock',
  ...OPSTAR_COMPARISON_BLOCKS,
  'opstarKolmSammastBlock',
  'opstarFrameworkBlock',
  'opstarEightComponentsBlock',
  'opstarMeasuredResultsBlock',
  'opstarCasesBlock',
  'opstarKkkBlock',
  'opstarCtaBlock',
  'opstarContentSectionsBlock',
] as const

/** Cross-page blocks from other singleton pages already used on /opstar-profit in production CMS. */
export const OPSTAR_CROSS_PAGE_BLOCKS = [
  'aboutNarrativeBlock',
  'koolitusCohortsBlock',
  /** LEAN maja diagram — shared koolitus block, used on /opstar-profit */
  'koolitusLeanHouseBlock',
  ...WORLD_MANUFACTURING_VISITS_BLOCKS,
] as const

/** @deprecated Use OPSTAR_CROSS_PAGE_BLOCKS; kept for imports. */
export const OPSTAR_SHARED_BLOCKS = OPSTAR_CROSS_PAGE_BLOCKS

export const ABOUT_BLOCKS = [
  'aboutQuoteBlock',
  'aboutNarrativeBlock',
  'aboutExperienceBlock',
  'aboutCtaBlock',
  'aboutGuaranteeBlock',
  'aboutKeyAchievementsBlock',
  'aboutWorldVisitsBlock',
  'aboutKkkBlock',
  'aboutContactBlock',
  'aboutCohortsBlock',
] as const

export const KOOLITUS_LEGACY_BLOCKS = [
  'koolitusHeroBlock',
  'koolitusAudienceBlock',
  'koolitusNineDaysProgramBlock',
] as const

export const MAIN_LEGACY_BLOCKS = [
  'homeChallengesBlock',
  'painBlock',
] as const

/** Known `_type` typos still present in some CMS documents. */
export const OPSTAR_LEGACY_BLOCKS = ['opstarKoImSammastBlock'] as const

export const KONTAKT_BLOCKS = [
  'kontaktHeroBlock',
  'kontaktQuickBlock',
  'kontaktFormBlock',
  'kontaktAndresBlock',
  'kontaktOpstarBlock',
  'kontaktServicesBlock',
  'kontaktLegalNoteBlock',
] as const

export const ALL_BLOCKS = [
  ...SHARED_BLOCKS,
  ...HOME_BLOCKS,
  ...KOOLITUS_BLOCKS,
  ...OPSTAR_BLOCKS,
  ...ABOUT_BLOCKS,
  ...KONTAKT_BLOCKS,
] as const

/** Stats row for Esileht #2 (kogemus / 4 numbrit) and /kliendid. */
export const STATS_BLOCKS = ['statsBlock'] as const

/** FAQ block variants — allow cross-page paste without "Invalid clipboard item". */
export const KKK_BLOCKS = [
  'homeKkkBlock',
  'koolitusKkkBlock',
  'opstarKkkBlock',
  'aboutKkkBlock',
] as const

/** Extra blocks used on /kliendid (stats row + generic text). */
export const KLIENTID_PAGE_BLOCKS = ['statsBlock', 'textBlock'] as const

/**
 * Full page-builder library for Esileht (mainPage).
 * Must include every marketing block type so Studio paste from other pages works.
 */
export const MAIN_PAGE_BLOCKS = uniqueBlockTypes(
  SHARED_BLOCKS.filter((t) => t !== 'helpFormTeaserBlock'),
  HOME_BLOCKS,
  STATS_BLOCKS,
  KKK_BLOCKS,
  KOOLITUS_BLOCKS,
  OPSTAR_BLOCKS,
  ABOUT_BLOCKS,
  WORLD_MANUFACTURING_VISITS_BLOCKS,
  KOOLITUS_CROSS_PAGE_BLOCKS,
  OPSTAR_CROSS_PAGE_BLOCKS,
  MAIN_LEGACY_BLOCKS,
  LEGACY_BLOCKS,
  ['textBlock'],
)

/**
 * Unified preset for singleton secondary marketing pages.
 * Includes hero/CTA layout blocks + legacy aliases so existing CMS data validates in Studio.
 */
export const SECONDARY_MARKETING_PAGE_PRESET = uniqueBlockTypes(
  SHARED_BLOCKS,
  SECONDARY_PAGE_LAYOUT_BLOCKS,
  LEGACY_BLOCKS,
)

/** Which shared blocks each singleton page may use in `sections[]`. */
export const pageBuilderPresets = {
  mainPage: MAIN_PAGE_BLOCKS,
  koolitusPage: uniqueBlockTypes(
    SHARED_BLOCKS,
    HOME_BLOCKS,
    KOOLITUS_BLOCKS,
    KOOLITUS_LEGACY_BLOCKS,
    KOOLITUS_CROSS_PAGE_BLOCKS,
    WORLD_MANUFACTURING_VISITS_BLOCKS,
    KKK_BLOCKS,
  ),
  /** /andres-kase — full page-builder library so Studio copy-paste from Esileht/Koolitus works. */
  aboutPage: MAIN_PAGE_BLOCKS,
  kontaktPage: uniqueBlockTypes(SHARED_BLOCKS, KONTAKT_BLOCKS),
  /** /opstar-profit — includes LEAN vs OPSTAR comparison + framework blocks (deduped). */
  opstarProfit: uniqueBlockTypes(
    SHARED_BLOCKS,
    HOME_BLOCKS,
    OPSTAR_BLOCKS,
    OPSTAR_COMPARISON_BLOCKS,
    OPSTAR_CROSS_PAGE_BLOCKS,
    WORLD_MANUFACTURING_VISITS_BLOCKS,
    OPSTAR_LEGACY_BLOCKS,
    KKK_BLOCKS,
  ),
  galleryPage: SECONDARY_MARKETING_PAGE_PRESET,
  blogPage: SECONDARY_MARKETING_PAGE_PRESET,
  privacyPolicyPage: SECONDARY_MARKETING_PAGE_PRESET,
  eduStandardsPage: SECONDARY_MARKETING_PAGE_PRESET,
  juhendatudLoputoodPage: SECONDARY_MARKETING_PAGE_PRESET,
  testimonialsPage: SECONDARY_MARKETING_PAGE_PRESET,
  kliendidPage: uniqueBlockTypes(
    SECONDARY_MARKETING_PAGE_PRESET,
    KLIENTID_PAGE_BLOCKS,
  ),
} as const

export type PageBuilderPresetKey = keyof typeof pageBuilderPresets
