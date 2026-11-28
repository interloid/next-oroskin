/**
 * Shipping page (Figma 1:17093 "shipping"; never built in the theme, where Shopify's own /policies/shipping-policy is styled).
 * Reuses the policy header classes from sections.css (breadcrumb, eyebrow, heading, intro); everything else is
 * Tailwind (tokens: src/app/globals.css). Breakpoints follow the theme: max-desktop < 1200, max-laptop < 990,
 * max-tablet < 750.
 */
import type { PageContext } from '@/components/PageRenderer';
import { Breadcrumb, PAGE_BLOCK_GAP, PAGE_PX, rootProps, type PageScreenOptions } from '@/sections/_page-shared';
import type { SectionCommon } from '@/sections/shared';

export interface ShippingHub {
  city: string;
  code?: string; // big faded letters, e.g. "PAR"
  regions?: string;
  cutoffLabel?: string;
  cutoff?: string;
}
export interface ShippingTier {
  title: string;
  text?: string;
  time?: string;
  price?: string;
}
export interface ShippingRegion {
  zone?: string;
  name: string;
  text?: string;
}
export interface ShippingInfoProps extends SectionCommon, PageScreenOptions {
  breadcrumbTitle?: string;
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  intro?: string;
  stats?: { value: string; label?: string }[];
  hubsLabel?: string;
  hubs?: ShippingHub[];
  tiersLabel?: string;
  tiers?: ShippingTier[];
  regionsLabel?: string;
  regions?: ShippingRegion[];
  note?: string;
}

/** Accent uppercase text: the stat labels, cut-off label and region zones */
const caps = 'text-label tracking-label uppercase';
/** Canela heading, no margin; each use adds its size, e.g. text-[length:max(1.25rem,calc(24*var(--px)))] */
const serif = 'm-0 font-display font-normal';

/** Section label: accent, small, uppercase, with a hairline to the right */
function Label({ children }: { children: string }) {
  return (
    <h2
      className={`m-0 flex items-center gap-md font-text font-normal text-brand ${caps} after:h-px after:flex-1 after:bg-line-card after:content-['']`}
    >
      <span>{children}</span>
    </h2>
  );
}

