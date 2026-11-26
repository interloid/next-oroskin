import { db } from '@/lib/db';
import { checkCartId } from '../../../_lib/cart';
import { badRequest, json, readBody } from '../../../_lib/http';

export const dynamic = 'force-dynamic';

/**
 * POST /api/cart/:id/discounts  { code: string } → Cart
 * A wrong code is still added, with applicable: false (the cart page shows it as "not applicable").
 * Mock: only GLOW10 is applicable.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bad = checkCartId(id);
  if (bad) return bad;
  const body = await readBody(req);
  const code = typeof body?.code === 'string' ? body.code.trim() : '';
  if (!code || code.length > 64) return badRequest('Body must be JSON: { "code": string } (1–64 characters)');
  return json(db.applyDiscount(id, code));
}
