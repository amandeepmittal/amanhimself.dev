---
title: Ignoring JSX components in Vale
author: Aman Mittal
pubDatetime: 2025-02-27T00:00:01Z
slug: ignoring-jsx-components-in-vale
featured: false
draft: false
tags:
  - tech-writing
description: ''
---

When using [Vale](https://vale.sh/docs) to prose lint documentation written in MDX, you will encounter a common challenge: Vale attempts to lint the text inside JSX components. Sometimes, Vale will try to lint the text inside a JSX component, leading to false positives and unnecessary warnings or errors.

Vale is already "markup" aware, which means it is capable of both applying rules to and ignoring certain sections of your markdown files. In this post, let's explore how you can use custom block-level ignores in your Vale configuration using `BlockIgnores`. This is a pattern I am using while managing documentation at work.

## Understanding Vale's initialization process and challenge with JSX components

If you write documentation using MDX, you're likely familiar with how combining Markdown and JSX components creates a powerful authoring experience.

When Vale starts processing a file, initialization rules are first applied. These rules are defined inside a `.vale.ini` file in a project's root directory. These rules determine how Vale should handle different parts of your document to pay attention to and skip other areas. This file also configures the format of your documentation. For example, treating MDX files as Markdown files is defined by:

```ini
[formats]
mdx = md
```

Now, let's take a look at a typical MDX documentation file where a JSX component is used:

```jsx
<Terminal
  cmd={[
    '# Install Tailwind CSS',
    '$ npx expo add tailwindcss@3 postcss autoprefixer -- --dev',
    '',
    '# Create a Tailwind config file',
    '$ npx tailwindcss init -p',
  ]}
/>

# OR

<Alert type="warning">
 The following feature is experimental.
</Alert>
```

Vale processes this file in three main stages:

- Vale will look for markers indicating special syntax, where it can look for style rules, vocab rules, and so on
- Then, it applies any patterns that are defined to be ignored (done by using [`BlockIgnores`](https://vale.sh/docs/keys/blockignores) and [`TokenIgnores`](https://vale.sh/docs/keys/tokenignores))
- Finally, it applies your defined style rules to the text

Things get interesting when Vale lints the plain text used inside JSX components in MDX files. It may throw a warning or an error (depending on how your Vale styles rules are defined) by flagging the text inside the JSX component.

## Using Vale's BlockIgnores

Vale provides block-level configuration to ignore a specific pattern. When defined using `BlockIgnores`, Vale skips that pattern during the linting process.

`BlockIgnores` are defined inside the `.vale.ini` configuration:

```ini
BlockIgnores =
```

You can use regular expressions (regex) to tell Vale which JSX components to ignore. For example, to ignore the `<Terminal />` component entirely, you can update `BlockIgnores` to:

```ini
# Ignore self-closing Terminal components
BlockIgnores = (?s)<Terminal.*?/>,
```

This regex pattern will match and ignore any instances of the `<Terminal />` component used inside an MDX file as part of your docs source code. The `(?s)` allows the pattern to match across multiple lines, the `<Terminal.*?/>` matches the self-closing JSX tag, and `.*?` matches everything between the tag.

`BlockIgnores` also accepts multiple sections and you can use `,` to separate them. For example, to ignore `Alert` from the first example, you can extend `BlockIgnores` to:

```ini
# Now, ignore Alert components with Children
BlockIgnores = (?s)<Terminal.*?/>,(?s)<Alert>.*?</Alert>
```

The pattern `.*?` in the above example matches the child text inside the `Alert` tags.

After adding any configuration, as shown in the example above, test and verify that the patterns you ignore work correctly.

## Wrapping up

By understanding how Vale's initialization rules work and using custom regular expression patterns to ignore a certain block, you get a robust documentation linting setup that can handle JSX components gracefully inside your markdown files. The goal is always to find the right balance, and Vale's configurable behavior allows us to achieve that.
