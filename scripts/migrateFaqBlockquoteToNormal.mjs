/**
 * One-off migration: convert portable-text blocks with style "blockquote" to "normal"
 * in faqItem answers and legacy inline FAQ rows still stored on page documents.
 *
 * Usage: node scripts/migrateFaqBlockquoteToNormal.mjs [--dry-run]
 */
import 'dotenv/config'
import { createClient } from '@sanity/client'

const dryRun = process.argv.includes('--dry-run')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

function normalizePortableText(blocks) {
  if (!Array.isArray(blocks)) return { changed: false, value: blocks }
  let changed = false
  const value = blocks.map((block) => {
    if (block?._type === 'block' && block.style === 'blockquote') {
      changed = true
      return { ...block, style: 'normal' }
    }
    return block
  })
  return { changed, value }
}

function patchLegacyFaqs(faqs) {
  if (!Array.isArray(faqs)) return { changed: false, value: faqs }
  let changed = false
  const value = faqs.map((row) => {
    const answer = normalizePortableText(row?.answer)
    if (answer.changed) changed = true
    return answer.changed ? { ...row, answer: answer.value } : row
  })
  return { changed, value }
}

function patchDocument(doc) {
  const patches = {}
  let changed = false

  if (doc._type === 'faqItem' && Array.isArray(doc.answer)) {
    const answer = normalizePortableText(doc.answer)
    if (answer.changed) {
      patches.answer = answer.value
      changed = true
    }
  }

  if (doc.kkk) {
    const faqs = patchLegacyFaqs(doc.kkk.faqs)
    if (faqs.changed) {
      patches['kkk.faqs'] = faqs.value
      changed = true
    }
  }

  if (Array.isArray(doc.sections)) {
    const sections = doc.sections.map((section) => {
      if (!section?.kkkSection?.faqs) return section
      const faqs = patchLegacyFaqs(section.kkkSection.faqs)
      if (!faqs.changed) return section
      changed = true
      return {
        ...section,
        kkkSection: {
          ...section.kkkSection,
          faqs: faqs.value,
        },
      }
    })
    if (changed) patches.sections = sections
  }

  return { changed, patches }
}

const query = `*[
  _type in ["faqItem", "mainPage", "koolitusPage", "aboutPage", "opstarProfit", "kkk"]
  && !(_id in path("drafts.**"))
]{
  _id,
  _type,
  _rev,
  answer,
  kkk,
  sections[]{
    _key,
    _type,
    kkkSection
  }
}`

const docs = await client.fetch(query)
let updated = 0

for (const doc of docs) {
  const { changed, patches } = patchDocument(doc)
  if (!changed) continue

  updated += 1
  console.log(`${dryRun ? '[dry-run] ' : ''}Patch ${doc._id} (${doc._type})`, Object.keys(patches))

  if (!dryRun) {
    await client.patch(doc._id).set(patches).commit({ autoGenerateArrayKeys: true })
  }
}

console.log(`Done. ${updated} document(s) ${dryRun ? 'would be ' : ''}updated.`)