import { NextResponse } from 'next/server'
import { subscribeToSmaily } from '@/lib/smaily/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Public Smaily subscribe endpoint used by newsletter / blog forms.
 *
 * Body: { email: string, name?: string, source?: string, tag?: string }
 * - `source` maps to Smaily contact attribute `source` (e.g. blog, newsletter)
 * - `tag` is stored as attribute `tag` when provided (e.g. uudiskiri)
 */
export async function POST(req: Request) {
  let body: {
    email?: unknown
    name?: unknown
    source?: unknown
    tag?: unknown
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Vigane päring.' },
      { status: 400 },
    )
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const source =
    typeof body.source === 'string' && body.source.trim()
      ? body.source.trim().slice(0, 80)
      : 'newsletter'
  const tag =
    typeof body.tag === 'string' && body.tag.trim()
      ? body.tag.trim().slice(0, 80)
      : undefined

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Palun sisesta kehtiv e-posti aadress.' },
      { status: 400 },
    )
  }

  try {
    await subscribeToSmaily({
      email: email.toLowerCase(),
      ...(name ? { name } : {}),
      source,
      ...(tag ? { tag } : {}),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[api/smaily]', message)

    if (message.includes('not configured') || message.includes('env variables')) {
      return NextResponse.json(
        { success: false, error: 'Smaily integratsioon pole seadistatud.' },
        { status: 503 },
      )
    }

    return NextResponse.json(
      { success: false, error: 'Tellimine ebaõnnestus. Palun proovi uuesti.' },
      { status: 502 },
    )
  }
}
