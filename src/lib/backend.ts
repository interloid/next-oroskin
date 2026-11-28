/**
 * The one place that calls the NestJS backend (API_URL). Server only. There are two kinds of call:
 *
 * backendFetch(): for one visitor (cart, account, checkout, forms). Never cached. Every call gets:
 * - `x-api-key`     from API_KEY, when it is set
 * - `x-client-ip`   the visitor's address (first `x-forwarded-for` entry, else `x-real-ip`), when it is an IP.
 *                   The backend only trusts it together with a valid key (per-visitor rate limits).
 * - `x-request-id`  the incoming request's id (src/proxy.ts sets one per page view), else a new one,
 *                   so storefront and backend log lines can be matched
 * - `authorization` `Bearer <access token>` when the visitor is signed in (the `oro_access` cookie)
 * Reading the incoming headers makes the page that calls it render on every request.
 *
 * backendRead(): for content that is the same for everybody (site, pages, products, collections,
 * articles). The answer is kept in Next's data cache for CACHE_SECONDS and labelled with tags, so
 * POST /api/revalidate can drop it early. It sends only `x-api-key`: a visitor's address or a request id
 * would make every call a different cache entry, and would tie the page to one request, so pages built
 * from these calls alone can be generated ahead of time (static generation).
 *
 * Both have a timeout (API_TIMEOUT_MS, default 8000 ms). A GET is tried once more after a network error
 * or timeout; writes are never retried. The same GET asked for several times in one page render goes out
 * once. Failures are logged here; the error is passed on (a timeout as a plain Error).
 */
import { isIP } from 'node:net';
import { cache } from 'react';
import { headers } from 'next/headers';
import { unstable_rethrow } from 'next/navigation';
import { env } from './env';
import { REQUEST_ID_HEADER, requestIdFrom } from './request-id';
import { ACCESS_COOKIE } from './session';

type HeaderSource = Pick<Headers, 'get'>;

/** The visitor's IP from the incoming request headers, or null when unknown or not an IP */
export function clientIp(incoming: HeaderSource | null): string | null {
  const raw = incoming?.get('x-forwarded-for')?.split(',')[0] || incoming?.get('x-real-ip') || '';
  const ip = raw.trim().replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/i, '');
  return isIP(ip) ? ip : null;
}

/** One cookie of a Cookie header */
export function cookieValue(header: string | null | undefined, name: string): string | undefined {
  for (const part of (header ?? '').split(';')) {
    const at = part.indexOf('=');
    if (at > 0 && part.slice(0, at).trim() === name) return part.slice(at + 1).trim() || undefined;
  }
  return undefined;
}

/** Pure part: incoming request headers (or null) + env → the headers added to a backend call */
export function backendHeaders(incoming: HeaderSource | null, vars: { API_KEY?: string } = env()) {
  const out: Record<string, string> = { [REQUEST_ID_HEADER]: requestIdFrom(incoming?.get(REQUEST_ID_HEADER)) };
  if (vars.API_KEY) out['x-api-key'] = vars.API_KEY;
  // The signed-in visitor's access token (the HttpOnly cookie set by src/lib/session.ts), as a bearer token
  const token = cookieValue(incoming?.get('cookie'), ACCESS_COOKIE);
  if (token) out.authorization = `Bearer ${token}`;
  const ip = clientIp(incoming);
  if (ip) out['x-client-ip'] = ip;
  return out;
}

/** The incoming request's headers, or null where there is no request (build, scripts) */
async function incomingHeaders(): Promise<HeaderSource | null> {
  try {
    return await headers();
  } catch (error) {
    unstable_rethrow(error); // Next's own control-flow errors (dynamic rendering bail-out) must pass through
    return null;
  }
}

const requestIds = new WeakMap<Response, string>();
/** The `x-request-id` a backendFetch() response was requested with (for error messages and logs) */
export const requestIdOf = (res: Response) => requestIds.get(res) ?? '';

/** fetch() with the timeout, one retry for a GET, and the logging. `id` is only for the log lines. */
async function attempt(pathname: string, init: RequestInit, id: string): Promise<Response> {
  const { API_URL, API_TIMEOUT_MS: timeout } = env();
  const method = (init.method ?? 'GET').toUpperCase();
  const what = `[backend] ${method} ${pathname}`;
  const idText = id ? ` (request id ${id})` : '';

  for (let tries = 1; ; tries++) {
    try {
      const res = await fetch(API_URL + pathname, { ...init, signal: AbortSignal.timeout(timeout) });
      if (id) requestIds.set(res, id);
      if (res.status >= 500 || res.status === 401 || res.status === 429) {
        console.error(`${what}: ${res.status}${idText || ` (request id ${res.headers.get(REQUEST_ID_HEADER) ?? 'unknown'})`}`);
      }
      return res;
    } catch (error) {
      const timedOut = error instanceof Error && error.name === 'TimeoutError';
      const reason = timedOut ? `no answer after ${timeout} ms` : error instanceof Error ? error.message : String(error);
      const retry = method === 'GET' && tries === 1;
      console.error(`${what}: ${reason}${idText}${retry ? ', trying once more' : ''}`);
      if (retry) continue;
      if (!timedOut) throw error;
      // A timeout is a DOMException with a read-only message, which Next's error handling cannot process:
      // pass it on as a plain Error with the same name and text.
      const plain = new Error(error.message, { cause: error });
      plain.name = 'TimeoutError';
      throw plain;
    }
  }
}

async function send(pathname: string, init: RequestInit = {}): Promise<Response> {
  const extra = backendHeaders(await incomingHeaders());
  const requestHeaders = new Headers(init.headers);
  for (const [name, value] of Object.entries(extra)) requestHeaders.set(name, value);
  return attempt(pathname, { ...init, cache: 'no-store', headers: requestHeaders }, extra[REQUEST_ID_HEADER]);
}

/**
 * A plain GET is shared within one page render: sections that ask for the same path get copies of one
 * answer. (React does this for fetch() by itself, but not once a timeout signal is passed.)
 * Outside a render (route handlers) cache() does nothing and every call goes out.
 */
const sharedGet = cache((pathname: string) => send(pathname));

/** One visitor's call: fetch(API_URL + pathname) with the visitor headers, never cached. */
export async function backendFetch(pathname: string, init?: RequestInit): Promise<Response> {
  if (init) return send(pathname, init);
  const shared = await sharedGet(pathname);
  const copy = shared.clone();
  requestIds.set(copy, requestIdOf(shared));
  return copy;
}

const sharedRead = cache((pathname: string, tagList: string) => {
  const { API_KEY, CACHE_SECONDS } = env();
  const headers: Record<string, string> = API_KEY ? { 'x-api-key': API_KEY } : {};
  const caching: RequestInit =
    CACHE_SECONDS > 0 ? { next: { revalidate: CACHE_SECONDS, tags: tagList.split(',') } } : { cache: 'no-store' };
  return attempt(pathname, { ...caching, headers }, '');
});

/**
 * Shared content: GET API_URL + pathname, kept in Next's data cache for CACHE_SECONDS under `tags`
 * (see src/lib/cache-tags.ts). No visitor headers, so it can run at build time.
 */
export async function backendRead(pathname: string, tags: string[]): Promise<Response> {
  return (await sharedRead(pathname, tags.join(','))).clone();
}
