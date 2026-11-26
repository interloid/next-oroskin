# Oroskin storefront (Next.js)

A port of the Oroskin Shopify theme to Next.js 16 (App Router, React 19, TypeScript). Every page is drawn
from **JSON**: a page is an ordered list of sections, and products, collections, articles and the cart come
from a REST API. A mock of that API is built in, so the site runs with no backend.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run lint
npx tsc --noEmit -p .
```

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Meaning |
| --- | --- |
| `API_URL` | Base URL of the real backend, e.g. `http://localhost:4000/api`. **Empty = the built-in mock.** |

Switching backends needs only this variable: `src/lib/api.ts` calls `API_URL + <path>` when it is set, and the
local mock (`src/lib/db.ts`) when it is not. The mock is also served over HTTP at `/api/*`
(`src/app/api/**`), so the backend team can compare their responses with it.

The API is documented in **[API-CONTRACT.md](./API-CONTRACT.md)** (for the NestJS team) and
**[openapi.yaml](./openapi.yaml)**.

## Where content lives

| What | File (mock) | API |
| --- | --- | --- |
| Brand, menus, announcement bar, footer | `src/data/site.json` | `GET /api/site` |
| Pages (sections + their props) | `src/data/pages/<slug>.json` | `GET /api/pages/<slug>` |
| Products | `src/data/products.json` | `GET /api/products...` |
| Collections | `src/data/collections.json` | `GET /api/collections...` |
| Blog articles | `src/data/articles.json` | `GET /api/articles...` |
| Cart | in memory (lost on restart) | `/api/cart/:id...` |
| Images | `public/images/`, `public/cdn/` | absolute CDN URLs in production |

Contract types: `src/lib/types.ts`. Money is always in **minor units** (`12500` = Rs. 125.00), formatted by
`money()` in `src/lib/format.ts`.

Page slugs per route: `/` → `home`, `/products/:handle` → `product`, `/collections/:handle` → `collection`,
`/collections` → `collections`, `/cart` → `cart`, `/search` → `search`, `/blogs/:blog` → `blog`,
`/blogs/:blog/:article` → `article`, `/pages/:handle` → `:handle` (e.g. `about-us`).

## Change the design by JSON

Open a page file, e.g. `src/data/pages/home.json`:

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
| `node scripts/build-data.mjs` | Builds the mock data `src/data/*.json` from the theme's demo catalogue. |
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
