/**
 * Blog / article building blocks shared by the blog and article sections:
 * - <ArticleCard> (theme: snippets/article-card.liquid): the blog listing card, also used by Related articles
 * - <AuthorAvatar> (snippets/author-avatar.liquid): the author's initials in a circle
 * - <ShareLinks> (snippets/share-links.liquid): copy link + Facebook / WhatsApp / X / Instagram
 * - <Breadcrumb> (snippets/breadcrumb.liquid)
 * - helpers: readMinutes() (snippets/read-time.liquid), dates, handleize(), blogTags(), imageSize(), absoluteUrl()
 * Server components.
 */
import fs from 'node:fs';
import path from 'node:path';
import { headers } from 'next/headers';
import Icon from '@/components/Icon';
import site from '@/data/site.json';
import type { Article } from '@/lib/types';

export const BLOG_URL = '/blogs/featured';
export const BLOG_TITLE = 'Featured';

/** Shopify's handleize: "Skin care" → "skin-care". */
export const handleize = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Topic page URL. The port has no /tagged/ route: the blog page filters with ?tag=<handle>. */
export const tagUrl = (tag: string) => `${BLOG_URL}?tag=${handleize(tag)}`;
export const articleUrl = (a: Article) => `${BLOG_URL}/${a.handle}`;

/** Every tag of the blog, once, A → Z (Shopify's blog.all_tags). */
export function blogTags(articles: Article[]) {
  return [...new Set(articles.flatMap((a) => a.tags))].sort((a, b) => a.localeCompare(b));
}

/** snippets/read-time.liquid: words of the content / 200, rounded up, at least 1. */
export function readMinutes(article: Article, speed = 200) {
  const words = article.contentHtml
    .replace(/</g, ' <')
    .replace(/<[^>]*>/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / Math.max(1, speed)));
}

