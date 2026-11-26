/**
 * About numbers (theme: sections/about-numbers.liquid + blocks/_stat-figure.liquid): "By the numbers" figures
 * that count up when they come on screen (<about-numbers>, theme JS reads data-count).
 */
import { aboutScreenVars, FontFace, type AboutScreenOptions } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface AboutStat {
  value?: string; // "98", "4.9"
  prefix?: string;
  suffix?: string; // "%", "+"
  /** Group the thousands while counting (theme: value from a collection's product count). */
  group?: boolean;
  title?: string;
  text?: string;
}

export interface AboutNumbersProps extends SectionCommon, AboutScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  stagger?: boolean;
  stats: AboutStat[];
}

export default function AboutNumbers({
  id,
  context,
  eyebrow,
  heading,
  stagger = true,
  stats,
  ...common
}: AboutNumbersProps & { id: string; context?: PageContext }) {
  const cards = (stats ?? []).filter((s) => s.value || s.title || s.text);
  if (!cards.length) return null;
  const animate = (context?.index ?? 0) !== 0;
  const scale = common.scaleScreen ?? true;
  const hiddenHeading = <h2 className="visually-hidden">By the numbers</h2>;

  return (
    <div id={`section-${id}`} className="shopify-section">
      <FontFace fonts={['newsreader_n6']} />
      <about-numbers
        className={`about-numbers full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}${scale ? ' section--screen-scale' : ''}`}
        style={sectionStyle(
          { paddingTop: 120, ...common },
          { '--columns': String(Math.min(4, cards.length)), ...aboutScreenVars(common) },
        )}
      >
        <div className="about-numbers__inner">
          {eyebrow || heading ? (
            <header className="about-numbers__header">
              {eyebrow ? <p className="eyebrow eyebrow--center">{eyebrow}</p> : null}
              {heading ? (
                <h2 className="about-numbers__heading" dangerouslySetInnerHTML={{ __html: heading }} />
              ) : (
                hiddenHeading
              )}
            </header>
          ) : (
            hiddenHeading
          )}
          <animate-on-scroll className={`about-numbers__list${stagger ? ' about-numbers__list--stagger' : ''}`}>
            {cards.map((s, i) => (
              <article className="stat-figure" data-stat-card="" data-animate={animate ? 'fade-up' : undefined} key={i}>
                {s.value ? (
                  <>
                    <p className="stat-figure__value">
                      <span
                        className="stat-figure__count"
                        data-count={s.value}
                        data-group={s.group ? '' : undefined}
                        aria-hidden="true"
                      >
                        {s.prefix}
                        <span className="stat-figure__number">{s.value}</span>
                        {s.suffix}
                      </span>
                      <span className="visually-hidden">
                        {s.prefix}
                        {s.value}
                        {s.suffix}
                      </span>
                    </p>
                    <span className="stat-figure__rule" aria-hidden="true"></span>
                  </>
                ) : null}
                {s.title ? <h3 className="stat-figure__title">{s.title}</h3> : null}
                {s.text ? <p className="stat-figure__text">{s.text}</p> : null}
              </article>
            ))}
          </animate-on-scroll>
        </div>
      </about-numbers>
    </div>
  );
}
