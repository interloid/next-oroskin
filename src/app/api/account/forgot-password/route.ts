import { auth, forgotForm } from '@/lib/auth';
import { firstIssue, forbidden, formFields, sameOrigin, to } from '../_lib/form';

export const dynamic = 'force-dynamic';

/**
 * POST /api/account/forgot-password (email). The backend emails a reset link when the address has an
 * account. The visitor sees the same "check your inbox" either way, so this form cannot be used to find
 * out which addresses are registered.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return forbidden();
  const fields = await formFields(req);
  const form = forgotForm.safeParse(fields);
  if (!form.success) return to(req, '/account/forgot-password', { error: firstIssue(form.error), email: fields.email });
  try {
    await auth.forgotPassword(form.data.email);
  } catch {
    return to(req, '/account/forgot-password', { error: 'We could not send the email right now. Please try again.', email: fields.email });
  }
  return to(req, '/account/forgot-password', { sent: '1' });
}
