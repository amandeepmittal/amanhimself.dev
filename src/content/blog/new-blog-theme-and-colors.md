---
title: New blog theme
author: Aman Mittal
pubDatetime: 2025-01-31T00:00:01Z
slug: new-blog-theme-and-colors
featured: false
draft: false
tags:
  - blogging
description: ''
---

Finally, I've updated the blog theme style and colors to represent the code snippets in a way I like. The colors or I should say, the code theme used is `rose-pine-moon`. Using [Shiki](https://shiki.style/guide/) makes it easier to switch between any supported them for the code.

Currently, the Astro Paper template I am using for this blog, it's a matter of updating the theme name in `shikiConfig` inside the `astro.config.ts` file.

```ts
export default {
  markdown: {
    shikiConfig: {
      theme: 'rose-pine-moon'
    }
  }
};
```

This code snippet is a configuration object that customizes the appearance of code blocks in a documentation system or website. Specifically, it sets up Shiki, a syntax highlighter, to use the 'rose-pine-moon' color theme. Shiki is a popular tool that provides syntax highlighting for code snippets in markdown files and Astro includes it by default.

To change light and dark mode theme colors, I've updated the base styles applied from `base.css`:

```css
@layer base {
  :root,
  html[data-theme='light'] {
    --color-fill: 255, 252, 249;
    --color-text-base: 34, 34, 34;
    --color-accent: 0, 0, 0;
    --color-card: 243, 244, 246;
    --color-card-muted: 248, 248, 248;
    --color-border: 229, 229, 229;
  }
  html[data-theme='dark'] {
    --color-fill: 34, 34, 34;
    --color-text-base: 255, 252, 249;
    --color-accent: 255, 255, 255;
    --color-card: 51, 51, 51;
    --color-card-muted: 68, 68, 68;
    --color-border: 85, 85, 85;
  }
}
```

Within the base layer, a light and a dark mode theme are defined by `html[data-theme='light'])` and `html[data-theme='dark'])`. Each theme sets the values of CSS variables that are used throughout the site to define colors. For example, `--color-fill` is used to set the background color of the site, `--color-text-base` is used to set the text color, and so on.
