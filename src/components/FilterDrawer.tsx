/**
 * Filters button + drawer (theme: snippets/filter-drawer.liquid + filter-group.liquid), and the active
 * filter pills (snippets/active-filters.liquid). A plain GET form with Shopify's filter names
 * (filter.v.availability, filter.p.product_type, filter.v.price.gte / lte), so the theme's
 * <filter-drawer> / <results-view> scripts work: they fetch `<url>&section_id=<id>` and read the parts
 * by id from the answer (our route returns the whole page, which has the same ids).
 */
import Icon from '@/components/Icon';
import { currencySymbol, money } from '@/lib/format';
import type { Filter } from '@/lib/types';

type Params = Record<string, string | string[] | undefined>;

const handleize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '-')
    .replace(/^-|-$/g, '');

/** Shopify's URL name for each API filter id. */
export const FILTER_PARAM: Record<string, string> = {
  availability: 'filter.v.availability',
  type: 'filter.p.product_type',
  vendor: 'filter.p.vendor',
  price: 'filter.v.price',
};
const GENERAL = ['availability', 'price', 'vendor', 'type'];

const paramOf = (f: Filter) => FILTER_PARAM[f.id] ?? `filter.p.m.custom.${f.id}`;
const amount = (minor: number) => (minor % 100 === 0 ? String(minor / 100) : String(minor / 100));

/** The current query as a list of [key, value] (repeated keys kept). */
export function queryPairs(params: Params = {}): [string, string][] {
  const out: [string, string][] = [];
  for (const [k, v] of Object.entries(params)) {
    if (v == null) continue;
    for (const one of ([] as string[]).concat(v)) out.push([k, one]);
  }
  return out;
}
export function buildUrl(base: string, pairs: [string, string][]) {
  const q = new URLSearchParams(pairs).toString();
  return q ? `${base}?${q}` : base;
}

/** Price range values from the URL (minor units), or undefined. */
function priceFromUrl(params: Params) {
  const one = (k: string) => (Array.isArray(params[k]) ? params[k]![0] : (params[k] as string | undefined));
  const gte = one('filter.v.price.gte');
  const lte = one('filter.v.price.lte');
  return {
    min: gte != null && gte !== '' ? Math.round(Number(gte) * 100) : undefined,
    max: lte != null && lte !== '' ? Math.round(Number(lte) * 100) : undefined,
  };
}

export function activeFilterCount(filters: Filter[], params: Params) {
  let n = 0;
  const price = priceFromUrl(params);
  for (const f of filters) {
    if (f.type === 'price_range') {
      if (price.min != null || price.max != null) n += 1;
    } else n += (f.values ?? []).filter((v) => v.active).length;
  }
  return n;
}

