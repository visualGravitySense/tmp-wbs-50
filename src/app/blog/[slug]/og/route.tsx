import { ImageResponse } from 'next/og'
import client from '@/lib/sanity/client'
import { POST_BY_SLUG_QUERY } from '@/lib/sanity/queries/blog'
import { urlFor } from '@/lib/sanity/client'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })

  if (!post) {
    return new Response('Post not found', { status: 404 })
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: '60px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '60px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: '1.2',
              maxWidth: '800px',
            }}
          >
            {post.title}
          </div>
          
          {post.excerpt && (
            <div
              style={{
                fontSize: '24px',
                color: '#ffffff',
                opacity: 0.9,
                marginBottom: '40px',
                maxWidth: '600px',
              }}
            >
              {post.excerpt}
            </div>
          )}
          
          <div
            style={{
              fontSize: '18px',
              color: '#ffffff',
              opacity: 0.8,
            }}
          >
            {post.author.name} · {new Date(post.publishedAt).toLocaleDateString('et-EE')} · {post.readTime} min read
          </div>
          
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            Site Name
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
