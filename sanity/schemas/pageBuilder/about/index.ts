import aboutQuoteBlock from './aboutQuoteBlock'
import aboutNarrativeBlock from './aboutNarrativeBlock'
import aboutExperienceBlock from './aboutExperienceBlock'
import aboutCtaBlock from './aboutCtaBlock'
import aboutGuaranteeBlock from './aboutGuaranteeBlock'
import aboutKeyAchievementsBlock from './aboutKeyAchievementsBlock'
import aboutWorldVisitsBlock from './aboutWorldVisitsBlock'
import aboutKkkBlock from './aboutKkkBlock'
import aboutCohortsBlock from './aboutCohortsBlock'
import aboutContactBlock from './aboutContactBlock'

export {
  aboutQuoteBlock,
  aboutNarrativeBlock,
  aboutExperienceBlock,
  aboutCtaBlock,
  aboutGuaranteeBlock,
  aboutKeyAchievementsBlock,
  aboutWorldVisitsBlock,
  aboutKkkBlock,
  aboutContactBlock,
  aboutCohortsBlock,
}

export const aboutPageBuilderBlocks = [
  aboutQuoteBlock,
  aboutNarrativeBlock,
  aboutExperienceBlock,
  aboutCtaBlock,
  aboutGuaranteeBlock,
  aboutKeyAchievementsBlock,
  aboutWorldVisitsBlock,
  aboutKkkBlock,
  aboutContactBlock,
  aboutCohortsBlock,
]

export const aboutSectionTypes = aboutPageBuilderBlocks.map((b) => ({
  type: b.name,
})) as { type: string }[]
