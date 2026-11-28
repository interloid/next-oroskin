import { notFound } from 'next/navigation';
import SiteChrome from '@/components/SiteChrome';
import { api } from '@/lib/api';
import { loadSiteFormat } from '@/lib/format';
import type { Article, CollectionPage, Product } from '@/lib/types';
import { registry } from '@/sections/registry.generated';

/** What a template page knows besides its own section props (the product of /products/x, etc.). */
export interface PageContext {
  product?: Product;
  collection?: CollectionPage;
  article?: Article;
  searchParams?: Record<string, string | string[] | undefined>;
  /** 0-based position of the section on the page: section 0 loads its images eagerly. */
  index?: number;
}

/**
 * Renders one store page: the site chrome (announcement bar, header, footer) around the page's sections,
 * which come from its JSON in the backend (GET /pages/<slug>).
 * - `path`: the page's own URL path (the header marks the active menu link from it).
 * - `visitor`: true for pages that are rendered per request (cart, checkout, account, search, filtered
 *   lists); leave it out for pages that are generated ahead of time. See src/components/SiteChrome.tsx.
 */
export default async function PageRenderer({
  slug,
  path,
  visitor = false,
  context = {},
}: {
  slug: string;
  path: string;
  visitor?: boolean;
  context?: PageContext;
}) {
  // Both are cached reads, asked together. The site's money and locale settings must be in place before
  // any section formats a price (src/lib/format.ts).
  const [page, site] = await Promise.all([api.page(slug), api.site()]);
  loadSiteFormat(site);
  if (!page) notFound();
  return (
    <SiteChrome path={path} visitor={visitor}>
      {page.sections.map((s, index) => {
        const Section = registry[s.type];
        if (!Section) {
          return process.env.NODE_ENV === 'development' ? (
            <p key={s.id} style={{ padding: 24, border: '2px dashed #7d0000' }}>
              Unknown section type “{s.type}”
            </p>
          ) : null;
        }
        return <Section key={s.id} id={s.id} {...s.props} context={{ ...context, index }} />;
      })}
    </SiteChrome>
  );
}
