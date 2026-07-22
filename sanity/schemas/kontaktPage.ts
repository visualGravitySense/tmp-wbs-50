import { defineField, defineType } from 'sanity'

import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

const linkFields = [
  defineField({
    name: 'label',
    title: 'Lingi tekst',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'href',
    title: 'URL või tee',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
]

export default defineType({
  name: 'kontaktPage',
  title: 'Kontakt leht',
  description:
    'Ava Studio menüüst „Kontakt leht“ (singleton). Ära loo uut dokumenti käsitsi — muidu võib saidil kuvada vana vaike teksti.',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'builder', title: 'Page Builder' },
    { name: 'hero', title: 'Hero' },
    { name: 'quick', title: 'Otsekontakt' },
    { name: 'form', title: 'Sõnumivorm' },
    { name: 'andres', title: 'Andres Kase plokk' },
    { name: 'opstar', title: 'OPSTAR PROFIT plokk' },
    { name: 'services', title: 'Teenused' },
    { name: 'legal', title: 'Jalus' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Sisemine pealkiri',
      type: 'string',
      initialValue: 'Kontakt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'richText',
      title: 'Description / Rich Text Content (Rich Text sisu)',
      type: 'array',
      hidden: true,
      of: [{ type: 'block' }],
      description: 'Long-form textual blocks for the Kontakt page.',
    }),
    {
      ...definePageSectionsField({
        allowedTypes: [...pageBuilderPresets.kontaktPage],
        description:
          'Ühised blokid (hero, about, testimonials, CTA). Tühi = legacy kontaktiväljad allpool.',
      }),
      group: 'builder',
    },
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta pealkiri',
          type: 'string',
          initialValue: 'Kontakt — Andres Kase',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta kirjeldus',
          type: 'text',
          rows: 3,
          initialValue:
            'Võta ühendust Andresega: e-post, telefon, aadress Viljandis. OPSTAR PROFIT™ koolitused, konsultatsioonid ja tootmisjuhtimine.',
        }),
        defineField({
          name: 'metaKeywords',
          title: 'Võtmesõnad (komadega eraldatud)',
          type: 'string',
          initialValue: 'kontakt, andres kase, tootmisjuhtimine, opstar profit, konsultatsioon',
        }),
        defineField({
          name: 'ogImage',
          title: 'Sotsiaalmeedia jagamispilt (Open Graph)',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      hidden: true,
      group: 'hero',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Pildiriba (pill)',
          type: 'string',
          initialValue: 'Kontakt ja koostöö',
        }),
        defineField({
          name: 'pageTitle',
          title: 'Pealkiri (H1)',
          type: 'string',
          initialValue: 'Võta ühendust',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'intro',
          title: 'Sissejuhatus',
          type: 'text',
          rows: 4,
          initialValue:
            'Kõik koolitused, konsultatsioonid ja OPSTAR PROFIT™ programmid on seotud Andres Kase ja tema praktilise tootmisjuhtimise kogemusega. Kirjuta, helista või täida vorm — leiame koos järgmise sammu.',
        }),
        defineField({
          name: 'image',
          title: 'Hero Pilt (paremal poolel)',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'quickContact',
      title: 'Otsekontakt',
      type: 'object',
      hidden: true,
      group: 'quick',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Ploki pealkiri',
          type: 'string',
          initialValue: 'Otsekontakt',
        }),
        defineField({
          name: 'labelEmail',
          title: 'Silt: e-post',
          type: 'string',
          initialValue: 'E-post',
        }),
        defineField({
          name: 'labelPhone',
          title: 'Silt: telefon',
          type: 'string',
          initialValue: 'Telefon',
        }),
        defineField({
          name: 'labelAddress',
          title: 'Silt: aadress',
          type: 'string',
          initialValue: 'Aadress',
        }),
        defineField({
          name: 'labelResponse',
          title: 'Silt: vastamine',
          type: 'string',
          initialValue: 'Vastamine',
        }),
        defineField({
          name: 'emails',
          title: 'E-posti aadressid',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Silt', type: 'string' }),
                defineField({ name: 'address', title: 'E-post', type: 'string' }),
              ],
              preview: {
                select: { title: 'address', subtitle: 'label' },
              },
            },
          ],
          initialValue: [
            { label: 'Üldine', address: 'andreskase@tootmisjuhtimine.ee' },
            { label: 'Koolitus ja pakkumised', address: 'andres@tootmisjuhtimine.ee' },
          ],
        }),
        defineField({
          name: 'phoneDisplay',
          title: 'Telefon (kuvatav)',
          type: 'string',
          initialValue: '+372 51 38 403',
        }),
        defineField({
          name: 'phoneTel',
          title: 'Telefon (tel: link)',
          description: 'Ilma tühikuteta, nt +3725138403',
          type: 'string',
          initialValue: '+3725138403',
        }),
        defineField({
          name: 'addressStreet',
          title: 'Aadress — tänav',
          type: 'string',
          initialValue: 'Tartu 11 / Lossi 29',
        }),
        defineField({
          name: 'addressPostalCode',
          title: 'Aadress — postiindeks',
          type: 'string',
          initialValue: '71004',
        }),
        defineField({
          name: 'addressCity',
          title: 'Aadress — linn',
          type: 'string',
          initialValue: 'Viljandi',
        }),
        defineField({
          name: 'addressCountry',
          title: 'Aadress — riik',
          type: 'string',
          initialValue: 'Eesti',
        }),
        defineField({
          name: 'responseNote',
          title: 'Vastamise tekst',
          type: 'string',
          initialValue: 'Vastame tavaliselt 24 tunni jooksul tööpäevadel.',
        }),
        defineField({
          name: 'mapLinkLabel',
          title: 'Kaardi lingi tekst',
          type: 'string',
          initialValue: 'Ava kaardil',
        }),
        defineField({
          name: 'mapQuery',
          title: 'Kaardi otsing (Google Maps)',
          type: 'string',
          initialValue: 'Tartu 11 Lossi 29 Viljandi Eesti',
        }),
        defineField({
          name: 'emailButtonText',
          title: 'Nupp: kirjuta e-kirjaga',
          type: 'string',
          initialValue: 'Kirjuta e-kirjaga',
        }),
        defineField({
          name: 'phoneButtonText',
          title: 'Nupp: helista',
          type: 'string',
          initialValue: 'Helista',
        }),
        defineField({
          name: 'primaryEmailForButtons',
          title: 'E-post nuppude jaoks',
          description: 'Kui tühi, kasutatakse esimest e-posti nimekirjast.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'messageForm',
      title: 'Sõnumivorm',
      type: 'object',
      hidden: true,
      group: 'form',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Ploki pealkiri',
          type: 'string',
          initialValue: 'Saada sõnum',
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Ploki kirjeldus',
          type: 'text',
          rows: 3,
          initialValue:
            'Kirjelda lühidalt oma olukorda — koolitus, konsultatsioon või OPSTAR PROFIT™. Lisa e-post või telefon, et saaksime vastata samale kanalile.',
        }),
        defineField({
          name: 'contactFieldLabel',
          title: 'Väli: e-post/telefon — silt',
          type: 'string',
          initialValue: 'E-post või telefon',
        }),
        defineField({
          name: 'contactPlaceholder',
          title: 'Väli: e-post/telefon — placeholder',
          type: 'string',
          initialValue: 'nimi@näide.ee või +372 …',
        }),
        defineField({
          name: 'contactHint',
          title: 'Väli: e-post/telefon — vihje',
          type: 'string',
          initialValue: 'Kehtiv e-post või telefoninumber (vähemalt 8 numbrit).',
        }),
        defineField({
          name: 'messageFieldLabel',
          title: 'Väli: sõnum — silt',
          type: 'string',
          initialValue: 'Sõnum',
        }),
        defineField({
          name: 'messagePlaceholder',
          title: 'Väli: sõnum — placeholder',
          type: 'string',
          initialValue:
            'Kirjelda lühidalt, millega saame aidata — koolitus, konsultatsioon või OPSTAR PROFIT™…',
        }),
        defineField({
          name: 'messageHint',
          title: 'Väli: sõnum — vihje',
          type: 'string',
          initialValue: 'Vähemalt 10 tähemärki · kuni 3500',
        }),
        defineField({
          name: 'submitButtonText',
          title: 'Nupp: saada',
          type: 'string',
          initialValue: 'Saada sõnum',
        }),
        defineField({
          name: 'submittingButtonText',
          title: 'Nupp: saadan…',
          type: 'string',
          initialValue: 'Saadan…',
        }),
        defineField({
          name: 'errorMessage',
          title: 'Viga teade',
          type: 'string',
          initialValue: 'Saatmine ebaõnnestus. Proovi hetke pärast uuesti või kirjuta otse e-postiga.',
        }),
        defineField({
          name: 'successTitle',
          title: 'Õnnestumine — pealkiri',
          type: 'string',
          initialValue: 'Aitäh — sõnum on kohale jõudnud.',
        }),
        defineField({
          name: 'successBody',
          title: 'Õnnestumine — tekst',
          type: 'text',
          rows: 2,
          initialValue:
            'Andres vastab esimesel võimalusel, tavaliselt sama või järgmise tööpäeva jooksul.',
        }),
        defineField({
          name: 'formAriaTitle',
          title: 'Ekraaniluger: vormi pealkiri',
          type: 'string',
          initialValue: 'Saada sõnum',
        }),
      ],
    }),
    defineField({
      name: 'andresBlock',
      title: 'Andres Kase plokk',
      type: 'object',
      hidden: true,
      group: 'andres',
      fields: [
        defineField({ name: 'name', title: 'Nimi', type: 'string', initialValue: 'Andres Kase' }),
        defineField({
          name: 'role',
          title: 'Roll',
          type: 'string',
          initialValue: 'Tootmisjuhtimise koolitaja ja konsultant',
        }),
        defineField({
          name: 'description',
          title: 'Kirjeldus',
          type: 'text',
          rows: 4,
          initialValue:
            'Eesti juhtiv tootmisjuhtimise koolitaja — üle 25 aasta praktikat tootmisettevõtetes, 100+ tehase kogemus ja personaalsed programmid, mis ühendavad LEAN, TPS ja reaalse põranda töö.',
        }),
        defineField({
          name: 'highlights',
          title: 'Täpploend',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'label', title: 'Silt (paks)', type: 'string' }),
                defineField({ name: 'text', title: 'Tekst', type: 'string' }),
              ],
              preview: { select: { title: 'label', subtitle: 'text' } },
            },
          ],
          initialValue: [
            { label: 'Koolitused:', text: '9-päevane tootmisjuhtide programm ja ettevõttesisesed lahendused' },
            { label: 'Konsultatsioon:', text: 'protsessid, KPI, Gemba, meeskonna areng' },
            { label: 'Veeb:', text: 'tootmisjuhtimine.ee' },
          ],
        }),
        defineField({
          name: 'websiteUrl',
          title: 'Veebilehe URL',
          type: 'string',
          initialValue: 'https://tootmisjuhtimine.ee',
        }),
        defineField({
          name: 'linkLabel',
          title: 'Lingi tekst',
          type: 'string',
          initialValue: 'Loe lähemalt Andresest →',
        }),
        defineField({
          name: 'linkHref',
          title: 'Link',
          type: 'string',
          initialValue: '/andres-kase',
        }),
      ],
    }),
    defineField({
      name: 'opstarBlock',
      title: 'OPSTAR PROFIT plokk',
      type: 'object',
      hidden: true,
      group: 'opstar',
      fields: [
        defineField({
          name: 'name',
          title: 'Pealkiri',
          type: 'string',
          initialValue: 'OPSTAR PROFIT™',
        }),
        defineField({
          name: 'tagline',
          title: 'Alapealkiri',
          type: 'string',
          initialValue: 'Tootmisjuhtimise raamistik Eesti ettevõtetele',
        }),
        defineField({
          name: 'description',
          title: 'Kirjeldus',
          type: 'text',
          rows: 4,
          initialValue:
            'Kaheksa komponendiga süsteem, mis on loodud Eesti tootmisettevõtete vajadustest — kiirem rakendamine kui abstraktne LEAN, selged tööriistad ja mõõdetavad tulemused. Koolitused ja sertifikaadid viivad läbi Andres Kase.',
        }),
        defineField({
          name: 'bullets',
          title: 'Täpploend',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            '8-komponentne raamistik ja praktilised tööriistad',
            'Tehasekülastused ja reaalsete näidete põhine õpe',
            'Rahvusvaheline tunnistus programmi lõpetamisel',
          ],
        }),
        defineField({
          name: 'linkLabel',
          title: 'Lingi tekst',
          type: 'string',
          initialValue: 'Tutvu OPSTAR PROFIT™ raamistikuga →',
        }),
        defineField({
          name: 'linkHref',
          title: 'Link',
          type: 'string',
          initialValue: '/opstar-profit',
        }),
      ],
    }),
    defineField({
      name: 'servicesSection',
      title: 'Teenused',
      type: 'object',
      hidden: true,
      group: 'services',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Ploki pealkiri',
          type: 'string',
          initialValue: 'Mille jaoks võtta ühendust?',
        }),
        defineField({
          name: 'items',
          title: 'Kaardid',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
                defineField({ name: 'text', title: 'Tekst', type: 'text', rows: 2 }),
                ...linkFields,
              ],
              preview: { select: { title: 'title', subtitle: 'label' } },
            },
          ],
          initialValue: [
            {
              title: 'Koolitus ja registreerumine',
              text: '9-päevane programm, vabad kohad, Töötukassa toetus.',
              label: 'Koolitusleht',
              href: '/koolitus',
            },
            {
              title: 'Konsultatsioon',
              text: 'Tehase külastus, audit või juhtimise arendus.',
              label: 'Konsultatsioonid',
              href: '/andres-kase',
            },
            {
              title: 'OPSTAR PROFIT™',
              text: 'Raamistiku tutvustus ja rakendamine ettevõttes.',
              label: 'OPSTAR leht',
              href: '/opstar-profit',
            },
          ],
        }),
        defineField({
          name: 'registerNote',
          title: 'Registreerumise tekst',
          type: 'text',
          rows: 2,
          initialValue:
            'Oled valmis registreeruma? Täida registreerimisvorm — vastame küsimustele enne kinnitamist.',
        }),
        defineField({
          name: 'registerButtonText',
          title: 'Registreerumise nupu tekst',
          type: 'string',
          initialValue: 'Registreeru kursusele',
        }),
        defineField({
          name: 'registerButtonHref',
          title: 'Registreerumise nupu link',
          type: 'string',
          initialValue: '/register',
        }),
      ],
    }),
    defineField({
      name: 'legalNote',
      title: 'Privaatsuse viide (lehe jalus)',
      type: 'object',
      hidden: true,
      group: 'legal',
      fields: [
        defineField({
          name: 'beforeLink',
          title: 'Tekst enne linki',
          type: 'string',
          initialValue: 'Isikuandmete töötlemise kohta vt',
        }),
        defineField({
          name: 'linkLabel',
          title: 'Lingi tekst',
          type: 'string',
          initialValue: 'privaatsuspoliitikat',
        }),
        defineField({
          name: 'linkHref',
          title: 'Lingi URL',
          type: 'string',
          initialValue: '/privacy-policy',
        }),
        defineField({
          name: 'afterLink',
          title: 'Tekst pärast linki',
          type: 'string',
          initialValue:
            '. Vastutav töötleja kontaktandmete suhtes on Andres Kase (andreskase@tootmisjuhtimine.ee).',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'hero.pageTitle', subtitle: 'title' },
    prepare({ title, subtitle }) {
      return { title: title || 'Kontakt', subtitle: subtitle || '' }
    },
  },
})
