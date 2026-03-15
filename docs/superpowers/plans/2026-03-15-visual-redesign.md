# Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Ad-Lab affiliate dashboard from an amateurish purple-everywhere aesthetic into a clean, agency-grade analytics tool by pulling brand purple back to data-only usage and rebuilding the chrome in neutral slate and white.

**Architecture:** Token-first approach — all surface, border, and shadow CSS variables are updated in `src/index.css` first, then component-level structural overrides are applied in sequence. Both light and dark modes are covered throughout.

**Tech Stack:** React 19, TypeScript, pure CSS with design tokens (no Tailwind), Recharts, Framer Motion, Lucide React

**Spec:** `docs/superpowers/specs/2026-03-15-visual-redesign-design.md`

---

## Chunk 1: CSS Token Updates

### Task 1: Update light-mode design tokens

**Files:**
- Modify: `src/index.css:6-62`

- [ ] **Step 1: Open `src/index.css` and update the `:root, html.light` token block**

  Replace the background, border, and shadow tokens with the following values (leave all `--accent-*`, `--gradient-*`, `--text-*`, sizing, and transition tokens untouched):

  ```css
  /* In :root, html.light — replace these lines: */
  --bg-secondary: #f3f4f6;
  --bg-card: #ffffff;
  --bg-card-hover: #ffffff;
  --bg-glass: #ffffff;
  --bg-sidebar: #ffffff;
  --bg-input: #f3f4f6;

  --border-subtle: #e9eaec;
  --border-medium: #dde0e6;
  --border-accent: #cbd0db;

  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 2px 8px rgba(0, 0, 0, 0.09), 0 8px 24px rgba(0, 0, 0, 0.07);
  --shadow-accent: 0 4px 24px rgba(0, 0, 0, 0.12);
  --shadow-sidebar: 0 0 0 1px #e2e5ec;
  --shadow-topbar: 0 1px 0 #e2e5ec, 0 2px 8px rgba(0, 0, 0, 0.04);
  ```

  Also update the chart-specific tokens at the bottom of `:root`:
  ```css
  --chart-tooltip-bg: #ffffff;
  --chart-tooltip-border: #dde0e6;
  --chart-tooltip-shadow: 0 4px 24px rgba(0, 0, 0, 0.10);
  ```

- [ ] **Step 2: Also update the scrollbar thumb** (line ~144) to use neutral slate instead of purple:

  ```css
  ::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.35); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(100, 116, 139, 0.6); }
  ```

- [ ] **Step 3: Run the dev server and visually verify light mode**

  ```bash
  npm run dev
  ```

  Open `http://localhost:5173`. Verify:
  - Page background is a neutral light gray (not purple-tinted)
  - Card borders are gray (not purple-tinted)
  - Card shadows are slate-colored (no purple glow)

- [ ] **Step 4: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: remove purple from light-mode design tokens"
  ```

---

### Task 2: Update dark-mode design tokens

**Files:**
- Modify: `src/index.css:67-114`

- [ ] **Step 1: Update the `html.dark` token block**

  Replace background, border, shadow tokens (leave all `--accent-*`, `--gradient-*`, `--text-*` tokens untouched):

  ```css
  /* In html.dark — replace these lines: */
  --bg-primary: #0d0f14;
  --bg-secondary: #0d0f14;
  --bg-card: #181c24;
  --bg-card-hover: #1e2330;
  --bg-glass: #181c24;
  --bg-sidebar: #111318;
  --bg-input: rgba(255, 255, 255, 0.06);

  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-medium: rgba(255, 255, 255, 0.10);
  --border-accent: rgba(255, 255, 255, 0.14);

  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.20);
  --shadow-card-hover: 0 4px 16px rgba(0, 0, 0, 0.45), 0 2px 4px rgba(0, 0, 0, 0.25);
  --shadow-accent: 0 4px 24px rgba(0, 0, 0, 0.40);
  --shadow-sidebar: 0 0 0 1px rgba(255, 255, 255, 0.07);
  --shadow-topbar: 0 1px 0 rgba(255, 255, 255, 0.07), 0 2px 8px rgba(0, 0, 0, 0.20);
  ```

  Also update the dark-mode chart tokens:
  ```css
  --chart-tooltip-bg: #181c24;
  --chart-tooltip-border: rgba(255, 255, 255, 0.10);
  --chart-tooltip-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  ```

- [ ] **Step 2: Run the dev server, toggle to dark mode, and visually verify**

  ```bash
  npm run dev
  ```

  Click the theme toggle in the sidebar. Verify:
  - Page background is a deep neutral dark (not purple-tinted `#0a0a0f`)
  - Card backgrounds are a lifted dark (`#181c24`), not translucent purple
  - Card borders are neutral white-alpha (not purple-alpha)

