# RNS Global — Expertise Without Borders

A premium, one-stop global advisory and consultancy website built with **React 18 + Vite + TypeScript**, Tailwind CSS, React Router v6, Zustand, Framer Motion, GSAP, Lenis, Recharts and React Three Fiber. It covers education, travel, immigration, business setup, strategy, finance, legal, trade, HR, technology, real estate and specialised advisory across **8 regions**.

The design is editorial and restrained: deep navy, ivory and gold, Playfair Display headlines, Inter body copy and JetBrains Mono labels. All artwork is generated in the browser (procedural canvas art), with an optional AI image pipeline that falls back automatically.

---

## Quick start

```bash
npm install
cp .env.example .env      # optional — the site runs without keys
npm run dev               # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

Requirements: Node 18+ (tested on Node 20), npm 9+.

### Run with Docker

Build and start the production image (nginx serving the Vite build):

```bash
docker build -t rns-global .
docker run -d --name rns-global -p 8080:80 rns-global
```

Open <http://localhost:8080>. Or use Compose:

```bash
docker compose up -d --build     # http://localhost:8080
docker compose down              # stop
```

The image uses a multi-stage build (Node for the build, nginx for runtime), gzip, long-lived caching for hashed assets and `/generated`, and an SPA fallback for client-side routes. Rebuild after content or image changes with `docker compose up -d --build`.

---

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build with vendor chunk splitting |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run lint` | ESLint over `src` and `scripts` |
| `npm run format` | Prettier write |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright smoke tests (builds + previews automatically) |
| `npm run generate:editorial` | Generate the editorial photo set (Pollinations Flux) → `public/generated/base-*.webp` |
| `npm run derive:editorial` | Expand base photos into every page/service/industry/article key + manifest |
| `npm run generate:images` | Optional provider-swappable AI pipeline → `public/generated/*.webp` |
| `npm run generate:sitemap` | Regenerate `public/sitemap.xml` from content data |
| `npm run generate:og` | Render `public/og-cover.svg` → `public/og-cover.png` (1200×630) |

---

## Environment variables

Copy `.env.example` to `.env`. Nothing secret is exposed to the browser.

| Variable | Used by | Notes |
| --- | --- | --- |
| `VITE_FORM_ENDPOINT` | Contact, quote, newsletter, careers, booking | Formspree/EmailJS-compatible JSON POST. If empty or left as the placeholder, forms resolve locally in demo mode. |
| `VITE_GA_ID` | Consent-gated analytics | Google Analytics ID. Loads only after analytics consent. |
| `VITE_META_PIXEL_ID` | Consent-gated marketing | Meta Pixel ID. Loads only after marketing consent. |
| `IMAGE_PROVIDER` | Image script | `openai`, `replicate` or `stability`. |
| `OPENAI_API_KEY` / `REPLICATE_API_TOKEN` / `STABILITY_API_KEY` | Image script | Build-time only. |
| `IMAGE_MODEL` | Image script | Defaults to `gpt-image-1`. For Replicate set e.g. `black-forest-labs/flux-schnell`. |

> Never prefix provider keys with `VITE_`. Anything with `VITE_` is shipped to the browser.

---

## Editing content without touching components

The content layer is deliberately separated. You can re-brand the site and edit every service, office, article and FAQ without opening a React component.

| What you want to change | File |
| --- | --- |
| Company name, tagline, phone, email, WhatsApp, socials, nav, footer, currencies, trust badges | `src/config/siteConfig.js` |
| Service catalogue (12 categories, 71 services, pricing, documents, FAQs) | `src/data/services.js` |
| Offices, addresses, coordinates, time zones, roles | `src/data/locations.js` |
| Industries | `src/data/industries.js` |
| Blog articles (9 long-form pieces) | `src/data/articles.js` |
| Testimonials, case studies, home FAQs | `src/data/testimonials.js`, `caseStudies.js`, `faqs.js` |
| About page: story, values, leadership, certifications, CSR | `src/data/about.js` |
| Careers roles and benefits | `src/data/jobs.js` |
| Tools metadata, checklists, study costs, legal copy | `src/data/tools.js`, `checklists.js`, `studyDestinations.js`, `legal.js` |
| AI image prompt library | `src/data/imagePrompts.js` |
| English/Arabic UI strings | `src/i18n/locales/en.json`, `ar.json` |

