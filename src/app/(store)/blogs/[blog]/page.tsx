import PageRenderer, { pageMetadata } from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

export const generateMetadata = () => pageMetadata('blog');

/** Blog listing: rendered per request (tag and page are in the URL); the articles behind it are cached. */
export default async function BlogPage({ params, searchParams }: { params: Promise<{ blog: string }>; searchParams: Promise<Search> }) {
  return <PageRenderer slug="blog" path={`/blogs/${(await params).blog}`} visitor context={{ searchParams: await searchParams }} />;
}
