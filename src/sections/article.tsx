/**
 * Article (theme: sections/article.liquid + snippets/article-product-row.liquid, article-product-card,
 * author-avatar, share-links): the article's text styled from what the editor writes, with a sidebar
 * (author, "In this article", products, tags, share) and a share row under the text. Below 1200px the
 * author / contents / tags / share come right after the lead (the same HTML is written twice, CSS shows one).
 * The text passes below are the theme's Liquid passes, in the same order. <article-layout> (theme JS)
 * marks the current heading in the contents list.
 */
import fs from 'node:fs';
import path from 'node:path';
import parse from 'html-react-parser';
import {
  AuthorAvatar,
  ShareLinks,
  absoluteUrl,
  articleUrl,
  tagUrl,
  truncateWords,
} from '@/components/ArticleParts';
import type { PageContext } from '@/components/PageRenderer';
import Price from '@/components/Price';
import QuickAdd from '@/components/QuickAdd';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ArticleProps extends SectionCommon {
  showAuthor?: boolean;
  showContents?: boolean;
  showProducts?: boolean; // the sidebar's product cards (first 2)
  showEditRows?: boolean; // "The edit" product rows in the text (at the [products] paragraph, else after the text)
  showTags?: boolean;
  showShare?: boolean;
  showShareRow?: boolean;
  showAuthorBio?: boolean;
  stickySidebar?: boolean;
  scaleWithScreen?: boolean;
  textScale?: number; // %
  /** Products per article handle (theme: article metafield custom.products). */
  articleProducts?: Record<string, string[]>;
  /** Author bios by author name (theme: the staff account's bio). */
  authorBios?: Record<string, string>;
}

/** The theme's Liquid passes over article.content: returns the lead, the text around [products] and the contents list. */
function processBody(html: string) {
  // 1. One spelling
  let body = html
    .replace(/<br\s*\/>/g, '<br>')
    .replace(/<b>/g, '<strong>')
    .replace(/<\/b>/g, '</strong>')
    .replace(/<i>/g, '<em>')
    .replace(/<\/i>/g, '</em>');
  // 2. Quote attribution
  body = body.replace(/<p>(—|&mdash;)/g, '<p class="article-body__cite">$1');
  // 2b. A Heading 6 right above a Heading 2 = the small label
  body = body.replace(/<h6[^>]*>([\s\S]*?)<\/h6>(\s*)(?=<h2)/g, '<p class="h6 article-body__eyebrow">$1</p>$2');
  // 3. H2 ids + contents
  const contents: { id: string; text: string }[] = [];
  let n = 0;
  body = body.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (_m, attrs: string, inner: string) => {
    n += 1;
    const id = `article-heading-${n}`;
    const text = inner.replace(/<[^>]*>/g, '').trim();
    if (text) contents.push({ id, text });
    return `<h2 id="${id}"${attrs}>${inner}</h2>`;
  });
  // 4. Steps: "<strong>Word</strong><br>Title<br>Text" → the title in a span
  body = body.replace(/<li>(\s*)(<strong>[^<]*<\/strong>)<br>([^<]*(?:<(?!\/li>|br>)[^<]*)*)<br>/g, (_m, ws, label, title) =>
    `<li>${ws}${label}<span class="article-body__step-title">${title}</span>`,
  );
  // 5. Images load lazily; files we have locally are served from /cdn/shop/files
  body = body.replace(/<img /g, '<img loading="lazy" decoding="async" ');
  body = body.replace(/src="https:\/\/cdn\.shopify\.com\/s\/files\/1\/0744\/1085\/2454\/files\/([^"?]+)(\?[^"]*)?"/g, (m, file) =>
    fs.existsSync(path.join(process.cwd(), 'public/cdn/shop/files', file)) ? `src="/cdn/shop/files/${file}"` : m,
  );
  // 6. The [products] marker paragraph
  let before = body;
  let after = '';
  let hasMarker = false;
  const inline = String.raw`(?:\s|&nbsp;|<(?!\/?p[\s>])[^>]+>)*`;
  const marker = new RegExp(String.raw`<p[^>]*>${inline}\[products\]${inline}<\/p>`);
  const m = marker.exec(body);
  if (m) {
    hasMarker = true;
    before = body.slice(0, m.index);
    after = body.slice(m.index + m[0].length);
  }
  // 7. The lead: the first plain paragraph (no class, no image)
  let lead = '';
  const first = before.trimStart();
  const lm = /^<p(\s[^>]*)?>[\s\S]*?<\/p>/.exec(first);
  if (lm && !(lm[1] ?? '').includes('class=') && !lm[0].includes('<img')) {
    lead = lm[0];
    before = first.slice(lm[0].length);
  }
  return { lead, before, after, hasMarker, contents };
}

