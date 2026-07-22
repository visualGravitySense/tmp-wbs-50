export const EDU_STANDARDS_SECTIONS = [
  { id: 'standard', label: 'Täiendkoolituse standard' },
  { id: 'oppekorraldus', label: 'Õppekorralduse alused' },
  { id: 'kvaliteet', label: 'Kvaliteedi tagamise alused' },
] as const

export type EduStandardsSectionId = (typeof EDU_STANDARDS_SECTIONS)[number]['id']

/** Sticky header (64px) + sub-nav row — used for scroll-margin and programmatic scroll. */
export const EDU_STANDARDS_SCROLL_OFFSET = 120

export function sectionIdFromHeading(text: string): EduStandardsSectionId | undefined {
  const t = text.toLowerCase()
  if (t.includes('õppekorraldus') || t.includes('oppekorraldus')) return 'oppekorraldus'
  if (t.includes('kvaliteet')) return 'kvaliteet'
  if (
    t.includes('standard') ||
    t.includes('õppekava') ||
    t.includes('info osalejatele') ||
    t.includes('töötukassa')
  ) {
    return 'standard'
  }
  return undefined
}
