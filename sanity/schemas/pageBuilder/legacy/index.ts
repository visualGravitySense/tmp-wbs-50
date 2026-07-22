import aboutHeroBlock from './aboutHeroBlock'
import koolitusHeroBlock from './koolitusHeroBlock'
import homeChallengesBlock from './homeChallengesBlock'
import legacyPainBlock from './legacyPainBlock'
import koolitusAudienceBlock from './koolitusAudienceBlock'
import opstarKoImSammastBlock from './opstarKoImSammastBlock'
import koolitusNineDaysProgramBlock from '../koolitus/koolitusNineDaysProgramBlock'

export {
  aboutHeroBlock,
  koolitusHeroBlock,
  homeChallengesBlock,
  legacyPainBlock,
  koolitusAudienceBlock,
  opstarKoImSammastBlock,
  koolitusNineDaysProgramBlock,
}

export const legacyPageBuilderBlocks = [
  aboutHeroBlock,
  koolitusHeroBlock,
  homeChallengesBlock,
  legacyPainBlock,
  koolitusAudienceBlock,
  opstarKoImSammastBlock,
  koolitusNineDaysProgramBlock,
]

export const legacySectionTypes = legacyPageBuilderBlocks.map((b) => ({
  type: b.name,
})) as { type: string }[]