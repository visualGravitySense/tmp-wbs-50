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
    const docs = await client.fetch(`*[_id in ["opstarProfit", "drafts.opstarProfit"]]`);
    console.log(`Found ${docs.length} document(s)`);
    for (const doc of docs) {
      console.log(`\nDocument _id: ${doc._id}`);
      console.log('usePageBuilder:', doc.usePageBuilder);
      console.log('sections count:', doc.sections ? doc.sections.length : 0);
      if (doc.sections) {
        doc.sections.forEach((sec, idx) => {
          console.log(`- [${idx}] _type: ${sec._type}, _key: ${sec._key}`);
        });
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
