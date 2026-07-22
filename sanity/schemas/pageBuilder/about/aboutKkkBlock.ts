import { defineField, defineType, type FieldDefinition } from 'sanity'

import { getAboutPageField } from './getAboutPageField'

export default defineType({
  name: 'aboutKkkBlock',
  title: 'KKK',
  type: 'object',
  fields: [
    defineField(getAboutPageField('kkkDocument') as unknown as FieldDefinition),
    defineField(getAboutPageField('kkk') as unknown as FieldDefinition),
  ],
  preview: {
    select: { title: 'kkk.title', refTitle: 'kkkDocument.title' },
    prepare({ title, refTitle }: { title?: string; refTitle?: string }) {
      return {
        title: refTitle || title || 'KKK',
        subtitle: 'Your Name · FAQ',
      }
    },
  },
})
