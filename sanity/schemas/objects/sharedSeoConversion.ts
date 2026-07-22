import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'sharedSeoConversion',
  title: 'SEO & konversioon (pärast hero)',
  type: 'object',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Kuva sektsioon',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'anchorId',
      title: 'Sektsiooni HTML id (anchor)',
      type: 'string',
      description: 'Ainult väiketähed, numbrid ja sidekriips (nt tootmisjuhtimise-sonastik).',
      initialValue: 'tootmisjuhtimise-sonastik',
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9-]+$/, {
          name: 'anchor',
          invert: false,
        }).error('Kasuta ainult a-z, 0-9 ja sidekriipsu'),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Ülapisikiri (eyebrow)',
      type: 'string',
      initialValue: 'Sõnastik',
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      initialValue: 'Põhimõisted',
    }),
    defineField({
      name: 'intro',
      title: 'Sissejuhatus',
      type: 'text',
      rows: 3,
      description: 'Lühike lõik SEO ja konversiooni jaoks (näitab vasakul pealkirja all).',
      initialValue:
        'Lühidalt ja selgelt: mida tähendavad kõige sagedamini kasutatavad mõisted tootmisjuhtimises — hea nii otsingumootoritele kui ka külastajale, kes otsustab, kas koolitus on talle õige.',
    }),
    defineField({
      name: 'terms',
      title: 'Mõisted',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'termId',
              title: 'ID (anchor, unikaalne)',
              type: 'string',
              description: 'HTML id ja URL hash (nt lean, tps, vsm). Ainult väiketähed, numbrid, sidekriips.',
              validation: (Rule) =>
                Rule.required().regex(/^[a-z0-9-]+$/, {
                  name: 'termId',
                  invert: false,
                }),
            }),
            defineField({
              name: 'title',
              title: 'Nupp / lühinimi',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Alapealkiri (sinine rida)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Kirjeldus',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', termId: 'termId' },
            prepare({ title, termId }: { title?: string; termId?: string }) {
              return { title: title || 'Mõiste', subtitle: termId ? `#${termId}` : '' }
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'lean',
          termId: 'lean',
          title: 'LEAN',
          subtitle: 'Kulusäästlik mõtlemine',
          description:
            'Meetodid, mis aitavad leida ja eemaldada tootmisprotsessist raiskamised, säästes aega ja raha. See ei ole kokkuhoid, vaid väärtuse loomine ilma kadudeta.',
        },
        {
          _key: 'tps',
          termId: 'tps',
          title: 'TPS',
          subtitle: 'Toyota Tootmissüsteem',
          description:
            'Algupärane efektiivsuse filosoofia, mis keskendub optimaalsele töövoole ja vigade ennetamisele. See on kultuur, kus iga töötaja aitab süsteemi paremaks muuta.',
        },
        {
          _key: 'vsm',
          termId: 'vsm',
          title: 'VSM',
          subtitle: 'Väärtusahela kaardistamine',
          description:
            'Visuaalne tööriist, mis näitab täpselt, kus tekib toote väärtus ja kus on peidus takistused. See on kui röntgenülesvõte sinu tootmisprotsessist.',
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
})
