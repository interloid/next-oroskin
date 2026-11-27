/**
 * Header: sticky glass pill with logo, main menu (mega menu cards), search popup, cart and the account login
 * (theme: sections/header.liquid + snippets/header-drawer, header-menu, mega-menu-panel, mega-menu-card, search-popup).
 * Content: site.menu / site.logo / site.search, cart count from `cart.itemCount`.
 * `transparent` = the home page look (floats over the hero, only the action buttons at rest).
 * `path` = the current pathname, for the active menu link.
 */
import Icon from '@/components/Icon';
import type { Cart, MenuItem, Site } from '@/lib/types';

export interface HeaderProps {
  site: Site;
  cart?: Cart | null;
  transparent?: boolean;
  path?: string | null;
  colorScheme?: string; // bar + drawer, default scheme-1
  megaMenuScheme?: string; // default scheme-2
}

/** Theme snippet logo-text-scale: 1 up to 12 letters, then 12 / letters, at least 0.6. */
export function logoTextScale(text: string) {
  const n = text.length;
  if (n <= 12) return '1';
  return String(Math.max(0.6, Math.round((12 / n) * 1000) / 1000));
}

function isCurrent(url: string, path?: string | null) {
  return !!path && url !== '#' && url === path;
}
function isActive(url: string, path?: string | null) {
  return !!path && url !== '#' && url !== '/' && (path === url || path.startsWith(url + '/'));
}
function childActive(item: MenuItem, path?: string | null): boolean {
  return (item.children ?? []).some((c) => isActive(c.url, path) || childActive(c, path));
}

const cartLabel = (n: number) => (n === 0 ? 'Cart' : n === 1 ? 'Cart, 1 item' : `Cart, ${n} items`);

function CartCount({ count, drawer }: { count: number; drawer?: boolean }) {
  return (
    <cart-count data-label-zero="Cart" data-label-one="Cart, 1 item" data-label-other="Cart, 999999 items">
      <a className={`header__icon-button${drawer ? ' header-drawer__icon' : ''}`} href="/cart">
        <Icon name="cart" />
        <span className="visually-hidden" data-cart-count-label="">
          {cartLabel(count)}
        </span>
        {count > 0 ? (
          <span className="header__count" aria-hidden="true">
            {count < 100 ? count : '99+'}
          </span>
        ) : null}
      </a>
    </cart-count>
  );
}

function Logo({ site, className, imageClass, textClass, eager }: { site: Site; className: string; imageClass: string; textClass: string; eager?: boolean }) {
  const { logo } = site;
  return (
    <a className={className} href="/">
      {logo.image ? (
        <img
          src={logo.image}
          alt=""
          width={logo.imageWidth ?? 100}
          height={logo.imageHeight ?? 146}
          loading={eager ? 'eager' : 'lazy'}
          className={imageClass}
          sizes="50px"
        />
      ) : null}
      <span className={`${textClass} logo-text-fit`}>
        {logo.text}
        {logo.accent ? <em>{logo.accent}</em> : null}
      </span>
    </a>
  );
}

const CardArrow = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 14 14" width="12" height="12">
    <path d="M2 12L12 2M4 2h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** One mega menu card (snippets/mega-menu-card.liquid). */
