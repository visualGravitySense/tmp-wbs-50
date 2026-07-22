import React, { Suspense } from 'react'
import HeroStatsGrid from '@/components/HeroStatsGrid'
import dynamic from 'next/dynamic'
import DeferredViewport from '@/components/DeferredViewport'
import HeroSection from '@/components/HeroSection'
import LogoMarquee from '@/components/LogoMarquee'
import Testimonials from '@/components/Testimonials'
import TestimonialsReviews from '@/components/TestimonialsReviews'
import NineDaysMini from '@/components/NineDaysMini'
import BlogNewsletterForm, { BlogNewsletter } from '@/components/blog/BlogNewsletterForm'
import ProgramDaysTabs from '@/components/ProgramDaysTabs'
import GrantSection from '@/components/GrantSection'
import AboutAndres from '@/components/AboutAndres'
import AndresBlock from '@/components/AndresBlock'
import { ProfileCardSkeleton } from '@/components/CardSkeletons'
import TrainerBioExtended from '@/components/TrainerBioExtended'
import ComparisonBlock from '@/components/ComparisonBlock'
import FinalCTA from '@/components/FinalCTA'
import PhotoGallery from '@/components/PhotoGallery'
const PricingSection = dynamic(() => import('@/components/PricingSection'))
import { MarketingContainer, Section, marketingInsetCardClass } from '@/components/ui'
import { sectionBandBorderClass, sectionBandEyebrowClass, sectionBandPadClass } from '@/components/ui/marketing-layout-styles'
import HeroFeatureCards from '@/components/HeroFeatureCards'
import HomeQuizIntroBand from '@/components/page-builder/sections/HomeQuizIntroBand'
import HomeSeoConversionBand from '@/components/page-builder/sections/HomeSeoConversionBand'
const PainPointsBlock = dynamic(() => import('@/components/PainPointsBlock'))
import Cases from '@/components/Cases'
import ThesesGrid from '@/components/theses/ThesesGrid'
import Kkk from '@/components/Kkk'
import { resolveKkkSection } from '@/lib/sanity/resolveKkkSection'
import type { AboutKkkData } from '@/types/about'
import MainAndresCard from '@/components/MainAndresCard'
import { heroBlockToMainPageData } from '@/components/page-builder/heroBlockToMainPageData'
import { renderMarketingSplitHeroBlock } from '@/components/page-builder/renderMarketingSplitHeroBlock'
import { ClientsHeaderSection } from '@/components/page-builder/sections/ClientsHeaderSection'
import { MARKETING_PAGE_TESTIMONIALS_PREVIEW } from '@/lib/testimonials-pagination'
import { normalizeReviewsFromGroq } from '@/lib/sanity/queries/reviews'
import { resolveFeaturedReviews } from '@/lib/sanity/reviews/resolveFeaturedReviews'
import {
  renderKoolitusSection,
  type KoolitusSectionRenderContext,
} from '@/components/page-builder/koolitus/renderKoolitusSection'
import {
  renderOpstarSection,
  emptyOpstarSectionContext,
  type OpstarSectionRenderContext,
} from '@/components/page-builder/opstar/renderOpstarSection'
import {
  emptyAboutSectionContext,
  renderAboutSection,
  type AboutSectionRenderContext,
} from '@/components/page-builder/about/renderAboutSection'
import { renderKontaktSection } from '@/components/page-builder/kontakt/renderKontaktSection'
import { ScrollSpySection } from '@/components/ScrollSpySection'
import {
  getSectionNavId,
  getSectionNavTitle,
  isSectionHiddenFromScrollNav,
} from '@/lib/scrollSpy/sectionNavTitle'
import { normalizeLegacySection } from '@/lib/sanity/normalizeLegacySection'
import { isKoolitusSection } from '@/types/koolitusSections'
import { isOpstarSection } from '@/types/opstarSections'
import { isAboutSection } from '@/types/aboutSections'
import type {
  HomeAboutBlock,
  HomeBeforeAfterBlock,
  PainPointsBlockType,
  HomeFinalCtaBlock,
  HomeGrantBlock,
  HomeHeroBlock,
  MarketingSplitHeroBlock,
  HomeHeroFeaturesBlock,
  HomePartnersBlock,
  HomePhotoMarqueeBlock,
  HomePricingBlock,
  HomeQuizBandBlock,
  HomeSeoConversionBlock,
  HomeTestimonialsBlock,
  HomeCasesBlock,
  ThesesGridBlock,
  HomeKkkBlock,
  HomeNineDaysMiniBlock,
  NewsletterBlock,
  MainAndresCardBlock,
  MainPageSection,
  ProgramDaysTabsBlock,
} from '@/types/mainPageSections'
import type { Review } from '@/types/review'

