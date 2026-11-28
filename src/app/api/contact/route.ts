import { NextResponse } from 'next/server';
import { backendFetch } from '@/lib/backend';
import { badRequest, isEmail, isText, json, readBody } from '../_lib/http';

export const dynamic = 'force-dynamic';

/**
 * POST /api/contact
 * - JSON  { name, email, message, phone?, topic?, orderNumber?, subject? } → { ok: true }   (the backend contract)
 * - HTML form post (the theme's contact forms: contact[email], contact[body], contact[First name] ...)
 *   → 303 back to the page with ?contact_posted=true, or ?contact_error=<reason>, like Shopify's /contact.
 * Mock: nothing is sent. With API_URL set, the form is forwarded to the backend as JSON.
 */
export async function POST(req: Request) {
  const type = req.headers.get('content-type') ?? '';
  if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
    return formPost(req);
  }
  const body = await readBody(req);
  if (!body) return badRequest('Body must be a JSON object');
  if (!isText(body.name, 200)) return badRequest('name is required');
  if (!isEmail(body.email)) return badRequest('email is missing or not a valid email address');
  if (!isText(body.message)) return badRequest('message is required (at most 5000 characters)');
  for (const [k, v] of Object.entries(body))
    if (v != null && typeof v !== 'string') return badRequest(`${k} must be a string`);
  return json({ ok: true });
}

async function formPost(req: Request) {
  const form = await req.formData();
  const field = (name: string) => String(form.get(`contact[${name}]`) ?? '').trim();
  const name = field('Name') || [field('First name'), field('Last name')].filter(Boolean).join(' ');
  const email = field('email');
  const message = field('body');

  // Back to the page the form was on (same origin only).
  const origin = new URL(req.url).origin;
  let back = new URL('/pages/contact', origin);
  const referer = req.headers.get('referer');
  if (referer) {
    const r = new URL(referer);
    if (r.origin === origin) back = new URL(r.pathname, origin);
  }

  let error: string | null = null;
  if (!isEmail(email)) error = 'email';
  else if (!message) error = 'body';

  if (!error && process.env.API_URL) {
    const extra: Record<string, string> = {};
    for (const [k, v] of form.entries()) {
      const m = /^contact\[(.+)\]$/.exec(k);
      if (m && !['email', 'body', 'Name', 'First name', 'Last name'].includes(m[1])) extra[m[1]] = String(v);
    }
    const res = await backendFetch('/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...extra, name: name || email, email, message }),
    }).catch(() => null);
    if (!res?.ok) error = 'server';
  }

  back.searchParams.set(error ? 'contact_error' : 'contact_posted', error ?? 'true');
  return NextResponse.redirect(back, 303);
}
