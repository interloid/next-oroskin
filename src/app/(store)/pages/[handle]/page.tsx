import PageRenderer from '@/components/PageRenderer';
import { api } from '@/lib/api';
import type { MenuItem } from '@/lib/types';

/**
 * /pages/about-us → the backend's page "about-us". Generated ahead of time: the pages linked from the
 * header and footer menus at build, any other on its first visit; regenerated when the cached data is older
 * than CACHE_SECONDS or dropped through /api/revalidate.
 * A URL with a query (a posted contact form: ?contact_posted=true) is answered by the per-request twin in
 * src/app/(store)/q/pages/[handle] (src/proxy.ts sends it there).
 */
export async function generateStaticParams() {
  const site = await api.site();
  const urls = (items: MenuItem[]): string[] => items.flatMap((i) => [i.url, ...urls(i.children ?? [])]);
  const handles = [...urls(site.menu), ...urls(site.footer.menu)].map((u) => /^\/pages\/([a-z0-9-]+)$/.exec(u)?.[1]);
  return [...new Set(handles.filter((h): h is string => !!h))].map((handle) => ({ handle }));
}

export default async function ContentPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return <PageRenderer slug={handle} path={`/pages/${handle}`} />;
}
