/**
 * The visitor's sign-in, kept in cookies on this site. The backend issues the tokens
 * (POST /auth/sign-in: a JWT access token and a refresh token); the storefront's server stores them and
 * sends the access token to the backend as `Authorization: Bearer` (src/lib/backend.ts).
 * - `oro_access`    HttpOnly: the access token. The cookie lasts a little less than the token, so a
 *                   missing cookie means "expired": src/proxy.ts then gets a new one with the refresh token.
 * - `oro_refresh`   HttpOnly: the refresh token, replaced on every refresh. Lasts as long as the session.
 * - `oro_signed_in` readable by scripts, value "1": only says "somebody is signed in", so pages that are
 *                   generated ahead of time can show the account icon instead of LOGIN (src/app/layout.tsx).
 * Scripts can never read a token. The cookies are SameSite=Lax and, in production, Secure.
 * No imports from next/headers here: this file is also used by src/proxy.ts.
 */
export const ACCESS_COOKIE = 'oro_access';
export const REFRESH_COOKIE = 'oro_refresh';
export const SIGNED_IN_COOKIE = 'oro_signed_in';

/** The access cookie ends this many seconds before its token does, so a token is never sent in its last moments */
const ACCESS_MARGIN_SECONDS = 30;

/** What sign-in, sign-up and refresh answer (src/lib/auth.ts checks it with Zod) */
export interface SessionTokens {
  accessToken: string;
  /** Seconds */
  expiresIn: number;
  /** Null when a refresh arrived just after another one: the refresh cookie we have stays */
  refreshToken: string | null;
  /** ISO timestamp */
  refreshExpiresAt: string;
}

interface CookieJar {
  set(name: string, value: string, options: Record<string, unknown>): unknown;
  delete(name: string): unknown;
}

const secure = process.env.NODE_ENV === 'production';
const base = { path: '/', sameSite: 'lax' as const, secure };

/** Writes the three cookies for a session (on a NextResponse's `cookies`). */
export function setSessionCookies(jar: CookieJar, tokens: SessionTokens): void {
  const ends = new Date(tokens.refreshExpiresAt);
  jar.set(ACCESS_COOKIE, tokens.accessToken, {
    ...base,
    httpOnly: true,
    maxAge: Math.max(1, tokens.expiresIn - ACCESS_MARGIN_SECONDS),
  });
  if (tokens.refreshToken) jar.set(REFRESH_COOKIE, tokens.refreshToken, { ...base, httpOnly: true, expires: ends });
  jar.set(SIGNED_IN_COOKIE, '1', { ...base, expires: ends });
}

export function clearSessionCookies(jar: CookieJar): void {
  for (const name of [ACCESS_COOKIE, REFRESH_COOKIE, SIGNED_IN_COOKIE]) jar.delete(name);
}

/** A path on this site to go to after signing in: only "/..." (never another site), else the fallback. */
export function safeNext(next: unknown, fallback = '/account'): string {
  return typeof next === 'string' && /^\/(?!\/)[^\\]*$/.test(next) && !next.startsWith('/api/') ? next : fallback;
}
