# Glass Morphism Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Visually redesign the Ad-Lab Affiliate Dashboard with a liquid glass morphism aesthetic using the brand color `#ca5cec`, Outfit + DM Sans typography, glassmorphic card surfaces, and a new welcome banner on the Overview page.

**Architecture:** All visual changes live in `src/index.css` (CSS custom properties + new style blocks) with minimal targeted edits to 4 component/page files for hardcoded colors and new JSX. No routing, data, or API changes.

**Tech Stack:** React 19, TypeScript, Framer Motion 12, Recharts 3, Vite 8, CSS custom properties

---

## Chunk 1: CSS Tokens + Typography

### Task 1: Swap Google Fonts import and body font

**Files:**
- Modify: `src/index.css` — line starting with `@import url('https://fonts.googleapis.com/css2?family=Inter`
- Modify: `src/index.css` — `font-family: 'Inter'` line inside `body {}`

- [ ] **Step 1: Replace the Inter font import with Outfit + DM Sans**

Open `src/index.css`. Find the line starting with `@import url('https://fonts.googleapis.com/css2?family=Inter` (it is the very first line of the file). Replace it:
```css
/* OLD */
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

/* NEW */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Outfit:wght@400;500;600;700;800&display=swap');
```

- [ ] **Step 2: Update body font-family**

Find inside the `body {` rule:

```css
/* OLD */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* NEW */
font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

- [ ] **Step 3: Verify visually**

Run `npm run dev`. Open the browser. Body text should now render in DM Sans (slightly rounder, friendlier than Inter). No layout shift expected.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "style: swap Inter for Outfit + DM Sans fonts"
```

---

### Task 2: Update light-mode design tokens

**Files:**
- Modify: `src/index.css` — the `:root, html.light {` block (everything from `:root,` through the closing `}` before the dark-mode comment)

- [ ] **Step 1: Replace the entire `:root, html.light` token block**

Find the block starting with `:root,` / `html.light {` and ending before `/* DESIGN TOKENS — DARK MODE */`. Replace it entirely with:

```css
:root,
html.light {
  --bg-primary: #ffffff;
  --bg-secondary: #fdf6ff;
  --bg-card: rgba(255, 255, 255, 0.55);
  --bg-card-hover: rgba(255, 255, 255, 0.75);
  --bg-glass: rgba(255, 255, 255, 0.55);
  --bg-sidebar: rgba(255, 255, 255, 0.6);
  --bg-input: rgba(202, 92, 236, 0.06);

  --border-subtle: rgba(202, 92, 236, 0.10);
  --border-medium: rgba(202, 92, 236, 0.18);
  --border-accent: rgba(202, 92, 236, 0.25);

  --accent-primary: #ca5cec;
  --accent-primary-light: rgba(202, 92, 236, 0.10);
  --accent-secondary: #06b6d4;
  --accent-green: #10b981;
  --accent-green-light: rgba(16, 185, 129, 0.10);
  --accent-red: #ef4444;
  --accent-red-light: rgba(239, 68, 68, 0.10);
  --accent-pink: #ec4899;
  --accent-orange: #f59e0b;
  --accent-orange-light: rgba(245, 158, 11, 0.10);

  --gradient-vince: linear-gradient(135deg, #ca5cec, #8b5cf6);
  --gradient-difiano: linear-gradient(135deg, #06b6d4, #0284c7);
  --gradient-total: linear-gradient(135deg, #10b981, #059669);
  --gradient-heading: linear-gradient(135deg, #1e293b 0%, #475569 100%);
  --gradient-hero: linear-gradient(135deg, #ca5cec 0%, #8b5cf6 50%, #ec4899 100%);
  --gradient-brand: linear-gradient(135deg, #ca5cec, #8b5cf6);

  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;

  --shadow-card: 0 8px 32px rgba(202, 92, 236, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-card-hover: 0 12px 40px rgba(202, 92, 236, 0.14), 0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-accent: 0 4px 24px rgba(202, 92, 236, 0.25);
  --shadow-sidebar: 1px 0 0 rgba(202, 92, 236, 0.08);
  --shadow-topbar: 0 1px 0 rgba(202, 92, 236, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);

  --sidebar-width: 248px;
  --header-height: 68px;
  --border-radius: 16px;
  --border-radius-sm: 10px;
  --border-radius-xs: 8px;
  --transition: 0.22s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Chart-specific */
  --chart-grid: rgba(0, 0, 0, 0.05);
  --chart-axis-tick: #94a3b8;
  --chart-tooltip-bg: rgba(255, 255, 255, 0.95);
  --chart-tooltip-border: rgba(202, 92, 236, 0.15);
  --chart-tooltip-shadow: 0 8px 32px rgba(202, 92, 236, 0.12);
}
```

