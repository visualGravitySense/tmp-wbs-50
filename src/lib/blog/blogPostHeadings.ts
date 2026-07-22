import type { PortableTextBlock } from '@/types/blog'

export type BlogTocItem = {
  id: string
  text: string
  depth: 2 | 3
  /** Sanity block _key for Portable Text */
  key?: string
}

/**
 * Plain text from a portable text block's span children.
 */
function blockChildrenToPlainText(block: { children?: Array<{ text?: string }> }): string {
  if (!block.children?.length) return ''
  return block.children.map((c) => c.text ?? '').join('')
}

/**
 * URL-safe slug for heading anchors (ASCII).
 */
export function slugifyHeading(input: string): string {
  const s = input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return s || 'section'
}

/**
 * Build stable heading ids (handles duplicates) and TOC entries from post body.
 */
export function extractBlogTocAndHeadingIds(body: PortableTextBlock[] | undefined): {
  toc: BlogTocItem[]
  headingIdByKey: Record<string, string>
} {
  const toc: BlogTocItem[] = []
  const headingIdByKey: Record<string, string> = {}
  const usedIds = new Set<string>()

  if (!Array.isArray(body)) {
    return { toc, headingIdByKey }
  }

  for (const block of body) {
    if (!block || block._type !== 'block' || !('style' in block)) continue
    const b = block as {
      _key?: string
      style?: string
      children?: Array<{ text?: string }>
    }
    const style = b.style
    if (style !== 'h2' && style !== 'h3') continue

    const text = blockChildrenToPlainText(b)
    let id = slugifyHeading(text)
    let n = 2
    while (usedIds.has(id)) {
      id = `${slugifyHeading(text)}-${n}`
      n += 1
    }
    usedIds.add(id)

    const depth = style === 'h2' ? 2 : 3
    toc.push({ id, text, depth, key: b._key })
    if (b._key) {
      headingIdByKey[b._key] = id
    }
  }

  return { toc, headingIdByKey }
}
