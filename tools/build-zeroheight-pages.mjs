#!/usr/bin/env node
// Build a `out/zeroheight-pages/` directory containing one Markdown file per
// slide template, formatted for paste-and-publish into Zeroheight.
//
// Each file has:
//   - Title + description
//   - Live preview embed (Zeroheight iframe block, points at GitHub Pages preview.html?slide=N)
//   - Screenshot
//   - Copy-paste HTML snippet (the <section> extracted from templates.html)
//   - Usage rules (background color, gradient placement, do/don't notes pulled from CSS comments)
//
// Run after `node tools/capture-slide-thumbs.mjs`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const templatesPath = path.resolve(repoRoot, 'slides/templates.html');
const outDir = path.resolve(repoRoot, 'out/zeroheight-pages');
fs.mkdirSync(outDir, { recursive: true });

const PAGES_BASE = 'https://bekanesp.github.io/didomi-zeroheight';

// Per-template metadata. Ordering must match the <section> ordering in templates.html.
const meta = [
  {
    n: 1, slug: 'cover', label: 'Cover',
    background: 'Navy (#04092D)',
    when: 'Opens any deck. Calm, declarative — let it breathe before speaking.',
    rules: [
      'Title caps at `max-width: 1200px`. Longer titles must break with `<br/>`.',
      'Gradient sits bottom-right, partly off-canvas. Never centered.',
      'Logo is the white wordmark (`didomi-logo-white.svg`), top-left.',
    ],
  },
  {
    n: 2, slug: 'agenda', label: 'Agenda · Section intro',
    background: 'Navy (#04092D)',
    when: 'Section-opener. Numbered list (typically 3 items) introducing what follows.',
    rules: [
      'Display word ("Agenda") uses Montserrat Light at 170px. Don\'t use Bold here.',
      'Numerals are solid white (not outlined). The outline numeral style is for `.three-up`, not `.agenda`.',
      'Keep to ≤4 items — beyond that the layout cramps.',
    ],
  },
  {
    n: 3, slug: 'stat-callout', label: 'Stat callout',
    background: 'Navy (#04092D)',
    when: 'Driving home a single dramatic number. Outline-icon grid visualises the proportion.',
    rules: [
      'Lead with the statement, the number, then the qualifier. Bolds (`<b>`) on the number and one qualifier word only.',
      'The 5×5 hand grid lights 5 of 25 cells = 20%. Swap the hand SVG for another outline glyph when the stat isn\'t about people.',
      'Don\'t mix this with `.section-hd` — pick one or the other for a section transition.',
    ],
  },
  {
    n: 4, slug: 'section-header', label: 'Section header',
    background: 'Navy (#04092D)',
    when: 'Major-section transition. Centered, single big title + supporting line.',
    rules: [
      'Gradient is the *graphic* — sits centered behind the title, blurred at 90px.',
      'Title caps at 140px; on a 1920 canvas anything wider needs a `<br/>` break.',
      'Subtitle is optional. If used, keep under two lines.',
    ],
  },
  {
    n: 5, slug: 'split-intro', label: 'Split intro',
    background: 'Offwhite (#F4F3F3)',
    when: 'First content slide after a navy section. Establishes context with a paired image.',
    rules: [
      'Logo bar gets the divider + "Section title" eyebrow on offwhite slides.',
      'Image card is 4:5 aspect with 24px radius. Always rounded — never sharp.',
      'Body copy capped at `max-width: 520px`. Don\'t fill the column edge-to-edge.',
    ],
  },
  {
    n: 6, slug: 'stats-navy-card', label: 'Stats + navy card accent',
    background: 'Offwhite (#F4F3F3)',
    when: 'Proof points. Three stats + the decorative navy "DIDOMI GROUP" card.',
    rules: [
      'Numbers are Electric Blue (#465CEE), Display weight 700, 84px.',
      'The gradient sits *behind* the navy card as graphic accent — **never inside** the card.',
      'Logo strip below the stats is placeholder-style — replace with real client logos at SVG/PNG.',
    ],
  },
  {
    n: 7, slug: 'three-up', label: 'Three-up · benefits',
    background: 'Offwhite (#F4F3F3)',
    when: '"Why us" / "What you get" layout. Three parallel benefits, each with its own outline numeral.',
    rules: [
      'Outline numerals (1.5px stroke, transparent fill) — `.three-up` uses Electric Blue. Different from `.agenda` numerals.',
      'Title uses Montserrat Regular at 72px with a single Bold word for emphasis.',
      'Top-right gradient is half-off-canvas at 75% opacity.',
    ],
  },
  {
    n: 8, slug: 'closing', label: 'Closing · CTA',
    background: 'Offwhite (#F4F3F3)',
    when: 'End-of-deck call to action. Headline + supporting line + product mockup.',
    rules: [
      'Mockup bleeds off-canvas — `margin-right: -100px` on the .mock element is intentional.',
      'Tile bars are progress indicators; the lighter the bar, the further along the user is.',
      'Don\'t introduce new colors here — must end on the same palette the deck opened with.',
    ],
  },
];

