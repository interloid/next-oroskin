/**
 * The Trending list (theme: snippets/trending-list.liquid): a heading with "View all", then numbered
 * product rows (01 · thumbnail · category + badge · title · price). Shared by the Image banner's
 * Trending sheet and the Trending products section. Server component.
 */
import Icon from '@/components/Icon';
import { fluidFontSize } from '@/components/ContentBlocks';
import ProductPrice from '@/components/ProductPrice';
import type { Product } from '@/lib/types';

export interface TrendingListProps {
  products: Product[];
  phoneLimit?: number; // rows after this number are hidden below 750px
  heading?: string; // inline HTML (<em> = accent)
  linkLabel?: string;
  link?: string;
  headingSize?: number; // px at 1920px
  titleSize?: number; // px at 1920px
  loading?: 'eager' | 'lazy';
  animation?: string; // row reveal, e.g. 'fade-up'
  badgeScheme?: string; // colour scheme of plain badges
}

export default function TrendingList({
  products,
  phoneLimit,
  heading,
  linkLabel,
  link,
  headingSize,
  titleSize,
  loading = 'lazy',
  animation = 'none',
  badgeScheme = 'scheme-5',
}: TrendingListProps) {
  const phoneRows = phoneLimit ?? products.length;
  return (
    <div className="trending-list">
      {!heading ? <h2 className="visually-hidden">Trending products</h2> : null}
      {heading || linkLabel ? (
        <div className="trending-list__header">
          {heading ? (
            <h2
              className={`trending-list__heading${headingSize ? ' trending-list__heading--custom' : ''}`}
              style={headingSize ? (fluidFontSize(headingSize) as React.CSSProperties) : undefined}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          ) : null}
          {linkLabel && link ? (
            <a className="button button--text trending-list__view-all" href={link}>
              {linkLabel}
              <span className="trending-list__arrow" aria-hidden="true">
                <Icon name="arrow" />
              </span>
            </a>
          ) : null}
        </div>
      ) : null}
      <animate-on-scroll>
        <ol
          className={`trending-list__rows${titleSize ? ' trending-list__rows--custom' : ''}`}
          role="list"
          style={titleSize ? (fluidFontSize(titleSize) as React.CSSProperties) : undefined}
        >
          {products.map((p, i) => {
            const image = p.images[0];
            const badge = p.badges[0];
            const reveal =
              animation !== 'none'
                ? {
                    'data-animate': animation,
                    style: { '--animate-delay': `${Math.min(i * 80, 480)}ms` } as React.CSSProperties,
                  }
                : {};
            return (
              <li
                key={p.handle}
                className={`trending-list__row${i + 1 > phoneRows ? ' trending-list__row--no-phone' : ''}`}
                {...reveal}
              >
                <span className="trending-list__number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="trending-list__thumb">
                  {image ? (
                    <img src={image.src} alt="" width={240} height={160} loading={loading} sizes="120px" />
                  ) : null}
                </div>
                <div className="trending-list__meta">
                  {p.type ? <p className="trending-list__category">{p.type}</p> : null}
                  <div className="trending-list__badge">
                    {badge ? <span className={`product-card__badge color-${badgeScheme}`}>{badge}</span> : null}
                  </div>
                </div>
                <h3 className="trending-list__title">
                  <a className="trending-list__link" href={`/products/${p.handle}`}>
                    {p.title}
                  </a>
                </h3>
                <div className="trending-list__price">
                  <ProductPrice product={p} />
                </div>
              </li>
            );
          })}
        </ol>
      </animate-on-scroll>
    </div>
  );
}
