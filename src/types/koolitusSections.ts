/** Koolitus page-builder block types (reusable on any marketing page). */
import type { HomePricingBlock } from './mainPageSections'

export type KoolitusNineDaysProgramBlock = {
  _type: 'koolitusNineDaysProgramBlock'
  _key: string
  isVisible?: boolean
  hideFromScrollNav?: boolean
  navLabel?: string
  programData?: Record<string, unknown>
}

export type KoolitusStatsBlock = {
  _type: 'koolitusStatsBlock'
  _key: string
  heading?: string
  stats?: Array<{ number?: string; suffix?: string; label: string }>
  showDivider?: boolean
}

export type KoolitusPhotoGalleryBlock = {
  _type: 'koolitusPhotoGalleryBlock'
  _key: string
  title?: string
  subtitle?: string
  images?: Array<{
    _key: string
    asset: Record<string, unknown>
    tag?: string
    alt?: string
    size?: 'normal' | 'large' | 'wide'
  }>
}

export type KoolitusLocationBlock = {
  _type: 'koolitusLocationBlock'
  _key: string
  addressTitle?: string
  addressText?: string
  transportNote?: string
  contactText?: string
  phone?: string
  email?: string
  mapEmbedUrl?: string
  mapButtonUrl?: string
  subsidyText?: string
  subsidyLink?: string
}

export type KoolitusAudienceBlock = {
  _type: 'koolitusAudienceBlock'
  _key: string
  audienceSection?: Record<string, unknown>
}

export type KoolitusProjectsBlock = {
  _type: 'koolitusProjectsBlock'
  _key: string
  eyebrow?: string
  title?: string
  description?: string
  items?: Array<{
    _key: string
    title?: string
    description?: string
    tag?: string
    image?: {
      asset: Record<string, unknown>
      alt?: string
    }
  }>
}

export type KoolitusFeaturesBlock = {
  _type: 'koolitusFeaturesBlock'
  _key: string
  featuresSection?: Record<string, unknown>
}

export type KoolitusBuildingsBlock = {
  _type: 'koolitusBuildingsBlock'
  _key: string
  buildingsSection?: Record<string, unknown>
}

export type KoolitusLeanHouseBlock = {
  _type: 'koolitusLeanHouseBlock'
  _key: string
  leanHouseSection?: Record<string, unknown>
}

export type KoolitusInvestmentBlock = {
  _type: 'koolitusInvestmentBlock'
  _key: string
  investmentSection?: Record<string, unknown>
}

export type KoolitusLeadFormBlock = {
  _type: 'koolitusLeadFormBlock'
  _key: string
  leadFormTeaser?: Record<string, unknown>
}

export type KoolitusCohortsBlock = {
  _type: 'koolitusCohortsBlock'
  _key: string
  cohortsSection?: Record<string, unknown>
}

export type KoolitusLogoMarqueeBlock = {
  _type: 'koolitusLogoMarqueeBlock'
  _key: string
  title?: string
}

export type KoolitusCertificateBlock = {
  _type: 'koolitusCertificateBlock'
  _key: string
  certificateSection?: Record<string, unknown>
}

export type KoolitusKkkBlock = {
  _type: 'koolitusKkkBlock'
  _key: string
  kkkDocument?: unknown
  kkk?: Record<string, unknown>
}

export type KoolitusCtaBlock = {
  _type: 'koolitusCtaBlock'
  _key: string
  ctaSection?: Record<string, unknown>
}

export type KoolitusContactBlock = {
  _type: 'koolitusContactBlock'
  _key: string
  contactSection?: Record<string, unknown>
}

export type KoolitusTrainingScheduleBlock = {
  _type: 'koolitusTrainingScheduleBlock'
  _key: string
  enabled?: boolean
  headerTitle?: string
  headerSubtitle?: string
  image?: any
  description1?: string
  description2?: string
  tag1?: string
  tag2?: string
  dailyScheduleTitle?: string
  dailyScheduleItems?: Array<{ time?: string; title?: string; desc?: string }>
  foodCardText?: string
  infoBannerSub?: string
  infoBannerTitle?: string
  modules?: Array<{ num?: string; type?: string; week?: string; date?: string; title?: string; desc?: string; details?: string }>
  footerNote?: string
}

export type KoolitusSection =
  | KoolitusNineDaysProgramBlock
  | KoolitusStatsBlock
  | KoolitusLogoMarqueeBlock
  | KoolitusAudienceBlock
  | KoolitusProjectsBlock
  | KoolitusFeaturesBlock
  | KoolitusBuildingsBlock
  | KoolitusLeanHouseBlock
  | KoolitusInvestmentBlock
  | KoolitusLeadFormBlock
  | KoolitusCohortsBlock
  | KoolitusCertificateBlock
  | KoolitusKkkBlock
  | KoolitusCtaBlock
  | KoolitusContactBlock
  | KoolitusPhotoGalleryBlock
  | KoolitusLocationBlock
  | KoolitusTrainingScheduleBlock
  | HomePricingBlock

export const KOOLITUS_SECTION_TYPES = new Set<string>([
  'koolitusNineDaysProgramBlock',
  'koolitusStatsBlock',
  'koolitusLogoMarqueeBlock',
  'koolitusAudienceBlock',
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
  'koolitusPhotoGalleryBlock',
  'koolitusLocationBlock',
  'koolitusTrainingScheduleBlock',
  'homePricingBlock',
])

export function isKoolitusSection(value: unknown): value is KoolitusSection {
  if (!value || typeof value !== 'object') return false
  const t = (value as { _type?: string })._type
  return typeof t === 'string' && KOOLITUS_SECTION_TYPES.has(t)
}
