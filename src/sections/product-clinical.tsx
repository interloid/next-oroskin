/**
 * Before and after: a drag-to-compare photo pair, result rings (first 4 results) and the result list
 * (theme: sections/product-clinical.liquid, <product-clinical> in theme.js). A Product tabs panel.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

type Img = { src: string; alt?: string; width: number; height: number };

export interface ProductClinicalProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  before?: Img;
  after?: Img;
  beforeLabel?: string;
  afterLabel?: string;
  /** Where the line starts, % from the left */
  start?: number;
  /** Text in the middle of the rings, under the first result's value */
  ringLabel?: string;
  /** value = percent (0–100). The first 4 also draw a ring. */
  results?: { label: string; value: number }[];
}

export default function ProductClinical({
  id,
  context,
  anchor = 'clinical-results',
  eyebrow,
  heading,
  before,
  after,
  beforeLabel,
  afterLabel,
  start = 50,
  ringLabel,
  results = [],
  ...common
}: ProductClinicalProps & { id: string; context?: PageContext }) {
  const list = results.filter((r) => r.label);
  const hasIntro = Boolean(eyebrow || heading);
  const hasCompare = Boolean(before && after);
  if (!hasIntro && !hasCompare && !list.length) return null;
  const width = common.width ?? 'widest';
  const sizes = !list.length
    ? 'min(94vw, 768px)'
    : width === 'wide'
      ? '(min-width: 1200px) min(43vw, 764px), 94vw'
      : width === 'full'
        ? '(min-width: 1200px) 45vw, 94vw'
        : '(min-width: 1200px) 43vw, 94vw';
  const compareLabel = beforeLabel && afterLabel ? `Compare ${beforeLabel} and ${afterLabel}` : 'Compare the before and after images';
  const valueTemplate = '[percent]% of the before image shows';
  const loading = context?.index === 0 ? 'eager' : 'lazy';
  const rings = list.slice(0, 4);

  const photo = (img: Img, fallbackAlt?: string) => (
    <img
      src={img.src}
      alt={img.alt || fallbackAlt || ''}
      width={img.width}
      height={img.height}
      loading={loading}
      sizes={sizes}
      className="product-clinical__image"
    />
  );

  return (
    <section id={`section-${id}`} className="shopify-section">
      <product-clinical
        id={anchor}
        className={`product-clinical full-width section-width--${width} color-${common.colorScheme ?? 'scheme-2'}${hasCompare ? '' : ' product-clinical--no-compare'}${list.length ? '' : ' product-clinical--no-results'}`}
        style={sectionStyle({ paddingTop: 64, paddingBottom: 64, ...common })}
      >
        <div className="product-clinical__inner">
          {hasIntro ? (
            <div className="product-clinical__intro" data-tab-item="">
              {eyebrow ? <p className="eyebrow product-clinical__eyebrow">{eyebrow}</p> : null}
              {heading ? <h2 className="product-clinical__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
            </div>
          ) : null}
          {hasCompare || list.length ? (
            <div className="product-clinical__layout">
              {before && after ? (
                <div
                  className="product-clinical__compare"
                  style={{ '--pos': `${start}%` } as React.CSSProperties}
                  data-compare=""
                  data-tab-item=""
                >
                  <div className="product-clinical__frame">{photo(before, beforeLabel)}</div>
                  <div className="product-clinical__frame product-clinical__frame--after">{photo(after, afterLabel)}</div>
                  {beforeLabel ? (
                    <span className="product-clinical__tag product-clinical__tag--before" aria-hidden="true">
                      {beforeLabel}
                    </span>
                  ) : null}
                  {afterLabel ? (
                    <span className="product-clinical__tag product-clinical__tag--after" aria-hidden="true">
                      {afterLabel}
                    </span>
                  ) : null}
                  <span className="product-clinical__line" aria-hidden="true">
                    <span className="product-clinical__handle">
                      <span className="product-clinical__handle-icon">
                        <Icon name="arrow" />
                      </span>
                      <span className="product-clinical__handle-icon product-clinical__handle-icon--right">
                        <Icon name="arrow" />
                      </span>
                    </span>
                  </span>
                  <input
                    id={`CompareRange-${id}`}
                    className="product-clinical__range"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    defaultValue={start}
                    aria-label={compareLabel}
                    aria-valuetext={valueTemplate.replace('[percent]', String(start))}
                    data-valuetext={valueTemplate}
                    data-compare-range=""
                  />
                </div>
              ) : null}

              {rings.length ? (
                <div className="product-clinical__rings" data-tab-item="" aria-hidden="true">
                  <svg className="product-clinical__svg" viewBox="0 0 100 100" focusable="false">
                    {rings.map((r, n) => {
                      const radius = Math.abs(n * 7.5 - 47).toFixed(1);
                      return [
                        <circle key={`t${n}`} className="product-clinical__track" cx="50" cy="50" r={radius} pathLength="100"></circle>,
                        <circle
                          key={`a${n}`}
                          className={`product-clinical__arc${n === 0 ? ' product-clinical__arc--lead' : ''}`}
                          cx="50"
                          cy="50"
                          r={radius}
                          pathLength="100"
                          style={{ '--value': String(r.value), '--ring': String(n) } as React.CSSProperties}
                        ></circle>,
                      ];
                    })}
                  </svg>
                  <p className="product-clinical__centre">
                    <span className="product-clinical__centre-value">{`${rings[0].value}%`}</span>
                    {ringLabel ? <span className="product-clinical__centre-label">{ringLabel}</span> : null}
                  </p>
                </div>
              ) : null}

              {list.length ? (
                <dl className="product-clinical__results" data-tab-item="">
                  {list.map((r, i) => (
                    <div className={`product-clinical__result${i === 0 ? ' product-clinical__result--lead' : ''}`} key={i}>
                      <dt>
                        {r.label}
                        {i === 0 && ringLabel ? <span className="visually-hidden">{` (${ringLabel})`}</span> : null}
                      </dt>
                      <dd>{`${r.value}%`}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          ) : null}
        </div>
      </product-clinical>
    </section>
  );
}
