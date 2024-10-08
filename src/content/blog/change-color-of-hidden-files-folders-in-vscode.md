---
title: Change the color of hidden files and folders in VS Code
author: Aman Mittal
pubDatetime: 2022-09-04T03:42:51Z
slug: change-color-hidden-file-folder-name-in-vscode
featured: false
draft: false
tags:
  - vscode
description: ''
---

> **Last update:** 17 December, 2023

I often switch between dark and light themes in VS Code to keep my coding environment fresh and engaging. My preference leans towards [light themes](https://amanhimself.dev/blog/setup-macbook-m1/#themes), such as pre-installed Quiet Light.

## Customizing the morgan.code theme

My latest choice is the [morgan.code theme](https://marketplace.visualstudio.com/items?itemName=morgan-codes.morgan-codes-vscode-theme), crafted by [Morgan Richardson](https://www.instagram.com/morgan.codes/). Its contrasting colors are particularly soothing for my eyes.

After using this theme for some time, I noticed a longing for a familiar sight &mdhash; files and folders ignored by git displayed in a specific shade of gray. The **morgan.code** theme, however, presents these items in a blue-ish tone, possibly Cyan or Aqua.

![Original theme](https://i.imgur.com/J6hik7g.jpg)

## Changing ignored files and folders color

VS Code has a property named `gitDecoration.ignoredResourceForeground` for customizing the color of ignored files and folders. This property when used in conjunction with [`workbench.colorCustomizations`](https://code.visualstudio.com/api/references/theme-color) allows overriding the default theme color.

Here is how I adjusted the color setting in my `settings.json`:

```json
{
  // ...
  "workbench.colorCustomizations": {
    // select theme you want to apply color customization value
    "[morgan.codes]": {
      "gitDecoration.ignoredResourceForeground": "#434343"
    }
  }
}
```

With this simple tweak, the ignored files and folders now appear in a familiar gray. My optic nerves are happy again.

![customized theme](https://i.imgur.com/sk0tFYi.jpg)

## Conclusion

The level of customization in VS Code allows, never ceases to amaze me.
