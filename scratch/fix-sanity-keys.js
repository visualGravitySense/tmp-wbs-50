const { createClient } = require('@sanity/client')
const { nanoid } = require('nanoid')
require('dotenv').config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
})

/** Add _key to every item in an array that doesn't have one */
function addKeys(arr) {
  if (!Array.isArray(arr)) return arr
  return arr.map((item) => {
    if (item && typeof item === 'object' && !item._key) {
      return { _key: nanoid(), ...item }
    }
    return item
  })
}

async function fixKeys() {
  const doc = await client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`)
  if (!doc) {
    console.error('❌ siteSettings not found')
    process.exit(1)
  }

  const patch = {}

  // header.navLinks
  if (Array.isArray(doc.header?.navLinks)) {
    const fixed = addKeys(doc.header.navLinks)
    patch['header.navLinks'] = fixed
    console.log(`✅ header.navLinks — fixed ${fixed.length} items`)
  }

  // footer arrays
  const footerArrays = ['socialLinks', 'servicesLinks', 'infoLinks']
  for (const key of footerArrays) {
    if (Array.isArray(doc.footer?.[key])) {
      const fixed = addKeys(doc.footer[key])
      patch[`footer.${key}`] = fixed
      console.log(`✅ footer.${key} — fixed ${fixed.length} items`)
    }
  }

  if (Object.keys(patch).length === 0) {
    console.log('⚠️  Nothing to fix — no arrays found.')
    process.exit(0)
  }

  await client.patch('siteSettings').set(patch).commit()
  console.log('\n✅ All _key values added successfully!')
}

fixKeys().catch((err) => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
