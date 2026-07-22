export type BuilderSkipFlags = {
  skipQuizBand: boolean
  skipNineDaysMini: boolean
  skipPartners: boolean
  skipAbout: boolean
  skipTestimonials: boolean
  skipPhotoMarquee: boolean
  skipBeforeAfter: boolean
  skipPricing: boolean
  skipFinalCta: boolean
}

/** Skip legacy below-fold sections when the same content is rendered via page builder. */
export function getBuilderSkipFlags(
  builderBlockTypes: Set<string>,
): BuilderSkipFlags {
  return {
    skipQuizBand: builderBlockTypes.has('homeQuizBandBlock'),
    skipNineDaysMini: builderBlockTypes.has('homeNineDaysMiniBlock'),
    skipPartners: builderBlockTypes.has('homePartnersBlock'),
    skipAbout: builderBlockTypes.has('homeAboutBlock'),
    skipTestimonials: builderBlockTypes.has('homeTestimonialsBlock'),
    skipPhotoMarquee: builderBlockTypes.has('homePhotoMarqueeBlock'),
    skipBeforeAfter: builderBlockTypes.has('homeBeforeAfterBlock'),
    skipPricing: builderBlockTypes.has('homePricingBlock'),
    skipFinalCta: builderBlockTypes.has('homeFinalCtaBlock'),
  }
}
