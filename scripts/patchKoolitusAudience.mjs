import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'buc8lir0'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'andres-prod'
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.error('Error: SANITY_API_TOKEN is missing from .env or .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false
})

async function main() {
  try {
    console.log(`Patching koolitusPage in project ${projectId}, dataset ${dataset}...`)
    
    const res = await client
      .patch('koolitusPage')
      .set({
        'audienceSection.eyebrow': 'SIHTRÜHM',
        'audienceSection.title': 'Kellele see koolitus on mõeldud?',
        'audienceSection.socialProofIntro': '“Meie koolitustel on osalenud juba üle 500 tootmisjuhi”',
        'audienceSection.transformBar.beforeLabel': 'ENNE',
        'audienceSection.transformBar.beforeText': 'Töötad raskelt, palju stressi',
        'audienceSection.transformBar.afterLabel': 'PÄRAST',
        'audienceSection.transformBar.afterText': 'Töötad efektiivselt, vähem stressi',
        'audienceSection.goalSection.label': 'SINU EESMÄRK',
        'audienceSection.goalSection.placeholder': 'Kirjuta oma sihtgrupp siia...',
        'audienceSection.goalSection.confirmText': 'KINNITA OMA SIHTGRUPP',
        'audienceSection.confirmButtonText': 'KINNITA OMA SIHTGRUPP',
        'audienceSection.directorPath.title': 'TÖÖ DIREKTORINA?',
        'audienceSection.directorPath.description': 'Kuidas LEAN aitab sinu juhtimist?',
        'audienceSection.directorPath.linkText': 'VAATA DIREKTORITE TEE'
      })
      .commit()
      
    console.log('Successfully patched audience section for koolitusPage!')
  } catch (err) {
    console.error('Failed to patch document:', err.message)
  }
}

main()
