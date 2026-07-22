/* eslint-disable @typescript-eslint/no-explicit-any */
// Trigger page rebuild for unified badges styling
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getKoolitusPageCached } from '@/lib/sanity/getKoolitusPageCached'
import { KOOLITUS_PAGE_QUERY } from '@/lib/sanity/queries/koolitus'
import { MAIN_PAGE_FINAL_CTA_QUERY } from '@/lib/sanity/queries/mainPageFinalCta'
import { MAIN_PAGE_PARTNERS_QUERY } from '@/lib/sanity/queries/mainPagePartners'
import { sanityFetch } from '@/sanity/lib/live'
import { mergeFinalCtaData } from '@/lib/sanity/mergeFinalCta'
import { getSiteSettings } from '@/lib/sanity'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { resolveGlobalFinalCtaBannerBackground } from '@/lib/globalFinalCtaBanner'
import { type FinalCTAData } from '@/components/FinalCTA'
import MarketingPageAmbient from '@/components/MarketingPageAmbient'
import { MarketingPageBuilderLayer } from '@/components/page-builder/MarketingPageBuilderLayer'
import type { PageSectionsLegacy } from '@/components/page-builder/PageSections'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'
import { REVIEWS_LIST_QUERY_AUTHOR_ASC } from '@/lib/sanity/queries/reviews'
import { fetchReviewPool } from '@/lib/sanity/fetchReviewPool'
import { urlFor } from '@/lib/sanity/client'
import { KOOLITUS_PAGE_DATA_FALLBACK } from './koolitusPageFallback'

export const revalidate = 60



/** KKK after testimonials when Sanity `kkk.faqs` is empty or missing. */
const KOOLITUS_KKK_FALLBACK = {
  title: 'Korduma kippuvad küsimused',
  eyebrow: 'KKK',
  faqs: [
    {
      question: 'Mis on 9-päevase programmi ülesehitus?',
      answer:
        'Programm koosneb üheksast fokuspäevast: iga päev ühendab teooria, harjutused ja tööriistad, mida saad kohe oma tehases rakendada. Vahelduvad on iseseisev töö ja grupiarutelud.',
    },
    {
      question: 'Kas saan kasutada EIS koolitustoetust?',
      answer:
        'Jah — paljud meie kliendid kasutavad EIS toetust (kuni 50% koolitusmaksest). Soovitame taotlusega alustada vähemalt ~6 nädalat enne grupi algust. Täpsema juhendi saad registreerumisel.',
    },
    {
      question: 'Kas programm sobib ilma varasema LEAN kogemuseta?',
      answer:
        'Jah. Materjal on üles ehitatud nii, et saad kaasa tulla ka ilma eelnevate LEAN teadmisteta. Kui oled juba LEAN-iga kokku puutunud, süvendad struktuuri ja sidud tervikpildi.',
    },
    {
      question: 'Mis toimub pärast koolituse lõppu?',
      answer:
        'Saad kaasa materjalid ja mallid (sh ROI arvutus, juhatuse ettekande struktuur). Soovi korral saab jätkata konsultatsiooni või järgmiste gruppidega — vastavalt vajadusele.',
    },
    {
      question: 'Kas pakute koolitust meie ettevõttes kohapeal?',
      answer:
        'Jah, suuremate meeskondade puhul on võimalik kohapealne formaat. Sisu kohandatakse teie protsessidega. Kirjelda vajadust kontakti kaudu — leiame sobiva lahenduse.',
    },
    {
      question: 'Kui tihti avanevad uued grupid?',
      answer:
        'Graafik sõltub hooajast ja nõudlusest. Kõige täpsema info leiad lehelt olevatest kuupäevadest ja registreerumisnupust; kohti on piiratud.',
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({
    query: KOOLITUS_PAGE_QUERY,
    stega: false,
  })

  const fallbackTitle = 'Training — Site Name'
  const fallbackDescription =
    '9-päevane intensiivprogramm tootmisjuhtidele: LEAN, TPS ja praktilised tööriistad reaalsest tootmisest.'

  if (!page) {
    return buildPageMetadata({
      title: fallbackTitle,
      description: fallbackDescription,
      path: '/koolitus',
    })
  }

  let ogImage: string | undefined
  if (page.seo?.ogImage) {
    try {
      ogImage = urlFor(page.seo.ogImage).url()
    } catch {
      // ignore invalid Sanity image reference
    }
  }

  return buildPageMetadata({
    title: page.seo?.metaTitle || page.title || fallbackTitle,
    description: page.seo?.metaDescription || page.hero?.description || fallbackDescription,
    keywords: page.seo?.metaKeywords,
    path: '/koolitus',
    ogImage,
  })
}

export default async function TrainingPage() {
  const { isEnabled: isDraft } = await draftMode()

  const [page, mainPageFinalCtaResult, siteSettings, reviewsResult, partnersResult, galleryResult] =
    await Promise.all([
      getKoolitusPageCached(),
      sanityFetch({ query: MAIN_PAGE_FINAL_CTA_QUERY }),
      getSiteSettings(),
      isDraft ? Promise.resolve([]) : fetchReviewPool(REVIEWS_LIST_QUERY_AUTHOR_ASC),
      sanityFetch({ query: MAIN_PAGE_PARTNERS_QUERY }),
      sanityFetch({
        query: `*[_type == "mainPage" && _id == "mainPage"][0]{
          photoMarquee{
            photos[]{
              "_key": _key,
              image{
                asset->,
                alt
              },
              caption
            }
          }
        }`,
      }),
    ])

  const partners = (partnersResult.data as { partners?: unknown[] } | null)?.partners ?? []

  const mainPageFinalCtaDoc = mainPageFinalCtaResult.data as {
    finalCTA?: FinalCTAData
  } | null

  const featured = page?.featuredReviews
  const globalFinalCtaBannerBackground = resolveGlobalFinalCtaBannerBackground(siteSettings)
  
  // Use fallback data if Sanity doesn't have data yet.
  // Fallback is in a separate module so it's tree-shaken when page data is present.
  const koolitusPageData = page || KOOLITUS_PAGE_DATA_FALLBACK

  const pb = getPageBuilderState(page as { sections?: unknown })

  return (
    <div
      className="marketing-page-shell"
      data-page-builder={pb.usePageBuilder ? 'on' : 'off'}
    >
      <MarketingPageAmbient />
      <MarketingPageBuilderLayer
        doc={page as { sections?: unknown }}
        koolitusContext={{
          koolitusPageData,
          sanityPage: page,
          kkkFallback: KOOLITUS_KKK_FALLBACK,
          partners,
        }}
        legacy={{
          finalCTA: mergeFinalCtaData(
            mainPageFinalCtaDoc?.finalCTA,
            page?.finalCTA,
          ) as PageSectionsLegacy['finalCTA'],
        }}
        legacyFeaturedReviews={featured}
      />
    </div>
  )
}
