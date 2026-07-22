import Image from 'next/image'
import type { ReactNode } from 'react'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { BrandVibrantButton, MarketingContainer, SecondaryMarketingButton } from '@/components/ui'
import { cn } from '@/lib/utils'

export type MarketingSplitHeroBadge = {
  text: string
  color?: string
}

export type MarketingSplitHeroButton = {
  text: string
  href: string
  showArrow?: boolean
}

export type MarketingSplitHeroImage = {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}

export type MarketingSplitHeroProps = {
  badges?: MarketingSplitHeroBadge[]
  badgesPosition?: 'top' | 'above-ctas'
  /** Single pill above headline (e.g. Koolitus) */
  eyebrow?: string | ReactNode
  eyebrowShowDots?: boolean
  eyebrowClassName?: string
  headline: string
  /** Overrides comma-split accent line when provided */
  headlineAccent?: string
  /** Second headline line — italic accent (Koolitus / Blog) */
  scriptHeadline?: string
  scriptHeadlineClassName?: string
  /** e.g. Product Name */
  headlineTrademark?: boolean
  /** Extra classes on the first headline line (e.g. uppercase italic) */
  headlineMainClassName?: string
  /** Override default h1 classes */
  headlineClassName?: string
  subtitle?: string
  /** `plain` = body copy (Koolitus); default = gradient italic tagline */
  subtitleVariant?: 'gradient' | 'plain'
  description?: string
  /** `muted` = smaller secondary paragraph (Koolitus) */
  descriptionVariant?: 'default' | 'muted'
  descriptionClassName?: string
  primaryButton?: MarketingSplitHeroButton
  secondaryButton?: MarketingSplitHeroButton
  customCtas?: ReactNode
  image?: MarketingSplitHeroImage
  imageFallback?: ReactNode
  floatingTags?: MarketingSplitHeroBadge[]
  /** Custom right column (e.g. KoolitusHeroQuickFacts) — replaces portrait */
  rightColumn?: ReactNode
  /** Renders under primary/secondary CTAs (e.g. stat strip) */
  belowCtas?: ReactNode
  /** Vertical alignment of the two columns */
  columnAlign?: 'center' | 'start'
  /** `centered` = single column, text centered, no portrait column */
  layout?: 'split' | 'centered'
  className?: string
}

function normalizeHeadline(str: string): string {
  const trimmed = str.trim()
  // If it's all uppercase and has letters, convert to title case
  if (trimmed === trimmed.toUpperCase() && trimmed !== trimmed.toLowerCase()) {
    return trimmed
      .toLowerCase()
      .replace(/(?:^|\s|-)\S/g, (m) => m.toUpperCase())
  }
  return trimmed
}

function splitHeadline(headline: string, headlineAccent?: string) {
  const normalized = normalizeHeadline(headline)
  const trimmed = normalized.trim()
  if (headlineAccent?.trim()) {
    return { main: trimmed, accent: headlineAccent.trim() }
  }
  const commaIndex = trimmed.indexOf(',')
  if (commaIndex >= 0) {
    return {
      main: trimmed.slice(0, commaIndex + 1).trim(),
      accent: trimmed.slice(commaIndex + 1).trim(),
    }
  }
  return { main: trimmed, accent: '' }
}

const PORTRAIT_FRAME_CLASS = 'w-[min(100%,18rem)] sm:w-[min(100%,20rem)] md:w-[min(100%,24rem)] aspect-square md:aspect-[4/5] max-h-[30vh] sm:max-h-[35vh] md:max-h-[50vh] min-h-[200px] shrink-0 mx-auto object-cover'

