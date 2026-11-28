import PageRenderer from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

/** Track an order by its number (?order=...), rendered on every request. */
export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  return <PageRenderer slug="account-track-order" path="/track-order" visitor context={{ searchParams: { ...(await searchParams) } }} />;
}
