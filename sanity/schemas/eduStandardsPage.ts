import { defineField, defineType } from 'sanity'

import { withLegacyBlockquote } from './objects/legacyBlockquoteStyle'

import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default defineType({
  name: 'eduStandardsPage',
  title: 'Täienduskoolituse standardi leht',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sisemine pealkiri',
      type: 'string',
      initialValue: 'Täienduskoolituse standard',
      validation: (Rule) => Rule.required(),
    }),
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.eduStandardsPage],
      description: 'Ühised blokid (hero, CTA). Tühi = vaikimisi staatiline sisu.',
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
      initialValue: 'Õppekava ja standardid',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Lehe pealkiri (H1) - Peamine (paksus kirjas)',
      type: 'string',
      initialValue: 'Täienduskoolituse standard',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageTitleAccent',
      title: 'Lehe pealkiri (H1) - Aktsent (käsikirjas)',
      type: 'string',
      initialValue: 'ja vastavus täiskasvanute koolituse seadusele',
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
      initialValue: '← Tagasi koolituse lehele',
    }),
    defineField({
      name: 'backLinkPath',
      title: 'Tagasi link (tee)',
      type: 'string',
      initialValue: '/koolitus',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Lehe sisu',
      type: 'array',
      description: 'Kasutage H2 pealkirju peatükkide jaoks. Kui see väli on tühi, kuvatakse vaikimisi staatilist õppekava sisu.',
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
        {
          type: 'object',
          name: 'ctaButton',
          title: 'Nupp (CTA)',
          fields: [
            defineField({ name: 'label', title: 'Nupu tekst', type: 'string', initialValue: 'Tutvun koolitusega täpsemalt' }),
            defineField({ name: 'href', title: 'Link (URL)', type: 'string', initialValue: '/koolitus' }),
          ],
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
        title: title || 'Täienduskoolituse standard',
        subtitle: subtitle || '',
      }
    },
  },
})
