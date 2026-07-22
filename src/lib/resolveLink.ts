/**
 * Resolves a Sanity link object to a URL string.
 * Pure function — safe to use in both Server and Client components.
 */
export interface SanityLink {
  linkType: 'external' | 'internal';
  url?: string;
  reference?: {
    _type: string;
    slug?: {
      current: string;
    };
  };
}

export function resolveLink(link?: SanityLink): string {
  if (!link) return '#';

  if (link.linkType === 'external' && link.url) {
    return link.url;
  }

  if (link.linkType === 'internal' && link.url?.trim()) {
    const path = link.url.trim()
    if (path.startsWith('/')) return path
  }

  if (link.linkType === 'internal' && link.reference?._type) {
    const type = link.reference._type;
    const slug = link.reference.slug?.current;

    switch (type) {
      case 'page':
        return slug ? `/${slug}` : '#';
      case 'training':
      case 'koolitusPage':
        return '/koolitus';
      case 'aboutPage':
        return '/about';
      case 'opstarProfit':
        return '/product';
      case 'galleryPage':
        return '/galerii';
      case 'blogPage':
        return '/blog';
      case 'kontaktPage':
        return '/kontakt';
      case 'privacyPolicyPage':
        return '/privacy-policy';
      case 'juhendatudLoputoodPage':
        return '/juhendatud-loputood';
      case 'testimonialsPage':
        return '/testimonials';
      case 'mainPage':
        return '/';
      default:
        return slug ? `/${slug}` : '#';
    }
  }

  return '#';
}
