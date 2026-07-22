import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/** Neutral geometric favicon — no client brand marks. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F172A',
          borderRadius: 8,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 14,
            height: 14,
            borderRadius: 3,
            border: '2.5px solid #38BDF8',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