**Adding a service:** append an object to a category's `services` array in `src/data/services.js`. It automatically appears in the mega menu, catalogue, search, sitemap generator and related rails. Required fields: `slug`, `title`, `summary`, `overview`, `whoFor`, `benefits`, `timeline`, `priceFrom`, optional `documents` and `faqs`.

**Rebranding:** change `siteConfig.brand.name` and the logo wordmark will follow. Contact links everywhere are generated from `siteConfig.contact`.

---

## Imagery: four layers

### A. Procedural generative art (always on)

`src/components/GenerativeArt.tsx` renders unique seeded artwork on a 2D canvas — no network request, no API key.

- Eight styles: gradient mesh, particle network, topographic contours, glass crystals, wave grid, aurora, skyline and orbit rings.
- Seeded by page/service name **plus a per-session salt**: consistent within a visit, new on reload.
- Slowly regenerates every 12–20 seconds with a fade, reacts to pointer movement, pauses off-screen, caps DPR at 1.5 and 30fps, and renders a single static frame for reduced-motion users.
- Used for hero backgrounds, section art, service cards, blog thumbnails, the 404 page, OG fallbacks and loading states.
- `ArtFrame` layers an optional AI WebP on top; if the file is missing or fails, the procedural art remains. Blur-up shimmer, lazy loading and alt text are built in.

### B. CSS 3D isometric badges (always on)

`src/components/IsoBadge.tsx` renders a raised metal-and-glass pedestal with a floating medallion using CSS 3D only. Each service, industry, value, reason, tool and process step gets a deterministic gold/royal/emerald tone, a hover lift and an orbit ring. No WebGL context and no network request, so it is safe on low-end devices and stays sharp at every size.

### C. Editorial photo set (included)

The site ships with an original editorial photo set generated through Pollinations Flux and optimised to WebP. It is written to `public/generated/` and indexed by `manifest.json`, so `ArtFrame` can fade real photography over the procedural fallback.

```bash
npm run generate:editorial   # base scenes (resumable, free-tier rate limited)
npm run derive:editorial     # per-page crops + manifest for every content key
```

`scripts/derive-editorial.mjs` maps every service, industry, article, office, tool, case study, legal page and page hero to a base scene, then applies a deterministic crop and grade. That gives each card a distinct frame without requesting hundreds of unique generations. Re-run both commands after adding content; missing keys simply fall back to procedural art.

The images are illustrative and AI-generated. Replace them with licensed photography if your brand requires real people or places, or point the optional provider pipeline below at your own account.

### D. Optional provider-swappable AI pipeline

```bash
IMAGE_PROVIDER=openai OPENAI_API_KEY=sk-... npm run generate:images
npm run generate:images -- --only=service-immigration --limit=5
npm run generate:images -- --force
```

- Reads prompts from `src/data/imagePrompts.js` (hero, all 12 categories, every service, industries, every office, team abstracts, blog covers, CTA).
- Every prompt uses the house style: *premium corporate editorial illustration, deep navy and gold palette, soft volumetric light, 3D isometric glass and metallic elements, clean minimal composition, no text, no logos, no real people's faces, ultra high quality.*
- Outputs optimised WebP files to `public/generated/`, plus `manifest.json`.
- The script skips existing images unless `--force`; failures are reported but do not break the build.

---

## 3D and motion performance

- The hero scene (`src/three/HeroScene.tsx`) is lazy-loaded and only mounts on capable devices. It includes a wireframe globe, particle field, floating glass geometry, orbital rings, mouse parallax, scroll-driven camera and bloom.
- `useIsLowEnd()` detects mobile, limited cores/memory or reduced-motion preference and serves the canvas fallback instead. DPR is capped at 2.
- The service orbit is a lightweight pseudo-3D CSS/RAF implementation, not WebGL.
- Lenis smooth scrolling is disabled for reduced-motion users and synced to GSAP ScrollTrigger when available.
- Scroll reveals use Framer Motion; the “How we work” timeline uses GSAP only on desktop.
- Recharts is lazy-loaded so charts never block first paint.
- Vendor chunks split React, motion, three, charts and i18n.

Lighthouse targets: performance 85+, accessibility AA, best practices 95+. Run `npm run build && npm run preview` and audit in Chrome. The heavy 3D scene is intentionally excluded on mobile to protect LCP.

---

## Routes