- [ ] **Step 3: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: remove purple from dark-mode design tokens"
  ```

---

## Chunk 2: Sidebar Redesign

### Task 3: Restyle sidebar nav active/hover states in CSS

**Files:**
- Modify: `src/index.css` — `.nav-item`, `.nav-item:hover`, `.nav-item.active`, `.nav-item.active::before`, `.nav-item::after`, `.logo-text`

- [ ] **Step 1: Update `.logo-text` — remove purple color**

  Find `.logo-text` (~line 208) and change:
  ```css
  .logo-text {
    font-size: 16px;
    font-weight: 800;
    color: var(--text-primary);   /* was: var(--accent-primary) */
    letter-spacing: -0.4px;
    transition: color var(--transition-slow);
  }
  ```

- [ ] **Step 2: Update `.nav-item:hover` — remove purple hover**

  Find `.nav-item:hover` (~line 261) and replace:
  ```css
  .nav-item:hover {
    background: rgba(0, 0, 0, 0.04);
    color: var(--text-primary);
  }

  html.dark .nav-item:hover {
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-primary);
  }
  ```

- [ ] **Step 3: Update `.nav-item.active` — dark fill instead of purple**

  Find `.nav-item.active` (~line 266) and replace:
  ```css
  .nav-item.active {
    background: #0f172a;
    color: #ffffff;
    font-weight: 600;
  }

  html.dark .nav-item.active {
    background: rgba(255, 255, 255, 0.10);
    color: var(--text-primary);
    font-weight: 600;
  }
  ```

- [ ] **Step 4: Remove the purple left-bar indicator and underline — delete `.nav-item.active::before` and `.nav-item::after`**

  Remove these two rule blocks entirely from the CSS (~lines 272–298):
  ```
  .nav-item.active::before { ... }   ← DELETE
  .nav-item::after { ... }           ← DELETE
  .nav-item:hover::after { ... }     ← DELETE
  .nav-item.active::after { ... }    ← DELETE
  ```

- [ ] **Step 5: Remove the sidebar `backdrop-filter`**

  Find `.sidebar` (~line 158) and remove these two lines:
  ```
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  ```

  Also remove the dark-mode override block:
  ```
  html.dark .sidebar {
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  }
  ```

- [ ] **Step 6: Run dev server and verify sidebar appearance**

  ```bash
  npm run dev
  ```

  Check:
  - Active nav item has dark slate background with white text (no purple)
  - Hover shows a faint neutral bg (no purple)
  - Logo text is slate (no purple)
  - No purple left-bar indicator

- [ ] **Step 7: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: restyle sidebar nav — slate active states, remove purple"
  ```

---

### Task 4: Remove purple from theme toggle button

**Files:**
- Modify: `src/index.css` — `.theme-toggle-btn:hover`, `html.dark .theme-toggle-btn`, `.theme-toggle-track.dark-on`

- [ ] **Step 1: Update `.theme-toggle-btn:hover`** (~line 337):

  ```css
  .theme-toggle-btn:hover {
    border-color: var(--border-medium);
    color: var(--text-primary);
    background: rgba(0, 0, 0, 0.04);
  }

  html.dark .theme-toggle-btn:hover {
    background: rgba(255, 255, 255, 0.06);
  }
  ```

- [ ] **Step 2: Remove the dark-mode purple glow** — delete:

  ```
  html.dark .theme-toggle-btn {
    box-shadow: 0 0 20px rgba(202, 92, 236, 0.12);
  }
  ```

