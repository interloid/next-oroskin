/**
 * Search results (theme: sections/search.liquid), /search?q=: the search hero with its form, a toolbar
 * (count + sort), then grouped results: products (the collection page card), collections whose title
 * matches, articles. No search yet / no results: suggestion pills + a few products.
 * Data: api.search(q) (products), api.collections(), api.articles(), filtered and sorted here.
 * Not ported: the filter drawer (the search API returns no filters), page results.
 */
import { CategoryPills, Pagination, type Pill } from '@/components/CollectionTools';
import { buildUrl, queryPairs } from '@/components/FilterDrawer';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface SearchProps extends SectionCommon {
  /** Heading before anyone searches. */
  emptyHeading?: string;
  categoriesHeading?: string;
  /** Category pills under "no results" / before a search. count filled from the collection. */
  pills?: Pill[];
  /** Product suggestions: a collection handle (4 products). */
  suggestionsCollection?: string;
  /** HTML (<em> = accent). */
  suggestionsHeading?: string;
  resultsPerPage?: number;
  columnsDesktop?: number;
  imageRatio?: 'portrait' | 'square' | 'landscape';
}

const SORTS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-ascending', label: 'Price, low to high' },
  { value: 'price-descending', label: 'Price, high to low' },
];

const longDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const words = (text: string, n: number) => {
  const all = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ');
  return all.length > n ? `${all.slice(0, n).join(' ')}...` : all.join(' ');
};

