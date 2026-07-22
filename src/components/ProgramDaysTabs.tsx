'use client'

import React, { useEffect, useRef, useState, type FormEvent } from 'react'
import { Alert, BrandVibrantButton, FormField, GreenButton, Input, Label, Section, MarketingContainer, Spinner, WhiteButton, SplitHeader, marketingInsetCardClass, marketingMicroPillClass } from '@/components/ui'
import { EyebrowPillBadge } from '@/components/ui/EyebrowPillBadge'
import { Check, Send, UserPlus, BookOpen } from 'lucide-react'
import { submitEmailLead } from '@/lib/telegramLeadClient'
import { triggerProgramPdfDownload } from '@/lib/nineDays/programPdfDownload'

export interface ProgramDay {
  dayNumber: number
  tag?: string
  title: string
  quote?: string
  description?: string
  fullPoints?: string[]
  companyPainTitle?: string
  companyPain?: string[]
  shortSolution?: string[]
  participantWins?: string
  companyWins?: string
  typeLabel?: string
}

const DEFAULT_POPUP_TITLE = 'Saadame programmi sulle e-kirjaga märgitud aadressile.'
const DEFAULT_POPUP_SUBTITLE =
  'Vormi saatmisega kinnitad, et nõustud oma kontaktandmete jagamisega.'

export interface ProgramDaysTabsProps {
  eyebrow?: string
  title?: string
  scriptTitle?: string
  isMinimal?: boolean
  popupTitle?: string
  popupSubtitle?: string
  days?: ProgramDay[]
}

const DEFAULT_PROGRAM_DAYS: ProgramDay[] = [
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
]

