import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
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

/** Renders a page's sections from its JSON (src/data/pages/<slug>.json or GET /api/pages/<slug>). */
export default async function PageRenderer({ slug, context = {} }: { slug: string; context?: PageContext }) {
  const page = await api.page(slug);
  if (!page) notFound();
  return (
    <>
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
    </>
  );
}
