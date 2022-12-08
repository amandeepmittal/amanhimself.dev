---
title: 'Change the color of hidden files and folders in VSCode'
date: '2022-09-04'
slug: 'change-color-hidden-file-folder-name-in-vscode'
thumbnail: '/thumbnails/vscode.png'
tag: 'vscode'
canonicalUrl: 'https://amanhimself.dev/blog/change-color-hidden-file-folder-name-in-vscode/'
---

Using VSCode, I love switching back and forth between dark and light themes to make things interesting for myself when working. Generally, I prefer a [light-ish dark theme](https://amanhimself.dev/blog/setup-macbook-m1/#themes) such as [fairyFloss](https://marketplace.visualstudio.com/items?itemName=nopjmp.fairyfloss) or Quiet Light that comes pre-installed.

I recently switched to [morgan.code](https://marketplace.visualstudio.com/items?itemName=morgan-codes.morgan-codes-vscode-theme) theme, which uses a set of contrasting colors that are pleasing to my growing old eyes. It is developed by a fellow developer [Morgan Richardson](https://www.instagram.com/morgan.codes/).

Using this theme for a while, I realized I am so used to seeing files and folder names that git ignores in a specific gray color.

The original theme comes with blue-ish (maybe some sort of Cyan or Aqua) color for the ignored files and folders.

![original theme](https://i.imgur.com/J6hik7g.jpg)

To customize this color value, VSCode, provides a property called `gitDecoration.ignoredResourceForeground` which accepts a color value in hexadecimal format. It can be used with the VSCode theme color setting: [`workbench.colorCustomizations`](https://code.visualstudio.com/api/references/theme-color) to override the value that the original theme provides.

```json
// settings.json

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

That's it! And now, my optic nerves are happy again.

![customized theme](https://i.imgur.com/sk0tFYi.jpg)

VSCode is so customizable that it surprises me at times.
