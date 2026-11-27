'use client';
/** Interactive parts of the account demo pages (filters, toggles, remove, forms). No real backend: state stays in the page. */
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface OrderRow {
  id: string;
  number: string;
  date: string;
  status: 'processing' | 'in-transit' | 'delivered';
  statusLabel: string;
  statusNote: string;
  title: string;
  total: string;
  image: string;
  imageAlt: string;
}

const FILTERS: { key: 'all' | OrderRow['status']; label: string }[] = [
  { key: 'all', label: 'All orders' },
  { key: 'processing', label: 'Processing' },
  { key: 'in-transit', label: 'In transit' },
  { key: 'delivered', label: 'Delivered' },
];

export function OrdersList({ rows }: { rows: OrderRow[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['key']>('all');
  const shown = filter === 'all' ? rows : rows.filter((r) => r.status === filter);
  const count = (k: string) => (k === 'all' ? rows.length : rows.filter((r) => r.status === k).length);
  return (
    <>
      <div className="account-pills" role="group" aria-label="Filter orders">
        {FILTERS.map((f) => (
          <button
            type="button"
            key={f.key}
            className={`account-pill${filter === f.key ? ' is-active' : ''}`}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label} <span className="account-pill__count">{count(f.key)}</span>
          </button>
        ))}
      </div>
      {shown.length ? (
        <ul className="account-orders">
          {shown.map((r) => (
            <li className="account-order" key={r.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="account-order__img" src={r.image} alt={r.imageAlt} width={64} height={64} />
              <div className="account-order__main">
                <p className="account-order__title">{r.title}</p>
                <p className="account-order__meta">
                  {r.number} · {r.date}
                </p>
              </div>
              <span className={`account-tag account-tag--${r.status}`}>{r.statusLabel}</span>
              <p className="account-order__note">{r.statusNote}</p>
              <p className="account-order__total">{r.total}</p>
              <a className="account-link" href={`/account/orders/${r.id}`}>
                View details <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="account-empty">No orders with this status.</p>
      )}
    </>
  );
}

export interface PrefItem {
  id: string;
  title: string;
  text: string;
  on: boolean;
}
export function PrefToggles({ items }: { items: PrefItem[] }) {
  const [state, setState] = useState(() => Object.fromEntries(items.map((i) => [i.id, i.on])));
  return (
    <ul className="account-prefs">
      {items.map((i) => (
        <li className="account-pref" key={i.id}>
          <div>
            <h3 className="account-pref__title" id={`pref-${i.id}`}>
              {i.title}
            </h3>
            <p className="account-pref__text">{i.text}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={state[i.id]}
            aria-labelledby={`pref-${i.id}`}
            className="account-switch"
            onClick={() => setState((s) => ({ ...s, [i.id]: !s[i.id] }))}
          >
            <span className="account-switch__label">{state[i.id] ? 'On' : 'Off'}</span>
            <span className="account-switch__track" aria-hidden="true">
              <span className="account-switch__thumb" />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export interface WishItem {
  handle: string;
  title: string;
  price: string;
  badge: string;
  rating: string;
  image: string;
}
export function WishlistList({ items }: { items: WishItem[] }) {
  const [list, setList] = useState(items);
  const [added, setAdded] = useState<string | null>(null);
  if (!list.length) return <p className="account-empty">Your wishlist is empty. <a className="account-link" href="/collections/all">Browse the shop</a></p>;
  return (
    <>
      <ul className="account-wish">
        {list.map((i) => (
          <li className="account-wish__item" key={i.handle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="account-wish__img" src={i.image} alt="" width={96} height={104} />
            <div className="account-wish__main">
              <span className="account-wish__badge">{i.badge}</span>
              <a className="account-wish__title" href={`/products/${i.handle}`}>
                {i.title}
              </a>
              <p className="account-wish__rating">
                <span aria-hidden="true">★★★★★</span> {i.rating}
              </p>
              <p className="account-wish__price">{i.price}</p>
            </div>
            <div className="account-wish__actions">
              <button type="button" className="account-btn account-btn--ghost" onClick={() => setAdded(i.handle)}>
                {added === i.handle ? 'Added' : 'Add to cart'}
              </button>
              <button type="button" className="account-iconbtn" aria-label={`Remove ${i.title} from wishlist`} onClick={() => setList((l) => l.filter((x) => x.handle !== i.handle))}>
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="account-status" role="status">
        {added ? 'Added to your bag (demo).' : ''}
      </p>
    </>
  );
}

export function DetailsForm({ name, phone, email, birthday }: { name: string; phone: string; email: string; birthday: string }) {
  const [saved, setSaved] = useState(false);
  return (
    <form
      className="account-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
    >
      <label className="account-field">
        <span>Full name</span>
        <input name="name" defaultValue={name} autoComplete="name" onChange={() => setSaved(false)} />
      </label>
      <label className="account-field">
        <span>Phone no</span>
        <input name="phone" type="tel" defaultValue={phone} autoComplete="tel" onChange={() => setSaved(false)} />
      </label>
      <label className="account-field">
        <span>Email address</span>
        <input name="email" type="email" defaultValue={email} autoComplete="email" onChange={() => setSaved(false)} />
      </label>
      <label className="account-field">
        <span>Date of birth</span>
        <input name="dob" type="date" defaultValue={birthday} autoComplete="bday" onChange={() => setSaved(false)} />
      </label>
      <button type="submit" className="account-btn account-btn--solid">
        Save changes
      </button>
      <p className="account-status" role="status">
        {saved ? 'Details saved (demo: nothing is sent).' : ''}
      </p>
    </form>
  );
}

export function TrackForm({ defaultOrder = '', defaultEmail = '', error = '' }: { defaultOrder?: string; defaultEmail?: string; error?: string }) {
  const router = useRouter();
  return (
    <form
      className="account-form account-track__form"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const q = new URLSearchParams({ order: String(f.get('order') ?? ''), email: String(f.get('email') ?? '') });
        router.push(`/track-order?${q}`);
      }}
    >
      <label className="account-field">
        <span>Order number</span>
        <input name="order" required defaultValue={defaultOrder} placeholder="ORO-2026-0731" autoComplete="off" />
      </label>
      <label className="account-field">
        <span>Email address</span>
        <input name="email" type="email" required defaultValue={defaultEmail} placeholder="you@example.com" autoComplete="email" />
      </label>
      <button type="submit" className="account-btn account-btn--solid">
        Track order
      </button>
      <p className="account-status account-status--error" role="status">
        {error}
      </p>
    </form>
  );
}

/**
 * A demo action: shows `done` once clicked. `icon` (server-rendered SVG, e.g. <Icon name="pencil" />) goes before
 * the label; `className` replaces the default text-link look (e.g. "account-link account-link--line").
 */
export function SmallAction({
  label,
  done,
  icon,
  className = 'account-link account-link--btn',
}: {
  label: string;
  done: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <button type="button" className={className} onClick={() => setOn(true)} aria-live="polite">
      {icon}
      {on ? done : label}
    </button>
  );
}

/** A round icon button (edit / delete) for the demo: the label is for screen readers and the tooltip. */
export function IconAction({ label, done, children }: { label: string; done: string; children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const text = on ? done : label;
  return (
    <button type="button" className="account-iconbtn" aria-label={text} title={text} onClick={() => setOn(true)}>
      {children}
    </button>
  );
}
