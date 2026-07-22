import type { HomeHeroBlock } from '@/types/mainPageSections'

/** Shape expected by `HeroSection` hero fields (subset of legacy flat `mainPage`). */
export function heroBlockToMainPageData(block: HomeHeroBlock) {
  return {
    eyebrow: block.eyebrow,
    headline: block.headline,
    scriptHeadline: block.scriptHeadline,
    description: block.description,
    primaryCta: block.primaryCta,
    secondaryCta: block.secondaryCta,
    socialProof: block.socialProof,
  }
}
