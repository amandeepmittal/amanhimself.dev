#!/usr/bin/env node

// Scrapes all-time pageviews and visitors from the public Fathom share page.
// Requires Playwright in the npx cache. Run `npx playwright --version` first
// to populate the cache if this script fails to find it.
//
// Usage: node scripts/fetch-blog-stats.mjs

import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const outputPath = path.join(ROOT, 'src', 'data', 'blogStats.json');
const FATHOM_SHARE_URL =
  'https://app.usefathom.com/share/habfbpub/amanhimself.dev';

// Resolve playwright from npx cache since it's not a project dependency.
function findPlaywright() {
  try {
    const npxDir = execSync(
      'find ~/.npm/_npx -name playwright -type d 2>/dev/null',
      { encoding: 'utf-8' }
    )
      .trim()
      .split('\n')[0];
    if (npxDir) {
      const require = createRequire(import.meta.url);
      return require(path.join(npxDir, 'index.js'));
    }
  } catch {}
  return import('playwright').then(m => m.default || m);
}

function parseStatNumber(str) {
  if (!str) return 0;
  str = str.trim().replace(/,/g, '');
  const multipliers = { k: 1_000, m: 1_000_000 };
  const match = str.match(/^([\d.]+)\s*([km])?$/i);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const mult = multipliers[match[2]?.toLowerCase()] || 1;
  return Math.round(num * mult);
}

const pw = await findPlaywright();

console.log('Launching browser...');
const browser = await pw.chromium.launch({ headless: true });
const page = await browser.newPage();

console.log(`Navigating to ${FATHOM_SHARE_URL}`);
await page.goto(FATHOM_SHARE_URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

// Open date picker and select "All Time"
console.log('Selecting "All Time" date range...');
const dateRangeButton = page.locator('text=/\\w+ \\d+ to \\w+ \\d+/').first();
await dateRangeButton.click();
await page.waitForTimeout(1000);

await page.locator('li[data-range-key="All Time"]').click();
await page.waitForTimeout(1000);

try {
  await page.locator('button:has-text("Apply")').click({ timeout: 2000 });
} catch {}

await page.waitForTimeout(5000);

// Parse stats from page text
const bodyText = await page.evaluate(() => document.body.innerText);
const lines = bodyText.split('\n').map(l => l.trim()).filter(Boolean);

let visitors = 0;
let pageviews = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i] === 'Site visitors' && i > 0) {
    visitors = parseStatNumber(lines[i - 1]);
  }
  if (lines[i] === 'Pageviews' && i > 0) {
    pageviews = parseStatNumber(lines[i - 1]);
  }
}

await browser.close();

if (!visitors && !pageviews) {
  console.error('Failed to extract stats from the page.');
  process.exit(1);
}

const stats = {
  pageviews,
  visitors,
  updatedAt: new Date().toISOString().split('T')[0],
};

await writeFile(outputPath, JSON.stringify(stats, null, 2) + '\n');
console.log(`Stats written to ${path.relative(ROOT, outputPath)}`);
console.log(JSON.stringify(stats, null, 2));
