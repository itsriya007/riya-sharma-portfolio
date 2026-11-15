---
name: Warm Editorial Tech
colors:
  surface: '#fff8f5'
  surface-dim: '#e0d9d6'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ef'
  surface-container: '#f4ecea'
  surface-container-high: '#eee7e4'
  surface-container-highest: '#e8e1de'
  on-surface: '#1e1b1a'
  on-surface-variant: '#4f4440'
  inverse-surface: '#33302e'
  inverse-on-surface: '#f7efec'
  outline: '#81746f'
  outline-variant: '#d3c3bd'
  surface-tint: '#73584c'
  primary: '#71564a'
  on-primary: '#ffffff'
  primary-container: '#8b6e61'
  on-primary-container: '#fffbff'
  inverse-primary: '#e2bfb0'
  secondary: '#695c55'
  on-secondary: '#ffffff'
  secondary-container: '#efdcd3'
  on-secondary-container: '#6e6059'
  tertiary: '#4b6061'
  on-tertiary: '#ffffff'
  tertiary-container: '#647879'
  on-tertiary-container: '#f3ffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#e2bfb0'
  on-primary-fixed: '#2a170e'
  on-primary-fixed-variant: '#5a4136'
  secondary-fixed: '#f2dfd6'
  secondary-fixed-dim: '#d5c3bb'
  on-secondary-fixed: '#231914'
  on-secondary-fixed-variant: '#51443e'
  tertiary-fixed: '#d0e7e8'
  tertiary-fixed-dim: '#b5cbcc'
  on-tertiary-fixed: '#0a1f20'
  on-tertiary-fixed-variant: '#364a4b'
  background: '#fff8f5'
  on-background: '#1e1b1a'
  surface-variant: '#e8e1de'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style
This design system balances deep backend technical engineering with the refined, tactile world of editorial publishing. Tailored for an elite Mumbai-based backend specialist in fintech and high-volume motor insurance domains, the visual language merges the reliability of financial ledgers with a bespoke, luxurious aesthetic.

The atmosphere rejects cold, generic developer aesthetics in favor of a warm, calculated presence:
- **Tone:** Grounded, authoritative, highly competent, modern, and distinctively tailored.
- **Audience:** Engineering leaders, fintech founders, CTOs, and global product teams seeking top-tier architectural depth.
- **Design Movement:** Editorial Minimalism infused with high-contrast sophisticated earthy accents. Deep taupe and roasted brown tones establish substance, punctuated by an architectural slate-teal that brings interactive moments forward with sharpness and precision.

## Colors
The color palette pairs the richness of roasted taupe and warm cocoa with soft, radiant sand/ivory surfaces, illuminated by an architectural slate-teal:

- **Primary (`#8e7164`):** Muted terracotta brown. Used sparingly for high-value interactive anchors, primary CTAs, active states, pipeline visualizers, and key metrics.
- **Secondary (`#83746d`):** Warm charcoal taupe. Grounding color used for authoritative headers, structural framing, high-emphasis text, and dark mode inversions.
- **Tertiary (`#2e4243`):** Deep slate teal. Used for subheadings, category tags, timeline markers, and subtle decorative accents.
- **Neutral (`#7b7674`):** Warm taupe-neutral canvas. Sets a tactile, physical paper-like ground that prevents the harsh glare of stark white screens.

### Functional Roles & Surface Hierarchy
- **Base Canvas:** `#fcfaf7` (Cream Alabaster).
- **Surface Layer 1 (Cards, Modules):** `#ffffff` with a warm undertone or `#f5efe6` for sunken code blocks.
- **Surface Elevated (Modals, Overlays):** `#ffffff` framed by subtle warm chestnut edges.
- **Text & Content:**
  - High Contrast / Primary: `#1f130e` (Deepest Cocoa).
  - Secondary / Supporting: `#574136` (Roasted Bark).
  - Subtle / Metadata: `#8c7365` (Warm Taupe).
- **Interactive Accents:**
  - Accent Hover / Glow: `#a38578`.
  - Accent Subtle Wash (Badges & Chips): `rgba(142, 113, 100, 0.08)`.

## Typography
The system uses **Plus Jakarta Sans** for headlines and body text to deliver geometric clarity and contemporary warmth. To reinforce backend architecture and engineering rigor, **JetBrains Mono** is introduced for technical labels, latency figures, API methods, and code chips.

- **Editorial Hierarchy:** Display and headline levels feature tight negative letter-spacing for punchy, magazine-like impact.
- **Technical Rigor:** Monospace tags (`label-code`) present benchmarks, throughput statistics (e.g., TPS, microsecond latencies), and insurance domain protocols with clinical precision.
- **Legibility:** Body text uses comfortable line heights (1.5x to 1.6x) with a deep cocoa hue instead of harsh pure black to reduce eye strain.

## Layout & Spacing
The layout employs an intentional fluid 12-column grid anchored by generous outer margins, reflecting an airy, publication-grade cadence.

