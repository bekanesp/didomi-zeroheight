# Zeroheight MCP — Brand-Aware Claude, Everywhere

Didomi's design system at **Sourcepoint by Didomi Design System** lives at
[zeroheight](https://zeroheight.com/6254fa778). Zeroheight exposes the
styleguide as a **remote MCP endpoint** — a single URL that Claude can
hit on demand to pull brand guidance (Color, Typography, Spacing,
Components, etc.) right at the moment of generation.

No env vars. No tokens to rotate. The URL itself is the auth and is
scoped to one styleguide.

---

## 1. Install (one command)

```bash
claude mcp add --transport http sourcepoint-by-didomi-design-system \
  "https://mcp.zeroheight.com/mcp/28efaab872fcf03c0806ba559b4e96165c19716c"
```

Writes a global entry to `~/.claude.json`. Every Claude Code session —
anywhere on disk — picks it up.

Verify:

```bash
claude mcp list | grep sourcepoint
# sourcepoint-by-didomi-design-system: https://mcp.zeroheight.com/mcp/... (HTTP) - ✓ Connected
```

Then in any session:

> list pages for sourcepoint by didomi design system

Claude calls `list-pages` and returns the navigation tree.

---

## 2. Wire into other hosts

The URL works in any MCP host that supports remote HTTP transport.

### Claude Desktop

Settings → Developer → "Edit Config" → add:

```json
{
  "mcpServers": {
    "sourcepoint-by-didomi-design-system": {
      "type": "http",
      "url": "https://mcp.zeroheight.com/mcp/28efaab872fcf03c0806ba559b4e96165c19716c"
    }
  }
}
```

### Cursor / Windsurf / VS Code (Claude extension)

Same JSON shape — paste into the editor's MCP settings panel.

### Claude Projects (claude.ai)

Project settings → MCP servers → "Add custom server" → paste the URL.

The drop-in snippet lives at [`./zeroheight.json`](./zeroheight.json).

---

## 3. What you get

Four tools, all read-only:

| Tool | What it does |
| --- | --- |
| `list-pages` | Returns the navigation tree of the design system (categories → pages → IDs). |
| `list-releases` | Lists published releases of the styleguide. Only call when the user mentions a specific release. |
| `get-page` | Returns the full content of one page by `pageId` — usage notes, code, attachments. |
| `get-page-images` | Returns the images on a page as base64 (for when you need the visual examples, not just the prose). |

Typical flow Claude follows on its own:

1. User asks: *"Write a 3-slide intro deck about our Q3 launch."*
2. Claude calls `list-pages` → sees Foundations / Components / Welcome.
3. Claude calls `get-page` on the Color and Typography pages.
4. Claude calls `get-page-images` if it needs to mirror a visual example.
5. Claude generates output using the local
   [`design-system/tokens/tokens.json`](../design-system/tokens/tokens.json)
   for the hex/sizes, with the Zeroheight content shaping voice and
   layout choices.
6. Output ships on-brand on the first try.

---

## 4. When the local repo and Zeroheight disagree

Designers edit Zeroheight live. The local
[`tokens.json`](../design-system/tokens/tokens.json) is a snapshot. If a
value differs:

- **Brand value (hex, font size, name)** — Zeroheight wins. Pull via
  `get-page` and update `tokens.json` to match (or regenerate from a
  fresh `colors_and_type.css`).
- **Slide template layout** — local `slides/templates.html` wins, because
  Zeroheight does not yet host the slide layouts as live components.
  They'll move to Zeroheight once we publish them as pages.

---

## 5. When you'd want write access

This MCP is read-only. If you need to:

- publish a new page from a markdown file,
- push tokens after a CSS change,
- mirror slide templates as Zeroheight pages automatically,

…build a small companion MCP using the
[Zeroheight REST API](https://developers.zeroheight.com/). Defer until
you actually need it.
