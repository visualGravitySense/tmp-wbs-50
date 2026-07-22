import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import MarketingPageAmbient from '@/components/MarketingPageAmbient'
import PageSections from '@/components/page-builder/PageSections'
import client, { urlFor } from '@/lib/sanity/client'
import { JUHENDATUD_LOPUTOOD_PAGE_QUERY } from '@/lib/sanity/queries/juhendatudLoputoodPage'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'
import { fetchReviewPool } from '@/lib/sanity/fetchReviewPool'
import { REVIEWS_LIST_QUERY } from '@/lib/sanity/queries/reviews'
import { getSiteSettings } from '@/lib/sanity'
import { resolveGlobalFinalCtaBannerBackground } from '@/lib/globalFinalCtaBanner'
import type { ThesesGridBlock } from '@/types/mainPageSections'
import type { Thesis } from '@/types/thesis'

export const revalidate = 60

const FALLBACK_META = {
  title: 'Juhendatud lõputööd — Andres Kase',
  description:
    'Valik juhendatud bakalaureuse- ja magistritöid tootmise, LEAN-i ja juhtimise valdkonnast.',
}

type JuhendatudLoputoodPageDoc = {
  title?: string
  sections?: unknown
  seo?: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
    ogImage?: { asset?: { _ref?: string } }
  }
}

async function getJuhendatudLoputoodPage(): Promise<JuhendatudLoputoodPageDoc | null> {
  return client.fetch<JuhendatudLoputoodPageDoc | null>(
    JUHENDATUD_LOPUTOOD_PAGE_QUERY,
    {},
    { next: { revalidate: 60 } },
  )
}

function collectThesesFromSections(sections: unknown): Thesis[] {
  if (!Array.isArray(sections)) return []
  const theses: Thesis[] = []
  for (const section of sections) {
    if (!section || typeof section !== 'object') continue
    const block = section as ThesesGridBlock
    if (block._type !== 'thesesGridBlock' || !Array.isArray(block.theses)) continue
    for (const thesis of block.theses) {
      if (thesis?._id && thesis.title) theses.push(thesis as Thesis)
    }
  }
  return theses
}

function buildScholarlyArticleJsonLd(theses: Thesis[], pageTitle: string, pageDescription: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: pageTitle,
        description: pageDescription,
        url: 'https://andreskase.ee/juhendatud-loputood',
        inLanguage: 'et',
      },
      ...theses.map((thesis) => ({
        '@type': 'ScholarlyArticle',
        headline: thesis.title,
        abstract: thesis.abstract,
        author: {
          '@type': 'Person',
          name: thesis.author,
        },
        datePublished: `${thesis.year}`,
        keywords: thesis.keywords?.join(', '),
        about: thesis.category,
        publisher: {
          '@type': 'Organization',
          name: thesis.school,
        },
        ...(thesis.sourceUrl ? { url: thesis.sourceUrl } : {}),
      })),
    ],
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getJuhendatudLoputoodPage()
  return {
    title: (doc?.seo?.metaTitle ?? '').trim() || FALLBACK_META.title,
    description: (doc?.seo?.metaDescription ?? '').trim() || FALLBACK_META.description,
    keywords: doc?.seo?.metaKeywords || undefined,
    openGraph: {
      images: doc?.seo?.ogImage ? [urlFor(doc.seo.ogImage).url()] : [],
    },
  }
}

export default async function JuhendatudLoputoodPage() {
  const { isEnabled: isDraft } = await draftMode()
  const [doc, siteSettings, reviewsResult] = await Promise.all([
    getJuhendatudLoputoodPage(),
    getSiteSettings(),
    isDraft ? Promise.resolve([]) : fetchReviewPool(REVIEWS_LIST_QUERY),
  ])

  const { usePageBuilder, sections } = getPageBuilderState(doc as { sections?: unknown })
  const globalFinalCtaBannerBackground = resolveGlobalFinalCtaBannerBackground(siteSettings)

  const pageTitle =
    (doc?.seo?.metaTitle ?? '').trim() || (doc?.title ?? '').trim() || 'Juhendatud lõputööd'
  const pageDescription = (doc?.seo?.metaDescription ?? '').trim() || FALLBACK_META.description
  const theses = collectThesesFromSections(doc?.sections)
  const jsonLd = buildScholarlyArticleJsonLd(theses, pageTitle, pageDescription)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div
        className="marketing-page-shell relative min-h-screen"
        data-page-builder={usePageBuilder ? 'on' : 'off'}
      >
        <MarketingPageAmbient />

        {usePageBuilder ? (
          <PageSections
            sections={sections}
            reviewPool={reviewsResult}
            isDraft={isDraft}
            globalFinalCtaBannerBackground={globalFinalCtaBannerBackground}
          />
        ) : (
          <div className="relative z-10 px-4 py-24 text-center sm:px-6">
            <p className="text-sm font-medium text-[rgb(var(--text-secondary))] sm:text-base">
              Lehe sisu on veel seadistamata. Ava{' '}
              <span className="font-semibold text-[rgb(var(--text-primary))]">
                Studio → Content → Juhendatud lõputööd
              </span>
              , lisa „Lõputööde võrgustik“ blokk ja vali lõputööd.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
