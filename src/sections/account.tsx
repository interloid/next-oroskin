/**
 * Account demo pages (Figma "account-*" screens). One section, one `view` per page; static mock data, no real auth.
 * Styles: public/theme/account.css (BEM, prefix account-).
 */
import { notFound } from 'next/navigation';
import type { PageContext } from '@/components/PageRenderer';
import Icon from '@/components/Icon';
import { db } from '@/lib/db';
import { money } from '@/lib/format';
import {
  addresses,
  cards,
  customer,
  findOrder,
  lineProducts,
  orders,
  orderTotals,
  preferenceList,
  recentlyViewed,
  rewards,
  statusLabel,
  subscriptions,
  wishlist,
  type Order,
} from '@/lib/account-data';
import { DetailsForm, OrdersList, PrefToggles, SmallAction, TrackForm, WishlistList, type OrderRow } from '@/sections/_account-client';

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
  | 'track-order';

export interface AccountProps {
  view: AccountView;
}

const TABS: { view: AccountView; href: string; label: string; icon: string }[] = [
  { view: 'overview', href: '/account', label: 'Overview', icon: 'sparkle' },
  { view: 'details', href: '/account/details', label: 'My details', icon: 'account' },
  { view: 'orders', href: '/account/orders', label: 'Orders', icon: 'box' },
  { view: 'wishlist', href: '/account/wishlist', label: 'Wishlist', icon: 'heart' },
  { view: 'refills', href: '/account/refills', label: 'Refills', icon: 'return' },
  { view: 'preferences', href: '/account/preferences', label: 'Preferences', icon: 'shield-check' },
];

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? '';
const img = (handle: string) => db.product(handle)?.images[0]?.src ?? '';
const title = (handle: string) => db.product(handle)?.title ?? handle;

