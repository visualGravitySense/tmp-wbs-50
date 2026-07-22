import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kontaktFormBlock',
  title: 'Kontakt Sõnumivorm',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Ploki pealkiri',
      type: 'string',
      initialValue: 'Saada sõnum',
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Ploki kirjeldus',
      type: 'text',
      rows: 3,
      initialValue:
        'Kirjelda lühidalt oma olukorda — koolitus, konsultatsioon või Product Name. Lisa e-post või telefon, et saaksime vastata samale kanalile.',
    }),
    defineField({
      name: 'contactFieldLabel',
      title: 'Väli: e-post/telefon — silt',
      type: 'string',
      initialValue: 'E-post või telefon',
    }),
    defineField({
      name: 'contactPlaceholder',
      title: 'Väli: e-post/telefon — placeholder',
      type: 'string',
      initialValue: 'nimi@näide.ee või +372 …',
    }),
    defineField({
      name: 'contactHint',
      title: 'Väli: e-post/telefon — vihje',
      type: 'string',
      initialValue: 'Kehtiv e-post või telefoninumber (vähemalt 8 numbrit).',
    }),
    defineField({
      name: 'messageFieldLabel',
      title: 'Väli: sõnum — silt',
      type: 'string',
      initialValue: 'Sõnum',
    }),
    defineField({
      name: 'messagePlaceholder',
      title: 'Väli: sõnum — placeholder',
      type: 'string',
      initialValue:
        'Kirjelda lühidalt, millega saame aidata — koolitus, konsultatsioon või Product Name…',
    }),
    defineField({
      name: 'messageHint',
      title: 'Väli: sõnum — vihje',
      type: 'string',
      initialValue: 'Vähemalt 10 tähemärki · kuni 3500',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Nupp: saada',
      type: 'string',
      initialValue: 'Saada sõnum',
    }),
    defineField({
      name: 'submittingButtonText',
      title: 'Nupp: saadan…',
      type: 'string',
      initialValue: 'Saadan…',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Viga teade',
      type: 'string',
      initialValue: 'Saatmine ebaõnnestus. Proovi hetke pärast uuesti või kirjuta otse e-postiga.',
    }),
    defineField({
      name: 'successTitle',
      title: 'Õnnestumine — pealkiri',
      type: 'string',
      initialValue: 'Aitäh — sõnum on kohale jõudnud.',
    }),
    defineField({
      name: 'successBody',
      title: 'Õnnestumine — tekst',
      type: 'text',
      rows: 2,
      initialValue:
        'Meie meeskond vastab esimesel võimalusel, tavaliselt sama või järgmise tööpäeva jooksul.',
    }),
    defineField({
      name: 'formAriaTitle',
      title: 'Ekraaniluger: vormi pealkiri',
      type: 'string',
      initialValue: 'Saada sõnum',
    }),
  ],
  preview: {
    select: { title: 'sectionTitle' },
    prepare({ title }) {
      return { title: title || 'Sõnumivorm', subtitle: 'Kontaktvormi plokk' }
    },
  },
})