export default function ProgramDaysTabs({
  eyebrow,
  title = 'Mis see on, mida koolitusel teeme?',
  scriptTitle,
  isMinimal = false,
  popupTitle,
  popupSubtitle,
  days = []
}: ProgramDaysTabsProps) {
  const effectivePopupTitle = popupTitle?.trim() || DEFAULT_POPUP_TITLE
  const effectivePopupSubtitle = popupSubtitle?.trim() || DEFAULT_POPUP_SUBTITLE
  // Merge customized props with premium defaults. Always show all 9 days.
  const effectiveDays = DEFAULT_PROGRAM_DAYS.map((fallback, index) => {
    const day = days?.[index]
    
    if (day) {
      return {
        dayNumber: day.dayNumber || index + 1,
        tag: day.tag || fallback.tag,
        title: day.title || fallback.title,
        quote: day.quote || fallback.quote,
        description: day.description || fallback.description,
        fullPoints: day.fullPoints && day.fullPoints.length > 0 ? day.fullPoints : fallback.fullPoints,
        companyPainTitle: day.companyPainTitle || fallback.companyPainTitle,
        companyPain: day.companyPain && day.companyPain.length > 0 ? day.companyPain : fallback.companyPain,
        shortSolution: day.shortSolution && day.shortSolution.length > 0 ? day.shortSolution : fallback.shortSolution,
        participantWins: day.participantWins || fallback.participantWins,
        companyWins: day.companyWins || fallback.companyWins,
        typeLabel: day.typeLabel || fallback.typeLabel
      }
    }
    return fallback
  })

  const [activeDay, setActiveDay] = useState(1)
  const [visitedDays, setVisitedDays] = useState<number[]>([1])
  const dayScrollRef = useRef<HTMLDivElement | null>(null)
  const dayItemRefs = useRef<Record<number, HTMLDivElement | null>>({})

  // Lead magnet state
  const [leadOpen, setLeadOpen] = useState(false)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPending, setLeadPending] = useState(false)
  const [leadSent, setLeadSent] = useState(false)
  const [leadError, setLeadError] = useState('')
  const [pdfDownloadStarted, setPdfDownloadStarted] = useState(false)

  async function handleLeadSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = leadEmail.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setLeadError('Palun sisesta kehtiv e-posti aadress.')
      return
    }
    setLeadError('')
    setLeadPending(true)
    try {
      await submitEmailLead(trimmed, 'nine-days-program')
      const downloaded = await triggerProgramPdfDownload()
      setPdfDownloadStarted(downloaded)
      setLeadSent(true)
      setLeadEmail('')
    } catch (err) {
      const status = (err as Error & { status?: number }).status
      if (status === 503) {
        setLeadError('Teenus pole veel seadistatud. Kontrolli serveri keskkonnamuutujaid.')
      } else {
        setLeadError('Saatmine ebaõnnestus. Palun proovi uuesti.')
      }
    } finally {
      setLeadPending(false)
    }
  }

  const totalDays = effectiveDays.length

  const handleDayClick = (dayNum: number) => {
    setActiveDay(dayNum)
    if (!visitedDays.includes(dayNum)) {
      setVisitedDays((prev) => [...prev, dayNum])
    }
  }

  // Active day scrolling snap-scroll effect on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(min-width: 768px)').matches) return

    const container = dayScrollRef.current
    const item = dayItemRefs.current[activeDay]
    if (!container || !item) return

    const timer = setTimeout(() => {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }, 50)

    return () => clearTimeout(timer)
  }, [activeDay])

  const currentDay = effectiveDays.find((d) => d.dayNumber === activeDay) || effectiveDays[0]

  return (
    <Section variant="band" className="bg-transparent">
      <MarketingContainer elevated>
        <div className="space-y-8 transition-colors duration-500 font-sans">
          {/* Title Header with Modern Editorial Typography Pair */}
          {title && (
            <SplitHeader
              title={title}
              scriptTitle={scriptTitle}
              eyebrow={eyebrow ? <EyebrowPillBadge text={eyebrow} /> : undefined}
              align="center"
              className="mb-10 md:mb-12"
            />
          )}
 
      {/* Tabs Row Wrapper: sticky on mobile */}
      <div className="sticky top-[60px] z-40 max-md:-mx-4 max-md:px-4 max-md:py-3 max-md:bg-white/95 max-md:backdrop-blur-md max-md:shadow-sm max-md:border-b max-md:border-slate-200/60 dark:max-md:bg-slate-900/95 dark:max-md:border-white/10 md:static md:bg-transparent md:border-none md:shadow-none md:p-0 space-y-4 transition-all">
        {/* Horizontal Navigation: snaps on mobile, displays perfectly aligned on desktop */}
        <div className="program-days-tabs-nav relative min-w-0 max-md:overflow-x-hidden max-md:rounded-xl max-md:border max-md:border-slate-200/70 max-md:bg-gradient-to-b max-md:from-slate-50/95 max-md:to-slate-100/90 max-md:p-2.5 max-md:shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:max-md:border-white/10 dark:max-md:from-slate-900/50 dark:max-md:to-slate-800/40">
          <div
            ref={dayScrollRef}
            className="flex min-w-0 items-center gap-3 overflow-x-auto overscroll-x-contain px-0.5 py-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory max-md:touch-auto md:justify-between md:gap-1 md:overflow-visible md:px-0 md:py-4 md:snap-none"
          >
            {effectiveDays.map((dayItem) => {
              const dayNum = dayItem.dayNumber
              const isActive = activeDay === dayNum
              const isVisited = visitedDays.includes(dayNum)
 
              return (
                <div
                  key={dayNum}
                  ref={(el) => {
                    dayItemRefs.current[dayNum] = el
                  }}
                  className={`flex min-w-[4.25rem] shrink-0 snap-center flex-col items-center gap-1.5 md:min-w-0 md:flex-1 md:shrink md:snap-align-none ${
                    isActive ? 'md:z-10' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleDayClick(dayNum)}
                    aria-label={`Päev ${dayNum}: ${dayItem.title}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`
                      program-days-tab-btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold transition-all duration-300 ease-out cursor-pointer
                      ${isActive
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 scale-110'
                        : isVisited
                          ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-500/50'
                          : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600 dark:bg-slate-900 dark:text-slate-300 dark:border-white/10 dark:hover:border-sky-400 dark:hover:text-sky-400'}
                    `}
                  >
                    {isActive || !isVisited ? (
                      <span>{dayNum}</span>
                    ) : (
                      <Check className="h-5 w-5 stroke-[3] check-icon" />
                    )}
                  </button>
 
                  <span
                    className={`program-days-tab-tag max-w-[5.5rem] truncate text-center text-[9px] font-extrabold uppercase leading-tight tracking-wide transition-colors ${
                      isActive
                        ? 'text-blue-600 dark:text-sky-400 font-black'
                        : isVisited
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    {dayItem.tag || `Päev ${dayNum}`}
                  </span>
 
                  <div
                    className={`h-1 w-1 rounded-full transition-all duration-500 indicator-dot ${
                      isVisited
                        ? `scale-100 ${isActive ? 'bg-blue-600 dark:bg-sky-400' : 'bg-emerald-500'}`
                        : 'scale-0 opacity-0'
                    }`}
                    aria-hidden
                  />
                </div>
              )
            })}
          </div>
        </div>
 
        {/* Progress Bar under tabs to indicate active/visited progress */}
        <div className="program-days-progress-wrapper space-y-1.5 px-1">
          <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative">
            <div
              className="program-days-progress-fill absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${(visitedDays.length / totalDays) * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Progress</span>
            <span>{visitedDays.length} / {totalDays} päeva vaadatud</span>
          </div>
        </div>
      </div>
 
      {/* Conditionally Switching Layouts */}
      {isMinimal ? (
        /* MINIMALIST COMPACT LAYOUT (Single Column) */
        <div key={activeDay} className={`program-days-card mx-auto w-full max-w-2xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ${marketingInsetCardClass}`}>
          <div className="mega-soft-glass-inner-glow" />
          <div className="mega-soft-glass-reflection" />
 
          {/* Active Card Top: Inline tag and fraction */}
          <div className="program-days-card-fraction flex justify-between items-center text-xs font-black uppercase tracking-widest text-blue-600 dark:text-sky-400">
            <span>{currentDay.tag || `PÄEV ${currentDay.dayNumber}`}</span>
            <span className="text-slate-400 dark:text-slate-500">{currentDay.dayNumber} / {totalDays}</span>
          </div>
 
          {/* Grey Callout Box for habit quote */}
          {currentDay.quote && (
            <div className={`program-days-habit-box mt-3 p-4 shadow-inner ${marketingMicroPillClass}`}>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Harjumus fookuses
              </p>
              <p className="text-sm md:text-base font-medium italic text-slate-700 dark:text-slate-300">
                "{currentDay.quote}"
              </p>
            </div>
          )}
 
          {/* Primary Heading beneath quote */}
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-4 leading-tight">
            {currentDay.title}
          </h3>
 
          {/* Kirjeldus / Description */}
          {currentDay.description && (
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {currentDay.description}
            </p>
          )}
 
          {/* Homepage minimalist: single primary CTA → full course page */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
            <BrandVibrantButton href="/koolitus" className="w-full justify-center">
              Tutvu programmiga
            </BrandVibrantButton>
          </div>
        </div>
      ) : (
        /* FULL TWO-COLUMN COURSE VIEW LAYOUT */
        <div key={activeDay} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: challenge + profit cards */}
          <div className="lg:col-span-5 order-2">
            <div className={`relative p-5 pb-6 lg:p-8 lg:pb-8 ${marketingInsetCardClass}`}>
              <div className="mega-soft-glass-inner-glow" />

              <div className="relative z-10 space-y-6">
                <div className="space-y-4">
                  <p className="text-xs md:text-sm font-black tracking-wide text-rose-900 dark:text-rose-300">
                    {currentDay.companyPainTitle || 'Valu ettevõttes'}
                  </p>
                  <ul className="space-y-2.5">
                    {(currentDay.companyPain && currentDay.companyPain.length > 0
                      ? currentDay.companyPain
                      : ['Planeerimine kaootiline, prioriteedid muutuvad pidevalt', 'Igapäev on tulekustutamine', 'Osakonnad ei tööta tervikuna', 'Tarnekindlus ebastabiilne']
                    ).map((pain, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
                          •
                        </span>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Osaleja saab & Juht võidab */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100/60 dark:border-blue-800/30">
                    <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1.5">Osaleja saab</h4>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {currentDay.participantWins || 'Kaardistab oma juhtimissüsteemi ja määratleb rolli selles selgelt'}
                    </p>
                  </div>
                  <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100/60 dark:border-emerald-800/30">
                    <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1.5">Juht / Org võidab</h4>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {currentDay.companyWins || 'Selgem struktuur, kiirem otsustamine, vähem segadust'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Day detailed info */}
          <div className="lg:col-span-7 lg:col-start-6 order-3">
             <div className={`p-5 lg:p-8 ${marketingInsetCardClass}`}>
                <div className="mega-soft-glass-inner-glow" />
                
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50/80 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-blue-700 border border-blue-200/80 dark:bg-blue-900/40 dark:border-blue-700/50 dark:text-blue-400">
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    {currentDay.typeLabel || 'LISAINFO PÄEVAST'}
                  </span>
                </div>

                <h3 className="mb-3 text-lg md:text-xl font-black leading-tight text-slate-900 dark:text-white">
                  Õppepäev: {currentDay.title}
                </h3>
                
                <p className="mb-6 text-sm md:text-base text-slate-600 dark:text-slate-400">
                  Harjumus fookuses:{' '}
                  <span className="font-semibold text-slate-900 dark:text-slate-200">{currentDay.quote}</span>
                </p>

                {/* Mida sel päeval teeme */}
                <div className="mb-6">
                   <h4 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Mida sel päeval teeme</h4>
                   <ul className="space-y-2.5">
                      {(currentDay.shortSolution && currentDay.shortSolution.length > 0
                        ? currentDay.shortSolution
                        : (currentDay.fullPoints && currentDay.fullPoints.length >= 3 ? currentDay.fullPoints.slice(0, 3) : ['Samm 1', 'Samm 2', 'Samm 3'])
                      ).map((item, i) => (
                         <li key={i} className="flex items-center gap-3 bg-slate-50/80 dark:bg-slate-900/40 rounded-lg p-2.5 px-3 border border-slate-200/60 dark:border-white/5">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100/80 text-emerald-700 text-[10px] font-black dark:bg-emerald-900/50 dark:text-emerald-300 shadow-sm">
                               {i + 1}
                            </div>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item}</span>
                         </li>
                      ))}
                   </ul>
                </div>

             </div>
          </div>
          </div>

          {/* Section CTAs — outside both cards */}
          <div className="mx-auto w-full max-w-2xl space-y-3 px-1">
            <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4">
              <BrandVibrantButton
                href="/koolitus#pricing"
                className="w-full justify-center sm:flex-1 sm:max-w-xs"
              >
                Registreeru programmi
              </BrandVibrantButton>

              <WhiteButton
                icon={UserPlus}
                className="w-full justify-center sm:flex-1 sm:max-w-xs"
                aria-expanded={leadOpen}
                onClick={() => {
                  setLeadOpen((o) => !o)
                  setLeadError('')
                }}
              >
                Saada mulle programm
              </WhiteButton>
            </div>

            {leadOpen && (
              <div className={`animate-in fade-in slide-in-from-top-1 duration-200 p-5 ${marketingMicroPillClass}`}>
                {leadSent ? (
                  <div className="space-y-3 text-left">
                    <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">Aitäh!</p>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {pdfDownloadStarted
                        ? 'Programmi PDF peaks kohe alla laadima. Kui ei näe faili, kontrolli brauseri allalaadimisi.'
                        : 'Aitäh — andmed on kätte saadud. PDF faili lisame peagi; võtame ühendust e-posti teel.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => { setLeadOpen(false); setLeadSent(false) }}
                      className="text-sm font-semibold text-slate-400 underline decoration-slate-300 underline-offset-2 hover:text-slate-700"
                    >
                      Sulge
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold leading-snug text-slate-800 dark:text-white">
                        {effectivePopupTitle}
                      </p>
                      <p className="text-xs leading-relaxed text-slate-500">
                        {effectivePopupSubtitle}
                      </p>
                    </div>
                    <FormField>
                      <Label htmlFor="prog-days-lead-email-full" variant="compact" className="text-blue-700 dark:text-blue-400">
                        E-post
                      </Label>
                      <Input
                        id="prog-days-lead-email-full"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={leadEmail}
                        onChange={(ev) => setLeadEmail(ev.target.value)}
                        placeholder="nimi@ettevote.ee"
                        required
                        className="py-3 focus:border-blue-700 focus:ring-blue-700/20"
                      />
                    </FormField>
                    {leadError && <Alert variant="error">{leadError}</Alert>}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <GreenButton icon={Send} type="submit" disabled={leadPending}>
                        {leadPending ? (
                          <>
                            <Spinner size="sm" className="mr-2 text-white" label="Saadan" />
                            Saadan…
                          </>
                        ) : (
                          'Saada mulle programm'
                        )}
                      </GreenButton>
                      <button
                        type="button"
                        onClick={() => { setLeadOpen(false); setLeadError('') }}
                        className="text-center text-sm font-semibold text-slate-400 underline decoration-slate-300 underline-offset-2 hover:text-slate-700 sm:text-right"
                      >
                        Sulge
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
 
        </div>
      </MarketingContainer>
    </Section>
  )
}
