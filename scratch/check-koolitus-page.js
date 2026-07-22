const { createClient } = require('@sanity/client');
require('dotenv').config();
require('dotenv').config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

async function main() {
  try {
    const docs = await client.fetch(`*[_type == "koolitusPage"]`);
    console.log('Found koolitusPage documents:', docs.map(d => ({ id: d._id, title: d.title })));
    if (docs.length > 0) {
      console.log('First doc details (top level fields):');
      const doc = docs[0];
      const keys = Object.keys(doc);
      console.log('Keys:', keys);
      console.log('usePageBuilder:', doc.usePageBuilder);
      console.log('cohortsSection keys:', doc.cohortsSection ? Object.keys(doc.cohortsSection) : 'no cohortsSection');
      if (doc.sections) {
        console.log('Sections present. Count:', doc.sections.length);
        const cohortsBlocks = doc.sections.filter(s => s._type === 'koolitusCohortsBlock');
        console.log('koolitusCohortsBlocks count:', cohortsBlocks.length);
        if (cohortsBlocks.length > 0) {
          console.log('koolitusCohortsBlock details:');
          console.log(JSON.stringify(cohortsBlocks, null, 2));
        }
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
