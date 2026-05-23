#!/usr/bin/env node
// Render any deck-stage HTML file to a multi-page PDF (1 slide per page,
// 1920×1080, no chrome). Leverages the deck-stage runtime's built-in
// `@media print` rules, so output matches Cmd-P → Save as PDF byte-for-byte.
//
// Usage:
//   node tools/render-pdf.mjs slides/templates.html out/templates.pdf
//
// First run installs Playwright Chromium (~150 MB). Subsequent runs are fast.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const [, , inputArg, outputArg] = process.argv;
if (!inputArg) {
  console.error('Usage: node tools/render-pdf.mjs <input.html> [output.pdf]');
  process.exit(1);
}
const inputPath  = path.resolve(repoRoot, inputArg);
const outputPath = path.resolve(repoRoot, outputArg ?? inputArg.replace(/\.html?$/, '.pdf'));

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

const browser = await playwright.chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();

  // file:// URL so relative asset paths resolve.
  const url = pathToFileURL(inputPath).href;
  await page.goto(url, { waitUntil: 'networkidle' });

  // The deck-stage `@media print` block paginates each slide automatically.
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await page.pdf({
    path: outputPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    preferCSSPageSize: true,
  });
  console.log('Wrote', path.relative(repoRoot, outputPath));
} finally {
  await browser.close();
}
