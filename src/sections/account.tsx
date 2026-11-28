/**
 * Account pages (Figma "account-*" screens). One section, one `view` per page.
 * The customer's data comes from the backend (src/lib/account.ts) for the signed-in demo customer; a visitor
 * who is not signed in is sent to the demo login. The rewards programme texts are this section's props (page
 * content). Styles: public/theme/account.css (BEM, prefix account-).
 */
import { notFound, redirect } from 'next/navigation';
import type { PageContext } from '@/components/PageRenderer';
import Icon from '@/components/Icon';
import { accountBox, loadAccountData, loadOrderView, statusLabel, type AccountData, type OrderView as Order } from '@/lib/account';
import { money, siteFormat } from '@/lib/format';
import { cookies } from 'next/headers';
import { currentUser } from '@/lib/auth';
import { SIGNED_IN_COOKIE } from '@/lib/session';
import { DetailsForm, IconAction, OrdersList, PrefToggles, SmallAction, TrackForm, WishlistList, type OrderRow } from '@/sections/_account-client';

export type AccountView =
  | 'overview'
  | 'details'
  | 'orders'
  | 'order-details'
  | 'track'
  | 'wishlist'
  | 'rewards'
  | 'refills'
  | 'preferences'
  | 'signout'
  | 'track-order'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'reset-password'
  | 'change-password';

export interface AccountProps {
  view: AccountView;
  /** My details page: the beauty profile card (`icon` = an icon name of src/components/Icon.tsx) */
  beautyProfile?: { icon: string; label: string; value: string }[];
  /** Rewards page: the line under the heading */
  lead?: string;
  /** Rewards page: "How it works" steps */
  steps?: { title: string; text: string }[];
  /** Rewards page: ways to earn points */
  earn?: { action: string; points: string; note: string }[];
  /** Rewards page: what points can be traded for (`handle` = the product whose image is shown) */
  redeem?: { handle: string; title: string; points: number; note: string }[];
  /** Refills page: the membership card (title, small tags, label / value facts) */
  membership?: { title: string; tags?: string[]; facts?: { label: string; value: string }[] };
  /** Track order page: an order number shown as an example */
  exampleOrder?: string;
  /** Sign-in, sign-up and password pages: the card's small label, heading (`<em>` allowed) and intro text */
  eyebrow?: string;
  heading?: string;
  text?: string;
}

/** The signed-in customer's data for this page render (put there by <Account> before any view is drawn) */
function data(): AccountData {
  const box = accountBox().data;
  if (!box) throw new Error('Account data is not loaded');
  return box;
}

const TABS: { view: AccountView; href: string; label: string; icon: string }[] = [
  // Figma icons: public/icons/account-*.svg
  { view: 'overview', href: '/account', label: 'Overview', icon: 'icons/account-overview.svg' },
  { view: 'details', href: '/account/details', label: 'My details', icon: 'icons/account-details.svg' },
  { view: 'orders', href: '/account/orders', label: 'Orders', icon: 'icons/account-orders.svg' },
  { view: 'wishlist', href: '/account/wishlist', label: 'Wishlist', icon: 'icons/account-wishlist.svg' },
  { view: 'refills', href: '/account/refills', label: 'Refills', icon: 'icons/account-refills.svg' },
  { view: 'preferences', href: '/account/preferences', label: 'Preferences', icon: 'icons/account-preferences.svg' },
];

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';
const img = (handle: string) => data().products.get(handle)?.images[0]?.src ?? '';

