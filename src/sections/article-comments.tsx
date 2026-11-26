/**
 * Article comments (theme: sections/article-comments.liquid): heading + count, the comment form and the
 * list of approved comments. Comments come from props (per article handle). The form posts back to the
 * article at #<form id>; <article-comments> (theme JS) then shows "your comment was sent" (the theme's
 * moderated-blog behaviour). Nothing is stored in this demo.
 */
import { AuthorAvatar, articleUrl, formatDate } from '@/components/ArticleParts';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ArticleComment {
  author: string;
  date: string; // ISO
  body: string; // HTML
}

export interface ArticleCommentsProps extends SectionCommon {
  heading?: string;
  alignWithText?: boolean;
  scaleWithScreen?: boolean;
  /** Approved comments per article handle, newest first. */
  comments?: Record<string, ArticleComment[]>;
}

export default function ArticleComments({
  id,
  context,
  heading = 'Comments',
  alignWithText = true,
  scaleWithScreen = true,
  comments = {},
  ...common
}: ArticleCommentsProps & { id: string; context?: PageContext }) {
  const article = context?.article;
  if (!article) return null;
  const list = comments[article.handle] ?? [];
  const formId = `ArticleCommentForm-${id}`;
  const count = list.length === 0 ? 'No comments yet' : `${list.length} comment${list.length === 1 ? '' : 's'}`;

  return (
    <section id={`section-${id}`} className="shopify-section">
      <div
        className={`article-comments full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${scaleWithScreen ? ' section--screen-scale' : ''}${alignWithText ? ' article-comments--aligned' : ''}`}
        style={sectionStyle({ paddingTop: 32, paddingBottom: 64, ...common })}
      >
        <article-comments
          className="article-comments__inner"
          id="comments"
          data-section-id={id}
          data-loaded-text="More comments loaded"
          data-form-id={formId}
          data-sent-text="Thanks, your comment was sent. It will appear once it's approved."
        >
          <div className="article-comments__content">
            <div className="article-comments__header">
              {heading ? (
                <h2 className="article-comments__heading">{heading}</h2>
              ) : (
                <h2 className="visually-hidden">Comments</h2>
              )}
              <p className="article-comments__count">
                {count} <span aria-hidden="true">·</span> Join the conversation
              </p>
            </div>
            <form
              method="post"
              action={`${articleUrl(article)}#${formId}`}
              id={formId}
              acceptCharset="UTF-8"
              className="article-comments__form"
            >
              <input type="hidden" name="form_type" value="new_comment" />
              <input type="hidden" name="utf8" value="✓" />
              <div className="article-comments__card">
                <span className="author-avatar article-comments__avatar" aria-hidden="true">
                  <Icon name="account" />
                </span>
                <label className="visually-hidden" htmlFor={`${formId}-body`}>
                  Your comment
                </label>
                <textarea
                  className="article-comments__textarea"
                  id={`${formId}-body`}
                  name="comment[body]"
                  rows={1}
                  placeholder="Share your thoughts on this article…"
                  required
                  defaultValue=""
                />
                <div className="article-comments__extra">
                  <div className="article-comments__fields">
                    <div className="article-comments__field">
                      <label className="article-comments__label" htmlFor={`${formId}-author`}>
                        Name
                      </label>
                      <input
                        className="article-comments__input"
                        type="text"
                        id={`${formId}-author`}
                        name="comment[author]"
                        defaultValue=""
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="article-comments__field">
                      <label className="article-comments__label" htmlFor={`${formId}-email`}>
                        Email
                      </label>
                      <input
                        className="article-comments__input"
                        type="email"
                        id={`${formId}-email`}
                        name="comment[email]"
                        defaultValue=""
                        autoComplete="email"
                        autoCapitalize="off"
                        spellCheck={false}
                        required
                        aria-describedby={`${formId}-email-note`}
                      />
                    </div>
                  </div>
                  <p className="article-comments__note" id={`${formId}-email-note`}>
                    Your email isn&apos;t published. Comments appear once they&apos;re approved.
                  </p>
                </div>
                <button className="button article-comments__submit" type="submit">
                  Post comment
                  <Icon name="send" />
                </button>
              </div>
            </form>
            {list.length ? (
              <ol className="article-comments__list" role="list" data-comments-list="">
                {list.map((c, i) => (
                  <li className="article-comments__comment" id={`comment-${article.id}-${i + 1}`} tabIndex={-1} key={i}>
                    <AuthorAvatar name={c.author} className="article-comments__avatar" />
                    <div className="article-comments__body">
                      <div className="article-comments__meta">
                        <p className="article-comments__author">{c.author}</p>
                        <span className="article-comments__date" data-timestamp={Math.floor(new Date(c.date).getTime() / 1000)}>
                          <time dateTime={new Date(c.date).toISOString().replace('.000Z', 'Z')}>{formatDate(c.date)}</time>
                        </span>
                      </div>
                      <div className="article-comments__text" dangerouslySetInnerHTML={{ __html: c.body }} />
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="article-comments__empty">Be the first to share your thoughts.</p>
            )}
            <p className="visually-hidden" role="status" data-comments-status=""></p>
          </div>
        </article-comments>
      </div>
    </section>
  );
}
