import { defineField, type FieldDefinition } from 'sanity'

/** Optional per-block controls for the fixed right-hand scroll-spy menu. */
export const scrollSpyNavFields: FieldDefinition[] = [
  defineField({
    name: 'isVisible',
    title: 'Kuva lehel',
    type: 'boolean',
    description: 'Tühista linnuke, et sektsioon ajutiselt peita ilma kustutamata',
    initialValue: true,
  }),
  defineField({
    name: 'hideFromScrollNav',
    title: 'Peida parempoolsest menüüst',
    type: 'boolean',
    initialValue: false,
    description:
      'Blokk jääb lehele nähtavaks, kuid paremal punkt-menüüs seda ei kuvata.',
  }),
  defineField({
    name: 'navLabel',
    title: 'Nimi parempoolses menüüs',
    type: 'string',
    description:
      'Kui tühi, kasutatakse ploki pealkirja või vaike-nime. Ei muuda lehe pealkirja.',
  }),
]
