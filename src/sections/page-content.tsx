/**
 * Page content: a title and rich text (theme: sections/page.liquid). Used for the policy pages
 * (shipping, returns, terms, privacy) and any simple text page.
 */
import { Breadcrumb } from '@/components/AboutShared';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface PageContentProps extends SectionCommon {
  eyebrow?: string;
  heading: string; // HTML allowed (<em> = accent)
  html: string; // the page text (HTML)
  showBreadcrumb?: boolean;
  align?: 'left' | 'center';
  textWidth?: number; // px
}

export default function PageContent({
  id,
  eyebrow,
  heading,
  html,
  showBreadcrumb = true,
  align = 'center',
  textWidth = 760,
  ...common
}: PageContentProps & { id: string; context?: PageContext }) {
  // Tables scroll sideways in their own box; images after the first load lazily (as in the theme).
  let content = html ?? '';
  content = content.replace(/<table/g, '<div class="page-main__table" tabindex="0" role="region" aria-label="Table"><table').replace(/<\/table>/g, '</table></div>');
  let n = 0;
  content = content.replace(/<img /g, (m) => (++n > 1 ? '<img loading="lazy" decoding="async" ' : m));
  const center = align === 'center';
  return (
    <div id={`section-${id}`} className="shopify-section">
      <div
        className={`page-main full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 40, paddingBottom: 80, ...common }, { '--page-text-width': `${textWidth}px` })}
      >
        <div className="page-main__inner">
          {showBreadcrumb ? <Breadcrumb current={heading.replace(/<[^>]+>/g, '')} className="page-main__breadcrumb" /> : null}
          <header className={`page-main__header${center ? ' page-main__header--center' : ''}`}>
            {eyebrow ? <p className={`eyebrow${center ? ' eyebrow--center' : ''}`}>{eyebrow}</p> : null}
            <h1 className="page-main__title" dangerouslySetInnerHTML={{ __html: heading }} />
          </header>
          {content ? <div className="page-main__content rte" dangerouslySetInnerHTML={{ __html: content }} /> : null}
        </div>
      </div>
    </div>
  );
}
