/** Mock data for the account demo pages (no real auth or backend). Prices are minor units, like the products. */
import { db } from '@/lib/db';

export type OrderStatus = 'processing' | 'in-transit' | 'delivered';

export const customer = {
  name: 'Alexandra Rose',
  initials: 'AR',
  email: 'alexandra.rose@example.com',
  phone: '+1 (555) 019-2834',
  birthday: '1992-04-18',
  tier: 'Gold',
  since: '2024',
  points: 1250,
  nextTier: 'Platinum',
  pointsToNext: 3750,
};

export interface OrderLine {
  handle: string;
  qty: number;
  size?: string;
}
export interface Order {
  id: string;
  number: string;
  date: string;
  status: OrderStatus;
  statusNote: string;
  lines: OrderLine[];
  discount: number;
  giftWrap: number;
  shipping: number;
  tax: number;
  tracking: string;
  eta: string;
}

export const orders: Order[] = [
  {
    id: 'ORO-2026-0742',
    number: '#ORO-2026-0742',
    date: 'June 28, 2026',
    status: 'delivered',
    statusNote: 'Delivered June 30, 2026',
    lines: [
      { handle: 'radiance-vitamin-c-serum', qty: 1, size: '30 ml' },
      { handle: 'rose-petal-toner', qty: 1, size: '100 ml' },
    ],
    discount: 1000,
    giftWrap: 500,
    shipping: 0,
    tax: 2100,
    tracking: '1Z999AA10123456784',
    eta: 'June 30, 2026',
  },
  {
    id: 'ORO-2026-0731',
    number: '#ORO-2026-0731',
    date: 'June 18, 2026',
    status: 'in-transit',
    statusNote: 'Arrives July 15, 2026',
    lines: [{ handle: 'hydra-glow-night-cream', qty: 1, size: '50 ml' }],
    discount: 0,
    giftWrap: 0,
    shipping: 0,
    tax: 1900,
    tracking: '1Z999AA10123456791',
    eta: 'July 15, 2026',
  },
  {
    id: 'ORO-2026-0718',
    number: '#ORO-2026-0718',
    date: 'May 30, 2026',
    status: 'processing',
    statusNote: 'Being prepared',
    lines: [
      { handle: 'pure-matte-lipstick', qty: 1 },
      { handle: 'kabuki-makeup-brush', qty: 2 },
    ],
    discount: 0,
    giftWrap: 0,
    shipping: 900,
    tax: 1100,
    tracking: '1Z999AA10123456802',
    eta: 'June 4, 2026',
  },
  {
    id: 'ORO-2026-0690',
    number: '#ORO-2026-0690',
    date: 'August 12, 2025',
    status: 'delivered',
    statusNote: 'Delivered August 15, 2025',
    lines: [{ handle: 'retinol-renewal-oil', qty: 1, size: '30 ml' }],
    discount: 0,
    giftWrap: 0,
    shipping: 0,
    tax: 2300,
    tracking: '1Z999AA10123456815',
    eta: 'August 15, 2025',
  },
];

export const statusLabel: Record<OrderStatus, string> = {
  processing: 'Processing',
  'in-transit': 'In transit',
  delivered: 'Delivered',
};

