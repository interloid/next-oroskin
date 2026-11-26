/**
 * Product panels ("Editor's picks"): tall photo strips, one per product, one strip open with a glass card
 * and the round cart button (theme: sections/product-panels.liquid, <product-panels> in theme.js).
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';
import {
  loadProducts,
  PlaceholderPrice,
  ProductPlaceholder,
  ProductPrice,
  RoundQuickAdd,
  shortText,
  float,
  type QuickAddOptions,
} from '@/sections/_product-showcase';

export interface ProductPanelsProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML: <em>word</em> = the highlighted (accent, italic) word
  linkLabel?: string;
  link?: string; // empty = /collections/<collection>
  productHandles?: string[]; // the products, in order (or use `collection`)
  collection?: string; // collection handle
  limit?: number;
  highlightColor?: string; // empty = the scheme's accent
  panelHeight?: number; // strip height (vw-based units, theme "Strip height")
  fillScreen?: boolean;
  cardRadius?: number; // px
  mobileLayout?: 'grid' | 'slider' | 'single';
  mobileHeight?: number; // % (phones strip height)
  cart?: QuickAddOptions;
  animation?: 'none' | 'fade-up' | 'zoom-in';
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Width of an OPEN strip per screen (theme: 18500 / (100 n + 85) vw, rounded up). */
function imageSizes(shown: number, mobileLayout: string) {
  const w = (max: number) => Math.floor(18500 / (Math.min(shown, max) * 100 + 85)) + 1;
  const phone = mobileLayout === 'single' ? '100vw' : mobileLayout === 'slider' ? '75vw' : '50vw';
  return `(min-width: 1600px) ${w(7)}vw, (min-width: 1200px) ${w(5)}vw, (min-width: 990px) ${w(4)}vw, (min-width: 750px) ${w(3)}vw, ${phone}`;
}

export default async function ProductPanels({
  id,
  context,
  eyebrow,
  heading,
  linkLabel = 'View all',
  link,
  productHandles,
  collection,
  limit = 7,
  highlightColor,
  panelHeight = 29,
  fillScreen = false,
  cardRadius = 12,
  mobileLayout = 'grid',
  mobileHeight = 100,
  cart = {},
  animation = 'fade-up',
  ...common
}: ProductPanelsProps & { id: string; context?: PageContext }) {
  const products = await loadProducts(productHandles, collection, limit);
  const count = products.length || limit;
  const sizes = imageSizes(count, mobileLayout);
  const viewAll = link || (collection ? `/collections/${collection}` : '');
  const anim = context?.index === 0 ? 'none' : animation;
  const first = context?.index === 0;
  const cartOpts = { size: 60, overlay: 10, ...cart };

  const items = products.length
    ? products.map((p, i) => {
        const text = shortText(p);
        const img = p.images[0];
        return (
          <li key={p.handle} className={`product-panels__item${i === 0 ? ' is-active' : ''}`} data-panel="">
            <div className="product-panels__media">
              {img ? (
                <div className="image image--cover">
                  <img
                    src={img.src}
                    alt=""
                    width={img.width ?? 1024}
                    height={img.height ?? 1024}
                    loading={first ? 'eager' : 'lazy'}
                    sizes={sizes}
                    fetchPriority={first && i === 0 ? 'high' : 'auto'}
                  />
                </div>
              ) : (
                <ProductPlaceholder className="product-panels__placeholder" />
              )}
            </div>
            <span className="product-panels__number" aria-hidden="true">
              {pad(i + 1)}
            </span>
            <RoundQuickAdd product={p} sectionId={id} className="product-panels__cart" idSuffix={i + 1} {...cartOpts} />
            <div className="product-panels__card">
              <h3 className="product-panels__title">
                <a className="product-panels__link" href={`/products/${p.handle}`}>
                  {p.title}
                </a>
              </h3>
              {text ? <p className="product-panels__text">{text}</p> : null}
              <div className="product-panels__price">
                <ProductPrice product={p} />
              </div>
            </div>
          </li>
        );
      })
    : Array.from({ length: limit }, (_, i) => (
        <li key={i} className={`product-panels__item${i === 0 ? ' is-active' : ''}`} data-panel="">
          <div className="product-panels__media">
            <ProductPlaceholder className="product-panels__placeholder" />
          </div>
          <span className="product-panels__number" aria-hidden="true">
            {pad(i + 1)}
          </span>
          <div className="product-panels__card">
            <h3 className="product-panels__title">Product title</h3>
            <div className="product-panels__price">
              <PlaceholderPrice />
            </div>
          </div>
        </li>
      ));

  return (
    <div id={`section-${id}`} className="shopify-section">
      <product-panels
        className={`product-panels full-width section-width--${common.width ?? 'wide'} color-${common.colorScheme ?? 'scheme-1'} product-panels--mobile-${mobileLayout}${fillScreen ? ' product-panels--fill' : ''}`}
        style={sectionStyle(common, {
          ...(highlightColor ? { '--color-accent': highlightColor } : {}),
          '--panels-height': String(panelHeight),
          '--panels-card-radius': `${cardRadius}px`,
          '--panels-mobile-scale': float(mobileHeight / 100),
        })}
      >
        <div className="product-panels__inner">
          <div className="product-panels__header">
            <div className="product-panels__titles">
              {eyebrow ? <p className="eyebrow product-panels__eyebrow">{eyebrow}</p> : null}
              {heading ? <h2 className="product-panels__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
            </div>
            {linkLabel && viewAll ? (
              <a className="button button--text product-panels__view-all" href={viewAll}>
                {linkLabel}
                <span className="product-panels__arrow" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </a>
            ) : null}
          </div>

          <animate-on-scroll>
            <ul className="product-panels__list" role="list" {...(anim !== 'none' ? { 'data-animate': anim } : {})}>
              {items.flatMap((item, i) =>
                i < items.length - 1
                  ? [item, <li key={`b${i}`} className="product-panels__break" aria-hidden="true"></li>]
                  : [item],
              )}
            </ul>
          </animate-on-scroll>
        </div>
      </product-panels>
    </div>
  );
}
