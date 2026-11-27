import { NextResponse } from 'next/server';
import { badRequest, isEmail, json, readBody } from '../_lib/http';

export const dynamic = 'force-dynamic';

/**
 * POST /api/newsletter
 * - JSON { email } → { ok: true }   (the backend contract; mock: nothing is stored)
 * - HTML form post (the footer form: contact[email]) → 303 back to the page with ?customer_posted=true
 *   or ?customer_error=email (Shopify's names). With API_URL set the email is forwarded to the backend.
 */
export async function POST(req: Request) {
  const type = req.headers.get('content-type') ?? '';
  if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
    const form = await req.formData();
    const email = String(form.get('contact[email]') ?? form.get('email') ?? '').trim();
    const origin = new URL(req.url).origin;
    let back = new URL('/', origin);
    const referer = req.headers.get('referer');
    if (referer) {
      const r = new URL(referer);
      if (r.origin === origin) back = new URL(r.pathname + r.search, origin);
    }
    let ok = isEmail(email);
    if (ok && process.env.API_URL) {
      const res = await fetch(`${process.env.API_URL}/newsletter`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => null);
      ok = !!res?.ok;
    }
    back.searchParams.delete('customer_posted');
    back.searchParams.delete('customer_error');
    back.searchParams.set(ok ? 'customer_posted' : 'customer_error', ok ? 'true' : 'email');
    back.hash = 'NewsletterForm-footer';
    return NextResponse.redirect(back, 303);
  }
  const body = await readBody(req);
  if (!isEmail(body?.email)) return badRequest('email is missing or not a valid email address');
  return json({ ok: true });
}
