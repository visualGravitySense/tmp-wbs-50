
import { useId } from 'react'
import { glassPanelVariantClasses, SplitHeader } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { cn } from '@/lib/utils'

export type HeroFeatureIconKey = 'blue' | 'orange' | 'purple' | 'green'

export type HeroFeature = {
  title: string
  description: string
  icon?: string
  svgIcon?: string
}

export const DEFAULT_HERO_FEATURES: HeroFeature[] = [
  { title: 'Mõõdetavad tulemused', description: 'KPI, OEE ja reaalsed näitajad', icon: 'blue' },
  { title: 'Päris tehased', description: '2 ettevõttekülastust programmi sees', icon: 'orange' },
  { title: 'Väike grupp', description: 'Kuni 16 osalejat, isiklik lähenemine', icon: 'purple' },
  { title: 'Rahvusvaheline tunnistus', description: 'Sertifikaat ja ametlik diplom', icon: 'green' },
]

const ICON_KEYS_BY_INDEX: HeroFeatureIconKey[] = ['blue', 'orange', 'purple', 'green']

const TITLE_TO_ICON: Record<string, HeroFeatureIconKey> = {
  'mõõdetavad tulemused': 'blue',
  'päris tehased': 'orange',
  'väike grupp': 'purple',
  'rahvusvaheline tunnistus': 'green',
}

function normalizeIconKey(value?: string): HeroFeatureIconKey | undefined {
  const key = value?.trim().toLowerCase()
  if (key === 'blue' || key === 'orange' || key === 'purple' || key === 'green') {
    return key
  }
  return undefined
}

/** Sanity `icon` väli + järjekord + pealkiri (tagavarana). */
export function resolveHeroFeatureIconKey(feature: HeroFeature, index: number): HeroFeatureIconKey {
  const fromSanity = normalizeIconKey(feature.icon)
  if (fromSanity) return fromSanity

  const fromTitle = TITLE_TO_ICON[feature.title?.trim().toLowerCase() ?? '']
  if (fromTitle) return fromTitle

  return ICON_KEYS_BY_INDEX[index % ICON_KEYS_BY_INDEX.length] ?? 'blue'
}

function getFeatureIconTheme(iconKey: HeroFeatureIconKey) {
  switch (iconKey) {
    case 'orange':
      return {
        containerClass:
          'bg-[rgba(255,140,0,.12)] border border-[rgba(255,255,255,.85)] shadow-[inset_0_2px_0_rgba(255,255,255,.9),inset_0_-1px_0_rgba(0,0,0,.06),0_3px_10px_rgba(0,0,0,.06)]',
      }
    case 'purple':
      return {
        containerClass:
          'bg-[rgba(139,92,246,.12)] border border-[rgba(255,255,255,.85)] shadow-[inset_0_2px_0_rgba(255,255,255,.9),inset_0_-1px_0_rgba(0,0,0,.06),0_3px_10px_rgba(0,0,0,.06)]',
      }
    case 'green':
      return {
        containerClass:
          'bg-[rgba(16,185,129,.12)] border border-[rgba(255,255,255,.85)] shadow-[inset_0_2px_0_rgba(255,255,255,.9),inset_0_-1px_0_rgba(0,0,0,.06),0_3px_10px_rgba(0,0,0,.06)]',
      }
    case 'blue':
    default:
      return {
        containerClass:
          'bg-[rgba(0,113,227,.12)] border border-[rgba(255,255,255,.85)] shadow-[inset_0_2px_0_rgba(255,255,255,.9),inset_0_-1px_0_rgba(0,0,0,.06),0_3px_10px_rgba(0,0,0,.06)]',
      }
  }
}

