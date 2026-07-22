import type { NineDaysMiniDay } from './nineDaysMiniDefaults'

export interface NineDaysMiniFaqQuote {
  quote?: string
  author?: string
}

export interface NineDaysMiniFaqSection {
  question?: string
  testimonials?: NineDaysMiniFaqQuote[]
}

/** Päevade vaikeväärtused — Studio ja sait kasutavad sama loetelu. */
export const DEFAULT_NINE_DAYS_MINI_DAYS: NineDaysMiniDay[] = [
  {
    dayNumber: 1,
    title: 'Mõtteviis — Tootmisjuhi roll ja vastutus',
    subtitle: 'Mis on tootmisjuhi tegelik ülesanne? Vastutus vs kontroll.',
    habit: 'Teen selgeks oma rolli tootmisjuhina — vastutus, mitte ainult kontroll.',
    typeLabel: 'Koolituspäev',
    companyPainTitle: 'Juhtimine toimib tunde pealt, rollid hägusad',
    companyPain: ['Tulemus sõltub üksikisikutest','Juhtimisfunktsioonid kattuvad','Keegi ei vastuta terviku eest'],
    shortSolution: ['Juhtimissüsteem tervikuna praktikas','Lean-Agile sünergia ja kohanemise vajadus','Tootmisjuhi roll ja vastutus vs kontroll'],
    participantWins: 'Kaardistab oma juhtimissüsteemi ja määratleb rolli selles selgelt',
    companyWins: 'Selgem struktuur, kiirem otsustamine, vähem segadust'
  },
  {
    dayNumber: 2,
    title: 'Väärtus — Mis on väärtus kliendi silmis',
    subtitle: 'Väärtusloome loogika ja raiskamise tuvastamine.',
    habit: 'Hindan tööd kliendi väärtuse prisma kaudu ja näen raiskamist.',
    typeLabel: 'Koolituspäev',
    companyPainTitle: 'Planeerimine kaootiline, prioriteedid muutuvad pidevalt',
    companyPain: ['Igapäev on tulekustutamine','Osakonnad ei tööta tervikuna','Tarnekindlus ebastabiilne'],
    shortSolution: ['Kolm juhtimistasandit ühes rütmis','Väärtusvoo nägemine tervikuna','Prioriteetide juhtimine ja tootmisrütm'],
    participantWins: 'Planeerib ja hoiab tootmisrütmi – struktureeritult, mitte intuitiivselt',
    companyWins: 'Vähem tulekustutamist, parem tarnekindlus'
  },
  {
    dayNumber: 3,
    title: 'Kaardistus — VSM väärtusahela kaardistus',
    subtitle: 'Voo kaardistamine reaalajas oma tootmises.',
    habit: 'Kaardistan ühe väärtusvoo samm-sammult (VSM mõtteviis).',
    typeLabel: 'Koolituspäev',
    companyPainTitle: 'Info ei liigu, eesmärgid jõuavad moonutatult',
    companyPain: ['Otsused tehakse vale info põhjal','Eesmärke tõlgendatakse erinevalt','Palju korduvaid arusaamatusi'],
    shortSolution: ['Toimiv infovoog eri tasanditel','Rollid, vastutused ja mõõdikud paika','Visuaalne juhtimine ja läbipaistvus'],
    participantWins: 'Loob toimiva info liikumise ja selged eesmärgid igal tasandil',
    companyWins: 'Kiirem reageerimine, vähem arusaamatusi'
  },
  {
    dayNumber: 4,
    title: 'Visuaal — 5S ja visuaalne juhtimine',
    subtitle: 'Tootmiskoha organiseerimine ja visuaalsed standardid.',
    habit: 'Rakendan ühes tööpiirkonnas 5S põhimõtteid ja visuaalset standardit.',
    typeLabel: 'Ettevõttekülastus · Gemba',
    companyPainTitle: 'Teooriat on – aga kuidas see päriselt välja näeb?',
    companyPain: ['Õpitu ei seostu oma töökeskkonnaga','Protsesside tegelik olek vs ootus segane','Raiskamised on varjatud'],
    shortSolution: ['Väärtusvoog kohapeal ettevõttes','Raiskamiste vaatlus ja kaardistamine','Vestlused töötajate ja juhtidega'],
    participantWins: 'Näeb teoreetilisi kontseptsioone päriselu kontekstis',
    companyWins: 'Objektiivne pilk väljastpoolt, konkreetsed tähelepanekud'
  },
  {
    dayNumber: 5,
    title: 'Standardid — SOP ja standardiseeritud töö',
    subtitle: 'Tööjuhendid mis tegelikult toimivad.',
    habit: 'Kirjutan või uuendan ühe SOP-i, mis on tiimile päriselt kasutatav.',
    typeLabel: 'Koolituspäev',
    companyPainTitle: 'Kvaliteet kõigub, raiskamised on varjatud',
    companyPain: ['Lahendatakse sümptomeid, mitte põhjuseid','Pudelikaelad korduvad','Varjatud raiskamised söövad ressursse'],
    shortSolution: ['Raiskamiste tuvastamine ja liigitamine','Juurpõhjuste analüüs – 5 miks, Ishikawa','Väärtusloome loogika'],
    participantWins: 'Tuvastab raiskamist, leiab juurpõhjused, parandab protsesse',
    companyWins: 'Vähem kadu, ühtlasem kvaliteet, parem tootlikkus'
  },
  {
    dayNumber: 6,
    title: 'Stabiilsus — 4M meetod ja TPM',
    subtitle: 'Masin, Materjal, Meetod, Mees — stabiilsuse alused.',
    habit: 'Vaatan ühe masina või protsessi stabiilsust 4M prisma kaudu.',
    typeLabel: 'Koolituspäev',
    companyPainTitle: 'Standardid puuduvad, kompetents sõltub võtmeisikutest',
    companyPain: ['Tulemus varieerub inimesest sõltuvalt','Liiga palju varieeruvust','Teadmised pole dokumenteeritud'],
    shortSolution: ['Standardite loomine, mis püsivad','Kompetentside kaardistamine','Teadmiste jagamine ja dokumenteerimine'],
    participantWins: 'Loob standardid mis püsivad ja arendab meeskonna oskusi',
    companyWins: 'Stabiilsem tulemus, vähem sõltuvust üksikisikutest'
  },
  {
    dayNumber: 7,
    title: 'Probleemid — A3 ja PDCA probleemilahendus',
    subtitle: 'Struktureeritud probleemilahendus päris juhtumitel.',
    habit: 'Formuleerin ühe probleemi A3 struktuuris ja läbin PDCA tsükli mõttes.',
    typeLabel: 'Koolituspäev',
    companyPainTitle: 'Muutused ei juurdu ja vanad harjumused naasevad',
    companyPain: ['Algatusi tehakse, aga vana olukord taastub','Inimesed ei võta vastutust','Juht veab kõike ise'],
    shortSolution: ['Muudatuste juhtimise meetodid praktikas','Inimeste kaasamine ja vastutuse andmine','Parendusvõimekuse kasvatamine'],
    participantWins: 'Kaasab inimesi, annab vastutust ja hoiab muutused elus',
    companyWins: 'Püsivad parendused, tugevam meeskonnavõimekus'
  },
  {
    dayNumber: 8,
    title: 'Meeskond — Kaizen kultuur ja inimeste areng',
    subtitle: 'Kuidas ehitada meeskond mis lahendab probleeme ise.',
    habit: 'Planeerin ühe arenguvestluse või Kaizen algatuse meeskonnas.',
    typeLabel: 'Ettevõttekülastus · Gemba',
    companyPainTitle: 'Kas 1. külastuse järel on midagi tegelikult muutunud?',
    companyPain: ['Muutuste mõju on ebaselge','Parendusprojektid vajavad tagasisidet','Rakendused võivad olla poolikud'],
    shortSolution: ['Parendusprojektide edenemise vaatlus','Võrdlus 1. gemba tähelepanekutega','Coaching ja suunamine edasiseks'],
    participantWins: 'Saab tagasisidet parendusprojektile ja konkreetsed soovitused',
    companyWins: 'Näeb mõõdetavat progressi, mitte ainult tunnetust'
  },
  {
    dayNumber: 9,
    title: 'Süsteem — Rakenduskava + lõputöö + tunnistus',
    subtitle: 'Isiklik 90-päevane plaan. Esitlus. Diplom.',
    habit: 'Panen paika 90-päevase rakendusplaani ja teen juhatusele ettekande.',
    typeLabel: 'Lõpupäev · Esitlused',
    companyPainTitle: 'Kuidas teada, kas koolitus tõi tegelikku muutust?',
    companyPain: ['Õpitu on killustatud, tervikpilti pole','Parendusprojektid vajavad lõpetamist','Edasised sammud ebaselged'],
    shortSolution: ['Parendusprojektide esitlemine juhtkonnale','Koolituse kokkuvõte ja reflektsioon','Järgmised sammud ja jätkutugi'],
    participantWins: 'Esitleb parendusprojekti ja saab selge tegevusplaani',
    companyWins: 'Näeb mõõdetavaid tulemusi, saab sisendi edasisteks otsusteks'
  },
]

