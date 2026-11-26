/**
 * Trending articles (theme: sections/blog-trending.liquid + blocks/_trending-article.liquid +
 * snippets/trending-article.liquid): a numbered list of articles (picked by handle, else the 5 newest)
 * and a video card. <blog-video> (theme JS) swaps the poster for the player on click.
 */
import { articleUrl, imageSize, readMinutes } from '@/components/ArticleParts';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { api } from '@/lib/api';
import type { Article } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface BlogTrendingProps extends SectionCommon {
  heading?: string; // inline HTML, <em> = accent words
  linkLabel?: string;
  link?: string;
  /** Rows: article handles (+ an optional views text). Empty = the 5 newest articles. */
  articles?: { article: string; views?: string }[];
  showMetaTopic?: boolean;
  fillScreen?: boolean;
  scaleWithScreen?: boolean;
  textScale?: number; // %
  animation?: 'none' | 'slide-left' | 'fade-up';
  video?: {
    youtubeId?: string;
    vimeoId?: string;
    poster?: string;
    label?: string; // "Video · 12:40"
    title?: string;
    position?: 'left' | 'right';
    radius?: number; // px
  };
}

export default async function BlogTrending({
  id,
  context,
  heading,
  linkLabel,
  link,
  articles: picks = [],
  showMetaTopic = false,
  fillScreen = true,
  scaleWithScreen = true,
  textScale = 110,
  animation: animationSetting = 'slide-left',
  video,
  ...common
}: BlogTrendingProps & { id: string; context?: PageContext }) {
  const all = await api.articles();
  const byHandle = new Map(all.map((a) => [a.handle, a]));
  let rows: { article: Article; views?: string }[] = picks
    .map((p) => ({ article: byHandle.get(p.article)!, views: p.views }))
    .filter((r) => r.article);
  if (!rows.length) rows = all.slice(0, 5).map((article) => ({ article }));
  if (!rows.length) return null;

  const index = context?.index ?? 0;
  let animation: string = index === 0 ? 'none' : animationSetting;
  const rowsAnimation = animation === 'none' ? 'none' : 'fade-up';
  const videoRight = video?.position === 'right';
  if (videoRight && animation === 'slide-left') animation = 'slide-right';
  const hasVideo = !!(video?.youtubeId || video?.vimeoId);
  const hasViews = rows.some((r) => r.views);
  const showViewAll = !!(linkLabel && link);
  const title = video?.title || video?.label;
  const playLabel = title ? `Play video: ${title}` : 'Play video';
  const poster = video?.poster;
  const posterSize = imageSize(poster);
  const iframe = video?.youtubeId
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&playsinline=1&rel=0" title="${(title || playLabel).replace(/"/g, '&quot;')}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`
    : video?.vimeoId
      ? `<iframe src="https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&dnt=1" title="${(title || playLabel).replace(/"/g, '&quot;')}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      : '';

  const classes = [
    'blog-trending full-width',
    `section-width--${common.width ?? 'widest'}`,
    `color-${common.colorScheme ?? 'scheme-2'}`,
    fillScreen ? 'section--fill-screen' : '',
    scaleWithScreen ? 'section--screen-scale' : '',
    hasVideo ? 'blog-trending--has-video' : '',
    videoRight ? 'blog-trending--video-right' : '',
    hasViews ? '' : 'blog-trending--no-views',
  ].filter(Boolean);

  return (
    <section id={`section-${id}`} className="shopify-section">
      <div
        className={classes.join(' ')}
        style={sectionStyle(
          { paddingTop: 40, paddingBottom: 40, ...common },
          { '--text-boost': (textScale / 100).toFixed(1), '--video-radius': `${video?.radius ?? 50}px` },
        )}
      >
        <animate-on-scroll className="blog-trending__inner">
          <div className="blog-trending__panel">
            {heading ? null : <h2 className="visually-hidden">Trending articles</h2>}
            {heading || showViewAll ? (
              <div className="blog-trending__header" data-animate={rowsAnimation !== 'none' ? rowsAnimation : undefined}>
                {heading ? <h2 className="blog-trending__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
                {showViewAll ? (
                  <a className="blog-trending__view-all" href={link}>
                    {linkLabel}
                    <span className="blog-trending__view-all-arrow" aria-hidden="true">
                      <Icon name="arrow" />
                    </span>
                  </a>
                ) : null}
              </div>
            ) : null}
            <ol className="blog-trending__rows" role="list">
              {rows.map(({ article, views }) => {
                const topic = article.tags[0];
                return (
                  <li
                    className="trending-article"
                    data-animate={rowsAnimation !== 'none' ? rowsAnimation : undefined}
                    key={article.handle}
                  >
                    <span className="trending-article__number" aria-hidden="true"></span>
                    <div className="trending-article__text">
                      <h3 className="trending-article__title">
                        <a className="trending-article__link" href={articleUrl(article)}>
                          {article.title}
                        </a>
                      </h3>
                      <p className="trending-article__meta">
                        {article.author ? <span>{article.author}</span> : null}
                        {showMetaTopic && topic ? <span>{topic}</span> : null}
                        <span>{`${readMinutes(article)} min`}</span>
                      </p>
                    </div>
                    {topic ? <span className="trending-article__tag">{topic}</span> : null}
                    {views ? <span className="trending-article__views">{views}</span> : null}
                    <span className="trending-article__arrow" aria-hidden="true">
                      <Icon name="arrow-solid" />
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
          {hasVideo ? (
            <div className="blog-trending__video" data-animate={animation !== 'none' ? animation : undefined}>
              <blog-video className="blog-video">
                <div className="blog-video__poster">
                  {poster ? (
                    <img
                      src={poster}
                      alt=""
                      width={posterSize?.width}
                      height={posterSize?.height}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : undefined}
                      sizes="(min-width: 1200px) 25vw, 92vw"
                    />
                  ) : null}
                </div>
                {video?.label || video?.title ? (
                  <div className="blog-video__caption">
                    {video.label ? <p className="blog-video__label">{video.label}</p> : null}
                    {video.title ? <p className="blog-video__title">{video.title}</p> : null}
                  </div>
                ) : null}
                <button className="blog-video__play" type="button" aria-label={playLabel}>
                  <Icon name="play" />
                </button>
                <template className="blog-video__template" dangerouslySetInnerHTML={{ __html: iframe }} />
              </blog-video>
            </div>
          ) : null}
        </animate-on-scroll>
      </div>
    </section>
  );
}
