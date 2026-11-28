# Oroskin storefront (Next.js)

A port of the Oroskin Shopify theme to Next.js 16 (App Router, React 19, TypeScript). Every page is drawn
from **JSON**: a page is an ordered list of sections, and the site settings, pages, products, collections,
articles, the cart and the customer account all come from the NestJS backend in `../oro-skin-api`.
This repo holds no data of its own: the backend must be running.

## Run

```bash
# 1. the backend (see ../oro-skin-api/README.md)
cd ../oro-skin-api && npm install && npm run db:up && npm run db:deploy && npm run db:seed && npm run start:dev

# 2. the storefront
cp .env.example .env.local   # API_URL=http://localhost:4000/api
npm install
npm run dev -- -p 3100       # http://localhost:3100
npm run build && npm start   # the build reads the backend to generate the static pages
npm run lint
npx tsc --noEmit
```

## Environment

Copy `.env.example` to `.env.local`. The variables are checked when the server starts (`src/lib/env.ts`); a
wrong value stops the start with a message. None of them is sent to the browser.

| Variable | Meaning |
| --- | --- |
| `API_URL` | **Required.** Base URL of the backend, e.g. `http://localhost:4000/api` |
| `API_KEY` | Shared key sent as `x-api-key`. Empty = not sent |
| `API_TIMEOUT_MS` | How long to wait for one backend call. Default 8000 |
| `CACHE_SECONDS` | How long content and catalogue answers are reused. Default 300; 0 = never |
| `SITE_URL` | Public address of the storefront (absolute links in share buttons). Set it to let articles be generated ahead of time |
| `REVALIDATE_SECRET` | Secret for `POST /api/revalidate`. Empty = that route is off |

The API is described by the backend's Swagger (`http://localhost:4000/docs`). `API-CONTRACT.md` and
`openapi.yaml` in this repo are the first version of the contract and no longer complete.

## Where content lives

Everything is in the backend's database, seeded from `../oro-skin-api/prisma/seed-data/us/` (US, dollars).

| What | Seed file | API |
| --- | --- | --- |
| Brand, menus, announcement bar, footer, currency, locale | `site.json` | `GET /site` |
| Pages (sections + their props) | `pages/<slug>.json` | `GET /pages/<slug>` |
| Products | `products.json` | `GET /products...` |
| Collections | `collections.json` | `GET /collections...` |
| Blog articles | `articles.json` | `GET /articles...` |
| Discount codes | `discounts.json` | applied through the cart |
| Cart, orders | (created by visitors) | `/cart/:id...`, `/orders` |
| The demo customer's account | `customers.json`, `customer_*.json`, `orders.json`, `reward_tiers.json` | `/customers/:id/...`, `/orders/:id` |
| Images | `public/images/`, `public/cdn/` in this repo | absolute CDN URLs in production |

Every answer is checked with Zod (`src/lib/schemas.ts`); the types in `src/lib/types.ts` are derived from
those schemas. Money is always in **minor units** (`12500` = $125.00). The currency format and the locale
come from the site settings, and `money()` in `src/lib/format.ts` applies them.

## Rendering and caching

| How | Pages |
| --- | --- |
| Generated ahead of time, refreshed every `CACHE_SECONDS` or on demand | Home, collections list, content pages, products, articles (with `SITE_URL`) |
| Rendered on every request, catalogue data cached | Collection (sort, filters), blog listing, search |
| Rendered on every request, never cached | Cart, checkout, account, track order |
| In the browser | Cart count and sign-in state on the generated pages, cookie choices, account forms |

To show a content change at once, the backend (or you) can call:

```bash
curl -X POST http://localhost:3100/api/revalidate -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "content-type: application/json" -d '{ "tags": ["products", "page:home"] }'
```

Tags: `site`, `pages`, `products`, `collections`, `articles`, or one item (`page:<slug>`, `product:<handle>`,
`collection:<handle>`, `article:<handle>`).

Page slugs per route: `/` → `home`, `/products/:handle` → `product`, `/collections/:handle` → `collection`,
`/collections` → `collections`, `/cart` → `cart`, `/search` → `search`, `/blogs/:blog` → `blog`,
`/blogs/:blog/:article` → `article`, `/pages/:handle` → `:handle` (e.g. `about-us`).

## Change the design by JSON

Open a page file in the backend's seed data, e.g. `../oro-skin-api/prisma/seed-data/us/pages/home.json`
(then `npm run db:seed` there):

```json
{
  "slug": "home",
  "title": "Home",
  "sections": [
    { "id": "hero", "type": "hero", "props": {} },
    { "id": "product_panels", "type": "product-panels", "props": { "collection": "new-arrivals" } },
    { "id": "icon_features", "type": "icon-features", "props": {} }
  ]
}
```

- **Reorder**: move entries in `sections`. The page draws them top to bottom.
- **Remove**: delete the entry.
- **Add**: add `{ "id": "<unique in the page>", "type": "<section type>", "props": { ... } }`. The same type can
  be used more than once (two `image-banner`s on the home page). `props: {}` renders the section's defaults.
- **Edit content**: change `props`. Each section's props are typed and documented in
  `src/sections/<type>.tsx` (the exported `<Name>Props` interface). Products and collections are referenced
  by **handle**; never copy product data into a page.

The first section (index 0) loads its images eagerly; all others lazily. In development an unknown `type`
shows a dashed "Unknown section type" box; in production it is skipped. Header, footer and announcement bar
are not in page files: they come from `site.json`.

With a backend, the same JSON lives in the backend's `pages` table (`GET /api/pages/:slug`), so content can be
changed without a deploy.

## How the port works

- `public/theme/*.css`: the theme's CSS, unchanged. `public/theme.js`: the theme's web components, loaded after
  React hydrates. So section markup keeps the theme's class names, custom element tags and `data-*` attributes.
- `src/sections/<type>.tsx`: one server component per section type. `src/sections/registry.generated.ts` maps
  types to components (generated, see scripts).
- `src/sections/generated/` and `reference/`: the exact markup Shopify rendered, kept as the reference.

## Scripts (`scripts/`)

| Script | What it does |
| --- | --- |
| `node scripts/build-registry.mjs` | Rebuilds `src/sections/registry.generated.ts`. **Run after adding a section file.** |
| `node scripts/extract-theme.mjs` | Copies every `{% stylesheet %}` / `{% javascript %}` from the Shopify theme into `public/theme*`. |
| `node scripts/split-html.mjs` | Splits rendered Shopify pages into one HTML file per section (`reference/`). |
| `node scripts/html-to-jsx.mjs` | Converts `reference/sections/*.html` into JSX (`src/sections/generated/`). |
| `node scripts/fetch-cdn.mjs` | Downloads the `/cdn/shop/...` images and `/cdn/fonts/...` files the reference pages use into `public/`. |
| `node scripts/convert-images.mjs <src> <dst>` | Converts PNG / JPEG / WebP images to optimised WebP (needs `sharp`). |

## Fonts

The site uses the Figma fonts (`public/theme/fonts.css`):

- **Satoshi** (body): included in `public/fonts/satoshi/` (Fontshare, free for commercial use).
- **Canela Text** (headings): a **paid** font (Commercial Type), not included. After buying a web licence, drop
  the files into `public/fonts/canela/` as `CanelaText-Regular.woff2` and `CanelaText-RegularItalic.woff2`.
  Until then headings fall back to Newsreader / serif.
