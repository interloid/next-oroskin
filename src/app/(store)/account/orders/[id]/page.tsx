import PageRenderer, { pageMetadata } from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

export const generateMetadata = () => pageMetadata('account-order-details');

/** One order of the signed-in customer, rendered on every request. */
export default async function Page({ searchParams, params }: { searchParams: Promise<Search>; params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <PageRenderer slug="account-order-details" path={`/account/orders/${id}`} visitor context={{ searchParams: { ...(await searchParams), id } }} />
  );
}
