# Architecture

A pragmatic clean-architecture layout — right-sized for a portfolio site. No over-engineering (no repositories/use-cases for a static content site), but strict separation between **content**, **presentation**, **logic/config**, and **routing**, so nothing gets hardcoded into components and everything stays swappable.

## Layers

```
/app                        → ROUTING LAYER (Next.js App Router — routes only)
  /page.tsx                  → "/" route — composes sections, no logic/markup of its own
  /resume/page.tsx            → "/resume" route
  /layout.tsx                  → root layout: fonts, theme provider, Dock mount
  /globals.css                  → Tailwind base + DESIGN.md tokens as CSS variables

  /components                 → PRESENTATION LAYER (dumb/reusable UI)
    /ui                        → primitives: Button, Icon, Tooltip, ThemeToggle
    /sections                   → page sections: Hero, Stack, Projects, Contact
    /dock                         → Dock.tsx and its subparts (DockItem, ActiveIndicator)

  /content                    → DATA LAYER (structured content, sourced from CONTENT.md)
    /profile.ts                 → name, title, bio, links
    /projects.ts                  → project list (typed)
    /experience.ts                  → experience list (typed)

  /lib                        → LOGIC/CONFIG LAYER (no UI, no JSX)
    /gsap.ts                    → GSAP setup, plugin registration, easing tokens (MOTION.md)
    /theme.ts                     → theme tokens mapped from DESIGN.md, light/dark logic
    /scroll.ts                      → scroll-spy / active-section detection used by Dock

  /hooks                      → shared React hooks (useTheme, useActiveSection)

  /types                      → shared TS types (Project, ExperienceItem, ThemeMode)

/public
  /resume.pdf
  /icons, /images
```

## Rules

1. **Routes (`/app/*/page.tsx`) only compose.** They import section components and pass content down — no inline markup, no inline content strings, no animation logic living directly in a page file.

2. **Content never lives in components.** A component like `Hero.tsx` imports from `/app/content/profile.ts`, it never hardcodes name/bio text. This is what makes `CONTENT.md` → typed content files a real single source of truth instead of just a planning doc.

3. **Components don't know about GSAP internals.** They call shared helpers/hooks from `/lib` and `/hooks` (e.g. `useDockAnimation()`), rather than writing raw `gsap.timeline()` calls inline in every component. Keeps `MOTION.md` patterns centralized and consistent.

4. **Theme logic lives in one place** (`/lib/theme.ts` + a `ThemeProvider`), consumed via a `useTheme()` hook. Components read `theme` from the hook — they never read `localStorage` or `matchMedia` directly.

5. **No cross-layer imports upward.** `/lib` and `/content` never import from `/components`. Data and logic layers stay independent of presentation so they're testable and swappable on their own.

6. **One component, one job.** If a component file is doing content-fetching, animation, AND layout, split it. `Dock.tsx` should compose `DockItem` + `ActiveIndicator` + `useActiveSection()`, not inline all of it.

## Why this structure

- **Content layer separated from presentation** → updating your bio/projects means editing a typed file in `/app/content`, never touching JSX
- **Logic layer separated from UI** → GSAP/theme logic is testable and reusable without a component wrapping it
- **Routes stay thin** → adding a new route/page never requires duplicating section logic
- Matches what's already defined in `CONTENT.md` (data), `DESIGN.md` (tokens → `/lib/theme.ts`), and `MOTION.md` (patterns → `/lib/gsap.ts`)

## For the AI agent

When building any new feature: decide which layer it belongs to *first* (content, presentation, logic, or routing) before writing code. If a component needs data, it imports from `/app/content`. If it needs animation, it uses a shared hook/helper from `/lib` or `/hooks`, not inline GSAP calls. Never mix layers in a single file.