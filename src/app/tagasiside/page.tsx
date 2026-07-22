import { permanentRedirect } from 'next/navigation'

/** Legacy path from CTAs; canonical listing lives at `/testimonials`. */
export default function TagasisideRedirectPage() {
  permanentRedirect('/testimonials')
}
