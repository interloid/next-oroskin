/**
 * POST /checkout/place-order (the demo checkout form): creates the order through src/lib/cart-store.ts
 * (POST {API_URL}/orders with API_URL, else the local mock), which empties the cart; then the thank-you page.
 */
import type { NextRequest } from 'next/server';
import { cartStore } from '@/lib/cart-store';
import { cartIdFrom, readBody } from '@/cart/request';
import { cartJson, extras } from '@/cart/shopify';

export async function POST(req: NextRequest) {
  const id = await cartIdFrom();
  const body = await readBody(req);
  const s = (k: string) => (typeof body[k] === 'string' ? (body[k] as string).trim() : '');
  const cart = await cartJson(id);
  if (cart.item_count > 0) {
    try {
      const order = await cartStore.placeOrder(id, {
        customer: { email: s('email'), firstName: s('first_name'), lastName: s('last_name'), phone: s('phone') },
        shippingAddress: {
          firstName: s('first_name'),
          lastName: s('last_name'),
          address1: s('address'),
          city: s('city'),
          zip: s('zip'),
          country: s('country') || 'IN',
          phone: s('phone'),
        },
      });
      const e = extras(id);
      e.lastOrder = { number: order.id, email: s('email'), total: cart.total_price, itemCount: cart.item_count };
      e.attributes = {};
      e.codes = undefined;
    } catch {
      return Response.redirect(new URL('/checkout?error=1', req.url), 303);
    }
  }
  return Response.redirect(new URL('/checkout/thank-you', req.url), 303);
}
