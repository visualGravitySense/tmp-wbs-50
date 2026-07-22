import { createClient } from '@sanity/client'
import { NextRequest, NextResponse } from 'next/server'

const NINE_DAYS_PROGRAM = {
  backgroundColor: 'bg-gray-50',
  eyebrow: 'Baaskursuse programm',
  title: '9-päevane intensiivprogramm',
  subtitle: 'Muuda oma tootmist 9 päevaga LEAN süsteemi abil',
  habits: [
    {
      _key: '12f8ba2ac3cb',
      benefit: 'distsipliin',
      day: '1',
      description: 'algus',
      icon: '⭐',
      title: 'Habbit',
    },
    {
      _key: '644eb6e8d204',
      benefit: 'Turvalisus',
      day: 'Päev 2',
      description: 'Proovin',
      icon: 'k',
      title: 'Päev 2',
    },
  ],
  oppepaevad: [
    { _key: '3d2516e8bc7e', _type: 'reference', _ref: '5d0a67e6-0a0b-4adc-aa3f-ff58c401d706' },
    { _key: '85bac26fc328', _type: 'reference', _ref: '1d75df99-798c-4e3d-9edb-ac4d9f50e78f' },
    { _key: '7c30e7d0959c', _type: 'reference', _ref: '96f9740b-fed5-4afa-aad1-c8e25194c348' },
    { _key: 'd9e653859e8a', _type: 'reference', _ref: 'f59e2928-2b86-4aa4-b723-49020c10b8e1' },
    { _key: 'eff48f0a97fd', _type: 'reference', _ref: 'ccb2f4a4-6127-4cd7-82ca-32e155b260d3' },
    { _key: '3c08a045c075', _type: 'reference', _ref: '6dee8f25-8efd-45df-8775-3d242cc25d4f' },
    { _key: '23b73942b133', _type: 'reference', _ref: '49db9f21-47f6-4c2e-a71a-412fd9d41cd5' },
    { _key: '538b3b5b6898', _type: 'reference', _ref: '26248482-1a7b-4203-9a5e-c7e736577aa9' },
    { _key: '9b03f1296cfc', _type: 'reference', _ref: 'ca1b7336-3724-451c-b3a5-f3e823a84b38' },
  ],
  sidebarCtas: {
    readMoreText: 'Loe lähemalt',
    registerText: 'Registreeru programmi →',
    registerUrl: '#pricing',
  },
  completionSection: {
    title: 'Programmi lõpetamiseks',
    description: 'Vali sobivaim viis osalemiseks',
    nextCourseInfo: 'Järgmine kursus algab 15. oktoober',
    buttonText: 'Registreeru kursusele',
    selectedHabits: [
      {
        _key: 'afad6fc20fe3',
        description: 'harjumsus',
        icon: '⭐',
        title: 'Distsipliin',
      },
    ],
  },
  faqSection: {
    question: 'Kuidas töötab 9-päevane programm?',
  },
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token =
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_AUTH_TOKEN

  if (!token) {
    return NextResponse.json({ error: 'Missing SANITY_API_TOKEN' }, { status: 500 })
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })

  const before = await client.fetch(`*[_id == "siteSettings"][0]{
    "hasProgram": defined(nineDaysProgram.title),
    "oppepaevCount": count(nineDaysProgram.oppepaevad)
  }`)

  if (!before?.hasProgram) {
    await client.patch('siteSettings').set({ nineDaysProgram: NINE_DAYS_PROGRAM }).commit()
  }

  const after = await client.fetch(`*[_id == "siteSettings"][0]{
    "hasProgram": defined(nineDaysProgram.title),
    "oppepaevCount": count(nineDaysProgram.oppepaevad)
  }`)

  return NextResponse.json({ ok: true, before, after, patched: !before?.hasProgram })
}