export type PageSectionsLegacy = {
  quiz?: HomeQuizBandBlock['quiz']
  helpFormTeaser?: HomeQuizBandBlock['helpFormTeaser']
  seoConversionSection?: any
  grantSection?: HomeGrantBlock['grantSection']
  aboutAndres?: HomeAboutBlock['aboutAndres']
  andresProfile?: any
  photoMarquee?: HomePhotoMarqueeBlock['photoMarquee']
  beforeAfter?: HomeBeforeAfterBlock['beforeAfter']
  pricingSection?: HomePricingBlock['pricingSection']
  finalCTA?: HomeFinalCtaBlock['finalCTA']
}

export type PageSectionsProps = {
  sections: MainPageSection[]
  reviewPool: Review[]
  isDraft?: boolean
  globalFinalCtaBannerBackground?: string
  legacy?: PageSectionsLegacy
  legacyFeaturedReviews?: unknown
  legacyTestimonials?: HomeTestimonialsBlock['testimonials']
  partners?: any[]
  partnersTitle?: string
  /** Koolitus-only: page-level data for nine-days nested props + hero quick facts. */
  koolitusContext?: KoolitusSectionRenderContext
  /** OPSTAR Profit-only: partners, orbit fallback, merged page data. */
  opstarContext?: OpstarSectionRenderContext
  globalStats?: any
  globalNineDaysProgram?: any
  /** About page. */
  aboutContext?: AboutSectionRenderContext
  /** Hide 4-metric strip under trainer photo card (e.g. /about). */
  hideHeroGlobalStatsStrip?: boolean
  /** Homepage: render all sections immediately to avoid scroll jumps from deferred mounts. */
  disableBelowFoldDefer?: boolean
}

function resolveTestimonialsBlockReviews(
  block: HomeTestimonialsBlock,
  reviewPool: Review[],
  isDraft: boolean,
): Review[] {
  const featured = block.featuredReviews
  if (isDraft) {
    return normalizeReviewsFromGroq(featured)
  }
  return resolveFeaturedReviews(featured, reviewPool)
}

function renderHomeHeroBlock(block: HomeHeroBlock, ctx: PageSectionsProps) {
  if (!block.headline && !block.description && !block.scriptHeadline) return null
  return (
    <HeroSection
      variant="centered"
      eyebrow={block.eyebrow}
      headline={block.headline || ''}
      scriptLine={block.scriptHeadline}
      description={block.description}
      primaryCTA={block.primaryCta}
      secondaryCTA={block.secondaryCta}
    />
  )
}

function renderHomePartnersBlock(block: HomePartnersBlock) {
  return (
    <LogoMarquee
      logos={block.partners && block.partners.length > 0 ? block.partners : undefined}
      title={block.partnersTitle ?? 'Osalenud'}
    />
  )
}

function renderHomeTestimonialsBlock(
  block: HomeTestimonialsBlock,
  reviewPool: Review[],
  isDraft: boolean,
  legacy?: Pick<PageSectionsProps, 'legacyFeaturedReviews' | 'legacyTestimonials'>,
) {
  const hasFeatured =
    Array.isArray(block.featuredReviews) && block.featuredReviews.length > 0
  const blockWithLegacy: HomeTestimonialsBlock = {
    ...block,
    featuredReviews: hasFeatured
      ? block.featuredReviews
      : (legacy?.legacyFeaturedReviews as HomeTestimonialsBlock['featuredReviews']),
    testimonials: block.testimonials ?? legacy?.legacyTestimonials,
  }

  if (block.testimonialReferences && block.testimonialReferences.length > 0) {
    const normalizedRefs = block.testimonialReferences.map((ref) => {
      const avatar = ref.avatar?.asset?._ref && ref.avatar?.asset?._type
        ? {
            asset: {
              _ref: ref.avatar.asset._ref,
              _type: ref.avatar.asset._type,
            },
            alt: ref.avatar.alt,
          }
        : undefined

      return {
        name: ref.name,
        role: ref.role,
        company: ref.company,
        content: ref.text,
        avatar,
      }
    })

    return (
      <Testimonials
        data={{
          title: block.testimonials?.title,
          subtitle: block.testimonials?.subtitle,
          testimonials: normalizedRefs,
          buttonText: block.testimonials?.buttonText,
          buttonLink: block.testimonials?.buttonLink,
        }}
      />
    )
  }

  const resolved = resolveTestimonialsBlockReviews(blockWithLegacy, reviewPool, isDraft)
  const seeAllHref =
    blockWithLegacy.testimonials?.buttonLink?.trim() || '/testimonials'

  if (resolved.length > 0) {
    return (
      <TestimonialsReviews
        reviews={resolved}
        previewLimit={MARKETING_PAGE_TESTIMONIALS_PREVIEW}
        seeAllHref={seeAllHref}
      />
    )
  }

  if (blockWithLegacy.testimonials) {
    return (
      <Testimonials
        data={
          blockWithLegacy.testimonials as React.ComponentProps<
            typeof Testimonials
          >['data']
        }
      />
    )
  }

  return null
}

