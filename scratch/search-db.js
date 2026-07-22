const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'buc8lir0',
  dataset: 'andres-prod',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skaQuZfNUTTF16qjigWsq7OWgFjEmHfhrfz0LU0sauwPYez0aKPtdBhD0s36Nlx1ubd3XpckSGVCfG6CwSN494sggAFopyTwFcg9liVx2RGrvhxc2wh5ZbqBW2ZplecvQzZEPeEWB6ccDQic0g6wi7n2TFybgnhYNjFLqIkkGq9ma30qCr57'
});

async function run() {
  try {
    const allDocs = await client.fetch(`*`);
    console.log(`Fetched ${allDocs.length} documents from Sanity.`);
    const matches = [];
    for (const doc of allDocs) {
      const json = JSON.stringify(doc);
      if (json.includes('kasum') || json.includes('meeskond') || json.includes('Esmaspäeval')) {
        matches.push({
          _id: doc._id,
          _type: doc._type,
          matchingSnippet: json.substring(Math.max(0, json.indexOf('kasum') - 50), json.indexOf('kasum') + 100)
        });
      }
    }
    console.log(`Found ${matches.length} matching documents:`);
    console.log(JSON.stringify(matches, null, 2));
  } catch (err) {
    console.error('Error searching Sanity:', err);
  }
}

run();
