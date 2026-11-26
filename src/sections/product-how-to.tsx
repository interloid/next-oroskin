/**
 * Step guide: numbered steps on a timeline beside a media panel that shows each step's photo; autoplay with a
 * pause button (theme: sections/product-how-to.liquid, <product-how-to> in theme.js). A Product tabs panel.
 */
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductHowToProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  steps?: {
    title?: string;
    text?: string;
    image?: { src: string; alt?: string; width: number; height: number };
    caption?: string;
  }[];
  autoplay?: boolean;
  /** Seconds per step */
  seconds?: number;
}

function fill(n: number) {
  if (n <= 1) return '100';
  const v = Math.round((100 / n) * 100) / 100;
  return Number.isInteger(v) ? v.toFixed(1) : String(v);
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function ProductHowTo({
  id,
  context,
  anchor = 'how-to-use',
  eyebrow,
  heading,
  steps = [],
  autoplay: autoplaySetting = true,
  seconds = 5,
  ...common
}: ProductHowToProps & { id: string; context?: PageContext }) {
  const list = steps.filter((s) => s.title || s.text || s.image || s.caption);
  const hasIntro = Boolean(eyebrow || heading);
  if (!hasIntro && !list.length) return null;
  const hasMedia = list.some((s) => s.image);
  const autoplay = autoplaySetting && list.length > 1;
  const eager = context?.index === 0;
  const sizes =
    common.width === 'wide'
      ? '(min-width: 1200px) min(37vw, 661px), 40vw'
      : common.width === 'full'
        ? '(min-width: 1200px) 39vw, 40vw'
        : '(min-width: 1200px) 37vw, 40vw';

  const controls = (
    <div className="product-how-to__controls">
      {autoplay ? (
        <button type="button" className="product-how-to__pause" aria-pressed="false" data-step-pause="">
          <span className="visually-hidden">Pause steps</span>
          <svg
            className="product-how-to__pause-icon product-how-to__pause-icon--pause"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 16 16"
          >
            <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
            <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
          </svg>
          <svg
            className="product-how-to__pause-icon product-how-to__pause-icon--play"
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
      <span className="product-how-to__progress" aria-hidden="true">
        <span data-step-progress=""></span>
      </span>
    </div>
  );

  return (
    <section id={`section-${id}`} className="shopify-section">
      <product-how-to
        id={anchor}
        className={`product-how-to full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${hasMedia ? '' : ' product-how-to--no-media'}${hasIntro ? '' : ' product-how-to--no-intro'}`}
        style={sectionStyle(
          { paddingTop: 64, paddingBottom: 64, ...common },
          { '--step-duration': `${seconds}s`, '--step-fill': `${fill(list.length)}%` }
        )}
        {...(autoplay ? { 'data-autoplay': '' } : {})}
      >
        <div className="product-how-to__inner">
          {hasIntro ? (
            <div className="product-how-to__intro" data-tab-item="">
              {eyebrow ? <p className="eyebrow product-how-to__eyebrow">{eyebrow}</p> : null}
              {heading ? <h2 className="product-how-to__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
            </div>
          ) : null}

          {list.length ? (
            <div className="product-how-to__timeline" data-tab-item="">
              <ol className="product-how-to__steps" role="list">
                {list.map((s, i) => {
                  const textId = `StepText-s${i + 1}`;
                  return (
                    <li className={`product-how-to__step${i === 0 ? ' is-active' : ''}`} key={i}>
                      <button
                        type="button"
                        className="product-how-to__step-button"
                        {...(s.text ? { 'aria-expanded': i === 0, 'aria-controls': textId } : {})}
                        data-step={i}
                      >
                        <span className="product-how-to__dot" aria-hidden="true"></span>
                        <span className="product-how-to__number">{pad(i + 1)}</span>
                        <span className="product-how-to__title">
                          {s.title ? s.title : <span className="visually-hidden">Step {i + 1}</span>}
                        </span>
                      </button>
                      {s.text ? (
                        <p className="product-how-to__text" id={textId}>
                          {s.text}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
              {hasMedia ? null : controls}
            </div>
          ) : null}

          {hasMedia ? (
            <div className="product-how-to__media" data-tab-item="">
              {list.map((s, i) => (
                <figure
                  className={`product-how-to__slide${i === 0 ? ' is-active' : ''}`}
                  data-slide={i}
                  {...(i > 0 ? { 'aria-hidden': true } : {})}
                  key={i}
                >
                  {s.image ? (
                    <img
                      src={s.image.src}
                      alt={s.image.alt ?? ''}
                      width={s.image.width}
                      height={s.image.height}
                      loading={eager ? 'eager' : 'lazy'}
                      sizes={sizes}
                      className="product-how-to__image"
                    />
                  ) : null}
                  {s.caption ? <figcaption className="product-how-to__caption">{s.caption}</figcaption> : null}
                </figure>
              ))}
              <p className="product-how-to__counter" aria-hidden="true">
                <span data-step-current="">01</span>{`/${pad(list.length)}`}
              </p>
              {controls}
            </div>
          ) : null}
        </div>
      </product-how-to>
    </section>
  );
}
