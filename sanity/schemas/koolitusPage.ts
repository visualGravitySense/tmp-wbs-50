/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { faqQuestionsField } from './fields/faqQuestionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default {
  name: 'koolitusPage',
  title: 'Koolitus Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.koolitusPage],
      description:
        'Ühised marketingu blokid (sama teek kui avalehel). Tühi = legacy väljad allpool.',
    }),
    {
      name: 'featuredReviews',
      title: 'Koolituse lehe tagasiside (Review dokumendid)',
      description:
        'Vali Review dokumendid — kuvatakse koolituslehel (esimesed 3 kaarti; ülejäänu /testimonials). Järjekord = kuvamine. Tühi = uusimad Review automaatselt.',
      type: 'array',
      hidden: true,
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'sharedHero',
      hidden: true,
    },
    {
      name: 'audienceSection',
      title: 'Audience Section',
      type: 'sharedAudience',
      hidden: true,
    },
        {
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Hinnangud',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Mis räägivad meie lõpetajad?',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'Üle 500 tootmisjuhi on juba muutnud oma tööd LEAN abil',
        },
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'quote',
                  title: 'Quote',
                  type: 'text',
                  rows: 3,
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'author',
                  title: 'Author',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'role',
                  title: 'Role',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'company',
                  title: 'Company',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'avatar',
                  title: 'Avatar',
                  type: 'image',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'kkkDocument',
      title: 'KKK — eraldokument (valikuline)',
      type: 'reference',
      hidden: true,
      to: [{ type: 'kkk' }],
      description:
        'Kui valid eraldokumendi, kasutatakse selle sisu (üle kirjutab allpool oleva sisemise KKK ploki). Sobib ühise KKK halduseks mitme lehe jaoks.',
      weak: true,
    },
    {
      name: 'kkk',
      title: 'KKK (Korduma kippuvad küsimused)',
      type: 'object',
      hidden: true,
      description:
        'Kuvatakse pärast hinnangute sektsiooni. Kui ülal on valitud eraldokument, kasutatakse seda. Muidu seda plokki. Kui kummaski pole küsimusi, kuvatakse saidil vaikimisi tekstid.',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'title',
          title: 'Pealkiri',
          type: 'string',
          initialValue: 'Korduma kippuvad küsimused',
        },
        {
          name: 'eyebrow',
          title: 'Märksõna pillis',
          type: 'string',
          initialValue: 'KKK',
        },
        {
          name: 'showEyebrowDots',
          title: 'Näita punkte pillis',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'subtitle',
          title: 'Alapealkiri (valikuline)',
          type: 'text',
          rows: 2,
        },
        faqQuestionsField,
      ],
    },
    {
      name: 'featuresSection',
      title: 'Features Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Omadused',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Miks valida meie 9-päevane programm?',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Unikaalne lähenemine, mis tagasi reaalsed tulemused',
        },
        {
          name: 'mainFeature',
          title: 'Main Feature',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Praktiline õppekeskkond',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              initialValue: 'Õpi reaalses tootmiskeskkonnas, mitte klassiruumis',
            },
            {
              name: 'difference',
              title: 'Difference',
              type: 'text',
              rows: 2,
              initialValue: 'Erinevalt teooria-kursustest, me keskendume otseselt teostusele',
            },
            {
              name: 'factoryBadges',
              title: 'Factory Badges',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                  validation: (Rule: any) => Rule.required(),
                },
              ],
            },
          ],
        },
        {
          name: 'secondaryText',
          title: 'Secondary Text',
          type: 'text',
          rows: 2,
          initialValue: 'Meie programm on disainitud spetsiaalselt tootmisjuhtidele, kes soovivad näha reaalseid muutusi lühikese aja jooksul.',
        },
      ],
    },
    {
      name: 'buildingsSection',
      title: 'Buildings Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Tulemused',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Kuidas meie koolitus muudab sinu tootmist?',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Näita otseseid tulemusi meie lõpetajate ettevõtetes',
        },
        {
          name: 'buildings',
          title: 'Buildings',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Company Name',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'industry',
                  title: 'Industry',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'beforeMetrics',
                  title: 'Before Metrics',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'label',
                          title: 'Label',
                          type: 'string',
                          validation: (Rule: any) => Rule.required(),
                        },
                        {
                          name: 'value',
                          title: 'Value',
                          type: 'string',
                          validation: (Rule: any) => Rule.required(),
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'afterMetrics',
                  title: 'After Metrics',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'label',
                          title: 'Label',
                          type: 'string',
                          validation: (Rule: any) => Rule.required(),
                        },
                        {
                          name: 'value',
                          title: 'Value',
                          type: 'string',
                          validation: (Rule: any) => Rule.required(),
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'testimonial',
                  title: 'Testimonial',
                  type: 'object',
                  fields: [
                    {
                      name: 'quote',
                      title: 'Quote',
                      type: 'text',
                      rows: 2,
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'author',
                      title: 'Author',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                    {
                      name: 'position',
                      title: 'Position',
                      type: 'string',
                      validation: (Rule: any) => Rule.required(),
                    },
                  ],
                },
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                },
                {
                  name: 'buttonText',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'buttonLink',
                  title: 'Button Link',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'leanHouseSection',
      title: 'Lean House Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'LEAN Süsteemi Arhitektuur',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
          initialValue: 'LEAN MAJA Mudel',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
          initialValue: 'Mõista, kuidas LEAN süsteem töötab läbi tõestatud LEAN MAJA raamistiku',
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          initialValue: 'bg-gray-50',
        },
        {
          name: 'roof',
          title: 'Roof Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Kliendikesksus',
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              initialValue: 'Kõrgeim Kvaliteet, Madalaim Hind, Lühim Tarneaeg',
            },
          ],
        },
        {
          name: 'leftPillar',
          title: 'Left Pillar (Just-In-Time)',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Õigel Ajal',
            },
            {
              name: 'shortTitle',
              title: 'Short Title (Badge)',
              type: 'string',
              initialValue: 'JIT',
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
              initialValue: ['Tõmbesüsteem', 'Ühe-tpi Vool', 'Taktaeg', 'Pidev Vool'],
            },
          ],
        },
        {
          name: 'center',
          title: 'Center Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Tuumsüsteemid',
            },
            {
              name: 'systems',
              title: 'Core Systems',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'name',
                      title: 'Name',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                    },
                  ],
                },
              ],
              initialValue: [
                { name: 'INIMLIKKUS', description: '' }
              ],
            },
          ],
        },
        {
          name: 'rightPillar',
          title: 'Right Pillar (Jidoka)',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Jidoka',
            },
            {
              name: 'shortTitle',
              title: 'Short Title (Badge)',
              type: 'string',
              initialValue: 'K',
            },
            {
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
              initialValue: ['Sisseehitatud Kvaliteet', 'Peata & Reageeri', 'Veadeta Tegemine', 'Visuaalne Juhtimine'],
            },
          ],
        },
        {
          name: 'foundation',
          title: 'Foundation Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              initialValue: 'Alus',
            },
            {
              name: 'items',
              title: 'Foundation Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Title',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                    },
                  ],
                },
              ],
              initialValue: [
                { title: 'Operatiivne Stabiilsus', description: 'Usaldusväärsed, kordatavad protsessid' },
                { title: 'Standardiseerimine', description: 'Järjepidevad töömeetodid' },
                { title: '5S & Visuaalne Juhtimine', description: 'Töökoha organiseerimine' },
              ],
            },
          ],
        },
        {
          name: 'sideAnnotations',
          title: 'Side Annotations',
          type: 'object',
          fields: [
            {
              name: 'left',
              title: 'Left Annotation',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  initialValue: 'Tõhusus & Vool',
                },
                {
                  name: 'subtitle',
                  title: 'Subtitle',
                  type: 'string',
                  initialValue: 'Kõrvalda raiskamine',
                },
              ],
            },
            {
              name: 'right',
              title: 'Right Annotation',
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  initialValue: 'Kvaliteet Esmalt',
                },
                {
                  name: 'subtitle',
                  title: 'Subtitle',
                  type: 'string',
                  initialValue: 'Sisseehitatud kvaliteet',
                },
              ],
            },
          ],
        },
        {
          name: 'benefits',
          title: 'Benefits Section',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                },
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                },
              ],
            },
          ],
          initialValue: [
            { icon: '📈', title: '40% Vähem Raiskamist', description: 'Kõrvalda väärtustmitte lisavad tegevused' },
            { icon: '✅', title: 'Kvaliteedi Üleolek', description: 'Sisseehitatud kvaliteet igas sammus' },
            { icon: '⚡', title: '50% Kiirem Tarne', description: 'Lühemad ettevalmistusajad voolu kaudu' },
          ],
        },
      ],
    },
    {
      name: 'investmentSection',
      title: 'Investment Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Investeering',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Mida saad ',
        },
        {
          name: 'titleHighlight',
          title: 'Title Highlight',
          type: 'string',
          initialValue: 'tagasi?',
        },
        {
          name: 'contemplationQuestion',
          title: 'Contemplation Question',
          type: 'string',
          initialValue: 'Mis olukord on sinu tootmises 12 kuu pärast, kui sa jätkad praegusel viisil?',
        },
        {
          name: 'contemplationLabel',
          title: 'Contemplation Label',
          type: 'string',
          initialValue: 'Mõtle hetkeks:',
        },
        {
          name: 'benefitsTitle',
          title: 'Benefits Title',
          type: 'string',
          initialValue: 'Harjumuste omandamise hind sisaldab:',
        },
        {
          name: 'benefits',
          title: 'Benefits',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                },
                {
                  name: 'subtitle',
                  title: 'Subtitle',
                  type: 'string',
                },
                {
                  name: 'isHidden',
                  title: 'Is Hidden',
                  type: 'boolean',
                },
              ],
            },
          ],
        },
        {
          name: 'price',
          title: 'Price',
          type: 'number',
          initialValue: 1490,
        },
        {
          name: 'priceDaily',
          title: 'Price Daily',
          type: 'string',
          initialValue: '= 166 € päevas',
        },
        {
          name: 'priceReframe',
          title: 'Price Reframe',
          type: 'string',
          initialValue: 'Vähem kui üks koosolekupäev sinu ettevõttes. Tagastatav kui programm ei vasta lubatule.',
        },
        {
          name: 'roiCalculator',
          title: 'ROI Calculator',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Arvuta tasuvus kiiresti:',
            },
            {
              name: 'sizes',
              title: 'Sizes',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    },
                    {
                      name: 'sublabel',
                      title: 'Sublabel',
                      type: 'string',
                    },
                    {
                      name: 'result',
                      title: 'Result',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
            {
              name: 'defaultResult',
              title: 'Default Result',
              type: 'string',
            },
            {
              name: 'sendRoiText',
              title: 'Send ROI Text',
              type: 'string',
            },
          ],
        },
        {
          name: 'guarantee',
          title: 'Guarantee',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
          ],
        },
        {
          name: 'primaryButtonText',
          title: 'Primary Button Text',
          type: 'string',
        },
        {
          name: 'secondaryButtonText',
          title: 'Secondary Button Text',
          type: 'string',
        },
        {
          name: 'peerProof',
          title: 'Peer Proof',
          type: 'object',
          fields: [
            {
              name: 'avatarInitials',
              title: 'Avatar Initials',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
            {
              name: 'highlight',
              title: 'Highlight',
              type: 'string',
            },
          ],
        },
        {
          name: 'contactInfo',
          title: 'Contact Info',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
            {
              name: 'phone',
              title: 'Phone',
              type: 'string',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
          ],
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
        },
      ],
    },
    {
      name: 'leadFormTeaser',
      title: 'Tehase kiiraudit (Tootmisaudit)',
      type: 'helpFormTeaserBlock',
      hidden: true,
      description:
        'Teine vorm (teine forms.gle link kui avalehel). Näidatakse pärast investeeringu sektsiooni, enne grupi/kuupäevade tabelit — lugeja on juba sisu läbi mõelnud.',
      options: { collapsible: true, collapsed: true },
      initialValue: {
        enabled: true,
        eyebrow: 'Veel ei ole kindel?',
        title: 'Kirjelda lühidalt oma olukorda — vaatan, kuidas sind kõige paremini aidata',
        description:
          'See on eraldi lühiküsitlus (teine link kui avalehel). Vastuste juurde võid jätta e-posti, et saaksin personaalset tagasisidet anda.',
        buttonText: 'Ava küsitlus',
        formUrl: 'https://docs.google.com/forms/d/1nkHdEW-FH3GhnCrI3zGe2K3v5tgzBP9QKvfMXv0lLFY/viewform',
      },
    },
    {
      name: 'cohortsSection',
      title: 'Cohorts Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Kohordid',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Grupid ja koolituspäevad',
        },
        {
          name: 'filterLabel',
          title: 'Filter Label',
          type: 'string',
          initialValue: 'Millal saad olla 9 päevaks eemal?',
        },
        {
          name: 'filters',
          title: 'Filters',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                },
                {
                  name: 'active',
                  title: 'Active',
                  type: 'boolean',
                },
              ],
            },
          ],
        },
        {
          name: 'cohorts',
          title: 'Grupid (read tabel + registreerumine)',
          type: 'array',
          description:
            'Iga rida = üks koolitusgrupp (nagu koolituslehel). Täida vähemalt ID, pealkiri, kuupäevad, asukoht, kohad ja hind — ülejäänu valikuline.',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'id',
                  title: 'Grupi ID (kohustuslik registreerumise lingi jaoks)',
                  type: 'string',
                  description:
                    'Ühesõnaline kood (nt lean-tallinn-2026-04). Peab olema unikaalne. Registreerumine: /register?cohort=SIIA — sama väärtus.',
                },
                {
                  name: 'trainingTitle',
                  title: 'Koolituse pealkiri (veerg «Koolitus»)',
                  type: 'string',
                  description: 'Nt LEAN Edasijõudnud, LEAN Põhikoolitus. Kui tühi, kasutatakse välja «Nimi».',
                },
                {
                  name: 'name',
                  title: 'Lühinimi / varu-pealkiri',
                  type: 'string',
                  description: 'Kasutatakse ainult siis, kui «Koolituse pealkiri» on tühi.',
                },
                {
                  name: 'location',
                  title: 'Asukoht',
                  type: 'string',
                  description: 'Nt Tallinn, Nordic Hotel Forum',
                },
                {
                  name: 'dates',
                  title: 'Kuupäevad (tekst)',
                  type: 'string',
                  description:
                    'Eesti formaat: «22. aprill 2026 kuni 24. aprill 2026» (sõna «kuni» või sidekriips). Leht lisab automaatselt ISO-nädala, kui formaat ühtib.',
                },
                {
                  name: 'daysUntil',
                  title: 'Tekst enne algust',
                  type: 'string',
                  description: 'Nt Alguseni: 12 päeva (valikuline).',
                },
                {
                  name: 'timing',
                  title: 'Ajafilter (ülemised nupud)',
                  type: 'string',
                  description: 'soon = lähiaeg; mid = kaugem; flex = paindlik.',
                  options: {
                    list: [
                      { title: 'Peagi (soon)', value: 'soon' },
                      { title: '3–6 kuu (mid)', value: 'mid' },
                      { title: 'Paindlik (flex)', value: 'flex' },
                    ],
                  },
                },
                {
                  name: 'statusLabel',
                  title: 'Staatus — tekst tabelis',
                  type: 'string',
                  description: 'Nt Aktiivne, Tulemas, Lõpetatud. Kui tühi, arvutatakse timing / lõpetatud väljadest.',
                },
                {
                  name: 'statusTone',
                  title: 'Staatus — värv (punkti toon)',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Aktiivne (oranž)', value: 'active' },
                      { title: 'Tulemas (sinine)', value: 'upcoming' },
                      { title: 'Lõpetatud (hall)', value: 'finished' },
                    ],
                  },
                },
                {
                  name: 'isCompleted',
                  title: 'Lõpetatud rida (hall, nupp väljas)',
                  type: 'boolean',
                  description: 'Märgi, kui grupp on läbi või täis ja registreeruda ei saa.',
                },
                {
                  name: 'isHighlighted',
                  title: 'Esiletõst (oranž äär + kerge taust)',
                  type: 'boolean',
                  description: 'Kasuta ühe «kõige pakilisema» grupi jaoks.',
                },
                {
                  name: 'spotsTotal',
                  title: 'Kohti kokku',
                  type: 'number',
                  description: 'Grupi maht (nt 20).',
                },
                {
                  name: 'spotsAvailable',
                  title: 'Vabu kohti',
                  type: 'number',
                  description: 'Nt 2. Kui «Täidetud» on tühi, arvutatakse täidetud = total − available.',
                },
                {
                  name: 'spotsFilled',
                  title: 'Täidetud kohti (käsitsi)',
                  type: 'number',
                  description:
                    'Valikuline. Kui määrad, kasutatakse seda riba jaoks; muidu arvutatakse total − available.',
                },
                {
                  name: 'price',
                  title: 'Hind (tekst)',
                  type: 'string',
                  description: 'Nt €1 290 või €990',
                },
                {
                  name: 'priceNote',
                  title: 'Hinnainfo (roheline rida all)',
                  type: 'string',
                  description: 'Nt ≈€258 pärast toetust',
                },
                {
                  name: 'badges',
                  title: 'Märgised (nt «2 kohta veel»)',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'text',
                          title: 'Tekst',
                          type: 'string',
                        },
                        {
                          name: 'type',
                          title: 'Tüüp',
                          type: 'string',
                          description: 'Urgent = oranž kiire stiil.',
                          options: {
                            list: [
                              { title: 'Kiire / täis (urgent)', value: 'urgent' },
                              { title: 'Avatud (open)', value: 'open' },
                              { title: 'Eelregistreerimine (pre)', value: 'pre' },
                              { title: 'Soovitus (rec)', value: 'rec' },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'ctaVariant',
                  title: 'Toiming-nupu värv',
                  type: 'string',
                  description: 'orange = oranž «Hoia koht»; blue = sinine «Registreeru»; disabled = hall.',
                  options: {
                    list: [
                      { title: 'Oranž (orange)', value: 'orange' },
                      { title: 'Sinine (blue)', value: 'blue' },
                      { title: 'Keelatud (disabled)', value: 'disabled' },
                    ],
                  },
                },
                {
                  name: 'buttonText',
                  title: 'Nupu tekst',
                  type: 'string',
                  description: 'Nt Hoia koht kinni →, Registreeru →, Grupp täis',
                },
                {
                  name: 'buttonUrl',
                  title: 'Nupu link (valikuline)',
                  type: 'string',
                  description:
                    'Facebooki sündmus, vorm vms. Kui tühi: /register?cohort=<Grupi ID>.',
                },
                {
                  name: 'buttonStyle',
                  title: 'Nupu stiil (vanem väli)',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' },
                      { title: 'Outline', value: 'outline' },
                    ],
                  },
                },
                {
                  name: 'calendarLabel',
                  title: 'Kalendri lingi silt',
                  type: 'string',
                  description: 'Nt Lisa kalendrisse',
                },
                {
                  name: 'calendarLinks',
                  title: 'Kalendri valikud',
                  type: 'array',
                  of: [{ type: 'string' }],
                  description:
                    'Lisa ridadeks täpne tekst «Google», et Google Calendar link ilmuks (ülejäänud valikud on tulevikus).',
                },
                {
                  name: 'trainingDates',
                  title: 'Koolituspäevade andmed (kalendri jaoks)',
                  type: 'array',
                  description: 'Lisa siia iga koolituspäev eraldi, et kasutaja saaks need kalendrisse ühe vajutusega salvestada.',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        { name: 'date', title: 'Kuupäev (YYYY-MM-DD)', type: 'date' },
                        { name: 'startTime', title: 'Algusaeg (HH:mm)', type: 'string' },
                        { name: 'endTime', title: 'Lõpuaeg (HH:mm)', type: 'string' },
                        { name: 'location', title: 'Asukoht (selle päeva asukoht)', type: 'string' },
                      ]
                    }
                  ]
                },
                {
                  name: 'socialProof',
                  title: 'Sotsiaalne tõend (bänneri tekst)',
                  type: 'object',
                  fields: [
                    {
                      name: 'initials',
                      title: 'Initsiaalid (avatarid)',
                      type: 'array',
                      of: [{ type: 'string' }],
                    },
                    {
                      name: 'text',
                      title: 'Tekst',
                      type: 'string',
                      description: 'Kuvatakse sinise bännerina tabeli kohal, kui rida on esiletõstetud / kiire.',
                    },
                  ],
                },
                {
                  name: 'countdown',
                  title: 'Bänneri alternatiivtekst',
                  type: 'string',
                  description: 'Kui socialProof.text puudub, võid kasutada seda sama bänneri jaoks.',
                },
                {
                  name: 'preRegistrationInfo',
                  title: 'Eelregistreerimise pealkiri',
                  type: 'string',
                },
                {
                  name: 'preRegistrationBenefits',
                  title: 'Eelregistreerimise punktid',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
              preview: {
                select: {
                  title: 'trainingTitle',
                  name: 'name',
                  dates: 'dates',
                  loc: 'location',
                  id: 'id',
                },
                prepare(sel: Record<string, string | undefined>) {
                  const title = sel.title || sel.name || 'Grupp'
                  const sub = [sel.dates, sel.loc, sel.id ? `#${sel.id}` : ''].filter(Boolean).join(' · ')
                  return { title, subtitle: sub || undefined }
                },
              },
            },
          ],
        },
        {
          name: 'maxParticipantsNote',
          title: 'Max Participants Note',
          type: 'string',
          initialValue: 'Grupis on alati max 16 osalejat — rohkem ei võta. See on programmi osa, mitte piirang.',
        },
        {
          name: 'jtbdSection',
          title: 'JTBD Section',
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            },
            {
              name: 'buttons',
              title: 'Buttons',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    },
                    {
                      name: 'icon',
                      title: 'Icon',
                      type: 'string',
                    },
                    {
                      name: 'response',
                      title: 'Response',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
        },
      ],
    },
    {
      name: 'certificateSection',
      title: 'Certificate Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Tunnistus',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Sa lahkud ',
        },
        {
          name: 'titleHighlight',
          title: 'Title Highlight',
          type: 'string',
          initialValue: 'tõendatult',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Sertifikaat tõendab mitte ainult, et sa läbisid koolituse — vaid et sa oled võimeline juhtima tootmist süsteemselt.',
        },
        {
          name: 'proofText',
          title: 'Proof Text',
          type: 'string',
          initialValue: 'on seda sertifikaati kasutanud töövestlustel, edutamistel ja klientide veenmisel.',
        },
        {
          name: 'proofNumber',
          title: 'Proof Number',
          type: 'string',
          initialValue: '147 lõpetajat',
        },
        {
          name: 'habitLabel',
          title: 'Habit Label',
          type: 'string',
          initialValue: 'Sinu valitud peamine harjumus:',
        },
        {
          name: 'habitText',
          title: 'Habit Text',
          type: 'string',
          initialValue: '— Sertifikaat kinnitab, et sa oled seda harjumust koolitusel praktiseerinud ja mõõdetavat tulemust näidanud.',
        },
        {
          name: 'habitHighlight',
          title: 'Habit Highlight',
          type: 'string',
          initialValue: 'Ennetama',
        },
        {
          name: 'meaningLabel',
          title: 'Meaning Label',
          type: 'string',
          initialValue: 'Mida sertifikaat sulle annab?',
        },
        {
          name: 'meaningPills',
          title: 'Meaning Pills',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                },
                {
                  name: 'active',
                  title: 'Active',
                  type: 'boolean',
                },
                {
                  name: 'responseText',
                  title: 'Vastuse tekst',
                  description: 'See tekst kuvatakse kui kasutaja vajutab sellele nupule. Asendab vana Meaning Responses lahenduse.',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'responseExample',
                  title: 'Vastuse näide',
                  type: 'string',
                },
              ],
            },
          ],
          initialValue: [
            { label: 'Karjäärivõimalused', value: 'career', active: false },
            { label: 'Usaldusväärsus klientidele', value: 'client', active: true },
            { label: 'Enesekindlus juhtimises', value: 'confidence', active: false }
          ],
        },
        {
          name: 'meaningResponses',
          title: 'Meaning Responses',
          type: 'object',
          fields: [
            {
              name: 'career',
              title: 'Career Response',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Text',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'example',
                  title: 'Example',
                  type: 'string',
                },
              ],
            },
            {
              name: 'client',
              title: 'Client Response',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Text',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'example',
                  title: 'Example',
                  type: 'string',
                },
              ],
            },
            {
              name: 'confidence',
              title: 'Confidence Response',
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Text',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'example',
                  title: 'Example',
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          name: 'useCasesTitle',
          title: 'Use Cases Title',
          type: 'string',
          initialValue: 'Kuidas 147 lõpetajat seda kasutasid:',
        },
        {
          name: 'useCases',
          title: 'Use Cases',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon Path',
                  type: 'string',
                },
                {
                  name: 'text',
                  title: 'Text',
                  type: 'string',
                },
                {
                  name: 'author',
                  title: 'Author',
                  type: 'string',
                },
                {
                  name: 'role',
                  title: 'Role',
                  type: 'string',
                },
                {
                  name: 'company',
                  title: 'Company',
                  type: 'string',
                },
                {
                  name: 'timeframe',
                  title: 'Timeframe',
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          name: 'requirementsTitle',
          title: 'Requirements Title',
          type: 'string',
          initialValue: 'Sertifikaadi saamise tingimused:',
        },
        {
          name: 'requirements',
          title: 'Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'certName',
          title: 'Certificate Name',
          type: 'string',
          initialValue: 'OpStar Profit™ · Rahvusvaheline tunnistus',
        },
        {
          name: 'certTitle',
          title: 'Certificate Title',
          type: 'string',
          initialValue: 'LEAN Production Management<br>Certificate',
        },
        {
          name: 'certificateImage',
          title: 'Sertifikaadi Pilt (Screenshot)',
          type: 'image',
          description: 'Laadi siia sertifikaadi pilt (näiteks screenshot PDF-ist). Kui pilt on olemas, kuvatakse seda disaini asemel.',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'certSubtitle',
          title: 'Certificate Subtitle',
          type: 'string',
          initialValue: 'Intensive 9-Day Professional Programme',
        },
        {
          name: 'certMeta',
          title: 'Certificate Meta',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'value',
                  title: 'Value',
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          name: 'countriesTitle',
          title: 'Countries Title',
          type: 'string',
          initialValue: 'Tunnustatud riigid',
        },
        {
          name: 'countriesSubtitle',
          title: 'Countries Subtitle',
          type: 'string',
          initialValue: '(14 riiki Euroopas)',
        },
        {
          name: 'countries',
          title: 'Countries',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'flag',
                  title: 'Flag',
                  type: 'string',
                },
                {
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          name: 'alumniTitle',
          title: 'Alumni Title',
          type: 'string',
          initialValue: 'OpStar Alumni võrgustik',
        },
        {
          name: 'alumniText',
          title: 'Alumni Text',
          type: 'string',
          initialValue: 'Sertifikaat avab ligipääsu ',
        },
        {
          name: 'alumniHighlight',
          title: 'Alumni Highlight',
          type: 'string',
          initialValue: '147+ lõpetajate võrgustikule',
        },
        {
          name: 'alumniAvatars',
          title: 'Alumni Avatars',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'Kas sertifikaat on sinu peamine põhjus? → Registreeru otse',
        },
        {
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'string',
          initialValue: '#',
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          initialValue: 'bg-gray-50',
        },
      ],
    },
    {
      name: 'pricesSection',
      title: 'Prices Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow',
          type: 'string',
          initialValue: 'Hinnad',
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Hinnakiri 2026–2027',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
          initialValue: 'Eraisikule, ettevõttele ja grupile — EIS toetusega kuni 50% tagasi.',
        },
        {
          name: 'priceCards',
          title: 'Price Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'type',
                  title: 'Card Type',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'price',
                  title: 'Price',
                  type: 'string',
                },
                {
                  name: 'priceVat',
                  title: 'Price VAT Info',
                  type: 'string',
                },
                {
                  name: 'featuredBadge',
                  title: 'Featured Badge',
                  type: 'string',
                },
                {
                  name: 'eisSupport',
                  title: 'EIS Support',
                  type: 'string',
                },
                {
                  name: 'features',
                  title: 'Features',
                  type: 'array',
                  of: [{ type: 'string' }],
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'buttonText',
                  title: 'Button Text',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'buttonLink',
                  title: 'Button Link',
                  type: 'string',
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: 'buttonStyle',
                  title: 'Button Style',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' },
                    ],
                  },
                  initialValue: 'primary',
                },
                {
                  name: 'isFeatured',
                  title: 'Is Featured',
                  type: 'boolean',
                  initialValue: false,
                },
              ],
            },
          ],
          initialValue: [
            {
              type: 'Eraisik / omanik',
              price: '890',
              priceVat: '+ km',
              features: [
                '9-päevane programm täies mahus',
                'Kõik materjalid ja mallid',
                'OPSTAR PROFIT™ tunnistus',
                'Toitlustus kõik päevad'
              ],
              buttonText: 'Registreeru →',
              buttonLink: '#registreeru',
              buttonStyle: 'primary',
              isFeatured: false
            },
            {
              type: 'Ettevõte',
              price: '1290',
              priceVat: '+ km · EIS → alates 645 €',
              featuredBadge: '⭐ Populaarseim',
              eisSupport: '✓ EIS toetus kuni 50%',
              features: [
                'Kõik eelmises paketis sisalduv',
                '12 kuud järeltuge Andreselt',
                'Individuaalsed coachingu sessioonid',
                'Arve ettevõttele, EIS menetlus kaetud'
              ],
              buttonText: 'Registreeru →',
              buttonLink: '#registreeru',
              buttonStyle: 'primary',
              isFeatured: true
            },
            {
              type: 'Grupp 5+',
              price: 'Küsi hinda',
              priceVat: 'Kohapeal koolitus',
              features: [
                'Programm teie ettevõttes kohapeal',
                'Kohandatud teie tootmise jaoks',
                'Grupihind 5+ osalejale',
                'Paindlik ajakava'
              ],
              buttonText: 'Võta ühendust →',
              buttonLink: 'mailto:andres@tootmisjuhtimine.ee',
              buttonStyle: 'secondary',
              isFeatured: false
            }
          ],
        },
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          initialValue: 'bg-white',
        },
      ],
    },
    {
      name: 'finalCTA',
      title: 'Lõpu sinine CTA (koolitusleht)',
      type: 'finalCtaBlock',
      hidden: true,
      description:
        'Sama bänner mis avalehel. Täida ainult need väljad, mis peavad koolituslehel erinema avalehest; tühjad jäetud väljad võetakse avalehe «Lõpu CTA» seadistusest.',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'ctaSection',
      title: 'CTA plokk',
      type: 'ctaSection',
      hidden: true,
      description: 'Klaasplokk lehel: tekstid ja nupu link(id).',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      hidden: true,
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'backgroundColor',
          title: 'Background Gradient',
          type: 'string',
          options: {
            list: [
              { title: 'Blue to Purple', value: 'blue-purple' },
              { title: 'Purple to Pink', value: 'purple-pink' },
              { title: 'Green to Blue', value: 'green-blue' },
              { title: 'Orange to Red', value: 'orange-red' },
              { title: 'Blue to Light Blue', value: 'blue-lightblue' },
            ],
          },
          initialValue: 'blue-lightblue',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'string',
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'metaKeywords',
          title: 'Meta keywords (SEO võtmesõnad - komadega eraldatud)',
          type: 'string',
        },
        {
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      headline: 'hero.headline',
    },
    prepare(selection: any) {
      const { title, headline } = selection
      return {
        title: title,
        subtitle: headline,
      }
    },
  },
}
