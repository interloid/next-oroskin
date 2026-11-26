/**
 * Hero = "Product scene showcase" (theme: sections/hero.liquid + blocks/_hero-content, _hero-decorations,
 * _hero-decoration, _hero-products, _hero-product and the shared heading / text / button / image / group blocks).
 * Full-width photo, content on the left, floating decorations, cut-out product photos on the right.
 * <hero-showcase> (theme JS) rotates the products and the brush word of the heading with italic style "brush".
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import type { SectionCommon } from '@/sections/shared';

export interface HeroImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

/** Heading block (theme: blocks/heading.liquid). `text` may contain <em> (accent italic or brush word). */
export interface HeroHeading {
  kind: 'heading';
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  size?: 'display-xl' | 'display' | 'h1' | 'h2' | 'h3' | 'h4';
  font?: 'accent' | 'heading' | 'body';
  color?: 'default' | 'accent' | 'faded';
  italic?: 'accent' | 'brush';
  align?: 'left' | 'center' | 'right';
  indent?: number; // em
}

/** Text block (theme: blocks/text.liquid). `html` = rich text. */
export interface HeroText {
  kind: 'text';
  html: string;
  size?: 'body-lg' | 'body' | 'body-sm';
  font?: 'body' | 'heading' | 'accent';
  color?: 'default' | 'accent' | 'faded';
  align?: 'left' | 'center' | 'right';
  maxWidth?: string; // CSS length, e.g. "40ch"
  hideOnPhones?: boolean;
}

/** Button block (theme: blocks/button.liquid). */
export interface HeroButton {
  kind: 'button';
  label: string;
  url?: string;
  style?: 'primary' | 'glass' | 'secondary' | 'text';
  arrow?: boolean; // default: true for the text style
  align?: 'left' | 'center' | 'right';
}

/** Image block (theme: blocks/image.liquid), e.g. the logo mark. */
export interface HeroImageBlock {
  kind: 'image';
  image: HeroImage;
  widthPercent?: number;
  ratio?: 'original' | 'square' | 'portrait' | 'landscape';
  radius?: 'none' | 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
  focalPoint?: string; // CSS object-position
}

/** Group block (theme: blocks/group.liquid). */
export interface HeroGroup {
  kind: 'group';
  direction?: 'vertical' | 'horizontal';
  gap?: number;
  padding?: number;
  align?: 'flex-start' | 'center' | 'flex-end';
  valign?: 'flex-start' | 'center' | 'flex-end';
  items: (HeroHeading | HeroText | HeroButton | HeroImageBlock)[];
}

export type HeroContentItem = HeroHeading | HeroText | HeroButton | HeroImageBlock | HeroGroup;

/** Decoration (theme: blocks/_hero-decoration.liquid). Positions in % of the content area. */
export interface HeroDecoration {
  kind:
    | 'compact'
    | 'perfume'
    | 'perfume-round'
    | 'lipstick'
    | 'brush'
    | 'palette'
    | 'bottle'
    | 'magnolia'
    | 'sparkle'
    | 'star';
  color?: 'muted' | 'white' | 'accent' | 'text';
  animation?: 'none' | 'breathe' | 'float' | 'sway' | 'twinkle' | 'spin' | 'rock' | 'flash';
  x: number;
  y: number;
  size: number;
  rotate?: number;
  opacity?: number; // 0-100
  layer?: number; // 1-9 behind the text, 11-20 in front
  speed?: number; // s
  delay?: number; // s
  showOnPhones?: boolean;
  mobileX?: number;
  mobileY?: number;
  mobileSize?: number;
}

/** Cut-out product photo (theme: blocks/_hero-product.liquid). Positions in % of the products area. */
export interface HeroProduct {
  image: HeroImage;
  label?: string; // name tag (also the alt fallback)
  brushWord?: string; // word swapped into the brush heading while this product is shown
  url?: string;
  x: number;
  y: number;
  width: number;
  rotate?: number;
  labelX?: number;
  labelY?: number;
  mobileX?: number;
  mobileY?: number;
  mobileWidth?: number;
  mobileLabelX?: number;
  mobileLabelY?: number;
}

