#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const contentDir = path.join(ROOT, 'src', 'content', 'blog');
const outputPath = path.join(ROOT, 'public', 'llms.txt');

const siteMeta = await readSiteMeta();

const files = await readdir(contentDir);
const markdownFiles = files.filter(file => file.endsWith('.md')).sort();

const sections = [];

for (const file of markdownFiles) {
  const filePath = path.join(contentDir, file);
  const raw = await readFile(filePath, 'utf-8');

  let title = file.replace(/\.md$/, '');
  let body = raw;

  const frontMatterMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[1];
    const titleMatch = frontMatter.match(/title:\s*['"]?(.+?)['"]?\s*$/m);
    if (titleMatch) {
      title = titleMatch[1];
    }
    body = raw.slice(frontMatterMatch[0].length);
  }

  sections.push(
    [
      `## ${title}`,
      `Slug: ${file.replace(/\.md$/, '')}`,
      '',
      body.trim()
    ].join('\n')
  );
}

const header = [
  siteMeta.title,
  siteMeta.author,
  siteMeta.desc,
  '',
  `Generated on ${new Date().toISOString()}`,
  'Contains the markdown content of each blog post.'
].join('\n');

const output = [header, ...sections].join('\n\n---\n\n');

await writeFile(outputPath, output, 'utf-8');

console.log(
  `llms.txt generated with ${sections.length} entries at ${path.relative(
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
  const author = matchField(siteBlock, 'author');
  const desc = matchField(siteBlock, 'desc');
  return { title, author, desc };
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
