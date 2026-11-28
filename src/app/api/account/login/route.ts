import { NextResponse } from 'next/server';
import { account } from '@/lib/account';
import { SESSION_COOKIE, SESSION_MAX_AGE, SIGNED_IN_COOKIE } from '@/lib/session';

export const dynamic = 'force-dynamic';

/**
 * GET /api/account/login: demo sign-in (the header LOGIN pill). There are no passwords: the backend names
 * its demo customer, that customer's id goes into the session cookie, then /account opens.
 */
export async function GET(req: Request) {
  const customer = await account.demoCustomer();
  const res = NextResponse.redirect(new URL('/account', req.url), 303);
  const base = { path: '/', sameSite: 'lax' as const, maxAge: SESSION_MAX_AGE };
  res.cookies.set(SESSION_COOKIE, String(customer.id), { ...base, httpOnly: true });
  res.cookies.set(SIGNED_IN_COOKIE, '1', base);
  return res;
}
