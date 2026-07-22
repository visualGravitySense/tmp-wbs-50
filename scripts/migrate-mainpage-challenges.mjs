import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

dotenv.config({ path: path.join(ROOT, '.env') })
dotenv.config({ path: path.join(ROOT, '.env.local'), override: true })

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
  const token = envStr('SANITY_AUTH_TOKEN', 'SANITY_API_TOKEN')

  if (!projectId) throw new Error('Missing Sanity project id in .env')
  if (!token) throw new Error('Missing SANITY_AUTH_TOKEN in .env / .env.local')

  return createClient({ projectId, dataset, apiVersion, token, useCdn: false })
}

async function main() {
  const client = getClient()

  // Fetch the mainPage document
  const docs = await client.fetch(`*[_type == "mainPage"]`)
  if (!docs || docs.length === 0) {
    console.log("No mainPage document found.")
    return
  }

  const mainPage = docs[0]
  let sections = mainPage.sections || []
  let targetBlockIndex = sections.findIndex(s => s._type === 'painPointsBlock' && s.variant === 'roles')
  let targetBlock

  if (targetBlockIndex >= 0) {
    console.log("Found existing painPointsBlock with variant 'roles' in sections. Updating it.")
    targetBlock = { ...sections[targetBlockIndex] }
  } else {
    console.log("No painPointsBlock with variant 'roles' found in sections. Creating a new one.")
    targetBlock = {
      _type: 'painPointsBlock',
      _key: crypto.randomUUID().split('-').join('').slice(0, 16),
      variant: 'roles',
    }
  }

  // Set the hardcoded values from the user's screenshot
  targetBlock.eyebrow = 'Väljakutsed'
  targetBlock.title = 'Väljakutse võib olla erinev'
  targetBlock.scriptTitle = 'kuid juurpõhjus sageli sama.'
  targetBlock.subheading = 'Väljakutse võib paista erinev, aga juurpõhjus on tihti sama. Vali roll, millega enim samastud.'
  
  if (targetBlockIndex >= 0) {
    sections[targetBlockIndex] = targetBlock
  } else {
    sections.push(targetBlock)
  }

  console.log("Patching mainPage document with new sections:", JSON.stringify(targetBlock, null, 2))

  await client.patch(mainPage._id)
    .set({ sections })
    .commit()

  console.log("Successfully migrated challenges to sections.")
}

main().catch(console.error)
