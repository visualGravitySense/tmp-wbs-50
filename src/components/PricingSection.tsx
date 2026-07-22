'use client'

import React, { useEffect } from 'react';
import EyebrowPillBadge from '@/components/EyebrowPillBadge';
import {
  MarketingContainer,
  Section,
  Container,
  BrandVibrantButton,
  WhiteButton,
  SplitHeader,
  marketingPanelClass,
  marketingInsetCardClass,
} from '@/components/ui';
import { Check, Calendar, Users } from 'lucide-react';
import { handleInPageAnchorClick } from '@/lib/smoothScrollToId';

interface PricingTier {
  name?: string;
  price?: string;
  description?: string;
  features?: string[];
  isPopular?: boolean;
}

interface PricingSectionData {
  title?: string;
  subtitle?: string;
  popularBadgeText?: string;
  ctaText?: string;
  footerNotice?: string;
  supportNotePrefix?: string;
  supportNoteHighlight?: string;
  tiers?: PricingTier[];
  corporateTitle?: string;
  corporateSubtitle?: string;
  corporatePrice?: string;
  corporatePricePrefix?: string;
  corporatePriceTaxLabel?: string;
  corporatePriceSuffix?: string;
  corporateFeatures?: string[];
  corporateCtaText?: string;
  corporateBadgeText?: string;
  hideCorporateBlock?: boolean;
}