export const DEFAULT_NINE_DAYS_MINI_FAQ: NineDaysMiniFaqSection = {
  question: 'Kuidas 147 tootmisjuhti 9-päevase puudumise lahendasid?',
  testimonials: [
    {
      quote: 'Leppisin juhatusega kokku 2 kuud ette, näitasin programmi ROI arvutust.',
      author: 'Taavi R., Cleveron',
    },
    {
      quote: 'Jagasin 9 päeva kahele — 5 päeva esimesel nädalal, 4 teisel.',
      author: 'Siiri K., ABB Estonia',
    },
    {
      quote: 'Meie operatsioonijuht kattis mind. Talle tuli see kasuks — õppis servuti.',
      author: 'Marko L., Bolt',
    },
  ],
}

export const DEFAULT_NINE_DAYS_MINI_UI = {
  eyebrow: '9-päevane programm',
  italicTitle: 'mida me teeme?',
  subtitle:
    'See pole järjekordne teoreetiline koolitus. See on 9-päevane intensiivprogramm, mis annab sulle tootmisjuhi süsteemse raamistiku — mõõdetavate tulemustega.',
  greenButtonText: 'Tutvu programmiga',
  greenButtonLink: '/koolitus',
  whiteButtonText: 'Tutvu programmiga',
  whiteButtonLink: '/koolitus',
  overviewLabel: '9-päevane teekond — ülevaade',
  dayPickerLabel: 'Mis päev sind huvitab kõige rohkem?',
  progressLabel: '{viewed}/{total} päeva vaadatud',
  dayBadgePrefix: 'Päev',
  habitLabel: 'Harjumus, mida sa omandad:',
  planCtaPrefix: 'Päev {day} kõlab huvitavalt?',
  planCtaLinkText: 'Registreeru ja ela see päev ise läbi.',
  planCtaLinkUrl: '/register',
  planButtonText: 'Registreeru programmi →',
  planButtonLink: '/register',
} as const

