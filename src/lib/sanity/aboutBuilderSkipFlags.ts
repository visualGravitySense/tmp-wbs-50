import type { MainPageSection } from '@/types/mainPageSections'

export type AboutBuilderSkipFlags = {
  skipHero: boolean
  skipQuote: boolean
  skipNarrative: boolean
  skipExperience: boolean
  skipCta: boolean
  skipGuarantee: boolean
  skipKeyAchievements: boolean
  skipWorldVisits: boolean
  skipTestimonials: boolean
  skipKkk: boolean
  skipContact: boolean
  skipPhotoMarquee: boolean
  skipFinalCta: boolean
  skipLogoMarquee: boolean
}

export function getAboutBuilderSkipFlags(
  builderBlockTypes: Set<MainPageSection['_type']>,
): AboutBuilderSkipFlags {
  return {
    skipHero: builderBlockTypes.has('marketingSplitHeroBlock'),
    skipQuote: builderBlockTypes.has('aboutQuoteBlock'),
    skipNarrative: builderBlockTypes.has('aboutNarrativeBlock'),
    skipExperience: builderBlockTypes.has('aboutExperienceBlock'),
    skipCta: builderBlockTypes.has('aboutCtaBlock'),
    skipGuarantee: builderBlockTypes.has('aboutGuaranteeBlock'),
    skipKeyAchievements: builderBlockTypes.has('aboutKeyAchievementsBlock'),
    skipWorldVisits: builderBlockTypes.has('aboutWorldVisitsBlock'),
    skipTestimonials: builderBlockTypes.has('homeTestimonialsBlock'),
    skipKkk: builderBlockTypes.has('aboutKkkBlock'),
    skipContact: builderBlockTypes.has('aboutContactBlock'),
    skipPhotoMarquee: builderBlockTypes.has('homePhotoMarqueeBlock'),
    skipFinalCta: builderBlockTypes.has('homeFinalCtaBlock'),
    skipLogoMarquee: builderBlockTypes.has('homePartnersBlock'),
  }
}
