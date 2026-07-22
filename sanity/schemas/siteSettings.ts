import { defineType, defineField, defineArrayMember } from 'sanity'

import { nineDaysProgramFields } from './fields/nineDaysProgramFields'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'globalStats',
      title: 'Üldine statistika (Numbrite blokk)',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Pealkiri (valikuline)',
          type: 'string',
        }),
        defineField({
          name: 'stats',
          title: 'Statistika',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'statItem',
              title: 'Statistika rida',
              fields: [
                defineField({ name: 'number', title: 'Number', type: 'string' }),
                defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
                defineField({ name: 'label', title: 'Silt / Kirjeldus', type: 'string' })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text'
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image'
        })
      ]
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string'
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string'
        }),
        defineField({
          name: 'accentColor',
          title: 'Accent Color',
          type: 'string'
        }),
        defineField({
          name: 'themeStyle',
          title: 'Teema stiil (Theme Style)',
          type: 'string',
          options: {
            list: [
              { title: 'Opstar (Electric Blue)', value: 'opstar' },
              { title: 'VIP Holidays (Copper & Chrome)', value: 'vip-holidays' },
              { title: 'Swiss Minimalism (Grid & Grotesk)', value: 'swiss-minimalism' },
            ],
            layout: 'radio'
          },
          initialValue: 'opstar',
        })
      ]
    }),

    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'object',
      description:
        'Structural chrome variants (footer/header layout), independent of brand theme (themeStyle).',
      fields: [
        defineField({
          name: 'footerVariant',
          title: 'Footer variant',
          type: 'string',
          options: {
            list: [
              { title: 'Default (legacy)', value: 'default' },
              { title: 'Get in Touch (contact form)', value: 'contact-form' },
            ],
            layout: 'radio',
          },
          initialValue: 'default',
        }),
        // headerVariant — add later with the same radio pattern; do not invent until needed.
      ],
    }),

    defineField({
      name: 'cookieBanner',
      title: 'Cookie Banner (GDPR)',
      type: 'object',
      description: 'Veebilehe küpsiste bänneri tekstid ja nupud.',
      fields: [
        defineField({
          name: 'title',
          title: 'Title / Eyebrow',
          type: 'string',
          description: 'Bänneri ülemine pealkiri (Vaikimisi: Küpsiste kasutamine)'
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          description:
            'Bänneri peamine teavitustekst (Vaikimisi: Kasutame küpsiseid veebilehe toimimiseks ja kasutuskogemuse parandamiseks.)',
        }),
        defineField({
          name: 'acceptLabel',
          title: 'Accept Button Label',
          type: 'string',
          description: 'Kõigi küpsiste nõustumise nupp (Vaikimisi: Nõustun)',
        }),
        defineField({
          name: 'rejectLabel',
          title: 'Essential Only Button Label',
          type: 'string',
          description: 'Ainult vajalike küpsiste nupp (Vaikimisi: Ainult vajalikud)',
        }),
        defineField({
          name: 'readMoreLabel',
          title: 'Read More Link Label',
          type: 'string',
          description: 'Privaatsuspoliitika lingi tekst all (Vaikimisi: Loe lähemalt)',
        }),
      ]
    }),
    defineField({
      name: 'pageNotFound',
      title: '404 Page (Not Found)',
      type: 'object',
      description: 'Veebilehe 404 vealehe tekstid ja pilt.',
      fields: [
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: '404 lehel kuvatav pilt (Vaikimisi: torude pilt).'
        }),
        defineField({
          name: 'text',
          title: 'Description Text',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Veateate kirjeldus (Vaikimisi: Lehte ei leitud. Kontrolli aadressi...)'
        }),
        defineField({
          name: 'buttonLabel',
          title: 'Button Label',
          type: 'string',
          description: 'Avalehele viiva nupu tekst (Vaikimisi: AVALEHELE)'
        })
      ]
    }),


    defineField({
      name: 'cohorts',
      title: 'Kohordid / Grupid (Cohorts)',
      type: 'array',
      description: 'Iga rida = üks koolitusgrupp (koolituse registreerumine ja kalender).',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Grupi ID (kohustuslik)',
              type: 'string',
              description: 'Ühesõnaline kood (nt lean-tallinn-2026-04). Peab olema unikaalne.',
            }),
            defineField({
              name: 'trainingTitle',
              title: 'Koolituse pealkiri',
              type: 'string',
            }),
            defineField({
              name: 'name',
              title: 'Lühinimi / varu-pealkiri',
              type: 'string',
            }),
            defineField({
              name: 'location',
              title: 'Asukoht',
              type: 'string',
            }),
            defineField({
              name: 'dates',
              title: 'Kuupäevad (tekst)',
              type: 'string',
            }),
            defineField({
              name: 'daysUntil',
              title: 'Tekst enne algust',
              type: 'string',
            }),
            defineField({
              name: 'timing',
              title: 'Ajafilter',
              type: 'string',
              options: {
                list: [
                  { title: 'Peagi (soon)', value: 'soon' },
                  { title: '3–6 kuu (mid)', value: 'mid' },
                  { title: 'Paindlik (flex)', value: 'flex' },
                ],
              },
            }),
            defineField({
              name: 'statusLabel',
              title: 'Staatus — tekst tabelis',
              type: 'string',
            }),
            defineField({
              name: 'statusTone',
              title: 'Staatus — värv',
              type: 'string',
              options: {
                list: [
                  { title: 'Aktiivne (oranž)', value: 'active' },
                  { title: 'Tulemas (sinine)', value: 'upcoming' },
                  { title: 'Lõpetatud (hall)', value: 'finished' },
                ],
              },
            }),
            defineField({
              name: 'isCompleted',
              title: 'Lõpetatud rida',
              type: 'boolean',
            }),
            defineField({
              name: 'isHighlighted',
              title: 'Esiletõst',
              type: 'boolean',
            }),
            defineField({
              name: 'spotsTotal',
              title: 'Kohti kokku',
              type: 'number',
            }),
            defineField({
              name: 'spotsAvailable',
              title: 'Vabu kohti',
              type: 'number',
            }),
            defineField({
              name: 'spotsFilled',
              title: 'Täidetud kohti (käsitsi)',
              type: 'number',
            }),
            defineField({
              name: 'price',
              title: 'Hind',
              type: 'string',
            }),
            defineField({
              name: 'priceNote',
              title: 'Hinnainfo',
              type: 'string',
            }),
            defineField({
              name: 'badges',
              title: 'Märgised',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'text', title: 'Tekst', type: 'string' }),
                    defineField({
                      name: 'type',
                      title: 'Tüüp',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Kiire (urgent)', value: 'urgent' },
                          { title: 'Avatud (open)', value: 'open' },
                          { title: 'Eelregistreerimine (pre)', value: 'pre' },
                          { title: 'Soovitus (rec)', value: 'rec' },
                        ],
                      },
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'ctaVariant',
              title: 'Toiming-nupu värv',
              type: 'string',
              options: {
                list: [
                  { title: 'Oranž (orange)', value: 'orange' },
                  { title: 'Sinine (blue)', value: 'blue' },
                  { title: 'Keelatud (disabled)', value: 'disabled' },
                ],
              },
            }),
            defineField({
              name: 'buttonText',
              title: 'Nupu tekst',
              type: 'string',
            }),
            defineField({
              name: 'buttonUrl',
              title: 'Nupu link',
              type: 'string',
            }),
            defineField({
              name: 'buttonStyle',
              title: 'Nupu stiil',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
            }),
            defineField({
              name: 'calendarLabel',
              title: 'Kalendri lingi silt',
              type: 'string',
            }),
            defineField({
              name: 'calendarLinks',
              title: 'Kalendri valikud',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'trainingDates',
              title: 'Koolituspäevade andmed',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'date', title: 'Kuupäev', type: 'date' }),
                    defineField({ name: 'startTime', title: 'Algusaeg', type: 'string' }),
                    defineField({ name: 'endTime', title: 'Lõpuaeg', type: 'string' }),
                    defineField({ name: 'location', title: 'Asukoht', type: 'string' }),
                  ],
                }),
              ],
            }),
            defineField({
              name: 'socialProof',
              title: 'Sotsiaalne tõend',
              type: 'object',
              fields: [
                defineField({
                  name: 'initials',
                  title: 'Initsiaalid',
                  type: 'array',
                  of: [{ type: 'string' }],
                }),
                defineField({
                  name: 'text',
                  title: 'Tekst',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'countdown',
              title: 'Bänneri alternatiivtekst',
              type: 'string',
            }),
            defineField({
              name: 'preRegistrationInfo',
              title: 'Eelregistreerimise pealkiri',
              type: 'string',
            }),
            defineField({
              name: 'preRegistrationBenefits',
              title: 'Eelregistreerimise punktid',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: {
              title: 'trainingTitle',
              name: 'name',
              dates: 'dates',
              loc: 'location',
              id: 'id',
            },
            prepare(sel: any) {
              const title = sel.title || sel.name || 'Grupp'
              const sub = [sel.dates, sel.loc, sel.id ? `#${sel.id}` : ''].filter(Boolean).join(' · ')
              return { title, subtitle: sub || undefined }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'header',
      title: 'Header Section',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'logo',
          title: 'Logo Text',
          type: 'string',
          initialValue: 'Site Name',
        }),
        defineField({
          name: 'navLinks',
          title: 'Navigation Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Link Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'href',
                  title: 'Link URL',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
          initialValue: [
            { name: 'Pealeht', href: '/' },
            { name: 'Koolitus', href: '/koolitus' },
            { name: 'About', href: '/about' },
            { name: 'Product Name', href: '/product' },
            { name: 'Blogi', href: '/blog' },
            { name: 'Galerii', href: '/galerii' },
          ],
        }),
        defineField({
          name: 'contactButtonText',
          title: 'Header CTA text (register)',
          description: 'Nupu tekst paremas ülanurgas (vaikimisi Registreeri).',
          type: 'string',
          initialValue: 'Registreeri',
        }),
        defineField({
          name: 'mobileContactButtonText',
          title: 'Mobile menu CTA text',
          type: 'string',
          initialValue: 'Registreeri',
        }),
        defineField({
          name: 'contactButtonLink',
          title: 'Header CTA link',
          description: 'Registreerumisleht (vaikimisi /register).',
          type: 'string',
          initialValue: '/register',
        }),
      ],
    }),
    defineField({
      name: 'nineDaysProgram',
      title: 'Nine Days Program (legacy mirror)',
      type: 'object',
      description:
        'Peegeldab globaalset nineDaysProgram dokumenti. Eelistatud allikas: menüü „9 päeva programm".',
      fields: nineDaysProgramFields,
    }),
    defineField({
      name: 'footer',
      title: 'Footer (jalus kõigil lehtedel)',
      type: 'footer',
      options: { collapsible: true, collapsed: false },
    }),

  ]
})
