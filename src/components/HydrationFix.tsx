'use client'

import { useEffect } from 'react'

export default function HydrationFix() {
  useEffect(() => {
    // Remove attributes added by browser extensions that cause hydration mismatches
    if (typeof window !== 'undefined' && document.body) {
      // Remove the specific attribute causing the issue
      document.body.removeAttribute('data-atm-ext-installed')
      
      // Remove any other potential extension attributes that might cause issues
      const extensionAttributes = [
        'data-atm-ext-installed',
        'data-adblock',
        'data-adblocker',
        'data-ublock',
        'data-adguard',
      ]
      
      extensionAttributes.forEach(attr => {
        if (document.body.hasAttribute(attr)) {
          document.body.removeAttribute(attr)
        }
      })

      // Also check and remove any attributes that start with 'data-' and contain 'ext' or 'adblock'
      const bodyAttributes = Array.from(document.body.attributes)
      bodyAttributes.forEach(attr => {
        if (attr.name.startsWith('data-') && 
            (attr.name.includes('ext') || attr.name.includes('adblock') || attr.name.includes('adguard'))) {
          document.body.removeAttribute(attr.name)
        }
      })
    }
  }, [])

  return null
}
