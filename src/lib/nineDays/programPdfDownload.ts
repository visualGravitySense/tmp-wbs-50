/** Public PDF after email form (place file under `public/downloads/`). */
export const NINE_DAYS_PROGRAM_PDF_PATH =
  process.env.NEXT_PUBLIC_NINE_DAYS_PROGRAM_PDF ?? '/downloads/program-outline.pdf'

export const NINE_DAYS_PROGRAM_PDF_FILENAME = 'program-outline.pdf'

function startDownload(url: string): void {
  const a = document.createElement('a')
  a.href = url
  a.download = NINE_DAYS_PROGRAM_PDF_FILENAME
  a.rel = 'noopener noreferrer'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/** Käivitab allalaadimise; tagastab false kui faili serveris veel pole. */
export async function triggerProgramPdfDownload(): Promise<boolean> {
  if (typeof document === 'undefined') return false
  const url = NINE_DAYS_PROGRAM_PDF_PATH
  try {
    const head = await fetch(url, { method: 'HEAD' })
    if (!head.ok) return false
  } catch {
    return false
  }
  startDownload(url)
  return true
}
