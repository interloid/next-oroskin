/**
 * The shapes the backend answers. They are derived from the Zod schemas in src/lib/schemas.ts, which
 * also check every answer at run time: change a shape there.
 * Money is in minor units (cents): 12500 = $125.00.
 */
import type { z } from 'zod';
import type * as s from './schemas';

export type Money = number;

export type Image = z.infer<typeof s.imageSchema>;
export type ProductOption = z.infer<typeof s.productOptionSchema>;
export type Variant = z.infer<typeof s.variantSchema>;
export type Product = z.infer<typeof s.productSchema>;
export type Collection = z.infer<typeof s.collectionSchema>;
export type CollectionPage = z.infer<typeof s.collectionPageSchema>;
export type Filter = z.infer<typeof s.filterSchema>;
export type Article = z.infer<typeof s.articleSchema>;
export type CartLine = z.infer<typeof s.cartLineSchema>;
export type Cart = z.infer<typeof s.cartSchema>;
export type Site = z.infer<typeof s.siteSchema>;
export type { MenuItem } from './schemas';
export type PageContent = z.infer<typeof s.pageContentSchema>;
export type Order = z.infer<typeof s.orderSchema>;

export interface SectionData<P = Record<string, unknown>> {
  id: string;
  type: string;
  props: P;
}

/** Query of GET /collections/:handle */
export interface CollectionQuery {
  sort?: string;
  page?: number;
  pageSize?: number;
  type?: string[];
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
}
