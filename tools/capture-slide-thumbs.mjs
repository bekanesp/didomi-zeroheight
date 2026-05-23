#!/usr/bin/env node
// Capture per-slide PNGs at 1920×1080 + downscaled @2x thumbnails for Zeroheight.
// Writes to out/thumbs/slide-NN.png and out/thumbs/slide-NN@2x.png.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const inputPath = path.resolve(repoRoot, 'slides/templates.html');
const outDir = path.resolve(repoRoot, 'out/thumbs');
fs.mkdirSync(outDir, { recursive: true });

const playwright = await import('playwright');
const browser = await playwright.chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(pathToFileURL(inputPath).href, { waitUntil: 'networkidle' });

  // Force noscale so we capture authored geometry.
  await page.evaluate(() => {
    const stage = document.querySelector('deck-stage');
    stage.setAttribute('noscale', '');
  });

  const slides = await page.$$('deck-stage > section');
  console.log(`Found ${slides.length} slides — capturing…`);

  for (let i = 0; i < slides.length; i++) {
    await page.evaluate((idx) => {
      const all = document.querySelectorAll('deck-stage > section');
      all.forEach((el, j) => {
        if (j === idx) el.setAttribute('data-deck-active', '');
        else el.removeAttribute('data-deck-active');
      });
    }, i);
    await page.waitForTimeout(150);
    const n = String(i + 1).padStart(2, '0');
    const fullPath = path.join(outDir, `slide-${n}.png`);
    await slides[i].screenshot({ path: fullPath, omitBackground: false });
    console.log('  wrote', path.relative(repoRoot, fullPath));
  }
} finally {
  await browser.close();
}
console.log('Done. Thumbs in', path.relative(repoRoot, outDir));
