import type { MainPageSection } from '@/types/mainPageSections'

export type KoolitusBuilderSkipFlags = {
  skipHero: boolean
  skipStats: boolean
  skipLogoMarquee: boolean
  skipPhotoGallery: boolean
  skipAudience: boolean
  skipProjects: boolean
  skipFeatures: boolean
  skipBuildings: boolean
  skipLeanHouse: boolean
  skipInvestment: boolean
  skipLeadForm: boolean
  skipCohorts: boolean
  skipCertificate: boolean
  skipKkk: boolean
  skipCta: boolean
  skipContact: boolean
  skipLocation: boolean
  skipPartners: boolean
  skipGrant: boolean
  skipTestimonials: boolean
  skipPhotoMarquee: boolean
  skipPricing: boolean
  skipFinalCta: boolean
  skipAbout: boolean
}

export function getKoolitusBuilderSkipFlags(
  builderBlockTypes: Set<MainPageSection['_type']>,
): KoolitusBuilderSkipFlags {
  return {
    skipHero: builderBlockTypes.has('marketingSplitHeroBlock'),
    skipStats: builderBlockTypes.has('koolitusStatsBlock'),
    skipLogoMarquee: builderBlockTypes.has('koolitusLogoMarqueeBlock'),
    skipPhotoGallery: builderBlockTypes.has('koolitusPhotoGalleryBlock'),
    skipAudience: builderBlockTypes.has('koolitusAudienceBlock'),
    skipProjects: builderBlockTypes.has('koolitusProjectsBlock'),
    skipFeatures: builderBlockTypes.has('koolitusFeaturesBlock'),
    skipBuildings: builderBlockTypes.has('koolitusBuildingsBlock'),
    skipLeanHouse: builderBlockTypes.has('koolitusLeanHouseBlock'),
    skipInvestment: builderBlockTypes.has('koolitusInvestmentBlock'),
    skipLeadForm: builderBlockTypes.has('koolitusLeadFormBlock'),
    skipCohorts: builderBlockTypes.has('koolitusCohortsBlock'),
    skipCertificate: builderBlockTypes.has('koolitusCertificateBlock'),
    skipKkk: builderBlockTypes.has('koolitusKkkBlock'),
    skipCta: builderBlockTypes.has('koolitusCtaBlock'),
    skipContact: builderBlockTypes.has('koolitusContactBlock'),
    skipLocation: builderBlockTypes.has('koolitusLocationBlock'),
    skipPartners: builderBlockTypes.has('homePartnersBlock'),
    skipGrant: builderBlockTypes.has('homeGrantBlock'),
    skipTestimonials: builderBlockTypes.has('homeTestimonialsBlock'),
    skipPhotoMarquee: builderBlockTypes.has('homePhotoMarqueeBlock'),
    skipPricing: builderBlockTypes.has('homePricingBlock'),
    skipFinalCta: builderBlockTypes.has('homeFinalCtaBlock'),
    skipAbout: builderBlockTypes.has('homeAboutBlock'),
  }
}
