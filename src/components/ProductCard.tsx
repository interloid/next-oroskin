/**
 * Product card (theme: snippets/product-card.liquid). Server component; the theme JS drives it:
 * <card-gallery> (photo slider), <card-options> (option radios swap price / cart variant / BUY / photo),
 * <quick-add> (cart button). Keep the class names, data-* attributes and the <template>s.
 *
 * Styles:
 * - 'full' (default): the collection page card. Photo slider (2+ images, at most 5), badges, type +
 *   rating, title, price + "Save X%", the first option's values as radios (every product with options),
 *   cart button + BUY link (`/cart/<variantId>:1`, Shopify's cart permalink: the theme JS rebuilds it
 *   the same way when a value is picked), "Notify me" when sold out.
 * - 'tile': the photo fills the card, a strip with title / subtitle / price; with `showDetails` the
 *   strip opens on hover with rating, description and the cart button.
 *
 * Media ids: products have no Shopify media ids, so a photo's id is `<productId>-<image index>`
 * (slides and option radios use the same rule, so card-options can find the photo of a value).
 */
import { Fragment } from 'react';
import Icon from '@/components/Icon';
import Price, { priceHtml, savePercent } from '@/components/Price';
import QuickAdd, { addName } from '@/components/QuickAdd';
import type { Image, Product, Variant } from '@/lib/types';

export interface ProductCardProps {
  product: Product | null; // null = placeholder card
  style?: 'full' | 'tile';
  imageRatio?: 'portrait' | 'square' | 'landscape' | 'original';
  sizes?: string;
  loading?: 'eager' | 'lazy';
  /** The page's largest image (LCP): eager + fetchpriority high. */
  priority?: boolean;
  headingTag?: 'h2' | 'h3' | 'h4';
  /** For unique ids (radio names, quick add form): the section id, plus a suffix for a 2nd list. */
  sectionId?: string;
  idSuffix?: string;
  showRating?: boolean;
  /** Tile: open the details panel on hover / focus. */
  showDetails?: boolean;
  showDescription?: boolean;
  cartOptions?: 'add_first' | 'link';
  /** Cart button: round icon (default) or a pill with text. */
  cartStyle?: 'round' | 'text';
  cartLabel?: string;
  buyLabel?: string;
}

const RATIO_H: Record<string, number> = { portrait: 1.25, square: 1, landscape: 0.75 };

export const mediaId = (product: Product, index: number) => `${product.id}-${index}`;
const imageIndex = (product: Product, src: string | null) => (src ? product.images.findIndex((i) => i.src === src) : -1);

