export type OpstarComparisonItem = {
  isNot: string
  is: string
}

export type OpstarComparisonData = {
  title: string
  eyebrow?: string
  subtitle?: string
  comparisonItems: OpstarComparisonItem[]
  backgroundColor?: string
  titleColor?: string
  isNotColor?: string
  isColor?: string
}

/** Default comparison copy (Mis on Product? võrdlus). */
export const DEFAULT_OPSTAR_COMPARISON: OpstarComparisonData = {
  title: 'Mis on Product Name?',
  subtitle: 'Lihtne seletus — ilma žargoonita. Mis see on ja mis see ei ole.',
  comparisonItems: [
    {
      isNot: 'Mitte tavaline LEAN raamatust kopeeritud',
      is: 'Eesti tootmise jaoks kohandatud meetodid',
    },
    {
      isNot: 'Mitte teooria mis jääb klassiruumi',
      is: '25 aasta välitestitud praktika 60+ ettevõttes',
    },
    {
      isNot: 'Mitte ühesuurune lahendus kõigile',
      is: 'Rakendatav esmaspäeval — kohe peale koolitust',
    },
    {
      isNot: 'Mitte veel üks sertifikaadiprogramm',
      is: '8-komponentne süsteem mis katab kõik juhtimistasemed',
    },
    {
      isNot: 'Mitte konsultatsioon kus teised teevad sinu eest',
      is: 'Sinu meeskonnaga koos ehitatud lahendus',
    },
  ],
  backgroundColor: 'bg-gray-50',
  titleColor: 'text-gray-900',
  isNotColor: 'text-red-600',
  isColor: 'text-green-600',
}

const PLACEHOLDER_TITLE_RE = /^mis on opstar\??$/i

function isPlaceholderRow(row?: OpstarComparisonItem | null): boolean {
  const isNot = row?.isNot?.trim() ?? ''
  const is = row?.is?.trim() ?? ''
  if (!isNot && !is) return true
  // Studio stub: one row with identical text in both columns
  if (isNot && is && isNot === is) return true
  if (PLACEHOLDER_TITLE_RE.test(isNot) || PLACEHOLDER_TITLE_RE.test(is)) return true
  return false
}

function isPlaceholderTitle(title?: string | null): boolean {
  return PLACEHOLDER_TITLE_RE.test(title?.trim() ?? '')
}

function validItems(items?: OpstarComparisonItem[] | null): OpstarComparisonItem[] {
  return (items ?? []).filter((row) => !isPlaceholderRow(row)) as OpstarComparisonItem[]
}

/** Accepts partial CMS payloads where row fields may be loosely typed. */
export function hasOpstarComparisonContent(
  data?: Partial<OpstarComparisonData> | { comparisonItems?: unknown } | null,
): boolean {
  const items = data?.comparisonItems
  if (!Array.isArray(items)) return false
  return validItems(items as OpstarComparisonItem[]).length > 0
}

/** Prefer CMS rows; fall back to production defaults — never render an empty grid. */
export function resolveOpstarComparisonData(
  data?: Partial<OpstarComparisonData> | null,
): OpstarComparisonData {
  const items = validItems(data?.comparisonItems)
  const fallback = DEFAULT_OPSTAR_COMPARISON

  const title = data?.title?.trim()
  const subtitle = data?.subtitle?.trim()
  const eyebrow = data?.eyebrow?.trim()

  return {
    title: title && !isPlaceholderTitle(title) ? title : fallback.title,
    eyebrow: eyebrow && !isPlaceholderTitle(eyebrow) ? eyebrow : undefined,
    subtitle:
      subtitle && !isPlaceholderTitle(subtitle) ? subtitle : fallback.subtitle,
    comparisonItems: items.length > 0 ? items : fallback.comparisonItems,
    backgroundColor: data?.backgroundColor || fallback.backgroundColor,
    titleColor: data?.titleColor || fallback.titleColor,
    isNotColor: data?.isNotColor || fallback.isNotColor,
    isColor: data?.isColor || fallback.isColor,
  }
}

/** Merge page-builder block payload over legacy document field (section wins when populated). */
export function mergeOpstarComparisonSources(
  sectionComparison?: Partial<OpstarComparisonData> | null,
  legacyComparison?: Partial<OpstarComparisonData> | null,
): OpstarComparisonData {
  const sectionItems = validItems(sectionComparison?.comparisonItems)
  const legacyItems = validItems(legacyComparison?.comparisonItems)

  const merged: Partial<OpstarComparisonData> = {
    ...legacyComparison,
    ...sectionComparison,
    comparisonItems:
      sectionItems.length > 0 ? sectionItems : legacyItems,
    title:
      sectionComparison?.title?.trim() ||
      legacyComparison?.title?.trim() ||
      undefined,
    subtitle:
      sectionComparison?.subtitle?.trim() ||
      legacyComparison?.subtitle?.trim() ||
      undefined,
    eyebrow:
      sectionComparison?.eyebrow?.trim() ||
      legacyComparison?.eyebrow?.trim() ||
      undefined,
  }

  return resolveOpstarComparisonData(merged)
}