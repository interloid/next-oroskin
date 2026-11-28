import { auth, changePasswordForm } from '@/lib/auth';
import { firstIssue, forbidden, formFields, messageOf, sameOrigin, to } from '../_lib/form';

export const dynamic = 'force-dynamic';

/**
 * POST /api/account/change-password (current_password, new_password, confirm), for the signed-in customer.
 * The backend checks the current password, sets the new one and signs every other device out.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return forbidden();
  const fields = await formFields(req);
  const back = (error: string) => to(req, '/account/change-password', { error });

  const form = changePasswordForm.safeParse({
    currentPassword: fields.current_password,
    newPassword: fields.new_password,
    confirm: fields.confirm,
  });
  if (!form.success) return back(firstIssue(form.error));
  try {
    await auth.changePassword({ currentPassword: form.data.currentPassword, newPassword: form.data.newPassword });
  } catch (error) {
    return back(messageOf(error));
  }
  return to(req, '/account/details', { notice: 'Your password is changed. Other devices have been signed out.' });
}
