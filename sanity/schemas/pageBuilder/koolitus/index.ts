import koolitusStatsBlock from './koolitusStatsBlock'
import koolitusProjectsBlock from './koolitusProjectsBlock'
import koolitusFeaturesBlock from './koolitusFeaturesBlock'
import koolitusBuildingsBlock from './koolitusBuildingsBlock'
import koolitusLeanHouseBlock from './koolitusLeanHouseBlock'
import koolitusInvestmentBlock from './koolitusInvestmentBlock'
import koolitusLeadFormBlock from './koolitusLeadFormBlock'
import koolitusCohortsBlock from './koolitusCohortsBlock'
import koolitusCertificateBlock from './koolitusCertificateBlock'
import koolitusKkkBlock from './koolitusKkkBlock'
import koolitusCtaBlock from './koolitusCtaBlock'
import koolitusContactBlock from './koolitusContactBlock'
import koolitusLocationBlock from './koolitusLocationBlock'
import koolitusLogoMarqueeBlock from './koolitusLogoMarqueeBlock'
import koolitusPhotoGalleryBlock from './koolitusPhotoGalleryBlock'

import koolitusTrainingScheduleBlock from './koolitusTrainingScheduleBlock'

export {
  koolitusStatsBlock,
  koolitusProjectsBlock,
  koolitusFeaturesBlock,
  koolitusBuildingsBlock,
  koolitusLeanHouseBlock,
  koolitusInvestmentBlock,
  koolitusLeadFormBlock,
  koolitusCohortsBlock,
  koolitusCertificateBlock,
  koolitusKkkBlock,
  koolitusCtaBlock,
  koolitusContactBlock,
  koolitusLocationBlock,
  koolitusLogoMarqueeBlock,
  koolitusPhotoGalleryBlock,
  koolitusTrainingScheduleBlock,
}

export const koolitusPageBuilderBlocks = [
  koolitusStatsBlock,
  koolitusProjectsBlock,
  koolitusFeaturesBlock,
  koolitusBuildingsBlock,
  koolitusLeanHouseBlock,
  koolitusInvestmentBlock,
  koolitusLeadFormBlock,
  koolitusCohortsBlock,
  koolitusCertificateBlock,
  koolitusKkkBlock,
  koolitusCtaBlock,
  koolitusContactBlock,
  koolitusLocationBlock,
  koolitusLogoMarqueeBlock,
  koolitusPhotoGalleryBlock,
  koolitusTrainingScheduleBlock,
]

export const koolitusSectionTypes = koolitusPageBuilderBlocks.map((b) => ({
  type: b.name,
})) as { type: string }[]
