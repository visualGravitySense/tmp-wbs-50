'use client'

import React, { useState } from 'react'
import { pushDataLayerEvent } from '@/lib/analytics'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !validateEmail(email)) {
      setStatus('error')
      setMessage('Palun sisesta korrektne e-posti aadress.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/smaily', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        pushDataLayerEvent({
          event: 'form_submission_success',
          form_id: 'newsletter_subscribe',
          course_title: 'General',
        })
        setStatus('success')
        setMessage('Liitumine õnnestus! Täname teid liitumast.')
        setEmail('')
        setName('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Midagi läks valesti. Palun proovi uuesti.')
      }
    } catch (err) {
      console.error('Subscription submission failed:', err)
      setStatus('error')
      setMessage('Ühenduse viga. Palun kontrolli oma internetiühendust.')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 transition-all duration-300">
      <h3 className="text-2xl font-bold mb-2 tracking-tight text-white">Liitu uudiskirjaga</h3>
      <p className="text-sm text-slate-400 mb-6">
        Saa parimad pakkumised ja artiklid otse oma e-posti aadressile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="subscribe-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Eesnimi <span className="text-slate-500 font-normal">(Valikuline)</span>
          </label>
          <input
            id="subscribe-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === 'loading'}
            placeholder="Sinu eesnimi"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant transition-all disabled:opacity-50 text-sm"
          />
        </div>

        <div>
          <label htmlFor="subscribe-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            E-post <span className="text-rose-500">*</span>
          </label>
          <input
            id="subscribe-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            required
            placeholder="nimi@firma.ee"
            className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-brand-vibrant focus:ring-1 focus:ring-brand-vibrant transition-all disabled:opacity-50 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Liitumine...</span>
            </>
          ) : (
            'Liitu listiga'
          )}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 p-3 rounded-lg bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-sm flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-4 p-3 rounded-lg bg-rose-950/50 border border-rose-800/40 text-rose-400 text-sm flex items-center gap-2">
          <svg className="h-5 w-5 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{message}</span>
        </div>
      )}
    </div>
  )
}
export default SubscribeForm
