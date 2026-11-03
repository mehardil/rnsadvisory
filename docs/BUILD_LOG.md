# Build Log

**Project:** RNS Global — Expertise Without Borders
**Stack:** React 18, Vite, TypeScript, Tailwind CSS, React Router v6, Zustand, Framer Motion, GSAP, Lenis, Recharts, React Three Fiber, i18next, React Hook Form + Zod.
**Date:** October 2026
**Status:** Complete build; all verification commands pass (see §4).

---

## 1. Phase record

### Phase 1 — Config, layout, header, footer ✅

Delivered:

- Vite + TypeScript + Tailwind scaffold with vendor chunk splitting (`react`, `motion`, `three`, `charts`, `i18n`).
- Design tokens, global CSS, fluid type scale, buttons, cards, chips, inputs, prose styles, grain overlay, print styles, reduced-motion rules, RTL nudges.
- `siteConfig.js` as the single source of brand, contact, nav, socials, currencies, stats, trust badges and footer links.
- Animated SVG logo with gold monogram.
- Sticky header: transparent over heroes → glass on scroll; hides down / shows up.
- Dismissible announcement bar; Services mega menu with 6 columns, descriptions, sub-links and a featured Golden Visa card; remaining practices strip.
- Right controls: command-palette search, EN/AR switch, dark/light toggle, phone, gold CTA.
- Full-screen mobile menu with accordions per practice and Call / WhatsApp / Email + booking shortcuts.
- Footer: pre-footer CTA band (hidden on home), generative background, gold top border, back-to-top, 5 columns, newsletter, 9 offices, contact, trust badges, legal links, language and currency selectors.
- Mobile sticky Call / WhatsApp / Book bar; desktop floating WhatsApp; custom cursor; scroll progress.

### Phase 2 — Home page and 3D hero ✅

Delivered:

- Full-viewport hero with aurora generative art, typographic headline with gold italic emphasis, trust markers, two CTAs and a scroll cue.
- Lazy-loaded R3F scene: wireframe globe, inner occlusion sphere, additive particle shell, orbit rings, four floating glass shapes, dual lighting, bloom, mouse parallax, scroll-driven camera.
- Low-end/mobile/reduced-motion fallback using procedural crystals art.
- Trust strip with animated counters by IntersectionObserver, an illustrative Recharts demand chart (lazy), and a partner marquee.
- Service orbit: 8 featured services on a depth-sorted ellipse with pause on hover, plus a filterable service grid.
- Service Finder: 3-question quiz → category recommendation with 3 services and CTA.
- Global presence panel: canvas globe + selected office card with live local time and open status, plus list view.
- 5-step process timeline with GSAP ScrollTrigger line draw (lazy-imported GSAP).
- Industries grid (14), case-study metrics, why-us differentiators, testimonial slider, latest insights, FAQ accordion.
- Bespoke final CTA with skyline generative art and a “what happens next” panel.
- Exit-intent + 30-second soft lead prompt, once per session.

### Phase 3 — Services system and pages ✅

Delivered:

- 12 service categories and **71 services** in `src/data/services.js`, each with overview, audience, benefits, documents, timeline, from-price, tags and custom FAQs.
- Auto-generated process templates, category document defaults, Basic/Standard/Premium packages and default timeline/cost FAQs.
- Services overview: stats band, sticky category filter bar, text filter, grouped catalogue, practice links, service-finder CTA.
- Category page: hero, destinations, service grid, sector context, other practices.
- Service detail template: split hero with generated image and floating price card; overview; who it is for; benefits; 5-step process; interactive document checklist with local progress and reset; timeline; package comparison table; FAQs; related + cross-sell services; sticky quote form; direct contact card; print/PDF brochure action; related office strip; CTA.
- Service and FAQ structured data, breadcrumbs, canonical URLs.

### Phase 4 — Globe, locations and tools ✅

Delivered:

