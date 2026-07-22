import { defineField, defineType } from 'sanity'

/**
 * Standalone LEAN maja diagram block — inline fields only (no koolitusPage import)
 * to prevent circular schema deps and Studio form freeze on /opstar-profit.
 */
export default defineType({
  name: 'koolitusLeanHouseBlock',
  title: 'LEAN maja diagram',
  type: 'object',
  fields: [
    defineField({
      name: 'leanHouseSection',
      title: 'LEAN maja sisu',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Pealkiri',
          type: 'string',
          initialValue: 'LEAN Süsteemi Arhitektuur',
        }),
        defineField({
          name: 'subtitle',
          title: 'Silmapealiskiri',
          type: 'string',
          initialValue: 'LEAN MAJA Mudel',
        }),
        defineField({
          name: 'description',
          title: 'Kirjeldus',
          type: 'text',
          rows: 2,
          initialValue:
            'Mõista, kuidas LEAN süsteem töötab läbi tõestatud LEAN MAJA raamistiku',
        }),
        defineField({
          name: 'roof',
          title: 'Katus',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Alapealkiri', type: 'string' }),
          ],
        }),
        defineField({
          name: 'leftPillar',
          title: 'Vasak samm (JIT)',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
            defineField({ name: 'shortTitle', title: 'Lühend', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Punktid',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),
        defineField({
          name: 'center',
          title: 'Keskosa',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
            defineField({
              name: 'systems',
              title: 'Süsteemid',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'leanHouseSystem',
                  fields: [
                    defineField({ name: 'name', title: 'Nimi', type: 'string' }),
                    defineField({
                      name: 'description',
                      title: 'Kirjeldus',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'rightPillar',
          title: 'Parem samm (Jidoka)',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
            defineField({ name: 'shortTitle', title: 'Lühend', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Punktid',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
        }),
        defineField({
          name: 'foundation',
          title: 'Vundament',
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Elemendid',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'leanHouseFoundationItem',
                  fields: [
                    defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
                    defineField({
                      name: 'description',
                      title: 'Kirjeldus',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        }),
        defineField({
          name: 'benefits',
          title: 'Katuskaardi eelised',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'leanHouseBenefit',
              fields: [
                defineField({ name: 'icon', title: 'Ikoon', type: 'string' }),
                defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
                defineField({
                  name: 'description',
                  title: 'Kirjeldus',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'leanHouseSection.title', subtitle: 'leanHouseSection.subtitle' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title: title || 'LEAN maja diagram',
        subtitle: subtitle || 'LEAN MAJA Mudel',
      }
    },
  },
})