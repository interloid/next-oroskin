/**
 * Reviews: featured review cards staggered right / left in a vertical carousel that moves on scroll (or a
 * timer / arrows), a floating product cut-out and a big pale word (theme: sections/product-reviews.liquid,
 * <product-reviews> in theme.js). A Product tabs panel.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductReviewsProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  /** "Write a review" button (shows with both a label and a link) */
  writeLabel?: string;
  writeLink?: string;
  /** Floating product cut-out (shown from 1200px) */
  floatImage?: string;
  /** Its width at a 1920px screen, px */
  floatSize?: number;
  floatMotion?: 'hide' | 'repeat' | 'stay';
  word?: string;
  /** Cards shown at a time */
  visible?: number;
  motion?: 'scroll' | 'auto' | 'buttons';
  /** Seconds per card with motion "auto" */
  interval?: number;
  reviews?: { name?: string; place?: string; avatar?: string; rating?: number; text: string }[];
}

export default function ProductReviews({
  id,
  anchor = 'reviews',
  eyebrow,
  heading,
  writeLabel,
  writeLink,
  floatImage,
  floatSize = 160,
  floatMotion = 'hide',
  word,
  visible = 3,
  motion = 'scroll',
  interval = 5,
  reviews = [],
  ...common
}: ProductReviewsProps & { id: string; context?: PageContext }) {
  const list = reviews.filter((r) => r.text);
  if (!list.length) return null;
  const carousel = list.length > visible;
  let tabScroll = 0;
  if (motion === 'scroll' && (carousel || floatImage)) {
    tabScroll = Math.round((Math.max(0, list.length - visible) + 1) * 0.35 * 100) / 100;
  }
  const floatVw = Math.ceil(floatSize / 19.2);
  const floatSizes = `(min-width: 1920px) ${floatSize}px, (min-width: 1200px) ${floatVw}vw, 1px`;

  return (
    <section id={`section-${id}`} className="shopify-section">
      <product-reviews
        id={anchor}
        className={`product-reviews full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 64, paddingBottom: 64, ...common }, { '--float-size': String(floatSize) })}
        data-motion={motion}
        data-float={floatMotion}
        {...(tabScroll > 0 ? { 'data-tab-scroll': String(tabScroll) } : {})}
        {...(carousel ? { 'data-carousel': '', 'data-visible': String(visible) } : {})}
        {...(carousel && motion === 'auto' ? { 'data-autoplay': String(interval * 1000) } : {})}
      >
        <div className="product-reviews__inner">
          <div className="product-reviews__intro" data-tab-item="">
            {eyebrow ? <p className="eyebrow eyebrow--center">{eyebrow}</p> : null}
            {heading ? <h2 className="product-reviews__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
            {writeLink && writeLabel ? (
              <a className="button button--secondary product-reviews__write" href={writeLink} data-reviews-write="">
                {writeLabel}
              </a>
            ) : null}
          </div>
          <div className="product-reviews__stage">
            {floatImage ? (
              <div className="product-reviews__float" aria-hidden="true">
                <img src={floatImage} alt="" loading="lazy" sizes={floatSizes} className="product-reviews__float-image" width={1000} height={1000} />
              </div>
            ) : null}
            {word ? (
              <p className="product-reviews__word" aria-hidden="true">
                {word}
              </p>
            ) : null}
            <div
              className="product-reviews__viewport"
              {...(carousel
                ? { role: 'region', 'aria-roledescription': 'carousel', 'aria-label': 'Customer reviews' }
                : {})}
              data-tab-item=""
            >
              <div className="product-reviews__track" data-reviews-track="">
                {list.map((r, i) => {
                  const side = i % 2 === 1 ? 'left' : 'right';
                  const rating = r.rating ?? 0;
                  return (
                    <figure className={`review-card review-card--${side}`} key={i}>
                      <span className="review-card__mark" aria-hidden="true">
                        <Icon name={side === 'right' ? 'quote-open' : 'quote-close'} />
                      </span>
                      {r.avatar || r.name ? (
                        <span className="review-card__avatar">
                          {r.avatar ? (
                            <img src={r.avatar} alt="" width={160} height={160} loading="lazy" className="review-card__avatar-image" />
                          ) : (
                            <span aria-hidden="true">{r.name!.slice(0, 1).toUpperCase()}</span>
                          )}
                        </span>
                      ) : null}
                      <blockquote className="review-card__quote">
                        <p>{r.text}</p>
                      </blockquote>
                      <div className="review-card__footer">
                        {rating > 0 ? (
                          <p className="review-card__rating">
                            <span
                              className="review-card__stars"
                              style={{ '--rating-percent': `${(rating * 20).toFixed(1)}%` } as React.CSSProperties}
                              aria-hidden="true"
                            >
                              ★★★★★
                            </span>
                            <span aria-hidden="true">{rating}</span>
                            <span className="visually-hidden">{`Rated ${rating} out of 5`}</span>
                          </p>
                        ) : null}
                        {r.name ? (
                          <figcaption className="review-card__author">
                            {r.place ? `${r.name}, ${r.place}` : r.name}
                          </figcaption>
                        ) : null}
                      </div>
                    </figure>
                  );
                })}
              </div>
            </div>
            {carousel && motion !== 'scroll' ? (
              <div className="product-reviews__controls" data-tab-item="">
                <button type="button" className="product-reviews__control" data-reviews-prev="">
                  <span className="visually-hidden">Previous review</span>
                  <span className="product-reviews__arrow product-reviews__arrow--up" aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </button>
                {motion === 'auto' ? (
                  <button
                    type="button"
                    className="product-reviews__control product-reviews__pause"
                    data-reviews-pause=""
                    data-label-pause="Pause reviews"
                    data-label-play="Play reviews"
                  >
                    <span className="visually-hidden" data-pause-label="">
                      Pause reviews
                    </span>
                    <svg
                      className="product-reviews__pause-icon product-reviews__pause-icon--pause"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 16 16"
                    >
                      <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
                      <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
                    </svg>
                    <svg
                      className="product-reviews__pause-icon product-reviews__pause-icon--play"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                ) : null}
                <button type="button" className="product-reviews__control" data-reviews-next="">
                  <span className="visually-hidden">Next review</span>
                  <span className="product-reviews__arrow product-reviews__arrow--down" aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </product-reviews>
    </section>
  );
}
