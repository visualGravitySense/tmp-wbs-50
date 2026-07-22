import { defineField, defineType } from 'sanity'

import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default defineType({
  name: 'juhendatudLoputoodPage',
  title: 'Juhendatud lõputööd',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sisemine pealkiri',
      type: 'string',
      initialValue: 'Juhendatud lõputööd',
      validation: (Rule) => Rule.required(),
    }),
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.juhendatudLoputoodPage],
      description:
        'Lisa „Lõputööde võrgustik“ blokk ja vajadusel hero/CTA. Tühi = ainult lehe ülarve.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta pealkiri', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta kirjeldus', type: 'text', rows: 3 }),
        defineField({
          name: 'metaKeywords',
          title: 'Meta keywords (SEO võtmesõnad - komadega eraldatud)',
          type: 'string',
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { title: title || 'Juhendatud lõputööd' }
    },
  },
})
