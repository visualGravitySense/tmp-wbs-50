import type { PartnerLogo } from '@/types/partner'
import type { KoolitusSection } from '@/types/koolitusSections'
import { isKoolitusSection } from '@/types/koolitusSections'
import type { OpstarSection } from '@/types/opstarSections'
import { isOpstarSection } from '@/types/opstarSections'
import type { AboutSection as AboutPageBuilderSection } from '@/types/aboutSections'
import { isAboutSection } from '@/types/aboutSections'
import type { KontaktSection } from '@/types/kontaktSections'
import { isKontaktSection } from '@/types/kontaktSections'

export type MainPageCtaLink = {
  _type?: 'link'
  linkType?: 'external' | 'internal'
  url?: string
  reference?: {
    _type?: string
    _ref?: string
    slug?: { current: string }
  }
}

export type MarketingSplitHeroBlock = {
  _type: 'marketingSplitHeroBlock'
  _key: string
  eyebrow?: string
  headline?: string
  scriptHeadline?: string
  description?: string
  rightComponentType?: 'image' | 'quickFacts' | 'aboutAndres' | 'opstarDiagram' | 'blogImage' | 'clientsStats'
  heroImage?: {
    asset?: { _ref: string; _type: string }
    alt?: string
  }
  linkedinUrl?: string
  floatingBadges?: Array<{ label?: string; text?: string; icon?: string; positionX?: number; positionY?: number }>
  badges?: Array<{ text?: string; color?: string; size?: string }>
  quickFactsCard?: any
  globalStats?: {
    stats?: Array<{
      number?: string
      suffix?: string
      label?: string
    }>
  }
  opstarProfitBlockRef?: any
  primaryCta?: { text?: string; link?: MainPageCtaLink }
  secondaryCta?: { text?: string; link?: MainPageCtaLink }
  stats?: Array<{ value?: string; label?: string }>
}

export type HomeStatsBlock = {
  _type: 'statsBlock'
  _key: string
  heading?: string
  stats?: Array<{
    number?: string
    suffix?: string
    label?: string
  }>
  showDivider?: boolean
}

export type HomeHeroBlock = {
  _type: 'homeHeroBlock'
  _key: string
  eyebrow?: string
  headline?: string
  scriptHeadline?: string
  description?: string
  primaryCta?: { text: string; link: MainPageCtaLink }
  secondaryCta?: { text: string; link: MainPageCtaLink }
  socialProof?: { text?: string; highlight?: string }

}

export type HomePartnersBlock = {
  _type: 'homePartnersBlock'
  _key: string
  partnersTitle?: string
  partners?: PartnerLogo[]
}

export type HomeHeroFeaturesBlock = {
  _type: 'homeHeroFeaturesBlock'
  _key: string
  eyebrow?: string
  title?: string
  scriptSubtitle?: string
  description?: string
  features?: Array<{
    title: string
    description: string
    icon?: string
    svgIcon?: string
  }>
}

export type HomeTestimonialsInlineItem = {
  name?: string
  role?: string
  company?: string
  content?: string
  rating?: number
  avatar?: {
    asset?: { _ref: string; _type: string }
    alt?: string
  }
}

export type HomeTestimonialsBlock = {
  _type: 'homeTestimonialsBlock'
  _key: string
  featuredReviews?: unknown
  testimonialReferences?: Array<{
    _id: string
    name: string
    role?: string
    company?: string
    text: string
    rating?: number
    avatar?: {
      asset?: { _ref: string; _type: string; url?: string }
      alt?: string
    }
    tags?: string[]
  }>
  testimonials?: {
    title?: string
    subtitle?: string
    testimonials?: HomeTestimonialsInlineItem[]
    buttonText?: string
    buttonLink?: string
  }
}

export type QuizContent = {
  title?: string
  eyebrow?: string
  introTopLine?: string
  introAccentLine?: string
  introDescription?: string
  questions?: Array<{
    question?: string
    options?: Array<{ text?: string; points?: number }>
  }>
  results?: Array<{ minScore?: number; title?: string; description?: string; ctaLink?: string }>
}

