/**
 * Smooth in-page scrolling that works with sticky headers and deferred sections.
 * Retries briefly so hash targets can mount after DeferredViewport reveals them.
 */

const DEFAULT_HEADER_OFFSET_PX = 80
const RETRY_DELAYS_MS = [0, 50, 120, 250, 450, 800, 1400, 2200] as const

function normalizeId(idOrHash: string): string {
  return idOrHash.replace(/^#/, '').trim()
}

function findTarget(ids: string[]): HTMLElement | null {
  for (const id of ids) {
    if (!id) continue
    const el = document.getElementById(id)
    if (el) return el
  }
  return null
}

function scrollElementIntoView(el: HTMLElement, offsetPx: number): void {
  const top = el.getBoundingClientRect().top + window.scrollY - offsetPx
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

function setHash(id: string): boolean {
  const next = `#${id}`
  if (window.location.hash === next) {
    // Already on this hash — do not re-dispatch (avoids listener loops).
    return false
  }
  try {
    history.pushState(null, '', next)
  } catch {
    window.location.hash = id
  }
  window.dispatchEvent(new Event('hashchange'))
  return true
}

export type SmoothScrollToIdOptions = {
  /** Sticky header / nav clearance in px. Default 80. */
  offset?: number
  /** Alternate element ids to try if the primary is not in the DOM yet. */
  aliases?: string[]
  /** Prefer this id in the URL hash (defaults to the first successful id, else primary). */
  hashId?: string
}

/**
 * Smooth-scroll to an element by id. Updates the URL hash and retries while
 * deferred sections mount (IntersectionObserver / hash-triggered).
 */
export function smoothScrollToId(
  idOrHash: string,
  options: SmoothScrollToIdOptions = {},
): void {
  if (typeof window === 'undefined') return

  const primary = normalizeId(idOrHash)
  if (!primary) return

  const offset = options.offset ?? DEFAULT_HEADER_OFFSET_PX
  const candidates = [primary, ...(options.aliases ?? []).map(normalizeId)].filter(
    (id, index, arr) => id.length > 0 && arr.indexOf(id) === index,
  )
  const hashId = normalizeId(options.hashId ?? primary)

  // Notify deferred mounts when the hash actually changes.
  setHash(hashId)

  let done = false
  const attempt = () => {
    if (done) return true
    const el = findTarget(candidates)
    if (!el) return false
    scrollElementIntoView(el, offset)
    done = true
    return true
  }

  if (attempt()) return

  const timers = RETRY_DELAYS_MS.map((ms) =>
    window.setTimeout(() => {
      attempt()
    }, ms),
  )

  // Safety: clear timers after last retry window.
  window.setTimeout(() => {
    timers.forEach((t) => window.clearTimeout(t))
  }, RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1] + 50)
}

/**
 * Click handler for same-page hash anchors. Respects modified clicks (new tab).
 */
export function handleInPageAnchorClick(
  event: { preventDefault: () => void; metaKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean; altKey?: boolean },
  idOrHash: string,
  options?: SmoothScrollToIdOptions,
): void {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  smoothScrollToId(idOrHash, options)
}
