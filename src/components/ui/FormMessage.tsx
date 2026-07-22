import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export type FormMessageVariant = 'hint' | 'error' | 'description'

const variantClasses: Record<FormMessageVariant, string> = {
  hint: 'text-[11px] leading-relaxed text-[rgb(var(--text-secondary))]',
  description: 'text-xs leading-relaxed text-[rgb(var(--text-secondary))]',
  error: 'text-sm font-medium text-red-600 dark:text-red-400',
}

export type FormMessageProps = HTMLAttributes<HTMLParagraphElement> & {
  variant?: FormMessageVariant
}

export function FormMessage({ variant = 'hint', className, children, ...props }: FormMessageProps) {
  return (
    <p
      role={variant === 'error' ? 'alert' : undefined}
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </p>
  )
}
