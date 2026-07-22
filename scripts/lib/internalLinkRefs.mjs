/** Map site paths to singleton page document ids (keep in sync with src/lib/sanity/internalLinkRefs.ts). */
export const INTERNAL_PATH_TO_PAGE_ID = {
  '/': 'mainPage',
  '/kontakt': 'kontaktPage',
  '/koolitus': 'koolitusPage',
  '/andres-kase': 'aboutPage',
  '/opstar-profit': 'opstarProfit',
  '/galerii': 'galleryPage',
  '/blog': 'blogPage',
  '/testimonials': 'testimonialsPage',
  '/privacy-policy': 'privacyPolicyPage',
  '/juhendatud-loputood': 'juhendatudLoputoodPage',
}

export function internalPathToReference(path) {
  const normalized = path.trim().replace(/\/+$/, '') || '/'
  const pageId = INTERNAL_PATH_TO_PAGE_ID[normalized]
  if (!pageId) return undefined
  return { _type: 'reference', _ref: pageId }
}

export function normalizeSanityLink(link) {
  if (!link || typeof link !== 'object') return link
  if (link.linkType !== 'internal' || link.reference?._ref || !link.url?.trim()) return link
  const reference = internalPathToReference(link.url)
  if (!reference) return link
  const { url: _drop, ...rest } = link
  return { ...rest, _type: rest._type ?? 'link', linkType: 'internal', reference }
}

export function buildSanityLink(url) {
  const trimmed = String(url ?? '').trim()
  if (!trimmed) return undefined
  if (/^https?:\/\//i.test(trimmed)) {
    return { _type: 'link', linkType: 'external', url: trimmed }
  }
  const reference = internalPathToReference(trimmed)
  if (reference) {
    return { _type: 'link', linkType: 'internal', reference }
  }
  return { _type: 'link', linkType: 'internal', url: trimmed }
}