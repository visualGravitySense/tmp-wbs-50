import { defineField } from 'sanity'

/** Partners marquee fields mirrored from `mainPage` (LogoMarquee). */
export const homePartnersFields = [
  defineField({
    name: 'partnersTitle',
    title: 'Partners Section Title',
    type: 'string',
    initialValue: 'Osalenud',
  }),
  defineField({
    name: 'partners',
    title: 'Partners',
    description: 'Valikuline. Vali konkreetsed logod, mida kuvada. Kui jätad tühjaks, kuvatakse automaatselt kõik logod globaalsest "Partnerite logod" nimekirjast.',
    type: 'array',
    of: [
      {
        type: 'reference',
        to: [{ type: 'partnerLogo' }],
      },
    ],
  }),
]