function renderHomeQuizBandBlock(
  block: HomeQuizBandBlock,
  legacy?: PageSectionsLegacy,
) {
  const quiz = block.quiz ?? legacy?.quiz
  if (!quiz?.introTopLine && !quiz?.introAccentLine && !quiz?.questions?.length) return null

  return <HomeQuizIntroBand quiz={quiz} />
}

function renderHomeSeoConversionBlock(block: HomeSeoConversionBlock) {
  if (!block.seoConversionSection?.title && !block.seoConversionSection?.intro && !block.seoConversionSection?.terms?.length) return null
  return <HomeSeoConversionBand seoConversionSection={block.seoConversionSection} />
}

function renderHomeGrantBlock(block: HomeGrantBlock, legacy?: PageSectionsLegacy) {
  const grantSection = block.grantSection ?? legacy?.grantSection
  if (!grantSection?.title && !grantSection?.description) return null
  return (
    <Section
      variant="minimal"
      className="overflow-hidden bg-transparent px-4 py-10 sm:px-6 sm:py-12 lg:px-10"
    >
      <GrantSection data={grantSection} />
    </Section>
  )
}

function renderHomeAboutBlock(block: HomeAboutBlock, ctx: PageSectionsProps) {

  // Fallback to old behavior
  const aboutAndres = block.aboutAndres ?? ctx.legacy?.aboutAndres
  if (!aboutAndres?.title && !aboutAndres?.description && !aboutAndres?.quote) return null
  if (ctx.koolitusContext) {
    return <TrainerBioExtended data={aboutAndres as any} />
  }
  return <AboutAndres data={aboutAndres} />
}

function renderHomePhotoMarqueeBlock(block: HomePhotoMarqueeBlock, legacy?: PageSectionsLegacy) {
  const photoMarquee: any = block.photoMarquee ?? legacy?.photoMarquee
  if (!photoMarquee?.photos || photoMarquee.photos.length === 0) return null
  
  const previewPhotos = photoMarquee.photos.filter((item: any) => item.showOnMain === true)
  if (previewPhotos.length === 0) return null

  return (
    <PhotoGallery
      variant="preview"
      title={photoMarquee.title}
      subtitle={photoMarquee.subtitle}
      mobileLayout={photoMarquee.mobileLayout}
      gradientFrom={photoMarquee.gradientFrom}
      gradientTo={photoMarquee.gradientTo}
      images={previewPhotos.map((item: any, i: number) => ({
        _key: `pm-${i}`,
        asset: item.image?.asset,
        alt: item.image?.alt || item.caption,
        tag: item.caption,
      }))}
    />
  )
}

function renderHomeBeforeAfterBlock(block: HomeBeforeAfterBlock, legacy?: PageSectionsLegacy) {
  const beforeAfter: any = block.beforeAfter ?? legacy?.beforeAfter
  if (!beforeAfter) return null
  const hasTransformations = Array.isArray(beforeAfter.transformations) && beforeAfter.transformations.length > 0
  const hasCases = Array.isArray(beforeAfter.cases) && beforeAfter.cases.length > 0
  if (!hasTransformations && !hasCases) return null
  return <ComparisonBlock variant="before-after" data={beforeAfter} />
}

