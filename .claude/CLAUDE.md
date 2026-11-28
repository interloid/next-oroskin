# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@../AGENTS.md

## OroSkin Next: project context

A Next.js 16 + Tailwind v4 version of the OroSkin Shopify theme, built for a client demo (internal use only).
Every page is driven by JSON that the NestJS backend (`../oro-skin-api`) supplies; this repo holds no data.

## Where to start

- Open Claude Code in **this repo**, not in the Shopify theme folder.
  The theme folder's CLAUDE.md is very large and only about Shopify / Liquid.
- Run: `npm run dev -- -p 3100`, then open http://localhost:3100 (the scripts and briefs assume port 3100).
- Restart the dev server after adding a new section file or changing `src/app/layout.tsx`: Next dev can keep
  serving the old registry and layout.
- Type check: `npx tsc --noEmit` (`src/sections/generated` is excluded). Lint: `npm run lint`. Build: `npm run build`.
- Link check (needs the dev server running): `node scripts/check-links.mjs http://localhost:3100`.
- There is no test runner. To check a change, type check and then `curl` the page on the dev server
  (test product: `/products/signature-body-mist`).
- The backend must be running: `../oro-skin-api` (`npm run db:up && npm run db:deploy && npm run db:seed &&
  npm run start:dev`, port 4000). Copy `.env.example` to `.env.local` (`API_URL=http://localhost:4000/api`).
- Rules for porting a section from the theme (props shape, images, links, what not to edit): `AGENTS-BRIEF.md`.
- Don't commit or push unless the user asks. Never add a Co-Authored-By line.

## Where the design comes from (read-only sources)

These folders live outside this repo, on the original Windows machine (`d:\shopify-oroskin\...`). They may not
exist on your machine: if they are missing, work from `reference/`, `src/sections/generated/` and
`public/newpages-design/`, and ask the user rather than guessing a path.

