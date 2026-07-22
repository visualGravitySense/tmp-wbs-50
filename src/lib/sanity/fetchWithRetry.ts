
const DEFAULT_RETRIES = 2
const DEFAULT_DELAY_MS = 500

function isRetryableFetchError(error: unknown): boolean {
  if (!(error instanceof Error)) return false

  const message = error.message.toLowerCase()
  if (
    message.includes('fetch failed') ||
    message.includes('network error') ||
    message.includes('econnreset') ||
    message.includes('etimedout') ||
    message.includes('enotfound') ||
    message.includes('socket hang up')
  ) {
    return true
  }

  const cause = error.cause
  if (cause instanceof Error) {
    const code = (cause as NodeJS.ErrnoException).code
    if (
      code === 'ECONNRESET' ||
      code === 'ETIMEDOUT' ||
      code === 'ENOTFOUND' ||
      code === 'UND_ERR_CONNECT_TIMEOUT'
    ) {
      return true
    }
  }

  return false
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Retries transient Sanity / fetch network errors (common in local dev). */
export async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  options?: { retries?: number; delayMs?: number; label?: string },
): Promise<T> {
  const retries = options?.retries ?? DEFAULT_RETRIES
  const delayMs = options?.delayMs ?? DEFAULT_DELAY_MS
  const label = options?.label ?? 'sanity'

  let lastError: unknown

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (attempt >= retries || !isRetryableFetchError(error)) {
        throw error
      }

      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[${label}] fetch attempt ${attempt + 1} failed, retrying…`,
          error instanceof Error ? error.message : error,
        )
      }

      await delay(delayMs * (attempt + 1))
    }
  }

  throw lastError
}
