/**
 * POST /cart/change.js: `id` = a line key or a variant id, or `line` = the 1-based line number;
 * `quantity` (0 removes). Answer: the cart (+ `sections` when asked).
 */
import type { NextRequest } from 'next/server';
import { cartStore } from '@/lib/cart-store';
import { cartJson, errorResponse, setQuantity } from '@/cart/shopify';
import { cartIdFrom, readBody, withSections } from '@/cart/request';

export async function POST(req: NextRequest) {
  const id = await cartIdFrom();
  const body = await readBody(req);
  try {
    let key = body.id != null ? String(body.id) : '';
    if (!key && body.line != null) key = (await cartStore.get(id)).lines[Number(body.line) - 1]?.key ?? '';
    if (body.quantity != null) await setQuantity(id, key, Number(body.quantity));
    return Response.json(await withSections(req, body, await cartJson(id)));
  } catch (error) {
    return errorResponse(error);
  }
}
