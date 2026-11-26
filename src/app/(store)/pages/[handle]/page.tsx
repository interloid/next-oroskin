import PageRenderer from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

/** /pages/about-us → src/data/pages/about-us.json (or GET /api/pages/about-us). */
export default async function ContentPage({ params, searchParams }: { params: Promise<{ handle: string }>; searchParams: Promise<Search> }) {
  return <PageRenderer slug={(await params).handle} context={{ searchParams: await searchParams }} />;
}