// Extract per-section HTML from templates.html
const fullHtml = fs.readFileSync(templatesPath, 'utf8');
const sectionRegex = /<section\s+class="([^"]+)"\s+data-label="([^"]+)"[^>]*>([\s\S]*?)<\/section>/g;
const sections = [];
let m;
while ((m = sectionRegex.exec(fullHtml))) {
  sections.push({ classAttr: m[1], label: m[2], inner: m[3], full: m[0] });
}
if (sections.length !== 8) {
  console.warn(`Expected 8 sections, found ${sections.length} — proceeding anyway`);
}

for (const item of meta) {
  const s = sections[item.n - 1];
  if (!s) {
    console.warn(`No section found for slide ${item.n}; skipping.`);
    continue;
  }

  const previewUrl = `${PAGES_BASE}/slides/preview.html?slide=${item.n}&embed=1`;
  const fullDeckUrl = `${PAGES_BASE}/slides/templates.html`;
  const screenshotUrl = `${PAGES_BASE}/out/thumbs/slide-${String(item.n).padStart(2, '0')}.png`;
  const htmlSnippet = s.full.trim();

  const body = `# ${item.n}. ${item.label}

**Template class:** \`.${s.classAttr.split(' ').filter(c => c !== 'bg-navy' && c !== 'bg-offwhite').join('.')}\`
**Background:** ${item.background}
**Canvas:** 1920 × 1080

> ${item.when}

## Live preview

<iframe
  src="${previewUrl}"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](${fullDeckUrl}#s${item.n}) · [Open standalone →](${previewUrl.replace('&embed=1', '')})

## Screenshot

![${item.label}](${screenshotUrl})

## Usage rules

${item.rules.map(r => `- ${r}`).join('\n')}

## HTML snippet (copy-paste)

\`\`\`html
${htmlSnippet}
\`\`\`

## Foundations used

- Color tokens: see [Foundations · Color](#) (electric blue ${item.background.includes('Navy') ? '#465CEE on navy' : '#465CEE on offwhite'}, ${item.background.includes('Navy') ? 'offwhite text #F4F3F3' : 'navy text #04092D'})
- Type: Montserrat (Display weights 300, 400, 700)
- Spacing: 80px top/bottom, 100px sides (matches every slide in the system)
- Gradient: \`--didomi-gradient\` — see [Foundations · Brand gradient](${PAGES_BASE}/previews/06-brand-gradient.html)

---

_Auto-generated from \`slides/templates.html\` by \`tools/build-zeroheight-pages.mjs\`. To refresh: edit the template, re-run the tool, repaste this page._
`;

  const outPath = path.join(outDir, `${String(item.n).padStart(2, '0')}-${item.slug}.md`);
  fs.writeFileSync(outPath, body);
  console.log('Wrote', path.relative(repoRoot, outPath), `(${body.length} bytes)`);
}

// Also write an index page that goes at the top of "Slide templates" category.
const indexBody = `# Slide templates

The Didomi deck system: 8 canonical templates @ 1920 × 1080, all built on the
same foundations (Montserrat, Electric Blue, Navy / Offwhite backgrounds).

| # | Template | Background | When to use |
|---|---|---|---|
${meta.map(m => `| ${m.n} | [${m.label}](./${m.slug}) | ${m.background} | ${m.when.split('.')[0]}. |`).join('\n')}

## Foundations

These templates use the design tokens documented in [Foundations](#):

- **Color:** Navy \`#04092D\`, Offwhite \`#F4F3F3\`, Electric Blue \`#465CEE\`, Pink \`#FF859A\`.
- **Type:** Montserrat — Display sizes 56–180px, body 22px @ 1.5 line-height.
- **Layout:** 1920×1080 canvas, 80px top/bottom × 100px sides.
- **Logo bar:** top-left, 26px high wordmark, ≤14px section eyebrow.

## How to use

1. Open [the full deck](${PAGES_BASE}/slides/templates.html) in a browser to see all 8 templates at design size with keyboard nav.
2. Pick the template that matches your slide intent.
3. Copy its HTML snippet (each page has one) and paste into your own \`.html\` file alongside \`design-system/tokens/colors_and_type.css\` + \`deck-stage.js\`.
4. Print to PDF (\`Cmd-P\` → Save as PDF) or generate a PPTX via the [didomi-branded-deck Claude skill](https://github.com/bekanesp/didomi-zeroheight).

## AI-assisted generation

When you have the **Sourcepoint by Didomi Design System** MCP wired into Claude Code (one command:
\`claude mcp add --transport http sourcepoint-by-didomi-design-system "https://mcp.zeroheight.com/mcp/28efaab872fcf03c0806ba559b4e96165c19716c"\`), ask Claude:

> "Make me a 3-slide intro deck about Q3 launch using the Didomi cover, three-up, and closing templates"

Claude pulls these pages, the Foundations pages, and the Brand Voice — then generates a deck that's on-brand on the first try.

---

_Index auto-generated from \`tools/build-zeroheight-pages.mjs\`._
`;

fs.writeFileSync(path.join(outDir, '00-index.md'), indexBody);
console.log('Wrote out/zeroheight-pages/00-index.md');

console.log('\nAll done. Pages are in', path.relative(repoRoot, outDir));
console.log('Next: open zeroheight, go to "Components" → "Add page" → paste each Markdown file.');
