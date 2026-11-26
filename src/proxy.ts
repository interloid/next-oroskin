/**
 * Runs before every page and API request (Next 16 "proxy", formerly middleware).
 * - Cart cookie: `oro_cart` (random id, 30 days). When it is missing it is set on the response AND
 *   written into this request's Cookie header, so cookies() / api.cart() see it on the very first render.
 * - `x-pathname` request header = the request path (for server components that need the current URL).
 * - Shopify-style routes the App Router can't express next to the /cart page:
 *   POST /cart (no-JS cart form) → /cart/submit, and GET <page>?sections= / ?section_id= (Section
 *   Rendering API) → /section-render.
 */
import { NextResponse, type NextRequest } from 'next/server';

const CART_COOKIE = 'oro_cart';
const MAX_AGE = 60 * 60 * 24 * 30;

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const headers = new Headers(req.headers);
  headers.set('x-pathname', pathname);

  let newId: string | null = null;
  if (!req.cookies.get(CART_COOKIE)?.value) {
    newId = crypto.randomUUID().replace(/-/g, '');
    const cookie = headers.get('cookie');
    headers.set('cookie', `${cookie ? `${cookie}; ` : ''}${CART_COOKIE}=${newId}`);
  }

  let res: NextResponse;
  if (req.method === 'POST' && (pathname === '/cart' || pathname === '/cart/')) {
    res = NextResponse.rewrite(new URL('/cart/submit', req.url), { request: { headers } });
  } else if (
    req.method === 'GET' &&
    (searchParams.has('sections') || searchParams.has('section_id')) &&
    !pathname.endsWith('.js') &&
    !headers.has('x-section-render')
  ) {
    const url = new URL('/section-render', req.url);
    url.search = searchParams.toString();
    url.searchParams.set('__path', pathname);
    headers.set('x-section-path', pathname);
    res = NextResponse.rewrite(url, { request: { headers } });
  } else {
    res = NextResponse.next({ request: { headers } });
  }

  if (newId) {
    res.cookies.set(CART_COOKIE, newId, { maxAge: MAX_AGE, httpOnly: true, sameSite: 'lax', path: '/' });
  }
  return res;
}

export const config = {
  // Everything except static files. Paths with a dot are NOT excluded: /cart.js, /cart/add.js must run here.
  matcher: ['/((?!_next/|cdn/|assets/|images/|fonts/|theme/|theme\\.js|favicon\\.ico).*)'],
};
