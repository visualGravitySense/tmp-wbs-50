import { redirect } from 'next/navigation'

/** Legacy product route — redirects to generic product path. */
export default function LegacyProductRedirect() {
  redirect('/product')
}