function renderHomePricingBlock(block: HomePricingBlock, legacy?: PageSectionsLegacy, ctx?: PageSectionsProps) {
  const pricingSection: any = block.pricingSection ?? legacy?.pricingSection
  if (!pricingSection?.tiers || pricingSection.tiers.length === 0) return null
  return <PricingSection data={pricingSection} columns={3} />
}

function renderHomeFinalCtaBlock(
  block: HomeFinalCtaBlock,
  globalFinalCtaBannerBackground?: string,
  legacy?: PageSectionsLegacy,
) {
  const finalCTA = block.finalCTA ?? legacy?.finalCTA
  if (!finalCTA?.title && !finalCTA?.subtitle) return null
  return (
    <FinalCTA data={finalCTA} bannerBackground={globalFinalCtaBannerBackground} />
  )
}

function renderThesesGridBlock(block: ThesesGridBlock, ctx: PageSectionsProps) {
  if (!block.theses || block.theses.length === 0) return null
  return (
    <ThesesGrid
      key={block._key}
      sectionTitle={block.sectionTitle}
      sectionSubtitle={block.sectionSubtitle}
      theses={block.theses as any}
      variant={block.variant || (ctx.aboutContext ? 'preview' : 'full')}
    />
  )
}

function renderHomeCasesBlock(block: HomeCasesBlock) {
  if (!block.cases || block.cases.length === 0) return null

  const caseStudies = block.cases.map((c) => ({
    company: c.companyName || '',
    industry: c.sector || '',
    employees: c.employeesCount || '',
    location: c.location || '',
    year: Number(c.year) || new Date().getFullYear(),
    beforeMetrics: [
      { label: 'OEE', value: c.beforeOee || '' },
      { label: 'Praak', value: c.beforePraak || '' },
      { label: 'Ületunnid', value: c.beforeUletunnid || '' },
    ],
    afterMetrics: [
      { label: 'OEE', value: c.afterOee || '' },
      { label: 'Praak', value: c.afterPraak || '' },
      { label: 'Ületunnid', value: c.afterUletunnid || '' },
    ],
    resultMain: c.summaryResult || '',
    resultTime: c.duration || '',
  }))

  return (
    <Cases
      casesData={{
        title: block.heading || 'Päris tulemused päris ettevõtetest',
        eyebrow: block.eyebrow || 'Juhtumiuuringud',
        subtitle: block.subheading,
        caseStudies,
      }}
    />
  )
}

