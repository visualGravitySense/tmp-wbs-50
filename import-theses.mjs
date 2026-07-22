/**
 * Scrape dspace.tktk.ee thesis pages and import to Sanity
 * 
 * SETUP:
 *   npm install @sanity/client node-fetch
 * 
 * USAGE (PowerShell):
 *   $env:SANITY_PROJECT_ID="buc8lir0"
 *   $env:SANITY_DATASET="andres-prod"
 *   $env:SANITY_TOKEN="sk-xxx"
 *   node import-theses.mjs
 */

import { createClient } from '@sanity/client'
import fetch from 'node-fetch'

// --- CONFIG ---
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET    = process.env.SANITY_DATASET || 'production'
const SANITY_TOKEN      = process.env.SANITY_TOKEN

if (!SANITY_PROJECT_ID || !SANITY_TOKEN) {
  console.error('❌ Missing env vars: SANITY_PROJECT_ID and SANITY_TOKEN are required')
  process.exit(1)
}

const client = createClient({
  projectId:  SANITY_PROJECT_ID,
  dataset:    SANITY_DATASET,
  token:      SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn:     false,
})

// --- URLS TO SCRAPE ---
const DSPACE_URLS = [
  'https://dspace.tktk.ee/items/594500ac-8bce-4443-9ecd-f5ae73d434b3',
  'https://dspace.tktk.ee/items/d0de249d-8e35-4f38-ae77-942458113607',
  'https://dspace.tktk.ee/items/eee05bf7-732d-4122-a3d2-05281a0881b4',
  'https://dspace.tktk.ee/items/451bf175-44d7-4d20-ad7c-c2fde7786948',
  'https://dspace.tktk.ee/items/86b4f903-46f6-499d-b07d-6b7f5f4ed8cc',
  'https://dspace.tktk.ee/items/edf82132-0a4a-4a88-a749-8961ffce87e0',
  'https://dspace.tktk.ee/items/a890a3dc-c06f-4335-850c-9aaeb4fcf33e',
  'https://dspace.tktk.ee/items/0ea703fd-a043-4725-af19-a46b7ad2c8e6',
  'https://dspace.tktk.ee/items/a3503b04-af8c-44b0-851c-bea26660f773',
  'https://dspace.tktk.ee/items/829345e9-a9db-4b30-bbea-3c8dcead6d70',
  'https://dspace.tktk.ee/items/83083408-c36b-43b6-9fd1-ba8c3d8afee6',
  'https://dspace.tktk.ee/items/4a3cac97-3f2c-4c5f-b905-c4c607c084ca',
  'https://dspace.tktk.ee/items/eaea431c-23fe-4022-9049-702a478216af',
  'https://dspace.tktk.ee/items/82d68747-88eb-4526-8fca-752940b498a8',
  'https://dspace.tktk.ee/items/80e6c02c-dd0b-446c-a035-e64ce9606a3f',
]

// --- SCRAPER — reads <meta name="..." content="..."> tags ---
async function scrapeDspace(url) {
  const res  = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; thesis-importer/1.0)' }
  })
  const html = await res.text()

  // Parse <meta name="DC.title" content="..."> and <meta name="citation_author" content="...">
  const getMeta = (name) => {
    const patterns = [
      new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, 'i'),
      new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+name=["']${name}["']`, 'i'),
    ]
    for (const pattern of patterns) {
      const match = html.match(pattern)
      if (match) return match[1].trim()
    }
    return null
  }

  // Try multiple possible meta tag names for each field
  const title    = getMeta('DC.title') || getMeta('citation_title') || getMeta('og:title')
  const author   = getMeta('DC.creator') || getMeta('citation_author')
  const dateRaw  = getMeta('DC.date') || getMeta('citation_date') || getMeta('citation_publication_date')
  const publisher = getMeta('DC.publisher') || getMeta('citation_publisher')
  const abstract = getMeta('DC.description') || getMeta('description') || getMeta('citation_abstract')
  const keywordsRaw = getMeta('DC.subject') || getMeta('citation_keywords') || getMeta('keywords')

  const year = dateRaw ? parseInt(dateRaw.substring(0, 4)) : null

  // Clean keywords
  const keywords = keywordsRaw
    ? keywordsRaw.split(/[,;::]/).map(k => k.trim()).filter(k => k.length > 2 && !k.includes('ärijuhtimine'))
    : []

  // Detect type
  const type = html.toLowerCase().includes('magistritöö') || html.toLowerCase().includes('magistri')
    ? 'Magistritöö'
    : 'Bakalaureusetöö'

  // Detect school
  let school = publisher || 'Tallinna Tehnikakõrgkool'
  if (html.includes('EEK') || html.includes('Mainor')) school = 'EEK Mainor'
  if (html.includes('tktk') || html.includes('Tehnikakõrgkool')) school = 'Tallinna Tehnikakõrgkool'

  return { title, author, school, year, type, keywords, abstract, publisher }
}

