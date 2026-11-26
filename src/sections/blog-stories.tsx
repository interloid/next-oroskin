/**
 * Blog stories (theme: sections/blog-stories.liquid + snippets/story-card.liquid): an eyebrow, a heading
 * and a "View journal" link above story cards. 4 stories = the Figma mosaic (featured, two small, a tall
 * one); fewer = equal columns; more than 4 or any card with its own shape = the free 12-column grid.
 * Stories are blog articles: pick them by handle, or leave `stories` empty for the 4 newest.
 */
import { liquidFloat } from '@/components/ContentBlocks';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { api } from '@/lib/api';
import type { Article } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

type ZoomPoint = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';

export interface BlogStoriesProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML (<em> = italic accent words)
  linkLabel?: string;
  link?: string;
  highlightColor?: string;
  layout?: 'featured-left' | 'featured-right';
  animation?: 'none' | 'fade-up' | 'slide-bottom' | 'zoom-in';
  /** One entry per place. `article` = handle; empty = the next newest article not picked elsewhere. */
  stories?: {
    article?: string;
    image?: string; // replaces the article's image
    category?: string; // replaces the article's first tag
    pill?: string; // e.g. "Featured story" (shows on the featured card)
    size?: 'auto' | 'featured' | 'landscape' | 'small' | 'portrait';
    zoom?: number; // hover zoom in %, default 112
    zoomPoint?: ZoomPoint;
  }[];
}

const POINTS: Record<ZoomPoint, [number, number]> = {
  'top-left': [15, 15],
  top: [50, 15],
  'top-right': [85, 15],
  left: [15, 50],
  center: [50, 50],
  right: [85, 50],
  'bottom-left': [15, 85],
  bottom: [50, 85],
  'bottom-right': [85, 85],
};

/** Liquid's truncatewords: the first n words, then "..." when the text was longer. */
function truncateWords(text: string, n: number) {
  const words = text.trim().split(/\s+/);
  return words.length > n ? words.slice(0, n).join(' ') + '...' : text.trim();
}

export default async function BlogStories({
  id,
  eyebrow,
  heading,
  linkLabel = 'View journal',
  link = '/blogs/featured',
  highlightColor,
  layout = 'featured-left',
  animation = 'slide-bottom',
  stories,
  context,
  ...common
}: BlogStoriesProps & { id: string; context?: PageContext }) {
  const all = await api.articles({ limit: 50 });
  const places = stories?.length ? stories : [{ pill: 'Featured story' }, {}, {}, {}];
  const pinned = new Set(places.map((p) => p.article).filter(Boolean));
  const free = all.filter((a) => !pinned.has(a.handle));
  let next = 0;
  const picked = places
    .map((p) => {
      const article: Article | undefined = p.article ? all.find((a) => a.handle === p.article) : free[next++];
      return article ? { place: p, article } : null;
    })
    .filter((x): x is { place: (typeof places)[number]; article: Article } => x !== null);
  if (!picked.length) return null;

  let mode: string = layout;
  if (places.length > 4 || places.some((p) => p.size && p.size !== 'auto')) mode = 'custom';
  if (mode !== 'custom' && picked.length < 4) mode = 'equal';
  const columns = Math.max(picked.length, 1);
  const share = Math.floor(100 / columns);
  const first = context?.index === 0;
  const reveal = first ? 'none' : animation;

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`blog-stories full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-1'}`}
        style={{
          ...(highlightColor ? { '--color-accent': highlightColor } : {}),
          ...sectionStyle(common),
        } as React.CSSProperties}
      >
        <div className="blog-stories__inner">
          <div className="blog-stories__header">
            <div className="blog-stories__titles">
              {eyebrow ? <p className="eyebrow blog-stories__eyebrow">{eyebrow}</p> : null}
              {heading ? <h2 className="blog-stories__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
            </div>
            {linkLabel && link ? (
              <a className="button button--text blog-stories__view-all" href={link}>
                {linkLabel}
                <span className="blog-stories__arrow" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </a>
            ) : null}
          </div>
          <animate-on-scroll>
            <ul
              className={`blog-stories__grid blog-stories__grid--${mode}`}
              role="list"
              {...(mode === 'equal' ? { style: { '--cards': String(columns) } as React.CSSProperties } : {})}
              {...(reveal !== 'none' ? { 'data-animate': reveal } : {})}
            >
              {picked.map(({ place, article }, i) => {
                const placeIndex = places.indexOf(place);
                let size = place.size && place.size !== 'auto' ? place.size : '';
                if (!size) {
                  if (mode === 'equal') size = i === 0 ? 'featured' : 'small';
                  else if (mode === 'custom') size = ['featured', 'small', 'portrait', 'small'][placeIndex % 4];
                  else size = placeIndex === 0 ? 'featured' : placeIndex === 3 ? 'portrait' : 'small';
                }
                let large: number, tablet: number, phone: number;
                if (mode === 'equal') [large, tablet, phone] = [share, share, 100];
                else if (mode === 'custom')
                  [large, tablet, phone] =
                    size === 'featured' ? [50, 50, 100] : size === 'landscape' ? [50, 100, 100] : [25, 50, 50];
                else
                  [large, tablet, phone] =
                    placeIndex === 0 ? [53, 100, 100] : placeIndex === 3 ? [22, 100, 45] : [27, 50, 56];
                const sizes = `(min-width: 1200px) ${large}vw, (min-width: 750px) ${tablet}vw, ${phone}vw`;
                const [x, y] = place.zoomPoint ? POINTS[place.zoomPoint] : [50, 50];
                const zoom = (place.zoom ?? 112) / 100;
                const src = place.image ?? article.image;
                const category = place.category ?? article.tags[0];
                const excerpt = truncateWords(article.excerpt || article.contentHtml.replace(/<[^>]+>/g, ' '), 24);
                return (
                  <li
                    key={article.handle}
                    className={`blog-stories__card blog-stories__card--${size}`}
                    style={{ '--story-zoom': liquidFloat(zoom), '--story-x': `${x}%`, '--story-y': `${y}%` } as React.CSSProperties}
                  >
                    <div className="blog-stories__media">
                      {src ? (
                        <div className="image image--cover">
                          <img
                            src={src}
                            alt=""
                            loading={first ? 'eager' : 'lazy'}
                            sizes={sizes}
                            fetchPriority={first && i === 0 ? 'high' : 'auto'}
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="blog-stories__text">
                      {place.pill ? <span className="blog-stories__pill">{place.pill}</span> : null}
                      {category ? <p className="blog-stories__category">{category}</p> : null}
                      <h3 className="blog-stories__title">
                        <a className="blog-stories__link" href={`/blogs/featured/${article.handle}`}>
                          {article.title}
                        </a>
                      </h3>
                      {excerpt ? <p className="blog-stories__excerpt">{excerpt}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </animate-on-scroll>
        </div>
      </div>
    </div>
  );
}
