/**
 * Scrolling showcase (theme: sections/scrolling-showcase.liquid): a centred eyebrow and one large sentence with
 * short codes: [images] = the stack of up to 3 small photos, [arrow] = the double arrow, [break] = a desktop line
 * break. Italic (<em>) shows in the highlight colour. Not the first section: <scrolling-showcase> (theme JS) pins it
 * while a gold band rises with a white copy of the text and three large photo cards.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { PageContext } from '@/components/PageRenderer';
import { type SectionCommon } from '@/sections/shared';

export interface ShowcaseSmallPhoto {
  src: string;
  width: number;
  height: number;
  alt?: string;
  url?: string; // optional link
  linkLabel?: string; // name of the link (alt → "Shop now" fallback)
}

export interface ShowcaseCard {
  src: string;
  width: number;
  height: number;
  x: number; // % across the stage
  y: number; // % down the stage
  widthPercent: number; // card width from 1200px (% of the screen)
  tilt?: number; // deg
}

export interface ScrollingShowcaseProps extends SectionCommon {
  eyebrow?: string;
  /** HTML (inline): may contain <em>, [images], [arrow], [break]. */
  text?: string;
  photos?: ShowcaseSmallPhoto[]; // max 3
  highlightColor?: string;
  animation?: 'none' | 'fade-up' | 'zoom-in';
  /** Gold scroll effect */
  scene?: boolean;
  sceneLength?: number; // % of the screen height per step
  sceneTextColor?: string;
  sceneArrowColor?: string;
  sceneSmoothing?: 'none' | 'light' | 'extra';
  cards?: ShowcaseCard[]; // max 3
  phoneCardWidth?: number; // %
  tabletCardWidth?: number; // %
}

let arrowSvg: string | undefined;
function arrow(): string {
  if (arrowSvg === undefined) {
    const p = path.join(process.cwd(), 'public/assets/icon-arrow-double.svg');
    arrowSvg = fs.existsSync(p) ? fs.readFileSync(p, 'utf8').trim() : '';
  }
  return arrowSvg;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function photosHtml(photos: ShowcaseSmallPhoto[]): string {
  const items = photos.slice(0, 3).map((p) => {
    const name = p.url ? p.linkLabel || p.alt || 'Shop now' : '';
    const img = `<img src="${esc(p.src)}" alt="${esc(name)}" width="${p.width}" height="${p.height}" loading="lazy" sizes="92px">`;
    return p.url
      ? `<a class="scrolling-showcase__image scrolling-showcase__image--link" href="${esc(p.url)}">${img}</a>`
      : `<span class="scrolling-showcase__image">${img}</span>`;
  });
  return items.length ? `<span class="scrolling-showcase__images">${items.join('')}</span>` : '';
}

export default function ScrollingShowcase({
  id,
  context,
  eyebrow = 'Find your glow here',
  text = 'All the [images] products you [break]need [arrow], right at [break]our shop<em>!!!</em>',
  photos = [],
  highlightColor = '#c8a24b',
  animation = 'fade-up',
  scene = true,
  sceneLength = 300,
  sceneTextColor = '#ffffff',
  sceneArrowColor = '#1f1f1f',
  sceneSmoothing = 'extra',
  cards = [],
  phoneCardWidth = 50,
  tabletCardWidth = 40,
  ...common
}: ScrollingShowcaseProps & { id: string; context?: PageContext }) {
  if (!text && !eyebrow) return null;
  const isFirst = (context?.index ?? 0) === 0;
  const sceneOn = scene && !isFirst;
  const anim = isFirst || sceneOn ? 'none' : animation;

  const html = text
    .replaceAll('[images]', photosHtml(photos))
    .replaceAll('[arrow]', `<span class="scrolling-showcase__arrow">${arrow()}</span>`)
    .replaceAll('[break]', '<br class="scrolling-showcase__break">');

  return (
    <div id={`section-${id}`} className="shopify-section">
      <scrolling-showcase
        className={`scrolling-showcase full-width section-width--${common.width ?? 'wide'} color-${common.colorScheme ?? 'scheme-1'}`}
        style={
          {
            '--section-padding-top': `${common.paddingTop ?? 96}px`,
            '--section-padding-bottom': `${common.paddingBottom ?? 160}px`,
            '--showcase-highlight': highlightColor,
            '--scene-length': String(sceneLength),
            '--scene-text': sceneTextColor,
            '--scene-arrow': sceneArrowColor,
            '--phone-card-width': `${phoneCardWidth}%`,
            '--tablet-card-width': `${tabletCardWidth}%`,
            '--p': '0',
          } as React.CSSProperties
        }
        {...(sceneOn ? { 'data-scene': '', 'data-smoothing': sceneSmoothing } : {})}
      >
        <div className="scrolling-showcase__track">
          <div className="scrolling-showcase__stage">
            <animate-on-scroll className="scrolling-showcase__inner scrolling-showcase__layer">
              {eyebrow ? (
                <p
                  className="eyebrow eyebrow--center scrolling-showcase__eyebrow"
                  {...(anim !== 'none' ? { 'data-animate': anim } : {})}
                >
                  {eyebrow}
                </p>
              ) : null}
              {text ? (
                <h2
                  className="scrolling-showcase__title"
                  {...(anim !== 'none'
                    ? { 'data-animate': anim, style: { '--animate-delay': '120ms' } as React.CSSProperties }
                    : {})}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : null}
            </animate-on-scroll>
            {sceneOn ? (
              <>
                <div className="scrolling-showcase__band" aria-hidden="true"></div>
                <div className="scrolling-showcase__photos" aria-hidden="true">
                  {cards.slice(0, 3).map((c, n) => (
                    <div
                      className={`scrolling-showcase__photo scrolling-showcase__photo--${n + 1}`}
                      style={
                        {
                          '--x': `${c.x}%`,
                          '--y': `${c.y}%`,
                          '--w': `${c.widthPercent}%`,
                          '--tilt': String(c.tilt ?? 0),
                        } as React.CSSProperties
                      }
                      key={n}
                    >
                      <img
                        src={c.src}
                        alt=""
                        width={c.width}
                        height={c.height}
                        loading="lazy"
                        sizes={`(min-width: 1200px) ${c.widthPercent}vw, (min-width: 750px) ${tabletCardWidth}vw, ${phoneCardWidth}vw`}
                      />
                    </div>
                  ))}
                </div>
                <div
                  className="scrolling-showcase__inner scrolling-showcase__layer scrolling-showcase__band-text"
                  aria-hidden="true"
                  inert
                >
                  {eyebrow ? <p className="eyebrow eyebrow--center scrolling-showcase__eyebrow">{eyebrow}</p> : null}
                  {text ? <div className="scrolling-showcase__title" dangerouslySetInnerHTML={{ __html: html }} /> : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </scrolling-showcase>
    </div>
  );
}