- [ ] **Step 2: Verify light mode loads without errors**

Run `npm run dev`. Toggle to light mode. Cards will now have a glassy look. Sidebar will be frosted.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: update light-mode design tokens to #ca5cec brand"
```

---

### Task 3: Update dark-mode design tokens

**Files:**
- Modify: `src/index.css` — the `html.dark {` block (everything from `html.dark {` through its closing `}` before `/* RESET & BASE */`)

- [ ] **Step 1: Replace the entire `html.dark` token block**

Find the block starting with `html.dark {` and ending before `/* RESET & BASE */`. Replace it entirely with:

```css
html.dark {
  --bg-primary: #0a0a0f;
  --bg-secondary: #0d0d16;
  --bg-card: rgba(255, 255, 255, 0.04);
  --bg-card-hover: rgba(255, 255, 255, 0.07);
  --bg-glass: rgba(255, 255, 255, 0.04);
  --bg-sidebar: rgba(255, 255, 255, 0.04);
  --bg-input: rgba(255, 255, 255, 0.06);

  --border-subtle: rgba(202, 92, 236, 0.12);
  --border-medium: rgba(202, 92, 236, 0.20);
  --border-accent: rgba(202, 92, 236, 0.35);

  --accent-primary: #d580f0;
  --accent-primary-light: rgba(202, 92, 236, 0.12);
  --accent-secondary: #22d3ee;
  --accent-green: #34d399;
  --accent-green-light: rgba(52, 211, 153, 0.12);
  --accent-red: #f87171;
  --accent-red-light: rgba(248, 113, 113, 0.12);
  --accent-pink: #f472b6;
  --accent-orange: #fbbf24;
  --accent-orange-light: rgba(251, 191, 36, 0.12);

  --gradient-vince: linear-gradient(135deg, #ca5cec, #8b5cf6);
  --gradient-difiano: linear-gradient(135deg, #22d3ee, #06b6d4);
  --gradient-total: linear-gradient(135deg, #34d399, #10b981);
  --gradient-heading: linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%);
  --gradient-hero: linear-gradient(135deg, #ca5cec 0%, #8b5cf6 50%, #f472b6 100%);
  --gradient-brand: linear-gradient(135deg, #ca5cec, #8b5cf6);

  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #475569;

  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(202, 92, 236, 0.08) inset;
  --shadow-card-hover: 0 8px 40px rgba(0, 0, 0, 0.5), 0 0 40px rgba(202, 92, 236, 0.10);
  --shadow-accent: 0 0 40px rgba(202, 92, 236, 0.15);
  --shadow-sidebar: 1px 0 0 rgba(202, 92, 236, 0.10);
  --shadow-topbar: 0 1px 0 rgba(202, 92, 236, 0.10);

  /* Chart-specific */
  --chart-grid: rgba(255, 255, 255, 0.05);
  --chart-axis-tick: #475569;
  --chart-tooltip-bg: rgba(13, 13, 22, 0.95);
  --chart-tooltip-border: rgba(202, 92, 236, 0.20);
  --chart-tooltip-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}
```

- [ ] **Step 2: Verify dark mode**

Toggle to dark mode. Background should be `#0a0a0f` (very dark with violet undertone). Cards glass-tinted.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "style: update dark-mode design tokens to #ca5cec brand + #0a0a0f base"
```

---

## Chunk 2: Glassmorphic Card Surfaces + Sidebar

### Task 4: Apply glass treatment to cards and sidebar

**Files:**
- Modify: `src/index.css` — `.card`, `.kpi-card`, `.sidebar`, `.sidebar-logo` sections

- [ ] **Step 1: Update `.card` styles (~line 459–471)**

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--border-radius);
  padding: 22px;
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  transition: all var(--transition);
}

.card:hover {
  box-shadow: var(--shadow-card-hover);
  border-color: var(--border-medium);
  transform: translateY(-1px);
}
```

- [ ] **Step 2: Update `.kpi-card` styles**

Find the `.kpi-card {` rule. Note: `position: relative` is already present in the existing rule (required for the `::before` pseudo-element to be positioned correctly). `overflow: hidden` is also already present — **important:** `overflow: hidden` on a card will clip the `backdrop-filter` blur of child elements but does NOT prevent `backdrop-filter` on the card itself from working. The card's own blur is applied against its background, not its children, so this is safe.

```css
.kpi-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  padding: 20px 22px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  transition: all var(--transition);
  cursor: default;
}

.kpi-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-medium);
  box-shadow: var(--shadow-card-hover);
  will-change: transform;
}

.kpi-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px 20px 0 0;
  pointer-events: none;
}

html.dark .kpi-card::before {
  background: rgba(255, 255, 255, 0.08);
}
```

- [ ] **Step 3: Update `.sidebar` styles**

Find the `.sidebar {` rule and replace it. The sidebar uses a slightly different blur per mode: light gets `blur(20px) saturate(160%)` (frosted + vivid), dark gets `blur(24px)` (stronger blur, no saturation boost needed on a dark bg). This is intentional.

> **Backdrop-filter note:** `backdrop-filter` requires the element to not be fully opaque. Since `--bg-sidebar` is now `rgba(255,255,255,0.6)` in light and `rgba(255,255,255,0.04)` in dark, both are translucent and the blur will work correctly. No ancestor `overflow: hidden` issues exist on the sidebar since it is `position: fixed`.

```css
.sidebar {
  width: var(--sidebar-width);
  min-height: 100vh;
  background: var(--bg-sidebar);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  box-shadow: var(--shadow-sidebar);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: background-color var(--transition-slow), box-shadow var(--transition-slow);
}

html.dark .sidebar {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
```

- [ ] **Step 4: Remove bottom border on `.sidebar-logo`**

Find the `.sidebar-logo {` rule. Replace it fully (removes `border-bottom` and the now-pointless `transition: border-color`):

```css
.sidebar-logo {
  padding: 22px 20px 18px;
}
```

- [ ] **Step 5: Verify glass effect**

Run `npm run dev`. Cards should appear translucent/frosted. Sidebar should be frosted glass. In dark mode, the near-black background should show through cards.

- [ ] **Step 6: Commit**

```bash
git add src/index.css
git commit -m "style: apply glassmorphic backdrop-filter to cards and sidebar"
```

---

### Task 5: Update sidebar nav active states and logo color

**Files:**
- Modify: `src/index.css` — `.nav-item`, `.nav-item.active`, `.logo-text` sections
- Modify: `src/components/Sidebar.tsx:34` — logo text element

- [ ] **Step 1: Update `.nav-item` hover, active, and pseudo-element rules**

Do **not** replace the base `.nav-item {}` rule — its layout properties (`display`, `padding`, `gap`, etc.) are unchanged. Instead make these targeted changes:

**1a. Replace the `.nav-item:hover` rule:**
```css
.nav-item:hover {
  background: rgba(202, 92, 236, 0.06);
  color: var(--accent-primary);
}
```

**1b. Replace the `.nav-item.active` rule:**
```css
.nav-item.active {
  background: rgba(202, 92, 236, 0.10);
  color: var(--accent-primary);
  font-weight: 600;
}
```

**1c. Replace the `.nav-item.active::before` rule** (changes gradient from solid to two-stop):
```css
.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: linear-gradient(180deg, #ca5cec, #8b5cf6);
  border-radius: 0 3px 3px 0;
}
```

**1d. Add the new `.nav-item::after` underline rule** (insert after `.nav-item.active::before`):
```css
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 12px;
  width: calc(100% - 24px);
  height: 1px;
  background: #ca5cec;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.2s ease;
}

.nav-item:hover::after { transform: scaleX(1); }
.nav-item.active::after { transform: scaleX(0); }
```

- [ ] **Step 2: Update logo text color in `Sidebar.tsx`**

In `src/components/Sidebar.tsx`, find the element with `className="logo-text"`:
```tsx
<div className="logo-text">Ad-Lab</div>
```
Replace with:
```tsx
<div className="logo-text" style={{ color: '#ca5cec' }}>Ad-Lab</div>
```

- [ ] **Step 3: Update theme toggle to pill style**

Find the `.theme-toggle-btn {` rule. Replace the full block (and its hover rule):

```css
.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 16px;
  border-radius: 99px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-input);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  font-family: inherit;
}

.theme-toggle-btn:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: var(--accent-primary-light);
}

html.dark .theme-toggle-btn {
  box-shadow: 0 0 20px rgba(202, 92, 236, 0.12);
}
```

- [ ] **Step 4: Verify sidebar**

Sidebar logo "Ad-Lab" text is now orchid purple. Active nav item has the `#ca5cec` left gradient bar. Hover shows underline reveal animation. Toggle is pill-shaped.

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/components/Sidebar.tsx
git commit -m "style: sidebar brand color, active nav pill, hover underline"
```

---

## Chunk 3: KPI Cards + Welcome Banner

### Task 6: Update KPI card typography, icon colors, and gradient value

**Files:**
- Modify: `src/index.css` — `.kpi-label`, `.kpi-value`, `.kpi-icon-wrap.*` classes
- Modify: `src/components/KPICard.tsx` — add gradient class + count-up animation

- [ ] **Step 1: Update KPI label and value typography in `index.css` (~line 566–590)**

```css
.kpi-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.6;
  transition: color var(--transition-slow);
}

.kpi-value {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.8px;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  transition: color var(--transition-slow);
}

.kpi-value-gradient {
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.8px;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(135deg, #ca5cec, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

- [ ] **Step 2: Update icon wrap colors in `index.css` (~line 538–544)**

```css
.kpi-icon-wrap.vince   { background: rgba(202, 92, 236, 0.12); color: #ca5cec; }
.kpi-icon-wrap.difiano { background: rgba(6, 182, 212, 0.12);  color: #06b6d4; }
.kpi-icon-wrap.total   { background: rgba(202, 92, 236, 0.10); color: #ca5cec; }
.kpi-icon-wrap.neutral { background: var(--accent-orange-light); color: var(--accent-orange); }

html.dark .kpi-icon-wrap.vince   { background: rgba(202, 92, 236, 0.15); }
html.dark .kpi-icon-wrap.difiano { background: rgba(6, 182, 212, 0.14); }
html.dark .kpi-icon-wrap.total   { background: rgba(202, 92, 236, 0.14); }
```

- [ ] **Step 3: Update `KPICard.tsx` — add gradient class and count-up animation**

Replace the entire contents of `src/components/KPICard.tsx` with:

> **Notes on this implementation:**
> - Count-up only runs when `typeof value === 'number'`. String values (e.g. a label) fall through to direct `setDisplay(String(value))` — no NaN or runtime error.
> - The `whileHover` prop is removed from `motion.div`. Framer Motion controls the element's transform pipeline, so mixing Framer's `y` animation with CSS `translateY` on the same axis would cause the CSS hover to be suppressed. The hover lift (`translateY(-3px)`) is handled entirely by the `.kpi-card:hover` CSS rule added in Task 4, which works correctly because Framer's entry animation (`y: 16 → 0`) completes and yields. The `motion.div` here only controls opacity/y for the entry animation, not ongoing hover state.

```tsx
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '../lib/data'

interface KPICardProps {
  label: string
  value: number | string
  sub?: string
  variant: 'vince' | 'difiano' | 'total' | 'neutral'
  icon: LucideIcon
  isCurrency?: boolean
  delay?: number
  trend?: { value: number; label?: string }
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  sub,
  variant,
  icon: Icon,
  isCurrency = true,
  delay = 0,
  trend,
}) => {
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState(() =>
    typeof value === 'number'
      ? isCurrency ? formatCurrency(0) : '0'
      : String(value)
  )

  useEffect(() => {
    // Only animate numbers; strings (labels, etc.) render directly
    if (typeof value !== 'number') {
      setDisplay(String(value))
      return
    }
    const controls = animate(motionVal, value, {
      duration: 0.6,
      ease: 'easeOut',
      onUpdate: (v) =>
        setDisplay(isCurrency ? formatCurrency(v) : String(Math.round(v))),
    })
    return controls.stop
  }, [value, isCurrency])

  const isUp = trend && trend.value >= 0
  const isGradient = variant === 'total'

  return (
    // whileHover is intentionally absent here.
    // The existing file has whileHover={{ y: -2 }} — this replacement removes it.
    // Reason: Framer overrides CSS transforms on any axis it controls. If whileHover
    // sets y, the CSS .kpi-card:hover { transform: translateY(-3px) } is suppressed.
    // Solution: CSS handles all hover state; Framer only drives the entry animation.
    <motion.div
      className="kpi-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
    >
      <div className="kpi-card-top">
        <div className={`kpi-icon-wrap ${variant}`}>
          <Icon size={19} />
        </div>
        {trend !== undefined && (
          <div className={`kpi-trend ${isUp ? 'up' : 'down'}`}>
            {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(trend.value).toFixed(1)}%
          </div>
        )}
      </div>
      <div className="kpi-card-inner">
        <div className="kpi-label">{label}</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={String(value)}
            className={isGradient ? 'kpi-value-gradient' : 'kpi-value'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {display}
          </motion.div>
        </AnimatePresence>
        {sub && <div className="kpi-sub">{sub}</div>}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Verify KPI cards**

Run `npm run dev`. The Total Earnings card value should render in the orchid→purple gradient. All five cards should count up from 0 on page load. Card tops should show the thin highlight line.

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/components/KPICard.tsx
git commit -m "feat: KPI cards — gradient value, count-up animation, glass inner highlight"
```

---

### Task 7: Add welcome banner to Overview page

**Files:**
- Modify: `src/index.css` — add `.welcome-banner` CSS block
- Modify: `src/pages/OverviewPage.tsx:72` — add JSX at top of render

- [ ] **Step 1: Add `.welcome-banner` CSS block to `index.css`**

Append the following after the `/* PAGE HERO */` section (around line 425 in the original, now shifted):

```css
/* =============================================
   WELCOME BANNER
   ============================================= */
.welcome-banner {
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(202, 92, 236, 0.15);
}

html.light .welcome-banner,
:root .welcome-banner {
  background: linear-gradient(135deg, rgba(202, 92, 236, 0.12) 0%, rgba(243, 232, 255, 0.8) 100%);
}

html.dark .welcome-banner {
  background: linear-gradient(135deg, rgba(202, 92, 236, 0.18) 0%, rgba(10, 10, 15, 0.9) 60%);
}

.welcome-banner::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(202, 92, 236, 0.07) 40%,
    rgba(139, 92, 246, 0.09) 60%,
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

- [ ] **Step 2: Add banner JSX at top of `OverviewPage.tsx` render**

In `src/pages/OverviewPage.tsx`, find the post-loading `return (` block (the one that is NOT inside `if (loading)`). The return opens a single wrapper `<div>`. Insert the banner as the **first child of that wrapper div**, before the hero/calendar sibling div.

Find this exact text (the opening of the post-loading return):
```tsx
  return (
    <div>
      {/* Hero + Calendar */}
```

Replace with:
```tsx
  return (
    <div>
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2 className="welcome-banner-title">Welcome to Ad-Lab — your affiliate earnings at a glance.</h2>
        <p className="welcome-banner-sub">All figures in USD · Earnings dashboard</p>
      </div>

      {/* Hero + Calendar */}
```

The banner is a sibling of the hero row, inside the wrapper `<div>` — not before the `return`, not inside the flex wrapper.

- [ ] **Step 3: Verify banner**

Run `npm run dev` and open the Overview page. A gradient strip with shimmer animation should appear at the top above the KPI cards. Toggle dark/light to verify both backgrounds.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/pages/OverviewPage.tsx
git commit -m "feat: add animated welcome banner to Overview page"
```

---

## Chunk 4: Charts, Tables, Badges, Scrollbar

### Task 8: Update chart colors in Charts.tsx

**Files:**
- Modify: `src/components/Charts.tsx` — update all hardcoded `#6366f1` and `#0ea5e9` values

- [ ] **Step 1: Update `EarningsAreaChart` gradient definitions (~lines 81–88)**

```tsx
<defs>
  <linearGradient id="vinceGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="2%"  stopColor="#ca5cec" stopOpacity={0.20} />
    <stop offset="96%" stopColor="#ca5cec" stopOpacity={0} />
  </linearGradient>
  <linearGradient id="difanoGrad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="2%"  stopColor="#06b6d4" stopOpacity={0.20} />
    <stop offset="96%" stopColor="#06b6d4" stopOpacity={0} />
  </linearGradient>
</defs>
```

- [ ] **Step 2: Update `<Area>` stroke and dot colors (~lines 111–128)**

```tsx
<Area
  type="monotone"
  dataKey="Vince"
  stroke="#ca5cec"
  strokeWidth={2.5}
  fill="url(#vinceGrad)"
  dot={{ fill: '#ca5cec', r: 3, strokeWidth: 0 }}
  activeDot={{ r: 5, fill: '#ca5cec', strokeWidth: 2, stroke: '#fff' }}
/>
<Area
  type="monotone"
  dataKey="Difiano"
  stroke="#06b6d4"
  strokeWidth={2.5}
  fill="url(#difanoGrad)"
  dot={{ fill: '#06b6d4', r: 3, strokeWidth: 0 }}
  activeDot={{ r: 5, fill: '#06b6d4', strokeWidth: 2, stroke: '#fff' }}
/>
```

- [ ] **Step 3: Update `EarningsBarChart` bar fill colors (~lines 173–174)**

```tsx
<Bar dataKey="Vince"   fill="#ca5cec" radius={[5, 5, 0, 0]} maxBarSize={28} opacity={0.92} />
<Bar dataKey="Difiano" fill="#06b6d4" radius={[5, 5, 0, 0]} maxBarSize={28} opacity={0.88} />
```

- [ ] **Step 4: Update `EarningsLineChart` total gradient**

The existing `totalLineGrad` in `Charts.tsx` has **three stops**: `0%` (#6366f1 indigo), `50%` (#0ea5e9 blue), `100%` (#10b981 green). Update all three stops — replace the full `<linearGradient id="totalLineGrad">` block:

```tsx
<linearGradient id="totalLineGrad" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0%"   stopColor="#ca5cec" />
  <stop offset="50%"  stopColor="#06b6d4" />
  <stop offset="100%" stopColor="#10b981" />
</linearGradient>
```

This retains the green endpoint (total combined line) while updating the start and mid to brand colors.

- [ ] **Step 5: Verify charts**

Open the dashboard. Area chart Vince bars/lines should be orchid purple, Difiano should be cyan. Bar chart same. Line chart total gradient starts purple.

- [ ] **Step 6: Commit**

```bash
git add src/components/Charts.tsx
git commit -m "style: update chart colors — Vince #ca5cec, Difiano #06b6d4"
```

---

### Task 9: Update affiliate toggle, badges, tables, and scrollbar in index.css

**Files:**
- Modify: `src/index.css` — `.affiliate-btn.*`, `.badge-*`, `.data-table`, scrollbar rules

- [ ] **Step 1: Update affiliate toggle active states**

> **Prerequisite — IMPORTANT:** Tasks must be executed in order. `--gradient-brand` (`linear-gradient(135deg, #ca5cec, #8b5cf6)`) is added to both `:root` and `html.dark` in Tasks 2 and 3 of this plan. If you are applying Task 9 without having applied Tasks 2 & 3 first, the token will not exist and the gradient will silently fail. Confirm Tasks 2 & 3 are applied before proceeding. If unsure, search `index.css` for `--gradient-brand` — it must be present before continuing.

Find the `.affiliate-btn.active-both`, `.affiliate-btn.active-vince`, and `.affiliate-btn.active-difiano` rules. Replace all three:

```css
.affiliate-btn.active-both {
  background: var(--gradient-brand);
  color: #fff;
  box-shadow: 0 2px 10px rgba(202, 92, 236, 0.3);
}

.affiliate-btn.active-vince {
  background: var(--gradient-brand);
  color: #fff;
  box-shadow: 0 2px 10px rgba(202, 92, 236, 0.35);
}

.affiliate-btn.active-difiano {
  background: var(--gradient-difiano);
  color: #fff;
  box-shadow: 0 2px 10px rgba(6, 182, 212, 0.3);
}
```

- [ ] **Step 2: Update badge colors (~line 838–860)**

```css
.badge-vince {
  background: rgba(202, 92, 236, 0.12);
  color: #ca5cec;
  border: 1px solid rgba(202, 92, 236, 0.25);
}

.badge-difiano {
  background: rgba(6, 182, 212, 0.10);
  color: #06b6d4;
  border: 1px solid rgba(6, 182, 212, 0.22);
}

html.dark .badge-vince {
  background: rgba(202, 92, 236, 0.18);
  color: #d580f0;
  border-color: rgba(202, 92, 236, 0.30);
}

html.dark .badge-difiano {
  background: rgba(6, 182, 212, 0.15);
  color: #22d3ee;
  border-color: rgba(6, 182, 212, 0.25);
}
```

- [ ] **Step 3: Update table styles (~line 785–824)**

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  border-bottom: 1px solid var(--border-subtle);
}

.data-table th {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 10px 14px;
  text-align: left;
  opacity: 0.7;
  transition: color var(--transition-slow);
}

.data-table td {
  padding: 12px 14px;
  font-size: 13.5px;
  color: var(--text-secondary);
  border-bottom: 1px solid rgba(202, 92, 236, 0.06);
  font-variant-numeric: tabular-nums;
  transition: all 0.15s ease;
}

.data-table tr:last-child td { border-bottom: none; }

.data-table tbody tr:nth-child(odd) td {
  background: rgba(202, 92, 236, 0.02);
}

.data-table tbody tr:hover td {
  background: rgba(202, 92, 236, 0.06);
  color: var(--text-primary);
}

.data-table td:first-child {
  color: var(--text-primary);
  font-weight: 600;
}
```

- [ ] **Step 4: Update scrollbar thumb color (~line 139–142)**

```css
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(202, 92, 236, 0.4); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: #ca5cec; }
```

- [ ] **Step 5: Verify tables and badges**

Navigate to Clients page and Comparison page. Table rows should have subtle alternating tint, no hard borders, and brand-color hover highlight. Badges should be orchid (Vince) and cyan (Difiano).

- [ ] **Step 6: Commit**

```bash
git add src/index.css
git commit -m "style: update badges, tables, affiliate toggle, scrollbar to brand colors"
```

---

## Chunk 5: Typography Headings + Micro-interactions

### Task 10: Apply Outfit font to headings and polish typography

**Files:**
- Modify: `src/index.css` — `.page-hero-title`, `.card-title`, `.topbar-title`, `.section-title`

- [ ] **Step 1: Update heading font classes**

Find and update these classes in `index.css`:

```css
.page-hero-title {
  font-family: 'Outfit', sans-serif;
  font-size: 26px;
  font-weight: 800;
  background: var(--gradient-heading);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.6px;
  line-height: 1.2;
}

.card-title {
  font-family: 'Outfit', sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  opacity: 0.6;
  transition: color var(--transition-slow);
}

.topbar-title {
  font-family: 'Outfit', sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.3px;
  transition: color var(--transition-slow);
}

.section-title {
  font-family: 'Outfit', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color var(--transition-slow);
}
```

- [ ] **Step 2: Add global root transition for smooth theme switching**

In the `:root, html.light` block, add after the last variable:
```css
  transition: background 0.3s ease, color 0.3s ease;
```

In the `html.dark` block, add the same line.

- [ ] **Step 3: Verify typography**

Headings, card titles, and KPI values should now render in Outfit. Body text (table rows, nav labels) in DM Sans.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "style: apply Outfit font to headings, card titles, topbar"
```

---

### Task 11: Final polish — filter chips, calendar, progress bars

**Files:**
- Modify: `src/index.css` — `.filter-chip`, `.calendar-*`, `.progress-fill`, `.split-card-*`

- [ ] **Step 1: Update filter chips to use brand color**

Find `.filter-chip.active` (~line 906):
```css
.filter-chip.active {
  background: linear-gradient(135deg, #ca5cec, #8b5cf6);
  border-color: #ca5cec;
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(202, 92, 236, 0.3);
}
```

- [ ] **Step 2: Update calendar apply button and selected month**

Find `.calendar-month-btn.selected` and `.cal-apply-btn`:
```css
.calendar-month-btn.selected {
  background: linear-gradient(135deg, #ca5cec, #8b5cf6);
  color: #fff;
  border-color: #ca5cec;
  font-weight: 600;
}

.calendar-month-btn.in-range {
  background: rgba(202, 92, 236, 0.10);
  color: #ca5cec;
  border-color: transparent;
}

.cal-apply-btn {
  padding: 7px 16px;
  border-radius: var(--border-radius-xs);
  border: none;
  background: linear-gradient(135deg, #ca5cec, #8b5cf6);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: opacity var(--transition);
  box-shadow: 0 2px 12px rgba(202, 92, 236, 0.3);
}
```

- [ ] **Step 3: Update comparison page split card accents (~line 1006–1012)**

```css
.split-card-vince {
  border-top: 3px solid #ca5cec;
}

.split-card-difiano {
  border-top: 3px solid #06b6d4;
}
```

- [ ] **Step 4: Final full visual review**

Run `npm run dev`. Navigate through all 4 pages:
- **Overview:** welcome banner, glassmorphic KPI cards, count-up numbers, orchid chart lines
- **Trends:** bar chart with brand colors, filter chips, calendar
- **Clients:** table with alternating tints, orchid/cyan badges
- **Comparison:** split cards with brand accent tops, progress bars

Toggle dark/light mode on each page. No visible regressions.

- [ ] **Step 5: Final commit**

```bash
git add src/index.css
git commit -m "style: polish filter chips, calendar, comparison card accents"
```

---

## Summary

| Task | Files | Type |
|---|---|---|
| 1 — Font import | `index.css` | Token |
| 2 — Light tokens | `index.css` | Token |
| 3 — Dark tokens | `index.css` | Token |
| 4 — Glass cards + sidebar | `index.css` | Style |
| 5 — Nav states + logo | `index.css`, `Sidebar.tsx` | Style + JSX |
| 6 — KPI cards | `index.css`, `KPICard.tsx` | Style + Component |
| 7 — Welcome banner | `index.css`, `OverviewPage.tsx` | Style + JSX |
| 8 — Chart colors | `Charts.tsx` | Component |
| 9 — Badges + tables | `index.css` | Style |
| 10 — Heading fonts | `index.css` | Style |
| 11 — Final polish | `index.css` | Style |
