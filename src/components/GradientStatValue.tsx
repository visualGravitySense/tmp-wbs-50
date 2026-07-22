import { cn } from '@/lib/utils'

/** Split "25+", "38%", "+31%" into number + trailing suffix for gradient display. */
export function splitStatDisplayValue(value: string): { number: string; suffix?: string } {
  const trimmed = value.trim()
  const match = trimmed.match(/^(.+?)([+％%]+)$/)
  if (match) {
    return { number: match[1], suffix: match[2] }
  }
  return { number: trimmed }
}

type GradientStatValueProps = {
  value: string
  className?: string
  numberClassName?: string
  suffixClassName?: string
}

/** Homepage-style blue gradient digits (`.candy-stat` in globals.css). */
export function GradientStatValue({
  value,
  className,
  numberClassName,
  suffixClassName,
}: GradientStatValueProps) {
  const { number, suffix } = splitStatDisplayValue(value)

  return (
    <div
      className={cn(
        'candy-stat-shell mx-auto w-fit justify-center',
        suffix && 'candy-stat-shell--has-suffix',
        className,
      )}
      aria-label={value}
    >
      <span
        className={cn(
          'candy-stat tabular-nums text-3xl font-black tracking-tight sm:text-4xl',
          numberClassName,
        )}
      >
        {number}
      </span>
      {suffix ? (
        <span
          className={cn('stat-suffix text-lg font-bold sm:text-xl', suffixClassName)}
          aria-hidden
        >
          {suffix}
        </span>
      ) : null}
    </div>
  )
}