- [ ] **Step 3: Update the toggle track active color** (~line 357) — the `.theme-toggle-track.dark-on` background is fine to keep purple (it's a functional indicator, not chrome). Leave it as-is.**

- [ ] **Step 4: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: remove purple from theme toggle hover/glow"
  ```

---

## Chunk 3: Welcome Banner + Page Hero

### Task 5: Remove welcome banner from OverviewPage

**Files:**
- Modify: `src/pages/OverviewPage.tsx:74-78`
- Modify: `src/index.css` — `.welcome-banner`, `.welcome-banner::after`, `@keyframes banner-shimmer`, `.welcome-banner-title`, `.welcome-banner-sub`

- [ ] **Step 1: Remove the welcome banner JSX from `OverviewPage.tsx`**

  Find lines 74–78 in `OverviewPage.tsx`:
  ```tsx
  {/* Welcome Banner */}
  <div className="welcome-banner">
    <h2 className="welcome-banner-title">Welcome to Ad-Lab — your affiliate earnings at a glance.</h2>
    <p className="welcome-banner-sub">All figures in USD · Earnings dashboard</p>
  </div>
  ```
  Delete those 5 lines entirely.

- [ ] **Step 2: Delete the welcome banner CSS block from `src/index.css`**

  Delete from `/* WELCOME BANNER */` through the end of `.welcome-banner-sub` (~lines 488–547). This includes:
  - `.welcome-banner { ... }`
  - `html.light .welcome-banner, :root .welcome-banner { ... }`
  - `html.dark .welcome-banner { ... }`
  - `.welcome-banner::after { ... }`
  - `@keyframes banner-shimmer { ... }`
  - `.welcome-banner-title { ... }`
  - `html.light .welcome-banner-title, :root .welcome-banner-title { ... }`
  - `html.dark .welcome-banner-title { ... }`
  - `.welcome-banner-sub { ... }`

- [ ] **Step 3: Update `.page-hero-title` to use solid color instead of gradient text**

  Find `.page-hero-title` (~line 459). Replace the full block (including the gradient background-clip lines and the `html.dark .page-hero-title` override block) with:
  ```css
  .page-hero-title {
    font-family: 'Outfit', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.6px;
    line-height: 1.2;
  }
  ```

- [ ] **Step 4: Verify `.page-hero-sub` is present in `OverviewPage.tsx`**

  In `OverviewPage.tsx`, locate the `{/* Hero + Calendar */}` section (line ~80 after the banner deletion). The existing `.page-hero` block should already contain a `.page-hero-sub` element showing the date range. Confirm it exists:
  ```tsx
  <div className="page-hero">
    <h1 className="page-hero-title">Overview</h1>
    <p className="page-hero-sub">{startMonth ?? 'All time'}{endMonth && endMonth !== startMonth ? ` – ${endMonth}` : ''}</p>
  </div>
  ```
  If the `.page-hero-sub` element is missing or shows no date range text, add it now using the pattern above. The text should use `--text-muted` color — this is already set in `.page-hero-sub` CSS (~line 478).

- [ ] **Step 5: Run dev server and verify**

  ```bash
  npm run dev
  ```

  The Overview page should now open directly with the KPI section — no gradient banner at the top. The page title should be clean slate with a muted date-range subtitle below it.

- [ ] **Step 6: Commit**

  ```bash
  git add src/pages/OverviewPage.tsx src/index.css
  git commit -m "style: remove welcome banner, replace gradient page title with solid color"
  ```

---

## Chunk 4: Cards, Topbar, KPI Icon Wraps

### Task 6: Remove backdrop-filter from cards and fix KPI icon wrap

**Files:**
- Modify: `src/index.css` — `.card`, `.kpi-card`, `.kpi-icon-wrap.total`

- [ ] **Step 1: Remove `backdrop-filter` from `.card`** (~line 552):

  Delete these two lines from `.card`:
  ```
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  ```

- [ ] **Step 2: Remove `backdrop-filter` from `.kpi-card`** (~line 597):

  Delete these two lines from `.kpi-card`:
  ```
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  ```

- [ ] **Step 3: Fix `.kpi-icon-wrap.total` — it uses purple instead of the neutral total gradient**

  Find `.kpi-icon-wrap.total` (~line 657):
  ```css
  .kpi-icon-wrap.total { background: rgba(16, 185, 129, 0.10); color: var(--accent-green); }
  ```
  (The `total` KPI card should use green, not purple.)

- [ ] **Step 4: Run dev server and verify**

  ```bash
  npm run dev
  ```

  Cards should look solid white (light) / `#181c24` (dark) with no frosted glass effect. The "Total" KPI icon should be green, not purple.

- [ ] **Step 5: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: remove backdrop-filter from cards, fix total KPI icon color"
  ```

---

### Task 7: Remove backdrop-filter from topbar

**Files:**
- Modify: `src/index.css` — `.topbar`

- [ ] **Step 1: Remove `backdrop-filter` from `.topbar`** (~line 393):

  Delete:
  ```
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  ```

  Also change `background: var(--bg-glass)` → `background: var(--bg-primary)` so the topbar matches the page background.

- [ ] **Step 2: Run dev server and verify**

  ```bash
  npm run dev
  ```

  The topbar should be solid and match the page background on scroll (no glass blur effect).

- [ ] **Step 3: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: remove backdrop-filter from topbar, solid background"
  ```

---

## Chunk 5: Filter Chips, Affiliate Toggle, Calendar

### Task 8: Restyle filter chips to dark-fill active state

**Files:**
- Modify: `src/index.css` — `.filter-chip.active`, `.filter-chip:hover`

- [ ] **Step 1: Update `.filter-chip.active`** (~line 1045):

  ```css
  .filter-chip.active {
    background: #0f172a;
    border-color: #0f172a;
    color: #ffffff;
    font-weight: 600;
    box-shadow: none;
  }

  html.dark .filter-chip.active {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.12);
    color: #f1f5f9;
  }
  ```

- [ ] **Step 2: Update `.filter-chip:hover`** (~line 1039) to use neutral slate:

  ```css
  .filter-chip:hover {
    border-color: var(--border-medium);
    color: var(--text-primary);
    background: rgba(0, 0, 0, 0.04);
  }

  html.dark .filter-chip:hover {
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-primary);
  }
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: filter chips — dark-fill active state, remove purple gradient"
  ```

---

### Task 9: Restyle affiliate toggle to dark-fill active state

**Files:**
- Modify: `src/index.css` — `.affiliate-btn.active-both`, `.affiliate-btn.active-vince`, `.affiliate-btn.active-difiano`

- [ ] **Step 1: Update all three active affiliate button variants** (~lines 1080–1096):

  ```css
  .affiliate-btn.active-both,
  .affiliate-btn.active-vince {
    background: #0f172a;
    color: #fff;
    box-shadow: none;
  }

  html.dark .affiliate-btn.active-both,
  html.dark .affiliate-btn.active-vince {
    background: rgba(255, 255, 255, 0.12);
    color: #f1f5f9;
  }

  .affiliate-btn.active-difiano {
    background: #0f172a;
    color: #fff;
    box-shadow: none;
  }

  html.dark .affiliate-btn.active-difiano {
    background: rgba(255, 255, 255, 0.12);
    color: #f1f5f9;
  }
  ```

- [ ] **Step 2: Run dev server and verify affiliate toggle**

  ```bash
  npm run dev
  ```

  Check:
  - "Both", "Vince", and "Difiano" buttons all show a dark slate active state (no purple/cyan gradient fills)
  - Dark mode: active button uses white-alpha background

- [ ] **Step 3: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: affiliate toggle — dark-fill active states, remove purple gradients"
  ```

---

### Task 10: Restyle calendar — selected/in-range and apply button

**Files:**
- Modify: `src/index.css` — `.calendar-month-btn.selected`, `.calendar-month-btn.in-range`, `.cal-apply-btn`, `.calendar-trigger-btn:hover`, `.calendar-reset-btn`

- [ ] **Step 1: Update `.calendar-month-btn.selected`** (~line 867):

  ```css
  .calendar-month-btn.selected {
    background: #0f172a;
    color: #fff;
    border-color: #0f172a;
    font-weight: 600;
  }

  html.dark .calendar-month-btn.selected {
    background: rgba(255, 255, 255, 0.15);
    color: #f1f5f9;
    border-color: rgba(255, 255, 255, 0.15);
  }
  ```

- [ ] **Step 2: Update `.calendar-month-btn.in-range`** (~line 874):

  ```css
  .calendar-month-btn.in-range {
    background: rgba(15, 23, 42, 0.07);
    color: var(--text-primary);
    border-color: transparent;
  }

  html.dark .calendar-month-btn.in-range {
    background: rgba(255, 255, 255, 0.07);
    color: var(--text-primary);
  }
  ```

- [ ] **Step 3: Update `.cal-apply-btn`** (~line 901) to remove purple gradient:

  ```css
  .cal-apply-btn {
    padding: 7px 16px;
    border-radius: var(--border-radius-xs);
    border: none;
    background: #0f172a;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: opacity var(--transition);
    box-shadow: none;
  }

  html.dark .cal-apply-btn {
    background: rgba(255, 255, 255, 0.12);
    color: #f1f5f9;
  }
  ```

- [ ] **Step 4: Update `.calendar-trigger-btn:hover` and `.calendar-reset-btn`** (~lines 765–822) to use neutral hover (matching filter-chip pattern):

  ```css
  .calendar-trigger-btn:hover {
    border-color: var(--border-medium);
    color: var(--text-primary);
    background: rgba(0, 0, 0, 0.04);
  }

  html.dark .calendar-trigger-btn:hover {
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-primary);
  }

  .calendar-reset-btn {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    padding: 4px 8px;
    border-radius: 6px;
    transition: background var(--transition);
  }

  .calendar-reset-btn:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-primary);
  }
  ```

- [ ] **Step 5: Run dev server and verify**

  ```bash
  npm run dev
  ```

  Open the calendar — selected month should be dark slate, range should be a faint neutral tint, apply button should be dark slate. No purple in the calendar UI.

- [ ] **Step 6: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: calendar — slate selected/apply states, remove purple"
  ```

