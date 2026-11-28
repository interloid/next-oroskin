import PageRenderer, { pageMetadata } from '@/components/PageRenderer';

export const generateMetadata = () => pageMetadata('cart');

/** The visitor's cart: rendered on every request, never cached. */
export default function CartPage() {
  return <PageRenderer slug="cart" path="/cart" visitor />;
}