function HeroTopBadge({ text, color }: { text: string; color?: string }) {
  let borderHover = 'hover:border-blue-300/70'
  let textClass = 'text-blue-700 dark:text-blue-400'

  switch (color) {
    case 'green':
      borderHover = 'hover:border-green-300/70'
      textClass = 'text-green-700 dark:text-green-400'
      break
    case 'yellow':
    case 'amber':
      borderHover = 'hover:border-amber-400/70'
      textClass = 'text-amber-700 dark:text-amber-400'
      break
    case 'red':
    case 'rose':
      borderHover = 'hover:border-red-300/70'
      textClass = 'text-red-700 dark:text-red-400'
      break
    case 'purple':
      borderHover = 'hover:border-purple-300/70'
      textClass = 'text-purple-700 dark:text-purple-400'
      break
    case 'gray':
      borderHover = 'hover:border-gray-300/70'
      textClass = 'text-gray-700 dark:text-gray-400'
      break
    case 'white':
    case 'slate':
      borderHover = 'hover:border-slate-300/70'
      textClass = 'text-slate-700 dark:text-slate-300'
      break
  }

  return (
    <div className={`rounded-full border border-[rgb(var(--border))/0.65] bg-[rgb(var(--bg-primary))/0.75] px-3.5 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 hover:bg-[rgb(var(--bg-primary))/0.9] ${borderHover}`}>
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${textClass}`}>
        {text}
      </span>
    </div>
  )
}

function HeroPortrait({
  image,
  imageFallback,
  floatingTags,
}: {
  image?: MarketingSplitHeroImage
  imageFallback?: ReactNode
  floatingTags?: MarketingSplitHeroBadge[]
}) {
  return (
    <div className="relative mx-auto w-fit shrink-0 pb-10 md:mx-0 md:ml-auto md:pb-12">
      <div
        className={`absolute -inset-6 rounded-[3.25rem] bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.18),transparent_62%)] opacity-75 blur-2xl dark:bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.34),transparent_62%)] dark:opacity-80 md:-inset-8 ${PORTRAIT_FRAME_CLASS}`}
        aria-hidden
      />

      <div className="relative w-fit">
        <div
          className={`rounded-[2.35rem] bg-gradient-to-b from-white to-slate-200/45 p-1 shadow-[0_24px_56px_-28px_rgba(15,23,42,0.3)] sm:rounded-[2.65rem] sm:p-[5px] md:rounded-[2.85rem] dark:from-slate-700/40 dark:to-slate-900/60 ${PORTRAIT_FRAME_CLASS}`}
        >
          <div
            className={`overflow-hidden rounded-[2.25rem] bg-slate-800/95 ring-1 ring-inset ring-[rgb(var(--border))/0.55] sm:rounded-[2.5rem] md:rounded-[2.65rem] dark:bg-slate-900/90 ${PORTRAIT_FRAME_CLASS}`}
          >
            {image ? (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width ?? 384}
                height={image.height ?? 384}
                priority={image.priority ?? true}
                sizes={image.sizes ?? '(max-width: 768px) 288px, 384px'}
                className={`${PORTRAIT_FRAME_CLASS} object-cover object-top shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] dark:shadow-[inset_0_0_0_1px_rgba(191,219,254,0.2)]`}
              />
            ) : (
              imageFallback
            )}
          </div>
        </div>

        {floatingTags && floatingTags.length > 0 ? (
          <div className="absolute -bottom-2 left-1/2 flex w-max max-w-[min(100%,20rem)] -translate-x-1/2 flex-wrap justify-center gap-2">
            {floatingTags.map((tag, index) => (
              <div
                key={`${tag.text}-${index}`}
                className="rounded-full border border-white/90 bg-white/95 px-4 py-2 shadow-[0_12px_32px_-18px_rgba(15,23,42,0.35),inset_0_1px_0_0_rgba(255,255,255,0.96)] backdrop-blur-xl animate-in fade-in zoom-in duration-700 dark:border-blue-100/25 dark:bg-blue-950/55"
                style={{ animationDelay: `${150 + index * 80}ms` }}
              >
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-900 dark:text-white/95">
                  {tag.text}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Borderless split hero — copy left, portrait or custom right column, floats on page ambient.
 */
export default function MarketingSplitHero({
  badges,
  eyebrow,
  eyebrowShowDots,
  eyebrowClassName,
  headline,
  headlineAccent,
  scriptHeadline,
  scriptHeadlineClassName,
  headlineTrademark,
  headlineMainClassName,
  headlineClassName,
  subtitle,
  subtitleVariant = 'gradient',
  description,
  descriptionVariant = 'default',
  descriptionClassName,
  primaryButton,
  secondaryButton,
  customCtas,
  image,
  imageFallback,
  floatingTags,
  rightColumn,
  belowCtas,
  columnAlign = 'center',
  layout = 'split',
  className = '',
  badgesPosition = 'top',
}: MarketingSplitHeroProps) {
  const isCentered = layout === 'centered'
  const { main: headlineMain, accent: headlineAccentLine } = splitHeadline(headline, headlineAccent)
  const scriptLine = scriptHeadline?.trim() ?? ''
  const showCommaAccent = !scriptLine && Boolean(headlineAccentLine)
  const showPortrait = !isCentered && Boolean(
    !rightColumn && (image || imageFallback || (floatingTags && floatingTags.length > 0)),
  )
  const columnAlignClass = columnAlign === 'start' ? 'md:items-start' : 'md:items-center'
  const showCtas = Boolean(primaryButton || secondaryButton)
  const defaultScriptHeadlineClass =
    'text-marketing-accent-shell mt-2 block overflow-visible pt-1 pb-3 font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal sm:pb-4'
  const defaultDescriptionClass =
    descriptionVariant === 'muted'
      ? 'mb-6 md:mb-8 mt-2 md:mt-3 max-w-2xl text-sm leading-relaxed text-[rgb(var(--text-secondary))/0.86] sm:text-[15px]'
      : 'mb-6 md:mb-8 max-w-2xl text-lg font-medium leading-relaxed text-[rgb(var(--text-secondary))]'

  const defaultHeadlineClass =
    'mb-6 overflow-visible pb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#122136] dark:text-white sm:pb-3'

  const heroEyebrowWrapperClass =
    'mt-2 mb-6 inline-flex items-center justify-center md:justify-start'

  return (
    <section
      className={cn(
        'relative z-10 flex w-full max-w-full flex-col overflow-x-hidden overflow-y-visible bg-transparent pt-28 md:pt-36 pb-16',
        className,
      )}
    >
      <MarketingContainer elevated className={cn('w-full min-w-0', isCentered ? 'max-w-4xl' : undefined)}>
        <div
          className={
            isCentered
              ? 'relative flex w-full min-w-0 flex-col items-center px-4 text-center'
              : cn(
                  'relative flex w-full min-w-0 flex-col items-center gap-8 px-4 text-center sm:gap-10',
                  'md:flex-row md:justify-between md:gap-12 md:px-0 md:text-left lg:gap-16 xl:gap-20',
                  columnAlignClass,
                )
          }
        >
          <div
            className={cn(
              'min-w-0 flex-1',
              isCentered
                ? 'mx-auto flex w-full max-w-3xl flex-col items-center text-center'
                : 'flex w-full flex-col items-center text-center md:items-start md:text-left',
            )}
          >
            {eyebrow ? (
              typeof eyebrow === 'string' ? (
                <EyebrowPillBadge
                  text={eyebrow}
                  showDots={eyebrowShowDots}
                  flow
                  wrapperClassName={eyebrowClassName}
                  className="shadow-[0_8px_26px_-18px_rgba(59,130,246,0.35)] dark:shadow-none"
                />
              ) : (
                <div className={eyebrowClassName ?? heroEyebrowWrapperClass}>
                  {eyebrow}
                </div>
              )
            ) : null}
            {badgesPosition === 'top' && badges && badges.length > 0 ? (
              <div className="mb-8 flex flex-wrap justify-center gap-2 md:justify-start">
                {badges.map((badge, index) => (
                  <HeroTopBadge key={`${badge.text}-${index}`} text={badge.text} color={badge.color} />
                ))}
              </div>
            ) : null}

            <h1 className={cn(headlineClassName ?? defaultHeadlineClass, 'min-w-0 break-words hyphens-auto')}>
              <span className={`block text-[rgb(var(--text-primary))] ${headlineMainClassName ?? ''} break-words`}>
                {headlineMain}
                {headlineTrademark ? (
                  <span className="align-super ml-0.5 text-lg font-black text-blue-600 italic dark:text-blue-400 sm:text-xl md:text-2xl">
                    ™
                  </span>
                ) : null}
              </span>
              {scriptLine ? (
                <span className={scriptHeadlineClassName ?? defaultScriptHeadlineClass}>
                  <span className="hero-headline-accent whitespace-pre-line">
                    {scriptLine}
                  </span>
                </span>
              ) : null}
              {showCommaAccent ? (
                <span className="text-marketing-accent-shell mt-2 block overflow-visible pt-1 pb-3 font-serif font-normal italic text-[#0055E5] dark:text-sky-400 normal-case tracking-normal sm:pb-4">
                  <span className="hero-headline-accent block whitespace-pre-line">
                    {headlineAccentLine}
                  </span>
                </span>
              ) : null}
            </h1>

            {subtitleVariant === 'gradient' && subtitle ? (
              <p className="mb-6 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-lg font-bold italic tracking-tight text-transparent dark:from-blue-200 dark:via-sky-200 dark:to-indigo-200 sm:text-xl md:text-2xl">
                {subtitle}
              </p>
            ) : subtitle ? (
              <p className={`mx-auto mt-3 max-w-2xl text-[15px] font-medium leading-relaxed text-[rgb(var(--text-secondary))] sm:text-base md:mx-0 md:text-lg ${description ? 'mb-2' : 'mb-6 md:mb-8'}`}>
                {subtitle}
              </p>
            ) : null}

            {description ? (
              <p
                className={[
                  descriptionClassName ?? defaultDescriptionClass,
                  isCentered ? 'mx-auto' : 'mx-auto md:mx-0',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {description}
              </p>
            ) : null}

            {badgesPosition === 'above-ctas' && badges && badges.length > 0 ? (
              <div className="mb-6 flex flex-wrap justify-center gap-2 md:justify-start">
                {badges.map((badge, index) => (
                  <HeroTopBadge key={`${badge.text}-${index}`} text={badge.text} color={badge.color} />
                ))}
              </div>
            ) : null}

            {customCtas ? (
              <div
                className={`flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center sm:gap-4 ${isCentered ? 'justify-center' : 'justify-center md:justify-start'} [&>*]:w-full [&>*]:sm:w-auto`}
              >
                {customCtas}
              </div>
            ) : showCtas ? (
              <div
                className={`flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center sm:gap-4 ${isCentered ? 'justify-center' : 'justify-center md:justify-start'}`}
              >
              {primaryButton ? (
              <BrandVibrantButton
                href={primaryButton.href}
                variant="marketing"
                className={
                  primaryButton.showArrow
                    ? 'group inline-flex items-center justify-center gap-2 w-full sm:w-auto'
                    : 'w-full sm:w-auto'
                }
              >
                <span>{primaryButton.text}</span>
                {primaryButton.showArrow ? (
                  <svg
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                ) : null}
              </BrandVibrantButton>
              ) : null}
              {secondaryButton ? (
              <SecondaryMarketingButton
                href={secondaryButton.href}
                className="text-xs font-black uppercase tracking-eyebrow dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 w-full sm:w-auto"
              >
                {secondaryButton.text}
              </SecondaryMarketingButton>
              ) : null}
            </div>
            ) : null}
            {belowCtas ? (
              <div className={`mt-8 max-w-2xl ${isCentered ? 'mx-auto flex justify-center' : 'mx-auto flex justify-center md:mx-0 md:justify-start'}`}>
                {belowCtas}
              </div>
            ) : null}
          </div>

          {!isCentered && rightColumn ? (
            <div className="w-full min-w-0 md:w-auto md:max-w-[min(100%,28rem)] md:flex-[0.94] md:shrink-0">
              {rightColumn}
            </div>
          ) : showPortrait ? (
            <HeroPortrait image={image} imageFallback={imageFallback} floatingTags={floatingTags} />
          ) : null}
        </div>
      </MarketingContainer>
    </section>
  )
}
