'use client'

/** Pausa pärast viimast muudatust enne eelvaate värskendamist (ms). */
const DEBOUNCE_MS = 2_500

/** Presentation iframe — pikem paus, et jõuaks mitu välja järjest valida. */
const DEBOUNCE_MS_IN_PREVIEW_IFRAME = 3_500

let timer: ReturnType<typeof setTimeout> | null = null
let resolveRefresh: ((value: 'refresh') => void) | null = null

function debounceMs(): number {
  if (typeof window !== 'undefined' && window.self !== window.top) {
    return DEBOUNCE_MS_IN_PREVIEW_IFRAME
  }
  return DEBOUNCE_MS
}

function flushPreviewRefresh() {
  timer = null
  const resolve = resolveRefresh
  resolveRefresh = null
  resolve?.('refresh')
}

function scheduleFlush() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(flushPreviewRefresh, debounceMs())
}

/**
 * Koondab kiired live-sündmused üheks router.refresh-iks.
 * Iga uus sündmus lükkab taimeri edasi — vorm Studio’s ei kao fookus enne pausi.
 */
export async function previewRefreshSyncTags(
  _tags: string[],
): Promise<'refresh' | void> {
  scheduleFlush()

  if (resolveRefresh) {
    return
  }

  return new Promise<'refresh'>((resolve) => {
    resolveRefresh = resolve
  })
}
