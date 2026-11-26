/**
 * Shopify cart permalink: GET /cart/<variantId>:<qty>[,<variantId>:<qty>...] (the product cards' BUY
 * links). Adds those items to the visitor's cart (through src/lib/cart-store.ts, so API_URL is respected)
 * and goes to checkout. Static siblings (add.js, change, ...) win over this dynamic segment.
 */
import type { NextRequest } from 'next/server';
import { addItems } from '@/cart/shopify';
import { cartIdFrom } from '@/cart/request';

export async function GET(req: NextRequest, { params }: { params: Promise<{ items: string }> }) {
  const raw = decodeURIComponent((await params).items);
  const items = raw
    .split(',')
    .map((part) => {
      const [id, qty] = part.split(':');
      return { id: Number(id), quantity: Number(qty || 1) };
    })
    .filter((i) => Number.isInteger(i.id) && i.id > 0);
  if (!items.length) return Response.redirect(new URL('/cart', req.url), 303);
  try {
    await addItems(await cartIdFrom(), items);
  } catch {
    // sold out / unknown variant: show the cart instead
    return Response.redirect(new URL('/cart', req.url), 303);
  }
  return Response.redirect(new URL('/checkout', req.url), 303);
}
