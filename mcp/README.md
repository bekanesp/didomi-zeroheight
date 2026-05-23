# Zeroheight MCP — Brand-Aware Claude, Everywhere

The Didomi design system lives at [zeroheight](https://zeroheight.com/). The
official `@zeroheight/mcp-server` exposes it as an MCP server so Claude (or
any MCP-aware AI) can look up brand guidance — colors, components, voice,
do/don't notes — **at the moment of generation**. Plug it in once and every
deck, blog post, email, Webflow page, or Claude Project that AI assists
becomes brand-aware by construction.

---

## 1. Get credentials

You need two env vars:

| Var | Looks like | Source |
| --- | --- | --- |
| `ZEROHEIGHT_CLIENT_ID` | `zhci_…` | zeroheight → Settings → API |
| `ZEROHEIGHT_ACCESS_TOKEN` | `zhat_…` | zeroheight → Settings → API → "Create token" |

Creation walkthrough: <https://developers.zeroheight.com/75fe5b2ed/p/6599ef-creation>.

**Storage:** put both in `~/.openclaw/openclaw.json` (or 1Password →
"Zeroheight API Credentials") alongside other secrets. Don't commit them.
Export them in your shell `.zshrc`:

```bash
export ZEROHEIGHT_CLIENT_ID="$(jq -r '.zeroheight.client_id' ~/.openclaw/openclaw.json)"
export ZEROHEIGHT_ACCESS_TOKEN="$(jq -r '.zeroheight.access_token' ~/.openclaw/openclaw.json)"
```

---

## 2. Wire it up

### Claude Code (project-scoped)

This repo already ships `.mcp.json` at the root. Any `claude` session
started from `Zeroheight/` (or anywhere via `--mcp-config`) will load it
automatically. Confirm with:

```bash
claude --mcp-config /Users/briankane/Work/Code/Zeroheight/.mcp.json
```

Then in the session:

> list zeroheight styleguides

You should see Claude call `list-styleguides`.

### Claude Code (global, every session)

Copy the `zeroheight` block from [`./zeroheight.json`](./zeroheight.json) into
`~/.claude.json`'s `mcpServers` object. Then every session — anywhere on
disk — has Zeroheight tools available.

### Claude Desktop

Settings → Developer → "Edit Config" → paste the `zeroheight` block from
[`./zeroheight.json`](./zeroheight.json) into `mcpServers`. Restart Claude
Desktop.

### Cursor / Windsurf / VS Code (with the Claude extension)

Each editor has an MCP settings panel — same JSON shape. Paste, save,
reload.

### Custom Claude Projects (claude.ai)

For Claude Projects on claude.ai, paste the same `zeroheight` block into
the project's MCP settings. The three tools become available inside that
project to every conversation.

---

## 3. What you get

Three tools, all read-only:

| Tool | What it does |
| --- | --- |
| `list-styleguides` | Returns every design system you have access to. Call first. |
| `list-pages` | Returns the navigation tree (categories, pages, tabs) of one styleguide. |
| `get-page` | Returns the full content of one page — usage notes, recommendations, code snippets. |

Typical flow Claude follows on its own:

1. User asks: *"Write a 3-slide intro deck about our Q3 launch."*
2. Claude calls `list-styleguides` → finds Didomi.
3. Claude calls `list-pages` → finds the Slide Templates section.
4. Claude calls `get-page` on Cover, Stat callout, Closing → reads usage
   rules, palette, do/don'ts.
5. Claude calls the local `didomi-branded-deck` skill (or generates HTML
   based on `slides/templates.html`) with token values pulled from
   `design-system/tokens/tokens.json`.
6. Output ships on-brand on the first try.

---

## 4. Telemetry opt-out

The MCP server reports errors to Sentry by default. To disable:

```jsonc
"env": {
  "ZEROHEIGHT_ACCESS_TOKEN": "…",
  "ZEROHEIGHT_CLIENT_ID": "…",
  "ZEROHEIGHT_MCP_DISABLE_TELEMETRY": "true"
}
```

---

## 5. When you'd want more than read-only

This MCP doesn't write to zeroheight. If you ever need to:

- publish a new page from a markdown file,
- push updated tokens after a CSS change,
- mirror slide templates as zeroheight pages automatically,

…build a small companion MCP using the
[zeroheight REST API](https://developers.zeroheight.com/) and wire it in
the same `.mcp.json`. Defer until you actually need it.
