/**
 * POST /cart (rewritten here by src/proxy.ts: the /cart page owns GET). The no-JS cart form:
 * `updates[]`, `note`, `attributes`, and `checkout` (the checkout buttons) → /checkout, else → /cart.
 */
import type { NextRequest } from 'next/server';
import { cartIdFrom, readBody } from '@/cart/request';
import { applyUpdate } from '@/cart/update';

export async function POST(req: NextRequest) {
  const id = await cartIdFrom();
  const body = await readBody(req);
  try {
    await applyUpdate(id, body);
  } catch {
    // e.g. more than the stock: the cart page shows the cart as it is
  }
  return Response.redirect(new URL('checkout' in body ? '/checkout' : '/cart', req.url), 303);
}
