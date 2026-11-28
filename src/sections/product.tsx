/**
 * Product (main section of /products/<handle>): breadcrumb, sticky 3-column masonry gallery, and an info
 * column made of "Info cards" (theme: sections/product.liquid + blocks/product-panel, product-eyebrow,
 * product-title, product-price, product-stock, product-description, buy-buttons, product-offers + _offer,
 * product-pickup, product-features + _product-feature, product-videos, product-payment; snippets
 * product-media, product-lightbox, product-sticky-bar, product-badges, price).
 *
 * Variant switching, gallery re-dealing, image viewer, sticky bar and add to cart are the theme JS
 * (<product-page>, <buy-buttons>, <product-price>, <product-stock>, <product-lightbox>,
 * <product-sticky-bar>): they read the hidden <select name="id"> options (data-options, data-available,
 * data-media-id, data-image), the per-variant price <template>s, the per-variant stock lines and the
 * sticky bar's <script data-sticky-variants> JSON, all generated here from the Product data.
 */
import { Fragment } from 'react';
import BuyNowLink from '@/components/BuyNowLink';
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { paymentIconSvg, paymentTypes } from '@/components/payment-icons';
import { money } from '@/lib/format';
import type { Product, Variant } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

/** One part of an Info card, in order (theme: the blocks inside a "Product card" block). */
export type InfoPart =
  | { type: 'eyebrow'; label?: 'type' | 'vendor' | 'none'; showBadge?: boolean; showShare?: boolean }
  | { type: 'title'; size?: 'h1' | 'product-title--product' | 'h2' | 'h3' }
  | { type: 'price'; size?: 'large' | 'regular'; showSavings?: boolean; showRating?: boolean; showTaxNote?: boolean }
  | {
      type: 'stock';
      label?: string; // empty = "In stock"
      threshold?: number; // show "N pieces left" at or under this stock (default 10)
      lowStockText?: string; // with [count], e.g. "Only [count] left"
      showSoldOut?: boolean;
      inStockColor?: string;
      lowStockColor?: string;
    }
  | { type: 'description'; textSize?: 'small' | 'body' | 'large'; wordLimit?: number; showReadMore?: boolean }
  | {
      type: 'buy-buttons';
      layout?: 'stacked' | 'inline';
      addToCartStyle?: 'solid' | 'outline';
      showPriceDifference?: boolean; // "(+Rs. 13.00)" on the pills
      showBuyNow?: boolean; // the "Buy it now" button (goes to /checkout?variant=)
      unavailableStyle?: 'dim' | 'cross';
    }
  | {
      type: 'offers';
      heading?: string;
      offers: { bank?: string; offer?: string; detail?: string; code?: string }[];
    }
  | { type: 'pickup'; heading?: string; deliveryNote?: string }
  | {
      type: 'features';
      heading?: string;
      // icon = built-in icon (public/assets/icon-<name>.svg: recyclable, vegan, cruelty-free, paraben-free...)
      // or image = own image path; neither = a tick
      features: { label: string; icon?: string; image?: string }[];
    }
  | {
      type: 'videos';
      heading?: string;
      videos: { src: string; poster?: string; ratio?: number }[]; // mp4 files
    }
  | { type: 'payment'; heading?: string; text?: string; types?: string[] }; // types: visa, master, american_express, paypal, diners_club, discover

export interface InfoCard {
  style?: 'card' | 'plain';
  gap?: number; // px between the parts (theme default 28)
  parts: InfoPart[];
}

export interface ProductProps extends SectionCommon {
  /** Override the page's product (else context.product). */
  productHandle?: string;
  showBreadcrumb?: boolean;
  breadcrumbParent?: { title: string; url: string } | null; // middle crumb (theme: the first collection)
  scaleWithScreen?: boolean;
  textScale?: number; // %, 100 = normal
  enableLightbox?: boolean;
  showStickyBar?: boolean;
  stickyMinimize?: boolean;
  cards?: InfoCard[];
}

