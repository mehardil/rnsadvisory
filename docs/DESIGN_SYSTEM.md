# RNS Global Design System

**Version 1.0 · October 2026**

A restrained editorial system for a global advisory firm: navy authority, ivory space, gold precision. The design should read as confident and expensive without decoration for its own sake.

---

## 1. Principles

1. **Editorial, not corporate template.** Playfair Display headlines, generous white space, hairline rules and a magazine-like grid.
2. **One accent, used sparingly.** Gold marks importance: links, dividers, numeric emphasis, focus states. It is never a background for large areas (except the thin announcement bar and primary buttons).
3. **Alternating light and dark.** Ivory sections carry content; navy sections carry gravity (hero, global presence, values, CTA).
4. **Evidence over claims.** Numbers are set in JetBrains Mono and labelled. Metrics are visible near the claim they support.
5. **Movement with restraint.** Reveals are short and subtle; nothing loops in the reading column. Procedural art breathes slowly behind content.

---

## 2. Colour

| Token | Hex | Usage |
| --- | --- | --- |
| Navy | `#0A1A3A` | Primary dark surface, body text on light, footer, hero |
| Deep Blue | `#12306B` | Gradient partner, hover states on navy |
| Royal Blue | `#1F4FD8` | Links in prose, chart series, user chat bubbles |
| Gold | `#C9A24B` | Accent, primary buttons, dividers, focus, markers |
| Soft Gold | `#E8D6A0` | Gold on dark backgrounds, eyebrows, chart gradients |
| Ivory | `#F7F5EF` | Light page background, text on navy |
| Slate | `#5B6B86` | Secondary text on light |
| Success | `#1E9E6A` | Confirmation, open status, positive metrics |
| Error | `#D64545` | Validation errors, destructive states |

Semantic variables live in `src/index.css` and swap for dark mode:

```css
:root {
  --bg: #F7F5EF;
  --surface: #FFFFFF;
  --surface-2: #F4F1E8;
  --ink: #0A1A3A;
  --ink-soft: #5B6B86;
  --hair: rgba(10,26,58,0.12);
  --gold: #C9A24B;
}
.dark {
  --bg: #060F22;
  --surface: #0B1A35;
  --surface-2: #102344;
  --ink: #F4F1E9;
  --ink-soft: #A9B6CC;
  --hair: rgba(232,214,160,0.16);
  --gold: #D8B263;
}
```

Rules:

- Body copy on light uses `--ink-soft`, not pure slate at small sizes below 12px.
- On navy, body copy is `ivory/55` to `ivory/65`; headings are full ivory; gold is `softgold`.
- Never place gold text on ivory below 16px without checking contrast (use `--gold-ink: #8A6A1F`).
- Focus ring is always 2px gold with a 3px offset.

---

## 3. Typography

| Role | Family | Weight | Size | Tracking |
| --- | --- | --- | --- | --- |
| Display / H1 | Playfair Display | 500 | `clamp(2.65rem, 5.4vw, 5.1rem)` | `-0.035em` |
| H2 | Playfair Display | 500 | `clamp(2rem, 3.5vw, 3.35rem)` | `-0.03em` |
| H3 | Playfair Display | 500 | `clamp(1.45rem, 2vw, 1.9rem)` | `-0.02em` |
| H4 / card title | Playfair or Inter | 500/600 | 1.05–1.2rem | `-0.01em` |
| Lede | Inter | 400 | `clamp(1.02rem, 1.25vw, 1.18rem)` | normal |
| Body | Inter | 400 | 0.82–1rem | normal |
| Small / meta | Inter | 400/500 | 0.66–0.8rem | normal |
| Eyebrow | JetBrains Mono | 500 | 10.5px | `0.22em`, uppercase |
| Numeric label | JetBrains Mono | 400/500 | 9–11px | `0.14–0.18em`, uppercase |
| Statistics | JetBrains Mono | 500 | 1.9–2.85rem | tight |

Loaded from Google Fonts with `display=swap`; fallbacks are Georgia, system UI and monospace.

Editorial device: **italic gold emphasis inside a headline** (`<em>` inside `.display` / `.h1` / `.h2`). Use once per heading, never on every line.

---

## 4. Spacing and layout

