/** Yes and no lists (theme: sections/returns-lists.liquid): "Always returnable" (ticks) and "The few exceptions" (crosses). */
import Icon from '@/components/Icon';
import type { PageContext } from '@/components/PageRenderer';
import { rootProps, type PageScreenOptions } from '@/sections/_page-shared';
import type { SectionCommon } from '@/sections/shared';

export interface ReturnsListsProps extends SectionCommon, PageScreenOptions {
  yesTitle?: string;
  yesItems?: string[];
  noTitle?: string;
  noItems?: string[];
}

function Card({ kind, title, items }: { kind: 'yes' | 'no'; title?: string; items: string[] }) {
  const list = items.map((i) => i.trim()).filter(Boolean);
  if (!title && !list.length) return null;
  return (
    <div className={`returns-lists__card returns-lists__card--${kind}`} data-animate="fade-up">
      {title ? (
        <h2 className="returns-lists__title">
          <span className="returns-lists__icon" aria-hidden="true">
            <Icon name={kind === 'yes' ? 'check' : 'exclamation'} />
          </span>
          {title}
        </h2>
      ) : null}
      {list.length ? (
        <ul className="returns-lists__items" role="list">
          {list.map((t, i) => (
            <li className="returns-lists__item" key={i}>
              <span className="returns-lists__mark" aria-hidden="true">
                <Icon name={kind === 'yes' ? 'check' : 'close'} />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function ReturnsLists({
  id,
  yesTitle,
  yesItems = [],
  noTitle,
  noItems = [],
  ...common
}: ReturnsListsProps & { id: string; context?: PageContext }) {
  if (!yesTitle && !noTitle && !yesItems.length && !noItems.length) return null;
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <div {...rootProps('returns-lists', common, { top: 32, bottom: 48 })}>
        <animate-on-scroll className="returns-lists__inner">
          <Card kind="yes" title={yesTitle} items={yesItems} />
          <Card kind="no" title={noTitle} items={noItems} />
        </animate-on-scroll>
      </div>
    </div>
  );
}
