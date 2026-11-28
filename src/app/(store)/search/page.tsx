import PageRenderer from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

/** Search results: rendered per request (the query is in the URL); the product data behind it is cached. */
export default async function SearchPage({ searchParams }: { searchParams: Promise<Search> }) {
  return <PageRenderer slug="search" path="/search" visitor context={{ searchParams: await searchParams }} />;
}
