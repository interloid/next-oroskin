import { notFound } from 'next/navigation';
import PageRenderer from '@/components/PageRenderer';
import { api } from '@/lib/api';

type Search = Record<string, string | string[] | undefined>;

/**
 * /products/<handle>?variant=... (or any other query): the same page as src/app/(store)/products/[handle],
 * rendered per request so the chosen variant and form messages are in the HTML. Reached only through the
 * rewrite in src/proxy.ts; the product data behind it is still cached.
 */
export default async function ProductWithQuery({ params, searchParams }: { params: Promise<{ handle: string }>; searchParams: Promise<Search> }) {
  const { handle } = await params;
  const product = await api.product(handle);
  if (!product) notFound();
  return <PageRenderer slug="product" path={`/products/${handle}`} visitor context={{ product, searchParams: await searchParams }} />;
}
