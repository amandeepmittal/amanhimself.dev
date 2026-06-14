#!/usr/bin/env node

// Scrapes all-time pageviews and visitors from the public Fathom share page
// and writes them to src/data/blogStats.json (shown on the /blog page).
//
// Requires Playwright in the npx cache. Run `npx playwright --version` first
// to populate the cache if this script fails to find it.
//
// Usage: node scripts/fetch-blog-stats.mjs

import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
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
  } catch {
    /* npx-installed playwright not resolvable; fall through to direct import below */
  }
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

// --- All-time stats ---
console.log('Fetching all-time stats...');
await page.goto(FATHOM_SHARE_URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

const dateRangeButton = page.locator('text=/\\w+ \\d+ to \\w+ \\d+/').first();
await dateRangeButton.click();
await page.waitForTimeout(1000);

await page.locator('li[data-range-key="All Time"]').click();
await page.waitForTimeout(1000);

try {
  await page.locator('button:has-text("Apply")').click({ timeout: 2000 });
} catch {
  /* "Apply" button may not be present; the range can already be applied */
}

await page.waitForTimeout(5000);

const bodyText = await page.evaluate(() => document.body.innerText);
const lines = bodyText.split('\n').map(l => l.trim()).filter(Boolean);

// Search a window of lines around each label to find the stat number,
// since Fathom UI rebuilds can shift the number above or below the label.
function findStatNear(lines, label) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase() === label.toLowerCase()) {
      const window = 3;
      for (let offset = 1; offset <= window; offset++) {
        if (i - offset >= 0) {
          const val = parseStatNumber(lines[i - offset]);
          if (val > 0) return val;
        }
        if (i + offset < lines.length) {
          const val = parseStatNumber(lines[i + offset]);
          if (val > 0) return val;
        }
      }
    }
  }
  return 0;
}

let visitors = findStatNear(lines, 'Site visitors');
let pageviews = findStatNear(lines, 'Pageviews');

if (!visitors || !pageviews) {
  console.error(
    `Failed to extract all-time stats (visitors=${visitors}, pageviews=${pageviews}).`
  );
  console.error('Debug: first 30 lines of page text:');
  lines.slice(0, 30).forEach((l, i) => console.error(`  [${i}] ${l}`));
  await browser.close();
  process.exit(1);
}

console.log(`All-time: ${visitors} visitors, ${pageviews} pageviews`);

await browser.close();

// Only update blogStats.json when all-time totals have increased.
// Fathom revises historical data (bot filtering) and its abbreviated display
// values (e.g. "834.3k") lose precision when scraped, so freshly scraped
// totals can be lower than a previous run.
let existing = { pageviews: 0, visitors: 0 };
try {
  existing = JSON.parse(await readFile(outputPath, 'utf-8'));
} catch {
  /* no existing stats file or invalid JSON; keep the defaults above */
}

if (pageviews < existing.pageviews || visitors < existing.visitors) {
  console.log(
    `\nAll-time totals regressed (pageviews: ${existing.pageviews} -> ${pageviews}, visitors: ${existing.visitors} -> ${visitors}). Skipping update.`
  );
  process.exit(0);
}

const stats = {
  pageviews,
  visitors,
  updatedAt: new Date().toISOString().split('T')[0],
};

await writeFile(outputPath, JSON.stringify(stats, null, 2) + '\n');
console.log(`\nStats written to ${path.relative(ROOT, outputPath)}`);
