/**
 * Article hero (theme: sections/article-hero.liquid): breadcrumb, then the article's image as a big rounded
 * card with the topic pill, the title (H1), the summary and a meta row (author, date, read time, "Share
 * article": <share-button> shows the share icons on hover / click). Reads context.article.
 */
import {
  AuthorAvatar,
  BLOG_TITLE,
  BLOG_URL,
  Breadcrumb,
  ShareLinks,
  TimeTag,
  absoluteUrl,
  articleUrl,
  imageSize,
  readMinutes,
} from '@/components/ArticleParts';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export interface ArticleHeroProps extends SectionCommon {
  showBreadcrumb?: boolean;
  showTopic?: boolean;
  showShare?: boolean;
  scaleWithScreen?: boolean;
  textScale?: number; // %
  cornerRadius?: number; // px
  /** Words of a title shown in the accent colour, per article handle (theme: metafield custom.title_highlight). */
  titleHighlights?: Record<string, string>;
}

export default async function ArticleHero({
  id,
  context,
  showBreadcrumb = true,
  showTopic = true,
  showShare = true,
  scaleWithScreen = true,
  textScale = 110,
  cornerRadius = 100,
  titleHighlights = {},
  ...common
}: ArticleHeroProps & { id: string; context?: PageContext }) {
  const article = context?.article;
  if (!article) return null;
  const topic = article.tags[0];
  let titleHtml = esc(article.title);
  const highlight = esc((titleHighlights[article.handle] ?? '').trim());
  if (highlight && titleHtml.includes(highlight)) titleHtml = titleHtml.replace(highlight, `<em>${highlight}</em>`);
  const summary = article.excerpt.replace(/<[^>]*>/g, '').trim();
  const size = imageSize(article.image);
  const first = (context?.index ?? 0) === 0;
  const width = common.width ?? 'widest';
  const sizes =
    width === 'full'
      ? '100vw'
      : width === 'narrow'
        ? '(min-width: 1250px) 1200px, 96vw'
        : width === 'wide'
          ? '(min-width: 1720px) 1650px, 96vw'
          : '(min-width: 1920px) 1820px, 96vw';
  const url = await absoluteUrl(articleUrl(article));

  return (
    <section id={`section-${id}`} className="shopify-section">
      <div
        className={`article-hero full-width section-width--${width} color-${common.colorScheme ?? 'scheme-2'}${scaleWithScreen ? ' section--screen-scale' : ''}`}
        style={sectionStyle(
          { paddingTop: 32, paddingBottom: 48, ...common },
          { '--text-boost': (textScale / 100).toFixed(1), '--hero-radius': `${cornerRadius}px` },
        )}
      >
        <div className="article-hero__inner">
          {showBreadcrumb ? (
            <Breadcrumb
              current={article.title}
              parent={{ title: BLOG_TITLE, url: BLOG_URL }}
              className="article-hero__breadcrumb"
            />
          ) : null}
          <div className={`article-hero__card${article.image ? '' : ' article-hero__card--no-image'}`}>
            {article.image ? (
              <div className="article-hero__media">
                <img
                  src={article.image}
                  alt={article.imageAlt ?? ''}
                  width={size?.width}
                  height={size?.height}
                  loading={first ? 'eager' : 'lazy'}
                  sizes={sizes}
                  fetchPriority={first ? 'high' : 'auto'}
                />
              </div>
            ) : null}
            <div className="article-hero__content">
              {showTopic && topic ? <span className="article-hero__topic">{topic}</span> : null}
              <div className="article-hero__text">
                <h1 className="article-hero__title" dangerouslySetInnerHTML={{ __html: titleHtml }} />
                {summary ? <p className="article-hero__summary">{summary}</p> : null}
              </div>
              <div className="article-hero__meta">
                {article.author ? (
                  <span className="article-hero__author">
                    <AuthorAvatar name={article.author} className="article-hero__avatar" /> {article.author}
                  </span>
                ) : null}
                <span className="article-hero__facts">
                  <span className="article-hero__fact">
                    <Icon name="calendar" />
                    <TimeTag iso={article.publishedAt} style="short" />
                  </span>
                  <span className="article-hero__fact">
                    <Icon name="clock" />
                    {`${readMinutes(article)} min read`}
                  </span>
                </span>
                {showShare ? (
                  <share-button className="article-hero__share">
                    <button className="button article-hero__share-button article-hero__share-main" type="button">
                      <Icon name="share" />
                      Share article
                    </button>
                    <ShareLinks url={url} title={article.title} style="pill" id={`ArticleShare-${id}`} />
                  </share-button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
