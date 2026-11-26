/**
 * Testimonials (theme: sections/testimonials.liquid): a centred eyebrow and heading, scattered avatars,
 * a dot timeline (with a pause button when autoplay is on) and the review cards. <testimonial-showcase>
 * (theme JS) switches reviews on dot / avatar clicks, arrow keys and autoplay.
 */
import { liquidFloat } from '@/components/ContentBlocks';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface TestimonialsProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML (<em> = accent)
  highlightColor?: string;
  split?: number; // left column share in %, default 40
  height?: 'auto' | 'full';
  autoplay?: number; // seconds per review, 0 = off
  animation?: 'none' | 'fade-up' | 'slide-bottom';
  reviews: {
    name?: string;
    avatar?: string; // image path
    date?: string; // as shown, e.g. "Apr 15, 2026"
    rating?: number; // 0–5 (0 = no stars), halves allowed
    text?: string; // HTML
  }[];
}

const STAR = 'M12 2.6l2.85 6.08 6.65.72-4.95 4.53 1.35 6.57L12 17.2l-5.9 3.3 1.35-6.57L2.5 9.4l6.65-.72z';
const RING_SLOTS = [0, 1, 3, 4, 5, 6, 7];

function Stars() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg viewBox="0 0 24 24" key={i}>
          <path d={STAR}></path>
        </svg>
      ))}
    </>
  );
}

function CardInner({ r }: { r: TestimonialsProps['reviews'][number] }) {
  const rating = r.rating ?? 5;
  return (
    <>
      <div className="testimonials__meta">
        <div>
          {r.name ? <p className="testimonials__name">{r.name}</p> : null}
          {r.date ? <p className="testimonials__date">{r.date}</p> : null}
        </div>
        {rating > 0 ? (
          <div className="testimonials__stars" role="img" aria-label={`Rated ${rating} out of 5`}>
            <span className="testimonials__stars-row testimonials__stars-row--empty" aria-hidden="true">
              <Stars />
            </span>
            <span
              className="testimonials__stars-row testimonials__stars-row--full"
              style={
                {
                  '--rating-fill': `${Number.isInteger(rating) ? rating * 20 : liquidFloat(rating * 20)}%`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              <Stars />
            </span>
          </div>
        ) : null}
      </div>
      {r.text ? <div className="testimonials__text rte" dangerouslySetInnerHTML={{ __html: r.text }} /> : null}
    </>
  );
}

export default function Testimonials({
  id,
  eyebrow,
  heading,
  highlightColor,
  split = 40,
  height = 'auto',
  autoplay = 0,
  animation = 'fade-up',
  reviews,
  context,
  ...common
}: TestimonialsProps & { id: string; context?: PageContext }) {
  if (!reviews?.length) return null;
  const count = reviews.length;
  const first = context?.index === 0;
  const reveal = first ? 'none' : animation;
  return (
    <div id={`section-${id}`} className="shopify-section">
      <testimonial-showcase
        className={`testimonials full-width section-width--${common.width ?? 'widest'} testimonials--height-${height} color-${common.colorScheme ?? 'scheme-1'}`}
        style={
          {
            '--split-left': `${split}fr`,
            '--split-right': `${100 - split}fr`,
            ...(highlightColor ? { '--color-accent': highlightColor } : {}),
            ...sectionStyle(common),
          } as React.CSSProperties
        }
        {...(autoplay > 0 && count > 1 ? { 'data-autoplay': String(autoplay * 1000) } : {})}
      >
        <div className="testimonials__inner">
          <div className="testimonials__header">
            {eyebrow ? <p className="eyebrow eyebrow--center testimonials__eyebrow">{eyebrow}</p> : null}
            {heading ? <h2 className="testimonials__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
          </div>
          <animate-on-scroll className="testimonials__body" {...(reveal !== 'none' ? { 'data-animate': reveal } : {})}>
            <div className="testimonials__avatars" data-count={String(count)} aria-hidden="true">
              {reviews.map((r, i) => (
                <button
                  type="button"
                  key={i}
                  className={`testimonials__avatar${i === 0 ? ' is-active' : ''}`}
                  data-slot={String(i === count - 1 && count > 1 ? 2 : RING_SLOTS[i] ?? i)}
                  data-review-index={String(i)}
                  tabIndex={-1}
                >
                  {r.avatar ? (
                    <img
                      src={r.avatar}
                      alt=""
                      width={368}
                      height={368}
                      loading={first ? 'eager' : 'lazy'}
                      sizes="(min-width: 1200px) 184px, (min-width: 750px) 140px, 15vw"
                    />
                  ) : (
                    <span className="testimonials__initial">{(r.name || '?').slice(0, 1)}</span>
                  )}
                </button>
              ))}
            </div>
            {count > 1 ? (
              <div className="testimonials__timeline">
                <ol className="testimonials__dots" role="list">
                  {reviews.map((r, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        className="testimonials__dot"
                        data-review-index={String(i)}
                        aria-label={
                          r.name ? `Show review ${i + 1} of ${count}: ${r.name}` : `Show review ${i + 1} of ${count}`
                        }
                        {...(i === 0 ? { 'aria-current': true } : {})}
                      ></button>
                    </li>
                  ))}
                </ol>
                {autoplay > 0 ? (
                  <button type="button" className="testimonials__pause" aria-pressed="false">
                    <span className="visually-hidden">Pause reviews</span>
                    <svg
                      className="testimonials__pause-icon testimonials__pause-icon--pause"
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 16 16"
                    >
                      <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
                      <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
                    </svg>
                    <svg
                      className="testimonials__pause-icon testimonials__pause-icon--play"
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
              </div>
            ) : null}
            <div className="testimonials__cards-area">
              <span className="testimonials__quote" aria-hidden="true">
                <Icon name="quote-open" />
              </span>
              <div className="testimonials__viewport">
                <ul className="testimonials__cards" role="list">
                  {reviews.map((r, i) => (
                    <li className={`testimonials__card${i === 0 ? ' is-active' : ''}`} data-review-card="" key={i}>
                      <CardInner r={r} />
                    </li>
                  ))}
                  {count > 1 ? (
                    <li className="testimonials__card testimonials__card--clone" aria-hidden="true" inert>
                      <CardInner r={reviews[0]} />
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
            <span className="testimonials__quote testimonials__quote--end" aria-hidden="true">
              <Icon name="quote-close" />
            </span>
          </animate-on-scroll>
        </div>
      </testimonial-showcase>
    </div>
  );
}
