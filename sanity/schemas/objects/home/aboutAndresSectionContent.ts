import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutAndresSectionContent',
  title: 'About Andres Section',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'Koolitaja Andres',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image (Andres Meeting)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Description of the image for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'overlayImage',
      title: 'Overlay Image (Factory Visit)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Description of the image for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'overlayImage2',
      title: 'Overlay Image 2 (Classroom Meeting)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Description of the image for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Andres Kase',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Programmi juht ja peakoolitaja • 25+ aastat tootmises',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      initialValue:
        '"Õpetab seda, mida on ise tehases teinud — ja ka seda, mida tegid Henry Ford sajand tagasi ja Jaapani juhid Toyotas."',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      initialValue:
        'Andres ei õpeta lihtsalt teooriat. Õpetab seda, millele tugineb tugev teooria — ehk töötavat praktikat. Jagan kogemust 100+ Eesti tehase põrandalt. Teen puust ja punaselt ette ja asi saab selgeks.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['LEAN', 'TOYOTA TPS', 'KAIZEN', '100+ TEHAST', '25A KOGEMUST', 'JIPM SERTIFITSEERITUD'],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
          ],
        },
      ],
      initialValue: [
        { value: '147+', label: 'Lõpetajat' },
        { value: '+31%', label: 'Kesk. OEE kasv' },
        { value: '4.9/5', label: 'Hinnang' },
      ],
    }),
    defineField({
      name: 'certificationLink',
      title: 'Certification Link',
      type: 'url',
      initialValue: '#',
    }),
  ],
})
