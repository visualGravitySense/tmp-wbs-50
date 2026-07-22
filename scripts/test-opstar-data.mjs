import { createClient } from '@sanity/client';
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-04-28',
  useCdn: false
});

async function main() {
  const page = await client.fetch(`*[_type == "opstarProfitPage"][0]{ orbitBlock }`);
  console.log("orbitBlock heroMetrics:", JSON.stringify(page?.orbitBlock?.heroMetrics, null, 2));
  
  const siteSettings = await client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]{ globalStats }`);
  console.log("siteSettings globalStats:", JSON.stringify(siteSettings?.globalStats?.stats, null, 2));
}

main().catch(console.error);