function renderSection(rawSection: MainPageSection, ctx: PageSectionsProps) {
  const section = normalizeLegacySection(rawSection) ?? rawSection
  const {
    reviewPool,
    isDraft,
    legacy,
    globalFinalCtaBannerBackground,
    koolitusContext,
    opstarContext,
    aboutContext,
  } = ctx

  if (isKoolitusSection(section)) {
    const isContextDependent = ['koolitusHeroBlock'].includes(section._type)
    if (!isContextDependent || koolitusContext) {
      return renderKoolitusSection(section, koolitusContext || ({} as any))
    }
  }

  if (isOpstarSection(section)) {
    return renderOpstarSection(section, { ...(opstarContext ?? emptyOpstarSectionContext), globalStats: ctx.globalStats })
  }

  if (isAboutSection(section)) {
    return renderAboutSection(section, aboutContext ?? emptyAboutSectionContext)
  }

  if (section._type.startsWith('kontakt')) {
    return renderKontaktSection({ section })
  }

  switch (section._type) {
    case 'homeHeroBlock':
      return renderHomeHeroBlock(section, ctx)
    case 'marketingSplitHeroBlock':
      return renderMarketingSplitHeroBlock(section as MarketingSplitHeroBlock, {
        ctx,
        hideHeroGlobalStatsStrip: ctx.hideHeroGlobalStatsStrip,
      })
    case 'statsBlock': {
      const statsSection = section as any
      const hasHeading = Boolean(statsSection.heading?.trim())
      return (
        <Section
          key={statsSection._key}
          variant="minimal"
          className={`border-b ${sectionBandBorderClass} bg-transparent ${sectionBandPadClass}`}
        >
          <MarketingContainer elevated className="text-center">
            {hasHeading ? (
              <p className={`${sectionBandEyebrowClass} mb-8`}>{statsSection.heading}</p>
            ) : null}
            <HeroStatsGrid
              stats={statsSection.stats && statsSection.stats.length > 0 ? statsSection.stats : undefined}
              showDivider={!hasHeading && statsSection.showDivider !== false}
            />
          </MarketingContainer>
        </Section>
      )
    }
    case 'homePartnersBlock': {
      return renderHomePartnersBlock(section)
    }
    case 'homeHeroFeaturesBlock':
      if (!section.features || section.features.length === 0) return null
      return (
        <Section key={section._key} className="py-12 md:py-20">
          <HeroFeatureCards 
            eyebrow={section.eyebrow}
            title={section.title}
            scriptSubtitle={section.scriptSubtitle}
            description={section.description}
            features={section.features} 
          />
        </Section>
      )
    case 'homeTestimonialsBlock':
      return renderHomeTestimonialsBlock(section, reviewPool, isDraft ?? false, ctx)
    case 'homeQuizBandBlock':
      return renderHomeQuizBandBlock(section, legacy)
    case 'homeSeoConversionBlock':
      return renderHomeSeoConversionBlock(section)
    case 'painPointsBlock': {
      const variant = (section as any).variant || 'grid'
      const baseProps = {
        _type: section._type,
        _key: section._key,
        variant,
        title: (section as any).title,
        scriptTitle: (section as any).scriptTitle,
        eyebrow: (section as any).eyebrow,
      } as any

      if (variant === 'roles') {
        return (
          <PainPointsBlock
            key={section._key}
            {...baseProps}
            challenges={(section as any).challenges}
          />
        )
      }
      if (variant === 'audience') {
        return (
          <PainPointsBlock
            key={section._key}
            {...baseProps}
            compact={true}
            socialProofIntro={(section as any).socialProofIntro}
            cards={(section as any).cards}
            confirmButtonText={(section as any).confirmButtonText}
            transformBar={(section as any).transformBar}
            goalSection={(section as any).goalSection}
            directorPath={(section as any).directorPath}
            bottomText={(section as any).bottomText}
            ctaText={(section as any).ctaText}
            ctaLink={(section as any).ctaLink}
          />
        )
      }
      // variant === 'grid'
      return (
        <PainPointsBlock
          key={section._key}
          {...baseProps}
          heading={(section as any).heading}
          subheading={(section as any).subheading}
          items={(section as any).items}
          bottomText={(section as any).bottomText}
          ctaText={(section as any).ctaText}
          ctaLink={(section as any).ctaLink}
          contactModalTitle={(section as any).contactModalTitle}
          contactModalDescription={(section as any).contactModalDescription}
          contactModalSuccessTitle={(section as any).contactModalSuccessTitle}
          contactModalSuccessText={(section as any).contactModalSuccessText}
        />
      )
    }
    case 'homeNineDaysMiniBlock': {
      const mini = (section as HomeNineDaysMiniBlock).nineDaysMini
      return <NineDaysMini key={section._key} data={mini as any} />
    }
    case 'newsletterBlock': {
      const block = section as NewsletterBlock
      const variant = block.variant === 'sidebar' ? 'sidebar' : 'horizontal'
      const title = block.title?.trim() || 'Telli uued postitused'
      const subtitle =
        block.subtitle?.trim() ||
        'Uus artikkel kord nädalas — otse postkasti. Rämpsposti ei saada.'

      if (variant === 'sidebar') {
        return (
          <Section key={block._key} variant="band">
            <MarketingContainer elevated className="max-w-md">
              <BlogNewsletter
                key={block._key}
                variant="sidebar"
                title={title}
                subtitle={subtitle}
                placeholder={block.placeholder}
                buttonText={block.buttonText}
                successMessage={block.successMessage}
                note={block.note}
                tag={block.tag}
                source={block.source}
              />
            </MarketingContainer>
          </Section>
        )
      }

      // Horizontal banner (default) — Sanity fields → BlogNewsletter props
      return (
        <Section key={block._key} variant="band">
          <MarketingContainer elevated>
            <div
              className={`flex flex-col flex-wrap items-start justify-between gap-6 sm:flex-row sm:items-center !p-7 sm:!p-9 ${marketingInsetCardClass}`}
            >
              <div className="min-w-0 flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-[rgb(var(--text-primary))]">
                  {title}
                </h2>
                {subtitle ? (
                  <p className="mt-2 text-[rgb(var(--text-secondary))]">{subtitle}</p>
                ) : null}
              </div>
              <BlogNewsletter
                key={block._key}
                variant="horizontal"
                title={title}
                subtitle={subtitle}
                placeholder={block.placeholder}
                buttonText={block.buttonText}
                successMessage={block.successMessage}
                note={block.note}
                tag={block.tag}
                source={block.source}
              />
            </div>
          </MarketingContainer>
        </Section>
      )
    }
    case 'homeGrantBlock':
      return renderHomeGrantBlock(section, legacy)
    case 'homeAboutBlock':
      return renderHomeAboutBlock(section, ctx)
    case 'homePhotoMarqueeBlock':
      return renderHomePhotoMarqueeBlock(section, legacy)
    case 'homeBeforeAfterBlock':
      return renderHomeBeforeAfterBlock(section, legacy)
    case 'homePricingBlock':
      return renderHomePricingBlock(section as HomePricingBlock, legacy, ctx)
    case 'homeFinalCtaBlock':
      return renderHomeFinalCtaBlock(section, globalFinalCtaBannerBackground, legacy)
    case 'casesBlock':
      return renderHomeCasesBlock(section as HomeCasesBlock)
    case 'thesesGridBlock':
      return renderThesesGridBlock(section as ThesesGridBlock, ctx)
    case 'andresBlock': {
      const data = {
        _type: section._type,
        _key: section._key,
        name: (section as any).name,
        eyebrow: (section as any).eyebrow,
        subtitle: (section as any).subtitle,
        quote: (section as any).quote,
        shortBio: (section as any).shortBio,
        bio: (section as any).bio,
        tags: (section as any).tags,
        stats: (section as any).stats,
        fieldExperience: (section as any).fieldExperience,
        timeline: (section as any).timeline,
        methodologyTitle: (section as any).methodologyTitle,
        methodologyText: (section as any).methodologyText,
        methodology: (section as any).methodology,
        ctaLabel: (section as any).ctaLabel,
        ctaLink: (section as any).ctaLink,
        photo: (section as any).photo,
        secondaryPhotos: (section as any).secondaryPhotos,
      } as any
      return (
        <Suspense fallback={<ProfileCardSkeleton variant={(section as any).variant || 'compact'} />}>
          <AndresBlock 
            variant={(section as any).variant || 'compact'} 
            data={data}
          />
        </Suspense>
      )
    }
    case 'programDaysTabs':
      return (
        <ProgramDaysTabs
          key={section._key}
          eyebrow={section.eyebrow}
          title={section.title}
          scriptTitle={section.scriptTitle}
          isMinimal={section.isMinimal}
          popupTitle={section.popupTitle}
          popupSubtitle={section.popupSubtitle}
          days={section.days}
        />
      )
    case 'helpFormTeaserBlock':
      return null
    case 'homeKkkBlock': {
      const kkkSection = (section as HomeKkkBlock).kkkSection as AboutKkkData | undefined
      if (!kkkSection) return null
      const kkkData = resolveKkkSection(null, kkkSection, { faqs: [] })
      if (!kkkData.faqs.length && !kkkData.title) return null
      return <Kkk key={section._key} kkkData={kkkData} />
    }
    case 'mainAndresCardBlock':
      return <MainAndresCard key={section._key} data={section as MainAndresCardBlock} />
    case 'clientsHeaderBlock':
      return <ClientsHeaderSection key={section._key} block={section as any} clientsCount={ctx.partners?.length} />
    default:
      return null
  }
}

