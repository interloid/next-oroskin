/**
 * Blog hero (theme: sections/blog-hero.liquid + blocks/_blog-stat-card.liquid): breadcrumb, eyebrow, H1,
 * intro text and counters (articles / authors / topics, counted from the blog unless given) on the left;
 * floating stat cards with faded outlines on the right (<motion-pause> pauses the float).
 * The same on every blog page (page 2, topic pages).
 */
import { BLOG_TITLE, Breadcrumb, blogTags } from '@/components/ArticleParts';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { api } from '@/lib/api';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface BlogHeroProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent words. Empty = the blog's title
  text?: string; // HTML
  showBreadcrumb?: boolean;
  fillScreen?: boolean;
  scaleWithScreen?: boolean;
  textScale?: number; // %
  floatCards?: boolean;
  /** Counter labels; a value overrides the number counted from the blog, 0 hides the counter. */
  counters?: { articlesLabel?: string; articles?: number | string; authorsLabel?: string; authors?: number | string; topicsLabel?: string; topics?: number | string };
  cards?: {
    value?: string;
    icon?: string; // icon name from public/assets/icon-<name>.svg: eye, heart, pencil, award, ...
    text?: string;
  }[];
}

export default async function BlogHero({
  id,
  eyebrow,
  heading,
  text,
  showBreadcrumb = true,
  fillScreen = true,
  scaleWithScreen = true,
  textScale = 110,
  floatCards = true,
  counters = {},
  cards = [],
  ...common
}: BlogHeroProps & { id: string; context?: PageContext }) {
  const articles = await api.articles();
  const list = [
    { label: counters.articlesLabel ?? 'Articles', value: counters.articles ?? articles.length },
    { label: counters.authorsLabel ?? 'Authors', value: counters.authors ?? new Set(articles.map((a) => a.author)).size },
    { label: counters.topicsLabel ?? 'Topics', value: counters.topics ?? blogTags(articles).length },
  ].filter((c) => c.value !== '' && c.value !== 0 && c.value != null);
  const shownCards = cards.filter((c) => c.value || c.text);

  const classes = [
    'blog-hero full-width',
    `section-width--${common.width ?? 'widest'}`,
    fillScreen ? 'section--fill-screen' : '',
    scaleWithScreen ? 'section--screen-scale' : '',
    floatCards ? 'blog-hero--float' : '',
    `color-${common.colorScheme ?? 'scheme-2'}`,
  ].filter(Boolean);

  return (
    <section id={`section-${id}`} className="shopify-section">
      <div
        className={classes.join(' ')}
        style={sectionStyle(
          { paddingTop: 40, paddingBottom: 64, ...common },
          { '--text-boost': (textScale / 100).toFixed(1), '--counters': String(Math.max(1, list.length)) },
        )}
      >
        <animate-on-scroll className="blog-hero__inner">
          {showBreadcrumb ? <Breadcrumb current={BLOG_TITLE} className="blog-hero__breadcrumb" /> : null}
          <div className={`blog-hero__grid${shownCards.length ? ' blog-hero__grid--split' : ''}`}>
            <div className="blog-hero__intro">
              {eyebrow ? <p className="eyebrow blog-hero__eyebrow">{eyebrow}</p> : null}
              <h1 className="blog-hero__heading" dangerouslySetInnerHTML={{ __html: heading || BLOG_TITLE }} />
              {text ? <div className="blog-hero__text rte" dangerouslySetInnerHTML={{ __html: text }} /> : null}
              {list.length ? (
                <dl className="blog-hero__counters">
                  {list.map((c) => (
                    <div className="blog-hero__counter" key={c.label}>
                      <dt>{c.label}</dt> <dd>{c.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
            {shownCards.length ? (
              <div className="blog-hero__collage">
                {(['book', 'award', 'heart'] as const).map((d) => (
                  <span className={`blog-hero__deco blog-hero__deco--${d}`} aria-hidden="true" key={d}>
                    <Icon file={`deco-${d}.svg`} />
                  </span>
                ))}
                <div className="blog-hero__cards">
                  {shownCards.map((c, i) => (
                    <div className="blog-stat-card" key={i}>
                      {c.value ? <p className="blog-stat-card__value">{c.value}</p> : null}
                      {c.icon ? (
                        <span className="blog-stat-card__icon" aria-hidden="true">
                          <Icon name={c.icon} />
                        </span>
                      ) : null}
                      {c.text ? <p className="blog-stat-card__text">{c.text}</p> : null}
                    </div>
                  ))}
                </div>
                <motion-pause className="motion-pause blog-hero__pause" data-target=".blog-hero__collage">
                  <button type="button" className="motion-pause__button" aria-pressed="false" hidden>
                    <span className="visually-hidden">Pause the floating cards</span>
                    <svg className="motion-pause__icon motion-pause__icon--pause" aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
                      <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
                      <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
                    </svg>
                    <svg className="motion-pause__icon motion-pause__icon--play" aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="16" height="16">
                      <path d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z" fill="currentColor"></path>
                    </svg>
                  </button>
                </motion-pause>
              </div>
            ) : null}
          </div>
        </animate-on-scroll>
      </div>
    </section>
  );
}
