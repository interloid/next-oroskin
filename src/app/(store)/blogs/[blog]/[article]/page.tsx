import { notFound } from 'next/navigation';
import PageRenderer, { pageMetadata } from '@/components/PageRenderer';
import { api } from '@/lib/api';

/**
 * An article: generated ahead of time (every article at build, a new one on its first visit) and
 * regenerated when its cached data is older than CACHE_SECONDS or dropped through /api/revalidate.
 */
export async function generateStaticParams() {
  const [site, articles] = await Promise.all([api.site(), api.articles()]);
  const blog = site.menu.map((m) => /^\/blogs\/([^/]+)$/.exec(m.url)?.[1]).find(Boolean) ?? 'featured';
  return articles.map((a) => ({ blog, article: a.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ article: string }> }) {
  const article = await api.article((await params).article);
  return pageMetadata('article', article?.title, article?.excerpt || undefined);
}

export default async function ArticlePage({ params }: { params: Promise<{ blog: string; article: string }> }) {
  const { blog, article: handle } = await params;
  const article = await api.article(handle);
  if (!article) notFound();
  return <PageRenderer slug="article" path={`/blogs/${blog}/${handle}`} context={{ article }} />;
}
