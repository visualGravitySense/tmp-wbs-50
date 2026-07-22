import { defineField, defineType } from 'sanity'

import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default defineType({
  name: 'galleryPage',
  title: 'Galerii leht',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sisemine pealkiri',
      type: 'string',
      initialValue: 'Galerii',
      validation: (Rule) => Rule.required(),
    }),
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.galleryPage],
      description: 'Ühised blokid (hero, fotogalerii, CTA). Tühi = legacy galerii väljad.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta pealkiri', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta kirjeldus', type: 'text', rows: 3 }),
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
      name: 'pillText',
      title: 'Pildiriba tekst',
      type: 'string',
      initialValue: 'Fotod koolitustelt ja visiitidelt',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Lehe pealkiri (H1)',
      type: 'string',
      initialValue: 'Galerii',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Sissejuhatus',
      type: 'text',
      rows: 3,
      initialValue: 'Valik momente meie koolitustest ja tehaste külastustest.',
    }),
    defineField({
      name: 'orderedCategories',
      title: 'Kategooriate järjekord (Drag & Drop)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'galleryCategory' }] }],
      description:
        'Lohista kategooriad siin nimekirjas õigesse järjekorda. See määrab filtrite järjekorra kodulehel.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero pilt (valikuline)',
      description: 'Suur pilt hero paremal. Kui tühi, kuvatakse dekoratiivne graafika.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: 'Galerii pildid',
      description:
        'Klõpsa „Lisa“ / „+“ all, lae pilt üles, täida alternatiivtekst ja avalda dokument. Pildid kuvatakse lehel /galerii.',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'image',
          name: 'galleryPhoto',
          title: 'Pilt',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternatiivtekst',
              type: 'string',
              description: 'Lühike kirjeldus pildist (ekraanilugerid, SEO). Näide: „LEAN koolitus tehases“.',
              validation: (Rule) => Rule.required().min(2).max(180),
            }),
            defineField({
              name: 'caption',
              title: 'Pealkiri lehel (valikuline)',
              type: 'string',
              description: 'Tekst pildi all veebis.',
            }),
            defineField({
              name: 'categories',
              title: 'Kategooriad',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'galleryCategory' }] }],
              description: 'Vali pildile sobivad kategooriad.',
            }),
            defineField({
              name: 'showOnMain',
              title: 'Kuva avalehel (Teooria kohtub praktikaga)',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              subtitle: 'alt',
              media: 'asset',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || subtitle || 'Pilt',
                subtitle: title && subtitle ? subtitle : undefined,
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'pageTitle', subtitle: 'title' },
    prepare({ title, subtitle }) {
      return { title: title || 'Galerii', subtitle: subtitle || '' }
    },
  },
})
