import { defineField, defineType } from 'sanity'

import { getKoolitusPageField } from './getKoolitusPageField'

export default defineType({
  name: 'koolitusKkkBlock',
  title: 'KKK',
  type: 'object',
  fields: [
    defineField(getKoolitusPageField('kkkDocument') as unknown as Parameters<typeof defineField>[0]),
    defineField(getKoolitusPageField('kkk') as unknown as Parameters<typeof defineField>[0]),
  ],
  preview: {
    select: {
      title: 'kkk.title',
      docTitle: 'kkkDocument->title',
    },
    prepare({ title, docTitle }: { title?: string; docTitle?: string }) {
      return {
        title: docTitle || title || 'KKK',
        subtitle: 'Koolitus · korduma kippuvad küsimused',
      }
    },
  },
})
