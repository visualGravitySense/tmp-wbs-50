/** Glass surface classes from globals.css — card, inner, pricing. */

export type GlassPanelVariant = 'card' | 'inner' | 'pricing' | 'emerald'

export const glassPanelVariantClasses: Record<GlassPanelVariant, string> = {
  card: 'glass-card',
  inner: 'inner-glass-box',
  pricing: 'glass-pricing-card',
  emerald: 'glass-emerald',
}
