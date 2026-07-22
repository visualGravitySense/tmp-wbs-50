import { forwardRef, type LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type LabelVariant = 'default' | 'glass' | 'compact' | 'muted' | 'checkbox'

const variantClasses: Record<LabelVariant, string> = {
  default:
    'mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-600 dark:text-[rgb(var(--text-secondary))]',
  glass:
    'mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-slate-600/90 dark:text-slate-200',
  compact:
    'mb-1.5 block text-[10px] font-black uppercase tracking-eyebrow text-blue-700 dark:text-blue-400',
  muted:
    'mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-[rgb(var(--text-secondary))]',
  checkbox: 'flex cursor-pointer items-start gap-3 text-sm leading-snug text-[rgb(var(--text-primary))]',
}

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  variant?: LabelVariant
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <label ref={ref} className={cn(variantClasses[variant], className)} {...props} />
  ),
)

Label.displayName = 'Label'
