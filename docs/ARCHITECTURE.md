# Architecture

## 1. Stack

| Layer | Choice |
| --- | --- |
| Build | Vite 5, TypeScript, React 18 |
| Routing | React Router v6, lazy route modules |
| Styling | Tailwind CSS 3 + semantic CSS variables |
| State | Zustand (theme, currency, consent, toasts, UI panels) |
| Forms | React Hook Form + Zod resolvers |
| Motion | Framer Motion, GSAP + ScrollTrigger, Lenis |
| 3D | three.js, @react-three/fiber, drei, postprocessing (hero only) |
| Charts | Recharts (lazy-loaded) |
| SEO | react-helmet-async + JSON-LD builders |
| i18n | i18next + browser language detector (EN/AR, RTL) |
| Icons | lucide-react |

## 2. Folder map

```
src/
  components/          Reusable UI and feature components
    tools/             Six interactive tools
    GenerativeArt.tsx  Canvas art engine (8 styles)
    ArtFrame.tsx       Editorial/AI image layer + procedural fallback
    Globe.tsx          Canvas globe with arcs and markers
    Header.tsx         Mega menu, mobile menu, announcements
    Footer.tsx         5-column footer, newsletter, trust row
    ...forms, cards, palette, chat, cookie, cursor
  sections/            Home page composition (Hero → FinalCta)
  pages/               One module per route; all lazy-loaded
  three/HeroScene.tsx  R3F scene, only mounted when appropriate
  data/                Content: services, locations, industries, articles,
                       testimonials, case studies, faqs, about, jobs,
                       tools, checklists, study costs, legal, image prompts
  config/siteConfig.js Brand + contact + nav + footer + currencies
  hooks/               useLenis, useIsLowEnd, useHeaderBehaviour, useAutosave,
                       useOfficeStatus, useCountUp, useScrollProgress
  utils/               seo, search, currency, tools, time, validation, api,
                       analytics, storage, format, icons, random, links, cn
  store/useUIStore.ts  Persisted UI state
  i18n/                Config + EN/AR JSON
public/                favicon, OG SVG, robots.txt, sitemap.xml, generated/
scripts/               Editorial + AI image pipelines, OG + sitemap generators
tests/                 Playwright smoke tests
docs/                  This documentation
```

## 3. Rendering and routing

- `App.tsx` defines every route under a single `Layout` route. Each page is `React.lazy`.
- `Layout` provides header, footer, floating actions, chat, cookie consent, command palette, toaster, cursor, scroll progress and error boundary.
- A `Suspense` fallback shows a branded skeleton. `ErrorBoundary` contains a friendly recovery panel with the phone number.
- Route changes scroll to top unless there is a hash; hash targets receive a delayed `scrollIntoView` so lazy content can mount.
- Page transitions are a 320ms opacity fade keyed on pathname. No exit animation to avoid layout flashes.

## 4. Data flow

```
siteConfig.js ─┐
data/*.js ─────┼→ pages/sections/components → UI
               │
               └→ search index, sitemap script, image prompt library
```

- Components never hard-code contact details or the brand name.
- `services.js` enriches every service with a process template, category documents, generated packages and default FAQs. Adding one object creates a full page and all links.
- Search is built at module load from services, industries, articles, locations, tools and static pages. Scoring favours title prefix → title contains → subtitle → keywords.
- The sitemap and image prompt libraries import the same data, so routes and prompts stay in sync.

## 5. State

`useUIStore` (Zustand + persist):

- `theme` — light/dark, applied to `<html class="dark">`; also applied before paint by an inline script in `index.html`.
- `currency` — used in service prices and tool outputs.
- `announcementDismissed` — top bar.
- `cookieConsent` — `{ decided, analytics, marketing }`, gates analytics loading.
- `paletteOpen`, `mobileMenuOpen`, `toasts` — ephemeral, not persisted.

Language is stored by i18next in `localStorage` (`i18nextLng`). Form drafts and checklist progress use dedicated localStorage keys with a safe wrapper.

## 6. Forms

- Zod schemas in `utils/validation.ts`; RHF resolvers in components.
- `submitForm` re-checks the honeypot, applies a 20-second client-side rate limit, sanitises strings, and posts JSON to `VITE_FORM_ENDPOINT` when configured. Otherwise it resolves after a short delay in demo mode.
- Multi-step contact form validates only the visible step before advancing, autosaves to localStorage with a 700ms debounce, and restores on mount.
- Booking calendar is client-side only; selected date/time is included in the submission payload.
- Newsletter, quote, careers and exit-intent forms all use the same submission layer.
- CV upload records the filename only in demo mode; wiring a real multipart upload requires a backend or a provider that accepts files.

