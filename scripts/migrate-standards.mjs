import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'buc8lir0',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'andres-prod',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

// Function to generate a random key for Sanity blocks
const randomKey = () => Math.random().toString(36).substring(2, 10)

// Helper to quickly generate strong marks
const strongMark = (text) => {
  const mKey = 'strong1';
  return {
    children: [
      { _type: 'span', _key: randomKey(), text: text.split(':')[0] + ': ', marks: [mKey] },
      { _type: 'span', _key: randomKey(), text: text.split(':')[1], marks: [] }
    ],
    markDefs: []
  }
}

const portableTextPayload = [
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h2',
    children: [{ _type: 'span', _key: randomKey(), text: 'Info osalejatele ja tööandjatele', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomKey(), text: 'Lean tootmisjuhtimise koolitus: praktilised õppematerjalid, tehasekülastused ja seminarid Viljandis – koolitaja Andres Kase', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [
      { _type: 'span', _key: randomKey(), text: 'Tööandja saab töötajate koolitamiseks valida ', marks: [] },
      { _type: 'span', _key: randomKey(), text: 'täiskasvanute koolituse seadusele', marks: ['link1'] },
      { _type: 'span', _key: randomKey(), text: ' vastava täienduskoolituse või kui koolitusturul sobivat koolitust ei pakuta, tellida sobiva õppekavaga koolituse. Koolituse õppekava peab vastama ', marks: [] },
      { _type: 'span', _key: randomKey(), text: 'täienduskoolituse standardile', marks: ['link2'] },
      { _type: 'span', _key: randomKey(), text: ' ning koolituse lõpus peavad osalejad saama tunnistuse või tõendi koolituse läbimise kohta.', marks: [] }
    ],
    markDefs: [
      { _type: 'link', _key: 'link1', href: 'https://www.riigiteataja.ee/akt/110062015010?leiaKehtiv' },
      { _type: 'link', _key: 'link2', href: 'https://www.riigiteataja.ee/akt/126062015009?leiaKehtiv' }
    ]
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomKey(), text: 'Tööandjatel on võimalus taotleda toetust, mis on maksimaalselt kuni 80% koolituskuludest, kuid mitte üle 2500 euro töötaja kohta. Toetusmeede, mis võib sobida, on töötajate koolitamine muutuste olukorras.', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [
      { _type: 'span', _key: randomKey(), text: 'Töötajate koolitamise kohta muutunud olukorras uuri lisaks töötukassa ', marks: [] },
      { _type: 'span', _key: randomKey(), text: 'kodulehelt.', marks: ['link3'] }
    ],
    markDefs: [
      { _type: 'link', _key: 'link3', href: 'https://www.tootukassa.ee/et/teenused/tooandjatele/koolitustoetus-tooandjatele-muutuste-olukorras' }
    ]
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text: 'Võid lähemalt küsida ka minu käest.', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [
      { _type: 'span', _key: randomKey(), text: 'Allikas: ', marks: [] },
      { _type: 'span', _key: randomKey(), text: 'töötukassa.ee', marks: ['link4'] }
    ],
    markDefs: [
      { _type: 'link', _key: 'link4', href: 'https://www.tootukassa.ee/et/teenused/tooandjatele/koolitustoetus-tooandjatele' }
    ]
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h2',
    children: [{ _type: 'span', _key: randomKey(), text: 'Opstar Profit Lean-Agile tootmisjuhtimise täiendkoolituse õppekava', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomKey(), text: 'Lean-Agile Tootmisjuhtimise täiendkoolitus kombineerib teoreetilisi teadmisi, praktilisi oskusi strateegilise, taktikalise planeerimise (nõudlusest tulenevalt), kui ka operatiivtasandi igapäevatöö tõhusa teostamise asjus – Tagamaks pikaajaline järjepidevus ja tulemuslikkus. Seome eesmärgi, inimhinge, protsessid, logistika ja seadmed, kui ka digitaalse maailma.', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [
      { _type: 'span', _key: randomKey(), text: 'Õppekava nimetus: ', marks: ['strong1'] },
      { _type: 'span', _key: randomKey(), text: 'Lean-Agile Tootmisjuhtimine', marks: [] }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [
      { _type: 'span', _key: randomKey(), text: 'Õppekavarühm: ', marks: ['strong1'] },
      { _type: 'span', _key: randomKey(), text: 'Juhtimine ja haldus', marks: [] }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Õpiväljundid. Osaleja, kes koolituse läbib:', marks: [] }],
    markDefs: []
  },
  ...[
    "Mõistab ettevõtte ärilisi eesmärke ja motiive, strateegilise, taktikalise ja operatiivtasandi juhtimise eesmärke, seoseid ja olulisust",
    "Omandab individuaalseid-organisatoorseid oskuseid ja hoiakuid organiseerituse, süsteemsuse, efektiivsuse osas.",
    "Mõistab juhtimissüsteemi ja süsteemse juhtimise eesmärki, olemust, vajalikkust ning oma rolli tähenduslikkust",
    "Õpib tundma operatsioonide ja üldiseid juhtimise funktsioone ja nende omavahelist koostoimet",
    "Õpib tundma tarneahela-, protsesside juhtimise ja organisatsiooni struktuuri, rollide ülesannete ja vastutuse sidusust",
    "Mõistab ja väärtustab väärtusloome olulisust ettevõttele ja tunneb peamisi raiskamisi, oskab neid elimineerida",
    "Teab ja tunneb Lean ja agiilse juhtimise olemust ja tööriistu, oskab neid rakendada oma rolliga seonduvalt",
    "Teab ja tunneb tootmiskorralduse, tootmissüsteemi olemust, eesmärki ja funktsioone"
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Tootmisjuhtimise täiendkoolituse õpingute alustamise tingimused:', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomKey(), text: 'Lean-Agile Tootmisjuhtimise täiendkoolitus on suunatud erineva taseme spetsialistidele ja/või juhtidele või juhiks pürgivatele spetsialistidele. Koolitus sobib ettevõtte kesk- ja operatiivtasandi juhtidele ja mikro-, väikeste- ja keskmise suurusega ettevõtete meistritele, tootmisjuhtidele, /-juhtidele, eestöölistele. Koolitus sobib ahela teistele võtmeisikutele nagu kvaliteedijuhid, ostujuhid, laojuhid, projektijuhid, protsessiinsenerid, jne. Koolitus sobib organisatsiooni erinevatele ametitele ja rollidele, sest arendab operatsioonide juhtimise (tööde tõhus ja tulemuslik korraldamine) teadmisi ja kompetentse.', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Tootmisjuhtimise täiendkoolitusel osalejale on oluline:', marks: [] }],
    markDefs: []
  },
  ...[
    "Omada teoreetilisi teadmisi ja/või töökogemust teenindus- või tootmisettevõttes (tootmises, laos, kontoris, mõnes teises osakonnas).",
    "Kasuks tuleb kokkupuude ja kogemus tootmisjuhtimisega, laojuhtimisega, kvaliteedijuhtimisega, müügijuhtimisega või mõne teise juhtimisfunktsiooniga.",
    "Kasuks tuleb arusaam ettevõtte töökorraldusest ja juhtimisest üldiselt.",
    "Koolituse õppekeskkond asub internetis, sellest tulenevalt on osalejale vajalik e-maili ja interneti olemasolu, et esitada iseseisvaid töid ja võimaldada vajadusel individuaalse parendusprojekti juhendamine koolitaja poolt.",
    "Koolitus viiakse läbi eesti keeles, seega on oluline, et osaleja saab aru ja oskab ennast eesti keeles piisavalt selgelt väljendada.",
    "Koolitusel osalemise tingimuseks on ka registreerumine koolitusele ja õppemaksu tasumine enne koolituse algust."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Tootmisjuhtimise täiendkoolituse kontakttundide maht on 64 akadeemilist tundi, millest teoreetiline 48 ja praktiline 16 tundi(ettevõtete külastused) + iseseisvad tööd ja individuaalne parendusprojekt. Hinnanguline maht 32 akadeemilist tundi. Koolituse kogumaht koos iseseisva tööga on orienteeruvalt 96 akadeemilist tundi. Koolitus sisaldab järgmisi teemasid:', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [
      { _type: 'span', _key: randomKey(), text: "1. „OPSTAR PROFIT“ lähenemine. Süsteemne Juhtimine = Juhtimissüsteem.\n2. Miks LEAN ja AGILE? Millest tegelikult räägime – Eesti keeles.\n3. Tootmiskorraldus strateegilisel, taktikalisel, operatiivsel tasandil.\n4. Tootmissüsteemide ülevaade. LEAN tootmissüsteem, Toyota tootmissüsteem(TPS), jt.\n5. Nõudluse- ja tarneahela juhtimine – sidusus organisatsiooni tootmissüsteemiga, struktuuriga.\n6. Parendusvaldkonna kaardistamine, individuaalse parendusprojekti eesmärgid, võtmemõõdikute valimine.\n7. HOSHIN planeerimine – Fookus eesmärgile ja fookus tegudel. Meede parendusprojekti jälgimiseks.\n8. Väärtusahela juhtimine ja kaardistamine – Value Stream Mapping.\n9. Nõudluspõhine tootmine ja varude väle juhtimine, varud tootmises.\n10. Parasiitlikud muidusööjad väärtusahelas. Eesti mõistes „kolm koera“ – Muri, Mura, Muda!\n11. 7+1 Raiskamist meie sees ja ümber – lihtsad lähtekohad muutuseks.\n12. 5S korra loomise ja tagamise süsteem – töökohal, juhtide peas, laual, mujal.\n13. VUMAT – Vaadake, Uurige, Modelleerige, Arutlege, Testige (LAMDA tsükkel)\n14. SMED(Single Minute Exchange of Dies) – Kiire tootevahetus “Ühenumbrilise” minuti jooksul.\n15. JIT, HEIJUNKA, KanBan – Tootmise Tasakaalustamine.\n16. Tootmise planeerimine, kavandamine, üldplaan ja kalenderplaan. Ressursside juhtimine.\n17. KAIZEN – jätkuv parendamine.\n18. TEEME TEHASE. Konkureerivate ettevõtete simulatsioon. Projekteerimisest teostuseni, avatud tööturg – MÄNG.\n19. SÜSTEEMNE JUHTIMINE = TOOTMISJUHTIMINE = INIMHINGE JUHTIMINE\n20. Tootmisjuhtimise tööriistad. Ohutu tootmisjuhtimine. Tootmise tüpiseerimine.\n21. Tootmisstaadiumid, tootmise asendiplaan, tootmisprotsessi kulgemisviisid.\n22. Tootmise – ja juhtimise funktsioonid, rollid, vastutused. Inimlikkus.\n23. Tootmisjuht juhtkonnas. Keskne roll ja vastutus tarneahelas, koostoime.\n24. „TAO seos“ – Tootmisprotsess = Transformatsiooni protsess – Asendiplaan – Organisatsioon\n25. „MOT + L planeerimine“ – Müügijuht, Ostujuht, Tootmisjuht + Logistik\n26. TPM (Total Productive Maintenance). Seadmete tõhus hooldus – Seadmete „5S“ ja OEE praktikas.\n27. Standardtöö ja normeerimine. Pooltoodang, tootmisvõimsus. Töö disain ja tulemuslikkus.\n28. Agiilne ehk kohanev juhtimine – see ongi ÕIGE tootmise juhtimine. Räägime sisust.\n29. Ettevõtte süsteemne ja terviklik suunamine tulemustasustamise abil. Seos võtmemõõdikutega.\n30. Digitaliseerimise võlud ja valud. “Gravitatsioon” ju ei muutu – ka tootmises on oma “füüsika” – digitaliseerimine on süsteemi keskselt toetav ja tõhustav funktsioon. Oska seda õigesti kasutada ja doseerida.\n31. Osalejate individuaalsete projektide esitlused/kaitsimine.", marks: [] }
    ],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Õppekeskkond:', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomKey(), text: 'Õppekeskkond sisaldab teoreetiliste ja praktiliste oskuste omandamiseks vajalikku. Lean-Agile tootmisjuhtimise täiendkoolitus toimub avalikes eraldatud ja selleks spetsiaalselt loodud seminariruumides. Ruum on varustatud toolide, kirjutuslaudade, esitlemise ja selle jälgmiseks vajalikuga. Võimalik teha individuaalset, paaris või ka grupitöid. Laudade grupeerimise ja hajutatuse võimalused. Pausid toimuvad selleks eraldi loodud puhkenurgas ja pakutakse teed, kohvi, vett. Lõunapaus sisaldab võimalusi supile, praele ja magustoidule, vastavalt osaleja enda soovile. Lõuna tagab koolituse korraldaja. Koolitaja varustab osaleja paberi, kirjutusvahendite ja vajalike õppematerjalidega (trükitud ja digitaalselt).', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Õppematerjalid:', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomKey(), text: 'Koolitusel antakse trükitud ja/või digitaalsed õppematerjalid. Õppematerjal sisaldab koolitaja koostatud ja värviliselt trükitud brošüür “Tulemuslik Tootmine – 5S süsteemi juurutamine” ja trükitud slaidimaterjale. Mõlemad on saadaval ka digitaalselt. Õppematerjalide hulgas on individuaalseks ja rühmatööks vajalikud juhised, materjalid. Lisaks pakub koolitaja mitmeid elektroonilisi koolituse teemadega seotud töölehti ja -vorme.', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Lõpetamise tingimused ja väljastatavad dokumendid:', marks: [] }],
    markDefs: []
  },
  ...[
    "Koolituse läbimise ja lõpetamise tingimusteks on õpiväljunditel baseeruva individuaalse parendusprojekti koostamine ja esitlemine ning koolituskulude tasumine.",
    "Koolituse läbimisel väljastatakse osalejale tunnistus.",
    "Osalejale, kes ei koosta ja ei esitle individuaalset parendusprojekti, väljastatakse soovi korral koolitusel läbituks loetud teemade kohta tõend."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Koolituse läbiviimiseks vajaliku kvalifikatsiooni, õpi- või töökogemuse kirjeldus:', marks: [] }],
    markDefs: []
  },
  ...[
    "Tootmisjuhtimise täiendkoolituse koostaja ja koolitaja on Andres Kase, kes omab pikaajalist, ainulaadselt terviklikku teadmiste ja praktilise kogemuse pagasit tootmis- ja tööstusjuhtimise alal.",
    "Omades kogemust ja tundes põhjalikult organisatsiooni toimet, juhtimist, LEAN tootmist, kui ka “mitte LEAN” tootmist, teab, mis on tegelikult õige “ravim” ja kuidas organisatsiooni arendada.",
    "LEAN’ga kokkupuude alates 2003. aastast. Rakendanud aastakümnete jooksul mitmes suuremas tehases nii spetsialisti, kesk-, kui ka tippjuhina.",
    "Üle 25 aasta praktilist tootmis- ja tööstusjuhtimist, mille osaks on alati teenus ja teenindusjuhtimine, sest tööstust ilma ei turunda.",
    "15 aastat tootmis-, operatsioonide juhtimise ja tööstusnormeerimise loenguid Eesti Ettevõtluskõrgkoolis Mainor.",
    "Tootmisprotsesside välja töötamise ja arendamise, tootmistehnika aluste ja LEAN juhtimise loengud Tallinna Tehnikakõrgkoolis.",
    "Alates 2014 aastast operatsioonide juhtimise, süsteemse juhtimise koolitusi ja praktilist nõustamist tööstus- ja tootmisettevõtetele. Täiskasvanute koolitus.",
    "2022, 2023 ja 2024 (kokku kolm aastat) tootmisjuhtimise teabevara partner ja toimetaja Äripäevas.",
    "2026. Tallinna Tehnikaülikooli Virumaa kolledži külalislektor magistriõppes „Jätkusuutlik tööstus“ õppekaval, aine „Kvaliteedijuhtimine tööstuses“.",
    "Koolitaja ainulaadne ja praktiline kogemus seisneb teooria ja praktika tasakaalustatud sidususes. Lisaks koolitamisele on koolitaja põhitegevuseks ettevõtete juhtimise süstematiseerimine, tööstuse praktiline nõustamine, juhtimisteenuse osutamine.",
    "Koolitaja omab kogemust nii toiduaine-, elektroonika-, metalli-, puidutööstusest ja ka teistest valdkondadest, k.a teenindusest."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomKey(), text: 'Koolitaja Andres Kase CV Eesti Teadusinfosüsteemis →', marks: ['link5'] }],
    markDefs: [{ _type: 'link', _key: 'link5', href: 'https://www.etis.ee/CV/Andres_Kase/est' }]
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    children: [{ _type: 'span', _key: randomKey(), text: 'Koolitaja Andres Kase LinkedIn profiil →', marks: ['link6'] }],
    markDefs: [{ _type: 'link', _key: 'link6', href: 'https://www.linkedin.com/in/andres-kase-a93352b/' }]
  },
  {
    _type: 'ctaButton',
    _key: randomKey(),
    label: 'Tutvun koolitusega täpsemalt',
    href: '/koolitus'
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h2',
    children: [{ _type: 'span', _key: randomKey(), text: 'Koolituse õppekorralduse alused', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Täienduskoolitusele vastuvõtu ja koolituselt väljaarvamise tingimused ja kord', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text: 'Koolitusele saab registreeruda koolituse kodulehel sätestatud korra alusel kasutades mugavat registreerimisvormi.', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [
      { _type: 'span', _key: randomKey(), text: 'Registreeruda saab ka telefoni 5138403 ja e-kirja ', marks: [] },
      { _type: 'span', _key: randomKey(), text: 'andreskase@tootmisjuhtimine.ee', marks: ['link7'] },
      { _type: 'span', _key: randomKey(), text: ' teel.', marks: [] }
    ],
    markDefs: [{ _type: 'link', _key: 'link7', href: 'mailto:andreskase@tootmisjuhtimine.ee' }]
  },
  ...[
    "Peale vormikohast registreerumist saab osaleja koheselt kinnituse ja esmase teabe toimumisaegade kohta.",
    "Vajadusel täpsustab koolitaja osaleja tausta, sobivust ja valmidust e-kirja või telefoni teel.",
    "Koolituse toimumisajad on algselt määratud kalendris nädala täpsusega. Täpsed kuupäevad selguvad orienteeruvalt 2-4 nädalat enne koolituse algselt määratud algust.",
    "Registreerumisega kinnitab osaleja oma osalemissoovi ja tagab kohabroneeringu koolitusele",
    "Koolituskoha kinnitus tuleb koolitajalt 48 tunni jooksul peale registreerumist, lõplik kinnitus eeldab koolituse eest tasumist 7-14 päeva enne koolituse tegelikku algust.",
    "Grupp avatakse minimaalselt 5 osalejaga ja grupi optimaalseks suuruseks on 14 osalejat. Koolitajal on õigus gruppi suurendada kuni 18 osalejani ja lisada grupi suurusest tingitult üks lisapäev. Päeva lisandumisel osalustasu ei muutu.",
    "Koolitusest loobumise puhul ja mitte lõpetamise puhul osalejale tunnistust ei väljastata. Soovi korral väljastatakse läbitud teemade kohta loetelu ja tõend.",
    "Kui osaleja lõpetab koolituse distantsilt ja see vastab nõutud tingimustele, väljastab koolitaja osalejale tunnistuse.",
    "Koolituselt puudumine on vabatahtlik ja heas usus poolte kokkuleppel. Olenevalt osaleja senisest haridusest, töökogemusest ja võimekusest on tal võimalik koolitus lõpetada vaatamata koolituselt puudumisele. Lõpliku otsuse teeb koolitaja.",
    "Koolituse läbimise ja lõpetamise tingimusteks on õpiväljunditel baseeruva individuaalse parendusprojekti koostamine ja esitlemine ning koolituskulude tasumine.",
    "Koolituse läbimisel väljastatakse osalejale tunnistus.",
    "Osalejale, kes ei koosta ja ei esitle individuaalset parendusprojekti, väljastatakse soovi korral koolitusel läbituks loetud teemade kohta tõend."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Õppetasu maksmise, sellest vabastamise ja selle tagastamise tingimused ja kord', marks: [] }],
    markDefs: []
  },
  ...[
    "Õppetasu tuleb tasuda esitatud arve alusel enne koolituse algust. Arve esitatakse registreerimisel avaldatud andmete alusel.",
    "Arve esitatakse peale registreerimist, aga mitte varem, kui 1 kuni 4 nädalat enne koolituse tegelikku algust. Arve tasumist oodatakse enne koolituse algust.",
    "Koolitusest loobumise soovi korral enne koolitust, tuleb sellest esimesel võimalusel koolitajat teavitada. Kui arve on tasutud, on võimalik taotleda raha täielikku või osalist tagastamist.",
    "Loobumise puhul otsime esimese võimalusena osalemist järgmisel sarnasel koolitusel.",
    "Loobumise puhul 4 nädalat enne koolitust ja arve tasumisel, summa tagastatakse.",
    "Loobumise puhul 2-4 nädalat enne koolitust tagastatakse summast 50%. Kui koht on võimalik täita ootel osalejaga, siis 100%.",
    "Loobumise puhul vähem, kui 2 nädala enne koolitust tagastatakse tasutud summast 20%. Kui koht on võimalik täita ootel osalejaga, siis 100%.",
    "Koolituse katkestamise korral püütakse leida võimalused asendusliikme osalemise osas või koolitusel jätkamist ja kohtade olemasolul tulevikus toimuval sarnasel koolitusel.",
    "Õppemaksus sisalduvad õppematerjalid, koolitusel korraldatavad väljasõidud, lõunad, pausidel pakutav kohv, tee või vesi. Õppemaksu suuruse määrab koolitaja. Koolitajal on õigus õppemaksu muuta. Õppemaksu, mis on osalejaga kokkulepitud, ei muudeta.",
    "Koolituse katkemisel koolitajast tulenevalt tagastatakse õppemaks või lepitakse kokku koolituse jätkumine muul ajal."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Teised õppe korraldamiseks olulised tingimused', marks: [] }],
    markDefs: []
  },
  ...[
    "Koolitus toimub Viljandis, Grand Hotel ruumides.",
    "Koolitusruum ja õppekeskkond sisaldab teoreetiliste ja praktiliste oskuste omandamiseks vajalikku. Täiendkoolitus toimub avalikes eraldatud ja selleks spetsiaalselt loodud seminariruumides.",
    "Koolituse läbimise ja lõpetamise tingimusteks on õpiväljunditel baseeruva individuaalse parendusprojekti koostamine ja esitlemine koolituskulude tasumine.",
    "Koolituse läbimisel väljastatakse osalejale tunnistus.",
    "Osalejale, kes ei koosta ja ei esitle individuaalset parendusprojekti, väljastatakse soovi korral koolitusel läbituks loetud teemade kohta tõend."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [
      { _type: 'span', _key: randomKey(), text: 'Koolituse üldine korraldus ja õppetöö täpsem sisu on eraldi ', marks: [] },
      { _type: 'span', _key: randomKey(), text: 'koolituse lehel.', marks: ['link8'] }
    ],
    markDefs: [{ _type: 'link', _key: 'link8', href: '/koolitus' }]
  },
  ...[
    "Koolitaja peab õppetöös osalemise arvestust.",
    "Tunnistus väljastatakse koolituse lõppedes viimasel kohtumise korral. Kui see pole mingil põhjusel võimalik, lepitakse tunnistuse üleandmine eraldi kokku.",
    "Koolitaja peab väljastatud tunnistuste ja tõendite arvestust digitaalselt.",
    "Õppetööga seotud arusaamatused lahendatakse omavahel vesteldes ja leitakse kokkulepe."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'ctaButton',
    _key: randomKey(),
    label: 'Tutvun koolitusega täpsemalt',
    href: '/koolitus'
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h2',
    children: [{ _type: 'span', _key: randomKey(), text: 'Koolituse kvaliteedi tagamise alused', marks: [] }],
    markDefs: []
  },
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Õppekavade kvaliteedi tagamise tingimused ja kord', marks: [] }],
    markDefs: []
  },
  ...[
    "Tootmisjuhtimise täiendkoolituse koostaja ja koolitaja omab pikaajalist tervikliku teadmiste ja praktilise kogemuse pagasit tootmis- ja tööstusjuhtimise alal.",
    "Täiendkoolituse koostaja omab pikaajalist täiskasvanute koolitamise kogemust ja tegeleb lisaks koolitamisele ka interimjuhtimise ja juhtimiskonsultatsiooniga, mille käigus toimub pidev turuvajadustega tutvumine ja kohanemine.",
    "Eelnevast tulenevalt usub koolitaja, et koolituse sisu vastab jooksva majanduse ja juhtimise vajadustele ning sisaldab parimaid, töötavaid praktikaid. Koolituse sisu panustab pidevale parendusele ja tootlikkusele, seega vastab pidevalt muutuva tööjõuturu vajadustele.",
    "Õppekava täiendatakse jooksvalt ehk pidevalt ajas. Õppekava jooksev sisu ja praktilised näited kohandatakse vastavalt osalevale grupile. Näited ja ülesanded teoreetilised, praktilised tööd on osalejatele jõukohased ja arendavad. Koolitaja tagab juhendamise ka väljaspool auditoorset kohtumist.",
    "Osalejalt küsitakse jooksvalt tagasisidet paberil ja/või elektrooniliselt. Koolitaja arvestab edasiviivate ettepanekutega ja viib sisse muudatused, teavitab ja põhjendab osalejatele."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Koolitajate kvaliteedi tagamise tingimused ja kord', marks: [] }],
    markDefs: []
  },
  ...[
    "Tootmisjuhtimise täiendkoolituse koostaja ja koolitaja omab pikaajalist tervikliku teadmiste ja praktilise kogemuse pagasit tootmis- ja tööstusjuhtimise alal.",
    "Täiendkoolituse koostaja omab pikaajalist täiskasvanute koolitamise kogemust ja tegeleb lisaks koolitamisele ka interimjuhtimise ja juhtimiskonsultatsiooniga, mille käigus toimub pidev turuvajadustega tutvumine ja kohanemine.",
    "Teiste koolitajate rakendamisel ja kasutamisel tutvub koolitaja koolitajatega ja eelkõige nende praktilise kogemusega, referentsidega isiklikult. Hindab neid vastavalt oma kogemusele. Koolitaja jätkuva parenduse ja kvaliteedi tagamise eesmärgil kasutab koolitatavate tagasisidet, mida jagatakse ka koolitajaga."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Õppekeskkonna kvaliteedi tagamise tingimused ja kord', marks: [] }],
    markDefs: []
  },
  ...[
    "Õppevahendeid/õpperuume/sisseseadet kontrollitakse ja uuendatakse vastavalt tehnoloogia arengule ja kontrollitakse regulaarselt.",
    "Õppetöös kasutatakse valdkonna varem testitud ja kaasaegset tehnoloogiat/seadmeid."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  })),
  {
    _type: 'block',
    _key: randomKey(),
    style: 'h3',
    children: [{ _type: 'span', _key: randomKey(), text: 'Täienduskoolituse kohta tagasiside kogumise kord', marks: [] }],
    markDefs: []
  },
  ...[
    "Koolitusel kogutakse pistelist ja kokkuvõtlikku tagasisidet paberil või veebis.",
    "Tagasisidet kasutatakse koolituse kaasajastamise, jätkuva parendamise ja kvaliteedi tagamise eesmärgil."
  ].map(text => ({
    _type: 'block',
    _key: randomKey(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: randomKey(), text, marks: [] }],
    markDefs: []
  }))
]

async function run() {
  try {
    console.log('Ensuring eduStandardsPage exists...')
    await client.createIfNotExists({
      _id: 'eduStandardsPage',
      _type: 'eduStandardsPage',
      title: 'Täienduskoolituse standard'
    })
    console.log('Patching eduStandardsPage...')
    await client.patch('eduStandardsPage')
      .set({ body: portableTextPayload })
      .commit()
    console.log('Successfully updated eduStandardsPage in Sanity!')
  } catch (err) {
    console.error('Migration failed:', err)
  }
}

run()
