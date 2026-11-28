/**
 * The one place that calls the NestJS backend (API_URL). Server only. Every call gets:
 * - `x-api-key`     from API_KEY, when it is set
 * - `x-client-ip`   the visitor's address (first `x-forwarded-for` entry, else `x-real-ip`), when it is an IP.
 *                   The backend only trusts it together with a valid key (per-visitor rate limits).
 * - `x-request-id`  the incoming request's id (src/proxy.ts sets one per page view), else a new one,
 *                   so storefront and backend log lines can be matched
 * - a timeout       API_TIMEOUT_MS, default 8000 ms
 * A GET is tried once more after a network error or timeout; writes are never retried.
 * The same GET asked for several times in one page render goes out once.
 * Failures are logged here with the request id; the error is passed on (a timeout as a plain Error).
 */
import { isIP } from 'node:net';
import { cache } from 'react';
import { headers } from 'next/headers';
import { unstable_rethrow } from 'next/navigation';
import { REQUEST_ID_HEADER, requestIdFrom } from './request-id';

const DEFAULT_TIMEOUT_MS = 8000;

type HeaderSource = Pick<Headers, 'get'>;

/** The visitor's IP from the incoming request headers, or null when unknown or not an IP */
export function clientIp(incoming: HeaderSource | null): string | null {
  const raw = incoming?.get('x-forwarded-for')?.split(',')[0] || incoming?.get('x-real-ip') || '';
  const ip = raw.trim().replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/i, '');
  return isIP(ip) ? ip : null;
}

/** Pure part: incoming request headers (or null) + env → the headers added to a backend call */
export function backendHeaders(incoming: HeaderSource | null, env: Record<string, string | undefined> = process.env) {
  const out: Record<string, string> = { [REQUEST_ID_HEADER]: requestIdFrom(incoming?.get(REQUEST_ID_HEADER)) };
  if (env.API_KEY) out['x-api-key'] = env.API_KEY;
  const ip = clientIp(incoming);
  if (ip) out['x-client-ip'] = ip;
  return out;
}

export function backendTimeoutMs(value = process.env.API_TIMEOUT_MS): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : DEFAULT_TIMEOUT_MS;
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

async function send(pathname: string, init: RequestInit = {}): Promise<Response> {
  const method = (init.method ?? 'GET').toUpperCase();
  const extra = backendHeaders(await incomingHeaders());
  const id = extra[REQUEST_ID_HEADER];
  const requestHeaders = new Headers(init.headers);
  for (const [name, value] of Object.entries(extra)) requestHeaders.set(name, value);
  const timeout = backendTimeoutMs();
  const what = `[backend] ${method} ${pathname}`;

  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(process.env.API_URL + pathname, {
        ...init,
        cache: 'no-store',
        headers: requestHeaders,
        signal: AbortSignal.timeout(timeout),
      });
      requestIds.set(res, id);
      if (res.status >= 500 || res.status === 401 || res.status === 429) {
        console.error(`${what}: ${res.status} (request id ${id})`);
      }
      return res;
    } catch (error) {
      const timedOut = error instanceof Error && error.name === 'TimeoutError';
      const reason = timedOut ? `no answer after ${timeout} ms` : error instanceof Error ? error.message : String(error);
      const retry = method === 'GET' && attempt === 1;
      console.error(`${what}: ${reason} (request id ${id})${retry ? ', trying once more' : ''}`);
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

/**
 * A plain GET is shared within one page render: sections that ask for the same path get copies of one
 * answer. (React does this for fetch() by itself, but not once a timeout signal is passed.)
 * Outside a render (route handlers) cache() does nothing and every call goes out.
 */
const sharedGet = cache((pathname: string) => send(pathname));

/** fetch(API_URL + pathname) with the headers and timeout above. Call it only when API_URL is set. */
export async function backendFetch(pathname: string, init?: RequestInit): Promise<Response> {
  if (init) return send(pathname, init);
  const shared = await sharedGet(pathname);
  const copy = shared.clone();
  requestIds.set(copy, requestIdOf(shared));
  return copy;
}
