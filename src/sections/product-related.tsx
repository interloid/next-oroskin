/**
 * Related products (theme: sections/product-related.liquid): an eyebrow / heading, "View all →", then
 * product cards (ProductCard, 'full' or 'tile'). Shopify loads the related products later through
 * /recommendations/products; here they are rendered on the server from api.recommendations(), so the
 * element has no data-url and the theme's <product-related> script does nothing.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import ProductCard from '@/components/ProductCard';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductRelatedProps extends SectionCommon {
  eyebrow?: string;
  /** HTML; when set the eyebrow sits above it, else the eyebrow is the heading. */
  heading?: string;
  linkLabel?: string;
  /** Default: the product's first collection, else /collections/all. */
  linkUrl?: string;
  limit?: number;
  columns?: number;
  cardStyle?: 'full' | 'tile';
  cardShape?: '890 / 398' | '4 / 3' | '1 / 1' | '4 / 5';
  animation?: 'none' | 'fade-up';
  /** Product handles used when there are no recommendations. */
  fallbackProducts?: string[];
}

export default async function ProductRelated({
  id,
  context,
  eyebrow = 'You may also love',
  heading,
  linkLabel = 'View all',
  linkUrl,
  limit = 2,
  columns = 2,
  cardStyle = 'full',
  cardShape = '890 / 398',
  animation = 'fade-up',
  fallbackProducts = [],
  ...common
}: ProductRelatedProps & { id: string; context?: PageContext }) {
  const product = context?.product;
  let items: Product[] = product ? await api.recommendations(product.handle, limit + 1) : [];
  if (!items.length && fallbackProducts.length) items = await api.products(fallbackProducts);
  items = items.filter((p) => p.handle !== product?.handle).slice(0, limit);
  if (!items.length) return null;

  const first = (context?.index ?? 0) === 0;
  const anim = first ? 'none' : animation;
  const tileRatioSmall = cardShape === '890 / 398' || cardShape === '4 / 3' ? '4 / 5' : cardShape;
  const cardRatio = cardShape === '1 / 1' ? 'square' : cardShape === '4 / 5' ? 'portrait' : 'landscape';
  const sectionVw = common.width === 'full' ? 96 : 92;
  const columnVw = Math.floor(sectionVw / columns) + 1;
  let tabletVw = Math.floor(sectionVw / 2) + 1;
  let phoneVw = sectionVw;
  if (cardStyle === 'tile' && tileRatioSmall !== cardShape) {
    tabletVw = Math.ceil(tabletVw * 1.25);
    phoneVw = Math.ceil(sectionVw * 1.25);
  }
  const desktop = common.width === 'wide' ? `min(${columnVw}vw, ${Math.floor(1650 / columns)}px)` : `${columnVw}vw`;
  const sizes = `(min-width: 990px) ${desktop}, (min-width: 750px) ${tabletVw}vw, ${phoneVw}vw`;
  const viewAll = linkUrl ?? '/collections/all';

  return (
    <section id={`section-${id}`} className="shopify-section">
      <product-related
        className={`product-related product-related--${cardStyle} full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle(
          { paddingTop: 64, paddingBottom: 96, ...common },
          { '--columns': String(columns), '--tile-ratio': cardShape, '--tile-ratio-small': tileRatioSmall },
        )}
      >
        <div className="product-related__inner">
          <div className="product-related__header">
            {heading ? (
              <>
                {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
                <h2 className="product-related__heading" dangerouslySetInnerHTML={{ __html: heading }} />
              </>
            ) : eyebrow ? (
              <h2 className="eyebrow eyebrow--center product-related__eyebrow">{eyebrow}</h2>
            ) : (
              <h2 className="visually-hidden">Related products</h2>
            )}
            {linkLabel ? (
              <a className="product-related__all" href={viewAll}>
                {linkLabel}
                <span className="product-related__arrow" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </a>
            ) : null}
          </div>
          <div data-related-slot="">
            <animate-on-scroll className="product-related__grid" data-related-grid="">
              {items.map((item, i) => (
                <div
                  key={item.handle}
                  className="product-related__item"
                  {...(anim !== 'none' ? { 'data-animate': anim, style: { '--animate-delay': `${i * 120}ms` } as React.CSSProperties } : {})}
                >
                  {cardStyle === 'tile' ? (
                    <ProductCard
                      product={item}
                      style="tile"
                      sizes={sizes}
                      loading={first ? 'eager' : 'lazy'}
                      showDetails
                      showRating
                      showDescription
                      sectionId={id}
                    />
                  ) : (
                    <ProductCard
                      product={item}
                      style="full"
                      imageRatio={cardRatio}
                      sizes={sizes}
                      loading={first ? 'eager' : 'lazy'}
                      showRating
                      sectionId={id}
                    />
                  )}
                </div>
              ))}
            </animate-on-scroll>
          </div>
        </div>
      </product-related>
    </section>
  );
}
