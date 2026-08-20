import type { RemarkPlugin } from '@astrojs/markdown-remark';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export const remarkReadingTime: RemarkPlugin = () => (tree, file) => {
  const frontmatter = file.data.astro?.frontmatter;

  if (!frontmatter) return;

  const readingTime = getReadingTime(toString(tree));

  frontmatter.readingTime = readingTime.text;
  frontmatter.wordCount = readingTime.words;
};
