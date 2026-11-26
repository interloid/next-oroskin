/**
 * Collection banner (theme: sections/collection-banner.liquid): breadcrumb, the collection title (H1),
 * a big sentence with small photos ([image_1] [image_2] [image_3] codes, [break] = new line, <em> = the
 * highlight colour), the description, and a large image top right (the collection's image, else `image`).
 */
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

interface SentencePhoto {
  src: string;
  width?: number;
  height?: number;
  size?: number; // % of the text height (default 100)
  rotate?: number; // deg
  shift?: number; // % up / down
}

export interface CollectionBannerProps extends SectionCommon {
  /** HTML. Codes: [image_1] [image_2] [image_3], [break]. */
  sentence?: string;
  photos?: SentencePhoto[];
  /** Indent of each line in em (staggered layout). */
  lineIndents?: number[];
  sentenceLayout?: 'staggered' | 'centered';
  titlePosition?: 'start' | 'center';
  showBreadcrumb?: boolean;
  showDescription?: boolean;
  /** Large image when the collection has none (or always, with useCollectionImage false). */
  image?: { src: string; width?: number; height?: number };
  useCollectionImage?: boolean;
  imageWidth?: number; // % of the screen from 990px
  underHeader?: boolean;
  highlightColor?: string;
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export default function CollectionBanner({
  id,
  context,
  sentence = '',
  photos = [],
  lineIndents = [],
  sentenceLayout = 'staggered',
  titlePosition = 'start',
  showBreadcrumb = true,
  showDescription = false,
  image,
  useCollectionImage = true,
  imageWidth = 24,
  underHeader = true,
  highlightColor,
  ...common
}: CollectionBannerProps & { id: string; context?: PageContext }) {
  const collection = context?.collection;
  const title = collection?.title ?? 'Collection';
  const isEmpty = collection ? collection.productHandles.length === 0 : false;
  const loading = (context?.index ?? 0) === 0 ? 'eager' : 'lazy';

  let html = isEmpty ? '' : sentence;
  if (html) {
    photos.slice(0, 3).forEach((p, i) => {
      const size = p.size ?? 100;
      const ratio = p.width && p.height ? p.width / p.height : 1;
      const sizes = `${Math.ceil(((size * 40) / 100) * ratio)}px`;
      const photo =
        `<span class="collection-banner__photo" style="--photo-size: ${size}; --photo-rotate: ${p.rotate ?? 0}deg; --photo-shift: ${p.shift ?? 0}%;">` +
        `<img src="${esc(p.src)}" alt="" width="${p.width ?? 400}" height="${p.height ?? 400}" loading="${loading}" sizes="${sizes}"></span>`;
      html = html.split(`[image_${i + 1}]`).join(photo);
    });
    html = html
      .split('[break]')
      .map((line, i) => `<span class="collection-banner__line" style="--line-indent: ${lineIndents[i] ?? 0}em;">${line}</span>`)
      .join(' ');
  }

  const bannerImage = useCollectionImage && collection?.image ? { src: collection.image } : image;
  const small = Math.floor((imageWidth * 3) / 2);

  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`collection-banner full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${underHeader ? ' collection-banner--under-header' : ''}`}
        style={sectionStyle(
          { paddingTop: 40, paddingBottom: 32, ...common },
          { '--banner-highlight': highlightColor || 'var(--color-accent)', '--banner-image-width': `${imageWidth}%` },
        )}
      >
        <div className="collection-banner__inner">
          {showBreadcrumb ? (
            <nav className="collection-banner__breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li aria-current="page">{title}</li>
              </ol>
            </nav>
          ) : null}
          {html && titlePosition === 'start' ? <h1 className="eyebrow collection-banner__title">{title}</h1> : null}
          <div className="collection-banner__content">
            {html ? (
              <>
                {titlePosition === 'center' ? <h1 className="eyebrow eyebrow--center collection-banner__title">{title}</h1> : null}
                <p
                  className={`collection-banner__sentence collection-banner__sentence--${sentenceLayout}`}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </>
            ) : (
              <h1 className="collection-banner__title collection-banner__title--large">{title}</h1>
            )}
            {showDescription && collection?.description ? (
              <div className="rte collection-banner__description">{collection.description}</div>
            ) : null}
          </div>
        </div>
        {!isEmpty && bannerImage ? (
          <div className="image collection-banner__image">
            <img
              src={bannerImage.src}
              alt=""
              width={bannerImage.width ?? 521}
              height={bannerImage.height ?? 402}
              loading={loading}
              sizes={`(min-width: 990px) ${imageWidth}vw, ${small}vw`}
              {...(loading === 'eager' ? { fetchPriority: 'high' as const } : {})}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
