/**
 * Cart writes in one place. With API_URL set, every call goes to the backend REST API (API-CONTRACT.md
 * §10–15, §18); without it the local mock (src/lib/db.ts) answers. Same shapes either way.
 * Used by the Shopify AJAX cart shims (src/app/(store)/cart/*.js, src/cart/*) and the demo checkout.
 */
import { db, findVariant } from './db';
import type { Cart, CartLine } from './types';

const API = process.env.API_URL;

/** A refused cart change: `description` is shown to the visitor, `status` is the HTTP status */
export class CartStoreError extends Error {
  constructor(
    public description: string,
    public status = 422,
  ) {
    super(description);
  }
}

async function call<T>(method: string, pathname: string, body?: unknown): Promise<T> {
  const res = await fetch(API + pathname, {
    method,
    cache: 'no-store',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const m = (data as { message?: unknown; description?: unknown }).description ?? (data as { message?: unknown }).message;
    throw new CartStoreError(Array.isArray(m) ? m.join(', ') : String(m || `Cart error (${res.status})`), res.status);
  }
  return data as T;
}

const enc = encodeURIComponent;

/** Local mock: the stock rules the backend applies (404 unknown variant, 422 sold out / above stock) */
function checkStock(id: string, variantId: number, quantity: number, existing = true) {
  const found = findVariant(variantId);
  if (!found) throw new CartStoreError('Cannot find variant', 404);
  if (!found.variant.available) throw new CartStoreError(`${found.product.title} is sold out.`);
  const inCart = existing ? (db.cart(id).lines.find((l) => l.variantId === variantId)?.quantity ?? 0) : 0;
  if (found.variant.inventory && inCart + quantity > found.variant.inventory) {
    throw new CartStoreError(`You can only add ${found.variant.inventory} ${found.product.title} to the cart.`);
  }
}

export interface OrderInput {
  customer: { email: string; firstName?: string; lastName?: string; phone?: string };
  shippingAddress: Record<string, string>;
}
export interface Order {
  id: string;
  cartId: string;
  itemCount: number;
  subtotal: number;
  customer: { email: string };
}

export const cartStore = {
  get: (id: string): Promise<Cart> => (API ? call<Cart>('GET', `/cart/${enc(id)}`) : Promise.resolve(db.cart(id))),

  async add(id: string, variantId: number, quantity = 1): Promise<{ cart: Cart; line: CartLine }> {
    if (API) return call('POST', `/cart/${enc(id)}/items`, { variantId, quantity });
    checkStock(id, variantId, quantity);
    return db.addToCart(id, variantId, quantity);
  },

  /** key = a line key or a variant id; quantity 0 removes the line */
  async setQuantity(id: string, key: string, quantity: number): Promise<Cart> {
    if (API) return call('PATCH', `/cart/${enc(id)}/items/${enc(key)}`, { quantity });
    const line = db.cart(id).lines.find((l) => l.key === key || String(l.variantId) === key);
    if (!line) throw new CartStoreError('Cannot find the line item', 404);
    if (quantity > line.quantity) checkStock(id, line.variantId, quantity, false);
    return db.updateLine(id, line.key, quantity);
  },

  setNote: (id: string, note: string): Promise<Cart> =>
    API ? call('PUT', `/cart/${enc(id)}/note`, { note }) : Promise.resolve(db.setNote(id, note)),

  addDiscount: (id: string, code: string): Promise<Cart> =>
    API ? call('POST', `/cart/${enc(id)}/discounts`, { code }) : Promise.resolve(db.applyDiscount(id, code)),

  clear: (id: string): Promise<Cart> => (API ? call('DELETE', `/cart/${enc(id)}`) : Promise.resolve(db.clearCart(id))),

  /** Mock checkout: creates the order and empties the cart */
  async placeOrder(id: string, input: OrderInput): Promise<Order> {
    if (API) return call('POST', '/orders', { cartId: id, ...input });
    const cart = db.cart(id);
    if (!cart.lines.length) throw new CartStoreError('The cart is empty', 400);
    const order = { id: `ORO-${String(Date.now()).slice(-4)}`, cartId: id, itemCount: cart.itemCount, subtotal: cart.subtotal, customer: { email: input.customer.email } };
    db.clearCart(id);
    return order;
  },
};