- Nine offices across eight regions with coordinates, IANA time zones, roles, addresses, hours and service lists.
- Canvas globe: atmospheric halo, seeded surface texture, graticule, great-circle arcs from Dubai with travelling pulses, clickable markers, drag rotation, hover labels and an accessible list view.
- Locations page: globe, region clusters, region filter, nine office cards with live open/closed status, Dubai map embed, office contact links, per-office `ProfessionalService` schema.
- Six interactive tools:
  1. Visa/document checklist generator (grouped, printable, saved progress).
  2. UAE company cost estimator (free zone vs mainland, tier, visas, office, multi-year total).
  3. Study abroad budget calculator (8 destinations, scholarship, total/per-year/per-month).
  4. Currency converter (7 currencies, swap, quick pairs, reference rate note).
  5. Time zone and business-hours viewer (live status for all offices, open count).
  6. Eligibility quick check (goal-based scoring, notes, next step).
- Tool detail pages with related services and advisor CTAs.

### Phase 5 — Blog, forms, portal mock ✅

Delivered:

- Nine original long-form articles (UAE Golden Visa, study in Estonia, Dubai free zone setup, UK student visa, exporting from Jebel Ali, UAE corporate tax/VAT, moving to Saudi Arabia, Estonia e-Residency vs UAE company, Gulf executive careers).
- Insights index: featured article, category filters, search, tags, reading time, newsletter band.
- Article page: dark editorial hero, 21:9 cover, key takeaways, sticky table of contents, author boxes, share links (copy, LinkedIn, Facebook, WhatsApp, email), print, related posts, newsletter, Article + Breadcrumb schema.
- Case studies page with full challenge/approach/metrics/quote layout and anchors.
- Careers: benefits, department filters, expandable roles, application form with CV picker, Zod validation, confirmation state.
- Contact: four contact cards, 3-step enquiry form with progress, autosave, honeypot, rate limiting, consent and booking details; booking calendar with date/time selection and confirmation; office status list; urgent-matter card; Dubai map; contact FAQs; response promise.
- Client portal mock: login/demo entry, application tracker, at-a-glance stats, document list and upload, message thread, appointment card, demo notice.
- Legal pages: Privacy, Terms, Cookies, Disclaimer with shared layout and side navigation.
- Human-readable sitemap, search results page, branded 404 with generative skyline.

### Phase 6 — SEO, performance and polish ✅

Delivered:

- `Seo` component with per-page title, description, canonical, OG/Twitter, `noindex`, JSON-LD.
- Static OG art rendered to `public/og-cover.png` at 1200×630 (`npm run generate:og`), referenced by every page’s social tags.
- Schema builders: Organization, WebSite, BreadcrumbList, Service, FAQPage, Article, ProfessionalService.
- `robots.txt`, generated `sitemap.xml`, human sitemap page.
- Consent-gated GA and Meta Pixel hooks that load nothing before opt-in.
- Code splitting for every route and heavy vendor chunks.
- Accessible skip link, focus rings, ARIA, keyboard menus, reduced motion, WCAG AA palette.
- Dark mode and full RTL switch persisted in localStorage.
- Command palette (Ctrl/Cmd+K) with keyboard navigation over the whole site.
- Scripted chat widget with quick replies and human handover links.
- Cookie preferences with granular toggles.
- Print stylesheet for service sheets.
- Unit tests for utilities and Playwright smoke tests.
- Manifest-gated imagery: `useGeneratedImage` reads `public/generated/manifest.json` so pages without a generated file make no image requests.
- Editorial photo layer: 24 original AI-generated base scenes (education, travel, immigration, business, strategy, finance, legal, trade, HR, technology, real estate, healthcare, manufacturing, energy, retail, hospitality, construction, government, agriculture, offices, insights, boardrooms, reception, city). `derive-editorial.mjs` expands them into **165** page/service/industry/article/office/team/tool/case-study/legal keys with deterministic crops and grades, then writes the manifest. Page heroes, service/industry/tool/insight/case-study cards, the home stats band, why-us cards, process guarantee, testimonials, FAQ panel, final CTA, desktop/mobile hero and the 404 now layer photography over procedural art. Service cards draw from a per-category pool so a practice page does not repeat one frame.
- Pure-CSS 3D isometric badges (`IsoBadge`) across service cards, the orbit, industries, why-us, process, tools, about values, careers, contact, the service-detail hero and the practice/industry hero cards. Deterministic tone per slug, hover lift, reduced-motion and print safe, no WebGL and no image requests.
- ESLint and Prettier configuration.
- Documentation set (this file, design system, architecture, content guide, README).

