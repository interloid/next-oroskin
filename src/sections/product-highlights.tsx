/**
 * Product highlights: intro (eyebrow, heading, text) beside a grid of benefits (line icon, title, text) and a
 * spec table that fills column by column (theme: sections/product-highlights.liquid). A Product tabs panel.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductHighlightsProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  text?: string; // HTML
  benefits?: {
    icon?: string; // public/assets/icon-<name>.svg: drop, flask, sparkles, hours, leaf, shield-check
    title?: string;
    text?: string;
  }[];
  specs?: { label: string; value: string }[];
  animation?: 'none' | 'fade-up' | 'slide-bottom' | 'zoom-in';
}

export default function ProductHighlights({
  id,
  context,
  anchor = 'highlights',
  eyebrow,
  heading,
  text,
  benefits = [],
  specs = [],
  animation = 'fade-up',
  ...common
}: ProductHighlightsProps & { id: string; context?: PageContext }) {
  const items = benefits.filter((b) => b.icon || b.title || b.text);
  const rows = specs.filter((s) => s.label && s.value);
  const hasIntro = Boolean(eyebrow || heading || text);
  const showGrid = items.length > 0;
  const hasMain = showGrid || rows.length > 0;
  if (!hasIntro && !hasMain) return null;
  const anim = context?.index === 0 ? 'none' : animation;
  const hiddenHeading = eyebrow || 'Product highlights';

  return (
    <section id={`section-${id}`} className="shopify-section">
      <div
        id={anchor}
        className={`product-highlights full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 64, paddingBottom: 64, ...common })}
      >
        <div className={`product-highlights__inner${hasIntro && hasMain ? ' product-highlights__inner--split' : ''}`}>
          {hasIntro ? (
            <div className="product-highlights__intro" data-tab-item="">
              {eyebrow ? <p className="eyebrow product-highlights__eyebrow">{eyebrow}</p> : null}
              {heading ? (
                <h2 className="product-highlights__heading" dangerouslySetInnerHTML={{ __html: heading }} />
              ) : showGrid ? (
                <h2 className="visually-hidden">{hiddenHeading}</h2>
              ) : null}
              {text ? <div className="product-highlights__text rte" dangerouslySetInnerHTML={{ __html: text }} /> : null}
            </div>
          ) : showGrid ? (
            <h2 className="visually-hidden">{hiddenHeading}</h2>
          ) : null}

          {hasMain ? (
            <div className="product-highlights__main">
              {showGrid ? (
                <animate-on-scroll>
                  <ul className="product-highlights__grid" role="list" data-tab-item="">
                    {items.map((b, i) => (
                      <li
                        className="product-highlights__item"
                        {...(anim !== 'none' ? { 'data-animate': anim } : {})}
                        key={i}
                      >
                        {b.icon ? (
                          <span className="product-highlights__icon" aria-hidden="true">
                            <Icon name={b.icon} />
                          </span>
                        ) : null}
                        {b.title ? <h3 className="product-highlights__title">{b.title}</h3> : null}
                        {b.text ? <p className="product-highlights__item-text">{b.text}</p> : null}
                      </li>
                    ))}
                  </ul>
                </animate-on-scroll>
              ) : null}
              {rows.length ? (
                <dl
                  className="product-highlights__specs"
                  style={{ '--spec-rows': String(Math.ceil(rows.length / 2)) } as React.CSSProperties}
                  data-tab-item=""
                >
                  {rows.map((s, i) => (
                    <div className="product-highlights__spec" key={i}>
                      <dt>{s.label}</dt> <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
