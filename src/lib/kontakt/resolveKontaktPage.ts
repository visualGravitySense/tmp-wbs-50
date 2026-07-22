import type { KontaktPageDoc, ResolvedKontaktPage } from '@/types/kontaktPage'

function t(value: string | undefined | null, fallback: string): string {
  const v = value?.trim()
  return v || fallback
}

export const KONTAKT_PAGE_DEFAULTS: ResolvedKontaktPage = {
  seo: {
    metaTitle: 'Kontakt — Andres Kase',
    metaDescription:
      'Võta ühendust Andresega: e-post, telefon, aadress Viljandis. OPSTAR PROFIT™ koolitused, konsultatsioonid ja tootmisjuhtimine.',
  },
  hero: {
    eyebrow: 'Kontakt ja koostöö',
    pageTitle: 'Võta ühendust',
    intro:
      'Kõik koolitused, konsultatsioonid ja OPSTAR PROFIT™ programmid on seotud Andres Kase ja tema praktilise tootmisjuhtimise kogemusega. Kirjuta, helista või täida vorm — leiame koos järgmise sammu.',
    image: null,
  },
  quickContact: {
    sectionTitle: 'Otsekontakt',
    labelEmail: 'E-post',
    labelPhone: 'Telefon',
    labelAddress: 'Aadress',
    labelResponse: 'Vastamine',
    emails: [
      { label: 'Üldine', address: 'andreskase@tootmisjuhtimine.ee' },
      { label: 'Koolitus ja pakkumised', address: 'andres@tootmisjuhtimine.ee' },
    ],
    phoneDisplay: '+372 51 38 403',
    phoneTel: '+3725138403',
    address: {
      street: 'Tartu 11 / Lossi 29',
      postalCode: '71004',
      city: 'Viljandi',
      country: 'Eesti',
    },
    responseNote: 'Vastame tavaliselt 24 tunni jooksul tööpäevadel.',
    mapLinkLabel: 'Ava kaardil',
    mapQuery: 'Tartu 11 Lossi 29 Viljandi Eesti',
    emailButtonText: 'Kirjuta e-kirjaga',
    phoneButtonText: 'Helista',
    primaryEmail: 'andreskase@tootmisjuhtimine.ee',
  },
  messageForm: {
    sectionTitle: 'Saada sõnum',
    sectionDescription:
      'Kirjelda lühidalt oma olukorda — koolitus, konsultatsioon või OPSTAR PROFIT™. Lisa e-post või telefon, et saaksime vastata samale kanalile.',
    contactFieldLabel: 'E-post või telefon',
    contactPlaceholder: 'nimi@näide.ee või +372 …',
    contactHint: 'Kehtiv e-post või telefoninumber (vähemalt 8 numbrit).',
    messageFieldLabel: 'Sõnum',
    messagePlaceholder:
      'Kirjelda lühidalt, millega saame aidata — koolitus, konsultatsioon või OPSTAR PROFIT™…',
    messageHint: 'Vähemalt 10 tähemärki · kuni 3500',
    submitButtonText: 'Saada sõnum',
    submittingButtonText: 'Saadan…',
    errorMessage: 'Saatmine ebaõnnestus. Proovi hetke pärast uuesti või kirjuta otse e-postiga.',
    successTitle: 'Aitäh — sõnum on kohale jõudnud.',
    successBody:
      'Andres vastab esimesel võimalusel, tavaliselt sama või järgmise tööpäeva jooksul.',
    formAriaTitle: 'Saada sõnum',
  },
  andresBlock: {
    name: 'Andres Kase',
    role: 'Tootmisjuhtimise koolitaja ja konsultant',
    description:
      'Eesti juhtiv tootmisjuhtimise koolitaja — üle 25 aasta praktikat tootmisettevõtetes, 100+ tehase kogemus ja personaalsed programmid, mis ühendavad LEAN, TPS ja reaalse põranda töö.',
    highlights: [
      { label: 'Koolitused:', text: '9-päevane tootmisjuhtide programm ja ettevõttesisesed lahendused' },
      { label: 'Konsultatsioon:', text: 'protsessid, KPI, Gemba, meeskonna areng' },
      { label: 'Veeb:', text: 'tootmisjuhtimine.ee' },
    ],
    websiteUrl: 'https://tootmisjuhtimine.ee',
    linkLabel: 'Loe lähemalt Andresest →',
    linkHref: '/andres-kase',
  },
  opstarBlock: {
    name: 'OPSTAR PROFIT™',
    tagline: 'Tootmisjuhtimise raamistik Eesti ettevõtetele',
    description:
      'Kaheksa komponendiga süsteem, mis on loodud Eesti tootmisettevõtete vajadustest — kiirem rakendamine kui abstraktne LEAN, selged tööriistad ja mõõdetavad tulemused. Koolitused ja sertifikaadid viivad läbi Andres Kase.',
    bullets: [
      '8-komponentne raamistik ja praktilised tööriistad',
      'Tehasekülastused ja reaalsete näidete põhine õpe',
      'Rahvusvaheline tunnistus programmi lõpetamisel',
    ],
    linkLabel: 'Tutvu OPSTAR PROFIT™ raamistikuga →',
    linkHref: '/opstar-profit',
  },
  servicesSection: {
    sectionTitle: 'Mille jaoks võtta ühendust?',
    items: [
      {
        title: 'Koolitus ja registreerumine',
        text: '9-päevane programm, vabad kohad, Töötukassa toetus.',
        linkLabel: 'Koolitusleht',
        linkHref: '/koolitus',
      },
      {
        title: 'Konsultatsioon',
        text: 'Tehase külastus, audit või juhtimise arendus.',
        linkLabel: 'Konsultatsioonid',
        linkHref: '/andres-kase',
      },
      {
        title: 'OPSTAR PROFIT™',
        text: 'Raamistiku tutvustus ja rakendamine ettevõttes.',
        linkLabel: 'OPSTAR leht',
        linkHref: '/opstar-profit',
      },
    ],
    registerNote:
      'Oled valmis registreeruma? Täida registreerimisvorm — vastame küsimustele enne kinnitamist.',
    registerButtonText: 'Registreeru kursusele',
    registerButtonHref: '/register',
  },
  legalNote: {
    beforeLink: 'Isikuandmete töötlemise kohta vt',
    linkLabel: 'privaatsuspoliitikat',
    linkHref: '/privacy-policy',
    afterLink:
      '. Vastutav töötleja kontaktandmete suhtes on Andres Kase (andreskase@tootmisjuhtimine.ee).',
  },
}

