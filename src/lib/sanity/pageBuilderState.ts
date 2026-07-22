import {
  hasMarketingSections,
  parseMarketingSections,
} from '@/lib/sanity/hasMainPageSections'
import type { MainPageSection } from '@/types/mainPageSections'

export type PageBuilderState = {
  usePageBuilder: boolean
  sections: MainPageSection[]
  builderBlockTypes: Set<MainPageSection['_type']>
  hasBlock: (type: MainPageSection['_type']) => boolean
}

export function getPageBuilderState(
  doc: { sections?: unknown } | null | undefined,
): PageBuilderState {
  const sections = parseMarketingSections(doc?.sections)
  const builderBlockTypes = new Set(sections.map((s) => s._type))
  return {
    usePageBuilder: hasMarketingSections(doc),
    sections,
    builderBlockTypes,
    hasBlock: (type) => builderBlockTypes.has(type),
  }
}
