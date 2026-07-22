const ESTONIAN_MONTHS: Record<string, number> = {
  jaanuar: 0,
  veebruar: 1,
  märts: 2,
  aprill: 3,
  mai: 4,
  juuni: 5,
  juuli: 6,
  august: 7,
  september: 8,
  oktoober: 9,
  november: 10,
  detsember: 11,
}

export function parseEstonianDateRange(input?: string): { start: Date; end: Date } | null {
  if (!input) return null
  const normalized = input
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/–/g, '-')
    .trim()

  const m = normalized.match(
    /(\d{1,2})\.\s*([a-zõäöü]+)\s*(\d{4})\s*(?:kuni|-)\s*(\d{1,2})\.\s*([a-zõäöü]+)\s*(\d{4})/i,
  )
  if (!m) return null

  const d1 = Number(m[1])
  const mon1 = ESTONIAN_MONTHS[m[2]]
  const y1 = Number(m[3])
  const d2 = Number(m[4])
  const mon2 = ESTONIAN_MONTHS[m[5]]
  const y2 = Number(m[6])
  if ([d1, mon1, y1, d2, mon2, y2].some((v) => Number.isNaN(v) || v === undefined)) return null

  const start = new Date(Date.UTC(y1, mon1, d1))
  const end = new Date(Date.UTC(y2, mon2, d2))
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null
  return { start, end }
}

function isoWeekMetadata(utc: Date): { week: number; weekYear: number } {
  const d = new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()))
  const dayNr = (d.getUTCDay() + 6) % 7
  const thursday = new Date(d)
  thursday.setUTCDate(d.getUTCDate() - dayNr + 3)
  const weekYear = thursday.getUTCFullYear()
  const jan4 = new Date(Date.UTC(weekYear, 0, 4))
  const jan4Day = (jan4.getUTCDay() + 6) % 7
  const week1Mon = new Date(jan4)
  week1Mon.setUTCDate(jan4.getUTCDate() - jan4Day)
  const week = 1 + Math.round((thursday.getTime() - week1Mon.getTime()) / (7 * 86400000))
  return { week, weekYear }
}

export function weekLabelFromParsedRange(range: { start: Date; end: Date } | null): string | null {
  if (!range) return null
  const a = isoWeekMetadata(range.start)
  const b = isoWeekMetadata(range.end)
  if (a.weekYear === b.weekYear && a.week === b.week) {
    return `Nädal ${a.week} (${a.weekYear})`
  }
  if (a.weekYear === b.weekYear) {
    return `Nädalad ${a.week}–${b.week} (${a.weekYear})`
  }
  return `Nädalad ${a.week} (${a.weekYear}) – ${b.week} (${b.weekYear})`
}

export function weekLabelFromEstonianDateString(dates?: string): string | null {
  return weekLabelFromParsedRange(parseEstonianDateRange(dates))
}

export function toYyyyMmDdUTC(date: Date) {
  const y = date.getUTCFullYear().toString()
  const m = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const d = date.getUTCDate().toString().padStart(2, '0')
  return `${y}${m}${d}`
}

export function addDaysUTC(date: Date, days: number) {
  const next = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  next.setUTCDate(next.getUTCDate() + days)
  return next
}
