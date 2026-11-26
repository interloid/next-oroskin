/**
 * "Added to your bag" card (theme: snippets/cart-notification.liquid). One per page, after the footer,
 * not on /cart. Hidden until the theme's <cart-notification> script fills it on "cart:added" (quick add).
 * Server component.
 */
import Icon from '@/components/Icon';
import site from '@/data/site.json';

export default function CartNotification() {
  return (
    <cart-notification
      className="cart-notification"
      popover="manual"
      role="region"
      aria-label="Added to your bag"
      data-money-format={site.moneyFormat}
      data-label-in-bag="In your bag: [count]"
      data-label-bag-one="Bag: 1 item"
      data-label-bag-other="Bag: 999999 items"
      hidden
    >
      <div className="cart-notification__head">
        <p className="cart-notification__title">
          <span className="cart-notification__check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" focusable="false">
              <path d="m6 12.5 4 4 8-9" />
            </svg>
          </span>
          Added to your bag
        </p>
        <button type="button" className="cart-notification__close" data-cart-notification-close="" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="cart-notification__item">
        <a className="cart-notification__media" href="#" tabIndex={-1} aria-hidden="true" data-cart-notification-link="">
          <img src="data:," alt="" width={160} height={200} data-cart-notification-image="" />
        </a>
        <div className="cart-notification__details">
          <a className="cart-notification__name" href="#" data-cart-notification-link="" data-cart-notification-name=""></a>
          <p className="cart-notification__variant" data-cart-notification-variant=""></p>
          <p className="cart-notification__price" data-cart-notification-price=""></p>
          <p className="cart-notification__in-bag" data-cart-notification-in-bag=""></p>
        </div>
      </div>

      <p className="cart-notification__bag" data-cart-notification-bag="" hidden>
        <span data-cart-notification-count=""></span>
        <span className="cart-notification__total" data-cart-notification-total=""></span>
      </p>

      <div className="cart-notification__actions">
        <a className="button button--secondary cart-notification__view" href="/cart">
          View bag
        </a>
        <form action="/cart" method="post" className="cart-notification__checkout-form">
          <button type="submit" name="checkout" className="button cart-notification__checkout">
            Checkout
            <Icon name="send" />
          </button>
        </form>
      </div>
    </cart-notification>
  );
}
