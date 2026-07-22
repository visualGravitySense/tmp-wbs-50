const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'buc8lir0',
  dataset: 'andres-prod',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skaQuZfNUTTF16qjigWsq7OWgFjEmHfhrfz0LU0sauwPYez0aKPtdBhD0s36Nlx1ubd3XpckSGVCfG6CwSN494sggAFopyTwFcg9liVx2RGrvhxc2wh5ZbqBW2ZplecvQzZEPeEWB6ccDQic0g6wi7n2TFybgnhYNjFLqIkkGq9ma30qCr57'
});

const newItems = [
  {
    _key: "a7856d8942ed",
    is: "Eesti tootmise jaoks kohandatud meetodid",
    isNot: "Mitte tavaline LEAN raamatust kopeeritud"
  },
  {
    _key: "e1a5e89798db",
    is: "25 aasta välitestitud praktika 60+ ettevõttes",
    isNot: "Mitte teooria mis jääb klassiruumi"
  },
  {
    _key: "599c1bf0ab59",
    is: "Rakendatav esmaspäeval — kohe peale koolitust",
    isNot: "Mitte ühesuurune lahendus kõigile"
  },
  {
    _key: "0bbca5d02c17",
    is: "8-komponentne süsteem mis katab kõik juhtimistasemed",
    isNot: "Mitte veel üks sertifikaadiprogramm"
  },
  {
    _key: "6c08675fc6c1",
    is: "Sinu meeskonnaga koos ehitatud lahendus",
    isNot: "Mitte konsultatsioon kus teised teevad sinu eest"
  }
];

async function run() {
  const docIds = ['opstarProfit', 'drafts.opstarProfit'];
  for (const docId of docIds) {
    try {
      const doc = await client.getDocument(docId);
      if (!doc) {
        console.log(`Document ${docId} does not exist.`);
        continue;
      }
      if (!doc.sections) {
        console.log(`Document ${docId} has no sections.`);
        continue;
      }
      const targetSection = doc.sections.find(s => s._type === 'opstarComparisonBlock');
      if (!targetSection) {
        console.log(`opstarComparisonBlock not found in ${docId}.`);
        continue;
      }
      
      const patchPath = `sections[_key=="${targetSection._key}"].comparison.comparisonItems`;
      console.log(`Patching ${docId} at path ${patchPath}...`);
      
      const res = await client
        .patch(docId)
        .set({ [patchPath]: newItems })
        .commit();
        
      console.log(`Successfully updated ${docId}!`);
    } catch (err) {
      console.error(`Error updating ${docId}:`, err);
    }
  }
}

run();
