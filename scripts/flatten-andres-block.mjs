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

  // 1. Fetch the profile data
  console.log('Fetching andres-kase-profile...')
  const profile = await client.getDocument(ANDRES_PROFILE_ID)
  
  if (!profile) {
    console.error(`Profile document ${ANDRES_PROFILE_ID} not found. Ensure it exists before migrating.`)
    process.exit(1)
  }

  // 2. Find and patch all documents containing an andresBlock that might reference the profile
  console.log('Finding documents with andresBlock...')
  
  const docsToPatchQuery = `*[_type in ["mainPage", "koolitusPage", "aboutPage", "kontaktPage", "page"] && defined(sections) && count(sections[_type == "andresBlock"]) > 0]`
  const docsToPatch = await client.fetch(docsToPatchQuery)
  console.log(`Found ${docsToPatch.length} documents to process.`)

  for (const doc of docsToPatch) {
    console.log(`Processing document: ${doc._id} (${doc._type})`)
    
    let hasChanges = false
    const newSections = doc.sections.map(section => {
      if (section._type === 'andresBlock') {
        hasChanges = true
        // Keep existing overrides if any, otherwise use profile data
        const name = section.titleOverride || section.name || profile.name
        const subtitle = section.subtitleOverride || section.subtitle || profile.subtitle
        
        // Build flattened block
        const flattenedBlock = {
          ...section,
          name,
          subtitle,
          eyebrow: section.eyebrow || profile.eyebrow,
          quote: section.quote || profile.quote,
          shortBio: section.shortBio || profile.shortBio || profile.description,
          bio: section.bio || section.andresContent || profile.fullBio, // migrate from old field name or profile
          methodologyText: section.methodologyText || section.methodology || profile.methodology,
          methodologyTitle: section.methodologyTitle || 'METOODIKA',
          fieldExperience: section.fieldExperience || profile.fieldExperience,
          photo: section.photo || profile.mainImage || profile.photo,
          secondaryPhotos: section.secondaryPhotos || profile.overlayImages || profile.secondaryPhotos,
          stats: section.stats || profile.statistics || profile.stats,
          tags: section.tags || profile.tags,
          timeline: section.timeline || profile.timeline,
          factories: section.factories || profile.factories,
          ctaLabel: section.ctaLabel || profile.ctaLabel,
          ctaLink: section.ctaLink || profile.ctaLink,
        }
        
        // Remove legacy fields
        delete flattenedBlock.profile
        delete flattenedBlock.titleOverride
        delete flattenedBlock.subtitleOverride
        delete flattenedBlock.andresContent

        return flattenedBlock
      }
      return section
    })

    if (hasChanges) {
      console.log(`Patching document: ${doc._id}`)
      await client.patch(doc._id)
        .set({ sections: newSections })
        .commit()
      console.log(`✅ Successfully patched ${doc._id}`)
    } else {
      console.log(`No updates needed for ${doc._id}`)
    }
  }

  console.log('Migration completed successfully!')
}

main().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
