/**
 * Labels on cached backend answers (src/lib/backend.ts backendRead). POST /api/revalidate with one of these
 * drops every cached answer that carries it, and the pages built from them are rebuilt on their next visit.
 * A list answer and a single answer share the group tag, so "products" refreshes everything about products.
 */
export const tags = {
  site: 'site',
  pages: 'pages',
  page: (slug: string) => `page:${slug}`,
  products: 'products',
  product: (handle: string) => `product:${handle}`,
  collections: 'collections',
  collection: (handle: string) => `collection:${handle}`,
  articles: 'articles',
  article: (handle: string) => `article:${handle}`,
} as const;

/** True for a tag this app uses (the group names, or `<kind>:<slug>`). */
export function isKnownTag(tag: string): boolean {
  return /^(site|pages|products|collections|articles)$/.test(tag) || /^(page|product|collection|article):[\w-]{1,200}$/.test(tag);
}
