import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Building2,
  Clock,
  ExternalLink,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import MarketingPageAmbient from '@/components/MarketingPageAmbient'
import ContactPageForm from '@/components/kontakt/ContactPageForm'
import KontaktQuickContactForm from '@/components/kontakt/KontaktQuickContactForm'
import { BrandVibrantButton, Container, glassPanelVariantClasses } from '@/components/ui'
import { urlFor } from '@/lib/sanity/client'
import { mapsUrl } from '@/lib/contact/businessInfo'
import TrainingLocation from '@/components/TrainingLocation'
import PageSections from '@/components/page-builder/PageSections'
import { getKontaktPageCached } from '@/lib/sanity/getKontaktPageCached'
import { resolveKontaktPage } from '@/lib/kontakt/resolveKontaktPage'
import { getPageBuilderState } from '@/lib/sanity/pageBuilderState'
import { fetchReviewPool } from '@/lib/sanity/fetchReviewPool'
import { REVIEWS_LIST_QUERY } from '@/lib/sanity/queries/reviews'
import { getSiteSettings } from '@/lib/sanity'
import { resolveGlobalFinalCtaBannerBackground } from '@/lib/globalFinalCtaBanner'
import { cn } from '@/lib/utils'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getKontaktPageCached()
  const page = resolveKontaktPage(doc)

  let ogImage: string | undefined
  if (page.seo.ogImage) {
    try {
      ogImage = urlFor(page.seo.ogImage).url()
    } catch {
      // ignore invalid Sanity image reference
    }
  }

  return buildPageMetadata({
    title: page.seo.metaTitle || 'Contact — Site Name',
    description:
      page.seo.metaDescription ||
      'Võta ühendust tootmisjuhtimise koolituste ja konsultatsioonide osas.',
    keywords: page.seo.metaKeywords,
    path: '/kontakt',
    ogImage,
  })
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)]/80 bg-blue-500/10 text-blue-600 dark:text-blue-400">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[rgb(var(--text-secondary))]">
          {label}
        </p>
        <div className="mt-1 text-sm font-medium text-[rgb(var(--text-primary))] sm:text-[15px]">{children}</div>
      </div>
    </div>
  )
}

function isWebsiteHighlight(label: string) {
  return label.trim().toLowerCase().startsWith('veeb')
}

