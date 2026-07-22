import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontaktQuickBlock',
  title: 'Kontakt Otsekontakt',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Ploki pealkiri',
      type: 'string',
      initialValue: 'Otsekontakt',
    }),
    defineField({
      name: 'labelEmail',
      title: 'Silt: e-post',
      type: 'string',
      initialValue: 'E-post',
    }),
    defineField({
      name: 'labelPhone',
      title: 'Silt: telefon',
      type: 'string',
      initialValue: 'Telefon',
    }),
    defineField({
      name: 'labelAddress',
      title: 'Silt: aadress',
      type: 'string',
      initialValue: 'Aadress',
    }),
    defineField({
      name: 'labelResponse',
      title: 'Silt: vastamine',
      type: 'string',
      initialValue: 'Vastamine',
    }),
    defineField({
      name: 'emails',
      title: 'E-posti aadressid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Silt', type: 'string' }),
            defineField({ name: 'address', title: 'E-post', type: 'string' }),
          ],
          preview: {
            select: { title: 'address', subtitle: 'label' },
          },
        },
      ],
      initialValue: [
        { label: 'Üldine', address: 'hello@example.com' },
        { label: 'Koolitus ja pakkumised', address: 'hello@example.com' },
      ],
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Telefon (kuvatav)',
      type: 'string',
      initialValue: '+372 000 0000',
    }),
    defineField({
      name: 'phoneTel',
      title: 'Telefon (tel: link)',
      description: 'Ilma tühikuteta, nt +3720000000',
      type: 'string',
      initialValue: '+3720000000',
    }),
    defineField({
      name: 'addressStreet',
      title: 'Aadress — tänav',
      type: 'string',
      initialValue: 'Tartu 11 / Lossi 29',
    }),
    defineField({
      name: 'addressPostalCode',
      title: 'Aadress — postiindeks',
      type: 'string',
      initialValue: '71004',
    }),
    defineField({
      name: 'addressCity',
      title: 'Aadress — linn',
      type: 'string',
      initialValue: 'Viljandi',
    }),
    defineField({
      name: 'addressCountry',
      title: 'Aadress — riik',
      type: 'string',
      initialValue: 'Eesti',
    }),
    defineField({
      name: 'responseNote',
      title: 'Vastamise tekst',
      type: 'string',
      initialValue: 'Vastame tavaliselt 24 tunni jooksul tööpäevadel.',
    }),
    defineField({
      name: 'mapLinkLabel',
      title: 'Kaardi lingi tekst',
      type: 'string',
      initialValue: 'Ava kaardil',
    }),
    defineField({
      name: 'mapQuery',
      title: 'Kaardi otsing (Google Maps)',
      type: 'string',
      initialValue: 'Tartu 11 Lossi 29 Viljandi Eesti',
    }),
    defineField({
      name: 'emailButtonText',
      title: 'Nupp: kirjuta e-kirjaga',
      type: 'string',
      initialValue: 'Kirjuta e-kirjaga',
    }),
    defineField({
      name: 'phoneButtonText',
      title: 'Nupp: helista',
      type: 'string',
      initialValue: 'Helista',
    }),
    defineField({
      name: 'primaryEmailForButtons',
      title: 'E-post nuppude jaoks',
      description: 'Kui tühi, kasutatakse esimest e-posti nimekirjast.',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
    prepare({ title }) {
      return { title: title || 'Otsekontakt', subtitle: 'Otsekontakti plokk' }
    },
  },
})
