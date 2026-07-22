import React from 'react';
import { getPartnerLogos } from '@/lib/sanity';
import LogoMarqueeClient from './LogoMarqueeClient';

interface LogoMarqueeProps {
  logos?: any[];
  title?: string;
}

export default async function LogoMarquee({ 
  logos, 
  title 
}: LogoMarqueeProps) {
  // If logos are passed from the page/builder, use them; otherwise query Sanity globally
  const resolvedLogos = logos && logos.length > 0 ? logos : await getPartnerLogos();

  if (!resolvedLogos || resolvedLogos.length === 0) {
    return null;
  }

  return <LogoMarqueeClient logos={resolvedLogos} title={title} />;
}
