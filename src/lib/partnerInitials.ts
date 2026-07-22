/** Two-letter (or shorter) initials from a partner / company display name. */
export function partnerInitials(name: string, maxChars = 2): string {
  const s = name.normalize('NFKC').replace(/\s+/g, ' ').trim()
  if (!s) return '?'

  const parts = s.split(/[\s\-/&,.]+/).filter((p) => p.length > 0)
  const firstLetter = (chunk: string) => {
    const m = chunk.match(/[\p{L}\p{N}]/gu)
    return m?.[0] ?? ''
  }

  if (parts.length >= 2) {
    const a = firstLetter(parts[0])
    const b = firstLetter(parts[1])
    if (a && b) return (a + b).slice(0, maxChars).toUpperCase()
  }

  const word = parts[0] ?? s
  const chars = word.match(/[\p{L}\p{N}]/gu) ?? []
  return chars.slice(0, maxChars).join('').toUpperCase() || '?'
}
