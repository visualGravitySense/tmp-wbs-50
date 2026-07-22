const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN
})

async function patchCohorts() {
  const cohorts = [
    {
      _key: "cohort1",
      id: "lean-edasijoudnud",
      trainingTitle: "LEAN Edasijõudnud",
      location: "Grand Hotel Viljandi konverentsiruumis",
      preRegistrationInfo: "Oktoober 2026",
      dates: "15. oktoober 2026 kuni 17. mai 2027",
      daysUntil: "Nädalad 42 (2026) – 20 (2027)",
      statusLabel: "AKTIIVNE",
      statusTone: "upcoming", // upcoming shows blue
      spotsTotal: 16,
      spotsFilled: 11,
      price: "1796",
      buttonText: "HOIA KOHT KINNI",
      ctaVariant: "blue", // Blue button
      calendarLabel: "lisa kalendrisse (Google)",
      calendarLinks: ["google"]
    },
    {
      _key: "cohort2",
      id: "lean",
      trainingTitle: "Lean",
      location: "Viljandi",
      dates: "22. aprill 2026 kuni 24. aprill 2026",
      daysUntil: "Nädal 17 (2026)\nAlguseni: 12 päeva",
      statusLabel: "AKTIIVNE",
      statusTone: "active", // active shows orange
      spotsTotal: 19,
      spotsFilled: 17,
      price: "1 290€",
      buttonText: "HOIA KOHT",
      ctaVariant: "orange", // Green button
      calendarLabel: "Lisa kalendrisse (Google)",
      calendarLinks: ["google"]
    }
  ]

  try {
    const res = await client
      .patch('siteSettings')
      .set({ cohorts })
      .commit()
    console.log('Successfully updated siteSettings cohorts', res.cohorts)
  } catch (err) {
    console.error('Error updating siteSettings:', err.message)
  }
}

patchCohorts()