function ProductRow({ product, sectionId }: { product: Product; sectionId: string }) {
  const img = product.images[0];
  const description = truncate(product.descriptionHtml.replace(/<[^>]*>/g, '').trim(), 180);
  return (
    <div className="article-product-row">
      <div className="article-product-row__inner">
        <div className="article-product-row__media">
          {img ? (
            <img
              src={img.src}
              alt=""
              width={img.width}
              height={img.height}
              loading="lazy"
              sizes="(min-width: 1200px) 141px, (min-width: 750px) 120px, 96px"
            />
          ) : null}
        </div>
        <div className="article-product-row__info">
          {product.vendor ? <p className="article-product-row__vendor">{product.vendor}</p> : null}
          <h3 className="article-product-row__title">
            <a className="article-product-row__link" href={`/products/${product.handle}`}>
              {product.title}
            </a>
          </h3>
          {description ? <p className="article-product-row__description">{description}</p> : null}
        </div>
        <div className="article-product-row__buy">
          <Price product={product} />
          <QuickAdd product={product} style="pill" size={50} className="article-product-row__add" sectionId={sectionId} />
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, sectionId }: { product: Product; sectionId: string }) {
  const img = product.images[0];
  const detail = (product.variants.length > 1 ? (product.variants.find((v) => v.available) ?? product.variants[0]).title : '') || product.type;
  return (
    <div className="article-product-card">
      <div className="article-product-card__media">
        {img ? (
          <img
            src={img.src}
            alt=""
            width={img.width}
            height={img.height}
            loading="lazy"
            sizes="(min-width: 1200px) 360px, (min-width: 750px) 45vw, 90vw"
          />
        ) : null}
      </div>
      <div className="article-product-card__info">
        <h3 className="article-product-card__title">
          <a className="article-product-card__link" href={`/products/${product.handle}`}>
            {product.title}
          </a>
        </h3>
        {detail ? <p className="article-product-card__detail">{detail}</p> : null}
        <Price product={product} />
      </div>
      <QuickAdd product={product} size={44} iconColor="var(--color-accent)" className="article-product-card__add" sectionId={sectionId} />
    </div>
  );
}

/** Liquid's truncate: at most n characters including the "...". */
function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 3) + '...' : s;
}

