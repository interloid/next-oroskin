/**
 * Shipping page (Figma 1:17093 "shipping"; never built in the theme, where Shopify's own /policies/shipping-policy is styled).
 * Reuses the policy header classes (breadcrumb, eyebrow, heading, intro); the rest is in public/theme/pages-extra.css.
 */
import type { PageContext } from '@/components/PageRenderer';
import { Breadcrumb, rootProps, type PageScreenOptions } from '@/sections/_page-shared';
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

function Label({ children }: { children: string }) {
  return (
    <h2 className="pages-label">
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
  const { className, style } = rootProps('policy shipping', common, { top: 24, bottom: 96 });
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <div className={className} style={style}>
        <div className="policy__inner">
          <Breadcrumb current={breadcrumbTitle} className="policy__breadcrumb" />
          <header className="policy__header shipping__header">
            <div className="policy__title-block">
              {eyebrow ? <p className="eyebrow policy__eyebrow">{eyebrow}</p> : null}
              <h1 className="policy__heading" dangerouslySetInnerHTML={{ __html: heading || breadcrumbTitle }} />
            </div>
            {stats.length ? (
              <dl className="shipping__stats">
                {stats.map((s, i) => (
                  <div className="shipping__stat" key={i}>
                    <dd className="shipping__stat-value">{s.value}</dd>
                    {s.label ? <dt className="shipping__stat-label">{s.label}</dt> : null}
                  </div>
                ))}
              </dl>
            ) : null}
          </header>
          {intro ? <div className="policy__intro shipping__intro" dangerouslySetInnerHTML={{ __html: intro }} /> : null}

          {hubs.length ? (
            <section className="shipping__block">
              {hubsLabel ? <Label>{hubsLabel}</Label> : null}
              <ul className="shipping__hubs" role="list">
                {hubs.map((h, i) => (
                  <li className="shipping__hub" key={i}>
                    {h.code ? (
                      <span className="shipping__hub-code" aria-hidden="true">
                        {h.code}
                      </span>
                    ) : null}
                    <h3 className="shipping__hub-city">{h.city}</h3>
                    {h.regions ? <p className="shipping__hub-regions">{h.regions}</p> : null}
                    {h.cutoff ? (
                      <p className="shipping__hub-cutoff">
                        <span>{h.cutoffLabel || 'Cut-off'}</span>
                        <strong>{h.cutoff}</strong>
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {tiers.length ? (
            <section className="shipping__block">
              {tiersLabel ? <Label>{tiersLabel}</Label> : null}
              <ol className="shipping__tiers" role="list">
                {tiers.map((t, i) => (
                  <li className="shipping__tier" key={i}>
                    <span className="shipping__tier-no" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="shipping__tier-copy">
                      <h3 className="shipping__tier-title">{t.title}</h3>
                      {t.text ? <p className="shipping__tier-text">{t.text}</p> : null}
                    </div>
                    {t.time ? <p className="shipping__tier-time">{t.time}</p> : null}
                    {t.price ? <p className="shipping__tier-price">{t.price}</p> : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {regions.length ? (
            <section className="shipping__block">
              {regionsLabel ? <Label>{regionsLabel}</Label> : null}
              <ul className="shipping__regions" role="list">
                {regions.map((r, i) => (
                  <li className="shipping__region" key={i}>
                    {r.zone ? <p className="shipping__region-zone">{r.zone}</p> : null}
                    <h3 className="shipping__region-name">{r.name}</h3>
                    {r.text ? <p className="shipping__region-text">{r.text}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {note ? (
            <p className="pages-note" role="note">
              {note}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
