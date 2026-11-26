/**
 * Oroskin API contract. The NestJS backend returns exactly these shapes (see API-CONTRACT.md).
 * Money is in minor units (paise / cents): 900000 = Rs. 9,000.00.
 */

export type Money = number;

export interface Image {
  src: string; // absolute URL or a path on the frontend's domain
  alt: string;
  width?: number;
  height?: number;
}

export interface ProductOption {
  name: string; // "Shade"
  values: string[]; // ["Fair", "Light"]
}

export interface Variant {
  id: number;
  sku: string;
  title: string; // "Fair" or "Fair / 30 ml", "Default" when the product has no options
  options: string[]; // one value per product option, same order as Product.options
  price: Money;
  compareAtPrice: Money | null;
  available: boolean;
  inventory: number;
  image: string | null;
}

export interface Product {
  id: number;
  handle: string; // URL slug: /products/<handle>
  title: string;
  subtitle: string;
  vendor: string;
  type: string; // "Skincare" | "Fragrance" | "Makeup" | ...
  tags: string[];
  badges: string[]; // "New", "Bestseller"
  descriptionHtml: string;
  rating: { value: number; count: number };
  price: Money; // lowest variant price
  compareAtPrice: Money | null;
  available: boolean;
  options: ProductOption[];
  variants: Variant[];
  images: Image[];
}

export interface Collection {
  id: number;
  handle: string;
  title: string;
  description: string;
  image: string | null;
  productHandles: string[];
}

export interface CollectionPage extends Collection {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
  filters: Filter[];
}

export interface Filter {
  id: string; // "type" | "price" | "availability"
  label: string;
  type: 'list' | 'price_range';
  values?: { value: string; label: string; count: number; active: boolean }[];
  min?: Money;
  max?: Money;
}

export interface Article {
  id: number;
  handle: string;
  title: string;
  author: string;
  tags: string[];
  publishedAt: string; // ISO date
  image: string | null;
  imageAlt: string;
  excerpt: string;
  contentHtml: string;
  readingMinutes: number;
}

export interface CartLine {
  key: string;
  variantId: number;
  productHandle: string;
  title: string;
  variantTitle: string | null;
  image: string | null;
  quantity: number;
  price: Money;
  compareAtPrice: Money | null;
  lineTotal: Money;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  itemCount: number;
  subtotal: Money;
  discountCodes: { code: string; applicable: boolean }[];
  note: string;
  currency: string;
}

/** Menus, announcement bar, footer and brand: one call for the whole site chrome. */
export interface Site {
  name: string;
  currency: string; // "INR"
  moneyFormat: string; // "Rs. {{amount}}"
  /** Logo image (shown at 50px wide) + logo text: `text` then `accent` in italics ("Oro" + "Skin"). */
  logo: { image: string | null; imageWidth?: number; imageHeight?: number; text: string; accent: string };
  announcement: {
    /** link + linkLabel: the label is the link's text after the message. */
    messages: { text: string; link?: string; linkLabel?: string }[];
    mode?: 'single' | 'slideshow' | 'marquee';
    autoplay?: boolean;
    intervalSeconds?: number;
    uppercase?: boolean;
  };
  /** Main menu. A top-level item with children opens the mega menu: each child = a card. */
  menu: MenuItem[];
  search?: { placeholder?: string; trending?: string[] };
  footer: {
    tagline: string; // HTML
    /** Columns: each top-level item = a column heading, its children = the links. */
    menu: MenuItem[];
    newsletter: { heading: string; text: string; placeholder?: string; buttonLabel?: string };
    /** network = facebook | whatsapp | instagram | youtube | tiktok | pinterest | x (icon-<network>.svg) */
    social: { network: string; url: string }[];
    wordmark: { word: string; accent: string };
    copyright?: string;
    /** Payment icon names: visa, master, american_express, paypal, diners_club, discover */
    payment?: string[];
    countries?: { code: string; name: string; currency: string; current?: boolean }[];
    languages?: { code: string; name: string; current?: boolean }[];
  };
}

export interface MenuItem {
  title: string;
  url: string; // "#" = no link (a heading that only opens its children)
  children?: MenuItem[];
  /** Mega menu card (2nd level): image + short text. */
  image?: string | null;
  imageWidth?: number;
  imageHeight?: number;
  text?: string;
  /** Mega menu panel (top level with children): title ("<title> by category") and the "Shop all" link. */
  panelTitle?: string;
  shopAll?: { label: string; url: string } | null;
}

/**
 * A page = an ordered list of sections. `type` picks the React component, `props` is that
 * component's content (each section documents its props type in src/sections/<Type>.tsx).
 * This is the "change the design by JSON" part: reorder, add, remove or edit sections here.
 */
export interface PageContent {
  slug: string;
  title: string;
  seo?: { title?: string; description?: string };
  sections: SectionData[];
}

export interface SectionData<P = Record<string, unknown>> {
  id: string;
  type: string;
  props: P;
}
