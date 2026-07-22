import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const secretFromQuery = request.nextUrl.searchParams.get('secret')
    const secretFromBody = body?.secret
    const secretFromHeader = request.headers.get('authorization')?.replace('Bearer ', '')
    const secret = secretFromQuery || secretFromBody || secretFromHeader

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    const { _type, slug, paths } = body
    const tagsToRevalidate: string[] = ['mainPage', 'aboutPage', 'koolitusPage', 'opstarPage', 'kontaktPage', 'global', 'layout']
    const pathsToRevalidate: string[] = paths || ['/', '/andres-kase', '/blog', '/koolitus', '/opstar-profit', '/kontakt']

    if (slug?.current) {
      pathsToRevalidate.push(slug.current.startsWith('/') ? slug.current : `/${slug.current}`)
    } else if (typeof slug === 'string') {
      pathsToRevalidate.push(slug.startsWith('/') ? slug : `/${slug}`)
    }

    const uniquePaths = Array.from(new Set(pathsToRevalidate))

    for (const path of uniquePaths) {
      revalidatePath(path)
    }
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, { expire: 0 })
    }

    return NextResponse.json({ 
      revalidated: true, 
      paths: uniquePaths, 
      tags: tagsToRevalidate,
      type: _type || 'structural_or_unknown'
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
