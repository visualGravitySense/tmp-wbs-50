import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'buc8lir0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'andres-prod',
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  console.log('Fetching mainPage published document...');
  try {
    // 1. Check if there is an existing draft, if so we should patch the draft.
    // In Sanity, drafts have ID "drafts.mainPage".
    let targetId = 'mainPage';
    try {
      const draft = await client.getDocument('drafts.mainPage');
      if (draft) {
        console.log('Found draft mainPage, patching draft...');
        targetId = 'drafts.mainPage';
      }
    } catch (err) {
      console.log('No draft found, patching published mainPage directly...');
    }

    const seoPatch = {
      metaTitle: "Andres Kase LEAN-Agile arenguprogramm | Spetsialistist liidriks 90 päevaga",
      metaDescription: "Praktiline LEAN-Agile arenguprogramm juhtidele ja spetsialistidele Eestis. Kasva spetsialistist liidriks 90 päevaga ja saavuta mõõdetavad tulemused.",
      metaKeywords: "LEAN-Agile arenguprogramm, Andres Kase, tootmisjuhtimine, juhtimiskoolitus, LEAN koolitus, arenguprogramm juhtidele, OEE kasv",
      _type: "object"
    };

    console.log(`Patching ${targetId} with SEO fields...`);
    await client
      .patch(targetId)
      .set({
        seo: seoPatch
      })
      .commit();

    console.log('Success! SEO metadata patched successfully.');
  } catch (err) {
    console.error('Error during SEO patch:', err);
  }
}

run();