export function resolveKontaktPage(doc: KontaktPageDoc | null | undefined): ResolvedKontaktPage {
  const d = KONTAKT_PAGE_DEFAULTS
  const q = doc?.quickContact
  const emailsFromCms =
    q?.emails
      ?.map((row) => ({
        label: t(row.label, ''),
        address: t(row.address, ''),
      }))
      .filter((row) => row.address) ?? []
  const emails = emailsFromCms.length > 0 ? emailsFromCms : d.quickContact.emails

  const highlightsFromCms =
    doc?.andresBlock?.highlights
      ?.map((row) => ({
        label: t(row.label, ''),
        text: t(row.text, ''),
      }))
      .filter((row) => row.label || row.text) ?? []
  const highlights = highlightsFromCms.length > 0 ? highlightsFromCms : d.andresBlock.highlights

  const bulletsFromCms =
    doc?.opstarBlock?.bullets?.map((b) => b?.trim()).filter((b): b is string => Boolean(b)) ?? []
  const bullets = bulletsFromCms.length > 0 ? bulletsFromCms : d.opstarBlock.bullets

  const itemsFromCms =
    doc?.servicesSection?.items
      ?.map((item) => ({
        title: t(item.title, ''),
        text: t(item.text, ''),
        linkLabel: t(item.label, ''),
        linkHref: t(item.href, ''),
      }))
      .filter((item) => item.title) ?? []
  const items = itemsFromCms.length > 0 ? itemsFromCms : d.servicesSection.items

  const primaryEmail = t(
    q?.primaryEmailForButtons,
    emails[0]?.address ?? d.quickContact.primaryEmail,
  )

  return {
    seo: {
      metaTitle: t(doc?.seo?.metaTitle, d.seo.metaTitle),
      metaDescription: t(doc?.seo?.metaDescription, d.seo.metaDescription),
      metaKeywords: doc?.seo?.metaKeywords || undefined,
      ogImage: doc?.seo?.ogImage || null,
    },
    hero: {
      eyebrow: t(doc?.hero?.eyebrow, d.hero.eyebrow),
      pageTitle: t(doc?.hero?.pageTitle, d.hero.pageTitle),
      intro: t(doc?.hero?.intro, d.hero.intro),
      image: doc?.hero?.image || null,
    },
    quickContact: {
      sectionTitle: t(q?.sectionTitle, d.quickContact.sectionTitle),
      labelEmail: t(q?.labelEmail, d.quickContact.labelEmail),
      labelPhone: t(q?.labelPhone, d.quickContact.labelPhone),
      labelAddress: t(q?.labelAddress, d.quickContact.labelAddress),
      labelResponse: t(q?.labelResponse, d.quickContact.labelResponse),
      emails,
      phoneDisplay: t(q?.phoneDisplay, d.quickContact.phoneDisplay),
      phoneTel: t(q?.phoneTel, d.quickContact.phoneTel),
      address: {
        street: t(q?.addressStreet, d.quickContact.address.street),
        postalCode: t(q?.addressPostalCode, d.quickContact.address.postalCode),
        city: t(q?.addressCity, d.quickContact.address.city),
        country: t(q?.addressCountry, d.quickContact.address.country),
      },
      responseNote: t(q?.responseNote, d.quickContact.responseNote),
      mapLinkLabel: t(q?.mapLinkLabel, d.quickContact.mapLinkLabel),
      mapQuery: t(q?.mapQuery, d.quickContact.mapQuery),
      emailButtonText: t(q?.emailButtonText, d.quickContact.emailButtonText),
      phoneButtonText: t(q?.phoneButtonText, d.quickContact.phoneButtonText),
      primaryEmail,
    },
    messageForm: {
      sectionTitle: t(doc?.messageForm?.sectionTitle, d.messageForm.sectionTitle),
      sectionDescription: t(doc?.messageForm?.sectionDescription, d.messageForm.sectionDescription),
      contactFieldLabel: t(doc?.messageForm?.contactFieldLabel, d.messageForm.contactFieldLabel),
      contactPlaceholder: t(doc?.messageForm?.contactPlaceholder, d.messageForm.contactPlaceholder),
      contactHint: t(doc?.messageForm?.contactHint, d.messageForm.contactHint),
      messageFieldLabel: t(doc?.messageForm?.messageFieldLabel, d.messageForm.messageFieldLabel),
      messagePlaceholder: t(doc?.messageForm?.messagePlaceholder, d.messageForm.messagePlaceholder),
      messageHint: t(doc?.messageForm?.messageHint, d.messageForm.messageHint),
      submitButtonText: t(doc?.messageForm?.submitButtonText, d.messageForm.submitButtonText),
      submittingButtonText: t(
        doc?.messageForm?.submittingButtonText,
        d.messageForm.submittingButtonText,
      ),
      errorMessage: t(doc?.messageForm?.errorMessage, d.messageForm.errorMessage),
      successTitle: t(doc?.messageForm?.successTitle, d.messageForm.successTitle),
      successBody: t(doc?.messageForm?.successBody, d.messageForm.successBody),
      formAriaTitle: t(doc?.messageForm?.formAriaTitle, d.messageForm.formAriaTitle),
    },
    andresBlock: {
      name: t(doc?.andresBlock?.name, d.andresBlock.name),
      role: t(doc?.andresBlock?.role, d.andresBlock.role),
      description: t(doc?.andresBlock?.description, d.andresBlock.description),
      highlights,
      websiteUrl: t(doc?.andresBlock?.websiteUrl, d.andresBlock.websiteUrl),
      linkLabel: t(doc?.andresBlock?.linkLabel, d.andresBlock.linkLabel),
      linkHref: t(doc?.andresBlock?.linkHref, d.andresBlock.linkHref),
    },
    opstarBlock: {
      name: t(doc?.opstarBlock?.name, d.opstarBlock.name),
      tagline: t(doc?.opstarBlock?.tagline, d.opstarBlock.tagline),
      description: t(doc?.opstarBlock?.description, d.opstarBlock.description),
      bullets,
      linkLabel: t(doc?.opstarBlock?.linkLabel, d.opstarBlock.linkLabel),
      linkHref: t(doc?.opstarBlock?.linkHref, d.opstarBlock.linkHref),
    },
    servicesSection: {
      sectionTitle: t(doc?.servicesSection?.sectionTitle, d.servicesSection.sectionTitle),
      items,
      registerNote: t(doc?.servicesSection?.registerNote, d.servicesSection.registerNote),
      registerButtonText: t(
        doc?.servicesSection?.registerButtonText,
        d.servicesSection.registerButtonText,
      ),
      registerButtonHref: t(
        doc?.servicesSection?.registerButtonHref,
        d.servicesSection.registerButtonHref,
      ),
    },
    legalNote: {
      beforeLink: t(doc?.legalNote?.beforeLink, d.legalNote.beforeLink),
      linkLabel: t(doc?.legalNote?.linkLabel, d.legalNote.linkLabel),
      linkHref: t(doc?.legalNote?.linkHref, d.legalNote.linkHref),
      afterLink: t(doc?.legalNote?.afterLink, d.legalNote.afterLink),
    },
  }
}
