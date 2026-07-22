import { defineField, defineType } from 'sanity'

/**
 * Smaily newsletter signup block — reusable in Blog Page (and other) page builders.
 */
export default defineType({
  name: 'newsletterBlock',
  title: 'Uudiskirjaga liitumise plokk (Smaily)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'Telli uued postitused',
    }),
    defineField({
      name: 'subtitle',
      title: 'Alapealkiri',
      type: 'text',
      rows: 2,
      initialValue: 'Uus artikkel kord nädalas — otse postkasti. Rämpsposti ei saada.',
    }),
    defineField({
      name: 'placeholder',
      title: 'Sisestatava välja vihje (Placeholder)',
      type: 'string',
      initialValue: 'sinu@email.ee',
    }),
    defineField({
      name: 'buttonText',
      title: 'Nupu tekst',
      type: 'string',
      initialValue: 'TELLI',
    }),
    defineField({
      name: 'successMessage',
      title: 'Eduka liitumise teade',
      type: 'string',
      initialValue: 'Aitäh liitumast! Kinnituskiri on teel Sinu postkasti.',
    }),
    defineField({
      name: 'note',
      title: 'Väike märkus (vormi all)',
      type: 'string',
      description: 'Valikuline rida nupu all (nt loobu igal ajal).',
      initialValue: '147+ tootmisjuhti on juba tellinud · loobu igal ajal',
    }),
    defineField({
      name: 'tag',
      title: 'Smaily Silt (Tag)',
      type: 'string',
      description: 'Silt, mis lisatakse Smaily-s kontaktile (nt: blogi-pealeht).',
      initialValue: 'blogi-pealeht',
    }),
    defineField({
      name: 'source',
      title: 'Smaily allikas (Source)',
      type: 'string',
      description: 'Valikuline source atribuut (vaikimisi: blog).',
      initialValue: 'blog',
    }),
    defineField({
      name: 'variant',
      title: 'Paigutus',
      type: 'string',
      options: {
        list: [
          { title: 'Horisontaalne bänner (blogi pealeht)', value: 'horizontal' },
          { title: 'Kompaktne külgriba', value: 'sidebar' },
        ],
        layout: 'radio',
      },
      initialValue: 'horizontal',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tag: 'tag',
      variant: 'variant',
    },
    prepare({ title, tag, variant }) {
      return {
        title: title || 'Uudiskiri (Smaily)',
        subtitle: [variant === 'sidebar' ? 'Külgriba' : 'Bänner', tag].filter(Boolean).join(' · '),
      }
    },
  },
})
