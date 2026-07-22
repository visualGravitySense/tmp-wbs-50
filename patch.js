import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '9a93y07d',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function main() {
  const docId = 'fda8514d-6f99-4fb4-86a0-63fcd79545c0'
  await client
    .patch(docId)
    .set({
      sections: [
        { _key: 'hero', _type: 'kontaktHeroBlock' },
        { _key: 'quick', _type: 'kontaktQuickBlock' },
        { _key: 'form', _type: 'kontaktFormBlock' },
        { _key: 'andres', _type: 'kontaktAndresBlock' },
        { _key: 'opstar', _type: 'kontaktOpstarBlock' },
        { _key: 'services', _type: 'kontaktServicesBlock' },
        { 
          _key: 'location', 
          _type: 'koolitusLocationBlock',
          title: 'Asukoht',
          description: 'Tartu 11 / Lossi 29, Viljandi'
        }
      ]
    })
    .commit()
  console.log('Patched!')
}

main().catch(console.error)
