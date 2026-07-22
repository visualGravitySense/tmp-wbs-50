import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paths, secret } = body

    // Verify the secret to ensure the request is from Sanity
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate specific paths or all content
    const pathsToRevalidate = paths || ['/andres-kase', '/blog', '/']
    
    pathsToRevalidate.forEach((path: string) => {
      revalidatePath(path)
      console.log(`Revalidated path: ${path}`)
    })

    return NextResponse.json({ revalidated: true, paths: pathsToRevalidate })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    )
  }
}
