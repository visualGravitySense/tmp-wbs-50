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
    for (const doc of docs) {
      console.log(`Document _id: ${doc._id}`);
      const compBlock = doc.sections ? doc.sections.find(s => s._type === 'opstarComparisonBlock') : null;
      console.log('opstarComparisonBlock inside sections:', JSON.stringify(compBlock, null, 2));
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
