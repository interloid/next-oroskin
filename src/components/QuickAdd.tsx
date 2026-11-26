/**
 * Quick add (theme: snippets/quick-add.liquid): the cart button on product cards.
 * A real form (POST /cart/add) so it works without JS; the theme's <quick-add> script sends it to
 * /cart/add.js in the background and plays the cart animation. Server component.
 *
 *   <QuickAdd product={p} />                                  round icon button (default)
 *   <QuickAdd product={p} style="pill" label="Add to cart" />  pill with text
 */
import Icon from '@/components/Icon';
import type { Product, Variant } from '@/lib/types';

export interface QuickAddProps {
  product: Product;
  /** The variant to add. Default: the first available variant (else the first). */
  variant?: Variant;
  style?: 'round' | 'pill';
  /** Button size in px (default 50). */
  size?: number;
  /** Icon colour (default #ffffff). */
  iconColor?: string;
  /** Pill text (default "Add to cart"). */
  label?: string;
  /** Pill only: false hides the cart icon. */
  showIcon?: boolean;
  /** Products with several variants: add the first available one, or link to the product page. */
  options?: 'add_first' | 'link';
  /** Extra classes on <quick-add>. */
  className?: string;
  /** Overlay strength behind the round button (0 = none). */
  overlay?: number;
  /** For unique form ids: the section id and an optional suffix. */
  sectionId?: string;
  idSuffix?: string;
}

const handleize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '-')
    .replace(/^-|-$/g, '');

export function defaultVariant(product: Product): Variant | undefined {
  return product.variants.find((v) => v.available) ?? product.variants[0];
}

/** "Signature Body Mist - 50 ml" when the product has several variants, else the title. */
export function addName(product: Product, variant?: Variant) {
  return product.variants.length > 1 && variant ? `${product.title} - ${variant.title}` : product.title;
}

function Tick() {
  return (
    <span className="quick-add__tick">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 12.5 4 4 8-9"></path>
      </svg>
    </span>
  );
}

export default function QuickAdd({
  product,
  variant = defaultVariant(product),
  style = 'round',
  size = 50,
  iconColor = '#ffffff',
  label = 'Add to cart',
  showIcon = true,
  options = 'add_first',
  className = '',
  overlay = 0,
  sectionId = 'section',
  idSuffix,
}: QuickAddProps) {
  const canAdd = product.available && (product.variants.length === 1 || options === 'add_first') && !!variant;
  const name = addName(product, variant);
  const iconMode = style === 'pill' && !showIcon ? 'none' : 'cart';
  const withOverlay = style === 'round' && overlay > 0;
  const css = {
    '--quick-add-size': `${size}px`,
    '--quick-add-color': iconColor,
    ...(withOverlay ? { '--quick-add-overlay': `${overlay}%` } : {}),
  } as React.CSSProperties;
  const overlayClass = withOverlay ? ' quick-add--overlay' : '';
  let formId = `QuickAdd-${sectionId}-${product.id}-${style}`;
  if (className) formId += `-${handleize(className)}`;
  if (idSuffix) formId += `-${idSuffix}`;

  const art =
    iconMode === 'cart' ? (
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
          <Tick />
        </span>
      </>
    ) : (
      <span className="quick-add__cart quick-add__cart--none" aria-hidden="true">
        <span className="quick-add__spinner"></span>
        <Tick />
      </span>
    );
  const hiddenName = (
    <span className="visually-hidden" data-quick-add-name="">
      : {name}
    </span>
  );

  if (canAdd) {
    return (
      <quick-add
        className={`quick-add quick-add--${style}${overlayClass} ${className}`}
        style={css}
        data-variant-id={variant!.id}
        data-label-added={`${name} added to your cart`}
        data-label-error="Couldn't add this to your cart. Please try again."
      >
        <form method="post" action="/cart/add" id={formId} acceptCharset="UTF-8" className="quick-add__form" encType="multipart/form-data">
          <input type="hidden" name="form_type" value="product" />
          <input type="hidden" name="utf8" value="✓" />
          <input type="hidden" name="id" value={variant!.id} />
          <input type="hidden" name="quantity" value="1" />
          {style === 'pill' ? (
            <button type="submit" className="quick-add__button">
              {art}
              <span className="quick-add__label">{label}</span>
              {hiddenName}
            </button>
          ) : (
            <button type="submit" className="quick-add__button" aria-label={`Add ${name} to cart`}>
              {art}
            </button>
          )}
          <input type="hidden" name="product-id" value={product.id} />
          <input type="hidden" name="section-id" value={sectionId} />
        </form>
        <span className="visually-hidden" role="status" data-quick-add-status=""></span>
        <span className="quick-add__message" popover="manual" aria-hidden="true" data-quick-add-message="" hidden></span>
      </quick-add>
    );
  }
  if (style === 'pill') {
    return (
      <div className={`quick-add quick-add--pill ${className}`} style={css}>
        {product.available ? (
          <a className="quick-add__button" href={`/products/${product.handle}`}>
            View details{hiddenName}
          </a>
        ) : (
          <button type="button" className="quick-add__button" disabled>
            Sold out{hiddenName}
          </button>
        )}
      </div>
    );
  }
  return (
    <div className={`quick-add${overlayClass} ${className}`} style={css}>
      <a className="quick-add__button" href={`/products/${product.handle}`} aria-label={`Choose options for ${product.title}`}>
        {art}
      </a>
    </div>
  );
}