function resolveOptionalLabel(value: string | undefined, fallback: string): string | null {
  if (value === undefined || value === null) return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function resolveSanityText(value: string | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function PricingSupportHighlight({
  prefix,
  highlight,
}: {
  prefix: string | null;
  highlight: string | null;
}) {
  if (!prefix && !highlight) return null;

  return (
    <div className="flex justify-center px-2">
      <div className="relative inline-flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-50/90 via-white/70 to-emerald-50/90 px-5 py-3.5 shadow-[0_16px_40px_-18px_rgba(16,185,129,0.45)] backdrop-blur-md dark:border-emerald-400/20 dark:from-emerald-950/50 dark:via-slate-900/40 dark:to-emerald-950/50">
        <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        {prefix ? (
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 sm:text-[11px]">
            {prefix}
          </span>
        ) : null}
        {highlight ? (
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400 sm:text-[11px]">
            {highlight}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function CorporatePriceDisplay({
  price,
  prefix,
  taxLabel,
  suffix,
  variant,
  cta,
}: {
  price: string;
  prefix: string | null;
  taxLabel: string | null;
  suffix: string | null;
  variant: 'card' | 'banner';
  cta?: React.ReactNode;
}) {
  if (variant === 'card') {
    return (
      <>
        {prefix ? (
          <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {prefix}
          </span>
        ) : null}
        <div className="flex items-end gap-1">
          <span className="pricing-tier-price inline-block pr-1 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-5xl font-black tracking-tighter leading-none text-transparent">
            {price}
          </span>
          <span className="pb-1 font-bold text-[rgb(var(--text-secondary))]">€</span>
          {taxLabel ? (
            <span className="ml-1 pb-1 text-sm text-[rgb(var(--text-secondary))]">{taxLabel}</span>
          ) : null}
        </div>
        {suffix ? (
          <p className="mt-1 text-xs font-semibold text-[rgb(var(--text-secondary))]">{suffix}</p>
        ) : null}
      </>
    );
  }

  return (
    <div className="pricing-corporate-price-box relative overflow-hidden rounded-2xl border border-white/20 bg-slate-950/[0.02] dark:bg-white/[0.01] p-5 text-center md:text-right min-w-[210px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {prefix ? (
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          {prefix}
        </span>
      ) : null}
      <div className="flex items-end justify-center md:justify-end gap-1 mt-1">
        <span className="pricing-corporate-price-value inline-block pr-1 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-5xl font-black tracking-tighter leading-none text-transparent">
          {price}
        </span>
        <span className="pb-0.5 font-bold text-slate-800 dark:text-slate-200 text-2xl">€</span>
        {taxLabel ? (
          <span className="pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500">{taxLabel}</span>
        ) : null}
      </div>
      {suffix ? (
        <span className="text-[10.5px] font-semibold text-slate-400 dark:text-slate-500 mt-1 mb-5 block">
          {suffix}
        </span>
      ) : (
        <span className="mb-5 block" />
      )}
      {cta}
    </div>
  );
}

interface PricingSectionProps {
  data?: PricingSectionData;
  columns?: 3 | 4;
}

const fallbackTiers: PricingTier[] = [
  {
    name: 'Standard',
    price: '1490',
    description: 'Ideaalne alustavale tootmisjuhile',
    features: ['9 õppepäeva', 'Õppematerjalid', 'Visiidid tehastesse', 'Sertifikaat'],
    isPopular: false,
  },
  {
    name: 'Professional',
    price: '2190',
    description: 'Kõige populaarsem valik',
    features: ['Kõik Standard paketis', 'Personaalne mentorlus', 'KPI analüüs', 'Ligipääs kogukonnale'],
    isPopular: true,
  },
  {
    name: 'Executive',
    price: '3490',
    description: 'Täielik strateegiline tugi',
    features: ['Kõik Pro paketis', '1-on-1 strateegia sessioon', 'Meeskonna koolitus', 'Eelisjärjekorras tugi'],
    isPopular: false,
  },
];

const SCHEDULE_ANCHOR_ALIASES = ['schedule', 'koolitusprogramm'] as const

function scrollToSchedule(event: React.MouseEvent) {
  handleInPageAnchorClick(event, 'ajakava', {
    aliases: [...SCHEDULE_ANCHOR_ALIASES],
    hashId: 'ajakava',
  })
}

export default function PricingSection({ data, columns = 3 }: PricingSectionProps) {
  useEffect(() => {
    const isPricingHash = () => {
      if (typeof window === 'undefined') return false
      const hash = window.location.hash
      return hash === '#pricing' || hash === '#hinnastamine' || hash === '#hinnad'
    }

    // On mount / hash change: scroll into view without rewriting the hash again.
    const scrollToPricing = () => {
      if (!isPricingHash()) return
      const el =
        document.getElementById('pricing') ||
        document.getElementById('hinnastamine') ||
        document.getElementById('hinnad')
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    }

    // Small delay so layout + deferred siblings settle after navigation.
    const t = window.setTimeout(scrollToPricing, 80)
    window.addEventListener('hashchange', scrollToPricing)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('hashchange', scrollToPricing)
    }
  }, [])

  const tiers = data?.tiers?.length ? data.tiers : fallbackTiers;
  const footerNotice = data?.footerNotice?.trim();
  const supportNotePrefix = resolveOptionalLabel(data?.supportNotePrefix, 'Küsi lisa');
  const supportNoteHighlight = resolveOptionalLabel(
    data?.supportNoteHighlight,
    'Töötukassa toetuse võimalus kuni 80%'
  );

  const corporateTitle = data?.corporateTitle || "Grupikoolitus ettevõttele";
  const corporateSubtitle = data?.corporateSubtitle || "Individuaalne lähenemine — teie meeskonnale kohandatud programm";
  const corporatePrice = resolveSanityText(data?.corporatePrice);
  const hasCorporatePrice = corporatePrice !== null;
  const corporatePricePrefix = hasCorporatePrice ? resolveSanityText(data?.corporatePricePrefix) : null;
  const corporatePriceTaxLabel = hasCorporatePrice ? resolveSanityText(data?.corporatePriceTaxLabel) : null;
  const corporatePriceSuffix = hasCorporatePrice ? resolveSanityText(data?.corporatePriceSuffix) : null;
  const corporateFeatures = data?.corporateFeatures?.length
    ? data.corporateFeatures
    : [
        "Alates 5 osalejast",
        "Kohandatud õppeprogramm",
        "Koolitus teie kontoris",
        "Eraldi äriklient haldur",
        "Arveldamine ettevõttele",
        "Järelmeetmed ja tugi"
      ];
  const corporateBadgeText = data?.corporateBadgeText || "Ettevõtetele";
  const corporateCtaText = data?.corporateCtaText || "Küsi pakkumist";

  const corporateQueryParams = new URLSearchParams()
  corporateQueryParams.set('package', corporateTitle)
  if (corporatePrice) corporateQueryParams.set('price', corporatePrice)
  corporateQueryParams.set('desc', corporateSubtitle)
  if (corporateFeatures && corporateFeatures.length > 0) {
    corporateQueryParams.set('features', corporateFeatures.join('|'))
  }
  corporateQueryParams.set('corporate', 'true')
  const corporateHref = `/register?${corporateQueryParams.toString()}`

  const gridLayoutClass = columns === 4
    ? "md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 md:pt-8 md:snap-none"
    : "md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:pt-8 md:snap-none";

  return (
    <Container id="pricing" size="6xl" className="mx-auto px-4 md:px-8 py-16 relative scroll-mt-24">
      <div className="pricing-bg-glow pointer-events-none absolute left-1/2 top-20 h-[min(520px,90vw)] w-[min(520px,90vw)] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />

        <div className={`pricing-panel !overflow-visible ${marketingPanelClass}`}>
          <div className="pricing-glow-left pointer-events-none absolute -left-16 top-0 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pricing-glow-right pointer-events-none absolute -right-16 bottom-0 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="mb-14 flex justify-center">
            <SplitHeader
              eyebrow={<EyebrowPillBadge text="Hinnastamine" className="mx-auto" />}
              title={data?.title || 'Investeering, tulevikku'}
              subtitle={
                <p className="mx-auto max-w-2xl font-medium text-[rgb(var(--text-secondary))] text-base sm:text-lg">
                  {data?.subtitle || 'Vali oma ettevõtte arengule sobivaim tase'}
                </p>
              }
              align="center"
            />
          </div>

          <div className={`mt-8 -mx-4 flex touch-auto gap-6 overflow-x-auto overscroll-x-contain px-4 pb-8 pt-10 snap-x snap-mandatory scroll-pl-4 scroll-pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 ${gridLayoutClass}`}>
            {tiers.map((tier, i) => {
              const queryParams = new URLSearchParams()
              queryParams.set('package', tier.name || 'Pakett')
              if (tier.price) queryParams.set('price', tier.price)
              if (tier.description) queryParams.set('desc', tier.description)
              if (tier.features && tier.features.length > 0) {
                queryParams.set('features', tier.features.join('|'))
              }
              const tierHref = `/register?${queryParams.toString()}`
              const tierCtaLabel = data?.ctaText || 'Vali pakett'
              const tierAriaLabel = `${tierCtaLabel} (${tier.name || 'Pakett'})`

              return (
                <div
                  key={i}
                  className={`group relative flex flex-col h-full !overflow-visible p-7 transition-all duration-500 hover:-translate-y-1 w-[min(85vw,310px)] sm:w-[min(85vw,340px)] shrink-0 snap-center snap-always md:w-auto md:shrink ${marketingInsetCardClass} ${
                    tier.isPopular
                      ? 'pricing-tier-popular border-2 border-blue-500 bg-gradient-to-b from-blue-50/30 to-white/30 dark:from-blue-950/50 dark:to-slate-900/50 backdrop-blur-md shadow-[0_30px_70px_-20px_rgba(37,99,235,0.8)] dark:shadow-[0_30px_70px_-20px_rgba(37,99,235,0.3)] md:scale-105 z-10'
                      : 'pricing-tier-card hover:border-blue-300/40 hover:shadow-[0_22px_55px_-35px_rgba(37,99,235,0.45)]'
                  }`}
                >
                  <div className="pricing-tier-hover-glow pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {tier.isPopular && (
                    <div className="pricing-popular-badge absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-600/40 text-center w-max">
                      {data?.popularBadgeText || 'Populaarseim valik'}
                    </div>
                  )}

                  <div className="mb-7">
                  <div className="mb-2 text-xl font-bold text-[rgb(var(--text-primary))]">{tier.name || 'Pakett'}</div>
                    <div className="flex items-end gap-1">
                      <span className="pricing-tier-price inline-block pr-1 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-4xl font-black tracking-tighter leading-none text-transparent sm:text-5xl">
                        {tier.price || '0'}
                      </span>
                      <span className="pb-1 font-bold text-[rgb(var(--text-secondary))]">€</span>
                      <span className="ml-1 pb-1 text-sm text-[rgb(var(--text-secondary))]">+ KM</span>
                    </div>
                    <p className="mt-3 text-sm text-[rgb(var(--text-secondary))]">{tier.description}</p>
                  </div>

                  <div className="mb-8 flex-grow space-y-3.5">
                    {(tier.features || []).map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="pricing-tier-check-icon mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/15">
                          <svg className="h-3 w-3 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    {tier.isPopular ? (
                      <BrandVibrantButton
                        href={tierHref}
                        icon={Check}
                        className="w-full"
                        rel="nofollow"
                        aria-label={tierAriaLabel}
                      >
                        {tierCtaLabel}
                        <span className="sr-only"> ({tier.name || 'Pakett'})</span>
                      </BrandVibrantButton>
                    ) : (
                      <WhiteButton
                        href={tierHref}
                        icon={Check}
                        className="w-full"
                        rel="nofollow"
                        aria-label={tierAriaLabel}
                      >
                        {tierCtaLabel}
                        <span className="sr-only"> ({tier.name || 'Pakett'})</span>
                      </WhiteButton>
                    )}
                    {/* Secondary schedule CTA — course page layout (4-col investment block) */}
                    {columns === 4 ? (
                      <WhiteButton
                        href="#ajakava"
                        icon={Calendar}
                        className="w-full"
                        onClick={scrollToSchedule}
                        aria-label="Vaata ajakava"
                      >
                        Vaata ajakava
                      </WhiteButton>
                    ) : null}
                  </div>
                </div>
              )
            })}

            {columns === 4 && !data?.hideCorporateBlock && (
              <>
                <div className="w-full basis-full shrink-0 snap-none px-1 py-2 md:col-span-2 relative z-20 mt-4 md:mt-8">
                  <PricingSupportHighlight
                    prefix={supportNotePrefix}
                    highlight={supportNoteHighlight}
                  />
                </div>

                <div
                  className={`group relative flex flex-col h-full !overflow-visible p-7 transition-all duration-500 hover:-translate-y-1 w-[min(85vw,310px)] sm:w-[min(85vw,340px)] shrink-0 snap-center snap-always md:w-auto md:shrink ${marketingInsetCardClass} hover:border-blue-300/40 hover:shadow-[0_22px_55px_-35px_rgba(37,99,235,0.45)]`}
                >
                  <div className="pricing-corporate-badge absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 border border-white/30 text-white px-4 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-center w-max">
                    {corporateBadgeText}
                  </div>

                  <div className="mb-7">
                    <div className="mb-2 text-xl font-bold text-[rgb(var(--text-primary))]" role="heading" aria-level={3}>
                      {corporateTitle}
                    </div>
                    {hasCorporatePrice ? (
                      <CorporatePriceDisplay
                        price={corporatePrice}
                        prefix={corporatePricePrefix}
                        taxLabel={corporatePriceTaxLabel}
                        suffix={corporatePriceSuffix}
                        variant="card"
                      />
                    ) : null}
                    <p className="mt-3 text-xs text-[rgb(var(--text-secondary))]">{corporateSubtitle}</p>
                  </div>

                  <div className="mb-8 flex-grow space-y-3.5">
                    {corporateFeatures.map((feature, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="pricing-tier-check-icon mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/15">
                          <svg className="h-3 w-3 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))]">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-auto flex flex-col gap-3 ${hasCorporatePrice ? '' : 'max-w-xs mx-auto w-full'}`}>
                    <BrandVibrantButton
                      href={corporateHref}
                      className="w-full"
                      rel="nofollow"
                    >
                      {corporateCtaText}
                    </BrandVibrantButton>
                    {columns === 4 ? (
                      <WhiteButton
                        href="#ajakava"
                        icon={Calendar}
                        className="w-full"
                        onClick={scrollToSchedule}
                        aria-label="Vaata ajakava"
                      >
                        Vaata ajakava
                      </WhiteButton>
                    ) : null}
                  </div>
                </div>
              </>
            )}
          </div>

          {columns === 3 && (
            <div className="mt-8 md:mt-12 relative z-20">
              <PricingSupportHighlight
                prefix={supportNotePrefix}
                highlight={supportNoteHighlight}
              />
            </div>
          )}

          {!data?.hideCorporateBlock && columns === 3 && (
            <div
              className={`group relative mt-8 flex flex-col h-full !overflow-visible p-7 transition-all duration-500 w-full md:hidden ${marketingInsetCardClass}`}
            >
              <div className="pricing-corporate-badge absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 border border-white/30 text-white px-4 py-1 text-[9px] font-black uppercase tracking-[0.25em] text-center w-max">
                {corporateBadgeText}
              </div>

              <div className="mb-7">
                <div className="mb-2 text-xl font-bold text-[rgb(var(--text-primary))]" role="heading" aria-level={3}>
                  {corporateTitle}
                </div>
                {hasCorporatePrice ? (
                  <CorporatePriceDisplay
                    price={corporatePrice}
                    prefix={corporatePricePrefix}
                    taxLabel={corporatePriceTaxLabel}
                    suffix={corporatePriceSuffix}
                    variant="card"
                  />
                ) : null}
                <p className="mt-3 text-xs text-[rgb(var(--text-secondary))]">{corporateSubtitle}</p>
              </div>

              <div className="mb-8 flex-grow space-y-3.5">
                {corporateFeatures.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="pricing-tier-check-icon mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/15">
                      <svg className="h-3 w-3 text-blue-500 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium leading-relaxed text-[rgb(var(--text-secondary))]">{feature}</span>
                  </div>
                ))}
              </div>

              <div className={`mt-auto flex flex-col gap-3 ${hasCorporatePrice ? '' : 'max-w-xs mx-auto w-full'}`}>
                <BrandVibrantButton
                  href={corporateHref}
                  className="w-full"
                  rel="nofollow"
                >
                  {corporateCtaText}
                </BrandVibrantButton>
              </div>
            </div>
          )}

          {/* Corporate Block - Desktop only (Shown only when columns = 3) */}
          {columns === 3 && !data?.hideCorporateBlock && (
            <div className="hidden md:flex pricing-corporate-block group relative mt-10 overflow-visible flex-col md:flex-row items-center gap-6 rounded-3xl border border-white/20 bg-gradient-to-br from-[rgb(var(--bg-primary))]/80 via-blue-500/[0.02] to-[rgb(var(--bg-primary))]/85 p-6 md:p-8 shadow-[0_32px_80px_-30px_rgba(59,130,246,0.45),inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[0_32px_80px_-38px_rgba(0,0,0,0.85)] backdrop-blur transition-all duration-500 hover:-translate-y-1 before:absolute before:left-0 before:top-8 before:bottom-8 before:w-1 before:bg-gradient-to-b before:from-blue-500 before:via-cyan-400 before:to-transparent before:rounded-r-full">
            <div className="pricing-corporate-badge absolute left-8 top-0 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 border border-white/30 text-white shadow-[0_8px_25px_-8px_rgba(37,99,235,0.7)] px-4 py-1 text-[9px] font-black uppercase tracking-[0.25em] transition-transform duration-500 group-hover:scale-105">
              {corporateBadgeText}
            </div>

            {/* Left: Icon Container */}
            <div className="pricing-corporate-icon-box relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-gradient-to-br from-blue-600/35 via-indigo-500/10 to-transparent text-blue-600 dark:text-blue-400 shadow-[0_12px_32px_-10px_rgba(37,99,235,0.35)] backdrop-blur-md">
              <span className="absolute -inset-1 rounded-2xl bg-blue-500/10 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <Users className="relative h-6 w-6" strokeWidth={1.8} />
            </div>

            {/* Middle: Title, Subtitle, Features */}
            <div className="flex-1 w-full text-left relative z-10">
              <div className="pricing-corporate-title text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">{corporateTitle}</div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 mb-6 max-w-xl">{corporateSubtitle}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {corporateFeatures.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3.5 group/item transition-transform duration-300 hover:translate-x-1">
                    <div className="pricing-corporate-check flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/5 text-blue-600 dark:text-blue-400 shadow-[0_2px_8px_rgba(59,130,246,0.15)] border border-blue-500/25">
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[13.5px] font-semibold tracking-tight text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Price & CTA */}
            <div
              className={`relative z-10 flex w-full shrink-0 flex-col justify-center md:w-auto ${
                hasCorporatePrice
                  ? 'mt-6 items-center border-t border-[var(--border)]/70 pt-6 md:mt-0 md:items-end md:border-t-0 md:pt-0'
                  : 'mt-4 items-center px-2 py-2 md:mt-0 md:min-w-[220px] md:px-4 md:py-6'
              }`}
            >
              {hasCorporatePrice ? (
                <CorporatePriceDisplay
                  price={corporatePrice}
                  prefix={corporatePricePrefix}
                  taxLabel={corporatePriceTaxLabel}
                  suffix={corporatePriceSuffix}
                  variant="banner"
                  cta={
                    <BrandVibrantButton
                      href={corporateHref}
                      className="w-full"
                      rel="nofollow"
                    >
                      {corporateCtaText}
                    </BrandVibrantButton>
                  }
                />
              ) : (
                <div className="pricing-corporate-cta-only flex w-full max-w-[280px] items-center justify-center rounded-2xl border border-white/20 bg-slate-950/[0.02] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] dark:bg-white/[0.01] md:max-w-[240px] md:p-8">
                  <BrandVibrantButton
                    href={corporateHref}
                    className="w-full min-w-[200px]"
                    rel="nofollow"
                  >
                    {corporateCtaText}
                  </BrandVibrantButton>
                </div>
              )}
            </div>
            </div>
          )}

          <div className="pricing-footer-note mt-12 border-t border-[var(--border)]/70 pt-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em]">
              {footerNotice && !footerNotice.toLowerCase().includes('80% toetuse') ? (
                <span className="text-emerald-700 dark:text-emerald-400">{footerNotice}</span>
              ) : (
                <>
                  <span className="text-slate-500 dark:text-slate-400">Küsi lisa </span>
                  <span className="text-emerald-700 dark:text-emerald-400">Töötukassa toetuse võimalus kuni 80%</span>
                </>
              )}
            </p>
          </div>
        </div>
    </Container>
  );
}
