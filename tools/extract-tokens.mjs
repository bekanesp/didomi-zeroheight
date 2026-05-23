#!/usr/bin/env node
// Parse design-system/tokens/colors_and_type.css → DTCG tokens.json.
// Output shape follows the W3C Design Tokens Community Group draft, which is
// what Zeroheight's Token Manager imports.
//
// Usage:
//   node tools/extract-tokens.mjs [input.css] [output.json]
//
// Defaults: design-system/tokens/colors_and_type.css → design-system/tokens/tokens.json

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const inputPath = process.argv[2] || path.join(repoRoot, 'design-system/tokens/colors_and_type.css');
const outputPath = process.argv[3] || path.join(repoRoot, 'design-system/tokens/tokens.json');

const css = fs.readFileSync(inputPath, 'utf8');

// Pull every `--name: value;` line out of `:root { … }`.
// (We intentionally only read :root, not .on-dark — the dark-mode flip is a
// semantic theme layered on top, expressed as a separate token set later.)
const rootBlockMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
if (!rootBlockMatch) {
  console.error('No :root block found in', inputPath);
  process.exit(1);
}
const rootBlock = rootBlockMatch[1];

const decls = {};
const declRe = /--([a-z0-9-]+)\s*:\s*([^;]+?)\s*;/gi;
let m;
while ((m = declRe.exec(rootBlock))) {
  decls[m[1]] = m[2].trim();
}

// Resolve var(--x) references one pass deep so token values are self-contained.
// (DTCG supports `{path.to.alias}` but Zeroheight import is happier with flat
// resolved values plus our hand-written aliases below.)
const resolveRefs = (val) => {
  let out = val;
  let safety = 8;
  while (out.includes('var(') && safety-- > 0) {
    out = out.replace(/var\(--([a-z0-9-]+)(?:\s*,\s*[^)]*)?\)/gi, (_match, name) => decls[name] ?? `var(--${name})`);
  }
  return out;
};