export default function ShippingInfo({
  id,
  breadcrumbTitle = 'Shipping',
  eyebrow,
  heading,
  intro,
  stats = [],
  hubsLabel,
  hubs = [],
  tiersLabel,
  tiers = [],
  regionsLabel,
  regions = [],
  note,
  ...common
}: ShippingInfoProps & { id: string; context?: PageContext }) {
  const { className, style } = rootProps(`policy ${PAGE_PX}`, common, { top: 24, bottom: 96 });
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <div className={className} style={style}>
        <div className="policy__inner">
          <Breadcrumb current={breadcrumbTitle} className="policy__breadcrumb" />
          <header className="policy__header items-start max-desktop:gap-xl max-tablet:grid max-tablet:grid-cols-1 max-tablet:gap-y-lg">
            <div className="policy__title-block">
              {eyebrow ? <p className="eyebrow policy__eyebrow">{eyebrow}</p> : null}
              <h1 className="policy__heading" dangerouslySetInnerHTML={{ __html: heading || breadcrumbTitle }} />
            </div>
            {stats.length ? (
              <dl className="m-0 flex max-tablet:w-full max-tablet:justify-between">
                {stats.map((s, i) => (
                  <div
                    className="grid min-w-[max(6rem,calc(170*var(--px)))] justify-items-center gap-sm px-md text-center not-first:border-s not-first:border-line-card max-tablet:min-w-0 max-tablet:flex-1"
                    key={i}
                  >
                    <dd className="m-0 font-display text-[length:max(1.75rem,calc(40*var(--px)))] leading-[1.1] text-brand">{s.value}</dd>
                    {s.label ? <dt className={caps}>{s.label}</dt> : null}
                  </div>
                ))}
              </dl>
            ) : null}
          </header>
          {intro ? <div className="policy__intro max-w-[52rem]" dangerouslySetInnerHTML={{ __html: intro }} /> : null}

          {hubs.length ? (
            <section className={PAGE_BLOCK_GAP}>
              {hubsLabel ? <Label>{hubsLabel}</Label> : null}
              {/* Three cards; one per row below 990px, where the big code ran over the city name */}
              <ul className="m-0 mt-xl grid list-none grid-cols-3 gap-lg p-0 max-desktop:gap-md max-laptop:grid-cols-1" role="list">
                {hubs.map((h, i) => (
                  <li className="relative overflow-hidden rounded-card bg-raised p-xl shadow-raised max-desktop:p-lg" key={i}>
                    {h.code ? (
                      <span
                        className="absolute -top-sm end-md font-display text-[length:max(3rem,calc(80*var(--px)))] leading-none text-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] select-none max-tablet:text-[length:3rem]"
                        aria-hidden="true"
                      >
                        {h.code}
                      </span>
                    ) : null}
                    <h3 className={`relative ${serif} text-[length:max(1.5rem,calc(32*var(--px)))]`}>{h.city}</h3>
                    {h.regions ? <p className="relative m-0 mt-md mb-xl text-body-sm">{h.regions}</p> : null}
                    {h.cutoff ? (
                      <p className="m-0 flex items-baseline justify-between gap-md border-t border-line-card pt-md">
                        {/* "Cut-off" never breaks at the hyphen */}
                        <span className={`whitespace-nowrap text-brand ${caps}`}>{h.cutoffLabel || 'Cut-off'}</span>
                        <strong className="font-normal tracking-[0.08em]">{h.cutoff}</strong>
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {tiers.length ? (
            <section className={PAGE_BLOCK_GAP}>
              {tiersLabel ? <Label>{tiersLabel}</Label> : null}
              <ol className="m-0 mt-md list-none p-0" role="list">
                {tiers.map((t, i) => (
                  <li
                    className="grid grid-cols-[max(2.5rem,calc(79*var(--px)))_minmax(0,1fr)_auto_auto] items-start gap-x-xl py-lg max-tablet:grid-cols-[2rem_minmax(0,1fr)] max-tablet:gap-y-xs"
                    key={i}
                  >
                    <span className="text-label tracking-[0.1em] text-brand" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className={`${serif} text-[length:max(1.25rem,calc(24*var(--px)))]`}>{t.title}</h3>
                      {t.text ? <p className="m-0 mt-xs text-body-sm">{t.text}</p> : null}
                    </div>
                    {/* Phones: time and price drop under the title (column 2), left aligned */}
                    {t.time ? (
                      <p className="m-0 min-w-40 text-end text-body-sm max-tablet:col-[2] max-tablet:min-w-0 max-tablet:text-start">{t.time}</p>
                    ) : null}
                    {t.price ? (
                      <p className="m-0 min-w-28 text-end text-body text-brand max-tablet:col-[2] max-tablet:min-w-0 max-tablet:text-start">
                        {t.price}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {regions.length ? (
            <section className={PAGE_BLOCK_GAP}>
              {regionsLabel ? <Label>{regionsLabel}</Label> : null}
              {/* Four columns with hairlines between; two below 1200px; stacked with hairlines above on phones */}
              <ul className="m-0 mt-xl grid list-none grid-cols-4 p-0 max-desktop:grid-cols-2 max-desktop:gap-y-xl max-tablet:grid-cols-1" role="list">
                {regions.map((r, i) => (
                  <li
                    className="px-lg first:ps-0 not-first:border-s not-first:border-line-card max-desktop:odd:border-s-0 max-desktop:odd:ps-0 max-tablet:px-0 max-tablet:not-first:border-s-0 max-tablet:not-first:border-t max-tablet:not-first:pt-lg"
                    key={i}
                  >
                    {r.zone ? <p className={`m-0 text-brand ${caps}`}>{r.zone}</p> : null}
                    <h3 className={`${serif} mt-md mb-sm text-[length:max(1.25rem,calc(26*var(--px)))]`}>{r.name}</h3>
                    {r.text ? <p className="m-0 text-body-sm">{r.text}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {note ? (
            <p
              className={`m-0 ${PAGE_BLOCK_GAP} rounded-card border border-[color-mix(in_srgb,var(--color-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_7%,transparent)] px-xl py-lg leading-[1.7] max-tablet:px-lg max-tablet:py-md`}
              role="note"
            >
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
