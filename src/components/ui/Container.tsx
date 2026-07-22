import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import {
  containerBase,
  containerPaddingClasses,
  containerSizeClasses,
  type ContainerPadding,
  type ContainerSize,
} from './section-container-styles'

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize
  padding?: ContainerPadding
  /** Stacks content above decorative section backgrounds. */
  elevated?: boolean
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = '6xl', padding = 'default', elevated = false, children, ...props }, ref) => (
    <div ref={ref}
      className={cn(
        containerBase,
        containerSizeClasses[size],
        containerPaddingClasses[padding],
        elevated && 'relative z-10',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)

Container.displayName = 'Container'