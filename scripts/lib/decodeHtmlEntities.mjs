import { JSDOM } from 'jsdom'

const ENTITY_RE = /&(?:#\d+|#x[\da-f]+|[a-z]+);/i

/** Decode `&#8211;`, `&nbsp;`, `&hellip;`, etc. to Unicode characters. */
export function decodeHtmlEntities(input) {
  if (input == null || input === '') return ''
  const s = String(input)
  if (!ENTITY_RE.test(s)) return s
  const { document } = new JSDOM('<!DOCTYPE html><textarea></textarea>').window
  const ta = document.querySelector('textarea')
  ta.innerHTML = s
  return ta.value
}

export function stripHtml(html) {
  if (html == null) return ''
  const s = String(html).trim()
  if (!s) return ''
  try {
    const raw =
      new JSDOM(`<!DOCTYPE html><body>${s}</body>`).window.document.body.textContent ?? ''
    return decodeHtmlEntities(raw).replace(/\s+/g, ' ').trim()
  } catch {
    return decodeHtmlEntities(
      s
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
    )
  }
}

/** Studio excerpt field max is 200 chars — truncate after decode, never mid-entity. */
export function normalizeExcerpt(htmlOrText, maxLen = 200) {
  const text = htmlOrText?.includes('<') ? stripHtml(htmlOrText) : decodeHtmlEntities(htmlOrText)
  if (!text) return undefined
  if (text.length <= maxLen) return text
  const slice = text.slice(0, maxLen)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > maxLen * 0.55 ? slice.slice(0, lastSpace) : slice
  return `${cut.trimEnd()}…`
}

export function sanitizePortableTextSpans(blocks) {
  if (!Array.isArray(blocks)) return blocks
  return blocks.map((block) => {
    if (block?._type !== 'block' || !Array.isArray(block.children)) return block
    return {
      ...block,
      children: block.children.map((child) => {
        if (child?._type !== 'span' || typeof child.text !== 'string') return child
        return { ...child, text: decodeHtmlEntities(child.text) }
      }),
    }
  })
}