```
/                         Home
/services                 Catalogue
/services/:category       Practice overview
/services/:category/:svc  Service detail template
/industries               Industries
/industries/:slug         Industry detail
/about                    Story, values, leadership, CSR
/locations                Globe, nine offices, map
/insights                 Article grid with search + filters
/insights/:slug           Article with TOC, share, author
/case-studies             Before/after case studies
/tools                    Six free tools
/tools/:slug              Individual tool
/careers                  Roles, filters, application + CV
/contact                  Multi-step form, booking calendar, map
/portal                   Client portal mock (noindex)
/legal/:slug              Privacy, Terms, Cookies, Disclaimer
/sitemap                  Human-readable sitemap
/search?q=                Search results (noindex)
*                         404 with generative art
```

**Header search:** `Ctrl/Cmd + K` opens the command palette over services, industries, articles, offices, tools and pages.

---

## SEO

- `react-helmet-async` per page: title, description, canonical, Open Graph and Twitter tags.
- JSON-LD: Organization, WebSite, Service, FAQPage, Article, BreadcrumbList and ProfessionalService per office.
- `public/robots.txt` and `public/sitemap.xml` (generate with `npm run generate:sitemap`).
- Semantic landmarks, one `h1` per page, breadcrumb navigation, descriptive links and alt text.
- Search and portal pages are `noindex`.

---

## Accessibility

- Skip-to-content link, visible focus rings, keyboard-operable menus, palette and accordions.
- WCAG AA contrast in both light and dark themes.
- ARIA labels on icon-only controls, `aria-expanded` on disclosures, live regions for toasts and status.
- Reduced-motion support across Lenis, GSAP, Framer and generative art.
- Full RTL layout when Arabic is selected; language and currency persist in localStorage.
- Globe markers have an accessible “Where we operate” list view.

---

## Testing

```bash
npm test          # unit tests: currency, estimators, eligibility, office hours, seeded random
npm run test:e2e  # Playwright smoke tests (desktop + mobile projects)
```

The Playwright suite needs browsers installed once: `npx playwright install chromium`.

---

## Deployment

### Vercel

1. Push the repo to GitHub.
2. Import it in Vercel; the framework preset is Vite.
3. Build command: `npm run build`. Output directory: `dist`.
4. Add environment variables from `.env.example`.
5. Because this is a single-page app, add a rewrite so deep links resolve:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

(Vercel detects Vite SPAs automatically; add the rewrite if you use a custom config.)

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- Add `public/_redirects` containing:

```
/*  /index.html  200
```

Set environment variables in Site settings → Environment variables. For cache headers, set long-lived caching for `/assets/*` and `/generated/*`.

### Before launch checklist

- Review the AI-generated editorial images against your brand and the provider's usage terms; replace with licensed photography where real people or places are required.
- Replace placeholder domain `https://rnsglobal.example` in `siteConfig.brand.website`.
- Replace social URLs, office addresses and licensing details.
- Set `VITE_FORM_ENDPOINT` and test submissions.
- Generate or remove AI images; update OG image.
- Have legal pages reviewed by local counsel.
- Run Lighthouse on the real domain and re-run the sitemap generator with `SITE_URL`.

---

## Project structure

```
src/
  components/     Reusable UI, art engine, header/footer, forms, globe, tools
  sections/       Home page sections
  pages/          Route-level pages (lazy loaded)
  three/          React Three Fiber hero scene
  data/           Editable content: services, locations, articles, etc.
  config/         siteConfig.js — brand and contact source of truth
  hooks/          Lenis, media queries, header behaviour, autosave, counters
  utils/          SEO, search, currency, tools, validation, API, analytics
  store/          Zustand UI store (theme, currency, consent, toasts)
  i18n/           i18next setup + English/Arabic strings
public/           favicon, OG cover, robots, sitemap, generated images
scripts/          Image + sitemap generators
tests/            Playwright smoke tests
docs/             Design system, architecture, content guide, build log
```

---

## Documentation

- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — palette, type, spacing, components, motion, accessibility.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — structure, data flow, performance and security decisions.
- [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) — how to edit every content type safely.
- [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) — phased build record, requirement coverage and known placeholders.

---

## Contact details used across the site

- Phone / WhatsApp: **+92 331 905 1913**
- Email: **mehardil13302@gmail.com**
- WhatsApp deep link: `https://wa.me/923319051913`
- Working hours: Monday–Saturday, 09:00–19:00 GST

Both are centralised in `src/config/siteConfig.js`.