export type HelpFormTeaserContent = {
  enabled?: boolean
  eyebrow?: string
  title?: string
  description?: string
  buttonText?: string
  formUrl?: string
}

export type SeoConversionSectionContent = {
  enabled?: boolean
  anchorId?: string
  eyebrow?: string
  title?: string
  intro?: string
  terms?: Array<{
    termId?: string
    title?: string
    subtitle?: string
    description?: string
  }>
}

export type HomeSeoConversionBlock = {
  _type: 'homeSeoConversionBlock'
  _key: string
  seoConversionSection?: SeoConversionSectionContent
}

export type HomeQuizBandBlock = {
  _type: 'homeQuizBandBlock'
  _key: string
  quiz?: QuizContent
  helpFormTeaser?: HelpFormTeaserContent
}

export type ChallengesSectionContent = {
  title?: string
  scriptTitle?: string
  eyebrow?: string
  subheading?: string
  managerTitle?: string
  participantTitle?: string
  collectiveTitle?: string
  managerChallenges?: string[]
  participantChallenges?: string[]
  collectiveChallenges?: string[]
  conclusion?: string
}

export type HomeChallengesBlock = {
  _type: 'homeChallengesBlock'
  _key: string
  challenges?: ChallengesSectionContent
}

export type PainPointsBlockType = {
  _type: 'painPointsBlock'
  _key: string
  variant?: 'roles' | 'grid' | 'audience'
  challenges?: ChallengesSectionContent
  eyebrow?: string
  heading?: string
  title?: string
  subheading?: string
  items?: Array<{
    title?: string
    description?: string
  }>
  bottomText?: string
  socialProofIntro?: string
  cards?: Array<{
    quote?: string
    behavior?: string
    percentage?: string
    revealText?: string
    revealLink?: string
  }>
  confirmButtonText?: string
  transformBar?: {
    beforeLabel?: string
    beforeText?: string
    afterLabel?: string
    afterText?: string
  }
  goalSection?: {
    label?: string
    placeholder?: string
    confirmText?: string
  }
  directorPath?: {
    title?: string
    description?: string
    linkText?: string
    linkUrl?: string
  }
  ctaText?: string
  ctaLink?: string
  contactModalTitle?: string
  contactModalDescription?: string
  contactModalSuccessTitle?: string
  contactModalSuccessText?: string
}


export type MainAndresCardBlock = {
  _type: 'mainAndresCardBlock'
  _key: string
  badge?: string
  title?: string
  subtitle?: string
  description?: string
  image?: {
    asset?: { _ref: string; _type: string }
    alt?: string
  }
  ctaButton?: {
    text?: string
    link?: string
  }
}

export type GrantSectionContent = Record<string, unknown>

export type HomeGrantBlock = {
  _type: 'homeGrantBlock'
  _key: string
  grantSection?: GrantSectionContent
}

export type AboutAndresSectionContent = Record<string, unknown>

export type HomeAboutBlock = {
  _type: 'homeAboutBlock'
  _key: string
  aboutAndres?: AboutAndresSectionContent
}

export type PhotoMarqueeSectionContent = {
  title?: string
  subtitle?: string
  mobileLayout?: 'scroll' | 'marquee'
  gradientFrom?: string
  gradientTo?: string
  cta?: {
    text?: string
    link?: string
  }
  photos?: Array<{
    image?: {
      asset?: { _ref: string; _type: string; url?: string }
      alt?: string
    }
    caption?: string
    showOnMain?: boolean
  }>
}

export type HomePhotoMarqueeBlock = {
  _type: 'homePhotoMarqueeBlock'
  _key: string
  photoMarquee?: PhotoMarqueeSectionContent
}

export type BeforeAfterSectionContent = Record<string, unknown>

export type HomeBeforeAfterBlock = {
  _type: 'homeBeforeAfterBlock'
  _key: string
  beforeAfter?: BeforeAfterSectionContent
}

