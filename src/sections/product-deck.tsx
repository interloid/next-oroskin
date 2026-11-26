/**
 * Product deck ("New arrivals"): photo cards that fan out into an arc on scroll (rows below 1200px); one card
 * is open with the round cart button and a glass info card (theme: sections/product-deck.liquid, <product-deck>).
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';
import {
  float,
  loadProducts,
  PlaceholderPrice,
  ProductPlaceholder,
  ProductPrice,
  RoundQuickAdd,
  shortText,
  type QuickAddOptions,
} from '@/sections/_product-showcase';

export interface ProductDeckProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML: <em>word</em> = the highlighted word
  pill?: string; // small pill at the right of the heading
  badge?: string; // small label on every card ("New")
  buyLabel?: string; // the "Buy now" link in the info card; empty = no link
  linkLabel?: string; // "Explore all" button under the deck
  link?: string; // empty = /collections/<collection>
  productHandles?: string[];
  collection?: string;
  limit?: number;
  highlightColor?: string;
  cardHeight?: number; // % of the card width (85 = 0.85)
  cardSize?: number; // % (100 = Figma size)
  fanOnScroll?: boolean; // the stack fans out as the section scrolls in (never as the first section)
  fanStyle?: 'auto' | 'once' | 'scroll';
  cart?: QuickAddOptions;
}

export default async function ProductDeck({
  id,
  context,
  eyebrow,
  heading,
  pill,
  badge,
  buyLabel = 'Buy now',
  linkLabel = 'Explore all',
  link,
  productHandles,
  collection,
  limit = 7,
  highlightColor,
  cardHeight = 85,
  cardSize = 100,
  fanOnScroll = true,
  fanStyle = 'auto',
  cart = {},
  ...common
}: ProductDeckProps & { id: string; context?: PageContext }) {
  const products = await loadProducts(productHandles, collection, limit);
  const count = products.length || limit;
  const middle = (count - 1) / 2;
  const fan = fanOnScroll && context?.index !== 0;
  const first = context?.index === 0;
  const explore = link || (collection ? `/collections/${collection}` : '');
  const cartOpts = { size: 50, overlay: 10, ...cart };

  const largeVw = Math.min(Math.floor((cardSize * 25) / 100), 45);
  const largeCap = common.width === 'narrow' ? Math.min(cardSize * 12, 720) : 720;
  const sizes = `(min-width: 1200px) min(${largeVw}vw, ${largeCap}px), (min-width: 750px) 36vw, 54vw`;

  const rows2 = Math.floor((count + 1) / 2);
  const rows3 = Math.floor((count + 2) / 3);

  const cards = Array.from({ length: count }, (_, index) => {
    const p = products[index];
    const offset = index - middle;
    const place = (perRow: number, rows: number) => {
      const row = Math.floor(index / perRow);
      const inRow = Math.min(count - row * perRow, perRow);
      return { row, gx: (index % perRow) - (inRow - 1) / 2, last: row === rows - 1 };
    };
    const r2 = place(2, rows2);
    const r3 = place(3, rows3);
    const lastRow = [r2.last ? '2' : '', r3.last ? '3' : ''].filter(Boolean).join(' ');
    const img = p?.images[0];
    const text = p ? shortText(p) : '';
    return (
      <li
        key={index}
        className={`product-deck__card${index === 0 ? ' is-active' : ''}`}
        style={
          {
            '--i': String(index),
            '--o': float(offset),
            '--d': float(Math.abs(offset)),
            '--z': String(count - index + 9),
            '--row-2': String(r2.row),
            '--gx-2': float(r2.gx),
            '--row-3': String(r3.row),
            '--gx-3': float(r3.gx),
          } as React.CSSProperties
        }
        {...(lastRow ? { 'data-last-row': lastRow } : {})}
        data-card=""
      >
        <div className="product-deck__media">
          {img ? (
            <div className="image image--cover">
              <img
                src={img.src}
                alt=""
                width={img.width ?? 1024}
                height={img.height ?? 1024}
                loading={first ? 'eager' : 'lazy'}
                sizes={sizes}
                fetchPriority={first && index === 0 ? 'high' : 'auto'}
              />
            </div>
          ) : (
            <ProductPlaceholder className="product-deck__placeholder" />
          )}
        </div>
        {badge ? (
          <span className="product-deck__badge" aria-hidden="true">
            {badge}
          </span>
        ) : null}
        <button
          className="product-deck__pick"
          type="button"
          aria-label={`Show ${p ? p.title : 'Product title'}`}
          {...(index === 0 ? { 'aria-current': 'true' as const } : {})}
          data-pick=""
        ></button>
        {p ? <RoundQuickAdd product={p} sectionId={id} className="product-deck__cart" idSuffix={index + 1} {...cartOpts} /> : null}
        <div className="product-deck__info">
          {p ? (
            <>
              <h3 className="product-deck__title">
                <a className="product-deck__link" href={`/products/${p.handle}`}>
                  {p.title}
                </a>
              </h3>
              {text ? <p className="product-deck__text">{text}</p> : null}
              <div className="product-deck__footer">
                <div className="product-deck__price">
                  <ProductPrice product={p} />
                </div>
                {buyLabel ? (
                  <a className="button product-deck__buy" href={`/products/${p.handle}`}>
                    <span className="product-deck__buy-icon" aria-hidden="true">
                      <Icon name="buy" />
                    </span>
                    {buyLabel}
                  </a>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <h3 className="product-deck__title">Product title</h3>
              <div className="product-deck__price">
                <PlaceholderPrice />
              </div>
            </>
          )}
        </div>
      </li>
    );
  });

  return (
    <div id={`section-${id}`} className="shopify-section">
      <product-deck
        className={`product-deck full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-1'}`}
        style={sectionStyle(common, {
          ...(highlightColor ? { '--color-accent': highlightColor } : {}),
          '--half': float(middle),
          '--rows-2': String(rows2),
          '--rows-3': String(rows3),
          '--card-ratio': float(cardHeight / 100),
          '--card-scale': float(cardSize / 100),
        })}
        {...(fan ? { 'data-fan': '', 'data-fan-style': fanStyle } : {})}
      >
        <div className="product-deck__inner">
          <div className="product-deck__header">
            <div className="product-deck__titles">
              {eyebrow ? <p className="eyebrow eyebrow--center product-deck__eyebrow">{eyebrow}</p> : null}
              {heading ? <h2 className="product-deck__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
            </div>
            {pill ? <p className="product-deck__pill">{pill}</p> : null}
          </div>

          <div className="product-deck__stage">
            <ul className="product-deck__list" role="list">
              {cards}
            </ul>
          </div>

          {linkLabel && explore ? (
            <div className="product-deck__controls">
              <a className="button explore-button " href={explore}>
                {linkLabel}
                <span className="explore-button__icon" aria-hidden="true">
                  <Icon name="send" />
                  <Icon name="send" />
                </span>
              </a>
            </div>
          ) : null}
        </div>
      </product-deck>
    </div>
  );
}
