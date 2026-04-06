#!/usr/bin/env node

// Scrapes blog stats from the public Fathom share page:
// - All-time pageviews and visitors
// - Most read blog posts from the last 90 days and 365 days
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

// --- Step 1: All-time stats ---
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
} catch {}

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

// --- Step 2: Most read posts (last 90 days) ---
console.log('Fetching most read posts (last 90 days)...');
await page.goto(`${FATHOM_SHARE_URL}?range=last_90_days`, {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(5000);

// Scrape all page rows (including non-blog like "/" and "/blog/")
function scrapeAllPages(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const pages = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('/') && !lines[i].includes(' ')) {
      pages.push({ path: lines[i], visitorsStr: lines[i + 1], viewsStr: lines[i + 2] });
    }
  }
  return pages;
}

// Click "Views" column header to sort by views (default is Page Visitors)
console.log('Sorting by Views...');
await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('*'));
  const el = all.find(
    e => e.textContent.trim() === 'Views' && e.children.length === 0 && e.offsetParent !== null
  );
  if (el) el.click();
});
await page.waitForTimeout(3000);

// Collect rows from the table
const allPages = scrapeAllPages(await page.evaluate(() => document.body.innerText));

// Filter to blog posts only, parse views, sort by views desc, take top 5
const mostReadParsed = allPages
  .filter(p => p.path.startsWith('/blog/') && p.path !== '/blog/')
  .map(p => ({
    slug: p.path.replace(/^\/blog\//, '').replace(/\/$/, ''),
    views: parseStatNumber(p.viewsStr),
  }))
  .filter(p => p.views > 0)
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

console.log('Most read (last 90 days):');
for (const p of mostReadParsed) {
  console.log(`  ${p.slug}: ${p.views} views`);
}

// --- Step 3: Most read posts (last 365 days) ---
console.log('Fetching most read posts (last 365 days)...');
await page.goto(`${FATHOM_SHARE_URL}?range=last_365_days`, {
  waitUntil: 'networkidle',
});
await page.waitForTimeout(5000);

console.log('Sorting by Views (365 days)...');
await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll('*'));
  const el = all.find(
    e => e.textContent.trim() === 'Views' && e.children.length === 0 && e.offsetParent !== null
  );
  if (el) el.click();
});
await page.waitForTimeout(3000);

const allPages365 = scrapeAllPages(await page.evaluate(() => document.body.innerText));

const mostRead365Parsed = allPages365
  .filter(p => p.path.startsWith('/blog/') && p.path !== '/blog/')
  .map(p => ({
    slug: p.path.replace(/^\/blog\//, '').replace(/\/$/, ''),
    views: parseStatNumber(p.viewsStr),
  }))
  .filter(p => p.views > 0)
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);

console.log('Most read (last 365 days):');
for (const p of mostRead365Parsed) {
  console.log(`  ${p.slug}: ${p.views} views`);
}

await browser.close();

// Only update blogStats.json when all-time totals have increased.
// Fathom revises historical data (bot filtering) and its abbreviated display
// values (e.g. "834.3k") lose precision when scraped, so freshly scraped
// totals can be lower than a previous run.
let existing = { pageviews: 0, visitors: 0 };
try {
  existing = JSON.parse(await readFile(outputPath, 'utf-8'));
} catch {}

if (pageviews < existing.pageviews || visitors < existing.visitors) {
  console.log(
    `\nAll-time totals regressed (pageviews: ${existing.pageviews} -> ${pageviews}, visitors: ${existing.visitors} -> ${visitors}). Skipping update.`
  );
  process.exit(0);
}

const stats = {
  pageviews,
  visitors,
  mostRead: mostReadParsed,
  mostRead365: mostRead365Parsed,
  updatedAt: new Date().toISOString().split('T')[0],
};

await writeFile(outputPath, JSON.stringify(stats, null, 2) + '\n');
console.log(`\nStats written to ${path.relative(ROOT, outputPath)}`);
