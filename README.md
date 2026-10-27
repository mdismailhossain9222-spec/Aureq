# Aureq — Wear the quiet.

A cinematic, quiet-luxury landing page for **Aureq**, a fictional futuristic
accessories maison (watches, rings, eyewear, leather, necklaces).
React 18/19 + Vite + TypeScript + Tailwind CSS v4 + Framer Motion + Lenis +
hls.js + lucide-react.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
  sections/    Hero · Collection · Craft · Materials · Lookbook · CtaFooter
  components/  SplitText · GlassNav · CustomCursor · ScrollProgress ·
               MagneticButton · RevealOnScroll · Marquee · VideoBackdrop
  content/     site.ts        ← ALL copy, links, product names, stats, image paths
  lib/         motion.ts (easings + variants) · cn.ts · useLenis.ts
public/assets/img/            ← generated campaign imagery
```

Every string rendered on the page comes from `src/content/site.ts`. Edit that
file to re-skin the page; no component hardcodes copy.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Ground | `#000000` | page surface, the "matte black board" |
| Foil | `#FFFFFF` | primary type |
| Secondary | `white/40–60` | supporting copy, labels |
| Accent | `#E8D9B5` (champagne) | hairlines, active step number, stat suffix — never a fill |

Type: **Instrument Serif** (italic is the house voice) against **Barlow**
300/400/500/600. Registered in `src/index.css` under `@theme`
(`--font-heading`, `--font-body`) and mirrored in `tailwind.config.ts`.

Easings are limited to `[0.16, 1, 0.3, 1]` and `[0.83, 0, 0.17, 1]` — nothing
bouncy. All `whileInView` reveals are `once: true` with `margin: "-15%"`.

## Customizing

- **Hero / CTA film loop** — `site.hero.videoUrl` (HLS `.m3u8`). The player
  lazy-mounts when the section nears the viewport; Safari uses native HLS; a
  static poster (`site.hero.poster`) sits underneath so a failed stream
  degrades to a still frame.
- **Images** — served from `public/assets/img/` and referenced with relative
  paths (`assets/img/…`), so the build works from any base path. Replace files
  in place, or point `site` at new paths.
- **Glass** — `.liquid-glass-strong` in `src/index.css` (blur 50px + a
  gradient-masked 1.4px inner border). Grain is the global `.grain::after`
  overlay, plus a section-local `.grain-section` in the Lookbook.
- **Motion** — shared variants live in `src/lib/motion.ts`. Smooth scrolling is
  `useLenis()` (lerp 0.09) and is disabled automatically for visitors with
  `prefers-reduced-motion`, along with video autoplay and the marquee.

## Accessibility

Semantic `header / nav / main / section / footer`, alt text on every image,
`aria-label` on icon-only controls, a visible white focus ring on all
interactive elements, and full `prefers-reduced-motion` support via
`MotionConfig reducedMotion="user"`.
