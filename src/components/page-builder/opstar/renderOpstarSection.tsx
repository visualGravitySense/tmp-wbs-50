/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Award, Building2, Sparkles, Star, Users, CalendarCheck, Eye } from 'lucide-react'
import Cases from '@/components/Cases'
import CTASection from '@/components/CTASection'
import KolmSammast from '@/components/KolmSammast'
import OpstarProfitFramework from '@/components/OpstarProfitFramework'
import Kkk from '@/components/Kkk'
import { normalizeKkkFaqs, resolveKkkSection } from '@/lib/sanity/resolveKkkSection'
import type { AboutKkkData } from '@/types/about'
import ComparisonBlock from '@/components/ComparisonBlock'
import { mergeOpstarComparisonSources } from '@/lib/opstar/comparisonDefaults'
import { resolveLeanVsOpstarData } from '@/lib/opstar/leanVsOpstarDefaults'
import MarketingSplitHero from '@/components/marketing/MarketingSplitHero'
import MeodetavadTulemused from '@/components/MeodetavadTulemused'
import OpstarProfit8Components from '@/components/OpstarProfit8Components'
import OpstarProfitAcronymGrid from '@/components/OpstarProfitAcronymGrid'
import OpstarProfitBlock from '@/components/OpstarProfitBlock'
import { MarketingContainer, Section, BrandVibrantButton, WhiteButton, marketingInsetCardClass, marketingPanelClass } from '@/components/ui'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { urlFor } from '@/sanity/lib/image'
import type { PartnerLogo } from '@/types/partner'
import type { OpstarSection } from '@/types/opstarSections'

import OpstarProfitHeroDiagram from '@/components/OpstarProfitHeroDiagram'

export type OpstarSectionRenderContext = {
  opstarProfitData: Record<string, any>
  sanityPage?: Record<string, any> | null
  comparisonPartners: PartnerLogo[]
  orbitBlockFallback: Record<string, any>
  globalStats?: any[]
}

export const emptyOpstarSectionContext: OpstarSectionRenderContext = {
  opstarProfitData: {},
  comparisonPartners: [],
  orbitBlockFallback: {},
}


