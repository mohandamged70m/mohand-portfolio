# Motion System

Goal: motion that feels engineered, not decorated. Premium portfolios (Linear, Vercel, Stripe-adjacent sites) share a few traits: fast, physics-based easing, staggered reveals, and restraint — nothing moves without a reason.

**Library:** GSAP (`npm install gsap @gsap/react`)

GSAP is now fully free, including plugins that used to be paid (ScrollTrigger, SplitText, etc.) — use them freely. In React/Next.js, use the official `useGSAP()` hook from `@gsap/react` instead of raw `useEffect`, so animations clean up automatically.

```js
// app/lib/gsap.ts — register once, import everywhere
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
export { gsap, ScrollTrigger, SplitText, useGSAP };
```

## Core rules

1. **One orchestrated moment > many scattered effects.** Spend your "budget" on the page-load timeline and 1-2 signature interactions. Everything else should be quiet.
2. **Fast and physical.** Premium motion feels snappy (0.3-0.6s per step), not floaty. Long, slow animations read as amateur.
3. **Stagger, don't sync.** Elements entering together should cascade (`stagger: 0.06-0.08`), not all fire at once.
4. **Respect `prefers-reduced-motion`.** Wrap heavy sequences in `gsap.matchMedia()` and provide an instant/fade-only fallback.
5. **Motion should reveal hierarchy**, not just add movement — the eye should be led somewhere.
6. **Kill/refresh ScrollTriggers on route change** (Next.js App Router) to avoid stacked or stale triggers — handle this in the shared layout.

## Easing tokens

Define once, reuse everywhere:

```js
export const ease = {
  out: "power3.out",      // fast start, gentle settle — use for entrances
  inOut: "power2.inOut",   // for things that move and return
  bounce: "back.out(1.4)", // for punchy, playful feedback (use sparingly)
};
```

## Signature patterns

### 1. Page-load hero timeline
The one moment to spend real effort on. Build a single `gsap.timeline()` inside `useGSAP()`, sequencing with relative offsets (`"-=0.3"`) rather than manual delays:

```js
useGSAP(() => {
  const tl = gsap.timeline({ defaults: { ease: ease.out, duration: 0.6 } });
  tl.from(".hero-title", { y: 24, opacity: 0 })
    .from(".hero-subtitle", { y: 16, opacity: 0 }, "-=0.35")
    .from(".hero-cta", { y: 12, opacity: 0 }, "-=0.3")
    .from(".hero-accent", { scaleX: 0, transformOrigin: "left" }, "-=0.2");
}, { scope: heroRef });
```

### 2. Scroll-triggered reveals
Use `ScrollTrigger` per section, fade + slide up 16-24px, fire once on enter:

```js
gsap.from(".project-card", {
  scrollTrigger: { trigger: ".project-card", start: "top 85%", once: true },
  y: 24, opacity: 0, duration: 0.5, ease: ease.out, stagger: 0.08,
});
```

### 3. Project cards — hover micro-interaction
On hover: slight lift (`y: -4`), subtle glow using the accent green at low opacity, border transition ~0.15s. Use `gsap.to()` on `mouseenter`/`mouseleave`, not CSS transitions, so it stays consistent with the rest of the motion system.

### 4. Magnetic/CTA button (optional signature touch)
The resume/CTA button subtly follows cursor position within a small radius (~8px max) using `gsap.quickTo()` for performant, interruptible tracking. Use on exactly one button — don't apply it everywhere.

### 5. Nav / route transitions
Keep transitions between `/` and `/resume` minimal — a quick crossfade (0.15-0.2s), not a full slide/wipe. Recruiters want speed, not a show.

### 6. Text reveal (optional, use once)
For the hero headline only: use `SplitText` to split into chars/words, then stagger opacity+y in on load. Reserve this for one headline — using it everywhere feels gimmicky.

```js
const split = new SplitText(".hero-title", { type: "words" });
gsap.from(split.words, { y: 20, opacity: 0, stagger: 0.04, ease: ease.out });
```

## What NOT to do

- No parallax on every section — pick at most one place if any
- No infinite looping background animation (distracting, not premium)
- No animating on every scroll pixel via `scrub` unless it's the one deliberate signature moment — most reveals should fire once, not scrub continuously
- No more than one "flashy" signature moment (magnetic button OR SplitText reveal OR cursor effect — not all three)
- Don't animate layout-shifting properties (width/height) — stick to transform/opacity for performance

## Implementation notes for the AI agent

- Register plugins once in `/app/lib/gsap.ts`, import `gsap`/`useGSAP`/etc. from there everywhere else
- Use `useGSAP(callback, { scope, dependencies })` in every component with animation — never raw `useEffect` + manual cleanup
- Each `ScrollTrigger` instance must be scoped to its component via `useGSAP`'s automatic context cleanup, so navigating away doesn't leave stale triggers
- Test with reduced motion enabled (`gsap.matchMedia()` branch) before calling a component "done"