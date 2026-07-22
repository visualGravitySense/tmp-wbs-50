import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

function makeClient() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_AUTH_TOKEN
  const apiVersion = process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

const timelineData = [
  {
    _key: 'item1',
    year: '1992',
    title: 'ESIMENE TOOTMISETTEVÕTE JA VISU SUUSAD',
    description: 'Alustasin tootmispõrandalt. Mõista töötajat ja tootmisprobleeme seestpoolt — ehitad süsteemi, mida mõistetakse.'
  },
  {
    _key: 'item2',
    year: '2005',
    title: 'TOYOTA TPS SÜVAKOOLITUS JAAPANIS',
    description: 'Kolm kuud Jaapanis Toyota tehases. Õppisin TPS-i otse allikast — mitte raamatutest vaid päris tootmises.'
  },
  {
    _key: 'item3',
    year: '2010',
    title: 'ESIMESED KOOLITUSPROGRAMMID EESTIS',
    description: 'Tõin Toyota meetodid Eestisse. Esimesed koolitused tootmisjuhtidele — praktiline lähenemine, mitte ainult teooria.'
  },
  {
    _key: 'item4',
    year: '2020',
    title: '60+ ETTEVÕTET KONSULTEERITUD',
    description: 'Kümnendi jooksul konsulteeritud üle 60 Eesti tootmisettevõtte. 100+ tehast üle Euroopa külastatud.'
  },
  {
    _key: 'item5',
    year: '2020',
    title: 'OPSTAR PROFIT™ RAAMISTIKU LOOMINE',
    description: '20 aasta kogemuse destilleerimine 8-komponentseks süsteemiks. Eesti tootmise jaoks kohandatud — mitte üldine LEAN.'
  },
  {
    _key: 'item6',
    year: '2025',
    title: '147+ LÕPETAJAT · TOOTMISJUHTIMINE.EE',
    description: '9-päevane arenguprogramm on muutunud Eesti tuntuimaks tootmisjuhtimise koolituseks. Järgmine grupp oktoober 2026.'
  }
]

async function main() {
  const client = makeClient()
  console.log('Populating timeline data...')

  // 1. Update the central profile if it exists
  try {
    await client.patch('andres-kase-profile')
      .set({ timeline: timelineData })
      .commit()
    console.log('✅ Updated andres-kase-profile with timeline data.')
  } catch (err) {
    console.log('Could not update profile (might not exist):', err.message)
  }

  // 2. Update any existing andresBlock sections in pages
  const docsToPatchQuery = `*[defined(sections) && count(sections[_type == "andresBlock"]) > 0]`
  const docsToPatch = await client.fetch(docsToPatchQuery)

  for (const doc of docsToPatch) {
    const newSections = doc.sections.map(section => {
      if (section._type === 'andresBlock') {
        return {
          ...section,
          timeline: timelineData
        }
      }
      return section
    })

    await client.patch(doc._id)
      .set({ sections: newSections })
      .commit()
    console.log(`✅ Updated timeline in ${doc._id}`)
  }

  console.log('Done!')
}

main().catch(console.error)
