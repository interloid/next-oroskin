/** POST /cart/add: the no-JS product form. Adds, then goes to the cart (Shopify does the same). */
import type { NextRequest } from 'next/server';
import { addItems } from '@/cart/shopify';
import { cartIdFrom, readBody } from '@/cart/request';
import { itemsFrom } from '@/cart/update';

export async function POST(req: NextRequest) {
  const id = await cartIdFrom();
  const body = await readBody(req);
  try {
    await addItems(id, itemsFrom(body));
  } catch {
    // Shopify shows its error page; the cart page is friendlier
  }
  return Response.redirect(new URL('/cart', req.url), 303);
}
