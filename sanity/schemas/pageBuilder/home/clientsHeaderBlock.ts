import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'clientsHeaderBlock',
  title: 'Kliendid Header Block',
  type: 'object',
  fields: [
    defineField({
      name: 'clientsEyebrow',
      title: 'Clients Eyebrow Pill Text',
      type: 'string',
    }),
    defineField({
      name: 'clientsMainHeadline',
      title: 'Clients Main Headline',
      type: 'string',
    }),
    defineField({
      name: 'clientsScriptHeadline',
      title: 'Clients Script Headline',
      type: 'string',
    }),
    defineField({
      name: 'clientsDescription',
      title: 'Clients Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      headline: 'clientsMainHeadline',
      scriptHeadline: 'clientsScriptHeadline',
    },
    prepare({ headline, scriptHeadline }) {
      const title = [headline, scriptHeadline].filter(Boolean).join(' ') || 'Clients Header'
      return {
        title,
        subtitle: 'Kliendid header block',
      }
    },
  },
})
