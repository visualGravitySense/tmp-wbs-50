import { defineType, defineField } from 'sanity'

const linkItem = {
  type: 'object' as const,
  fields: [
    defineField({
      name: 'label',
      title: 'Tekst',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link (URL või /tee)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
}

const SOCIAL_PLATFORMS = [
  { title: 'Facebook', value: 'facebook' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'X (Twitter)', value: 'x' },
  { title: 'Telegram', value: 'telegram' },
  { title: 'WhatsApp', value: 'whatsapp' },
] as const

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fieldsets: [
    { name: 'brand', title: 'Bränd ja sotsiaalmeedia', options: { collapsible: true } },
    { name: 'nav', title: 'Navigatsioon', options: { collapsible: true } },
    { name: 'contact', title: 'Kontakt', options: { collapsible: true } },
    { name: 'legal', title: 'Jalus', options: { collapsible: true } },
  ],
  fields: [
    defineField({
      name: 'brandBadge',
      title: 'Ülapisikirja badge',
      type: 'string',
      fieldset: 'brand',
      initialValue: 'TOOTMISJUHTIMINE',
    }),
    defineField({
      name: 'brandTitle',
      title: 'Pealkiri',
      type: 'string',
      fieldset: 'brand',
      initialValue: 'ANDRES KASE',
    }),
    defineField({
      name: 'brandDescription',
      title: 'Kirjeldus',
      type: 'text',
      rows: 3,
      fieldset: 'brand',
      initialValue:
        'Eesti juhtiv tootmisjuhtimise koolitus. Aitame tehaseid saavutada uue taseme toimimist läbi praktilise koolituse ja personaalse mentorluse.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sotsiaalmeedia ikoonid',
      description:
        'Lisa ridu, vali platvorm (määrab ikooni) ja täida link. Järjekord = kuvamise järjekord.',
      type: 'array',
      fieldset: 'brand',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platvorm / ikoon',
              type: 'string',
              options: { list: [...SOCIAL_PLATFORMS] },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Ligipääsetavuse silt (valikuline)',
              description: 'Nt "Facebook — Site Name". Kui tühi, kasutatakse platvormi nime.',
              type: 'string',
            }),
          ],
          preview: {
            select: { platform: 'platform', url: 'url' },
            prepare({
              platform,
              url,
            }: {
              platform?: string
              url?: string
            }) {
              const title =
                SOCIAL_PLATFORMS.find((p) => p.value === platform)?.title ||
                platform ||
                'Sotsiaalmeedia'
              return { title, subtitle: url || 'Link puudub' }
            },
          },
        },
      ],
      initialValue: [
        { platform: 'facebook', url: 'https://www.facebook.com/' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/' },
        { platform: 'instagram', url: 'https://www.instagram.com/' },
      ],
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Teenuste veeru pealkiri',
      type: 'string',
      fieldset: 'nav',
      initialValue: 'Teenused',
    }),
    defineField({
      name: 'servicesLinks',
      title: 'Teenuste lingid',
      type: 'array',
      fieldset: 'nav',
      of: [linkItem],
      initialValue: [
        { label: 'Tootmisjuhtimise koolitus', href: '/koolitus' },
        { label: 'Product Name', href: '/product' },
        { label: 'Juhendatud lõputööd', href: '/juhendatud-loputood' },
        { label: 'Koolitused', href: '/koolitus' },
      ],
    }),
    defineField({
      name: 'infoTitle',
      title: 'Info veeru pealkiri',
      type: 'string',
      fieldset: 'nav',
      initialValue: 'Info',
    }),
    defineField({
      name: 'infoLinks',
      title: 'Info lingid',
      type: 'array',
      fieldset: 'nav',
      of: [linkItem],
      initialValue: [
        { label: 'About', href: '/about' },
        { label: 'Blogi', href: '/blog' },
        { label: 'Tagasiside', href: '/testimonials' },
        { label: 'Privaatsuspoliitika', href: '/privacy-policy' },
        { label: 'Galerii', href: '/galerii' },
        { label: 'Kontakt', href: '/kontakt' },
      ],
    }),
    defineField({
      name: 'contactTitle',
      title: 'Kontakti pealkiri',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'Kontakt',
    }),
    defineField({
      name: 'emailLabel',
      title: 'E-posti silt',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'Email:',
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'hello@example.com',
    }),
    defineField({
      name: 'phoneLabel',
      title: 'Telefoni silt',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'Telefon:',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      fieldset: 'contact',
      initialValue: '5138403',
    }),
    defineField({
      name: 'locationLabel',
      title: 'Asukoha silt',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'Asukoht:',
    }),
    defineField({
      name: 'location',
      title: 'Asukoht',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'Tartu 11/Lossi 29, 71004 Viljandi',
    }),
    defineField({
      name: 'registryCode',
      title: 'Registrikood',
      type: 'string',
      fieldset: 'contact',
      initialValue: '12736663',
    }),
    defineField({
      name: 'vatNumber',
      title: 'KMKR number',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'EE101854744',
    }),
    defineField({
      name: 'partnerBadgeText',
      title: 'Roheline bänner — tekst',
      type: 'string',
      fieldset: 'contact',
      initialValue: 'PRODUCT FRAMEWORK',
    }),
    defineField({
      name: 'partnerBadgeLink',
      title: 'Roheline bänner — link',
      type: 'string',
      fieldset: 'contact',
      initialValue: '/product',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Autoriõigus',
      type: 'string',
      fieldset: 'legal',
      initialValue: '© 2026 Site Name. Kõik õigused kaitstud.',
    }),
    defineField({
      name: 'bottomTagline',
      title: 'Parempoolne tagline',
      type: 'string',
      fieldset: 'legal',
      initialValue: 'BUILT FOR PRACTICAL MANUFACTURING LEADERSHIP',
    }),
  ],
})