## 7. Generative art

- `createRandom(seed)` uses FNV-1a hashing + mulberry32 for deterministic output.
- Seed = `name : sessionSalt : generation`. The salt comes from `sessionStorage`, so art is stable while browsing but changes on reload. Regeneration increments `generation`.
- Eight paint routines operate on a resized canvas: mesh, particles, contours, crystals, waves, aurora, skyline, orbits.
- Performance guards: DPR ≤ 1.5, ~30fps cap, IntersectionObserver pause, `document.hidden` check, single static frame for reduced motion, no external assets.
- `ArtFrame` always renders the canvas and optionally overlays `/generated/<key>.webp`. On load error the image is removed, so the canvas remains.

## 8. 3D

- `HeroScene` is imported through `React.lazy` and mounted only when `!useIsLowEnd()`.
- Canvas: `dpr={[1,2]}`, antialias off, alpha, pointer-events none.
- Scene: outer wireframe icosahedron, inner opaque sphere for depth occlusion, additive particle shell, two orbit rings, four floating glass meshes, two lights plus a gold point light, bloom via `@react-three/postprocessing`.
- Mouse parallax and scroll-based camera movement lerp for smoothness.
- Low-end devices, mobile and reduced-motion users get the editorial city photograph (manifest-gated) over a `GenerativeArt` “crystals” fallback instead. This is the main performance lever for LCP.

## 9. Performance

- Vendor chunk splitting: react, motion, three, charts, i18n.
- Route-level code splitting; the 3D and Recharts chunks are never on the critical path.
- No web font blocking beyond `display=swap` and preconnect.
- Images: 165 manifest-gated editorial WebP files, derived from 24 base scenes. Cards lazy-load with `loading="lazy"` and `decoding="async"`; page heroes opt into `priority` for LCP. Missing keys fall back to procedurally generated canvas art with zero requests.
- Canvas art pauses off-screen; globe and orbit cap at ~30fps.
- CSS is one Tailwind build; no runtime CSS-in-JS.
- Total first-load JS is dominated by React + router + framer-motion. Charts and three are deferred.

Trade-off: the specification asked for bloom/depth-of-field and a 3D service orbit. Bloom is implemented only in the hero; DOF is omitted to protect frame rate. The service orbit is a pseudo-3D RAF implementation rather than WebGL, which looks close and costs a fraction of the GPU budget.

## 10. Security

- No secrets in client code. Image provider keys are only read by the Node script.
- Form input sanitised; honeypot + client-side rate limit. Real rate limiting must also exist at the endpoint.
- External links use `rel="noopener noreferrer"`.
- Analytics and pixels are consent-gated and never loaded by default.
- Portal is explicitly a demo; no credentials are transmitted. Production would require a backend, SSO and MFA.
- Legal pages are templates and must be reviewed before launch.

## 11. SEO

- `Seo` component sets title, description, canonical, OG/Twitter, optional `noindex`, and arbitrary JSON-LD.
- Builders in `utils/seo.ts`: Organization, WebSite, BreadcrumbList, Service, FAQPage, Article, ProfessionalService per office.
- `public/sitemap.xml` generated from data by `npm run generate:sitemap`; `robots.txt` disallows `/portal`.
- Human-readable `/sitemap` page.

## 12. Testing

- Vitest covers pure logic: currency conversion, company cost estimation, study budgets, eligibility bands, office-hours parsing/time zones, bookable days and seeded randomness.
- Playwright covers the home hero, service navigation, command palette, contact validation and a tool interaction on desktop and mobile.
- No component snapshot tests by design; visual regressions are better caught in a browser.

## 13. Known placeholders

- Domain, social URLs, office street addresses, licences and partner names are illustrative.
- Testimonials, client names and case-study metrics are illustrative placeholders.
- Legal copy is a plain-English template, not legal advice.
- Currency rates are static reference rates.
- Form submissions resolve locally until `VITE_FORM_ENDPOINT` is set.
- Portal is a front-end mock with sample data.
- The included editorial set is illustrative and AI-generated; replace it with licensed photography for real people or places, or run the optional provider pipeline.
