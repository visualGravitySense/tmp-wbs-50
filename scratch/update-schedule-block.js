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

const DEFAULT_SCHEDULE = [
  { time: '09:00', title: 'Kogunemine & kohv', desc: 'Hommikukohv, muljed ja saiake' },
  { time: '09:30 – 11:00', title: 'Esimene sessioon', desc: '' },
  { time: '11:00 – 11:15', title: 'Väike paus', desc: '' },
  { time: '11:15 – 12:30', title: 'Teine sessioon', desc: '' },
  { time: '12:30 – 13:00', title: 'Lõuna', desc: 'Restoranis' },
  { time: '13:00 – 14:30', title: 'Kolmas sessioon', desc: '' },
  { time: '14:30 – 14:45', title: 'Väike paus', desc: '' },
  { time: '14:45 – 16:00', title: 'Neljas sessioon', desc: 'Päeva lõpp' }
];

const DEFAULT_MODULES = [
  { num: '01', type: 'normal', week: 'Nädal 42', date: 'Neljapäev, 22.10.2026', details: 'Sissejuhatus LEAN mõtteviisi ja Toyota Tootmissüsteemi (TPS) alustesse. Keskendume väärtusloomele ja raiskamiste tuvastamisele tootmises.' },
  { num: '02', type: 'normal', week: 'Nädal 45', date: 'Neljapäev, 12.11.2026', details: 'Just-In-Time (JIT) ja tõmbesüsteemid. Õpime, kuidas luua voolavust ning vähendada pooltoodangut ja laovarusid.' },
  { num: '03', type: 'special', title: 'Esimene ettevõtte külastus', desc: 'Lepime kokku koolitusel', details: 'Koolituse käigus lepime ühiselt kokku esimese külastatava ettevõtte, et näha TPS põhimõtteid reaalses tootmiskeskkonnas.' },
  { num: '04', type: 'normal', week: 'Nädal 49', date: 'Neljapäev, 10.12.2026', details: 'Jidoka ja sisseehitatud kvaliteet. Kuidas peatada liin probleemi ilmnemisel ja luua veakindlaid (Poka-Yoke) lahendusi.' },
  { num: '05', type: 'normal', week: 'Nädal 2', date: 'Neljapäev, 14.01.2027', details: 'Standardiseeritud töö ja 5S. Uurime, kuidas luua stabiilne, turvaline ja visuaalselt juhitud töökeskkond.' },
  { num: '06', type: 'normal', week: 'Nädal 4', date: 'Neljapäev, 28.01.2027', details: 'Pideva parendamise (Kaizen) kultuur. Kuidas kaasata kogu meeskonda igapäevaste väikeste parenduste tegemisse.' },
  { num: '07', type: 'special', title: 'Teine ettevõtte külastus', desc: 'Lepime kokku koolitusel', details: 'Koolituse käigus lepime ühiselt kokku teise külastatava ettevõtte, et näha TPS põhimõtete toimimist ja juurutamist praktikas.' },
  { num: '08', type: 'normal', week: 'Nädal 8', date: 'Neljapäev, 25.02.2027', details: 'Probleemide lahendamise metoodikad. PDCA tsükkel, A3 raportid ja juurpõhjuste analüüs (näiteks 5 Miks meetod).' },
  { num: '09', type: 'normal', week: 'Nädal 10', date: 'Neljapäev, 11.03.2027', details: 'Programmi kokkuvõte ja edasised sammud. Kuidas tagada muutuste püsivus ja luua ettevõttes jätkusuutlik juhtimissüsteem.' }
];

function generateKey() {
  return crypto.randomBytes(6).toString('hex');
}

async function run() {
  console.log('Fetching koolitusPage document...');
  
  // Try to fetch draft first, fall back to published
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
  const scheduleIndex = sections.findIndex(s => s._type === 'koolitusTrainingScheduleBlock');
  
  if (scheduleIndex === -1) {
    console.error('Could not find koolitusTrainingScheduleBlock inside page sections!');
    process.exit(1);
  }
  
  console.log(`Found schedule block at index ${scheduleIndex}`);
  
  const existingBlock = sections[scheduleIndex];
  
  // Construct the updated block data
  const updatedBlock = {
    ...existingBlock,
    headerTitle: '2026-2027. aasta, koolitusprogramm',
    headerSubtitle: 'Toimub oktoober 2026 kuni märts 2027',
    description1: 'Tootmisjuhtimise 2026-2027. aasta koolitus algab oktoobris 2026 ja kestab kuus kuud kuni märtsini 2027.',
    description2: 'Koolitus toimub näidatud ajakava alusel – varu need päevad juba varakult, et saaksid osaleda kõikidel kohtumistel. Kahe ettevõtete külastuse detailid lepime kokku kursuse alguses.',
    tag1: '140 kalendripäeva',
    tag2: '9 kohtumist',
    dailyScheduleTitle: 'Koolituse päevakava',
    dailyScheduleItems: DEFAULT_SCHEDULE.map(item => ({
      _key: generateKey(),
      time: item.time,
      title: item.title,
      desc: item.desc
    })),
    foodCardText: 'Rikkalik ja maitsev lõunasöök sisaldub koolituse hinnas ning toimub hubases restoranis.',
    infoBannerSub: 'Kohtume Sinuga 9 korral – kokku',
    infoBannerTitle: '64 akadeemilist kontakttundi',
    modules: DEFAULT_MODULES.map(mod => {
      const formatted = {
        _key: generateKey(),
        num: mod.num,
        type: mod.type,
        details: mod.details
      };
      if (mod.type === 'special') {
        formatted.title = mod.title;
        formatted.desc = mod.desc;
      } else {
        formatted.week = mod.week;
        formatted.date = mod.date;
      }
      return formatted;
    }),
    footerNote: '* Muudatustest annan teada.'
  };
  
  console.log('Updating document...');
  
  // Set the modified block in the sections array
  sections[scheduleIndex] = updatedBlock;
  
  // Update the document in Sanity
  // Note: if docId is published "koolitusPage", we want to update/create a draft "drafts.koolitusPage" to be safe and follow Sanity best practices,
  // or we can write directly to the ID we loaded. Let's write directly to the target ID (and if draft exists, we update draft, otherwise we update published/create draft).
  // Actually, creating/patching the draft drafts.koolitusPage is always the safest way in Sanity, then we can publish it.
  
  const targetId = docId.startsWith('drafts.') ? docId : `drafts.${docId}`;
  
  console.log(`Creating/Updating draft: ${targetId}`);
  
  // Load target draft or create it from published if it doesn't exist
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
  
  // Now patch the draft
  await client
    .patch(targetId)
    .set({ sections })
    .commit();
    
  console.log('Draft updated successfully!');
  
  // Now let's publish the draft!
  console.log(`Publishing draft: ${targetId}`);
  const finalDoc = await client.getDocument(targetId);
  const { _id, _createdAt, _updatedAt, _rev, ...publishableData } = finalDoc;
  
  await client.createOrReplace({
    _id: 'koolitusPage',
    ...publishableData
  });
  
  // Delete the draft after publishing to keep it clean, if desired (Sanity does this on publish)
  await client.delete(targetId);
  
  console.log('Successfully published the updated koolitusPage!');
}

run().catch(err => {
  console.error('Execution failed:', err);
  process.exit(1);
});