function FilterGroup({ filter, sectionId, params }: { filter: Filter; sectionId: string; params: Params }) {
  const param = paramOf(filter);
  const groupId = `Filter-${sectionId}-${handleize(param)}`;
  return (
    <details className="filter-group" open>
      <summary className="filter-group__summary">
        {filter.label}
        <span className="filter-group__plus">
          <Icon name="plus" />
        </span>
        <span className="filter-group__minus">
          <Icon name="minus" />
        </span>
      </summary>
      <fieldset className="filter-group__fieldset">
        <legend className="visually-hidden">{filter.label}</legend>
        {filter.type === 'price_range' ? (
          (() => {
            const rangeMax = Math.ceil((filter.max ?? 0) / 100);
            const price = priceFromUrl(params);
            const minAmount = price.min != null ? amount(price.min) : '';
            const maxAmount = price.max != null ? amount(price.max) : '';
            return (
              <price-range className="filter-price" style={{ '--from': '0%', '--to': '100%' } as React.CSSProperties}>
                <div className="filter-price__slider">
                  <input
                    type="range"
                    min="0"
                    max={rangeMax}
                    step="1"
                    defaultValue={minAmount || 0}
                    aria-label="Minimum price"
                    data-price-thumb="min"
                  />
                  <input
                    type="range"
                    min="0"
                    max={rangeMax}
                    step="1"
                    defaultValue={maxAmount || rangeMax}
                    aria-label="Maximum price"
                    data-price-thumb="max"
                  />
                </div>
                <div className="filter-price__boxes">
                  <label className="filter-price__box">
                    <span className="visually-hidden">Minimum price</span>
                    <span aria-hidden="true">{currencySymbol()}</span>
                    <input
                      type="number"
                      name="filter.v.price.gte"
                      defaultValue={minAmount}
                      min="0"
                      max={rangeMax}
                      step="any"
                      inputMode="decimal"
                      placeholder="0"
                      data-price-box="min"
                    />
                  </label>
                  <span className="filter-price__dash" aria-hidden="true">
                    –
                  </span>
                  <label className="filter-price__box">
                    <span className="visually-hidden">Maximum price</span>
                    <span aria-hidden="true">{currencySymbol()}</span>
                    <input
                      type="number"
                      name="filter.v.price.lte"
                      defaultValue={maxAmount}
                      min="0"
                      max={rangeMax}
                      step="any"
                      inputMode="decimal"
                      placeholder={String(rangeMax)}
                      data-price-box="max"
                    />
                  </label>
                </div>
              </price-range>
            );
          })()
        ) : (
          <ul className="filter-group__options filter-group__options--list" role="list">
            {(filter.values ?? []).map((value) => {
              const valueId = `${groupId}-${handleize(value.value)}`;
              return (
                <li className="filter-group__item" key={value.value}>
                  <label className="filter-option filter-option--list" htmlFor={valueId}>
                    <input
                      type="checkbox"
                      id={valueId}
                      name={param}
                      value={value.value}
                      defaultChecked={value.active}
                      disabled={value.count === 0 && !value.active}
                    />
                    <span className="filter-option__label">{value.label}</span>
                    <span className="filter-option__count" id={`${valueId}-count`} data-filter-count="">
                      {value.count}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </fieldset>
    </details>
  );
}

export interface FilterDrawerProps {
  filters: Filter[];
  /** Where the form sends to, e.g. /collections/all or /search */
  resultsUrl: string;
  sectionId: string;
  /** The URL with every filter removed (keeps sort / search terms). */
  clearUrl: string;
  resultsCount: number;
  /** The current query (to show the chosen price). */
  params?: Params;
  /** Divider above the non-general filters, e.g. "Makeup filters". */
  categoryLabel?: string;
  /** Search page: the terms, sent again as q. */
  terms?: string;
}

export default function FilterDrawer({
  filters,
  resultsUrl,
  sectionId,
  clearUrl,
  resultsCount,
  params = {},
  categoryLabel,
  terms,
}: FilterDrawerProps) {
  const active = activeFilterCount(filters, params);
  const general = filters.filter((f) => GENERAL.includes(f.id));
  const other = filters.filter((f) => !GENERAL.includes(f.id));
  return (
    <filter-drawer className="filter-drawer" data-section-id={sectionId}>
      <button
        type="button"
        className="filter-drawer__toggle"
        aria-haspopup="dialog"
        aria-controls={`FilterDrawer-${sectionId}`}
        aria-expanded="false"
      >
        <Icon name="filter" />
        Filters
        <span id={`FilterCount-${sectionId}`} data-results-part="">
          {active > 0 ? (
            <>
              <span className="filter-drawer__count" aria-hidden="true">
                {active}
              </span>
              <span className="visually-hidden">
                {active} {active === 1 ? 'filter' : 'filters'} applied
              </span>
            </>
          ) : null}
        </span>
      </button>
      <dialog id={`FilterDrawer-${sectionId}`} className="filter-drawer__dialog" aria-labelledby={`FilterDrawerTitle-${sectionId}`}>
        <form
          id={`FilterForm-${sectionId}`}
          className="filter-drawer__form"
          action={resultsUrl}
          method="get"
          data-results-form=""
          data-results-part=""
        >
          <div className="filter-drawer__head">
            <h2 className="filter-drawer__title" id={`FilterDrawerTitle-${sectionId}`}>
              Filters
            </h2>
            <a className="filter-drawer__reset" href={clearUrl} data-results-link="">
              Reset
            </a>
            <button type="button" className="filter-drawer__close" data-drawer-close="">
              <Icon name="close" />
              <span className="visually-hidden">Close filters</span>
            </button>
          </div>
          <div className="filter-drawer__body">
            {terms ? (
              <>
                <input type="hidden" name="q" value={terms} />
                <input type="hidden" name="options[prefix]" value="last" />
              </>
            ) : null}
            {general.map((f) => (
              <FilterGroup key={f.id} filter={f} sectionId={sectionId} params={params} />
            ))}
            {other.length ? (
              <>
                {categoryLabel ? (
                  <p className="filter-drawer__divider">
                    <span>{categoryLabel}</span>
                  </p>
                ) : null}
                {other.map((f) => (
                  <FilterGroup key={f.id} filter={f} sectionId={sectionId} params={params} />
                ))}
              </>
            ) : null}
          </div>
          <div className="filter-drawer__foot">
            <button type="submit" className="button filter-drawer__apply">
              <span id={`FilterResults-${sectionId}`} aria-live="polite">
                View results ({resultsCount})
              </span>
            </button>
          </div>
        </form>
      </dialog>
    </filter-drawer>
  );
}

/** The chosen filters as removable pills + "Clear all" (theme: snippets/active-filters.liquid). */
export function ActiveFilters({ filters, params, baseUrl, clearUrl }: { filters: Filter[]; params: Params; baseUrl: string; clearUrl: string }) {
  const pairs = queryPairs(params).filter(([k]) => k !== 'page' && k !== 'section_id');
  const price = priceFromUrl(params);
  const pills: { label: string; href: string }[] = [];
  for (const f of filters) {
    if (f.type === 'price_range') {
      if (price.min != null || price.max != null) {
        const fmt = (m: number) => money(m);
        pills.push({
          label: `${fmt(price.min ?? 0)} – ${fmt(price.max ?? f.max ?? 0)}`,
          href: buildUrl(baseUrl, pairs.filter(([k]) => !k.startsWith('filter.v.price'))),
        });
      }
    } else {
      const param = paramOf(f);
      for (const v of (f.values ?? []).filter((x) => x.active)) {
        pills.push({ label: v.label, href: buildUrl(baseUrl, pairs.filter(([k, val]) => !(k === param && val === v.value))) });
      }
    }
  }
  return (
    <ul className="active-filters" role="list" aria-label="Active filters">
      {pills.map((p) => (
        <li key={p.label}>
          <a className="active-filters__pill" href={p.href} aria-label={`Remove filter: ${p.label}`} data-results-link="">
            {p.label}
            <Icon name="close" />
          </a>
        </li>
      ))}
      <li>
        <a className="active-filters__clear" href={clearUrl} data-results-link="">
          Clear all
        </a>
      </li>
    </ul>
  );
}
