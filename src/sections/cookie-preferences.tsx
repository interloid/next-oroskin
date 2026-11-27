/**
 * Cookie preferences (Figma 1:17171 "cookies"; never built in the theme): centred eyebrow, heading, intro and four
 * categories with a switch each. The choice is kept in localStorage (components/CookieChoices.tsx).
 */
import CookieChoices, { type CookieCategory } from '@/components/CookieChoices';
import type { PageContext } from '@/components/PageRenderer';
import { Breadcrumb, rootProps, type PageScreenOptions } from '@/sections/_page-shared';
import type { SectionCommon } from '@/sections/shared';

export interface CookiePreferencesProps extends SectionCommon, PageScreenOptions {
  breadcrumbTitle?: string;
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  intro?: string;
  categories: CookieCategory[];
  acceptLabel?: string;
  essentialLabel?: string;
  saveLabel?: string;
}

export default function CookiePreferences({
  id,
  breadcrumbTitle = 'Cookie preferences',
  eyebrow,
  heading,
  intro,
  categories = [],
  acceptLabel,
  essentialLabel,
  saveLabel,
  ...common
}: CookiePreferencesProps & { id: string; context?: PageContext }) {
  const { className, style } = rootProps('policy cookies', common, { top: 24, bottom: 96 });
  return (
    <div id={`shopify-section-${id}`} className="shopify-section">
      <div className={className} style={style}>
        <div className="policy__inner">
          <Breadcrumb current={breadcrumbTitle} className="policy__breadcrumb" />
          <header className="cookies__header">
            {eyebrow ? (
              <p className="eyebrow eyebrow--center cookies__eyebrow">{eyebrow}</p>
            ) : null}
            <h1 className="policy__heading cookies__heading" dangerouslySetInnerHTML={{ __html: heading || breadcrumbTitle }} />
            {intro ? <p className="cookies__intro">{intro}</p> : null}
          </header>
          <CookieChoices categories={categories} acceptLabel={acceptLabel} essentialLabel={essentialLabel} saveLabel={saveLabel} />
        </div>
      </div>
    </div>
  );
}
