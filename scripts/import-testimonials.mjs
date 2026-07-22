/**
 * Migrate scraped testimonials → Sanity `testimonial` documents.
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(ROOT, '.env') })

function parseArgs() {
  const fileArg = process.argv.find((a) => a.startsWith('--file='))
  const rel = fileArg ? fileArg.slice('--file='.length) : 'testimonials.json'
  return path.isAbsolute(rel) ? rel : path.join(ROOT, rel)
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`)
  }
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw)
  if (!Array.isArray(data)) {
    throw new Error('Expected testimonials.json to be a JSON array')
  }
  return data
}

/** Deterministic _id from SHA-256 so createOrReplace is idempotent. */
function stableTestimonialId(name, text) {
  const payload = `${name}\n${text}`
  const hash = crypto.createHash('sha256').update(payload, 'utf8').digest('hex')
  return `import.testimonial.${hash.substring(0, 32)}`
}

function envStr(...keys) {
  for (const k of keys) {
    const v = process.env[k]
    if (v == null) continue
    const t = String(v).trim().replace(/^["']|["']$/g, '')
    if (t) return t
  }
  return ''
}

function getClient() {
  const projectId = envStr('NEXT_PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID')
  const dataset = envStr('NEXT_PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production'
  const apiVersion = envStr('NEXT_PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01'
  const token = envStr('SANITY_AUTH_TOKEN')

  if (!projectId) {
    throw new Error('Missing Sanity project id: set NEXT_PUBLIC_SANITY_PROJECT_ID in .env')
  }
  if (!token) {
    throw new Error('Missing SANITY_AUTH_TOKEN in .env')
  }

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

/** Parse roleCompany into { role, company } */
export function parseRoleCompany(roleCompany) {
  let role = ''
  let company = ''

  if (!roleCompany) return { role, company }

  roleCompany = roleCompany.trim()

  // 1. Handle common OÜ/AS splits
  const ouRegex = /\b(OÜ|AS)\b/i
  const match = roleCompany.match(ouRegex)

  if (match) {
    const parts = roleCompany.split(ouRegex)
    if (parts.length >= 3) {
      let companyPart = (parts[0] + parts[1]).trim()
      let rolePart = parts.slice(2).join('').trim()

      // Clean up rolePart (strip leading commas, periods, dashes)
      rolePart = rolePart.replace(/^[,.\s\-–—/]+|[,.\s\-–—/]+$/g, '').trim()

      // Clean up companyPart description prefixes
      const stripPrefixes = /^(?:Tervislikku ja maitsvat taimset toitu pakkuv|Asjakohast ja toimivat tootmistarkvara arendav|Eesti Aasta Tehas 2023)\s+/gi
      companyPart = companyPart.replace(stripPrefixes, '').trim()

      role = rolePart
      company = companyPart
    }
  }

  // 2. If no OÜ/AS found, check for separator like comma, dash, or period
  if (!role && !company) {
    const separatorMatch = roleCompany.match(/[,.\-–—]/)
    if (separatorMatch) {
      const idx = roleCompany.indexOf(separatorMatch[0])
      const part1 = roleCompany.substring(0, idx).trim()
      const part2 = roleCompany.substring(idx + 1).trim()

      role = part1.replace(/^[,.\s\-–—/]+|[,.\s\-–—/]+$/g, '').trim()
      company = part2.replace(/^[,.\s\-–—/]+|[,.\s\-–—/]+$/g, '').trim()
    } else {
      role = roleCompany.trim()
    }
  }

  // 3. Fallback check
  if (!role) {
    role = roleCompany.trim()
  }

  // Final sanitization
  role = role.replace(/^[,.\s\-–—/]+|[,.\s\-–—/]+$/g, '').trim()
  company = company.replace(/^[,.\s\-–—/]+|[,.\s\-–—/]+$/g, '').trim()

  return { role, company }
}

async function main() {
  const jsonPath = parseArgs()
  const rows = readJson(jsonPath)
  const client = getClient()

  let ok = 0
  let skipped = 0

  console.log(`Starting migration of ${rows.length} testimonials...`)

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    let rawAuthor = String(row.authorName ?? '').trim()
    let rawLabel = String(row.roleCompany ?? '').trim()
    let rawText = String(row.content ?? '').trim()

    if (!rawAuthor || !rawText) {
      console.warn(`Skip row ${i + 1}: missing author or content`)
      skipped += 1
      continue
    }

    let name = rawAuthor
    let text = rawText
    let role = ''
    let company = ''

    // Special parsing for names with quote headlines inside them
    if (name.includes(':')) {
      const colonIndex = name.indexOf(':')
      const namePart = name.substring(0, colonIndex).trim()
      const quotePart = name.substring(colonIndex + 1).trim()

      if (namePart && quotePart) {
        name = namePart
        text = `${quotePart}\n\n${text}`
      }
    } else if (name.length > 50 && name.endsWith('!')) {
      // Long quote in authorName
      name = 'ETS NORD osaleja'
      text = `${rawAuthor}\n\n${text}`
    }

    // Parse role & company
    const parsed = parseRoleCompany(rawLabel)
    role = parsed.role
    company = parsed.company

    // Handle anonymous or general industries
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
    const doc = {
      _id,
      _type: 'testimonial',
      name,
      role: role || undefined,
      company: company || undefined,
      text,
      rating: 5,
      featured: false,
      tags: tags.length > 0 ? tags : undefined,
    }

    // Clean undefined fields
    if (!doc.role) delete doc.role
    if (!doc.company) delete doc.company
    if (!doc.tags) delete doc.tags

    await client.createOrReplace(doc)
    ok += 1
    console.log(`[${ok}/${rows.length}] Uploaded: "${name}" (${role || 'no role'} @ ${company || 'no company'})`)
  }

  console.log(`\nSuccessfully imported ${ok} testimonials to Sanity (skipped ${skipped})!`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
