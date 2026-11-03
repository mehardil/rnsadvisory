# Content Guide

Everything a non-developer needs to change lives in two places: `src/config/siteConfig.js` and `src/data/*.js`. You should not need to open a component to update copy, services, offices or contact details.

After any content change, run `npm run dev` to preview and `npm run generate:sitemap` if you added or removed pages.

---

## 1. Brand and contact details

Open `src/config/siteConfig.js`.

```js
brand: {
  name: 'RNS Global',           // wordmark and titles
  legalName: 'RNS Global Advisory FZE',
  tagline: 'Expertise Without Borders.',
  subline: '…',
  description: '…',             // meta description, footer, schema
  website: 'https://rnsglobal.example', // change before launch
  ...
},
contact: {
  phone: '+923319051913',       // used in tel: links and schema
  phoneDisplay: '+92 331 905 1913',
  email: 'mehardil13302@gmail.com',
  whatsapp: '923319051913',     // digits only, no +
  hours: 'Monday–Saturday, 09:00–19:00 GST',
  ...
}
```

The header, footer, floating WhatsApp button, mobile bottom bar, contact page, service sidebars and structured data all read from this file. Changing the name here updates the logo wordmark too.

> Keep `phone` in E.164 format (`+` and digits) and `whatsapp` as digits only. The WhatsApp link is built as `https://wa.me/<digits>`.

Other config in the same file:

- `nav` — main navigation labels and paths.
- `announcements` — dismissible top bar. Set `announcements: []` to remove it.
- `stats` — counters on the home page.
- `trustLogos` — marquee.
- `currencies` — selector options; add a rate in `src/utils/currency.ts` too.
- `trustBadges` — footer trust row.
- `footer.columns` — footer links.

---

## 2. Add or edit a service

File: `src/data/services.js`.

Each category has a `services` array. Append an object like:

```js
{
  slug: 'renewable-project-finance',        // URL: /services/finance/renewable-project-finance
  title: 'Renewable Project Finance',
  summary: 'One sentence used on cards and search.',   // required
  overview: 'Two to four sentences explaining the service.', // required
  whoFor: ['Developers', 'Industrial energy users', 'Investors'], // 3 items
  benefits: ['…', '…', '…', '…'],            // 3–4 items
  documents: ['…', '…'],                     // optional; defaults by category
  timeline: '6–12 weeks',                    // required
  priceFrom: 5000,                           // USD integer, required
  featured: false,                           // true = orbit / home rails
  tags: ['renewables', 'finance'],           // improves search
  faqs: [                                    // optional; 2 custom FAQ + 2 auto
    { q: 'Do you arrange debt?', a: '…' },
  ],
}
```

What is generated automatically:

- Route and page at `/services/<categorySlug>/<slug>`.
- Mega menu links (first 3 per category).
- Catalogue card, search entry, sitemap URL.
- Process steps (category template), package table (Basic/Standard/Premium), two default FAQs (timeline, cost).
- Related-service rails.

**To add a new category**, add an object to `serviceCategories` with `id`, `slug`, `letter`, `title`, `short`, `description`, `icon` (a name from `src/utils/icons.ts`), `destinations`, and a `services` array. Then add a case in `categoryProcessKey` and `categoryDocs` at the top of the file.

**Counts:** if the total service count changes significantly, update `brand.services`, the `stats` counter and the “71” references in the hero, orbit, services page and search copy. (`npm run generate:sitemap` will list the real URLs regardless.)

---

## 3. Offices

File: `src/data/locations.js`.

Each office requires:

```js
{
  id: 'dubai',                 // anchor + globe marker id
  city: 'Dubai',
  country: 'United Arab Emirates',
  countryCode: 'AE',
  flag: '🇦🇪',
  region: 'Middle East',       // used by the Locations filter
  role: 'Head Office',         // Head Office / Operations Hub / Regional Office
  isHQ: true,
  lat: 25.2048,
  lng: 55.2708,
  timezone: 'Asia/Dubai',      // IANA time zone
  phone: '+923319051913',
  email: 'mehardil13302@gmail.com',
  address: '…',
  hours: 'Mon–Sat · 09:00–19:00 GST', // parsed for open/closed status
  since: 2011,
  blurb: '…',
  services: ['Business setup', 'Golden Visa', '…'],
}
```

- Dubai is the hub for globe arcs (`hubId = 'dubai'`).
- `hours` format is `<days> · <open–close> <abbr>`. The status parser understands ranges like `Mon–Sat` and `Sun–Thu`.
- Every office automatically receives `ProfessionalService` structured data.

---

## 4. Industries

File: `src/data/industries.js`.

Fields: `slug`, `title`, `icon`, `tagline`, `description`, `longDescription`, `services` (service slugs for recommendation cards), `stats` (3), `trends` (3). The detail page maps the service slugs to real service data, so use exact slugs.

---

## 5. Insights / blog

File: `src/data/articles.js`.

```js
{
  slug: 'my-article',
  title: '…',
  excerpt: 'One or two sentences.',
  category: 'Immigration',
  tags: ['UAE', 'Visa'],
  date: '2026-10-01',          // ISO, used for sorting
  readingTime: '7 min read',
  author: 'amara',             // key in the authors object
  heroPrompt: '…',             // used by the AI image script
  takeaways: ['…', '…', '…'],
  sections: [
    {
      id: 'stable-anchor',
      heading: 'Section heading',
      paragraphs: ['…', '…'],
      bullets: ['optional', 'list'], // optional
    },
  ],
}
```

