export type KontaktHeroBlock = { _type: 'kontaktHeroBlock'; _key: string; [key: string]: any }
export type KontaktQuickBlock = { _type: 'kontaktQuickBlock'; _key: string; [key: string]: any }
export type KontaktFormBlock = { _type: 'kontaktFormBlock'; _key: string; [key: string]: any }
export type KontaktAndresBlock = { _type: 'kontaktAndresBlock'; _key: string; [key: string]: any }
export type KontaktOpstarBlock = { _type: 'kontaktOpstarBlock'; _key: string; [key: string]: any }
export type KontaktServicesBlock = { _type: 'kontaktServicesBlock'; _key: string; [key: string]: any }
export type KontaktLegalNoteBlock = { _type: 'kontaktLegalNoteBlock'; _key: string; [key: string]: any }

export type KontaktSection =
  | KontaktHeroBlock
  | KontaktQuickBlock
  | KontaktFormBlock
  | KontaktAndresBlock
  | KontaktOpstarBlock
  | KontaktServicesBlock
  | KontaktLegalNoteBlock
  | { _type: 'koolitusLocationBlock'; _key: string; [key: string]: any }

const KONTAKT_SECTION_TYPES = new Set<string>([
  'kontaktHeroBlock',
  'kontaktQuickBlock',
  'kontaktFormBlock',
  'kontaktAndresBlock',
  'kontaktOpstarBlock',
  'kontaktServicesBlock',
  'kontaktLegalNoteBlock',
  'koolitusLocationBlock',
])

export function isKontaktSection(value: unknown): value is KontaktSection {
  if (!value || typeof value !== 'object') return false
  const t = (value as { _type?: string })._type
  return typeof t === 'string' && KONTAKT_SECTION_TYPES.has(t)
}
