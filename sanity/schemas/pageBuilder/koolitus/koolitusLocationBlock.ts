import { defineType } from 'sanity'

export default defineType({
  name: 'koolitusLocationBlock',
  title: 'Asukoht ja Kontaktid (Koolitus)',
  type: 'object',
  fields: [
    {
      name: 'addressTitle',
      title: 'Aadressi pealkiri',
      type: 'string',
      initialValue: 'Koolitus toimub Grand Hotel Viljandi konverentsiruumis:'
    },
    {
      name: 'addressText',
      title: 'Aadressi tekst',
      type: 'string',
      initialValue: 'Tartu 11/Lossi 29, 71004 Viljandi.'
    },
    {
      name: 'transportNote',
      title: 'Transpordi märkus (NB!)',
      type: 'text',
      rows: 2,
      initialValue: 'NB! Väikese mööndusega sobib Tallinn-Viljandi-Tallinn rongisõidu graafik. Seda võimalust on kasutatud.'
    },
    {
      name: 'contactText',
      title: 'Tekst enne kontakte',
      type: 'string',
      initialValue: 'Lisateave koolitusele registreerimiseks saab telefonilt'
    },
    {
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      initialValue: '0000000'
    },
    {
      name: 'email',
      title: 'E-mail',
      type: 'string',
      initialValue: 'hello@example.com'
    },
    {
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL (Iframe src)',
      type: 'url',
      description: 'Google Maps -> Jaga -> Kinnista kaart -> Kopeeri src="..." väärtus',
      initialValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2144.33!2d25.5954!3d58.3639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4694a9776f8a5413%3A0x6b2b!2sGrand%20Hotel%20Viljandi!'
    },
    {
      name: 'mapButtonUrl',
      title: 'Link "Ava kaardil" nupule',
      type: 'url',
      initialValue: 'https://maps.app.goo.gl/PyDBcqDtnqWEJMhf7'
    },
    {
      name: 'subsidyText',
      title: 'Töötukassa bänneri tekst',
      type: 'text',
      rows: 2,
      initialValue: 'NB! VÕIMALIK ON TAODELDA KOOLITUSTOETUST TÖÖTUKASSAST - KUNI 80% KOOLITUSE HINNAST. UURI LISAKS TÄIENDKOOLITUSE STANDARDILE VASTAVUST MINU LEHEL - KLIKI SELLEL TEKSTIL'
    },
    {
      name: 'subsidyLink',
      title: 'Töötukassa bänneri link',
      type: 'string',
      initialValue: '/standard'
    }
  ],
  preview: {
    select: { title: 'addressTitle' },
    prepare({ title }: { title?: string }) {
      return {
        title: title || 'Asukoht ja Kontaktid',
        subtitle: 'Koolituse asukoha blokk',
      }
    },
  }
})
