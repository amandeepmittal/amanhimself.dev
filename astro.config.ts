import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config';
import { remarkReadingTime } from './src/utils/remark-reading-time';

const EXCLUDED_FROM_SITEMAP = ['/search/', '/posts-count/'];

const pageLastmod = (url: string) => {
  const htmlPath = fileURLToPath(
    new URL(`./dist${new URL(url).pathname}index.html`, import.meta.url)
  );
  const html = readFileSync(htmlPath, 'utf8');
  const time = (property: string) =>
    html.match(new RegExp(`property="${property}" content="([^"]+)"`))?.[1];
  return time('article:modified_time') ?? time('article:published_time');
};

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  // Astro 7 defaults: compressHTML switched to 'jsx' (strips spaces between
  // inline elements) and markdown moved off remark. Keep the v6 behavior.
  compressHTML: true,
  integrations: [
    react(),
    sitemap({
      filter: page => !EXCLUDED_FROM_SITEMAP.some(path => page.endsWith(path)),
      serialize: item => ({ ...item, lastmod: pageLastmod(item.url) })
    })
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkToc,
        remarkReadingTime,
        [
          remarkCollapse,
          {
            test: 'Table of contents'
          }
        ]
      ]
    }),
    shikiConfig: {
      themes: {
        light: 'min-light',
        dark: 'min-dark'
      },
      wrap: true,
      transformers: []
    }
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    }
  },
  scopedStyleStrategy: 'where'
});
