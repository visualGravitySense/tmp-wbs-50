/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { BookOpen, UserPlus } from 'lucide-react'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
// ─── Heavy 'use client' components — loaded client-side only ─────────────────
// Using ssr:false prevents their large data props from being serialized into
// the initial HTML document (each can contribute 20-180 KB to the HTML payload).
const PainPointsBlock = dynamic(() => import('@/components/PainPointsBlock'))
const CertificateSection = dynamic(() => import('@/components/CertificateSection'))
const CohortsSection = dynamic(() => import('@/components/CohortsSection'))
const PricingSection = dynamic(() => import('@/components/PricingSection'))
// TrainingSchedule is already lazy (ssr:false) in page.tsx — use same lazy wrapper here
const TrainingSchedule = dynamic(() => import('@/components/TrainingSchedule'))
// ─── Lightweight / SEO-critical — keep as static SSR imports ─────────────────
import BuildingsSection from '@/components/BuildingsSection'
import ContactSection from '@/components/ContactSection'
import CTASection from '@/components/CTASection'
import HeroFeatureCards from '@/components/HeroFeatureCards'
import HelpFormTeaser from '@/components/HelpFormTeaser'
import HeroStatsGrid from '@/components/HeroStatsGrid'
import { sectionBandBorderClass, sectionBandEyebrowClass, sectionBandPadClass } from '@/components/ui/marketing-layout-styles'
import Kkk from '@/components/Kkk'
import KoolitusHeroQuickFacts from '@/components/KoolitusHeroQuickFacts'
const LeanHouse = dynamic(() => import('@/components/LeanHouse'))
import LogoMarquee from '@/components/LogoMarquee'
import PhotoGallery from '@/components/PhotoGallery'
import KoolitusProjects from '@/components/KoolitusProjects'
import TrainingLocation from '@/components/TrainingLocation'
import MarketingSplitHero from '@/components/marketing/MarketingSplitHero'
import {
  MarketingContainer,
  Section,
  BrandVibrantButton,
  WhiteButton,
  SplitHeader,
} from '@/components/ui'
import type { AboutKkkData } from '@/types/about'
import type { KoolitusSection } from '@/types/koolitusSections'
import { resolveKkkSection } from '@/lib/sanity/resolveKkkSection'
import { resolveNineDaysProgramProps } from '@/lib/nineDays/resolveNineDaysProgramProps'
import NineDaysProgramLazy from '@/components/NineDaysProgramLazy'

export type KoolitusSectionRenderContext = {
  koolitusPageData: Record<string, any>
  sanityPage?: Record<string, any> | null
  kkkFallback: Parameters<typeof resolveKkkSection>[2]
  /** mainPage.partners list for the logo marquee block. */
  partners?: any[]
}



