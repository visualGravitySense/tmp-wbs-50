import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'

dotenv.config({ path: '.env.local' })
dotenv.config()

// Minimal copy of MAIN_PAGE_SECTIONS_QUERY + filter
const MAIN_PAGE_SECTIONS_QUERY = readFileSync('src/lib/sanity/mainPageSectionsQuery.ts', 'utf8')
  .replace(/^\/\*\*[\s\S]*?\*\/\n/, '')
  .replace(/^export const MAIN_PAGE_SECTIONS_QUERY = `\n/, '')
  .replace(/`\n?$/, '')

const FILTER = '_type == "mainPage" && _id == "mainPage"'
const query = `*[${FILTER}][0]{ title, ${MAIN_PAGE_SECTIONS_QUERY} eyebrow, headline }`

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-28',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const data = await client.fetch(query)
console.log('headline:', data?.headline)
console.log('sections:', JSON.stringify(data?.sections, null, 2))

const valid = new Set(['homeHeroBlock', 'homePartnersBlock', 'homeTestimonialsBlock'])
const parsed = (data?.sections ?? []).filter((s) => valid.has(s?._type))
console.log('\nusePageBuilder:', parsed.length > 0)
console.log('parsed blocks:', parsed.map((s) => s._type))
