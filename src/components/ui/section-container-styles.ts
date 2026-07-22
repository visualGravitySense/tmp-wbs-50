/** Shared layout chrome for page sections and inner width constraints. */

export type SectionVariant =
  | 'default'
  | 'band'
  | 'bandCompact'
  | 'page'
  | 'bordered'
  | 'compact'
  | 'minimal'
  | 'audience'

/**
 * Allow decorative blurs to bleed vertically; clip horizontal overflow only.
 * Prefer overflow-x-clip over overflow-x-hidden so overflow-y stays visible
 * (hidden + visible-y computes to auto and can nest a second vertical scrollbar).
 */
const sectionOverflow =
  'relative w-full max-w-full overflow-x-clip overflow-y-visible'

/** @deprecated Prefer horizontal padding on MarketingContainer (`marketingContainerClass`). */
export const marketingSectionXPad = 'px-4 sm:px-6 lg:px-8'

const marketingSectionPad = 'py-16 md:py-24'

export const sectionVariantClasses: Record<SectionVariant, string> = {
  default: `${sectionOverflow} bg-transparent ${marketingSectionPad} transition-colors duration-200`,
  band: `${sectionOverflow} w-full bg-transparent ${marketingSectionPad} transition-colors duration-200`,
  bandCompact: `${sectionOverflow} w-full bg-transparent ${marketingSectionPad} transition-colors duration-200`,
  page: `${sectionOverflow} bg-transparent ${marketingSectionPad} transition-colors duration-200`,
  bordered: `${sectionOverflow} border-t border-[var(--border)]/40 bg-transparent ${marketingSectionPad} transition-colors duration-200`,
  compact: `${sectionOverflow} bg-transparent py-10 transition-colors duration-200 sm:py-12 lg:py-14`,
  minimal: 'relative overflow-x-clip overflow-y-visible',
  audience:
    'relative overflow-x-clip overflow-y-visible bg-transparent py-6 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:py-8 sm:pl-6 sm:pr-6 lg:py-10',
}

export type ContainerSize = '4xl' | '5xl' | '6xl' | '7xl' | 'full'

export type ContainerPadding = 'none' | 'default' | 'wide' | 'tight'

export const containerBase = 'relative mx-auto w-full min-w-0'

export const containerSizeClasses: Record<ContainerSize, string> = {
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
}

export const containerPaddingClasses: Record<ContainerPadding, string> = {
  none: '',
  default: 'px-4 sm:px-6',
  wide: 'px-6',
  tight: 'px-1 sm:px-2',
}
