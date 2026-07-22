import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonialQuizOption',
  title: 'Kvisi vastuse variant',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Nupu tekst (Variant)',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'E.g., "Selle aasta sees" või "Soovin personaalset auditit"',
    }),
    defineField({
      name: 'textDescription',
      title: 'Kuvatav tekst vastamisel',
      type: 'text',
      validation: (Rule) => Rule.required(),
      description: 'Tekst, mis ilmub nupule vajutamisel.',
    }),
    defineField({
      name: 'courseUrl',
      title: 'Seotud koolituse link (Valikuline)',
      type: 'string',
      description: 'Kui soovid, et vastusega ilmuks nupp vastavale koolitusele (nt. "/koolitus" või otselink).',
    }),
    defineField({
      name: 'ctaText',
      title: 'Koolituse nupu tekst (Valikuline)',
      type: 'string',
      description: 'E.g., "Vaata sobivat koolitust →" (Vaikimisi: "Uuri lähemalt →")',
    }),
  ],
})
