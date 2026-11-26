/**
 * Cart page (theme: sections/cart.liquid + snippets/cart-item.liquid). Breadcrumb, eyebrow + "Shopping bag"
 * with the item count; the empty bag strip, or the items (form #CartForm, works without JS: POST /cart)
 * with the coupons card, the order summary and the phone bottom bar. The theme's <cart-page> script
 * changes quantities through /cart/update.js with `sections` (src/app/(store)/cart/*.js) and swaps in
 * this section's fresh HTML, so the wrapper id must stay `shopify-section-<id>`.
 * Not ported: gift wrap (no wrap products in the demo, the theme hides the card then), express checkout
 * buttons, app blocks.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { toShopifyCart, type ShopifyLine } from '@/cart/shopify';
import { api } from '@/lib/api';
import { money } from '@/lib/format';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface CartProps extends SectionCommon {
  showBreadcrumb?: boolean;
  eyebrow?: string;
  heading?: string;
  /** Empty bag */
  emptyTitle?: string;
  emptyText?: string; // HTML
  emptyLinkLabel?: string;
  emptyLink?: string;
  emptyButtonLabel?: string;
  emptyButtonsDirection?: 'row' | 'column';
  /** "Continue shopping" target */
  continueLink?: string;
  showNote?: boolean;
  showCoupons?: boolean;
  /** Free shipping from this order total, in minor units (20000 = Rs. 200). 0 = no bar */
  freeShippingThreshold?: number;
  /** "Links and highlights" colour override (hex) */
  highlightColor?: string;
}

/** Liquid money_without_trailing_zeros: "Rs. 200" instead of "Rs. 200.00" */
const moneyShort = (amount: number) => money(amount).replace(/\.00(?!\d)/, '');

