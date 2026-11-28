import { auth, resetForm } from '@/lib/auth';
import { clearSessionCookies } from '@/lib/session';
import { firstIssue, forbidden, formFields, messageOf, sameOrigin, to } from '../_lib/form';

export const dynamic = 'force-dynamic';

/**
 * POST /api/account/reset-password (token from the emailed link, password, confirm).
 * The backend sets the new password and signs the account out everywhere; the visitor then signs in with it.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return forbidden();
  const fields = await formFields(req);
  const back = (error: string) => to(req, '/account/reset-password', { error, token: fields.token });

  const form = resetForm.safeParse(fields);
  if (!form.success) return back(firstIssue(form.error));
  try {
    await auth.resetPassword({ token: form.data.token, password: form.data.password });
  } catch (error) {
    return back(messageOf(error));
  }
  const res = to(req, '/account/login', { notice: 'Your password is changed. Sign in with the new one.' });
  clearSessionCookies(res.cookies);
  return res;
}
