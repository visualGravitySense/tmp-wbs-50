import { defineField, defineType } from 'sanity'

import {
  DEFAULT_NINE_DAYS_MINI_FAQ,
  DEFAULT_NINE_DAYS_MINI_UI,
  NINE_DAYS_MINI_STUDIO_DEFAULTS,
} from './nineDaysMiniDefaults'

export const nineDaysMiniDay = defineType({
  name: 'nineDaysMiniDay',
  title: 'Päeva sisu',
  type: 'object',
  fields: [
    defineField({
      name: 'dayNumber',
      title: 'Päeva number',
      type: 'number',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Pealkiri (suur tekst kaardil)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Alapealkiri / kirjeldus',
      type: 'string',
    }),
    defineField({
      name: 'habit',
      title: 'Harjumus (tsitaat hallis kastis)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'typeLabel',
      title: 'Päeva silt (nt Koolituspäev / Ettevõttekülastus)',
      type: 'string',
    }),
    defineField({
      name: 'companyPainTitle',
      title: 'Valu ettevõttes (pealkiri)',
      type: 'string',
    }),
    defineField({
      name: 'companyPain',
      title: 'Valu ettevõttes (sümptomid)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'shortSolution',
      title: 'Mida sel päeval teeme (lahendus)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'participantWins',
      title: 'Osaleja saab (võidab)',
      type: 'string',
    }),
    defineField({
      name: 'companyWins',
      title: 'Juht / Org võidab',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', dayNumber: 'dayNumber', subtitle: 'subtitle' },
    prepare({ title, dayNumber, subtitle }) {
      const n = dayNumber ? `Päev ${dayNumber}` : 'Päev'
      return {
        title: `${n}: ${title || '(lisa pealkiri)'}`,
        subtitle: subtitle || undefined,
      }
    },
  },
})

function dayField(dayIndex: number) {
  const n = dayIndex + 1
  const defaults = NINE_DAYS_MINI_STUDIO_DEFAULTS[dayIndex]
  return defineField({
    name: `day${n}`,
    title: `Päev ${n}`,
    type: 'nineDaysMiniDay',
    options: { collapsible: true, collapsed: n !== 1 },
    initialValue: { ...defaults },
  })
}

export const nineDaysMiniProgramDays = defineType({
  name: 'nineDaysMiniProgramDays',
  title: '9 päeva sisu',
  type: 'object',
  description: 'Ava iga päev eraldi — Päev 1, Päev 2, … Päev 9.',
  fields: Array.from({ length: 9 }, (_, i) => dayField(i)),
})

export const nineDaysMini = defineType({
  name: 'nineDaysMini',
  title: '9 päeva programm (avalehe mini-plaan)',
  type: 'object',
  description:
    'Avalehe plokk: vasakul tekst ja nupud, paremal 9 päeva interaktiivne plaan. Päevade sisu: sektsioon „9 päeva sisu”.',
  fieldsets: [
    { name: 'left', title: 'Vasak veerg — tekst ja nupud', options: { collapsible: true } },
    { name: 'plan', title: 'Parem veerg — üldised sildid', options: { collapsible: true } },
    { name: 'cta', title: 'Sinine CTA nupp päeva kaardil', options: { collapsible: true } },
    { name: 'days', title: '9 päeva sisu (iga päev eraldi)', options: { collapsible: false } },
    { name: 'lead', title: 'E-posti vorm (valge nupp)', options: { collapsible: true, collapsed: true } },
    {
      name: 'faq',
      title: 'Tagasiside plokk (klõpsatav, vasakul all)',
      options: { collapsible: true },
    },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Väike ülapäis (sinine)',
      type: 'string',
      fieldset: 'left',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.eyebrow,
    }),
    defineField({
      name: 'mainHeading',
      title: 'Pealkiri (soovitatav — lihttekst)',
      type: 'string',
      fieldset: 'left',
      description:
        'Kui täidetud, kuvatakse see pealkiri. Kui tühi, kasutatakse „Pealkiri (vanem vorm)” plokita teksti.',
    }),
    defineField({
      name: 'mainTitle',
      title: 'Pealkiri (vanem vorm — plokita tekst)',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'left',
      description: 'Kasuta ainult siis, kui „Pealkiri (lihttekst)” on tühi.',
    }),
    defineField({
      name: 'italicTitle',
      title: 'Pealkiri — kaldkiri osa (sinine)',
      type: 'string',
      fieldset: 'left',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.italicTitle,
    }),
    defineField({
      name: 'subtitle',
      title: 'Sissejuhatav tekst',
      type: 'text',
      fieldset: 'left',
      rows: 4,
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.subtitle,
    }),
    defineField({
      name: 'greenButtonText',
      title: 'Roheline nupp — tekst',
      type: 'string',
      fieldset: 'left',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.greenButtonText,
    }),
    defineField({
      name: 'greenButtonLink',
      title: 'Roheline nupp — link',
      type: 'string',
      fieldset: 'left',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.greenButtonLink,
    }),
    defineField({
      name: 'whiteButtonText',
      title: 'Valge nupp — tekst',
      type: 'string',
      fieldset: 'left',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.whiteButtonText,
      description: 'Avab alloleva e-posti vormi.',
    }),
    defineField({
      name: 'whiteButtonLink',
      title: 'Valge nupp — link pärast vormi',
      type: 'string',
      fieldset: 'left',
      description: 'Valikuline. Kuvatakse pärast edukat saatmist.',
    }),
    defineField({
      name: 'overviewLabel',
      title: 'Parema ploki ülapäis',
      type: 'string',
      fieldset: 'plan',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.overviewLabel,
    }),
    defineField({
      name: 'dayPickerLabel',
      title: 'Varuülapäis (kui overviewLabel tühi)',
      type: 'string',
      fieldset: 'plan',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.dayPickerLabel,
    }),
    defineField({
      name: 'progressLabel',
      title: 'Progressi tekst',
      type: 'string',
      fieldset: 'plan',
      description: 'Kasuta {viewed} ja {total}',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.progressLabel,
    }),
    defineField({
      name: 'dayBadgePrefix',
      title: 'Päeva silt kaardil',
      type: 'string',
      fieldset: 'plan',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.dayBadgePrefix,
    }),
    defineField({
      name: 'habitLabel',
      title: 'Harjumuse silt (kõik päevad)',
      type: 'string',
      fieldset: 'plan',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.habitLabel,
    }),
    defineField({
      name: 'planCtaPrefix',
      title: 'Tekst enne linki (kõik päevad)',
      type: 'string',
      fieldset: 'cta',
      description: 'Näide: „Päev {day} kõlab huvitavalt?” — kasuta {day}',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.planCtaPrefix,
    }),
    defineField({
      name: 'planCtaLinkText',
      title: 'Sinine link tekstis',
      type: 'string',
      fieldset: 'cta',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.planCtaLinkText,
    }),
    defineField({
      name: 'planCtaLinkUrl',
      title: 'Sinise lingi URL',
      type: 'string',
      fieldset: 'cta',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.planCtaLinkUrl,
    }),
    defineField({
      name: 'planButtonText',
      title: 'Sinise nupu tekst (peamine CTA)',
      type: 'string',
      fieldset: 'cta',
      description: 'Suur sinine nupp päeva kaardi all — „Registreeru programmi →”',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.planButtonText,
    }),
    defineField({
      name: 'planButtonLink',
      title: 'Sinise nupu link',
      type: 'string',
      fieldset: 'cta',
      initialValue: DEFAULT_NINE_DAYS_MINI_UI.planButtonLink,
    }),
    defineField({
      name: 'oppepaevad',
      title: 'Õppepäevad (Shared Data)',
      description: 'Vali siin Õppepäeva dokumendid (1-9), et andmed sünkroniseeruks avalehe ja koolituslehe vahel.',
      type: 'array',
      fieldset: 'days',
      of: [{ type: 'reference', to: [{ type: 'oppepaev' }] }],
    }),
    defineField({
      name: 'programDays',
      title: '9 päeva sisu (Vanem vorm)',
      type: 'nineDaysMiniProgramDays',
      fieldset: 'days',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'days',
      title: 'Vanem vorm (massiiv) — ära kasuta',
      type: 'array',
      of: [{ type: 'nineDaysMiniDay' }],
      hidden: true,
      readOnly: true,
      description: 'Ainult vanade andmete lugemiseks.',
    }),
    defineField({
      name: 'leadForm',
      title: 'E-posti vorm',
      type: 'object',
      fieldset: 'lead',
      fields: [
        defineField({
          name: 'introTitle',
          title: 'Sissejuhatav pealkiri',
          type: 'string',
          initialValue: 'Saadame programmi sulle e-kirjaga märgitud aadressile.',
        }),
        defineField({
          name: 'introText',
          title: 'GDPR / selgitus',
          type: 'text',
          rows: 3,
          initialValue:
            'Vormi saatmisega kinnitad, et nõustud oma kontaktandmete (e-post) meiega jagamisega, et saaksime sulle materjali saata.',
        }),
        defineField({
          name: 'emailLabel',
          title: 'E-posti välja silt',
          type: 'string',
          initialValue: 'E-post',
        }),
        defineField({
          name: 'emailPlaceholder',
          title: 'E-posti placeholder',
          type: 'string',
          initialValue: 'nimi@ettevote.ee',
        }),
        defineField({
          name: 'submitText',
          title: 'Saada nupu tekst',
          type: 'string',
          initialValue: 'Saada mulle programm',
        }),
        defineField({
          name: 'submitPendingText',
          title: 'Saatmisel',
          type: 'string',
          initialValue: 'Saadan…',
        }),
        defineField({
          name: 'closeText',
          title: 'Sulge',
          type: 'string',
          initialValue: 'Sulge',
        }),
        defineField({
          name: 'successTitle',
          title: 'Õnnestus — pealkiri',
          type: 'string',
          initialValue: 'Aitäh!',
        }),
        defineField({
          name: 'successText',
          title: 'Õnnestus — tekst',
          type: 'text',
          rows: 2,
          initialValue: 'Kontrolli varsti oma postkasti — programmi materjalid on teel.',
        }),
        defineField({
          name: 'readMoreLinkText',
          title: 'Link pärast saatmist',
          type: 'string',
          initialValue: 'Soovid kohe lugeda? Ava täispikk kirjeldus →',
        }),
      ],
    }),
    defineField({
      name: 'faqSection',
      title: 'Tagasiside plokk',
      type: 'object',
      fieldset: 'faq',
      initialValue: {
        question: DEFAULT_NINE_DAYS_MINI_FAQ.question,
        testimonials: DEFAULT_NINE_DAYS_MINI_FAQ.testimonials?.map((item) => ({ ...item })),
      },
      description:
        'Vasakul all olev valge kaart: pealkiri on nähtav enne avamist; tsitaadid ilmuvad pärast klõpsu.',
      fields: [
        defineField({
          name: 'question',
          title: 'Pealkiri (nähtav enne avamist)',
          type: 'string',
          description: 'Näiteks: „Kuidas 147 tootmisjuhti 9-päevase puudumise lahendasid?”',
          initialValue: DEFAULT_NINE_DAYS_MINI_FAQ.question,
        }),
        defineField({
          name: 'testimonials',
          title: 'Tsitaadid (nähtavad pärast avamist)',
          type: 'array',
          description: 'Lisa iga rida eraldi — tsitaat + autor.',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'quote', title: 'Tsitaat', type: 'text', rows: 2 }),
                defineField({ name: 'author', title: 'Autor', type: 'string' }),
              ],
              preview: { select: { title: 'author', subtitle: 'quote' } },
            },
          ],
          initialValue: DEFAULT_NINE_DAYS_MINI_FAQ.testimonials,
        }),
      ],
    }),
  ],
})
