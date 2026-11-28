import PageRenderer from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

/**
 * /pages/<handle>?contact_posted=true (or any other query): the same page as src/app/(store)/pages/[handle],
 * rendered per request so form messages are in the HTML. Reached only through the rewrite in src/proxy.ts.
 */
export default async function ContentPageWithQuery({ params, searchParams }: { params: Promise<{ handle: string }>; searchParams: Promise<Search> }) {
  const { handle } = await params;
  return <PageRenderer slug={handle} path={`/pages/${handle}`} visitor context={{ searchParams: await searchParams }} />;
}
