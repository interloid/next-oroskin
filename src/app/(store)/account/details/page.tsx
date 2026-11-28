import PageRenderer, { pageMetadata } from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

export const generateMetadata = () => pageMetadata('account-details');

/** Account page: the signed-in customer's own data, rendered on every request. */
export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  return <PageRenderer slug="account-details" path="/account/details" visitor context={{ searchParams: { ...(await searchParams) } }} />;
}
