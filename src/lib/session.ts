/**
 * Demo sign-in (no passwords): GET /api/account/login asks the backend for the demo customer, keeps its id
 * in the session cookie and opens /account; GET /api/account/logout clears it.
 * - `oro_session`   httpOnly: the customer id. Server code reads it (customerId()).
 * - `oro_signed_in` readable by scripts, value "1": only says "somebody is signed in", so pages that are
 *   generated ahead of time can show the account icon instead of LOGIN without a request (src/app/layout.tsx).
 */
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'oro_session';
export const SIGNED_IN_COOKIE = 'oro_signed_in';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** The signed-in customer's id, or null */
export async function customerId(): Promise<string | null> {
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return value && /^[\w-]{1,64}$/.test(value) ? value : null;
}
