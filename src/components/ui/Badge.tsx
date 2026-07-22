import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'
export type BadgeColor = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray' | 'white'
export type BadgeSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'border-transparent bg-blue-600 text-white',
  secondary: 'border-transparent bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
  destructive: 'border-transparent bg-red-600 text-white',
  outline: 'border-gray-300 text-gray-950 dark:border-gray-600 dark:text-gray-100',
}

const colorClasses: Record<BadgeColor, string> = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-800/50',
  green: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950/50 dark:text-green-200 dark:border-green-800/50',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/50 dark:text-yellow-200 dark:border-yellow-800/50',
  red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-800/50',
  purple: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-200 dark:border-purple-800/50',
  gray: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-200 dark:border-gray-600/50',
  white: 'bg-white text-gray-800 border-gray-300 dark:bg-white/10 dark:text-gray-100 dark:border-white/20',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
}

const baseStyles =
  'inline-flex items-center rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  /** Legacy CMS badges (andres-kase): renders label text with color/size presets. */
  text?: string
  color?: BadgeColor
  size?: BadgeSize
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', text, color = 'blue', size = 'md', children, ...props }, ref) => {
    if (text != null) {
      return (
        <span
          ref={ref}
          className={cn(baseStyles, colorClasses[color], sizeClasses[size], className)}
          {...props}
        >
          {text}
        </span>
      )
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, 'px-2.5 py-0.5 text-xs font-semibold', variantClasses[variant], className)}
        {...props}
      >
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'
