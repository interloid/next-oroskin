/**
 * Data access for server components. Every call goes to the NestJS backend (API_URL) and every answer is
 * checked with Zod (src/lib/schemas.ts) before a section sees it.
 * - Shared content (site, pages, products, collections, articles) is cached and tagged: backendRead().
 * - A visitor's own data (the cart) is asked for on every request: backendFetch().
 * A 404 is `null`; any other failure throws (the route's error page shows).
 */
import { cookies } from 'next/headers';
import type { z } from 'zod';
import { backendFetch, backendRead, requestIdOf } from './backend';
import { tags } from './cache-tags';
import { REQUEST_ID_HEADER } from './request-id';
import {
  articleSchema,
  cartSchema,
  collectionPageSchema,
  collectionSchema,
  pageContentSchema,
  productSchema,
  siteSchema,
} from './schemas';
import type { CollectionQuery } from './types';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Parses an answer; a mismatch names the path and the first fields that are wrong. */
export async function parseAnswer<S extends z.ZodType>(res: Response, pathname: string, schema: S): Promise<z.infer<S>> {
  const id = requestIdOf(res) || res.headers.get(REQUEST_ID_HEADER) || 'unknown';
  if (!res.ok) throw new ApiError(`API ${pathname}: ${res.status} (request id ${id})`, res.status);
  const result = schema.safeParse(await res.json());
  if (!result.success) {
    const issues = result.error.issues.slice(0, 5).map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`);
    throw new ApiError(`API ${pathname}: the answer does not match the contract (${issues.join('; ')}) (request id ${id})`, 502);
  }
  return result.data;
}

/** Shared, cached GET. 404 → null. */
async function read<S extends z.ZodType>(pathname: string, schema: S, cacheTags: string[]): Promise<z.infer<S> | null> {
  const res = await backendRead(pathname, cacheTags);
  if (res.status === 404) return null;
  return parseAnswer(res, pathname, schema);
}

/** The same, for answers that are never a 404 (lists, the site). */
async function readAll<S extends z.ZodType>(pathname: string, schema: S, cacheTags: string[]): Promise<z.infer<S>> {
  return parseAnswer(await backendRead(pathname, cacheTags), pathname, schema);
}

function toQuery(o: object) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(o)) if (v != null && v !== '') p.set(k, Array.isArray(v) ? v.join(',') : String(v));
  const text = p.toString();
  return text ? `?${text}` : '';
}

const enc = encodeURIComponent;
const productList = productSchema.array();

export const CART_COOKIE = 'oro_cart';
export async function cartId() {
  return (await cookies()).get(CART_COOKIE)?.value ?? 'anonymous';
}

export const api = {
  site: () => readAll('/site', siteSchema, [tags.site]),
  page: (slug: string) => read(`/pages/${enc(slug)}`, pageContentSchema, [tags.pages, tags.page(slug)]),
  products: (handles?: string[], limit?: number) => readAll(`/products${toQuery({ handles, limit })}`, productList, [tags.products]),
  search: (q: string) => readAll(`/products${toQuery({ q })}`, productList, [tags.products]),
  product: (handle: string) => read(`/products/${enc(handle)}`, productSchema, [tags.products, tags.product(handle)]),
  recommendations: (handle: string, limit = 4) =>
    readAll(`/products/${enc(handle)}/recommendations?limit=${limit}`, productList, [tags.products]),
  collections: () => readAll('/collections', collectionSchema.array(), [tags.collections]),
  collection: (handle: string, query: CollectionQuery = {}) =>
    read(`/collections/${enc(handle)}${toQuery(query)}`, collectionPageSchema, [tags.collections, tags.collection(handle), tags.products]),
  articles: (opts: { tag?: string; limit?: number } = {}) => readAll(`/articles${toQuery(opts)}`, articleSchema.array(), [tags.articles]),
  article: (handle: string) => read(`/articles/${enc(handle)}`, articleSchema, [tags.articles, tags.article(handle)]),
  /** The visitor's cart: never cached */
  cart: async () => {
    const pathname = `/cart/${enc(await cartId())}`;
    return parseAnswer(await backendFetch(pathname), pathname, cartSchema);
  },
};
