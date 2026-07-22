const fs = require('fs');
const file = 'src/components/ProgramDaysTabs.tsx';
let content = fs.readFileSync(file, 'utf8');

const HTML_DATA = [
  { num:1, label:'Süsteem', typeLabel:'Koolituspäev',
    probleem:'Juhtimine toimib tunde pealt, rollid hägusad',
    sümptomid:['Tulemus sõltub üksikisikutest','Juhtimisfunktsioonid kattuvad','Keegi ei vastuta terviku eest'],
    teemad:['Juhtimissüsteem tervikuna praktikas','Lean-Agile sünergia ja kohanemise vajadus','Tootmisjuhi roll ja vastutus vs kontroll'],
    osaleja:'Kaardistab oma juhtimissüsteemi ja määratleb rolli selles selgelt',
    juht:'Selgem struktuur, kiirem otsustamine, vähem segadust'
  },
  { num:2, label:'Voog', typeLabel:'Koolituspäev',
    probleem:'Planeerimine kaootiline, prioriteedid muutuvad pidevalt',
    sümptomid:['Igapäev on tulekustutamine','Osakonnad ei tööta tervikuna','Tarnekindlus ebastabiilne'],
    teemad:['Kolm juhtimistasandit ühes rütmis','Väärtusvoo nägemine tervikuna','Prioriteetide juhtimine ja tootmisrütm'],
    osaleja:'Planeerib ja hoiab tootmisrütmi – struktureeritult, mitte intuitiivselt',
    juht:'Vähem tulekustutamist, parem tarnekindlus'
  },
  { num:3, label:'Info', typeLabel:'Koolituspäev',
    probleem:'Info ei liigu, eesmärgid jõuavad moonutatult',
    sümptomid:['Otsused tehakse vale info põhjal','Eesmärke tõlgendatakse erinevalt','Palju korduvaid arusaamatusi'],
    teemad:['Toimiv infovoog eri tasanditel','Rollid, vastutused ja mõõdikud paika','Visuaalne juhtimine ja läbipaistvus'],
    osaleja:'Loob toimiva info liikumise ja selged eesmärgid igal tasandil',
    juht:'Kiirem reageerimine, vähem arusaamatusi'
  },
  { num:4, label:'Gemba 1', typeLabel:'Ettevõttekülastus · Gemba',
    probleem:'Teooriat on – aga kuidas see päriselt välja näeb?',
    sümptomid:['Õpitu ei seostu oma töökeskkonnaga','Protsesside tegelik olek vs ootus segane','Raiskamised on varjatud'],
    teemad:['Väärtusvoog kohapeal ettevõttes','Raiskamiste vaatlus ja kaardistamine','Vestlused töötajate ja juhtidega'],
    osaleja:'Näeb teoreetilisi kontseptsioone päriselu kontekstis',
    juht:'Objektiivne pilk väljastpoolt, konkreetsed tähelepanekud'
  },
  { num:5, label:'Raiskamine', typeLabel:'Koolituspäev',
    probleem:'Kvaliteet kõigub, raiskamised on varjatud',
    sümptomid:['Lahendatakse sümptomeid, mitte põhjuseid','Pudelikaelad korduvad','Varjatud raiskamised söövad ressursse'],
    teemad:['Raiskamiste tuvastamine ja liigitamine','Juurpõhjuste analüüs – 5 miks, Ishikawa','Väärtusloome loogika'],
    osaleja:'Tuvastab raiskamist, leiab juurpõhjused, parandab protsesse',
    juht:'Vähem kadu, ühtlasem kvaliteet, parem tootlikkus'
  },
  { num:6, label:'Standardid', typeLabel:'Koolituspäev',
    probleem:'Standardid puuduvad, kompetents sõltub võtmeisikutest',
    sümptomid:['Tulemus varieerub inimesest sõltuvalt','Liiga palju varieeruvust','Teadmised pole dokumenteeritud'],
    teemad:['Standardite loomine, mis püsivad','Kompetentside kaardistamine','Teadmiste jagamine ja dokumenteerimine'],
    osaleja:'Loob standardid mis püsivad ja arendab meeskonna oskusi',
    juht:'Stabiilsem tulemus, vähem sõltuvust üksikisikutest'
  },
  { num:7, label:'Muutus', typeLabel:'Koolituspäev',
    probleem:'Muutused ei juurdu ja vanad harjumused naasevad',
    sümptomid:['Algatusi tehakse, aga vana olukord taastub','Inimesed ei võta vastutust','Juht veab kõike ise'],
    teemad:['Muudatuste juhtimise meetodid praktikas','Inimeste kaasamine ja vastutuse andmine','Parendusvõimekuse kasvatamine'],
    osaleja:'Kaasab inimesi, annab vastutust ja hoiab muutused elus',
    juht:'Püsivad parendused, tugevam meeskonnavõimekus'
  },
  { num:8, label:'Gemba 2', typeLabel:'Ettevõttekülastus · Gemba',
    probleem:'Kas 1. külastuse järel on midagi tegelikult muutunud?',
    sümptomid:['Muutuste mõju on ebaselge','Parendusprojektid vajavad tagasisidet','Rakendused võivad olla poolikud'],
    teemad:['Parendusprojektide edenemise vaatlus','Võrdlus 1. gemba tähelepanekutega','Coaching ja suunamine edasiseks'],
    osaleja:'Saab tagasisidet parendusprojektile ja konkreetsed soovitused',
    juht:'Näeb mõõdetavat progressi, mitte ainult tunnetust'
  },
  { num:9, label:'Lõpupäev', typeLabel:'Lõpupäev · Esitlused',
    probleem:'Kuidas teada, kas koolitus tõi tegelikku muutust?',
    sümptomid:['Õpitu on killustatud, tervikpilti pole','Parendusprojektid vajavad lõpetamist','Edasised sammud ebaselged'],
    teemad:['Parendusprojektide esitlemine juhtkonnale','Koolituse kokkuvõte ja reflektsioon','Järgmised sammud ja jätkutugi'],
    osaleja:'Esitleb parendusprojekti ja saab selge tegevusplaani',
    juht:'Näeb mõõdetavaid tulemusi, saab sisendi edasisteks otsusteks'
  }
];

