import { notFound } from 'next/navigation';
import PageRenderer, { pageMetadata } from '@/components/PageRenderer';
import { api } from '@/lib/api';

/**
 * A product: generated ahead of time (every product at build, a new one on its first visit) and
 * regenerated when its cached data is older than CACHE_SECONDS or dropped through /api/revalidate.
 * A URL with a query (?variant=..., a posted form) is answered by the per-request twin in
 * src/app/(store)/q/products/[handle] (src/proxy.ts sends it there).
 */
export async function generateStaticParams() {
  return (await api.products()).map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const product = await api.product((await params).handle);
  return pageMetadata('product', product?.title, product?.subtitle || undefined);
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await api.product(handle);
  if (!product) notFound();
  return <PageRenderer slug="product" path={`/products/${handle}`} context={{ product }} />;
}
