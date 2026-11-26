/** GET /cart/change?id=<key>&quantity=0 (the remove links' href, no JS), also `line=`; back to the cart */
import type { NextRequest } from 'next/server';
import { cartStore } from '@/lib/cart-store';
import { setQuantity } from '@/cart/shopify';
import { cartIdFrom } from '@/cart/request';

async function handle(req: NextRequest) {
  const id = await cartIdFrom();
  const p = req.nextUrl.searchParams;
  try {
    let key = p.get('id') ?? '';
    if (!key && p.get('line')) key = (await cartStore.get(id)).lines[Number(p.get('line')) - 1]?.key ?? '';
    await setQuantity(id, key, Number(p.get('quantity') ?? 0));
  } catch {
    // unknown line: just show the cart
  }
  return Response.redirect(new URL('/cart', req.url), 303);
}
export const GET = handle;
export const POST = handle;
