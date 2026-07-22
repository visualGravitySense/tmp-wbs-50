import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'partnerLogo',
  title: 'Partner Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          { title: 'Logo Image', value: 'logo' },
          { title: 'Text Only', value: 'text' }
        ],
        layout: 'radio'
      },
      initialValue: 'logo',
      description: 'Choose whether to display as logo image or styled text'
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
        },
      ],
      hidden: ({ parent }) => parent?.displayType === 'text', // Скрываем, если выбран текст
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { displayType?: string };
        // Если выбран режим логотипа, то логотип обязателен
        if (parent?.displayType === 'logo' && !value) {
          return 'Logo image is required when display type is set to logo';
        }
        // Если выбран режим текста, то логотип не нужен
        if (parent?.displayType === 'text') {
          return true;
        }
        // По умолчанию (если displayType не установлен), требуем логотип
        if (!parent?.displayType && !value) {
          return 'Logo image is required';
        }
        return true;
      }),
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Optional link to company website',
    }),
    defineField({
      name: 'industry',
      title: 'Tegevusala (Industry)',
      type: 'string',
      description: 'Valdkond (nt Tootmine, Logistika). Kasutatakse Kliendid lehe filtris.',
    }),
    defineField({
      name: 'country',
      title: 'Riik (Country)',
      type: 'string',
      initialValue: 'Eesti',
      description: 'Riik, kus klient peamiselt tegutseb (vaikimisi Eesti).',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      url: 'url',
    },
    prepare(selection) {
      const { title, media, url } = selection
      return {
        title,
        media,
        subtitle: url ? `🔗 ${url}` : '',
      }
    },
  },
})
