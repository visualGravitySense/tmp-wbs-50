import type {
  MainPageCtaLink,
  MainPageSection,
  MarketingSplitHeroBlock,
  PainPointsBlockType,
} from '@/types/mainPageSections'

type LooseRecord = Record<string, unknown>

function stringLinkToCtaLink(link?: string): MainPageCtaLink | undefined {
  if (!link?.trim()) return undefined
  const trimmed = link.trim()
  const isExternal = /^https?:\/\//i.test(trimmed)
  return {
    _type: 'link',
    linkType: isExternal ? 'external' : 'internal',
    url: trimmed,
  }
}

function buttonToCta(button: unknown): { text?: string; link?: MainPageCtaLink } | undefined {
  if (!button || typeof button !== 'object') return undefined
  const b = button as { text?: string; link?: string }
  if (!b.text?.trim() && !b.link?.trim()) return undefined
  return {
    text: b.text,
    link: stringLinkToCtaLink(b.link),
  }
}

export function aboutHeroToMarketingSplitHero(block: LooseRecord): MarketingSplitHeroBlock {
  const hero = (block.hero ?? block) as LooseRecord
  const image = (hero.image ?? hero.heroImage) as MarketingSplitHeroBlock['heroImage']

  return {
    _type: 'marketingSplitHeroBlock',
    _key: (block._key as string) ?? 'legacy-about-hero',
    eyebrow: (hero.eyebrow as string) ?? undefined,
    headline: (hero.headline as string) ?? '',
    scriptHeadline: (hero.subtitle as string) ?? (hero.scriptHeadline as string) ?? undefined,
    description: hero.description as string | undefined,
    rightComponentType: 'aboutAndres',
    heroImage: image,
    linkedinUrl: hero.linkedinUrl as string | undefined,
    floatingBadges: hero.floatingBadges as MarketingSplitHeroBlock['floatingBadges'],
    badges: (hero.badges ?? hero.technologyBadges) as MarketingSplitHeroBlock['badges'],
    primaryCta: buttonToCta(hero.primaryButton ?? hero.primaryCta),
    secondaryCta: buttonToCta(hero.secondaryButton ?? hero.secondaryCta),
  }
}

export function koolitusHeroToMarketingSplitHero(block: LooseRecord): MarketingSplitHeroBlock {
  const hero = (block.hero ?? block) as LooseRecord

  return {
    _type: 'marketingSplitHeroBlock',
    _key: (block._key as string) ?? 'legacy-koolitus-hero',
    eyebrow: hero.eyebrow as string | undefined,
    headline: hero.headline as string | undefined,
    scriptHeadline: (hero.scriptHeadline as string) ?? (hero.subtitle as string) ?? undefined,
    description: hero.description as string | undefined,
    rightComponentType: 'quickFacts',
    quickFactsCard: hero.quickFactsCard,
    badges: hero.badges as MarketingSplitHeroBlock['badges'],
    primaryCta: buttonToCta(hero.primaryButton ?? hero.primaryCta),
    secondaryCta: buttonToCta(hero.secondaryButton ?? hero.secondaryCta),
    globalStats: Array.isArray(hero.stats)
      ? { stats: hero.stats as MarketingSplitHeroBlock['globalStats'] extends { stats?: infer S } ? S : never }
      : undefined,
  }
}

export function homeChallengesToPainPoints(block: LooseRecord): PainPointsBlockType {
  const challenges = (block.challenges ?? {}) as LooseRecord
  return {
    _type: 'painPointsBlock',
    _key: (block._key as string) ?? 'legacy-challenges',
    variant: 'roles',
    challenges: challenges as PainPointsBlockType['challenges'],
    title: challenges.title as string | undefined,
  }
}

export function painBlockToPainPoints(block: LooseRecord): PainPointsBlockType {
  return {
    _type: 'painPointsBlock',
    _key: (block._key as string) ?? 'legacy-pain',
    variant: 'grid',
    eyebrow: block.eyebrow as string | undefined,
    title: (block.heading as string) ?? (block.title as string) ?? undefined,
    subheading: block.subheading as string | undefined,
    items: block.items as PainPointsBlockType['items'],
    bottomText: block.bottomText as string | undefined,
    ctaText: block.ctaText as string | undefined,
    ctaLink: block.ctaLink as string | undefined,
  }
}

export function koolitusAudienceToPainPoints(block: LooseRecord): PainPointsBlockType {
  const audience = (block.audienceSection ?? {}) as LooseRecord
  return {
    _type: 'painPointsBlock',
    _key: (block._key as string) ?? 'legacy-audience',
    variant: 'audience',
    ...audience,
    title: (audience.title as string) ?? undefined,
  } as PainPointsBlockType
}

/** Map deprecated CMS block `_type` values to current canonical types (runtime fallback). */
export function normalizeLegacySection(section: unknown): MainPageSection | null {
  if (!section || typeof section !== 'object') return null
  const block = section as LooseRecord
  const type = block._type

  switch (type) {
    case 'aboutHeroBlock':
      return aboutHeroToMarketingSplitHero(block)
    case 'koolitusHeroBlock':
      return koolitusHeroToMarketingSplitHero(block)
    case 'homeChallengesBlock':
      return homeChallengesToPainPoints(block)
    case 'painBlock':
      return painBlockToPainPoints(block)
    case 'koolitusAudienceBlock':
      return koolitusAudienceToPainPoints(block)
    case 'opstarKoImSammastBlock':
      return { ...block, _type: 'opstarKolmSammastBlock' } as MainPageSection
    default:
      return section as MainPageSection
  }
}

export const LEGACY_HERO_BLOCK_TYPES = new Set([
  'marketingSplitHeroBlock',
  'aboutHeroBlock',
  'koolitusHeroBlock',
])

export function sectionHasHeroBlock(section: { _type?: string } | null | undefined): boolean {
  return Boolean(section?._type && LEGACY_HERO_BLOCK_TYPES.has(section._type))
}