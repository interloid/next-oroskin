/**
 * Small pieces shared by the collection and search pages:
 * - <CategoryPills> (theme: snippets/category-pills.liquid)
 * - <Pagination> (snippets/pagination.liquid)
 * - <GridViewIcon> (snippets/grid-view-icon.liquid)
 * - <GridViewSwitch> (the fewer / more column switch of sections/collection.liquid)
 */
import Icon from '@/components/Icon';

export interface Pill {
  title: string;
  url: string;
  /** Cut-out image shown on hover (the collection's "Pill image"). */
  image?: { src: string; width?: number; height?: number };
  /** Product count; leave out to show none. */
  count?: number;
}

export function CategoryPills({
  pills,
  currentUrl,
  animation = 'collection-pills--image-rise',
  imageSize = 180,
  centred = false,
}: {
  pills: Pill[];
  currentUrl?: string;
  animation?: 'collection-pills--image-rise' | 'collection-pills--image-scale' | 'collection-pills--image-none';
  imageSize?: number;
  centred?: boolean;
}) {
  return (
    <nav
      className={`collection-pills ${animation}${centred ? ' collection-pills--centred' : ''}`}
      style={{ '--pill-image-size': `${imageSize}px` } as React.CSSProperties}
      aria-label="Categories"
    >
      <ul className="collection-pills__list" role="list">
        {pills.map((p) => {
          const current = p.url === currentUrl;
          return (
            <li key={p.url}>
              <a
                className={`collection-pill${current ? ' collection-pill--active' : ''}`}
                href={p.url}
                {...(current ? { 'aria-current': 'page' as const } : {})}
              >
                {p.image ? (
                  <span className="collection-pill__media collection-pill__media--cutout" aria-hidden="true">
                    <img src={p.image.src} alt="" width={p.image.width ?? 300} height={p.image.height ?? 300} loading="lazy" sizes="160px" />
                  </span>
                ) : null}
                {p.title}
                {p.count != null ? (
                  <>
                    <span className="collection-pill__count" aria-hidden="true">
                      {p.count}
                    </span>
                    <span className="visually-hidden">
                      {p.count} {p.count === 1 ? 'product' : 'products'}
                    </span>
                  </>
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Shopify-like page parts: 1 … 4 5 6 … 12 */
function parts(current: number, pages: number): (number | '…')[] {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const out: (number | '…')[] = [1];
  const from = Math.max(2, current - 1);
  const to = Math.min(pages - 1, current + 1);
  if (from > 2) out.push('…');
  for (let i = from; i <= to; i++) out.push(i);
  if (to < pages - 1) out.push('…');
  out.push(pages);
  return out;
}

export function Pagination({ current, pages, pageUrl }: { current: number; pages: number; pageUrl: (page: number) => string }) {
  if (pages <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pages">
      <p className="pagination__status">
        Page {current} of {pages}
      </p>
      <ul className="pagination__pill" role="list">
        <li className="pagination__end pagination__end--previous">
          {current > 1 ? (
            <a className="pagination__arrow" href={pageUrl(current - 1)} data-results-link="" data-results-scroll="">
              <Icon name="chevron-left" />
              <span className="visually-hidden">Previous</span>
            </a>
          ) : (
            <span className="pagination__arrow pagination__arrow--disabled" aria-hidden="true">
              <Icon name="chevron-left" />
            </span>
          )}
        </li>
        {parts(current, pages).map((p, i) => (
          <li className="pagination__part" key={i}>
            {p === '…' ? (
              <span className="pagination__gap" aria-hidden="true">
                …
              </span>
            ) : p === current ? (
              <span className="pagination__page pagination__page--current" aria-current="page">
                <span className="visually-hidden">Page</span>
                {p}
              </span>
            ) : (
              <a className="pagination__page" href={pageUrl(p)} data-results-link="" data-results-scroll="">
                <span className="visually-hidden">Page</span>
                {p}
              </a>
            )}
          </li>
        ))}
        <li className="pagination__end pagination__end--next">
          {current < pages ? (
            <a className="pagination__arrow" href={pageUrl(current + 1)} data-results-link="" data-results-scroll="">
              <Icon name="chevron-right" />
              <span className="visually-hidden">Next</span>
            </a>
          ) : (
            <span className="pagination__arrow pagination__arrow--disabled" aria-hidden="true">
              <Icon name="chevron-right" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}

/** 2 rows x `columns` small squares. */
export function GridViewIcon({ columns, className }: { columns: number; className: string }) {
  const width = columns * 6 - 2;
  return (
    <svg className={`grid-view__icon ${className}`} aria-hidden="true" focusable="false" viewBox={`0 0 ${width} 10`}>
      {Array.from({ length: columns }, (_, c) => (
        <g key={c}>
          <rect x={c * 6} y="0" width="4" height="4" rx="0.6"></rect>
          <rect x={c * 6} y="6" width="4" height="4" rx="0.6"></rect>
        </g>
      ))}
    </svg>
  );
}

export function GridViewSwitch({ sectionId, columnsDesktop }: { sectionId: string; columnsDesktop: number }) {
  return (
    <grid-view-switch className="grid-view">
      <fieldset className="grid-view__group">
        <legend className="visually-hidden">Products per row</legend>
        <input className="visually-hidden" type="radio" id={`GridViewFewer-${sectionId}`} name={`GridView-${sectionId}`} value="fewer" />
        <label className="grid-view__option" htmlFor={`GridViewFewer-${sectionId}`} title="Fewer, larger products">
          <GridViewIcon columns={1} className="grid-view__icon--phone" />
          <GridViewIcon columns={2} className="grid-view__icon--tablet" />
          <GridViewIcon columns={3} className="grid-view__icon--laptop" />
          <GridViewIcon columns={columnsDesktop} className="grid-view__icon--desktop" />
          <span className="visually-hidden">Fewer, larger products</span>
        </label>
        <input className="visually-hidden" type="radio" id={`GridViewMore-${sectionId}`} name={`GridView-${sectionId}`} value="more" />
        <label className="grid-view__option" htmlFor={`GridViewMore-${sectionId}`} title="More, smaller products">
          <GridViewIcon columns={2} className="grid-view__icon--phone" />
          <GridViewIcon columns={3} className="grid-view__icon--tablet" />
          <GridViewIcon columns={4} className="grid-view__icon--laptop" />
          <GridViewIcon columns={6} className="grid-view__icon--desktop" />
          <span className="visually-hidden">More, smaller products</span>
        </label>
      </fieldset>
    </grid-view-switch>
  );
}

/** Saved view (localStorage) on the section before the grid is parsed: must be a direct child of it. */
export function GridViewScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html:
          "try{var oroskinView=localStorage.getItem('oroskin-collection-view');if(oroskinView==='fewer'||oroskinView==='more')document.currentScript.parentNode.setAttribute('data-view',oroskinView);}catch(e){}",
      }}
    />
  );
}

export const SORT_OPTIONS = [
  { value: 'manual', label: 'Featured' },
  { value: 'best-selling', label: 'Best selling' },
  { value: 'title-ascending', label: 'Alphabetically, A-Z' },
  { value: 'title-descending', label: 'Alphabetically, Z-A' },
  { value: 'price-ascending', label: 'Price, low to high' },
  { value: 'price-descending', label: 'Price, high to low' },
  { value: 'created-ascending', label: 'Date, old to new' },
  { value: 'created-descending', label: 'Date, new to old' },
];
