/** Map site paths to singleton page document ids for Sanity `link.reference`. */
export const INTERNAL_PATH_TO_PAGE_ID: Record<string, string> = {
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

export function internalPathToReference(path: string) {
  const normalized = path.trim().replace(/\/+$/, '') || '/'
  const pageId = INTERNAL_PATH_TO_PAGE_ID[normalized]
  if (!pageId) return undefined
  return { _type: 'reference' as const, _ref: pageId }
}

export function normalizeSanityLink(link: unknown) {
  if (!link || typeof link !== 'object') return link
  const l = link as {
    _type?: string
    linkType?: string
    url?: string
    reference?: { _type?: string; _ref?: string }
  }
  if (l.linkType !== 'internal' || l.reference?._ref || !l.url?.trim()) return link
  const reference = internalPathToReference(l.url)
  if (!reference) return link
  const { url: _drop, ...rest } = l
  return { ...rest, _type: rest._type ?? 'link', linkType: 'internal' as const, reference }
}

export function buildSanityLink(url: string) {
  const trimmed = url.trim()
  if (!trimmed) return undefined
  if (/^https?:\/\//i.test(trimmed)) {
    return { _type: 'link' as const, linkType: 'external' as const, url: trimmed }
  }
  const reference = internalPathToReference(trimmed)
  if (reference) {
    return { _type: 'link' as const, linkType: 'internal' as const, reference }
  }
  return { _type: 'link' as const, linkType: 'internal' as const, url: trimmed }
}