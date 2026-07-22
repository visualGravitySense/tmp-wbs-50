/** Published singleton page document ids (see `sanity/schemas/structure.ts`). */
export const SINGLETON_PAGE_IDS = {
  mainPage: 'mainPage',
  aboutPage: 'aboutPage',
  koolitusPage: 'koolitusPage',
  opstarProfit: 'opstarProfit',
  kontaktPage: 'kontaktPage',
  blogPage: 'blogPage',
  galleryPage: 'galleryPage',
  privacyPolicyPage: 'privacyPolicyPage',
  eduStandardsPage: 'eduStandardsPage',
  juhendatudLoputoodPage: 'juhendatudLoputoodPage',
  testimonialsPage: 'testimonialsPage',
  kliendidPage: 'kliendidPage',
} as const

export type SingletonPageType = keyof typeof SINGLETON_PAGE_IDS

/** GROQ filter for a published singleton page (excludes duplicate/orphan docs of same _type). */
export function singletonPageFilter(pageType: SingletonPageType): string {
  const id = SINGLETON_PAGE_IDS[pageType]
  return `_type == "${pageType}" && _id == "${id}"`
}