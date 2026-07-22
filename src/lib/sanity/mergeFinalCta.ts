import type { FinalCTAData } from '@/components/FinalCTA'

const KEYS: (keyof FinalCTAData)[] = [
  'title',
  'subtitle',
  'nextGroupInfo',
  'spotsInfo',
  'supportInfo',
  'supportPrefix',
  'primaryButtonText',
  'primaryButtonLink',
  'secondaryButtonText',
  'secondaryButtonLink',
  'footerText',
]

function pickNonEmptyOverride(override: FinalCTAData | undefined | null): Partial<FinalCTAData> {
  if (!override) return {}
  const out: Partial<FinalCTAData> = {}
  for (const k of KEYS) {
    const v = override[k]
    if (typeof v === 'string' && v.trim() !== '') {
      out[k] = v
    }
  }
  return out
}

/** Avalehe `finalCTA` + Koolitus lehe valikuline ülekirjutus (ainult mitte-tühjad väljad). */
export function mergeFinalCtaData(
  home: FinalCTAData | undefined | null,
  koolitusOverride: FinalCTAData | undefined | null
): FinalCTAData | undefined {
  const patch = pickNonEmptyOverride(koolitusOverride)
  const merged: FinalCTAData = { ...(home || {}), ...patch }
  const hasAny = KEYS.some((k) => {
    const v = merged[k]
    return typeof v === 'string' && v.trim() !== ''
  })
  return hasAny ? merged : undefined
}
