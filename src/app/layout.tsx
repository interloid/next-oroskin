import type { Metadata } from 'next';
import ThemeScripts from '@/components/ThemeScripts';
import { api } from '@/lib/api';
import './globals.css';

/** The store's name, description and icon come from the backend's site settings (a cached read). */
export async function generateMetadata(): Promise<Metadata> {
  const site = await api.site();
  return {
    title: { default: site.name, template: `%s | ${site.name}` },
    description: site.description,
    icons: site.favicon ? { icon: site.favicon } : undefined,
  };
}

// Same start-up script as the theme's layout: no-js → js, and switch animations off if the script fails.
// Plus: `signed-in` on <html> when the oro_signed_in cookie is there, so pages that are generated ahead of
// time show the account icon instead of LOGIN from the first paint (src/components/AccountLink.tsx).
const boot = `document.documentElement.classList.replace('no-js','js');if(/(?:^|; )oro_signed_in=1/.test(document.cookie)){document.documentElement.classList.add('signed-in')}setTimeout(function(){if(!window.customElements||!customElements.get('animate-on-scroll')){document.documentElement.classList.remove('animations-on')}},3000);`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="no-js animations-on motion-on" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&display=swap" />
        <link rel="preload" href="/fonts/satoshi/Satoshi-Variable.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href="/theme/head.css" />
        <link rel="stylesheet" href="/theme/fonts.css" />
        <link rel="stylesheet" href="/theme/critical.css" />
        <link rel="stylesheet" href="/theme/sections.css" />
        <link rel="stylesheet" href="/theme/account.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ThemeScripts />
      </body>
    </html>
  );
}

