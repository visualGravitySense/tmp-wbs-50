/** Singleton home page document id (see `sanity/schemas/structure.ts`). */
export const MAIN_PAGE_DOCUMENT_ID = 'mainPage'

/** GROQ filter for the published home page singleton. */
export const MAIN_PAGE_FILTER = `_type == "mainPage" && _id == "${MAIN_PAGE_DOCUMENT_ID}"`