function MegaCard({ link, path }: { link: MenuItem; path?: string | null }) {
  const image = link.image ? (
    <div className="image menu__card-image image--cover">
      <img
        src={link.image}
        alt=""
        width={link.imageWidth}
        height={link.imageHeight}
        loading="lazy"
        sizes="(min-width: 990px) 25vw, 100vw"
        fetchPriority="auto"
      />
    </div>
  ) : null;
  const noLink = link.url === '#';
  return (
    <li className="menu__card">
      {noLink ? (
        <div className="menu__card-image-link">{image}</div>
      ) : (
        <a className="menu__card-image-link" href={link.url} tabIndex={-1} aria-hidden="true">
          {image}
        </a>
      )}
      {noLink ? (
        <span className="menu__card-title">{link.title}</span>
      ) : (
        <a className="menu__card-title" href={link.url} aria-current={isCurrent(link.url, path) ? 'page' : undefined}>
          {link.title}
          <CardArrow />
        </a>
      )}
      {link.text ? <p className="menu__card-text">{link.text}</p> : null}
      {link.children?.length ? (
        <ul className="menu__card-subs" role="list">
          {link.children.map((g, i) => (
            <li key={i}>
              <a className="menu__card-sub" href={g.url} aria-current={isCurrent(g.url, path) ? 'page' : undefined}>
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/** The mega menu panel (snippets/mega-menu-panel.liquid): title + Shop all, cards, slider arrows. */
function MegaPanel({ link, scheme, path }: { link: MenuItem; scheme?: string; path?: string | null }) {
  const shopAll = link.shopAll === undefined ? { label: 'Shop all', url: link.url } : link.shopAll;
  return (
    <div className={`menu__panel${scheme ? ` color-${scheme}` : ''}`}>
      <div className="menu__panel-header">
        <p className="menu__panel-title">{link.panelTitle ?? `${link.title} by category`}</p>
        <div className="menu__panel-actions">
          {shopAll ? (
            <a className="menu__panel-all" href={shopAll.url || '#'}>
              {shopAll.label}
              <span className="menu__icon">
                <Icon name="arrow" />
              </span>
            </a>
          ) : null}
        </div>
      </div>
      <ul className="menu__cards" role="list">
        {(link.children ?? []).map((c, i) => (
          <MegaCard link={c} path={path} key={i} />
        ))}
      </ul>
      <div className="menu__slider-buttons" hidden>
        <button type="button" className="menu__slider-button" data-direction="-1" aria-label="Previous">
          <span className="menu__icon menu__icon--back">
            <Icon name="arrow" />
          </span>
        </button>
        <button type="button" className="menu__slider-button" data-direction="1" aria-label="Next">
          <span className="menu__icon">
            <Icon name="arrow" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default function Header({ site, cart, transparent = false, path = null, colorScheme = 'scheme-1', megaMenuScheme = 'scheme-2' }: HeaderProps) {
  const menu = site.menu ?? [];
  const count = cart?.itemCount ?? 0;
  const logoText = `${site.logo.text}${site.logo.accent}`;
  const trending = site.search?.trending ?? [];
  const searchHref = (t: string) => `/search?q=${encodeURIComponent(t).replace(/%20/g, '+')}&options%5Bprefix%5D=last`;

  return (
    <div id="shopify-section-header" className="shopify-section shopify-section-group-header-group">
      <sticky-header>
        <header
          className={`header${transparent ? ' header--transparent' : ''}`}
          style={
            {
              '--logo-width': '50px',
              '--logo-text-size': '47px',
              '--logo-text-scale': logoTextScale(logoText),
              '--nav-underline': "url('/cdn/shop/t/8/assets/nav-underline.svg')",
              '--mega-columns': '3',
            } as React.CSSProperties
          }
        >
          <div className={`header__bar color-${colorScheme}`}>
            <header-drawer className="header-drawer">
              <button
                type="button"
                className="header__icon-button header-drawer__toggle"
                aria-haspopup="dialog"
                aria-controls="HeaderDrawer"
                aria-expanded="false"
              >
                <Icon name="menu" />
                <span className="visually-hidden">Open menu</span>
              </button>
              {/* No JavaScript: the phone menu as plain links (the button above needs showModal()) */}
              <noscript>
                <details className="header-drawer__fallback">
                  <summary className="header__icon-button header-drawer__toggle">
                    <Icon name="menu" />
                    <span className="visually-hidden">Open menu</span>
                  </summary>
                  <nav className={`header-drawer__fallback-panel color-${colorScheme}`} aria-label="Main menu">
                    <ul role="list">
                      {menu.map((l, i) => (
                        <li key={i}>
                          <a href={l.url}>{l.title}</a>
                          {l.children?.length ? (
                            <ul role="list">
                              {l.children.map((c, j) => (
                                <li key={j}>
                                  <a href={c.url}>{c.title}</a>
                                  {c.children?.length ? (
                                    <ul role="list">
                                      {c.children.map((g, k) => (
                                        <li key={k}>
                                          <a href={g.url}>{g.title}</a>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </nav>
                </details>
              </noscript>
              <dialog id="HeaderDrawer" className={`header-drawer__dialog color-${colorScheme}`} aria-label="Main menu">
                <div className="header-drawer__panel">
                  <div className="header-drawer__head">
                    <Logo site={site} className="header-drawer__logo" imageClass="header__logo-image" textClass="header__logo-text" />
                    <button type="button" className="header-drawer__close" data-drawer-close="">
                      <Icon name="close" />
                      <span className="visually-hidden">Close menu</span>
                    </button>
                  </div>
                  <nav className="header-drawer__nav" aria-label="Main menu">
                    <ul className="header-drawer__list" role="list">
                      {menu.map((l, i) => {
                        if (l.children?.length) {
                          const subId = `HeaderDrawerSub-${i + 1}`;
                          const active = isActive(l.url, path) || childActive(l, path);
                          return (
                            <li key={i}>
                              <button
                                type="button"
                                className={`header-drawer__link${active ? ' header-drawer__link--active' : ''}`}
                                aria-expanded="false"
                                aria-controls={subId}
                                data-drawer-sub=""
                              >
                                {l.title}
                                <span className="header-drawer__chevron">
                                  <Icon name="chevron" />
                                </span>
                              </button>
                              <div id={subId} className="header-drawer__sub menu--images-cover menu--ratio-landscape" hidden>
                                <button type="button" className="header-drawer__back" data-drawer-back="">
                                  <span className="header-drawer__chevron header-drawer__chevron--back">
                                    <Icon name="chevron" />
                                  </span>
                                  Back
                                </button>
                                <MegaPanel link={l} path={path} />
                              </div>
                            </li>
                          );
                        }
                        return (
                          <li key={i}>
                            <a
                              className={`header-drawer__link${isActive(l.url, path) ? ' header-drawer__link--active' : ''}`}
                              href={l.url}
                              aria-current={isCurrent(l.url, path) ? 'page' : undefined}
                            >
                              {l.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <div className="header-drawer__tools">
                    <ul className="header-drawer__icons" role="list" aria-label="Search and cart">
                      <li>
                        <a className="header-drawer__icon" href="/search" data-drawer-search="">
                          <Icon name="search" />
                          <span className="visually-hidden">Search</span>
                        </a>
                      </li>
                      <li>
                        <CartCount count={count} drawer />
                      </li>
                    </ul>
                  </div>
                </div>
              </dialog>
            </header-drawer>

            <Logo site={site} className="header__logo" imageClass="header__logo-image" textClass="header__logo-text" eager />

            <nav className="header__menu" aria-label="Main menu">
              <ul className="menu menu--panel-bar menu--images-cover menu--ratio-landscape" role="list">
                {menu.map((l, i) => (
                  <li className="menu__item" key={i}>
                    {l.children?.length ? (
                      <details className="menu__dropdown">
                        <summary className={`menu__link${isActive(l.url, path) || childActive(l, path) ? ' menu__link--active' : ''}`}>
                          {l.title}
                        </summary>
                        <MegaPanel link={l} scheme={megaMenuScheme} path={path} />
                      </details>
                    ) : (
                      <a
                        className={`menu__link${isActive(l.url, path) ? ' menu__link--active' : ''}`}
                        href={l.url}
                        aria-current={isCurrent(l.url, path) ? 'page' : undefined}
                      >
                        {l.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header__actions">
              <search-popup
                className="search-popup"
                data-url="/search/suggest"
                data-search-url="/search"
                data-section-id="predictive-search"
                data-types="product,collection,page,article,query"
                data-limit="6"
                data-label-error="Search isn’t available right now. Press Enter to search the whole store."
              >
                <a className="header__icon-button" href="/search" aria-haspopup="dialog" aria-controls="SearchPopup" data-search-open="">
                  <Icon name="search" />
                  <span className="visually-hidden">Search</span>
                </a>
                <dialog
                  id="SearchPopup"
                  className={`search-popup__dialog color-${colorScheme}`}
                  aria-label="Search"
                  style={{ '--color-accent': '#8a6a1f', '--search-focus': '#7d0000' } as React.CSSProperties}
                >
                  <div className="search-popup__panel">
                    <div className="search-popup__inner">
                      <form id="SearchPopupForm" className="search-popup__form" action="/search" method="get" role="search" data-search-form="">
                        <label className="visually-hidden" htmlFor="SearchPopupInput">
                          Search the store
                        </label>
                        <input
                          id="SearchPopupInput"
                          className="search-popup__input"
                          type="search"
                          name="q"
                          placeholder={site.search?.placeholder ?? 'Search'}
                          autoComplete="off"
                          autoCapitalize="off"
                          spellCheck={false}
                          aria-controls="SearchPopupResults"
                          data-search-input=""
                        />
                        <input type="hidden" name="options[prefix]" value="last" />
                        <button type="submit" className="search-popup__submit">
                          <Icon name="search" />
                          <span className="visually-hidden">Search</span>
                        </button>
                      </form>
                      <hr className="search-popup__rule" />
                      <p className="visually-hidden" role="status" data-search-status=""></p>
                      <div className="search-popup__start" data-search-start="">
                        <div className="search-popup__group" data-search-recent="" hidden>
                          <h2 className="search-popup__heading" id="SearchRecentHeading">
                            Recent searches
                          </h2>
                          <ul className="search-popup__chips" role="list" aria-labelledby="SearchRecentHeading"></ul>
                        </div>
                        {trending.length ? (
                          <div className="search-popup__group">
                            <h2 className="search-popup__heading" id="SearchTrendingHeading">
                              Trending searches
                            </h2>
                            <ul className="search-popup__chips" role="list" aria-labelledby="SearchTrendingHeading">
                              {trending.map((t) => (
                                <li key={t}>
                                  <a className="search-popup__chip search-popup__chip--trending" href={searchHref(t)} data-search-term={t}>
                                    {t}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                      <div id="SearchPopupResults" className="search-popup__results" data-search-results="" hidden></div>
                    </div>
                    <button type="button" className="search-popup__close" data-search-close="">
                      <Icon name="close" />
                      <span className="visually-hidden">Close search</span>
                    </button>
                  </div>
                </dialog>
              </search-popup>

              <CartCount count={count} />

              {/* Shopify's account component (no Shopify script here: only the LOGIN pill in its slot shows) */}
              <shopify-account className="header__account" menu="customer-account-main-menu">
                <a href="/account" slot="signed-out-avatar" className="button header__login">
                  <Icon name="account" />
                  <span className="header__login-text">Login</span>
                </a>
              </shopify-account>
            </div>
          </div>
        </header>
      </sticky-header>
    </div>
  );
}
