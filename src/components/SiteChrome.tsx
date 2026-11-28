import { registry } from '@/sections/registry.generated';
import { api } from '@/lib/api';
import CartNotification from '@/components/CartNotification';
import VisitorSync from '@/components/VisitorSync';
import { loadSiteFormat } from '@/lib/format';

/**
 * Site chrome around every page. Header, footer and announcement bar are sections too
 * ("announcement-bar", "header", "footer"); they read the backend's GET /site.
 *
 * `path` is the page's own path (for the transparent home header and the active menu link). The page
 * passes it: reading it from the request would make every page render per request.
 *
 * `visitor` says how the visitor's own bits (cart count, signed in or not) get into the header:
 * - true:  the page is rendered per request anyway (cart, checkout, account, search, filtered lists), so
 *          the cart and the session cookie are read on the server and the header is right from the start.
 * - false: the page is generated ahead of time and shared by everybody, so the header is rendered for
 *          "empty cart, either sign-in state" and <VisitorSync> fills in the count in the browser.
 */
export default async function SiteChrome({ children, path, visitor = false }: { children: React.ReactNode; path: string; visitor?: boolean }) {
  const [site, cart] = await Promise.all([api.site(), visitor ? api.cart() : null]);
  loadSiteFormat(site);
  const Announcement = registry['announcement-bar'];
  const Header = registry['header'];
  const Footer = registry['footer'];
  return (
    <>
      <a className="skip-link" href="#MainContent">
        Skip to content
      </a>
      {Announcement ? <Announcement site={site} /> : null}
      {Header ? <Header site={site} cart={cart} path={path} transparent={path === '/'} visitor={visitor} /> : null}
      <main id="MainContent" className="main-content" tabIndex={-1}>
        {children}
      </main>
      {Footer ? <Footer site={site} path={path} /> : null}
      {/* "Added to your bag" card for the round cart buttons; the cart page updates itself instead. */}
      {path !== '/cart' ? <CartNotification /> : null}
      {visitor ? null : <VisitorSync />}
    </>
  );
}
