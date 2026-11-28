/**
 * Store pages. The site chrome (announcement bar, header, footer) is not drawn here: a layout does not know
 * the page's path or whether the page is per visitor, so each page draws it through
 * src/components/PageRenderer.tsx (or src/components/SiteChrome.tsx for the hand-written checkout pages).
 */
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
