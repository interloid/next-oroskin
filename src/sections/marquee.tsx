/**
 * Marquee (theme: sections/marquee.liquid): one sentence scrolling sideways in big type, every second repeat
 * in outline, with a pause button (<marquee-text>, theme JS).
 */
import { Fragment } from 'react';
import { FontFace, PauseIcons } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface MarqueeProps extends Pick<SectionCommon, 'colorScheme' | 'paddingTop' | 'paddingBottom'> {
  text: string;
  separator?: string;
  outline?: boolean;
  direction?: 'left' | 'right';
  textSize?: number; // px at a 1920px screen
  speed?: number; // seconds per loop
}

export default function Marquee({
  id,
  text,
  separator = '',
  outline = true,
  direction = 'left',
  textSize = 110,
  speed = 40,
  ...common
}: MarqueeProps & { id: string; context?: PageContext }) {
  const t = (text ?? '').trim();
  if (!t) return null;
  const sep = separator.trim();
  // Copies per half (theme logic): one half must be wider than a 1920px screen; even, 2–50.
  let copyEm = t.length * 50 + 35;
  if (sep) copyEm += sep.length * 50 + 35;
  const copyPx = copyEm * Math.max(40, textSize);
  let copies = Math.floor((230400 + copyPx - 1) / copyPx);
  copies = Math.min(50, Math.max(2, copies + (copies % 2)));
  const half = Array.from({ length: copies }, (_, i) => (
    <Fragment key={i}>
      <span className={`marquee__item${outline && i % 2 === 1 ? ' marquee__item--outline' : ''}`} dir="auto">
        {t}
      </span>
      {sep ? <span className="marquee__separator">{sep}</span> : null}
    </Fragment>
  ));

  return (
    <div id={`section-${id}`} className="shopify-section">
      <FontFace fonts={['plus_jakarta_sans_n8']} />
      <marquee-text
        className={`marquee full-width color-${common.colorScheme ?? 'scheme-2'} marquee--${direction}`}
        style={sectionStyle(common, { '--marquee-size': String(textSize), '--marquee-duration': `${speed}s` })}
      >
        <p className="visually-hidden">{t}</p>
        <div className="marquee__viewport" aria-hidden="true">
          <div className="marquee__track">
            <div className="marquee__half">{half}</div>
            <div className="marquee__half">{half}</div>
          </div>
        </div>
        <button type="button" className="marquee__pause" aria-pressed="false" hidden>
          <span className="visually-hidden">Pause the scrolling text</span>
          <PauseIcons prefix="marquee__pause-icon" />
        </button>
      </marquee-text>
    </div>
  );
}
