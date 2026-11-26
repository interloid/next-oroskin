import { notFound } from 'next/navigation';
import PageRenderer from '@/components/PageRenderer';
import { api } from '@/lib/api';

export default async function ArticlePage({ params }: { params: Promise<{ article: string }> }) {
  const article = await api.article((await params).article);
  if (!article) notFound();
  return <PageRenderer slug="article" context={{ article }} />;
}
