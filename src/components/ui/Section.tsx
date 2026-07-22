import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { sectionVariantClasses, type SectionVariant } from './section-container-styles'

export type SectionProps = HTMLAttributes<HTMLElement> & {
  variant?: SectionVariant
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', children, ...props }, ref) => (
    <section ref={ref} className={cn(sectionVariantClasses[variant], className)} {...props}>
      {children}
    </section>
  ),
)

Section.displayName = 'Section'