export type PricingSectionContent = Record<string, unknown>

export type HomePricingBlock = {
  _type: 'homePricingBlock'
  _key: string
  pricingSection?: PricingSectionContent
}

export type FinalCtaContent = Record<string, unknown>

export type HomeFinalCtaBlock = {
  _type: 'homeFinalCtaBlock'
  _key: string
  finalCTA?: FinalCtaContent
}

export type ThesesGridBlock = {
  _type: 'thesesGridBlock'
  _key: string
  variant?: 'preview' | 'full'
  sectionTitle?: string
  sectionSubtitle?: string
  theses?: Array<{
    _id: string
    title: string
    author: string
    school: string
    year: number
    type: string
    category: string
    keywords?: string[]
    abstract: string
    achievement?: string
    sourceUrl?: string
    mentorComment?: string
  }>
}

export type HomeCasesBlock = {
  _type: 'casesBlock'
  _key: string
  eyebrow?: string
  heading?: string
  subheading?: string
  cases?: Array<{
    companyName?: string
    year?: string
    sector?: string
    employeesCount?: string
    location?: string
    beforeOee?: string
    beforePraak?: string
    beforeUletunnid?: string
    afterOee?: string
    afterPraak?: string
    afterUletunnid?: string
    summaryResult?: string
    duration?: string
  }>
}

export type PainBlock = {
  _type: 'painBlock'
  _key: string
  eyebrow?: string
  heading?: string
  subheading?: string
  items?: Array<{
    title?: string
    description?: string
  }>
  bottomText?: string
  ctaText?: string
  ctaLink?: string
}

export type ProgramDaysTabsBlock = {
  _type: 'programDaysTabs'
  _key: string
  title?: string
  eyebrow?: string
  scriptTitle?: string
  isMinimal?: boolean
  popupTitle?: string
  popupSubtitle?: string
  days?: Array<{
      dayNumber: number
      tag?: string
      title: string
      quote?: string
      description?: string
      fullPoints?: string[]
      typeLabel?: string
      companyPainTitle?: string
      companyPain?: string[]
      shortSolution?: string[]
      participantWins?: string
      companyWins?: string
    }>
  }

/** Homepage mini 9-day program block (Sanity `homeNineDaysMiniBlock`). */
export type HomeNineDaysMiniBlock = {
  _type: 'homeNineDaysMiniBlock'
  _key: string
  nineDaysMini?: Record<string, unknown>
}

/** Smaily newsletter signup block (page builder). */
export type NewsletterBlock = {
  _type: 'newsletterBlock'
  _key: string
  title?: string
  subtitle?: string
  placeholder?: string
  buttonText?: string
  successMessage?: string
  note?: string
  tag?: string
  source?: string
  variant?: 'horizontal' | 'sidebar'
}

export type HelpFormTeaserBlock = {
  _type: 'helpFormTeaserBlock'
  _key: string
  enabled?: boolean
  eyebrow?: string
  title?: string
  description?: string
  buttonText?: string
  image?: { asset?: { _id?: string; url?: string } }
  questions?: Array<{
    question?: string
    options?: Array<{ text?: string; points?: number }>
  }>
}

export type HomeKkkBlock = {
  _type: 'homeKkkBlock'
  _key: string
  kkkSection?: Record<string, unknown>
}

export type ClientsHeaderBlock = {
  _type: 'clientsHeaderBlock'
  _key: string
  clientsEyebrow?: string
  clientsMainHeadline?: string
  clientsScriptHeadline?: string
  clientsDescription?: string
}

