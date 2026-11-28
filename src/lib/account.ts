/**
 * The signed-in customer's data, from the backend's account endpoints. Never cached: every call is for one
 * visitor (backendFetch). Every answer is checked with Zod.
 *
 * `account.*` are the raw backend calls. `loadAccountData()` gathers what the account pages show and turns it
 * into display values (dates and money in the site's locale), so src/sections/account.tsx only lays it out.
 */
import { cache } from 'react';
import { z } from 'zod';
import { api, parseAnswer } from './api';
import { backendFetch } from './backend';
import { longDate, siteFormat } from './format';
import { cartLineSchema } from './schemas';
import type { Product } from './types';

const money = z.number().int();

export const customerSchema = z.looseObject({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  /** YYYY-MM-DD */
  birthday: z.string().nullable(),
  /** Year */
  memberSince: z.number().int(),
  rewards: z.looseObject({
    tier: z.string(),
    points: z.number().int(),
    nextTier: z.string().nullable(),
    pointsToNext: z.number().int().nullable(),
  }),
});

const addressSchema = z.looseObject({
  id: z.number().int(),
  label: z.string(),
  isDefault: z.boolean(),
  name: z.string(),
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

const paymentMethodSchema = z.looseObject({
  id: z.number().int(),
  brand: z.string(),
  last4: z.string(),
  name: z.string(),
  expMonth: z.number().int(),
  expYear: z.number().int(),
  isDefault: z.boolean(),
});

export const ORDER_STATUSES = ['pending', 'processing', 'in-transit', 'delivered'] as const;

export const orderDetailSchema = z.looseObject({
  /** Public order id: "ORO-2026-0742" */
  id: z.string(),
  cartId: z.string(),
  status: z.enum(ORDER_STATUSES),
  /** ISO timestamp */
  createdAt: z.string(),
  customer: z.looseObject({ email: z.string() }),
  lines: z.array(cartLineSchema),
  itemCount: z.number().int(),
  subtotal: money,
  discount: money,
  giftWrap: money,
  shipping: money,
  tax: money,
  total: money,
  trackingNumber: z.string().nullable(),
  /** YYYY-MM-DD */
  estimatedDelivery: z.string().nullable(),
  /** ISO timestamp */
  deliveredAt: z.string().nullable(),
});
export type OrderDetail = z.infer<typeof orderDetailSchema>;

const subscriptionSchema = z.looseObject({
  id: z.number().int(),
  productHandle: z.string(),
  name: z.string(),
  intervalDays: z.number().int(),
  /** YYYY-MM-DD */
  nextDeliveryOn: z.string(),
  price: money,
});

const wishlistItemSchema = z.looseObject({ productHandle: z.string(), badge: z.string().nullable() });

const preferenceSchema = z.looseObject({ id: z.string(), title: z.string(), text: z.string(), enabled: z.boolean() });

const rewardsSchema = z.looseObject({
  tier: z.string(),
  points: z.number().int(),
  nextTier: z.string().nullable(),
  pointsToNext: z.number().int().nullable(),
  tiers: z.array(
    z.looseObject({
      name: z.string(),
      minPoints: z.number().int(),
      maxPoints: z.number().int().nullable(),
      perk: z.string(),
      active: z.boolean(),
    }),
  ),
  /** date = YYYY-MM-DD; points below 0 = redeemed */
  activity: z.array(z.looseObject({ date: z.string(), text: z.string(), points: z.number().int() })),
});

async function get<S extends z.ZodType>(pathname: string, schema: S): Promise<z.infer<S>> {
  return parseAnswer(await backendFetch(pathname), pathname, schema);
}
async function getOrNull<S extends z.ZodType>(pathname: string, schema: S): Promise<z.infer<S> | null> {
  const res = await backendFetch(pathname);
  return res.status === 404 ? null : parseAnswer(res, pathname, schema);
}

const enc = encodeURIComponent;

export const account = {
  /** The customer the demo login signs in as */
  demoCustomer: () => get('/customers/demo', customerSchema),
  customer: (id: string) => getOrNull(`/customers/${enc(id)}`, customerSchema),
  addresses: (id: string) => get(`/customers/${enc(id)}/addresses`, addressSchema.array()),
  paymentMethods: (id: string) => get(`/customers/${enc(id)}/payment-methods`, paymentMethodSchema.array()),
  orders: (id: string) => get(`/customers/${enc(id)}/orders`, orderDetailSchema.array()),
  /** Any order by its public id ("ORO-2026-0742", letter case and a leading # ignored); null when there is none */
  order: (orderId: string) => getOrNull(`/orders/${enc(orderId.trim())}`, orderDetailSchema),
  subscriptions: (id: string) => get(`/customers/${enc(id)}/subscriptions`, subscriptionSchema.array()),
  wishlist: (id: string) => get(`/customers/${enc(id)}/wishlist`, wishlistItemSchema.array()),
  recentlyViewed: (id: string) => get(`/customers/${enc(id)}/recently-viewed`, z.array(z.string())),
  preferences: (id: string) => get(`/customers/${enc(id)}/preferences`, preferenceSchema.array()),
  rewards: (id: string) => get(`/customers/${enc(id)}/rewards`, rewardsSchema),
};

// ---------------------------------------------------------------- what the account pages show

export type OrderStatus = 'processing' | 'in-transit' | 'delivered';

export const statusLabel: Record<OrderStatus, string> = {
  processing: 'Processing',
  'in-transit': 'In transit',
  delivered: 'Delivered',
};

/** One line of an order as the pages show it. `product` is the order's own copy (title, image, price at that time). */
export interface OrderLineView {
  handle: string;
  qty: number;
  size?: string;
  product: { title: string; price: number; type: string; images: { src: string }[] };
}

export interface OrderView {
  id: string;
  /** "#ORO-2026-0742" */
  number: string;
  /** "June 28, 2026" */
  date: string;
  status: OrderStatus;
  /** "Delivered June 30, 2026" / "Arrives July 15, 2026" / "Being prepared" */
  statusNote: string;
  lines: OrderLineView[];
  subtotal: number;
  discount: number;
  giftWrap: number;
  shipping: number;
  tax: number;
  total: number;
  tracking: string;
  /** "July 15, 2026", or "" when there is no date yet */
  eta: string;
}

function toOrderView(o: OrderDetail, products: Map<string, Product>): OrderView {
  // A new checkout order ("pending") is shown as being prepared.
  const status: OrderStatus = o.status === 'pending' ? 'processing' : o.status;
  const eta = o.status === 'delivered' && o.deliveredAt ? longDate(o.deliveredAt) : o.estimatedDelivery ? longDate(o.estimatedDelivery) : '';
  const statusNote = status === 'delivered' ? `Delivered ${eta}`.trim() : status === 'in-transit' && eta ? `Arrives ${eta}` : 'Being prepared';
  return {
    id: o.id,
    number: `#${o.id}`,
    date: longDate(o.createdAt),
    status,
    statusNote,
    lines: o.lines.map((l) => ({
      handle: l.productHandle,
      qty: l.quantity,
      size: l.variantTitle ?? undefined,
      product: {
        title: l.title,
        price: l.price,
        type: products.get(l.productHandle)?.type ?? '',
        images: [{ src: l.image ?? products.get(l.productHandle)?.images[0]?.src ?? '' }],
      },
    })),
    subtotal: o.subtotal,
    discount: o.discount,
    giftWrap: o.giftWrap,
    shipping: o.shipping,
    tax: o.tax,
    total: o.total,
    tracking: o.trackingNumber ?? '',
    eta,
  };
}

const initialsOf = (first: string, last: string) => `${first.slice(0, 1)}${last.slice(0, 1)}`.toUpperCase();
const count = (n: number) => n.toLocaleString(siteFormat().locale);

/** Everything the signed-in account pages show, for one customer. One request per kind of data, all at once. */
export async function loadAccountData(customerId: string, extraHandles: string[] = []) {
  const [customer, addresses, cards, orders, subscriptions, wishlist, recentlyViewed, preferences, rewards] = await Promise.all([
    account.customer(customerId),
    account.addresses(customerId),
    account.paymentMethods(customerId),
    account.orders(customerId),
    account.subscriptions(customerId),
    account.wishlist(customerId),
    account.recentlyViewed(customerId),
    account.preferences(customerId),
    account.rewards(customerId),
  ]);
  if (!customer) return null;

  // The products these lists point to, in one cached catalogue read
  const handles = new Set([
    ...subscriptions.map((s) => s.productHandle),
    ...wishlist.map((w) => w.productHandle),
    ...recentlyViewed,
    ...orders.flatMap((o) => o.lines.map((l) => l.productHandle)),
    ...extraHandles,
  ]);
  const products = await productMap([...handles]);
  const day = (iso: string) => longDate(iso, { year: 'numeric', month: 'short', day: 'numeric' });

  return {
    customer: {
      name: `${customer.firstName} ${customer.lastName}`.trim(),
      initials: initialsOf(customer.firstName, customer.lastName),
      email: customer.email,
      phone: customer.phone,
      birthday: customer.birthday ?? '',
      tier: rewards.tier,
      since: String(customer.memberSince),
      points: rewards.points,
      nextTier: rewards.nextTier ?? '',
      pointsToNext: rewards.pointsToNext ?? 0,
    },
    orders: orders.map((o) => toOrderView(o, products)),
    subscriptions: subscriptions.map((s) => ({
      handle: s.productHandle,
      name: s.name,
      every: `Every ${s.intervalDays} days`,
      next: day(s.nextDeliveryOn),
      price: s.price,
    })),
    wishlist: wishlist.map((w) => ({ handle: w.productHandle, badge: w.badge ?? '' })),
    recentlyViewed,
    addresses: addresses.map((a) => ({
      id: String(a.id),
      label: a.label,
      isDefault: a.isDefault,
      lines: [a.name, [a.line1, a.line2, a.city].filter(Boolean).join(', '), `${a.region} ${a.postalCode}, ${a.country}`],
    })),
    cards: cards.map((c) => ({
      id: String(c.id),
      brand: c.brand,
      last: c.last4,
      name: c.name,
      expires: `${String(c.expMonth).padStart(2, '0')} / ${String(c.expYear).slice(-2)}`,
      isDefault: c.isDefault,
    })),
    preferenceList: preferences.map((p) => ({ id: p.id, title: p.title, text: p.text, on: p.enabled })),
    rewards: {
      tiers: rewards.tiers.map((t) => ({
        name: t.name,
        minPoints: t.minPoints,
        range: t.maxPoints == null ? `${count(t.minPoints)}+ pts` : `${count(t.minPoints)} — ${count(t.maxPoints)} pts`,
        perk: t.perk,
        active: t.active,
      })),
      activity: rewards.activity.map((a) => ({ date: longDate(a.date, { day: 'numeric', month: 'short' }), text: a.text, pts: a.points })),
    },
    products,
  };
}
export type AccountData = NonNullable<Awaited<ReturnType<typeof loadAccountData>>>;

/** Products by handle (a cached catalogue read); handles that no longer exist are simply missing. */
export async function productMap(handles: string[]): Promise<Map<string, Product>> {
  const list = handles.length ? await api.products(handles) : [];
  return new Map(list.map((p) => [p.handle, p]));
}

/** One order for the order pages (order details, track order): any order by its public id. */
export async function loadOrderView(orderId: string): Promise<OrderView | null> {
  const order = await account.order(orderId);
  if (!order) return null;
  return toOrderView(order, await productMap(order.lines.map((l) => l.productHandle)));
}

/**
 * A per-request box for the account data, so the many small view functions in src/sections/account.tsx can
 * read it without it being passed through every one of them. React's cache() gives one box per page render.
 */
export const accountBox = cache((): { data: AccountData | null } => ({ data: null }));
