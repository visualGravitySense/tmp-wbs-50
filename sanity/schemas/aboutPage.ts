/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'
import {
  aboutAboutSectionField,
  aboutContactSectionField,
  aboutCtaSectionField,
  aboutExperienceSectionField,
  aboutExpertiseField,
  aboutGuaranteeSectionField,
  aboutHeroField,
  aboutKeyAchievementsField,
  aboutKkkDocumentField,
  aboutKkkField,
  aboutQuoteSectionField,
  aboutServicesField,
  aboutTestimonialsField,
  aboutTestimonialsSectionField,
  aboutWorldManufacturingVisitsField,
  withAboutLegacyHidden,
} from './objects/aboutCoreFields'

export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.aboutPage],
      description:
        'Täielik page builder teek (sama mis Esileht) — kõik blokid on lubatud, sh copy-paste teistelt lehtedelt. Tühi = legacy väljad allpool.',
    }),
    {
      name: 'featuredReviews',
      title: 'Lehe tagasiside (Review dokumendid)',
      description:
        'Vali Review dokumendid — kuvatakse /andres-kase lehel (esimesed 3; ülejäänu /testimonials). Järjekord = kuvamine. Tühi = uusimad Review automaatselt.',
      type: 'array',
      hidden: true,
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    },
    withAboutLegacyHidden(aboutHeroField),
    withAboutLegacyHidden(aboutQuoteSectionField),
    withAboutLegacyHidden(aboutAboutSectionField),
    withAboutLegacyHidden(aboutExperienceSectionField),
    withAboutLegacyHidden(aboutGuaranteeSectionField),
    withAboutLegacyHidden(aboutCtaSectionField),
    withAboutLegacyHidden(aboutKeyAchievementsField),
    withAboutLegacyHidden(aboutWorldManufacturingVisitsField),
    withAboutLegacyHidden(aboutExpertiseField),
    withAboutLegacyHidden(aboutTestimonialsSectionField),
    withAboutLegacyHidden(aboutTestimonialsField),
    withAboutLegacyHidden(aboutServicesField),
    withAboutLegacyHidden(aboutKkkDocumentField),
    withAboutLegacyHidden(aboutKkkField),
    withAboutLegacyHidden(aboutContactSectionField),
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'metaKeywords',
          title: 'Meta keywords (SEO võtmesõnad - komadega eraldatud)',
          type: 'string',
        },
        {
          name: 'ogImage',
          title: 'Open Graph image',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      headline: 'hero.headline',
    },
    prepare(selection: any) {
      const { title, headline } = selection
      return {
        title: title,
        subtitle: headline,
      }
    },
  },
}