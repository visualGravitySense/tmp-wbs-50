import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'andresProfile',
  title: 'Andres Profile Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      initialValue: 'Andres Kase',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Koolitaja Andres',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Programmi juht ja peakoolitaja • 25+ aastat tootmises',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      initialValue: '"Õpetab seda, mida on ise tehases teinud — ja ka seda, mida tegid Henry Ford sajand tagasi ja Jaapani juhid Toyotas."',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio (Compact Variant)',
      type: 'text',
      initialValue: 'Andres ei õpeta lihtsalt teooriat. Õpetab seda, millele tugineb tugev teooria — ehk töötavat praktikat. Jagan kogemust 100+ Eesti tehase põrandalt. Teen puust ja punaselt ette ja asi saab selgeks.',
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio (Medium/Full Variants)',
      type: 'array',
      of: [{ type: 'block' }],
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Andres ei õpeta lihtsalt teooriat. Õpetab seda, millele tugineb tugev teooria — ehk töötavat praktikat. Jagan kogemust 100+ Eesti tehase põrandalt. Teen puust ja punaselt ette ja asi saab selgeks.',
            },
          ],
        },
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Konsultatsioonid ja koolitused on toimunud autotööstuses, toiduainete ja metallitööstuses, logistikaettevõtetes ning meditsiini- ja masinatööstuses. Tehaseid on aidatud üle Eesti, Lätis ja Leedus — alati kohapeal, kus töö tegelikult toimub.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'methodology',
      title: 'Methodology (Medium/Full Variants)',
      type: 'text',
      initialValue: 'LEAN ebaõnnestub enamasti siis, kui keskendutakse ainult tööriistadele ilma inimesteta. Andrese lähenemine on inimene-esimesena: selged rutiinid, juhtimise nähtavus ja meeskonna kaasamine, et muutus jääks ellu pärast koolitust — mitte ei jääks seinale riputatud plaaniks.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Badges',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['LEAN', 'TOYOTA TPS', 'KAIZEN', '100+ TEHAST', '25A KOGEMUST', 'JIPM SERTIFITSEERITUD'],
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
        },
      ],
      initialValue: [
        { _key: '1', value: '147+', label: 'Lõpetajat' },
        { _key: '2', value: '+31%', label: 'Kesk. OEE kasv' },
        { _key: '3', value: '4.9/5', label: 'Hinnang' },
        { _key: '4', value: '100+', label: 'Tehast' },
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Main Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'secondaryPhotos',
      title: 'Secondary Photos (Factories/Classroom)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'timeline',
      title: 'Career Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Year', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
        },
      ],
      initialValue: [
        { _key: 't1', year: '1998', title: 'Tootmisjuht, AS Norma', description: 'Esimesed sammud LEAN ja TPS meetodite juurutamisel.' },
        { _key: 't2', year: '2005', title: 'Tehasejuht, Enics Eesti', description: 'OEE tõstmine ja protsesside optimeerimine elektroonikatööstuses.' },
        { _key: 't3', year: '2015', title: 'Koolitaja ja konsultant', description: 'Alustas ettevõtete nõustamist, aidates üle 100 tehase.' }
      ]
    }),
    defineField({
      name: 'factories',
      title: 'Highlighted Factories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Factory Name', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
            defineField({ name: 'logo', title: 'Logo/Image', type: 'image' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link (Compact Variant)',
      type: 'string',
      initialValue: '/koolitus',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label (Compact Variant)',
      type: 'string',
      initialValue: 'Loe edasi →',
    }),
  ],
})