/** "October 28, 2026" (long) or "Oct 28, 2026" (Shopify's abbreviated_date), in UTC like the stored date. */
export function formatDate(iso: string, style: 'long' | 'short' = 'long') {
  return new Date(iso).toLocaleDateString('en-US', { month: style, day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

/** <time> as Shopify's time_tag writes it: datetime without milliseconds. */
export function TimeTag({ iso, style = 'long' }: { iso: string; style?: 'long' | 'short' }) {
  return <time dateTime={new Date(iso).toISOString().replace('.000Z', 'Z')}>{formatDate(iso, style)}</time>;
}

/** First letter of the first and last word: "Sarah Jenkins" = SJ. */
export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

const sizeCache = new Map<string, { width: number; height: number } | null>();
/** Width / height of a local image in public/ (WebP or PNG header), for the img attributes. */
export function imageSize(src: string | null | undefined) {
  if (!src || !src.startsWith('/')) return null;
  const clean = src.split('?')[0];
  if (sizeCache.has(clean)) return sizeCache.get(clean)!;
  let size: { width: number; height: number } | null = null;
  try {
    const fd = fs.openSync(path.join(process.cwd(), 'public', clean), 'r');
    const b = Buffer.alloc(32);
    fs.readSync(fd, b, 0, 32, 0);
    fs.closeSync(fd);
    if (b.toString('ascii', 1, 4) === 'PNG') size = { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    else if (b.toString('ascii', 8, 12) === 'WEBP') {
      const kind = b.toString('ascii', 12, 16);
      if (kind === 'VP8X') size = { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
      else if (kind === 'VP8 ') size = { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
      else if (kind === 'VP8L') {
        const bits = b.readUInt32LE(21);
        size = { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
      }
    }
  } catch {
    size = null;
  }
  sizeCache.set(clean, size);
  return size;
}

/** Absolute URL on this site (share links need one), from the request's host. */
export async function absoluteUrl(pathname: string) {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https');
  return `${proto}://${host}${pathname}`;
}

export function Breadcrumb({
  current,
  parent,
  className,
}: {
  current: string;
  parent?: { title: string; url: string };
  className: string;
}) {
  return (
    <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
      <ol>
        <li>
          <a href="/">Home</a>
        </li>
        {parent ? (
          <li>
            <a href={parent.url}>{parent.title}</a>
          </li>
        ) : null}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  );
}

export function AuthorAvatar({ name, className }: { name: string; className: string }) {
  return (
    <span className={`author-avatar ${className}`} aria-hidden="true">
      {initials(name)}
    </span>
  );
}

const instagram = site.footer?.social?.find((s: { network: string }) => s.network === 'instagram')?.url;

export function ShareLinks({
  url,
  title,
  style = 'round',
  id,
}: {
  url: string;
  title: string;
  style?: 'round' | 'pill';
  id?: string;
}) {
  const u = encodeURIComponent(url);
  // Liquid's url_encode writes spaces as "+"
  const enc = (s: string) => encodeURIComponent(s).replace(/%20/g, '+');
  return (
    <share-links className={`share-links share-links--${style}`} id={id} data-copied-text="Link copied">
      <ul className="share-links__list" role="list">
        <li>
          <button className="share-links__item" type="button" data-copy-url={url} aria-label="Copy link">
            <Icon name="link" />
          </button>
        </li>
        <li>
          <a
            className="share-links__item"
            href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}
            target="_blank"
            rel="noopener"
            aria-label="Share on Facebook (opens in a new window)"
          >
            <Icon name="facebook" />
          </a>
        </li>
        <li>
          <a
            className="share-links__item"
            href={`https://wa.me/?text=${enc(`${title} ${url}`)}`}
            target="_blank"
            rel="noopener"
            aria-label="Share on WhatsApp (opens in a new window)"
          >
            <Icon name="whatsapp" />
          </a>
        </li>
        <li>
          <a
            className="share-links__item"
            href={`https://x.com/intent/post?url=${u}&text=${enc(title)}`}
            target="_blank"
            rel="noopener"
            aria-label="Share on X (opens in a new window)"
          >
            <Icon name="x" />
          </a>
        </li>
        {instagram ? (
          <li>
            <a
              className="share-links__item"
              href={instagram}
              target="_blank"
              rel="noopener"
              aria-label="Our Instagram (opens in a new window)"
            >
              <Icon name="instagram" />
            </a>
          </li>
        ) : null}
      </ul>
      <span className="visually-hidden" role="status" data-share-status="" />
    </share-links>
  );
}

/** Liquid's truncatewords: the first n words, then "..." when the text was longer. */
export function truncateWords(text: string, n: number) {
  const words = text.trim().split(/\s+/);
  return words.length > n ? words.slice(0, n).join(' ') + '...' : text.trim();
}

export interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  pillLabel?: string;
  animation?: 'none' | 'fade-up';
  topicScheme?: string;
  arrowScheme?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'auto';
}

export function ArticleCard({
  article,
  featured = false,
  pillLabel,
  animation = 'none',
  topicScheme = 'scheme-2',
  arrowScheme = 'scheme-2',
  sizes,
  loading = 'lazy',
  fetchPriority,
}: ArticleCardProps) {
  const topic = article.tags[0];
  const hasMedia = !!article.image;
  const size = imageSize(article.image);
  const imageSizes =
    sizes ?? (featured ? '(min-width: 1200px) 50vw, 100vw' : '(min-width: 1200px) 50vw, (min-width: 750px) 50vw, 100vw');
  const excerpt = featured ? truncateWords(article.excerpt.replace(/<[^>]*>/g, ''), 40) : '';
  const Title = featured ? 'h2' : 'h3';
  return (
    <article
      className={`article-card${featured ? ' article-card--featured' : ''}${hasMedia ? '' : ' article-card--no-media'}`}
      data-animate={animation !== 'none' ? animation : undefined}
    >
      {hasMedia ? (
        <div className="article-card__media">
          <img
            src={article.image!}
            alt=""
            width={size?.width}
            height={size?.height}
            loading={loading}
            fetchPriority={fetchPriority}
            sizes={imageSizes}
          />
          {topic ? <span className={`article-card__topic color-${topicScheme}`}>{topic}</span> : null}
          {featured ? null : (
            <span className={`article-card__arrow article-card__arrow--badge color-${arrowScheme}`} aria-hidden="true">
              <Icon name="arrow-solid" />
            </span>
          )}
        </div>
      ) : null}
      <div className="article-card__body">
        {!hasMedia && topic ? (
          <span className={`article-card__topic article-card__topic--inline color-${topicScheme}`}>{topic}</span>
        ) : null}
        {featured && pillLabel ? <span className="article-card__pill">{pillLabel}</span> : null}
        <Title className="article-card__title">
          <a className="article-card__link" href={articleUrl(article)}>
            {article.title}
          </a>
        </Title>
        {excerpt ? <p className="article-card__excerpt">{excerpt}</p> : null}
        <div className="article-card__meta">
          {article.author ? (
            <span className="article-card__author">
              <span className="article-card__avatar" aria-hidden="true">
                {initials(article.author)}
              </span>{' '}
              {article.author}
            </span>
          ) : null}
          <span className="article-card__facts">
            {featured ? (
              <span className="article-card__fact">
                <Icon name="calendar" />
                <TimeTag iso={article.publishedAt} />
              </span>
            ) : null}
            <span className="article-card__fact">
              <Icon name="clock" />
              {`${readMinutes(article)} min read`}
            </span>
          </span>
          {featured ? (
            <span className={`article-card__arrow color-${arrowScheme}`} aria-hidden="true">
              <Icon name="arrow-solid" />
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
