import { auth, signInForm } from '@/lib/auth';
import { safeNext, setSessionCookies } from '@/lib/session';
import { firstIssue, forbidden, formFields, messageOf, sameOrigin, to } from '../_lib/form';

export const dynamic = 'force-dynamic';

/**
 * POST /api/account/login (the sign-in form: email, password, next).
 * The backend checks the password and answers the tokens; they go into HttpOnly cookies and the visitor
 * is sent on to `next` (a path on this site) or /account. A problem goes back to the form with the reason.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return forbidden();
  const fields = await formFields(req);
  const next = safeNext(fields.next);
  const back = (error: string) => to(req, '/account/login', { error, email: fields.email, next: fields.next });

  const form = signInForm.safeParse(fields);
  if (!form.success) return back(firstIssue(form.error));
  try {
    const session = await auth.signIn(form.data);
    // The admin has no customer profile: the storefront's account pages are not for that account.
    if (session.user.customerId === null) {
      await auth.signOut(session.refreshToken ?? undefined);
      return back('This account is for the admin portal. Sign in there.');
    }
    const res = to(req, next);
    setSessionCookies(res.cookies, session);
    return res;
  } catch (error) {
    return back(messageOf(error));
  }
}

/** Old links to the demo sign-in end up on the sign-in page. */
export function GET(req: Request) {
  return to(req, '/account/login');
}
