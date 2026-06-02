import { SITE } from '@config';
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Content Layer glob loader. `generateId` keeps the legacy content-collection
  // behavior where a frontmatter `slug:` overrides the URL. Without it, every post
  // that sets `slug:` (almost all of them) would fall back to a filename-based id
  // and its URL would change.
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry, data }) =>
      typeof data.slug === 'string' ? data.slug : entry.replace(/\.mdx?$/, '')
  }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(['others']),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: 'OpenGraph image must be at least 1200 X 630 pixels!'
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional()
    })
});

export const collections = { blog };
