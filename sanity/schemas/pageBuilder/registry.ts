/**
 * Global marketing page-builder blocks (shared across mainPage, koolitusPage, etc.).
 * Block `_type` names keep the `home*` prefix for backward compatibility with existing data.
 */
import homeHeroBlock from './home/homeHeroBlock'
import marketingSplitHeroBlock from './home/marketingSplitHeroBlock'
import homePartnersBlock from './home/homePartnersBlock'
import homeTestimonialsBlock from './home/homeTestimonialsBlock'
import homeQuizBandBlock from './home/homeQuizBandBlock'
import painPointsBlock from './painPointsBlock'
import homeNineDaysMiniBlock from './home/homeNineDaysMiniBlock'
import homeGrantBlock from './home/homeGrantBlock'
import homeAboutBlock from './home/homeAboutBlock'
import homePhotoMarqueeBlock from './home/homePhotoMarqueeBlock'
import homeBeforeAfterBlock from './home/homeBeforeAfterBlock'
import homePricingBlock from './home/homePricingBlock'
import homeFinalCtaBlock from './home/homeFinalCtaBlock'
import homeHeroFeaturesBlock from './home/homeHeroFeaturesBlock'
import mainAndresCardBlock from './home/mainAndresCardBlock'
import casesBlock from './home/casesBlock'
import thesesGridBlock from './home/thesesGridBlock'
import programDaysTabs from './programDaysTabs'
import homeKkkBlock from './home/homeKkkBlock'
import homeSeoConversionBlock from './home/homeSeoConversionBlock'
import clientsHeaderBlock from './home/clientsHeaderBlock'
import andresBlock from './andresBlock'
import statsBlock from './statsBlock'
import newsletterBlock from './newsletterBlock'
import { koolitusPageBuilderBlocks, koolitusSectionTypes } from './koolitus'
import { opstarPageBuilderBlocks, opstarSectionTypes } from './opstar'
import { aboutPageBuilderBlocks, aboutSectionTypes } from './about'
import { kontaktPageBuilderBlocks, kontaktSectionTypes } from './kontakt'
import { legacyPageBuilderBlocks, legacySectionTypes } from './legacy'
import { withScrollSpyNavFields } from './withScrollSpyNavFields'

/** All marketing blocks — use in any page document `sections` array. */
export const marketingSectionTypes = [
  { type: 'homeHeroBlock' },
  { type: 'marketingSplitHeroBlock' },
  { type: 'homePartnersBlock' },
  { type: 'homeTestimonialsBlock' },
  { type: 'homeQuizBandBlock' },
  { type: 'homeSeoConversionBlock' },
  { type: 'painPointsBlock' },
  { type: 'homeNineDaysMiniBlock' },
  { type: 'homeGrantBlock' },
  { type: 'homeAboutBlock' },
  { type: 'homePhotoMarqueeBlock' },
  { type: 'homeBeforeAfterBlock' },
  { type: 'homePricingBlock' },
  { type: 'homeFinalCtaBlock' },
  { type: 'homeHeroFeaturesBlock' },
  { type: 'mainAndresCardBlock' },
  { type: 'casesBlock' },
  { type: 'thesesGridBlock' },
  { type: 'programDaysTabs' },
  { type: 'helpFormTeaserBlock' },
  { type: 'homeKkkBlock' },
  { type: 'clientsHeaderBlock' },
  { type: 'andresBlock' },
  { type: 'statsBlock' },
  { type: 'newsletterBlock' },
  ...koolitusSectionTypes,
  ...opstarSectionTypes,
  ...aboutSectionTypes,
  ...kontaktSectionTypes,
  ...legacySectionTypes,
] as const

export type MarketingSectionType = (typeof marketingSectionTypes)[number]['type']

export const marketingPageBuilderBlocks = [
  homeHeroBlock,
  marketingSplitHeroBlock,
  homePartnersBlock,
  homeTestimonialsBlock,
  homeQuizBandBlock,
  painPointsBlock,
  homeSeoConversionBlock,
  homeNineDaysMiniBlock,
  homeGrantBlock,
  homeAboutBlock,
  homePhotoMarqueeBlock,
  homeBeforeAfterBlock,
  homePricingBlock,
  homeFinalCtaBlock,
  homeHeroFeaturesBlock,
  mainAndresCardBlock,
  casesBlock,
  thesesGridBlock,
  programDaysTabs,
  homeKkkBlock,
  clientsHeaderBlock,
  andresBlock,
  statsBlock,
  newsletterBlock,
  ...koolitusPageBuilderBlocks,
  ...opstarPageBuilderBlocks,
  ...aboutPageBuilderBlocks,
  ...kontaktPageBuilderBlocks,
  ...legacyPageBuilderBlocks,
].map((block) => withScrollSpyNavFields(block))