const DEFAULT_CARDS: InfoCard[] = [
  {
    gap: 28,
    parts: [
      { type: 'eyebrow' },
      { type: 'title', size: 'product-title--product' },
      { type: 'price' },
      { type: 'stock' },
      { type: 'description' },
      { type: 'buy-buttons', layout: 'inline', addToCartStyle: 'outline' },
    ],
  },
  {
    gap: 40,
    parts: [
      {
        type: 'offers',
        offers: [
          { bank: 'Axis Bank', offer: '10% instant discount', detail: 'Up to $60 • Credit cards', code: 'AXIS10' },
          { bank: 'ICICI Bank', offer: 'Flat $40 instant discount', detail: 'On orders above $300', code: 'ICICI40' },
          { bank: 'SBI Card', offer: '3% off + 10% back', detail: 'Instant gift vouchers', code: 'SBI10' },
          { bank: 'HDFC Bank', offer: 'Flat $50 discount', detail: 'Using promo code HDFC6', code: 'HDFC6' },
        ],
      },
      { type: 'pickup', deliveryNote: 'Delivery in 2–3 business days' },
      {
        type: 'features',
        features: [
          { icon: 'recyclable', label: 'Recyclable' },
          { icon: 'vegan', label: 'Vegan' },
          { icon: 'cruelty-free', label: 'Cruelty-free' },
          { icon: 'paraben-free', label: 'Parabens free' },
        ],
      },
      { type: 'payment' },
    ],
  },
];

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** snippets/price.liquid with a variant (product page), as an HTML string (also used in <template>s). */
function priceHtml(variant: Variant, showSavings: boolean) {
  const compare = variant.compareAtPrice;
  const onSale = compare != null && compare > variant.price;
  let html = `<div class="price${onSale ? ' price--on-sale' : ''}${variant.available ? '' : ' price--sold-out'}">`;
  html += `<span class="price__current"><span class="visually-hidden">${onSale ? 'Sale price' : 'Regular price'}</span>`;
  html += `<span data-price-amount>${esc(money(variant.price))}</span></span>`;
  if (onSale) {
    html += `<span class="price__compare"><span class="visually-hidden">Regular price</span><s>${esc(money(compare!))}</s></span>`;
    if (showSavings) {
      const pct = Math.round(((compare! - variant.price) * 100) / compare!);
      html += `<span class="price__savings">${pct}% off</span>`;
    }
  }
  return html + '</div>';
}

