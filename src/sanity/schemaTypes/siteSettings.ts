import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Used for the global site title or SEO',
    }),
    defineField({
      name: 'clientsEyebrow',
      title: 'Clients Eyebrow Pill Text',
      type: 'string',
    }),
    defineField({
      name: 'clientsMainHeadline',
      title: 'Clients Main Headline',
      type: 'string',
    }),
    defineField({
      name: 'clientsScriptHeadline',
      title: 'Clients Script Headline',
      type: 'string',
    }),
    defineField({
      name: 'clientsDescription',
      title: 'Clients Description',
      type: 'text',
    }),
    defineField({
      name: 'globalStats',
      title: 'Üldine statistika (Numbrite blokk)',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Pealkiri (valikuline)',
          type: 'string',
        }),
        defineField({
          name: 'stats',
          title: 'Statistika',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'statItem',
              title: 'Statistika rida',
              fields: [
                defineField({ name: 'number', title: 'Number', type: 'string' }),
                defineField({ name: 'suffix', title: 'Suffix', type: 'string' }),
                defineField({ name: 'label', title: 'Silt / Kirjeldus', type: 'string' })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: 'industries',
      title: 'Tegevusalad (Industries)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Globaalne tegevusalade nimekiri klientide lehe filtri jaoks (nt. Tootmine, Logistika)',
    }),
    defineField({
      name: 'clients',
      title: 'Kliendid logoriba (Clients)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'partnerLogo' }] }],
      description: 'Global clients/partners logo strip',
    }),
    defineField({
      name: 'testimonials',
      title: 'Tagasiside (Testimonials)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role/Company', type: 'string' }),
            defineField({ name: 'content', title: 'Testimonial Content', type: 'text' }),
            defineField({ name: 'image', title: 'Author Image', type: 'image', options: { hotspot: true } }),
          ]
        }
      ],
    }),

    defineField({
      name: 'cohorts',
      title: 'Kohordid (Cohorts & Schedule)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Cohort Name', type: 'string' }),
            defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['active', 'full', 'upcoming'] } }),
            defineField({ name: 'startDate', title: 'Start Date', type: 'date' }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ]
        }
      ]
    }),
    defineField({
      name: 'guarantee',
      title: 'Garantiiplokk (Guarantee)',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text' }),
        defineField({ name: 'badge', title: 'Badge Text', type: 'string' }),
      ]
    }),
    defineField({
      name: 'notFoundPage',
      title: '404 Error Page (Vealeht)',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title / Pealkiri', type: 'string', description: 'Headline for 404 page' }),
        defineField({ name: 'description', title: 'Description Text / Veateade', type: 'array', of: [{ type: 'block' }], description: 'Flexible rich text block for 404 description' }),
        defineField({ name: 'buttonText', title: 'Button Text / Nupu tekst', type: 'string' }),
        defineField({ name: 'buttonLink', title: 'Button Link / Nupu link', type: 'string' }),
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Global Site Settings',
      }
    }
  }
})
