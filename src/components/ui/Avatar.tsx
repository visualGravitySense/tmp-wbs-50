import { forwardRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getInitials } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
  name?: string
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', name, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base'
    }

    const imagePx = { sm: 32, md: 40, lg: 48 }[size]

    if (src) {
      return (
        <div
          ref={ref}
          className={cn(
            'relative inline-flex shrink-0 overflow-hidden rounded-full',
            sizes[size],
            className
          )}
          {...props}
        >
          <Image
            className="aspect-square h-full w-full object-cover"
            src={src}
            alt={alt || ''}
            width={imagePx}
            height={imagePx}
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-gray-900',
          sizes[size],
          className
        )}
        {...props}
      >
        {name ? getInitials(name) : (
          <svg className="h-1/2 w-1/2 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }
