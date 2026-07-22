import { redirect } from 'next/navigation'

/** Legacy client route — redirects to generic about path. */
export default function LegacyAboutRedirect() {
  redirect('/about')
}