function CardImage({
  image,
  className,
  sizes,
  loading,
  priority,
}: {
  image: Image;
  className: string;
  sizes: string;
  loading: 'eager' | 'lazy';
  priority?: boolean;
}) {
  return (
    <div className={`image ${className}`}>
      <img
        src={image.src}
        alt=""
        width={image.width ?? 1024}
        height={image.height ?? 1024}
        loading={priority ? 'eager' : loading}
        sizes={sizes}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
}

function Placeholder({ style, mediaClass, Tag }: { style: string; mediaClass: string; Tag: 'h2' | 'h3' | 'h4' }) {
  return (
    <div className={`product-card product-card--${style} product-card--placeholder`}>
      <div className={`product-card__media ${mediaClass}`}>
        <svg className="product-card__placeholder" viewBox="0 0 525.5 525.5" aria-hidden="true">
          <rect width="525.5" height="525.5" fill="currentColor" opacity="0.08" />
        </svg>
      </div>
      <div className="product-card__panel">
        <div className="product-card__info">
          <div className="product-card__text">
            <Tag className="product-card__title">Product title</Tag>
          </div>
          <div className="price">
            <span className="price__current">Rs. 21.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Theme badges from `product.badges` (default badge scheme: scheme-1). */
function Badges({ product }: { product: Product }) {
  return (
    <>
      {product.badges.map((b) => (
        <span key={b} className="product-card__badge color-scheme-1">
          {b}
        </span>
      ))}
    </>
  );
}

/** "1.2k" from 1234 (design: short count from 1000). */
function shortCount(n: number) {
  if (n < 1000) return String(n);
  const whole = Math.floor(n / 1000);
  const tenth = Math.floor(n / 100) % 10;
  return tenth > 0 ? `${whole}.${tenth}k` : `${whole}k`;
}

export default function ProductCard({
  product,
  style = 'full',
  imageRatio = 'portrait',
  sizes = '(min-width: 990px) 25vw, 50vw',
  loading = 'lazy',
  priority = false,
  headingTag = 'h3',
  sectionId = 'section',
  idSuffix,
  showRating = true,
  showDetails = false,
  showDescription = false,
  cartOptions = 'add_first',
  cartStyle = 'round',
  cartLabel,
  buyLabel = 'Buy',
}: ProductCardProps) {
  const Tag = headingTag;
  let imageClass = imageRatio !== 'original' ? 'image--cover' : '';
  let mediaClass = `product-card__media--${imageRatio}`;
  if (style === 'tile') {
    imageClass = 'image--cover';
    mediaClass = 'product-card__media--fill';
  }
  if (!product) return <Placeholder style={style} mediaClass={mediaClass} Tag={Tag} />;

  const url = `/products/${product.handle}`;
  const quickAddSuffix = idSuffix ? `${style}-${idSuffix}` : style;
  const cartText = cartStyle === 'text';
  const rating = showRating && product.rating?.value > 0 ? product.rating : null;
  const ratingCount = rating?.count ?? 0;
  const images = product.images;

  if (style === 'full') {
    // ---- the card's variant + the option it shows (the FIRST option) ----
    const option = product.options[0];
    const interactive = !!option && product.variants.length > 1 && option.values.length > 0;
    let variant: Variant | undefined = product.variants.find((v) => v.available) ?? product.variants[0];
    const valueVariant = (value: string) => {
      const withValue = product.variants.filter((v) => v.options[0] === value);
      return withValue.find((v) => v.available) ?? withValue[0];
    };
    const shownValues = interactive ? option.values.slice(0, 6) : [];
    if (interactive) {
      variant = valueVariant(shownValues[0]) ?? variant;
      for (const value of shownValues) {
        const inStock = product.variants.find((v) => v.options[0] === value && v.available);
        if (inStock) {
          variant = inStock;
          break;
        }
      }
    }
    const prices = new Set(product.variants.map((v) => `${v.price}/${v.compareAtPrice}`));
    const priceTemplates = prices.size > 1;
    const save = variant ? savePercent(variant.price, variant.compareAtPrice) : 0;
    const cardId = `Card-${product.id}-${sectionId}${idSuffix ? `-${idSuffix}` : ''}`;
    const hasSlider = images.length > 1;
    const slides = images.slice(0, 5);
    const mediaH = imageRatio === 'original' ? (images[0]?.width && images[0]?.height ? images[0].height / images[0].width : 1.25) : RATIO_H[imageRatio];
    const cardStyle: Record<string, string> = { '--card-media-h': String(mediaH) };
    if (hasSlider && imageRatio === 'original') {
      cardStyle['--card-media-ratio'] = String(1 / mediaH);
      imageClass = 'image--cover';
    }
    const quickAddClass = cartText
      ? 'product-card__quick-add product-card__cart-text'
      : 'product-card__quick-add product-card__quick-add--icon';

    return (
      <div
        className={`product-card product-card--full${product.available ? '' : ' product-card--sold-out'}`}
        style={cardStyle as React.CSSProperties}
      >
        <div className={`product-card__media ${mediaClass}${hasSlider ? ' product-card__media--slider' : ''}`}>
          {hasSlider ? (
            <card-gallery className="product-card__gallery">
              <div className="product-card__slides" data-card-slides="">
                {slides.map((img, i) => (
                  <a
                    key={i}
                    className="product-card__slide"
                    href={url}
                    tabIndex={-1}
                    aria-hidden="true"
                    data-media-id={mediaId(product, i)}
                  >
                    <CardImage
                      image={img}
                      className={imageClass}
                      sizes={sizes}
                      loading={i === 0 ? loading : 'lazy'}
                      priority={i === 0 && priority}
                    />
                  </a>
                ))}
              </div>
              <span className="product-card__arrow product-card__arrow--prev" data-card-prev="" aria-hidden="true">
                <Icon name="chevron" />
              </span>
              <span className="product-card__arrow product-card__arrow--next" data-card-next="" aria-hidden="true">
                <Icon name="chevron" />
              </span>
              <span className="product-card__dots" aria-hidden="true">
                {slides.map((_, i) => (
                  <span key={i} className={`product-card__dot${i === 0 ? ' is-active' : ''}`} data-card-dot={i}></span>
                ))}
              </span>
            </card-gallery>
          ) : images[0] ? (
            <CardImage image={images[0]} className={imageClass} sizes={sizes} loading={loading} priority={priority} />
          ) : (
            <div className={`image ${imageClass}`}>
              <svg className="image__placeholder" viewBox="0 0 525.5 525.5" aria-hidden="true">
                <rect width="525.5" height="525.5" fill="currentColor" opacity="0.08" />
              </svg>
            </div>
          )}
          <div className="product-card__badges">
            <Badges product={product} />
            {!product.available ? <span className="product-card__badge color-scheme-5">Sold out</span> : null}
            <span
              className="product-card__badge product-card__badge--discount color-scheme-3"
              data-card-discount=""
              data-template="-[percent]%"
              hidden={save === 0}
            >
              -{save}%
            </span>
          </div>
        </div>

        <card-options className="product-card__body" data-cart-url="/cart">
          <div className="product-card__meta">
            {product.type ? <p className="product-card__category">{product.type}</p> : null}
            {rating ? (
              <p className="product-card__score">
                <span aria-hidden="true">
                  <span className="product-card__star">★</span> {Math.round(rating.value * 10) / 10}
                  {ratingCount > 0 ? ` (${shortCount(ratingCount)})` : ''}
                </span>
                <span className="visually-hidden">
                  Rated {Math.round(rating.value * 10) / 10} out of 5
                  {ratingCount > 0 ? `, ${ratingCount} ${ratingCount === 1 ? 'review' : 'reviews'}` : ''}
                </span>
              </p>
            ) : null}
          </div>

          <Tag className="product-card__title">
            <a className="product-card__link" href={url}>
              {product.title}
            </a>
          </Tag>

          <div className="product-card__pricing">
            <div data-card-price="" dangerouslySetInnerHTML={{ __html: priceHtml(product, variant) }} />
            <span className="product-card__save" data-card-save="" data-template="Save [percent]%" hidden={save === 0}>
              Save {save}%
            </span>
          </div>

          {interactive ? (
            <fieldset className="product-card__options">
              <legend className="visually-hidden">{option.name}</legend>
              {shownValues.map((value, i) => {
                const vv = valueVariant(value);
                if (!vv) return null;
                const inputId = `${cardId}-${i + 1}`;
                const name = addName(product, vv);
                const idx = imageIndex(product, vv.image);
                const media = idx >= 0 ? mediaId(product, idx) : null;
                const mediaTemplate = idx >= 0 && (!hasSlider || idx >= 5);
                return (
                  <Fragment key={value}>
                    <input
                      className="visually-hidden"
                      type="radio"
                      id={inputId}
                      name={cardId}
                      value={vv.id}
                      data-available={String(vv.available)}
                      data-save={savePercent(vv.price, vv.compareAtPrice)}
                      data-add-name={name}
                      data-add-label={`Add ${name} to cart`}
                      data-added-label={`${name} added to your cart`}
                      {...(media ? { 'data-media-id': media } : {})}
                      defaultChecked={vv.id === variant?.id}
                    />
                    <label
                      className={`product-card__option product-card__option--text${vv.available ? '' : ' product-card__option--sold-out'}`}
                      htmlFor={inputId}
                    >
                      {value}
                    </label>
                    {priceTemplates ? (
                      <template data-price-for={vv.id} dangerouslySetInnerHTML={{ __html: priceHtml(product, vv) }} />
                    ) : null}
                    {mediaTemplate ? (
                      <template
                        data-media-for={media!}
                        dangerouslySetInnerHTML={{
                          __html: `<div class="image ${imageClass}"><img src="${images[idx].src}" alt="" width="${images[idx].width ?? 1024}" height="${images[idx].height ?? 1024}" loading="lazy" sizes="${sizes}"></div>`,
                        }}
                      />
                    ) : null}
                  </Fragment>
                );
              })}
            </fieldset>
          ) : null}

          <div className="product-card__buy">
            {product.available && variant ? (
              <div className={`product-card__buy-now${cartText ? ' product-card__buy-now--text' : ''}`} data-card-buy="">
                <QuickAdd
                  product={product}
                  variant={variant}
                  style="pill"
                  size={44}
                  label={cartLabel}
                  className={quickAddClass}
                  sectionId={sectionId}
                  idSuffix={quickAddSuffix}
                />
                <a className="button product-card__buy-link" href={`/cart/${variant.id}:1`} data-card-buy-link="">
                  <Icon name="buy-now" />
                  <span className="product-card__buy-label">{buyLabel}</span>
                  <span className="visually-hidden">: {product.title}</span>
                </a>
              </div>
            ) : null}
            <a className="button button--secondary product-card__notify" href={url} data-card-notify="" hidden={product.available}>
              <Icon name="bell" />
              Notify me<span className="visually-hidden">: {product.title}</span>
            </a>
          </div>
        </card-options>
      </div>
    );
  }

  // ---- tile ----
  const description = showDescription
    ? product.descriptionHtml
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .reduce((acc: string[], w, i, all) => (i < 16 ? [...acc, i === 15 && all.length > 16 ? `${w}...` : w] : acc), [])
        .join(' ')
    : '';
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const pillLinksOnly = cartText && product.available && product.variants.length > 1 && cartOptions === 'link';
  return (
    <div className={`product-card product-card--tile${product.available ? '' : ' product-card--sold-out'}`}>
      <div className={`product-card__media ${mediaClass}`}>
        {images[0] ? <CardImage image={images[0]} className={imageClass} sizes={sizes} loading={loading} priority={priority} /> : null}
        <div className="product-card__badges">
          {!product.available ? (
            <span className="product-card__badge color-scheme-5">Sold out</span>
          ) : onSale ? (
            <span className="product-card__badge color-scheme-3">Sale</span>
          ) : null}
          <Badges product={product} />
        </div>
      </div>
      <div className="product-card__panel">
        <div className="product-card__info">
          <div className="product-card__text">
            <Tag className="product-card__title">
              <a className="product-card__link" href={url}>
                {product.title}
              </a>
            </Tag>
            {product.subtitle ? <p className="product-card__subtitle">{product.subtitle}</p> : null}
          </div>
          <Price product={product} />
        </div>
        {showDetails ? (
          <div className="product-card__details">
            <div className="product-card__details-inner">
              {rating ? (
                <p className="product-card__rating">
                  <span className="product-card__stars" aria-hidden="true">
                    {Math.round(rating.value * 10) / 10} <span className="product-card__star">★</span>
                  </span>
                  <span className="visually-hidden">Rated {Math.round(rating.value * 10) / 10} out of 5</span>
                  {ratingCount > 0 ? (
                    <span className="product-card__reviews">
                      {ratingCount} {ratingCount === 1 ? 'review' : 'reviews'}
                    </span>
                  ) : null}
                </p>
              ) : null}
              {description ? <p className="product-card__description">{description}</p> : null}
              <div className="product-card__actions">
                {pillLinksOnly ? null : cartText ? (
                  <QuickAdd
                    product={product}
                    style="pill"
                    size={44}
                    label={cartLabel}
                    options={cartOptions}
                    className="product-card__cart-text"
                    sectionId={sectionId}
                    idSuffix={quickAddSuffix}
                  />
                ) : (
                  <QuickAdd product={product} size={44} iconColor="#7d0000" options={cartOptions} sectionId={sectionId} idSuffix={quickAddSuffix} />
                )}
                {/* A real link: .product-card__actions sits above the stretched title link (z-index 2),
                    so clicks here never reach it. Out of the tab order: the title link is the focus stop. */}
                <a className="product-card__more" href={url} tabIndex={-1} aria-hidden="true">
                  <span className="product-card__more-label">View details</span>
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
