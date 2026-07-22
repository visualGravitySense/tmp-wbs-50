import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'programDaysTabs',
  title: 'Programmi päevade vahelehed (tabs)',
  type: 'object',
  description:
    'Tabbed program day breakdown. NOT for Esileht «Teenused» — use homeHeroFeaturesBlock (3-column static) instead.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Ülemine silt (Eyebrow)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'Mis see on, mida koolitusel teeme?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scriptTitle',
      title: 'Skript pealkiri / Alapealkiri',
      type: 'string',
    }),
    defineField({
      name: 'isMinimal',
      title: 'Minimalistlik vaade (Minimal View)',
      type: 'boolean',
      description: 'Lülita sisse esilehe või maandumislehtede jaoks (peidab parempoolsed detailpunktid)',
      initialValue: false,
    }),
    defineField({
      name: 'popupTitle',
      title: 'Popup Pealkiri',
      type: 'string',
      description: '«Saada mulle programm» vormi pealkiri',
      initialValue: 'Saadame programmi sulle e-kirjaga märgitud aadressile.',
    }),
    defineField({
      name: 'popupSubtitle',
      title: 'Popup Alapealkiri / Nõusolek',
      type: 'text',
      rows: 3,
      description: 'GDPR / nõusoleku tekst «Saada mulle programm» vormis',
      initialValue: 'Vormi saatmisega kinnitad, et nõustud oma kontaktandmete jagamisega.',
    }),
    defineField({
      name: 'days',
      title: 'Päevad',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'programDayItem',
          title: 'Päev',
          fields: [
            defineField({
              name: 'dayNumber',
              title: 'Päeva number',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: 'tag',
              title: 'Silt (tag)',
              type: 'string',
              description: 'Näiteks: PÄEV 1, Vundament, Praktika jne.',
            }),
            defineField({
              name: 'title',
              title: 'Pealkiri',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'quote',
              title: 'Harjumus (tsitaat hallis kastis)',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Kirjeldus (lühike tekst)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'fullPoints',
              title: 'Täispikad detailpunktid (checklist)',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Nimekiri punktidest, mida kuvatakse paremal veerus täisvaates.',
            }),
            defineField({
              name: 'typeLabel',
              title: 'Päeva tüüp (tag)',
              type: 'string',
              description: 'Näiteks: Koolituspäev, Ettevõttekülastus · Gemba',
            }),
            defineField({
              name: 'companyPainTitle',
              title: 'Valu ettevõttes (Pealkiri)',
              type: 'string',
            }),
            defineField({
              name: 'companyPain',
              title: 'Valu sümptomid',
              type: 'array',
              of: [{ type: 'string' }],
              description: '3 peamist muret (näidatakse vasakul)',
            }),
            defineField({
              name: 'shortSolution',
              title: 'Lahendus lühidalt',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Mida sel päeval teeme (3 punkti paremal)',
            }),
            defineField({
              name: 'participantWins',
              title: 'Osaleja saab',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'companyWins',
              title: 'Juht / Org võidab',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              dayNumber: 'dayNumber',
              title: 'title',
              tag: 'tag',
            },
            prepare({ dayNumber, title, tag }) {
              const prefix = dayNumber ? `Päev ${dayNumber}` : 'Päev'
              const suffix = tag ? ` [${tag}]` : ''
              return {
                title: `${prefix}: ${title || 'Pealkirjata'}`,
                subtitle: suffix ? `Märgis: ${tag}` : undefined,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isMinimal: 'isMinimal',
      days: 'days',
    },
    prepare({ title, isMinimal, days }) {
      const daysCount = days ? days.length : 0
      const viewMode = isMinimal ? 'Minimalne' : 'Täismaht'
      return {
        title: title || 'Programmi päevade vahelehed',
        subtitle: `${daysCount} päeva • Vaade: ${viewMode}`,
      }
    },
  },
})
