import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePhotoMarqueeBlock',
  title: 'Foto marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'photoMarquee',
      title: 'Photo Marquee Section',
      type: 'photoMarqueeSectionContent',
    }),
  ],
  preview: {
    select: {
      title: 'photoMarquee.title',
      photos: 'photoMarquee.photos',
    },
    prepare({ title, photos }) {
      const count = Array.isArray(photos) ? photos.length : 0
      return {
        title: title || 'Foto marquee',
        subtitle: count > 0 ? `${count} fotot` : 'Galerii riba',
      }
    },
  },
})
