/**
 * Shopify AJAX cart API shim: turns our Cart (src/lib/types.ts) into the JSON Shopify's /cart.js answers,
 * and holds the cart state src/lib/db.ts doesn't have yet (cart attributes, Shopify's "discount" field that
 * replaces ALL codes, the last placed demo order). Used by the /cart/*.js route handlers, the cart section
 * and the demo checkout. Server only.
 */
import { cartStore, CartStoreError } from '@/lib/cart-store';
import products from '@/data/products.json';
import site from '@/data/site.json';
import type { Cart, CartLine, Product } from '@/lib/types';

export const CART_COOKIE = 'oro_cart';
const P = products as Product[];

/** Percent off the whole order per code (the contract has no discount amounts yet; mock: GLOW10) */
const CODES: Record<string, number> = { GLOW10: 10 };

interface Extras {
  attributes: Record<string, string>;
  /** Shopify's code list after a "discount" update; undefined = the store's own cart.discountCodes */
  codes?: string[];
  lastOrder?: { number: string; email: string; total: number; itemCount: number };
}
const store = globalThis as { __oroCartExtras?: Map<string, Extras> };
const extrasMap: Map<string, Extras> = (store.__oroCartExtras ??= new Map());

export function extras(id: string): Extras {
  let e = extrasMap.get(id);
  if (!e) extrasMap.set(id, (e = { attributes: {} }));
  return e;
}

export { CartStoreError as CartError } from '@/lib/cart-store';

/** 4xx JSON in Shopify's error shape */
export function errorResponse(error: unknown) {
  const status = error instanceof CartStoreError ? error.status : 422;
  const description = error instanceof Error ? error.message : 'Cart error';
  return Response.json({ status, message: 'Cart Error', description }, { status });
}

// ---------------------------------------------------------------- mutations (through src/lib/cart-store.ts)

/** Adds each item; returns the cart after the last add */
export async function addItems(id: string, items: { id: number; quantity: number }[]) {
  let cart: Cart | null = null;
  for (const item of items) {
    if (!item.id) throw new CartStoreError('Cannot find variant', 404);
    cart = (await cartStore.add(id, item.id, Math.max(1, Math.floor(item.quantity || 1)))).cart;
  }
  return cart ?? (await cartStore.get(id));
}

/** key = a line key or a variant id (as a string). 0 removes the line. */
export async function setQuantity(id: string, key: string, quantity: number) {
  return cartStore.setQuantity(id, key, Math.max(0, Math.floor(Number(quantity) || 0)));
}

export const setNote = (id: string, note: string) => cartStore.setNote(id, note);

/**
 * Shopify's "discount" field: a comma list that REPLACES every code. New codes go to the store (the
 * backend has no "remove code" endpoint), and the list itself is kept here, so a removed code disappears.
 */
export async function setDiscounts(id: string, list: string) {
  const codes = [...new Map(list.split(',').map((c) => c.trim()).filter(Boolean).map((c) => [c.toUpperCase(), c])).values()];
  const known = (await cartStore.get(id)).discountCodes.map((d) => d.code.toUpperCase());
  for (const code of codes) if (!known.includes(code.toUpperCase())) await cartStore.addDiscount(id, code);
  extras(id).codes = codes;
}

export function setAttributes(id: string, attributes: Record<string, unknown>) {
  const a = extras(id).attributes;
  for (const [k, v] of Object.entries(attributes ?? {})) {
    if (v === '' || v == null) delete a[k];
    else a[k] = String(v);
  }
}

export async function clearCart(id: string) {
  await cartStore.clear(id);
  const e = extras(id);
  e.attributes = {};
  e.codes = undefined;
}

// ---------------------------------------------------------------- Shopify JSON

export function findVariant(variantId: number) {
  for (const product of P) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}

export type ShopifyLine = ReturnType<typeof toShopifyLine>;
export type ShopifyCart = ReturnType<typeof toShopifyCart>;

export function toShopifyLine(line: CartLine) {
  const found = findVariant(line.variantId);
  const product = found?.product;
  const variant = found?.variant;
  const onlyDefault = !product?.options.length;
  const image = line.image ?? variant?.image ?? product?.images[0]?.src ?? null;
  const optionsWithValues = (product?.options ?? []).map((o, i) => ({ name: o.name, value: variant?.options[i] ?? '' }));
  return {
    id: line.variantId,
    properties: {} as Record<string, string>,
    quantity: line.quantity,
    variant_id: line.variantId,
    key: line.key,
    title: line.variantTitle && !onlyDefault ? `${line.title} - ${line.variantTitle}` : line.title,
    price: line.price,
    original_price: line.price,
    presentment_price: line.price / 100,
    discounted_price: line.price,
    line_price: line.lineTotal,
    original_line_price: line.lineTotal,
    total_discount: 0,
    discounts: [] as unknown[],
    sku: variant?.sku ?? '',
    grams: 0,
    vendor: product?.vendor ?? '',
    taxable: true,
    product_id: product?.id ?? 0,
    product_has_only_default_variant: onlyDefault,
    gift_card: false,
    final_price: line.price,
    final_line_price: line.lineTotal,
    url: `/products/${line.productHandle}?variant=${line.variantId}`,
    featured_image: image ? { url: image, alt: product?.title ?? '', aspect_ratio: 1 } : null,
    image,
    handle: line.productHandle,
    requires_shipping: true,
    product_type: product?.type ?? '',
    product_title: line.title,
    product_description: product?.subtitle ?? '',
    variant_title: onlyDefault ? null : line.variantTitle,
    variant_options: variant?.options ?? ['Default Title'],
    options_with_values: optionsWithValues,
    line_level_discount_allocations: [] as unknown[],
    line_level_total_discount: 0,
    has_components: false,
  };
}

export function toShopifyCart(cart: Cart) {
  const e = extras(cart.id);
  const items = cart.lines.map(toShopifyLine);
  const subtotal = cart.subtotal;
  const codes = e.codes ?? cart.discountCodes.map((d) => d.code);
  const known = new Map(cart.discountCodes.map((d) => [d.code.toUpperCase(), d.applicable]));
  const discountCodes = codes.map((code) => ({
    code,
    applicable: (known.get(code.toUpperCase()) ?? Boolean(CODES[code.toUpperCase()])) && items.length > 0,
  }));
  const applications = discountCodes
    .filter((d) => d.applicable && CODES[d.code.toUpperCase()])
    .map((d) => {
      const percent = CODES[d.code.toUpperCase()];
      return {
        type: 'discount_code',
        key: d.code,
        title: d.code,
        description: '',
        value: `${percent}.0`,
        created_by_user: false,
        value_type: 'percentage',
        allocation_method: 'across',
        target_selection: 'all',
        target_type: 'line_item',
        total_allocated_amount: Math.round((subtotal * percent) / 100),
      };
    });
  const discount = Math.min(
    subtotal,
    applications.reduce((n, a) => n + a.total_allocated_amount, 0),
  );
  return {
    token: cart.id,
    note: cart.note ?? '',
    attributes: { ...e.attributes },
    original_total_price: subtotal,
    total_price: subtotal - discount,
    total_discount: discount,
    total_weight: 0,
    item_count: cart.itemCount,
    items,
    requires_shipping: items.length > 0,
    currency: cart.currency || site.currency,
    items_subtotal_price: subtotal,
    cart_level_discount_applications: applications,
    discount_codes: discountCodes,
  };
}

export const cartJson = async (id: string) => toShopifyCart(await cartStore.get(id));
