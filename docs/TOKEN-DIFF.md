---
title: Kleos vs existing tokens.json — diff report
generated_at: 2026-05-23T14:30:00Z
source_kleos: scraped from kleos.didomi.io/62b372835 (2026-05-23)
source_tokens: design-system/tokens/tokens.json (from Claude Design bundle, 2026-05-23T13:40Z)
---

# Token diff — Kleos (live) vs existing tokens.json

## Key finding: Kleos has TWO color systems, not one

The existing [design-system/tokens/tokens.json](../design-system/tokens/tokens.json) is the **Brand** palette. Kleos's Product section uses a **different palette** for the application UI.

| System | Where | Primary fonts | Color naming | Status in this repo |
|---|---|---|---|---|
| **Brand** (marketing) | Kleos > Brand > Visual Identity | Montserrat (heading), Authentic Signature (signature) | `electric-blue`, `dark-navy`, `offwhite`, `pink`, `lilac`… | ✅ Fully captured in [tokens.json](../design-system/tokens/tokens.json) |
| **Product** (application UI) | Kleos > Product > Foundations | IBM Plex Serif (h1/h3), IBM Plex Sans (h2) | `blue-1..6`, `pink-0..5`, `red-4` (referenced), Abyss, Lagoon, Lila, Grey, Coral | ❌ NOT in tokens.json |

## Brand tokens — confirmed parity

Existing tokens.json captures the Brand system accurately. Spot-checks pass:

- ✅ Montserrat present as `font.family.sans` and `font.family.display`
- ✅ `#465CEE` (electric-blue) — matches Brand
- ✅ `#04092D` (dark-navy) — matches Brand
- ✅ `#FF859A` (pink) — matches Brand
- ✅ `#08D8A6` (green/success) — matches Brand
- ✅ Authentic Signature font registered as `font.family.signature`

Kleos Brand Colors page (Visual Identity > Colors) wasn't scrapable for hexes (CSS-rendered swatches, no text DOM). The names referenced — Electric Blue, Abyss, Lagoon, Lila, Grey, Coral — are **Product** palette names visible in the Kleos chrome, NOT Brand. So existing tokens.json is the canonical Brand source.

## Product tokens — missing from this repo

Captured from [docs/product/foundations/05-colors.md](product/foundations/05-colors.md):

### Blue (Product Primary)

| Token | Hex |
|---|---|
| `blue-1` | `#d1effa` |
| `blue-2` | `#84d1eb` |
| `blue-3` | `#2fabd5` |
| `blue-4` | `#3186af` |
| `blue-5` | `#265973` |
| `blue-6` | `#1d4153` |

### Pink (Product Secondary)

| Token | Hex |
|---|---|
| `pink-0` | `#fffbf9` |
| `pink-1` | `#fff6f2` |
| `pink-2` | `#fff0eb` |
| `pink-3` | `#ffd5c8` |
| `pink-4` | `#e58c71` |
| `pink-5` | `#d66a49` |

### Referenced but not extracted (need re-scrape or Figma)

- Secondary, Neutral, Shadows, Gradient palettes (CSS-rendered, no hex in DOM)
- `red-4` (referenced in error-patterns)
- Full Typography ladder beyond Headlines — Body, Button, Checkboxes, Field, Filter, Links, Single-purpose-widget, Small push, Table, Tabs, Tiempos (font ref!), Code, Tooltip, Widgets mapping

### Typography (Product)

- h1: `IBM Plex Serif` / 32px / line 37px / weight 400 / black / 0px letter-spacing
- h2: `IBM Plex Sans Bold` / 24px / line 31px / weight 700 / black
- h3: `IBM Plex Serif` (font size truncated in source)
- "Tiempos" appears as a separate token group — likely the Tiempos serif typeface (different from IBM Plex Serif)

**Note:** Product `font` ≠ Brand `font`. Two distinct typefaces. tokens.json today only has Brand fonts.

## Recommendations

1. **Don't merge Brand + Product into one tokens.json.** Keep two files: `tokens/brand.json` (existing) + `tokens/product.json` (new, populated from data above).
2. **Re-scrape Product/Colors with Firecrawl `branding` format** to extract Secondary/Neutral/Shadows/Gradient hexes — current scrape missed them.
3. **For Zeroheight Tokens Manager**, point at `tokens/` root so both files sync side-by-side.
4. **Confirm Tiempos licensing** before reproducing — it's a paid Klim Type Foundry typeface, not the same as free IBM Plex Serif.
