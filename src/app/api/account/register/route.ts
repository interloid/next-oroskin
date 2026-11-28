import { auth, signUpForm } from '@/lib/auth';
import { setSessionCookies } from '@/lib/session';
import { firstIssue, forbidden, formFields, messageOf, sameOrigin, to } from '../_lib/form';

export const dynamic = 'force-dynamic';

/**
 * POST /api/account/register (the sign-up form: first_name, last_name, email, password, confirm).
 * Creates the account in the backend, signs the new customer in (HttpOnly cookies) and opens /account.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return forbidden();
  const fields = await formFields(req);
  const back = (error: string) =>
    to(req, '/account/register', { error, email: fields.email, first_name: fields.first_name, last_name: fields.last_name });

  const form = signUpForm.safeParse({
    firstName: fields.first_name,
    lastName: fields.last_name,
    email: fields.email,
    password: fields.password,
    confirm: fields.confirm,
  });
  if (!form.success) return back(firstIssue(form.error));
  try {
    const { firstName, lastName, email, password } = form.data;
    const session = await auth.signUp({ firstName, lastName, email, password });
    const res = to(req, '/account');
    setSessionCookies(res.cookies, session);
    return res;
  } catch (error) {
    return back(messageOf(error));
  }
}
