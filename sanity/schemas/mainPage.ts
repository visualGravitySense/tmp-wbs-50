import { defineType, defineField } from 'sanity'
import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default defineType({
  name: 'mainPage',
  title: 'Main Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.mainPage],
      description:
        'Uus sektsioonipõhine avaleht. Blokid on ühised — saab kasutada ka teistel lehtedel. Kui massiiv on tühi, kasutatakse legacy välju allpool.',
    }),

    // ── Legacy section fields (used as fallback when page builder is empty) ──

    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      hidden: true,
      description: 'Small text above the main headline',
    }),
    defineField({
      name: 'headline',
      title: 'Main Headline',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'scriptHeadline',
      title: 'Script Headline',
      type: 'string',
      hidden: true,
      description: 'Italic script-style headline',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      hidden: true,
      rows: 2,
    }),
    defineField({
      name: 'featuredReviews',
      title: 'Avalehe tagasiside (Review dokumendid)',
      description:
        'Vali konkreetsed Review dokumendid — kuvatakse avalehel (esimesed 3 kaarti; ülejäänu vaata /testimonials).',
      type: 'array',
      hidden: true,
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    }),

    defineField({
      name: 'seoConversionSection',
      title: 'SEO & konversioon (pärast hero)',
      description: 'Sõnastik / põhimõisted — tekst otsingumootoritele ja külastajale.',
      type: 'seoConversionSectionContent',
      hidden: true,
    }),

    defineField({
      name: 'challenges',
      title: 'Challenges Block',
      type: 'object',
      hidden: true,
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'managerTitle', title: 'Manager Column Title', type: 'string' }),
        defineField({ name: 'participantTitle', title: 'Participant Column Title', type: 'string' }),
        defineField({ name: 'collectiveTitle', title: 'Collective Column Title', type: 'string' }),
        defineField({ name: 'managerChallenges', title: 'Manager Challenges', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'participantChallenges', title: 'Participant Challenges', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'collectiveChallenges', title: 'Collective Challenges', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'conclusion', title: 'Conclusion Text', type: 'string' }),
      ],
    }),

    defineField({
      name: 'nineDaysProgram',
      title: 'Nine Days Program (legacy)',
      type: 'object',
      hidden: true,
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'text' }),
      ],
    }),

    defineField({
      name: 'aboutAndres',
      title: 'About Andres Section',
      type: 'aboutAndresSectionContent',
      hidden: true,
    }),

    defineField({
      name: 'beforeAfter',
      title: 'Before/After Transformation Section',
      type: 'beforeAfterSectionContent',
      hidden: true,
    }),

    defineField({
      name: 'grantSection',
      title: 'Grant Section',
      type: 'grantSectionContent',
      hidden: true,
    }),

    defineField({
      name: 'photoMarquee',
      title: 'Photo Marquee Section',
      type: 'photoMarqueeSectionContent',
      hidden: true,
    }),

    defineField({
      name: 'pricingSection',
      title: 'Pricing Section',
      type: 'pricingSectionContent',
      hidden: true,
    }),

    defineField({
      name: 'finalCTA',
      title: 'Lõpu CTA (sinine bänner)',
      type: 'finalCtaBlock',
      hidden: true,
      description: 'Kuvatakse avalehe lõpus ja koolituslehe lõpus.',
      options: { collapsible: true, collapsed: true },
    }),

    defineField({
      name: 'quiz',
      title: 'Quick Quiz',
      type: 'quizContent',
      hidden: true,
    }),

    defineField({
      name: 'helpFormTeaser',
      title: 'Google Formi kutse (abi-küsitlus)',
      type: 'helpFormTeaserBlock',
      hidden: true,
      description:
        'Kuvatakse avalehel kohe pärast Quick Quizi. Suunab Google Formsile. Tühista «Kuva blokki», et peita.',
      options: { collapsible: true, collapsed: true },
      initialValue: {
        enabled: true,
        eyebrow: 'Personaalne tagasiside',
        title: 'Vasta mõnele küsimusele — vaata, millega saan sind aidata',
        description:
          'Vastuste eest võid lisada oma e-posti — Andres saab ette valmistada asjakohasemaid soovitusi.',
        buttonText: 'Ava küsitlus',
        formUrl: 'https://forms.gle/RFhukyrDW4daufys9',
      },
    }),

    defineField({
      name: 'nineDaysMini',
      title: '9 päeva programm (avaleht)',
      type: 'nineDaysMini',
      hidden: true,
    }),

    defineField({
      name: 'seo',
      title: 'SEO & Meta infoleht',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta title (SEO pealkiri)', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta description (SEO kirjeldus)', type: 'text', rows: 3 }),
        defineField({ name: 'metaKeywords', title: 'Meta keywords (komadega eraldatud)', type: 'string' }),
        defineField({ name: 'ogImage', title: 'Open Graph image', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'headline',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `Main: ${subtitle}`,
      }
    },
  },
})
