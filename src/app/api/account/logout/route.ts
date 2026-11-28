import { cookies } from 'next/headers';
import { auth } from '@/lib/auth';
import { clearSessionCookies, REFRESH_COOKIE, safeNext } from '@/lib/session';
import { to } from '../_lib/form';

export const dynamic = 'force-dynamic';

/**
 * /api/account/logout: ends the session in the backend, clears the cookies, then opens the home page (or
 * `?next=`, a path on this site: an account page sends an expired session here to clean up and sign in again).
 */
async function handle(req: Request) {
  await auth.signOut((await cookies()).get(REFRESH_COOKIE)?.value);
  const res = to(req, safeNext(new URL(req.url).searchParams.get('next'), '/'));
  clearSessionCookies(res.cookies);
  return res;
}
export const GET = handle;
export const POST = handle;
