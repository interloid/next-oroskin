import PageRenderer, { pageMetadata } from '@/components/PageRenderer';

export const generateMetadata = () => pageMetadata('collections');

/** All collections: generated ahead of time from cached backend content. */
export default function CollectionsRoute() {
  return <PageRenderer slug="collections" path="/collections" />;
}
