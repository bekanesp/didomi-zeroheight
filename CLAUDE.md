# Kleos Mirror — Project Context

## What this is

One-shot snapshot mirror of the public Didomi Kleos design system into Brian's fresh Zeroheight workspace (account: `brian@sourcepoint.com`).

Source: https://kleos.didomi.io/62b372835 (publicly published Zeroheight share — `shareLink:true`, `externalViewer:true`, `needsPassword:false`).

Brian does NOT have admin access to the Kleos workspace, so this is a scrape-based mirror, not a Zeroheight-native fork.

## Locked decisions

- **Mirror as Didomi Kleos reference copy.** Preserve `kleos.*` token namespace, Didomi colors, Montserrat type, Didomi logos verbatim. No rebrand.
- **Embedded in this dir.** Working dir is `/Users/briankane/Work/Code/Zeroheight/`. Do NOT rename.
- **One-shot snapshot.** No cron, no GitHub Actions, no re-crawl. If Kleos updates upstream, manual re-run only.
- **Target workspace stays private.** No public share of the mirrored Zeroheight workspace (IP optics).

## Pipeline

1. `scraper/run.ts` — `firecrawl_map` → `firecrawl_crawl` → `firecrawl_extract` → writes `raw/kleos/<timestamp>/`.
2. `transform/normalize.ts` — `raw/kleos/<timestamp>/*` → `tokens/{core,semantic}/*.json` (DTCG) + `docs/{foundations,components,patterns}/*.md` + `assets/*`.
3. Manual push to GitHub repo → Zeroheight Design Tokens Manager + Markdown Sync.

## Tools used

- **Firecrawl MCP** (`mcp__firecrawl__firecrawl_map`, `firecrawl_crawl`, `firecrawl_extract`) — primary scraper. Handles React SPA hydration.
- **browser-harness skill** — fallback for any pages Firecrawl misses.
- **context-mode** (`ctx_fetch_and_index`) — index large crawl payloads for downstream search if needed.

## DTCG token namespace

```
kleos.color.brand.primary          → semantic: color.action.primary
kleos.typography.heading.h1        → semantic: typography.heading.large
kleos.spacing.scale.4              → semantic: spacing.md
```

All `$value` / `$type` fields per Design Tokens Community Group spec.

## Plan file

Full plan: [/Users/briankane/.claude/plans/can-we-check-to-abstract-book.md](/Users/briankane/.claude/plans/can-we-check-to-abstract-book.md)
