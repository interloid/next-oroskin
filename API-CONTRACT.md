# Oroskin storefront API contract

For the NestJS team. The Next.js storefront (`oroskin-next`) reads **all** its data from this REST API.
A working mock of every endpoint lives in this repo (`src/app/api/**`, logic in `src/lib/db.ts`): run
`npm run dev` and call `http://localhost:3000/api/...` to see real responses. Build the same paths and the
same JSON shapes, and the frontend switches to your server by setting one env variable.

- Machine-readable version: [`openapi.yaml`](./openapi.yaml) (OpenAPI 3.1).
- Types: [`src/lib/types.ts`](./src/lib/types.ts) (copied below; that file is the source of truth).

## 1. Basics

| Topic | Rule |
| --- | --- |
| **Base URL** | Anything, e.g. `https://api.oroskin.com/api`. The frontend reads it from `API_URL` and appends the paths below (`API_URL + "/products/skin-tint"`). No trailing slash. |
| **Format** | JSON in, JSON out, UTF-8. `Content-Type: application/json` on every body. |
| **Money** | Integers in **minor units** (paise / cents): `12500` = Rs. 125.00. Never floats, never formatted strings. The display format comes from `Site.moneyFormat` (`"Rs. {{amount}}"`). One currency per store (`Site.currency`, `Cart.currency`). |
| **Images** | `src` / `image` fields are **absolute CDN URLs in production** (`https://cdn.oroskin.com/products/skin-tint-1.webp`). The mock uses paths on the frontend domain (`/images/skin-tint-1.webp`); both work. Always send `alt` text for product images. `null` = no image. |
| **Dates** | ISO 8601 strings in UTC (`"2026-10-28T08:00:00Z"`). |
| **Handles** | URL slugs, lowercase, `a-z0-9-` (`/products/<handle>`, `/collections/<handle>`, `/articles/<handle>`). Unique per type. |
| **Ids** | Products, variants, collections, articles: numbers. Cart id and order id: strings. |
| **Caching** | The frontend calls with `cache: 'no-store'` (always fresh). Feel free to cache on your side; `Cache-Control` is ignored for now. |
| **Auth** | None for the demo (public storefront data). Cart ids are unguessable tokens (see Cart). |
| **CORS** | Not needed: the frontend calls the API **server to server** (Next.js server components and route handlers). Enable CORS for the storefront origin only if browser JavaScript is later pointed at the API directly. |

### Errors

