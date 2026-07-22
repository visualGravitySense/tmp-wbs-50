const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false
});

client.fetch('*[_type == "koolitusPage"][0]{sections}').then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
