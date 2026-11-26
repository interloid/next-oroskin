/**
 * Product overview: intro + text with a spec list + an image with hotspots, then a quote and key figures
 * (theme: sections/product-overview.liquid). A panel of the Product tabs (`anchor` = the tab's target).
 */
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductOverviewProps extends SectionCommon {
  /** Link name the Product tabs bar points to */
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  text?: string; // HTML
  specs?: { label: string; value: string }[];
  image?: { src: string; alt?: string; width: number; height: number };
  /** x / y = % from the image's left / top edge */
  hotspots?: { x: number; y: number; title?: string; text?: string }[];
  quote?: string; // inline HTML
  figures?: { label: string; value: string }[];
}

export default function ProductOverview({
  id,
  context,
  anchor = 'overview',
  eyebrow,
  heading,
  text,
  specs = [],
  image,
  hotspots = [],
  quote,
  figures = [],
  ...common
}: ProductOverviewProps & { id: string; context?: PageContext }) {
  const hasIntro = Boolean(eyebrow || heading);
  const hasBody = Boolean(text || specs.length);
  const hasMedia = Boolean(image);
  const hasBottom = Boolean(quote || figures.length);
  if (!hasIntro && !hasBody && !hasMedia && !hasBottom) return null;

  const columns = [hasIntro && 'minmax(0, 680fr)', hasBody && 'minmax(0, 528fr)', hasMedia && 'minmax(0, 611fr)']
    .filter(Boolean)
    .join(' ');
  const textParts = Math.max(1, Number(hasIntro) + Number(hasBody));
  const frTotal = 611 + (hasIntro ? 680 : 0) + (hasBody ? 528 : 0);
  const mediaVw = Math.floor((92 * 611) / frTotal) + 1;
  const eager = context?.index === 0;
  const spots = hotspots.filter((h) => h.title || h.text);

  return (
    <section id={`section-${id}`} className="shopify-section">
      <product-overview
        id={anchor}
        className={`product-overview full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 64, paddingBottom: 64, ...common })}
      >
        <div className="product-overview__inner">
          {hasIntro || hasBody || hasMedia ? (
            <div
              className="product-overview__top"
              style={
                {
                  '--top-columns': columns,
                  '--top-columns-tablet': `repeat(${textParts}, minmax(0, 1fr))`,
                } as React.CSSProperties
              }
            >
              {hasIntro ? (
                <div className="product-overview__intro" data-tab-item="">
                  {eyebrow ? <p className="eyebrow product-overview__eyebrow">{eyebrow}</p> : null}
                  {heading ? (
                    <h2 className="product-overview__heading" dangerouslySetInnerHTML={{ __html: heading }} />
                  ) : null}
                </div>
              ) : null}
              {hasBody ? (
                <div className="product-overview__body" data-tab-item="">
                  {text ? <div className="product-overview__text rte" dangerouslySetInnerHTML={{ __html: text }} /> : null}
                  {specs.length ? (
                    <dl className="product-overview__specs">
                      {specs.map((s, i) => (
                        <div className="product-overview__spec" key={i}>
                          <dt>{s.label}</dt> <dd>{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </div>
              ) : null}
              {image ? (
                <div className="product-overview__media" data-tab-item="">
                  <img
                    src={image.src}
                    alt={image.alt ?? ''}
                    width={image.width}
                    height={image.height}
                    loading={eager ? 'eager' : 'lazy'}
                    {...(eager ? { fetchPriority: 'high' as const } : {})}
                    sizes={`(min-width: 1200px) ${mediaVw}vw, 94vw`}
                    className="product-overview__image"
                  />
                  {spots.map((h, i) => {
                    const spotId = `Hotspot-h${i + 1}`;
                    return (
                      <div
                        key={i}
                        className={`product-overview__hotspot product-overview__hotspot--${h.x > 50 ? 'left' : 'right'}`}
                        style={{ '--spot-x': `${h.x}%`, '--spot-y': `${h.y}%` } as React.CSSProperties}
                      >
                        <button
                          type="button"
                          className="product-overview__dot"
                          aria-expanded="false"
                          aria-controls={spotId}
                          data-hotspot=""
                        >
                          <span className="visually-hidden">{h.title || h.text}</span>
                        </button>
                        <div className="product-overview__card" id={spotId}>
                          {h.title ? <p className="product-overview__card-title">{h.title}</p> : null}
                          {h.text ? <p className="product-overview__card-text">{h.text}</p> : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          ) : null}
          {hasBottom ? (
            <animate-on-scroll className="product-overview__bottom">
              {quote ? (
                <blockquote className="product-overview__quote" data-animate="fade-up" data-tab-item="">
                  <p dangerouslySetInnerHTML={{ __html: quote }} />
                </blockquote>
              ) : null}
              {figures.length ? (
                <dl className="product-overview__figures" data-tab-item="">
                  {figures.map((f, i) => (
                    <div className="product-overview__figure" key={i}>
                      <dt className="product-overview__figure-label">{f.label}</dt>
                      <dd className="product-overview__figure-value">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </animate-on-scroll>
          ) : null}
        </div>
      </product-overview>
    </section>
  );
}
