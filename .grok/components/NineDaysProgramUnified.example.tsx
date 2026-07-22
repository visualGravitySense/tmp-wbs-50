'use client'

/**
 * Grok UI component browser preview — unified 9-day program timeline layout.
 * Renders the full interactive component with all 9 day states (switch via day tabs).
 */
import ProgramDaysTabs from '@/components/ProgramDaysTabs'

export const meta = {
  title: '9-Day Program — Unified Left Panel',
  description:
    'Homepage timeline with unified left/right cards and section CTAs below. Click days 1–9 to preview each state.',
}

export default function NineDaysProgramUnifiedExample() {
  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] py-8">
      <ProgramDaysTabs
        eyebrow="9-päevane programm"
        title="Praktiline teekond tootmisjuhtimises"
        scriptTitle="Vali päev ja vaata, mida iga samm toob"
        isMinimal={false}
      />
    </div>
  )
}