function Shell({ view, children }: { view: AccountView; children: React.ReactNode }) {
  const pct = Math.round((customer.points / (customer.points + customer.pointsToNext)) * 100);
  return (
    <>
      <header className="account-head">
        <div>
          <h1 className="account-head__title">My account</h1>
          <p className="account-head__text">Everything you need to make your OroSkin ritual feel entirely yours.</p>
        </div>
        <a className="account-signout" href="/account/signout">
          <Icon name="arrow" />
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
            <strong>{customer.points.toLocaleString('en-US')} pts</strong>
          </p>
          <div className="account-meter" role="img" aria-label={`${pct}% of the way to ${customer.nextTier}`}>
            <span style={{ inlineSize: `${pct}%` }} />
          </div>
          <p className="account-welcome__next">
            {customer.pointsToNext.toLocaleString('en-US')} points to {customer.nextTier}
          </p>
        </div>
      </section>

      <nav className="account-tabs" aria-label="Account">
        <ul>
          {TABS.map((t) => (
            <li key={t.view}>
              <a className={`account-tab${t.view === view ? ' is-active' : ''}`} href={t.href} aria-current={t.view === view ? 'page' : undefined}>
                <Icon name={t.icon} />
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
  const transit = orders.find((o) => o.status === 'in-transit')!;
  const tp = lineProducts(transit)[0];
  return (
    <>
      <div className="account-grid account-grid--2 account-grid--soft">
        <section className="account-card account-card--tint">
          <p className="account-eyebrow">In transit</p>
          <h2 className="account-card__title">{tp.product.title}</h2>
          <p className="account-card__text">Left the New York atelier this morning. Arriving Tuesday, before 9pm.</p>
          <a className="account-btn account-btn--glass account-card__cta" href="/account/track">
            Track the parcel
          </a>
        </section>
        <section className="account-card account-card--tint">
          <p className="account-eyebrow">Oro Circle</p>
          <h2 className="account-card__title">1250 points to Champagne</h2>
          <p className="account-card__text">Champagne opens full-size redemptions and the first pour of every new ferment.</p>
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
              const l = lineProducts(o)[0];
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
                    <span className="account-mini__price">{money(orderTotals(o).total)}</span>
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
            const p = db.product(h);
            if (!p) return null;
            return (
              <li key={h}>
                <a className="account-viewed__card" href={`/products/${h}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.images[0].src} alt="" width={358} height={305} loading="lazy" />
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
function Details() {
  return (
    <div className="account-details">
      <section className="account-card">
        <CardHead eyebrow="Personal" heading="My details" />
        <div className="account-details__photo">
          <span className="account-avatar account-avatar--lg" aria-hidden="true">
            {customer.initials}
          </span>
          <SmallAction label="Change photo" done="Photo updated (demo)" />
        </div>
        <DetailsForm name={customer.name} phone={customer.phone} email={customer.email} birthday={customer.birthday} />
      </section>

      <div className="account-details__side">
        <section className="account-card">
          <CardHead eyebrow="Delivery" heading="Saved addresses" action={<SmallAction label="+ Add new" done="Added (demo)" />} />
          <ul className="account-addr">
            {addresses.map((a) => (
              <li className="account-addr__item" key={a.id}>
                <p className="account-addr__label">
                  <Icon name="mobile" />
                  {a.label}
                  {a.isDefault ? <span className="account-tag account-tag--default">Default</span> : null}
                </p>
                <address>
                  {a.lines.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </address>
                <div className="account-addr__actions">
                  <SmallAction label="Edit" done="Editing (demo)" />
                  {a.isDefault ? null : <SmallAction label="Set as default" done="Default set" />}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="account-card">
          <CardHead eyebrow="Billing" heading="Payment methods" action={<SmallAction label="+ Add new" done="Added (demo)" />} />
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
                    {c.name} · expires {c.expires}
                  </p>
                </div>
                <SmallAction label="Edit" done="Editing (demo)" />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="account-card">
        <CardHead eyebrow="Another" heading="Beauty profile" />
        <dl className="account-facts">
          <div>
            <dt>Skin type</dt>
            <dd>Combination, dehydrated</dd>
          </div>
          <div>
            <dt>Preferred family</dt>
            <dd>Woody floral, 22% extract</dd>
          </div>
          <div>
            <dt>Undertone</dt>
            <dd>Olive, shade 04.5</dd>
          </div>
          <div>
            <dt>Sensitivities</dt>
            <dd>Fragrance-free eye care</dd>
          </div>
        </dl>
      </section>

      <section className="account-card">
        <CardHead eyebrow="Security" heading="Account protection" />
        <ul className="account-sec">
          <li>
            <div>
              <p className="account-sec__title">Password</p>
              <p className="account-sec__text">Last updated 3 months ago</p>
            </div>
            <SmallAction label="Update" done="Check your email (demo)" />
          </li>
          <li>
            <div>
              <p className="account-sec__title">Two-step verification</p>
              <p className="account-sec__text">Add another layer of security</p>
            </div>
            <SmallAction label="Enable" done="Enabled (demo)" />
          </li>
        </ul>
      </section>
    </div>
  );
}

/* ------------------------------ Orders ------------------------------ */
function Orders() {
  const rows: OrderRow[] = orders.map((o) => {
    const ls = lineProducts(o);
    const extra = ls.length > 1 ? ` + ${ls.length - 1} more` : '';
    return {
      id: o.id,
      number: o.number,
      date: o.date,
      status: o.status,
      statusLabel: statusLabel[o.status],
      statusNote: o.statusNote,
      title: ls[0].product.title + extra,
      total: money(orderTotals(o).total),
      image: ls[0].product.images[0].src,
      imageAlt: ls[0].product.title,
    };
  });
  return (
    <section className="account-card">
      <CardHead eyebrow="Purchase history" heading="My orders" />
      <OrdersList rows={rows} />
    </section>
  );
}

/* ----------------------- Order details / tracking ----------------------- */
const STEPS = ['Placed', 'Prepared', 'Shipped', 'Out for delivery', 'Delivered'];
const EVENTS = [
  { t: 'Order confirmed', d: 'Your order has been received and is being prepared.', at: 'July 10, 2026 · 10:30 AM' },
  { t: 'Order packed', d: 'Your order has been packed and is ready to ship.', at: 'July 10, 2026 · 1:30 PM' },
  { t: 'Shipped', d: 'The parcel left the New York atelier with the carrier.', at: 'July 11, 2026 · 9:10 AM' },
  { t: 'Nearby', d: 'The courier is in your area. Delivery is expected today.', at: 'July 15, 2026 · 8:00 AM' },
  { t: 'Delivered', d: 'The parcel was handed over at the door.', at: 'July 15, 2026 · 1:30 PM' },
];

function OrderDetail({ order, track, back }: { order: Order; track: boolean; back: { href: string; label: string } }) {
  const idx = order.status === 'delivered' ? 5 : order.status === 'in-transit' ? 2 : 1; // steps done before the current one
  const lines = lineProducts(order);
  const { subtotal, total } = orderTotals(order);
  const trackSub = ['Confirmed', 'In progress', 'In transit', 'ETA 2 hrs', order.eta];
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
                  {state === 'done' ? '✓' : i + 1}
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
                    <span className="account-timeline__dot" aria-hidden="true" />
                    <p className="account-timeline__title">{e.t}</p>
                    {track ? <p className="account-timeline__text">{e.d}</p> : null}
                    <p className="account-timeline__at">{i < idx ? e.at : 'Pending'}</p>
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
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="account-od__right">
            <section className="account-box">
              <h2 className="account-box__title">Order summary</h2>
              <dl className="account-sum">
                <div>
                  <dt>Subtotal</dt>
                  <dd>{money(subtotal)}</dd>
                </div>
                {order.discount ? (
                  <div>
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
                  <dd>{order.shipping ? money(order.shipping) : 'Free'}</dd>
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
                <h2 className="account-box__title">Shipping &amp; delivery</h2>
                <address className="account-od__addr">
                  <span>John Doe</span>
                  <span>789 Boulevard Street, Apt 3C</span>
                  <span>New York, NY 10011</span>
                  <span>(555) 019-2834</span>
                </address>
              </div>
              <div>
                <h2 className="account-box__title">Payment</h2>
                <p className="account-od__addr">Visa **56</p>
              </div>
            </section>
            <section className="account-box">
              <h2 className="account-box__title">Tracking information</h2>
              <p className="account-od__label">Tracking number</p>
              <p className="account-od__code">{order.tracking}</p>
              <p className="account-od__label">Estimated delivery: {order.eta}</p>
              <a className="account-link" href={track ? '/account/orders' : '/account/track'}>
                {track ? 'All orders' : 'Track package'} <span aria-hidden="true">→</span>
              </a>
            </section>
          </div>
        </div>

        <div className="account-od__help">
          <p>Have a question about this order?</p>
          <div>
            <a className="account-btn account-btn--glass" href="/pages/contact">
              Contact us
            </a>
            <a className="account-btn account-btn--glass" href="/pages/faq">
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
  const items = wishlist
    .map((w) => ({ w, p: db.product(w.handle) }))
    .filter((x) => x.p)
    .map(({ w, p }) => ({
      handle: w.handle,
      badge: w.badge,
      title: p!.title,
      price: money(p!.price),
      rating: p!.rating.value.toFixed(1),
      image: p!.images[0].src,
    }));
  return (
    <section className="account-card">
      <CardHead eyebrow="Saved items" heading="Your wishlist" />
      <WishlistList items={items} />
    </section>
  );
}

/* ------------------------------ Refills ------------------------------ */
function Refills() {
  return (
    <>
      <section className="account-card account-card--tint">
        <div className="account-card__head">
          <div className="account-member__tags">
            <span className="account-tag account-tag--delivered">Active</span>
            <span className="account-tag account-tag--default">Save $24</span>
          </div>
          <div className="account-member__links">
            <a className="account-link" href="/account/rewards">View rewards <span aria-hidden="true">→</span></a>
            <SmallAction label="Cancel membership" done="Request sent (demo)" />
          </div>
        </div>
        <h2 className="account-card__title">Rose Gold annual membership</h2>
        <dl className="account-facts account-facts--2">
          <div>
            <dt>Billing cycle</dt>
            <dd>Annual — $120/year</dd>
          </div>
          <div>
            <dt>Next billing</dt>
            <dd>January 15, 2027</dd>
          </div>
          <div>
            <dt>Points balance</dt>
            <dd>9,156 pts</dd>
          </div>
          <div>
            <dt>Payment method</dt>
            <dd>Visa ending in 4242</dd>
          </div>
        </dl>
      </section>
      <section className="account-card">
        <CardHead eyebrow="On rotation" heading="Your subscriptions" action={<span className="account-tag account-tag--default">2 active</span>} />
        <ul className="account-subs">
          {subscriptions.map((s) => (
            <li className="account-sub" key={s.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="account-sub__img" src={img(s.handle)} alt="" width={140} height={150} />
              <div className="account-sub__main">
                <p className="account-sub__tags">
                  <span className="account-tag account-tag--delivered">Active</span>
                  <span className="account-tag account-tag--default">{s.every}, saving 10%</span>
                </p>
                <h3 className="account-sub__title">{s.name}</h3>
                <p className="account-sub__meta">{s.every} · {money(s.price)}</p>
                <p className="account-sub__meta">
                  <Icon name="calendar" />
                  Next delivery {s.next}
                </p>
                <div className="account-sub__actions">
                  <SmallAction label="Manage" done="Opening (demo)" />
                  <SmallAction label="Pause" done="Paused (demo)" />
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
  return (
    <section className="account-card">
      <CardHead eyebrow="Make it yours" heading="Preferences" />
      <PrefToggles items={preferenceList} />
    </section>
  );
}

/* ------------------------------ Rewards ------------------------------ */
function Rewards() {
  const pct = Math.round((customer.points / 3400) * 100);
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
            Gold, <em>returned.</em>
          </h1>
          <p className="account-rw-hero__lead">
            Five points for every dollar. Points become travel sizes, full sizes, and doors that stay closed to everyone else.
          </p>
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
        <div className="account-ring" role="img" aria-label={`Balance ${customer.points} points, 2150 to Champagne`}>
          <svg viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="88" className="account-ring__track" />
            <circle cx="100" cy="100" r="88" className="account-ring__fill" strokeDasharray={`${(circ * pct) / 100} ${circ}`} />
          </svg>
          <span className="account-ring__badge">Gold</span>
          <span className="account-ring__label">Balance</span>
          <span className="account-ring__value">{customer.points}</span>
          <span className="account-ring__next">2150 to Champagne</span>
        </div>
      </header>

      <section className="account-rw-section">
        <h2 className="account-rw-section__title">How it works</h2>
        <p className="account-rw-section__lead">Membership is complimentary. Points post the day a parcel ships.</p>
        <ol className="account-how">
          {rewards.steps.map((s, i) => (
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
            {rewards.earn.map((e) => (
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
          {rewards.redeem.map((r, i) => {
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
          <a className="account-btn account-btn--solid" href="/">
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

/* ----------------------- Public order tracking ----------------------- */
function PublicTrack({ search }: { search: Record<string, string | string[] | undefined> }) {
  const q = first(search.order);
  const email = first(search.email);
  const order = q ? findOrder(q) : undefined;
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
        <p className="account-center__text">Enter the order number from your confirmation email. Try ORO-2026-0731.</p>
        <TrackForm defaultOrder={q} defaultEmail={email} error={q ? 'We could not find that order. Check the number and try again.' : ''} />
      </section>
    </div>
  );
}

export default function Account({ id, view, context }: AccountProps & { id: string; context?: PageContext }) {
  const search = context?.searchParams ?? {};
  let body: React.ReactNode;
  let shellView: AccountView | null = null;
  switch (view) {
    case 'overview':
      shellView = 'overview';
      body = <Overview />;
      break;
    case 'details':
      shellView = 'details';
      body = <Details />;
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
      body = <Refills />;
      break;
    case 'preferences':
      shellView = 'preferences';
      body = <Preferences />;
      break;
    case 'order-details': {
      const order = findOrder(first(search.id));
      if (!order) notFound();
      body = <OrderDetail order={order} track={false} back={{ href: '/account/orders', label: 'Back to orders' }} />;
      break;
    }
    case 'track':
      body = <OrderDetail order={orders.find((o) => o.status === 'in-transit')!} track back={{ href: '/account/orders', label: 'Back to orders' }} />;
      break;
    case 'rewards':
      body = <Rewards />;
      break;
    case 'signout':
      body = <SignOut />;
      break;
    case 'track-order':
      body = <PublicTrack search={search} />;
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
