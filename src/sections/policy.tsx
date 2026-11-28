/**
 * Policy page (theme: sections/policy.liquid): one store policy styled into the Figma layout. The text is HTML
 * (the theme reads it from Settings > Policies): every <h2> is a numbered item (rows) or a clause listed in a sticky
 * contents column (contents); a <table> is "The register"; a small heading (H4-H6) is an accent group label.
 * The theme script <policy-page> (public/theme.js) builds the contents list and the phone labels.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { Breadcrumb, rootProps, type PageScreenOptions } from '@/sections/_page-shared';
import type { SectionCommon } from '@/sections/shared';

export interface PolicyProps extends SectionCommon, PageScreenOptions {
  layout?: 'rows' | 'contents';
  body: string; // HTML
  showBreadcrumb?: boolean;
  breadcrumbTitle?: string;
  eyebrow?: string;
  heading?: string; // HTML
  intro?: string; // HTML
  inForceLabel?: string;
  inForceDate?: string;
  inForceMeta?: string;
  showCta?: boolean;
  ctaHeading?: string;
  ctaText?: string; // HTML
  ctaLabel?: string;
  ctaLink?: string;
}

export default function Policy({
  id,
  context,
  layout = 'rows',
  body,
  showBreadcrumb = true,
  breadcrumbTitle,
  eyebrow,
  heading,
  intro,
  inForceLabel,
  inForceDate,
  inForceMeta,
  showCta = true,
  ctaHeading,
  ctaText,
  ctaLabel,
  ctaLink = '/pages/contact',
  ...common
}: PolicyProps & { id: string; context?: PageContext }) {
  if (!body) return null;
  const title = breadcrumbTitle || eyebrow || 'Policy';
  const Heading = ((context?.index ?? 0) === 0 ? 'h1' : 'h2') as 'h1' | 'h2';
  // H4-H6 in the policy are group labels, not headings (no skipped levels): same as the Liquid.
  // Each label restarts the item numbers at 01: counter-set changes the one counter made on .policy__body
  // (sections.css's counter-reset opened a new scope per label, and Chrome kept counting: 09-14).
  const html = body.replace(/<h[456]/g, '<div data-policy-group class="[counter-reset:none] [counter-set:policy-item_0]"').replace(/<\/h[456]>/g, '</div>');
  const { className, style } = rootProps(`policy policy--${layout}`, common, { top: 24, bottom: 96 });
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <policy-page className={className} style={style}>
        <div className="policy__inner">
          {showBreadcrumb ? <Breadcrumb current={title} className="policy__breadcrumb" /> : null}
          <header className="policy__header">
            <div className="policy__title-block">
              {eyebrow ? <p className="eyebrow policy__eyebrow">{eyebrow}</p> : null}
              <Heading className="policy__heading" dangerouslySetInnerHTML={{ __html: heading || title }} />
            </div>
            {inForceDate ? (
              <div className="policy__in-force">
                {inForceLabel ? <p className="policy__in-force-label text-label">{inForceLabel}</p> : null}
                <p className="policy__in-force-date">{inForceDate}</p>
                {inForceMeta ? <p className="policy__in-force-meta">{inForceMeta}</p> : null}
              </div>
            ) : null}
          </header>
          {intro ? <div className="policy__intro" dangerouslySetInnerHTML={{ __html: intro }} /> : null}
          <div className="policy__layout">
            {layout === 'contents' ? (
              <nav className="policy__contents" aria-label="Contents" hidden>
                <p className="policy__label">Contents</p>
                <ol className="policy__contents-list" role="list" data-policy-contents />
              </nav>
            ) : null}
            <div className="policy__body rte" data-policy-body>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          </div>
          {showCta ? (
            <div className="policy__cta">
              <div className="policy__cta-copy">
                {ctaHeading ? <h2 className="policy__cta-heading">{ctaHeading}</h2> : null}
                {ctaText ? <div className="policy__cta-text" dangerouslySetInnerHTML={{ __html: ctaText }} /> : null}
              </div>
              {ctaLabel ? (
                <a className="button policy__cta-button" href={ctaLink}>
                  {ctaLabel}
                  <span className="policy__cta-icon" aria-hidden="true">
                    <Icon name="send" />
                  </span>
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </policy-page>
    </div>
  );
}
