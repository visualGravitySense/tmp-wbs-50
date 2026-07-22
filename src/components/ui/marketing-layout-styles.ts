import type { ContainerSize } from './section-container-styles'

/** Canonical content width for marketing pages (72rem). Header may use 7xl. */
export const MARKETING_CONTAINER_SIZE = '6xl' satisfies ContainerSize

/** Outer layout constraint for every standard marketing section. */
export const marketingContainerClass = 'mx-auto px-4 md:px-8 overflow-visible'

/** Uniform vertical rhythm between major page blocks. */
export const marketingSectionPadClass = 'py-16 md:py-24'

/** Compact band sections (stats strip, logo marquee, etc.). */
export const sectionBandPadClass = 'py-12'

export const sectionBandBorderClass = 'border-[rgb(var(--border))]/30'

/** Centered uppercase label above stats, logo marquees, and similar band sections. */
export const sectionBandEyebrowClass =
  'font-sans text-[10px] font-black tracking-[0.3em] uppercase text-[rgb(var(--text-secondary))] opacity-80 text-center'

const marketingCardSurface =
  'relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/40 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/30'

/** Primary section panel — one per major block. */
export const marketingPanelClass = `${marketingCardSurface} p-6 shadow-[0_28px_70px_-32px_rgba(15,23,42,0.18)] sm:p-8 md:p-10 dark:shadow-[0_28px_70px_-38px_rgba(0,0,0,0.45)]`

/** Slightly denser panel (audience, teasers, nested sections). */
export const marketingPanelCompactClass = `${marketingCardSurface} p-4 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.15)] sm:p-5 md:p-6 dark:shadow-[0_24px_56px_-36px_rgba(0,0,0,0.35)]`

/** Standard layout card (pricing tiers, quiz steps, info panels, testimonials). */
export const marketingInsetCardClass = `${marketingCardSurface} p-6 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.12)] transition-shadow sm:p-8 dark:shadow-[0_24px_56px_-36px_rgba(0,0,0,0.35)]`

/** Inner micro-pills, tabs, tags, and bullet boxes. */
export const marketingMicroPillClass =
  'rounded-xl border border-slate-200/50 bg-slate-100/50 dark:border-white/5 dark:bg-white/5'
