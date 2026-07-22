import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pricingSectionContent',
  title: 'Pricing Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Investeering tulevikku',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Vali oma ettevõtte arengule sobivaim tase',
    }),
    defineField({
      name: 'popularBadgeText',
      title: 'Popular Badge Text',
      type: 'string',
      initialValue: 'Populaarseim valik',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Vali pakett',
    }),
    defineField({
      name: 'footerNotice',
      title: 'Alumine lisatekst (Töötukassa)',
      type: 'string',
      description: 'Kuvatakse hinnakiri ploki all. Jäta tühjaks, kui lisateksti pole vaja.',
    }),
    defineField({
      name: 'supportNotePrefix',
      title: 'Töötukassa rõhu rida — eesliide',
      description: 'Kuvatakse pakettide ja ettevõtte ploki vahel (ülemine rõhutatud rida).',
      type: 'string',
      initialValue: 'Küsi lisa',
    }),
    defineField({
      name: 'supportNoteHighlight',
      title: 'Töötukassa rõhu rida — rõhutatud osa',
      type: 'string',
      initialValue: 'Töötukassa toetuse võimalus kuni 80%',
    }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Package Name',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'isPopular',
              title: 'Mark as Popular',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
            },
            prepare(selection) {
              return {
                title: selection.title || 'Pakett',
                subtitle: selection.subtitle ? `${selection.subtitle} €` : 'Hind määramata',
              }
            },
          },
        },
      ],
      initialValue: [
        {
          name: 'Standard',
          price: '1490',
          description: 'Ideaalne alustavale tootmisjuhile',
          features: ['9 õppepäeva', 'Õppematerjalid', 'Visiidid tehastesse', 'Sertifikaat'],
          isPopular: false,
        },
        {
          name: 'Professional',
          price: '2190',
          description: 'Kõige populaarsem valik',
          features: [
            'Kõik Standard paketis',
            'Personaalne mentorlus',
            'KPI analüüs',
            'Ligipääs kogukonnale',
          ],
          isPopular: true,
        },
        {
          name: 'Executive',
          price: '3490',
          description: 'Täielik strateegiline tugi',
          features: [
            'Kõik Pro paketis',
            '1-on-1 strateegia sessioon',
            'Meeskonna koolitus',
            'Eelisjärjekorras tugi',
          ],
          isPopular: false,
        },
      ],
    }),
    defineField({
      name: 'corporateTitle',
      title: 'Corporate Title',
      type: 'string',
      initialValue: 'Grupikoolitus ettevõttele',
    }),
    defineField({
      name: 'corporateSubtitle',
      title: 'Corporate Subtitle',
      type: 'string',
      initialValue: 'Individuaalne lähenemine — teie meeskonnale kohandatud programm',
    }),
    defineField({
      name: 'corporatePrice',
      title: 'Corporate Start Price',
      type: 'string',
      description: 'Jäta tühjaks, kui hinda ei soovi kuvada — kuvatakse ainult „Küsi pakkumist“ nupp.',
    }),
    defineField({
      name: 'corporatePricePrefix',
      title: 'Corporate Price Prefix',
      description: 'Nt „Näiteks / osaleja kohta“ hinna kohal. Jäta tühjaks, kui eesliidet pole vaja.',
      type: 'string',
    }),
    defineField({
      name: 'corporatePriceTaxLabel',
      title: 'Corporate Price Tax Label',
      description: 'Nt „+ KM“ hinna kõrval. Jäta tühjaks, kui maksusilti pole vaja.',
      type: 'string',
    }),
    defineField({
      name: 'corporatePriceSuffix',
      title: 'Corporate Price Suffix',
      description: 'Nt „10 osalejat, 6 päeva“ hinna all. Jäta tühjaks, kui järelliidet pole vaja.',
      type: 'string',
    }),
    defineField({
      name: 'corporateFeatures',
      title: 'Corporate Features',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Alates 5 osalejast',
        'Kohandatud õppeprogramm',
        'Koolitus teie kontoris',
        'Eraldi äriklient haldur',
        'Arveldamine ettevõttele',
        'Järelmeetmed ja tugi',
      ],
    }),
    defineField({
      name: 'corporateCtaText',
      title: 'Corporate CTA Button Text',
      type: 'string',
      initialValue: 'Küsi pakkumist',
    }),
    defineField({
      name: 'corporateBadgeText',
      title: 'Corporate Badge Text',
      type: 'string',
      initialValue: 'Ettevõtetele',
    }),
    defineField({
      name: 'hideCorporateBlock',
      title: 'Hide Corporate Block',
      description: 'Check this to hide the corporate block at the bottom of the pricing section.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
