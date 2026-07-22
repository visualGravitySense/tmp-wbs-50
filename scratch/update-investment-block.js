const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

function generateKey() {
  return crypto.randomBytes(6).toString('hex');
}

async function run() {
  console.log('Fetching koolitusPage document...');
  
  let docId = 'drafts.koolitusPage';
  let doc = await client.getDocument(docId);
  
  if (!doc) {
    console.log('No draft found, fetching published koolitusPage...');
    docId = 'koolitusPage';
    doc = await client.getDocument(docId);
  }
  
  if (!doc) {
    console.error('Could not find koolitusPage document!');
    process.exit(1);
  }
  
  console.log(`Found document: ${doc._id} (rev: ${doc._rev})`);
  
  const sections = doc.sections || [];
  const investmentIndex = sections.findIndex(s => s._type === 'koolitusInvestmentBlock');
  
  if (investmentIndex === -1) {
    console.error('Could not find koolitusInvestmentBlock inside page sections!');
    process.exit(1);
  }
  
  console.log(`Found investment block at index ${investmentIndex}`);
  
  const existingBlock = sections[investmentIndex];
  
  // Construct the updated block data
  const updatedBlock = {
    ...existingBlock,
    investmentSection: {
      eyebrow: 'Investeering',
      title: 'Mida saad ',
      titleHighlight: 'tagasi?',
      contemplationQuestion: 'Mis olukord on sinu tootmises 12 kuu pärast, kui sa jätkad praegusel viisil?',
      contemplationLabel: 'Mõtle hetkeks:',
      benefitsTitle: 'Harjumuste omandamise hind sisaldab:',
      benefits: [
        {
          _key: generateKey(),
          title: '9-päevane intensiivprogramm (72 ak.h)',
          subtitle: '3 moodulit, visiidid tehastesse, reaalne praktika',
          isHidden: false
        },
        {
          _key: generateKey(),
          title: 'Personaalsed arenguülesanded',
          subtitle: 'Sinu tehase probleemide lahendamine koolituse käigus',
          isHidden: false
        },
        {
          _key: generateKey(),
          title: 'Lõputunnistus ja LEAN-praktiku märk',
          subtitle: 'Eesti Kvaliteediühingu poolt tunnustatud tase',
          isHidden: false
        }
      ],
      price: 1490,
      priceDaily: '= 166 € päevas',
      priceReframe: 'Vähem kui üks koosolekupäev sinu ettevõttes. Tagastatav kui programm ei vasta lubatule.',
      roiCalculator: {
        label: 'Arvuta tasuvus kiiresti:',
        sizes: [
          {
            _key: generateKey(),
            label: '10 töötajat',
            sublabel: '~40k/kuu',
            result: '€48 000'
          },
          {
            _key: generateKey(),
            label: '50 töötajat',
            sublabel: '~200k/kuu',
            result: '€240 000'
          },
          {
            _key: generateKey(),
            label: '100+ töötajat',
            sublabel: '~400k/kuu',
            result: '€480 000'
          }
        ],
        defaultResult: '€48 000'
      },
      guarantee: {
        text: 'Kui sa 30 päeva jooksul ei näe praktilist väärtust, aitame sul koostada rakendusplaani tasuta.'
      },
      primaryButtonText: 'Registreeru koolitusele',
      secondaryButtonText: 'Küsi pakkumist meeskonnale',
      peerProof: {
        avatarInitials: ['A', 'M', 'K', 'S'],
        text: 'Sertifitseeritud',
        highlight: '150+ tootmisjuhti'
      },
      contactInfo: {
        text: 'Või võta ühendust otse:',
        phone: '+3725138403',
        email: 'andreskase@tootmisjuhtimine.ee'
      },
      backgroundColor: 'bg-[rgb(var(--bg-primary))]'
    }
  };
  
  console.log('Updating document...');
  sections[investmentIndex] = updatedBlock;
  
  const targetId = docId.startsWith('drafts.') ? docId : `drafts.${docId}`;
  console.log(`Creating/Updating draft: ${targetId}`);
  
  let draftDoc = await client.getDocument(targetId);
  if (!draftDoc) {
    console.log(`Draft does not exist, creating it from published document: ${docId}`);
    const { _id, _createdAt, _updatedAt, _rev, ...publishedData } = doc;
    draftDoc = {
      _id: targetId,
      ...publishedData
    };
    await client.createOrReplace(draftDoc);
  }
  
  await client
    .patch(targetId)
    .set({ sections })
    .commit();
    
  console.log('Draft updated successfully!');
  
  console.log(`Publishing draft: ${targetId}`);
  const finalDoc = await client.getDocument(targetId);
  const { _id, _createdAt, _updatedAt, _rev, ...publishableData } = finalDoc;
  
  await client.createOrReplace({
    _id: 'koolitusPage',
    ...publishableData
  });
  
  await client.delete(targetId);
  console.log('Successfully published the updated koolitusPage!');
}

run().catch(err => {
  console.error('Execution failed:', err);
  process.exit(1);
});
