import { notFound } from 'next/navigation';
import PageRenderer from '@/components/PageRenderer';
import { api } from '@/lib/api';

type Search = Record<string, string | string[] | undefined>;

export default async function CollectionRoute({ params, searchParams }: { params: Promise<{ handle: string }>; searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const one = (k: string) => (Array.isArray(sp[k]) ? sp[k]![0] : (sp[k] as string | undefined));
  const many = (k: string) => (sp[k] == null ? undefined : ([] as string[]).concat(sp[k] as string | string[]));
  const collection = await api.collection((await params).handle, {
    sort: one('sort_by'),
    page: Number(one('page') ?? 1),
    type: many('filter.p.product_type'),
    available: one('filter.v.availability') === '1',
    minPrice: one('filter.v.price.gte') ? Number(one('filter.v.price.gte')) * 100 : undefined,
    maxPrice: one('filter.v.price.lte') ? Number(one('filter.v.price.lte')) * 100 : undefined,
  });
  if (!collection) notFound();
  return <PageRenderer slug="collection" context={{ collection, searchParams: sp }} />;
}
