/**
 * Zod schemas for everything the backend answers. src/lib/api.ts and src/lib/cart-store.ts check every
 * answer against them, so a backend change that breaks the storefront fails loudly at the edge, with the
 * field named, instead of somewhere inside a section. The TypeScript types (src/lib/types.ts) are derived
 * from these schemas: change a shape here, nowhere else.
 * Unknown extra fields are kept and ignored, so the backend can add fields without a storefront release.
 * Money is in minor units (cents): 12500 = $125.00.
 */
import { z } from 'zod';

const money = z.number().int();

export const imageSchema = z.looseObject({
  /** Absolute URL or a path on the storefront's domain */
  src: z.string(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const productOptionSchema = z.looseObject({
  name: z.string(),
  values: z.array(z.string()),
});

export const variantSchema = z.looseObject({
  id: z.number().int(),
  sku: z.string(),
  /** "Fair" or "Fair / 30 ml", "Default" when the product has no options */
  title: z.string(),
  /** One value per product option, in the order of Product.options */
  options: z.array(z.string()),
  price: money,
  compareAtPrice: money.nullable(),
  available: z.boolean(),
  inventory: z.number().int(),
  image: z.string().nullable(),
});

export const productSchema = z.looseObject({
  id: z.number().int(),
  /** URL slug: /products/<handle> */
  handle: z.string(),
  title: z.string(),
  subtitle: z.string(),
  vendor: z.string(),
  type: z.string(),
  tags: z.array(z.string()),
  badges: z.array(z.string()),
  descriptionHtml: z.string(),
  rating: z.object({ value: z.number(), count: z.number() }),
  /** Lowest variant price */
  price: money,
  compareAtPrice: money.nullable(),
  available: z.boolean(),
  options: z.array(productOptionSchema),
  variants: z.array(variantSchema),
  images: z.array(imageSchema),
});

export const collectionSchema = z.looseObject({
  id: z.number().int(),
  handle: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().nullable(),
  productHandles: z.array(z.string()),
});

export const filterSchema = z.looseObject({
  /** "type" | "price" | "availability" */
  id: z.string(),
  label: z.string(),
  type: z.enum(['list', 'price_range']),
  values: z.array(z.object({ value: z.string(), label: z.string(), count: z.number(), active: z.boolean() })).optional(),
  min: money.optional(),
  max: money.optional(),
});

export const collectionPageSchema = collectionSchema.extend({
  products: z.array(productSchema),
  total: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
  filters: z.array(filterSchema),
});

export const articleSchema = z.looseObject({
  id: z.number().int(),
  handle: z.string(),
  title: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  /** ISO date */
  publishedAt: z.string(),
  image: z.string().nullable(),
  imageAlt: z.string(),
  excerpt: z.string(),
  contentHtml: z.string(),
  readingMinutes: z.number(),
});

export const cartLineSchema = z.looseObject({
  key: z.string(),
  variantId: z.number().int(),
  productHandle: z.string(),
  title: z.string(),
  variantTitle: z.string().nullable(),
  image: z.string().nullable(),
  quantity: z.number().int(),
  price: money,
  compareAtPrice: money.nullable(),
  lineTotal: money,
});

export const discountCodeSchema = z.looseObject({
  code: z.string(),
  /** False when the code is unknown, switched off, or the cart is empty */
  applicable: z.boolean(),
  /** Percent off the subtotal (10 = 10%), when the code is applicable */
  percent: z.number().nullish(),
  /** What this code takes off, in minor units */
  amount: money.default(0),
});

export const cartSchema = z.looseObject({
  id: z.string(),
  lines: z.array(cartLineSchema),
  itemCount: z.number().int(),
  /** Before discounts */
  subtotal: money,
  discountCodes: z.array(discountCodeSchema),
  /** All applicable codes together, never more than the subtotal */
  discountTotal: money.default(0),
  /** subtotal - discountTotal */
  total: money.optional(),
  note: z.string(),
  /** Extra fields the visitor filled in on the cart page (for example "Gift message") */
  attributes: z.record(z.string(), z.string()).default({}),
  currency: z.string(),
});

export const cartAddSchema = z.object({ cart: cartSchema, line: cartLineSchema });

export interface MenuItem {
  title: string;
  /** "#" = no link (a heading that only opens its children) */
  url: string;
  children?: MenuItem[];
  /** Mega menu card (2nd level): image + short text */
  image?: string | null;
  imageWidth?: number;
  imageHeight?: number;
  text?: string;
  /** Mega menu panel (top level with children): title ("<title> by category") and the "Shop all" link */
  panelTitle?: string;
  shopAll?: { label: string; url: string } | null;
}

export const menuItemSchema: z.ZodType<MenuItem> = z.looseObject({
  title: z.string(),
  url: z.string(),
  get children() {
    return z.array(menuItemSchema).optional();
  },
  image: z.string().nullish(),
  imageWidth: z.number().optional(),
  imageHeight: z.number().optional(),
  text: z.string().optional(),
  panelTitle: z.string().optional(),
  shopAll: z.object({ label: z.string(), url: z.string() }).nullish(),
});

/** Menus, announcement bar, footer, brand and money settings: one call for the whole site chrome. */
export const siteSchema = z.looseObject({
  name: z.string(),
  /** One line about the store, for the page description */
  description: z.string().optional(),
  /** Browser tab icon: a URL or a path on this domain */
  favicon: z.string().optional(),
  /** ISO 4217 code of every price the backend sends: "USD" */
  currency: z.string(),
  /** How an amount is shown: "${{amount}}" */
  moneyFormat: z.string(),
  /** BCP 47 tag for numbers and dates: "en-US". Missing = "en-US" */
  locale: z.string().optional(),
  /** ISO 3166 country the store sells in: "US" (address labels, the order's country) */
  country: z.string().optional(),
  /** Logo image (shown at 50px wide) + logo text: `text` then `accent` in italics ("Oro" + "Skin") */
  logo: z.looseObject({
    image: z.string().nullable(),
    imageWidth: z.number().optional(),
    imageHeight: z.number().optional(),
    text: z.string(),
    accent: z.string(),
  }),
  announcement: z.looseObject({
    /** link + linkLabel: the label is the link's text after the message */
    messages: z.array(z.looseObject({ text: z.string(), link: z.string().optional(), linkLabel: z.string().optional() })),
    mode: z.enum(['single', 'slideshow', 'marquee']).optional(),
    autoplay: z.boolean().optional(),
    intervalSeconds: z.number().optional(),
    uppercase: z.boolean().optional(),
  }),
  /** Main menu. A top-level item with children opens the mega menu: each child = a card */
  menu: z.array(menuItemSchema),
  search: z.looseObject({ placeholder: z.string().optional(), trending: z.array(z.string()).optional() }).optional(),
  footer: z.looseObject({
    /** HTML */
    tagline: z.string(),
    /** Columns: each top-level item = a column heading, its children = the links */
    menu: z.array(menuItemSchema),
    newsletter: z.looseObject({
      heading: z.string(),
      text: z.string(),
      placeholder: z.string().optional(),
      buttonLabel: z.string().optional(),
    }),
    /** network = facebook | whatsapp | instagram | youtube | tiktok | pinterest | x (icon-<network>.svg) */
    social: z.array(z.looseObject({ network: z.string(), url: z.string() })),
    wordmark: z.looseObject({ word: z.string(), accent: z.string() }),
    copyright: z.string().optional(),
    /** Payment icon names: visa, master, american_express, paypal, diners_club, discover */
    payment: z.array(z.string()).optional(),
    countries: z
      .array(z.looseObject({ code: z.string(), name: z.string(), currency: z.string(), current: z.boolean().optional() }))
      .optional(),
    languages: z.array(z.looseObject({ code: z.string(), name: z.string(), current: z.boolean().optional() })).optional(),
  }),
});

export const sectionDataSchema = z.looseObject({
  id: z.string(),
  /** Picks the React component: src/sections/<type>.tsx */
  type: z.string(),
  /** That component's content (each section documents its props type) */
  props: z.record(z.string(), z.unknown()),
});

/** A page = an ordered list of sections: reorder, add, remove or edit sections in the backend. */
export const pageContentSchema = z.looseObject({
  slug: z.string(),
  title: z.string(),
  seo: z.looseObject({ title: z.string().optional(), description: z.string().optional() }).optional(),
  sections: z.array(sectionDataSchema),
});

export const orderSchema = z.looseObject({
  /** Public order id: "ORO-1001" */
  id: z.string(),
  /** The cart it was made from; null for orders that did not come from this storefront's checkout */
  cartId: z.string().nullish(),
  itemCount: z.number().int(),
  subtotal: money,
  discountTotal: money.default(0),
  total: money.optional(),
  customer: z.looseObject({ email: z.string() }),
});

/** The backend's one error shape: `{ error, message, statusCode, requestId, details }` */
export const apiErrorSchema = z.looseObject({
  error: z.string().optional(),
  message: z.union([z.string(), z.array(z.string())]).optional(),
  statusCode: z.number().optional(),
  requestId: z.string().optional(),
});
