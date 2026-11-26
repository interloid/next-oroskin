import { db } from '@/lib/db';
import type { CartLine, Money } from '@/lib/types';
import { checkCartId } from '../_lib/cart';
import { badRequest, isEmail, isText, json, readBody } from '../_lib/http';

export const dynamic = 'force-dynamic';

/** Mock order (see API-CONTRACT.md → Order). Payment is out of scope for the demo. */
interface Order {
  id: string;
  cartId: string;
  status: 'pending';
  createdAt: string;
  customer: { email: string; firstName?: string; lastName?: string; phone?: string };
  shippingAddress: Record<string, string>;
  lines: CartLine[];
  itemCount: number;
  subtotal: Money;
  discountCodes: { code: string; applicable: boolean }[];
  note: string;
  currency: string;
}

const store = globalThis as { __oroOrders?: Map<string, Order> };
const orders: Map<string, Order> = (store.__oroOrders ??= new Map());

const ADDRESS_REQUIRED = ['firstName', 'lastName', 'address1', 'city', 'zip', 'country'];

/**
 * POST /api/orders  { cartId, customer: { email, ... }, shippingAddress: { firstName, lastName, address1, city, zip, country, ... } }
 * → 201 Order. The cart must have lines; it is emptied after the order is created.
 */
export async function POST(req: Request) {
  const body = await readBody(req);
  if (!body) return badRequest('Body must be a JSON object');
  const { cartId, customer, shippingAddress } = body as { cartId?: unknown; customer?: Record<string, unknown>; shippingAddress?: Record<string, unknown> };
  if (typeof cartId !== 'string') return badRequest('cartId is required');
  const bad = checkCartId(cartId);
  if (bad) return bad;
  if (!customer || typeof customer !== 'object' || !isEmail(customer.email)) return badRequest('customer.email is required');
  if (!shippingAddress || typeof shippingAddress !== 'object') return badRequest('shippingAddress is required');
  for (const k of ADDRESS_REQUIRED) if (!isText(shippingAddress[k], 200)) return badRequest(`shippingAddress.${k} is required`);
  for (const [k, v] of Object.entries({ ...customer, ...shippingAddress }))
    if (v != null && typeof v !== 'string') return badRequest(`${k} must be a string`);

  const cart = db.cart(cartId);
  if (!cart.lines.length) return badRequest('The cart is empty');

  const order: Order = {
    id: `ORO-${1000 + orders.size + 1}`,
    cartId,
    status: 'pending',
    createdAt: new Date().toISOString(),
    customer: customer as Order['customer'],
    shippingAddress: shippingAddress as Record<string, string>,
    lines: cart.lines,
    itemCount: cart.itemCount,
    subtotal: cart.subtotal,
    discountCodes: cart.discountCodes,
    note: cart.note,
    currency: cart.currency,
  };
  orders.set(order.id, order);
  db.clearCart(cartId);
  return json(order, 201);
}
