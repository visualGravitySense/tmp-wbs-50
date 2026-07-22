export type OpstarAcronymGridBlock = {
  _type: 'opstarAcronymGridBlock'
  _key: string
  enabled?: boolean
}

export type OpstarOrbitBlock = {
  _type: 'opstarOrbitBlock'
  _key: string
  orbitBlock?: Record<string, unknown>
  orbitBlockRef?: unknown
}

export type OpstarComparisonBlock = {
  _type: 'opstarComparisonBlock'
  _key: string
  comparison?: Record<string, unknown>
}

export type OpstarKolmSammastBlock = {
  _type: 'opstarKolmSammastBlock'
  _key: string
  kolmSammast?: Record<string, unknown>
}

export type OpstarFrameworkBlock = {
  _type: 'opstarFrameworkBlock'
  _key: string
  framework?: Record<string, unknown>
}

export type OpstarEightComponentsBlock = {
  _type: 'opstarEightComponentsBlock'
  _key: string
  eightComponents?: Record<string, unknown>
}

export type OpstarLeanVsOpstarBlock = {
  _type: 'opstarLeanVsOpstarBlock'
  _key: string
  leanVsOpstar?: Record<string, unknown>
}

export type OpstarMeasuredResultsBlock = {
  _type: 'opstarMeasuredResultsBlock'
  _key: string
  meodetavadTulemused?: Record<string, unknown>
}

export type OpstarCasesBlock = {
  _type: 'opstarCasesBlock'
  _key: string
  cases?: Record<string, unknown>
}

export type OpstarKkkBlock = {
  _type: 'opstarKkkBlock'
  _key: string
  kkk?: Record<string, unknown>
}

export type OpstarCtaBlock = {
  _type: 'opstarCtaBlock'
  _key: string
  cta?: Record<string, unknown>
}

export type OpstarContentSectionsBlock = {
  _type: 'opstarContentSectionsBlock'
  _key: string
  contentSections?: Array<Record<string, unknown>>
}

export type OpstarSection =
  | OpstarAcronymGridBlock
  | OpstarOrbitBlock
  | OpstarComparisonBlock
  | OpstarKolmSammastBlock
  | OpstarFrameworkBlock
  | OpstarEightComponentsBlock
  | OpstarLeanVsOpstarBlock
  | OpstarMeasuredResultsBlock
  | OpstarCasesBlock
  | OpstarKkkBlock
  | OpstarCtaBlock
  | OpstarContentSectionsBlock

const OPSTAR_SECTION_TYPES = new Set<string>([
  'opstarKoImSammastBlock',
  'opstarAcronymGridBlock',
  'opstarOrbitBlock',
  'opstarComparisonBlock',
  'opstarKolmSammastBlock',
  'opstarFrameworkBlock',
  'opstarEightComponentsBlock',
  'opstarLeanVsOpstarBlock',
  'opstarMeasuredResultsBlock',
  'opstarCasesBlock',
  'opstarKkkBlock',
  'opstarCtaBlock',
  'opstarContentSectionsBlock',
])

export function isOpstarSection(value: unknown): value is OpstarSection {
  if (!value || typeof value !== 'object') return false
  const t = (value as { _type?: string })._type
  return typeof t === 'string' && OPSTAR_SECTION_TYPES.has(t)
}
