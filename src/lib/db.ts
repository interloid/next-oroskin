/**
 * Mock backend: the same behaviour the NestJS API implements, on local JSON files.
 * Used by the /api route handlers and, when API_URL is not set, by src/lib/api.ts.
 */
import fs from 'node:fs';
import path from 'node:path';
import products from '@/data/products.json';
import collections from '@/data/collections.json';
import articles from '@/data/articles.json';
import site from '@/data/site.json';
import type { Article, Cart, CartLine, Collection, CollectionPage, Filter, PageContent, Product, Site } from './types';

const P = products as Product[];
const C = collections as Collection[];
const A = articles as Article[];

export interface CollectionQuery {
  sort?: string;
  page?: number;
  pageSize?: number;
  type?: string[];
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export const db = {
  site: () => site as Site,

  page(slug: string): PageContent | null {
    const file = path.join(process.cwd(), 'src/data/pages', `${slug}.json`);
    return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, 'utf8')) as PageContent) : null;
  },

  products(opts: { handles?: string[]; q?: string; limit?: number } = {}): Product[] {
    let list = P;
    if (opts.handles) list = opts.handles.map((h) => P.find((p) => p.handle === h)).filter(Boolean) as Product[];
    if (opts.q) {
      const q = opts.q.toLowerCase();
      list = list.filter((p) => [p.title, p.type, p.subtitle, ...p.tags].join(' ').toLowerCase().includes(q));
    }
    return opts.limit ? list.slice(0, opts.limit) : list;
  },

  product: (handle: string) => P.find((p) => p.handle === handle) ?? null,

  recommendations(handle: string, limit = 4): Product[] {
    const p = P.find((x) => x.handle === handle);
    const same = P.filter((x) => x.handle !== handle && x.type === p?.type && x.images.length);
    const rest = P.filter((x) => x.handle !== handle && x.type !== p?.type && x.images.length);
    return [...same, ...rest].slice(0, limit);
  },

  collections: () => C,

  collection(handle: string, q: CollectionQuery = {}): CollectionPage | null {
    const c = C.find((x) => x.handle === handle);
    if (!c) return null;
    const all = db.products({ handles: c.productHandles });
    let list = all;
    if (q.type?.length) list = list.filter((p) => q.type!.includes(p.type));
    if (q.available) list = list.filter((p) => p.available);
    if (q.minPrice != null) list = list.filter((p) => p.price >= q.minPrice!);
    if (q.maxPrice != null) list = list.filter((p) => p.price <= q.maxPrice!);
    const sorters: Record<string, (a: Product, b: Product) => number> = {
      'price-ascending': (a, b) => a.price - b.price,
      'price-descending': (a, b) => b.price - a.price,
      'title-ascending': (a, b) => a.title.localeCompare(b.title),
      'title-descending': (a, b) => b.title.localeCompare(a.title),
    };
    if (q.sort && sorters[q.sort]) list = [...list].sort(sorters[q.sort]);
    const pageSize = q.pageSize ?? 24;
    const page = Math.max(1, q.page ?? 1);
    const types = [...new Set(all.map((p) => p.type))];
    const prices = all.map((p) => p.price);
    const filters: Filter[] = [
      {
        id: 'type',
        label: 'Product type',
        type: 'list',
        values: types.map((t) => ({ value: t, label: t, count: all.filter((p) => p.type === t).length, active: !!q.type?.includes(t) })),
      },
      {
        id: 'availability',
        label: 'Availability',
        type: 'list',
        values: [{ value: '1', label: 'In stock', count: all.filter((p) => p.available).length, active: !!q.available }],
      },
      { id: 'price', label: 'Price', type: 'price_range', min: Math.min(...prices), max: Math.max(...prices) },
    ];
    return { ...c, products: list.slice((page - 1) * pageSize, page * pageSize), total: list.length, page, pageSize, filters };
  },

  articles(opts: { tag?: string; limit?: number } = {}): Article[] {
    let list = A;
    if (opts.tag) list = list.filter((a) => a.tags.map((t) => t.toLowerCase()).includes(opts.tag!.toLowerCase()));
    return opts.limit ? list.slice(0, opts.limit) : list;
  },
  article: (handle: string) => A.find((a) => a.handle === handle) ?? null,

  // ---- cart (in memory, keyed by the cart cookie; the real backend stores it) ----
  cart(id: string): Cart {
    return carts.get(id) ?? empty(id);
  },
  addToCart(id: string, variantId: number, quantity = 1): { cart: Cart; line: CartLine } {
    const cart = structuredClone(db.cart(id));
    const found = findVariant(variantId);
    if (!found) throw new Error('Variant not found');
    const { product, variant } = found;
    const existing = cart.lines.find((l) => l.variantId === variantId);
    if (existing) existing.quantity += quantity;
    else
      cart.lines.push({
        key: `${variantId}:${Math.random().toString(36).slice(2, 8)}`,
        variantId,
        productHandle: product.handle,
        title: product.title,
        variantTitle: product.options.length ? variant.title : null,
        image: variant.image ?? product.images[0]?.src ?? null,
        quantity,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        lineTotal: 0,
      });
    const saved = save(cart);
    return { cart: saved, line: saved.lines.find((l) => l.variantId === variantId)! };
  },
  /** key = a line key or a variant id (the theme's cart JS sends either). quantity 0 removes the line. */
  updateLine(id: string, key: string, quantity: number): Cart {
    const cart = structuredClone(db.cart(id));
    cart.lines = cart.lines
      .map((l) => (l.key === key || String(l.variantId) === key ? { ...l, quantity } : l))
      .filter((l) => l.quantity > 0);
    return save(cart);
  },
  setNote(id: string, note: string): Cart {
    return save({ ...structuredClone(db.cart(id)), note });
  },
  applyDiscount(id: string, code: string): Cart {
    const cart = structuredClone(db.cart(id));
    if (!cart.discountCodes.some((d) => d.code === code)) cart.discountCodes.push({ code, applicable: code.toUpperCase() === 'GLOW10' });
    return save(cart);
  },
  clearCart: (id: string) => save(empty(id)),
};

const store = globalThis as { __oroCarts?: Map<string, Cart> };
const carts: Map<string, Cart> = (store.__oroCarts ??= new Map());

function empty(id: string): Cart {
  return { id, lines: [], itemCount: 0, subtotal: 0, discountCodes: [], note: '', currency: (site as Site).currency };
}
function save(cart: Cart): Cart {
  cart.lines.forEach((l) => (l.lineTotal = l.price * l.quantity));
  cart.itemCount = cart.lines.reduce((n, l) => n + l.quantity, 0);
  cart.subtotal = cart.lines.reduce((n, l) => n + l.lineTotal, 0);
  carts.set(cart.id, cart);
  return cart;
}
export function findVariant(variantId: number) {
  for (const product of P) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}