Every error is JSON with the human-readable text in `error` **and** `message` (the frontend's cart code shows
`message`, so put the visitor-facing text there; NestJS's default `HttpException` body already has `message`):

```json
{ "error": "Product \"nope\" not found", "message": "Product \"nope\" not found" }
```

| Status | When |
| --- | --- |
| `400` | Bad input: body not JSON, a required field missing, wrong type, invalid email, invalid cart id. |
| `404` | A single resource that does not exist: `GET /pages/:slug`, `/products/:handle`, `/collections/:handle`, `/articles/:handle`, a cart line key that is not in the cart, an unknown variant id on add. **The frontend turns a 404 into its "not found" page, so only send 404 for these.** |
| `422` | Business rule: the variant is sold out, or the quantity is above the stock. Body: `{ "error": "Only 25 of Skin Tint in stock", "message": "Only 25 of Skin Tint in stock", "available": 22 }` (`available` = how many more can be added). |
| `201` | `POST /orders` success. Every other success is `200`. |
| `5xx` | Your bugs. The frontend shows an error page. |

**List endpoints never 404**: an unknown handle or tag gives `[]` with 200 (`/products?handles=nope` → `[]`,
`/products/nope/recommendations` → `[]` or other products).

**Be lenient with query strings**: they come straight from the visitor's URL. An invalid or zero `page` /
`pageSize` → the default, an invalid price → no price filter, an unknown `sort` → the collection's own order.
Do not answer 400 for these (the frontend would show an error page instead of a list).

## 2. Endpoints

Paths are relative to the base URL. `:param` = path parameter (URL-encoded).

| # | Method | Path | Body | Response |
| --- | --- | --- | --- | --- |
| 1 | GET | `/site` | | `Site` |
| 2 | GET | `/pages/:slug` | | `PageContent` / 404 |
| 3 | GET | `/products?handles=a,b&q=&limit=` | | `Product[]` |
| 4 | GET | `/products/:handle` | | `Product` / 404 |
| 5 | GET | `/products/:handle/recommendations?limit=4` | | `Product[]` |
| 6 | GET | `/collections` | | `Collection[]` |
| 7 | GET | `/collections/:handle?sort=&page=&pageSize=&type=a,b&available=&minPrice=&maxPrice=` | | `CollectionPage` / 404 |
| 8 | GET | `/articles?tag=&limit=` | | `Article[]` |
| 9 | GET | `/articles/:handle` | | `Article` / 404 |
| 10 | GET | `/cart/:id` | | `Cart` |
| 11 | POST | `/cart/:id/items` | `{ variantId, quantity? }` | `{ cart: Cart, line: CartLine }` |
| 12 | PATCH | `/cart/:id/items/:key` | `{ quantity }` | `Cart` |
| 13 | PUT | `/cart/:id/note` | `{ note }` | `Cart` |
| 14 | POST | `/cart/:id/discounts` | `{ code }` | `Cart` |
| 15 | DELETE | `/cart/:id` | | `Cart` (empty) |
| 16 | POST | `/newsletter` | `{ email }` | `{ ok: true }` |
| 17 | POST | `/contact` | `{ name, email, message, ... }` | `{ ok: true }` |
| 18 | POST | `/orders` | `{ cartId, customer, shippingAddress }` | `Order` (201) |

### 1. `GET /site`

The whole site chrome in one call: brand, announcement bar, main menu, footer. Called on **every** page.

```json
{
  "name": "Oroskin",
  "currency": "INR",
  "moneyFormat": "Rs. {{amount}}",
  "logo": {
    "image": "/cdn/shop/files/Analysis_output_1_1.png",
    "imageWidth": 100,
    "imageHeight": 146,
    "text": "Oro",
    "accent": "Skin"
  },
  "announcement": {
    "mode": "slideshow",
    "autoplay": true,
    "intervalSeconds": 5,
    "uppercase": true,
    "messages": [
      {
        "text": "OroSkin • Signature collection • Estd. 2026"
      }
    ]
  },
  "menu": [
    {
      "title": "Shop",
      "url": "#",
      "panelTitle": "Shop by category",
      "shopAll": {
        "label": "Shop all",
        "url": "/collections/all"
      },
      "children": [
        {
          "title": "Makeup",
          "url": "/collections/makeup",
          "image": "/cdn/shop/files/Makeup-banner.png",
          "imageWidth": 2000,
          "imageHeight": 1335,
          "text": "Effortless, radiant color for the face, lips and eyes — clean and buildable."
        }
      ]
    },
    {
      "title": "About Us",
      "url": "/pages/about-us"
    }
  ],
  "search": {
    "placeholder": "Search for skincare, fragrances, makeup products…",
    "trending": [
      "Rose perfume",
      "Cloud cleanser",
      "Radiance renewal serum"
    ]
  },
  "footer": {
    "tagline": "<p>Elevating your daily ritual with high-performance makeup, advanced skincare, and signature fragrances.</p>",
    "menu": [
      {
        "title": "Shop",
        "url": "#",
        "children": [
          {
            "title": "All Products",
            "url": "/collections/all"
          },
          {
            "title": "Makeup",
            "url": "/collections/makeup"
          }
        ]
      }
    ],
    "newsletter": {
      "heading": "Newsletter",
      "text": "<p>Receive curated beauty tips, exclusive offers, and new arrivals directly to your inbox.</p>",
      "placeholder": "Enter your email",
      "buttonLabel": "Subscribe"
    },
    "social": [
      {
        "network": "facebook",
        "url": "#"
      }
    ],
    "wordmark": {
      "word": "Oro",
      "accent": "Skin"
    },
    "copyright": "© 2026 Oroskin. All rights reserved.",
    "payment": [
      "visa",
      "master"
    ],
    "countries": [
      {
        "code": "BA",
        "name": "Bosnia & Herzegovina",
        "currency": "BAM КМ"
      }
    ],
    "languages": [
      {
        "code": "en",
        "name": "English",
        "current": true
      },
      {
        "code": "ta",
        "name": "தமிழ்"
      }
    ]
  }
}
```

### 2. `GET /pages/:slug`

A page's content: an ordered list of sections (see [§4 Pages](#4-pages-change-the-design-by-json)).
404 when the slug does not exist.

```json
{
  "slug": "home",
  "title": "Home",
  "seo": { "title": "Oroskin", "description": "Luxury skincare..." },
  "sections": [
    { "id": "hero", "type": "hero", "props": { "...": "..." } },
    { "id": "product_panels", "type": "product-panels", "props": { "collection": "new-arrivals" } }
  ]
}
```

### 3. `GET /products?handles=a,b&q=&limit=`

| Query | Meaning |
| --- | --- |
| `handles` | Comma list. Return those products **in that order**; skip unknown handles. |
| `q` | Text search (title, type, subtitle, tags; case-insensitive). Used by the search page. |
| `limit` | Max items. Missing = all. |

No query = all products. `handles` and `q` can be combined (search inside the list). Response: `Product[]`.

### 4. `GET /products/:handle`

```json
{
  "id": 1001,
  "handle": "skin-tint",
  "title": "Skin Tint",
  "subtitle": "A sheer, buildable skin tint with light-reflecting pearls",
  "vendor": "Oroskin",
  "type": "Makeup",
  "tags": ["makeup", "new", "face"],
  "badges": ["New"],
  "descriptionHtml": "<p>A weightless tint that evens skin tone...</p>",
  "rating": { "value": 4.3, "count": 12 },
  "price": 12500,
  "compareAtPrice": null,
  "available": true,
  "options": [{ "name": "Shade", "values": ["Fair", "Light"] }],
  "variants": [
    {
      "id": 100101,
      "sku": "ORO-SKIN-TINT-01",
      "title": "Fair",
      "options": ["Fair"],
      "price": 12500,
      "compareAtPrice": null,
      "available": true,
      "inventory": 25,
      "image": null
    }
  ],
  "images": [{ "src": "/images/skin-tint-1.webp", "alt": "Skin Tint, front view, centred" }]
}
```

Rules: `price` = the lowest variant price, `available` = at least one variant available, `compareAtPrice`
only when it is higher than `price` (else `null`). A product with no options has `options: []` and one variant
with `title: "Default"`, `options: []`. `variant.image` = the URL of that variant's image or `null`.

### 5. `GET /products/:handle/recommendations?limit=4`

"You may also like": other products, same `type` first, never the product itself, only products with images.
`limit` default 4. Unknown handle → `[]` or any products (never 404). Response: `Product[]`.

### 6. `GET /collections`

`Collection[]` (the "all collections" page). `productHandles` = the products in the collection's own order.

```json
[{ "id": 2, "handle": "skincare", "title": "Skincare", "description": "Serums, creams and rituals for luminous skin.",
   "image": "/images/collection-skincare.webp", "productHandles": ["radiance-vitamin-c-serum", "the-skin-moisturizer"] }]
```

A collection `all` with every product must exist (`/collections/all` is the main shop link).

### 7. `GET /collections/:handle`

| Query | Meaning | Default |
| --- | --- | --- |
| `sort` | `manual`, `best-selling`, `created-descending`, `price-ascending`, `price-descending`, `title-ascending`, `title-descending` (Shopify names; the frontend passes the URL's `sort_by`). Unknown = collection order. | collection order |
| `page` | 1-based page. | 1 |
| `pageSize` | Products per page (cap at 250). | 24 |
| `type` | Comma list of product types (OR). | all |
| `available` | `true` / `1` = in stock only. `false` / missing = all. | all |
| `minPrice`, `maxPrice` | Minor units, inclusive, on `Product.price`. Round decimals. | none |

Response = the `Collection` + the filtered, sorted page of products + filter options. `total` = the number of
products **after** filters (for "26 products" and the page count). The filter `values[].count` and the price
`min` / `max` are computed on the **whole** collection (before filters), and `active` says which value is selected.

```json
{
  "id": 2, "handle": "skincare", "title": "Skincare", "description": "Serums, creams and rituals for luminous skin.",
  "image": "/images/collection-skincare.webp", "productHandles": ["radiance-vitamin-c-serum", "..."],
  "products": [{ "...Product": "..." }],
  "total": 9, "page": 1, "pageSize": 1,
  "filters": [
    { "id": "type", "label": "Product type", "type": "list",
      "values": [{ "value": "Skincare", "label": "Skincare", "count": 9, "active": false }] },
    { "id": "availability", "label": "Availability", "type": "list",
      "values": [{ "value": "1", "label": "In stock", "count": 9, "active": false }] },
    { "id": "price", "label": "Price", "type": "price_range", "min": 2400, "max": 8900 }
  ]
}
```

### 8. `GET /articles?tag=&limit=`

Blog articles, **newest first**. `tag` = case-insensitive tag match (the blog's topic pills). `Article[]`.

### 9. `GET /articles/:handle`

```json
{
  "id": 1,
  "handle": "the-art-of-the-golden-hour-morning-ritual",
  "title": "The Art of the Golden Hour Morning Ritual",
  "author": "Dr. Céleste Arnaud",
  "tags": ["Science"],
  "publishedAt": "2026-10-28T08:00:00Z",
  "image": "/images/blog-glow-routine.webp",
  "imageAlt": "Woman applying serum in warm morning light",
  "excerpt": "How the most luminous skin in the world begins not with products...",
  "contentHtml": "<p>There is a certain quality of light...</p>",
  "readingMinutes": 3
}
```

`contentHtml` is trusted HTML from the CMS (the frontend renders it as is: sanitise on save).

### Cart (10–15)

- **Cart id**: an opaque string (1–128 characters, no `/`, no whitespace). The browser keeps it in the cookie
  **`oro_cart`** (random, 30 days). **The frontend creates it** (`src/proxy.ts`, on the first request), reads it
  on the server and passes it URL-encoded as the `:id` path parameter. The backend never creates ids.
- **Who calls the cart endpoints**: the Next.js server only (no browser calls). With `API_URL` set,
  `src/lib/cart-store.ts` forwards every cart action of the storefront's Shopify-style cart URLs
  (`/cart/add.js`, `/cart/change.js`, `/cart/update.js`, `/cart/clear.js`, `/cart.js`, the no-JS cart form, the
  demo checkout) to exactly these endpoints:

  | `cartStore` method | Backend call |
  | --- | --- |
  | `get` | `GET /cart/:id` |
  | `add` | `POST /cart/:id/items` `{ variantId, quantity }` |
  | `setQuantity` | `PATCH /cart/:id/items/:key` `{ quantity }` (0 removes) |
  | `setNote` | `PUT /cart/:id/note` `{ note }` |
  | `addDiscount` | `POST /cart/:id/discounts` `{ code }` |
  | `clear` | `DELETE /cart/:id` |
  | `placeOrder` | `POST /orders` `{ cartId, customer, shippingAddress }` |

  A non-2xx answer is shown to the visitor with its status (`message` text), so 404 / 422 texts must be readable.
- **An unknown id is not an error**: `GET /cart/:id` returns an empty cart with that id, and the first add
  creates it. Carts can expire after e.g. 30 days.
- `lineTotal = price × quantity`, `itemCount` = sum of quantities, `subtotal` = sum of line totals (before discounts).
- Every mutation returns the **whole updated cart** (the add also returns the line).

#### 10. `GET /cart/:id`

```json
{
  "id": "6f1c2a9e-...",
  "lines": [
    { "key": "100102:i4kl2f", "variantId": 100102, "productHandle": "skin-tint", "title": "Skin Tint",
      "variantTitle": "Light", "image": "/images/skin-tint-light.webp", "quantity": 2,
      "price": 12500, "compareAtPrice": null, "lineTotal": 25000 }
  ],
  "itemCount": 2,
  "subtotal": 25000,
  "discountCodes": [{ "code": "GLOW10", "applicable": true }],
  "note": "",
  "currency": "INR"
}
```

`variantTitle` is `null` for products without options. `image` = the variant image, else the product's first image.

#### 11. `POST /cart/:id/items`

Body `{ "variantId": 100102, "quantity": 2 }` (`quantity` 1–9999, default 1). Adding a variant that is already
in the cart adds to its line. → `{ "cart": Cart, "line": CartLine }`. 404 unknown variant, 422 sold out / above stock.

#### 12. `PATCH /cart/:id/items/:key`

Body `{ "quantity": 3 }`. `:key` = the line `key` (URL-encode it: `100102%3Ai4kl2f`) **or** the variant id.
`quantity: 0` removes the line. → `Cart`. 404 line not in the cart, 422 above stock.

#### 13. `PUT /cart/:id/note`

Body `{ "note": "Gift wrap, please" }` (`""` clears it, max 5000 characters). → `Cart`.

#### 14. `POST /cart/:id/discounts`

Body `{ "code": "GLOW10" }`. A wrong code is **still added** with `applicable: false` (the cart page shows it
as not applicable), so this is 200, not 4xx. Adding the same code twice does nothing. → `Cart`.
(Mock: only `GLOW10` is applicable; the discount amount is not part of the contract yet.)

#### 15. `DELETE /cart/:id`

Empties the cart. → the empty `Cart`.

### 16. `POST /newsletter`

Body `{ "email": "ana@example.com" }` → `{ "ok": true }`. 400 for a missing or invalid email.
Subscribing twice is not an error.

### 17. `POST /contact`

Body `{ "name": "Ana", "email": "ana@example.com", "message": "Hello", "phone": "...", "topic": "order", "orderNumber": "#1001", "subject": "..." }`.
`name`, `email`, `message` are required; the others are optional strings (accept and store unknown string fields).
→ `{ "ok": true }`.

How the frontend uses it: the storefront's contact forms post a normal HTML form (`contact[email]`,
`contact[body]`, `contact[Name]` or `contact[First name]` + `contact[Last name]`, plus extra fields such as
`contact[Phone]`, `contact[Order number]`) to the **frontend's** `POST /api/contact`. That handler answers
`303` back to the form's page with `?contact_posted=true` or `?contact_error=email|body|server`. With `API_URL`
set it forwards **JSON** to the backend: `{ name, email, message, ...extra }`, where the extra keys keep their
form names (`"Phone"`, `"Order number"`; so accept any string keys). Any non-2xx answer = `contact_error=server`.
The backend only implements the JSON version.

### 18. `POST /orders`

Creates an order from a cart (mock checkout; no payment). Body:

```json
{
  "cartId": "6f1c2a9e-...",
  "customer": { "email": "ana@example.com", "firstName": "Ana", "lastName": "Roy", "phone": "+91..." },
  "shippingAddress": { "firstName": "Ana", "lastName": "Roy", "address1": "1 MG Road", "address2": "",
    "city": "Chennai", "province": "TN", "zip": "600001", "country": "IN", "phone": "+91..." }
}
```

Required: `cartId`, `customer.email`, `shippingAddress.firstName`, `lastName`, `address1`, `city`, `zip`,
`country`. 400 when the cart is empty. On success the cart is **emptied** and the response is `201`:

```json
{
  "id": "ORO-1001", "cartId": "6f1c2a9e-...", "status": "pending", "createdAt": "2026-11-26T17:56:59.061Z",
  "customer": { "email": "ana@example.com" },
  "shippingAddress": { "firstName": "Ana", "...": "..." },
  "lines": [{ "...CartLine": "..." }],
  "itemCount": 4, "subtotal": 50000,
  "discountCodes": [{ "code": "GLOW10", "applicable": true }],
  "note": "", "currency": "INR"
}
```

## 3. Types

Copied from `src/lib/types.ts` (source of truth). `Order` is defined in `src/app/api/orders/route.ts`.

```ts
export type Money = number; // minor units

export interface Image {
  src: string; // absolute URL (production) or a path on the frontend's domain
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
  handle: string;
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

export interface PageContent {
  slug: string;
  title: string;
  seo?: { title?: string; description?: string };
  sections: SectionData[];
}

export interface SectionData<P = Record<string, unknown>> {
  id: string; // unique within the page
  type: string; // the React component (see §4)
  props: P; // that component's content
}

// Contract-only (not in types.ts yet)
export interface Order {
  id: string;
  cartId: string;
  status: 'pending';
  createdAt: string;
  customer: { email: string; firstName?: string; lastName?: string; phone?: string };
  shippingAddress: Record<string, string>;
  lines: CartLine[];
  itemCount: number;
  subtotal: Money;
  discountCodes: { code: string; applicable: boolean }[];
  note: string;
  currency: string;
}
```

## 4. Pages: change the design by JSON

A page is **an ordered list of sections**. Each section has an `id` (unique in the page), a `type` (which React
component draws it) and `props` (its content). The frontend draws them top to bottom. To change a page you
reorder, add, remove or edit entries; no frontend deploy is needed.

**Storage:** keep each page as one JSON document, e.g. a `pages` table with `slug` (unique) + `content`
(JSON/JSONB column holding the whole `PageContent`). Day one: seed it from `src/data/pages/*.json` and return
the column as is. A CMS / admin editor can come later and only writes that column.

**Slugs the frontend requests:**

| Route | Slug | Extra data the sections get |
| --- | --- | --- |
| `/` | `home` | |
| `/products/:handle` | `product` (one layout for every product) | the `Product` from `/products/:handle` |
| `/collections/:handle` | `collection` (one layout for every collection) | the `CollectionPage` from `/collections/:handle` |
| `/collections` | `collections` | |
| `/cart` | `cart` | |
| `/search?q=` | `search` | the URL query |
| `/blogs/:blog` | `blog` | the URL query |
| `/blogs/:blog/:article` | `article` | the `Article` from `/articles/:handle` |
| `/pages/:handle` | `:handle` (e.g. `about-us`, `contact`, `faq`, `privacy`, `terms`, `returns`) | |

Sections that need commerce data take **handles** in their props (`"products": ["skin-tint"]`,
`"collection": "new-arrivals"`) and fetch the data themselves through endpoints 3–9; never copy product data
into page JSON.

**Site chrome** (`announcement-bar`, `header`, `footer`) is not in the page JSON: it is drawn on every page from
`GET /site` (and the cart for the header's count).

### Section types in use

Read from `src/sections/<type>.tsx` (the source of truth; named types used inside props, e.g. `ZoomPoint`, are
defined in the same file). Every field is optional: `props: {}` renders the defaults. Most sections also take:

```ts
interface SectionCommon {
  colorScheme?: 'scheme-1' | 'scheme-2' | 'scheme-3' | 'scheme-4' | 'scheme-5'; // cream, white, red, gold, dark
  width?: 'narrow' | 'standard' | 'wide' | 'widest' | 'full';
  paddingTop?: number; // px
  paddingBottom?: number; // px
}
```

Site chrome (`announcement-bar`, `header`, `footer`) gets `site` / `cart` from the frontend, not from page JSON.

**Which page uses which types** (`src/data/pages/<slug>.json`, in page order):

| Page | Sections |
| --- | --- |
| `about-us` | `about-hero`, `about-chapters`, `about-pillars`, `about-timeline`, `about-team`, `about-values`, `about-numbers`, `marquee` |
| `article` | `article-hero`, `article`, `article-comments`, `article-related` |
| `blog` | `blog-hero`, `blog-trending`, `blog`, `icon-features` |
| `cart` | `cart`, `product-list` |
| `collection` | `collection-banner`, `collection`, `collection-tiles`, `icon-features` |
| `collections` | `collections` |
| `contact` | `contact-form`, `contact-channels`, `locations-map`, `contact-locations` |
| `faq` | `faq` |
| `home` | `hero`, `product-panels`, `scrolling-showcase`, `product-deck`, `blog-stories`, `image-banner`, `testimonials`, `image-banner`, `icon-features` |
| `product` | `product`, `product-pairs`, `product-tabs`, `product-overview`, `product-highlights`, `product-how-to`, `product-clinical`, `product-reviews`, `product-faq`, `product-related` |
| `search` | `search` |

#### `about-chapters` (about-us)

```ts
interface AboutChaptersProps extends Pick<SectionCommon, 'colorScheme'>, AboutScreenOptions {
  textColor?: string;
  labelColor?: string;
  overlayOpacity?: number; // %
  chapters: AboutChapter[];
}
```

#### `about-hero` (about-us)

```ts
interface AboutHeroProps extends SectionCommon, AboutScreenOptions {
  showBreadcrumb?: boolean;
  pageTitle?: string;
  scriptText?: string;
  headingLine1?: string; // HTML
  /** Line 2 and its alternatives (HTML); 2+ = they rotate. */
  headingLine2?: string[];
  rotateInterval?: number; // seconds
  headingScale?: number; // %
  text?: string; // HTML
  buttonLabel?: string;
  buttonLink?: string;
  linkLabel?: string;
  linkUrl?: string;
  cardLabel?: string;
  disciplines?: AboutDiscipline[];
}
```

#### `about-numbers` (about-us)

```ts
interface AboutNumbersProps extends SectionCommon, AboutScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  stagger?: boolean;
  stats: AboutStat[];
}
```

#### `about-pillars` (about-us)

```ts
interface AboutPillarsProps extends Pick<SectionCommon, 'colorScheme' | 'width'>, AboutScreenOptions {
  /** Photos drift in two columns (odd photos left, even right); up to 8. */
  photos?: AboutImage[];
  drift?: boolean;
  pillars: AboutPillar[];
}
```

#### `about-team` (about-us)

```ts
interface AboutTeamProps extends SectionCommon, AboutScreenOptions {
  sideWord?: string;
  showArrows?: boolean;
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent, <strong> = brush underline
  text?: string; // HTML
  animation?: 'fade-up' | 'none';
  members: AboutTeamMember[];
}
```

#### `about-timeline` (about-us)

```ts
interface AboutTimelineProps extends SectionCommon, AboutScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent words
  milestones: AboutMilestone[];
}
```

#### `about-values` (about-us)

```ts
interface AboutValuesProps extends SectionCommon, AboutScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  featureFirst?: boolean;
  animation?: 'fade-up' | 'none';
  values: AboutValue[];
}
```

#### `announcement-bar` (site chrome)

```ts
interface AnnouncementBarProps {
  site: Site;
  colorScheme?: string; // default scheme-3 (red)
}
```

#### `article` (article)

```ts
interface ArticleProps extends SectionCommon {
  showAuthor?: boolean;
  showContents?: boolean;
  showProducts?: boolean; // the sidebar's product cards (first 2)
  showEditRows?: boolean; // "The edit" product rows in the text (at the [products] paragraph, else after the text)
  showTags?: boolean;
  showShare?: boolean;
  showShareRow?: boolean;
  showAuthorBio?: boolean;
  stickySidebar?: boolean;
  scaleWithScreen?: boolean;
  textScale?: number; // %
  /** Products per article handle (theme: article metafield custom.products). */
  articleProducts?: Record<string, string[]>;
  /** Author bios by author name (theme: the staff account's bio). */
  authorBios?: Record<string, string>;
}
```

#### `article-comments` (article)

```ts
interface ArticleCommentsProps extends SectionCommon {
  heading?: string;
  alignWithText?: boolean;
  scaleWithScreen?: boolean;
  /** Approved comments per article handle, newest first. */
  comments?: Record<string, ArticleComment[]>;
}
```

#### `article-hero` (article)

```ts
interface ArticleHeroProps extends SectionCommon {
  showBreadcrumb?: boolean;
  showTopic?: boolean;
  showShare?: boolean;
  scaleWithScreen?: boolean;
  textScale?: number; // %
  cornerRadius?: number; // px
  /** Words of a title shown in the accent colour, per article handle (theme: metafield custom.title_highlight). */
  titleHighlights?: Record<string, string>;
}
```

#### `article-related` (article)

```ts
interface ArticleRelatedProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent words
  linkLabel?: string;
  link?: string;
  limit?: number;
  alignWithText?: boolean;
  scaleWithScreen?: boolean;
  animation?: 'none' | 'fade-up';
  topicScheme?: string;
  arrowScheme?: string;
}
```

#### `blog` (blog)

```ts
interface BlogProps extends SectionCommon {
  showSearch?: boolean;
  showTags?: boolean;
  stickyToolbar?: boolean;
  showFeatured?: boolean;
  featuredArticle?: string; // handle; empty = the newest
  featuredLabel?: string;
  perPage?: number; // the featured story counts on page 1
  layout?: 'mixed' | 'even';
  animation?: 'none' | 'fade-up';
  topicScheme?: string;
  arrowScheme?: string;
}
```

#### `blog-hero` (blog)

```ts
interface BlogHeroProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent words. Empty = the blog's title
  text?: string; // HTML
  showBreadcrumb?: boolean;
  fillScreen?: boolean;
  scaleWithScreen?: boolean;
  textScale?: number; // %
  floatCards?: boolean;
  /** Counter labels; a value overrides the number counted from the blog, 0 hides the counter. */
  counters?: { articlesLabel?: string; articles?: number | string; authorsLabel?: string; authors?: number | string; topicsLabel?: string; topics?: number | string };
  cards?: {
    value?: string;
    icon?: string; // icon name from public/assets/icon-<name>.svg: eye, heart, pencil, award, ...
    text?: string;
  }[];
}
```

#### `blog-stories` (home)

```ts
interface BlogStoriesProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML (<em> = italic accent words)
  linkLabel?: string;
  link?: string;
  highlightColor?: string;
  layout?: 'featured-left' | 'featured-right';
  animation?: 'none' | 'fade-up' | 'slide-bottom' | 'zoom-in';
  /** One entry per place. `article` = handle; empty = the next newest article not picked elsewhere. */
  stories?: {
    article?: string;
    image?: string; // replaces the article's image
    category?: string; // replaces the article's first tag
    pill?: string; // e.g. "Featured story" (shows on the featured card)
    size?: 'auto' | 'featured' | 'landscape' | 'small' | 'portrait';
    zoom?: number; // hover zoom in %, default 112
    zoomPoint?: ZoomPoint;
  }[];
}
```

#### `blog-trending` (blog)

```ts
interface BlogTrendingProps extends SectionCommon {
  heading?: string; // inline HTML, <em> = accent words
  linkLabel?: string;
  link?: string;
  /** Rows: article handles (+ an optional views text). Empty = the 5 newest articles. */
  articles?: { article: string; views?: string }[];
  showMetaTopic?: boolean;
  fillScreen?: boolean;
  scaleWithScreen?: boolean;
  textScale?: number; // %
  animation?: 'none' | 'slide-left' | 'fade-up';
  video?: {
    youtubeId?: string;
    vimeoId?: string;
    poster?: string;
    label?: string; // "Video · 12:40"
    title?: string;
    position?: 'left' | 'right';
    radius?: number; // px
  };
}
```

#### `cart` (cart)

```ts
interface CartProps extends SectionCommon {
  showBreadcrumb?: boolean;
  eyebrow?: string;
  heading?: string;
  /** Empty bag */
  emptyTitle?: string;
  emptyText?: string; // HTML
  emptyLinkLabel?: string;
  emptyLink?: string;
  emptyButtonLabel?: string;
  emptyButtonsDirection?: 'row' | 'column';
  /** "Continue shopping" target */
  continueLink?: string;
  showNote?: boolean;
  showCoupons?: boolean;
  /** Free shipping from this order total, in minor units (20000 = Rs. 200). 0 = no bar */
  freeShippingThreshold?: number;
  /** "Links and highlights" colour override (hex) */
  highlightColor?: string;
}
```

#### `collection` (collection)

```ts
interface CollectionProps extends SectionCommon {
  showTitle?: boolean;
  showFilters?: boolean;
  showCount?: boolean;
  showSort?: boolean;
  showViewSwitch?: boolean;
  columnsDesktop?: number;
  imageRatio?: 'portrait' | 'square' | 'landscape' | 'original';
  /** Category pills (menu). count is filled from the linked collection when left out. */
  pills?: Pill[];
  pillImageAnimation?: 'collection-pills--image-rise' | 'collection-pills--image-scale' | 'collection-pills--image-none';
  pillImageSize?: number;
  /** Empty collection: suggestions from this collection handle. */
  emptyCollection?: string;
  emptyHeading?: string;
}
```

#### `collection-banner` (collection)

```ts
interface CollectionBannerProps extends SectionCommon {
  /** HTML. Codes: [image_1] [image_2] [image_3], [break]. */
  sentence?: string;
  photos?: SentencePhoto[];
  /** Indent of each line in em (staggered layout). */
  lineIndents?: number[];
  sentenceLayout?: 'staggered' | 'centered';
  titlePosition?: 'start' | 'center';
  showBreadcrumb?: boolean;
  showDescription?: boolean;
  /** Large image when the collection has none (or always, with useCollectionImage false). */
  image?: { src: string; width?: number; height?: number };
  useCollectionImage?: boolean;
  imageWidth?: number; // % of the screen from 990px
  underHeader?: boolean;
  highlightColor?: string;
}
```

#### `collection-tiles` (collection)

```ts
interface CollectionTilesProps extends SectionCommon {
  tileStyle?: 'photo' | 'promo';
  heading?: string;
  tileRatio?: string; // "4 / 3"
  photoAnimation?: 'none' | 'breathe' | 'float' | 'sway' | 'twinkle' | 'spin' | 'rock' | 'flash';
  photoAnimationSpeed?: number; // s
  highlightColor?: string;
  tiles: Tile[];
}
```

#### `collections` (collections)

```ts
interface CollectionsProps extends SectionCommon {
  eyebrow?: string;
  heading?: string;
  layout?: 'tiles' | 'cards';
  columnsDesktop?: number;
  tileRatio?: string; // "1 / 1"
  cardRadius?: number; // px
  showEmpty?: boolean;
  animation?: 'none' | 'fade-up';
  /** Only these collections, in this order (default: all). */
  handles?: string[];
}
```

#### `contact-channels` (contact)

```ts
interface ContactChannelsProps extends SectionCommon, ScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  animation?: 'fade-up' | 'slide-left' | 'none';
  channels: ContactChannel[];
}
```

#### `contact-form` (contact)

```ts
interface ContactFormProps extends SectionCommon, ScreenOptions {
  showBreadcrumb?: boolean;
  breadcrumbTitle?: string;
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent words
  text?: string; // HTML
  image?: { src: string; width?: number; height?: number; alt?: string };
  statValue?: string;
  statLabel?: string;
  supportTitle?: string;
  supportHours?: string;
  formHeading?: string;
  topics?: string[];
  showOrderNumber?: boolean;
  animation?: 'fade-up' | 'slide-left' | 'none';
  action?: string; // form endpoint
}
```

#### `contact-locations` (contact)

```ts
interface ContactLocationsProps extends SectionCommon, ScreenOptions {
  socialEyebrow?: string;
  socialHeading?: string; // HTML
  socialIconStyle?: 'brand' | 'mono';
  social?: SocialCard[];
  locationsEyebrow?: string;
  locationsHeading?: string; // HTML
  locations?: LocationCard[];
  animation?: 'fade-up' | 'none';
}
```

#### `faq` (faq)

```ts
interface FaqProps extends SectionCommon {
  showBreadcrumb?: boolean;
  /** Current item of the breadcrumb (the page title). */
  pageTitle?: string;
  eyebrow?: string;
  heading?: string; // HTML (inline: <em> = accent word)
  text?: string; // HTML
  /** "Ask human" link in the answer card ('' = no button). */
  askLink?: string;
  questionRadius?: number; // px
  scaleScreen?: boolean;
  textScale?: number; // %
  fillScreen?: boolean;
  topics: FaqTopic[];
  /** "Still unanswered?" card; null = no card. */
  contact?: FaqContact | null;
}
```

#### `footer` (site chrome)

```ts
interface FooterProps {
  site: Site;
  path?: string | null;
  colorScheme?: string; // default scheme-1
  showNewsletter?: boolean;
  showWordmark?: boolean;
}
```

#### `header` (site chrome)

```ts
interface HeaderProps {
  site: Site;
  cart?: Cart | null;
  transparent?: boolean;
  path?: string | null;
  colorScheme?: string; // bar + drawer, default scheme-1
  megaMenuScheme?: string; // default scheme-2
}
```

#### `hero` (home)

```ts
interface HeroProps extends SectionCommon {
  image?: HeroImage;
  mobileImage?: HeroImage; // tall image below 1024px; switches the mobile layout on
  height?: 'full' | 'large' | 'medium' | 'auto';
  contentX?: 'start' | 'center' | 'end';
  contentY?: 'start' | 'center' | 'end';
  textScaling?: 'screen' | 'fixed';
  contentSpacing?: 'between' | 'tight';
  overlay?: number; // %
  contentWidth?: number;
  contentGap?: number;
  productsStart?: number; // % where the products area begins
  mobileProductsStart?: number;
  mobileTextWidth?: number; // %
  rotateProducts?: boolean;
  rotateInterval?: number; // s
  resumeDelay?: number; // s
  content?: HeroContentItem[];
  decorations?: HeroDecoration[];
  products?: HeroProduct[];
}
```

#### `icon-features` (blog, collection, home)

```ts
interface IconFeaturesProps extends SectionCommon {
  heading?: string;
  showHeading?: boolean;
  style?: 'plain' | 'card';
  columnsDesktop?: number;
  columnsPhone?: 1 | 2;
  iconColor?: string;
  features: {
    icon: string; // icon name from public/assets/icon-<name>.svg: truck, shield-check, return, headset, leaf, ...
    title: string;
    text?: string; // HTML
    link?: string;
  }[];
}
```

#### `image-banner` (home)

```ts
interface ImageBannerProps extends SectionCommon {
  image?: { src: string; alt?: string; width?: number; height?: number };
  height?: 'full' | 'large' | 'medium' | 'small';
  overlayStyle?: 'gradient' | 'even';
  overlayOpacity?: number; // 0–100
  animation?: 'none' | 'fade-up' | 'slide-right' | 'slide-left' | 'slide-bottom' | 'zoom-in';
  /** Scroll scene with the Trending sheet: how the content leaves, and whether the sheet header slides in. */
  sceneStyle?: 'sideways' | 'vertical';
  headerSlide?: boolean;
  /** Left column: headings, texts and buttons in order. */
  content?: { gap?: number; maxWidth?: number; blocks: ContentBlockData[] };
  /** Right column: glass cards and / or a countdown. */
  cards?: {
    radius?: number;
    duration?: number; // ms
    stagger?: number; // ms
    animation?: 'none' | 'slide-left' | 'slide-right' | 'slide-top' | 'slide-bottom';
    items?: { icon?: string; label?: string; value?: string; link?: string }[]; // icon = public/assets/icon-<name>.svg
    countdown?: CountdownProps;
  };
  /** The Trending sheet: products from a collection handle, or a list of product handles. */
  trending?: {
    heading?: string; // inline HTML
    linkLabel?: string;
    link?: string; // default the collection's page
    collection?: string;
    products?: string[];
    limit?: number; // default 5, at most 8
    phoneLimit?: number;
    width?: number; // % from 1200px
    tabletWidth?: number;
    phoneWidth?: number;
    sceneLength?: number; // % of the screen height the scene scrolls
    headingSize?: number;
    titleSize?: number;
  };
}
```

#### `locations-map` (contact)

```ts
interface LocationsMapProps extends SectionCommon, ScreenOptions {
  eyebrow?: string;
  heading?: string; // HTML: <em> = accent word
  showFilters?: boolean;
  filterAll?: string;
  filterTypes?: string[];
  image?: { src: string; width: number; height: number; alt?: string };
  ratio?: number; // box shape on desktop (width / height)
  ratioMobile?: number; // box shape on phones
  focusX?: number; // 0–100
  focusY?: number; // 0–100
  animation?: 'fade-up' | 'none';
  pins: MapPin[];
}
```

#### `marquee` (about-us)

```ts
interface MarqueeProps extends Pick<SectionCommon, 'colorScheme' | 'paddingTop' | 'paddingBottom'> {
  text: string;
  separator?: string;
  outline?: boolean;
  direction?: 'left' | 'right';
  textSize?: number; // px at a 1920px screen
  speed?: number; // seconds per loop
}
```

#### `product` (product)

```ts
interface ProductProps extends SectionCommon {
  /** Override the page's product (else context.product). */
  productHandle?: string;
  showBreadcrumb?: boolean;
  breadcrumbParent?: { title: string; url: string } | null; // middle crumb (theme: the first collection)
  scaleWithScreen?: boolean;
  textScale?: number; // %, 100 = normal
  enableLightbox?: boolean;
  showStickyBar?: boolean;
  stickyMinimize?: boolean;
  cards?: InfoCard[];
}
```

#### `product-clinical` (product)

```ts
interface ProductClinicalProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  before?: Img;
  after?: Img;
  beforeLabel?: string;
  afterLabel?: string;
  /** Where the line starts, % from the left */
  start?: number;
  /** Text in the middle of the rings, under the first result's value */
  ringLabel?: string;
  /** value = percent (0–100). The first 4 also draw a ring. */
  results?: { label: string; value: number }[];
}
```

#### `product-deck` (home)

```ts
interface ProductDeckProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML: <em>word</em> = the highlighted word
  pill?: string; // small pill at the right of the heading
  badge?: string; // small label on every card ("New")
  buyLabel?: string; // the "Buy now" link in the info card; empty = no link
  linkLabel?: string; // "Explore all" button under the deck
  link?: string; // empty = /collections/<collection>
  productHandles?: string[];
  collection?: string;
  limit?: number;
  highlightColor?: string;
  cardHeight?: number; // % of the card width (85 = 0.85)
  cardSize?: number; // % (100 = Figma size)
  fanOnScroll?: boolean; // the stack fans out as the section scrolls in (never as the first section)
  fanStyle?: 'auto' | 'once' | 'scroll';
  cart?: QuickAddOptions;
}
```

#### `product-faq` (product)

```ts
interface ProductFaqProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  /** Answer = HTML */
  questions?: { question: string; answer: string }[];
  showForm?: boolean;
  formLabel?: string;
  formHeading?: string;
  /** Pale tint behind the section */
  tint?: boolean;
  /** The doodles (chat outline, question marks) */
  decorations?: boolean;
}
```

#### `product-highlights` (product)

```ts
interface ProductHighlightsProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  text?: string; // HTML
  benefits?: {
    icon?: string; // public/assets/icon-<name>.svg: drop, flask, sparkles, hours, leaf, shield-check
    title?: string;
    text?: string;
  }[];
  specs?: { label: string; value: string }[];
  animation?: 'none' | 'fade-up' | 'slide-bottom' | 'zoom-in';
}
```

#### `product-how-to` (product)

```ts
interface ProductHowToProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  steps?: {
    title?: string;
    text?: string;
    image?: { src: string; alt?: string; width: number; height: number };
    caption?: string;
  }[];
  autoplay?: boolean;
  /** Seconds per step */
  seconds?: number;
}
```

#### `product-list` (cart)

```ts
interface ProductListProps extends SectionCommon {
  layout?: 'rows' | 'grid';
  /** Heading area (Heading / Text / Button blocks). Default: "You might <em>love</em>" */
  blocks?: ContentBlockData[];
  /** Products from a collection (default "all"), or a fixed list of handles */
  collection?: string;
  products?: string[];
  limit?: number;
  columnsDesktop?: number;
  columnsPhone?: 1 | 2;
  animation?: 'fade-up' | 'none';
  /** For the cart page: show only while the bag is empty */
  onlyWhenCartEmpty?: boolean;
}
```

#### `product-overview` (product)

```ts
interface ProductOverviewProps extends SectionCommon {
  /** Link name the Product tabs bar points to */
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  text?: string; // HTML
  specs?: { label: string; value: string }[];
  image?: { src: string; alt?: string; width: number; height: number };
  /** x / y = % from the image's left / top edge */
  hotspots?: { x: number; y: number; title?: string; text?: string }[];
  quote?: string; // inline HTML
  figures?: { label: string; value: string }[];
}
```

#### `product-pairs` (product)

```ts
interface ProductPairsProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  /** Fallback / fixed list of other products (handles); empty = recommendations */
  products?: string[];
  /** Number of other products */
  limit?: number;
  /** Tick the other products at the start */
  preselect?: boolean;
}
```

#### `product-panels` (home)

```ts
interface ProductPanelsProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML: <em>word</em> = the highlighted (accent, italic) word
  linkLabel?: string;
  link?: string; // empty = /collections/<collection>
  productHandles?: string[]; // the products, in order (or use `collection`)
  collection?: string; // collection handle
  limit?: number;
  highlightColor?: string; // empty = the scheme's accent
  panelHeight?: number; // strip height (vw-based units, theme "Strip height")
  fillScreen?: boolean;
  cardRadius?: number; // px
  mobileLayout?: 'grid' | 'slider' | 'single';
  mobileHeight?: number; // % (phones strip height)
  cart?: QuickAddOptions;
  animation?: 'none' | 'fade-up' | 'zoom-in';
}
```

#### `product-related` (product)

```ts
interface ProductRelatedProps extends SectionCommon {
  eyebrow?: string;
  /** HTML; when set the eyebrow sits above it, else the eyebrow is the heading. */
  heading?: string;
  linkLabel?: string;
  /** Default: the product's first collection, else /collections/all. */
  linkUrl?: string;
  limit?: number;
  columns?: number;
  cardStyle?: 'full' | 'tile';
  cardShape?: '890 / 398' | '4 / 3' | '1 / 1' | '4 / 5';
  animation?: 'none' | 'fade-up';
  /** Product handles used when there are no recommendations. */
  fallbackProducts?: string[];
}
```

#### `product-reviews` (product)

```ts
interface ProductReviewsProps extends SectionCommon {
  anchor?: string;
  eyebrow?: string;
  heading?: string; // inline HTML, <em> = accent
  /** "Write a review" button (shows with both a label and a link) */
  writeLabel?: string;
  writeLink?: string;
  /** Floating product cut-out (shown from 1200px) */
  floatImage?: string;
  /** Its width at a 1920px screen, px */
  floatSize?: number;
  floatMotion?: 'hide' | 'repeat' | 'stay';
  word?: string;
  /** Cards shown at a time */
  visible?: number;
  motion?: 'scroll' | 'auto' | 'buttons';
  /** Seconds per card with motion "auto" */
  interval?: number;
  reviews?: { name?: string; place?: string; avatar?: string; rating?: number; text: string }[];
}
```

#### `product-tabs` (product)

```ts
interface ProductTabsProps extends SectionCommon {
  tabs?: { label: string; target: string }[];
  layout?: 'tabbed' | 'stacked';
  transition?: 'up' | 'left' | 'right' | 'fade';
  /** Scroll for each section in the tabbed layout, % of a screen */
  panelScroll?: number;
  showTop?: boolean;
}
```

#### `scrolling-showcase` (home)

```ts
interface ScrollingShowcaseProps extends SectionCommon {
  eyebrow?: string;
  /** HTML (inline): may contain <em>, [images], [arrow], [break]. */
  text?: string;
  photos?: ShowcaseSmallPhoto[]; // max 3
  highlightColor?: string;
  animation?: 'none' | 'fade-up' | 'zoom-in';
  /** Gold scroll effect */
  scene?: boolean;
  sceneLength?: number; // % of the screen height per step
  sceneTextColor?: string;
  sceneArrowColor?: string;
  sceneSmoothing?: 'none' | 'light' | 'extra';
  cards?: ShowcaseCard[]; // max 3
  phoneCardWidth?: number; // %
  tabletCardWidth?: number; // %
}
```

#### `search` (search)

```ts
interface SearchProps extends SectionCommon {
  /** Heading before anyone searches. */
  emptyHeading?: string;
  categoriesHeading?: string;
  /** Category pills under "no results" / before a search. count filled from the collection. */
  pills?: Pill[];
  /** Product suggestions: a collection handle (4 products). */
  suggestionsCollection?: string;
  /** HTML (<em> = accent). */
  suggestionsHeading?: string;
  resultsPerPage?: number;
  columnsDesktop?: number;
  imageRatio?: 'portrait' | 'square' | 'landscape';
}
```

#### `testimonials` (home)

```ts
interface TestimonialsProps extends SectionCommon {
  eyebrow?: string;
  heading?: string; // inline HTML (<em> = accent)
  highlightColor?: string;
  split?: number; // left column share in %, default 40
  height?: 'auto' | 'full';
  autoplay?: number; // seconds per review, 0 = off
  animation?: 'none' | 'fade-up' | 'slide-bottom';
  reviews: {
    name?: string;
    avatar?: string; // image path
    date?: string; // as shown, e.g. "Apr 15, 2026"
    rating?: number; // 0–5 (0 = no stars), halves allowed
    text?: string; // HTML
  }[];
}
```

## 5. Build order for one day

1. **Skeleton (1 h)**: NestJS app, global prefix `/api`, JSON error filter (`{ error }`), validation pipe
   (400), seed loader for `src/data/*.json`.
2. **Site + pages (1 h)**: `GET /site`, `GET /pages/:slug` (pages table with a JSON column, seeded from
   `src/data/pages/*.json`). Point the frontend at it (`API_URL=...`): every page should already render.
3. **Products (2 h)**: `GET /products` (handles in order, `q`, `limit`), `/products/:handle`,
   `/products/:handle/recommendations`. Check money in minor units and absolute image URLs.
4. **Collections (1.5 h)**: `GET /collections`, `/collections/:handle` with sort, pagination, filters
   (`total` after filters, counts before filters).
5. **Articles (0.5 h)**: list (newest first, tag filter) and detail.
6. **Cart (2 h)**: carts table + lines, endpoints 10–15, stock checks (422), totals computed on the server.
7. **Forms + orders (1 h)**: newsletter, contact (store the row, send mail later), `POST /orders`
   (copy the cart into an order, empty the cart, 201).
8. **Test against the mock (0.5 h)**: run the same requests on both servers and compare the JSON
   (`curl http://localhost:3000/api/... ` vs yours). The paths and shapes must match exactly.

## 6. Open points (decide with the frontend team)

- **Discount amounts**: `discountCodes` only says whether a code applies; there is no discount total yet.
- **Browser-side cart calls**: the storefront's browser JavaScript (ported from the Shopify theme) still calls
  Shopify-style URLs on the frontend domain (`/cart.js`, `/cart/add.js`, `/cart/update.js`,
  `/products/<handle>.js`, `?section_id=` / `?sections=` HTML rendering). The Next.js app serves them and maps the
  cart ones to endpoints 10–15 (see Cart); the NestJS team does not build them.
