import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'koolitusProjectsBlock',
  title: 'Parendusprojektide näited',
  type: 'object',
  description:
    'Näitab parendusprojektide või tehaste külastuste näiteid — pealkiri, kirjeldus ja fotod.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Silmapealiskiri',
      type: 'string',
      initialValue: 'Praktika',
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'Parendusprojektide näited',
    }),
    defineField({
      name: 'description',
      title: 'Kirjeldus',
      type: 'text',
      rows: 3,
      initialValue:
        'Valik parendusprojekte ja tehaste külastusi meie koolitustelt — teooria kohtub reaalse tootmisega.',
    }),
    defineField({
      name: 'items',
      title: 'Projektid / visiidid',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'koolitusProjectItem',
          fields: [
            defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
            defineField({
              name: 'description',
              title: 'Kirjeldus',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'tag',
              title: 'Silt (nt "Tehase külastus")',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Foto',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Alt-tekst (SEO)', type: 'string' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image', tag: 'tag' },
            prepare({ title, media, tag }) {
              return {
                title: title || 'Projekt',
                subtitle: tag || 'Parendusprojekt',
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }: { title?: string; items?: unknown[] }) {
      const count = items?.length ?? 0
      return {
        title: title || 'Parendusprojektide näited',
        subtitle: count ? `${count} kirjet` : 'Kirjeid pole',
      }
    },
  },
})