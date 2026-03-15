# Ad-Lab Affiliate Dashboard — Glass Morphism Redesign

**Date:** 2026-03-15
**Status:** Approved
**Scope:** Full visual redesign of existing React/TypeScript dashboard

---

## 1. Overview

Redesign the Ad-Lab Affiliate Dashboard with a liquid glass morphism aesthetic layered over a soft pastel foundation in light mode and a near-black violet base in dark mode. The design targets a premium fintech × boutique creative studio feel — luminous, airy, and sophisticated — with every surface conveying depth and light passage.

---

## 2. Brand & Color System

### Primary Brand Color
- `#ca5cec` — vivid orchid purple

### Light Mode
| Token | Value |
|---|---|
| `--bg-primary` | `#ffffff` |
| `--bg-card` | `rgba(255,255,255,0.55)` |
| Card `backdrop-filter` | `blur(20px) saturate(180%)` |
| Card border | `rgba(202,92,236,0.15)` |
| Card shadow | `0 8px 32px rgba(202,92,236,0.08), 0 1px 2px rgba(0,0,0,0.04)` |
| Pastel tint backgrounds | `#fdf6ff`, `#f3e8ff`, `#fce4ff` |
| Inner top highlight | `border-top: 1px solid rgba(255,255,255,0.7)` |

### Dark Mode
| Token | Value |
|---|---|
| `--bg-primary` | `#0a0a0f` |
| `--bg-card` | `rgba(255,255,255,0.04)` |
| Card `backdrop-filter` | `blur(24px)` |
| Card border | `rgba(202,92,236,0.15)` |
| Card hover glow | `box-shadow: 0 0 40px rgba(202,92,236,0.12)` |

### Accent Gradients
- CTA / active states / highlights: `linear-gradient(135deg, #ca5cec, #8b5cf6)`
- Stat value on primary card: gradient text via `background: linear-gradient(135deg, #ca5cec, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent`
- Vince chart line: `#ca5cec`
- Difiano chart line: `#06b6d4`

### Token Replacements From Current
- Replace `--accent-primary: #6366f1` with `#ca5cec` (light) and `#d580f0` (dark, slightly lighter for contrast)
- Replace `--accent-primary-light` with `rgba(202,92,236,0.10)`
- Replace `--border-accent` with `rgba(202,92,236,0.25)`
- Replace `--shadow-accent` with `0 4px 24px rgba(202,92,236,0.25)`
- `--bg-primary` dark: `#070b14` → `#0a0a0f`
- `--bg-secondary` dark: `#0d1220` → `#0d0d16`
- `--bg-card` dark: `#111827` → `rgba(255,255,255,0.04)`
- `--bg-sidebar` dark: `#0d1220` → `rgba(255,255,255,0.04)`
- `--bg-sidebar` light: `#ffffff` → `rgba(255,255,255,0.6)` (with `backdrop-filter: blur(20px)`)

---

## 3. Typography

| Use | Font | Weight |
|---|---|---|
| Display / headings, `.page-hero-title`, `.card-title`, `.kpi-value` | **Outfit** | 400–800 |
| Body / data, all other text | **DM Sans** | 300–700 |

Stat numbers (`kpi-value`): `font-family: 'Outfit', sans-serif; font-variant-numeric: tabular-nums`
Labels (`kpi-label`, `card-title`, table headers): `text-transform: uppercase; letter-spacing: 0.7px; opacity: 0.5`

**Google Fonts import URL** (replaces existing Inter import in `index.css` line 1):
```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@400;500;600;700;800&display=swap');
```

**`body` font-family change:**
```css
font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

---

## 4. Layout & Structure

No routing, grid, or page structure changes. Sidebar width, header height, and page grid are unchanged. Only visual treatment (colors, backgrounds, borders, shadows) changes.

> Clarification: "no structural changes" means no new routes, no layout grid changes, no component API changes. Adding a welcome banner JSX element inside `OverviewPage.tsx` is a content change within an existing page, not a structural change.

### Sidebar
- `background: rgba(255,255,255,0.6)` light / `rgba(255,255,255,0.04)` dark
- Light: `backdrop-filter: blur(20px) saturate(160%); -webkit-backdrop-filter: blur(20px) saturate(160%)`
- Dark: `backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px)`
- Logo `.logo-text`: color `#ca5cec` (was `var(--text-primary)`)
- Active nav item background: `rgba(202,92,236,0.10)`
- Active nav left accent line: `background: linear-gradient(180deg, #ca5cec, #8b5cf6)`
- Nav hover: `background: rgba(202,92,236,0.06)`
- No section dividers — remove `border-bottom` on `.sidebar-logo`

### Theme Toggle (sidebar footer)
- Pill shape, `border-radius: 99px`
- Light mode: soft white pill, warm shadow
- Dark mode: glass pill, `box-shadow: 0 0 20px rgba(202,92,236,0.15)`
- Icon: Sun ☀️ in light, Moon 🌙 in dark (already in `Sidebar.tsx`)

---

## 5. KPI Stat Cards

Five cards rendered by `KPICard.tsx` with `variant` prop: `'total' | 'vince' | 'difiano' | 'neutral'`.

