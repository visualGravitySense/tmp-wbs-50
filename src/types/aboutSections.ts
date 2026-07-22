export type AboutQuoteBlock = {
  _type: 'aboutQuoteBlock'
  _key: string
  quoteSection?: Record<string, unknown>
}

export type AboutNarrativeBlock = {
  _type: 'aboutNarrativeBlock'
  _key: string
  aboutSection?: Record<string, unknown>
}

export type AboutExperienceBlock = {
  _type: 'aboutExperienceBlock'
  _key: string
  experienceSection?: Record<string, unknown>
}

export type AboutCtaBlock = {
  _type: 'aboutCtaBlock'
  _key: string
  ctaSection?: Record<string, unknown>
}

export type AboutGuaranteeBlock = {
  _type: 'aboutGuaranteeBlock'
  _key: string
  guaranteeSection?: Record<string, unknown>
}

export type AboutKeyAchievementsBlock = {
  _type: 'aboutKeyAchievementsBlock'
  _key: string
  keyAchievements?: Record<string, unknown>
}

export type AboutWorldVisitsBlock = {
  _type: 'aboutWorldVisitsBlock'
  _key: string
  worldManufacturingVisits?: Record<string, unknown>
}

export type AboutKkkBlock = {
  _type: 'aboutKkkBlock'
  _key: string
  kkkDocument?: unknown
  kkk?: Record<string, unknown>
}

export type AboutContactBlock = {
  _type: 'aboutContactBlock'
  _key: string
  contactSection?: Record<string, unknown>
}

export type AboutCohortsBlock = {
  _type: 'aboutCohortsBlock'
  _key: string
  cohortsDummy?: boolean
}

export type AboutSection =
  | AboutQuoteBlock
  | AboutNarrativeBlock
  | AboutExperienceBlock
  | AboutCtaBlock
  | AboutGuaranteeBlock
  | AboutKeyAchievementsBlock
  | AboutWorldVisitsBlock
  | AboutKkkBlock
  | AboutContactBlock
  | AboutCohortsBlock

const ABOUT_SECTION_TYPES = new Set<string>([
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
])

export function isAboutSection(value: unknown): value is AboutSection {
  if (!value || typeof value !== 'object') return false
  const t = (value as { _type?: string })._type
  return typeof t === 'string' && ABOUT_SECTION_TYPES.has(t)
}