function getDeferredMinHeight(type: string): string {
  switch (type) {
    case 'homePartnersBlock':
      return '120px'
    case 'homeHeroFeaturesBlock':
      return '200px'
    case 'helpFormTeaserBlock':
      return '300px'
    case 'painBlock':
      return '500px'
    case 'casesBlock':
      return '600px'
    case 'thesesGridBlock':
      return '700px'
    case 'programDaysTabs':
    case 'koolitusNineDaysProgramBlock':
    case 'koolitusProjectsBlock':
      return '600px'
    case 'homeTestimonialsBlock':
    case 'koolitusInvestmentBlock':
    case 'opstarMeasuredResultsBlock':
      return '500px'
    case 'homeQuizBandBlock':
      return '600px'
    case 'homeChallengesBlock':
      return '500px'
    case 'homeGrantBlock':
    case 'koolitusCertificateBlock':
      return '380px'
    case 'koolitusTrainingScheduleBlock':
      return '700px'
    case 'homeAboutBlock':
    case 'mainAndresCardBlock':
    case 'aboutNarrativeBlock':
    case 'aboutExperienceBlock':
    case 'aboutWorldVisitsBlock':
      return '500px'
    case 'homePhotoMarqueeBlock':
      return '350px'
    case 'homeBeforeAfterBlock':
      return '550px'
    case 'homePricingBlock':
      return '600px'
    case 'homeHeroFeaturesBlock':
    case 'homePartnersBlock':
    case 'homeTestimonialsBlock':
    case 'homeQuizBandBlock':
    case 'homeSeoConversionBlock':
    case 'homeChallengesBlock':
    case 'homeFinalCtaBlock':
      return '400px'
    case 'clientsHeaderBlock':
      return '400px'
    case 'homeKkkBlock':
    case 'koolitusKkkBlock':
    case 'opstarKkkBlock':
    case 'aboutKkkBlock':
      return '450px'
    case 'newsletterBlock':
      return '280px'
    case 'kontaktHeroBlock':
      return '600px'
    case 'kontaktQuickBlock':
      return '450px'
    case 'kontaktFormBlock':
      return '550px'
    case 'kontaktAndresBlock':
    case 'kontaktOpstarBlock':
    case 'kontaktServicesBlock':
      return '350px'
    default:
      return '400px'
  }
}

