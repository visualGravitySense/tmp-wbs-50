import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import GalleryClient from './GalleryClient'
import MarketingSplitHero from '@/components/marketing/MarketingSplitHero'
import MarketingPageAmbient from '@/components/MarketingPageAmbient'
import PageSections from '@/components/page-builder/PageSections'
import { Container, glassPanelVariantClasses, Section } from '@/components/ui'
import { cn } from '@/lib/utils'
import client, { urlFor } from '@/lib/sanity/client'
import { GALLERY_PAGE_QUERY } from '@/lib/sanity/queries/galleryPage'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'
import { fetchReviewPool } from '@/lib/sanity/fetchReviewPool'
import { REVIEWS_LIST_QUERY } from '@/lib/sanity/queries/reviews'
import { getSiteSettings } from '@/lib/sanity'
import { resolveGlobalFinalCtaBannerBackground } from '@/lib/globalFinalCtaBanner'
import { Images } from 'lucide-react'

export const revalidate = 60

const FALLBACK_META = {
  title: 'Galerii — Andres Kase',
  description: 'Fotod koolitustest, tehaste külastustest ja praktilistest momentidest.',
}

type SanityImageValue = {
  asset?: { _ref?: string } | null
  alt?: string | null
  caption?: string | null
  categories?: { _id: string; title: string }[] | null
}

type LegacyGalleryRow = {
  image?: SanityImageValue | null
  caption?: string | null
  categories?: { _id: string; title: string }[] | null
}

type GalleryCategory = { _id: string; title: string }

type GalleryPageDoc = {
  sections?: unknown
  seo?: { metaTitle?: string; metaDescription?: string; metaKeywords?: string; ogImage?: any }
  pillText?: string
  pageTitle?: string
  description?: string
  heroImage?: SanityImageValue | null
  orderedCategories?: GalleryCategory[] | null
  images?: (SanityImageValue | LegacyGalleryRow)[] | null
}

/** Uus vorm: otse `image` massiivis; vana vorm: `{ image, caption }` objekt. */
function normaliseGalleryRows(
  images: (SanityImageValue | LegacyGalleryRow)[] | null | undefined
): { image: SanityImageValue; caption?: string | null; categories?: { _id: string; title: string }[] | null }[] {
  if (!Array.isArray(images)) return []
  const out: { image: SanityImageValue; caption?: string | null; categories?: { _id: string; title: string }[] | null }[] = []
  for (const raw of images) {
    const row = raw as LegacyGalleryRow & SanityImageValue
    if (row?.image?.asset) {
      out.push({ image: row.image, caption: row.caption, categories: row.image.categories || row.categories })
      continue
    }
    if (row?.asset) {
      out.push({ image: row, caption: row.caption, categories: row.categories })
    }
  }
  return out
}

async function getGalleryPage(): Promise<GalleryPageDoc | null> {
  return client.fetch<GalleryPageDoc | null>(GALLERY_PAGE_QUERY, {}, { next: { revalidate: 60 } })
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getGalleryPage()
  return {
    title: (doc?.seo?.metaTitle ?? '').trim() || FALLBACK_META.title,
    description: (doc?.seo?.metaDescription ?? '').trim() || FALLBACK_META.description,
    keywords: doc?.seo?.metaKeywords || undefined,
    openGraph: {
      images: doc?.seo?.ogImage ? [urlFor(doc.seo.ogImage).url()] : [],
    },
  }
}

export default async function GaleriiPage() {
  const { isEnabled: isDraft } = await draftMode()
  const [doc, siteSettings, reviewsResult] = await Promise.all([
    getGalleryPage(),
    getSiteSettings(),
    isDraft ? Promise.resolve([]) : fetchReviewPool(REVIEWS_LIST_QUERY),
  ])
  const { usePageBuilder, sections, hasBlock } = getPageBuilderState(
    doc as { sections?: unknown },
  )
  const globalFinalCtaBannerBackground =
    resolveGlobalFinalCtaBannerBackground(siteSettings)
  const skipHero = usePageBuilder && hasBlock('marketingSplitHeroBlock')

  const pillText = (doc?.pillText ?? 'Fotod koolitustelt ja visiitidelt').trim()
  const pageTitle = (doc?.pageTitle ?? 'Tehase külastused ja koolitused, piltides').trim()
  const description =
    (doc?.description ?? 'Valik momente meie koolitustest ja tehaste külastustest.').trim() || null
  const rows = normaliseGalleryRows(doc?.images)

  const galleryHeroFallback = (
    <div className="flex size-72 flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-6 text-center sm:size-80 md:size-96">
      <Images className="h-14 w-14 text-blue-400" strokeWidth={1.25} aria-hidden />
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85">Galerii</p>
      <p className="max-w-[11rem] text-xs font-medium leading-snug text-white/55">
        Koolitused ja tehaste külastused
      </p>
    </div>
  )

  return (
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
      ) : null}

      {!skipHero ? (
      <MarketingSplitHero
        eyebrow={pillText}
        eyebrowShowDots
        headline={pageTitle}
        description={description ?? undefined}
        headlineClassName="mb-0 text-3xl font-extrabold leading-[1.1] tracking-tight text-[#122136] dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
        descriptionClassName="mt-4 max-w-2xl text-base leading-relaxed text-[rgb(var(--text-secondary))] mb-0"
        image={
          doc?.heroImage?.asset
            ? {
                src: urlFor(doc.heroImage).width(800).height(800).fit('crop').url(),
                alt: doc.heroImage.alt || pageTitle,
              }
            : undefined
        }
        imageFallback={galleryHeroFallback}
        className="pb-10"
        columnAlign="start"
      />
      ) : null}

      <Section variant="minimal" className="relative z-10 px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <Container size="6xl" padding="none">
          {rows.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[rgb(var(--bg-primary))]/50 px-6 py-14 text-center dark:bg-white/[0.03]">
              <p className="text-sm font-medium text-[rgb(var(--text-secondary))] sm:text-base">
                Galerii on veel tühi. Ava{' '}
                <span className="font-semibold text-[rgb(var(--text-primary))]">Studio → Content → Galerii</span>,
                lisa väljale <span className="font-semibold text-[rgb(var(--text-primary))]">Galerii pildid</span>{' '}
                pilte (iga pildi juures alternatiivtekst on kohustus), seejärel avalda.
              </p>
            </div>
          ) : (
            <GalleryClient
              rows={rows}
              orderedCategories={doc?.orderedCategories ?? []}
            />
          )}
        </Container>
      </Section>
    </div>
  )
}
