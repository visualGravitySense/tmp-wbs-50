import type { MainPageSection } from '@/types/mainPageSections'

export type OpstarBuilderSkipFlags = {
  skipHero: boolean
  skipAcronymGrid: boolean
  skipOrbit: boolean
  skipComparison: boolean
  skipKolmSammast: boolean
  skipFramework: boolean
  skipEightComponents: boolean
  skipLeanVsOpstar: boolean
  skipMeasuredResults: boolean
  skipCases: boolean
  skipTestimonials: boolean
  skipKkk: boolean
  skipCta: boolean
  skipContentSections: boolean
  skipPartners: boolean
  skipBeforeAfter: boolean
  skipFinalCta: boolean
}

export function getOpstarBuilderSkipFlags(
  builderBlockTypes: Set<MainPageSection['_type']>,
): OpstarBuilderSkipFlags {
  return {
    skipHero: builderBlockTypes.has('marketingSplitHeroBlock'),
    skipAcronymGrid: builderBlockTypes.has('opstarAcronymGridBlock'),
    skipOrbit: builderBlockTypes.has('opstarOrbitBlock'),
    skipComparison: builderBlockTypes.has('opstarComparisonBlock'),
    skipKolmSammast: builderBlockTypes.has('opstarKolmSammastBlock'),
    skipFramework: builderBlockTypes.has('opstarFrameworkBlock'),
    skipEightComponents: builderBlockTypes.has('opstarEightComponentsBlock'),
    skipLeanVsOpstar: builderBlockTypes.has('opstarLeanVsOpstarBlock'),
    skipMeasuredResults: builderBlockTypes.has('opstarMeasuredResultsBlock'),
    skipCases: builderBlockTypes.has('opstarCasesBlock'),
    skipTestimonials: builderBlockTypes.has('homeTestimonialsBlock'),
    skipKkk: builderBlockTypes.has('opstarKkkBlock'),
    skipCta: builderBlockTypes.has('opstarCtaBlock'),
    skipContentSections: builderBlockTypes.has('opstarContentSectionsBlock'),
    skipPartners: builderBlockTypes.has('homePartnersBlock'),
    skipBeforeAfter: builderBlockTypes.has('homeBeforeAfterBlock'),
    skipFinalCta: builderBlockTypes.has('homeFinalCtaBlock'),
  }
}
