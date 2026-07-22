import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  console.log('Deleting duplicate old siteSettings document with ID d8568cf9-9a2d-45a3-8c10-0771d9f7ee9c...');
  try {
    const result = await client.delete('d8568cf9-9a2d-45a3-8c10-0771d9f7ee9c');
    console.log('Delete result:', result);
    console.log('Success! Old siteSettings document has been deleted.');
  } catch (err) {
    console.error('Error during delete:', err);
  }
}

run();