export function renderOpstarSection(
  section: OpstarSection,
  ctx: OpstarSectionRenderContext,
): React.ReactNode {
  switch (section._type) {

    case 'opstarAcronymGridBlock':
      if ((section as { enabled?: boolean }).enabled === false) return null
      return <OpstarProfitAcronymGrid />

    case 'opstarOrbitBlock': {
      const blockData =
        (section.orbitBlock as Record<string, any> | undefined) ??
        ctx.sanityPage?.orbitBlock ??
        ctx.orbitBlockFallback
      if (!blockData?.title && !blockData?.illustration?.centralText) return null
      
      const fallbackMetrics = ctx.globalStats?.slice(0, 3).map((s: any) => ({
        value: `${s.number || ''}${s.suffix || ''}`,
        label: s.label,
        number: s.number,
        suffix: s.suffix
      }))
      const metrics = blockData?.heroMetrics?.length ? blockData.heroMetrics : fallbackMetrics
      
      return <OpstarProfitBlock blockData={{ ...blockData, heroMetrics: metrics }} />
    }

    case 'opstarComparisonBlock': {
      const comparison = mergeOpstarComparisonSources(
        section.comparison as Record<string, any> | undefined,
        ctx.opstarProfitData.comparison as Record<string, any> | undefined,
      )
      return (
        <ComparisonBlock
          variant="opstar-profit"
          comparisonData={comparison}
          partners={ctx.comparisonPartners}
        />
      )
    }

    case 'opstarKolmSammastBlock': {
      const kolm =
        (section.kolmSammast as Record<string, any> | undefined) ??
        ctx.opstarProfitData.kolmSammast
      if (!kolm || (!kolm.title && !kolm.sammbad?.length && !kolm.pillars?.length && !kolm.steps?.length)) return null
      return <KolmSammast kolmSammastData={kolm} />
    }

    case 'opstarFrameworkBlock': {
      const framework =
        (section.framework as Record<string, any> | undefined) ??
        ctx.opstarProfitData.framework
      return <OpstarProfitFramework frameworkData={framework} />
    }

    case 'opstarEightComponentsBlock': {
      const eight =
        (section.eightComponents as Record<string, any> | undefined) ??
        ctx.opstarProfitData.eightComponents
      if (!eight || (!eight.title && !eight.components?.length)) return null
      return <OpstarProfit8Components componentsData={eight} />
    }

    case 'opstarLeanVsOpstarBlock': {
      const sectionLean = section.leanVsOpstar as Record<string, any> | undefined
      const legacyLean = ctx.opstarProfitData.leanVsOpstar as Record<string, any> | undefined
      const merged = {
        ...legacyLean,
        ...sectionLean,
        comparisonItems:
          sectionLean?.comparisonItems?.length
            ? sectionLean.comparisonItems
            : legacyLean?.comparisonItems,
        cta: sectionLean?.cta ?? legacyLean?.cta,
      }
      return (
        <ComparisonBlock
          variant="lean-vs-opstar"
          leanVsOpstarData={resolveLeanVsOpstarData(merged)}
        />
      )
    }

    case 'opstarMeasuredResultsBlock': {
      const results =
        (section.meodetavadTulemused as Record<string, any> | undefined) ??
        ctx.opstarProfitData.meodetavadTulemused
      if (!results || (!results.title && !results.results?.length && !results.metrics?.length)) return null
      return <MeodetavadTulemused tulemusedData={results} />
    }

    case 'opstarCasesBlock': {
      const cases =
        (section.cases as Record<string, any> | undefined) ?? ctx.opstarProfitData.cases
      if (!cases || (!cases.title && !cases.caseStudies?.length && !cases.cases?.length)) return null
      return <Cases casesData={cases} />
    }

    case 'opstarKkkBlock': {
      const inlineKkk =
        (section.kkk as AboutKkkData | undefined) ??
        (ctx.opstarProfitData.kkk as AboutKkkData | undefined)
      if (!inlineKkk || (!inlineKkk.title && normalizeKkkFaqs(inlineKkk).length === 0)) return null
      const kkkData = resolveKkkSection(null, inlineKkk, { faqs: [] })
      return <Kkk kkkData={kkkData} />
    }

    case 'opstarCtaBlock': {
      const cta = (section.cta as Record<string, any> | undefined) ?? ctx.opstarProfitData.cta
      if (!cta || (!cta.title && !cta.description)) return null
      return (
        <CTASection
          title={cta.title}
          subtitle={cta.subtitle}
          description={cta.description}
          backgroundColor={cta.backgroundColor}
          primaryButtonText={cta.primaryButtonText}
          primaryButtonUrl={cta.primaryButtonUrl}
          primaryButtonIcon="→"
          secondaryButtonText={cta.secondaryButtonText}
          secondaryButtonUrl={cta.secondaryButtonUrl}
          secondaryButtonIcon="🔍"
          trustFootnote={cta.trustFootnote}
        />
      )
    }

    case 'opstarContentSectionsBlock': {
      const sections =
        (section.contentSections as Array<Record<string, any>> | undefined) ??
        ctx.opstarProfitData.contentSections
      if (!sections?.length) return null
      return (
        <>
          {sections.map((item: Record<string, any>, sectionIndex: number) => (
            <Section key={sectionIndex} variant="band">
              <div className="pointer-events-none absolute -top-20 left-1/4 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-blue-600/14 via-cyan-500/8 to-transparent blur-[110px] dark:from-blue-600/22" />
              <div className="pointer-events-none absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-gradient-to-tl from-indigo-600/10 to-transparent blur-[90px] dark:from-indigo-600/16" />
              <MarketingContainer elevated>
                <div className={marketingPanelClass}>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/45 to-transparent dark:from-white/[0.04] dark:to-transparent" />
                  <div className="relative">
                    <h2 className="mb-3 text-2xl font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mb-8 max-w-3xl text-[15px] font-medium leading-relaxed text-[rgb(var(--text-secondary))] sm:text-base">
                      {item.description}
                    </p>
                    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                      {item.features?.map((feature: any, featureIndex: number) => (
                        <div
                          key={featureIndex}
                          className={marketingInsetCardClass}
                        >
                          <div className="mb-3 text-lg font-black text-[rgb(var(--text-primary))] sm:text-xl">
                            {feature.title}
                          </div>
                          <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </MarketingContainer>
            </Section>
          ))}
        </>
      )
    }

    default:
      return null
  }
}
