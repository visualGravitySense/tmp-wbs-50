import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SpinnerSize = 'sm' | 'md' | 'lg'

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
}

export type SpinnerProps = {
  size?: SpinnerSize
  className?: string
  /** Accessible label when spinner is the only loading indicator. */
  label?: string
}

export function Spinner({ size = 'md', className, label = 'Laadimine' }: SpinnerProps) {
  return (
    <span className={cn('inline-flex shrink-0 items-center justify-center', className)} role="status">
      <Loader2
        className={cn('animate-spin text-[rgb(var(--color-primary))]', sizeClasses[size])}
        aria-hidden
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  )
}