---

## Chunk 6: Tables and Charts

### Task 11: Remove purple from table rows and neutral badges

**Files:**
- Modify: `src/index.css` — `.data-table td`, `.data-table tbody tr:nth-child(odd) td`, `.data-table tbody tr:hover td`, `.badge`

- [ ] **Step 1: Update table row cell border and alternating row tint** (~lines 941–958):

  ```css
  .data-table td {
    padding: 12px 14px;
    font-size: 13.5px;
    color: var(--text-secondary);
    border-bottom: 1px solid var(--border-subtle);   /* was: rgba(202,92,236,0.06) */
    font-variant-numeric: tabular-nums;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .data-table tbody tr:nth-child(odd) td {
    background: rgba(0, 0, 0, 0.015);   /* was: rgba(202,92,236,0.02) */
  }

  html.dark .data-table tbody tr:nth-child(odd) td {
    background: rgba(255, 255, 255, 0.02);
  }

  .data-table tbody tr:hover td {
    background: rgba(0, 0, 0, 0.04);    /* was: rgba(202,92,236,0.06) */
    color: var(--text-primary);
  }

  html.dark .data-table tbody tr:hover td {
    background: rgba(255, 255, 255, 0.04);
  }
  ```

- [ ] **Step 2: Verify `.badge-vince` and `.badge-difiano` are not neutralized**

  Find `.badge-vince` and `.badge-difiano` (~lines 979–998). These use colored backgrounds/borders intentionally — leave them as-is. The spec says "keep colored values (Vince purple, Difiano cyan)." Do not change these.

