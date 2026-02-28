#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const contentDir = path.join(ROOT, 'src', 'content', 'blog');
const outputPath = path.join(ROOT, 'public', 'llms.txt');

const siteMeta = await readSiteMeta();

const files = await readdir(contentDir);
const markdownFiles = files.filter(file => file.endsWith('.md'));

const entries = [];

for (const file of markdownFiles) {
  const filePath = path.join(contentDir, file);
  const raw = await readFile(filePath, 'utf-8');

  const slug = file.replace(/\.md$/, '');
  let title = slug;
  let pubDate = null;

  const frontMatterMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[1];
    const titleMatch = frontMatter.match(/title:\s*['"]?(.+?)['"]?\s*$/m);
    if (titleMatch) {
      title = titleMatch[1];
    }
    const dateMatch = frontMatter.match(/pubDatetime:\s*(.+)$/m);
    if (dateMatch) {
      pubDate = new Date(dateMatch[1].trim());
    }
  }

  entries.push({ title, slug, pubDate });
}

entries.sort((a, b) => {
  if (a.pubDate && b.pubDate) return b.pubDate - a.pubDate;
  if (a.pubDate) return -1;
  if (b.pubDate) return 1;
  return a.slug.localeCompare(b.slug);
});

const links = entries.map(
  ({ title, slug }) =>
    `- [${title}](${siteMeta.website}blog/${slug}/)`
);

const header = [
  `# ${siteMeta.title}`,
  '',
  `> ${siteMeta.desc}`,
].join('\n');

const socials = [
  '',
  '## Links',
  '',
  '- [GitHub](https://github.com/amandeepmittal)',
  '- [X](https://x.com/amanhimself)',
  '- [LinkedIn](https://www.linkedin.com/in/aman-mittal-05a239117/)',
];

const output = [header, '', ...links, ...socials].join('\n');

await writeFile(outputPath, output, 'utf-8');

console.log(
  `llms.txt generated with ${entries.length} entries at ${path.relative(
    ROOT,
    outputPath
  )}`
);

async function readSiteMeta() {
  const configPath = path.join(ROOT, 'src', 'config.ts');
  const raw = await readFile(configPath, 'utf-8');
  const siteMatch = raw.match(
    /export const SITE[^=]*=\s*\{([\s\S]*?)\n\};/
  );
  if (!siteMatch) {
    throw new Error('Unable to locate SITE export in src/config.ts');
  }
  const siteBlock = siteMatch[1];
  const title = matchField(siteBlock, 'title');
  const desc = matchField(siteBlock, 'desc');
  const website = matchField(siteBlock, 'website');
  return { title, desc, website };
}

function matchField(block, field) {
  const regex = new RegExp(
    `${field}\\s*:\\s*([\\'"\\\`])(.*?)\\1,`
  );
  const match = block.match(regex);
  if (!match) {
    throw new Error(`Unable to read ${field} from SITE config`);
  }
  return match[2];
}
