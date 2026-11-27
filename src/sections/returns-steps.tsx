/** Numbered steps (theme: sections/returns-steps.liquid + blocks/_return-step.liquid): numbered by a CSS counter, joined by a line. */
import type { PageContext } from '@/components/PageRenderer';
import { rootProps, type PageScreenOptions } from '@/sections/_page-shared';
import type { SectionCommon } from '@/sections/shared';

export interface ReturnStep {
  title?: string;
  text?: string; // HTML
  label?: string;
}
export interface ReturnsStepsProps extends SectionCommon, PageScreenOptions {
  heading?: string;
  steps: ReturnStep[];
}

export default function ReturnsSteps({ id, heading, steps = [], ...common }: ReturnsStepsProps & { id: string; context?: PageContext }) {
  const shown = steps.filter((s) => s.title || s.text || s.label);
  if (!shown.length && !heading) return null;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <div {...rootProps('returns-steps', common, { top: 40, bottom: 56 })}>
        <div className="returns-steps__inner">
          {heading ? <h2 className="returns-steps__heading">{heading}</h2> : <h2 className="visually-hidden">How to return</h2>}
          {shown.length ? (
            <animate-on-scroll className="returns-steps__list" role="list">
              {shown.map((s, i) => (
                <div className="return-step" role="listitem" data-animate="fade-up" key={i}>
                  <span className="return-step__marker" aria-hidden="true" />
                  <div className="return-step__body">
                    {s.title ? <h3 className="return-step__title">{s.title}</h3> : null}
                    {s.text ? <div className="return-step__text" dangerouslySetInnerHTML={{ __html: s.text }} /> : null}
                    {s.label ? <p className="return-step__label">{s.label}</p> : null}
                  </div>
                </div>
              ))}
            </animate-on-scroll>
          ) : null}
        </div>
      </div>
    </div>
  );
}
