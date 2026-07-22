const { createClient } = require('@sanity/client');
require('dotenv').config();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_TOKEN;

console.log('Sanity configuration:', { projectId, dataset, apiVersion, hasToken: !!token });

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function main() {
  try {
    const query = `*[_type == "chatSession"] | order(createdAt desc)[0..5]`;
    const docs = await client.fetch(query);
    console.log('Latest 5 chat sessions in Sanity:');
    console.log(JSON.stringify(docs, null, 2));
  } catch (err) {
    console.error('Error fetching sessions:', err);
  }
}

main();