export function renderKoolitusSection(
  section: KoolitusSection,
  ctx: KoolitusSectionRenderContext,
): React.ReactNode {
  switch (section._type) {


    case 'koolitusNineDaysProgramBlock': {
      const props = resolveNineDaysProgramProps(
        section.programData as Record<string, unknown> | undefined,
        {
          ctaSection: ctx.koolitusPageData.ctaSection,
          testimonialsSection: ctx.koolitusPageData.testimonialsSection,
        },
      )
      if (!props) return null
      return <NineDaysProgramLazy {...props} />
    }

    case 'koolitusStatsBlock': {
      const hasHeading = Boolean(section.heading?.trim())
      return (
        <Section variant="minimal" className={`border-b ${sectionBandBorderClass} bg-transparent ${sectionBandPadClass}`}>
          <MarketingContainer elevated className="text-center">
            {hasHeading ? (
              <p className={`${sectionBandEyebrowClass} mb-8`}>{section.heading}</p>
            ) : null}
            <HeroStatsGrid
              stats={section.stats && section.stats.length > 0 ? section.stats as any : undefined}
              showDivider={!hasHeading && (section.showDivider ?? true)}
            />
          </MarketingContainer>
        </Section>
      )
    }

    case 'koolitusLogoMarqueeBlock': {
      return (
        <LogoMarquee
          logos={ctx.partners && ctx.partners.length > 0 ? ctx.partners : undefined}
          title={section.title || 'Osalenud ettevõtted'}
        />
      )
    }

    case 'koolitusPhotoGalleryBlock': {
      if (!section.images?.length) return null
      return (
        <PhotoGallery
          title={section.title}
          subtitle={section.subtitle}
          images={section.images as any}
        />
      )
    }

    case 'koolitusLocationBlock': {
      return (
        <TrainingLocation data={section} />
      )
    }


    case 'koolitusProjectsBlock': {
      if (!section.items?.length) return null
      return (
        <KoolitusProjects
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          items={section.items}
        />
      )
    }

    case 'koolitusFeaturesBlock': {
      const f = section.featuresSection as Record<string, any> | undefined
      const eyebrow = f?.eyebrow?.trim() || 'Omadused'
      const title = f?.title?.trim() || 'Miks valida meie 9-päevane programm?'
      const subtitle =
        f?.subtitle?.trim() || 'Unikaalne lähenemine, mis tagasi reaalsed tulemused'

      const mappedFeatures = f?.features?.map((feature: any) => ({
        title: feature.title || '',
        description: feature.description || '',
        icon: feature.icon || undefined,
      }))

      return (
        <Section variant="band">
          <MarketingContainer elevated>
            <SplitHeader
              title={title}
              eyebrow={<EyebrowPillBadge text={eyebrow} />}
              subtitle={subtitle}
              align="center"
              className="mx-auto mb-12 max-w-3xl"
            />
            <HeroFeatureCards features={mappedFeatures?.length ? mappedFeatures : undefined} />
          </MarketingContainer>
        </Section>
      )
    }

    case 'koolitusBuildingsBlock': {
      const b = section.buildingsSection as Record<string, any> | undefined
      if (!b || (!b.title && !b.buildings?.length)) return null
      return (
          <BuildingsSection
            eyebrow={b.eyebrow || undefined}
            title={b.title || ''}
            subtitle={b.subtitle || ''}
            backgroundGradient={b.backgroundGradient || 'from-gray-50 to-blue-50'}
            showStats={b.showStats !== false}
            buildings={
              b.buildings?.map((building: any) => ({
                id: building.id || '',
                title: building.title || '',
                description: building.description || '',
                features: building.features || [],
                icon: building.icon || 'building',
                color: building.color || 'blue',
                size: building.size || 'medium',
                isHighlighted: building.isHighlighted || false,
                stats: building.stats
                  ? { label: building.stats.label || '', value: building.stats.value || '' }
                  : undefined,
                buttonText: building.buttonText || undefined,
                buttonLink: building.buttonLink || undefined,
              })) || []
            }
          />
      )
    }

    case 'koolitusLeanHouseBlock': {
      const l = (section.leanHouseSection ?? {}) as Record<string, any>
      return (
        <LeanHouse
          title={l.title}
          subtitle={l.subtitle}
          description={l.description}
          backgroundColor={l.backgroundColor || undefined}
          roof={l.roof}
          leftPillar={l.leftPillar}
          center={l.center}
          rightPillar={l.rightPillar}
          foundation={l.foundation}
          sideAnnotations={l.sideAnnotations}
          benefits={l.benefits}
        />
      )
    }

    case 'koolitusInvestmentBlock': {
      const i = section.investmentSection as Record<string, any> | undefined
      if (!i || (!i.title && !i.tiers?.length)) return null
      return <PricingSection data={i} columns={4} />
    }

    case 'koolitusLeadFormBlock':
      return (
        <Section variant="band" className="border-t border-[var(--border)]/40">
          <HelpFormTeaser variant="koolitus" data={section.leadFormTeaser} />
        </Section>
      )

    case 'koolitusCohortsBlock': {
      const cohorts = (section.cohortsSection ?? {}) as Record<string, any>
      if (!cohorts.title && !cohorts.cohorts?.length) return null
      return (
        <CohortsSection
          eyebrow={cohorts.eyebrow}
          title={cohorts.title}
          filterLabel={cohorts.filterLabel}
          filters={cohorts.filters}
          cohorts={cohorts.cohorts}
          maxParticipantsNote={cohorts.maxParticipantsNote}
          jtbdSection={cohorts.jtbdSection}
          alertBanner={cohorts.alertBanner}
          subsidyFooter={cohorts.subsidyFooter}
          chooserSection={cohorts.chooserSection}
          backgroundColor={cohorts.backgroundColor}
        />
      )
    }

    case 'koolitusCertificateBlock': {
      const c = (section.certificateSection ?? {}) as Record<string, any>
      if (!c.title && !c.proofText && !c.certName) return null
      return (
          <CertificateSection
            eyebrow={c.eyebrow}
            title={c.title}
            titleHighlight={c.titleHighlight}
            subtitle={c.subtitle}
            proofText={c.proofText}
            proofNumber={c.proofNumber}
            habitLabel={c.habitLabel}
            habitText={c.habitText}
            habitHighlight={c.habitHighlight}
            meaningLabel={c.meaningLabel}
            meaningPills={c.meaningPills}
            meaningResponses={c.meaningResponses}
            useCasesTitle={c.useCasesTitle}
            useCases={c.useCases}
            requirementsTitle={c.requirementsTitle}
            requirements={c.requirements}
            certName={c.certName}
            certTitle={c.certTitle}
            certSubtitle={c.certSubtitle}
            certificateImage={c.certificateImage}
            certMeta={c.certMeta}
            countriesTitle={c.countriesTitle}
            countriesSubtitle={c.countriesSubtitle}
            countries={c.countries}
            alumniTitle={c.alumniTitle}
            alumniText={c.alumniText}
            alumniHighlight={c.alumniHighlight}
            alumniAvatars={c.alumniAvatars}
            ctaText={c.ctaText}
            ctaLink={c.ctaLink}
            backgroundColor={c.backgroundColor}
          />
      )
    }

    case 'koolitusKkkBlock': {
      const kkkSectionData = resolveKkkSection(
        section.kkkDocument as AboutKkkData | null | undefined,
        section.kkk as AboutKkkData | null | undefined,
        ctx.kkkFallback,
      )
      return <Kkk kkkData={kkkSectionData} />
    }

    case 'koolitusCtaBlock': {
      const c = section.ctaSection as Record<string, any> | undefined
      if (!c || (!c.title && !c.description)) return null
      return (
        <CTASection
          title={c.title}
          subtitle={c.subtitle}
          description={c.description}
          primaryButtonText={c.primaryButtonText}
          primaryButtonUrl={c.primaryButtonUrl}
          secondaryButtonText={c.secondaryButtonText}
          secondaryButtonUrl={c.secondaryButtonUrl}
          primaryButtonIcon={c.primaryButtonIcon}
          secondaryButtonIcon={c.secondaryButtonIcon}
          trustFootnote={c.trustFootnote}
          backgroundColor={c.backgroundColor || 'blue-purple'}
        />
      )
    }

    case 'koolitusContactBlock': {
      const c = section.contactSection as Record<string, any> | undefined
      if (!c || (!c.title && !c.email && !c.phone)) return null
      return (
        <ContactSection
          title={c.title}
          description={c.description}
          email={c.email}
          phone={c.phone}
          address={c.address}
          backgroundColor={c.backgroundColor || 'blue-lightblue'}
        />
      )
    }

    case 'koolitusTrainingScheduleBlock': {
      if (section.enabled === false) return null
      return <TrainingSchedule data={section} />
    }

    case 'homePricingBlock': {
      const p = (section as any).pricingSection
      if (!p?.tiers || p.tiers.length === 0) return null
      return <PricingSection data={p} columns={3} />
    }

    default:
      return null
  }
}
