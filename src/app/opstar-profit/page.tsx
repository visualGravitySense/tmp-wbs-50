import { Metadata } from 'next'
import { Suspense } from 'react'
// Trigger page rebuild for unified badges styling
import { draftMode } from 'next/headers'
import { getOpstarProfitPageCached } from '@/lib/sanity/getOpstarProfitPageCached'
import { getSiteSettings } from '@/lib/sanity'
import { OPSTAR_PROFIT_QUERY } from '@/lib/sanity/queries/opstarProfit'
import { sanityFetch } from '@/sanity/lib/live'
import {
  REVIEWS_LIST_QUERY_AUTHOR_DESC,
  normalizeReviewsFromGroq,
} from '@/lib/sanity/queries/reviews'
import { fetchReviewPool } from '@/lib/sanity/fetchReviewPool'
import { MARKETING_PAGE_TESTIMONIALS_PREVIEW } from '@/lib/testimonials-pagination'
import { resolveFeaturedReviews } from '@/lib/sanity/reviews/resolveFeaturedReviews'
import { MAIN_PAGE_PARTNERS_QUERY } from '@/lib/sanity/queries/mainPagePartners'
import type { PartnerLogo } from '@/types/partner'
import { urlFor } from '@/lib/sanity/client'
import { buildPageMetadata } from '@/lib/seo/metadata'
import OpstarProfitBlock from '@/components/OpstarProfitBlock'

import KolmSammast from '@/components/KolmSammast'
import OpstarProfit8Components from '@/components/OpstarProfit8Components'
import MeodetavadTulemused from '@/components/MeodetavadTulemused'
import Cases from '@/components/Cases'
import StatsBar from '@/components/StatsBar'
import TestimonialsReviews from '@/components/TestimonialsReviews'
import Kkk from '@/components/Kkk'
import CTASection from '@/components/CTASection'
import { Container, Section, BrandVibrantButton, WhiteButton } from '@/components/ui'
import { SectionBadge } from '@/components/ui/SectionBadge'
import HeroSection from '@/components/HeroSection'
import OpstarProfitHeroDiagram from '@/components/OpstarProfitHeroDiagram'
import { OpstarCardSkeleton } from '@/components/CardSkeletons'
import PricingSection from '@/components/PricingSection'
import MarketingPageAmbient from '@/components/MarketingPageAmbient'
import { MarketingPageBuilderLayer } from '@/components/page-builder/MarketingPageBuilderLayer'
import { getOpstarBuilderSkipFlags } from '@/lib/sanity/opstarBuilderSkipFlags'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'

export const revalidate = 60

import OpstarProfitAcronymGrid from '@/components/OpstarProfitAcronymGrid'
import { Award, Building2, Sparkles, Star, Users, CalendarCheck, Eye } from 'lucide-react'

