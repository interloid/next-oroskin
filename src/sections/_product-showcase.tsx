/**
 * Private helpers for Product panels and Product deck (not a section: the registry skips files that start with "_").
 * - loadProducts: the products of a handle list or a collection
 * - ProductPrice: theme snippets/price.liquid (card mode: "From" when variant prices differ)
 * - RoundQuickAdd: theme snippets/quick-add.liquid, round style (the glass cart button + overlay)
 * - shortText, ProductPlaceholder
 */
import Icon from '@/components/Icon';
import { api } from '@/lib/api';
import { money } from '@/lib/format';
import type { Product } from '@/lib/types';

export async function loadProducts(productHandles: string[] | undefined, collection: string | undefined, limit: number) {
  if (productHandles?.length) return (await api.products(productHandles)).slice(0, limit);
  if (collection) return ((await api.collection(collection, { pageSize: limit }))?.products ?? []).slice(0, limit);
  return [];
}

/** Subtitle, else the first 12 words of the description (Liquid truncatewords: 12). */
export function shortText(p: Product) {
  if (p.subtitle?.trim()) return p.subtitle;
  const words = p.descriptionHtml.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean);
  return words.length > 12 ? words.slice(0, 12).join(' ') + '...' : words.join(' ');
}

export function firstAvailableVariant(p: Product) {
  return p.variants.find((v) => v.available) ?? p.variants[0];
}

export function ProductPrice({ product }: { product: Product }) {
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const prices = product.variants.map((v) => v.price);
  const showFrom = prices.length > 1 && Math.min(...prices) !== Math.max(...prices);
  const cls = `price${onSale ? ' price--on-sale' : ''}${product.available ? '' : ' price--sold-out'}`;
  return (
    <div className={cls}>
      <span className="price__current">
        <span className="visually-hidden">{onSale ? 'Sale price' : 'Regular price'}</span>
        {showFrom ? `From ${money(product.price)}` : <span data-price-amount="">{money(product.price)}</span>}
      </span>
      {onSale ? (
        <span className="price__compare">
          <span className="visually-hidden">Regular price</span>
          <s>{money(product.compareAtPrice!)}</s>
        </span>
      ) : null}
    </div>
  );
}

/** Placeholder price for the empty state (Liquid: 1999 | money). */
export function PlaceholderPrice() {
  return (
    <div className="price">
      <span className="price__current">{money(1999)}</span>
    </div>
  );
}

/** Stand-in for Shopify's placeholder_svg_tag 'product-1'. */
export function ProductPlaceholder({ className }: { className: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5" aria-hidden="true" focusable="false">
      <rect width="525.5" height="525.5" fill="currentColor" opacity="0.08" />
      <path d="M262.75 150a60 60 0 1 1 0 120 60 60 0 0 1 0-120Zm-110 260c0-60 50-100 110-100s110 40 110 100Z" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export interface QuickAddOptions {
  size?: number; // px: 44 / 50 / 60 / 70
  iconColor?: string;
  overlay?: number; // 0-100 (%)
  options?: 'add_first' | 'link'; // products with several variants
}

/** The round glass cart button. Posts to /cart/add; the theme's <quick-add> script calls /cart/add.js. */
export function RoundQuickAdd({
  product,
  sectionId,
  className,
  idSuffix,
  size = 50,
  iconColor = '#ffffff',
  overlay = 0,
  options = 'add_first',
}: QuickAddOptions & { product: Product; sectionId: string; className: string; idSuffix: number }) {
  const variant = firstAvailableVariant(product);
  const several = product.variants.length > 1;
  const canAdd = product.available && (!several || options === 'add_first');
  const addName = several ? `${product.title} - ${variant.title}` : product.title;
  const style = {
    '--quick-add-size': `${size}px`,
    '--quick-add-color': iconColor,
    ...(overlay > 0 ? { '--quick-add-overlay': `${overlay}%` } : {}),
  } as React.CSSProperties;
  const overlayClass = overlay > 0 ? ' quick-add--overlay' : '';

  const art = (
    <>
      <span className="quick-add__line quick-add__line--1" aria-hidden="true"></span>
      <span className="quick-add__line quick-add__line--2" aria-hidden="true"></span>
      <span className="quick-add__cart" aria-hidden="true">
        <span className="quick-add__icon quick-add__icon--upright">
          <Icon name="cart" />
        </span>
        <span className="quick-add__icon quick-add__icon--tilt">
          <Icon name="cart-tilt" />
        </span>
        <span className="quick-add__tick">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 12.5 4 4 8-9" />
          </svg>
        </span>
      </span>
    </>
  );

  if (!canAdd) {
    return (
      <div className={`quick-add${overlayClass} ${className}`} style={style}>
        <a className="quick-add__button" href={`/products/${product.handle}`} aria-label={`Choose options for ${product.title}`}>
          {art}
        </a>
      </div>
    );
  }

  return (
    <quick-add
      className={`quick-add quick-add--round${overlayClass} ${className}`}
      style={style}
      data-variant-id={variant.id}
      data-label-added={`${addName} added to your cart`}
      data-label-error="Couldn't add this to your cart. Please try again."
    >
      <form
        method="post"
        action="/cart/add"
        id={`QuickAdd-${sectionId}-${product.id}-round-${className}-${idSuffix}`}
        acceptCharset="UTF-8"
        className="quick-add__form"
        encType="multipart/form-data"
      >
        <input type="hidden" name="form_type" value="product" />
        <input type="hidden" name="utf8" value="✓" />
        <input type="hidden" name="id" value={variant.id} />
        <input type="hidden" name="quantity" value="1" />
        <button type="submit" className="quick-add__button" aria-label={`Add ${addName} to cart`}>
          {art}
        </button>
        <input type="hidden" name="product-id" value={product.id} />
        <input type="hidden" name="section-id" value={sectionId} />
      </form>
      <span className="visually-hidden" role="status" data-quick-add-status=""></span>
      <span className="quick-add__message" popover="manual" aria-hidden="true" data-quick-add-message="" hidden></span>
    </quick-add>
  );
}

/** A Liquid float as Liquid prints it: 1 -> "1.0", 0.85 -> "0.85". */
export function float(n: number) {
  return Number.isInteger(n) ? n.toFixed(1) : String(n);
}
