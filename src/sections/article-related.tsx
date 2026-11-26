/**
 * Related articles (theme: sections/article-related.liquid + snippets/article-card.liquid): eyebrow,
 * heading, "View all articles" and article cards. First the blog's articles that share this article's
 * topic (its first tag), then the newest; never the article itself. No other article = no section.
 */
import { ArticleCard, BLOG_URL } from '@/components/ArticleParts';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { api } from '@/lib/api';
import type { Article } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ArticleRelatedProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent words
  linkLabel?: string;
  link?: string;
  limit?: number;
  alignWithText?: boolean;
  scaleWithScreen?: boolean;
  animation?: 'none' | 'fade-up';
  topicScheme?: string;
  arrowScheme?: string;
}

export default async function ArticleRelated({
  id,
  context,
  eyebrow,
  heading,
  linkLabel,
  link = BLOG_URL,
  limit = 2,
  alignWithText = true,
  scaleWithScreen = true,
  animation = 'fade-up',
  topicScheme = 'scheme-2',
  arrowScheme = 'scheme-2',
  ...common
}: ArticleRelatedProps & { id: string; context?: PageContext }) {
  const article = context?.article;
  if (!article) return null;
  const all = (await api.articles()).filter((a) => a.handle !== article.handle);
  const topic = article.tags[0];
  const picked: Article[] = topic ? all.filter((a) => a.tags.includes(topic)).slice(0, limit) : [];
  for (const a of all) {
    if (picked.length >= limit) break;
    if (!picked.includes(a)) picked.push(a);
  }
  if (!picked.length) return null;
  const cardAnimation = (context?.index ?? 0) === 0 ? 'none' : animation;
  const sizes = scaleWithScreen
    ? '(min-width: 1920px) 484px, (min-width: 1270px) 25.2vw, (min-width: 750px) 320px, (min-width: 375px) 46vw, 92vw'
    : '(min-width: 750px) 484px, (min-width: 375px) 46vw, 92vw';

  return (
    <section id={`section-${id}`} className="shopify-section">
      <div
        className={`article-related full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${scaleWithScreen ? ' section--screen-scale' : ''}${alignWithText ? ' article-related--aligned' : ''}`}
        style={sectionStyle({ paddingTop: 64, paddingBottom: 96, ...common })}
      >
        <div className="article-related__inner">
          <div className="article-related__content">
            <div className="article-related__header">
              {eyebrow ? <p className="eyebrow article-related__eyebrow">{eyebrow}</p> : null}
              <div className="article-related__title-row">
                {heading ? (
                  <h2 className="article-related__heading" dangerouslySetInnerHTML={{ __html: heading }} />
                ) : (
                  <h2 className="visually-hidden">Related articles</h2>
                )}
                {linkLabel ? (
                  <a className="article-related__view-all" href={link}>
                    {linkLabel}
                    <span className="article-related__view-all-arrow" aria-hidden="true">
                      <Icon name="arrow" />
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
            <animate-on-scroll className="article-related__reveal">
              <ul className="article-related__grid" role="list">
                {picked.map((a) => (
                  <li className="article-related__item" key={a.handle}>
                    <ArticleCard
                      article={a}
                      animation={cardAnimation}
                      topicScheme={topicScheme}
                      arrowScheme={arrowScheme}
                      sizes={sizes}
                    />
                  </li>
                ))}
              </ul>
            </animate-on-scroll>
          </div>
        </div>
      </div>
    </section>
  );
}