interface OpstarProfitData {
  title: string
  /** Dereferenced `review` docs; empty → uusimad Review (vt `resolveFeaturedReviews`) */
  featuredReviews?: unknown
  /** Resolved from reference or singleton `opstarProfitBlock`; optional on partial fetches */
  orbitBlock?: {
    title: string
    subtitle?: string
    leftColumn: { title: string; description: unknown }
    rightColumn: { title: string; description: unknown }
    illustration?: {
      centralText: string
      illustrationItems: Array<{
        title: string
        position: { x: number; y: number }
      }>
      backgroundColor?: string
      centralCircleColor?: string
    }
    backgroundColor?: string
    textColor?: string
  }
  /** If set, comparison table uses these partner refs instead of main-page marquee */
  comparisonPartnerLogos?: PartnerLogo[]
  hero: {
    tag: {
      text: string
      showDot: boolean
    }
    mainTitle: string
    showTrademark: boolean
    subtitle: string
    description: string
    primaryButton: {
      text: string
      url: string
      showArrow: boolean
    }
    secondaryButton: {
      text: string
      url: string
    }
    statistics: Array<{
      text: string
      showStar: boolean
    }>
    /** Optional Sanity image — hero right column */
    heroImage?: {
      asset?: {
        _id: string
        url?: string
      }
    }
  }
  contentSections: Array<{
    title: string
    description: string
    features: Array<{
      title: string
      description: string
    }>
  }>
  comparison?: {
    title: string
    subtitle?: string
    comparisonItems: Array<{
      isNot: string
      is: string
    }>
    backgroundColor: string
    titleColor: string
    isNotColor: string
    isColor: string
  }
  kolmSammast?: {
    title: string
    subtitle?: string
    steps: Array<{
      stepNumber: number
      title: string
      description: unknown[]
      icon?: string
    }>
    backgroundColor: string
    titleColor: string
    stepColor: string
  }
  eightComponents?: {
    title: string
    eyebrow: string
    subtitle?: string
    components: Array<{
      number: number
      title: string
      tags: string
      whatIs: string
      howItWorks: string
      result: string
      resultMetric: string
    }>
    backgroundColor: string
    titleColor: string
    eyebrowColor: string
  }
  leanVsOpstar?: {
    title: string
    eyebrow: string
    subtitle?: string
    comparisonItems: Array<{
      criterion: string
      leanValue: string
      opstarValue: string
      opstarHasAdvantage: boolean
    }>
    cta: {
      text: string
      subtitle: string
      buttonText: string
      buttonUrl: string
    }
    backgroundColor: string
    titleColor: string
    eyebrowColor: string
    opstarColumnColor: string
  }
  meodetavadTulemused?: {
    title: string
    eyebrow: string
    subtitle?: string
    results: Array<{
      value: string
      valueColor: string
      label: string
      description: string
    }>
    source: string
    backgroundColor: string
    titleColor: string
    eyebrowColor: string
  }
  cases?: {
    title: string
    eyebrow: string
    subtitle?: string
    caseStudies: Array<{
      company: string
      industry: string
      employees: string
      location: string
      year: number
      beforeMetrics: Array<{
        label: string
        value: string
      }>
      afterMetrics: Array<{
        label: string
        value: string
      }>
      resultMain: string
      resultTime: string
    }>
    backgroundColor: string
    titleColor: string
    eyebrowColor: string
  }
  arvamused?: {
    title: string
    eyebrow: string
    subtitle?: string
    reviews: Array<{
      rating: number
      quote: string
      authorName: string
      authorRole: string
      authorCompany: string
      avatarInitials: string
      avatarGradient: string
    }>
    totalReviews: number
    averageRating: string
    recommendationPercentage: string
    backgroundColor: string
    titleColor: string
    eyebrowColor: string
  }
  kkk?: {
    title: string
    eyebrow: string
    showEyebrowDots?: boolean
    subtitle?: string
    faqs: Array<{
      question: string
      /** Portable Text from Sanity; string in local fallbacks */
      answer: unknown
    }>
    backgroundColor: string
    titleColor: string
    eyebrowColor: string
    questionBackgroundColor: string
    questionTextColor: string
    answerBackgroundColor: string
    answerTextColor: string
  }
  cta?: {
    title: string
    subtitle?: string
    description?: string
    backgroundColor: string
    primaryButtonText: string
    primaryButtonUrl: string
    primaryButtonIcon: string
    secondaryButtonText?: string
    secondaryButtonUrl?: string
    secondaryButtonIcon: string
    trustFootnote?: string
  }
  seo: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
    ogImage?: unknown
  }
}

