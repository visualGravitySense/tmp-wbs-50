import { defineField, defineType } from 'sanity'

/** Sinine lõpu-CTA (avaleht + koolitusleht); üks tüüp, kaks kasutuskohta. */
export default defineType({
  name: 'finalCtaBlock',
  title: 'Lõpu CTA (sinine bänner)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      description: 'Suur valge pealkiri bänneri keskel.',
      initialValue: 'Õpi otse treenerilt',
    }),
    defineField({
      name: 'subtitle',
      title: 'Alapealkiri',
      type: 'string',
      description: 'Hallikassinine rida pealkirja all.',
      initialValue: '9 päeva jooksul',
    }),
    defineField({
      name: 'spotsInfo',
      title: '1. pill (kohtade info)',
      type: 'string',
      description: 'Vasak pill rohelise täpi kõrval.',
      initialValue: '3 kohta vabad',
    }),
    defineField({
      name: 'nextGroupInfo',
      title: '2. pill (grupp / koolitus)',
      type: 'string',
      description: 'Keskmine pill.',
      initialValue: 'oktoober 2026',
    }),
    defineField({
      name: 'supportPrefix',
      title: '3. pill — eesliide (toetus)',
      type: 'string',
      initialValue: 'Toetus kuni',
    }),
    defineField({
      name: 'supportInfo',
      title: '3. pill — toetus % või tekst',
      type: 'string',
      initialValue: '50%',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Valge nupu tekst',
      type: 'string',
      initialValue: 'Registreeru koolitusele',
    }),
    defineField({
      name: 'primaryButtonLink',
      title: 'Valge nupu link',
      type: 'string',
      initialValue: '#',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Ghost nupu tekst',
      type: 'string',
      initialValue: 'Vaata programmi',
    }),
    defineField({
      name: 'secondaryButtonLink',
      title: 'Ghost nupu link',
      type: 'string',
      initialValue: '#',
    }),
    defineField({
      name: 'footerText',
      title: 'Jalus (väike uppercase)',
      type: 'string',
      initialValue: 'Piiratud kohtade arv • Personaalne tagasiside • Sertifikaat',
    }),
  ],
})
