'use client'

import { useState } from 'react'
import RegistrationPackageSummary from '@/components/RegistrationPackageSummary'
import CourseRegistrationForm from '@/components/CourseRegistrationForm'

export interface UpsellOption {
  id: string
  label: string
  price: number
}

interface CourseRegistrationClientProps {
  packageName: string
  basePrice?: string
  description?: string
  features?: string[]
  isCorporate?: boolean
  cohortMissingInCms?: boolean
  defaultCohortId?: string
  defaultNote?: string
  upsells?: UpsellOption[]
  isMultiPersonPackage?: boolean
}

export default function CourseRegistrationClient({
  packageName,
  basePrice,
  description,
  features,
  isCorporate,
  cohortMissingInCms,
  defaultCohortId,
  defaultNote,
  upsells = [],
  isMultiPersonPackage,
}: CourseRegistrationClientProps) {
  const [selectedUpsellIds, setSelectedUpsellIds] = useState<Set<string>>(new Set())

  function toggleUpsell(id: string) {
    const newSet = new Set(selectedUpsellIds)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedUpsellIds(newSet)
  }

  // Calculate total price
  const basePriceNum = basePrice ? parseInt(basePrice.replace(/\D/g, ''), 10) : 0
  let totalPrice = basePriceNum
  const selectedUpsellsDetails = []

  for (const id of Array.from(selectedUpsellIds)) {
    const upsell = upsells.find((u) => u.id === id)
    if (upsell) {
      totalPrice += upsell.price
      selectedUpsellsDetails.push(`${upsell.label} (+${upsell.price}€)`)
    }
  }

  const displayPrice = basePrice ? totalPrice.toString() : undefined

  // Append upsells to the default note
  let finalNote = defaultNote || ''
  if (selectedUpsellsDetails.length > 0) {
    const upsellText = `\n\nLisatud teenused:\n` + selectedUpsellsDetails.map(u => `- ${u}`).join('\n')
    if (finalNote) {
      finalNote += upsellText
    } else {
      finalNote = `Soovin registreeruda paketile: ${packageName}${upsellText}`
    }
  }

  return (
    <>
      <RegistrationPackageSummary
        packageName={packageName}
        price={displayPrice}
        description={description}
        features={features}
        isCorporate={isCorporate}
      />

      {upsells.length > 0 && (
        <div className="mb-8 rounded-2xl border border-sky-200 bg-white/60 p-5 shadow-sm dark:border-sky-900/50 dark:bg-slate-900/40">
          <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-slate-200">
            Täienda oma paketti (valikuline):
          </h3>
          <div className="space-y-3">
            {upsells.map((upsell) => (
              <label
                key={upsell.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                  selectedUpsellIds.has(upsell.id)
                    ? 'border-blue-500 bg-blue-50/50 dark:border-blue-500/50 dark:bg-blue-900/20'
                    : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50'
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedUpsellIds.has(upsell.id)}
                  onChange={() => toggleUpsell(upsell.id)}
                />
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {upsell.label}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    +{upsell.price} €
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {isMultiPersonPackage && (
        <div className="mb-6 rounded-2xl border border-sky-300/60 bg-sky-50/80 px-4 py-3 text-center text-xs font-medium text-sky-950 shadow-sm backdrop-blur-sm dark:border-sky-500/35 dark:bg-sky-950/40 dark:text-sky-100">
          Mitmanda osaleja registreerimisel palun lisa teiste osalejate nimed ja e-posti aadressid allolevasse <strong>Märkuse</strong> lahtrisse.
        </div>
      )}

      <CourseRegistrationForm
        key={finalNote}
        visualPreset="glass"
        defaultCohortId={defaultCohortId}
        defaultNote={finalNote}
      />
    </>
  )
}
