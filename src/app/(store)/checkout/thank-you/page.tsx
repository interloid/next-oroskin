/** Demo order confirmation (after /checkout/place-order) */
import Icon from '@/components/Icon';
import SiteChrome from '@/components/SiteChrome';
import { cartIdFrom } from '@/cart/request';
import { api } from '@/lib/api';
import { cartStore } from '@/lib/cart-store';
import { loadSiteFormat, money } from '@/lib/format';

export const metadata = { title: 'Thank you' };

/** /checkout/thank-you?order=ORO-1001: the order is read from the backend and shown only to the cart it came from. */
export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ order?: string | string[] }> }) {
  const wanted = (await searchParams).order;
  const orderId = Array.isArray(wanted) ? wanted[0] : wanted;
  loadSiteFormat(await api.site());
  const order = orderId ? await cartStore.order(orderId, await cartIdFrom()) : null;
  return (
    <SiteChrome path="/checkout/thank-you" visitor>
      <div className="shopify-section">
        <div
          className="cart-page full-width section-width--widest color-scheme-1"
          style={
            {
              '--section-padding-top': '40px',
              '--section-padding-bottom': '96px',
            } as React.CSSProperties
          }
        >
          <div className="cart-page__inner">
            <header className="cart-page__header">
              <p className="eyebrow cart-page__eyebrow">{order ? `Order ${order.id}` : 'Checkout'}</p>
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
                        {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'},{' '}
                        {money(order.total ?? order.subtotal - order.discountTotal)}.
                        {order.customer.email ? ` A confirmation would go to ${order.customer.email}.` : ''} This is a demo: no payment was
                        taken.
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
    </SiteChrome>
  );
}
