#!/usr/bin/env node

// Scrapes blog stats from the public Fathom share page:
// - All-time pageviews and visitors
// - Most read blog posts from the last 90 days
//
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

if (!visitors && !pageviews) {
  console.error('Failed to extract all-time stats.');
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

const mostRead = await page.evaluate(() => {
  const text = document.body.innerText;
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // Find the "Pages" table section. Fathom renders rows as:
  // /blog/some-post/
  // 4.3k        (visitors)
  // 4.7k        (views)
  const posts = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('/blog/') && lines[i].endsWith('/')) {
      const slug = lines[i].replace(/^\/blog\//, '').replace(/\/$/, '');
      const viewsStr = lines[i + 2] || lines[i + 1] || '0';
      posts.push({ slug, viewsStr });
    }
  }
  return posts;
});

const mostReadParsed = mostRead
  .map(({ slug, viewsStr }) => ({
    slug,
    views: parseStatNumber(viewsStr),
  }))
  .filter(p => p.views > 0)
  .slice(0, 5);

console.log('Most read (last 90 days):');
for (const p of mostReadParsed) {
  console.log(`  ${p.slug}: ${p.views} views`);
}

await browser.close();

const stats = {
  pageviews,
  visitors,
  mostRead: mostReadParsed,
  updatedAt: new Date().toISOString().split('T')[0],
};

await writeFile(outputPath, JSON.stringify(stats, null, 2) + '\n');
console.log(`\nStats written to ${path.relative(ROOT, outputPath)}`);
