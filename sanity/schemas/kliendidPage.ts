import { definePageSectionsField } from './pageBuilder/defineSectionsField'
import { pageBuilderPresets } from './pageBuilder/pagePresets'

export default {
  name: 'kliendidPage',
  title: 'Kliendid leht',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    definePageSectionsField({
      allowedTypes: [...pageBuilderPresets.kliendidPage],
      description: 'Kliendid lehe sisublokid (Hero jm).',
    }),
  ],
}
