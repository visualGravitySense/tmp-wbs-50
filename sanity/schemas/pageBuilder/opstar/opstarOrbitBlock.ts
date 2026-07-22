import { defineField, defineType, type FieldDefinition } from 'sanity'

import { getOpstarPageField } from './getOpstarPageField'

export default defineType({
  name: 'opstarOrbitBlock',
  title: 'Orbit / tutvustus',
  type: 'object',
  fields: [
    defineField(getOpstarPageField('orbitBlockRef') as unknown as FieldDefinition),
  ],
  preview: {
    prepare() {
      return {
        title: 'Orbit intro block',
        subtitle: 'Product · kolm veergu + illustratsioon',
      }
    },
  },
})
