import { normalizeLegacySection } from '@/lib/sanity/normalizeLegacySection'
import { isMainPageSection, type MainPageSection } from '@/types/mainPageSections'

export function parseMainPageSections(sections: unknown): MainPageSection[] {
  if (!Array.isArray(sections)) return []
  return sections
    .map(normalizeLegacySection)
    .filter((s): s is MainPageSection => s !== null && isMainPageSection(s))
}

/** True when Sanity `sections` has at least one supported block (builder mode). */
export function hasMainPageSections(data: { sections?: unknown } | null | undefined): boolean {
  return parseMainPageSections(data?.sections).length > 0
}

/** Same blocks as main page — usable on any marketing singleton. */
export const parseMarketingSections = parseMainPageSections
export const hasMarketingSections = hasMainPageSections
