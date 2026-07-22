import { DEFAULT_OPSTAR_COMPARISON } from '@/lib/opstar/comparisonDefaults'

export type SanityComparisonPayload = {
  title?: string
  eyebrow?: string
  subtitle?: string
  comparisonItems?: Array<{ _key?: string; isNot?: string; is?: string }>
  backgroundColor?: string
  titleColor?: string
  isNotColor?: string
  isColor?: string
}

const PLACEHOLDER_TITLE_RE = /^mis on opstar\??$/i

function isPlaceholderRow(row?: { isNot?: string; is?: string } | null): boolean {
  const isNot = row?.isNot?.trim() ?? ''
  const is = row?.is?.trim() ?? ''
  if (!isNot && !is) return true
  if (isNot && is && isNot === is) return true
  if (PLACEHOLDER_TITLE_RE.test(isNot) || PLACEHOLDER_TITLE_RE.test(is)) return true
  return false
}

function withKeys(
  items: Array<{ isNot?: string; is?: string }>,
): Array<{ _key: string; isNot: string; is: string }> {
  return items.map((row, index) => ({
    _key: `cmp-${index}`,
    isNot: row.isNot ?? '',
    is: row.is ?? '',
  }))
}

export function pickOpstarComparisonSource(
  legacy?: SanityComparisonPayload | null,
  sections?: Array<{ _type?: string; comparison?: SanityComparisonPayload }> | null,
): SanityComparisonPayload {
  const fromLegacy =
    legacy?.comparisonItems?.filter((r) => !isPlaceholderRow(r)) ?? []

  if (fromLegacy.length > 0) {
    return {
      ...DEFAULT_OPSTAR_COMPARISON,
      ...legacy,
      comparisonItems: withKeys(
        fromLegacy.map((r) => ({ isNot: r.isNot ?? '', is: r.is ?? '' })),
      ),
    }
  }

  for (const section of sections ?? []) {
    if (section._type !== 'opstarComparisonBlock') continue
    const rows =
      section.comparison?.comparisonItems?.filter((r) => !isPlaceholderRow(r)) ??
      []
    if (rows.length > 0) {
      return {
        ...DEFAULT_OPSTAR_COMPARISON,
        ...section.comparison,
        comparisonItems: withKeys(
          rows.map((r) => ({ isNot: r.isNot ?? '', is: r.is ?? '' })),
        ),
      }
    }
  }

  return {
    ...DEFAULT_OPSTAR_COMPARISON,
    comparisonItems: withKeys(DEFAULT_OPSTAR_COMPARISON.comparisonItems),
  }
}

export function patchOpstarComparisonSections(
  sections: Array<Record<string, unknown>> | null | undefined,
  comparison: SanityComparisonPayload,
): Array<Record<string, unknown>> {
  const list = Array.isArray(sections) ? [...sections] : []
  let patched = false

  const next = list.map((section) => {
    if (section._type !== 'opstarComparisonBlock') return section
    patched = true
    return {
      ...section,
      comparison,
    }
  })

  if (!patched) {
    next.push({
      _type: 'opstarComparisonBlock',
      _key: 'restored-opstar-comparison',
      comparison,
    })
  }

  return next
}