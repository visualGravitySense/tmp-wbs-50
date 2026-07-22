import { defineField, defineType } from 'sanity'

/**
 * Standalone OPSTAR framework block — fields are defined inline (no shared
 * opstarProfit / opstarCoreFields references) to prevent Studio form freeze.
 */
export default defineType({
  name: 'opstarFrameworkBlock',
  title: 'Product Name raamistik (6 osa)',
  type: 'object',
  fields: [
    defineField({
      name: 'framework',
      title: 'Raamistiku sisu',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Silmapealiskiri',
          type: 'string',
          initialValue: 'Raamistik',
        }),
        defineField({
          name: 'title',
          title: 'Pealkiri',
          type: 'string',
          initialValue: 'Product Name — kuus osa',
        }),
        defineField({
          name: 'subtitle',
          title: 'Alapealkiri',
          type: 'text',
          rows: 2,
          initialValue:
            'Iga osa vastab konkreetsele juhtimisvalule ja viib sind lahenduseni.',
        }),
        defineField({
          name: 'parts',
          title: 'Raamistiku osad',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'opstarFrameworkPart',
              fields: [
                defineField({
                  name: 'code',
                  title: 'Lühend',
                  type: 'string',
                  description: 'nt OP, ST, AR, PRO, FIT, PROFIT',
                }),
                defineField({
                  name: 'fullTitle',
                  title: 'Täispealkiri',
                  type: 'string',
                }),
                defineField({
                  name: 'explanation',
                  title: 'Selgitus',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'painQuote',
                  title: 'Valu tsitaat',
                  type: 'text',
                  rows: 2,
                }),
                defineField({
                  name: 'ctaText',
                  title: 'CTA nupu tekst',
                  type: 'string',
                }),
                defineField({
                  name: 'ctaHref',
                  title: 'CTA link',
                  type: 'string',
                  description: 'Suvaline URL või tee, nt /koolitus, /blog või https://…',
                }),
              ],
              preview: {
                select: { code: 'code', title: 'fullTitle' },
                prepare({ code, title }: { code?: string; title?: string }) {
                  return {
                    title: code && title ? `${code} — ${title}` : code || title || 'Osa',
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'framework.title' },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Product Name raamistik',
        subtitle: 'Product Name',
      }
    },
  },
})