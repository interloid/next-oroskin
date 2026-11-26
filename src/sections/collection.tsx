/**
 * Product grid (theme: sections/collection.liquid) for /collections/<handle>: toolbar (filter drawer,
 * category pills, count, column switch, sort), active filter pills, the product cards, pagination.
 * Data: context.collection (CollectionPage). The query names are Shopify's (sort_by, page, filter.*),
 * so the theme's <results-view> / <filter-drawer> scripts work: they fetch `<url>&section_id=<id>`
 * and swap the parts with the same ids from the answer (the full page, same ids).
 * Only the 'full' card style with the even grid is ported (the bento layout is not).
 */
import FilterDrawer, { ActiveFilters, activeFilterCount, buildUrl, queryPairs } from '@/components/FilterDrawer';
import { CategoryPills, GridViewScript, GridViewSwitch, Pagination, SORT_OPTIONS, type Pill } from '@/components/CollectionTools';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface CollectionProps extends SectionCommon {
  showTitle?: boolean;
  showFilters?: boolean;
  showCount?: boolean;
  showSort?: boolean;
  showViewSwitch?: boolean;
  columnsDesktop?: number;
  imageRatio?: 'portrait' | 'square' | 'landscape' | 'original';
  /** Category pills (menu). count is filled from the linked collection when left out. */
  pills?: Pill[];
  pillImageAnimation?: 'collection-pills--image-rise' | 'collection-pills--image-scale' | 'collection-pills--image-none';
  pillImageSize?: number;
  /** Empty collection: suggestions from this collection handle. */
  emptyCollection?: string;
  emptyHeading?: string;
}

