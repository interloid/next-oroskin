import { badRequest, isEmail, json, readBody } from '../_lib/http';

export const dynamic = 'force-dynamic';

/** POST /api/newsletter  { email: string } → { ok: true } (mock: nothing is stored). */
export async function POST(req: Request) {
  const body = await readBody(req);
  if (!isEmail(body?.email)) return badRequest('email is missing or not a valid email address');
  return json({ ok: true });
}
