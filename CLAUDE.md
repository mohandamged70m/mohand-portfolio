@AGENTS.md

# AI Agent Instructions

This file is the entry point for any AI coding agent (Claude Code, Cursor, etc.) working on this repo. Read this fully before making changes.

## Project summary

Personal portfolio + CV website for [Your Name], a [your title, e.g. "frontend developer"] based in [your city]. Goal: let visitors explore projects/experience, and give recruiters a fast path straight to the CV.

Real content lives in `CONTENT.md`. Design tokens live in `DESIGN.md`. Animation rules live in `MOTION.md`. Folder structure and layering rules live in `ARCHITECTURE.md`. **Never invent bio, project, or experience content** — pull only from `CONTENT.md`. If something is missing, leave a `TODO:` comment instead of making it up.

## Two entry points, one codebase

1. `/` — full portfolio experience for general visitors
2. `/resume` — recruiter-first route: CV PDF front and center (embed or prominent "Download PDF" button), plus a small "See full portfolio →" link back to `/`

Do not build these as separate sites/repos. Shared components (Nav, Footer, theme) must stay consistent across both.

## Conventions

- Follow the layers defined in `ARCHITECTURE.md`: routes compose only, presentation lives in `/app/components`, content lives in `/app/content`, logic/config lives in `/app/lib` — never mix layers in one file
- Components: PascalCase, one component per file
- Styling: Tailwind utility classes only — no separate CSS files unless truly necessary
- Colors/type: use the tokens defined in `DESIGN.md`, don't hardcode new hex values
- Content: import from typed files in `/app/content` (sourced from `CONTENT.md`) — never hardcode project names/links directly in JSX
- Accessibility: visible keyboard focus states, semantic HTML, alt text on all images
- Responsive: mobile-first, test down to 375px width
- Motion: GSAP only (see `MOTION.md`) — no Framer Motion, no CSS-only animation beyond trivial hover states. Register plugins via `/app/lib/gsap.ts`, animate inside `useGSAP()`, and call shared hooks/helpers from components rather than inlining raw GSAP calls everywhere

## What "done" looks like for a page/component

- Matches the palette and type scale in `DESIGN.md`
- Fully responsive
- No placeholder/lorem ipsum text — real content from `CONTENT.md` or a clearly marked `TODO:`
- Links (GitHub, LinkedIn, email, resume PDF) all functional and correct

## Do not

- Do not fabricate work experience, project descriptions, or metrics
- Do not change the color palette or typography without being asked
- Do not add a third entry point/route without discussion
- Do not introduce another animation library (Framer Motion, react-spring, etc.) — GSAP is the single motion system
- Do not mix layers — a component must not fetch/hardcode content, a content file must not import components, and `/lib` must not import from `/components`