export default async function ArticleSection({
  id,
  context,
  showAuthor = true,
  showContents = true,
  showProducts = true,
  showEditRows = true,
  showTags = true,
  showShare = true,
  showShareRow = true,
  showAuthorBio = true,
  stickySidebar = true,
  scaleWithScreen = true,
  textScale = 100,
  articleProducts = {},
  authorBios = {},
  ...common
}: ArticleProps & { id: string; context?: PageContext }) {
  const article = context?.article;
  if (!article) return null;
  const { lead, before, after, contents } = processBody(article.contentHtml);
  const handles = articleProducts[article.handle] ?? [];
  const found = handles.length ? await api.products(handles) : [];
  const products = handles.map((h) => found.find((p) => p.handle === h)).filter((p): p is Product => !!p);
  const bio = (authorBios[article.author] ?? '').trim();
  const url = await absoluteUrl(articleUrl(article));

  const withProducts = showProducts && products.length > 0;
  const withEdit = showEditRows && products.length > 0;
  const withTags = showTags && article.tags.length > 0;
  const withContents = showContents && contents.length > 0;
  const withAuthor = showAuthor && !!article.author;
  const sideNarrow = withProducts && !withEdit;

  const author = withAuthor ? (
    <div className="article__author-card">
      <div className="article__author">
        <AuthorAvatar name={article.author} className="article__author-avatar" />
        <p className="article__author-name">{article.author}</p>
      </div>
      {bio ? <p className="article__author-bio">{truncateWords(bio, 30)}</p> : null}
    </div>
  ) : null;
  const contentsNav = withContents ? (
    <nav className="article__side-block" aria-label="In this article">
      <h2 className="article__label">In this article</h2>
      <ol className="article__contents" role="list">
        {contents.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} data-contents-link="">
              {c.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  ) : null;
  const tags = withTags ? (
    <div className="article__side-block">
      <h2 className="article__label">Tags</h2>
      <ul className="article__tags" role="list">
        {article.tags.map((t) => (
          <li key={t}>
            <a className="article__tag" href={tagUrl(t)}>
              {t}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
  const share = showShare ? (
    <div className="article__side-block">
      <h2 className="article__label">Share</h2>
      <ShareLinks url={url} title={article.title} style="round" />
    </div>
  ) : null;
  const sideProducts = withProducts ? (
    <div className="article__side-block article__side-products">
      <h2 className="article__label">Products in this article</h2>
      <ul className="article__products" role="list">
        {products.slice(0, 2).map((p) => (
          <li key={p.handle}>
            <ProductCard product={p} sectionId={id} />
          </li>
        ))}
      </ul>
    </div>
  ) : null;
  const hasTop = !!(author || contentsNav || tags || share);
  const hasSide = hasTop || !!sideProducts;

  return (
    <section id={`section-${id}`} className="shopify-section">
      <div
        className={`article full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${scaleWithScreen ? ' section--screen-scale' : ''}`}
        style={sectionStyle(
          { paddingTop: 16, paddingBottom: 64, ...common },
          {
            '--text-boost': (textScale / 100).toFixed(1),
            '--icon-quote': "url('/assets/icon-quote-open.svg')",
            '--icon-tips': "url('/assets/icon-sparkle.svg')",
          },
        )}
      >
        <article-layout className={`article__layout${stickySidebar ? ' article__layout--sticky' : ''}`}>
          <div className="article__main">
            {lead ? <div className="article-body article-body--lead rte">{parse(lead)}</div> : null}
            {hasTop ? (
              <div className="article__top">
                {author}
                {contentsNav}
                {tags}
                {share}
              </div>
            ) : null}
            <div className={`article-body rte${lead ? ' article-body--after-lead' : ''}`}>
              {parse(before)}
              {withEdit ? (
                <ul className="article-edit" role="list">
                  {products.map((p) => (
                    <li key={p.handle}>
                      <ProductRow product={p} sectionId={id} />
                    </li>
                  ))}
                </ul>
              ) : null}
              {after ? parse(after) : null}
            </div>
            {showShareRow ? (
              <div className="article__share-row">
                <p className="article__label">Share</p>
                <ShareLinks url={url} title={article.title} style="round" />
              </div>
            ) : null}
            {showAuthorBio && bio ? (
              <div className="article__bio-card">
                <AuthorAvatar name={article.author} className="article__bio-avatar" />
                <div className="article__bio-text">
                  <p className="article__bio-name">{article.author}</p>
                  <p className="article__bio">{bio}</p>
                </div>
              </div>
            ) : null}
          </div>
          {hasSide ? (
            <div className={`article__side${sideNarrow ? ' article__side--narrow' : ''}`} data-article-side="">
              {author}
              {contentsNav}
              {sideProducts}
              {tags}
              {share}
            </div>
          ) : null}
        </article-layout>
      </div>
    </section>
  );
}
