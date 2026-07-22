import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mainAndresCardBlock',
  title: '[VANA - ÄRA KASUTA] Trainer (Avalehe kaart)',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Pildiriba (Badge)',
      type: 'string',
      initialValue: 'KOOLITAJA',
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'Your Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Alapealkiri',
      type: 'string',
      initialValue: 'Programmi juht ja peakoolitaja • 25+ aastat tootmises',
    }),
    defineField({
      name: 'description',
      title: 'Kirjeldus',
      type: 'text',
      rows: 4,
      initialValue: 'Meie treener ei õpeta lihtsalt teooriat. Õpetab seda, millele tugineb tugev teooria — ehk töötavat praktikat. Jagame kogemust 100+ Eesti tehase põrandalt. Teeme puust ja punaselt ette ja asi saab selgeks.',
    }),
    defineField({
      name: 'image',
      title: 'Pilt',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Nupp',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Nupu tekst',
          type: 'string',
          initialValue: 'Loe edasi',
        }),
        defineField({
          name: 'link',
          title: 'Nupu link',
          type: 'string',
          initialValue: '/koolitus',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Trainer Kaart',
        subtitle: subtitle || 'Avalehe treeneri tutvustus',
      }
    },
  },
})
