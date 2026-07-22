import { defineField, defineType } from 'sanity'

import { withLegacyBlockquote } from './objects/legacyBlockquoteStyle'

import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default defineType({
  name: 'privacyPolicyPage',
  title: 'Privaatsuspoliitika leht',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sisemine pealkiri',
      type: 'string',
      initialValue: 'Privaatsuspoliitika',
      validation: (Rule) => Rule.required(),
    }),
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.privacyPolicyPage],
      description: 'Ühised blokid (hero, CTA). Tühi = legacy privaatsuspoliitika sisu.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta pealkiri', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta kirjeldus', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'eyebrow',
      title: 'Pildiriba tekst (pill)',
      type: 'string',
      initialValue: 'Privaatsus ja andmekaitse',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Lehe pealkiri (H1)',
      type: 'string',
      initialValue: 'Privaatsuspoliitika',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Viimati uuendatud (kuupäev)',
      type: 'date',
    }),
    defineField({
      name: 'lastUpdatedPrefix',
      title: 'Tekst enne kuupäeva',
      type: 'string',
      initialValue: 'Viimati uuendatud:',
    }),
    defineField({
      name: 'backLinkLabel',
      title: 'Tagasi lingi tekst',
      type: 'string',
      initialValue: '← Tagasi avalehele',
    }),
    defineField({
      name: 'backLinkPath',
      title: 'Tagasi link (tee)',
      type: 'string',
      initialValue: '/',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Lehe sisu',
      type: 'array',
      description: 'Kasutage H2 pealkirju peatükkide jaoks. Kui väli on tühi, kuvatakse vaikimisi teksti veebis.',
      of: [
        {
          type: 'block',
          styles: withLegacyBlockquote([
            { title: 'Tavaline', value: 'normal' },
            { title: 'H2 (peatükk)', value: 'h2' },
            { title: 'H3 (alampeatükk)', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ]),
          lists: [
            { title: 'Täpploend', value: 'bullet' },
            { title: 'Numberloend', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Rasvane', value: 'strong' },
              { title: 'Kaldkiri', value: 'em' },
              { title: 'Allajoonitud', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'title',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Privaatsuspoliitika',
        subtitle: subtitle || '',
      }
    },
  },
})