export interface HeroProps extends SectionCommon {
  image?: HeroImage;
  mobileImage?: HeroImage; // tall image below 1024px; switches the mobile layout on
  height?: 'full' | 'large' | 'medium' | 'auto';
  contentX?: 'start' | 'center' | 'end';
  contentY?: 'start' | 'center' | 'end';
  textScaling?: 'screen' | 'fixed';
  contentSpacing?: 'between' | 'tight';
  overlay?: number; // %
  contentWidth?: number;
  contentGap?: number;
  productsStart?: number; // % where the products area begins
  mobileProductsStart?: number;
  mobileTextWidth?: number; // %
  rotateProducts?: boolean;
  rotateInterval?: number; // s
  resumeDelay?: number; // s
  content?: HeroContentItem[];
  decorations?: HeroDecoration[];
  products?: HeroProduct[];
}

const MASKS: Partial<Record<HeroDecoration['kind'], [string, string]>> = {
  compact: ['deco-compact.png', '200 / 240'],
  perfume: ['deco-perfume.png', '240 / 231'],
  'perfume-round': ['deco-perfume-round.png', '218 / 240'],
  lipstick: ['deco-lipstick.png', '240 / 228'],
  brush: ['deco-brush.png', '240 / 238'],
  palette: ['deco-palette.png', '240 / 232'],
  bottle: ['deco-bottle.png', '240 / 174'],
};

type Css = React.CSSProperties;

function HeadingBlock({ h }: { h: HeroHeading }) {
  const Tag = h.tag ?? 'p';
  return (
    <Tag
      className={`heading heading--${h.size ?? 'h2'} heading--${h.font ?? 'heading'}-font heading--${h.color ?? 'default'} heading--align-${h.align ?? 'left'} heading--italic-${h.italic ?? 'accent'}`}
      style={{ '--heading-indent': String(h.indent ?? 0) } as Css}
      dangerouslySetInnerHTML={{ __html: h.text }}
    />
  );
}

function TextBlock({ t }: { t: HeroText }) {
  return (
    <div
      className={`text rte text--${t.size ?? 'body'} text--${t.font ?? 'body'}-font text--${t.color ?? 'default'} text--align-${t.align ?? 'left'}${t.hideOnPhones ? ' text--hide-phones' : ''}`}
      style={{ '--text-max-width': t.maxWidth ?? 'none' } as Css}
      dangerouslySetInnerHTML={{ __html: t.html }}
    />
  );
}

function ButtonBlock({ b }: { b: HeroButton }) {
  const style = b.style && b.style !== 'primary' ? ` button--${b.style}` : '';
  const arrow = b.arrow ?? b.style === 'text';
  return (
    <a
      className={`button${style} button-block button-block--${b.align ?? 'left'}`}
      {...(b.url ? { href: b.url } : { role: 'link', 'aria-disabled': true })}
    >
      {b.label}
      {arrow ? (
        <span className="button-block__icon">
          <Icon name="arrow" />
        </span>
      ) : null}
    </a>
  );
}

function ImageBlock({ i, eager }: { i: HeroImageBlock; eager: boolean }) {
  const w = i.widthPercent ?? 100;
  return (
    <div
      className={`image-block image-block--${i.ratio ?? 'original'} image-block--radius-${i.radius ?? 'none'} image-block--align-${i.align ?? 'left'}`}
      style={{ '--image-block-width': `${w}%` } as Css}
    >
      <div className="image ">
        <img
          src={i.image.src}
          alt={i.image.alt ?? ''}
          width={i.image.width}
          height={i.image.height}
          loading={eager ? 'eager' : 'lazy'}
          sizes={`(min-width: 1650px) ${Math.round((1650 * w) / 100)}px, ${w}vw`}
          style={i.focalPoint ? { objectPosition: i.focalPoint } : undefined}
        />
      </div>
    </div>
  );
}

function ContentItem({ item, eager }: { item: HeroContentItem; eager: boolean }) {
  switch (item.kind) {
    case 'heading':
      return <HeadingBlock h={item} />;
    case 'text':
      return <TextBlock t={item} />;
    case 'button':
      return <ButtonBlock b={item} />;
    case 'image':
      return <ImageBlock i={item} eager={eager} />;
    case 'group':
      return (
        <div
          className={`group group--${item.direction ?? 'vertical'}`}
          style={
            {
              '--group-gap': `${item.gap ?? 0}px`,
              '--group-padding': `${item.padding ?? 0}px`,
              '--group-align': item.align ?? 'flex-start',
              '--group-valign': item.valign ?? 'center',
            } as Css
          }
        >
          {item.items.map((child, n) => (
            <ContentItem item={child} eager={eager} key={n} />
          ))}
        </div>
      );
  }
}

