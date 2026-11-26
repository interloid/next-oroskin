/**
 * Product tabs: a sticky bar of links to the panel sections below it (theme: sections/product-tabs.liquid).
 * Each tab's `target` must equal a panel section's `anchor` (Overview, Highlights, Step guide, Before and after,
 * Reviews, Product FAQ). The theme JS (<product-tabs>) pins / switches the panels; tabs with no panel below hide.
 */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { sectionStyle, type SectionCommon } from '@/sections/shared';

export interface ProductTabsProps extends SectionCommon {
  tabs?: { label: string; target: string }[];
  layout?: 'tabbed' | 'stacked';
  transition?: 'up' | 'left' | 'right' | 'fade';
  /** Scroll for each section in the tabbed layout, % of a screen */
  panelScroll?: number;
  showTop?: boolean;
}

const DEFAULT_TABS = [
  { label: 'Overview', target: 'overview' },
  { label: 'Highlights', target: 'highlights' },
  { label: 'How to use', target: 'how-to-use' },
  { label: 'Clinical results', target: 'clinical-results' },
  { label: 'Reviews', target: 'reviews' },
  { label: 'FAQ', target: 'faq' },
];

export default function ProductTabs({
  id,
  tabs = DEFAULT_TABS,
  layout = 'tabbed',
  transition = 'up',
  panelScroll = 50,
  showTop = true,
  ...common
}: ProductTabsProps & { id: string; context?: PageContext }) {
  const list = tabs.filter((t) => t.label && t.target);
  if (!list.length) return null;
  return (
    <section id={`section-${id}`} className="shopify-section">
      <product-tabs
        data-layout={layout}
        data-transition={transition}
        data-panel-scroll={panelScroll}
        className={`product-tabs full-width section-width--${common.width ?? 'widest'} color-${common.colorScheme ?? 'scheme-2'}`}
        style={sectionStyle({ paddingTop: 0, paddingBottom: 0, ...common })}
      >
        <div className="product-tabs__inner">
          <nav className="product-tabs__bar" aria-label="Product sections">
            <div className="product-tabs__row" data-tabs-row="">
              <ul className="product-tabs__list" role="list">
                {list.map((t) => (
                  <li key={t.target}>
                    <a className="product-tabs__link" href={`#${t.target}`} data-tab-target={t.target}>
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
              <span className="product-tabs__scroll-line" aria-hidden="true"></span>
            </div>
            {showTop ? (
              <a className="product-tabs__top" href="#MainContent" data-tabs-top="">
                <span className="visually-hidden">Back to the top</span>
                <span className="product-tabs__top-icon" aria-hidden="true">
                  <Icon name="arrow" />
                </span>
              </a>
            ) : null}
          </nav>
        </div>
      </product-tabs>
    </section>
  );
}
