/**
 * POST /checkout/place-order (the demo checkout form): the backend creates the order from the cart and
 * empties it (src/lib/cart-store.ts), then the thank-you page shows that order.
 * An empty cart goes back to the cart page; a refusal goes back to the form with the backend's reason.
 */
import type { NextRequest } from 'next/server';
import { CartStoreError, cartStore } from '@/lib/cart-store';
import { cartIdFrom, readBody } from '@/cart/request';

export async function POST(req: NextRequest) {
  const id = await cartIdFrom();
  const body = await readBody(req);
  const s = (k: string) => (typeof body[k] === 'string' ? (body[k] as string).trim() : '');
  const to = (pathname: string, query: Record<string, string> = {}) => {
    const url = new URL(pathname, req.url);
    for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
    return Response.redirect(url, 303);
  };

  if ((await cartStore.get(id)).itemCount === 0) return to('/cart');
  try {
    const order = await cartStore.placeOrder(id, {
      customer: { email: s('email'), firstName: s('first_name'), lastName: s('last_name'), phone: s('phone') },
      shippingAddress: {
        firstName: s('first_name'),
        lastName: s('last_name'),
        address1: s('address'),
        city: s('city'),
        zip: s('zip'),
        country: s('country'),
        phone: s('phone'),
      },
    });
    return to('/checkout/thank-you', { order: order.id });
  } catch (error) {
    // 4xx: the backend says what is wrong with the order. Anything else: a general message.
    const reason = error instanceof CartStoreError && error.status < 500 ? error.message : '1';
    return to('/checkout', { error: reason });
  }
}
