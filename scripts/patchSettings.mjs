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
  console.log('Fetching siteSettings draft...');
  try {
    const draft = await client.getDocument('drafts.siteSettings');
    console.log('Current draft content:', draft);
    
    console.log('Patching siteSettings draft fields to satisfy validation rules...');
    await client
      .patch('drafts.siteSettings')
      .set({
        siteName: 'Tootmisjuhtimise koolitus',
        siteDescription: 'Tootmisjuhtimise koolitus',
        contact: {
          _type: 'object',
          email: 'andres@kase.ee'
        }
      })
      .commit();
      
    console.log('Success! Draft patched successfully.');
  } catch (err) {
    console.error('Error during patch:', err);
  }
}

run();
