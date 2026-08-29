import type { CollectionEntry } from 'astro:content';

const MIN_LENGTH = 40;
const MAX_LENGTH = 160;
const FENCE = /^(```|~~~)/;
const NON_PROSE_START = /^(!\[|<|>|#|\||[-*+] |\d+\. |import |export |\{)/;
const META_LINE = /^(originally published|updated:|updated on|last update)/i;

const isProse = (line: string) => !NON_PROSE_START.test(line);

const stripMarkdown = (text: string) =>
  text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const truncate = (text: string) => {
  if (text.length <= MAX_LENGTH) return text;
  const window = text.slice(0, MAX_LENGTH);
  const sentenceEnd = Math.max(
    window.lastIndexOf('. '),
    window.lastIndexOf('? '),
    window.lastIndexOf('! ')
  );
  if (sentenceEnd >= MAX_LENGTH / 2) return window.slice(0, sentenceEnd + 1);
  return `${window.slice(0, window.lastIndexOf(' '))}…`;
};

export const extractDescription = (body: string) => {
  const lines = body.split('\n').map(line => line.trim());
  let inFence = false;
  let shortCandidate = '';
  let i = 0;
  while (i < lines.length) {
    if (FENCE.test(lines[i])) {
      inFence = !inFence;
      i += 1;
      continue;
    }
    if (inFence || lines[i] === '') {
      i += 1;
      continue;
    }
    const block: string[] = [];
    while (i < lines.length && lines[i] !== '' && !FENCE.test(lines[i])) {
      block.push(lines[i]);
      i += 1;
    }
    if (!isProse(block[0])) continue;
    const text = stripMarkdown(block.join(' '));
    if (META_LINE.test(text)) continue;
    if (text.length >= MIN_LENGTH) return truncate(text);
    shortCandidate ||= text;
  }
  return shortCandidate;
};

export const postDescription = (post: CollectionEntry<'blog'>) =>
  post.data.description.trim() || extractDescription(post.body ?? '');
