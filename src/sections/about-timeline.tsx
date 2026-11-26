/**
 * About timeline (theme: sections/about-timeline.liquid + blocks/_milestone.liquid): a vertical rail that fills
 * on scroll (<about-timeline>, theme JS), milestones with a pill, title, text, one figure and a big year.
 */
import { aboutScreenClasses, aboutScreenVars, type AboutScreenOptions } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface AboutMilestone {
  year?: string;
  pill?: string;
  title?: string;
  text?: string; // HTML
  statValue?: string;
  statLabel?: string;
}

export interface AboutTimelineProps extends SectionCommon, AboutScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent words
  milestones: AboutMilestone[];
}

export default function AboutTimeline({
  id,
  eyebrow,
  heading,
  milestones,
  ...common
}: AboutTimelineProps & { id: string; context?: PageContext }) {
  const items = (milestones ?? []).filter((m) => m.year || m.pill || m.title || m.text || m.statValue);
  if (!items.length) return null;
  return (
    <div id={`section-${id}`} className="shopify-section">
      <about-timeline
        className={`about-timeline full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${aboutScreenClasses(common)}`}
        style={sectionStyle({ paddingTop: 120, ...common }, aboutScreenVars(common))}
      >
        <div className="about-timeline__inner">
          {eyebrow || heading ? (
            <header className="about-timeline__header">
              {eyebrow ? <p className="eyebrow eyebrow--center">{eyebrow}</p> : null}
              {heading ? <h2 className="about-timeline__heading" dangerouslySetInnerHTML={{ __html: heading }} /> : null}
            </header>
          ) : null}
          {heading ? null : <h2 className="visually-hidden">Our journey</h2>}
          <div className="about-timeline__list">
            <span className="about-timeline__rail" aria-hidden="true">
              <span className="about-timeline__fill"></span>
            </span>
            {items.map((m, i) => (
              <div className="milestone" key={i}>
                <span className="milestone__marker" aria-hidden="true"></span>
                <div className="milestone__content">
                  {m.pill ? <p className="milestone__pill">{m.pill}</p> : null}
                  {m.title ? (
                    <h3 className="milestone__title">
                      {m.year ? <span className="visually-hidden">{m.year}: </span> : null}
                      {m.title}
                    </h3>
                  ) : null}
                  {m.text ? <div className="milestone__text" dangerouslySetInnerHTML={{ __html: m.text }} /> : null}
                  {m.statValue ? (
                    <p className="milestone__stat">
                      <span className="milestone__stat-value">{m.statValue}</span>
                      {m.statLabel ? <span className="milestone__stat-label">{m.statLabel}</span> : null}
                    </p>
                  ) : null}
                </div>
                {m.year ? (
                  <p className="milestone__year" aria-hidden="true">
                    {m.year}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </about-timeline>
    </div>
  );
}
