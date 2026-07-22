import React from 'react'
import { ArrowRight, Mail, Phone, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandVibrantButton } from '@/components/ui'
import EyebrowPillBadge from '@/components/EyebrowPillBadge'
import { PremiumGlassSurround } from '@/components/PremiumGlassSurround'
import GlassRibbonDivider from '@/components/GlassRibbonDivider'

export interface CTASectionProps {
  title?: string
  subtitle?: string
  description?: string
  backgroundColor?: string
  primaryButtonText?: string
  primaryButtonUrl?: string
  secondaryButtonText?: string
  secondaryButtonUrl?: string
  primaryButtonIcon?: string
  secondaryButtonIcon?: string
  /** Line under the ribbon. If omitted or null, default Estonian copy; empty string hides the line. */
  trustFootnote?: string | null
  /** Denser rhythm (smaller type + padding); default layout is already compact-first */
  compact?: boolean
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  subtitle,
  description,
  backgroundColor = 'blue-purple',
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  primaryButtonIcon = '🚀',
  secondaryButtonIcon = '📩',
  trustFootnote,
  compact = false,
}) => {
  const footnoteLine =
    trustFootnote === undefined || trustFootnote === null
      ? 'Kohtade arv on piiratud'
      : trustFootnote.trim()


  const renderSecondaryIcon = () => {
    const icon = secondaryButtonIcon?.trim()
    if (!icon || icon === '📩' || icon === '✉️' || icon === '✉') {
      return <Mail className="h-4 w-4 opacity-80 transition-transform group-hover:scale-110 group-hover:opacity-100" strokeWidth={2.2} />
    }
    if (icon === '🔍') {
      return <Search className="h-4 w-4 opacity-80 transition-transform group-hover:scale-110 group-hover:opacity-100" strokeWidth={2.2} />
    }
    if (icon === '📞' || icon === '☎️' || icon === '☎') {
      return <Phone className="h-4 w-4 opacity-80 transition-transform group-hover:scale-110 group-hover:opacity-100" strokeWidth={2.2} />
    }
    if (icon === '→' || icon === '➡️' || icon === '➜') {
      return <ArrowRight className="h-4 w-4 opacity-80 transition-transform group-hover:scale-110 group-hover:opacity-100" strokeWidth={2.2} />
    }

    return (
      <span
        className="text-base opacity-75 transition-transform group-hover:scale-110 group-hover:opacity-100 sm:text-lg"
        aria-hidden
      >
        {icon}
      </span>
    )
  }

  return (
    <section
      className={cn(
        'relative overflow-x-clip overflow-y-visible bg-transparent px-4 sm:px-6',
        compact ? 'py-8 sm:py-10 lg:py-11' : 'py-10 sm:py-12 lg:py-[3.35rem]'
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055] dark:opacity-[0.038]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(15 23 42 / 0.07) 1px, transparent 0)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-[42%] h-[min(340px,75vw)] w-[min(520px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]',
          backgroundColor === 'blue-purple' && 'bg-blue-600/[0.07] dark:bg-blue-500/[0.14]',
          backgroundColor === 'purple-pink' && 'bg-purple-600/[0.07] dark:bg-purple-500/[0.14]',
          backgroundColor === 'green-blue' && 'bg-green-600/[0.07] dark:bg-green-500/[0.14]',
          backgroundColor === 'orange-red' && 'bg-orange-600/[0.08] dark:bg-orange-500/[0.15]',
          backgroundColor === 'blue-lightblue' && 'bg-sky-600/[0.07] dark:bg-sky-500/[0.14]',
          compact ? 'opacity-80' : 'opacity-95'
        )}
        aria-hidden
      />

      <div
        className={cn(
          'relative z-10 mx-auto w-full min-w-0',
          compact ? 'max-w-xl sm:max-w-2xl' : 'max-w-2xl sm:max-w-3xl lg:max-w-[46rem]'
        )}
      >
        <PremiumGlassSurround compact={compact} backgroundColor={backgroundColor}>
          <div
            className={cn(
              compact ? 'px-5 py-6 sm:px-6 sm:py-7 md:px-7 md:py-8' : 'px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-11'
            )}
          >
            <div className="text-center">
              {subtitle?.trim() && (
                <div className={cn('flex justify-center', compact ? 'mb-3 sm:mb-4' : 'mb-4 sm:mb-5')}>
                  <EyebrowPillBadge text={subtitle.trim()} showDots />
                </div>
              )}

              <h2
                className={cn(
                  'font-black italic uppercase tracking-tighter text-[rgb(var(--text-primary))] leading-[0.94]',
                  compact
                    ? 'mb-4 text-[clamp(1.5rem,5.5vw,2.65rem)] sm:mb-4 md:text-[clamp(1.85rem,4.2vw,3rem)]'
                    : 'mb-5 text-[clamp(1.65rem,5.8vw,2.85rem)] sm:mb-6 md:text-[clamp(2rem,4.6vw,3.35rem)]'
                )}
              >
                {title}
              </h2>

              {description?.trim() && (
                <p
                  className={cn(
                    'mx-auto max-w-xl font-medium leading-relaxed text-[rgb(var(--text-secondary))] opacity-88 sm:max-w-2xl',
                    compact
                      ? 'mb-6 text-sm sm:text-[15px] md:mb-7'
                      : 'mb-7 text-[15px] sm:text-base md:mb-8 md:text-lg'
                  )}
                >
                  {description.trim()}
                </p>
              )}

              <div className={cn('flex flex-col items-stretch justify-center sm:flex-row sm:items-center sm:justify-center', compact ? 'gap-2.5' : 'gap-3')}>
                {primaryButtonText && primaryButtonUrl && (
                  <BrandVibrantButton
                    href={primaryButtonUrl}
                    icon={primaryButtonIcon === '📞' || primaryButtonIcon === '☎️' || primaryButtonIcon === '☎' ? Phone : undefined}
                    className="w-full sm:w-auto"
                  >
                    {primaryButtonText}
                  </BrandVibrantButton>
                )}

                {secondaryButtonText && secondaryButtonUrl && (
                  <a
                    href={secondaryButtonUrl}
                    className={cn(
                      'group relative overflow-hidden inline-flex h-12 md:h-14 min-w-[160px] md:min-w-[200px] px-6 md:px-8 gap-2.5 touch-manipulation items-center justify-center rounded-full border border-white/75 bg-white/[0.42] font-black uppercase tracking-widest text-xs md:text-sm text-[rgb(var(--text-primary))] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_14px_40px_-26px_rgba(15,23,42,0.16)] backdrop-blur-[18px] transition-all hover:scale-105 hover:-translate-y-0.5 hover:border-white hover:bg-white/60 hover:shadow-[0_18px_44px_-28px_rgba(15,23,42,0.22)] active:scale-95 active:translate-y-0 dark:border-white/[0.12] dark:bg-[rgb(var(--bg-secondary))/0.42] dark:text-white dark:shadow-[0_22px_50px_-32px_rgba(0,0,0,0.65)] dark:hover:border-white/20 dark:hover:bg-[rgb(var(--bg-secondary))/0.55] w-full sm:w-auto'
                    )}
                    style={{ WebkitBackdropFilter: 'blur(18px) saturate(1.35)' }}
                  >
                    <span className="relative z-10 flex items-center justify-center leading-none">
                      <span className="mr-2 inline-flex items-center justify-center" aria-hidden>{renderSecondaryIcon()}</span>
                      {secondaryButtonText}
                    </span>
                    <span className="absolute inset-0 z-0 w-[200%] -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[60%]" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </PremiumGlassSurround>

        <GlassRibbonDivider className={cn(compact ? 'mt-6 sm:mt-7' : 'mt-8 sm:mt-9')} />
        {footnoteLine && (
          <p
            className={cn(
              'text-center text-[9px] font-black uppercase tracking-[0.26em] text-[rgb(var(--text-secondary))]/65 dark:opacity-80',
              compact ? 'mt-3 sm:mt-3.5' : 'mt-3.5 sm:mt-4'
            )}
          >
            {footnoteLine}
          </p>
        )}
      </div>
    </section>
  )
}

export default CTASection
