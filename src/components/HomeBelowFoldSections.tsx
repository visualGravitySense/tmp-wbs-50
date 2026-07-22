/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import type { BuilderSkipFlags } from '@/lib/sanity/builderSkipFlags'
import type { Review } from '@/types/review'
import { MARKETING_PAGE_TESTIMONIALS_PREVIEW } from '@/lib/testimonials-pagination'
import dynamic from 'next/dynamic'

const PainPointsBlock = dynamic(() => import('@/components/PainPointsBlock'))
import LogoMarquee from './LogoMarquee'
const AboutAndres = dynamic(() => import('./AboutAndres'))
const TestimonialsReviews = dynamic(() => import('./TestimonialsReviews'))
const Testimonials = dynamic(() => import('./Testimonials'))
const PhotoGallery = dynamic(() => import('./PhotoGallery'))
const ComparisonBlock = dynamic(() => import('./ComparisonBlock'))
const PricingSection = dynamic(() => import('./PricingSection'))
const FinalCTA = dynamic(() => import('./FinalCTA'))

export type HomeBelowFoldSectionsProps = {
  data?: any
  reviews?: Review[]
  globalFinalCtaBannerBackground?: string
} & Partial<BuilderSkipFlags>

export default function HomeBelowFoldSections({
  data,
  reviews,
  globalFinalCtaBannerBackground,
  skipQuizBand = false,
  skipNineDaysMini = false,
  skipPartners = false,
  skipAbout = false,
  skipTestimonials = false,
  skipPhotoMarquee = false,
  skipBeforeAfter = false,
  skipPricing = false,
  skipFinalCta = false,
}: HomeBelowFoldSectionsProps) {
  return (
    <>
      {!skipPartners ? (
        <LogoMarquee logos={data?.partners && data.partners.length > 0 ? data.partners : undefined} title={data?.partnersTitle || 'Osalenud'} />
      ) : null}

      {!skipTestimonials ? (
        <>
          {reviews !== undefined ? (
            <TestimonialsReviews reviews={reviews} previewLimit={MARKETING_PAGE_TESTIMONIALS_PREVIEW} />
          ) : (
            data?.testimonials && <Testimonials data={data.testimonials} />
          )}
        </>
      ) : null}

      {!skipAbout && data?.aboutAndres ? (
        <AboutAndres data={data.aboutAndres} />
      ) : null}

      {!skipPhotoMarquee ? (
        <>
          {(() => {
            const previewPhotos = data?.photoMarquee?.photos?.filter((item: any) => item.showOnMain === true) || []
            if (previewPhotos.length === 0) return null
            return (
              <PhotoGallery
                variant="preview"
                title={data.photoMarquee.title}
                subtitle={data.photoMarquee.subtitle}
                mobileLayout={data.photoMarquee.mobileLayout}
                gradientFrom={data.photoMarquee.gradientFrom}
                gradientTo={data.photoMarquee.gradientTo}
                images={previewPhotos.map((item: any, i: number) => ({
                  _key: `pm-${i}`,
                  asset: item.image?.asset,
                  alt: item.image?.alt || item.caption,
                  tag: item.caption,
                }))}
              />
            )
          })()}
        </>
      ) : null}

      {!skipBeforeAfter && data?.beforeAfter ? (
        <section className="relative w-full z-10" id="miks-see-tootab">
          <ComparisonBlock variant="before-after" data={data.beforeAfter} />
        </section>
      ) : null}

      {!skipPricing ? (
        <PricingSection data={data?.pricingSection} />
      ) : null}

      {!skipFinalCta && data?.finalCTA ? (
        <FinalCTA data={data.finalCTA} bannerBackground={globalFinalCtaBannerBackground} />
      ) : null}
    </>
  )
}
