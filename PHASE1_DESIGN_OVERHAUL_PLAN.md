# Phase 1: Design Overhaul Implementation Plan
## "Nautical Modernism" Upfit for BeaconMomentum.com

This document outlines the step-by-step plan to transform the existing Beacon Momentum marketing site into the new "Nautical Modernism" aesthetic, ensuring alignment with the 2026 strategic vision.

### 1. Color System Migration
**Goal:** Replace the legacy "Teal & Gold" palette with the new "Deep Ocean" system to match the dashboard.

| Legacy Color | New Token | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| `#0F766E` (Teal) | `primary` | `#0F172A` (Slate 900) | Main headers, buttons, hero backgrounds |
| `#D97706` (Gold) | `accent` | `#F59E0B` (Amber 500) | CTAs, highlights, "Lighthouse" beams |
| `#F8F5F1` (Cream) | `background` | `#F8FAFC` (Slate 50) | Page background, section breaks |
| `#1F1F1F` (Dark) | `foreground` | `#020617` (Slate 950) | Body text, primary content |
| N/A | `glass` | `rgba(255,255,255,0.1)` | Card backgrounds, overlays |

**Action Items:**
- [ ] Update `:root` variables in `index.html` (and all other HTML pages).
- [ ] Replace all hardcoded hex values in inline styles or `<style>` blocks.
- [ ] Update Tailwind config (if present) or CDN script configuration.

### 2. Typography Update
**Goal:** Modernize the type hierarchy to convey "Crafted Precision" and "Future-Forward" momentum.

| Element | Old Font | New Font | Rationale |
| :--- | :--- | :--- | :--- |
| **Headings** | `Playfair Display` | `Space Grotesk` | More modern, technical, and "dashboard-aligned" |
| **Body** | `Inter` | `Inter` | Retain for readability, but adjust weights |
| **Accents** | N/A | `JetBrains Mono` | For metrics, data points, and "Watch" logs |

**Action Items:**
- [ ] Update Google Fonts link in `<head>` to include `Space Grotesk` and `JetBrains Mono`.
- [ ] Update CSS font-family variables.
- [ ] Refactor `h1`, `h2`, `h3` styles to use `Space Grotesk`.

### 3. Visual Asset Strategy
**Goal:** Replace generic stock imagery with custom 3D/Abstract assets that reinforce the "Beacon" metaphor.

**Asset Inventory:**
1.  **Hero Background:**
    *   *Current:* `hero-bg-option2-clean.png` (Generic landscape)
    *   *New:* `hero-lighthouse-abstract.png` (From Dashboard: 3D glass lighthouse with beam)
2.  **Pathway Icons:**
    *   *Current:* Generic FontAwesome or simple SVGs.
    *   *New:*
        *   **Rise:** `pathway-rise.png` (Upward momentum abstract)
        *   **Launch:** `pathway-launch.png` (Rocket/Propulsion abstract)
        *   **Academy:** `pathway-academy.png` (Structure/Pillar abstract)
3.  **Patterns:**
    *   *New:* `card-wave-pattern.png` (Subtle background texture for sections)

**Action Items:**
- [ ] Copy generated assets from Dashboard project (`/home/ubuntu/beacon-2026-dashboard/client/public/images/`) to Website project (`/assets/images/`).
- [ ] Update `img` src tags and CSS `background-image` properties.

### 4. Component Refactoring
**Goal:** Apply "Glassmorphism" and "Card" styling to key UI elements.

**Key Components:**
*   **Navigation Bar:**
    *   Change background from solid White to `backdrop-blur-md` with `bg-slate-900/90`.
    *   Update links to White/Gold hover state.
*   **Hero Section:**
    *   Implement "Beam" gradient overlay (`bg-gradient-to-b from-slate-900 to-slate-800`).
    *   Add "Glow" effect behind the main headline.
*   **Pathway Cards:**
    *   Add `border-white/10`, `shadow-xl`, and `backdrop-blur` effects.
    *   Ensure distinct accent colors for each pathway (Orange for Rise, Blue for Launch, Purple for Academy).

### 5. Execution Checklist
- [ ] **Step 1:** Clone/Pull latest repo (Done).
- [ ] **Step 2:** Create a new branch `feature/design-overhaul-phase1`.
- [ ] **Step 3:** Apply Color & Typography changes globally.
- [ ] **Step 4:** Port and implement new Visual Assets.
- [ ] **Step 5:** Refactor Header and Hero sections.
- [ ] **Step 6:** Refactor Pathway Cards.
- [ ] **Step 7:** Mobile Responsiveness Check.
- [ ] **Step 8:** Commit and Push to GitHub.

---
**Note:** This plan focuses purely on the *visual layer*. Content updates (messaging, pricing) will be handled in Phase 2.
