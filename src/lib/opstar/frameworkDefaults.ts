export type OpstarFrameworkPart = {
  code: string
  fullTitle: string
  explanation: string
  painQuote: string
  ctaText: string
  ctaHref: string
}

export type OpstarFrameworkData = {
  eyebrow?: string
  title?: string
  subtitle?: string
  parts?: OpstarFrameworkPart[]
}

export const DEFAULT_OPSTAR_FRAMEWORK: Required<
  Pick<OpstarFrameworkData, 'eyebrow' | 'title' | 'subtitle' | 'parts'>
> = {
  eyebrow: 'Raamistik',
  title: 'Product Name — kuus osa',
  subtitle: 'Iga osa vastab konkreetsele juhtimisvalule ja viib sind lahenduseni.',
  parts: [
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
  ],
}

export function resolveOpstarFrameworkData(
  data?: OpstarFrameworkData | null,
): Required<Pick<OpstarFrameworkData, 'eyebrow' | 'title' | 'subtitle' | 'parts'>> {
  const parts =
    data?.parts?.filter((part) => part?.code && part?.fullTitle)?.length
      ? data.parts
      : DEFAULT_OPSTAR_FRAMEWORK.parts

  return {
    eyebrow: data?.eyebrow?.trim() || DEFAULT_OPSTAR_FRAMEWORK.eyebrow,
    title: data?.title?.trim() || DEFAULT_OPSTAR_FRAMEWORK.title,
    subtitle: data?.subtitle?.trim() || DEFAULT_OPSTAR_FRAMEWORK.subtitle,
    parts,
  }
}
