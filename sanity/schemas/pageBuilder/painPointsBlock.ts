import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'painPointsBlock',
  title: 'Valupunktid (Pain Points)',
  type: 'object',
  icon: () => '⚠️',
  fields: [
    defineField({
      name: 'variant',
      title: 'Kuvamise variant',
      type: 'string',
      options: {
        list: [
          { title: 'Roles (Väljakutsed 3 rolli)', value: 'roles' },
          { title: 'Grid (Probleemid 5 punkti)', value: 'grid' },
          { title: 'Audience (Sihtrühm 6 küsimust)', value: 'audience' },
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
    }),
    
    // --- SHARED FIELDS ---
    defineField({
      name: 'eyebrow',
      title: 'Ülemine silt (Eyebrow)',
      type: 'string',
      hidden: ({ parent }) => !['roles', 'grid', 'audience'].includes(parent?.variant),
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri',
      type: 'string',
      description: 'Kasutatakse kõikides variantides (Roles: pealkiri, Grid: heading, Audience: pealkiri).',
    }),
    defineField({
      name: 'scriptTitle',
      title: 'Skript pealkiri / Alapealkiri',
      type: 'string',
      description: 'Sinises kursiivkirjas (script) tekst pealkirja all.',
    }),
    defineField({
      name: 'subheading',
      title: 'Alustekst',
      type: 'text',
      hidden: ({ parent }) => !['roles', 'grid'].includes(parent?.variant),
    }),

    // --- ROLES VARIANT ---
    defineField({
      name: 'managerTitle',
      title: 'Juhi veeru pealkiri',
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'roles',
    }),
    defineField({
      name: 'managerChallenges',
      title: 'Juhi väljakutsed',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent?.variant !== 'roles',
    }),
    defineField({
      name: 'participantTitle',
      title: 'Osaleja veeru pealkiri',
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'roles',
    }),
    defineField({
      name: 'participantChallenges',
      title: 'Osaleja väljakutsed',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent?.variant !== 'roles',
    }),
    defineField({
      name: 'collectiveTitle',
      title: 'Kollektiivi veeru pealkiri',
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'roles',
    }),
    defineField({
      name: 'collectiveChallenges',
      title: 'Kollektiivi väljakutsed',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent?.variant !== 'roles',
    }),
    defineField({
      name: 'conclusion',
      title: 'Kokkuvõtte tekst',
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'roles',
    }),

    // --- GRID VARIANT ---
    defineField({
      name: 'items',
      title: 'Probleemide nimekiri (Grid)',
      type: 'array',
      of: [{ type: 'painItem' }],
      hidden: ({ parent }) => parent?.variant !== 'grid',
    }),
    // --- AUDIENCE VARIANT ---
    defineField({
      name: 'socialProofIntro',
      title: 'Social Proof tekst',
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'audience',
    }),
    defineField({
      name: 'cards',
      title: 'Küsimuste/Väidete kaardid (Audience)',
      type: 'array',
      hidden: ({ parent }) => parent?.variant !== 'audience',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'quote', title: 'Tsitaat', type: 'string' },
            { name: 'behavior', title: 'Käitumine/olukord', type: 'string' },
            { name: 'percentage', title: 'Protsent (%)', type: 'string' },
            { name: 'revealText', title: 'Avanev tekst', type: 'string' },
            { name: 'revealLink', title: 'Avaneva teksti link', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'confirmButtonText',
      title: 'Kinnituse nupu tekst',
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'audience',
    }),
    defineField({
      name: 'transformBar',
      title: 'Enne/Pärast riba (Audience)',
      type: 'object',
      hidden: ({ parent }) => parent?.variant !== 'audience',
      fields: [
        { name: 'beforeLabel', title: 'Enne - silt', type: 'string' },
        { name: 'beforeText', title: 'Enne - tekst', type: 'string' },
        { name: 'afterLabel', title: 'Pärast - silt', type: 'string' },
        { name: 'afterText', title: 'Pärast - tekst', type: 'string' },
      ],
    }),
    defineField({
      name: 'goalSection',
      title: 'Eesmärgi sisestamine (Audience)',
      type: 'object',
      hidden: ({ parent }) => parent?.variant !== 'audience',
      fields: [
        { name: 'label', title: 'Silt', type: 'string' },
        { name: 'placeholder', title: 'Placeholder', type: 'string' },
        { name: 'confirmText', title: 'Kinnitamise tekst', type: 'string' },
      ],
    }),
    defineField({
      name: 'directorPath',
      title: 'Direktori / Kõrvaline tee (Audience)',
      type: 'object',
      hidden: ({ parent }) => parent?.variant !== 'audience',
      fields: [
        { name: 'title', title: 'Pealkiri', type: 'string' },
        { name: 'description', title: 'Kirjeldus', type: 'string' },
        { name: 'linkText', title: 'Lingi tekst', type: 'string' },
        { name: 'linkUrl', title: 'Lingi URL', type: 'string' },
      ],
    }),

    // --- SHARED CTA ---
    defineField({
      name: 'ctaText',
      title: 'Sinise CTA nupu tekst',
      description:
        'Grid: alumine sinine nupp. Audience: sinine nupp valiku kokkuvõtte all. Tühi väli → "SAADA PÄRING" (audience) või "Broneeri koht" (grid).',
      type: 'string',
      hidden: ({ parent }) => !['grid', 'audience'].includes(parent?.variant),
      initialValue: ({ parent }) =>
        parent?.variant === 'audience' ? 'SAADA PÄRING' : 'Broneeri koht',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Sinise CTA nupu link / tegevus',
      description:
        'Täielik URL või sisemine tee (nt /kontakt) avab lingi. Tühi, # või #broneeri avab kontaktivormi.',
      type: 'string',
      hidden: ({ parent }) => !['grid', 'audience'].includes(parent?.variant),
      initialValue: '#broneeri',
    }),
    defineField({
      name: 'bottomText',
      title: 'Alumine juhendtekst',
      description:
        'Grid: CTA selgitus enne valikut. Audience: tekst enne kaartide valimist (vaikimisi "Vali välja punktid, mis sind kõnetavad.").',
      type: 'string',
      hidden: ({ parent }) => !['grid', 'audience'].includes(parent?.variant),
    }),

    // --- GRID CONTACT MODAL ---
    defineField({
      name: 'contactModalTitle',
      title: 'Vormi pealkiri',
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'grid',
    }),
    defineField({
      name: 'contactModalDescription',
      title: 'Vormi kirjeldus',
      type: 'text',
      hidden: ({ parent }) => parent?.variant !== 'grid',
    }),
    defineField({
      name: 'contactModalSuccessTitle',
      title: 'Eduka saatmise pealkiri',
      type: 'string',
      hidden: ({ parent }) => parent?.variant !== 'grid',
    }),
    defineField({
      name: 'contactModalSuccessText',
      title: 'Eduka saatmise tekst',
      type: 'text',
      hidden: ({ parent }) => parent?.variant !== 'grid',
    }),
  ],
  preview: {
    select: {
      variant: 'variant',
      title: 'title',
    },
    prepare({ variant, title }) {
      const labels = {
        roles: 'Roles (3 rolli)',
        grid: 'Grid (Probleemid)',
        audience: 'Audience (Sihtrühm)',
      }
      return {
        title: title || 'Valupunktid (Pain Points)',
        subtitle: labels[variant as keyof typeof labels] || 'Määramata',
      }
    },
  },
})
