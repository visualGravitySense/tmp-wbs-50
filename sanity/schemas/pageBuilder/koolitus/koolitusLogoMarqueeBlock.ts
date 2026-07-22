import { defineType } from 'sanity'

/**
 * Logo marquee block for the koolitus page builder.
 * Lets the editor override the title; logos are fetched globally from Partnerite logod.
 */
export default defineType({
  name: 'koolitusLogoMarqueeBlock',
  title: 'Logo karussell (ettevõtted)',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Pealkiri',
      type: 'string' as const,
      description: 'Kuvatakse karusselli kohal. Jätke tühjaks → kasutatakse vaikeväärtust. Logod võetakse automaatselt globaalsest "Partnerite logod" nimekirjast.',
    },
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Osalenud ettevõtted',
        subtitle: 'Logo karussell',
      }
    },
  },
})

