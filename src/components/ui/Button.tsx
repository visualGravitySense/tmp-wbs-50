import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Spinner } from './Spinner'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--color-background))] disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary:
        'bg-[rgb(var(--color-primary))] text-[rgb(var(--color-primary-foreground))] shadow-[0_14px_36px_-18px_rgba(29,97,255,0.42)] hover:brightness-110 active:brightness-95 dark:shadow-[0_18px_44px_-14px_rgba(29,97,255,0.48)]',
      secondary:
        'bg-[rgb(var(--color-muted))] text-[rgb(var(--color-foreground))] hover:brightness-125 dark:hover:brightness-110',
      outline:
        'border border-[rgb(var(--border))] bg-transparent text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))]',
      ghost: 'text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--bg-secondary))]'
    }
    
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8 text-lg'
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Spinner size="sm" className="-ml-1 mr-2 text-current" label="" /> : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
