/** Demo order confirmation (after /checkout/place-order) */
import Icon from '@/components/Icon';
import { cartIdFrom } from '@/cart/request';
import { extras } from '@/cart/shopify';
import { money } from '@/lib/format';

export const metadata = { title: 'Thank you' };

export default async function ThankYouPage() {
  const order = extras(await cartIdFrom()).lastOrder;
  return (
    <div className="shopify-section">
      <div
        className="cart-page full-width section-width--widest color-scheme-1"
        style={{ '--section-padding-top': '40px', '--section-padding-bottom': '96px' } as React.CSSProperties}
      >
        <div className="cart-page__inner">
          <header className="cart-page__header">
            <p className="eyebrow cart-page__eyebrow">{order ? `Order ${order.number}` : 'Checkout'}</p>
            <h1 className="cart-page__title">Thank you</h1>
          </header>
          <div className="cart-empty">
            <div className="cart-empty__strip">
              <span className="cart-empty__icon" aria-hidden="true">
                <Icon name="cart" />
              </span>
              <div className="cart-empty__message">
                <h2 className="cart-empty__title">{order ? 'Your order is placed' : 'No recent order'}</h2>
                <div className="cart-empty__text rte">
                  {order ? (
                    <p>
                      {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}, {money(order.total)}.
                      {order.email ? ` A confirmation would go to ${order.email}.` : ''} This is a demo: no payment was taken.
                    </p>
                  ) : (
                    <p>Your bag is waiting for you.</p>
                  )}
                </div>
              </div>
              <div className="cart-empty__actions cart-empty__actions--row">
                <a className="button" href="/collections/all">
                  Continue shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