// Classify token by its variable name.
const isHex = (v) => /^#[0-9a-f]{3,8}$/i.test(v);
const isRgba = (v) => /^rgba?\(/i.test(v);
const isLengthPx = (v) => /^-?\d+(\.\d+)?px$/i.test(v);
const isUnitless = (v) => /^-?\d+(\.\d+)?$/.test(v);
const isClamp = (v) => /^clamp\(/i.test(v);
const isShadow = (v) => /\d+px\s+\d+px/.test(v) && /(rgba?|#)/i.test(v);
const isFontStack = (v) => /['"]/.test(v) && /sans|serif|mono|cursive|system-ui/i.test(v);

const dtcg = {
  color:    {},
  font:     { family: {}, weight: {}, size: {}, lineHeight: {}, letterSpacing: {} },
  spacing:  {},
  radius:   {},
  shadow:   {},
  gradient: {},
  effect:   {},
};

const setNested = (obj, keys, value) => {
  let node = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    node[keys[i]] ??= {};
    node = node[keys[i]];
  }
  node[keys[keys.length - 1]] = value;
};

for (const [name, rawVal] of Object.entries(decls)) {
  const val = resolveRefs(rawVal);

  // ── colors ────────────────────────────────────────────────────────────
  if (isHex(val) || isRgba(val)) {
    // Bucket by name prefix so the Zeroheight import maps cleanly.
    let group, leaf;
    if (name.startsWith('dd-viz-')) {
      [group, leaf] = ['viz', name.replace(/^dd-viz-/, '')];
    } else if (name.startsWith('dd-light-')) {
      [group, leaf] = ['light', name.replace(/^dd-light-/, '')];
    } else if (name.startsWith('dd-blue-')) {
      [group, leaf] = ['blue', name.replace(/^dd-blue-/, '')];
    } else if (name.startsWith('dd-navy-')) {
      [group, leaf] = ['navy', name.replace(/^dd-navy-/, '')];
    } else if (name.startsWith('dd-slate-')) {
      [group, leaf] = ['slate', name.replace(/^dd-slate-/, '')];
    } else if (name.startsWith('dd-')) {
      [group, leaf] = ['brand', name.replace(/^dd-/, '')];
    } else if (/^(bg|fg|accent|border|divider|success|warning|danger)/.test(name)) {
      [group, leaf] = ['semantic', name];
    } else {
      [group, leaf] = ['raw', name];
    }
    setNested(dtcg.color, [group, leaf], { $value: val, $type: 'color' });
    continue;
  }

  // ── focus ring / generic shadows ───────────────────────────────────────
  if (name.startsWith('shadow-') || name === 'focus-ring' || isShadow(val)) {
    setNested(dtcg.shadow, [name.replace(/^shadow-/, '')], { $value: val, $type: 'shadow' });
    continue;
  }

  // ── gradients ──────────────────────────────────────────────────────────
  if (name.includes('gradient')) {
    setNested(dtcg.gradient, [name.replace(/^didomi-/, '')], { $value: val, $type: 'gradient' });
    continue;
  }

  // ── font family ────────────────────────────────────────────────────────
  if (name.startsWith('font-')) {
    const leaf = name.replace(/^font-/, '');
    setNested(dtcg.font.family, [leaf], { $value: val, $type: 'fontFamily' });
    continue;
  }

  // ── font weight ────────────────────────────────────────────────────────
  if (name.startsWith('fw-')) {
    const leaf = name.replace(/^fw-/, '');
    setNested(dtcg.font.weight, [leaf], { $value: Number(val) || val, $type: 'fontWeight' });
    continue;
  }

  // ── font size (px or clamp()) ──────────────────────────────────────────
  if (name.startsWith('fs-')) {
    const leaf = name.replace(/^fs-/, '');
    setNested(dtcg.font.size, [leaf], { $value: val, $type: 'dimension' });
    continue;
  }

  // ── line height (unitless) ─────────────────────────────────────────────
  if (name.startsWith('lh-')) {
    const leaf = name.replace(/^lh-/, '');
    setNested(dtcg.font.lineHeight, [leaf], { $value: isUnitless(val) ? Number(val) : val, $type: 'number' });
    continue;
  }

  // ── letter-spacing ────────────────────────────────────────────────────
  if (name.startsWith('tracking-')) {
    const leaf = name.replace(/^tracking-/, '');
    setNested(dtcg.font.letterSpacing, [leaf], { $value: val, $type: 'dimension' });
    continue;
  }

  // ── spacing scale ─────────────────────────────────────────────────────
  if (name.startsWith('sp-')) {
    const leaf = name.replace(/^sp-/, '');
    setNested(dtcg.spacing, [leaf], { $value: val, $type: 'dimension' });
    continue;
  }

  // ── radius ────────────────────────────────────────────────────────────
  if (name.startsWith('radius-')) {
    const leaf = name.replace(/^radius-/, '');
    setNested(dtcg.radius, [leaf], { $value: val, $type: 'dimension' });
    continue;
  }

  // ── catch-all (rare) ──────────────────────────────────────────────────
  setNested(dtcg.effect, [name], { $value: val, $type: 'other' });
}

// Top-level metadata so Zeroheight imports show provenance.
const output = {
  $description: 'Didomi Design System tokens, extracted from colors_and_type.css. Generated by tools/extract-tokens.mjs — do not edit by hand.',
  $extensions: {
    'com.didomi.source': path.relative(repoRoot, inputPath),
    'com.didomi.generatedAt': new Date().toISOString(),
  },
  ...dtcg,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');

const counts = {};
const countLeaves = (node, group) => {
  if (node && typeof node === 'object') {
    if ('$value' in node) {
      counts[group] = (counts[group] || 0) + 1;
      return;
    }
    for (const v of Object.values(node)) countLeaves(v, group);
  }
};
for (const [k, v] of Object.entries(dtcg)) countLeaves(v, k);

console.log('Wrote', path.relative(repoRoot, outputPath));
console.log('Token counts by group:');
for (const [k, n] of Object.entries(counts)) console.log(`  ${k.padEnd(10)} ${n}`);
console.log('Total:', Object.values(counts).reduce((a, b) => a + b, 0));