- [ ] **Step 3: Check for any generic `.badge` variant with purple hardcoded**

  Find the `.badge` base class (~line 969). If there is a generic badge variant (not `.badge-vince` or `.badge-difiano`) that uses a purple background or border, replace it with a neutral slate:
  ```css
  /* If a neutral badge variant exists, it should be: */
  .badge-neutral {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-secondary);
    border: 1px solid var(--border-subtle);
  }

  html.dark .badge-neutral {
    background: rgba(255, 255, 255, 0.07);
    color: var(--text-secondary);
    border-color: var(--border-subtle);
  }
  ```
  If no generic badge with purple exists, skip this step.

- [ ] **Step 4: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: tables — neutral row hover and border, remove purple tint"
  ```

---

### Task 12: Neutralize chart grid tokens and fix hardcoded colors in Charts.tsx

**Files:**
- Modify: `src/index.css` — `--chart-grid`, `--chart-axis-tick` tokens in both `:root` and `html.dark`
- Modify: `src/components/Charts.tsx` — `EarningsBarChart` Bar fill props, `EarningsLineChart` stop colors

- [ ] **Step 1: Update `--chart-grid` and `--chart-axis-tick` in `:root`** (~line 57):

  ```css
  --chart-grid: var(--border-subtle);
  --chart-axis-tick: var(--text-muted);
  ```
  (These now inherit from the neutral border/text tokens set in Task 1, rather than having separate hardcoded values.)

- [ ] **Step 2: Update `--chart-grid` and `--chart-axis-tick` in `html.dark`** (~line 109):

  ```css
  --chart-grid: var(--border-subtle);
  --chart-axis-tick: var(--text-muted);
  ```

- [ ] **Step 3: Replace hardcoded Bar fill colors in `EarningsBarChart`** (`src/components/Charts.tsx`, ~line 173–174)

  The Recharts `Bar` component does not support CSS variable strings in the `fill` prop at runtime. Use the hex values directly, but replace only the `Bar` elements — the underlying data colors are unchanged (purple/cyan stays as data colors):
  ```tsx
  <Bar dataKey="Vince"   fill="#ca5cec" radius={[5, 5, 0, 0]} maxBarSize={28} opacity={0.92} />
  <Bar dataKey="Difiano" fill="#06b6d4" radius={[5, 5, 0, 0]} maxBarSize={28} opacity={0.88} />
  ```
  These are already correct — confirm they are still in place and have not been changed to purple-tinted backgrounds.

- [ ] **Step 4: Confirm `EarningsLineChart` gradient stop colors are still data colors**

  In `EarningsLineChart` (~line 198), confirm the `totalLineGrad` SVG gradient uses data colors (not UI chrome colors):
  ```tsx
  <stop offset="0%"   stopColor="#ca5cec" />
  <stop offset="100%" stopColor="#06b6d4" />
  ```
  These are intentional data-color values — leave as-is.

- [ ] **Step 5: Run dev server and verify chart rendering**

  ```bash
  npm run dev
  ```

  Check:
  - Chart grid lines are neutral gray (matching card borders), not a distinct purple tint
  - Axis tick labels use the muted text color
  - Chart tooltip background is solid white (light) / `#181c24` (dark) — no purple-tinted glass
  - Bar and line colors remain purple/cyan (data colors intact)