export default function PageSections({
  sections,
  reviewPool,
  isDraft = false,
  globalFinalCtaBannerBackground,
  legacy,
  legacyFeaturedReviews,
  legacyTestimonials,
  partners,
  partnersTitle,
  koolitusContext,
  opstarContext,
  aboutContext,
  globalStats,
  hideHeroGlobalStatsStrip,
  disableBelowFoldDefer = false,
}: PageSectionsProps) {
  const ctx: PageSectionsProps = {
    sections,
    reviewPool,
    isDraft,
    globalFinalCtaBannerBackground,
    legacy,
    legacyFeaturedReviews,
    legacyTestimonials,
    partners,
    partnersTitle,
    koolitusContext,
    opstarContext,
    aboutContext,
    globalStats,
    hideHeroGlobalStatsStrip,
  }

  const visibleSections = sections.filter(
    (section) => (section as any).isVisible !== false
  )

  const groupedSections: any[] = []
  for (let i = 0; i < visibleSections.length; i++) {
    const section = visibleSections[i]
    const nextSection = visibleSections[i + 1]

    if (
      (section._type === 'kontaktQuickBlock' && nextSection?._type === 'kontaktFormBlock') ||
      (section._type === 'kontaktFormBlock' && nextSection?._type === 'kontaktQuickBlock')
    ) {
      groupedSections.push({
        _type: 'kontaktGridGroupBlock',
        _key: section._key + '_group',
        variant: '5-7',
        col1: section,
        col2: nextSection,
      })
      i++
      continue
    }

    if (
      (section._type === 'kontaktAndresBlock' && nextSection?._type === 'kontaktOpstarBlock') ||
      (section._type === 'kontaktOpstarBlock' && nextSection?._type === 'kontaktAndresBlock')
    ) {
      groupedSections.push({
        _type: 'kontaktGridGroupBlock',
        _key: section._key + '_group',
        variant: '1-1',
        col1: section,
        col2: nextSection,
      })
      i++
      continue
    }

    groupedSections.push(section)
  }

  return (
    <>
      {groupedSections.map((section, idx) => {
        const node = renderSection(section, ctx)
        if (!node) return null

        const sectionId = getSectionNavId(section)
        const navTitle = getSectionNavTitle(section)
        const isHero = ['homeHeroBlock', 'marketingSplitHeroBlock'].includes(section._type)
        /** Keep hero + first content band (e.g. Teenused) in the initial paint to avoid scroll jumps on mobile. */
        const isAboveFoldBand = ['homeHeroFeaturesBlock', 'statsBlock'].includes(section._type)
        const shouldDefer =
          !disableBelowFoldDefer && !isHero && !isAboveFoldBand && idx > 1

        const innerNode = shouldDefer ? (
          <DeferredViewport
            minHeight={getDeferredMinHeight(section._type)}
            idForHash={sectionId}
            rootMargin="0px"
          >
            {node}
          </DeferredViewport>
        ) : node

        if (isSectionHiddenFromScrollNav(section)) {
          return <React.Fragment key={section._key}>{innerNode}</React.Fragment>
        }

        return (
          <ScrollSpySection key={section._key} id={sectionId} title={navTitle}>
            {innerNode}
          </ScrollSpySection>
        )
      })}
    </>
  )
}
