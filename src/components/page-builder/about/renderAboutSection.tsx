/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import AboutGuaranteeSection from '@/components/about/AboutGuaranteeSection'
import AboutExperienceSection from '@/components/about/AboutExperienceSection'
import AboutKeyAchievementsSection from '@/components/about/AboutKeyAchievementsSection'
import AboutNarrativeSection from '@/components/about/AboutNarrativeSection'
import AboutQuoteCarousel from '@/components/about/AboutQuoteCarousel'
import AboutWorldManufacturingVisitsSection from '@/components/about/AboutWorldManufacturingVisitsSection'
import CTASection from '@/components/CTASection'
import ContactSection from '@/components/ContactSection'
import CohortsSection from '@/components/CohortsSection'
import Kkk from '@/components/Kkk'
import MarketingSplitHero from '@/components/marketing/MarketingSplitHero'
import { BrandVibrantButton, WhiteButton, SectionBadge, marketingMicroPillClass, Container } from '@/components/ui'
import { Phone, GraduationCap, Sparkles, Building2, Users, Award, Star } from 'lucide-react'
import { Avatar } from '@/components/ui'
import { urlFor } from '@/sanity/lib/image'
import { resolveKkkSection } from '@/lib/sanity/resolveKkkSection'
import { resolveQuoteSection } from '@/lib/sanity/resolveQuoteSection'
import type {
  AboutKkkData,
  AboutPage,
  AboutSection as AboutNarrativeSectionData,
} from '@/types/about'
import type { AboutSection } from '@/types/aboutSections'

export type AboutSectionRenderContext = {
  aboutPageData: AboutPage
  sanityPage?: Record<string, any> | null
  kkkFallback: Parameters<typeof resolveKkkSection>[2]
  cohorts?: any
}

/** Minimal context for about blocks with inline section data (e.g. on main page). */
export const emptyAboutSectionContext: AboutSectionRenderContext = {
  aboutPageData: {} as AboutPage,
  kkkFallback: { faqs: [] },
}



export function renderAboutSection(
  section: AboutSection,
  ctx: AboutSectionRenderContext,
): React.ReactNode {
  switch (section._type) {


    case 'aboutQuoteBlock': {
      const quoteSectionData = resolveQuoteSection(
        (section.quoteSection ?? ctx.aboutPageData.quoteSection) as AboutPage['quoteSection'],
      )
      return quoteSectionData ? <AboutQuoteCarousel data={quoteSectionData} /> : null
    }

    case 'aboutNarrativeBlock': {
      const narrative =
        (section.aboutSection as AboutNarrativeSectionData | undefined) ??
        ctx.aboutPageData.aboutSection
      if (!narrative || (!narrative.title && !narrative.content?.length)) return null
      return <AboutNarrativeSection data={narrative} />
    }

    case 'aboutExperienceBlock': {
      const experience =
        (section.experienceSection as AboutPage['experienceSection']) ??
        ctx.aboutPageData.experienceSection
      if (!experience || (!experience.title && !experience.experienceItems?.length)) return null
      return <AboutExperienceSection experienceSection={experience} />
    }

    case 'aboutGuaranteeBlock': {
      const guarantee =
        (section.guaranteeSection as AboutPage['guaranteeSection']) ??
        ctx.aboutPageData.guaranteeSection
      if (!guarantee || (!guarantee.headline && !guarantee.pillars?.length)) return null
      return <AboutGuaranteeSection data={guarantee} />
    }

    case 'aboutCtaBlock': {
      const cta =
        (section.ctaSection as AboutPage['ctaSection']) ?? ctx.aboutPageData.ctaSection
      if (!cta || (!cta.title && !cta.description)) return null
      return (
        <CTASection
          title={cta.title}
          subtitle={cta.subtitle}
          description={cta.description}
          backgroundColor={cta.backgroundColor}
          primaryButtonText={cta.primaryButtonText}
          primaryButtonUrl={cta.primaryButtonUrl}
          secondaryButtonText={cta.secondaryButtonText}
          secondaryButtonUrl={cta.secondaryButtonUrl}
          primaryButtonIcon={cta.primaryButtonIcon}
          secondaryButtonIcon={cta.secondaryButtonIcon}
          trustFootnote={cta.trustFootnote}
          compact
        />
      )
    }

    case 'aboutKeyAchievementsBlock': {
      const achievements =
        (section.keyAchievements as AboutPage['keyAchievements']) ??
        ctx.aboutPageData.keyAchievements
      if (!achievements || (!achievements.title && !achievements.achievements?.length)) return null
      return <AboutKeyAchievementsSection data={achievements} />
    }

    case 'aboutWorldVisitsBlock': {
      const inline = section.worldManufacturingVisits as
        | AboutPage['worldManufacturingVisits']
        | undefined
      const legacy = ctx.aboutPageData.worldManufacturingVisits
      const visits =
        inline?.manufacturingCompanies?.length || inline?.title?.trim()
          ? inline
          : legacy
      if (!visits?.manufacturingCompanies?.length && !visits?.title?.trim()) return null
      return <AboutWorldManufacturingVisitsSection data={visits} />
    }

    case 'aboutKkkBlock': {
      const kkkSectionData = resolveKkkSection(
        (section.kkkDocument ?? ctx.sanityPage?.kkkDocument) as
          | AboutKkkData
          | null
          | undefined,
        (section.kkk ?? ctx.sanityPage?.kkk) as AboutKkkData | null | undefined,
        ctx.kkkFallback,
      )
      return <Kkk kkkData={kkkSectionData} />
    }

    case 'aboutContactBlock': {
      const contact =
        (section.contactSection as AboutPage['contactSection']) ??
        ctx.aboutPageData.contactSection
      if (!contact || (!contact.title && !contact.email && !contact.phone)) return null
      return (
        <ContactSection
          title={contact.title}
          description={contact.description}
          backgroundColor={contact.backgroundColor}
          email={contact.email}
          phone={contact.phone}
          address={contact.address}
        />
      )
    }

    case 'aboutCohortsBlock': {
      if (!ctx.cohorts || ctx.cohorts.length === 0) return null
      return (
        <Container size="6xl" className="mx-auto px-4 md:px-8 py-16">
          <CohortsSection cohorts={ctx.cohorts} />
        </Container>
      )
    }

    default:
      return null
  }
}