function pickString(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

function mergeFaqSection(faq?: NineDaysMiniFaqSection | null): NineDaysMiniFaqSection {
  const cmsQuotes = (faq?.testimonials ?? []).filter(
    (item) => item.quote?.trim() || item.author?.trim(),
  )

  return {
    question: pickString(faq?.question, DEFAULT_NINE_DAYS_MINI_FAQ.question!),
    testimonials: cmsQuotes.length > 0 ? cmsQuotes : DEFAULT_NINE_DAYS_MINI_FAQ.testimonials,
  }
}

export type NineDaysMiniContentInput = {
  eyebrow?: string
  italicTitle?: string
  subtitle?: string
  greenButtonText?: string
  greenButtonLink?: string
  whiteButtonText?: string
  whiteButtonLink?: string
  overviewLabel?: string
  dayPickerLabel?: string
  progressLabel?: string
  dayBadgePrefix?: string
  habitLabel?: string
  planCtaPrefix?: string
  planCtaLinkText?: string
  planCtaLinkUrl?: string
  planButtonText?: string
  planButtonLink?: string
  faqSection?: NineDaysMiniFaqSection | null
}

/** Täidab tühjad CMS väljad vaikeväärtustega (CTA, FAQ, sildid). */
export function applyNineDaysMiniContentDefaults<T extends NineDaysMiniContentInput>(
  data?: T | null,
): T & typeof DEFAULT_NINE_DAYS_MINI_UI & { faqSection: NineDaysMiniFaqSection } {
  const input = data ?? ({} as T)

  return {
    ...DEFAULT_NINE_DAYS_MINI_UI,
    ...input,
    eyebrow: pickString(input.eyebrow, DEFAULT_NINE_DAYS_MINI_UI.eyebrow),
    italicTitle: pickString(input.italicTitle, DEFAULT_NINE_DAYS_MINI_UI.italicTitle),
    subtitle: pickString(input.subtitle, DEFAULT_NINE_DAYS_MINI_UI.subtitle),
    greenButtonText: pickString(input.greenButtonText, DEFAULT_NINE_DAYS_MINI_UI.greenButtonText),
    greenButtonLink: pickString(input.greenButtonLink, DEFAULT_NINE_DAYS_MINI_UI.greenButtonLink),
    whiteButtonText: pickString(input.whiteButtonText, DEFAULT_NINE_DAYS_MINI_UI.whiteButtonText),
    whiteButtonLink: pickString(input.whiteButtonLink, DEFAULT_NINE_DAYS_MINI_UI.whiteButtonLink),
    overviewLabel: pickString(input.overviewLabel, DEFAULT_NINE_DAYS_MINI_UI.overviewLabel),
    dayPickerLabel: pickString(input.dayPickerLabel, DEFAULT_NINE_DAYS_MINI_UI.dayPickerLabel),
    progressLabel: pickString(input.progressLabel, DEFAULT_NINE_DAYS_MINI_UI.progressLabel),
    dayBadgePrefix: pickString(input.dayBadgePrefix, DEFAULT_NINE_DAYS_MINI_UI.dayBadgePrefix),
    habitLabel: pickString(input.habitLabel, DEFAULT_NINE_DAYS_MINI_UI.habitLabel),
    planCtaPrefix: pickString(input.planCtaPrefix, DEFAULT_NINE_DAYS_MINI_UI.planCtaPrefix),
    planCtaLinkText: pickString(input.planCtaLinkText, DEFAULT_NINE_DAYS_MINI_UI.planCtaLinkText),
    planCtaLinkUrl: pickString(input.planCtaLinkUrl, DEFAULT_NINE_DAYS_MINI_UI.planCtaLinkUrl),
    planButtonText: pickString(input.planButtonText, DEFAULT_NINE_DAYS_MINI_UI.planButtonText),
    planButtonLink: pickString(input.planButtonLink, DEFAULT_NINE_DAYS_MINI_UI.planButtonLink),
    faqSection: mergeFaqSection(input.faqSection),
  }
}
