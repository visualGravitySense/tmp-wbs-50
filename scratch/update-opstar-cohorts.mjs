import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error('Missing required environment variables:', { projectId, dataset, hasToken: !!token });
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function main() {
  try {
    console.log('Fetching koolitusPage...');
    const koolitus = await client.fetch(`*[_type == "koolitusPage"][0]{ _id, sections }`);
    if (!koolitus || !koolitus.sections) {
      throw new Error('koolitusPage or sections not found');
    }

    const cohortsBlock = koolitus.sections.find(s => s._type === 'koolitusCohortsBlock');
    if (!cohortsBlock) {
      throw new Error('koolitusCohortsBlock not found in koolitusPage');
    }
    console.log('Found cohorts block in koolitusPage:', JSON.stringify(cohortsBlock, null, 2));

    console.log('Fetching opstarProfit...');
    const opstar = await client.fetch(`*[_type == "opstarProfit"][0]{ _id, sections }`);
    if (!opstar) {
      throw new Error('opstarProfit page document not found');
    }

    const opstarSections = opstar.sections || [];
    const alreadyHasCohorts = opstarSections.some(s => s._type === 'koolitusCohortsBlock');

    if (alreadyHasCohorts) {
      console.log('opstarProfit already has koolitusCohortsBlock. Updating it with fresh data...');
      const index = opstarSections.findIndex(s => s._type === 'koolitusCohortsBlock');
      // Keep original _key if exists to avoid unnecessary key regeneration
      const key = opstarSections[index]._key;
      opstarSections[index] = { ...cohortsBlock, _key: key };
    } else {
      console.log('Adding koolitusCohortsBlock to opstarProfit...');
      // Insert right before the last section if it is homeFinalCtaBlock
      const finalCtaIndex = opstarSections.findIndex(s => s._type === 'homeFinalCtaBlock');
      if (finalCtaIndex !== -1) {
        opstarSections.splice(finalCtaIndex, 0, cohortsBlock);
      } else {
        opstarSections.push(cohortsBlock);
      }
    }

    console.log('Patching opstarProfit...');
    await client
      .patch('opstarProfit')
      .set({ sections: opstarSections })
      .commit();

    console.log('Successfully updated opstarProfit with cohorts block!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