function HeroFeatureIcon({ iconKey }: { iconKey: HeroFeatureIconKey }) {
  const uid = useId().replace(/:/g, '')

  switch (iconKey) {
    case 'orange':
      return (
        <svg width="26" height="26" viewBox="0 0 80 80" fill="none" aria-hidden>
          <defs>
            <radialGradient id={`${uid}-j2`} cx="30%" cy="20%" r="75%">
              <stop offset="0%" stopColor="#ffe082" />
              <stop offset="40%" stopColor="#ff8c00" />
              <stop offset="100%" stopColor="#bf360c" />
            </radialGradient>
            <radialGradient id={`${uid}-j2hi`} cx="40%" cy="20%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,.85)" />
              <stop offset="100%" stopColor="rgba(255,200,100,.2)" />
            </radialGradient>
          </defs>
          <rect x="14" y="10" width="11" height="26" rx="5" fill={`url(#${uid}-j2)`} />
          <rect x="15" y="11" width="5" height="9" rx="2.5" fill={`url(#${uid}-j2hi)`} opacity=".7" />
          <rect x="30" y="18" width="10" height="18" rx="4.5" fill={`url(#${uid}-j2)`} />
          <rect x="31" y="19" width="4" height="7" rx="2" fill={`url(#${uid}-j2hi)`} opacity=".65" />
          <rect x="6" y="34" width="68" height="36" rx="14" fill={`url(#${uid}-j2)`} />
          <rect x="8" y="36" width="32" height="14" rx="7" fill={`url(#${uid}-j2hi)`} opacity=".6" />
          <rect x="14" y="52" width="13" height="11" rx="5" fill={`url(#${uid}-j2hi)`} opacity=".5" />
          <rect x="33" y="52" width="13" height="11" rx="5" fill={`url(#${uid}-j2hi)`} opacity=".5" />
          <rect x="52" y="52" width="13" height="11" rx="5" fill={`url(#${uid}-j2hi)`} opacity=".5" />
        </svg>
      )
    case 'purple':
      return (
        <svg width="26" height="26" viewBox="0 0 80 80" fill="none" aria-hidden>
          <defs>
            <radialGradient id={`${uid}-j3`} cx="30%" cy="20%" r="75%">
              <stop offset="0%" stopColor="#e0c3fc" />
              <stop offset="45%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#4c1d95" />
            </radialGradient>
            <radialGradient id={`${uid}-j3hi`} cx="35%" cy="25%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,.85)" />
              <stop offset="100%" stopColor="rgba(200,160,255,.15)" />
            </radialGradient>
          </defs>
          <circle cx="54" cy="24" r="12" fill={`url(#${uid}-j3)`} opacity=".7" />
          <circle cx="56" cy="20" r="5" fill={`url(#${uid}-j3hi)`} opacity=".55" />
          <path d="M36 70c0-10 8-16 18-16s18 6 18 16" fill={`url(#${uid}-j3)`} opacity=".7" />
          <circle cx="28" cy="26" r="15" fill={`url(#${uid}-j3)`} />
          <circle cx="30" cy="21" r="6" fill={`url(#${uid}-j3hi)`} opacity=".65" />
          <path d="M6 72c0-12 10-19 22-19s22 7 22 19" fill={`url(#${uid}-j3)`} />
        </svg>
      )
    case 'green':
      return (
        <svg width="26" height="26" viewBox="0 0 80 80" fill="none" aria-hidden>
          <defs>
            <radialGradient id={`${uid}-j4`} cx="28%" cy="18%" r="78%">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#065f46" />
            </radialGradient>
            <radialGradient id={`${uid}-j4hi`} cx="35%" cy="22%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,.9)" />
              <stop offset="100%" stopColor="rgba(160,240,200,.15)" />
            </radialGradient>
          </defs>
          <rect x="5" y="3" width="22" height="26" rx="3" stroke={`url(#${uid}-j4)`} strokeWidth="2" fill="none" />
          <rect x="12" y="6" width="46" height="58" rx="12" fill={`url(#${uid}-j4)`} />
          <rect x="14" y="8" width="22" height="16" rx="6" fill={`url(#${uid}-j4hi)`} opacity=".65" />
          <rect x="20" y="22" width="30" height="5" rx="2.5" fill="rgba(255,255,255,.55)" />
          <rect x="20" y="32" width="22" height="4" rx="2" fill="rgba(255,255,255,.35)" />
          <rect x="20" y="41" width="26" height="4" rx="2" fill="rgba(255,255,255,.35)" />
          <circle cx="56" cy="58" r="16" fill={`url(#${uid}-j4)`} />
          <circle cx="57" cy="54" r="6" fill={`url(#${uid}-j4hi)`} opacity=".6" />
          <path d="M48 58l5 6 12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'blue':
    default:
      return (
        <svg width="26" height="26" viewBox="0 0 80 80" fill="none" aria-hidden>
          <defs>
            <radialGradient id={`${uid}-j1bg`} cx="35%" cy="25%" r="70%">
              <stop offset="0%" stopColor="#a8edff" />
              <stop offset="45%" stopColor="#2196f3" />
              <stop offset="100%" stopColor="#0040c8" />
            </radialGradient>
            <radialGradient id={`${uid}-j1hi`} cx="40%" cy="20%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,.9)" />
              <stop offset="100%" stopColor="rgba(180,230,255,.4)" />
            </radialGradient>
          </defs>
          <rect x="10" y="44" width="16" height="26" rx="6" fill={`url(#${uid}-j1bg)`} />
          <rect x="12" y="46" width="7" height="8" rx="3" fill={`url(#${uid}-j1hi)`} opacity=".7" />
          <rect x="32" y="28" width="16" height="42" rx="6" fill={`url(#${uid}-j1bg)`} />
          <rect x="34" y="30" width="7" height="10" rx="3" fill={`url(#${uid}-j1hi)`} opacity=".7" />
          <rect x="54" y="12" width="16" height="58" rx="6" fill={`url(#${uid}-j1bg)`} />
          <rect x="56" y="14" width="7" height="12" rx="3" fill={`url(#${uid}-j1hi)`} opacity=".7" />
        </svg>
      )
  }
}

function HeroFeatureCard({
  title,
  description,
  className,
  iconKey,
}: HeroFeature & { className?: string; iconKey: HeroFeatureIconKey }) {
  const iconTheme = getFeatureIconTheme(iconKey)

  return (
    <article
      className={cn(
        glassPanelVariantClasses.card,
        'hero-feature-card group relative box-border shrink-0 cursor-default !overflow-visible',
        'border border-transparent',
        'max-sm:flex-[0_0_85%] max-sm:snap-start max-sm:snap-always sm:w-auto sm:min-w-0 sm:max-w-none sm:flex-initial',
        'rounded-3xl p-5 sm:p-6',
        'shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]',
        'dark:shadow-[0_10px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]',
        className,
      )}
    >
      <div className="relative z-10 flex items-start justify-between">
        <div
          className={cn(
            'hero-feature-icon-container relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[14px]',
            iconTheme.containerClass,
          )}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[14px] bg-gradient-to-b from-white/70 to-transparent" />
          <HeroFeatureIcon iconKey={iconKey} />
        </div>
        <div
          className="hero-feature-arrow-btn flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 dark:border-white/10 transition-transform duration-300"
          aria-hidden
        >
          <svg className="h-3 w-3 text-gray-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      <div className="relative z-10 mb-1 text-lg font-extrabold text-[var(--text-primary)] transition-colors group-hover:text-blue-600">
        {title}
      </div>
      <p className="relative z-10 text-sm font-medium text-[var(--text-secondary)]">{description}</p>
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-600/10 blur-3xl transition-all duration-700 group-hover:bg-blue-600/20 dark:bg-blue-500/14 dark:group-hover:bg-blue-500/24"
        aria-hidden
      />
    </article>
  )
}

export function resolveHeroFeatures(features?: HeroFeature[] | null): HeroFeature[] {
  if (!features || features.length === 0) return []
  const list = features.filter((f) => f.title?.trim() && f.description?.trim())
  if (list.length === 0) return []

  return list.map((feature, index) => ({
    ...DEFAULT_HERO_FEATURES[index % DEFAULT_HERO_FEATURES.length],
    ...feature,
    icon: resolveHeroFeatureIconKey(feature, index),
  }))
}

export type HeroFeatureCardsProps = {
  eyebrow?: string
  title?: string
  scriptSubtitle?: string
  description?: string
  features?: HeroFeature[] | null
  className?: string
  gridClassName?: string
}

export default function HeroFeatureCards({ eyebrow, title, scriptSubtitle, description, features, className, gridClassName }: HeroFeatureCardsProps) {
  const items = resolveHeroFeatures(features)
  if (items.length === 0) return null

  return (
    <div
      className={cn(
        'site-hero-features min-w-0 max-w-full overflow-x-clip overflow-y-visible px-1 pb-2 pt-1 sm:overflow-visible',
        'md:mx-auto md:w-full md:max-w-6xl',
        className,
      )}
    >
      {(title || description) && (
        <div className="mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-1">
          <SplitHeader
            title={title && scriptSubtitle ? `${title}, ${scriptSubtitle}` : title || ''}
            subtitle={description}
            eyebrow={eyebrow ? <EyebrowPillBadge text={eyebrow} /> : undefined}
            align="center"
          />
        </div>
      )}
      <div
        tabIndex={-1}
        className={cn(
          'flex min-w-0 flex-nowrap gap-3 overflow-x-auto overflow-y-visible overscroll-x-contain px-2 pb-6 pt-2 touch-auto snap-x snap-mandatory scroll-pl-4 scroll-pr-4 [overflow-anchor:none]',
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'max-md:-mx-2 max-md:px-3',
          'sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:snap-none sm:px-2 sm:pb-8 sm:pt-2',
          gridClassName,
        )}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {items.map((feature, index) => (
          <HeroFeatureCard
            key={`${feature.title}-${index}`}
            {...feature}
            iconKey={resolveHeroFeatureIconKey(feature, index)}
          />
        ))}
        <div className="max-md:w-10 max-md:shrink-0 md:hidden" aria-hidden />
      </div>
    </div>
  )
}