export default async function KontaktPage() {
  const { isEnabled: isDraft } = await draftMode()
  const [doc, siteSettings, reviewsResult] = await Promise.all([
    getKontaktPageCached(),
    getSiteSettings(),
    isDraft ? Promise.resolve([]) : fetchReviewPool(REVIEWS_LIST_QUERY),
  ])
  const page = resolveKontaktPage(doc)
  const q = page.quickContact
  const { usePageBuilder, sections, hasBlock } = getPageBuilderState(
    doc as { sections?: unknown },
  )
  const globalFinalCtaBannerBackground =
    resolveGlobalFinalCtaBannerBackground(siteSettings)
  const showLegacy = !usePageBuilder || !sections || sections.length === 0

  return (
    <div
      className="relative min-h-[70vh] overflow-hidden bg-background"
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

      {showLegacy && (
        <Container size="6xl" elevated className="relative pt-28 pb-16 md:pt-36">
          <header className="mb-12 grid items-center gap-8 lg:grid-cols-2 lg:gap-12 sm:mb-14">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <EyebrowPillBadge flow text={page.hero.eyebrow} />
              <h1 className="text-3xl font-extrabold tracking-tight leading-[1.1] text-[#122136] dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {(() => {
                  const rawTitle = page.hero.pageTitle || 'Võta ühendust, ja loome süsteemi';
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
                        <span className="block mt-2 font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal text-2xl sm:text-3xl lg:text-4xl">
                          {accent}
                        </span>
                      ) : null}
                    </>
                  );
                })()}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-base">
                {page.hero.intro}
              </p>
            </div>
            
            {/* Image Placeholder */}
            <div className="relative h-64 sm:h-80 lg:h-full w-full min-h-[300px] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center">
              {page.hero.image ? (
                 <img 
                   src={urlFor(page.hero.image).width(800).url()} 
                   alt={page.hero.pageTitle || 'Kontakt'}
                   className="absolute inset-0 w-full h-full object-cover"
                 />
              ) : (
                <>
                  <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')" }}></div>
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs">Placeholder Pilt</span>
                  </div>
                </>
              )}
            </div>
          </header>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <section
            className={cn(glassPanelVariantClasses.card, 'space-y-6 !p-6 sm:!p-8 lg:col-span-5')}
            aria-labelledby="quick-contact-heading"
          >
            <h2
              id="quick-contact-heading"
              className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
            >
              {q.sectionTitle}
            </h2>

            <div className="space-y-5">
              <ContactRow icon={Mail} label={q.labelEmail}>
                <ul className="space-y-2">
                  {q.emails.map((item) => (
                    <li key={item.address}>
                      {item.label ? (
                        <span className="block text-xs text-[rgb(var(--text-secondary))]">{item.label}</span>
                      ) : null}
                      <a
                        href={`mailto:${item.address}`}
                        className="break-all underline-offset-2 transition-colors hover:text-blue-600 hover:underline"
                      >
                        {item.address}
                      </a>
                    </li>
                  ))}
                </ul>
              </ContactRow>

              <ContactRow icon={Phone} label={q.labelPhone}>
                <a
                  href={`tel:${q.phoneTel}`}
                  className="underline-offset-2 transition-colors hover:text-blue-600 hover:underline"
                >
                  {q.phoneDisplay}
                </a>
              </ContactRow>

              <ContactRow icon={MapPin} label={q.labelAddress}>
                <address className="not-italic leading-relaxed">
                  {q.address.street}
                  <br />
                  {q.address.postalCode} {q.address.city}, {q.address.country}
                </address>
                <a
                  href={mapsUrl(q.mapQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
                >
                  {q.mapLinkLabel}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </ContactRow>

              <ContactRow icon={Clock} label={q.labelResponse}>
                <p>{q.responseNote}</p>
              </ContactRow>
            </div>

            <KontaktQuickContactForm />

            <div className="flex flex-col gap-3 border-t border-[var(--border)]/70 pt-6 sm:flex-row">
              <BrandVibrantButton href={`mailto:${q.primaryEmail}`} className="justify-center">
                {q.emailButtonText}
              </BrandVibrantButton>
              <a
                href={`tel:${q.phoneTel}`}
                className="inline-flex items-center justify-center rounded-full border-2 border-[var(--border)] bg-transparent px-6 py-3 text-sm font-bold text-[rgb(var(--text-primary))] transition-colors hover:border-blue-400/50 hover:bg-blue-500/5"
              >
                {q.phoneButtonText}
              </a>
            </div>
          </section>

          <section
            className={cn(glassPanelVariantClasses.card, '!p-6 sm:!p-8 lg:col-span-7')}
            aria-labelledby="form-heading"
          >
            <h2
              id="form-heading"
              className="mb-2 text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
            >
              {page.messageForm.sectionTitle}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
              {page.messageForm.sectionDescription}
            </p>
            <ContactPageForm copy={page.messageForm} />
          </section>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <article
            className={cn(glassPanelVariantClasses.card, 'space-y-4 !p-6 sm:!p-8')}
            aria-labelledby="about-andres-heading"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)]/80 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <UserRound className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <div>
                <h2
                  id="about-andres-heading"
                  className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))]"
                >
                  {page.andresBlock.name}
                </h2>
                <p className="text-sm text-[rgb(var(--text-secondary))]">{page.andresBlock.role}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
              {page.andresBlock.description}
            </p>
            <ul className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
              {page.andresBlock.highlights.map((item) => (
                <li key={`${item.label}-${item.text}`}>
                  {item.label ? (
                    <span className="font-semibold text-[rgb(var(--text-primary))]">{item.label}</span>
                  ) : null}{' '}
                  {isWebsiteHighlight(item.label) ? (
                    <a
                      href={page.andresBlock.websiteUrl}
                      className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
                    >
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </li>
              ))}
            </ul>
            <Link
              href={page.andresBlock.linkHref}
              className="inline-flex text-sm font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
            >
              {page.andresBlock.linkLabel}
            </Link>
          </article>

          <article
            className={cn(glassPanelVariantClasses.card, 'space-y-4 !p-6 sm:!p-8')}
            aria-labelledby="opstar-heading"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                <Building2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </div>
              <div>
                <h2
                  id="opstar-heading"
                  className="text-lg font-black tracking-tight text-[rgb(var(--text-primary))]"
                >
                  {page.opstarBlock.name}
                </h2>
                <p className="text-sm text-[rgb(var(--text-secondary))]">{page.opstarBlock.tagline}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[rgb(var(--text-secondary))] sm:text-[15px]">
              {page.opstarBlock.description}
            </p>
            <ul className="space-y-2 text-sm text-[rgb(var(--text-secondary))]">
              {page.opstarBlock.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Link
              href={page.opstarBlock.linkHref}
              className="inline-flex text-sm font-semibold text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
            >
              {page.opstarBlock.linkLabel}
            </Link>
          </article>
        </div>

        <section
          className={cn(glassPanelVariantClasses.card, 'mt-8 !p-6 sm:!p-8')}
          aria-labelledby="services-heading"
        >
          <h2
            id="services-heading"
            className="mb-4 text-lg font-black tracking-tight text-[rgb(var(--text-primary))] sm:text-xl"
          >
            {page.servicesSection.sectionTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.servicesSection.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[var(--border)]/70 bg-[rgb(var(--bg-secondary))]/50 p-4 sm:p-5"
              >
                <h3 className="font-bold text-[rgb(var(--text-primary))]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--text-secondary))]">{item.text}</p>
                {item.linkHref ? (
                  <Link
                    href={item.linkHref}
                    className="mt-3 inline-flex text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {item.linkLabel} →
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 border-t border-[var(--border)]/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-[rgb(var(--text-secondary))]">
              {page.servicesSection.registerNote}
            </p>
            <BrandVibrantButton href={page.servicesSection.registerButtonHref}>
              {page.servicesSection.registerButtonText}
            </BrandVibrantButton>
          </div>
        </section>

        <div className="mt-8">
          <TrainingLocation data={{ subsidyText: '' }} />
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-[rgb(var(--text-secondary))]">
          {page.legalNote.beforeLink}{' '}
          <Link
            href={page.legalNote.linkHref}
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            {page.legalNote.linkLabel}
          </Link>
          {page.legalNote.afterLink}
        </p>
      </Container>
      )}
    </div>
  )
}
