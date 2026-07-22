/** Avalik PDF peale e-posti vormi (pane fail `public/downloads/` alla). */
export const NINE_DAYS_PROGRAM_PDF_PATH =
  process.env.NEXT_PUBLIC_NINE_DAYS_PROGRAM_PDF ?? '/downloads/9-paeva-programm.pdf'

export const NINE_DAYS_PROGRAM_PDF_FILENAME = '9-paeva-programm-andres-kase.pdf'

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