1. **Figma snapshot:** `d:\shopify-oroskin\custom-built-new-theme-oroskin\oroskin-theme\design\`
   - `design/figma/screens/<page>/screenshot.png` + `notes.md` / `metadata-layers.md` (1920px desktop frames).
   - `design/figma/tokens.md` (colours, type sizes, radii, shadows), `design/figma/components/`.
   - `design/inbox/` (phone designs, 375px PNGs, per page).
   - Some captures are blank (track-order-1/2, signout); privacy / terms / cookies have notes only.
   - Downscale or crop screenshots with `sharp` before viewing them (saves tokens).
2. **Shopify theme (the built design, markup and CSS):**
   `d:\shopify-oroskin\custom-built-new-theme-oroskin\oroskin-theme\` (`sections/`, `blocks/`, `snippets/`).
   Port its HTML and classes; its CSS is already copied into `public/theme/` (see below).
3. **Demo copy:** `d:\shopify-oroskin\custom-built-new-theme-oroskin\oroskin-demo-content\templates\*.json`.

Never edit those folders from this project.

## How the app works

- Page = the backend's `GET /pages/<slug>` = `{ slug, title, sections: [{ id, type, props }] }`, rendered by
  `src/components/PageRenderer.tsx` through `src/sections/registry.generated.ts`
  (regenerate: `node scripts/build-registry.mjs` after adding a section file). The file name is the section
  type; only names matching `[a-z0-9-]+.tsx` are registered, so `_`-prefixed files are helpers.
- Routes in `src/app/(store)/` are thin: each one picks a slug and passes a `PageContext` (`product`, `collection`,
  `article`, `searchParams`) to `PageRenderer`. `/` → `home`, `/products/:handle` → `product`,
  `/collections/:handle` → `collection`, `/blogs/:blog` → `blog`, `/blogs/:blog/:article` → `article`,
  `/pages/:handle` → `:handle`, `/account/<view>` → `account-<view>` (`/account` → `account-overview`,
  `/account/orders/:id` → `account-order-details`, `/track-order` → `account-track-order`). Checkout pages are
  hand-written, not JSON-driven.
- `context.index === 0` (the first section) loads its images eagerly, all others lazily. An unknown section type
  shows a dashed box in development and is skipped in production.
- Header, footer and announcement bar are not in page files: `src/components/SiteChrome.tsx` draws them from
  the backend's site settings around every store page. It is rendered by `PageRenderer` (not by a layout),
  because it needs the page's `path` and whether the page is per visitor.
- Sections are server components in `src/sections/*.tsx` that output the theme's exact markup from typed props
  (`src/sections/shared.ts`: `SectionCommon`, `sectionStyle`). Client parts are small `'use client'` files.
- **All data comes from the NestJS backend** (`../oro-skin-api`, `API_URL`, required). There is no mock and no
  data file in this repo. Nothing shown to a visitor (content, prices, currency, menus, customer data) may be
  written in the code: add it to the backend's seed data (`prisma/seed-data/us/`) and read it from the API.
  - `src/lib/api.ts`: site, pages, products, collections, articles, the cart read.
    `src/lib/cart-store.ts`: cart writes and orders. `src/lib/account.ts`: the customer's account.
  - Every answer is checked with Zod (`src/lib/schemas.ts`; the types in `src/lib/types.ts` are derived from
    it). A mismatch throws an `ApiError` that names the field. Unknown extra fields are allowed.
  - Every call goes through `src/lib/backend.ts`. Don't call `fetch(API_URL ...)` directly.
    `backendRead(path, tags)` = shared content, cached in Next's data cache for `CACHE_SECONDS` (default 300)
    with tags from `src/lib/cache-tags.ts`; sends only `x-api-key`.
    `backendFetch(path, init)` = one visitor's call, never cached; adds `x-api-key`, `x-client-ip`,
    `x-request-id`. Both have a timeout (`API_TIMEOUT_MS`, default 8000).
  - Environment variables are checked with Zod at start-up (`src/lib/env.ts`, `src/instrumentation.ts`):
    `API_URL`, `API_KEY`, `API_TIMEOUT_MS`, `CACHE_SECONDS`, `SITE_URL`, `REVALIDATE_SECRET` (`.env.example`).
  - `POST /api/revalidate` (header `x-revalidate-secret`, body `{ "tags": ["products", "page:home"] }`) drops
    cached answers at once; off while `REVALIDATE_SECRET` is empty.
  - `src/app/api/` keeps only browser-facing routes: `contact` and `newsletter` (form posts, forwarded to the
    backend), `account/login|logout`, `revalidate`.
- **Rendering** (the build's route table shows it; `npm run build` needs the backend running):
  - Generated ahead of time and refreshed every `CACHE_SECONDS` or by tag: `/`, `/collections`,
    `/pages/:handle` (those in the menus at build, others on first visit), `/products/:handle` (all at build),
    `/blogs/:blog/:article` (only when `SITE_URL` is set; share links need an absolute URL).
    These pages are shared by everybody, so they must not read cookies, headers or the query:
    `<PageRenderer slug path>` without `visitor`.
  - Per request (`<PageRenderer ... visitor>`): cart, checkout, account, track order, search, blog listing,
    collection (sort / filters / page are in the URL). Their catalogue reads are still cached.
  - A static page whose query changes the HTML has a per-request twin: `src/app/(store)/q/products/[handle]`
    and `q/pages/[handle]`. `src/proxy.ts` rewrites to it when the query has `variant`, `contact_posted` or
    `contact_error`. Add a query name to `TWIN_QUERY` there when a section starts reading it.
  - In the browser: on static pages the header is rendered with cart count 0 and both account controls;
    `src/components/VisitorSync.tsx` asks the theme's `<cart-count>` to read `/cart.js`, and the start-up script
    in `src/app/layout.tsx` adds `signed-in` to `<html>` from the `oro_signed_in` cookie (CSS in `globals.css`).
  - TanStack Query is not used: the theme JS does the client fetching through the Shopify shims.
- Page `<title>` and description: each route exports `generateMetadata` using `pageMetadata(slug, title?)` from
  `PageRenderer.tsx` (the page's `seo` / `title`, or the product / collection / article title). The store name,
  default description and icon come from the site settings in `src/app/layout.tsx`.
- Theme JS: `public/theme.js` (the theme's web components) loads **after** React hydrates
  (`src/components/ThemeScripts.tsx`). So section markup must keep the theme's exact class names, custom element
  tags, `data-*` attributes and ids, and links are plain `<a href>` with Shopify-style URLs, not `next/link`.
- Shopify shims: because the theme JS calls Shopify endpoints, the app answers them itself: `/cart.js`,
  `/cart/add.js`, `/cart/change.js`, `/cart/update.js`, `/cart/clear.js`, `/search/suggest` (logic in `src/cart/`).
  `?sections=` / `?section_id=` (Section Rendering API) is answered by `/section-render`, which fetches the page
  and cuts out `<div id="shopify-section-<id>">`: a section the theme JS re-renders must keep that wrapper id.
- `src/proxy.ts` (Next 16's name for middleware) runs on every request: sets the `oro_cart` cookie and the
  `x-request-id` header, and does the rewrites `POST /cart` → `/cart/submit`, `?sections=` → `/section-render`,
  and `/products/x?variant=` / `/pages/x?contact_posted=` → the per-request twin under `/q` (see Rendering).
- Tailwind has no preflight reset: the theme's `critical.css` is the base layer, and the design tokens are in
  `src/app/globals.css`. Stylesheets are linked by hand in `src/app/layout.tsx`. The React Compiler is on.
- CSS: the theme CSS is loaded from `public/theme/*.css` (`sections.css`, `critical.css`, ...), each file wrapped
  in `@layer legacy { }`. Layer order (`src/app/globals.css` and top of `head.css`):
  `theme, legacy, base, components, utilities`, so a Tailwind utility always beats a theme rule.
  Design CSS this project wrote is moving to Tailwind: shipping / cookies / policy labels are done (old
  `pages-extra.css` deleted); `public/theme/account.css` (account pages) is next.
  Tailwind tokens map to the theme variables in `globals.css` (`@theme inline`): `text-brand`, `bg-raised`,
  `border-line-card`, `p-xl` / `gap-md` (theme `--space-*`), `text-label` / `text-body-sm`, `tracking-label`,
  `font-display` / `font-text`, `rounded-card`, `shadow-raised`; breakpoints `max-tablet:` (<750),
  `max-laptop:` (<990), `max-desktop:` (<1200).
  Converting: delete the old rule in the same change; grep `public/theme.js` for a class before dropping it;
  a theme `!important` (6 in account.css, 6 in sections.css) beats even a `!` utility (important layers reverse),
  so remove the `!important` rule rather than fighting it. When two utilities differ only by a variant
  (`rtl:x` vs `x`), the winner depends on Tailwind's output order: prefer logical properties (`start-*`, `ps-*`).
  After `git stash` / branch switches, if new utilities are missing, delete `.next` and restart (Turbopack cache).
- Fonts (`public/theme/fonts.css`): headings Canela Text (`public/fonts/canela-text-trial/`), body Satoshi,
  the home hero swash lines Mussica Swash (`public/fonts/mussica/`). Trial licences: internal demo only.
- Icons are inlined from disk by `src/components/Icon.tsx`: `<Icon name="truck" />` reads the theme's
  `public/assets/icon-truck.svg`; the Figma account / tracking icons are `public/icons/*.svg` (currentColor),
  used as `<Icon src="icons/account-orders.svg" />`.
- Account type scale: `--account-text-*` / `--account-title-*` at the top of `public/theme/account.css`, mapped onto
  the theme scale (`--font-size-small` … `--font-size-h1`). Use those, not raw rem values. Gold is `#C8A24B`.
- Latest page designs (1920px PNGs): `public/newpages-design/`.
- Demo login: the header LOGIN pill → `GET /api/account/login`: it asks the backend for the demo customer
  (`GET /customers/demo`), keeps the id in the httpOnly cookie `oro_session`, sets the readable flag cookie
  `oro_signed_in=1` and opens `/account`. Sign out → `GET /api/account/logout`. Account pages opened without a
  session go to the login first. Account data: `src/lib/account.ts` (`loadAccountData`, never cached).
- Money is in minor units (cents). The currency format and locale are not in the code: `src/lib/format.ts`
  takes `moneyFormat`, `locale` and `currency` from the backend's site settings (`loadSiteFormat(site)`, called
  by `PageRenderer` / `SiteChrome` before anything is drawn). `money()`, `currencySymbol()`, `longDate()`.
  One deployment = one market (US, dollars, today). Another market is another seed set in the backend
  (`prisma/seed-data/<market>`); several currencies in one deployment would need `format.ts` made per request.

## Pages

Home, collection (bento grid of photo tiles), collections, product, search, cart, checkout (demo), blog,
article, about-us, contact, faq, shipping, returns, privacy-policy, terms-of-service, cookies,
account (`/account/*`, the demo customer's data from the backend), `/track-order` (demo order `ORO-2026-0731`).

## Known gaps

- Copy written without Figma text: privacy items 02–08, terms clause 03 + CTA, cookies category texts.
- No real sign-in: the LOGIN pill signs in the backend's demo customer, and the account forms (edit details,
  addresses, preferences, redeem) only show a "demo" message; the backend has no write endpoints for them.
- Order tracking has no events in the backend: the timeline shows the steps with the order and delivery dates.
- Fixed interface texts (button labels, headings inside sections, the checkout field labels) are still in the
  TSX files. Content, prices, currency, menus and customer data are not: they come from the backend.
- `README.md`, `API-CONTRACT.md` and `openapi.yaml` describe the first contract and are out of date in places.
  The backend's Swagger (`/docs`, `openapi.generated.json` in `../oro-skin-api`) is the source of truth, and
  this file wins where they differ.