---

## 2. Key decisions and trade-offs

| Decision | Reason |
| --- | --- |
| Procedural art is Canvas 2D, not WebGL, for cards and backgrounds | Zero network cost, reliable on all devices, far cheaper than dozens of WebGL contexts. Eight visual styles keep it varied. |
| Service orbit is pseudo-3D (RAF + ellipse + depth scale) | Visually equivalent at a fraction of the GPU/bundle cost; keeps the home page fast. |
| 3D hero mounts only on capable desktop devices | Protects mobile LCP and avoids WebGL crashes; reduced-motion users get static procedural art. |
| Bloom implemented; depth of field omitted | DOF adds cost with little visual gain at this composition. Documented as an intentional trade-off. |
| Static currency rates | No external API/key required; clearly labelled as reference rates. Easy to swap for a live feed. |
| Forms resolve locally without `VITE_FORM_ENDPOINT` | The demo must work out of the box. The same layer posts JSON when configured. |
| i18n covers UI chrome, not long-form content | Keeps the data layer simple while delivering a genuine RTL experience. Content localisation can be added per field later. |
| All contact details centralised | Prevents drift between header, footer, forms, schema and floating actions. |
| 71 services rather than the minimum 50 | Delivers genuine breadth across all 12 requested categories without empty stubs. |
| Google Fonts via `<link>` | Fast, familiar, no font binary management. Fallbacks are specified. |

---

## 3. Requirement coverage

| # | Requirement | Status | Where |
| --- | --- | --- | --- |
| 1 | Brand, tagline, tone, original copy | ✅ | `siteConfig.js`, all data files |
| 2 | React 18 + Vite, Router, Tailwind, TS, 3D stack, motion, charts, icons, SEO, i18n, forms, Zustand, folders, splitting | ✅ | Project root, `src/*` |
| 3 | Contact details everywhere; floating WhatsApp; mobile bar | ✅ | `siteConfig.js`, Header, Footer, layouts, forms |
| 4 | 8 regions, 3D globe, arcs from Dubai, clickable cards, local time, list view, HQ highlight | ✅ | `Globe.tsx`, `locations.js`, `/locations`, home GlobalPresence |
| 5A | Procedural generative art, seeded, 8 styles, mouse/scroll reactive, regeneration, used across site, shuffle | ✅ | `GenerativeArt.tsx`, `ArtFrame.tsx`; regenerate via art cycling and seed variety |
| 5B | Optional AI pipeline, provider-swappable, WebP, prompt library, house style, fallback, blur-up, alt | ✅ | `scripts/generate-images.mjs`, `imagePrompts.js`, `ArtFrame.tsx` |
| 6 | 3D hero, scroll storytelling, service orbit, tilt/glare, magnetic buttons, counters, chart, performance guards | ✅ (orbit is pseudo-3D; DOF omitted) | `HeroScene.tsx`, `ServiceOrbit.tsx`, `TiltCard.tsx`, `Counter.tsx`, `StatsChart.tsx` |
| 7 | Palette, typography, grid, motion, dark/light, AR/RTL, WCAG AA, responsive | ✅ | `tailwind.config.js`, `index.css`, hooks, i18n |
| 8 | Sticky header, mega menu, search palette, language, theme, phone, CTA, announcement, mobile menu | ✅ | `Header.tsx`, `CommandPalette.tsx` |
| 9 | Footer columns, pre-footer CTA, newsletter, trust badges, bottom bar, currency/language | ✅ | `Footer.tsx`, `CTASection.tsx` |
| 10 | Home sections, service pages, about, industries, locations, insights, case studies, tools, careers, contact, portal, legal, 404, search | ✅ | `src/pages`, `src/sections` |
| 11 | Complete service catalogue A–L with pages, icons, images, FAQs | ✅ 71 services | `services.js` |
| 12 | 14 industries | ✅ | `industries.js`, pages |
| 13 | Command palette, chat, lead capture, sticky booking, progress, autosave, skeletons, toasts, cookie consent, analytics gates, print, currency/language memory | ✅ | Components, hooks, store, utils |
| 14 | Meta/OG, sitemap, robots, schema, CWV, security, tests, lint/format | ✅ | `Seo`, `seo.ts`, public files, tests, configs |
| 15 | Runnable source, README, seed content, design-system doc, phased confirmation | ✅ | This repo + `docs/` |

