export type ThesisType = 'bakalaureusetöö' | 'magistritöö' | 'doktoritöö' | 'lõputöö'

export type Thesis = {
  _id: string
  title: string
  author: string
  school: string
  year: number
  type: ThesisType | string
  category: string
  industry?: string
  keywords?: string[]
  abstract: string
  achievement?: string
  sourceUrl?: string
  mentorComment?: string
}

export const THESIS_TYPE_LABELS: Record<string, string> = {
  bakalaureusetöö: 'Bakalaureusetöö',
  magistritöö: 'Magistritöö',
  doktoritöö: 'Doktoritöö',
  lõputöö: 'Lõputöö',
}

export function thesisTypeLabel(type: string | undefined): string {
  if (!type) return 'Lõputöö'
  return THESIS_TYPE_LABELS[type] || type
}