- `border-radius: 20px`
- Background: glassmorphic (var `--bg-card` which is now rgba)
- `backdrop-filter: blur(20px) saturate(180%)`
- Inner top highlight via `.kpi-card::before` pseudo-element:
```css
.kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255,255,255,0.7);   /* light mode */
  border-radius: 20px 20px 0 0;
  pointer-events: none;
}
html.dark .kpi-card::before {
  background: rgba(255,255,255,0.08);
}
```
- Icon containers: `border-radius: 12px`, soft pastel fill (update `kpi-icon-wrap` colour tokens)
- Labels: ALL CAPS, `opacity: 0.5`, `letter-spacing: 0.6px`
- **Primary card value** (where `variant === 'total'`): add CSS class `.kpi-value-gradient` in `KPICard.tsx` when `variant === 'total'`, styled with gradient text in `index.css`
- Other card values: `color: var(--text-primary)` (unchanged)
- Hover: `transform: translateY(-3px)` (Framer Motion's `whileHover` already handles `y: -2` — update to `y: -3`), shadow deepens via `--shadow-card-hover`
- `will-change: transform` on `.kpi-card` applies only during hover (via `:hover` in CSS, not statically)

---

## 6. Welcome Banner (New Element in OverviewPage)

A new full-width hero strip added at the very top of `OverviewPage.tsx` render output, before the existing page-hero/calendar row.

**JSX addition in `OverviewPage.tsx`:**
```tsx
<div className="welcome-banner">
  <h2 className="welcome-banner-title">Welcome to Ad-Lab — your affiliate earnings at a glance.</h2>
  <p className="welcome-banner-sub">All figures in USD · Earnings dashboard</p>
</div>
```

**CSS in `index.css` (new `.welcome-banner` block):**

```css
.welcome-banner {
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(202,92,236,0.15);
}

/* Light mode */
html.light .welcome-banner,
:root .welcome-banner {
  background: linear-gradient(135deg, rgba(202,92,236,0.12) 0%, rgba(243,232,255,0.8) 100%);
}

/* Dark mode */
html.dark .welcome-banner {
  background: linear-gradient(135deg, rgba(202,92,236,0.18) 0%, rgba(10,10,15,0.9) 60%);
}

/* Shimmer overlay — moving gradient position */
.welcome-banner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(202,92,236,0.07) 40%,
    rgba(139,92,246,0.09) 60%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: banner-shimmer 3s ease infinite;
  pointer-events: none;
}

@keyframes banner-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.welcome-banner-title {
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
  position: relative;
  z-index: 1;
  margin-bottom: 4px;
}

html.light .welcome-banner-title,
:root .welcome-banner-title { color: #1e1e2e; }
html.dark  .welcome-banner-title { color: #ffffff; }

.welcome-banner-sub {
  font-size: 13px;
  position: relative;
  z-index: 1;
  color: var(--text-muted);
}
```

---

## 7. Charts

`Charts.tsx` uses Recharts. Chart colors are currently hardcoded in component props (not CSS tokens), so they must be updated directly in `Charts.tsx`.

- Vince `stroke`: change from `#6366f1` → `#ca5cec`
- Difiano `stroke`: change from `#0ea5e9` → `#06b6d4`
- Area fill gradients: `<linearGradient id="vince" x1="0" y1="0" x2="0" y2="1">` — vertical top-to-bottom. Stop 0%: `stopColor="#ca5cec" stopOpacity={0.20}`, Stop 100%: `stopColor="#ca5cec" stopOpacity={0}`
- Same pattern for Difiano with `#06b6d4`
- Dark mode chart glow: add `filter: drop-shadow(0 0 6px rgba(202,92,236,0.5))` on Vince line in dark mode. Detect via CSS class on `html.dark` and apply `filter` on the SVG path via `className`
- Grid lines: update `stroke` to `var(--chart-grid)` (token already exists). Update token values:
  - Light: `--chart-grid: rgba(0,0,0,0.05)`
  - Dark: `--chart-grid: rgba(255,255,255,0.05)`
- Affiliate view toggle: pill group, active pill background `#ca5cec` with white text (update `.affiliate-btn.active-vince`, `.active-both`, `.active-difiano` in index.css)

---

## 8. Tables

`Tables.tsx` renders tables with CSS classes from `index.css`. No JSX changes needed — token updates only.

- Remove hard borders on `.data-table td` — replace `border-bottom: 1px solid var(--border-subtle)` with `border-bottom: 1px solid rgba(202,92,236,0.06)`
- Alternating row tint: add `.data-table tbody tr:nth-child(odd) td { background: rgba(202,92,236,0.03); }`
- Row hover: `.data-table tbody tr:hover td { background: rgba(202,92,236,0.06); transition: background 0.15s ease; }`
- First column: already `font-weight: 600` (no change)
- Numeric columns: add `font-variant-numeric: tabular-nums` to `.data-table td` matching amount columns — handled via existing right-align td styles

---

## 9. Badges

| Badge | Light bg | Light color | Dark bg | Dark color |
|---|---|---|---|---|
| `.badge-vince` | `rgba(202,92,236,0.12)` | `#ca5cec` | `rgba(202,92,236,0.18)` | `#d580f0` |
| `.badge-difiano` | `rgba(6,182,212,0.10)` | `#06b6d4` | `rgba(6,182,212,0.15)` | `#22d3ee` |

Update corresponding border colors: `.badge-vince` border `rgba(202,92,236,0.25)`, `.badge-difiano` border `rgba(6,182,212,0.22)`.

---

## 10. Scrollbar

Update existing scrollbar rules in `index.css`:

```css
::-webkit-scrollbar        { width: 5px; height: 5px; }          /* unchanged */
::-webkit-scrollbar-track  { background: transparent; }            /* unchanged */
::-webkit-scrollbar-thumb  { background: rgba(202,92,236,0.4); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: #ca5cec; }
```

---

## 11. Micro-interactions & Polish

### `will-change`
Apply `will-change: transform` only on hover (not statically), to avoid unnecessary GPU layer promotion on idle cards:
```css
.kpi-card:hover { will-change: transform; }
.kpi-card { will-change: auto; }  /* reset when not hovered */
```

### Sidebar nav hover underline
Add to `.nav-item` in `index.css`. The `.nav-item` element already has `position: relative`, so the pseudo-element is positioned within it:
```css
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 12px;
  width: calc(100% - 24px);  /* matches left/right inset */
  height: 1px;
  background: #ca5cec;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.2s ease;
}
.nav-item:hover::after { transform: scaleX(1); }
.nav-item.active::after { transform: scaleX(0); }  /* no underline on active — left bar takes priority */
```

### Global root transition
Add to `:root` and `html.dark` blocks:
```css
transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
```

### Count-up animation on KPI values
Framer Motion (`framer-motion@^12.36.0`) is already an existing dependency — no new packages needed.

In `KPICard.tsx`, implement count-up using `useMotionValue` and `animate` from `framer-motion`:
```tsx
import { useMotionValue, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

// Inside KPICard, when value is numeric:
const motionVal = useMotionValue(0)
const [display, setDisplay] = useState('$0.00')

useEffect(() => {
  const num = typeof value === 'number' ? value : 0
  const controls = animate(motionVal, num, {
    duration: 0.6,
    ease: 'easeOut',
    onUpdate: (v) => setDisplay(isCurrency ? formatCurrency(v) : String(Math.round(v))),
  })
  return controls.stop
}, [value])
```
Render `display` instead of `displayValue` for the animated number.

---

## 12. Files to Change

| File | Change Type | Notes |
|---|---|---|
| `src/index.css` | **Major** | All design tokens, font import, card/glass styles, welcome-banner, badge, table, scrollbar, sidebar, nav underline, shimmer keyframe |
| `src/components/KPICard.tsx` | **Minor** | Add `.kpi-value-gradient` class when `variant === 'total'`; add count-up animation using Framer Motion |
| `src/pages/OverviewPage.tsx` | **Minor** | Add `<div className="welcome-banner">` JSX block at top of render |
| `src/components/Sidebar.tsx` | **Minor** | Add `style={{ color: '#ca5cec' }}` or CSS class to `.logo-text` (currently uses `var(--text-primary)`) |
| `src/components/Charts.tsx` | **Minor** | Update hardcoded `#6366f1` → `#ca5cec` for Vince stroke/fill; `#0ea5e9` → `#06b6d4` for Difiano |
| `src/components/Filters.tsx` | Token-only | No JSX changes; colors inherit from updated CSS tokens |
| `src/components/Tables.tsx` | Token-only | No JSX changes; styles update via `index.css` |

**No changes to:** `src/lib/data.ts`, `src/lib/supabase.ts`, `src/types.ts`, `src/main.tsx`, `src/ThemeContext.tsx`, `vite.config.ts`, `tsconfig.json`, any page other than `OverviewPage.tsx`.

---

## 13. Affiliate Identity Reference

For implementers: `Vince` and `Difiano` are the two affiliate names in the system. They appear as:
- `EarningRow.affiliate: 'Vince' | 'Difiano'` in `types.ts`
- `variant: 'vince' | 'difiano'` prop on `KPICard.tsx`
- `.badge-vince`, `.badge-difiano` CSS classes in `index.css`
- `MonthlyTotal.vince`, `MonthlyTotal.difiano` numeric fields
- Data key strings `'vince'` and `'difiano'` used in Recharts `<Area>` / `<Line>` dataKey props

Color assignment: Vince = `#ca5cec` (orchid), Difiano = `#06b6d4` (cyan).

---

## 14. What to Avoid

- No harsh table borders or grid lines
- No flat solid-color card backgrounds (everything glassmorphic)
- No default browser styling on any element
- No Inter or Roboto fonts in any element
- No cookie-cutter gradient-on-white look — the glass effect is the differentiator

---

## 15. Out of Scope

- Responsive/mobile layout changes
- New pages or routes
- Data model changes
- Backend/Supabase changes
- New chart types
- New npm packages (count-up uses existing Framer Motion)