- Base spacing unit: **4px**. Common steps: 8, 12, 16, 20, 24, 32, 48, 64, 80, 112.
- Section rhythm: `py-14` mobile → `py-20/28` desktop. Hero: `min-h-[100svh]`.
- Container: `.container-x` — max 1320px, padding 20px mobile / 32px tablet / 40px desktop.
- Grid: 12 columns on desktop (`lg:grid-cols-12`), 2 on small tablets, 1 on mobile.
- Sticky offsets: header 70px (+ announcement 32px), anchors use `scroll-mt-28` / `.anchor-offset`.
- Card radius: `rounded-2xl` (16px); pills and buttons are fully rounded; images inside cards have no radius (they sit flush).

---

## 5. Surfaces and elevation

| Class | Description |
| --- | --- |
| `.card` | Surface + 1px hairline + soft shadow + 16px radius |
| `.card-hover` | Lift 4px, gold border at 55%, deeper shadow |
| `.glass` | 72% surface + 18px blur; used for floating UI |
| `.glass-dark` | Navy glass at 55% + gold hairline; used over imagery |
| `.gold-rule` | 1px gradient gold → transparent |
| `body::after` | Inline SVG film grain at 3.5% opacity |
| Grain overlay | Fixed, pointer-events none, z-60 |

Shadows are warm and low-contrast (`rgba(10,26,58,…)`), never harsh black.

---

## 6. Components

### Buttons

- **Gold**: primary conversion action. Gradient, navy text, shine sweep on hover, gold glow.
- **Navy**: secondary in dark contexts.
- **Outline**: neutral actions on light.
- **Light outline**: actions on navy/imagery.
- **Ghost**: tertiary text actions.
- Sizes: sm (compact cards/nav), md (default), lg (hero).
- `Magnetic` adds a subtle pointer-follow translation on fine pointers only.

### Chips

Pill filter controls; `.chip-active` inverts to navy (light mode) or gold (dark mode). Always keyboard-focusable buttons.

### Cards

Service card: 4:3 generated cover, category chip, external-arrow affordance, title, summary, price from. Tilt-and-glare on desktop via `TiltCard`. A 3D isometric badge overlaps the cover/content seam so every service has a distinct, dimensional marker.

### 3D isometric badges

`IsoBadge` is a pure-CSS 3D component: a raised pedestal with a floating metal-and-glass medallion, orbit ring, sparks and a soft contact shadow. Three palettes (gold, royal, emerald) plus ivory, assigned deterministically from a slug/title so a service keeps the same colour across the site. Sizes sm/md/lg; optional float; the surrounding `.group` hover lifts the medallion and increases the glow. Used on service cards, the service orbit, industries, why-us reasons, process steps, tools, about values, careers benefits, contact cards, plus the service-detail, practice and industry heroes. No WebGL context, no image request, and it is hidden in print.

### Forms

Inputs use `.input` with 10px radius, hairline border, gold focus ring. Labels are 12.5px semibold. Errors sit below the field in `#D64545`. Multi-step forms show a progress bar, step names and autosave note. Consent is never pre-checked. Honeypot field is visually removed but present.

### Navigation

- Header is transparent over heroes, then glass/solid on scroll; hides on down-scroll, returns on up-scroll.
- Services mega menu: 6 primary practice columns + featured card; remaining practices in a footer strip.
- Mobile menu: full-screen navy, accordion per practice, contact shortcuts pinned to the bottom.
- Command palette: `Ctrl/Cmd+K`, type-to-search, arrow-key navigation, grouped type labels.

### Globe

Canvas 2D globe with atmospheric halo, graticule, seeded surface dots, great-circle arcs from Dubai and clickable markers. A list view provides the same information without interaction.

### Service orbit

Eight featured services on an ellipse with depth-based scale, opacity and z-index. Auto-rotates, pauses on hover/focus.

### Toasts, modals, cookie banner

Toasts bottom-left on desktop, above the mobile bar on mobile. Modals use a navy scrim + blur and close on Escape or backdrop. Cookie banner offers Accept all / Essential only / Preferences.

---

## 7. Motion