export async function generateMetadata(): Promise<Metadata> {
  let page: OpstarProfitData | null = null

  try {
    const { data } = await sanityFetch({
      query: OPSTAR_PROFIT_QUERY,
      stega: false,
    })
    page = data as OpstarProfitData | null
  } catch (error) {
    console.error('[opstar-profit] metadata fetch failed:', error)
  }

  const fallbackTitle = 'OPSTAR PROFIT™ — Andres Kase'
  const fallbackDescription =
    'OPSTAR PROFIT™ on Andres Kase loodud tootmisjuhtimise raamistik mis parandab ettevõtte kasumlikkust 25–40%. Mõõdetavad tulemused, praktilised tööriistad ja LEAN-põhised juhtimissüsteemid Eesti tootmisettevõtetele.'

  if (!page) {
    return buildPageMetadata({
      title: fallbackTitle,
      description: fallbackDescription,
      path: '/opstar-profit',
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
    path: '/opstar-profit',
    ogImage,
  })
}

export default async function OpstarProfitPage() {
  const { isEnabled: isDraft } = await draftMode()

  const [pageResult, partnersResult, reviewsResult, siteSettingsResult] = await Promise.allSettled([
    getOpstarProfitPageCached(),
    sanityFetch({ query: MAIN_PAGE_PARTNERS_QUERY }),
    isDraft ? Promise.resolve([]) : fetchReviewPool(REVIEWS_LIST_QUERY_AUTHOR_DESC),
    getSiteSettings()
  ])

  if (pageResult.status === 'rejected') {
    console.error('[opstar-profit] page fetch failed:', pageResult.reason)
  }
  if (partnersResult.status === 'rejected') {
    console.error('[opstar-profit] partners fetch failed:', partnersResult.reason)
  }
  if (reviewsResult.status === 'rejected') {
    console.error('[opstar-profit] reviews fetch failed:', reviewsResult.reason)
  }

  const page = pageResult.status === 'fulfilled' ? pageResult.value : null
  const partnersDoc =
    partnersResult.status === 'fulfilled'
      ? (partnersResult.value.data as { partners?: PartnerLogo[] } | null)
      : null
  const resolvedReviews =
    reviewsResult.status === 'fulfilled' ? reviewsResult.value : []

  const mainPartners = Array.isArray(partnersDoc?.partners)
    ? partnersDoc.partners.filter(Boolean)
    : []

  const globalStats = siteSettingsResult.status === 'fulfilled' ? siteSettingsResult.value?.globalStats?.stats || [] : []

  const featured = page?.featuredReviews
  const reviewPool = isDraft ? normalizeReviewsFromGroq(featured) : resolvedReviews
  const opstarReviewBlock = isDraft
    ? reviewPool
    : resolveFeaturedReviews(featured, reviewPool)

  const comparisonPartners =
    page?.comparisonPartnerLogos && page.comparisonPartnerLogos.length > 0
      ? page.comparisonPartnerLogos
      : mainPartners
  
  // Use fallback data if Sanity doesn't have data yet
  const opstarProfitData: OpstarProfitData = page || {
    title: 'Opstar Profit',
    hero: {
      tag: {
        text: '25 aasta destillaat • 60+ ettevõtet',
        showDot: true
      },
      mainTitle: 'Finantsjuhtimine ja tootlikkus',
      showTrademark: false,
      subtitle: 'ettevõtte kasvu tagamiseks',
      description: '25 aasta välitestitud kogemus Eesti tootmisettevõtetes — destilleeritud 8-komponentseks süsteemiks mida saad rakendada esmaspäeval.',
      primaryButton: {
        text: 'REGISTREERU PROGRAMMI',
        url: '#contact',
        showArrow: true
      },
      secondaryButton: {
        text: 'Tutvu raamistikuga',
        url: '#features'
      },
      statistics: [
        { text: '147+ lõpetajat', showStar: false },
        { text: '60+ ettevõtet', showStar: false },
        { text: '25 aastat praktikas', showStar: false },
        { text: '4.9 hinnang', showStar: true }
      ]
    },
    contentSections: [
      {
        title: 'Meie Teenused',
        description: 'Siia saad lisada täiendavat sisu Opstar Profit programmist ja selle pakkumistest.',
        features: [
          {
            title: 'Strateegiline Planeerimine',
            description: 'Kõikehõlmav äristrateegia arendamine, et tagada jätkusuutlik kasv ja kasumlikkus.'
          },
          {
            title: 'Protsessi Optimeerimine',
            description: 'Toimingute optimeerimine kulude vähendamiseks ja tõhususe suurendamiseks kõigis ärivaldkondades.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Opstar Profit - Andres Kase',
      metaDescription: 'Opstar Profit solutions and services by Andres Kase'
    },
    comparison: {
      title: 'Mis on OPSTAR PROFIT™?',
      subtitle: 'Lihtne seletus — ilma žargoonita. Mis see on ja mis see ei ole.',
      comparisonItems: [
        {
          isNot: 'Mitte tavaline LEAN raamatust kopeeritud',
          is: 'Eesti tootmise jaoks kohandatud meetodid',
        },
        {
          isNot: 'Mitte teooria mis jääb klassiruumi',
          is: '25 aasta välitestitud praktika 60+ ettevõttes',
        },
        {
          isNot: 'Mitte ühesuurune lahendus kõigile',
          is: 'Rakendatav esmaspäeval — kohe peale koolitust',
        },
        {
          isNot: 'Mitte veel üks sertifikaadiprogramm',
          is: '8-komponentne süsteem mis katab kõik juhtimistasemed',
        },
        {
          isNot: 'Mitte konsultatsioon kus teised teevad sinu eest',
          is: 'Sinu meeskonnaga koos ehitatud lahendus',
        },
      ],
      backgroundColor: 'bg-gray-50',
      titleColor: 'text-gray-900',
      isNotColor: 'text-red-600',
      isColor: 'text-green-600',
    },
    kolmSammast: {
      title: 'Kolm sammast edukaks juhtimiseks',
      eyebrow: 'Raamistik',
      subtitle: 'Lihtne ja efektiivne süsteem, mis toob reaalsed tulemused',
      steps: [
        {
          stepNumber: 1,
          title: 'Analüüs ja plaanimine',
          description: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Teostame põhjaliku analüüsi teie praegusest olukorrast ja koostame detailse arengukava, mis on täpselt sinu ettevõttele kohandatud.'
                }
              ]
            }
          ],
          icon: '📊'
        },
        {
          stepNumber: 2,
          title: 'Implementatsioon',
          description: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Rakendame uued protsessid ja süsteemid praktiliselt, tagades ülemineku sujuvuse ja meeskonna kiire kohandumise.'
                }
              ]
            }
          ],
          icon: '🚀'
        },
        {
          stepNumber: 3,
          title: 'Jälgimine ja optimeerimine',
          description: [
            {
              _type: 'block',
              children: [
                {
                  _type: 'span',
                  text: 'Jälgime tulemusi ja pidevalt optimeerime protsesse, tagamaks pikaajalise stabiilsuse ja kasvu.'
                }
              ]
            }
          ],
          icon: '🎯'
        }
      ],
      backgroundColor: 'bg-white',
      titleColor: 'text-gray-900',
      stepColor: 'bg-blue-600 text-white'
    },
    eightComponents: {
      title: '8 komponenti — mis on sees',
      eyebrow: 'Detailvaade',
      subtitle: 'Klõpsa igal komponendil et näha mida see tähendab, kuidas toimib ja millised on tulemused.',
      components: [
        {
          number: 1,
          title: 'Operatiiv',
          tags: 'KPI · Gemba · Andon',
          whatIs: 'Igapäevane tootmisjuhtimine struktuuriga. Gemba käigud tootmispõrandal, KPI jälgimine reaalajas, kiire probleemireageerimine Andoni abil.',
          howItWorks: 'Igal hommikul 15-minutine koosolek meeskonnaga. KPI tahvel näitab eelmise päeva tulemusi. Probleemid märgitakse kohe ja lahendatakse päeva jooksul.',
          result: 'Probleemid tulevad päevavalgele enne kui need suurteks kasvavad.',
          resultMetric: '↑ 15–25% tootlikkus 90 päevaga'
        },
        {
          number: 2,
          title: 'Mõõtmine',
          tags: 'OEE · Andmed · KPI',
          whatIs: 'Täielik andmete kogumine ja analüüs. OEE jälgimine, tootmise mõõdikud, reaalajas andmefluss.',
          howItWorks: 'Automaatne andmete kogumine tootmisliinidelt. Dashboard näitab kõiki tähtsaid mõõdikuid ja trende.',
          result: 'Andmepõhine otsustamine ja kiire reageerimine kõrvalekalletele.',
          resultMetric: '↑ 10–20% OEE parandus 60 päevaga'
        },
        {
          number: 3,
          title: 'Süsteem',
          tags: 'VSM · SOP · Protsessid',
          whatIs: 'Protsesside standardiseerimine ja visualiseerimine. VSM kaardid, tööjuhendid, protsesside kirjeldused.',
          howItWorks: 'Protsesside kaardistamine ja optimeerimine. Standarditud tööjuhendid kõigile töödele.',
          result: 'Stabiilsed ja kordatavad protsessid mis tagavad kvaliteedi.',
          resultMetric: '↓ 30% defektide hulk 45 päevaga'
        },
        {
          number: 4,
          title: 'Areng',
          tags: 'Kaizen · Inimesed',
          whatIs: 'Pidev areng ja täiendamine. Kaizen ideede süsteem, koolitus, meeskonna areng.',
          howItWorks: 'Igapäevased kaizen arutelud. Ideede kogumine ja realiseerimine. Regulaarne koolitus.',
          result: 'Inimeste kaasamine ja pidev täiendamine.',
          resultMetric: '↑ 50+ ideed kuus, 80% realiseeritud'
        },
        {
          number: 5,
          title: 'Väärtus',
          tags: 'VSM · Muda · Klient',
          whatIs: 'Väärtuse voogude analüüs ja muda kõrvaldamine. Klientide vajaduste analüüs.',
          howItWorks: 'VSM kaardistamine ja muda tuvastamine. Protsesside optimeerimine väärtuse jaoks.',
          result: 'Lühem läbimisaeg ja suurem väärtus kliendile.',
          resultMetric: '↓ 25% läbimisaeg 30 päevaga'
        },
        {
          number: 6,
          title: 'Standardid',
          tags: '5S · SOP · Visuaal',
          whatIs: 'Töökeskkonna organiseerimine ja standardiseerimine. 5S süsteem, visuaalne juhtimine.',
          howItWorks: '5S rakendamine kõigis töökohtades. Visuaalsed standardid ja juhendid.',
          result: 'Korralik ja turvaline töökeskkond.',
          resultMetric: '↑ 40% töökeskkonna hinnang 60 päevaga'
        },
        {
          number: 7,
          title: 'Stabiilsus',
          tags: '4M · TPM · Varud',
          whatIs: 'Seadmete hooldus ja stabiilsus. TPM, 4M analüüs, varude haldamine.',
          howItWorks: 'Plaaniline hooldus ja seadmete jälgimine. Varude optimeerimine ja analüüs.',
          result: 'Vähem seiskatakest ja stabiilsem tootmine.',
          resultMetric: '↓ 35% seiskatakest 90 päevaga'
        },
        {
          number: 8,
          title: 'Parendus',
          tags: 'Kaizen · A3 · PDCA',
          whatIs: 'Pidev parendamine ja probleemide lahendamine. A3 raportid, PDCA tsükkel.',
          howItWorks: 'Struktureeritud probleemide lahendamine. A3 raportite kasutamine ja PDCA tsüklid.',
          result: 'Süsteemne parendamine ja õppimine.',
          resultMetric: '↑ 25% probleemide lahendamise kiirus 75 päevaga'
        }
      ],
      backgroundColor: 'bg-white',
      titleColor: 'text-gray-900',
      eyebrowColor: 'text-blue-600'
    },
    leanVsOpstar: {
      title: 'LEAN vs OPSTAR PROFIT™',
      eyebrow: 'Võrdlus',
      subtitle: 'Vali tuttav valu — vaata, kuidas Lean ja OPSTAR PROFIT™ seda erinevalt lahendavad.',
      comparisonItems: [
        {
          criterion: 'Protsessid ei tööta',
          leanValue:
            'Lean annab tööriistad kaardistamiseks ja raiskamise vähendamiseks, kuid rakendamine jääb sageli sundkorras ja sõltub üksikust konsultandist.',
          opstarValue:
            'OPSTAR PROFIT™ seob protsessid juhtimissüsteemiga — igapäevane rütm, vastutus ja mõõdikud hoiavad protsessid töös ilma pidevate eranditeta.',
          opstarHasAdvantage: true,
        },
        {
          criterion: 'Inimesed ei järgi reegleid',
          leanValue:
            '5S ja standardtöö on paberil olemas, kuid motivatsioon ja vastutus jäävad juhi õlule — reegleid järgitakse peamiselt auditi ajal.',
          opstarValue:
            'Inimkeskne raamistik (OP, ST, AR) teeb vastutuse ja hoolimise osaks igapäevasest juhtimisest — mitte ühekordsest koolitusest.',
          opstarHasAdvantage: true,
        },
        {
          criterion: 'Tulemused ei püsi',
          leanValue:
            'Parandusprojektid annavad lühiajalist tõusu, kuid ilma süsteemse juhtimisrütmi ja KPI-de tagasi libisemine on tavapärane.',
          opstarValue:
            'FIT ja PROFIT seovad muutused mõõdetavate tulemustega — 8 komponenti, järeltugi ja KPI-d hoiavad edasimineku püsivana.',
          opstarHasAdvantage: true,
        },
        {
          criterion: 'Muutused ei haaku kokku',
          leanValue:
            'Osakonnad teevad oma Lean-projekte eraldi — tervikpilt puudub ja strateegia ei jõua põrandani ühtselt.',
          opstarValue:
            'OPSTAR PROFIT™ annab ühtse raamistiku kogu organisatsioonile — strateegia, protsessid ja inimesed liiguvad samas suunas.',
          opstarHasAdvantage: true,
        },
      ],
      cta: {
        text: 'Valmis OPSTAR PROFIT™ rakendama?',
        subtitle: 'Järgmine grupp oktoobris 2026 · 3 kohta vabad',
        buttonText: 'Vaata programmi',
        buttonUrl: '/koolitus#registreeru'
      },
      backgroundColor: 'bg-white',
      titleColor: 'text-gray-900',
      eyebrowColor: 'text-blue-600',
      opstarColumnColor: 'bg-blue-50 border-blue-200'
    },
    meodetavadTulemused: {
      title: 'Mõõdetavad tulemused',
      eyebrow: 'Numbrid',
      subtitle: 'Konkreetsed numbrid — mitte lubadused. Keskmised näitajad 147+ lõpetaja tagasiside põhjal.',
      results: [
        {
          value: '25–40%',
          valueColor: 'text-blue-600',
          label: 'Praagi vähenemine',
          description: 'Keskmiselt esimese 6 kuu jooksul pärast programmi'
        },
        {
          value: '15–30%',
          valueColor: 'text-green-600',
          label: 'Tootlikkuse tõus',
          description: 'Mõõdetud OEE ja väljundnäitajate põhjal'
        },
        {
          value: '90 päeva',
          valueColor: 'text-amber-600',
          label: 'Esimesed tulemused',
          description: 'Enamik osalejaid näevad mõõdetavaid muutusi 90 päeva jooksul'
        }
      ],
      source: 'Allikas: 147+ lõpetaja tagasiside · keskmised näitajad · individuaalsed tulemused võivad erineda',
      backgroundColor: 'bg-white',
      titleColor: 'text-gray-900',
      eyebrowColor: 'text-blue-600'
    },
    cases: {
      title: 'Päris tulemused päris ettevõtetest',
      eyebrow: 'Juhtumiuuringud',
      subtitle: 'Enne ja pärast — numbrid räägivad ise.',
      caseStudies: [
        {
          company: 'Ettevõte A',
          industry: 'Metallitootmine',
          employees: '45 töötajat',
          location: 'Tallinn',
          year: 2023,
          beforeMetrics: [
            { label: 'OEE', value: '54%' },
            { label: 'Praak', value: '18%' },
            { label: 'Tarneaeg', value: '12 päeva' }
          ],
          afterMetrics: [
            { label: 'OEE', value: '71%' },
            { label: 'Praak', value: '9%' },
            { label: 'Tarneaeg', value: '7 päeva' }
          ],
          resultMain: '+320 000 € / aastas · OEE +17pp · Praak −50%',
          resultTime: '90 päevaga'
        },
        {
          company: 'Ettevõte B',
          industry: 'Puidutootmine',
          employees: '28 töötajat',
          location: 'Tartu',
          year: 2024,
          beforeMetrics: [
            { label: 'OEE', value: '61%' },
            { label: 'Praak', value: '12%' },
            { label: 'Ületunnid', value: '+40h/k' }
          ],
          afterMetrics: [
            { label: 'OEE', value: '78%' },
            { label: 'Praak', value: '7%' },
            { label: 'Ületunnid', value: '+8h/k' }
          ],
          resultMain: 'OEE +17pp · Praak −42% · Ületunnid −80%',
          resultTime: '6 kuuga'
        }
      ],
      backgroundColor: 'bg-white',
      titleColor: 'text-gray-900',
      eyebrowColor: 'text-blue-600'
    },
    arvamused: {
      title: 'Mida osalejad ütlevad raamistikust',
      eyebrow: 'Tagasiside',
      subtitle: 'Spetsiifiliselt OPSTAR meetodist — mitte koolitusest üldiselt.',
      reviews: [
        {
          rating: 5,
          quote: 'OPSTAR andis meile keele probleemidest rääkimiseks. Nüüd räägime kõik ühte keelt — OEE, Gemba, Kaizen. Meeskond mõistab mida oodatakse.',
          authorName: 'K. Vaarmann',
          authorRole: 'Tootmisdirektor',
          authorCompany: 'Harju maakond',
          avatarInitials: 'KV',
          avatarGradient: 'radial-gradient(ellipse at 38% 30%,#5baeff,#007aff 50%,#0040a8)'
        },
        {
          rating: 5,
          quote: '8 noodit — kogu süsteem ühel lehel. Lihtsalt. Teised raamistikud on keerulised ja abstraktsed. OPSTAR on konkreetne ja rakendatav.',
          authorName: 'M. Männik',
          authorRole: 'Operatiivjuht',
          authorCompany: 'Tartu',
          avatarInitials: 'MM',
          avatarGradient: 'radial-gradient(ellipse at 38% 30%,#4cd964,#34c759 50%,#1a6630)'
        }
      ],
      totalReviews: 41,
      averageRating: '4.9',
      recommendationPercentage: '96%',
      backgroundColor: 'bg-white',
      titleColor: 'text-gray-900',
      eyebrowColor: 'text-blue-600'
    },
    kkk: {
      title: 'Korduma kippuvad küsimused',
      eyebrow: 'KKK',
      faqs: [
        {
          question: 'Kas OPSTAR PROFIT™ sobib ka väikeettevõttele?',
          answer: 'Jah. Raamistik on skaleeruv — 10 töötajaga ettevõte rakendab samad põhimõtted lihtsustatud kujul kui 200 töötajaga tehas. Koolitusel kohandame lähenemise sinu ettevõtte suurusele.'
        },
        {
          question: 'Mis vahe on LEAN-il ja OPSTAR PROFIT™-il?',
          answer: 'LEAN on Toyotast pärit üldine filosoofia. OPSTAR PROFIT™ on konkreetne 8-komponentne süsteem mis on kohandatud Eesti tootmisettevõtete jaoks — väiksem bürokraatia, kiirem rakendamine, lokaalne kontekst.'
        },
        {
          question: 'Kui kiiresti näen tulemusi?',
          answer: 'Esimesed mõõdetavad muutused on enamasti näha 30–90 päeva jooksul pärast koolituse lõppu. Suured struktuurimuutused võtavad 6–12 kuud. Kõik sõltub rakendamise kiirusest ja meeskonna kaasatusest.'
        },
        {
          question: 'Kas saab ka grupikoolitus meie ettevõttes kohapeal?',
          answer: 'Jah, pakume kohapealset koolitust 5+ osalejaga grupile. Programm kohandatakse teie tootmise konkreetsete probleemide ümber. Võta ühendust hinnapakkumise saamiseks.'
        },
        {
          question: 'Kas pean olema eelnevalt LEANiga tuttav?',
          answer: 'Ei pea. Programm on üles ehitatud nii et saab kaasa tulla ilma eelneva LEAN kogemuseta. Eelteadmised kiirendavad õppimist aga ei ole nõutud.'
        },
        {
          question: 'Kas on EIS toetus saadaval?',
          answer: 'Jah. EIS koolitustoetus katab kuni 50% koolitusmaksest. Aitame taotluse esitamisel — protsess vajab ~6 nädalat ette planeerimist.'
        }
      ],
      backgroundColor: 'bg-white',
      titleColor: 'text-gray-900',
      eyebrowColor: 'text-blue-600',
      questionBackgroundColor: 'bg-gray-50',
      questionTextColor: 'text-gray-900',
      answerBackgroundColor: 'bg-white',
      answerTextColor: 'text-gray-700'
    },
    cta: {
      title: 'Valmis OPSTAR PROFIT™ rakendama?',
      subtitle: 'Liitu 147+ ettevõttega kes on juba parandanud oma tootlust',
      description: 'Järgmine grupp oktoobris 2026 · 3 kohta vabad',
      backgroundColor: 'blue-purple',
      primaryButtonText: 'Vaata programmi',
      primaryButtonUrl: '/koolitus#registreeru',
      primaryButtonIcon: '🚀',
      secondaryButtonText: 'Võta ühendust',
      secondaryButtonUrl: '/kontakt',
      secondaryButtonIcon: '📞',
      trustFootnote: 'Kohtade arv on piiratud',
    }
  }

  
  // Orbit section: from merged query (reference → singleton fallback) or local fallback
  const blockData = page?.orbitBlock ?? {
    title: 'OPSTAR PROFIT™ - Tootmisjuhtimise raamistik',
    subtitle: '25 aasta kogemus, mis töötab - praktiline ja tulemuste tooviv süsteem',
    leftColumn: {
      title: 'TÄHEÜHEND',
      description: [],
    },
    rightColumn: {
      title: 'TÄHEÜHEND',
      description: [],
    },
    illustration: {
      centralText: 'OPSTAR PROFIT',
      illustrationItems: [
        { title: 'STRATEEGILINE JUHTIMINE', position: { x: 50, y: 12 } },
        { title: 'INTEGREERITUS', position: { x: 88, y: 32 } },
        { title: 'PROFESSIONAALSUS', position: { x: 88, y: 68 } },
        { title: 'OPERATSIOONIDE JUHTIMINE', position: { x: 50, y: 88 } },
        { title: 'KASUM', position: { x: 12, y: 68 } },
        { title: 'VISIOON & EESMÄRK', position: { x: 12, y: 32 } },
      ],
      backgroundColor: 'from-blue-50 to-white',
      centralCircleColor: 'from-blue-500 to-blue-700'
    },
    backgroundColor: 'bg-blue-600',
    textColor: 'text-white'
  }

  const pb = getPageBuilderState(page as { sections?: unknown })
  const skip = getOpstarBuilderSkipFlags(pb.builderBlockTypes)

  return (
    <div
      className="marketing-page-shell relative min-h-screen"
      data-page-builder={pb.usePageBuilder ? 'on' : 'off'}
    >
      <MarketingPageAmbient />

      {(!skip || !skip.skipHero) ? (
        <HeroSection
          variant="split"
          eyebrow={opstarProfitData.hero?.tag?.text}
          headline={opstarProfitData.hero?.mainTitle || ''}
          scriptLine={opstarProfitData.hero?.subtitle}
          description={opstarProfitData.hero?.description}
          primaryCTA={opstarProfitData.hero?.primaryButton?.text ? { text: opstarProfitData.hero?.primaryButton?.text, link: opstarProfitData.hero?.primaryButton?.url } : undefined}
          secondaryCTA={opstarProfitData.hero?.secondaryButton?.text ? { text: opstarProfitData.hero?.secondaryButton?.text, link: opstarProfitData.hero?.secondaryButton?.url } : undefined}
        >
          <Suspense fallback={<OpstarCardSkeleton />}>
            <OpstarProfitHeroDiagram
              eyebrowLabel={blockData.heroDiagramMeta?.eyebrowLabel}
              cardTitle={blockData.heroDiagramMeta?.cardTitle}
              badgeText={blockData.heroDiagramMeta?.badgeText}
              tagPills={blockData.heroDiagramMeta?.tagPills?.split(',').map((t: string) => t.trim()).filter(Boolean)}
              centralText={blockData.illustration?.centralText}
              nodes={blockData.illustration?.illustrationItems}
              metrics={
                blockData.heroMetrics?.length 
                  ? blockData.heroMetrics 
                  : globalStats?.length 
                    ? globalStats.slice(0, 3).map((s: any) => ({ value: `${s.number || ''}${s.suffix || ''}`, label: s.label, number: s.number, suffix: s.suffix }))
                    : undefined
              }
            />
          </Suspense>
        </HeroSection>
      ) : null}

      <MarketingPageBuilderLayer
        doc={page as { sections?: unknown }}
        opstarContext={{
          opstarProfitData,
          sanityPage: page,
          comparisonPartners,
          orbitBlockFallback: blockData,
        }}
        legacyFeaturedReviews={featured}
      />
    </div>
  )
}
