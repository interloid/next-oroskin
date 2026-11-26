import PageRenderer from '@/components/PageRenderer';

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <PageRenderer slug="search" context={{ searchParams: await searchParams }} />;
}
