# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## OroSkin Next: project context

A Next.js 16 + Tailwind v4 version of the OroSkin Shopify theme, built for a client demo (internal use only).
Every page is driven by JSON so a custom NestJS backend can supply the content later.

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
- No `.env` file is needed: with `API_URL` unset the built-in mock answers.
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

- Page = `src/data/pages/<slug>.json` = `{ slug, title, sections: [{ id, type, props }] }`, rendered by
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
  `site.json` around every store page.
- Sections are server components in `src/sections/*.tsx` that output the theme's exact markup from typed props
  (`src/sections/shared.ts`: `SectionCommon`, `sectionStyle`). Client parts are small `'use client'` files.
- Menus, header, footer: `src/data/site.json`. Products / collections / articles: `src/data/*.json` via
  `src/lib/db.ts` (mock); with `API_URL` set, `src/lib/api.ts` calls the NestJS backend instead.
  Every backend call goes through `backendFetch` in `src/lib/backend.ts`: it adds `x-api-key` (env `API_KEY`,
  server only), `x-client-ip` (the visitor's IP) and `x-request-id`, and a timeout (env `API_TIMEOUT_MS`,
  default 8000). Don't call `fetch(API_URL ...)` directly. Variables: `.env.example`.
  The mock is also served over HTTP at `/api/*` (`src/app/api/`). Contract for the backend team:
  `API-CONTRACT.md` + `openapi.yaml`; types in `src/lib/types.ts`.
- Theme JS: `public/theme.js` (the theme's web components) loads **after** React hydrates
  (`src/components/ThemeScripts.tsx`). So section markup must keep the theme's exact class names, custom element
  tags, `data-*` attributes and ids, and links are plain `<a href>` with Shopify-style URLs, not `next/link`.
- Shopify shims: because the theme JS calls Shopify endpoints, the app answers them itself: `/cart.js`,
  `/cart/add.js`, `/cart/change.js`, `/cart/update.js`, `/cart/clear.js`, `/search/suggest` (logic in `src/cart/`).
  `?sections=` / `?section_id=` (Section Rendering API) is answered by `/section-render`, which fetches the page
  and cuts out `<div id="shopify-section-<id>">`: a section the theme JS re-renders must keep that wrapper id.
- `src/proxy.ts` (Next 16's name for middleware) runs on every request: sets the `oro_cart` cookie, adds the
  `x-pathname` request header (`SiteChrome` uses it to pick the header style), and does the rewrites
  `POST /cart` → `/cart/submit` and `?sections=` → `/section-render`.
- Tailwind has no preflight reset: the theme's `critical.css` is the base layer, and the design tokens are in
  `src/app/globals.css`. Stylesheets are linked by hand in `src/app/layout.tsx`. The React Compiler is on.
- CSS: the theme CSS is loaded unchanged from `public/theme/*.css` (`sections.css`, `critical.css`, ...);
  new page CSS lives in `public/theme/pages-extra.css` (policy / shipping / cookies) and
  `public/theme/account.css` (account pages).
- Fonts (`public/theme/fonts.css`): headings Canela Text (`public/fonts/canela-text-trial/`), body Satoshi,
  the home hero swash lines Mussica Swash (`public/fonts/mussica/`). Trial licences: internal demo only.
- Icons are inlined from disk by `src/components/Icon.tsx`: `<Icon name="truck" />` reads the theme's
  `public/assets/icon-truck.svg`; the Figma account / tracking icons are `public/icons/*.svg` (currentColor),
  used as `<Icon src="icons/account-orders.svg" />`.
- Account type scale: `--account-text-*` / `--account-title-*` at the top of `public/theme/account.css`, mapped onto
  the theme scale (`--font-size-small` … `--font-size-h1`). Use those, not raw rem values. Gold is `#C8A24B`.
- Latest page designs (1920px PNGs): `public/newpages-design/`.
- Demo login: the header LOGIN pill → `GET /api/account/login` (sets cookie `oro_session`, opens `/account`); signed in,
  the header shows a round account icon (`src/components/AccountLink.tsx`). Sign out → `GET /api/account/logout`.
- Money is in minor units, formatted by `src/lib/format.ts` (`Rs. 9,000.00`).

## Pages

Home, collection (bento grid of photo tiles), collections, product, search, cart, checkout (demo), blog,
article, about-us, contact, faq, shipping, returns, privacy-policy, terms-of-service, cookies,
account (`/account/*`, mock data in `src/lib/account-data.ts`), `/track-order` (demo order `ORO-2026-0731`).

## Known gaps

- Copy written without Figma text: privacy items 02–08, terms clause 03 + CTA, cookies category texts.
- Cart is in memory (resets on restart) until the NestJS backend is connected. The Shopify-only cart state
  (attributes, the `GLOW10` demo discount, the last demo order) is kept on `globalThis` in `src/cart/shopify.ts`.
- `README.md` is out of date in places (port 3000, only `API_URL` in its variable table, Canela "not included").
  Trust this file where they differ.
- Account pages and forms are mock only (no real sign-in).
