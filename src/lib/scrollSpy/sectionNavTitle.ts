/** Labels for the fixed right-hand scroll-spy menu (`ScrollSpyNav`). */

type SectionLike = Record<string, unknown> & { _type: string; _key?: string }

const STABLE_SECTION_IDS: Record<string, string> = {
  homePricingBlock: 'pricing',
  /** Investment / hinnastamine block on /koolitus */
  koolitusInvestmentBlock: 'pricing',
  /** Schedule / dates block on /koolitus */
  koolitusTrainingScheduleBlock: 'ajakava',
  koolitusCohortsBlock: 'cohorts',
  koolitusCtaBlock: 'registreeru',
}

/** Block types that may appear more than once per page — append `_key` to keep DOM ids unique. */
const STABLE_ID_WITH_KEY_SUFFIX = new Set<string>()

const SECTION_NAV_LABELS: Record<string, string> = {
  // Main page
  homeHeroBlock: 'Avaleht',
  marketingSplitHeroBlock: 'Hero',
  statsBlock: 'Statistika',
  homeHeroFeaturesBlock: 'Teenused',
  homePartnersBlock: 'Partnerid',
  homeTestimonialsBlock: 'Tagasiside',
  homeQuizBandBlock: 'Test',
  homeSeoConversionBlock: 'Põhimõisted',
  homeChallengesBlock: 'Väljakutsed',
  homeNineDaysMiniBlock: 'Mini-programm',
  homeGrantBlock: 'Toetus',
  homeAboutBlock: 'About',
  homePhotoMarqueeBlock: 'Galerii',
  homeBeforeAfterBlock: 'Tulemused',
  homePricingBlock: 'Hinnakiri',
  homeFinalCtaBlock: 'Liitu',
  painBlock: 'Väljakutsed',
  casesBlock: 'Juhtumiuuringud',
  thesesGridBlock: 'Lõputööd',
  programDaysTabs: 'Programm',
  helpFormTeaserBlock: 'Kontakt',
  homeKkkBlock: 'KKK',
  newsletterBlock: 'Uudiskiri',

  // Koolitus
  koolitusHeroBlock: 'Koolitus',
  koolitusNineDaysProgramBlock: 'Programm',
  koolitusStatsBlock: 'Numbrid',
  koolitusLogoMarqueeBlock: 'Partnerid',
  koolitusAudienceBlock: 'Kellele',
  koolitusProjectsBlock: 'Projektid',
  koolitusFeaturesBlock: 'Miks valida',
  koolitusBuildingsBlock: 'Miks',
  koolitusLeanHouseBlock: 'LEAN Maja',
  koolitusInvestmentBlock: 'Hind',
  koolitusLeadFormBlock: 'Otsi lahendust',
  koolitusCohortsBlock: 'Grupid',
  koolitusCertificateBlock: 'Tunnistus',
  koolitusKkkBlock: 'KKK',
  koolitusCtaBlock: 'Registreeru',
  koolitusContactBlock: 'Kontakt',
  koolitusTrainingScheduleBlock: '2026-2027. aasta koolitusprogramm',
  koolitusPhotoGalleryBlock: 'Galerii',
  koolitusLocationBlock: 'Asukoht',

  // Product
  opstarHeroBlock: 'Product',
  opstarAcronymGridBlock: 'Süsteem',
  opstarOrbitBlock: 'Mudel',
  opstarComparisonBlock: 'Võrdlus',
  opstarKolmSammastBlock: '3 sammast',
  opstarFrameworkBlock: 'Raamistik',
  opstarEightComponentsBlock: '8 osa',
  opstarLeanVsOpstarBlock: 'LEAN vs Product',
  opstarMeasuredResultsBlock: 'Tulemused',
  opstarCasesBlock: 'Kogemus',
  opstarKkkBlock: 'KKK',
  opstarCtaBlock: 'Alusta',
  opstarContentSectionsBlock: 'Loe edasi',

  // About
  aboutHeroBlock: 'Minust',
  aboutQuoteBlock: 'Moto',
  aboutNarrativeBlock: 'Lugu',
  aboutExperienceBlock: 'Kogemus',
  aboutCtaBlock: 'Suhtleme',
  aboutGuaranteeBlock: 'Riskivaba osalemine',
  aboutKeyAchievementsBlock: 'Saavutused',
  aboutWorldVisitsBlock: 'Tehaste külastused',
  aboutKkkBlock: 'KKK',
  aboutContactBlock: 'Kontakt',
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : undefined
}