const startIdx = content.indexOf('const DEFAULT_PROGRAM_DAYS: ProgramDay[] = [');
const endIdx = content.indexOf('export default function ProgramDaysTabs(');
if (startIdx === -1 || endIdx === -1) {
  console.log("Could not find delimiters.");
  process.exit(1);
}
const existingArrayText = content.substring(startIdx, endIdx);

let newArrayText = existingArrayText;
HTML_DATA.forEach(day => {
  const dayStrRegex = new RegExp(`dayNumber:\\s*${day.num},[\\s\\S]*?fullPoints:\\s*\\[[\\s\\S]*?\\]\\n\\s*\\}`, 'g');
  newArrayText = newArrayText.replace(dayStrRegex, (match) => {
    let replaced = match.replace(/tag:\s*'[^']*'/, `tag: '${day.label}'`);
    replaced = replaced.substring(0, replaced.length - 2); // remove newline and }
    replaced += `,
    companyPainTitle: '${day.probleem.replace(/'/g, "\\'")}',
    companyPain: ${JSON.stringify(day.sümptomid)},
    shortSolution: ${JSON.stringify(day.teemad)},
    participantWins: '${day.osaleja.replace(/'/g, "\\'")}',
    companyWins: '${day.juht.replace(/'/g, "\\'")}',
    typeLabel: '${day.typeLabel}'
  }`;
    return replaced;
  });
});

content = content.replace(existingArrayText, newArrayText);
fs.writeFileSync(file, content);
console.log("Updated successfully!");
