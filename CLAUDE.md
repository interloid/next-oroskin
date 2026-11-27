@AGENTS.md

# OroSkin Next: project context

A Next.js 16 + Tailwind v4 version of the OroSkin Shopify theme, built for a client demo (internal use only).
Every page is driven by JSON so a custom NestJS backend can supply the content later.

## Where to start

- Open Claude Code in **this folder** (`d:\shopify-oroskin\oroskin-next`), not in the Shopify theme folder.
  The theme folder's CLAUDE.md is very large and only about Shopify / Liquid.
- Run: `npm run dev -- -p 3100`, then open http://localhost:3100.
- Restart the dev server after adding a new section file or changing `src/app/layout.tsx`: Next dev can keep
  serving the old registry and layout.
- Type check: `npx tsc --noEmit`. Link check: `node scripts/check-links.mjs http://localhost:3100`.
- Don't commit or push unless the user asks. Never add a Co-Authored-By line.

## Where the design comes from (read-only sources)

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
  (regenerate: `node scripts/build-registry.mjs` after adding a section file).
- Sections are server components in `src/sections/*.tsx` that output the theme's exact markup from typed props
  (`src/sections/shared.ts`: `SectionCommon`, `sectionStyle`). Client parts are small `'use client'` files.
- Menus, header, footer: `src/data/site.json`. Products / collections / articles: `src/data/*.json` via
  `src/lib/db.ts` (mock); with `API_URL` set, `src/lib/api.ts` calls the NestJS backend instead.
  Contract for the backend team: `API-CONTRACT.md` + `openapi.yaml`.
- CSS: the theme CSS is loaded unchanged from `public/theme/*.css` (`sections.css`, `critical.css`, ...);
  new page CSS lives in `public/theme/pages-extra.css` (policy / shipping / cookies) and
  `public/theme/account.css` (account pages). Theme JS web components: `public/theme.js`.
- Fonts (`public/theme/fonts.css`): headings Canela Text (`public/fonts/canela-text-trial/`), body Satoshi,
  the home hero swash lines Mussica Swash (`public/fonts/mussica/`). Trial licences: internal demo only.
- Account / tracking icons (Figma): `public/icons/*.svg` (currentColor), used as `<Icon src="icons/account-orders.svg" />`.
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
- Cart is in memory (resets on restart) until the NestJS backend is connected.
- Account pages and forms are mock only (no real sign-in).