export default async function Search({
  id,
  context,
  emptyHeading = 'What are you looking for?',
  categoriesHeading = 'Popular categories',
  pills = [],
  suggestionsCollection = 'all',
  suggestionsHeading = 'You might <em>love</em>',
  resultsPerPage = 24,
  columnsDesktop = 4,
  imageRatio = 'portrait',
  ...common
}: SearchProps & { id: string; context?: PageContext }) {
  const params = context?.searchParams ?? {};
  const one = (k: string) => (Array.isArray(params[k]) ? params[k]![0] : (params[k] as string | undefined));
  const terms = (one('q') ?? '').trim();
  const performed = terms !== '';
  const sort = one('sort_by') ?? 'relevance';
  const page = Math.max(1, Number(one('page') ?? 1) || 1);

  let products: Product[] = [];
  let collections: { handle: string; title: string; image: string | null; count: number }[] = [];
  let articles: Awaited<ReturnType<typeof api.articles>> = [];
  if (performed) {
    const q = terms.toLowerCase();
    products = await api.search(terms);
    if (sort === 'price-ascending') products = [...products].sort((a, b) => a.price - b.price);
    if (sort === 'price-descending') products = [...products].sort((a, b) => b.price - a.price);
    collections = (await api.collections())
      .filter((c) => c.title.toLowerCase().includes(q) && c.productHandles.length > 0)
      .map((c) => ({ handle: c.handle, title: c.title, image: c.image, count: c.productHandles.length }));
    articles = (await api.articles()).filter((a) => [a.title, a.excerpt, ...a.tags].join(' ').toLowerCase().includes(q));
  }
  const total = products.length + collections.length + articles.length;
  const pages = Math.max(1, Math.ceil(products.length / resultsPerPage));
  const pageProducts = products.slice((page - 1) * resultsPerPage, page * resultsPerPage);
  const firstPage = page === 1;
  const pairs = queryPairs(params).filter(([k]) => k !== 'page' && k !== 'section_id');
  const pageUrl = (p: number) => buildUrl('/search', p === 1 ? pairs : [...pairs, ['page', String(p)]]);

  // Suggestions (before a search, and under "no results")
  const showSuggestions = !performed || total === 0;
  const pillsWithCount = showSuggestions
    ? await Promise.all(
        pills.map(async (p) => {
          if (p.count != null) return p;
          const handle = p.url.match(/^\/collections\/([^/?#]+)/)?.[1];
          const c = handle ? (await api.collections()).find((x) => x.handle === handle) : undefined;
          return { ...p, count: c?.productHandles.length };
        }),
      )
    : [];
  const picks = showSuggestions && suggestionsCollection ? ((await api.collection(suggestionsCollection))?.products.slice(0, 4) ?? []) : [];
  const gridClass = `collection-grid collection-grid--grid collection-grid--${imageRatio} collection-grid--full`;
  const gridStyle = { '--grid-columns': String(columnsDesktop) } as React.CSSProperties;
  const cardSizes = `(min-width: 1200px) ${Math.floor(100 / columnsDesktop) + 1}vw, (min-width: 750px) 34vw, 50vw`;

  const suggestions = (
    <>
      {pillsWithCount.length ? (
        <section className="search-group search-group--centred" aria-labelledby={`SearchCategories-${id}`}>
          <h2 className="search-group__title" id={`SearchCategories-${id}`}>
            {categoriesHeading}
          </h2>
          <CategoryPills pills={pillsWithCount} centred />
        </section>
      ) : null}
      {picks.length ? (
        <section className="search-group" aria-labelledby={`SearchPicks-${id}`}>
          {suggestionsHeading ? (
            <h2 className="search-group__title" id={`SearchPicks-${id}`} dangerouslySetInnerHTML={{ __html: suggestionsHeading }} />
          ) : (
            <h2 className="visually-hidden" id={`SearchPicks-${id}`}>
              Products
            </h2>
          )}
          <ul className={gridClass} role="list" style={gridStyle}>
            {picks.map((p) => (
              <li className="collection-grid__item" key={p.handle}>
                <ProductCard product={p} style="full" imageRatio={imageRatio} sizes={cardSizes} headingTag="h3" sectionId={id} idSuffix="picks" />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`search-section full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 64, paddingBottom: 96, ...common })}
      >
        <results-view className="search-section__inner" data-section-id={id}>
          <header className="search-hero">
            <p className="search-hero__eyebrow">Search</p>
            <h1 className="search-hero__title">
              {performed ? (
                <>
                  Results for <em>“{terms}”</em>
                </>
              ) : (
                emptyHeading
              )}
            </h1>
            <form className="search-hero__form" action="/search" method="get" role="search">
              <label className="visually-hidden" htmlFor={`SearchPageInput-${id}`}>
                Search the store
              </label>
              <input type="hidden" name="options[prefix]" value="last" />
              <input
                className="search-hero__input"
                id={`SearchPageInput-${id}`}
                type="search"
                name="q"
                defaultValue={terms}
                placeholder="Search for products…"
                autoComplete="off"
              />
              <button type="submit" className="search-hero__submit">
                <Icon name="search" />
                <span className="visually-hidden">Search</span>
              </button>
            </form>
          </header>

          {performed && total > 0 ? (
            <div className="collection-toolbar">
              <div className="collection-toolbar__start"></div>
              <div className="collection-toolbar__end">
                <p className="collection-toolbar__count" id={`SearchCount-${id}`} aria-live="polite" data-results-text="">
                  {total} {total === 1 ? 'result' : 'results'}
                </p>
                <div className="collection-sort">
                  <form action="/search" method="get" data-results-form="" data-results-autoload="">
                    <input type="hidden" name="q" value={terms} />
                    <input type="hidden" name="options[prefix]" value="last" />
                    <label className="collection-sort__label" htmlFor={`SearchSortBy-${id}`}>
                      Sort
                    </label>
                    <span className="collection-sort__field">
                      <select className="collection-sort__select" id={`SearchSortBy-${id}`} name="sort_by" data-default="relevance" defaultValue={sort}>
                        {SORTS.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <Icon name="chevron" />
                    </span>
                    <noscript>
                      <button type="submit" className="button button--secondary collection-sort__apply">
                        Apply
                      </button>
                    </noscript>
                  </form>
                </div>
              </div>
            </div>
          ) : null}

          {performed ? (
            <div className="collection-results" id={`SearchResults-${id}`} tabIndex={-1} data-results-part="" data-results-main="">
              {total === 0 ? (
                <>
                  <div className="collection-empty">
                    <div className="collection-empty__strip">
                      <span className="collection-empty__icon" aria-hidden="true">
                        <Icon name="search" />
                      </span>
                      <div className="collection-empty__message">
                        <h2 className="collection-empty__title">No results for “{terms}”</h2>
                        <p className="collection-empty__text">Check the spelling, try a more general word, or browse the whole shop.</p>
                      </div>
                      <div className="collection-empty__actions">
                        <a className="button" href="/collections/all">
                          Continue shopping
                        </a>
                      </div>
                    </div>
                  </div>
                  {suggestions}
                </>
              ) : (
                <>
                  {pageProducts.length ? (
                    <section className="search-group" aria-labelledby={`SearchProducts-${id}`}>
                      <h2 className="search-group__title" id={`SearchProducts-${id}`}>
                        Products
                      </h2>
                      <div className="collection-grid-wrap">
                        <ul className={gridClass} role="list" style={gridStyle}>
                          {pageProducts.map((p, i) => (
                            <li className="collection-grid__item" key={p.handle}>
                              <ProductCard
                                product={p}
                                style="full"
                                imageRatio={imageRatio}
                                sizes={cardSizes}
                                loading={i < 4 ? 'eager' : 'lazy'}
                                priority={i === 0 && firstPage}
                                headingTag="h3"
                                sectionId={id}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  ) : null}
                  {firstPage && collections.length ? (
                    <section className="search-group" aria-labelledby={`SearchCollections-${id}`}>
                      <h2 className="search-group__title" id={`SearchCollections-${id}`}>
                        Collections
                      </h2>
                      <ul className="result-cards" role="list">
                        {collections.map((c) => (
                          <li className="result-card" key={c.handle}>
                            <a className="result-card__link" href={`/collections/${c.handle}`}>
                              {c.image ? (
                                <div className="result-card__media">
                                  <img src={c.image} alt="" width={800} height={533} loading="lazy" sizes="(min-width: 1600px) 20vw, (min-width: 1200px) 30vw, (min-width: 750px) 45vw, 92vw" />
                                </div>
                              ) : null}
                              <div className="result-card__body">
                                <p className="result-card__meta">
                                  {c.count} {c.count === 1 ? 'product' : 'products'}
                                </p>
                                <h3 className="result-card__title">{c.title}</h3>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                  {firstPage && articles.length ? (
                    <section className="search-group" aria-labelledby={`SearchArticles-${id}`}>
                      <h2 className="search-group__title" id={`SearchArticles-${id}`}>
                        Articles
                      </h2>
                      <ul className="result-cards" role="list">
                        {articles.map((a) => (
                          <li className="result-card" key={a.handle}>
                            <a className="result-card__link" href={`/blogs/featured/${a.handle}`}>
                              {a.image ? (
                                <div className="result-card__media">
                                  <img
                                    src={a.image}
                                    alt=""
                                    width={800}
                                    height={533}
                                    loading="lazy"
                                    sizes="(min-width: 1600px) 20vw, (min-width: 1200px) 30vw, (min-width: 750px) 45vw, 92vw"
                                  />
                                </div>
                              ) : null}
                              <div className="result-card__body">
                                <p className="result-card__meta">
                                  Article · <time dateTime={a.publishedAt}>{longDate(a.publishedAt)}</time>
                                </p>
                                <h3 className="result-card__title">{a.title}</h3>
                                <p className="result-card__excerpt">{words(a.excerpt || a.contentHtml, 18)}</p>
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                  <Pagination current={page} pages={pages} pageUrl={pageUrl} />
                </>
              )}
            </div>
          ) : (
            suggestions
          )}
        </results-view>
      </div>
    </div>
  );
}
