import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type AlertVariant = 'error' | 'success' | 'info' | 'banner'

export type AlertProps = {
  variant?: AlertVariant
  children: ReactNode
  className?: string
  icon?: ReactNode
}

const variantClasses: Record<AlertVariant, string> = {
  error: 'text-sm font-medium text-red-600 dark:text-red-400',
  success:
    'rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] px-3.5 py-3 text-sm leading-snug text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-500/[0.08] dark:text-emerald-100',
  info: 'rounded-xl border border-blue-500/20 bg-blue-500/[0.06] px-3.5 py-3 text-sm leading-snug text-blue-900 dark:border-blue-400/25 dark:bg-blue-500/[0.08] dark:text-blue-100',
  banner:
    'flex items-start gap-3 rounded-2xl border border-blue-300/45 bg-[linear-gradient(105deg,rgba(29,97,255,0.16),rgba(56,189,248,0.12)_42%,rgba(255,255,255,0.82)_100%)] px-4 py-3.5 text-sm text-slate-800 shadow-[0_24px_56px_-32px_rgba(29,97,255,0.45)] backdrop-blur-xl ring-1 ring-inset ring-white/75 sm:items-center sm:gap-4 sm:px-5 sm:py-4 dark:border-blue-400/30 dark:bg-[linear-gradient(118deg,rgba(16,31,72,0.88),rgba(29,97,255,0.34)_45%,rgba(8,47,73,0.7)_100%)] dark:text-slate-100 dark:shadow-[0_24px_60px_-30px_rgba(6,12,30,0.78)] dark:ring-blue-200/15',
}

const bannerIconShell =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/18 text-emerald-700 ring-1 ring-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-300/35'

export function Alert({ variant = 'error', children, className, icon }: AlertProps) {
  if (variant === 'banner') {
    return (
      <div role="alert" className={cn(variantClasses.banner, className)}>
        {icon ? <span className={bannerIconShell}>{icon}</span> : null}
        <div className="min-w-0 flex-1 font-semibold leading-relaxed text-slate-700 dark:text-slate-100">
          {children}
        </div>
      </div>
    )
  }

  if (variant === 'error') {
    return (
      <p role="alert" className={cn(variantClasses.error, className)}>
        {children}
      </p>
    )
  }

  return (
    <div
      role={variant === 'success' ? 'status' : 'alert'}
      className={cn(variantClasses[variant], className)}
    >
      {children}
    </div>
  )
}
