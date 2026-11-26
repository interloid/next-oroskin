/**
 * Collection list (theme: sections/collections.liquid), the /collections page: a header and a grid of
 * collection cards (photo + bar with name and product count). Data: api.collections().
 * Ported layouts: 'tiles' (default) and 'cards'; empty collections are skipped unless showEmpty.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { api } from '@/lib/api';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface CollectionsProps extends SectionCommon {
  eyebrow?: string;
  heading?: string;
  layout?: 'tiles' | 'cards';
  columnsDesktop?: number;
  tileRatio?: string; // "1 / 1"
  cardRadius?: number; // px
  showEmpty?: boolean;
  animation?: 'none' | 'fade-up';
  /** Only these collections, in this order (default: all). */
  handles?: string[];
}

export default async function Collections({
  id,
  context,
  eyebrow = 'Collections',
  heading = 'Shop by category',
  layout = 'tiles',
  columnsDesktop = 3,
  tileRatio = '1 / 1',
  cardRadius = 24,
  showEmpty = false,
  animation = 'fade-up',
  handles,
  ...common
}: CollectionsProps & { id: string; context?: PageContext }) {
  let list = await api.collections();
  if (handles?.length) list = handles.map((h) => list.find((c) => c.handle === h)).filter((c) => !!c);
  list = list.filter((c) => showEmpty || c.productHandles.length > 0);

  // Card photo: the collection's image, else its first product's
  const firstProducts = await api.products(list.filter((c) => !c.image && c.productHandles[0]).map((c) => c.productHandles[0]));
  const photo = (c: (typeof list)[number]) =>
    c.image ?? firstProducts.find((p) => p.handle === c.productHandles[0])?.images[0]?.src ?? null;

  const columnsLaptop = Math.min(3, columnsDesktop);
  const first = (context?.index ?? 0) === 0;
  const colVw = Math.floor(92 / columnsDesktop);
  const sizes = `(min-width: 1200px) ${colVw}vw, (min-width: 990px) ${Math.floor(92 / columnsLaptop)}vw, (min-width: 750px) 46vw, 92vw`;

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`collections-page full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle(
          { paddingTop: 64, paddingBottom: 96, ...common },
          {
            '--tile-ratio': tileRatio,
            '--columns': String(columnsDesktop),
            '--columns-laptop': String(columnsLaptop),
            '--card-radius': `${cardRadius}px`,
          },
        )}
      >
        <div className="collections-page__inner">
          <header className="collections-page__header">
            {eyebrow ? <p className="collections-page__eyebrow">{eyebrow}</p> : null}
            <h1 className="collections-page__title">{heading}</h1>
          </header>
          {list.length ? (
            <animate-on-scroll>
              <ul
                className={`collections-grid collections-grid--${layout}`}
                role="list"
                data-columns-laptop={columnsLaptop}
                data-columns-desktop={columnsDesktop}
              >
                {list.map((c, i) => {
                  const count = c.productHandles.length;
                  const countText = `${count} ${count === 1 ? 'product' : 'products'}`;
                  const src = photo(c);
                  // Section 1: the first row shows without animation and loads at once
                  const still = first ? columnsDesktop : 0;
                  return (
                    <li
                      className="collections-grid__item"
                      key={c.handle}
                      {...(animation !== 'none' && i >= still ? { 'data-animate': animation } : {})}
                    >
                      <a className="collections-card" href={`/collections/${c.handle}`}>
                        <div className="collections-card__media">
                          {src ? (
                            <img
                              src={src}
                              alt=""
                              width={1600}
                              height={1600}
                              loading={first && i < columnsDesktop ? 'eager' : 'lazy'}
                              sizes={sizes}
                              className="collections-card__image"
                            />
                          ) : null}
                        </div>
                        <div className="collections-card__bar">
                          <span className="collections-card__name">{c.title}</span>
                          <span className="collections-card__count">
                            {layout === 'cards' ? (
                              <>
                                <span aria-hidden="true">{count}</span>
                                <span className="visually-hidden">{countText}</span>
                              </>
                            ) : (
                              <>
                                {countText}
                                <Icon name="arrow" />
                              </>
                            )}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </animate-on-scroll>
          ) : (
            <p className="collections-page__empty">There are no collections to show yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
