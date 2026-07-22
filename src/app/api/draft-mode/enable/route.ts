import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants'
import { cookies, draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

import { client } from '@/sanity/lib/client'

export const dynamic = 'force-dynamic'

function readSanityToken(): string {
  return (
    process.env.SANITY_API_READ_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_AUTH_TOKEN ||
    ''
  ).trim()
}

export async function GET(request: Request) {
  try {
    const token = readSanityToken()
    if (!token) {
      return new Response(
        'Missing SANITY_API_READ_TOKEN (or SANITY_API_TOKEN) for preview.',
        { status: 500 },
      )
    }

    const { isValid, redirectTo = '/', studioPreviewPerspective } =
      await validatePreviewUrl(client.withConfig({ token }), request.url)

    if (!isValid) {
      return new Response('Invalid secret', { status: 401 })
    }

    const draft = await draftMode()
    if (!draft.isEnabled) {
      draft.enable()
    }

    const isSecure = process.env.NODE_ENV === 'production'
    const cookieStore = await cookies()

    if (studioPreviewPerspective) {
      cookieStore.set({
        name: perspectiveCookieName,
        value: studioPreviewPerspective,
        httpOnly: true,
        path: '/',
        secure: isSecure,
        sameSite: isSecure ? 'none' : 'lax',
      })
    }

    const response = NextResponse.redirect(new URL(redirectTo, request.url), 307)
    response.headers.set(
      'Cache-Control',
      'private, no-cache, no-store, must-revalidate',
    )
    return response
  } catch (error) {
    console.error('[draft-mode/enable]', error)
    return new Response('Draft mode failed to enable', { status: 500 })
  }
}
