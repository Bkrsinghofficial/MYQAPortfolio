---
name: Cinematic Midnight Cobalt
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#a4c9ff'
  on-tertiary: '#00315d'
  tertiary-container: '#196fc0'
  on-tertiary-container: '#ebf1ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#d4e3ff'
  tertiary-fixed-dim: '#a4c9ff'
  on-tertiary-fixed: '#001c39'
  on-tertiary-fixed-variant: '#004883'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 3.5rem
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Geist
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.04em
  caption:
    fontFamily: Geist
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system draws direct visual inspiration from the provided executive portrait: an immaculate blend of tailored corporate authority and modern, high-precision engineering. Built upon deep midnight navy gradients, tailored slate foundations, and illuminated by cinematic electric blue and cyan edge lighting, the system evokes extreme technical reliability, architectural precision, and cutting-edge software engineering discipline.

The emotional signature is composed, analytical, and uncompromisingly high-end. It rejects frivolous ornamentation in favor of purposeful clarity, dark-mode atmospheric depth, and razor-sharp data legibility. Micro-interactions are snappy and measured, utilizing luminous cyan and cobalt halos reminiscent of technical studio spotlights reflecting across glass and fine-woven suiting.

## Colors

The palette establishes an immersive cinematic dark environment rooted in dark obsidian navy surfaces and structural blues.

- **Primary (`#2563EB`)**: Rich Royal Cobalt—delivers definitive visual hierarchy for primary calls-to-action, active indicators, and high-priority states.
- **Secondary (`#38BDF8`)**: Luminous Cyan—used as an energetic highlight, precision focus rings, active telemetry points, and edge-glow states.
- **Tertiary (`#60A5FA`)**: Soft Electric Blue—ideal for hover states, selected card perimeters, and secondary data visualizations.
- **Neutral Dark Canvas (`#090D16`, `#0D1527`, `#162038`)**: Evoking the tailored midnight blazer and studio gradient backdrop, these layered dark tones provide natural optical depth without harsh pitch blacks.
- **Typography & Structural Slates (`#F8FAFC`, `#94A3B8`, `#334155`)**: Crisp cold-white for primary readability, muted slate for secondary metadata, and disciplined borders that anchor modular telemetry components.

## Typography

The typographical pairing expresses an engineering-grade aesthetic with corporate poise:

- **Headlines (`Space Grotesk`)**: Geometric, structured, and modern. Its clean proportions lend an architectural weight suited for dashboards, feature headers, and executive summaries.
- **Body Text (`Geist`)**: Uncompromisingly readable, clinical, and balanced across low-illumination screens. It renders crisp paragraphs and continuous telemetry without visual fatigue.
- **Labels & Micro-data (`JetBrains Mono`)**: Strict monospaced typography designed for test outputs, numerical metrics, system tags, and timestamps. It guarantees tabular clarity and instant readability.

## Layout & Spacing

The layout is built upon an 8pt modular grid arranged as a 12-column responsive fluid grid on desktop, scaling down to 8 columns on tablet and 4 columns on mobile. 

- **Desktop (>=1280px)**: 12-column fluid grid, 2rem section margins, and 1.5rem column gutters. Maximum container width capped at 1440px for centered dashboard presentation.
- **Tablet (768px - 1279px)**: 8-column layout with 1.5rem margins and 1rem gutters. Dense toolbars reflow into collapsible drawer panels.
- **Mobile (<768px)**: 4-column layout with 1rem margin and 0.75rem gutters. Horizontal padding compresses to maximize data real estate for log tables and testing cards.

## Elevation & Depth

Visual hierarchy relies on a layered surface architecture rather than heavy drop shadows:

- **Canvas Base Layer**: `#090D16` creates the foundational darkness.
- **Surface Elevation 1 (Card containers, list rows)**: `#0D1527` with a fine 1px structural stroke of `#1E293B` (Slate-800).
- **Surface Elevation 2 (Floating modals, popovers, active drawers)**: `#162038` accented with a subtle gradient rim (`#38BDF8` at 15% opacity).
- **Cinematic Ambient Lighting**: Hover states and active items project a soft, diffused luminescent glow: `0 0 24px -4px rgba(37, 99, 235, 0.25)`.
- **Focus Rings**: Sharp, dual-layer outline consisting of a 1px gap followed by a 2px stroke in `#38BDF8`.

## Shapes

The geometric form language adopts a tight, tailored corner radius (Level 1: Soft). This matches the crisp lines of tailored suiting and the angular precision of professional software interfaces.

- **Base Corner Radius (`rounded-md`)**: `0.25rem` (4px) applied to buttons, input fields, badges, and tab items.
- **Container Corner Radius (`rounded-lg`)**: `0.5rem` (8px) applied to analytical cards, modal windows, and flyouts.
- **Panel Corner Radius (`rounded-xl`)**: `0.75rem` (12px) reserved strictly for macro wrappers and top-level viewports.
- **Status Indicators & Avatars**: True circular (`rounded-full`) to contrast against the technical box geometry.

## Components

### Buttons
- **Primary**: Solid `#2563EB` fill with `#F8FAFC` text. On hover, background transitions to `#3B82F6` accompanied by a localized cyan ambient glow (`rgba(56, 189, 248, 0.35)`). Active state applies a slight scale compression (0.98).
- **Secondary / Ghost**: Transparent background framed by a 1px border of `#334155`, text in `#94A3B8`. Hover evokes a surface shift to `#0D1527` with the border brightening to `#60A5FA`.
- **Technical Action**: Monospaced typography with a compact padding of `0.375rem 0.75rem` for command actions and code snippet copy buttons.

### Chips & Badges
- Engineered using `JetBrains Mono` at `label-sm`.
- Static badges feature a muted semi-transparent background (e.g., `rgba(37, 99, 235, 0.12)`) paired with a high-contrast text color (`#38BDF8`) and a 1px crisp hairline perimeter.
- Test status chips incorporate a live pulsing dot indicator (Emerald for pass, Amber for warning, Crimson for fail).

### Input Fields & Controls
- **Background**: `#0D1527` surface with a resting border in `#1E293B`.
- **Typography**: Text inputs render in `#F8FAFC`, with placeholder text rendered in `#475569`.
- **Focus State**: Border transitions instantaneously to `#38BDF8` with a subtle outer cyan illumination.
- **Checkboxes & Radios**: 16px square/circle with `#0D1527` background and 1px `#334155` border. Checked states feature solid `#2563EB` fill with an interior `#F8FAFC` glyph.

### Cards & Telemetry Panels
- Rendered on `#0D1527` with a discrete 1px `#1E293B` outer boundary.
- Panel headers feature a subtle gradient underline shifting from `#2563EB` to transparent along the top edge to mirror high-tech stage lighting.
- Dividers between card header, body, and action footer use a sharp 1px `#131C31` rule.