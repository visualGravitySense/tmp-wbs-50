import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

function makeClient() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) {
    throw new Error('Set SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID')
  }
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_AUTH_TOKEN
  if (!token) {
    throw new Error('Set SANITY_AUTH_TOKEN (write token) in .env.local')
  }
  const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

const ANDRES_PROFILE_ID = 'andres-kase-profile'

async function main() {
  const client = makeClient()
  console.log(`Connected to Sanity project: ${client.config().projectId}, dataset: ${client.config().dataset}`)

  // 1. Find the "Gold Standard" data
  // We look for a mainAndresCardBlock which is the most comprehensive.
  const goldStandardQuery = `*[_type in ["mainPage", "koolitusPage", "aboutPage", "kontaktPage", "page"] && defined(sections)][0...10]{
    "blocks": sections[_type == "mainAndresCardBlock"]
  }`

  const goldStandardDocs = await client.fetch(goldStandardQuery)
  
  let goldStandardBlock = null
  for (const doc of goldStandardDocs) {
    if (doc.blocks && doc.blocks.length > 0) {
      goldStandardBlock = doc.blocks[0]
      break
    }
  }

  // 2. Create the unified profile document if it doesn't exist
  if (goldStandardBlock) {
    console.log('Found gold standard block, creating profile document...')
    const profileDoc = {
      _id: ANDRES_PROFILE_ID,
      _type: 'andresProfile',
      name: goldStandardBlock.name || 'Andres Kase',
      eyebrow: goldStandardBlock.eyebrow,
      subtitle: goldStandardBlock.role || goldStandardBlock.subtitle,
      quote: goldStandardBlock.quote,
      description: goldStandardBlock.description || goldStandardBlock.shortBio,
      tags: goldStandardBlock.highlights || goldStandardBlock.tags,
      stats: goldStandardBlock.stats || goldStandardBlock.statistics,
      mainImage: goldStandardBlock.mainImage || goldStandardBlock.photo,
      overlayImages: goldStandardBlock.overlayImages || goldStandardBlock.secondaryPhotos,
      certificationLink: goldStandardBlock.certificationLink,
    }
    
    // Clean up undefined fields
    Object.keys(profileDoc).forEach(key => profileDoc[key] === undefined && delete profileDoc[key])

    await client.createIfNotExists(profileDoc)
    console.log(`Created or verified andresProfile with ID: ${ANDRES_PROFILE_ID}`)
  } else {
    console.log('No gold standard block found! Creating a default minimal profile...')
    await client.createIfNotExists({
      _id: ANDRES_PROFILE_ID,
      _type: 'andresProfile',
      name: 'Andres Kase'
    })
  }

  // 3. Find and patch all documents with legacy blocks in pageBuilder arrays
  console.log('Finding documents with legacy blocks...')
  
  const docsToPatchQuery = `*[_type in ["mainPage", "koolitusPage", "aboutPage", "kontaktPage", "page"] && defined(sections) && (
    count(sections[_type in ["homeAboutBlock", "mainAndresCardBlock", "kontaktAndresBlock", "aboutAndresSectionContent"]]) > 0
  )]`
  
  const docsToPatch = await client.fetch(docsToPatchQuery)
  console.log(`Found ${docsToPatch.length} documents to patch.`)

  for (const doc of docsToPatch) {
    console.log(`Patching document: ${doc._id} (${doc._type})`)
    
    const newSections = doc.sections.map(section => {
      if (['homeAboutBlock', 'mainAndresCardBlock', 'kontaktAndresBlock', 'aboutAndresSectionContent'].includes(section._type)) {
        let variant = 'compact'
        if (section._type === 'mainAndresCardBlock' || section._type === 'aboutAndresSectionContent') {
          variant = 'full'
        } else if (doc._type === 'koolitusPage' && section._type === 'homeAboutBlock') {
          variant = 'medium'
        }

        return {
          _type: 'andresBlock',
          _key: section._key,
          variant: variant,
          profile: {
            _type: 'reference',
            _ref: ANDRES_PROFILE_ID
          }
        }
      }
      return section
    })

    await client.patch(doc._id)
      .set({ sections: newSections })
      .commit()
      
    console.log(`✅ Successfully patched ${doc._id}`)
  }

  console.log('Migration completed successfully!')
}

main().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
