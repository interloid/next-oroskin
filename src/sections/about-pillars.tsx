/**
 * About pillars (theme: sections/about-pillars.liquid + blocks/_pillar.liquid): Mission / Vision / Promise slides
 * with a progress bar, pinned while the page scrolls (<about-pillars>, theme JS), next to two drifting photo columns.
 */
import Icon from '@/components/Icon';
import { aboutScreenVars, type AboutImage, type AboutScreenOptions } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import type { SectionCommon } from '@/sections/shared';

export interface AboutPillar {
  label?: string;
  heading?: string;
  text?: string; // HTML
  checklist?: string[];
}

export interface AboutPillarsProps extends Pick<SectionCommon, 'colorScheme' | 'width'>, AboutScreenOptions {
  /** Photos drift in two columns (odd photos left, even right); up to 8. */
  photos?: AboutImage[];
  drift?: boolean;
  pillars: AboutPillar[];
}

const pad = (n: number) => (n < 10 ? `0${n}` : String(n));

export default function AboutPillars({
  id,
  context,
  photos = [],
  drift = true,
  pillars,
  ...common
}: AboutPillarsProps & { id: string; context?: PageContext }) {
  const slides = (pillars ?? []).filter((p) => p.label || p.heading || p.text || p.checklist?.length);
  if (!slides.length) return null;
  const width = common.width ?? 'widest';
  const desktopSize =
    width === 'full' ? '21vw' : width === 'wide' ? 'min(20vw, 370px)' : width === 'narrow' ? 'min(20vw, 245px)' : '20vw';
  const loading = (context?.index ?? 0) === 0 ? 'eager' : 'lazy';
  const shown = photos.slice(0, 8);

  return (
    <div id={`section-${id}`} className="shopify-section">
      <about-pillars
        className={`about-pillars full-width section-width--${width} color-${common.colorScheme ?? 'scheme-2'}${(common.scaleScreen ?? true) ? ' section--screen-scale' : ''}`}
        style={{ '--slides': String(slides.length), ...aboutScreenVars(common) } as React.CSSProperties}
        data-drift={drift ? '' : undefined}
      >
        <div className="about-pillars__panel">
          <div className={`about-pillars__inner${shown.length ? ' about-pillars__inner--photos' : ''}`}>
            <div className="about-pillars__story">
              {slides.length > 1 ? (
                <div className="about-pillars__progress" aria-hidden="true">
                  {slides.map((_, i) => (
                    <span className={`about-pillars__bar${i === 0 ? ' is-active' : ''}`} key={i}></span>
                  ))}
                  <span className="about-pillars__count">
                    <span className="about-pillars__count-current">01</span> / {pad(slides.length)}
                  </span>
                </div>
              ) : null}
              <div className="about-pillars__slides">
                {slides.map((p, i) => (
                  <div className="pillar" data-pillar="" key={i}>
                    {p.label ? (
                      <p className="pillar__label">
                        <span className="pillar__label-text">{p.label}</span>
                      </p>
                    ) : null}
                    {p.heading ? <h2 className="pillar__heading">{p.heading}</h2> : null}
                    {p.text ? <div className="pillar__text" dangerouslySetInnerHTML={{ __html: p.text }} /> : null}
                    {p.checklist?.length ? (
                      <ul className="pillar__checklist">
                        {p.checklist.map((point, j) => (
                          <li className="pillar__point" key={j}>
                            <span className="pillar__check" aria-hidden="true">
                              <Icon name="check" />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            {shown.length ? (
              <div className="about-pillars__photos" aria-hidden="true">
                {[1, 2].map((column) => (
                  <div className={`about-pillars__column about-pillars__column--${column}`} key={column}>
                    {shown
                      .filter((_, i) => (i % 2 === 0 ? 1 : 2) === column)
                      .map((photo, i) => (
                        <div className="image about-pillars__photo" key={i}>
                          <img
                            src={photo.src}
                            alt=""
                            width={photo.width}
                            height={photo.height}
                            loading={loading}
                            sizes={`(min-width: 990px) ${desktopSize}, ${Math.ceil((photo.width / photo.height) * 116)}px`}
                            fetchPriority="auto"
                          />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </about-pillars>
    </div>
  );
}
