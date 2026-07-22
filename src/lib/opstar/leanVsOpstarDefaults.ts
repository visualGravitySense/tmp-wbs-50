export type LeanVsOpstarScenario = {
  criterion: string
  leanValue: string
  opstarValue: string
  opstarHasAdvantage?: boolean
}

export type LeanVsOpstarCta = {
  text: string
  subtitle: string
  buttonText: string
  buttonUrl: string
}

export type LeanVsOpstarData = {
  title: string
  eyebrow: string
  subtitle?: string
  comparisonItems: LeanVsOpstarScenario[]
  cta: LeanVsOpstarCta
}

export const DEFAULT_LEAN_VS_OPSTAR_SCENARIOS: LeanVsOpstarScenario[] = [
  {
    criterion: 'Protsessid ei tööta',
    leanValue:
      'Lean annab tööriistad kaardistamiseks ja raiskamise vähendamiseks, kuid rakendamine jääb sageli sundkorras ja sõltub üksikust konsultandist.',
    opstarValue:
      'Product Name seob protsessid juhtimissüsteemiga — igapäevane rütm, vastutus ja mõõdikud hoiavad protsessid töös ilma pidevate eranditeta.',
    opstarHasAdvantage: true,
  },
  {
    criterion: 'Inimesed ei järgi reegleid',
    leanValue:
      '5S ja standardtöö on paberil olemas, kuid motivatsioon ja vastutus jäävad juhi õlule — reegleid järgitakse peamiselt auditi ajal.',
    opstarValue:
      'Inimkeskne raamistik (OP, ST, AR) teeb vastutuse ja hoolimise osaks igapäevasest juhtimisest — mitte ühekordsest koolitusest.',
    opstarHasAdvantage: true,
  },
  {
    criterion: 'Tulemused ei püsi',
    leanValue:
      'Parandusprojektid annavad lühiajalist tõusu, kuid ilma süsteemse juhtimisrütmi ja KPI-de tagasi libisemine on tavapärane.',
    opstarValue:
      'FIT ja PROFIT seovad muutused mõõdetavate tulemustega — 8 komponenti, järeltugi ja KPI-d hoiavad edasimineku püsivana.',
    opstarHasAdvantage: true,
  },
  {
    criterion: 'Muutused ei haaku kokku',
    leanValue:
      'Osakonnad teevad oma Lean-projekte eraldi — tervikpilt puudub ja strateegia ei jõua põrandani ühtselt.',
    opstarValue:
      'Product Name annab ühtse raamistiku kogu organisatsioonile — strateegia, protsessid ja inimesed liiguvad samas suunas.',
    opstarHasAdvantage: true,
  },
]

export const DEFAULT_LEAN_VS_OPSTAR_CTA: LeanVsOpstarCta = {
  text: 'Valmis Product Name rakendama?',
  subtitle: 'Järgmine grupp oktoobris 2026 · 3 kohta vabad',
  buttonText: 'Vaata programmi',
  buttonUrl: '/koolitus#registreeru',
}

export const DEFAULT_LEAN_VS_OPSTAR_DATA: LeanVsOpstarData = {
  title: 'LEAN vs Product Name',
  eyebrow: 'Võrdlus',
  subtitle:
    'Vali tuttav valu — vaata, kuidas Lean ja Product Name seda erinevalt lahendavad.',
  comparisonItems: DEFAULT_LEAN_VS_OPSTAR_SCENARIOS,
  cta: DEFAULT_LEAN_VS_OPSTAR_CTA,
}

export function resolveLeanVsOpstarScenarios(
  items?: LeanVsOpstarScenario[] | null,
): LeanVsOpstarScenario[] {
  const valid = (items ?? []).filter(
    (item) =>
      item?.criterion?.trim() &&
      (item?.leanValue?.trim() || item?.opstarValue?.trim()),
  )
  return valid.length > 0 ? valid : DEFAULT_LEAN_VS_OPSTAR_SCENARIOS
}

/** Merge CMS / legacy partial data with production defaults — never returns empty. */
export function resolveLeanVsOpstarData(
  data?: Partial<LeanVsOpstarData> | null,
): LeanVsOpstarData {
  const comparisonItems = resolveLeanVsOpstarScenarios(data?.comparisonItems)
  const ctaSource = data?.cta

  return {
    title: data?.title?.trim() || DEFAULT_LEAN_VS_OPSTAR_DATA.title,
    eyebrow: data?.eyebrow?.trim() || DEFAULT_LEAN_VS_OPSTAR_DATA.eyebrow,
    subtitle: data?.subtitle?.trim() || DEFAULT_LEAN_VS_OPSTAR_DATA.subtitle,
    comparisonItems,
    cta: {
      text: ctaSource?.text?.trim() || DEFAULT_LEAN_VS_OPSTAR_CTA.text,
      subtitle: ctaSource?.subtitle?.trim() || DEFAULT_LEAN_VS_OPSTAR_CTA.subtitle,
      buttonText: ctaSource?.buttonText?.trim() || DEFAULT_LEAN_VS_OPSTAR_CTA.buttonText,
      buttonUrl: ctaSource?.buttonUrl?.trim() || DEFAULT_LEAN_VS_OPSTAR_CTA.buttonUrl,
    },
  }
}
