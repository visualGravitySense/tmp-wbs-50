import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontaktLegalNoteBlock',
  title: 'Kontakt Privaatsuse Viide',
  type: 'object',
  fields: [
    defineField({
      name: 'beforeLink',
      title: 'Tekst enne linki',
      type: 'string',
      initialValue: 'Isikuandmete töötlemise kohta vt',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Lingi tekst',
      type: 'string',
      initialValue: 'privaatsuspoliitikat',
    }),
    defineField({
      name: 'linkHref',
      title: 'Lingi URL',
      type: 'string',
      initialValue: '/privacy-policy',
    }),
    defineField({
      name: 'afterLink',
      title: 'Tekst pärast linki',
      type: 'string',
      initialValue:
        '. Vastutav töötleja kontaktandmete suhtes on Site Name (hello@example.com).',
    }),
  ],
  preview: {
    select: { title: 'linkLabel' },
    prepare({ title }) {
      return { title: title || 'Privaatsuse viide', subtitle: 'Jaluse tekst privaatsuse lingiga' }
    },
  },
})
