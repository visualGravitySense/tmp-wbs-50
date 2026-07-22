import { defineType, defineField } from 'sanity'

const TEENUSED_INITIAL = {
  eyebrow: 'TEENUSED',
  title: 'Mida pakume',
  scriptSubtitle: 'praktiliselt',
  description:
    'Koolitus, konsultatsioon ja OPSTAR PROFIT™ — kolm veergu, staatiline paigutus (mitte vahelehed).',
  features: [
    {
      title: 'Tootmisjuhtimise koolitus',
      description: '9-päevane LEAN-Agile programm juhtidele ja spetsialistidele.',
      icon: 'blue',
    },
    {
      title: 'Konsultatsioon',
      description: '60+ ettevõtet — mõõdetavad tulemused, rakendusplaan ja järeltugi.',
      icon: 'orange',
    },
    {
      title: 'OPSTAR PROFIT™',
      description: '8-komponentne süsteem Eesti tootmise jaoks — strateegiast põrandani.',
      icon: 'purple',
    },
  ],
}

export default defineType({
  name: 'homeHeroFeaturesBlock',
  title: 'Teenused (3 veergu staatiline)',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Ülemine silt (Eyebrow)',
      type: 'string',
      description: 'Väike tekst pealkirja kohal (nt "TEENUSED")',
      initialValue: TEENUSED_INITIAL.eyebrow,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Paks pealkiri (nt "Mida pakume")',
      initialValue: TEENUSED_INITIAL.title,
    }),
    defineField({
      name: 'scriptSubtitle',
      title: 'Script Subtitle',
      type: 'string',
      description: 'Sinine käsikirja tekst pealkirja kõrval',
      initialValue: TEENUSED_INITIAL.scriptSubtitle,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Lühike sissejuhatus kolme teenuse kaardi kohal',
      rows: 2,
      initialValue: TEENUSED_INITIAL.description,
    }),
    defineField({
      name: 'features',
      title: 'Teenused (3 kaarti)',
      description:
        'Staatiline 3-veeruline paigutus. Ära kasuta programDaysTabs — see blokk on teenuste jaoks.',
      type: 'array',
      validation: (Rule) => Rule.min(1).max(4),
      initialValue: TEENUSED_INITIAL.features,
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Ikoon (värv / kujund)',
              type: 'string',
              description: 'Sinine=tulpdiagramm, oranž=tehas, lilla=grupp, roheline=diplom',
              options: {
                list: [
                  { title: 'Sinine — mõõdikud (tulbad)', value: 'blue' },
                  { title: 'Oranž — tehas', value: 'orange' },
                  { title: 'Lilla — grupp', value: 'purple' },
                  { title: 'Roheline — tunnistus', value: 'green' },
                ],
              },
            }),
            defineField({
              name: 'svgIcon',
              title: 'SVG Icon Code',
              type: 'text',
              description: 'SVG code for the icon',
              rows: 5,
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', count: 'features' },
    prepare({ title, count }: { title?: string; count?: unknown[] }) {
      const n = Array.isArray(count) ? count.length : 0
      return {
        title: title || 'Teenused (3 veergu)',
        subtitle: n ? `${n} teenust · staatiline grid` : 'Lisa 3 teenuse kaarti',
      }
    },
  },
})
