# Ad-Lab Dashboard — Visual Redesign Spec

**Date:** 2026-03-15
**Status:** Approved
**Scope:** Visual-only improvements — no change to data, routing, or component logic

---

## Context

The affiliate dashboard for Ad-Lab (a Google Ads marketing agency) functions correctly but looks unpolished. The primary issue is that the brand accent color (`#ca5cec`, a bright magenta-purple) bleeds into every surface: page backgrounds carry a purple tint, card shadows glow purple, borders are purple-tinted, and even sidebar active states use purple fills. The result feels amateurish and visually noisy.

The goal is to transform the app into a clean, agency-grade analytics tool by pulling the brand purple back to where it belongs — as a data color representing the "Vince" affiliate — and rebuilding the chrome in neutral slate and white.

---

## Decisions Made

| Question | Decision |
|---|---|
| Design direction | Premium Neutral — full-text sidebar, warm white bg, dark active states |
| Mode coverage | Both light and dark mode |
| Purple in UI chrome | Zero — purple only in data values and Recharts elements |
| Card style | Elevated shadow on a gray background (no purple-tinted shadows) |
| Implementation approach | Token-first — rewrite CSS variables, then fix structural overrides |

---

## Design System Changes

### Color Tokens (`src/index.css` — `:root` and `html.dark`)

#### Light mode

| Token | Before | After |
|---|---|---|
| `--bg-primary` | `#ffffff` | `#ffffff` |
| `--bg-secondary` | `#fdf6ff` | `#f3f4f6` |
| `--bg-card` | `rgba(255,255,255,0.55)` | `#ffffff` |
| `--bg-card-hover` | `rgba(255,255,255,0.75)` | `#ffffff` |
| `--bg-sidebar` | `rgba(255,255,255,0.6)` | `#ffffff` |
| `--bg-input` | `rgba(202,92,236,0.06)` | `#f3f4f6` |
| `--border-subtle` | `rgba(202,92,236,0.10)` | `#e9eaec` |
| `--border-medium` | `rgba(202,92,236,0.18)` | `#dde0e6` |
| `--border-accent` | `rgba(202,92,236,0.25)` | `#cbd0db` |
| `--shadow-card` | `0 8px 32px rgba(202,92,236,0.08), 0 1px 2px rgba(0,0,0,0.04)` | `0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)` |
| `--shadow-card-hover` | purple-tinted | `0 2px 8px rgba(0,0,0,0.09), 0 8px 24px rgba(0,0,0,0.07)` |
| `--shadow-accent` | `0 4px 24px rgba(202,92,236,0.25)` | `0 4px 24px rgba(0,0,0,0.12)` |
| `--shadow-sidebar` | purple-tinted border | `0 0 0 1px #e2e5ec` |
| `--shadow-topbar` | purple-tinted | `0 1px 0 #e2e5ec, 0 2px 8px rgba(0,0,0,0.04)` |

All `--accent-*` values (primary, secondary, green, red, orange) are **unchanged** — these are data colors only.

#### Dark mode (`html.dark`)

| Token | Before | After |
|---|---|---|
| `--bg-primary` | `#0a0a0f` | `#0d0f14` |
| `--bg-secondary` | `#0d0d16` | `#0d0f14` |
| `--bg-card` | `rgba(255,255,255,0.04)` | `#181c24` |
| `--bg-sidebar` | dark purple-tinted | `#111318` |
| `--bg-input` | `rgba(202,92,236,0.08)` | `rgba(255,255,255,0.06)` |
| `--border-subtle` | `rgba(202,92,236,0.12)` | `rgba(255,255,255,0.07)` |
| `--border-medium` | `rgba(202,92,236,0.18)` | `rgba(255,255,255,0.10)` |
| `--border-accent` | `rgba(202,92,236,0.25)` | `rgba(255,255,255,0.14)` |
| `--shadow-card` | purple-tinted | `0 2px 8px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2)` |
| `--bg-card-hover` | `rgba(255,255,255,0.08)` | `#1e2330` |
| `--shadow-card-hover` | purple-tinted | `0 4px 16px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.25)` |
| `--shadow-accent` | purple-tinted | `0 4px 24px rgba(0,0,0,0.4)` |

---

## Component Changes

### 1. Sidebar (`src/components/Sidebar.tsx` + `.sidebar` CSS)

**Current:** Icon-only with small dot indicators; active item has purple glow background; sidebar border uses `--border-subtle` (purple-tinted).

**New:**
- Expand to full-text navigation labels (nav items show text like "Dashboard", "Trends", "Clients", "Compare")
- Active nav item: dark fill `#0f172a` (light) / `rgba(255,255,255,0.10)` (dark), white text, no purple
- Inactive nav items: `--text-secondary` color, transparent background
- Brand mark: `■ AD-LAB` in uppercase slate — no purple
- Sidebar background: pure white (light) / `#111318` (dark)
- Border: neutral `--border-subtle` (now gray-based per token change above)
- Remove any `box-shadow` that references accent color
- No change to sidebar width (248px) or mobile collapse behavior — existing responsive breakpoints remain untouched

