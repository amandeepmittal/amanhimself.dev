---
title: 'Change cursor color in VS Code to use a linear gradient'
date: '2024-07-04'
slug: 'change-cursor-color-in-vscode'
thumbnail: '/thumbnails/vscode.png'
tag: 'vscode'
canonicalUrl: 'https://amanhimself.dev/blog/change-cursor-color-in-vscode/'
---

Until yesterday, I was unaware that I could change the cursor color in VS Code. Not only changed the color but can also use a linear gradient.

All thanks to VS Code's customizability. It gets this behavior from the Monaco editor. You can find extensive [documentation and a playground](https://microsoft.github.io/monaco-editor/) for Monaco Editor's API.

## Install APC Customize UI++

The extension [APC Customize UI++](https://marketplace.visualstudio.com/items?itemName=drcika.apc-extension) allows customizations that are beyond VS Code's abilities. Mostly because VS Code is an electron app and like any other electron app, uses CSS and JS.

After [installing the extension](https://marketplace.visualstudio.com/items?itemName=drcika.apc-extension), open command palette in VS Code and then run: Enable APC extension. This will enable this extension and any custom settings you're going to apply in the next session, VS Code will automatically ask to restart the editor.

## Find a gradient

Find a gradient combination. For my use case, I used [webgradients.com](https://webgradients.com/) which has a collection of free 180 linear gradients.

## Customize the color of the cursor

To use APC extension, open `settings.json` file in the VS Code editor. Then, create a block to define the additional stylesheet definitions.

```json
{
  "apc.stylesheet": {
    ".monaco-editor .cursor":
  }
}
```

The `.monaco-editor .cursor` accepts a CSS value. You can set the `linear-gradient()` function value on the `background` property:

```json
{
  "apc.stylesheet": {
    ".monaco-editor .cursor": "background: linear-gradient(to bottom, #FF8F00 0%, #FF204E 100%);"
  }
}
```

That's it! On restarting the VS Code editor, the blinking cursor has the linear gradient value is applied to it.

![Linear gradient applied to cursor in VS Code.](/images/change-cursor-color-vscode.png)
