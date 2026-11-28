import PageRenderer from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams, params }: { searchParams: Promise<Search>; params: Promise<{ id: string }> }) {
  return <PageRenderer slug="account-order-details" context={{ searchParams: { ...(await searchParams), id: (await params).id } }} />;
}