### 2. Welcome Banner (`src/pages/OverviewPage.tsx` + `.welcome-banner` CSS)

**Current:** A prominent gradient card (`#ca5cec → #8b5cf6` tint) with "Welcome back" heading and gradient text.

**New:** Remove the banner entirely. Replace with a simple page hero section:
- Page title (e.g. "Overview") in `--text-primary`, `font-weight: 800`, `font-size: 1.6rem`, tight letter-spacing
- Subtitle line showing the active date range in `--text-muted`
- No gradient, no colored background, no purple

### 3. Cards (`.card`, `.kpi-card` CSS classes)

**Current:** `backdrop-filter: blur(...)` frosted glass; `box-shadow` has purple rgba tint; border is `--border-subtle` (purple-tinted).

**New:**
- Remove `backdrop-filter` — solid white background
- Shadow: use updated `--shadow-card` token (pure slate shadow)
- Border: use updated `--border-subtle` token (neutral gray)
- Keep `border-radius: 16px` for KPI cards, `border-radius: var(--border-radius)` for chart cards

### 4. Topbar (`src/App.tsx` + `.topbar` CSS)

**Current:** Border-bottom and box-shadow both contain purple rgba.

**New:** Use updated `--shadow-topbar` token (neutral gray border + slate shadow). No other changes.

### 5. Filter Chips (`.filter-chip` CSS)

**Current:** Active chip background is purple-tinted.

**New:**
- Active chip: `background: #0f172a; color: #ffffff` (light) / `background: rgba(255,255,255,0.12); color: #f1f5f9` (dark)
- Remove purple from active border and background

### 6. Affiliate Toggle (`.affiliate-toggle` CSS)

**Current:** Active toggle option uses purple fill.

**New:** Same dark-fill pattern as filter chips — slate active, no purple in UI chrome.

### 7. Charts (`src/components/Charts.tsx`)

**Data colors stay the same** — Vince `#ca5cec`, Difiano `#06b6d4`, Total `#10b981`.

Changes:
- Chart grid and axis tick CSS variables (`--chart-grid`, `--chart-axis-tick`) to reference updated neutral border tokens
- Tooltip background: use updated `--bg-card` token (now solid white / `#181c24`)
- Tooltip border: use updated `--border-medium` token (neutral)
- Replace hardcoded hex colors in JSX (`#ca5cec`, `#06b6d4`, `#10b981` in tooltip and SVG gradient elements) with the corresponding CSS variable references (`var(--accent-primary)`, `var(--accent-secondary)`, `var(--accent-green)`). Best-effort — chart SVG `stop-color` attributes that do not support CSS variables may keep hardcoded values.

### 8. Tables (`src/components/Tables.tsx`)

**Current:** Alternating row backgrounds use purple-tinted rgba; badge borders use purple.

**New:**
- Row hover: neutral slate tint (`rgba(0,0,0,0.03)` light / `rgba(255,255,255,0.04)` dark)
- Table border: updated `--border-subtle` token
- Badges: keep colored values (Vince purple, Difiano cyan) but remove any purple from the badge border/background for neutral badges

---

## Typography (no font changes)

DM Sans and Outfit are kept. Minor adjustments:
- Page titles (`h1`, `.page-hero-title`): increase to `font-weight: 800`, add `letter-spacing: -0.02em`
- Section labels (`.section-label`, column headers): `font-weight: 600`, `letter-spacing: 0.05em`, `text-transform: uppercase`
- KPI values (`.kpi-value`): keep Outfit font, ensure `font-weight: 700`

---

## Implementation Order

1. **Update CSS tokens** in `src/index.css` (`:root` and `html.dark`) — all shadow, border, background variables
2. **Sidebar** — add text labels, restyle active/inactive nav states
3. **Remove welcome banner** — replace with plain page hero in `OverviewPage.tsx`
4. **Cards** — remove backdrop-filter, verify shadow/border inherit from tokens
5. **Topbar** — verify shadow/border inherit from tokens (may be automatic after step 1)
6. **Filter chips + affiliate toggle** — dark active states
7. **Charts** — update tooltip and grid token references
8. **Tables** — update row hover and badge borders
9. **Dark mode verification** — toggle to dark mode and confirm all 8 areas render correctly (acceptance criteria, not a build step)

---

## What Does NOT Change

- No changes to routing, data fetching, Supabase integration, or component logic
- No changes to Recharts chart types or data shapes
- No changes to Framer Motion animations
- No changes to font families (DM Sans, Outfit)
- `--accent-primary` (`#ca5cec`) and `--accent-secondary` (`#06b6d4`) values are unchanged — they remain as data colors
- No new dependencies
