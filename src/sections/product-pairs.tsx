/**
 * Product bundle ("Pairs well with"): this product + up to N other products as tickable cards, a summary of
 * the ticked ones with the total, and "Add all to cart" (theme: sections/product-pairs.liquid +
 * snippets/pair-card.liquid, <product-pairs> in theme.js).
 * The other products: `products` (handles) when given, else api.recommendations(handle). Sold-out products
 * and this product are skipped before the limit counts. The summary and total are computed here for the
 * cards ticked at the start (correct without JavaScript); the theme JS rebuilds them after each tick.
 * Cart: without JS the form posts items[][id] to /cart/add; the JS POSTs JSON {items:[{id,quantity}]} to /cart/add.js.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { api } from '@/lib/api';
import { money } from '@/lib/format';
import type { Product, Variant } from '@/lib/types';
import site from '@/data/site.json';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductPairsProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  /** Fallback / fixed list of other products (handles); empty = recommendations */
  products?: string[];
  /** Number of other products */
  limit?: number;
  /** Tick the other products at the start */
  preselect?: boolean;
}

const hasOnlyDefault = (p: Product) =>
  p.variants.length <= 1 && (!p.options.length || p.variants[0]?.title === 'Default' || p.variants[0]?.title === 'Default Title');

function pick(p: Product, variantId?: string) {
  return (
    (variantId && p.variants.find((v) => String(v.id) === variantId)) ||
    p.variants.find((v) => v.available) ||
    p.variants[0]
  );
}

function variantImage(p: Product, v?: Variant) {
  return v?.image || p.images[0]?.src || null;
}

function PairCard({
  product,
  variant,
  cardId,
  sizes,
  loading,
  checked,
  current,
}: {
  product: Product;
  variant: Variant;
  cardId: string;
  sizes: string;
  loading: 'eager' | 'lazy';
  checked: boolean;
  current?: boolean;
}) {
  const image = variantImage(product, variant);
  const img = product.images.find((i) => i.src === image) ?? product.images[0];
  const defaultOnly = hasOnlyDefault(product);
  const variantsJson = current
    ? JSON.stringify(
        Object.fromEntries(
          product.variants.map((v) => [
            String(v.id),
            {
              price: v.price,
              available: v.available,
              title: defaultOnly ? '' : v.title,
              image: variantImage(product, v),
              quantity: 1,
            },
          ])
        )
      ).replace(/</g, '\\u003c')
    : null;
  return (
    <div
      className="pair-card"
      data-pair-card=""
      data-variant-id={variant.id}
      data-price={variant.price}
      data-quantity="1"
      data-handle={product.handle}
      data-title={product.title}
      data-variant={defaultOnly ? '' : variant.title}
      {...(image ? { 'data-image': image } : {})}
      {...(current ? { 'data-pair-current': '' } : {})}
    >
      <div className="pair-card__media">
        <input
          type="checkbox"
          className="pair-card__input"
          id={cardId}
          name="items[][id]"
          value={variant.id}
          aria-label={`Add ${product.title} to the bundle`}
          data-pair-toggle=""
          defaultChecked={checked && variant.available}
          disabled={!variant.available}
        />
        <label className="pair-card__toggle" htmlFor={cardId}>
          {image ? (
            <img
              src={image}
              alt=""
              width={img?.width ?? 600}
              height={img?.height ?? 600}
              loading={loading}
              sizes={sizes}
              className="pair-card__image"
            />
          ) : null}
          <span className="pair-card__tick" aria-hidden="true">
            <Icon name="check" />
          </span>
        </label>
      </div>
      <a href={`/products/${product.handle}`} className="pair-card__title">
        {product.title}
      </a>
      <p className="pair-card__price" data-pair-price="">
        {money(variant.price)}
      </p>
      <p className="pair-card__note" data-pair-note="" hidden={variant.available}>
        Sold out
      </p>
      {variantsJson ? (
        <script type="application/json" data-pair-variants="" dangerouslySetInnerHTML={{ __html: variantsJson }} />
      ) : null}
    </div>
  );
}

