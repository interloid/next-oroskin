import SiteChrome from '@/components/SiteChrome';

/** Every store page: announcement bar + header, <main>, footer (from GET /api/site). */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
