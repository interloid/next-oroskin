# Oroskin Next.js port: rules for every agent

Project: `d:\shopify-oroskin\oroskin-next` (Next.js 16 App Router, React 19, TypeScript, Tailwind v4 without preflight).
It is a port of the Oroskin Shopify theme at `d:\shopify-oroskin\custom-built-new-theme-oroskin\oroskin-theme`
(**READ ONLY: never edit anything there**). Demo for a client: it must look and behave exactly like the theme.

## How the port works
- **CSS:** the theme's CSS is loaded unchanged from `public/theme/*.css` (`sections.css` = every `{% stylesheet %}` of the theme).
- **JS:** every theme web component (`{% javascript %}` tags) is `public/theme.js`, loaded after React hydrates
  (`src/components/ThemeScripts.tsx`) plus `public/assets/animate-on-scroll.js`. So the markup must keep the theme's exact
  class names, custom element tags (`<product-card>`, `<animate-on-scroll>` ...), `data-*` attributes, ids and aria.
- **Exact markup per section:** `src/sections/generated/<page>--NN-<name>.tsx` (JSX) and `reference/sections/*.html` (raw HTML)
  = what Shopify rendered for that section with the demo content. The theme's Liquid (`sections/`, `blocks/`, `snippets/`)
  explains the logic (loops, conditions, settings → classes / CSS variables).
- **Pattern file:** `src/sections/icon-features.tsx` (+ `src/sections/shared.ts`, `src/components/Icon.tsx`). Copy its style.

## Your job per section
1. Create `src/sections/<type>.tsx` (kebab-case type = the section's file name in the theme). Server component (async allowed),
   default export, an exported `<Name>Props` interface. Add `'use client'` only if you truly need React state (prefer the theme JS).
2. Props = clean content a backend can send: texts, image paths, links, product handles / collection handle, a few layout
   options with defaults. NOT a dump of Shopify settings. Keep defaults in the component so `props: {}` still renders something sensible.
3. Repeated markup (cards, slides, rows) → `.map()` over data. Drop the `{" "}` noise.
4. Commerce data: `import { api } from '@/lib/api'` (`api.products(handles)`, `api.product(h)`, `api.collection(h)`,
   `api.articles()`, `api.recommendations(h)`, `api.cart()`), or `context` (`PageContext` in `src/components/PageRenderer.tsx`:
   `product`, `collection`, `article`, `searchParams`, `index`). Types: `src/lib/types.ts`. Money: `money()` from `@/lib/format`
   (minor units: 12500 → "$125.00"; the currency format comes from the backend's site settings). Products: the backend's
   seed data `../oro-skin-api/prisma/seed-data/us/products.json` (images at `/images/<file>.webp`).
5. Images: files referenced as `/cdn/shop/files/...` already exist in `public/` (query strings are ignored). Use one `src`
   (no Shopify `&width=` srcsets needed; a plain `srcSet` of the same file is fine to drop). Keep width/height/alt/sizes.
   `loading="eager"` + `fetchPriority="high"` only when `context.index === 0`, else `loading="lazy"`.
6. Put the section's demo content into the page JSON in the backend, `../oro-skin-api/prisma/seed-data/us/pages/<slug>.json`
   (then `npm run db:seed` there): the entry for your section already exists
   with `"props": {}`; replace only YOUR entry's props (other agents edit other entries of the same file at the same time:
   re-read the file right before each edit, change only your entry).
7. Run `node scripts/build-registry.mjs` after adding a section file.
8. Check: `npx tsc --noEmit -p . 2>&1 | grep -v sections/generated` must show no errors from your files, and
   `curl -s http://localhost:3100/<path>` must return 200 with your markup. The dev server already runs on port 3100: do not
   start or stop another one. Routes: `/`, `/products/<handle>`, `/collections/<handle>`, `/collections`, `/cart`, `/search?q=`,
   `/pages/<handle>`, `/blogs/featured`, `/blogs/featured/<article>`. Test product: `signature-body-mist`.
9. Links keep Shopify-style URLs (same routes). Use plain `<a href>` (not next/link): full page loads keep the theme JS simple.

## Rules
- Do not edit `src/lib/*`, `src/components/PageRenderer.tsx`, `SiteChrome.tsx`, layouts, `public/theme*`, or another agent's files,
  unless your brief says so. If you need a change there, say so in your final report.
- Shared components you create go in `src/components/` with a clear name; say so in your report.
- If the theme JS of your section calls a Shopify endpoint (`/cart/add.js`, `/cart.js`, `/cart/change.js`, `/cart/update.js`,
  `/search/suggest`, `?section_id=` / `?sections=` rendering, `/recommendations/products`), list it in your report (the cart agent
  builds those endpoints).
- Keep accessibility: alt texts, aria, labels, real buttons.
- No git commits. Don't delete files in `src/sections/generated` or `reference/`.
- Final report (short): files created, the props shape, what works, what doesn't, endpoints needed.
