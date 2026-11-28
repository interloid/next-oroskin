/**
 * Runs before every page and API request (Next 16 "proxy", formerly middleware).
 * - Cart cookie: `oro_cart` (random id, 30 days). When it is missing it is set on the response AND
 *   written into this request's Cookie header, so cookies() / api.cart() see it on the very first render.
 * - Per-request twins: /products/<handle> and /pages/<handle> are generated ahead of time and shared by
 *   everybody, so they cannot read the query. A request whose query changes the HTML (?variant=, a posted
 *   form's ?contact_posted= / ?contact_error=) is sent to the twin route under /q, which renders per request.
 *   /q is internal: asking for it directly is a 404.
 * - Sign-in: when the access token's cookie has run out and the refresh token's is still there, a new pair is
 *   fetched from the backend (POST /auth/refresh), set on the response AND written into this request's Cookie
 *   header, so the page being rendered is already signed in. A refresh token the backend no longer accepts
 *   signs the visitor out (the cookies are cleared).
 * - `x-request-id` request header (kept when well formed, else new), so every backend
 *   call made for this request carries the same id (src/lib/backend.ts).
 * - Shopify-style routes the App Router can't express next to the /cart page:
 *   POST /cart (no-JS cart form) → /cart/submit, and GET <page>?sections= / ?section_id= (Section
 *   Rendering API) → /section-render.
 */
import { NextResponse, type NextRequest } from 'next/server';
import { REQUEST_ID_HEADER, requestIdFrom } from '@/lib/request-id';
import { ACCESS_COOKIE, clearSessionCookies, REFRESH_COOKIE, setSessionCookies, type SessionTokens } from '@/lib/session';

const CART_COOKIE = 'oro_cart';
const MAX_AGE = 60 * 60 * 24 * 30;

/** Pages that have a per-request twin under /q, and the query names that need it */
const TWIN_ROUTE = /^\/(products|pages)\/[^/]+\/?$/;
const TWIN_QUERY = ['variant', 'contact_posted', 'contact_error'];

/** Reads or replaces one cookie in a Cookie header */
function withCookie(header: string | null, name: string, value: string | null): string {
  const rest = (header ?? '')
    .split(';')
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith(`${name}=`));
  if (value !== null) rest.push(`${name}=${value}`);
  return rest.join('; ');
}

/**
 * A new token pair for a refresh token, straight from the backend (this file cannot use src/lib/backend.ts,
 * which needs a page render). 'ended' = the backend refused the token; null = it could not be asked (keep
 * the cookies and let the page decide).
 */
async function refreshTokens(refreshToken: string, requestId: string): Promise<SessionTokens | 'ended' | null> {
  const api = process.env.API_URL?.replace(/\/+$/, '');
  if (!api) return null;
  try {
    const res = await fetch(`${api}/auth/refresh`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'content-type': 'application/json',
        [REQUEST_ID_HEADER]: requestId,
        ...(process.env.API_KEY ? { 'x-api-key': process.env.API_KEY } : {}),
      },
      body: JSON.stringify({ refreshToken }),
      signal: AbortSignal.timeout(Number(process.env.API_TIMEOUT_MS) || 8000),
    });
    if (res.status === 401) return 'ended';
    if (!res.ok) return null;
    const body = (await res.json()) as Partial<SessionTokens>;
    if (typeof body.accessToken !== 'string' || typeof body.expiresIn !== 'number' || typeof body.refreshExpiresAt !== 'string') return null;
    return {
      accessToken: body.accessToken,
      expiresIn: body.expiresIn,
      refreshToken: typeof body.refreshToken === 'string' ? body.refreshToken : null,
      refreshExpiresAt: body.refreshExpiresAt,
    };
  } catch {
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  if (pathname === '/q' || pathname.startsWith('/q/')) return new NextResponse(null, { status: 404 });
  const headers = new Headers(req.headers);
  headers.set(REQUEST_ID_HEADER, requestIdFrom(headers.get(REQUEST_ID_HEADER)));

  // Sign-in: get a new access token when the old one has run out.
  let session: SessionTokens | 'ended' | null = null;
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
  if (refreshToken && !req.cookies.get(ACCESS_COOKIE)?.value) {
    session = await refreshTokens(refreshToken, headers.get(REQUEST_ID_HEADER) ?? '');
    if (session === 'ended') {
      let cookie = headers.get('cookie');
      for (const name of [ACCESS_COOKIE, REFRESH_COOKIE]) cookie = withCookie(cookie, name, null);
      headers.set('cookie', cookie ?? '');
    } else if (session) {
      let cookie = withCookie(headers.get('cookie'), ACCESS_COOKIE, session.accessToken);
      if (session.refreshToken) cookie = withCookie(cookie, REFRESH_COOKIE, session.refreshToken);
      headers.set('cookie', cookie);
    }
  }

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
  } else if (req.method === 'GET' && TWIN_ROUTE.test(pathname) && TWIN_QUERY.some((key) => searchParams.has(key))) {
    const url = new URL(`/q${pathname}`, req.url);
    url.search = searchParams.toString();
    res = NextResponse.rewrite(url, { request: { headers } });
  } else {
    res = NextResponse.next({ request: { headers } });
  }

  if (newId) {
    res.cookies.set(CART_COOKIE, newId, { maxAge: MAX_AGE, httpOnly: true, sameSite: 'lax', path: '/' });
  }
  if (session === 'ended') clearSessionCookies(res.cookies);
  else if (session) setSessionCookies(res.cookies, session);
  return res;
}

export const config = {
  // Everything except static files. Paths with a dot are NOT excluded: /cart.js, /cart/add.js must run here.
  matcher: ['/((?!_next/|cdn/|assets/|images/|fonts/|theme/|theme\\.js|favicon\\.ico).*)'],
};
