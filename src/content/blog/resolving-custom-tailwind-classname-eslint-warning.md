---
title: Resolving invalid custom Tailwind classname ESLint warning
author: Aman Mittal
pubDatetime: 2025-03-30T00:00:01Z
slug: resolving-custom-tailwind-classname-eslint-warning
featured: false
draft: false
tags:
  - reactjs
  - tailwind
description: ''
---

When working on a large web project with Tailwind CSS, you may have custom CSS classes defined. For instance, if you directly use a class name like `code-annotation` in the markdown content, you might run into an ESLint issue about the class name being invalid.

The custom class, as shown below, is used to indicate to readers how highlights are used inside many code snippets within the beginner-friendly tutorial I have recently updated:

```markdown
<span className="code-annotation">highlighted in green</span>
```

This class is defined in the global CSS file of my project and is a special class name.

In this project, I utilize ESLint for Tailwind ([`eslint-plugin-tailwind`](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-custom-classname.md#detect-classnames-which-do-not-belong-to-tailwind-css-no-custom-classname) with the `tailwindcss/no-custom-classname` rule activated. This rule identifies any class names from the extensive utility classes Tailwind CSS offers. Rightly, it throws the following warning when I run the lint tool in my project:

```shell
warning: Classname 'code-annotation' is not a Tailwind CSS class! tailwindcss/no-custom-classname
```

My use case may be unique or could be implemented differently, but since that custom class name is used only once in this extensive documentation site, I attempted to determine how I could address this issue without re-implementing the class.

## Using Tailwind's safelist

One option I quickly learned that could have helped resolve this issue is to add the custom class name inside the `safelist` in the project's `tailwind.config.js` file:

```js
module.exports = {
// ... rest of the configuration
safelist: ['code-annotation]
}

```

Since the error in my case is coming from ESLint, this solution didn't work, but I was curious to learn more. So I found out that any class name added to the `safelist` array, as shown above, prevents it from being excluded from Tailwind's build process.

During the build process, all content and source files (HTML, CSS, JS, and more) are scanned to identify which Tailwind utility classes and custom classes are in use. After the scan, any used class goes through class preservation, and any unused class identified is purged from the final CSS bundle.

To understand how Tailwind's build process works, I imagine the following diagram is how the build process looks:

<img src="/images/mmd01.png" alt="Diagram that shows Tailwind CSS build process" width="640" />

Adding a class to `safelist` only affects the build process. It doesn't communicate with the ESLint plugin, which runs a separate code analysis process based on pre-defined and custom rules. The plugin configuration is defined inside the `.eslintrc` file. This is why adding the custom class name to the `safelist` didn't work in my case. However, the class is preserved in the final CSS bundle.

## Whitelisting the custom class in ESLint plugin configuration

Since this is a linting issue, [`no-custom-classname`](https://github.com/francoismassart/eslint-plugin-tailwindcss/blob/master/docs/rules/no-custom-classname.md#whitelist-default-) allows whitelisting any custom class inside the `.eslintrc` file:

```js
module.exports = {
  // ...
  overrides: [
    // ...
    {
      rules: {
        'tailwindcss/no-custom-classname': [
          'warn',
          {
            whitelist: ['code-annotation']
          }
        ]
      }
    }
  ]
};
```

This approach works because the rule defined tells ESLint to accept the custom class name as a valid utility. In general, this approach is functional when:

- You have established custom classes as part of your design system
- You are using these class names in your markdown content (as shown in the beginning of this blog post)

## Wrapping up

Sometimes, finding an approach to solve the problem you are encountering allows you to go in-depth to investigate why the approach you want to take to resolve it is not working. This resonates with my recent experience, which is described in this post. Understanding the distinction between the two approaches and knowing which one to use was crucial to keep the lint tool happy.
