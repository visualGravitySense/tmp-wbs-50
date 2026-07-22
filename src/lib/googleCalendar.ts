const DEFAULT_TIMEZONE = 'Europe/Tallinn'
const DEFAULT_LOCATION = 'Grand Hotel Viljandi, Tartu 11 / Lossi 29, 71004 Viljandi'

/** Parse labels like "Neljapäev, 22.10.2026" → local Date (midnight). */
export function parseTrainingModuleDate(dateLabel?: string): Date | null {
  if (!dateLabel) return null
  const match = dateLabel.match(/(\d{2})\.(\d{2})\.(\d{4})/)
  if (!match) return null
  const [, dd, mm, yyyy] = match
  const day = new Date(Number(yyyy), Number(mm) - 1, Number(dd))
  return Number.isNaN(day.getTime()) ? null : day
}

function formatGoogleDateTime(day: Date, hours: number, minutes: number): string {
  const y = day.getFullYear()
  const m = String(day.getMonth() + 1).padStart(2, '0')
  const d = String(day.getDate()).padStart(2, '0')
  const h = String(hours).padStart(2, '0')
  const min = String(minutes).padStart(2, '0')
  return `${y}${m}${d}T${h}${min}00`
}

export function buildGoogleCalendarUrl(options: {
  title: string
  description?: string
  location?: string
  day: Date
  startHour?: number
  startMinute?: number
  endHour?: number
  endMinute?: number
  timezone?: string
}): string {
  const {
    title,
    description = '',
    location = DEFAULT_LOCATION,
    day,
    startHour = 9,
    startMinute = 0,
    endHour = 16,
    endMinute = 0,
    timezone = DEFAULT_TIMEZONE,
  } = options

  const start = formatGoogleDateTime(day, startHour, startMinute)
  const end = formatGoogleDateTime(day, endHour, endMinute)

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: description,
    location,
    ctz: timezone,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function buildTrainingModuleCalendarUrl(module: {
  num?: string
  week?: string
  date?: string
  details?: string
}): string | null {
  const day = parseTrainingModuleDate(module.date)
  if (!day) return null

  const num = module.num?.trim() || ''
  const week = module.week?.trim()
  const titleParts = ['Tootmisjuhtimise koolitus']
  if (num) titleParts.push(`Moodul ${num}`)
  if (week) titleParts.push(`(${week})`)

  return buildGoogleCalendarUrl({
    title: titleParts.join(' – '),
    description: module.details?.trim() || module.date || '',
    day,
  })
}

export function generateAllModulesIcs(modules: Array<{
  num?: string
  type?: string
  date?: string
  title?: string
  details?: string
}>): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Product Name//Koolitusprogramm//ET',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ]

  const now = new Date()
  const stamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  modules.forEach(mod => {
    const day = parseTrainingModuleDate(mod.date)
    if (!day) return

    const y = day.getFullYear()
    const m = String(day.getMonth() + 1).padStart(2, '0')
    const d = String(day.getDate()).padStart(2, '0')
    const dateStr = `${y}${m}${d}`

    const startStr = `${dateStr}T090000`
    const endStr = `${dateStr}T160000`

    const uid = `training-module-${mod.num || 'x'}-${dateStr}@example.com`
    
    const summary = `Product Name · Moodul ${mod.num || ''}`
    const description = mod.title || ''
    const location = 'Grand Hotel Viljandi'

    const escapedSummary = summary.replace(/,/g, '\\,')
    const escapedDesc = description.replace(/\n/g, '\\n').replace(/,/g, '\\,')

    lines.push(
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Europe/Tallinn:${startStr}`,
      `DTEND;TZID=Europe/Tallinn:${endStr}`,
      `SUMMARY:${escapedSummary}`,
      `DESCRIPTION:${escapedDesc}`,
      `LOCATION:${location}`,
      'END:VEVENT'
    )
  })

  lines.push('END:VCALENDAR')
  return lines.join('\r\n')
}