export default async function ProductPairs({
  id,
  context,
  eyebrow,
  heading,
  products,
  limit = 3,
  preselect = false,
  ...common
}: ProductPairsProps & { id: string; context?: PageContext }) {
  const product = context?.product;
  if (!product) return null;

  const candidates = products?.length ? await api.products(products) : await api.recommendations(product.handle, 10);
  const others = (candidates ?? []).filter((p) => p.available && p.handle !== product.handle).slice(0, limit);

  const v = context?.searchParams?.variant;
  const current = pick(product, typeof v === 'string' ? v : undefined);
  const width = common.width ?? 'widest';
  const sizes =
    width === 'wide' ? '(min-width: 1200px) min(17vw, 21rem), 31vw' : '(min-width: 1200px) 17vw, 31vw';
  const loading = context?.index === 0 ? 'eager' : 'lazy';

  // The summary for the cards ticked at the start
  const lineName = (p: Product, variant: Variant) => (hasOnlyDefault(p) ? p.title : `${p.title} · ${variant.title}`);
  const lines: { name: string; price: number }[] = [];
  if (current.available) lines.push({ name: lineName(product, current), price: current.price });
  const otherCards = others.map((p) => ({ product: p, variant: pick(p) }));
  if (preselect) otherCards.forEach(({ product: p, variant }) => lines.push({ name: lineName(p, variant), price: variant.price }));
  const total = lines.reduce((sum, l) => sum + l.price, 0);

  return (
    <section id={`section-${id}`} className="shopify-section product-pairs-section">
      <product-pairs
        className={`product-pairs full-width section-width--${width} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 64, paddingBottom: 64, ...common })}
        data-limit={limit}
        data-money-format={site.moneyFormat}
        data-label-add="Add all to cart"
        data-label-added="Added"
        data-label-status="The bundle was added to your cart"
        data-label-error="Couldn't add this to your cart. Please try again."
        data-label-line="[title] · [variant]"
        data-label-sold-out="Sold out"
        data-label-unavailable="Unavailable"
        {...(others.length ? {} : { 'data-empty': '' })}
      >
        <div className="product-pairs__inner">
          <div className="product-pairs__header">
            {eyebrow ? <p className="eyebrow product-pairs__eyebrow">{eyebrow}</p> : null}
            {heading ? <h2 className="product-pairs__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
          </div>
          <form action="/cart/add" method="post" className="product-pairs__layout" data-pairs-form="">
            <div className="product-pairs__list" data-pairs-list="">
              <PairCard
                product={product}
                variant={current}
                cardId={`Pair-${id}-current`}
                sizes={sizes}
                loading={loading}
                checked
                current
              />
              {otherCards.map(({ product: p, variant }) => (
                <PairCard
                  key={p.handle}
                  product={p}
                  variant={variant}
                  cardId={`Pair-${id}-${p.id}`}
                  sizes={sizes}
                  loading={loading}
                  checked={preselect}
                />
              ))}
            </div>
            <div className="product-pairs__summary">
              <p className="product-pairs__label">Your products</p>
              <ul className="product-pairs__lines" role="list" data-pairs-lines="">
                {lines.map((l, i) => (
                  <li className="product-pairs__line" key={i}>
                    <span>{l.name}</span> <span>{money(l.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="product-pairs__none" data-pairs-none="" hidden={lines.length > 0}>
                Tick the products you want in the bundle.
              </p>
              <div className="product-pairs__total">
                <p className="product-pairs__total-label">Bundle total</p>
                <p className="product-pairs__total-price" data-pairs-total="">
                  {money(total)}
                </p>
              </div>
              <button type="submit" className="button product-pairs__add" data-pairs-add="" disabled={!lines.length}>
                <span className="product-pairs__add-icon" aria-hidden="true">
                  <Icon name="cart" />
                </span>
                <span data-pairs-add-label="">Add all to cart</span>
              </button>
              <p className="product-pairs__message" role="alert" hidden data-pairs-message=""></p>
              <span className="visually-hidden" aria-live="polite" data-pairs-status=""></span>
            </div>
          </form>
        </div>
      </product-pairs>
    </section>
  );
}
