/**
 * Collection tiles (theme: sections/collection-tiles.liquid). Two looks:
 * - 'promo' (collection page): small heading, name + offer pill, "Shop all →" link over the card, a
 *   cut-out photo over the edge (rotate / size / move per tile, optional endless movement).
 * - 'photo': a photo tile with a bar (name + "Shop" or a product price).
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import Price from '@/components/Price';
import { api } from '@/lib/api';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

interface Tile {
  /** Link target: a collection handle or a product handle. */
  collection?: string;
  product?: string;
  label?: string;
  image?: { src: string; width?: number; height?: number };
  eyebrow?: string;
  badge?: string;
  linkLabel?: string;
  imageRotate?: number; // deg, -45..45
  imageScale?: number; // %, 50..150
  imageX?: number; // %
  imageY?: number; // %
}

export interface CollectionTilesProps extends SectionCommon {
  tileStyle?: 'photo' | 'promo';
  heading?: string;
  tileRatio?: string; // "4 / 3"
  photoAnimation?: 'none' | 'breathe' | 'float' | 'sway' | 'twinkle' | 'spin' | 'rock' | 'flash';
  photoAnimationSpeed?: number; // s
  highlightColor?: string;
  tiles: Tile[];
}

export default async function CollectionTiles({
  id,
  context,
  tileStyle = 'photo',
  heading,
  tileRatio = '4 / 3',
  photoAnimation = 'none',
  photoAnimationSpeed = 6,
  highlightColor,
  tiles = [],
  ...common
}: CollectionTilesProps & { id: string; context?: PageContext }) {
  const resolved = (
    await Promise.all(
      tiles.map(async (t) => {
        if (t.product) {
          const p = await api.product(t.product);
          if (!p) return null;
          return { ...t, url: `/products/${p.handle}`, label: t.label || p.title, image: t.image ?? (p.images[0] ? { src: p.images[0].src } : undefined), productData: p };
        }
        if (t.collection) {
          const c = (await api.collections()).find((x) => x.handle === t.collection);
          return { ...t, url: `/collections/${t.collection}`, label: t.label || c?.title || '', image: t.image ?? (c?.image ? { src: c.image } : undefined), productData: null };
        }
        if (t.label) return { ...t, url: '/collections/all', productData: null };
        return null;
      }),
    )
  ).filter((t) => t !== null);
  if (!resolved.length) return null;

  const loading = (context?.index ?? 0) === 0 ? 'eager' : 'lazy';
  const NameTag = heading ? 'h3' : 'h2';

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`collection-tiles collection-tiles--${tileStyle} collection-tiles--anim-${photoAnimation} full-width section-width--${common.width ?? 'wide'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle(common, {
          '--photo-speed': `${photoAnimationSpeed}s`,
          '--tile-ratio': tileRatio,
          ...(highlightColor ? { '--color-accent': highlightColor } : {}),
        })}
      >
        <div className="collection-tiles__inner">
          {heading ? (
            <h2 className="collection-tiles__heading" id={`CollectionTiles-${id}`}>
              {heading}
            </h2>
          ) : null}
          <ul className="collection-tiles__list" role="list" {...(heading ? { 'aria-labelledby': `CollectionTiles-${id}` } : {})}>
            {resolved.map((t, i) => {
              const name = t.label || 'Collection';
              if (tileStyle === 'promo') {
                const scale = t.imageScale ?? 100;
                const sizes = `(min-width: 990px) ${Math.ceil((scale * 14) / 100)}vw, (min-width: 750px) ${Math.ceil((scale * 20) / 100)}vw, ${Math.ceil((scale * 40) / 100)}vw`;
                return (
                  <li className="collection-tiles__item" key={i}>
                    <div
                      className="collection-tiles__card"
                      style={
                        {
                          '--photo-rotate': `${t.imageRotate ?? 0}deg`,
                          '--photo-scale': (scale / 100).toFixed(1),
                          '--photo-x': `${t.imageX ?? 0}%`,
                          '--photo-y': `${t.imageY ?? 0}%`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="collection-tiles__card-text">
                        {t.eyebrow ? <p className="collection-tiles__eyebrow">{t.eyebrow}</p> : null}
                        <div className="collection-tiles__card-name">
                          <NameTag className="collection-tiles__card-title">{name}</NameTag>
                          {t.badge ? <span className="collection-tiles__badge">{t.badge}</span> : null}
                        </div>
                        <a className="collection-tiles__card-link" href={t.url}>
                          {t.linkLabel || 'Shop all'}
                          <span className="visually-hidden">: {name}</span>
                          <Icon name="arrow" />
                        </a>
                      </div>
                      {t.image ? (
                        <img
                          src={t.image.src}
                          alt=""
                          width={t.image.width ?? 800}
                          height={t.image.height ?? 533}
                          loading={loading}
                          sizes={sizes}
                          className="collection-tiles__cutout"
                        />
                      ) : null}
                    </div>
                  </li>
                );
              }
              return (
                <li className="collection-tiles__item" key={i}>
                  <a className="collection-tiles__link" href={t.url}>
                    {t.image ? (
                      <img
                        src={t.image.src}
                        alt=""
                        width={t.image.width ?? 1200}
                        height={t.image.height ?? 900}
                        loading={loading}
                        sizes="(min-width: 990px) 33vw, 90vw"
                        className="collection-tiles__image"
                      />
                    ) : null}
                    <div className="collection-tiles__bar">
                      <span className="collection-tiles__name">{name}</span>
                      {t.productData ? (
                        <div className="collection-tiles__price">
                          <Price product={t.productData} />
                        </div>
                      ) : (
                        <span className="collection-tiles__cta" aria-hidden="true">
                          Shop
                          <Icon name="arrow" />
                        </span>
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
          {tileStyle === 'promo' && photoAnimation !== 'none' ? (
            <motion-pause className="motion-pause collection-tiles__pause" data-target=".collection-tiles">
              <button type="button" className="motion-pause__button" aria-pressed="false" hidden>
                <span className="visually-hidden">Pause the moving photos</span>
                <svg className="motion-pause__icon motion-pause__icon--pause" aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
                  <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
                  <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" />
                </svg>
                <svg className="motion-pause__icon motion-pause__icon--play" aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
                  <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z" fill="currentColor" />
                </svg>
              </button>
            </motion-pause>
          ) : null}
        </div>
      </div>
    </div>
  );
}
