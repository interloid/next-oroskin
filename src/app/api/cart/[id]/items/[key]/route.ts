import { db, findVariant } from '@/lib/db';
import { checkCartId, quantity } from '../../../../_lib/cart';
import { badRequest, fail, json, notFound, readBody } from '../../../../_lib/http';

export const dynamic = 'force-dynamic';

/**
 * PATCH /api/cart/:id/items/:key  { quantity: number } → Cart
 * key = the line key (or the variant id). quantity 0 removes the line. 422 above the stock.
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string; key: string }> }) {
  const { id, key: rawKey } = await params;
  const bad = checkCartId(id);
  if (bad) return bad;
  const key = decodeURIComponent(rawKey); // line keys contain ":" (sent as %3A)
  const body = await readBody(req);
  if (!body) return badRequest('Body must be JSON: { "quantity": number }');
  const qty = quantity(body.quantity, 0);
  if (qty == null) return badRequest('quantity must be a whole number from 0 to 9999');
  const line = db.cart(id).lines.find((l) => l.key === key || String(l.variantId) === key);
  if (!line) return notFound(`Line "${key}" not in cart`);
  const stock = findVariant(line.variantId)?.variant.inventory ?? 0;
  if (qty > stock) return fail(422, `Only ${stock} of ${line.title} in stock`, { available: stock });
  return json(db.updateLine(id, key, qty));
}
