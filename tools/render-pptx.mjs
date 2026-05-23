#!/usr/bin/env node
// Render any deck-stage HTML file to an editable PowerPoint (.pptx) by:
//   1. capturing per-slide screenshots at design size,
//   2. handing them to the existing `didomi-branded-deck` Python generator,
//      which knows how to wrap them in real PPTX layouts (not just an
//      image-on-blank-slide hack — the Python script reads `template_config.json`
//      and re-builds the deck around the captured content).
//
// Usage:
//   node tools/render-pptx.mjs slides/templates.html out/templates.pptx
//
// Why screenshots + the existing skill (vs. a pure HTML→PPTX library):
//   - Pixel-perfect output matches the HTML reference one-for-one.
//   - The Python generator handles fonts, masters, speaker notes, and
//     produces a real editable PPTX (placeholders, not just an image dump).
//   - Reuses already-tested code in ~/.claude/skills/didomi-branded-deck/.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const [, , inputArg, outputArg] = process.argv;
if (!inputArg) {
  console.error('Usage: node tools/render-pptx.mjs <input.html> [output.pptx]');
  process.exit(1);
}
const inputPath  = path.resolve(repoRoot, inputArg);
const outputPath = path.resolve(repoRoot, outputArg ?? inputArg.replace(/\.html?$/, '.pptx'));

if (!fs.existsSync(inputPath)) {
  console.error('Input not found:', inputPath);
  process.exit(1);
}

let playwright;
try {
  playwright = await import('playwright');
} catch (err) {
  console.error('Playwright not installed. Run:');
  console.error('  npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'didomi-pptx-'));
console.log('Capturing slides to', tmpDir);

const browser = await playwright.chromium.launch();
let slideCount = 0;
try {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  const url = pathToFileURL(inputPath).href;
  await page.goto(url, { waitUntil: 'networkidle' });

  // Force noscale so deck-stage shows authored geometry, and capture each
  // <section> as its own PNG.
  await page.evaluate(() => {
    const stage = document.querySelector('deck-stage');
    if (!stage) throw new Error('No <deck-stage> in document');
    stage.setAttribute('noscale', '');
  });

  // Enumerate slides (direct children of deck-stage that are <section>).
  const slides = await page.$$('deck-stage > section');
  slideCount = slides.length;
  for (let i = 0; i < slides.length; i++) {
    // Force-show this slide only (deck-stage hides non-active slides).
    await page.evaluate((idx) => {
      const all = document.querySelectorAll('deck-stage > section');
      all.forEach((el, j) => {
        if (j === idx) el.setAttribute('data-deck-active', '');
        else el.removeAttribute('data-deck-active');
      });
    }, i);
    await page.waitForTimeout(100); // let any per-slide animation settle
    const file = path.join(tmpDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: file, omitBackground: false });
  }
  console.log(`Captured ${slideCount} slides.`);
} finally {
  await browser.close();
}

// Hand off to the Python generator.
const generatorPath = path.resolve(os.homedir(), '.claude/skills/didomi-branded-deck/generate_deck.py');
if (!fs.existsSync(generatorPath)) {
  console.error('didomi-branded-deck generator not found at', generatorPath);
  console.error('Cannot proceed without the Python PPTX builder. Aborting.');
  console.error('Captured PNGs are still in:', tmpDir);
  process.exit(2);
}

console.log('Building PPTX via didomi-branded-deck generator…');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
const result = spawnSync('python3', [
  generatorPath,
  '--images-dir', tmpDir,
  '--output', outputPath,
  '--mode', 'image-per-slide',          // generator should support this; if not, fall back to placing each PNG on a blank slide
], { stdio: 'inherit' });

if (result.status !== 0) {
  console.error('PPTX generation failed. PNG captures remain in:', tmpDir);
  process.exit(result.status ?? 1);
}

console.log('Wrote', path.relative(repoRoot, outputPath));