export default async function Collection({
  id,
  context,
  showTitle = false,
  showFilters = true,
  showCount = true,
  showSort = true,
  showViewSwitch = true,
  columnsDesktop = 4,
  imageRatio = 'portrait',
  pills = [],
  pillImageAnimation = 'collection-pills--image-rise',
  pillImageSize = 180,
  emptyCollection,
  emptyHeading = 'You might love',
  ...common
}: CollectionProps & { id: string; context?: PageContext }) {
  const collection = context?.collection;
  if (!collection) return null;
  const params = context?.searchParams ?? {};
  const url = `/collections/${collection.handle}`;
  const one = (k: string) => (Array.isArray(params[k]) ? params[k]![0] : (params[k] as string | undefined));
  const sort = one('sort_by') ?? '';

  // Pill counts from each linked collection (all_products_count: ignores filters)
  const pillsWithCount = await Promise.all(
    pills.map(async (p) => {
      if (p.count != null) return p;
      const handle = p.url.match(/^\/collections\/([^/?#]+)/)?.[1];
      if (!handle) return p;
      const c = await api.collection(handle, { pageSize: 1 });
      return { ...p, count: c ? c.productHandles.length : undefined };
    }),
  );

  const allCount = collection.productHandles.length;
  const filtersActive = activeFilterCount(collection.filters, params) > 0;
  const showTools = allCount > 0 && (showCount || showSort || showViewSwitch);
  const showDrawer = showFilters && collection.filters.length > 0 && allCount > 0;
  const showPills = pillsWithCount.length > 0;
  const clearUrl = sort ? `${url}?sort_by=${encodeURIComponent(sort)}` : url;
  const pages = Math.max(1, Math.ceil(collection.total / collection.pageSize));
  const pairs = queryPairs(params).filter(([k]) => k !== 'page' && k !== 'section_id');
  const pageUrl = (p: number) => buildUrl(url, p === 1 ? pairs : [...pairs, ['page', String(p)]]);

  const desktopVw = Math.floor(100 / columnsDesktop) + 1;
  const sizesFewer = `(min-width: 1600px) ${desktopVw}vw, (min-width: 1200px) 34vw, (min-width: 750px) 50vw, 100vw`;
  const sizesMore = '(min-width: 1600px) 17vw, (min-width: 1200px) 25vw, (min-width: 750px) 34vw, 50vw';
  const sizesDefault = `(min-width: 1600px) ${desktopVw}vw, (min-width: 1200px) 34vw, 50vw`;

  const picks =
    collection.total === 0 && !filtersActive && emptyCollection
      ? ((await api.collection(emptyCollection))?.products.slice(0, 4) ?? [])
      : [];

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`collection-section full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 32, paddingBottom: 96, ...common }, { '--grid-columns': String(columnsDesktop) })}
        {...(showViewSwitch ? { 'data-grid-view': '', 'data-sizes-fewer': sizesFewer, 'data-sizes-more': sizesMore } : {})}
        suppressHydrationWarning
      >
        {showViewSwitch ? <GridViewScript /> : null}
        <results-view className="collection-section__inner" data-section-id={id}>
          {showTitle ? <h1 className="collection-section__title">{collection.title}</h1> : null}

          {showPills || showTools || showDrawer ? (
            <div className="collection-toolbar">
              <div className="collection-toolbar__start">
                {showDrawer ? (
                  <FilterDrawer
                    filters={collection.filters}
                    resultsUrl={url}
                    sectionId={id}
                    clearUrl={clearUrl}
                    resultsCount={collection.total}
                    params={params}
                    categoryLabel={collection.handle !== 'all' ? `${collection.title} filters` : undefined}
                  />
                ) : null}
                {showPills ? (
                  <CategoryPills pills={pillsWithCount} currentUrl={url} animation={pillImageAnimation} imageSize={pillImageSize} />
                ) : null}
              </div>
              {showTools ? (
                <div className="collection-toolbar__end">
                  {showCount ? (
                    <p className="collection-toolbar__count" id={`CollectionCount-${id}`} aria-live="polite" data-results-text="">
                      {collection.total} {collection.total === 1 ? 'product' : 'products'}
                    </p>
                  ) : null}
                  {showViewSwitch ? <GridViewSwitch sectionId={id} columnsDesktop={columnsDesktop} /> : null}
                  {showSort ? (
                    <div className="collection-sort">
                      <form action={url} method="get" data-results-form="" data-results-autoload="">
                        <label className="collection-sort__label" htmlFor={`SortBy-${id}`}>
                          Sort
                        </label>
                        <span className="collection-sort__field">
                          <select className="collection-sort__select" id={`SortBy-${id}`} name="sort_by" data-default="manual" defaultValue={sort || 'manual'}>
                            {SORT_OPTIONS.map((o) => (
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
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="collection-results" id={`CollectionResults-${id}`} tabIndex={-1} data-results-part="" data-results-main="">
            {filtersActive ? <ActiveFilters filters={collection.filters} params={params} baseUrl={url} clearUrl={clearUrl} /> : null}

            {collection.total === 0 && filtersActive ? (
              <div className="collection-empty">
                <div className="collection-empty__strip">
                  <span className="collection-empty__icon" aria-hidden="true">
                    <Icon name="filter" />
                  </span>
                  <div className="collection-empty__message">
                    <h2 className="collection-empty__title">No products match these filters</h2>
                    <p className="collection-empty__text">
                      Try removing a filter, or clear them all to see everything in this collection.
                    </p>
                  </div>
                  <div className="collection-empty__actions">
                    <a className="button" href={clearUrl} data-results-link="">
                      Clear all
                    </a>
                  </div>
                </div>
              </div>
            ) : collection.total === 0 ? (
              <div className="collection-empty">
                <div className="collection-empty__strip">
                  <span className="collection-empty__icon" aria-hidden="true">
                    <Icon name="sparkle" />
                  </span>
                  <div className="collection-empty__message">
                    <h2 className="collection-empty__title">Nothing here yet</h2>
                    <p className="collection-empty__text">
                      This collection doesn&apos;t have any products yet. Take a look at the rest of the shop.
                    </p>
                  </div>
                  <div className="collection-empty__actions">
                    <a className="button button--text" href="/">
                      Back to home
                    </a>
                    <a className="button" href="/collections/all">
                      Continue shopping
                    </a>
                  </div>
                </div>
                {picks.length ? (
                  <div className="collection-empty__picks">
                    <h2 className="collection-empty__picks-title">{emptyHeading}</h2>
                    <ul className="collection-grid collection-grid--grid" role="list" style={{ '--grid-columns': 4 } as React.CSSProperties}>
                      {picks.map((p) => (
                        <li className="collection-grid__item" key={p.handle}>
                          <ProductCard
                            product={p}
                            style="tile"
                            sizes="(min-width: 990px) 25vw, (min-width: 750px) 50vw, 100vw"
                            headingTag="h3"
                            showDetails
                            showRating
                            showDescription
                            sectionId={id}
                            idSuffix="picks"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <div className="collection-grid-wrap">
                  <ul className={`collection-grid collection-grid--grid collection-grid--${imageRatio} collection-grid--full`} role="list">
                    {collection.products.map((product, i) => {
                      // With the column switch only the first 2 cards load at once (with the "fewer" sizes)
                      const eager = showViewSwitch ? i < 2 : i < 4;
                      return (
                        <li className="collection-grid__item" key={product.handle}>
                          <ProductCard
                            product={product}
                            style="full"
                            imageRatio={imageRatio}
                            sizes={showViewSwitch && i < 2 ? sizesFewer : sizesDefault}
                            loading={eager ? 'eager' : 'lazy'}
                            priority={i === 0 && collection.page === 1}
                            headingTag="h2"
                            sectionId={id}
                            showRating
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Pagination current={collection.page} pages={pages} pageUrl={pageUrl} />
              </>
            )}
          </div>
        </results-view>
      </div>
    </div>
  );
}
