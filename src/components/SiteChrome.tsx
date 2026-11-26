import { registry } from '@/sections/registry.generated';
import { headers } from 'next/headers';
import { api } from '@/lib/api';
import CartNotification from '@/components/CartNotification';

/**
 * Site chrome around every page. Header, footer and announcement bar are sections too
 * ("announcement-bar", "header", "footer"); they read GET /api/site.
 */
export default async function SiteChrome({ children }: { children: React.ReactNode }) {
  const site = await api.site();
  const cart = await api.cart();
  // The current path, for the transparent home header and the active menu link. Set by src/proxy.ts
  // (request header x-pathname); without it every page gets the solid (inner page) header.
  const path = (await headers()).get('x-pathname');
  const Announcement = registry['announcement-bar'];
  const Header = registry['header'];
  const Footer = registry['footer'];
  return (
    <>
      <a className="skip-link" href="#MainContent">
        Skip to content
      </a>
      {Announcement ? <Announcement site={site} /> : null}
      {Header ? <Header site={site} cart={cart} path={path} transparent={path === '/'} /> : null}
      <main id="MainContent" className="main-content" tabIndex={-1}>
        {children}
      </main>
      {Footer ? <Footer site={site} path={path} /> : null}
      {/* "Added to your bag" card for the round cart buttons; the cart page updates itself instead. */}
      {path !== '/cart' ? <CartNotification /> : null}
    </>
  );
}