function Decoration({ d, eager }: { d: HeroDecoration; eager: boolean }) {
  const mask = MASKS[d.kind];
  const opacity = (d.opacity ?? 100) / 100;
  return (
    <div
      className={`hero-decoration hero-decoration--${d.color ?? 'muted'} hero-decoration--anim-${d.animation ?? 'none'}${d.showOnPhones ? ' hero-decoration--phone' : ''}`}
      style={
        {
          '--deco-x': `${d.x}%`,
          '--deco-y': `${d.y}%`,
          '--deco-size': String(d.size),
          '--deco-rotate': `${d.rotate ?? 0}deg`,
          '--deco-opacity': Number.isInteger(opacity) ? opacity.toFixed(1) : String(opacity),
          '--deco-layer': String(d.layer ?? 5),
          '--deco-speed': `${d.speed ?? 4}s`,
          '--deco-delay': `${d.delay ?? 0}s`,
          '--deco-mx': `${d.mobileX ?? 50}%`,
          '--deco-my': `${d.mobileY ?? 50}%`,
          '--deco-msize': String(d.mobileSize ?? 32),
        } as Css
      }
      aria-hidden="true"
    >
      {mask ? (
        <span
          className="hero-decoration__art hero-decoration__mask"
          style={{ '--deco-mask': `url('/assets/${mask[0]}')`, aspectRatio: mask[1] } as Css}
        ></span>
      ) : d.kind === 'magnolia' ? (
        <img
          className="hero-decoration__art"
          src="/assets/hero-magnolia.webp"
          alt=""
          width="249"
          height="247"
          loading={eager ? 'eager' : 'lazy'}
        />
      ) : (
        <span className="hero-decoration__art">
          <Icon name={d.kind === 'star' ? 'star' : 'sparkle'} />
        </span>
      )}
    </div>
  );
}

function Product({
  p,
  productsStart,
  hasMobile,
  eager,
}: {
  p: HeroProduct;
  productsStart: number;
  hasMobile: boolean;
  eager: boolean;
}) {
  const label = p.label?.trim() ?? '';
  const word = p.brushWord?.trim() ?? '';
  const alt = p.image.alt || label || (p.url ? 'Shop now' : '');
  const desktopVw = Math.floor((p.width * (100 - productsStart)) / 100) + 2;
  const sizes = `${hasMobile ? `(max-width: 1023px) ${p.mobileWidth ?? p.width}vw, ` : ''}${desktopVw}vw`;
  const img = (
    <img
      src={p.image.src}
      alt={alt}
      width={p.image.width}
      height={p.image.height}
      loading={hasMobile && eager ? 'eager' : 'lazy'}
      sizes={sizes}
      fetchPriority="auto"
    />
  );
  return (
    <div
      className="hero-product"
      style={
        {
          '--hero-product-x': `${p.x}%`,
          '--hero-product-y': `${p.y}%`,
          '--hero-product-width': `${p.width}%`,
          '--hero-product-rotate': `${p.rotate ?? 0}deg`,
          '--hero-label-x': `${p.labelX ?? -4}%`,
          '--hero-label-y': `${p.labelY ?? 50}%`,
          '--hero-product-mx': `${p.mobileX ?? p.x}%`,
          '--hero-product-my': `${p.mobileY ?? p.y}%`,
          '--hero-product-mw': `${p.mobileWidth ?? p.width}%`,
          '--hero-label-mx': `${p.mobileLabelX ?? p.labelX ?? -4}%`,
          '--hero-label-my': `${p.mobileLabelY ?? p.labelY ?? 50}%`,
        } as Css
      }
      {...(label || word ? { 'data-hero-product': '', 'data-brush-word': word } : {})}
    >
      {label ? (
        <span className="hero-product__label" aria-hidden="true">
          <span className="hero-product__label-text">{label}</span>
          <span className="hero-product__label-arrow">
            <Icon name="arrow" />
          </span>
        </span>
      ) : null}
      {p.url ? (
        <a className="image hero-product__image" href={p.url}>
          {img}
        </a>
      ) : (
        <div className="image hero-product__image">{img}</div>
      )}
    </div>
  );
}

