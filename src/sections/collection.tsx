/**
 * Product grid (theme: sections/collection.liquid) for /collections/<handle>: toolbar (filter drawer,
 * category pills, count, column switch, sort), active filter pills, the product cards, pagination.
 * Data: context.collection (CollectionPage). The query names are Shopify's (sort_by, page, filter.*),
 * so the theme's <results-view> / <filter-drawer> scripts work: they fetch `<url>&section_id=<id>`
 * and swap the parts with the same ids from the answer (the full page, same ids).
 * Card style 'tile' + layout 'bento' = the Figma bento grid (the plan is built below, as in the Liquid);
 * 'full' always uses the even grid and the column switch.
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
  layout?: 'bento' | 'grid';
  cardStyle?: 'full' | 'tile';
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
  showViewSwitch: showViewSwitchProp = true,
  layout: layoutProp = 'bento',
  cardStyle = 'tile',
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
  const isFull = cardStyle === 'full';
  const layout = isFull ? 'grid' : layoutProp;
  const showViewSwitch = isFull && showViewSwitchProp;
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

  const bento = layout === 'bento' ? bentoPlan(collection.products.length) : null;
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
                  <ul
                    className={`collection-grid collection-grid--${layout} collection-grid--${imageRatio}${isFull ? ' collection-grid--full' : ''}`}
                    role="list"
                    style={bento ? ({ '--bento-rows': bento.rows } as React.CSSProperties) : undefined}
                  >
                    {collection.products.map((product, i) => {
                      // With the column switch only the first 2 cards load at once (with the "fewer" sizes)
                      const eager = showViewSwitch ? i < 2 : i < 4;
                      return (
                        <li className="collection-grid__item" key={product.handle} style={bento ? (bento.tiles[i] as React.CSSProperties) : undefined}>
                          <ProductCard
                            product={product}
                            style={cardStyle}
                            showDetails
                            showDescription
                            cartOptions="add_first"
                            imageRatio={imageRatio}
                            sizes={bento ? bento.sizes[i] : showViewSwitch && i < 2 ? sizesFewer : sizesDefault}
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

const BENTO = '1-2-1-1,3-1-1-2,4-1-1-2,1-1-2-2,2-1-2-3,3-2-3-3,1-1-4-2,2-1-5-1,1-1-6-3,2-2-6-1,4-1-6-2,2-1-7-2,3-1-7-2,4-1-8-2,1-2-9-1,3-1-9-1,1-1-10-2,2-1-10-1,3-2-10-2,2-1-11-2,3-2-12-1,1-1-12-1'.split(',');
const TAILS = '|1-1-1-1|1-2-1-1;3-2-1-1|1-2-1-1;3-1-1-1;4-1-1-1|1-1-1-1;2-1-1-1;3-1-1-1;4-1-1-1|1-1-1-2;2-2-1-1;4-1-1-2;2-1-2-1;3-1-2-1|1-2-1-1;3-1-1-1;4-1-1-1;1-1-2-1;2-1-2-1;3-2-2-1|1-1-1-2;2-1-1-1;3-1-1-1;4-1-1-1;2-1-2-1;3-1-2-1;4-1-2-1'.split('|');
const CYCLE = '399,220,54,221,382,399,204,70,728,309,204,399'.split(',');
const BAND_A = CYCLE.slice(0, 5);
const BAND_AB = CYCLE.slice(0, 9);

/** The bento plan for one page (same as the Liquid): per tile its grid place + photo sizes, and the row heights. */
function bentoPlan(count: number) {
  const cycles = Math.floor(count / 22);
  const rest = count % 22;
  const bandTiles = rest >= 16 ? 16 : rest >= 8 ? 8 : 0;
  const bandRows = bandTiles === 16 ? 9 : bandTiles === 8 ? 5 : 0;
  const tailCount = rest - bandTiles;
  const figma = cycles * 22 + bandTiles;
  const tailStart = cycles * 12 + bandRows;
  const tail = (TAILS[tailCount] ?? '').split(';');
  let heights: string[] = [];
  for (let i = 0; i < cycles; i++) heights = heights.concat(CYCLE);
  if (bandTiles === 8) heights = heights.concat(BAND_A);
  else if (bandTiles === 16) heights = heights.concat(BAND_AB);
  if (tailCount > 0) heights.push('400');
  if (tailCount > 4) heights.push('400');
  const tiles: Record<string, string>[] = [];
  const sizes: string[] = [];
  for (let i = 0; i < count; i++) {
    const place = (i < figma ? BENTO[i % 22] : tail[i - figma]).split('-');
    const offset = i < figma ? Math.floor(i / 22) * 12 : tailStart;
    tiles.push({ '--col': `${place[0]} / span ${place[1]}`, '--row': `${Number(place[2]) + offset} / span ${place[3]}` });
    const wide = place[1] === '2' ? '50vw' : place[1] === '4' ? '100vw' : '25vw';
    sizes.push(`(min-width: 1200px) ${wide}, (min-width: 990px) 33vw, (min-width: 750px) 50vw, 100vw`);
  }
  return { tiles, sizes, rows: heights.map((h) => `calc(var(--u) * ${h})`).join(' ') };
}
