import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'beforeAfterSectionContent',
  title: 'Before/After Transformation Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Programmi mõju sinu',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Mõõda → Mõista → Muuda → Tulemus',
    }),
    defineField({
      name: 'highlightText',
      title: 'Highlighted Title Text',
      type: 'string',
      initialValue: 'tööriistakastile',
    }),
    defineField({
      name: 'transformations',
      title: 'Transformations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'before',
              title: 'Enne',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'after',
              title: 'Pärast',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              before: 'before',
              after: 'after',
            },
            prepare(selection) {
              const before = selection.before || 'Enne'
              const after = selection.after || 'Pärast'
              return {
                title: `${before} -> ${after}`,
              }
            },
          },
        },
      ],
      initialValue: [
        { before: 'Reaktiivne tegutseja', after: 'Süsteemne juht' },
        { before: 'Taktikaline käitumine', after: 'Strateegiline sünkroniseeritus' },
        { before: 'Raiskamine nähtamatu', after: 'Väärtus mõõdetav' },
        { before: 'Vastutus hajutatud', after: 'Rollid selged, süsteem töötab' },
      ],
    }),
    defineField({
      name: 'materialsTitle',
      title: 'Materials Title',
      type: 'string',
      initialValue: 'Materjalid',
    }),
    defineField({
      name: 'materialsDescription',
      title: 'Materials Description',
      type: 'text',
      initialValue: 'Kõik vajalikud tabelid, tööriistad ja kontroll-lehed, mis jäävad sulle päriseks.',
    }),
    defineField({
      name: 'bookTitle',
      title: 'Book Title',
      type: 'string',
      initialValue: 'Raamat',
    }),
    defineField({
      name: 'bookDescription',
      title: 'Book Description',
      type: 'text',
      initialValue: 'Eksklusiivne tootmisjuhtimise käsiraamat koos parimate praktikatega.',
    }),
    defineField({
      name: 'resultTitle',
      title: 'Result Title',
      type: 'string',
      initialValue: 'Tulemus',
    }),
    defineField({
      name: 'resultDescription',
      title: 'Result Description',
      type: 'text',
      initialValue: 'Valmis süsteem, mida saad koheselt oma tehases juurutama hakata.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Vaata kõik tagasisideid',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      initialValue: '/testimonials',
    }),
  ],
})
