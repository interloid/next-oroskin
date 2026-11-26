/**
 * Article list (theme: sections/blog.liquid + snippets/article-card.liquid, results-view, pagination):
 * a sticky toolbar (article search + topic pills), a featured story (page 1, no topic), then the cards
 * ("mixed" = the Figma rows, or "even" thirds) and the page links.
 * Topics: ?tag=<handle> (the port has no /tagged/ route). <results-view> (theme JS) loads pills and page
 * links in place: it fetches the URL (+ &section_id=, ignored here) and swaps the parts by id.
 */
import { ArticleCard, BLOG_URL, blogTags, handleize } from '@/components/ArticleParts';
import { Pagination } from '@/components/CollectionTools';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { api } from '@/lib/api';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface BlogProps extends SectionCommon {
  showSearch?: boolean;
  showTags?: boolean;
  stickyToolbar?: boolean;
  showFeatured?: boolean;
  featuredArticle?: string; // handle; empty = the newest
  featuredLabel?: string;
  perPage?: number; // the featured story counts on page 1
  layout?: 'mixed' | 'even';
  animation?: 'none' | 'fade-up';
  topicScheme?: string;
  arrowScheme?: string;
}

const MIXED_SPANS = [11, 26, 11, 22, 13, 13, 11, 11, 26, 13, 22, 13];

export default async function Blog({
  id,
  context,
  showSearch = true,
  showTags = true,
  stickyToolbar = true,
  showFeatured = true,
  featuredArticle,
  featuredLabel = 'Featured story',
  perPage = 12,
  layout = 'mixed',
  animation = 'fade-up',
  topicScheme = 'scheme-2',
  arrowScheme = 'scheme-2',
  ...common
}: BlogProps & { id: string; context?: PageContext }) {
  const all = await api.articles();
  const sp = context?.searchParams ?? {};
  const tagParam = typeof sp.tag === 'string' ? sp.tag : '';
  const tags = blogTags(all);
  const currentTag = tags.find((t) => handleize(t) === tagParam);
  const filtered = tagParam ? all.filter((a) => a.tags.some((t) => handleize(t) === tagParam)) : all;
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const page = Math.min(Math.max(1, Number(sp.page) || 1), pages);
  const pageArticles = filtered.slice((page - 1) * perPage, page * perPage);

  const index = context?.index ?? 0;
  const cardAnimation = index === 0 ? 'none' : animation;
  const featured =
    showFeatured && page === 1 && !tagParam
      ? (all.find((a) => a.handle === featuredArticle) ?? all[0])
      : undefined;
  const grid = pageArticles.filter((a) => a.handle !== featured?.handle);

  // Image sizes (theme: Liquid in blog.liquid): content ≈ 92vw (100vw full width), capped for narrow / wide
  const baseVw = common.width === 'full' ? 100 : 92;
  const maxPx = common.width === 'narrow' ? 1200 : common.width === 'wide' ? 1650 : 0;
  const halfVw = Math.floor(baseVw / 2);
  const featuredVw = Math.floor((baseVw * 53) / 100);
  let featuredSizes = `(min-width: 1200px) ${featuredVw}vw, ${baseVw}vw`;
  if (maxPx) featuredSizes = `(min-width: ${maxPx}px) ${Math.floor((maxPx * 53) / 100)}px, ${featuredSizes}`;
  const cardSizes = (i: number) => {
    const span = layout === 'mixed' ? MIXED_SPANS[i % 12] : 16;
    const smallVw = i % 3 === 0 ? baseVw : halfVw;
    let s = `(min-width: 1200px) ${Math.floor((baseVw * span) / 48)}vw, (min-width: 375px) ${smallVw}vw, ${baseVw}vw`;
    if (maxPx) s = `(min-width: ${maxPx}px) ${Math.floor((maxPx * span) / 48)}px, ${s}`;
    return s;
  };
  const pageUrl = (p: number) => {
    const q = new URLSearchParams();
    if (tagParam) q.set('tag', tagParam);
    if (p > 1) q.set('page', String(p));
    const s = q.toString();
    return s ? `${BLOG_URL}?${s}` : BLOG_URL;
  };

  return (
    <section id={`section-${id}`} className="shopify-section">
      <div
        className={`blog-list full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 24, paddingBottom: 80, ...common })}
      >
        <results-view className="blog-list__inner" data-section-id={id}>
          {all.length === 0 ? (
            <div className="blog-list__empty">
              <p>No articles yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {showSearch || showTags ? (
                <blog-toolbar className={`blog-list__toolbar${stickyToolbar ? ' blog-list__toolbar--sticky' : ''}`}>
                  {showSearch ? (
                    <form className="blog-list__search" action="/search" method="get" role="search">
                      <input type="hidden" name="type" value="article" />
                      <input type="hidden" name="options[prefix]" value="last" />
                      <label className="visually-hidden" htmlFor={`BlogSearch-${id}`}>
                        Search the blog
                      </label>
                      <input
                        className="blog-list__search-input"
                        id={`BlogSearch-${id}`}
                        type="search"
                        name="q"
                        placeholder="Search blogs…"
                        autoComplete="off"
                        required
                      />
                      <button className="blog-list__search-button" type="submit">
                        <span className="visually-hidden">Search</span>
                        <Icon name="search" />
                      </button>
                    </form>
                  ) : null}
                  {showTags && tags.length ? (
                    <nav className="blog-list__topics" id={`BlogTopics-${id}`} aria-label="Blog topics" data-results-part="">
                      <ul className="blog-list__topic-list" role="list">
                        <li>
                          <a
                            className="blog-list__topic"
                            href={BLOG_URL}
                            data-results-link=""
                            aria-current={currentTag ? undefined : 'page'}
                          >
                            All
                          </a>
                        </li>
                        {tags.map((t) => (
                          <li key={t}>
                            <a
                              className="blog-list__topic"
                              href={`${BLOG_URL}?tag=${handleize(t)}`}
                              data-results-link=""
                              aria-current={t === currentTag ? 'page' : undefined}
                            >
                              {t}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  ) : null}
                </blog-toolbar>
              ) : null}
              <div className="blog-list__results" id={`BlogResults-${id}`} tabIndex={-1} data-results-part="" data-results-main="">
                <animate-on-scroll className="blog-list__reveal">
                  {featured ? (
                    <div className="blog-list__featured">
                      <ArticleCard
                        article={featured}
                        featured
                        pillLabel={featuredLabel}
                        animation={cardAnimation}
                        topicScheme={topicScheme}
                        arrowScheme={arrowScheme}
                        sizes={featuredSizes}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : undefined}
                      />
                    </div>
                  ) : null}
                  <h2 className="visually-hidden">Articles</h2>
                  {grid.length ? (
                    <ul className={`blog-list__grid blog-list__grid--${layout}`} role="list">
                      {grid.map((a, i) => (
                        <li className="blog-list__item" key={a.handle}>
                          <ArticleCard
                            article={a}
                            animation={cardAnimation}
                            topicScheme={topicScheme}
                            arrowScheme={arrowScheme}
                            sizes={cardSizes(i)}
                          />
                        </li>
                      ))}
                    </ul>
                  ) : featured ? null : (
                    <div className="blog-list__empty">
                      <p>No articles in this topic yet.</p>
                      <a className="button button--secondary" href={BLOG_URL} data-results-link="">
                        See all articles
                      </a>
                    </div>
                  )}
                  <Pagination current={page} pages={pages} pageUrl={pageUrl} />
                </animate-on-scroll>
              </div>
            </>
          )}
        </results-view>
      </div>
    </section>
  );
}
