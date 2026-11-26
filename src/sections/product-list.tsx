/**
 * Product list (theme: sections/product-list.liquid + snippets/product-list-items.liquid,
 * product-row-card.liquid). Layouts ported: "rows" (compact glass rows with a round quick add: "You might
 * love" under the empty cart) and "grid" (the big product cards). Not ported: "strip", "tabs".
 *
 * `onlyWhenCartEmpty`: the section renders only an empty `[data-cart-refresh]` marker while the bag has
 * items; the cart page script asks for this section again (Section Rendering API) after every change, so
 * it comes back when the bag empties. Needs the wrapper id `shopify-section-<id>`.
 */
import type { PageContext } from '@/components/PageRenderer';
import ContentBlocks, { type ContentBlockData } from '@/components/ContentBlocks';
import Price from '@/components/Price';
import ProductCard from '@/components/ProductCard';
import QuickAdd from '@/components/QuickAdd';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductListProps extends SectionCommon {
  layout?: 'rows' | 'grid';
  /** Heading area (Heading / Text / Button blocks). Default: "You might <em>love</em>" */
  blocks?: ContentBlockData[];
  /** Products from a collection (default "all"), or a fixed list of handles */
  collection?: string;
  products?: string[];
  limit?: number;
  columnsDesktop?: number;
  columnsPhone?: 1 | 2;
  animation?: 'fade-up' | 'none';
  /** For the cart page: show only while the bag is empty */
  onlyWhenCartEmpty?: boolean;
}

function RowCard({ product, loading, sectionId }: { product: Product; loading: 'eager' | 'lazy'; sectionId: string }) {
  const image = product.images[0];
  return (
    <div className="product-row-card">
      <a className="product-row-card__link" href={`/products/${product.handle}`}>
        <span className="product-row-card__media">
          {image ? <img src={image.src} alt="" width={192} height={192} loading={loading} sizes="84px" /> : null}
        </span>
        <div className="product-row-card__text">
          {product.type ? <span className="product-row-card__category">{product.type}</span> : null}
          <h3 className="product-row-card__title">{product.title}</h3>
          <div className="product-row-card__price">
            <Price product={product} />
          </div>
        </div>
      </a>
      <QuickAdd product={product} size={44} iconColor="var(--color-accent)" className="product-row-card__add" sectionId={sectionId} />
    </div>
  );
}

export default async function ProductList({
  id,
  context,
  layout = 'rows',
  blocks = [{ type: 'heading', html: 'You might <em>love</em>', italic: 'accent' }],
  collection = 'all',
  products: handles,
  limit = 4,
  columnsDesktop = 4,
  columnsPhone = 2,
  animation = 'fade-up',
  onlyWhenCartEmpty = false,
  ...common
}: ProductListProps & { id: string; context?: PageContext }) {
  const sectionId = `shopify-section-${id}`;

  if (onlyWhenCartEmpty) {
    const cart = await api.cart();
    if (cart.itemCount > 0) {
      return (
        <div id={sectionId} className="shopify-section">
          <div data-cart-refresh="" hidden></div>
        </div>
      );
    }
  }

  const list = handles?.length ? await api.products(handles) : ((await api.collection(collection))?.products ?? []);
  const products = list.slice(0, limit);
  if (!products.length) return null;

  const first = (context?.index ?? 0) < 3; // the theme's section-loading rule: eager in the first 3 sections
  const itemAnimation = context?.index === 0 ? 'none' : animation;

  return (
    <div id={sectionId} className="shopify-section">
      <div
        className={`product-list product-list--${layout} product-list--live full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-1'}`}
        style={sectionStyle(
          { paddingTop: 48, paddingBottom: 96, ...common },
          { '--columns-desktop': String(columnsDesktop), '--columns-mobile': String(columnsPhone) },
        )}
        {...(onlyWhenCartEmpty ? { 'data-cart-refresh': '' } : {})}
      >
        <product-list-ui className="product-list__inner">
          <h2 className="visually-hidden product-list__fallback-heading">Products</h2>
          {blocks.length ? (
            <div className="product-list__top">
              <div className="product-list__header">
                <ContentBlocks blocks={blocks} />
              </div>
            </div>
          ) : null}
          <animate-on-scroll>
            <ul className={`product-list__items product-list__items--${layout}`} role="list">
              {products.map((p, i) => (
                <li
                  className="product-list__item"
                  key={p.handle}
                  {...(itemAnimation !== 'none'
                    ? { 'data-animate': itemAnimation, style: { '--animate-delay': `${Math.min(i * 80, 480)}ms` } as React.CSSProperties }
                    : {})}
                >
                  {layout === 'rows' ? (
                    <RowCard product={p} loading={first ? 'eager' : 'lazy'} sectionId={id} />
                  ) : (
                    <ProductCard product={p} sectionId={id} loading={first && i < 4 ? 'eager' : 'lazy'} />
                  )}
                </li>
              ))}
            </ul>
          </animate-on-scroll>
        </product-list-ui>
      </div>
    </div>
  );
}
