const { createClient } = require('@sanity/client');
const crypto = require('crypto');

const client = createClient({
  projectId: 'buc8lir0',
  dataset: 'andres-prod',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skaQuZfNUTTF16qjigWsq7OWgFjEmHfhrfz0LU0sauwPYez0aKPtdBhD0s36Nlx1ubd3XpckSGVCfG6CwSN494sggAFopyTwFcg9liVx2RGrvhxc2wh5ZbqBW2ZplecvQzZEPeEWB6ccDQic0g6wi7n2TFybgnhYNjFLqIkkGq9ma30qCr57'
});

const DEFAULT_PROGRAM_DAYS = [
  {
    dayNumber: 1,
    tag: 'Süsteem',
    title: 'Mõtteviis — Tootmisjuhi roll ja vastutus',
    quote: 'Teen selgeks oma rolli tootmisjuhina — vastutus, mitte ainult kontroll.',
    description: 'Esimesel päeval keskendume tootmisjuhi tegeliku ülesande lahtimõtestamisele. Õpime, kuidas liikuda igapäevasest reaktiivsest "tulekahjude kustutamisest" süsteemse ja proaktiivse arendustöö suunas.',
    fullPoints: [
      'Tootmisjuhi tegelik roll ja strateegiline tähtsus kaasaegses tööstusettevõttes',
      'Kuidas vabaneda igapäevasest operatiivsest kustutustööst süsteemse arenduse kasuks',
      'Efektiivse koostöö mudel tippjuhtkonna, tugiüksuste ja vahetute meeskondadega',
      'Vastutus vs kontroll: kuidas delegeerida ülesandeid ja vastutust tulemuslikult',
      'Tulemusmõõdikute roll meeskonna igapäevasel motiveerimisel ja suunamisel',
      'Kuidas luua avatud, usaldusväärne ja lahendustele orienteeritud tiimikultuur',
      'Peamised vead juhi rolli tõlgendamisel ja kuidas neid teadlikult ennetada',
      'Esimese päeva praktiline harjumus ning selle vahetu käivitamine oma tehases'
    ],
    companyPainTitle: 'Juhtimine toimib tunde pealt, rollid hägusad',
    companyPain: ["Tulemus sõltub üksikisikutest","Juhtimisfunktsioonid kattuvad","Keegi ei vastuta terviku eest"],
    shortSolution: ["Juhtimissüsteem tervikuna praktikas","Lean-Agile sünergia ja kohanemise vajadus","Tootmisjuhi roll ja vastutus vs kontroll"],
    participantWins: 'Kaardistab oma juhtimissüsteemi ja määratleb rolli selles selgelt',
    companyWins: 'Selgem struktuur, kiirem otsustamine, vähem segadust',
    typeLabel: 'Koolituspäev'
  },
  {
    dayNumber: 2,
    tag: 'Voog',
    title: 'Väärtus — Mis on väärtus kliendi silmis',
    quote: 'Hindan tööd kliendi väärtuse prisma kaudu ja näen raiskamist.',
    description: 'Õpime tootmisprotsessi vaatama kliendi silmade läbi. Tuvastame 8 peamist tootmises esinevat raiskamist (Muda) ja mõistame nende mõju ettevõtte kasumlikkusele.',
    fullPoints: [
      'Kliendi vaade tootmisprotsessile: mida klient on tegelikult valmis ostma',
      '8 klassikalist raiskamist (Muda) tootmises ja nende varjatud põhjused',
      'Lisaväärtust loovad vs mitte-lisaväärtust loovad tegevused (VAA vs NVAA)',
      'Raiskamiste kaardistamise ja tuvastamise praktilised tööriistad tsehhi tasandil',
      'Varjatud kadude analüüs ja nende otsene mõju toote omahinnale ja kvaliteedile',
      'Kuidas kaasata operaatoreid ja eesliini töötajaid raiskamiste märkamisse',
      'Praktilised näited ja reaalsed case study-d edukatest raiskamiste vähendamistest',
      'Teise päeva praktiline harjumus ning selle vahetu käivitamine oma tehases'
    ],
    companyPainTitle: 'Planeerimine kaootiline, prioriteedid muutuvad pidevalt',
    companyPain: ["Igapäev on tulekustutamine","Osakonnad ei tööta tervikuna","Tarnekindlus ebastabiilne"],
    shortSolution: ["Kolm juhtimistasandit ühes rütmis","Väärtusvoo nägemine tervikuna","Prioriteetide juhtimine ja tootmisrütm"],
    participantWins: 'Planeerib ja hoiab tootmisrütmi – struktureeritult, mitte intuitiivselt',
    companyWins: 'Vähem tulekustutamist, parem tarnekindlus',
    typeLabel: 'Koolituspäev'
  },
  {
    dayNumber: 3,
    tag: 'Info',
    title: 'Kaardistus — VSM väärtusahela kaardistus',
    quote: 'Kaardistan ühe väärtusvoo samm-sammult (VSM mõtteviis).',
    description: 'Süveneme VSM (Value Stream Mapping) metoodikasse. Õpime kaardistama materjali- ja infovoogu praeguses hetkes ning disainima optimaalsemat tuleviku voolavust.',
    fullPoints: [
      'VSM (Value Stream Mapping) olemus, roll ja vajalikkus protsesside arendamisel',
      'Kuidas valida õiget tooteperet või väärtusvoogu esmaseks kaardistamiseks',
      'Praeguse olukorra kaardi (Current State Map) koostamine samm-sammult',
      'Protsessiaegade, tsükliaegade, seadistusaegade ja ooteaegade mõõtmine tsehhis',
      'Kitsaskohtade (Bottleneck) ja materjali kuhjumise kohtade tuvastamine voos',
      'Tulevikuolukorra kaardi (Future State Map) ja voolavuse visiooni loomine',
      'Juurutus- ja tegevuskava koostamine praegusest seisust tulevikku liikumiseks',
      'Kolmanda päeva praktiline harjumus ning selle vahetu käivitamine oma tehases'
    ],
    companyPainTitle: 'Info ei liigu, eesmärgid jõuavad moonutatult',
    companyPain: ["Otsused tehakse vale info põhjal","Eesmärke tõlgendatakse erinevalt","Palju korduvaid arusaamatusi"],
    shortSolution: ["Toimiv infovoog eri tasanditel","Rollid, vastutused ja mõõdikud paika","Visuaalne juhtimine ja läbipaistvus"],
    participantWins: 'Loob toimiva info liikumise ja selged eesmärgid igal tasandil',
    companyWins: 'Kiirem reageerimine, vähem arusaamatusi',
    typeLabel: 'Koolituspäev'
  },
  {
    dayNumber: 4,
    tag: 'Gemba 1',
    title: 'Visuaal — 5S ja visuaalne juhtimine',
    quote: 'Rakendan ühes tööpiirkonnas 5S põhimõtteid ja visuaalset standardit.',
    description: 'Õpime töökohtade süsteemset organiseerimist 5S metoodika abil ja visuaalsete standardite loomist, et kõrvalekalded oleksid tsehhis koheselt märgatavad.',
    fullPoints: [
      '5S süsteemi olemus ja kõigi 5 sammu rakendamine reaalsetel töökohtadel',
      'Kuidas ületada meeskonna vastupanu ja harjumuste inertsust 5S juurutamisel',
      'Tööriistade, tarvikute ja materjalide visuaalne märgistamine ning paigutus',
      'Punase kaardi (Red Tag) süsteem ja mittevajalike asjade sorteerimise kord',
      'Igapäevased auditi- ja korrashoiurutiinid saavutatud taseme säilitamiseks',
      'Visuaalsed juhtimislauad ja info kiire, reaalajas liikumine tootmisosakonnas',
      'Standardiseeritud 5S kontroll-lehed ja parendustegevuste mõõtmine',
      'Neljanda päeva praktiline harjumus ning selle vahetu käivitamine oma tehases'
    ],
    companyPainTitle: 'Teooriat on – aga kuidas see päriselt välja näeb?',
    companyPain: ["Õpitu ei seostu oma töökeskkonnaga","Protsesside tegelik olek vs ootus segane","Raiskamised on varjatud"],
    shortSolution: ["Väärtusvoog kohapeal ettevõttes","Raiskamiste vaatlus ja kaardistamine","Vestlused töötajate ja juhtidega"],
    participantWins: 'Näeb teoreetilisi kontseptsioone päriselu kontekstis',
    companyWins: 'Objektiivne pilk väljastpoolt, konkreetsed tähelepanekud',
    typeLabel: 'Ettevõttekülastus · Gemba'
  },
  {
    dayNumber: 5,
    tag: 'Raiskamine',
    title: 'Standardid — SOP ja standardiseeritud töö',
    quote: 'Kirjutan või uuendan ühe SOP-i, mis on tiimile päriselt kasutatav.',
    description: 'Keskendume stabiilsuse ja kvaliteedi tagamisele läbi standardite. Loome lihtsad, visuaalsed ja tiimile päriselt kasutatavad standardtöö juhendid (SOP).',
    fullPoints: [
      'Miks on standardiseeritud töö tootmisprotsessi stabiilsuse ja kvaliteedi alus',
      'Kuidas koostada lihtsat, visuaalset ja piltidega SOP-i (Standard Operating Procedure)',
      'Operaatorite ja liinitöötajate kaasamine juhendite ja standardite loomisse',
      'Väljaõpperutiinid ja uute töötajate kiirendatud sisseelamine standardite alusel',
      'Standardhälvete (Anomalies) õige märkamine ja nendest teavitamise kord',
      'Juhendite regulaarne ajakohastamine ning pidev parendustöö meeskonnas',
      'Standardi järgimise auditi läbiviimine ja juhendite elujõulisuse test',
      'Viienda päeva praktiline harjumus ning selle vahetu käivitamine oma tehases'
    ],
    companyPainTitle: 'Kvaliteet kõigub, raiskamised on varjatud',
    companyPain: ["Lahendatakse sümptomeid, mitte põhjuseid","Pudelikaelad korduvad","Varjatud raiskamised söövad ressursse"],
    shortSolution: ["Raiskamiste tuvastamine ja liigitamine","Juurpõhjuste analüüs – 5 miks, Ishikawa","Väärtusloome loogika"],
    participantWins: 'Tuvastab raiskamist, leiab juurpõhjused, parandab protsesse',
    companyWins: 'Vähem kadu, ühtlasem kvaliteet, parem tootlikkus',
    typeLabel: 'Koolituspäev'
  },
  {
    dayNumber: 6,
    tag: 'Standardid',
    title: 'Stabiilsus — 4M meetod ja TPM',
    quote: 'Vaatan ühe masina või protsessi stabiilsust 4M prisma kaudu.',
    description: 'Uurime protsesside stabiilsuse tagamist masinate, materjalide ja meetodite lõikes. Õpime TPM (Total Productive Maintenance) põhimõtteid ja seadmete efektiivsuse mõõtmist.',
    fullPoints: [
      '4M analüüsimeetod: Masin, Materjal, Meetod, Mees (tööjõud/kompetents)',
      'TPM (Total Productive Maintenance) põhimõtted ja nende rakendamine tootmises',
      'OEE (Overall Equipment Effectiveness) arvutamine, analüüs ja tõlgendamine',
      'Autonoomne hooldus: masinaoperaatori roll seadmete hoidmisel ja korrashoiul',
      'Ennetava ja planeeritud hoolduse kavandamine ning juhtimine tsehhis',
      'Kvaliteedikõikumiste ja praagi tekkepõhjuste süsteemne analüüs 4M abil',
      'Kuidas prognoosida ja täielikult ära hoida ootamatuid seadmete seisakuid',
      'Kuuenda päeva praktiline harjumus ning selle vahetu käivitamine oma tehases'
    ],
    companyPainTitle: 'Standardid puuduvad, kompetents sõltub võtmeisikutest',
    companyPain: ["Tulemus varieerub inimesest sõltuvalt","Liiga palju varieeruvust","Teadmised pole dokumenteeritud"],
    shortSolution: ["Standardite loomine, mis püsivad","Kompetentside kaardistamine","Teadmiste jagamine ja dokumenteerimine"],
    participantWins: 'Loob standardid mis püsivad ja arendab meeskonna oskusi',
    companyWins: 'Stabiilsem tulemus, vähem sõltuvust üksikisikutest',
    typeLabel: 'Koolituspäev'
  },
  {
    dayNumber: 7,
    tag: 'Muutus',
    title: 'Probleemid — A3 ja PDCA probleemilahendus',
    quote: 'Formuleerin ühe probleemi A3 struktuuris ja läbin PDCA tsükli mõttes.',
    description: 'Õpime struktureeritud, andmepõhist probleemilahendust. Omandame A3 raporti koostamise ja PDCA (Plan-Do-Check-Act) tsükli rakendamise reaalsel tootmismurel.',
    fullPoints: [
      'PDCA (Plan-Do-Check-Act) ringi katkematu toimimine ja elutähtis roll arengus',
      'A3 probleemilahenduse raporti struktuur, loogika ja täitmine samm-sammult',
      '5 miks (5 Whys) ja Ishikawa (kalasaba) diagrammi tulemuslik kasutamine',
      'Probleemi tõelise juurpõhjuse (Root Cause) eristamine ajutistest sümptomitest',
      'Tõhusate korrigeerivate ja ennetavate tegevuste (Countermeasures) planeerimine',
      'Lahenduste mõju objektiivne hindamine ning uue standardi kehtestamine',
      'Kuidas luua meeskonnas avatud kultuuri, kus probleeme näidatakse hirmuta',
      'Seitsmenda päeva praktiline harjumus ning selle vahetu käivitamine oma tehases'
    ],
    companyPainTitle: 'Muutused ei juurdu ja vanad harjumused naasevad',
    companyPain: ["Algatusi tehakse, aga vana olukord taastub","Inimesed ei võta vastutust","Juht veab kõike ise"],
    shortSolution: ["Muudatuste juhtimise meetodid praktikas","Inimeste kaasamine ja vastutuse andmine","Parendusvõimekuse kasvatamine"],
    participantWins: 'Kaasab inimesi, annab vastutust ja hoiab muutused elus',
    companyWins: 'Püsivad parendused, tugevam meeskonnavõimekus',
    typeLabel: 'Koolituspäev'
  },
  {
    dayNumber: 8,
    tag: 'Gemba 2',
    title: 'Meeskond — Kaizen kultuur ja inimeste areng',
    quote: 'Planeerin ühe arenguvestluse või Kaizen algatuse meeskonnas.',
    description: 'Keskendume inimestele ja tiimi arendamisele. Õpime, kuidas käivitada pideva arengu (Kaizen) ettepanekute süsteem ja motiveerida meeskonda aktiivselt osalema.',
    fullPoints: [
      'Kaizen kultuuri olemus: pidevad igapäevased väikesed sammud suurenemise poole',
      'Kuidas käivitada ja hoida töös tegelikult toimivat ettepanekute süsteemi',
      'Töötajate kaasamine, motiveerimine ja tunnustamine parendustegevustes',
      'Tulemuslike igapäevaste seisu- ja tagasisidekoosolekute (Huddle) läbiviimine',
      'Oskuste maatriksi (Skills Matrix) koostamine ja tiimi risti-koolitamise plaan',
      'Juhi ja meeskonna vahelise usalduse ning avatud dialoogi arendamine tsehhis',
      'Arenguvestluste ja individuaalsete arengukavade sidumine tehase sihtidega',
      'Kaheksanda päeva praktiline harjumus ning selle vahetu käivitamine oma tehases'
    ],
    companyPainTitle: 'Kas 1. külastuse järel on midagi tegelikult muutunud?',
    companyPain: ["Muutuste mõju on ebaselge","Parendusprojektid vajavad tagasisidet","Rakendused võivad olla poolikud"],
    shortSolution: ["Parendusprojektide edenemise vaatlus","Võrdlus 1. gemba tähelepanekutega","Coaching ja suunamine edasiseks"],
    participantWins: 'Saab tagasisidet parendusprojektile ja konkreetsed soovitused',
    companyWins: 'Näeb mõõdetavat progressi, mitte ainult tunnetust',
    typeLabel: 'Ettevõttekülastus · Gemba'
  },
  {
    dayNumber: 9,
    tag: 'Lõpupäev',
    title: 'Süsteem — Rakenduskava, lõputöö ja sertifikaat',
    quote: 'Panen paika 90-päevase rakendusplaani ja teen juhatusele ettekande.',
    description: 'Programmi finaalis seome kõik õpitud päevad ja tööriistad ühtseks tootmissüsteemiks. Koostame isikliku 90-päevase rakenduskava oma tehases kiirete tulemuste toomiseks.',
    fullPoints: [
      'Kuidas siduda eelneva 8 päeva tööriistad terviklikuks, toimivaks tootmissüsteemiks',
      'Isikliku 90-päevase detailse rakenduskava (Action Plan) vormistamine',
      'ROI, rahalise säästu ja mõju kalkuleerimine ettevõtte juhtkonnale esitlemiseks',
      'Muudatuste juhtimise ja juurutamise taktikad ning takistuste ületamine tehases',
      'Programmi lõputöö vormistamine, esitlemine ja teiste juhtide tagasisidestamine',
      'Koolitusprogrammi pidulik lõpetamine, kokkuvõtted ja tunnistuste kätteandmine',
      'Kuidas hoida arengutempot ja pideva parendamise kultuuri pärast koolituse lõppu',
      'Üheksanda päeva praktiline harjumus ja edasise isikliku arenguteekonna valik'
    ],
    companyPainTitle: 'Kuidas teada, kas koolitus tõi tegelikku muutust?',
    companyPain: ["Õpitu on killustatud, tervikpilti pole","Parendusprojektid vajavad lõpetamist","Edasised sammud ebaselged"],
    shortSolution: ["Parendusprojektide esitlemine juhtkonnale","Koolituse kokkuvõte ja reflektsioon","Järgmised sammud ja jätkutugi"],
    participantWins: 'Esitleb parendusprojekti ja saab selge tegevusplaani',
    companyWins: 'Näeb mõõdetavaid tulemusi, saab sisendi edasisteks otsusteks',
    typeLabel: 'Lõpupäev · Esitlused'
  }
];

