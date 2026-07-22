const { createClient } = require('@sanity/client');
const crypto = require('crypto');

const client = createClient({
  projectId: 'buc8lir0',
  dataset: 'andres-prod',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skaQuZfNUTTF16qjigWsq7OWgFjEmHfhrfz0LU0sauwPYez0aKPtdBhD0s36Nlx1ubd3XpckSGVCfG6CwSN494sggAFopyTwFcg9liVx2RGrvhxc2wh5ZbqBW2ZplecvQzZEPeEWB6ccDQic0g6wi7n2TFybgnhYNjFLqIkkGq9ma30qCr57'
});

const DEFAULT_OPSTAR_FRAMEWORK_PARTS = [
  {
    code: 'OP',
    fullTitle: 'Operatsioonide juhtimine',
    explanation:
      'Fokusseerib igapäevast protsessijuhtimist, põhjalikkust ja detailide panustamist — et tootmine toimiks stabiilselt ja ennustatavalt.',
    painQuote:
      'Tunnen, et põrand hoiab mind kinni ja tulekahju kustutamine võtab kogu aja.',
    ctaText: 'Vaata koolitust',
    ctaHref: '/koolitus',
  },
  {
    code: 'ST',
    fullTitle: 'Strateegiline juhtimine',
    explanation:
      'Loob nägemuse, plaani ja tegevused, mis seovad strateegia igapäevase tööga — et iga otsus läheks samas suunas.',
    painQuote: 'Meil on plaanid laual, aga reaalsus ja prioriteedid ei klapi.',
    ctaText: 'Loe blogist',
    ctaHref: '/blog',
  },
  {
    code: 'AR',
    fullTitle: 'Areng ja vastutus',
    explanation:
      'Pühendumine, vastutus ja hoolimine inimestest — et meeskond kasvaks ja otsustaks julgemalt.',
    painQuote: 'Inimesed teevad tööd, aga motivatsioon ja vastutus puuduvad.',
    ctaText: 'Võta ühendust',
    ctaHref: '/kontakt',
  },
  {
    code: 'PRO',
    fullTitle: 'Professionaalsus',
    explanation:
      'Teadmine, oskused ja faktid otsuste aluseks — et juhtimine põhineks andmetel, mitte tunnetel.',
    painQuote: 'Otsused põhinevad kogemusel ja intuitsioonil, mitte mõõdetavatel andmetel.',
    ctaText: 'Vaata koolitust',
    ctaHref: '/koolitus',
  },
  {
    code: 'FIT',
    fullTitle: 'Integreeritus ja sobivus',
    explanation:
      'Sobivus, sidusus ja seostatus organisatsioonis — et muutused jõuaksid kõikidesse osakondadesse.',
    painQuote: 'Projektid toimivad ühes tiimis, aga teised osakonnad ei ole kaasatud.',
    ctaText: 'Loe blogist',
    ctaHref: '/blog',
  },
  {
    code: 'PROFIT',
    fullTitle: 'Kasum ja jätkusuutlikkus',
    explanation:
      'Väärtus, kasv ja jätkusuutlik areng — et investeering tootmisse toob mõõdetava tulemuse.',
    painQuote: 'Investeerime muutustesse, aga kasumi kasvu ei näe.',
    ctaText: 'Võta ühendust',
    ctaHref: '/kontakt',
  },
];

const mappedParts = DEFAULT_OPSTAR_FRAMEWORK_PARTS.map(part => {
  return {
    _key: crypto.randomBytes(6).toString('hex'),
    code: part.code,
    fullTitle: part.fullTitle,
    explanation: part.explanation,
    painQuote: part.painQuote,
    ctaText: part.ctaText,
    ctaHref: part.ctaHref
  };
});

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
      const targetSection = doc.sections.find(s => s._type === 'opstarFrameworkBlock');
      if (!targetSection) {
        console.log(`opstarFrameworkBlock not found in ${docId}.`);
        continue;
      }
      
      const patchPath = `sections[_key=="${targetSection._key}"].framework`;
      console.log(`Patching ${docId} framework block at path ${patchPath}...`);
      
      const res = await client
        .patch(docId)
        .set({
          [`${patchPath}.eyebrow`]: "Raamistik",
          [`${patchPath}.title`]: "OPSTAR PROFIT™ — kuus osa",
          [`${patchPath}.subtitle`]: "Iga osa vastab konkreetsele juhtimisvalule ja viib sind lahenduseni.",
          [`${patchPath}.parts`]: mappedParts
        })
        .commit();
        
      console.log(`Successfully updated framework block in ${docId}!`);
    } catch (err) {
      console.error(`Error updating ${docId}:`, err);
    }
  }
}

run();