- **Breakpoints & Containers:**
  - Desktop (≥1200px): Max content container of 1240px, 12-column grid, 24px gutters, 48px outer margins.
  - Tablet (768px - 1199px): 8-column grid, 20px gutters, 32px outer margins.
  - Mobile (≤767px): 4-column grid, 16px gutters, 20px outer margins.
- **Rhythm & Cadence:** Generous section spacing (`space-2xl`) prevents dense backend terminology from overwhelming recruiters. Complex architecture diagrams and fintech workflows receive full-width breathing room before transitioning into two-column technical breakdowns.

## Elevation & Depth
Depth is established through soft, warm-toned physical layers rather than synthetic drop shadows:

- **Tonal Layering:** The foundational ivory canvas supports elevated `#ffffff` project cards, subtly delineated by a 1px border tinted in warm taupe-sepia (`rgba(131, 116, 109, 0.08)`).
- **Ambient Warm Shadows:** When cards are hovered or modals triggered, shadows carry a warm taupe cast rather than neutral gray:
  - Resting Card: `0 2px 8px -2px rgba(131, 116, 109, 0.04), 0 1px 3px -1px rgba(131, 116, 109, 0.03)`
  - Hovered / Floating Card: `0 16px 32px -8px rgba(131, 116, 109, 0.08), 0 4px 12px -2px rgba(131, 116, 109, 0.04)`
  - Elevated Modal / Sheet: `0 24px 48px -12px rgba(131, 116, 109, 0.16), 0 0 0 1px rgba(131, 116, 109, 0.06)`
- **Accent Glow:** For active primary elements, a soft slate-teal ambient halo (`0 0 20px rgba(46, 66, 67, 0.25)`) signals live transactions, active pipeline nodes, or primary user focus.

## Shapes
A balanced `roundedness: 2` approach lends modern elegance to the system without appearing childlike or excessively rounded:
- **Base Components (Cards, Panels, Modals):** Radii range from 8px (`0.5rem`) to 16px (`1rem`), producing neat, structured rectangles with softened edges.
- **Badges, Pills & CTA Buttons:** Full pill shapes (`rounded-full`) are reserved for interactive tags, status indicators, and primary call-to-actions, contrasting nicely against the architectural grid of the cards.

## Components

### Buttons
- **Primary Action (Terracotta Brown):** Background `#8e7164`, text `#ffffff`, font `Plus Jakarta Sans` semi-bold. Subtle outer glow on hover with scale transition (`transform: translateY(-1px)`).
- **Secondary Action (Taupe Outline):** 1px border in `#83746d`, background transparent, text `#83746d`. Transitions to solid `#83746d` with `#fcfaf7` text on hover.
- **Tertiary / Ghost:** No border or background; text `#2e4243` with an architectural underline indicator on hover.

### Tech Badges & Metric Chips
- **Language / Framework Badges:** JetBrains Mono typography, `rounded-full`, padding 4px 12px. Background `rgba(131, 116, 109, 0.04)`, border 1px solid `rgba(131, 116, 109, 0.1)`, text `#83746d`.
- **System Metrics & Live Badges (e.g., "99.99% Uptime", "Kafka", "IRDAI Compliant"):** Slate teal background tint `rgba(46, 66, 67, 0.1)`, text `#2e4243`, with a pulsing 6px slate-teal dot indicator.

### Project & Architecture Cards
- **Base:** Ivory white `#ffffff` surface, 1px warm perimeter border (`rgba(131, 116, 109, 0.08)`), 16px corner radius.
- **Inner Content:** Upper block displays business domain tag (e.g., "Motor Underwriting Engine") in uppercase slate-teal (`label-caps`), followed by bold Plus Jakarta Sans headlines, technical performance highlights (TPS, latency), and stacked tech pills.
- **Interactive State:** Hover elevates card by 3px with warm taupe shadow and tints the perimeter border with slate-teal (`rgba(46, 66, 67, 0.4)`).

### Experience Timeline (Fintech & Insurance Vector)
- **Track:** 2px vertical spine styled in warm parchment tan (`rgba(131, 116, 109, 0.12)`).
- **Milestone Nodes:** Outer circle in warm taupe (`#83746d`), centered with a slate-teal pulsating core (`#2e4243`).
- **Content Blocks:** Offset editorial cards featuring role, company (e.g., Mumbai fintech/insurtech firms), volume handled, and architectural milestones achieved.

### Input Fields & Search Bars
- **Container:** Background `#ffffff`, border 1px solid `rgba(131, 116, 109, 0.15)`, radius 8px, typography `Plus Jakarta Sans` 15px.
- **Focus State:** 1.5px border in terracotta brown (`#8e7164`) with an ambient ring `0 0 0 3px rgba(142, 113, 100, 0.15)`.
- **Placeholder:** `#8c7365`.

### Modal Popups (System Architecture Previews)
- **Backdrop:** Deep taupe scrim `rgba(131, 116, 109, 0.65)` with backdrop filter `blur(6px)`.
- **Dialog Shell:** Solid `#ffffff`, 20px radius, wrapped in an ultra-fine border `1px solid rgba(131, 116, 109, 0.1)`. Header integrates monospace API endpoints or schema signatures alongside close triggers styled in soft slate-teal hover states.