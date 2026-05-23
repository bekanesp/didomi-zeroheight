# Didomi Design System @ Zeroheight

The source of truth for the Didomi brand — colors, typography, slide
templates, illustrations, UI kits — plus the wiring that makes every AI
tool at Didomi (Claude Code, Claude Desktop, Claude Projects, Cursor)
brand-aware via the official [`@zeroheight/mcp-server`](https://www.npmjs.com/package/@zeroheight/mcp-server)
MCP.

Origin: this repo started life as a [Claude Design](https://claude.ai/design)
handoff bundle (`xqbG1ZXH1KzvLGHG995lxg`) that contained the finished
design system. We landed it here, rewrote a handful of relative paths so
it runs without modification, extracted W3C-DTCG tokens for Zeroheight
import, and wired up MCP so Claude can pull guidance from Zeroheight on
demand.

---

## Quick start

```bash
# 1. Render the slide gallery in a browser
npx serve .
open http://localhost:3000/slides/

# 2. Re-extract design tokens after editing colors_and_type.css
node tools/extract-tokens.mjs

# 3. Wire Zeroheight MCP into Claude Code (read mcp/README.md first)
export ZEROHEIGHT_CLIENT_ID="zhci_…"
export ZEROHEIGHT_ACCESS_TOKEN="zhat_…"
claude   # any session started here loads .mcp.json automatically
```

---

## Layout

```
.
├── README.md                # this file
├── HANDOFF.md               # original Claude Design handoff note
├── .mcp.json                # project-scoped Zeroheight MCP config
├── chats/                   # source-of-truth design conversation transcript
├── design-system/
│   ├── tokens/
│   │   ├── colors_and_type.css     # canonical CSS variables
│   │   └── tokens.json             # DTCG-format export (generated)
│   ├── fonts/                      # Montserrat (7 TTFs)
│   └── assets/
│       ├── logos/                  # 12 brand logos (Didomi + acquisitions)
│       ├── illustrations/          # 26 illustration SVGs
│       └── patterns/               # blur.svg (web/social only — NOT slides)
├── slides/
│   ├── index.html                  # gallery landing page
│   ├── templates.html              # 8 production slide templates
│   ├── blank-layouts.html          # blank layout variants
│   └── deck-stage.js               # auto-scaling deck web component
├── ui-kits/
│   ├── platform/index.html         # in-product UI kit
│   └── marketing-site/index.html   # marketing site UI kit
├── previews/
│   ├── preview.css
│   └── 01-15-*.html                # 15 component preview pages
├── tools/
│   ├── relocate-paths.sh           # repo-relative path rewriter
│   ├── extract-tokens.mjs          # CSS → DTCG tokens.json
│   ├── render-pdf.mjs              # any deck HTML → multi-page PDF
│   └── render-pptx.mjs             # any deck HTML → editable PPTX
└── mcp/
    ├── zeroheight.json             # drop-in MCP config snippet
    └── README.md                   # full wiring guide for Claude Code/Desktop/Cursor/Projects
```

---

## The 8 slide templates

All at 1920 × 1080. Live in [`slides/templates.html`](slides/templates.html).

| # | Class | Background | What it's for |
| --- | --- | --- | --- |
| 01 | `cover` | navy | Title slide |
| 02 | `agenda` | navy | Section intro with numbered items |
| 03 | `stat-slide` | navy | Dramatic statistic + outline art |
| 04 | `section-hd` | navy | Section header with centered gradient |
| 05 | `split` | offwhite | Content left / image card right |
| 06 | `stats-slide` | offwhite | 3 stats + navy card accent |
| 07 | `three-up` | offwhite | 3 numbered columns |
| 08 | `closing` | offwhite | Closing CTA + product mockup |

The deck-stage runtime gives you:

- ← / → / PgUp / PgDn / Space / Home / End for navigation
- `R` to reset to slide 1
- 1–9 to jump
- `Cmd-P` → "Save as PDF" produces 1 page per slide at design size,
  no chrome, no margins
- `slidechange` custom event for hooking in speaker-notes, analytics, etc.

---

## Powering brand-consistent AI output

This is the **MCP layer**. With Zeroheight wired as an MCP server, any
Claude session can pull brand guidance before generating output.

| What employees need | How it gets built |
| --- | --- |
| **PowerPoint / Google Slides decks** | The [`didomi-branded-deck` skill](~/.claude/skills/didomi-branded-deck/SKILL.md) generates editable PPTX from a prompt. It now reads tokens from `design-system/tokens/tokens.json` and template layouts from `slides/templates.html`. |
| **HTML decks** | Open `slides/templates.html` directly, duplicate the section you want, replace copy. Print-to-PDF or use `tools/render-pdf.mjs` for a clean export. |
| **Marketing content (blog, email, social)** | In any Claude session with the Zeroheight MCP wired (see [`mcp/README.md`](mcp/README.md)), Claude calls `get-page` on the Voice + Palette + Component pages before drafting. |
| **Webflow pages** | Combine Zeroheight MCP → `didomi-brand-audit` skill → `webflow-embed-deploy` skill. Audit checks brand compliance, deploy ships it. |
| **Claude Projects** | Paste the `zeroheight` block from [`mcp/zeroheight.json`](mcp/zeroheight.json) into the project's MCP settings on claude.ai. Tools instantly become available to that project. |
| **Cursor / Windsurf / VS Code** | Same JSON, paste into the editor's MCP settings panel. |

The MCP exposes three tools — `list-styleguides`, `list-pages`,
`get-page`. Claude picks them up automatically when relevant; you don't
have to memorise commands.

---

## Re-importing a refreshed design bundle

If Claude Design ships an updated bundle (new colors, new templates):

1. Download the tarball from `https://api.anthropic.com/v1/design/h/<id>`.
2. Extract over a temp dir.
3. Copy `colors_and_type.css`, `slides/*`, `assets/*`, `fonts/*`,
   `preview/*`, `ui_kits/*` into the matching folders here.
4. Run `bash tools/relocate-paths.sh` — idempotent path rewriter.
5. Run `node tools/extract-tokens.mjs` — regenerates `tokens.json`.
6. Push tokens to Zeroheight via the Token Manager UI (or build a small
   write-MCP — see [`mcp/README.md`](mcp/README.md) §5).
7. Commit + push.

---

## Verification (end-to-end)

```bash
# (a) Slides render at design fidelity
npx serve .
open http://localhost:3000/slides/templates.html   # all 8 templates, Montserrat, gradients

# (b) Tokens extract
node tools/extract-tokens.mjs
jq '.color.brand."electric-blue"' design-system/tokens/tokens.json
# → { "$value": "#465CEE", "$type": "color" }

# (c) MCP loads in Claude Code
# Start `claude` in this dir, then ask:
#   "list zeroheight styleguides"  → should call list-styleguides
#   "fetch the Didomi color page"  → should call get-page

# (d) Brand-aware deck
# In the same session: "make me a 3-slide deck about X"
# Claude will fetch guidance from Zeroheight and call the
# didomi-branded-deck skill which uses the tokens above.
```

---

## Related repos / skills

- [`~/.claude/skills/didomi-branded-deck/`](~/.claude/skills/didomi-branded-deck/) — PPTX/Google Slides deck generator
- [`~/.claude/skills/didomi-brand-audit/`](~/.claude/skills/didomi-brand-audit/) — Webflow brand-compliance audit
- [`~/Work/Code/Openclaw-DidomiDesignOps/`](/Users/briankane/Work/Code/Openclaw-DidomiDesignOps/) — design-ops governance
- [`~/Work/Code/DidomiBrandedDeckMaterials/`](/Users/briankane/Work/Code/DidomiBrandedDeckMaterials/) — legacy PPT assets
