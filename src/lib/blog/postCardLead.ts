import type { BlogPostPreview } from '@/types/blog'

const MAX_LEN = 220

function truncatePlain(s: string, max = MAX_LEN): string {
  const t = s.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > 48 ? cut.slice(0, lastSpace) : cut
  return `${base.trimEnd()}…`
}

/** Plain text from first Portable Text blocks (and simple custom blocks). */
export function portableTextBlocksToPlain(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ''

  const parts: string[] = []

  for (const block of blocks as Array<Record<string, unknown>>) {
    if (!block || typeof block !== 'object') continue

    const type = block._type as string | undefined

    if (type === 'block' && Array.isArray(block.children)) {
      for (const child of block.children as Array<{ text?: string }>) {
        if (child?.text) parts.push(child.text)
      }
    } else if (type === 'calloutBlock' && typeof block.text === 'string') {
      parts.push(block.text)
    } else if (type === 'imageBlock' && typeof block.caption === 'string') {
      parts.push(block.caption)
    }
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

/** CMS excerpt, else beginning of article body — for listing cards */
export function postCardLeadText(post: Pick<BlogPostPreview, 'excerpt' | 'bodyLead'>): string | null {
  const manual = post.excerpt?.trim()
  if (manual) return truncatePlain(manual)

  const fromBody = portableTextBlocksToPlain(post.bodyLead)
  if (!fromBody) return null

  return truncatePlain(fromBody)
}
