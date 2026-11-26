import { notFound } from 'next/navigation';
import PageRenderer from '@/components/PageRenderer';
import { api } from '@/lib/api';

type Search = Record<string, string | string[] | undefined>;

export default async function ProductPage({ params, searchParams }: { params: Promise<{ handle: string }>; searchParams: Promise<Search> }) {
  const product = await api.product((await params).handle);
  if (!product) notFound();
  return <PageRenderer slug="product" context={{ product, searchParams: await searchParams }} />;
}
