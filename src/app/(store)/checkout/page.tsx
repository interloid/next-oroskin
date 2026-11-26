/**
 * Demo checkout (no payments): the order summary from the cart and a contact / delivery form whose
 * "Place order" posts to /checkout/place-order (clears the cart, goes to /checkout/thank-you).
 * Built from the theme's own classes (cart page cards, contact form fields). `?discount=CODE` (the cart's
 * coupon form without JS) applies the code first, like Shopify's checkout.
 */
import Icon from '@/components/Icon';
import { cartIdFrom } from '@/cart/request';
import { extras, setDiscounts, toShopifyCart } from '@/cart/shopify';
import { api } from '@/lib/api';
import { money } from '@/lib/format';

export const metadata = { title: 'Checkout' };

const FIELDS: { name: string; label: string; type?: string; auto: string; full?: boolean; optional?: boolean }[] = [
  { name: 'email', label: 'Email', type: 'email', auto: 'email', full: true },
  { name: 'first_name', label: 'First name', auto: 'given-name' },
  { name: 'last_name', label: 'Last name', auto: 'family-name' },
  { name: 'address', label: 'Address', auto: 'street-address', full: true },
  { name: 'city', label: 'City', auto: 'address-level2' },
  { name: 'zip', label: 'PIN code', auto: 'postal-code' },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', auto: 'tel', full: true, optional: true },
];

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ discount?: string; error?: string }> }) {
  const { discount, error } = await searchParams;
  if (discount) {
    const id = await cartIdFrom();
    const current = extras(id).codes ?? (await api.cart()).discountCodes.map((d) => d.code);
    await setDiscounts(id, [...current, discount].join(','));
  }
  const cart = toShopifyCart(await api.cart());

  return (
    <div className="shopify-section">
      <div
        className="cart-page full-width section-width--widest color-scheme-1"
        style={{ '--section-padding-top': '40px', '--section-padding-bottom': '96px' } as React.CSSProperties}
      >
        <div className="cart-page__inner">
          <nav className="cart-page__breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/cart">Cart</a>
              </li>
              <li aria-current="page">Checkout</li>
            </ol>
          </nav>
          <header className="cart-page__header">
            <p className="eyebrow cart-page__eyebrow">Demo checkout, no payment is taken</p>
            <h1 className="cart-page__title">Checkout</h1>
          </header>

          {cart.item_count === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__strip">
                <span className="cart-empty__icon" aria-hidden="true">
                  <Icon name="cart" />
                </span>
                <div className="cart-empty__message">
                  <h2 className="cart-empty__title">Your bag is empty</h2>
                </div>
                <div className="cart-empty__actions cart-empty__actions--row">
                  <a className="button" href="/collections/all">
                    Continue shopping
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="cart-page__layout">
              <div className="cart-page__main">
                <div className="contact-form">
                  <form className="contact-form__form" action="/checkout/place-order" method="post">
                    <h2 className="cart-card__title" style={{ marginBlockEnd: 'var(--space-lg)' }}>
                      Contact and delivery
                    </h2>
                    {error ? (
                      <p className="contact-form__message" role="alert">
                        The order could not be placed. Check the fields and try again.
                      </p>
                    ) : null}
                    <div className="contact-form__fields">
                      {FIELDS.map((f) => (
                        <div className={`contact-form__field${f.full ? ' contact-form__field--full' : ''}`} key={f.name}>
                          <label className="contact-form__label" htmlFor={`Checkout-${f.name}`}>
                            {f.label}
                          </label>
                          <input
                            className="contact-form__input"
                            id={`Checkout-${f.name}`}
                            name={f.name}
                            type={f.type ?? 'text'}
                            autoComplete={f.auto}
                            required={!f.optional}
                          />
                        </div>
                      ))}
                    </div>
                    <button type="submit" className="button contact-form__submit" style={{ marginBlockStart: 'var(--space-xl)' }}>
                      Place order · {money(cart.total_price)}
                      <Icon name="send" />
                    </button>
                  </form>
                </div>
              </div>

              <aside className="cart-page__aside" aria-label="Order summary">
                <div className="cart-card cart-summary">
                  <h2 className="cart-card__title">Order summary</h2>
                  <ul role="list" style={{ display: 'grid', gap: 'var(--space-sm)', margin: 0, padding: 0, listStyle: 'none' }}>
                    {cart.items.map((item) => (
                      <li key={item.key} style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                        {item.image ? (
                          <img src={item.image} alt="" width={56} height={56} style={{ borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                        ) : null}
                        <span style={{ flex: 1 }}>
                          {item.product_title}
                          {item.variant_title ? <small style={{ display: 'block', opacity: 0.75 }}>{item.variant_title}</small> : null}
                          <small style={{ display: 'block' }}>× {item.quantity}</small>
                        </span>
                        <span>{money(item.final_line_price)}</span>
                      </li>
                    ))}
                  </ul>
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
                      <dd className="cart-summary__free">Free</dd>
                    </div>
                    <div className="cart-summary__row cart-summary__row--total">
                      <dt>Total</dt>
                      <dd>{money(cart.total_price)}</dd>
                    </div>
                  </dl>
                  <a className="cart-summary__continue cart-summary__continue--in-card" href="/cart">
                    <Icon name="arrow" />
                    Back to bag
                  </a>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
