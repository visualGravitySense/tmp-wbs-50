/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'
import {
  opstarArvamusedField,
  opstarCasesField,
  opstarComparisonField,
  opstarComparisonPartnerLogosField,
  opstarContentSectionsField,
  opstarCtaField,
  opstarEightComponentsField,
  opstarFrameworkField,
  opstarHeroField,
  opstarKkkField,
  opstarKolmSammastField,
  opstarLeanVsOpstarField,
  opstarMeasuredResultsField,
  opstarOrbitBlockRefField,
  withOpstarLegacyHidden,
} from './objects/opstarCoreFields'

export default {
  name: 'opstarProfit',
  title: 'Product Name',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.opstarProfit],
      description:
        'Ühised marketingu blokid. Tühi = legacy Product väljad allpool.',
    }),
    {
      name: 'featuredReviews',
      title: 'Product lehe tagasiside (Review dokumendid)',
      description:
        'Vali Review dokumendid — kuvatakse Product lehel (esimesed 3; ülejäänu /testimonials). Järjekord = kuvamine. Tühi = uusimad Review automaatselt.',
      type: 'array',
      hidden: true,
      of: [{ type: 'reference', to: [{ type: 'review' }] }],
    },
    withOpstarLegacyHidden(opstarOrbitBlockRefField),
    withOpstarLegacyHidden(opstarComparisonPartnerLogosField),
    withOpstarLegacyHidden(opstarHeroField),
    withOpstarLegacyHidden(opstarContentSectionsField),
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
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
          title: 'OG Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    withOpstarLegacyHidden(opstarComparisonField),
    withOpstarLegacyHidden(opstarKolmSammastField),
    withOpstarLegacyHidden(opstarFrameworkField),
    withOpstarLegacyHidden(opstarEightComponentsField),
    withOpstarLegacyHidden(opstarLeanVsOpstarField),
    withOpstarLegacyHidden(opstarMeasuredResultsField),
    withOpstarLegacyHidden(opstarCasesField),
    withOpstarLegacyHidden(opstarArvamusedField),
    withOpstarLegacyHidden(opstarKkkField),
    withOpstarLegacyHidden(opstarCtaField),
  ],
  preview: {
    select: {
      title: 'title',
      mainTitle: 'hero.mainTitle',
    },
    prepare(selection: any) {
      const { title, mainTitle } = selection
      return {
        title: title,
        subtitle: mainTitle,
      }
    },
  },
}
