import { NextResponse } from 'next/server';
import { SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/session';

export const dynamic = 'force-dynamic';

/** GET /api/account/login: demo sign-in (the header LOGIN pill). Sets the session cookie, then opens /account. */
export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL('/account', req.url), 303);
  res.cookies.set(SESSION_COOKIE, 'demo', { path: '/', httpOnly: true, sameSite: 'lax', maxAge: SESSION_MAX_AGE });
  return res;
}
