# Hrinkar Bothra — Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add your isometric room image as `public/isometric-room.png`
   (any square-ish PNG/WebP works — the layout scales it responsively).
3. Run the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## Structure

- `app/layout.tsx` — loads JetBrains Mono (headings/nav) + Inter (body), sets base background
- `app/page.tsx` — assembles Starfield + Hero + TechProficiency
- `components/Starfield.tsx` — canvas-based twinkling star background (respects `prefers-reduced-motion`)
- `components/Hero.tsx` — name, intro copy, isometric image, side nav
- `components/SideNav.tsx` — the four pill nav buttons (Skills / Projects / Gallery / Contact) — point these `href`s at real sections/routes as you build them out
- `components/TechProficiency.tsx` — skill category cards

## Customizing

- Colors/fonts live in `tailwind.config.ts` (`ember`, `void`, `dusk`, `nebula`, `mist`)
- Copy in `Hero.tsx` and `TechProficiency.tsx` — swap in your real project list and bio
- `SideNav` links use `#anchors` — either add matching `id`s to sections/build real pages (e.g. `/projects`) and swap the `href`s

### Positioning the image and nav (parallax)

- `Hero.tsx` exports `IMAGE_POSITION` — a `{ start, end }` object in `vh`/`vw`/scale.
  `start` is where the isometric image sits at rest; `end` is where it settles once
  you've scrolled through the hero (currently: shrinks and tucks into the top-right).
  Edit those numbers directly to move it anywhere.
- `SideNav.tsx` exports `NAV_POSITION` the same way — the four buttons start at their
  resting spot next to the image and rise to a compact bar near the top as you scroll.
- Both are driven by `useScrollProgress` (in `useScrollProgress.ts`), a 0→1 value
  tracking how far the user has scrolled through the hero's `HERO_SCROLL_SPAN_VH`
  (default 200vh — increase for a slower/longer parallax, decrease for snappier).
- Both **fade out and disappear** rather than parking on top of the content below.
  `fadeOpacity()` in `useScrollProgress.ts` defines a shared fade window
  (`FADE_START` / `FADE_END`, as fractions of the hero's 0→1 scroll progress —
  currently 0.55→0.9): fully visible until `FADE_START`, then eases to
  `opacity: 0` by `FADE_END`. Once faded, `pointer-events: none` kicks in so
  they don't block clicks on the section underneath, and their `end` positions
  (in `IMAGE_POSITION` / `NAV_POSITION`) are pushed off-screen (negative `top`)
  so the exit motion continues even as they vanish rather than freezing in a
  corner. Widen/narrow the `FADE_START`–`FADE_END` gap to make the disappearance
  more gradual or more abrupt.

### Particle background

`Starfield.tsx` has a knobs block at the top: `PARTICLE_DENSITY`, `MAX_SPEED`,
`LINK_DISTANCE` (how close particles need to be to draw a connecting line),
`PARTICLE_COLOR`, `LINE_OPACITY`, particle radius range, and `MOUSE_LINK_DISTANCE`
(cursor-to-particle connecting lines). All plain numbers — tweak and refresh.

## Build

```bash
npm run build
```

Configured with `output: "export"` in `next.config.js` for static hosting (e.g. GitHub Pages, same as your current site).
