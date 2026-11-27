import type { Metadata } from 'next';
import ThemeScripts from '@/components/ThemeScripts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oroskin',
  description: 'Luxury skincare, fragrance and makeup.',
  icons: { icon: '/cdn/shop/files/logo-mark-flame.png' },
};

// Same start-up script as the theme's layout: no-js → js, and switch animations off if the script fails.
const boot = `document.documentElement.classList.replace('no-js','js');setTimeout(function(){if(!window.customElements||!customElements.get('animate-on-scroll')){document.documentElement.classList.remove('animations-on')}},3000);`;

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
        <link rel="stylesheet" href="/theme/pages-extra.css" />
        <link rel="stylesheet" href="/theme/account.css" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ThemeScripts />
      </body>
    </html>
  );
}

