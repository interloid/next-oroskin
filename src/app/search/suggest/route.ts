/**
 * GET /search/suggest?q=…&section_id=predictive-search&resources[type]=…&resources[limit]=6
 * The header search popup's live results (theme JS <search-popup>). Same HTML as the theme's
 * sections/predictive-search.liquid, wrapped in <div id="shopify-section-predictive-search">.
 * Searches products, collections and articles through the backend.
 */
import { api } from '@/lib/api';
import { priceHtml } from '@/components/Price';
import { loadSiteFormat } from '@/lib/format';

export const dynamic = 'force-dynamic';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get('q') ?? '').trim();
  const sectionId = url.searchParams.get('section_id') ?? 'predictive-search';
  const types = (url.searchParams.get('resources[type]') ?? 'product,collection,article').split(',');
  const limit = Math.min(10, Number(url.searchParams.get('resources[limit]') ?? 6) || 6);
  const term = q.toLowerCase();

  loadSiteFormat(await api.site());
  const [products, collections, articles] = await Promise.all([
    types.includes('product') && q ? api.search(q) : Promise.resolve([]),
    types.includes('collection') && q ? api.collections() : Promise.resolve([]),
    types.includes('article') && q ? api.articles() : Promise.resolve([]),
  ]);
  const prods = products.slice(0, limit);
  const cols = collections.filter((c) => c.title.toLowerCase().includes(term)).slice(0, limit);
  const arts = articles
    .filter((a) => [a.title, a.excerpt, ...a.tags].join(' ').toLowerCase().includes(term))
    .slice(0, limit);
  const count = prods.length + cols.length + arts.length;
  const terms = esc(q);

  const link = (href: string, title: string, image: string | null, meta?: string) =>
    `<a class="search-link" href="${esc(href)}"><span class="search-link__media" aria-hidden="true">${
      image ? `<img src="${esc(image)}" alt="" width="112" height="112" loading="lazy" sizes="56px">` : esc(title.slice(0, 1).toUpperCase())
    }</span><span class="search-link__text"><span class="search-link__title">${esc(title)}</span>${
      meta ? `<span class="search-link__meta">${esc(meta)}</span>` : ''
    }</span></a>`;

  let html = `<div class="search-popup__matches"><p class="visually-hidden" aria-hidden="true" data-search-announce>${
    count === 0 ? 'No results' : count === 1 ? '1 result' : `${count} results`
  }</p>`;

  if (prods.length) {
    html += `<div class="search-popup__group"><h2 class="search-popup__heading" id="SearchProductsHeading">Products</h2><ul class="search-popup__products" role="list" aria-labelledby="SearchProductsHeading">`;
    for (const p of prods) {
      const img = p.images[0];
      html += `<li><a class="search-card" href="/products/${esc(p.handle)}"><div class="search-card__media">${
        img ? `<img src="${esc(img.src)}" alt="" width="164" height="164" loading="lazy" sizes="82px">` : ''
      }</div><div class="search-card__text">${p.type ? `<span class="search-card__category">${esc(p.type)}</span>` : ''}<span class="search-card__title">${esc(
        p.title,
      )}</span><div class="search-card__price">${priceHtml(p)}</div></div></a></li>`;
    }
    html += `</ul></div>`;
  }

  if (cols.length || arts.length) {
    html += `<div class="search-popup__link-groups">`;
    if (cols.length) {
      html += `<div class="search-popup__group"><h2 class="search-popup__heading" id="SearchCollectionsHeading">Collections</h2><ul class="search-popup__links" role="list" aria-labelledby="SearchCollectionsHeading">`;
      for (const c of cols) {
        const n = c.productHandles.length;
        html += `<li>${link(`/collections/${c.handle}`, c.title, c.image, `${n} ${n === 1 ? 'product' : 'products'}`)}</li>`;
      }
      html += `</ul></div>`;
    }
    if (arts.length) {
      html += `<div class="search-popup__group"><h2 class="search-popup__heading" id="SearchArticlesHeading">Articles</h2><ul class="search-popup__links" role="list" aria-labelledby="SearchArticlesHeading">`;
      for (const a of arts) {
        const date = new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        html += `<li>${link(`/blogs/featured/${a.handle}`, a.title, a.image, date)}</li>`;
      }
      html += `</ul></div>`;
    }
    html += `</div>`;
  }

  if (count === 0) html += `<p class="search-popup__empty">No results for “${terms}”. Try another word, or search the whole store.</p>`;
  html += `<button type="submit" form="SearchPopupForm" class="button search-popup__all">Search for “${terms}”</button></div>`;

  return new Response(`<div id="shopify-section-${esc(sectionId)}" class="shopify-section">${html}</div>`, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
