---
title: 'How to change light and dark Shiki themes when using Astro'
author: Aman Mittal
pubDatetime: 2025-02-12T00:00:01Z
slug: dual-shiki-themes-with-astro
featured: false
draft: false
tags:
  - blogging
description: ''
---

[Shiki](https://shiki.style/) is Astro's built-in syntax highlighter. While it requires [minimum configuration](/blog/new-blog-theme-and-colors/) to set up, its real power shines when you configure dual themes to match your site's light and dark themes. It also bundles a ton of [modern themes](https://shiki.style/themes) that can be used by defining the theme's name in the configuration.

## Understanding the configuration

The key to implementing dual themes lies in two files:

- Astro configuration file (`astro.config.ts`)
- Base styles file (`src/styles/base.css`)

Let's take a look at the changes needed in each file.

### Updating Astro configuration

Inside your `astro.config.ts`, modify the Shiki configuration to support both light and dark themes. Start by changing the `theme` to `themes` object for dual theme support in `shikiConfig` and add those theme names.

```ts
export default defineConfig({
  // ...
  shikiConfig: {
    themes: {
      light: 'rose-pine-dawn',
      dark: 'rose-pine-moon'
    }
  }
});
```

This replaces the single theme approach (which earlier was set to: `theme: 'rose-pine-moon'`).

### Styling Shiki for dark mode

You need to add appropriate CSS to handle the theme switching. By default, Shiki uses the [`.shiki` class](https://shiki.style/guide/dual-themes#class-based-dark-mode) to add theme styles based on the class name. Astro provides a `.astro-code` class to add styles for dark themes.

Add the following styles in your `src/styles/base.css`:

```css
@layer base {
  :root,
  html[data-theme='dark'] pre:has(code),
  html[data-theme='dark'] pre:has(code) span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
  /* ... */
}
```

Now, when the theme changes, these CSS variables will update automatically and appropriately for the dark theme.

## Wrapping up

With these changes, your code blocks will automatically adapt to the theme defined in your Shiki configuration.