export type AndresBlockType = {
  _type: 'andresBlock'
  _key: string
  variant?: 'compact' | 'medium' | 'full'
  name?: string
  subtitle?: string
  quote?: string
  shortBio?: string
  bio?: any[]
  photo?: {
    asset?: { _ref: string; _type: string; url?: string; blurDataURL?: string }
    alt?: string
  }
  secondaryPhotos?: Array<{
    asset?: { _ref: string; _type: string; url?: string; blurDataURL?: string }
    alt?: string
  }>
  stats?: Array<{ value?: string; label?: string }>
  tags?: string[]
  fieldExperience?: string
  eyebrow?: string
  ctaLink?: string
  ctaLabel?: string
  methodologyTitle?: string
  methodologyText?: string
  methodology?: string // Keeping for backwards compatibility during migration
  timeline?: Array<{
    year: string
    title: string
    description?: string
  }>
  factories?: Array<{
    name: string
    description?: string
    logo?: {
      asset: { _ref: string; _type: string; url?: string }
    }
  }>
}

export type MainPageSection =
  | HomeHeroBlock
  | MarketingSplitHeroBlock
  | HomeHeroFeaturesBlock
  | HomePartnersBlock
  | HomeTestimonialsBlock
  | HomeQuizBandBlock

  | PainPointsBlockType
  | HomeGrantBlock
  | MainAndresCardBlock
  | HomeAboutBlock
  | HomePhotoMarqueeBlock
  | HomeBeforeAfterBlock
  | HomePricingBlock
  | HomeFinalCtaBlock
  | HomeSeoConversionBlock
  | HomeCasesBlock
  | ThesesGridBlock
  | PainBlock
  | ProgramDaysTabsBlock
  | HomeNineDaysMiniBlock
  | NewsletterBlock
  | HomeStatsBlock
  | HelpFormTeaserBlock
  | HomeKkkBlock
  | ClientsHeaderBlock
  | AndresBlockType
  | KoolitusSection
  | OpstarSection
  | AboutPageBuilderSection
  | KontaktSection

const MAIN_PAGE_SECTION_TYPES = new Set<string>([
  'homeHeroBlock',
  'marketingSplitHeroBlock',
  'statsBlock',
  'homeHeroFeaturesBlock',
  'homePartnersBlock',
  'homeTestimonialsBlock',
  'homeQuizBandBlock',

  'painPointsBlock',
  'mainAndresCardBlock',
  'homeGrantBlock',
  'homeNineDaysMiniBlock',
  'newsletterBlock',
  'homeAboutBlock',
  'homePhotoMarqueeBlock',
  'homeBeforeAfterBlock',
  'homePricingBlock',
  'homeFinalCtaBlock',
  'homeSeoConversionBlock',
  'casesBlock',
  'thesesGridBlock',
  'painBlock',
  'homeChallengesBlock',
  'aboutHeroBlock',
  'koolitusHeroBlock',
  'opstarKoImSammastBlock',
  'programDaysTabs',
  'helpFormTeaserBlock',
  'homeKkkBlock',
  'clientsHeaderBlock',
  'andresBlock',
  ...Array.from(
    new Set([

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
    ]),
  ),
  ...Array.from(
    new Set([
      'opstarAcronymGridBlock',
      'opstarOrbitBlock',
      'opstarComparisonBlock',
      'opstarKolmSammastBlock',
      'opstarFrameworkBlock',
      'opstarEightComponentsBlock',
      'opstarLeanVsOpstarBlock',
      'opstarMeasuredResultsBlock',
      'opstarCasesBlock',
      'opstarKkkBlock',
      'opstarCtaBlock',
      'opstarContentSectionsBlock',
    ]),
  ),
  ...Array.from(
    new Set([
      'aboutQuoteBlock',
      'aboutNarrativeBlock',
      'aboutExperienceBlock',
      'aboutCtaBlock',
      'aboutGuaranteeBlock',
      'aboutKeyAchievementsBlock',
      'aboutWorldVisitsBlock',
      'aboutKkkBlock',
      'aboutContactBlock',
    ]),
  ),
])

export function isMainPageSection(value: unknown): value is MainPageSection {
  if (isKoolitusSection(value)) return true
  if (isOpstarSection(value)) return true
  if (isAboutSection(value)) return true
  if (isKontaktSection(value)) return true
  if (!value || typeof value !== 'object') return false
  const t = (value as { _type?: string })._type
  return typeof t === 'string' && MAIN_PAGE_SECTION_TYPES.has(t)
}
