// Trigger page rebuild for unified badges styling
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getMainPageCached } from '@/lib/sanity/getMainPageCached'
import { getSiteSettings } from '@/lib/sanity'
import { urlFor } from "@/lib/sanity/client";
import { REVIEWS_LIST_QUERY, normalizeReviewsFromGroq } from "@/lib/sanity/queries/reviews";
import { fetchReviewPool } from "@/lib/sanity/fetchReviewPool";
import { resolveFeaturedReviews } from "@/lib/sanity/reviews/resolveFeaturedReviews";
import {
  hasMainPageSections,
  parseMainPageSections,
} from "@/lib/sanity/hasMainPageSections";
import { getBuilderSkipFlags } from "@/lib/sanity/builderSkipFlags";
import type { PageSectionsLegacy } from "@/components/page-builder/PageSections";

import HeroSection from "@/components/HeroSection";
import MarketingPageAmbient from "@/components/MarketingPageAmbient";
import PageSections from "@/components/page-builder/PageSections";

import { resolveGlobalFinalCtaBannerBackground } from "@/lib/globalFinalCtaBanner";

import type { Metadata } from "next";

import HomeBelowFoldSections from "@/components/HomeBelowFoldSections";
import { buildPageMetadata, DEFAULT_HOME_SEO } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const mainPageData = await getMainPageCached();
  const seo = (mainPageData as { seo?: any } | null)?.seo;
  
  if (!seo) {
    return {
      title: "Andres Kase - Tootmisjuhtimise koolitused ja konsultatsioonid",
      description: "Praktilised tootmisjuhtimise ja LEAN koolitused ning konsultatsioonid Eesti ettevõtetele. Paneme asjad juhtuma!",
    };
  }

  const ogImages = [];
  if (seo.ogImage) {
    try {
      ogImages.push(urlFor(seo.ogImage).url());
    } catch {
      // ignore
    }
  }

  let title = seo.metaTitle || "Andres Kase - Tootmisjuhtimise koolitused ja konsultatsioonid";
  // Convert hyphens to clean dashes
  title = title.replace(/\s*[—–]\s*/g, ' - ').trim();

  return {
    title,
    description: seo.metaDescription || "Praktilised tootmisjuhtimise ja LEAN koolitused ning konsultatsioonid Eesti ettevõtetele. Paneme asjad juhtuma!",
    keywords: seo.metaKeywords || undefined,
    openGraph: {
      images: ogImages,
    },
  };
}

/** Pick up Sanity publishes on Vercel without a manual redeploy (ISR). */
export const revalidate = 60;

export default async function Home() {
  const [mainPageData, siteSettings, reviewsResult] = await Promise.all([
    getMainPageCached(),
    getSiteSettings(),
    fetchReviewPool(REVIEWS_LIST_QUERY),
  ]);

  if (!mainPageData) {
    notFound();
  }

  const featured = (mainPageData as { featuredReviews?: unknown } | null)?.featuredReviews;
  const reviewPool = reviewsResult;
  const reviews = resolveFeaturedReviews(featured, reviewPool);
  
  const globalFinalCtaBannerBackground = resolveGlobalFinalCtaBannerBackground(siteSettings);

  const usePageBuilder = hasMainPageSections(mainPageData);
  const sections = parseMainPageSections(
    (mainPageData as { sections?: unknown } | null)?.sections,
  );
  
  // Track which blocks are present
  const builderBlockTypes = new Set(sections.map((s) => s._type));
  
  // Create skip flags for legacy sections to avoid double rendering
  const skipFlags = getBuilderSkipFlags(builderBlockTypes);

  const page = mainPageData as PageSectionsLegacy | null;
  const legacy: PageSectionsLegacy | undefined = page
    ? {
        quiz: page.quiz,
        seoConversionSection: page.seoConversionSection,
        aboutAndres: page.aboutAndres,
        photoMarquee: page.photoMarquee,
        beforeAfter: page.beforeAfter,
        pricingSection: page.pricingSection,
        finalCTA: page.finalCTA,
      }
    : undefined;

  const seo = (mainPageData as { seo?: any } | null)?.seo;
  let pageTitle = seo?.metaTitle || "Andres Kase - Tootmisjuhtimise koolitused ja konsultatsioonid";
  pageTitle = pageTitle.replace(/\s*[—–]\s*/g, ' - ').trim();

  return (
    <div
      className="marketing-page-shell"
      data-page-builder={usePageBuilder ? "on" : "off"}
      data-builder-blocks={sections.map((s) => s._type).join(",") || "none"}
    >
      <MarketingPageAmbient />

      {/* SEO keywords alignment helper */}
      <div className="sr-only">
        {pageTitle} — tootmisjuhtimine, koolitused, konsultatsioonid ja LEAN-Agile arenguprogramm.
      </div>

      {usePageBuilder ? (
        <>
          {/* Legacy fallback hero ONLY if hero isn't in sections array */}
          {!builderBlockTypes.has("homeHeroBlock") ? (
            <HeroSection
              variant="centered"
              eyebrow={(mainPageData as any)?.eyebrow}
              headline={(mainPageData as any)?.headline || 'Tootmisjuhtimise koolitus'}
              scriptLine={(mainPageData as any)?.scriptHeadline || 'ja LEAN-Agile arenguprogramm'}
              description={(mainPageData as any)?.description}
              primaryCTA={(mainPageData as any)?.primaryCta}
              secondaryCTA={(mainPageData as any)?.secondaryCta}
            />
          ) : null}

          {/* New Page Builder Sections */}
          <PageSections
            sections={sections}
            reviewPool={reviewsResult}
            isDraft={false}
            disableBelowFoldDefer
            globalFinalCtaBannerBackground={globalFinalCtaBannerBackground}
            // Pass legacy fields down to specific blocks
            legacy={legacy}
            legacyFeaturedReviews={featured}
            legacyTestimonials={
              (mainPageData as { testimonials?: { title?: string } } | null)
                ?.testimonials
            }
            partners={(mainPageData as any)?.partners}
            partnersTitle={(mainPageData as any)?.partnersTitle}
            globalStats={siteSettings?.globalStats?.stats}
            globalNineDaysProgram={
              siteSettings?.globalNineDaysProgramDoc ?? siteSettings?.nineDaysProgram
            }
          />
          
          {/* Legacy Below Fold with skips enabled */}
          <HomeBelowFoldSections
            data={mainPageData}
            reviews={reviews}
            globalFinalCtaBannerBackground={globalFinalCtaBannerBackground}
            {...skipFlags}
            skipPartners={true}
            skipAbout={true} // Rendered separately now
          />
        </>
      ) : (
        <>
          <HeroSection
            variant="centered"
            eyebrow={(mainPageData as any)?.eyebrow}
            headline={(mainPageData as any)?.headline || 'Tootmisjuhtimise koolitus'}
            scriptLine={(mainPageData as any)?.scriptHeadline || 'ja LEAN-Agile arenguprogramm'}
            description={(mainPageData as any)?.description}
            primaryCTA={(mainPageData as any)?.primaryCta}
            secondaryCTA={(mainPageData as any)?.secondaryCta}
          />
          <HomeBelowFoldSections
            data={mainPageData}
            reviews={reviews}
            globalFinalCtaBannerBackground={globalFinalCtaBannerBackground}
            skipPartners={true}
            skipAbout={true} // Rendered separately now
          />
        </>
      )}
    </div>
  );
}