function Shell({ view, children }: { view: AccountView; children: React.ReactNode }) {
  const { customer } = data();
  const pct = Math.round((customer.points / (customer.points + customer.pointsToNext)) * 100);
  return (
    <>
      <header className="account-head">
        <div>
          <h1 className="account-head__title">My account</h1>
          <p className="account-head__text">Everything you need to make your OroSkin ritual feel entirely yours.</p>
        </div>
        <a className="account-signout" href="/account/signout">
          <Icon src="icons/ui-signout.svg" />
          Sign out
        </a>
      </header>

      <section className="account-welcome" aria-label="Membership">
        <div className="account-welcome__who">
          <span className="account-avatar" aria-hidden="true">
            {customer.initials}
          </span>
          <div>
            <p className="account-eyebrow">Welcome back</p>
            <p className="account-welcome__name">{customer.name}</p>
            <p className="account-welcome__tier">
              <Icon name="award" />
              {customer.tier} member / since {customer.since}
            </p>
          </div>
        </div>
        <div className="account-welcome__points">
          <p className="account-welcome__row">
            <span>Glow balance</span>
            <strong>{customer.points.toLocaleString(siteFormat().locale)} pts</strong>
          </p>
          <div className="account-meter" role="img" aria-label={`${pct}% of the way to ${customer.nextTier}`}>
            <span style={{ inlineSize: `${pct}%` }} />
          </div>
          <p className="account-welcome__next">
            {customer.pointsToNext.toLocaleString(siteFormat().locale)} points to {customer.nextTier}
          </p>
        </div>
      </section>

      <nav className="account-tabs" aria-label="Account">
        <ul>
          {TABS.map((t) => (
            <li key={t.view}>
              <a className={`account-tab${t.view === view ? ' is-active' : ''}`} href={t.href} aria-current={t.view === view ? 'page' : undefined}>
                <Icon src={t.icon} />
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {children}
    </>
  );
}

function CardHead({ eyebrow, heading, action }: { eyebrow: string; heading: string; action?: React.ReactNode }) {
  return (
    <div className="account-card__head">
      <div>
        <p className="account-eyebrow">{eyebrow}</p>
        <h2 className="account-card__title">{heading}</h2>
      </div>
      {action}
    </div>
  );
}

/* ----------------------------- Overview ----------------------------- */
function Overview() {
  const { customer, orders, subscriptions, recentlyViewed, products } = data();
  const transit = orders.find((o) => o.status === 'in-transit');
  const tp = transit?.lines[0];
  return (
    <>
      <div className="account-grid account-grid--2 account-grid--soft">
        {transit && tp ? (
          <section className="account-card account-card--tint">
            <p className="account-eyebrow">In transit</p>
            <h2 className="account-card__title">{tp.product.title}</h2>
            <p className="account-card__text">{transit.eta ? `On its way to you. ${transit.statusNote}.` : 'On its way to you.'}</p>
            <a className="account-btn account-btn--glass account-card__cta" href="/account/track">
              Track the parcel
            </a>
          </section>
        ) : null}
        <section className="account-card account-card--tint">
          <p className="account-eyebrow">Oro Circle</p>
          <h2 className="account-card__title">
            {customer.nextTier ? `${customer.pointsToNext.toLocaleString(siteFormat().locale)} points to ${customer.nextTier}` : `${customer.points.toLocaleString(siteFormat().locale)} points`}
          </h2>
          <p className="account-card__text">Points become travel sizes, full sizes and early access. See what your balance opens.</p>
          <a className="account-btn account-btn--glass account-card__cta" href="/account/rewards">
            Open rewards
          </a>
        </section>
      </div>

      <div className="account-grid account-grid--2">
        <section className="account-card">
          <CardHead eyebrow="Your journey" heading="Recent orders" action={<a className="account-btn account-btn--glass" href="/account/orders">See all</a>} />
          <ul className="account-mini">
            {orders.slice(0, 2).map((o) => {
              const l = o.lines[0];
              if (!l) return null;
              return (
                <li key={o.id}>
                  <a className="account-mini__row" href={`/account/orders/${o.id}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.product.images[0].src} alt="" width={64} height={68} />
                    <span className="account-mini__main">
                      <span className="account-mini__title">{l.product.title}</span>
                      <span className="account-mini__meta">
                        {o.number} · {o.date}
                      </span>
                      <span className={`account-tag account-tag--${o.status}`}>{statusLabel[o.status]}</span>
                    </span>
                    <span className="account-mini__price">{money(o.total)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="account-card">
          <CardHead eyebrow="On rotation" heading="Your subscriptions" action={<a className="account-btn account-btn--glass" href="/account/refills">Manage</a>} />
          <ul className="account-mini">
            {subscriptions.map((s) => (
              <li key={s.name}>
                <div className="account-mini__row">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(s.handle)} alt="" width={64} height={68} />
                  <span className="account-mini__main">
                    <span className="account-mini__title">{s.name}</span>
                    <span className="account-mini__meta">{s.every}</span>
                    <span className="account-mini__next">
                      <Icon name="check" />
                      Next {s.next}
                    </span>
                  </span>
                  <span className="account-mini__price">{money(s.price)}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="account-card">
        <CardHead eyebrow="Recently viewed" heading="Caught your eye" />
        <ul className="account-viewed">
          {recentlyViewed.map((h) => {
            const p = products.get(h);
            if (!p) return null;
            return (
              <li key={h}>
                <a className="account-viewed__card" href={`/products/${h}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0]?.src ?? ''} alt="" width={358} height={305} loading="lazy" />
                  <span className="account-viewed__row">
                    <span className="account-viewed__title">{p.title}</span>
                    <span className="account-viewed__price">{money(p.price)}</span>
                  </span>
                  <span className="account-viewed__meta">{p.type}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

/* ------------------------------ Details ------------------------------ */
/*
  My details (Figma "My Account - My details", 1920): a narrow Profile card beside Saved addresses + Payment
  methods, then Beauty profile (blush) beside Account protection. Round icon buttons edit / delete; "Set as default"
  and "Update" are underlined text links; "Enable" is a white pill.
*/

function AddNew() {
  return (
    <SmallAction
      label="Add new"
      done="Added (demo)"
      icon={<Icon name="plus" />}
      className="account-link account-link--btn account-link--icon"
    />
  );
}

function Details({ beautyProfile = [], notice = '' }: Pick<AccountProps, 'beautyProfile'> & { notice?: string }) {
  const { customer, addresses, cards } = data();
  return (
    <div className="account-details">
      <div className="account-details__top">
        <section className="account-card account-details__profile">
          <CardHead eyebrow="Profile" heading="My details" />
          <div className="account-details__photo">
            <span className="account-avatar" aria-hidden="true">
              {customer.initials}
            </span>
            <SmallAction
              label="Change photo"
              done="Photo updated (demo)"
              icon={<Icon name="pencil" />}
              className="account-link account-link--btn account-link--icon"
            />
          </div>
          <DetailsForm name={customer.name} phone={customer.phone} email={customer.email} birthday={customer.birthday} />
        </section>

        <div className="account-details__side">
          <section className="account-card">
            <CardHead eyebrow="Delivery" heading="Saved addresses" action={<AddNew />} />
            <ul className="account-addr">
              {addresses.map((a) => (
                <li className="account-addr__item" key={a.id}>
                  <div className="account-addr__head">
                    <p className="account-addr__label">
                      <Icon src="icons/track-out-for-delivery.svg" />
                      {a.label}
                      {a.isDefault ? <span className="account-tag account-tag--default">Default</span> : null}
                    </p>
                    <div className="account-addr__tools">
                      <IconAction label={`Edit ${a.label} address`} done="Editing (demo)">
                        <Icon name="pencil" />
                      </IconAction>
                      {a.isDefault ? null : (
                        <IconAction label={`Delete ${a.label} address`} done="Deleted (demo)">
                          <Icon name="trash" />
                        </IconAction>
                      )}
                    </div>
                  </div>
                  <address>
                    {a.lines.map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </address>
                  {a.isDefault ? null : (
                    <SmallAction
                      label="Set as default"
                      done="Default set"
                      className="account-link account-link--btn account-link--line account-addr__default"
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="account-card">
            <CardHead eyebrow="Billing" heading="Payment methods" action={<AddNew />} />
            <ul className="account-pay">
              {cards.map((c) => (
                <li className="account-pay__item" key={c.id}>
                  <span className="account-pay__brand">{c.brand}</span>
                  <div className="account-pay__main">
                    <p className="account-pay__num">
                      4485 •••• •••• {c.last}
                      {c.isDefault ? <span className="account-tag account-tag--default">Default</span> : null}
                    </p>
                    <p className="account-pay__meta">
                      {c.name} · Expires {c.expires}
                    </p>
                  </div>
                  <div className="account-pay__tools">
                    {c.isDefault ? null : (
                      <SmallAction label="Set as default" done="Default set" className="account-link account-link--btn account-link--line" />
                    )}
                    <IconAction label={`Edit ${c.brand} card`} done="Editing (demo)">
                      <Icon name="pencil" />
                    </IconAction>
                    {c.isDefault ? null : (
                      <IconAction label={`Delete ${c.brand} card`} done="Deleted (demo)">
                        <Icon name="trash" />
                      </IconAction>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="account-details__bottom">
        <section className="account-card account-card--tint">
          <CardHead eyebrow="Analysis" heading="Beauty profile" />
          <dl className="account-facts account-facts--icons">
            {beautyProfile.map((b) => (
              <div key={b.label}>
                <span className="account-facts__icon" aria-hidden="true">
                  <Icon name={b.icon} />
                </span>
                <dt>{b.label}</dt>
                <dd>{b.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="account-card">
          <CardHead eyebrow="Security" heading="Account protection" />
          <ul className="account-sec">
            <li>
              <div>
                <p className="account-sec__title">Password</p>
                <p className="account-sec__text">{notice || 'Changing it signs your other devices out'}</p>
              </div>
              <a className="account-link account-link--btn account-link--line" href="/account/change-password">
                Update
              </a>
            </li>
            <li>
              <div>
                <p className="account-sec__title">Two-step verification</p>
                <p className="account-sec__text">Add another layer of security</p>
              </div>
              <SmallAction label="Enable" done="Enabled (demo)" className="account-pill-btn" />
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------ Orders ------------------------------ */
function Orders() {
  const { orders } = data();
  const rows: OrderRow[] = orders
    .filter((o) => o.lines.length > 0)
    .map((o) => {
    const ls = o.lines;
    return {
      id: o.id,
      number: o.number,
      date: o.date,
      status: o.status,
      statusLabel: statusLabel[o.status],
      statusNote: o.statusNote,
      title: ls[0].product.title,
      more: ls.length - 1,
      items: ls.reduce((n, l) => n + l.qty, 0),
      total: money(o.total),
      images: ls.slice(0, 2).map((l) => l.product.images[0].src),
      imageAlt: ls[0].product.title,
      tracking: o.tracking,
    };
  });
  // Server-rendered icons for the client list (Icon reads the SVG files on the server)
  const icons = {
    go: <Icon src="icons/ui-arrow-up-right.svg" />,
    truck: <Icon name="truck" />,
    check: <Icon src="icons/ui-check-circle.svg" />,
    arrow: <Icon name="arrow" />,
    close: <Icon name="close" />,
  };
  return (
    <section className="account-card">
      <CardHead eyebrow="Purchase history" heading="My orders" />
      <OrdersList rows={rows} icons={icons} />
    </section>
  );
}

/* ----------------------- Order details / tracking ----------------------- */
const STEPS = ['Placed', 'Prepared', 'Shipped', 'Out for delivery', 'Delivered'];
// Figma: each progress step shows its own icon (public/icons)
const STEP_ICONS = ['account-orders', 'track-prepared', 'track-shipped', 'track-out-for-delivery', 'track-delivered'];
// The backend has no tracking events yet: the timeline shows the steps, with the two dates an order does
// have (when it was placed, when it was delivered).
const EVENTS = [
  { t: 'Order confirmed', d: 'Your order has been received and is being prepared.' },
  { t: 'Order packed', d: 'Your order has been packed and is ready to ship.' },
  { t: 'Shipped', d: 'The parcel left our atelier with the carrier.' },
  { t: 'Nearby', d: 'The courier is in your area. Delivery is expected today.' },
  { t: 'Delivered', d: 'The parcel was handed over at the door.' },
];

function OrderDetail({ order, track, back }: { order: Order; track: boolean; back: { href: string; label: string } }) {
  const idx = order.status === 'delivered' ? 5 : order.status === 'in-transit' ? 2 : 1; // steps done before the current one
  const lines = order.lines;
  const { subtotal, total } = order;
  const trackSub = ['Confirmed', 'In progress', 'In transit', 'On its way', order.eta];
  const eventAt = (i: number) => (i === 0 ? order.date : i === EVENTS.length - 1 ? order.eta : 'Done');
  return (
    <>
      <a className="account-back" href={back.href}>
        <span aria-hidden="true">←</span> {back.label}
      </a>
      <section className="account-card account-od">
        <header className="account-od__head">
          <div>
            <h1 className="account-od__title">Order details</h1>
            <p className="account-od__meta">
              <span>
                Order date: <strong>{order.date}</strong>
              </span>
              <span className="account-od__eta">
                <Icon name="truck" />
                {order.status === 'delivered' ? 'Delivered' : 'Estimated delivery'}: {order.eta}
              </span>
            </p>
          </div>
          <div className="account-od__buttons">
            <button type="button" className="account-btn account-btn--glass">
              Invoice
            </button>
            {track ? null : (
              <a className="account-btn account-btn--solid" href={`/products/${lines[0].handle}`}>
                Buy again
              </a>
            )}
          </div>
        </header>

        <ol className="account-steps" aria-label="Order progress">
          {STEPS.map((s, i) => {
            const state = i < idx ? 'done' : i === idx ? 'current' : 'todo';
            return (
              <li className={`account-step account-step--${state}`} key={s} aria-current={state === 'current' ? 'step' : undefined}>
                <span className="account-step__dot" aria-hidden="true">
                  <Icon src={`icons/${STEP_ICONS[i]}.svg`} />
                </span>
                <span className="account-step__name">{s}</span>
                <span className="account-step__sub">{track ? trackSub[i] : ''}</span>
              </li>
            );
          })}
        </ol>

        <div className="account-od__cols">
          <div className="account-od__left">
            <section className="account-box">
              <h2 className="account-box__title">Tracking timeline</h2>
              <ol className="account-timeline">
                {EVENTS.map((e, i) => (
                  <li className={`account-timeline__item${i < idx ? ' is-done' : ''}`} key={e.t}>
                    <span className="account-timeline__dot" aria-hidden="true">
                      {i < idx ? <Icon src="icons/ui-check.svg" /> : null}
                    </span>
                    <p className="account-timeline__title">{e.t}</p>
                    {track ? <p className="account-timeline__text">{e.d}</p> : null}
                    <p className="account-timeline__at">{i < idx ? eventAt(i) : 'Pending'}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section className="account-box">
              <h2 className="account-box__title">Items</h2>
              <ul className="account-items">
                {lines.map((l) => (
                  <li key={l.handle}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.product.images[0].src} alt="" width={56} height={60} />
                    <div>
                      <a className="account-items__title" href={`/products/${l.handle}`}>
                        {l.product.title}
                      </a>
                      <p className="account-items__meta">
                        {l.size ?? l.product.type} · Qty {l.qty}
                      </p>
                    </div>
                    <p className="account-items__price">{money(l.product.price * l.qty)}</p>
                    <a className="account-items__go" href={`/products/${l.handle}`} aria-label={`View ${l.product.title}`}>
                      <Icon name="chevron-right" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="account-od__right">
            <section className="account-box">
              <h2 className="account-box__title">
                <Icon src="icons/ui-document.svg" />
                Order summary
              </h2>
              <dl className="account-sum">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                {order.discount ? (
                  <div className="account-sum__accent">
                    <dt>Discount</dt>
                    <dd>-{money(order.discount)}</dd>
                  </div>
                ) : null}
                {order.giftWrap ? (
                  <div>
                    <dt>Gift wrap</dt>
                    <dd>{money(order.giftWrap)}</dd>
                  </div>
                ) : null}
                <div>
                  <dt>Shipping</dt>
                  <dd className={order.shipping ? undefined : 'account-sum__free'}>{order.shipping ? money(order.shipping) : 'Free'}</dd>
                </div>
                <div>
                  <dt>Tax</dt>
                  <dd>{money(order.tax)}</dd>
                </div>
                <div className="account-sum__total">
                  <dt>Total</dt>
                  <dd>{money(total)}</dd>
                </div>
              </dl>
            </section>
            <section className="account-box account-box--two">
              <div>
                <h2 className="account-box__title">
                  <Icon name="truck" />
                  Shipping &amp; delivery
                </h2>
                <address className="account-od__addr">
                  <span>John Doe</span>
                  <span>789 Boulevard Street, Apt 3C</span>
                  <span>New York, NY 10011</span>
                  <span>(555) 019-2834</span>
                </address>
              </div>
              <div>
                <h2 className="account-box__title">
                  <Icon name="card" />
                  Payment
                </h2>
                <p className="account-od__addr">Visa **56</p>
              </div>
            </section>
            <section className="account-box">
              <div className="account-box__head">
                <h2 className="account-box__title">Tracking information</h2>
                <a className="account-link account-link--icon account-link--line" href={track ? '/account/orders' : '/account/track'}>
                  {track ? 'All orders' : 'Track package'} <Icon name="arrow" />
                </a>
              </div>
              <p className="account-eyebrow account-od__tn">
                <Icon name="truck" />
                Tracking number
              </p>
              <p className="account-od__code">{order.tracking}</p>
              <p className="account-od__label">Estimated delivery: {order.eta}</p>
            </section>
          </div>
        </div>

        <div className="account-od__help">
          <p>Have a question about this order?</p>
          <div>
            <a className="account-link account-link--icon" href="/pages/contact">
              <Icon name="chat" />
              Contact us
            </a>
            <a className="account-pill-btn account-link--icon account-od__helpbtn" href="/pages/faq">
              <Icon src="icons/ui-help.svg" />
              Help center
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ----------------------------- Wishlist ----------------------------- */
function Wishlist() {
  const { wishlist, products } = data();
  const items = wishlist
    .map((w) => ({ w, p: products.get(w.handle) }))
    .filter((x) => x.p)
    .map(({ w, p }) => ({
      handle: w.handle,
      badge: w.badge,
      title: p!.title,
      price: money(p!.price),
      rating: p!.rating.value.toFixed(1),
      image: p!.images[0]?.src ?? '',
    }));
  return (
    <section className="account-card">
      <CardHead eyebrow="Saved items" heading="Your wishlist" />
      <WishlistList items={items} icons={{ cart: <Icon name="cart" />, expand: <Icon src="icons/ui-expand.svg" />, close: <Icon name="close" /> }} />
    </section>
  );
}

/* ------------------------------ Refills ------------------------------ */
function Refills({ membership }: { membership?: AccountProps['membership'] }) {
  const { subscriptions } = data();
  return (
    <>
      {membership ? (
      <section className="account-card account-card--tint">
        <div className="account-card__head">
          <div className="account-member__tags">
            {(membership.tags ?? []).map((tag) => (
              <span className="account-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="account-member__links">
            <a className="account-link account-link--icon" href="/account/rewards">
              View rewards <Icon src="icons/ui-arrow-up-right.svg" />
            </a>
            <SmallAction label="Cancel membership" done="Request sent (demo)" icon={<Icon name="close" />} className="account-link account-link--btn account-link--icon" />
          </div>
        </div>
        <h2 className="account-card__title">{membership.title}</h2>
        <dl className="account-facts account-facts--2 account-facts--member">
          {(membership.facts ?? []).map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      ) : null}
      <section className="account-card">
        <CardHead eyebrow="On rotation" heading="Your subscriptions" action={<span className="account-tag account-tag--default">{subscriptions.length} active</span>} />
        <ul className="account-subs">
          {subscriptions.map((s) => (
            <li className="account-sub" key={s.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="account-sub__img" src={img(s.handle)} alt="" width={140} height={150} />
              <div className="account-sub__main">
                <p className="account-sub__tags">
                  <span className="account-tag account-tag--delivered">Active</span>
                  <span className="account-sub__cadence">{s.every} · saving 10%</span>
                </p>
                <h3 className="account-sub__title">{s.name}</h3>
                <p className="account-sub__meta">
                  {s.every} · {money(s.price)} per delivery
                </p>
                <p className="account-sub__meta">
                  <Icon name="calendar" />
                  Next delivery {s.next}
                </p>
                <div className="account-sub__actions">
                  <SmallAction label="Manage" done="Opening (demo)" className="account-pill-btn account-sub__manage" />
                  <SmallAction
                    label="Pause"
                    done="Paused (demo)"
                    icon={<Icon src="icons/ui-pause.svg" />}
                    className="account-link account-link--btn account-link--icon account-link--line"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ---------------------------- Preferences ---------------------------- */
function Preferences() {
  const { preferenceList } = data();
  return (
    <section className="account-card">
      <CardHead eyebrow="Make it yours" heading="Preferences" />
      <PrefToggles items={preferenceList} />
    </section>
  );
}

/* ------------------------------ Rewards ------------------------------ */
function Rewards({ lead, steps = [], earn = [], redeem = [] }: Pick<AccountProps, 'lead' | 'steps' | 'earn' | 'redeem'>) {
  const { customer, rewards } = data();
  // The ring fills towards the top tier; the line under the balance names the next tier above the current one.
  const top = rewards.tiers[rewards.tiers.length - 1];
  const next = rewards.tiers.find((t) => t.minPoints > customer.points);
  const goal = top?.minPoints || customer.points || 1;
  const pct = Math.min(100, Math.round((customer.points / goal) * 100));
  const toNext = next ? `${(next.minPoints - customer.points).toLocaleString(siteFormat().locale)} to ${next.name}` : 'Top tier reached';
  const circ = 2 * Math.PI * 88;
  return (
    <div className="account-rewards">
      <a className="account-back" href="/account">
        <span aria-hidden="true">←</span> Back to my account
      </a>
      <header className="account-rw-hero">
        <div className="account-rw-hero__text">
          <p className="account-eyebrow">Oro Circle</p>
          <h1 className="account-rw-hero__title">
            {customer.tier}, <em>returned.</em>
          </h1>
          {lead ? <p className="account-rw-hero__lead">{lead}</p> : null}
          <ul className="account-tiers">
            {rewards.tiers.map((t) => (
              <li className={`account-tier${t.active ? ' is-active' : ''}`} key={t.name}>
                <p className="account-tier__name">{t.name}</p>
                <p className="account-tier__range">{t.range}</p>
                <p className="account-tier__perk">{t.perk}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="account-ring" role="img" aria-label={`Balance ${customer.points} points, ${toNext}`}>
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="88" className="account-ring__track" />
            <circle cx="100" cy="100" r="88" className="account-ring__fill" strokeDasharray={`${(circ * pct) / 100} ${circ}`} />
          </svg>
          <span className="account-ring__badge">{customer.tier}</span>
          <span className="account-ring__label">Balance</span>
          <span className="account-ring__value">{customer.points}</span>
          <span className="account-ring__next">{toNext}</span>
        </div>
      </header>

      <section className="account-rw-section">
        <h2 className="account-rw-section__title">How it works</h2>
        <p className="account-rw-section__lead">Membership is complimentary. Points post the day a parcel ships.</p>
        <ol className="account-how">
          {steps.map((s, i) => (
            <li className="account-how__item" key={s.title}>
              <span className="account-how__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="account-how__title">{s.title}</h3>
              <p className="account-how__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="account-rw-section">
        <p className="account-eyebrow">Ways to earn</p>
        <table className="account-earn">
          <thead>
            <tr>
              <th scope="col">Action</th>
              <th scope="col">Points</th>
              <th scope="col">Notes</th>
            </tr>
          </thead>
          <tbody>
            {earn.map((e) => (
              <tr key={e.action}>
                <th scope="row" data-label="Action">{e.action}</th>
                <td data-label="Points" className="account-earn__pts">{e.points}</td>
                <td data-label="Notes">{e.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="account-rw-section">
        <h2 className="account-rw-section__title">Pour your points into</h2>
        <ul className="account-redeem">
          {redeem.map((r, i) => {
            const can = customer.points >= r.points;
            return (
              <li className="account-redeem__item" key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img(r.handle)} alt="" width={100} height={110} />
                <div>
                  <p className="account-redeem__title">{r.title}</p>
                  <p className="account-redeem__pts">{r.points} points</p>
                  <p className="account-redeem__note">{r.note}</p>
                  {can ? (
                    <SmallAction label="Redeem" done="Added to your bag (demo)" />
                  ) : (
                    <span className="account-redeem__locked" title="Not enough points yet">
                      Locked
                    </span>
                  )}
                </div>
                <span className="account-redeem__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="account-rw-section">
        <p className="account-eyebrow">Points activity</p>
        <ul className="account-activity">
          {rewards.activity.map((a, i) => (
            <li key={i}>
              <span className="account-activity__date">{a.date}</span>
              <span className="account-activity__text">{a.text}</span>
              <span className={`account-activity__pts${a.pts < 0 ? ' is-neg' : ''}`}>{a.pts > 0 ? '+' : ''}{a.pts}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ------------------------------ Sign out ------------------------------ */
function SignOut() {
  return (
    <div className="account-center">
      <section className="account-card account-center__card">
        <p className="account-eyebrow">Sign out</p>
        <h1 className="account-center__title">
          Leaving so <em>soon?</em>
        </h1>
        <p className="account-center__text">You will be signed out of your OroSkin account on this device. Your bag and wishlist stay saved.</p>
        <div className="account-center__actions">
          <a className="account-btn account-btn--solid" href="/api/account/logout">
            Sign out
          </a>
          <a className="account-btn account-btn--glass" href="/account">
            Stay signed in
          </a>
        </div>
      </section>
    </div>
  );
}

/* ------------------- Sign in, sign up and passwords ------------------- */
/*
  Plain HTML forms that post to /api/account/* (src/app/api/account): they work without JavaScript, and a
  password never passes through client code. A problem comes back as ?error=<text>, a success note as ?notice=.
*/
type AuthView = 'login' | 'register' | 'forgot-password' | 'reset-password' | 'change-password';

interface AuthField {
  name: string;
  label: string;
  type?: string;
  auto: string;
  /** Shown again after a failed post (never for passwords) */
  keep?: boolean;
  minLength?: number;
}
const PASSWORD_HINT = 8;
const AUTH_FORMS: Record<AuthView, { action: string; submit: string; fields: AuthField[] }> = {
  login: {
    action: '/api/account/login',
    submit: 'Sign in',
    fields: [
      { name: 'email', label: 'Email address', type: 'email', auto: 'email', keep: true },
      { name: 'password', label: 'Password', type: 'password', auto: 'current-password' },
    ],
  },
  register: {
    action: '/api/account/register',
    submit: 'Create account',
    fields: [
      { name: 'first_name', label: 'First name', auto: 'given-name', keep: true },
      { name: 'last_name', label: 'Last name', auto: 'family-name', keep: true },
      { name: 'email', label: 'Email address', type: 'email', auto: 'email', keep: true },
      { name: 'password', label: `Password (at least ${PASSWORD_HINT} characters)`, type: 'password', auto: 'new-password', minLength: PASSWORD_HINT },
      { name: 'confirm', label: 'Password again', type: 'password', auto: 'new-password', minLength: PASSWORD_HINT },
    ],
  },
  'forgot-password': {
    action: '/api/account/forgot-password',
    submit: 'Email me a reset link',
    fields: [{ name: 'email', label: 'Email address', type: 'email', auto: 'email', keep: true }],
  },
  'reset-password': {
    action: '/api/account/reset-password',
    submit: 'Set new password',
    fields: [
      { name: 'password', label: `New password (at least ${PASSWORD_HINT} characters)`, type: 'password', auto: 'new-password', minLength: PASSWORD_HINT },
      { name: 'confirm', label: 'New password again', type: 'password', auto: 'new-password', minLength: PASSWORD_HINT },
    ],
  },
  'change-password': {
    action: '/api/account/change-password',
    submit: 'Change password',
    fields: [
      { name: 'current_password', label: 'Current password', type: 'password', auto: 'current-password' },
      { name: 'new_password', label: `New password (at least ${PASSWORD_HINT} characters)`, type: 'password', auto: 'new-password', minLength: PASSWORD_HINT },
      { name: 'confirm', label: 'New password again', type: 'password', auto: 'new-password', minLength: PASSWORD_HINT },
    ],
  },
};

function AuthCard({
  view,
  search,
  eyebrow,
  heading,
  text,
}: {
  view: AuthView;
  search: Record<string, string | string[] | undefined>;
  eyebrow?: string;
  heading?: string;
  text?: string;
}) {
  const form = AUTH_FORMS[view];
  const error = first(search.error);
  const notice = first(search.notice);
  const sent = view === 'forgot-password' && first(search.sent) === '1';
  const token = first(search.token);
  const next = first(search.next);
  return (
    <div className="account-center">
      <section className="account-card account-center__card">
        {eyebrow ? <p className="account-eyebrow">{eyebrow}</p> : null}
        {/* The heading is page content from the backend and may hold <em> */}
        {heading ? <h1 className="account-center__title" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
        {text ? <p className="account-center__text">{text}</p> : null}
        {notice ? (
          <p className="account-status" role="status">
            {notice}
          </p>
        ) : null}
        {sent ? (
          <p className="account-status" role="status">
            If that address has an account, a reset link is on its way. It works once, for a limited time. Check your inbox and your spam folder.
          </p>
        ) : view === 'reset-password' && !token ? (
          <p className="account-status account-status--error" role="alert">
            This reset link is not complete. Ask for a new one.
          </p>
        ) : (
          <form className="account-form account-track__form" action={form.action} method="post">
            {view === 'login' && next ? <input type="hidden" name="next" value={next} /> : null}
            {view === 'reset-password' ? <input type="hidden" name="token" value={token} /> : null}
            {form.fields.map((f) => (
              <label className="account-field" key={f.name}>
                <span>{f.label}</span>
                <input
                  name={f.name}
                  type={f.type ?? 'text'}
                  required
                  minLength={f.minLength}
                  autoComplete={f.auto}
                  defaultValue={f.keep ? first(search[f.name]) : undefined}
                />
              </label>
            ))}
            <button type="submit" className="account-btn account-btn--solid">
              {form.submit}
            </button>
            <p className="account-status account-status--error" role="alert">
              {error}
            </p>
          </form>
        )}
        <div className="account-center__actions">
          {view === 'login' ? (
            <>
              <a className="account-link account-link--line" href="/account/forgot-password">
                Forgot your password?
              </a>
              <a className="account-link account-link--line" href="/account/register">
                Create an account
              </a>
            </>
          ) : view === 'change-password' ? (
            <a className="account-link account-link--line" href="/account/details">
              Back to my details
            </a>
          ) : (
            <a className="account-link account-link--line" href="/account/login">
              {view === 'register' ? 'I already have an account' : 'Back to sign in'}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

/* ----------------------- Public order tracking ----------------------- */
async function PublicTrack({ search, exampleOrder }: { search: Record<string, string | string[] | undefined>; exampleOrder?: string }) {
  const q = first(search.order);
  const email = first(search.email);
  // The order opens only with the email it was placed with (the backend checks it).
  const order = q && email ? await loadOrderView(q, email) : null;
  if (order) {
    return <OrderDetail order={order} track back={{ href: '/track-order', label: 'Track another order' }} />;
  }
  return (
    <div className="account-center">
      <section className="account-card account-center__card">
        <p className="account-eyebrow">Track your order</p>
        <h1 className="account-center__title">
          Where is my <em>parcel?</em>
        </h1>
        <p className="account-center__text">Enter the order number from your confirmation email and the email address you ordered with.{exampleOrder ? ` Try ${exampleOrder}.` : ''}</p>
        <TrackForm defaultOrder={q} defaultEmail={email} placeholder={exampleOrder} error={q ? 'We could not find that order. Check the number and the email address and try again.' : ''} />
      </section>
    </div>
  );
}

/** Views that need a signed-in customer, and the path of each (to come back to after signing in) */
const CUSTOMER_VIEWS: Partial<Record<AccountView, string>> = {
  overview: '/account',
  details: '/account/details',
  orders: '/account/orders',
  'order-details': '/account/orders',
  track: '/account/track',
  wishlist: '/account/wishlist',
  rewards: '/account/rewards',
  refills: '/account/refills',
  preferences: '/account/preferences',
  'change-password': '/account/change-password',
};
/** Views for visitors who are not signed in: a signed-in customer is sent to their account instead */
const GUEST_VIEWS: AccountView[] = ['login', 'register'];

export default async function Account({
  id,
  view,
  beautyProfile,
  lead,
  steps,
  earn,
  redeem,
  membership,
  exampleOrder,
  eyebrow,
  heading,
  text,
  context,
}: AccountProps & { id: string; context?: PageContext }) {
  const search = context?.searchParams ?? {};

  const comeBackTo = CUSTOMER_VIEWS[view];
  if (comeBackTo) {
    const user = await currentUser();
    const login = `/account/login?next=${encodeURIComponent(comeBackTo)}`;
    if (!user || user.customerId === null) {
      // Cookies that no longer work (the session ended, or it is the admin's): a page render cannot clear
      // them, so the sign-out route does, then the sign-in page opens.
      const stale = !!user || (await cookies()).has(SIGNED_IN_COOKIE);
      redirect(stale ? `/api/account/logout?next=${encodeURIComponent(login)}` : login);
    }
    if (view !== 'change-password') {
      const loaded = await loadAccountData(String(user.customerId), (redeem ?? []).map((r) => r.handle));
      if (!loaded) redirect(`/api/account/logout?next=${encodeURIComponent(login)}`);
      accountBox().data = loaded;
    }
  } else if (GUEST_VIEWS.includes(view) && (await currentUser())?.customerId != null) {
    redirect('/account');
  }

  let body: React.ReactNode;
  let shellView: AccountView | null = null;
  switch (view) {
    case 'overview':
      shellView = 'overview';
      body = <Overview />;
      break;
    case 'details':
      shellView = 'details';
      body = <Details beautyProfile={beautyProfile} notice={first(search.notice)} />;
      break;
    case 'orders':
      shellView = 'orders';
      body = <Orders />;
      break;
    case 'wishlist':
      shellView = 'wishlist';
      body = <Wishlist />;
      break;
    case 'refills':
      shellView = 'refills';
      body = <Refills membership={membership} />;
      break;
    case 'preferences':
      shellView = 'preferences';
      body = <Preferences />;
      break;
    case 'order-details': {
      // Only the customer's own orders open here
      const wanted = first(search.id).replace(/^#/, '').trim().toLowerCase();
      const order = data().orders.find((o) => o.id.toLowerCase() === wanted);
      if (!order) notFound();
      body = <OrderDetail order={order} track={false} back={{ href: '/account/orders', label: 'Back to orders' }} />;
      break;
    }
    case 'track': {
      const order = data().orders.find((o) => o.status === 'in-transit') ?? data().orders[0];
      if (!order) redirect('/account/orders');
      body = <OrderDetail order={order} track back={{ href: '/account/orders', label: 'Back to orders' }} />;
      break;
    }
    case 'rewards':
      body = <Rewards lead={lead} steps={steps} earn={earn} redeem={redeem} />;
      break;
    case 'signout':
      body = <SignOut />;
      break;
    case 'track-order':
      body = <PublicTrack search={search} exampleOrder={exampleOrder} />;
      break;
    case 'login':
    case 'register':
    case 'forgot-password':
    case 'reset-password':
    case 'change-password':
      body = <AuthCard view={view} search={search} eyebrow={eyebrow} heading={heading} text={text} />;
      break;
  }
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <div className={`account full-width color-scheme-2 account--${view}`}>
        <div className="account__inner">{shellView ? <Shell view={shellView}>{body}</Shell> : body}</div>
      </div>
    </div>
  );
}
