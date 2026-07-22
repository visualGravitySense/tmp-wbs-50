import { createClient } from 'next-sanity'

// Assuming projectId and dataset are defined in .env.local, but let's try reading from config or env
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-22',
  useCdn: false
})
async function run() {
  const globalStats = await client.fetch('*[_type == "siteSettings"][0].globalStats.stats')
  console.log("globalStats:", globalStats)
  
  const siteSettings = await client.fetch('*[_type == "siteSettings" && _id == "siteSettings"][0]{ globalStats }')
  console.log("siteSettings globalStats:", siteSettings?.globalStats)
}
run()