const handleize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function CartItem({ item, index }: { item: ShopifyLine; index: number }) {
  const selectId = `CartItemSelect-${handleize(item.key)}`;
  const title = item.product_title;
  const onSale = item.original_line_price > item.final_line_price;
  return (
    <li className="cart-item" data-line-key={item.key} data-index={index}>
      <label className="cart-item__select" htmlFor={selectId}>
        <input id={selectId} className="cart-item__checkbox" type="checkbox" value={item.key} data-cart-select="" data-cart-focus={`select-${item.key}`} />
        <span className="visually-hidden">Select {title}</span>
      </label>

      <a className="cart-item__media" href={item.url} tabIndex={-1} aria-hidden="true">
        {item.image ? (
          <img
            className="image--cover"
            src={item.image}
            alt=""
            width={300}
            height={300}
            sizes="(min-width: 750px) 98px, 36px"
            loading={index > 3 ? 'lazy' : 'eager'}
          />
        ) : null}
      </a>

      <div className="cart-item__details">
        {item.product_type ? <p className="cart-item__type">{item.product_type}</p> : null}
        <a className="cart-item__title" href={item.url}>
          {title}
        </a>
        {!item.product_has_only_default_variant ? (
          <ul className="cart-item__options" role="list">
            {item.options_with_values.map((o) => (
              <li className="cart-item__option" key={o.name}>
                <span className="visually-hidden">{o.name}:</span> {o.value}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="cart-item__price">
          {onSale ? (
            <>
              <span className="visually-hidden">Sale price</span> {money(item.final_line_price)}{' '}
              <span className="visually-hidden">Regular price</span> <s className="cart-item__compare">{money(item.original_line_price)}</s>
            </>
          ) : (
            money(item.final_line_price)
          )}
        </p>
      </div>

      <div className="cart-item__actions">
        <div className="cart-item__quantity" style={{ '--digits': String(item.quantity).length } as React.CSSProperties}>
          <button
            type="button"
            className="cart-item__step"
            data-cart-step="-1"
            data-cart-focus={`minus-${item.key}`}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity for ${title}`}
          >
            <Icon name="minus" />
          </button>
          <label className="visually-hidden" htmlFor={`CartQuantity-${index}`}>
            Quantity for {title}
          </label>
          <input
            className="cart-item__input"
            id={`CartQuantity-${index}`}
            type="number"
            name="updates[]"
            defaultValue={item.quantity}
            min={0}
            inputMode="numeric"
            data-cart-quantity=""
            data-cart-focus={`quantity-${item.key}`}
          />
          <button
            type="button"
            className="cart-item__step"
            data-cart-step="1"
            data-cart-focus={`plus-${item.key}`}
            aria-label={`Increase quantity for ${title}`}
          >
            <Icon name="plus" />
          </button>
        </div>
        <a
          className="cart-item__remove"
          href={`/cart/change?id=${encodeURIComponent(item.key)}&quantity=0`}
          data-cart-remove=""
          aria-label={`Remove ${title}`}
        >
          <Icon name="trash" />
        </a>
      </div>
    </li>
  );
}

export default async function CartSection({
  id,
  showBreadcrumb = true,
  eyebrow = 'Your selection',
  heading = 'Shopping bag',
  emptyTitle = 'Your bag is empty',
  emptyText = '<p>Browse our skincare, fragrance and makeup to find something you love.</p>',
  emptyLinkLabel = 'Shop new arrivals',
  emptyLink = '/collections/new-arrivals',
  emptyButtonLabel = 'Continue shopping',
  emptyButtonsDirection = 'row',
  continueLink = '/collections/all',
  showNote = true,
  showCoupons = true,
  freeShippingThreshold = 20000,
  highlightColor,
  ...common
}: CartProps & { id: string; context?: PageContext }) {
  const cart = toShopifyCart(await api.cart());
  const empty = cart.item_count === 0;
  const total = money(cart.total_price);

  const showShipping = freeShippingThreshold > 0;
  const remaining = freeShippingThreshold - cart.total_price;
  const unlocked = showShipping && remaining <= 0;
  const progress = showShipping ? Math.min(100, Math.floor((cart.total_price * 100) / freeShippingThreshold)) : 0;

  const continueInner = (
    <>
      <Icon name="arrow" />
      Continue shopping
    </>
  );

  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <cart-page
        className={`cart-page full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-1'}`}
        style={sectionStyle(
          { paddingTop: 40, paddingBottom: 96, ...common },
          highlightColor ? { '--color-accent': highlightColor } : {},
        )}
        data-section-id={id}
        data-cart-url="/cart"
        data-label-updated="Cart updated"
        data-label-error="Couldn't update your cart. Please try again."
        data-label-selected="[count] selected"
        data-label-coupon-applied="[code] applied"
        data-label-coupon-invalid="[code] can't be used right now. It may have expired or reached its limit, or your cart may not qualify yet."
        data-label-coupon-exists="[code] is already applied"
        data-label-coupon-remove="Remove code [code]"
      >
        <p className="visually-hidden" role="status" data-cart-status=""></p>

        <div className="cart-page__inner">
          {showBreadcrumb ? (
            <nav className="cart-page__breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li aria-current="page">Cart</li>
              </ol>
            </nav>
          ) : null}

          <header className="cart-page__header">
            {eyebrow ? <p className="eyebrow cart-page__eyebrow">{eyebrow}</p> : null}
            <h1 className="cart-page__title" tabIndex={-1} data-cart-heading="">
              {heading || 'Cart'}
              {!empty ? (
                <>
                  <sup className="cart-page__count" aria-hidden="true">
                    {cart.item_count}
                  </sup>
                  <span className="visually-hidden">
                    ({cart.item_count} {cart.item_count === 1 ? 'item' : 'items'})
                  </span>
                </>
              ) : null}
            </h1>
          </header>

          {empty ? (
            <div className="cart-empty">
              <div className="cart-empty__strip">
                <span className="cart-empty__icon" aria-hidden="true">
                  <Icon name="cart" />
                </span>
                <div className="cart-empty__message">
                  <h2 className="cart-empty__title">{emptyTitle}</h2>
                  {emptyText ? <div className="cart-empty__text rte" dangerouslySetInnerHTML={{ __html: emptyText }} /> : null}
                </div>
                <div className={`cart-empty__actions cart-empty__actions--${emptyButtonsDirection}`}>
                  {emptyLink && emptyLinkLabel ? (
                    <a className="button button--text cart-empty__link" href={emptyLink}>
                      {emptyLinkLabel}
                      <Icon name="arrow" />
                    </a>
                  ) : null}
                  <a className="button" href={continueLink}>
                    {emptyButtonLabel}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="cart-page__layout">
                <div className="cart-page__main">
                  {showShipping ? (
                    <div className={`cart-shipping${unlocked ? ' is-unlocked' : ''}`}>
                      <p className="cart-shipping__message">
                        <Icon name="truck" />
                        {unlocked ? "You've unlocked free shipping" : `Add ${money(remaining)} more for free shipping`}
                      </p>
                      <p className="cart-shipping__amounts">
                        {moneyShort(cart.total_price)} / {moneyShort(freeShippingThreshold)}
                      </p>
                      <div className="cart-shipping__bar" aria-hidden="true">
                        <span className="cart-shipping__fill" style={{ '--progress': `${progress}%` } as React.CSSProperties}></span>
                      </div>
                    </div>
                  ) : null}

                  <form id="CartForm" className="cart-page__form" action="/cart" method="post" noValidate>
                    <div className="cart-page__toolbar" data-cart-toolbar="" hidden>
                      <span data-cart-selected-count=""></span>
                      <button type="button" className="button button--text" data-cart-remove-selected="" data-cart-focus="remove-selected">
                        Remove selected
                      </button>
                    </div>
                    <p className="cart-page__error" data-cart-error="" hidden></p>
                    <ul className="cart-page__items" role="list">
                      {cart.items.map((item, i) => (
                        <CartItem item={item} index={i + 1} key={item.key} />
                      ))}
                    </ul>
                    <button type="submit" className="button button--secondary cart-page__update" name="update">
                      Update
                    </button>
                  </form>
                </div>

                <aside className="cart-page__aside" aria-label="Order summary">
                  {showCoupons ? (
                    <div className="cart-card cart-coupon">
                      <h2 className="cart-card__title">Coupons</h2>
                      <form className="cart-coupon__form" action="/checkout" method="get" data-cart-coupon="">
                        <label className="visually-hidden" htmlFor="CartCoupon">
                          Coupon code
                        </label>
                        <input
                          className="cart-coupon__input"
                          id="CartCoupon"
                          type="text"
                          name="discount"
                          placeholder="Enter coupon code"
                          autoComplete="off"
                          autoCapitalize="characters"
                          spellCheck={false}
                          required
                          data-cart-focus="coupon-input"
                        />
                        <button type="submit" className="button cart-coupon__apply" data-cart-focus="coupon-apply">
                          Apply
                          <Icon name="send" />
                        </button>
                      </form>
                      <p className="cart-coupon__message" data-cart-coupon-message="" hidden></p>
                      <ul className="cart-coupon__codes" role="list" data-cart-coupon-codes="">
                        {cart.cart_level_discount_applications.map((a) => (
                          <li className="cart-coupon__code" data-coupon-code={a.title} key={a.title}>
                            <span className="cart-coupon__name">{a.title}</span>
                            {a.total_allocated_amount > 0 ? <span className="cart-coupon__saving">−{money(a.total_allocated_amount)}</span> : null}
                            <button type="button" className="cart-coupon__remove" data-cart-coupon-remove={a.title} aria-label={`Remove code ${a.title}`}>
                              <span aria-hidden="true">×</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      {/* React can't render children into a <template>'s content: pass the row as HTML. */}
                      <template
                        data-cart-coupon-template=""
                        dangerouslySetInnerHTML={{
                          __html:
                            '<li class="cart-coupon__code" data-coupon-code=""><span class="cart-coupon__name"></span><span class="cart-coupon__saving">Applied at checkout</span><button type="button" class="cart-coupon__remove" data-cart-coupon-remove="" aria-label=""><span aria-hidden="true">×</span></button></li>',
                        }}
                      />
                    </div>
                  ) : null}

                  <div className="cart-card cart-summary">
                    <h2 className="cart-card__title">Order summary</h2>
                    <dl className="cart-summary__rows">
                      <div className="cart-summary__row">
                        <dt>Subtotal</dt>
                        <dd>{money(cart.items_subtotal_price)}</dd>
                      </div>
                      {cart.cart_level_discount_applications.map((d) => (
                        <div className="cart-summary__row cart-summary__row--discount" key={d.title}>
                          <dt>{d.title}</dt>
                          <dd>−{money(d.total_allocated_amount)}</dd>
                        </div>
                      ))}
                      <div className="cart-summary__row">
                        <dt>Shipping</dt>
                        {unlocked ? <dd className="cart-summary__free">Free</dd> : <dd className="cart-summary__later">Calculated at checkout</dd>}
                      </div>
                      <div className="cart-summary__row">
                        <dt>Tax</dt>
                        <dd className="cart-summary__later">Included</dd>
                      </div>
                      <div className="cart-summary__row cart-summary__row--total">
                        <dt>Total</dt>
                        <dd>{total}</dd>
                      </div>
                    </dl>

                    {showNote ? (
                      <details className="cart-summary__note" open={cart.note ? true : undefined}>
                        <summary>Add a note to your order</summary>
                        <label className="visually-hidden" htmlFor="CartNote">
                          Add a note to your order
                        </label>
                        <textarea id="CartNote" name="note" form="CartForm" rows={3} data-cart-note="" defaultValue={cart.note}></textarea>
                      </details>
                    ) : null}

                    <button type="submit" className="button cart-summary__checkout" name="checkout" form="CartForm">
                      Proceed to checkout
                      <Icon name="send" />
                    </button>

                    <a className="cart-summary__continue cart-summary__continue--in-card" href={continueLink}>
                      {continueInner}
                    </a>
                  </div>

                  <a className="cart-summary__continue cart-summary__continue--under-card" href={continueLink}>
                    {continueInner}
                  </a>
                </aside>
              </div>

              <div className="cart-bar">
                <p className="cart-bar__total">
                  <span className="cart-bar__label">Total</span>
                  <span className="cart-bar__amount">{total}</span>
                </p>
                <button type="submit" className="button cart-bar__checkout" name="checkout" form="CartForm">
                  Proceed to checkout
                  <Icon name="send" />
                </button>
              </div>
            </>
          )}
        </div>
      </cart-page>
    </div>
  );
}