- The table of contents is generated from `sections[].id` and `heading`.
- Related articles are scored by category and shared tags.
- Authors live in the `authors` object at the top of the file.

---

## 6. Testimonials, case studies and FAQs

- `src/data/testimonials.js` — `quote`, `name`, `role`, `location`, `country`, `flag`, `service`, `rating`. Used by the slider.
- `src/data/caseStudies.js` — `title`, `client`, `sector`, `location`, `services`, `challenge`, `approach`, `duration`, `metrics` (`before`/`after`), `quote`, `featured`. The home page shows the first three featured; the case studies page shows all.
- `src/data/faqs.js` — `homeFaqs` (home + schema) and `contactFaqs`. Service FAQs live with each service.

> Use approved, accurate testimonials. Names and metrics in the seed data are illustrative and must be replaced before launch.

---

## 7. About page

File: `src/data/about.js`.

- `story` — timeline milestones (`year`, `title`, `text`).
- `values` — 6 items with a Lucide icon name.
- `leadership` — name, role, initials, location, focus, bio. Team images use `team-<initials>`, e.g. `team-rs`.
- `certifications`, `partners`, `csr`, `culture` — replace with verified details.

---

## 8. Careers

File: `src/data/jobs.js`.

Each role: `id`, `title`, `department`, `location`, `type`, `level`, `summary`, `responsibilities[]`, `requirements[]`. Departments appear as filters automatically from the `departments` array — update it when adding a new department.

The application form uses `applicationSchema` in `src/utils/validation.ts`. CV upload currently records the filename only in demo mode.

---

## 9. Tools data

- `src/data/tools.js` — tool cards and titles.
- `src/data/checklists.js` — visa/setup checklists grouped by category. Add a new object to `checklistPurposes`.
- `src/data/studyDestinations.js` — indicative tuition, living, visa, flight and insurance figures in USD.
- `src/utils/tools.ts` — estimation formulas and eligibility heuristics.
- `src/utils/currency.ts` — static rates (units per 1 USD).

If you change a formula, update the relevant unit tests in `src/utils/tools.test.ts`.

---

## 10. Legal

File: `src/data/legal.js` — `privacy`, `terms`, `cookies`, `disclaimer`. Each has `title`, `updated`, `summary`, `sections[]` with `heading`, `paragraphs[]` and optional `bullets[]`.

The seed copy is a plain-English template. Have a lawyer review each document for the jurisdictions you operate in before launch.

---

## 11. Language and RTL

- UI strings: `src/i18n/locales/en.json` and `ar.json`.
- Add a key in both files, then call `t('section.key')` in a component.
- Arabic automatically switches `<html dir="rtl">`.
- Long-form content (services, articles) is English-only by design. To localise content, add Arabic fields to the data and select by `i18n.language`.

---

## 12. Images

### Procedural

No configuration needed. To change the look of a surface, pass a different `seed` or `style` to `<GenerativeArt />` or `<ArtFrame />`:

```tsx
<ArtFrame
  seed="service-finance-tax"
  style="contours"        // mesh | particles | contours | crystals | waves | aurora | skyline | orbits
  imageKey="service-finance-tax-vat-compliance"
  alt="Corporate tax advisory"
  animate={false}
/>
```

### Editorial photography (default)

The default photo set is AI-generated and resumable, with no API key required:

```bash
npm run generate:editorial                 # generate missing base scenes
npm run generate:editorial -- --only=base-finance,base-trade
npm run derive:editorial                   # expand to every content key + manifest
```

- Base prompts live in `scripts/generate-editorial.mjs`.
- `scripts/derive-editorial.mjs` maps every service, industry, article, office, tool, case study, legal page and page hero to a base scene, then applies a deterministic crop and grade. The mapping is at the top of the script.
- Files land in `public/generated/` and are listed in `manifest.json`. `ArtFrame` only requests files present in the manifest, so a partial set falls back cleanly to procedural art.
- To add a new page key, add it to the mapping and re-run `npm run derive:editorial`.
- The images are illustrative; replace them with licensed photography for identifiable people or real locations.

### Bring your own AI provider

1. Add or edit prompts in `src/data/imagePrompts.js` (the key becomes the filename).
2. Set a provider and key in `.env`.
3. Run `npm run generate:images -- --only=<key-prefix>`.
4. Files land in `public/generated/`. The site picks them up automatically; if a file is missing, procedural art remains.

---

## 13. Before you publish

- [ ] Replace the domain in `siteConfig.brand.website` and `public/robots.txt`/sitemap.
- [ ] Verify phone, WhatsApp and email links.
- [ ] Replace placeholder social URLs, addresses, licences and partners.
- [ ] Replace illustrative testimonials and case metrics with approved facts.
- [ ] Set `VITE_FORM_ENDPOINT` and test each form.
- [ ] Review legal pages with counsel.
- [ ] Run `npm run generate:sitemap` with `SITE_URL` set.
- [ ] Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
- [ ] Lighthouse audit on mobile; confirm the hero fallback is used on low-end devices.