export default function Hero({
  id,
  context,
  image,
  mobileImage,
  height = 'full',
  contentX = 'start',
  contentY = 'center',
  textScaling = 'screen',
  contentSpacing = 'between',
  overlay = 0,
  contentWidth = 700,
  contentGap = 24,
  productsStart = 45,
  mobileProductsStart = 46,
  mobileTextWidth = 100,
  rotateProducts = true,
  rotateInterval = 4,
  resumeDelay = 2.5,
  content = [
    { kind: 'heading', tag: 'h1', size: 'display', text: 'Your <em>headline</em>' },
    { kind: 'button', label: 'Shop now', url: '/collections', style: 'glass' },
  ],
  decorations = [],
  products = [],
  ...common
}: HeroProps & { id: string; context?: PageContext }) {
  const first = (context?.index ?? 0) === 0;
  const loading = first ? 'eager' : 'lazy';
  const mobileVars: Record<string, string> = mobileImage
    ? {
        '--hero-m-ratio': String(mobileImage.width / mobileImage.height),
        '--hero-m-start': String(mobileProductsStart),
        '--hero-m-text-width': `${mobileTextWidth}%`,
      }
    : {};
  const bg = image ?? mobileImage;

  return (
    <div id={`section-${id}`} className="shopify-section">
      <hero-showcase
        className={`hero full-width section-width--${common.width ?? 'full'} color-${common.colorScheme ?? 'scheme-1'} hero--height-${height} hero--x-${contentX} hero--y-${contentY} hero--scale-${textScaling} hero--spacing-${contentSpacing}${mobileImage ? ' hero--has-mobile' : ''}`}
        data-rotate={String(rotateProducts)}
        data-interval={String(rotateInterval * 1000)}
        data-resume={(resumeDelay * 1000).toFixed(1)}
        style={
          {
            '--hero-overlay': `${overlay}%`,
            '--hero-content-width': String(contentWidth),
            '--hero-products-start': `${productsStart}%`,
            '--hero-pad-top': String(common.paddingTop ?? 0),
            '--hero-pad-bottom': String(common.paddingBottom ?? 0),
            '--hero-pad-side': '90',
            '--hero-content-gap': `calc(${contentGap} * var(--hero-px))`,
            ...mobileVars,
          } as Css
        }
      >
        <div className="hero__media">
          {bg ? (
            mobileImage ? (
              <picture className="image image--cover">
                <source
                  media="(max-width: 1023px)"
                  srcSet={`${mobileImage.src} ${mobileImage.width}w`}
                  sizes="100vw"
                  width={mobileImage.width}
                  height={mobileImage.height}
                />
                <img
                  src={bg.src}
                  alt=""
                  width={bg.width}
                  height={bg.height}
                  loading={loading}
                  sizes="100vw"
                  fetchPriority={first ? 'high' : 'auto'}
                />
              </picture>
            ) : (
              <div className="image image--cover">
                <img
                  src={bg.src}
                  alt=""
                  width={bg.width}
                  height={bg.height}
                  loading={loading}
                  sizes="100vw"
                  fetchPriority={first ? 'high' : 'auto'}
                />
              </div>
            )
          ) : null}
        </div>
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero-content">
              {content.map((item, n) => (
                <ContentItem item={item} eager={first} key={n} />
              ))}
            </div>
            {decorations.length ? (
              <div className="hero-decorations">
                {decorations.map((d, n) => (
                  <Decoration d={d} eager={first} key={n} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {products.length ? (
          <div className="hero__products">
            <div className="hero-products">
              {products.map((p, n) => (
                <Product p={p} productsStart={productsStart} hasMobile={!!mobileImage} eager={first} key={n} />
              ))}
            </div>
          </div>
        ) : null}
        <button type="button" className="hero__pause" aria-pressed="false" hidden>
          <span className="visually-hidden">Pause animation</span>
          <svg
            className="hero__pause-icon hero__pause-icon--pause"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
            <rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor"></rect>
          </svg>
          <svg
            className="hero__pause-icon hero__pause-icon--play"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 16 16"
            width="16"
            height="16"
          >
            <path
              d="M4.5 2.8v10.4a.8.8 0 0 0 1.2.7l8.4-5.2a.8.8 0 0 0 0-1.4L5.7 2.1a.8.8 0 0 0-1.2.7z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </hero-showcase>
    </div>
  );
}
