import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { parseRoleCompany } from './import-testimonials.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const rawData = JSON.parse(fs.readFileSync(path.join(ROOT, 'testimonials.json'), 'utf8'))
const parsedDocs = []

function stableTestimonialId(name, text) {
  const payload = `${name}\n${text}`
  const hash = crypto.createHash('sha256').update(payload, 'utf8').digest('hex')
  return `import.testimonial.${hash.substring(0, 32)}`
}

for (let i = 0; i < rawData.length; i++) {
  const row = rawData[i]
  let rawAuthor = String(row.authorName ?? '').trim()
  let rawLabel = String(row.roleCompany ?? '').trim()
  let rawText = String(row.content ?? '').trim()

  if (!rawAuthor || !rawText) continue

  let name = rawAuthor
  let text = rawText

  // Special parsing for names with quotes/headlines inside them
  if (name.includes(':')) {
    const colonIndex = name.indexOf(':')
    const namePart = name.substring(0, colonIndex).trim()
    const quotePart = name.substring(colonIndex + 1).trim()

    if (namePart && quotePart) {
      name = namePart
      text = `${quotePart}\n\n${text}`
    }
  } else if (name.length > 50 && name.endsWith('!')) {
    name = 'ETS NORD osaleja'
    text = `${rawAuthor}\n\n${text}`
  }

  // Parse role & company
  const parsed = parseRoleCompany(rawLabel)
  let role = parsed.role
  let company = parsed.company

  // Handle anonymous/general industries
  if (role.toLowerCase() === 'tootmisjuht kalatööstusest') {
    role = 'Tootmisjuht'
    company = 'kalatööstus'
  } else if (role.toLowerCase() === 'osakonnajuht laevatööstusest') {
    role = 'Osakonnajuht'
    company = 'laevatööstus'
  } else if (role.toLowerCase() === 'tootmisjuht plastitööstusest') {
    role = 'Tootmisjuht'
    company = 'plastitööstus'
  } else if (role.toLowerCase() === 'projektijuht metallitööstusest') {
    role = 'Projektijuht'
    company = 'metallitööstus'
  }

  // Map common tags
  const tags = []
  const roleLower = role.toLowerCase()
  const textLower = text.toLowerCase()

  if (roleLower.includes('tootmisjuht') || textLower.includes('tootmisjuht')) {
    tags.push('Tootmisjuht')
  } else if (roleLower.includes('juht') || roleLower.includes('juhataja') || roleLower.includes('meister')) {
    tags.push('Keskastmejuht')
  }
  
  if (roleLower.includes('meister')) {
    tags.push('Meister')
  }

  if (tags.length === 0) {
    tags.push('Osaleja')
  }

  const _id = stableTestimonialId(name, text)
  const content = {
    _id,
    name,
    text,
    rating: 5,
    featured: false,
  }

  if (role) content.role = role
  if (company) content.company = company
  if (tags.length > 0) content.tags = tags

  parsedDocs.push({
    type: 'testimonial',
    content
  })
}

fs.writeFileSync(
  path.join(ROOT, 'parsed-testimonials.json'),
  JSON.stringify(parsedDocs, null, 2),
  'utf8'
)

console.log(`Generated ${parsedDocs.length} formatted testimonials inside parsed-testimonials.json`)
