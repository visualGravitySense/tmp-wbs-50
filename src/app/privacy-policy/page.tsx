import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import type { PortableTextBlock } from '@portabletext/types'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { glassPanelVariantClasses } from '@/components/ui'
import { cn } from '@/lib/utils'
import PrivacyPolicyPortableBody from '@/components/PrivacyPolicyPortableBody'
import PrivacyPolicyStaticArticle from '@/components/PrivacyPolicyStaticArticle'
import PageSections from '@/components/page-builder/PageSections'
import client from '@/lib/sanity/client'
import { PRIVACY_POLICY_PAGE_QUERY } from '@/lib/sanity/queries/privacyPolicy'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'
import { fetchReviewPool } from '@/lib/sanity/fetchReviewPool'
import { REVIEWS_LIST_QUERY } from '@/lib/sanity/queries/reviews'
import { getSiteSettings } from '@/lib/sanity'
import { resolveGlobalFinalCtaBannerBackground } from '@/lib/globalFinalCtaBanner'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { urlFor } from '@/lib/sanity/client'

export const revalidate = 60

const FALLBACK_META_DESCRIPTION =
  'Kuidas kogume, kasutame ja kaitseme isikuandmeid meie veebilehel. GDPR ja Eesti isikuandmete kaitse seadus.'

type PrivacyPolicyDoc = {
  sections?: unknown
  seo?: { metaTitle?: string; metaDescription?: string; metaKeywords?: string; ogImage?: any }
  eyebrow?: string
  pageTitle?: string
  lastUpdated?: string
  lastUpdatedPrefix?: string
  backLinkLabel?: string
  backLinkPath?: string
  body?: PortableTextBlock[] | null
}

function formatEstonianDate(dateStr: string | undefined | null): { iso: string; display: string } | null {
  if (!dateStr || typeof dateStr !== 'string') return null
  const d = new Date(`${dateStr}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return null
  const display = new Intl.DateTimeFormat('et-EE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
  return { iso: dateStr, display }
}

async function getPrivacyPolicyPage(): Promise<PrivacyPolicyDoc | null> {
  const doc = await client.fetch<PrivacyPolicyDoc | null>(
    PRIVACY_POLICY_PAGE_QUERY,
    {},
    { next: { revalidate: 60 } }
  )
  return doc
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getPrivacyPolicyPage()
  const title = (doc?.seo?.metaTitle ?? '').trim() || 'Privaatsuspoliitika — Andres Kase'
  const description = (doc?.seo?.metaDescription ?? '').trim() || FALLBACK_META_DESCRIPTION

  let ogImage: string | undefined
  if (doc?.seo?.ogImage) {
    try {
      ogImage = urlFor(doc.seo.ogImage).url()
    } catch {
      // ignore invalid Sanity image reference
    }
  }

  return buildPageMetadata({
    title,
    description,
    keywords: doc?.seo?.metaKeywords,
    path: '/privacy-policy',
    ogImage,
  })
}

export default async function PrivacyPolicyPage() {
  const { isEnabled: isDraft } = await draftMode()
  const [doc, siteSettings, reviewsResult] = await Promise.all([
    getPrivacyPolicyPage(),
    getSiteSettings(),
    isDraft ? Promise.resolve([]) : fetchReviewPool(REVIEWS_LIST_QUERY),
  ])
  const { usePageBuilder, sections, hasBlock } = getPageBuilderState(
    doc as { sections?: unknown },
  )
  const globalFinalCtaBannerBackground =
    resolveGlobalFinalCtaBannerBackground(siteSettings)
  const skipHero = usePageBuilder && hasBlock('marketingSplitHeroBlock')
  const hasPortableBody = Boolean(doc?.body && doc.body.length > 0)

  const eyebrow = (doc?.eyebrow ?? 'Privaatsus ja andmekaitse').trim() || 'Privaatsus ja andmekaitse'
  const pageTitle = (doc?.pageTitle ?? 'Privaatsuspoliitika').trim() || 'Privaatsuspoliitika'
  const lastPrefix = (doc?.lastUpdatedPrefix ?? 'Viimati uuendatud:').trim() || 'Viimati uuendatud:'
  const backLabel = (doc?.backLinkLabel ?? '← Tagasi avalehele').trim() || '← Tagasi avalehele'
  const backPath = (doc?.backLinkPath ?? '/').trim() || '/'

  const formatted = formatEstonianDate(doc?.lastUpdated)
  const displayDate = formatted?.display ?? '11. mai 2026'
  const dateIso = formatted?.iso ?? '2026-05-11'

  return (
    <div
      className="relative min-h-[70vh] overflow-hidden bg-background"
      data-page-builder={usePageBuilder ? 'on' : 'off'}
    >
      {usePageBuilder ? (
        <PageSections
          sections={sections}
          reviewPool={reviewsResult}
          isDraft={isDraft}
          globalFinalCtaBannerBackground={globalFinalCtaBannerBackground}
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-0 h-80 w-80 rounded-full bg-blue-400/10 blur-[100px] dark:bg-blue-600/15" />
        <div className="absolute bottom-[20%] right-[8%] h-72 w-72 rounded-full bg-indigo-400/10 blur-[90px] dark:bg-indigo-600/12" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        {!skipHero ? (
          <div className="mb-10 flex flex-col gap-6 sm:mb-12">
            <EyebrowPillBadge text={eyebrow} showDots={false} className="w-fit" />
            <div>
              <h1 className="text-3xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white sm:text-4xl">
                {(() => {
                  const rawTitle = pageTitle || 'Privaatsuspoliitika, ja andmete kaitse tingimused';
                  const trimmed = rawTitle.trim();
                  const commaIndex = trimmed.indexOf(',');
                  let main = trimmed;
                  let accent = '';
                  if (commaIndex >= 0) {
                    main = trimmed.slice(0, commaIndex).trim();
                    accent = trimmed.slice(commaIndex + 1).trim();
                  }
                  return (
                    <>
                      <span className="block">{main}</span>
                      {accent ? (
                        <span className="block mt-1.5 font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal text-2xl sm:text-3xl">
                          {accent}
                        </span>
                      ) : null}
                    </>
                  );
                })()}
              </h1>
              <p className="mt-3 text-sm text-[rgb(var(--text-secondary))] sm:text-[15px]">
                {lastPrefix}{' '}
                <time dateTime={dateIso}>{displayDate}</time>
              </p>
            </div>
            <Link
              href={backPath}
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 underline-offset-4 transition-colors hover:text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              {backLabel}
            </Link>
          </div>
        ) : null}

        <article
          className={cn(
            glassPanelVariantClasses.card,
            'space-y-10 !p-6 shadow-xl hover:!translate-y-0 hover:!scale-100 sm:!p-10',
          )}
        >
          {hasPortableBody ? <PrivacyPolicyPortableBody value={doc!.body!} /> : <PrivacyPolicyStaticArticle />}
        </article>
      </div>
    </div>
  )
}
