import PageRenderer from '@/components/PageRenderer';

export default async function BlogPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return <PageRenderer slug="blog" context={{ searchParams: await searchParams }} />;
}
