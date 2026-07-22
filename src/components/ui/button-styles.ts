/** Brand CTA classes from globals.css (`.btn-vibrant-blue`, `.btn-apple-green`, `.btn-soft-white`). */

export type ButtonBrandVariant = 'vibrant' | 'green' | 'softWhite'

export const buttonBrandVariantClasses: Record<ButtonBrandVariant, string> = {
  vibrant: 'btn-vibrant-blue',
  green: 'btn-apple-green',
  softWhite: 'btn-soft-white',
}

export type ButtonVibrantLayout = 'hero' | 'marketing' | 'wide'

/** Width / typography modifiers for vibrant CTAs (paired with `btn-vibrant-blue`). */
export const buttonVibrantLayoutClasses: Record<ButtonVibrantLayout, string> = {
  hero: 'w-full px-8 py-4 sm:w-auto sm:px-10 sm:py-5',
  marketing:
    'w-full px-8 py-4 text-center text-xs font-black uppercase tracking-eyebrow sm:w-auto sm:px-10 sm:py-5',
  wide: 'w-full px-12 py-4 sm:w-fit',
}

/** White pill secondary CTA (hero / koolitus / opstar rhythm). */
export const buttonSecondaryMarketingClasses =
  'flex w-full items-center justify-center rounded-full border-2 border-gray-100 bg-white px-8 py-4 text-center font-bold text-gray-900 shadow-md transition-all hover:scale-[1.02] hover:bg-gray-50 hover:shadow-lg active:scale-[0.98] dark:border-white/[0.1] dark:bg-[rgb(var(--bg-secondary))] dark:text-[rgb(var(--text-primary))] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.65)] dark:hover:bg-[rgb(28_34_48)] dark:hover:brightness-110 sm:w-auto sm:px-10 sm:py-5'
