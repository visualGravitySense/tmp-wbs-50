import React from 'react'
import { cn } from '@/lib/utils'

const pillShellBase =
  'inline-flex w-fit max-w-[min(100%,20rem)] flex-nowrap items-center justify-center gap-3 rounded-full px-5 py-1 sm:max-w-[min(100%,24rem)] sm:py-1.5'

const pillShellDefault = cn(
  pillShellBase,
  'border border-blue-200/90 bg-blue-50/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.95),0_1px_2px_rgba(15,23,42,0.06)] backdrop-blur-md dark:border-sky-500/20 dark:bg-slate-950/60 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]',
)

const pillShellOnDark = cn(
  pillShellBase,
  'border border-white/55 bg-white/10 shadow-[0_6px_20px_-10px_rgba(255,255,255,0.55)] backdrop-blur-md',
)

const pillShellSky = cn(
  pillShellBase,
  'border border-slate-800 bg-slate-950/60 shadow-sm backdrop-blur-md dark:border-sky-500/20',
)

const pillShellGreen = cn(
  pillShellBase,
  'border border-emerald-300/40 bg-emerald-400/15 shadow-sm backdrop-blur-md dark:border-emerald-500/20',
)

function PulsingDot({ tone = 'default' }: { tone?: 'default' | 'onDark' | 'sky' | 'green' }) {
  const isSky = tone === 'sky'
  const onDark = tone === 'onDark'

  return (
    <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
      <span
        className={cn(
          'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
          onDark && 'bg-white/80',
          isSky && 'bg-sky-400/70',
          tone === 'green' && 'bg-emerald-400',
          tone === 'default' && 'bg-blue-500/70 dark:bg-sky-400/70',
        )}
      />
      <span
        className={cn(
          'relative inline-flex h-2 w-2 rounded-full',
          onDark && 'bg-white',
          isSky && 'bg-sky-400',
          tone === 'green' && 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
          tone === 'default' && 'bg-blue-600 dark:bg-sky-400',
        )}
      />
    </span>
  )
}

export type SectionBadgeProps = {
  children: React.ReactNode
  showDots?: boolean
  className?: string
  centered?: boolean
  /** Document-flow hero badge — no absolute/relative wrapper positioning */
  flow?: boolean
  wrapperClassName?: string
  tone?: 'default' | 'onDark' | 'sky' | 'green'
}

const heroFlowWrapperClass =
  'mt-2 mb-6 inline-flex items-center justify-center md:justify-start'

export function SectionBadge({
  children,
  showDots = true,
  className,
  centered = false,
  flow = false,
  wrapperClassName,
  tone = 'default',
}: SectionBadgeProps) {
  const isSky = tone === 'sky'
  const onDark = tone === 'onDark'

  const pill = (
    <div
      className={cn(
        'eyebrow-pill-badge',
        tone === 'default' && pillShellDefault,
        tone === 'onDark' && pillShellOnDark,
        tone === 'sky' && pillShellSky,
        tone === 'green' && pillShellGreen,
        className,
      )}
    >
      {showDots ? (
        <span className="flex shrink-0 items-center self-center" aria-hidden>
          <PulsingDot tone={tone} />
        </span>
      ) : null}
      <span
        className={cn(
          'eyebrow-pill-badge-text tracking-eyebrow min-w-0 flex-1 basis-0 whitespace-normal break-words text-balance text-center leading-snug uppercase font-bold text-[10px] sm:text-xs text-blue-800 dark:text-sky-400',
          onDark && '!text-white',
          isSky && '!text-sky-400',
          tone === 'green' && '!text-emerald-700 dark:!text-emerald-400',
        )}
      >
        {children}
      </span>
      {showDots ? (
        <span className="flex shrink-0 items-center self-center" aria-hidden>
          <PulsingDot tone={tone} />
        </span>
      ) : null}
    </div>
  )

  if (flow) {
    return <div className={cn(heroFlowWrapperClass, wrapperClassName)}>{pill}</div>
  }

  if (!centered) {
    return pill
  }

  return (
    <div className={cn('mb-6 flex justify-center', wrapperClassName)}>{pill}</div>
  )
}

/** Strip decorative bullet glyphs mistakenly embedded in CMS eyebrow copy. */
export function sanitizeEyebrowText(text: string): string {
  return text
    .replace(/^\s*[●•·]\s*/u, '')
    .replace(/\s*[●•·]\s*$/u, '')
    .trim()
}