/** JSON for a <script> tag: no "</script>" can close it early. */
const scriptJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export default async function ProductSection({
  id,
  context,
  productHandle,
  showBreadcrumb = true,
  breadcrumbParent = { title: 'All', url: '/collections/all' },
  scaleWithScreen = true,
  textScale = 100,
  enableLightbox = true,
  showStickyBar = true,
  stickyMinimize = true,
  cards = DEFAULT_CARDS,
  ...common
}: ProductProps & { id: string; context?: PageContext }) {
  let product: Product | null | undefined = context?.product;
  if (productHandle) {
    const { api } = await import('@/lib/api');
    product = (await api.product(productHandle)) ?? product;
  }
  if (!product) return null;
  const p = product;

  // Chosen variant: ?variant= (when the route passes searchParams), else the first available one
  const wanted = context?.searchParams?.variant;
  const variantParam = Array.isArray(wanted) ? wanted[0] : wanted;
  const selected = variantParam ? p.variants.find((v) => String(v.id) === variantParam) : undefined;
  const current = selected ?? p.variants.find((v) => v.available) ?? p.variants[0];
  const onlyDefault = p.options.length === 0;

  // Media: synthetic ids, consistent between the gallery, the lightbox and the variants' data-media-id
  const media = p.images.map((img, i) => ({ ...img, id: p.id * 100 + i + 1, index: i }));
  const mediaIdFor = (v: Variant) => media.find((m) => m.src === v.image)?.id;
  const imageFor = (v: Variant) => v.image ?? p.images[0]?.src ?? null;
  const count = media.length;
  const lead = selected?.image ? media.findIndex((m) => m.src === selected.image) : -1;
  const eager = context?.index === 0;

  const blockBase = id.replace(/[^A-Za-z0-9_-]/g, '');
  const sectionCls = `product full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${scaleWithScreen ? ' section--screen-scale' : ''}`;

  /* ---------- Gallery ---------- */
  const columnOrder = count < 3 ? [0] : [1, 0, 2];
  const columnSizes = (c: number) =>
    count < 3
      ? '(min-width: 990px) 40vw, 92vw'
      : c === 0
        ? '(min-width: 990px) 18vw, 40vw'
        : c === 1
          ? '(min-width: 990px) 13vw, 30vw'
          : '(min-width: 990px) 11vw, 26vw';
  const placeOf = (i: number) => (lead >= 0 ? (i === lead ? 0 : i < lead ? i + 1 : i) : i);

  const gallery = (
    <div className={`product__gallery${count < 3 ? ' product__gallery--few' : ''}`} data-gallery="">
      {count > 0 ? (
        columnOrder.map((column, ci) => {
          const sizes = columnSizes(column);
          return (
            <div
              key={column}
              className={`product__column product__column--${ci + 1}`}
              data-gallery-column={column}
              data-sizes={sizes}
            >
              {media.map((m) => {
                const place = placeOf(m.index);
                const slot = count < 3 ? 0 : place % 3;
                if (slot !== column) return null;
                return (
                  <div
                    key={m.id}
                    className="product__media product__media--image"
                    data-media-id={m.id}
                    data-media-index={m.index}
                    style={{ '--media-ratio': '1.0', order: String(place) } as React.CSSProperties}
                  >
                    <div className="product-media product-media--image">
                      <div className="image image--cover">
                        <img
                          src={m.src}
                          alt={m.alt}
                          width={m.width ?? 1024}
                          height={m.height ?? 1024}
                          loading={eager && place < 9 ? 'eager' : 'lazy'}
                          sizes={sizes}
                          fetchPriority={eager && place === 0 ? 'high' : 'auto'}
                        />
                      </div>
                    </div>
                    {enableLightbox ? (
                      <button
                        type="button"
                        className="product__open"
                        data-lightbox-open={m.index}
                        aria-haspopup="dialog"
                        aria-label={`Open item ${m.index + 1} of ${count} in the viewer`}
                      ></button>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div className="product__column product__column--1">
          <div className="product__media" style={{ '--media-ratio': '0.75' } as React.CSSProperties}></div>
        </div>
      )}
    </div>
  );

  /* ---------- Info parts ---------- */
  const renderPart = (part: InfoPart, key: string) => {
    switch (part.type) {
      case 'eyebrow': {
        const label = part.label === 'vendor' ? p.vendor : part.label === 'none' ? '' : p.type;
        const badge = part.showBadge !== false ? p.badges[0] : undefined;
        return (
          <product-eyebrow className="product-eyebrow" key={key}>
            <div className="product-eyebrow__start">
              {label ? <p className="product-eyebrow__label">{label}</p> : null}
              {badge ? (
                <span className="product-eyebrow__badge">
                  <span className="product-card__badge color-scheme-1">{badge}</span>
                </span>
              ) : null}
            </div>
            {part.showShare !== false ? (
              <>
                <button
                  type="button"
                  className="product-eyebrow__share"
                  data-share-url={`/products/${p.handle}`}
                  data-share-title={p.title}
                  data-copied="Link copied"
                  data-label="Share"
                >
                  <span className="product-eyebrow__share-icon" aria-hidden="true">
                    <Icon name="share-solid" />
                  </span>
                  <span data-share-label="">Share</span>
                </button>
                <span className="visually-hidden" role="status" data-share-status=""></span>
              </>
            ) : null}
          </product-eyebrow>
        );
      }
      case 'title':
        return (
          <h1 className={`product-title ${part.size ?? 'product-title--product'}`} key={key}>
            {p.title}
          </h1>
        );
      case 'price': {
        const showSavings = part.showSavings !== false;
        const rating = part.showRating !== false && p.rating?.count > 0 ? p.rating : null;
        return (
          <product-price
            className={`product-price product-price--${part.size ?? 'large'}`}
            data-label-plan="Subscription price"
            data-label-regular="Regular price"
            key={key}
          >
            <div className="product-price__row">
              <div data-price-current="" dangerouslySetInnerHTML={{ __html: priceHtml(current, showSavings) }} />
              {rating ? (
                <p className="product-price__rating">
                  <span
                    className="product-price__stars"
                    style={{ '--rating-percent': `${Math.round(rating.value * 200) / 10}%` } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    ★★★★★
                  </span>
                  <span className="product-price__score" aria-hidden="true">
                    {Math.round(rating.value * 10) / 10}
                  </span>
                  <span className="visually-hidden">{`Rated ${rating.value} out of 5`}</span>
                  <span className="product-price__reviews">
                    ({rating.count} {rating.count === 1 ? 'review' : 'reviews'})
                  </span>
                </p>
              ) : null}
            </div>
            {!onlyDefault
              ? p.variants.map((v) => (
                  <template
                    key={v.id}
                    data-variant-id={v.id}
                    dangerouslySetInnerHTML={{ __html: priceHtml(v, showSavings) }}
                  />
                ))
              : null}
            {part.showTaxNote !== false ? (
              <p className="product-price__note">
                <a href="/pages/shipping">Shipping</a> calculated at checkout.
              </p>
            ) : null}
          </product-price>
        );
      }
      case 'stock': {
        const threshold = part.threshold ?? 10;
        const showSoldOut = part.showSoldOut !== false;
        const style: Record<string, string> = {};
        if (part.inStockColor) style['--stock-color'] = part.inStockColor;
        if (part.lowStockColor) style['--stock-low-color'] = part.lowStockColor;
        return (
          <product-stock
            className="product-stock"
            style={Object.keys(style).length ? (style as React.CSSProperties) : undefined}
            key={key}
          >
            {p.variants.map((v) => {
              const low = v.available && v.inventory > 0 && v.inventory <= threshold;
              let cls = 'product-stock__line';
              if (!v.available) cls += showSoldOut ? ' product-stock__line--out' : ' product-stock__line--out product-stock__line--none';
              else if (low) cls += ' product-stock__line--low';
              const countText = part.lowStockText
                ? part.lowStockText.replace('[count]', String(v.inventory))
                : `${v.inventory} ${v.inventory === 1 ? 'piece' : 'pieces'} left`;
              return (
                <p className={cls} data-variant-id={v.id} hidden={v.id !== current.id} key={v.id}>
                  <span className="product-stock__label">{v.available ? part.label || 'In stock' : 'Sold out'}</span>
                  {low ? (
                    <>
                      <span className="product-stock__rule" aria-hidden="true"></span>
                      <span className="product-stock__count">{countText}</span>
                    </>
                  ) : null}
                </p>
              );
            })}
          </product-stock>
        );
      }
      case 'description': {
        const limit = part.wordLimit ?? 0;
        const plain = p.descriptionHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const words = plain.split(' ');
        const isShort = limit > 0 && words.length > limit;
        const cls = `product-description product-description--${part.textSize ?? 'large'} rte`;
        if (!isShort) return <div className={cls} key={key} dangerouslySetInnerHTML={{ __html: p.descriptionHtml }} />;
        return (
          <div className={cls} key={key}>
            {isShort ? (
              <>
                <p className="product-description__short">{words.slice(0, limit).join(' ') + '...'}</p>
                {part.showReadMore !== false ? (
                  <details className="product-description__more">
                    <summary className="product-description__toggle">Read more</summary>
                    <div dangerouslySetInnerHTML={{ __html: p.descriptionHtml }} />
                  </details>
                ) : null}
              </>
            ) : null}
          </div>
        );
      }
      case 'buy-buttons':
        return renderBuyButtons(part, key);
      case 'offers': {
        const offers = (part.offers ?? []).filter((o) => o.bank || o.offer || o.code);
        if (!offers.length) return null;
        const heading = part.heading ?? 'Bank offers';
        return (
          <div className="product-offers" key={key}>
            {heading ? <h2 className="product-block-heading">{heading}</h2> : null}
            <div className="product-offers__list" role="list">
              {offers.map((o, i) => (
                <offer-ticket className="offer" role="listitem" key={i}>
                  {o.bank || o.offer || o.detail ? (
                    <div className="offer__top">
                      {o.bank ? <p className="offer__bank">{o.bank}</p> : null}
                      {o.offer ? <p className="offer__text">{o.offer}</p> : null}
                      {o.detail ? <p className="offer__detail">{o.detail}</p> : null}
                    </div>
                  ) : null}
                  {o.code ? (
                    <div className="offer__bottom">
                      <span className="offer__code">{o.code}</span>
                      <button
                        type="button"
                        className="offer__copy"
                        data-code={o.code}
                        data-copied="Copied"
                        data-label="Copy"
                        aria-label={`Copy code ${o.code}`}
                      >
                        <span data-copy-label="">Copy</span>
                      </button>
                      <span className="visually-hidden" role="status" data-copy-status=""></span>
                    </div>
                  ) : null}
                </offer-ticket>
              ))}
            </div>
          </div>
        );
      }
      case 'pickup': {
        // Store pickup lists need Shopify locations: only the delivery note (no drawer = the theme JS
        // makes no section-rendering requests on a variant change)
        const heading = part.heading ?? 'Delivery and pickup';
        return (
          <product-pickup className="product-pickup" key={key}>
            {heading ? <h2 className="product-block-heading">{heading}</h2> : null}
            <ul className="product-pickup__list" role="list">
              {part.deliveryNote ? (
                <li className="product-pickup__line">
                  <span className="product-pickup__icon" aria-hidden="true">
                    <Icon name="truck" />
                  </span>
                  <span>{part.deliveryNote}</span>
                </li>
              ) : null}
            </ul>
          </product-pickup>
        );
      }
      case 'features': {
        const features = (part.features ?? []).filter((f) => f.label);
        if (!features.length) return null;
        return (
          <div className="product-features" key={key}>
            {part.heading ? <h2 className="product-block-heading">{part.heading}</h2> : null}
            <div className="product-features__list" role="list">
              {features.map((f, i) => (
                <div className="product-feature" role="listitem" key={i}>
                  <span className="product-feature__icon" aria-hidden="true">
                    {f.image || f.icon ? (
                      <img
                        src={f.image ?? `/assets/icon-${f.icon}.svg`}
                        alt=""
                        width="53"
                        height="53"
                        loading="lazy"
                        className="product-feature__image"
                      />
                    ) : (
                      <Icon name="check" />
                    )}
                  </span>
                  <span className="product-feature__label">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'videos': {
        const videos = part.videos ?? [];
        if (!videos.length) return null;
        const heading = part.heading ?? 'Product short videos';
        return (
          <product-videos className="product-videos" key={key}>
            {heading ? <h2 className="product-block-heading">{heading}</h2> : null}
            <ul className="product-videos__list" role="list">
              {videos.map((v, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className="product-videos__thumb"
                    data-video={i + 1}
                    data-ratio={v.ratio ?? 1.7778}
                    aria-haspopup="dialog"
                    aria-label={`Play video ${i + 1} of ${videos.length}`}
                  >
                    {v.poster ? (
                      <img src={v.poster} alt="" width="240" height="135" loading="lazy" sizes="7.5rem" className="product-videos__image" />
                    ) : null}
                    <span className="product-videos__play" aria-hidden="true">
                      <Icon name="play" />
                    </span>
                  </button>
                  <template
                    data-video-template={i + 1}
                    dangerouslySetInnerHTML={{
                      __html: `<video playsinline="true" controls="controls" preload="auto" class="product-videos__video"${v.poster ? ` poster="${esc(v.poster)}"` : ''}><source src="${esc(v.src)}" type="video/mp4"></video>`,
                    }}
                  />
                </li>
              ))}
            </ul>
            <dialog className="product-videos__dialog" aria-label={heading}>
              <button type="button" className="product-videos__close" data-video-close="">
                <span className="visually-hidden">Close video</span>
                <span aria-hidden="true">
                  <Icon name="close" />
                </span>
              </button>
              <div className="product-videos__player" data-video-player=""></div>
            </dialog>
          </product-videos>
        );
      }
      case 'payment': {
        const heading = part.heading ?? 'We accept';
        const text = part.text ?? 'Your payment information is processed securely.';
        const headingId = `PaymentHeading-${blockBase}-${key}`;
        const types = part.types ?? paymentTypes;
        return (
          <div className="product-payment" key={key}>
            {heading ? (
              <h2 className="product-block-heading" id={headingId}>
                {heading}
              </h2>
            ) : null}
            {text ? <p className="product-payment__text">{text}</p> : null}
            {types.length ? (
              <ul className="product-payment__list" role="list" aria-labelledby={heading ? headingId : undefined}>
                {types.map((t) => (
                  <li key={t} dangerouslySetInnerHTML={{ __html: paymentIconSvg(t, `PaymentIcon-${blockBase}-${key}-`) }} />
                ))}
              </ul>
            ) : null}
          </div>
        );
      }
    }
  };

  /* ---------- Buy buttons ---------- */
  function renderBuyButtons(part: Extract<InfoPart, { type: 'buy-buttons' }>, key: string) {
    const bid = `${blockBase}-${key}`;
    const layout = part.layout ?? 'stacked';
    const submitClass = part.addToCartStyle === 'outline' ? 'button button--secondary' : 'button';
    const minPrice = Math.min(...p.variants.map((v) => v.price));
    const buyNow = part.showBuyNow !== false ? (
      <div
        className="buy-buttons__payment"
        style={{ '--icon-buy': "url('/assets/icon-buy-now.svg')" } as React.CSSProperties}
        hidden={!current.available}
      >
        <div className="shopify-payment-button">
          <BuyNowLink variantId={current.id} label="Buy it now" />
        </div>
      </div>
    ) : null;

    return (
      <buy-buttons
        className={`buy-buttons buy-buttons--${layout}${part.unavailableStyle === 'cross' ? ' buy-buttons--cross' : ''}`}
        data-label-add="Add to cart"
        data-label-sold-out="Sold out"
        data-label-unavailable="Unavailable"
        data-label-added="Added"
        data-label-added-status={`${p.title} added to your cart`}
        data-label-error="Couldn't add this to your cart. Please try again."
        data-image={imageFor(current) ?? undefined}
        key={key}
      >
        <form
          method="post"
          action="/cart/add"
          id={`ProductForm-${bid}`}
          acceptCharset="UTF-8"
          className="buy-buttons__form"
          encType="multipart/form-data"
        >
          <input type="hidden" name="form_type" value="product" />
          <input type="hidden" name="utf8" value="✓" />
          {onlyDefault ? (
            <input type="hidden" name="id" value={current.id} />
          ) : (
            <>
              <div className="buy-buttons__options">
                {p.options.map((option, oi) => (
                  <fieldset className="buy-buttons__option" data-option="" key={option.name}>
                    <legend className="buy-buttons__label">{option.name}</legend>
                    <div className="buy-buttons__pills">
                      {option.values.map((value, vi) => {
                        const inputId = `${bid}-${oi}-${vi}`;
                        // Theme: value.variant = the variant with this value and the other chosen values
                        const wantedValues = current.options.map((o, i) => (i === oi ? value : o));
                        const match = p.variants.find((v) => v.options.every((o, i) => o === wantedValues[i]));
                        const state = !match ? 'unavailable' : !match.available ? 'sold-out' : '';
                        const note = state === 'sold-out' ? ' (Sold out)' : state === 'unavailable' ? ' (Unavailable)' : '';
                        let extra = 0;
                        if (part.showPriceDifference !== false) {
                          const prices = p.variants.filter((v) => v.options[oi] === value).map((v) => v.price);
                          if (prices.length) extra = Math.min(...prices) - minPrice;
                        }
                        return (
                          <Fragment key={value}>
                            <input
                              className="buy-buttons__pill-input"
                              type="radio"
                              id={inputId}
                              name={`${bid}-option-${oi}`}
                              value={value}
                              defaultChecked={current.options[oi] === value}
                              data-state={state || undefined}
                              data-option-input=""
                            />
                            <label className="buy-buttons__pill" htmlFor={inputId}>
                              {value}
                              {extra > 0 ? <span className="buy-buttons__pill-extra">{`(+${money(extra)})`}</span> : null}
                              <span className="visually-hidden" data-value-note="">
                                {note}
                              </span>
                            </label>
                          </Fragment>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
              <div className="buy-buttons__select">
                <label className="buy-buttons__label" htmlFor={`Variant-${bid}`}>
                  Variant
                </label>
                <select id={`Variant-${bid}`} name="id" defaultValue={String(current.id)}>
                  {p.variants.map((v) => (
                    <option
                      key={v.id}
                      value={v.id}
                      data-options={v.options.join('||')}
                      data-available={String(v.available)}
                      data-qty-min="1"
                      data-qty-step="1"
                      data-qty-max=""
                      data-image={imageFor(v) ?? undefined}
                      data-media-id={mediaIdFor(v)}
                      disabled={!v.available}
                    >
                      {`${v.title} - ${money(v.price)}${v.available ? '' : ' (Sold out)'}`}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div className="buy-buttons__installments"></div>
          <div className="buy-buttons__row">
            <div className="buy-buttons__quantity">
              <label className="visually-hidden" htmlFor={`Quantity-${bid}`}>
                Quantity
              </label>
              <button type="button" className="buy-buttons__step" data-step="-1" aria-label="Decrease quantity">
                <Icon name="minus" />
              </button>
              <input
                id={`Quantity-${bid}`}
                className="buy-buttons__quantity-input"
                type="number"
                name="quantity"
                min="1"
                step="1"
                defaultValue="1"
                inputMode="numeric"
                aria-describedby={`QuantityRules-${bid}`}
              />
              <button type="button" className="buy-buttons__step" data-step="1" aria-label="Increase quantity">
                <Icon name="plus" />
              </button>
            </div>
            <button type="submit" className={`${submitClass} buy-buttons__submit`} disabled={!current.available} data-submit="">
              {layout === 'inline' ? (
                <span className="buy-buttons__submit-icon" aria-hidden="true">
                  <Icon name="cart" />
                </span>
              ) : null}
              <span data-submit-label="">{current.available ? 'Add to cart' : 'Sold out'}</span>
            </button>
            {layout === 'inline' ? buyNow : null}
          </div>
          {layout !== 'inline' ? buyNow : null}
          <div className="buy-buttons__rules" id={`QuantityRules-${bid}`}></div>
          <p className="buy-buttons__message" role="alert" hidden data-buy-message=""></p>
          <span className="visually-hidden" aria-live="polite" data-buy-status=""></span>
          <input type="hidden" name="product-id" value={p.id} />
          <input type="hidden" name="section-id" value={id} />
        </form>
      </buy-buttons>
    );
  }

  /* ---------- Sticky bar data ---------- */
  const stickyVariants = Object.fromEntries(
    p.variants.map((v) => [String(v.id), { title: v.title, price: money(v.price), available: v.available, image: imageFor(v) }])
  );
  const stickyImage = imageFor(current);

  return (
    <section id={`shopify-section-${id}`} className="shopify-section product-section">
      <product-page
        className={sectionCls}
        style={sectionStyle(
          { paddingTop: common.paddingTop ?? 24, paddingBottom: common.paddingBottom ?? 64 },
          { '--text-boost': (textScale / 100).toFixed(1) }
        )}
        data-product-url={`/products/${p.handle}`}
      >
        <div className="product__inner">
          {showBreadcrumb ? (
            <nav className="breadcrumb product__breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                {breadcrumbParent ? (
                  <li>
                    <a href={breadcrumbParent.url}>{breadcrumbParent.title}</a>
                  </li>
                ) : null}
                <li aria-current="page">{p.title}</li>
              </ol>
            </nav>
          ) : null}
          <div className="product__layout">
            {gallery}
            <div className="product__info">
              {cards.map((card, ci) => (
                <div
                  className={`product-panel product-panel--${card.style ?? 'card'}`}
                  style={{ '--panel-gap': String(card.gap ?? 28) } as React.CSSProperties}
                  key={ci}
                >
                  {card.parts.map((part, pi) => renderPart(part, `${ci}-${pi}`))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {enableLightbox && count > 0 ? (
          <product-lightbox className="product-lightbox">
            <dialog className="product-lightbox__dialog" aria-label={`${p.title}: media viewer`}>
              <div className={`product-lightbox__inner${count === 1 ? ' product-lightbox__inner--single' : ''}`}>
                <p className="product-lightbox__counter">
                  <span aria-hidden="true">
                    <span data-lightbox-current="">1</span> / {count}
                  </span>
                  <span
                    className="visually-hidden"
                    aria-live="polite"
                    data-lightbox-status=""
                    data-template={`Item [index] of ${count}`}
                  ></span>
                </p>
                <button type="button" className="product-lightbox__close" data-lightbox-close="">
                  <span className="visually-hidden">Close the viewer</span>
                  <span className="product-lightbox__icon" aria-hidden="true">
                    <Icon name="close" />
                  </span>
                </button>
                <div className="product-lightbox__stage">
                  {media.map((m) => (
                    <div
                      key={m.id}
                      className="product-lightbox__slide"
                      data-lightbox-slide={m.index}
                      style={{ '--media-ratio': '1.0' } as React.CSSProperties}
                      hidden={m.index !== 0}
                    >
                      <button type="button" className="product-lightbox__zoom" aria-pressed="false" data-lightbox-zoom="">
                        <img
                          src={m.src}
                          alt={m.alt || p.title}
                          width={m.width ?? 2400}
                          height={m.height ?? 2400}
                          loading="lazy"
                          sizes="100vw"
                          className="product-lightbox__image"
                          draggable={false}
                        />
                        <span className="visually-hidden">View full screen</span>
                        <span className="product-lightbox__hint" aria-hidden="true">
                          <span className="product-lightbox__hint-text product-lightbox__hint-text--mouse">
                            Click to view full screen
                          </span>
                          <span className="product-lightbox__hint-text product-lightbox__hint-text--touch">
                            Tap to view full screen
                          </span>
                        </span>
                      </button>
                    </div>
                  ))}
                  {count > 1 ? (
                    <>
                      <button type="button" className="product-lightbox__arrow product-lightbox__arrow--prev" data-lightbox-step="-1">
                        <span className="visually-hidden">Previous item</span>
                        <span className="product-lightbox__icon" aria-hidden="true">
                          <Icon name="chevron-left" />
                        </span>
                      </button>
                      <button type="button" className="product-lightbox__arrow product-lightbox__arrow--next" data-lightbox-step="1">
                        <span className="visually-hidden">Next item</span>
                        <span className="product-lightbox__icon" aria-hidden="true">
                          <Icon name="chevron-right" />
                        </span>
                      </button>
                    </>
                  ) : null}
                </div>
                {count > 1 ? (
                  <div className="product-lightbox__thumbs">
                    {[0, 1, 2].map((column) => (
                      <div className={`product-lightbox__thumb-column product-lightbox__thumb-column--${column + 1}`} key={column}>
                        {media
                          .filter((m) => m.index % 3 === column)
                          .map((m) => (
                            <button
                              type="button"
                              key={m.id}
                              className="product-lightbox__thumb"
                              style={{ '--media-ratio': '1.0' } as React.CSSProperties}
                              data-lightbox-thumb={m.index}
                              aria-label={`Show item ${m.index + 1} of ${count}`}
                              aria-current={m.index === 0 ? 'true' : undefined}
                            >
                              <img
                                src={m.src}
                                alt=""
                                width="400"
                                height="400"
                                loading="lazy"
                                sizes="(min-width: 990px) 10vw, 120px"
                                className="product-lightbox__thumb-image"
                              />
                            </button>
                          ))}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </dialog>
          </product-lightbox>
        ) : null}

        {showStickyBar ? (
          <product-sticky-bar
            className="product-sticky-bar"
            role="region"
            aria-label={`${p.title}: quick buy`}
            data-label-add="Add to cart"
            data-label-sold-out="Sold out"
            data-label-unavailable="Unavailable"
            data-label-added="Added"
            data-quantity-label="Qty [quantity]"
            inert
          >
            {stickyMinimize ? (
              <button type="button" className="product-sticky-bar__mini" aria-label="Open the quick buy bar" data-sticky-expand="">
                <span aria-hidden="true">
                  <Icon name="cart" />
                </span>
              </button>
            ) : null}
            <div className="product-sticky-bar__inner">
              <div className="product-sticky-bar__product">
                <div className="product-sticky-bar__media">
                  {stickyImage ? (
                    <img src={stickyImage} alt="" width="180" height="180" loading="lazy" sizes="5rem" className="product-sticky-bar__image" />
                  ) : null}
                </div>
                <div className="product-sticky-bar__text">
                  {p.type ? <p className="product-sticky-bar__type">{p.type}</p> : null}
                  <p className="product-sticky-bar__title">{p.title}</p>
                  <p className="product-sticky-bar__meta">
                    {!onlyDefault ? (
                      <>
                        <span data-sticky-variant="">{current.title}</span>
                        <span aria-hidden="true"> · </span>
                      </>
                    ) : null}
                    <span data-sticky-quantity="">Qty 1</span>
                  </p>
                </div>
              </div>
              <p className="product-sticky-bar__price" data-sticky-price="">
                {money(current.price)}
              </p>
              <div className="product-sticky-bar__buttons">
                <button
                  type="button"
                  className="button button--secondary product-sticky-bar__add"
                  data-sticky-add=""
                  disabled={!current.available}
                >
                  <span className="product-sticky-bar__icon" aria-hidden="true">
                    <Icon name="cart" />
                  </span>
                  <span data-sticky-add-label="">{current.available ? 'Add to cart' : 'Sold out'}</span>
                </button>
                <button type="button" className="button product-sticky-bar__buy" data-sticky-buy="" disabled={!current.available}>
                  <span className="product-sticky-bar__icon" aria-hidden="true">
                    <Icon name="buy-now" />
                  </span>
                  <span>Buy now</span>
                </button>
                {stickyMinimize ? (
                  <button
                    type="button"
                    className="product-sticky-bar__minimize"
                    aria-label="Minimise the quick buy bar"
                    data-sticky-minimize=""
                  >
                    <span aria-hidden="true">
                      <Icon name="chevron" />
                    </span>
                  </button>
                ) : null}
              </div>
            </div>
            <script type="application/json" data-sticky-variants="" dangerouslySetInnerHTML={{ __html: scriptJson(stickyVariants) }} />
          </product-sticky-bar>
        ) : null}
      </product-page>
    </section>
  );
}
