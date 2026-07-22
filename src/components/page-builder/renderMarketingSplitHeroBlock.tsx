import type { ReactNode } from 'react'
import { GraduationCap } from 'lucide-react'
import MarketingSplitHero from '@/components/marketing/MarketingSplitHero'
import HeroGlobalStatsStrip from '@/components/HeroGlobalStatsStrip'
import KoolitusHeroQuickFacts from '@/components/KoolitusHeroQuickFacts'
import OpstarProfitHeroDiagram from '@/components/OpstarProfitHeroDiagram'
import { KoolitusCardSkeleton } from '@/components/CardSkeletons'
import { Suspense } from 'react'
import { BrandVibrantButton, WhiteButton, marketingMicroPillClass } from '@/components/ui'
import { resolveLink, type SanityLink } from '@/lib/resolveLink'
import { urlFor } from '@/lib/sanity/client'
import type { MarketingSplitHeroBlock } from '@/types/mainPageSections'

type RenderOptions = {
  imageFallback?: ReactNode
  ctx?: any
  /** Suppress 4-metric strip under trainer photo card (used on /about). */
  hideHeroGlobalStatsStrip?: boolean
}

export function renderMarketingSplitHeroBlock(
  block: MarketingSplitHeroBlock,
  options?: RenderOptions,
) {
  const eyebrow = block.eyebrow?.trim()
  if (!block.headline && !block.scriptHeadline && !block.description) return null
  const stats = block.stats?.filter((s) => s.value || s.label)

  const defaultFallback = (
    <div className="flex size-72 flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-6 text-center sm:size-80 md:size-96">
      <GraduationCap className="h-14 w-14 text-blue-400" strokeWidth={1.25} aria-hidden />
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/85">
        {eyebrow || 'ANDRES KASE'}
      </p>
      <p className="max-w-[11rem] text-xs font-medium leading-snug text-white/55">
        {block.headline || 'Juhendatud lõputööd'}
      </p>
    </div>
  )

  const heroStats =
    stats && stats.length > 0 && block.rightComponentType !== 'clientsStats' ? (
      <div className="flex flex-wrap justify-start gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`px-4 py-3 ${marketingMicroPillClass}`}>
            <div className="text-2xl font-extrabold tracking-tight text-[rgb(var(--text-primary))]">
              {stat.value}
            </div>
            <div className="text-xs font-medium uppercase tracking-[0.06em] text-[rgb(var(--text-secondary))]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    ) : undefined

  const primaryHref = resolveLink(block.primaryCta?.link as SanityLink | undefined)
  const secondaryHref = resolveLink(block.secondaryCta?.link as SanityLink | undefined)
  const hasPrimary = Boolean(block.primaryCta?.text?.trim())
  const hasSecondary = Boolean(block.secondaryCta?.text?.trim())

  let rightColumn: ReactNode = undefined

  if (block.rightComponentType === 'quickFacts') {
    rightColumn = (
      <Suspense fallback={<KoolitusCardSkeleton />}>
        <KoolitusHeroQuickFacts
          quickFactsCard={{
            ...block.quickFactsCard,
            stats: block.globalStats?.stats || block.quickFactsCard?.stats,
          }}
          badges={block.badges}
        />
      </Suspense>
    )
  } else if (block.rightComponentType === 'aboutAndres') {
    const defaultBadges = [
      { label: 'VISIIDID', text: '100+ tehast külastatud', icon: 'factory', positionX: 5, positionY: 20 },
      { label: 'HINNANG', text: '4.9 / 5 koolituse hinnang', icon: 'star', positionX: 5, positionY: 75 }
    ]
    const floatingBadges = block.floatingBadges?.map((b: any, i) => ({ label: b?.label, text: b?.text || b, icon: b?.icon || (i === 1 ? 'star' : 'factory'), positionX: b?.positionX ?? 5, positionY: b?.positionY ?? (i === 0 ? 20 : 75) })) || defaultBadges

    rightColumn = (
      <div className="w-full flex justify-center items-center px-6 sm:px-0">
        <div className="relative w-full max-w-sm mx-auto transition-all duration-500 hover:scale-[1.015] overflow-visible">
          {floatingBadges.map((badge: any, idx: number) => {
            const x = badge.positionX ?? 5
            const y = badge.positionY ?? (idx === 0 ? 20 : 75)
            const isStar = badge.icon === 'star'

            return (
              <div
                key={idx}
                className={`absolute z-10 flex min-w-[170px] max-w-[190px] -translate-x-1/2 -translate-y-1/2 transform select-none items-center gap-2.5 p-3 shadow-md transition-all duration-300 ${marketingMicroPillClass}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {isStar ? (
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-500 shrink-0">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shrink-0">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black uppercase text-slate-700 dark:text-slate-300 leading-tight">
                    {badge.label || (isStar ? 'Hinnang' : 'Visiidid')}
                  </span>
                  <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 leading-tight">
                    {badge.text}
                  </span>
                </div>
              </div>
            )
          })}

          <div className="relative aspect-[4/5] w-full rounded-t-[24px] overflow-hidden shadow-lg border-t border-x border-slate-100 dark:border-white/5">
            {block.heroImage?.asset ? (
              <img
                src={urlFor(block.heroImage).width(800).height(800).fit('crop').url()}
                alt={block.heroImage.alt || block.headline || 'Your Name'}
                className="w-full h-full object-cover object-top filter-none"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 dark:bg-slate-800" />
            )}
          </div>

          <div className="bg-white border-x border-b border-slate-100 rounded-b-[24px] p-5 dark:bg-slate-900 dark:border-white/5 shadow-md flex items-end justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="space-y-0.5 text-left">
                <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                  Your Name
                </h3>
                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mt-1">
                  LEAN · TPS koolitaja · Product Name
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["LEAN", "TPS", "Kaizen", "VSM"].map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-blue-600 dark:text-sky-300 ${marketingMicroPillClass}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={block.linkedinUrl || "https://www.linkedin.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group flex items-center justify-center shrink-0 border-2 border-[#0055E5] bg-gradient-to-br from-[#EEF4FF] to-white text-[#0055E5] p-3 rounded-xl transition-all hover:scale-105 shadow-sm dark:border-sky-500/40 dark:from-sky-950/20 dark:to-slate-900/40 dark:text-sky-400 overflow-hidden"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(0, 85, 229, 0.04) 0px, rgba(0, 85, 229, 0.04) 2px, transparent 2px, transparent 8px)'
              }}
              title="Your Name LinkedIn profiil"
            >
              <div className="absolute inset-0 bg-[#0055E5]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3c0-2.07-1.12-3.13-2.67-3.13-1.25 0-1.81.69-2.12 1.18v-1H11v8.38h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
          </div>

          {!options?.hideHeroGlobalStatsStrip ? (
            <HeroGlobalStatsStrip stats={options?.ctx?.globalStats} />
          ) : null}
        </div>
      </div>
    )
  } else if (block.rightComponentType === 'opstarDiagram') {
    const orbitBlock = block.opstarProfitBlockRef ?? options?.ctx?.sanityPage?.orbitBlock ?? options?.ctx?.orbitBlockFallback ?? {}
    const illustration = orbitBlock.illustration ?? {}
    const meta = orbitBlock.heroDiagramMeta ?? {}

    const tagPillsRaw: string | undefined = meta.tagPills
    const tagPills = tagPillsRaw
      ? tagPillsRaw.split(',').map((t: string) => t.trim()).filter(Boolean)
      : undefined

    rightColumn = (
      <OpstarProfitHeroDiagram
        eyebrowLabel={meta.eyebrowLabel || undefined}
        cardTitle={meta.cardTitle || undefined}
        badgeText={meta.badgeText || undefined}
        tagPills={tagPills}
        centralText={illustration.centralText || undefined}
        nodes={illustration.illustrationItems?.length ? illustration.illustrationItems : undefined}
        metrics={
          orbitBlock.heroMetrics?.length 
            ? orbitBlock.heroMetrics 
            : options?.ctx?.globalStats?.length
              ? options.ctx.globalStats.slice(0, 3).map((s: any) => ({ value: `${s.number || ''}${s.suffix || ''}`, label: s.label, number: s.number, suffix: s.suffix }))
              : undefined
        }
      />
    )
  } else if (block.rightComponentType === 'blogImage') {
    rightColumn = (
      <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-slate-100 p-8 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 shadow-inner">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Blogi komponendid</p>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mt-2">Filter • Posts • Newsletter</p>
        </div>
      </div>
    )
  } else if (block.rightComponentType === 'clientsStats') {
    rightColumn = (
      <div className="flex h-full w-full flex-col justify-center rounded-[24px] bg-white p-6 sm:p-8 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 mb-3">
            Usaldusväärne Partner
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Mõõdetavad tulemused
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Aitame tootmisettevõtetel saavutada püsivat efektiivsust.
          </p>
        </div>
        
        <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-4">
          {stats && stats.length > 0 ? (
            stats.map((stat, index) => (
              <div key={index} className="group relative flex min-w-0 flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50 p-3 transition-colors duration-300 hover:bg-white dark:border-white/5 dark:bg-slate-800/40 dark:hover:bg-slate-800 sm:p-5">
                <span className="break-words text-2xl font-black text-blue-600 transition-transform duration-300 group-hover:scale-105 origin-left dark:text-blue-400 sm:text-3xl md:text-4xl">{stat.value}</span>
                <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</span>
              </div>
            ))
          ) : (
            <div className="group relative flex flex-col gap-1 p-5 rounded-2xl bg-slate-50 hover:bg-white dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-100 dark:border-white/5 transition-colors duration-300 col-span-2">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center py-4">Lisa statistika plokid Sanityst</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <MarketingSplitHero
      eyebrow={eyebrow || undefined}
      headline={block.headline || ''}
      scriptHeadline={block.scriptHeadline}
      scriptHeadlineClassName="text-marketing-accent-shell block font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal mt-2"
      headlineClassName="mb-2 mt-4 min-w-0 break-words text-3xl font-extrabold leading-[1.1] tracking-tight text-[#122136] hyphens-auto dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
      headlineMainClassName="leading-[1.1] tracking-tight"
      subtitle={undefined}
      description={block.description}
      descriptionVariant="muted"
      descriptionClassName="mt-3 mb-8 md:mb-10 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-base"
      columnAlign="start"
      image={
        !rightColumn && block.heroImage?.asset
          ? {
              src: urlFor(block.heroImage).width(800).height(800).fit('crop').url(),
              alt: block.heroImage.alt || block.headline || 'Hero',
            }
          : undefined
      }
      imageFallback={!rightColumn ? (options?.imageFallback ?? defaultFallback) : undefined}
      rightColumn={rightColumn}
      customCtas={
        hasPrimary || hasSecondary ? (
          <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:justify-start">
            {hasPrimary ? (
              <BrandVibrantButton href={primaryHref} className="w-full sm:w-auto">
                {block.primaryCta!.text}
              </BrandVibrantButton>
            ) : null}
            {hasSecondary ? (
              <WhiteButton href={secondaryHref} className="w-full sm:w-auto">
                {block.secondaryCta!.text}
              </WhiteButton>
            ) : null}
          </div>
        ) : undefined
      }
      belowCtas={heroStats}
      className="pb-10"
    />
  )
}

