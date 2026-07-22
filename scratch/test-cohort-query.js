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

const NEW_QUERY = `
  *[_type == "koolitusPage" && _id == "koolitusPage"][0] {
    "cohort": coalesce(
      sections[_type == "koolitusCohortsBlock"][0].cohortsSection.cohorts[id == $cohortId][0],
      cohortsSection.cohorts[id == $cohortId][0]
    ) {
      id,
      name,
      trainingTitle,
      location,
      dates,
      daysUntil,
      timing,
      badges[] { text, type },
      spotsAvailable,
      spotsTotal,
      spotsFilled,
      statusLabel,
      statusTone,
      price,
      priceNote,
      preRegistrationInfo,
      preRegistrationBenefits,
      isCompleted
    }
  }.cohort
`;

async function test(cohortId) {
  try {
    const result = await client.fetch(NEW_QUERY, { cohortId });
    console.log(`Result for ${cohortId}:`, result);
  } catch (err) {
    console.error(`Error for ${cohortId}:`, err);
  }
}

async function run() {
  await test('lean-tallinn-2026-10');
  await test('lean-tallinn-2026-04');
  await test('non-existent-id');
}

run();
