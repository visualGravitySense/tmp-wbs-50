import { defineField, defineType } from 'sanity'

/** Shared fields: main page quiz follow-up + koolitus page lead form. */
export default defineType({
  name: 'helpFormTeaserBlock',
  title: 'Tehase kiiraudit (Tootmisaudit)',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Kuva blokki',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (väike rida)',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Kirjeldus',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonText',
      title: 'Nupu tekst',
      type: 'string',
      initialValue: 'Ava tootmisaudit',
    }),
    defineField({
      name: 'image',
      title: 'Pilt (paremal poolel avalehel)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'questions',
      title: 'Küsimused (Questions)',
      type: 'array',
      description: 'Määratle küsimused ja valikvastused. Kui jätad tühjaks, kasutatakse globaalseid seadeid (Site Settings).',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question Text',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'options',
              title: 'Options (valikvastused)',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.required().min(2)
            })
          ],
          preview: {
            select: { title: 'question' },
            prepare({ title }) {
              return { title: title || 'Küsimus' }
            }
          }
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Tehase kiiraudit (Tootmisaudit)',
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
