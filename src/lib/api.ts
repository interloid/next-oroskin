/**
 * Data access for server components. With API_URL set (e.g. http://localhost:4000/api) every call goes
 * to the NestJS backend; without it the local mock (src/lib/db.ts) answers. Same shapes either way.
 */
import { cookies } from 'next/headers';
import { db, type CollectionQuery } from './db';
import type { Article, Cart, Collection, CollectionPage, PageContent, Product, Site } from './types';

const API = process.env.API_URL;

async function get<T>(pathname: string, local: () => T): Promise<T> {
  if (!API) return local();
  const res = await fetch(API + pathname, { cache: 'no-store' });
  if (res.status === 404) return null as T;
  if (!res.ok) throw new Error(`API ${pathname}: ${res.status}`);
  return res.json() as Promise<T>;
}

function toQuery(o: object) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(o)) if (v != null && v !== '') p.set(k, Array.isArray(v) ? v.join(',') : String(v));
  return p.toString();
}

export const CART_COOKIE = 'oro_cart';
export async function cartId() {
  return (await cookies()).get(CART_COOKIE)?.value ?? 'anonymous';
}

export const api = {
  site: () => get<Site>('/site', db.site),
  page: (slug: string) => get<PageContent | null>(`/pages/${encodeURIComponent(slug)}`, () => db.page(slug)),
  products: (handles?: string[], limit?: number) =>
    get<Product[]>(`/products?${toQuery({ handles, limit })}`, () => db.products({ handles, limit })),
  search: (q: string) => get<Product[]>(`/products?${toQuery({ q })}`, () => db.products({ q })),
  product: (handle: string) => get<Product | null>(`/products/${encodeURIComponent(handle)}`, () => db.product(handle)),
  recommendations: (handle: string, limit = 4) =>
    get<Product[]>(`/products/${encodeURIComponent(handle)}/recommendations?limit=${limit}`, () => db.recommendations(handle, limit)),
  collections: () => get<Collection[]>('/collections', db.collections),
  collection: (handle: string, query: CollectionQuery = {}) =>
    get<CollectionPage | null>(`/collections/${encodeURIComponent(handle)}?${toQuery(query)}`, () => db.collection(handle, query)),
  articles: (opts: { tag?: string; limit?: number } = {}) => get<Article[]>(`/articles?${toQuery(opts)}`, () => db.articles(opts)),
  article: (handle: string) => get<Article | null>(`/articles/${encodeURIComponent(handle)}`, () => db.article(handle)),
  cart: async () => {
    const id = await cartId();
    return get<Cart>(`/cart/${encodeURIComponent(id)}`, () => db.cart(id));
  },
};
