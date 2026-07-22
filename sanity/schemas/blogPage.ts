import { defineField, defineType } from 'sanity'

import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Blog',
      validation: (Rule) => Rule.required(),
    }),
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.blogPage],
      description: 'Ühised blokid blogi ülarve jaoks. Tühi = legacy blogi väljad.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta description', type: 'text', rows: 2 }),
        defineField({ name: 'metaKeywords', title: 'Meta keywords (SEO võtmesõnad - komadega eraldatud)', type: 'string' }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'pillText', title: 'Pill text', type: 'string' }),
        defineField({ name: 'title', title: 'Main title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'titleAccent', title: 'Accent title (italic)', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({
          name: 'heroImage',
          title: 'Hero image (optional)',
          description: 'Portrait või esiletõstetud pilt hero paremal. Kui tühi, kasutatakse toimetaja valiku kaanepilti.',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [
            defineField({
              name: 'stat',
              title: 'Stat item',
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value', type: 'string' }),
                defineField({ name: 'label', title: 'Label', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'filterBar',
      title: 'Filter bar',
      type: 'object',
      fields: [
        defineField({ name: 'allLabel', title: '"All" label', type: 'string', initialValue: 'Kõik' }),
        defineField({
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value (slug)', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
                defineField({ name: 'tagBackground', title: 'Card tag background', type: 'string' }),
                defineField({ name: 'tagTextColor', title: 'Card tag text color', type: 'string' }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'listUi',
      title: 'Posts list UI',
      type: 'object',
      fields: [
        defineField({ name: 'featuredBadgeText', title: 'Featured badge text', type: 'string', initialValue: '✦ Toimetaja valik' }),
        defineField({ name: 'featuredReadMoreText', title: 'Featured read-more text', type: 'string', initialValue: 'Loe artiklit →' }),
        defineField({ name: 'cardReadMoreText', title: 'Card read-more text', type: 'string', initialValue: 'Loe edasi →' }),
        defineField({ name: 'emptyStateText', title: 'Empty state text', type: 'string', initialValue: 'Artikleid ei leitud.' }),
        defineField({ name: 'readTimeSuffix', title: 'Read-time suffix', type: 'string', initialValue: 'min' }),
      ],
    }),
    defineField({
      name: 'pagination',
      title: 'Pagination',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', title: 'Enable pagination', type: 'boolean', initialValue: true }),
        defineField({ name: 'postsPerPage', title: 'Posts per page (without featured)', type: 'number', initialValue: 6 }),
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({ name: 'placeholder', title: 'Email placeholder', type: 'string' }),
        defineField({ name: 'buttonText', title: 'Button text', type: 'string' }),
        defineField({ name: 'note', title: 'Small note', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'hero.title',
    },
  },
})
