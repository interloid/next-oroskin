import PageRenderer from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

/** Account page: the signed-in customer's own data, rendered on every request. */
export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  return <PageRenderer slug="account-orders" path="/account/orders" visitor context={{ searchParams: { ...(await searchParams) } }} />;
}