- [ ] **Step 6: Commit**

  ```bash
  git add src/index.css src/components/Charts.tsx
  git commit -m "style: chart grid/axis tokens to neutral, verify data colors intact"
  ```

---

## Chunk 7: Typography + Final Verification

### Task 13: Typography polish

**Files:**
- Modify: `src/index.css` — `.card-title`

- [ ] **Step 1: Update `.card-title` opacity — increase from 0.6 to 1.0**

  Find `.card-title` (~line 576):
  ```css
  .card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    /* remove: opacity: 0.6; */
    transition: color var(--transition-slow);
  }
  ```
  Delete the `opacity: 0.6` line.

- [ ] **Step 2: Commit**

  ```bash
  git add src/index.css
  git commit -m "style: typography polish — full opacity card titles"
  ```

---

### Task 14: Dark mode verification pass

**Files:** Read-only — no code changes, verification only

- [ ] **Step 1: Run dev server**

  ```bash
  npm run dev
  ```

- [ ] **Step 2: Toggle to dark mode and verify each area**

  Check each of these in dark mode:
  1. **Page background** — deep neutral (`#0d0f14`), no purple tint
  2. **Sidebar** — `#111318` background, white-alpha active nav state
  3. **Overview page** — no welcome banner, clean page hero title
  4. **Cards** — `#181c24` background, no frosted glass, neutral borders
  5. **Topbar** — solid `#0d0f14`, neutral border bottom
  6. **Filter chips + affiliate toggle** — white-alpha active state
  7. **Calendar** — slate/white-alpha selected, no purple gradient
  8. **Tables** — neutral row hover (no purple tint)
  9. **Charts** — neutral tooltip background (`#181c24`), purple/cyan data colors intact

- [ ] **Step 3: Toggle back to light mode and re-verify**

  1. **Page background** — `#f3f4f6` neutral gray
  2. **Sidebar** — white background, `#0f172a` active state
  3. **Overview page** — no welcome banner
  4. **Cards** — white background, soft slate shadow
  5. **Topbar** — white background, gray border
  6. **Filter chips + affiliate toggle** — `#0f172a` active state
  7. **Calendar** — `#0f172a` selected
  8. **Tables** — faint neutral row tint
  9. **Charts** — white tooltip, purple/cyan chart lines intact

- [ ] **Step 4: Final commit (only if any loose changes remain uncommitted)**

  If `git status` shows unstaged changes to `src/index.css`, `src/pages/OverviewPage.tsx`, or `src/components/Charts.tsx` that weren't caught by earlier task commits, stage and commit them:
  ```bash
  git add src/index.css src/pages/OverviewPage.tsx src/components/Charts.tsx
  git commit -m "style: complete visual redesign — neutral chrome, purple reserved for data"
  ```
  If `git status` shows a clean working tree, this step is done.
