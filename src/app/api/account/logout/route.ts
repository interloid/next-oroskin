import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/session';

export const dynamic = 'force-dynamic';

/** GET /api/account/logout: demo sign-out (the Sign out page). Clears the session cookie, then opens the home page. */
export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL('/', req.url), 303);
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