---

## 4. Verification log

Run from the project root. Update this section if commands are re-run after changes.

```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e   # requires: npx playwright install chromium
```

| Check | Result | Notes |
| --- | --- | --- |
| `npm install` | ✅ completed | Initial install was interrupted by a tool timeout and produced truncated `@types` files; a clean reinstall was run. |
| `npm run typecheck` | ✅ 0 errors | `tsc --noEmit` |
| `npm run lint` | ✅ 0 warnings | ESLint 8 + TS parser over `src` and `scripts` |
| `npm test` | ✅ 15/15 passed | Vitest unit suite (`src/utils/tools.test.ts`) |
| `npm run build` | ✅ built in ~15s | Vite production build; vendor chunks split |
| `npm run test:e2e` | ✅ 10/10 passed | Playwright desktop + Pixel 7 after `npx playwright install chromium` |
| Responsive QA sweep | ✅ no issues | 19 routes × 360/768/1024/1440/1920: no horizontal overflow, exactly one `h1` per page, no console errors or 4xx responses (re-run after the 3D badge and editorial-photo passes) |
| Lighthouse | manual | Target ≥85 performance on mobile with the 3D fallback |

> Final verification ran on 29 October 2026. Fixes made during this pass: mobile accordion stays open while a category expands, service-detail grid children get `min-w-0` to remove the 360px overflow, the route fallback is dark so the transparent header logo stays legible, the duplicate logo was removed from the 404 page, OG art is rendered to `public/og-cover.png` via `npm run generate:og`, and `ArtFrame` only requests AI images that exist in `public/generated/manifest.json` (zero 404s, procedural fallback preserved). The smoke test now asserts the visible “8 regions” copy instead of the desktop-only trust card.

---

## 5. Placeholders to replace before launch

- Domain `https://rnsglobal.example` → real domain (and regenerate sitemap with `SITE_URL`).
- Social URLs.
- Office street addresses, licences, partner names and certification numbers.
- Testimonials, client names, case-study metrics and photographs.
- Legal documents (template only; needs jurisdiction-specific review).
- `VITE_FORM_ENDPOINT`, analytics IDs.
- AI images (optional) and the final OG image.
- Currency rates (static reference table).
- Careers CV upload (needs a multipart-capable endpoint for real files).

---

## 6. Suggested next steps

1. Replace content with verified company facts and approved testimonials.
2. Wire the form endpoint and add server-side rate limiting/spam protection.
3. Generate the AI image set (or keep procedural art, which is a complete look).
4. Add live currency rates and, if desired, real booking availability.
5. Replace the portal mock with authenticated routes and an API.
6. Add a CMS if non-technical editors will update the catalogue frequently.
7. Run a full accessibility audit with a screen reader and automated axe pass.
8. Add analytics dashboards and conversion events (already hooked in `trackEvent`).
