# Mohand Portfolio

A personal portfolio built with **Next.js (App Router)**, **Tailwind CSS v4**, **TypeScript**, **GSAP** + **ScrollTrigger**, and a WebGL halftone shader background.

## Features

- Light/dark theme system driven by CSS variables (`globals.css`) with a working theme toggle.
- Hero section with letter-reveal animations, a self-drawing SVG underline, and scroll-replay entrances (`components/animation` hooks + `app/components/home/HeroSection.tsx`).
- WebGL halftone `ShaderBackground` (`components/ui/blue-halftone.tsx`) themed per light/dark mode.
- Dock navigation with active-section tracking and a crossfade theme transition.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

- `app/` — pages, layout, global styles, hooks, and lib helpers.
- `app/components/home/HeroSection.tsx` — the hero.
- `app/hooks/animation/` — `useLetterReveal` and `useScrollReplay`.
- `components/ui/blue-halftone.tsx` — WebGL shader background.
