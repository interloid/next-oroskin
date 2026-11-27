/** Returns hero (theme: sections/returns-hero.liquid): breadcrumb, round badge ("60 / days"), eyebrow, heading and intro. */
import type { PageContext } from '@/components/PageRenderer';
import { Breadcrumb, rootProps, type PageScreenOptions } from '@/sections/_page-shared';
import type { SectionCommon } from '@/sections/shared';

export interface ReturnsHeroProps extends SectionCommon, PageScreenOptions {
  showBreadcrumb?: boolean;
  breadcrumbTitle?: string;
  badgeNumber?: string;
  badgeLabel?: string;
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  text?: string; // HTML
}

export default function ReturnsHero({
  id,
  showBreadcrumb = true,
  breadcrumbTitle,
  badgeNumber,
  badgeLabel,
  eyebrow,
  heading,
  text,
  ...common
}: ReturnsHeroProps & { id: string; context?: PageContext }) {
  const title = breadcrumbTitle || eyebrow || 'Returns';
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <div {...rootProps('returns-hero', common, { top: 24, bottom: 80 })}>
        <div className="returns-hero__inner">
          {showBreadcrumb ? <Breadcrumb current={title} className="returns-hero__breadcrumb" /> : null}
          <div className={`returns-hero__grid${badgeNumber ? '' : ' returns-hero__grid--no-badge'}`}>
            {badgeNumber ? (
              <div className="returns-hero__badge">
                <span className="returns-hero__badge-number">{badgeNumber}</span>
                {badgeLabel ? <span className="returns-hero__badge-label">{badgeLabel}</span> : null}
              </div>
            ) : null}
            <div className="returns-hero__copy">
              {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
              <h1 className="returns-hero__heading" dangerouslySetInnerHTML={{ __html: heading || title }} />
              {text ? <div className="returns-hero__text" dangerouslySetInnerHTML={{ __html: text }} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
