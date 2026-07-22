import { defineField, defineType } from 'sanity'
import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default defineType({
  name: 'testimonialsPage',
  title: 'Tagasiside leht',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sisemine pealkiri',
      type: 'string',
      initialValue: 'Tagasiside lehe seaded',
      validation: (Rule) => Rule.required(),
    }),
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.testimonialsPage],
      description: 'Lisa plokke tagasiside lehe alla (nt statistika, CTA, KKK).',
    }),
    defineField({
      name: 'pageTitle',
      title: 'Lehe pealkiri (H1)',
      type: 'string',
      initialValue: 'Mis räägivad lõpetajad?',
      validation: (Rule) => Rule.required(),
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
      name: 'eyebrow',
      title: 'Ülemine silt (Eyebrow)',
      type: 'string',
      initialValue: 'Tagasiside',
    }),
    defineField({
      name: 'statRating',
      title: 'Hinnangu skoor (nt 4.9/5)',
      type: 'string',
      initialValue: '4.9/5',
    }),
    defineField({
      name: 'statOee',
      title: 'OEE kasvu statistika (nt +31% OEE)',
      type: 'string',
      initialValue: '+31% OEE',
    }),
    defineField({
      name: 'statTimeframe',
      title: 'Aja statistika (nt ~14 päeva)',
      type: 'string',
      initialValue: '~14 päeva',
    }),
    defineField({
      name: 'ctaRegisterText',
      title: 'Registreeru nupu silt',
      type: 'string',
      initialValue: 'See piisab — registreeru →',
    }),
    defineField({
      name: 'quizTitle',
      title: 'Viktoriini pealkiri',
      type: 'string',
      initialValue: 'Kelle lugu kõlab sinu omaga kõige sarnasemalt?',
    }),
    defineField({
      name: 'quizSubtitle',
      title: 'Viktoriini alustekst',
      type: 'string',
      initialValue: 'Vali inimene — näitame sinu järgmist sammu:',
    }),
    defineField({
      name: 'quizTimeframeQuestion',
      title: 'Aja küsimus (nt "Millal sina oma esimese muutuse teed?")',
      type: 'string',
      initialValue: 'Millal sina oma esimese muutuse teed?',
    }),
    defineField({
      name: 'quizOptions',
      title: 'Kvisi valikud (Teemad)',
      type: 'array',
      of: [{ type: 'testimonialQuizOption' }],
    }),
    defineField({
      name: 'clientLogosBlock',
      title: 'Ettevõtete logorida (Marquee)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partnerLogo' }] }],
    }),
  ],
  preview: {
    select: { title: 'pageTitle', subtitle: 'title' },
    prepare({ title, subtitle }) {
      return { title: title || 'Tagasiside leht', subtitle: subtitle || '' }
    },
  },
})
