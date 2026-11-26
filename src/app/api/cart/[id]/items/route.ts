import { db, findVariant } from '@/lib/db';
import { checkCartId, quantity } from '../../../_lib/cart';
import { badRequest, fail, json, notFound, readBody } from '../../../_lib/http';

export const dynamic = 'force-dynamic';

/**
 * POST /api/cart/:id/items  { variantId: number, quantity?: number = 1 } → { cart: Cart, line: CartLine }
 * Adding a variant already in the cart adds to that line. 422 when sold out or above the stock.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const bad = checkCartId(id);
  if (bad) return bad;
  const body = await readBody(req);
  if (!body) return badRequest('Body must be JSON: { "variantId": number, "quantity": number }');
  const variantId = body.variantId;
  if (typeof variantId !== 'number' || !Number.isInteger(variantId)) return badRequest('variantId must be a whole number');
  const qty = body.quantity == null ? 1 : quantity(body.quantity, 1);
  if (qty == null) return badRequest('quantity must be a whole number from 1 to 9999');
  const found = findVariant(variantId);
  if (!found) return notFound(`Variant ${variantId} not found`);
  if (!found.variant.available) return fail(422, `${found.product.title} is sold out`);
  const inCart = db.cart(id).lines.find((l) => l.variantId === variantId)?.quantity ?? 0;
  if (inCart + qty > found.variant.inventory)
    return fail(422, `Only ${found.variant.inventory} of ${found.product.title} in stock`, { available: found.variant.inventory - inCart });
  return json(db.addToCart(id, variantId, qty));
}
