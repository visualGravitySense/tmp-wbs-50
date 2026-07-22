import { createClient } from '@sanity/client'
import fs from 'fs'

const client = createClient({
  projectId: 'buc8lir0',
  dataset: 'andres-prod',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skaQuZfNUTTF16qjigWsq7OWgFjEmHfhrfz0LU0sauwPYez0aKPtdBhD0s36Nlx1ubd3XpckSGVCfG6CwSN494sggAFopyTwFcg9liVx2RGrvhxc2wh5ZbqBW2ZplecvQzZEPeEWB6ccDQic0g6wi7n2TFybgnhYNjFLqIkkGq9ma30qCr57'
})

async function migrate() {
  const doc = await client.getDocument('opstarProfit')
  
  const newSections = []
  
  if (doc.kolmSammast) {
    newSections.push({
      _type: 'opstarKolmSammastBlock',
      _key: 'pb-kolm-' + Date.now(),
      kolmSammast: doc.kolmSammast
    })
  }
  
  if (doc.cases) {
    newSections.push({
      _type: 'opstarCasesBlock',
      _key: 'pb-cases-' + Date.now(),
      cases: doc.cases
    })
  }

  newSections.push({
    _type: 'homeTestimonialsBlock',
    _key: 'pb-test-' + Date.now(),
    testimonials: {
      title: 'Tagasiside',
      subtitle: 'Mida osalejad ütlevad',
      buttonText: 'Vaata kõiki',
      buttonLink: '/testimonials'
    }
  })

  if (doc.kkk) {
    newSections.push({
      _type: 'opstarKkkBlock',
      _key: 'pb-kkk-' + Date.now(),
      kkk: doc.kkk
    })
  }

  newSections.push({
    _type: 'homePricingBlock',
    _key: 'pb-pricing-' + Date.now()
  })

  console.log(`Appending ${newSections.length} sections...`)
  
  await client.patch('opstarProfit')
    .setIfMissing({ sections: [] })
    .insert('after', 'sections[-1]', newSections)
    .commit()
    
  console.log('Done.')
}

migrate().catch(console.error)
