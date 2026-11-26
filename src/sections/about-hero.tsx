/**
 * About hero (theme: sections/about-hero.liquid + blocks/_discipline.liquid): breadcrumb, a small italic line,
 * the H1 on two lines (line 2 rotates between versions in <about-hero-rotator>, theme JS), intro, button and
 * text link; right: the "three disciplines" card (one <details> per row, one open at a time).
 * Heading HTML: <em> = accent italic, <strong> = the brush underline.
 */
import Icon from '@/components/Icon';
import { aboutScreenClasses, aboutScreenVars, Breadcrumb, PauseIcons, type AboutImage, type AboutScreenOptions } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface AboutDiscipline {
  title: string;
  count?: string; // "6 formulas"
  image?: AboutImage;
  text?: string; // HTML
  link?: string; // collection URL
  linkLabel?: string; // default "Shop"
  open?: boolean;
}

export interface AboutHeroProps extends SectionCommon, AboutScreenOptions {
  showBreadcrumb?: boolean;
  pageTitle?: string;
  scriptText?: string;
  headingLine1?: string; // HTML
  /** Line 2 and its alternatives (HTML); 2+ = they rotate. */
  headingLine2?: string[];
  rotateInterval?: number; // seconds
  headingScale?: number; // %
  text?: string; // HTML
  buttonLabel?: string;
  buttonLink?: string;
  linkLabel?: string;
  linkUrl?: string;
  cardLabel?: string;
  disciplines?: AboutDiscipline[];
}

export default function AboutHero({
  id,
  context,
  showBreadcrumb = true,
  pageTitle = 'About us',
  scriptText,
  headingLine1,
  headingLine2 = [],
  rotateInterval = 3,
  headingScale = 100,
  text,
  buttonLabel,
  buttonLink,
  linkLabel,
  linkUrl,
  cardLabel,
  disciplines = [],
  ...common
}: AboutHeroProps & { id: string; context?: PageContext }) {
  const phrases = headingLine2.filter(Boolean);
  const rows = disciplines.filter((d) => d.title || d.count || d.image || d.text);
  const showCard = rows.length > 0;
  const cardId = `AboutDisciplines-${id}`;
  const eager = (context?.index ?? 0) < 3;

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`about-hero full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${aboutScreenClasses(common, true)}`}
        style={sectionStyle(
          { paddingTop: 24, paddingBottom: 48, ...common },
          {
            ...aboutScreenVars(common),
            '--brush-underline': "url('/cdn/shop/t/8/assets/brush-underline.svg')",
            '--heading-scale': String(headingScale / 100),
          },
        )}
      >
        <div className="about-hero__inner">
          {showBreadcrumb ? <Breadcrumb current={pageTitle} className="about-hero__breadcrumb" /> : null}
          <div className={`about-hero__grid${showCard ? ' about-hero__grid--split' : ''}`}>
            <div className="about-hero__story">
              <div className="about-hero__lettering">
                {scriptText ? <p className="about-hero__script">{scriptText}</p> : null}
                <h1 className="about-hero__heading">
                  {headingLine1 ? (
                    <span className="about-hero__line" dangerouslySetInnerHTML={{ __html: headingLine1 }} />
                  ) : null}
                  {phrases.length === 1 ? (
                    <span className="about-hero__line about-hero__line--indent" dangerouslySetInnerHTML={{ __html: phrases[0] }} />
                  ) : phrases.length > 1 ? (
                    <span className="about-hero__line about-hero__line--indent">
                      <about-hero-rotator className="about-hero__rotator" data-interval={rotateInterval}>
                        {phrases.map((p, i) => (
                          <span
                            key={i}
                            className={`about-hero__phrase${i === 0 ? ' is-active' : ''}`}
                            aria-hidden={i === 0 ? undefined : 'true'}
                            dangerouslySetInnerHTML={{ __html: p }}
                          />
                        ))}
                        <span className="about-hero__brush-holder" aria-hidden="true" dangerouslySetInnerHTML={{ __html: phrases[0] }} />
                        <span className="about-hero__brush" aria-hidden="true"></span>
                      </about-hero-rotator>
                    </span>
                  ) : null}
                  {!headingLine1 && !phrases.length ? pageTitle : null}
                </h1>
                {phrases.length > 1 ? (
                  <button type="button" className="about-hero__pause" aria-pressed="false" hidden>
                    <span className="visually-hidden">Pause the changing heading</span>
                    <PauseIcons prefix="about-hero__pause-icon" />
                  </button>
                ) : null}
              </div>
              {text ? <div className="about-hero__text" dangerouslySetInnerHTML={{ __html: text }} /> : null}
              {(buttonLabel && buttonLink) || (linkLabel && linkUrl) ? (
                <div className="about-hero__actions">
                  {buttonLabel && buttonLink ? (
                    <a className="button about-hero__button" href={buttonLink}>
                      {buttonLabel}
                    </a>
                  ) : null}
                  {linkLabel && linkUrl ? (
                    <a className="about-hero__link" href={linkUrl}>
                      {linkLabel}
                      <span className="about-hero__link-arrow" aria-hidden="true">
                        <Icon name="arrow" />
                      </span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
            {showCard ? (
              <div className="about-hero__card" {...(cardLabel ? { role: 'group', 'aria-labelledby': cardId } : {})}>
                {cardLabel ? (
                  <h2 className="about-hero__card-label" id={cardId}>
                    {cardLabel}
                  </h2>
                ) : null}
                <div className="about-hero__disciplines">
                  {rows.map((d, i) => (
                    <details className="discipline" name={`about-disciplines-${id}`} open={d.open || undefined} key={i}>
                      <summary className="discipline__summary">
                        <span className="discipline__number" aria-hidden="true"></span>
                        <span className="discipline__title">{d.title || '—'}</span>
                        {d.count ? <span className="discipline__count">{d.count}</span> : null}
                      </summary>
                      <div className={`discipline__panel${d.image ? '' : ' discipline__panel--no-media'}`}>
                        {d.image ? (
                          <div className="discipline__media">
                            <img
                              src={d.image.src}
                              alt=""
                              width={d.image.width}
                              height={d.image.height}
                              loading={d.open && eager ? 'eager' : 'lazy'}
                              sizes="(min-width: 1200px) 16vw, (min-width: 750px) 32vw, 40vw"
                            />
                          </div>
                        ) : null}
                        <div className="discipline__body">
                          {d.text ? <div className="discipline__text" dangerouslySetInnerHTML={{ __html: d.text }} /> : null}
                          {d.link ? (
                            <a className="discipline__link" href={d.link}>
                              {d.linkLabel ?? 'Shop'}
                              <span className="visually-hidden"> {d.title}</span>
                              <span className="discipline__link-arrow" aria-hidden="true">
                                <Icon name="arrow" />
                              </span>
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
