export type GrantInquiryPayload = {
  name: string
  email: string
  isikukood?: string
}

export function formatGrantInquiryTelegramText(data: GrantInquiryPayload): string {
  const lines = [
    'Töötukassa toetus — päring (avaleht)',
    '',
    `Nimi: ${data.name}`,
    `E-post: ${data.email}`,
    data.isikukood ? `Isikukood: ${data.isikukood}` : 'Isikukood: — (ei sisestatud)',
    '',
    'Allikas: grant-section',
  ]
  return lines.join('\n')
}

export function grantInquirySmailyFields(data: GrantInquiryPayload): Record<string, string> {
  return {
    name: data.name.slice(0, 200),
    source: 'grant-section',
    lead_type: 'tootukassa-inquiry',
    isikukood: (data.isikukood || '').slice(0, 11),
    marketing_consent: 'no',
  }
}
