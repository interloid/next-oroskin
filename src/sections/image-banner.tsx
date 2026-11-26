/**
 * Image banner (theme: sections/image-banner.liquid + blocks/_banner-content, _highlight-cards,
 * _highlight-card, _trending-sheet, countdown). A full-width photo with an overlay, content blocks on
 * the left, glass highlight cards and / or a countdown on the right, and an optional Trending sheet:
 * <image-banner> (theme JS) then pins the section and slides the sheet in over the photo.
 * One component for both homepage uses: "Manifesto + Trending sheet" and "Promo banner".
 */
import Countdown, { type CountdownProps } from '@/components/Countdown';
import ContentBlocks, { type ContentBlockData } from '@/components/ContentBlocks';
import Icon from '@/components/Icon';
import TrendingList from '@/components/TrendingList';
import type { PageContext } from '@/components/PageRenderer';
import { api } from '@/lib/api';
import type { Product } from '@/lib/types';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ImageBannerProps extends SectionCommon {
  image?: { src: string; alt?: string; width?: number; height?: number };
  height?: 'full' | 'large' | 'medium' | 'small';
  overlayStyle?: 'gradient' | 'even';
  overlayOpacity?: number; // 0–100
  animation?: 'none' | 'fade-up' | 'slide-right' | 'slide-left' | 'slide-bottom' | 'zoom-in';
  /** Scroll scene with the Trending sheet: how the content leaves, and whether the sheet header slides in. */
  sceneStyle?: 'sideways' | 'vertical';
  headerSlide?: boolean;
  /** Left column: headings, texts and buttons in order. */
  content?: { gap?: number; maxWidth?: number; blocks: ContentBlockData[] };
  /** Right column: glass cards and / or a countdown. */
  cards?: {
    radius?: number;
    duration?: number; // ms
    stagger?: number; // ms
    animation?: 'none' | 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom';
    items?: { icon?: string; label?: string; value?: string; link?: string }[]; // icon = public/assets/icon-<name>.svg
    countdown?: CountdownProps;
  };
  /** The Trending sheet: products from a collection handle, or a list of product handles. */
  trending?: {
    heading?: string; // inline HTML
    linkLabel?: string;
    link?: string; // default the collection's page
    collection?: string;
    products?: string[];
    limit?: number; // default 5, at most 8
    phoneLimit?: number;
    width?: number; // % from 1200px
    tabletWidth?: number;
    phoneWidth?: number;
    sceneLength?: number; // % of the screen height the scene scrolls
    headingSize?: number;
    titleSize?: number;
  };
}

async function trendingProducts(t: NonNullable<ImageBannerProps['trending']>): Promise<Product[]> {
  const limit = Math.min(t.limit ?? 5, 8);
  if (t.products?.length) return (await api.products(t.products)).slice(0, limit);
  if (t.collection) return ((await api.collection(t.collection))?.products ?? []).slice(0, limit);
  return [];
}

export default async function ImageBanner({
  id,
  image,
  height = 'medium',
  overlayStyle = 'gradient',
  overlayOpacity = 45,
  animation = 'fade-up',
  sceneStyle = 'sideways',
  headerSlide = true,
  content,
  cards,
  trending,
  context,
  ...common
}: ImageBannerProps & { id: string; context?: PageContext }) {
  const first = context?.index === 0;
  const reveal = first ? 'none' : animation;
  const sheetProducts = trending ? await trendingProducts(trending) : [];
  const cardItems = (cards?.items ?? []).filter((c) => c.label || c.value);
  const cardsAnimation = cards?.animation ?? 'slide-left';

  return (
    <div id={`section-${id}`} className="shopify-section">
      <image-banner
        className={`image-banner full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-5'} image-banner--${height} image-banner--overlay-${overlayStyle}`}
        style={{ '--banner-overlay': String(overlayOpacity / 100), ...sectionStyle(common), '--p': '0' } as React.CSSProperties}
        data-scene=""
        data-scene-style={sceneStyle}
        {...(headerSlide ? { 'data-sheet-header': '' } : {})}
      >
        <div className="image-banner__track">
          <div className="image-banner__stage">
            <div className="image-banner__media">
              {image ? (
                <div className="image image--cover">
                  <img
                    src={image.src}
                    alt={image.alt ?? ''}
                    width={image.width}
                    height={image.height}
                    loading={first ? 'eager' : 'lazy'}
                    sizes="100vw"
                    fetchPriority={first ? 'high' : 'auto'}
                  />
                </div>
              ) : null}
            </div>
            <div className="image-banner__overlay" aria-hidden="true"></div>
            <animate-on-scroll className="image-banner__inner">
              <div className="image-banner__content" {...(reveal !== 'none' ? { 'data-animate': reveal } : {})}>
                <div
                  className="banner-content"
                  style={
                    {
                      '--banner-content-gap': `${content?.gap ?? 32}px`,
                      '--banner-content-width': `${content?.maxWidth ?? 780}px`,
                    } as React.CSSProperties
                  }
                >
                  <ContentBlocks blocks={content?.blocks ?? []} />
                </div>
              </div>
              <div className="image-banner__cards">
                <div
                  className="highlight-cards"
                  style={
                    {
                      '--highlight-card-radius': `${cards?.radius ?? 24}px`,
                      '--slide-duration': `${cards?.duration ?? 900}ms`,
                      '--slide-stagger': `${cards?.stagger ?? 150}ms`,
                    } as React.CSSProperties
                  }
                  {...(cardsAnimation !== 'none' ? { 'data-animate': cardsAnimation } : {})}
                >
                  {cardItems.map((c, i) => {
                    const inner = (
                      <>
                        {c.icon && c.icon !== 'none' ? (
                          <span className="highlight-card__icon">
                            <Icon name={c.icon} />
                          </span>
                        ) : null}
                        <span className="highlight-card__text">
                          {c.label ? <span className="highlight-card__label">{c.label}</span> : null}
                          {c.value ? <span className="highlight-card__value">{c.value}</span> : null}
                        </span>
                      </>
                    );
                    return c.link ? (
                      <a className="highlight-card" href={c.link} key={i}>
                        {inner}
                      </a>
                    ) : (
                      <div className="highlight-card" key={i}>
                        {inner}
                      </div>
                    );
                  })}
                  {cards?.countdown ? <Countdown {...cards.countdown} /> : null}
                </div>
              </div>
            </animate-on-scroll>
            {trending && sheetProducts.length ? (
              <div
                className="banner-sheet"
                style={
                  {
                    '--sheet-width': `${trending.width ?? 50}%`,
                    '--sheet-width-tablet': `${trending.tabletWidth ?? 70}%`,
                    '--sheet-width-phone': `${trending.phoneWidth ?? 80}%`,
                  } as React.CSSProperties
                }
                data-banner-sheet=""
                data-scene-length={String(trending.sceneLength ?? 250)}
              >
                <TrendingList
                  products={sheetProducts}
                  phoneLimit={trending.phoneLimit}
                  heading={trending.heading}
                  linkLabel={trending.linkLabel}
                  link={trending.link ?? (trending.collection ? `/collections/${trending.collection}` : undefined)}
                  headingSize={trending.headingSize}
                  titleSize={trending.titleSize}
                />
              </div>
            ) : null}
          </div>
        </div>
      </image-banner>
    </div>
  );
}