// --- MANUAL EEK ENTRIES (PDFs) ---
const EEK_MANUAL = [
  {
    title: 'EEK lõputöö 1 — uuenda Sanity Studios',
    author: 'Uuenda käsitsi',
    school: 'EEK Mainor',
    year: 2023,
    type: 'Bakalaureusetöö',
    sourceUrl: 'https://eek.ee/download.php?t=kb&dok=p1gvekgtj21lh8v7l1mvamdb1smc3.pdf',
  },
  {
    title: 'EEK lõputöö 2 — uuenda Sanity Studios',
    author: 'Uuenda käsitsi',
    school: 'EEK Mainor',
    year: 2023,
    type: 'Bakalaureusetöö',
    sourceUrl: 'https://eek.ee/download.php?t=kb&dok=p1iput0kls1pr9ug1sao1j60qfq3.pdf',
  },
  {
    title: 'EEK lõputöö 3 — uuenda Sanity Studios',
    author: 'Uuenda käsitsi',
    school: 'EEK Mainor',
    year: 2022,
    type: 'Bakalaureusetöö',
    sourceUrl: 'https://eek.ee/download.php?t=kb&dok=p1hsj2a01jc5o59c1juc9pk1ger8.pdf',
  },
  {
    title: 'EEK lõputöö 4 — uuenda Sanity Studios',
    author: 'Uuenda käsitsi',
    school: 'EEK Mainor',
    year: 2022,
    type: 'Bakalaureusetöö',
    sourceUrl: 'https://eek.ee/download.php?t=kb&dok=p1fkmv9f7oc76v4584cn4418805.pdf',
  },
]

// --- MAIN ---
async function main() {
  console.log('🔍 Scraping dspace.tktk.ee...\n')

  const theses = []

  for (const url of DSPACE_URLS) {
    try {
      const data = await scrapeDspace(url)

      if (!data.title) {
        console.warn(`⚠️  No title found for ${url}`)
      }

      const thesis = {
        _type: 'thesis',
        title:         data.title    || 'Pealkiri puudub — uuenda käsitsi',
        author:        data.author   || 'Autor puudub — uuenda käsitsi',
        school:        data.school   || 'Tallinna Tehnikakõrgkool',
        year:          data.year     || null,
        type:          data.type     || 'Bakalaureusetöö',
        category:      'LEAN',
        keywords:      data.keywords || [],
        abstract:      data.abstract ? data.abstract.substring(0, 800) : null,
        sourceUrl:     url,
        achievement:   null,
        mentorComment: null,
      }

      theses.push(thesis)
      console.log(`✅ ${thesis.title} (${thesis.author}, ${thesis.year})`)
    } catch (err) {
      console.error(`❌ Failed: ${url} —`, err.message)
    }

    await new Promise(r => setTimeout(r, 600))
  }

  // Add EEK manual entries
  for (const eek of EEK_MANUAL) {
    theses.push({
      _type: 'thesis',
      category: 'LEAN',
      keywords: ['tootmisjuhtimine'],
      abstract: null,
      achievement: null,
      mentorComment: null,
      ...eek,
    })
  }

  console.log(`\n📦 Importing ${theses.length} theses to Sanity (${SANITY_PROJECT_ID} / ${SANITY_DATASET})...\n`)

  let ok = 0
  for (const thesis of theses) {
    try {
      const doc = await client.create(thesis)
      console.log(`✅ Saved: "${thesis.title}" → ${doc._id}`)
      ok++
    } catch (err) {
      console.error(`❌ Sanity error for "${thesis.title}":`, err.message)
    }
  }

  console.log(`\n🎉 Done! ${ok}/${theses.length} imported.`)
  console.log('\nOpen Sanity Studio and update manually:')
  console.log('  • category (LEAN / STRATEGIC / OPERATIVE)')
  console.log('  • achievement (nt: Kooli parim 2024)')
  console.log('  • mentorComment')
  console.log('  • EEK PDF titles and authors')
}

main()
