import PageRenderer from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  return <PageRenderer slug="account-signout" context={{ searchParams: { ...(await searchParams) } }} />;
}
