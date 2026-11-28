/**
 * Cart writes in one place: every call goes to the backend REST API and every answer is checked with Zod.
 * Used by the Shopify AJAX cart shims (src/app/(store)/cart/*.js, src/cart/*) and the demo checkout.
 */
import type { z } from 'zod';
import { backendFetch } from './backend';
import { apiErrorSchema, cartAddSchema, cartSchema, orderSchema } from './schemas';
import type { Cart, CartLine, Order } from './types';

/** A refused cart change: `description` is shown to the visitor, `status` is the HTTP status */
export class CartStoreError extends Error {
  constructor(
    public description: string,
    public status = 422,
  ) {
    super(description);
  }
}

async function call<S extends z.ZodType>(method: string, pathname: string, schema: S, body?: unknown): Promise<z.infer<S>> {
  const res = await backendFetch(pathname, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data: unknown = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = apiErrorSchema.safeParse(data);
    const m = error.success ? (error.data.message ?? error.data.error) : undefined;
    throw new CartStoreError(Array.isArray(m) ? m.join(', ') : m || `Cart error (${res.status})`, res.status);
  }
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[backend] ${method} ${pathname}: the answer does not match the contract`, result.error.issues.slice(0, 5));
    throw new CartStoreError('The cart could not be updated. Please try again.', 502);
  }
  return result.data;
}

const enc = encodeURIComponent;

export interface OrderInput {
  customer: { email: string; firstName?: string; lastName?: string; phone?: string };
  shippingAddress: Record<string, string>;
}

export const cartStore = {
  get: (id: string): Promise<Cart> => call('GET', `/cart/${enc(id)}`, cartSchema),

  add: (id: string, variantId: number, quantity = 1): Promise<{ cart: Cart; line: CartLine }> =>
    call('POST', `/cart/${enc(id)}/items`, cartAddSchema, { variantId, quantity }),

  /** key = a line key or a variant id; quantity 0 removes the line */
  setQuantity: (id: string, key: string, quantity: number): Promise<Cart> =>
    call('PATCH', `/cart/${enc(id)}/items/${enc(key)}`, cartSchema, { quantity }),

  setNote: (id: string, note: string): Promise<Cart> => call('PUT', `/cart/${enc(id)}/note`, cartSchema, { note }),

  addDiscount: (id: string, code: string): Promise<Cart> => call('POST', `/cart/${enc(id)}/discounts`, cartSchema, { code }),

  removeDiscount: (id: string, code: string): Promise<Cart> => call('DELETE', `/cart/${enc(id)}/discounts/${enc(code)}`, cartSchema),

  /** Replaces every attribute (name → text). The caller merges: see setAttributes in src/cart/shopify.ts */
  setAttributes: (id: string, attributes: Record<string, string>): Promise<Cart> =>
    call('PUT', `/cart/${enc(id)}/attributes`, cartSchema, { attributes }),

  clear: (id: string): Promise<Cart> => call('DELETE', `/cart/${enc(id)}`, cartSchema),

  /** Demo checkout: the backend creates the order and empties the cart */
  placeOrder: (id: string, input: OrderInput): Promise<Order> => call('POST', '/orders', orderSchema, { cartId: id, ...input }),

  /** One order by its public id ("ORO-1001"); null when there is none */
  async order(orderId: string): Promise<Order | null> {
    try {
      return await call('GET', `/orders/${enc(orderId)}`, orderSchema);
    } catch (error) {
      if (error instanceof CartStoreError && error.status === 404) return null;
      throw error;
    }
  },
};
