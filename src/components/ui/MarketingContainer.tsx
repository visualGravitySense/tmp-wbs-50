import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Container, type ContainerProps } from './Container'
import { MARKETING_CONTAINER_SIZE, marketingContainerClass } from './marketing-layout-styles'

export type MarketingContainerProps = Omit<ContainerProps, 'size' | 'padding'>

export const MarketingContainer = forwardRef<HTMLDivElement, MarketingContainerProps>(
  ({ className, children, ...props }, ref) => (
    <Container
      ref={ref}
      size={MARKETING_CONTAINER_SIZE}
      padding="none"
      className={cn(marketingContainerClass, className)}
      {...props}
    >
      {children}
    </Container>
  ),
)

MarketingContainer.displayName = 'MarketingContainer'
