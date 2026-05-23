# Slide templates

The Didomi deck system: 8 canonical templates @ 1920 × 1080, all built on the
same foundations (Montserrat, Electric Blue, Navy / Offwhite backgrounds).

| # | Template | Background | When to use |
|---|---|---|---|
| 1 | [Cover](./cover) | Navy (#04092D) | Opens any deck. |
| 2 | [Agenda · Section intro](./agenda) | Navy (#04092D) | Section-opener. |
| 3 | [Stat callout](./stat-callout) | Navy (#04092D) | Driving home a single dramatic number. |
| 4 | [Section header](./section-header) | Navy (#04092D) | Major-section transition. |
| 5 | [Split intro](./split-intro) | Offwhite (#F4F3F3) | First content slide after a navy section. |
| 6 | [Stats + navy card accent](./stats-navy-card) | Offwhite (#F4F3F3) | Proof points. |
| 7 | [Three-up · benefits](./three-up) | Offwhite (#F4F3F3) | "Why us" / "What you get" layout. |
| 8 | [Closing · CTA](./closing) | Offwhite (#F4F3F3) | End-of-deck call to action. |

## Foundations

These templates use the design tokens documented in [Foundations](#):

- **Color:** Navy `#04092D`, Offwhite `#F4F3F3`, Electric Blue `#465CEE`, Pink `#FF859A`.
- **Type:** Montserrat — Display sizes 56–180px, body 22px @ 1.5 line-height.
- **Layout:** 1920×1080 canvas, 80px top/bottom × 100px sides.
- **Logo bar:** top-left, 26px high wordmark, ≤14px section eyebrow.

## How to use

1. Open [the full deck](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html) in a browser to see all 8 templates at design size with keyboard nav.
2. Pick the template that matches your slide intent.
3. Copy its HTML snippet (each page has one) and paste into your own `.html` file alongside `design-system/tokens/colors_and_type.css` + `deck-stage.js`.
4. Print to PDF (`Cmd-P` → Save as PDF) or generate a PPTX via the [didomi-branded-deck Claude skill](https://github.com/bekanesp/didomi-zeroheight).

## AI-assisted generation

When you have the **Sourcepoint by Didomi Design System** MCP wired into Claude Code (one command:
`claude mcp add --transport http sourcepoint-by-didomi-design-system "https://mcp.zeroheight.com/mcp/28efaab872fcf03c0806ba559b4e96165c19716c"`), ask Claude:

> "Make me a 3-slide intro deck about Q3 launch using the Didomi cover, three-up, and closing templates"

Claude pulls these pages, the Foundations pages, and the Brand Voice — then generates a deck that's on-brand on the first try.

---

_Index auto-generated from `tools/build-zeroheight-pages.mjs`._
