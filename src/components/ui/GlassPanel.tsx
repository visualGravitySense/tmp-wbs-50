import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { glassPanelVariantClasses, type GlassPanelVariant } from './glass-panel-styles'

export type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  variant?: GlassPanelVariant
}

/** Frosted panel — maps to glass utility classes in globals.css (card, inner, pricing, emerald). */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'card', ...props }, ref) => (
    <div ref={ref} className={cn(glassPanelVariantClasses[variant], className)} {...props} />
  ),
)

GlassPanel.displayName = 'GlassPanel'
