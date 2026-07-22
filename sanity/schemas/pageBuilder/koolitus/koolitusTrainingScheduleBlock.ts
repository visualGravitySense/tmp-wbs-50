import { defineType, defineField, defineArrayMember } from 'sanity'
import { Calendar } from 'lucide-react'

export default defineType({
  name: 'koolitusTrainingScheduleBlock',
  title: 'Koolituse Päevakava ja Moodulid',
  type: 'object',
  icon: Calendar,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Näita seda plokki',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'headerTitle',
      title: 'Pealkiri',
      type: 'string',
      description: 'nt. "2026-2027. aasta koolitusprogramm"',
    }),
    defineField({
      name: 'headerSubtitle',
      title: 'Alampelakiri',
      type: 'string',
      description: 'nt. "Toimub oktoober 2026 kuni märts 2027"',
    }),
    defineField({
      name: 'image',
      title: 'Pilt',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description1',
      title: 'Kirjeldus (esimene lõik)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description2',
      title: 'Kirjeldus (teine lõik)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'tag1',
      title: 'Silt 1 (kestus)',
      type: 'string',
      description: 'nt. "140 kalendripäeva"',
    }),
    defineField({
      name: 'tag2',
      title: 'Silt 2 (kohtumised)',
      type: 'string',
      description: 'nt. "9 kohtumist"',
    }),
    defineField({
      name: 'dailyScheduleTitle',
      title: 'Päevakava pealkiri',
      type: 'string',
      description: 'nt. "Koolituse päevakava"',
    }),
    defineField({
      name: 'dailyScheduleItems',
      title: 'Päevakava punktid',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'time', title: 'Aeg', type: 'string' }),
            defineField({ name: 'title', title: 'Pealkiri', type: 'string' }),
            defineField({ name: 'desc', title: 'Kirjeldus', type: 'string' }),
          ],
          preview: {
            select: { title: 'time', subtitle: 'title' },
          },
        }),
      ],
    }),
    defineField({
      name: 'foodCardText',
      title: 'Toidu info tekst',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'infoBannerSub',
      title: 'Info bänneri alamtekst',
      type: 'string',
      description: 'nt. "Kohtume Sinuga 9 korral – kokku"',
    }),
    defineField({
      name: 'infoBannerTitle',
      title: 'Info bänneri pealkiri',
      type: 'string',
      description: 'nt. "64 akadeemilist kontakttundi"',
    }),
    defineField({
      name: 'modules',
      title: 'Moodulid',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'num', title: 'Number', type: 'string' }),
            defineField({
              name: 'type',
              title: 'Tüüp',
              type: 'string',
              options: {
                list: [
                  { title: 'Tavaline (Normal)', value: 'normal' },
                  { title: 'Eriline (Special / Külastus)', value: 'special' },
                ],
              },
              initialValue: 'normal',
            }),
            defineField({ name: 'week', title: 'Nädal', type: 'string' }),
            defineField({ name: 'date', title: 'Kuupäev', type: 'string' }),
            defineField({ name: 'title', title: 'Pealkiri (ainult special tüübi puhul)', type: 'string' }),
            defineField({ name: 'desc', title: 'Kirjeldus (ainult special tüübi puhul)', type: 'string' }),
            defineField({ name: 'details', title: 'Täpsem sisu (Accordion)', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'num', subtitle: 'date', type: 'type', specialTitle: 'title' },
            prepare(selection) {
              const { title, subtitle, type, specialTitle } = selection
              return {
                title: `Moodul ${title}`,
                subtitle: type === 'special' ? specialTitle : subtitle,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerNote',
      title: 'Märkus jaluses',
      type: 'string',
      description: 'nt. "* Muudatustest annan teada."',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Koolituse Päevakava',
        subtitle: 'Koolituse moodulid ja kellaajad',
      }
    },
  },
})