const mappedDays = DEFAULT_PROGRAM_DAYS.map(day => {
  return {
    _key: crypto.randomBytes(6).toString('hex'),
    _type: 'programDayItem',
    dayNumber: day.dayNumber,
    tag: day.tag,
    title: day.title,
    quote: day.quote,
    description: day.description,
    fullPoints: day.fullPoints,
    companyPainTitle: day.companyPainTitle,
    companyPain: day.companyPain,
    shortSolution: day.shortSolution,
    participantWins: day.participantWins,
    companyWins: day.companyWins,
    typeLabel: day.typeLabel
  };
});

async function run() {
  try {
    // First fetch the mainPage to find the key of programDaysTabs
    const mainPage = await client.getDocument('mainPage');
    if (!mainPage || !mainPage.sections) {
      console.log('mainPage or sections not found');
      return;
    }
    const targetSection = mainPage.sections.find(s => s._type === 'programDaysTabs');
    if (!targetSection) {
      console.log('programDaysTabs section not found in mainPage');
      return;
    }
    
    const res = await client
      .patch('mainPage')
      .set({ [`sections[_key=="${targetSection._key}"].days`]: mappedDays })
      .commit();
      
    console.log('Successfully updated mainPage ProgramDaysTabs!', res._id);
  } catch(e) {
    console.error(e);
  }
}

run();
