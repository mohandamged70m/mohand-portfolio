# Design System

## Palette

| Token | Role | Hex |
|---|---|---|
| `bg-light` | Background (light mode) | `#F8F9F6` |
| `bg-dark` | Background (dark mode) | `#0A0B0A` |
| `text-primary` | Body text (light mode) | `#111213` |
| `text-inverse` | Body text (dark mode) | `#F1F2ED` |
| `accent` | Signature accent — links, CTA, highlights | `#7ED957` |
| `accent-muted` | Borders, hover backgrounds, subtle highlights | `#C9E4C5` |

**Rule:** the accent green is the one signature color. Use it sparingly and deliberately (CTA button, link hover, a status dot, an underline) — not as a background flood or on every element. Everything else stays black/white/gray so the green stays sharp.

## Typography

- **Display face:** [pick one with character — e.g. a geometric sans or a distinct serif for headlines]
- **Body face:** [a clean, readable sans — e.g. Inter, system-ui]
- **Utility/mono:** [for code snippets, labels, dates — e.g. a mono font]

Set a clear type scale (e.g. 14 / 16 / 20 / 28 / 40 / 56px) and use weight/spacing intentionally — don't rely on size alone to create hierarchy.

## Layout principles

- Hero should open with the most characteristic thing about you/your work — not a generic "Hi, I'm X" + gradient
- Structural devices (numbering, dividers, labels) should mean something — don't add numbered markers unless content is actually sequential
- Mobile-first responsive, test to 375px
- Visible keyboard focus states on all interactive elements
- Respect `prefers-reduced-motion`

## Motion

Subtle and purposeful only: hover micro-interactions, scroll-triggered reveals. Avoid decorative animation that doesn't serve navigation or emphasis.