function readString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function normalizeNavTitle(raw: string): string {
  return raw
    .replace(/,\s*koolitusprogramm/i, ' koolitusprogramm')
    .replace(/\s+/g, ' ')
    .trim()
}

function shortenNavTitle(raw: string, max = 52): string {
  const normalized = normalizeNavTitle(raw)
  if (normalized.length <= max) return normalized
  return `${normalized.slice(0, max - 1).trimEnd()}…`
}

/** Prefer CMS copy when a block exposes a heading/title field. */
function pickCmsNavTitle(section: SectionLike): string | undefined {
  const direct =
    readString(section.headerTitle) ||
    readString(section.heading) ||
    readString(section.title) ||
    readString(section.partnersTitle)

  if (direct) return shortenNavTitle(direct)

  const hero = asRecord(section.hero)
  const heroTitle = readString(hero?.headline) || readString(hero?.mainTitle)
  if (heroTitle) return shortenNavTitle(heroTitle)

  const kkk = asRecord(section.kkkSection) ?? asRecord(section.kkk)
  const kkkTitle = readString(kkk?.title)
  if (kkkTitle) return shortenNavTitle(kkkTitle)

  const nestedKeys = [
    'cases',
    'comparison',
    'framework',
    'grantSection',
    'aboutAndres',
    'photoMarquee',
    'beforeAfter',
    'pricingSection',
    'finalCTA',
    'challenges',
    'meodetavadTulemused',
    'kolmSammast',
    'leanVsOpstar',
    'eightComponents',
    'cta',
    'contactSection',
    'guaranteeSection',
    'aboutSection',
    'experienceSection',
    'keyAchievements',
    'worldManufacturingVisits',
    'quoteSection',
  ] as const

  for (const key of nestedKeys) {
    const nested = asRecord(section[key])
    const nestedTitle =
      readString(nested?.title) || readString(nested?.heading) || readString(nested?.headline)
    if (nestedTitle) return shortenNavTitle(nestedTitle)
  }

  return undefined
}

function humanizeBlockType(type: string): string {
  const stripped = type
    .replace(/Block$/, '')
    .replace(/^(home|koolitus|opstar|about)/, '')
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .trim()

  if (!stripped) return 'Sektsioon'
  return stripped.charAt(0).toUpperCase() + stripped.slice(1)
}

/** Stable anchor id for in-page navigation. */
export function getSectionNavId(section: SectionLike): string {
  const stable = STABLE_SECTION_IDS[section._type]
  if (stable) return stable

  if (STABLE_ID_WITH_KEY_SUFFIX.has(section._type)) {
    const slug = 'koolitusprogramm'
    return section._key ? `${slug}--${section._key}` : slug
  }

  return section._key ?? section._type
}

export function isSectionHiddenFromScrollNav(section: SectionLike): boolean {
  return section.hideFromScrollNav === true
}

/**
 * Every rendered page-builder block gets a scroll-spy label.
 * Unknown future block types still appear (CMS title → type name).
 */
export function getSectionNavTitle(section: SectionLike): string {
  const explicitNavLabel = readString(section.navLabel) || readString(section.scrollSpyLabel)
  if (explicitNavLabel) return shortenNavTitle(explicitNavLabel)

  if (section._type === 'koolitusTrainingScheduleBlock') {
    const header = readString(section.headerTitle)
    if (header) return shortenNavTitle(header.replace(/,\s*koolitusprogramm/i, ' koolitusprogramm'))
    return SECTION_NAV_LABELS.koolitusTrainingScheduleBlock
  }

  return (
    pickCmsNavTitle(section) ||
    SECTION_NAV_LABELS[section._type] ||
    shortenNavTitle(humanizeBlockType(section._type))
  )
}
