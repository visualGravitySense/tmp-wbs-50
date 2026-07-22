import type { Metadata } from "next";
import { cookies, draftMode, headers } from "next/headers";
import { Geist, Playfair_Display, Instrument_Serif } from 'next/font/google';
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { DraftPreviewLayer } from "@/components/DraftPreviewLayer";
import { SanityLiveServer } from "@/components/SanityLiveServer";
import { ThemeBootstrap } from "@/components/ThemeBootstrap";
import WebMcpIntegration from "@/components/WebMcpIntegration";
import { getSiteSettings } from "@/lib/sanity";
import { getMainPageCached } from "@/lib/sanity/getMainPageCached";
import { getSiteUrl } from "@/lib/site/siteUrl";
import {
  COLOR_SCHEME_COOKIE_KEY,
  parseColorSchemeCookie,
} from "@/lib/theme-persistence";
import { cn } from "@/lib/utils";


import ScrollSpyNav from "@/components/ScrollSpyNav";

const geist = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-script',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Andres Kase - Tootmisjuhtimise koolitused ja konsultatsioonid",
  description: "Praktilised tootmisjuhtimise ja LEAN koolitused ning konsultatsioonid Eesti ettevõtetele. Paneme asjad juhtuma!",
  robots: {
    index: true,
    follow: true,
  },
};


function isStudioPath(pathname: string) {
  return pathname === "/studio" || pathname.startsWith("/studio/");
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();
  const cookieStore = await cookies();
  const headerStore = await headers();
  const pathname =
    headerStore.get("x-pathname") ??
    headerStore.get("x-invoke-path") ??
    headerStore.get("next-url") ??
    "";
  const studioRoute = isStudioPath(pathname);
  const colorScheme = parseColorSchemeCookie(
    cookieStore.get(COLOR_SCHEME_COOKIE_KEY)?.value,
  );

  // min-h-full (not h-full): avoid locking the document to the viewport height,
  // which pairs badly with overflow-x clipping and can spawn a nested body scrollport.
  const htmlClass = cn(
    "min-h-full scroll-smooth antialiased",
    geist.variable,
    playfair.variable,
    instrumentSerif.variable,
    colorScheme === "dark" && "dark",
  );

  if (studioRoute) {
    return (
      <html lang="et" className={htmlClass} suppressHydrationWarning>
        <head>
        </head>
        <body className="min-h-full" suppressHydrationWarning>

          {children}
        </body>
      </html>
    );
  }

  let mainPageData: Awaited<ReturnType<typeof getMainPageCached>> | null = null
  let siteSettings: Awaited<ReturnType<typeof getSiteSettings>> | null = null

  try {
    ;[mainPageData, siteSettings] = await Promise.all([
      getMainPageCached(),
      getSiteSettings(),
    ])
  } catch (error) {
    console.error('[layout] Sanity fetch failed:', error)
  }

  const brandTheme = siteSettings?.theme?.themeStyle || "opstar";

  return (
    <html lang="et" className={htmlClass} suppressHydrationWarning>
      <head>
      </head>
      <body
        className="flex min-h-full w-full max-w-full flex-col overflow-x-clip overflow-y-visible"
        data-brand={brandTheme}
        suppressHydrationWarning
      >

        <ThemeBootstrap />
        <WebMcpIntegration />
        <SiteChrome
          headerData={siteSettings?.header}
          footerData={siteSettings?.footer}
          cookieBanner={siteSettings?.cookieBanner}
          draftEnabled={draft.isEnabled}
        >
          <ScrollSpyNav />
          {children}
        </SiteChrome>
        {draft.isEnabled ? (
          <>
            <SanityLiveServer />
            <DraftPreviewLayer />
          </>
        ) : null}

      </body>
    </html>
  );
}
