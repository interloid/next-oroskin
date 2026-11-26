/**
 * About chapters (theme: sections/about-chapters.liquid + blocks/_chapter.liquid): full-bleed chapters, one
 * screen each, photo or looping video behind a label, heading, text and one figure. <about-chapters> (theme JS)
 * moves the media into the sticky layer, builds the side nav and the video pause button.
 */
import { aboutScreenVars, PauseIcons, type AboutImage, type AboutScreenOptions } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import type { SectionCommon } from '@/sections/shared';

export interface AboutChapter {
  id: string; // anchor part: Chapter-<id>
  label?: string;
  heading?: string;
  text?: string; // HTML
  statValue?: string;
  statLabel?: string;
  image?: AboutImage;
  /** Looping background video (mp4) with its poster; wins over the image. */
  video?: { src: string; poster: string };
}

export interface AboutChaptersProps extends Pick<SectionCommon, 'colorScheme'>, AboutScreenOptions {
  textColor?: string;
  labelColor?: string;
  overlayOpacity?: number; // %
  chapters: AboutChapter[];
}

export default function AboutChapters({
  id,
  textColor = '#ffffff',
  labelColor,
  overlayOpacity = 100,
  chapters,
  ...common
}: AboutChaptersProps & { id: string; context?: PageContext }) {
  if (!chapters?.length) return null;
  const hasVideo = chapters.some((c) => c.video);
  const overlay = overlayOpacity / 100;
  return (
    <div id={`section-${id}`} className="shopify-section">
      <about-chapters
        className={`about-chapters full-width${(common.scaleScreen ?? true) ? ' section--screen-scale' : ''}`}
        style={
          {
            '--chapter-text': textColor,
            ...(labelColor ? { '--chapter-accent': labelColor } : {}),
            '--chapter-overlay': Number.isInteger(overlay) ? overlay.toFixed(1) : String(overlay),
            ...aboutScreenVars(common),
          } as React.CSSProperties
        }
      >
        <div className="about-chapters__media" aria-hidden="true"></div>
        <nav className="about-chapters__nav" aria-label="Chapters" hidden>
          <ol className="about-chapters__nav-list"></ol>
        </nav>
        {hasVideo ? (
          <div className="about-chapters__controls">
            <button type="button" className="about-chapters__pause" aria-pressed="false" hidden>
              <span className="visually-hidden">Pause the videos</span>
              <PauseIcons prefix="about-chapters__pause-icon" />
            </button>
          </div>
        ) : null}
        <div className="about-chapters__list">
          {chapters.map((c) => (
            <article className="chapter" id={`Chapter-${c.id}`} key={c.id}>
              <div className="chapter__media" aria-hidden="true">
                {c.video ? (
                  <video playsInline className="chapter__video" muted loop preload="none" poster={c.video.poster}>
                    <source src={c.video.src} type="video/mp4" />
                    <img alt="" loading="lazy" src={c.video.poster} />
                  </video>
                ) : c.image ? (
                  <div className="image image--cover">
                    <img
                      src={c.image.src}
                      alt=""
                      width={c.image.width}
                      height={c.image.height}
                      loading="lazy"
                      sizes="100vw"
                      fetchPriority="auto"
                    />
                  </div>
                ) : null}
              </div>
              <div className="chapter__content">
                {c.label ? <p className="chapter__label">{c.label}</p> : null}
                {c.heading ? <h2 className="chapter__heading">{c.heading}</h2> : null}
                {c.text ? <div className="chapter__text" dangerouslySetInnerHTML={{ __html: c.text }} /> : null}
                {c.statValue ? (
                  <p className="chapter__stat">
                    <span className="chapter__stat-value">{c.statValue}</span>
                    {c.statLabel ? <span className="chapter__stat-label">{c.statLabel}</span> : null}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </about-chapters>
    </div>
  );
}