export function lineProducts(o: Order) {
  return o.lines
    .map((l) => ({ ...l, product: db.product(l.handle) }))
    .filter((l) => l.product) as (OrderLine & { product: NonNullable<ReturnType<typeof db.product>> })[];
}
export function orderTotals(o: Order) {
  const subtotal = lineProducts(o).reduce((s, l) => s + l.product.price * l.qty, 0);
  const total = subtotal - o.discount + o.giftWrap + o.shipping + o.tax;
  return { subtotal, total };
}
export function findOrder(id?: string) {
  const key = (id ?? '').replace(/^#/, '').trim().toLowerCase();
  return orders.find((o) => o.id.toLowerCase() === key);
}

export const subscriptions = [
  { handle: 'radiance-vitamin-c-serum', name: 'Radiance Ritual Set', every: 'Every 30 days', next: 'Sep 12, 2026', price: 14500 },
  { handle: 'rose-petal-toner', name: 'Rose Petal Serum Refill', every: 'Every 45 days', next: 'Aug 28, 2026', price: 6800 },
];

export const wishlist = [
  { handle: 'radiance-vitamin-c-serum', badge: 'Trending' },
  { handle: 'the-skin-moisturizer', badge: 'New' },
  { handle: 'rose-petal-toner', badge: 'New' },
];

export const recentlyViewed = ['kabuki-makeup-brush', 'skin-tint', 'rose-petal-toner', 'pure-matte-lipstick'];

export const addresses = [
  { id: 'home', label: 'Home', isDefault: true, lines: ['Alexandra Rose', '24 Willow Lane, New York', 'NY 10013, United States'] },
  { id: 'office', label: 'Office', isDefault: false, lines: ['Alexandra Rose', '24 Willow Lane, New York', 'NY 10013, United States'] },
];
export const cards = [
  { id: 'visa', brand: 'VISA', last: '2026', name: 'Alexandra Rose', expires: '09 / 29', isDefault: true },
  { id: 'mc', brand: 'MC', last: '2026', name: 'Alexandra Rose', expires: '09 / 29', isDefault: false },
];

export const preferenceList = [
  { id: 'orders', title: 'Order & delivery', text: 'Confirmation, dispatch and the last mile. Always on for orders in progress.', on: true },
  { id: 'letter', title: 'The monthly letter', text: 'One letter from the atelier: ingredients, rituals, people. Never more than once a month.', on: true },
  { id: 'stock', title: 'Back in stock', text: 'Only for pieces you have pinned to your moodboard.', on: true },
  { id: 'tips', title: 'Beauty tips & rituals', text: 'Weekly editorial content, skincare guides and expert advice.', on: false },
  { id: 'reviews', title: 'Product reviews', text: 'Reminders to review your recent purchases.', on: false },
  { id: 'subs', title: 'Subscription updates', text: 'Billing reminders, perk updates and membership changes.', on: true },
];

export const rewards = {
  tiers: [
    { name: 'Pearl', range: '0 — 999 pts', perk: 'Birthday minis, early letters', active: false },
    { name: 'Gold', range: '1,000 — 2,499 pts', perk: 'Free travel sizes, previews', active: true },
    { name: 'Champagne', range: '2,500+ pts', perk: 'Full sizes, first pour of ferments', active: false },
  ],
  steps: [
    { title: 'Spend, and earn', text: 'Five points for every dollar on the merchandise total. Points post the day your parcel leaves the atelier, not the day you order.' },
    { title: 'Watch the balance', text: 'Every point is logged here with its origin. Nothing is deducted without a line in the activity register below.' },
    { title: 'Redeem when ready', text: 'From 600 points you can trade for a travel size; 1,000 for a full-size piece. Redemptions arrive in your bag, ready to check out at zero.' },
    { title: 'Climb the tiers', text: 'At 1,000 lifetime points you enter Gold; at 2,500, Champagne. Tiers unlock privileges rather than discounts: access, not noise.' },
  ],
  earn: [
    { action: 'Every dollar spent', points: '5 pts', note: 'On the merchandise total, before delivery and after any promo code.' },
    { action: 'Writing a review', points: '100 pts', note: 'Once for pieces you have actually bought. Photographs earn another 50.' },
    { action: 'Completing your beauty profile', points: '150 pts', note: 'One-off. It also makes our recommendations far less generic.' },
    { action: 'A subscription delivery', points: '2x pts', note: 'Double points on every standing order, on top of the 10% saving.' },
    { action: 'Your birthday month', points: '250 pts', note: 'Automatic. Provided your date of birth is on file.' },
    { action: 'Introducing a friend', points: '500 pts', note: 'Paid when their first order ships. They receive 10% off.' },
  ],
  redeem: [
    { handle: 'pure-matte-lipstick', title: 'Velvet Rouge, full size', points: 1000, note: 'Worth $50 · Available now' },
    { handle: 'golden-hour-eyeshadow-palette', title: 'Velvet Rouge, travel size', points: 600, note: 'Worth $30 · Available now' },
    { handle: 'lash-lengthening-mascara', title: 'Velvet Rouge, deluxe', points: 1800, note: 'Worth $80 · Needs 550 more points' },
  ],
  activity: [
    { date: '6 Aug', text: 'Order ORO-2681-A shipped — 3 pieces', pts: 1200 },
    { date: '2 Aug', text: 'Review written for Lumière Renewal Serum', pts: 100 },
    { date: '29 Jul', text: 'Redeemed — Radiance Oil, travel size', pts: -600 },
    { date: '21 Jul', text: 'Subscription delivery — double points', pts: 590 },
    { date: '14 Jul', text: 'Beauty profile completed', pts: 150 },
    { date: '9 Jul', text: 'Birthday month gift', pts: 60 },
    { date: '2 Jul', text: 'Redeemed — Velvet Rouge, full size', pts: -260 },
  ],
};
