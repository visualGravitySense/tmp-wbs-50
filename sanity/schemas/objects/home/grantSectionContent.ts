import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'grantSectionContent',
  title: 'Grant Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Koolitustoetuse võimalus tööandjale',
    }),
    defineField({
      name: 'percentLabel',
      title: 'Percent Label',
      type: 'string',
      initialValue: 'Maksimaalne toetus',
    }),
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Töötukassa hüvitab kuni',
    }),
    defineField({
      name: 'highlightedTitle',
      title: 'Highlighted Title',
      type: 'string',
      initialValue: '80% kuludest',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue:
        'Kasuta võimalust ja arenda oma meeskonna riigi toel. Aitame dokumentide vormistamisel, et protsess oleks Sinu jaoks võimalikult lihtne.',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Uuri toetuse kohta',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '#',
    }),
    defineField({
      name: 'responseText',
      title: 'Response Note',
      type: 'string',
      initialValue: 'Vastus 24h jooksul',
    }),
    defineField({
      name: 'infoPrefix',
      title: 'Info Prefix',
      type: 'string',
      initialValue: 'See tähendab, et Sinu investeering programmi on vaid',
    }),
    defineField({
      name: 'infoHighlight',
      title: 'Info Highlight',
      type: 'string',
      initialValue: '20% maksumusest',
    }),
    defineField({
      name: 'infoSuffix',
      title: 'Info Suffix',
      type: 'string',
      initialValue: 'Ülejäänu eest kannab hoolt riik.',
    }),
    defineField({
      name: 'lightImage',
      title: 'Pilt (Hele teema)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'darkImage',
      title: 'Pilt (Tume teema)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'steps',
      title: 'Support Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'highlight',
              title: 'Highlighted Fragment',
              type: 'string',
              description: 'Exact phrase to emphasize inside description.',
            }),
          ],
        },
      ],
      initialValue: [
        {
          title: 'Kontrolli sobivust',
          description:
            'Kontrolli ettevõtte sobivust Töötukassa lehel ja saa esmane ülevaade võimalikest toetustest.',
          highlight: 'ettevõtte sobivust',
        },
        {
          title: 'Registreeru programmile',
          description:
            'Registreeru programmile — aitame taotlust täita ja juhendame kogu protsessi läbi.',
          highlight: 'aitame taotlust täita',
        },
        {
          title: 'Saad toetust',
          description:
            'Töötukassa katab kuni 80% — ettevõte maksab ülejäänu ja saad kvaliteetse koolituse.',
          highlight: 'kuni 80%',
        },
      ],
    }),
  ],
})