| Interaction | Duration | Easing |
| --- | --- | --- |
| Reveal on scroll | 700ms | `cubic-bezier(0.22, 0.7, 0.2, 1)` |
| Hover lift | 300–350ms | ease-out |
| Page fade | 320ms | ease-out |
| Accordion | 350ms | same as reveal |
| Generative art regeneration | 12–20s | 700ms cross-fade |
| Header hide/show | 500ms | built-in |

Rules:

- Stagger lists by 40–70ms, cap the total delay at 250ms.
- No parallax on the reading column.
- `prefers-reduced-motion` removes transforms, autoplay, marquee and smooth scroll.
- Custom cursor only on fine pointers; native cursor retained for inputs.
- 3D hero is desktop-only; mobile receives generative art.

---

## 8. Imagery

Four layers, in priority order:

1. **Editorial photography** (default): original AI-generated scenes from Pollinations Flux, indexed in `public/generated/manifest.json`. Twenty-four base scenes cover education, travel, immigration, business, strategy, finance, legal, trade, HR, technology, real estate, healthcare, manufacturing, energy, retail, hospitality, construction, government, agriculture, offices, insights, boardrooms, reception and city skylines.
2. **Optional provider pipeline**: bring your own OpenAI, Replicate or Stability key and run `npm run generate:images`.
3. **CSS 3D badges**: `IsoBadge` adds a dimensional icon marker to every point.
4. **Procedural art**: always renders underneath as the zero-request fallback.

- `ArtFrame` only requests an image when the key exists in the manifest, so partial or missing sets never produce 404s.
- `scripts/derive-editorial.mjs` gives every service, industry, article, office, tool, case study, legal page and hero its own deterministic crop and grade from the base set.
- Cards use 4:3, heroes 16:9/4:3, articles 21:9, team 3:4.
- Overlays: bottom-up navy gradient (70% → transparent) plus a subtle global grain.
- Generated imagery is illustrative; replace with licensed photography if the brand requires identifiable people or places.

---

## 9. Iconography

Lucide, 1.5px stroke, 13–20px in UI. Each practice and industry has a consistent icon mapped in `src/utils/icons.ts`. Icons are decorative next to a label; icon-only buttons always have an `aria-label`. Where a point needs visual weight — service, industry, value, reason, tool, process step — the Lucide icon is mounted inside an `IsoBadge` rather than a flat tinted square.

---

## 10. Dark mode

- Semantic variables swap; components do not use `dark:` classes for surfaces.
- Dark surfaces are `#060F22` page / `#0B1A35` card / `#102344` inset.
- Gold shifts brighter (`#D8B263`) for contrast; soft gold is used for emphasis.
- Dark mode persists via Zustand/localStorage and is applied before paint in `index.html`.

## 11. RTL and Arabic

- `i18next` switches `document.documentElement.dir` to `rtl`.
- Layouts use logical properties where possible (`ms-`, `me-`, `ps-`, `pe-`) and flow naturally.
- Typography stays Playfair/Inter for Latin, with system Arabic fallbacks.
- The mega menu, mobile menu, footer and forms all remain usable in RTL.
- UI chrome is translated; long-form editorial content remains English by design.

---

## 12. Accessibility checklist

- [x] WCAG AA contrast in light and dark modes
- [x] Visible focus ring on every interactive element
- [x] Skip-to-content link
- [x] One `h1` per page, logical heading order
- [x] `aria-expanded`, `aria-controls`, `aria-current`, `aria-label` on custom controls
- [x] Keyboard: mega menu, mobile menu, palette, accordions, tabs
- [x] Reduced-motion support
- [x] Alt text or `aria-hidden` on every image/canvas
- [x] Globe has a text list alternative
- [x] Form errors announced inline and associated with fields
- [x] Touch targets ≥ 40px for primary mobile actions

---

## 13. Do / Don't

**Do**

- Use one gold italic emphasis per headline.
- Let ivory space do the work; resist filling it.
- Put a real number next to a claim.
- Keep body measure under 75 characters.
- Use the gold hairline to separate ideas, not every element.

**Don't**

- Use gradients on body text.
- Stack more than two accent colours in one component.
- Animate the reading column.
- Ship unlicensed stock photography or generic 3D blobs. The included editorial set is AI-generated and replaceable.
- Use pure black, pure white or saturated blue backgrounds at full page scale.
