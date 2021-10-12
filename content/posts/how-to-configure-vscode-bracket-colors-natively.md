---
title: 'How to configure VSCode Bracket Pair Colors Natively'
date: 2021-10-12
template: post
slug: 'blog/how-to-configure-vscode-bracket-colors-natively'
thumbnail: '../thumbnails/vscode.png'
tags:
  - tools
canonicalUrl: 'https:/amanhimself.dev/blog/how-to-configure-vscode-bracket-colors-natively/'
---

With an [update in August 2021](https://code.visualstudio.com/updates/v1_60#_high-performance-bracket-pair-colorization), VSCode started supporting Bracket pair colorization natively. It means there is no need to use the [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) extension (_which I love_).

In their official announcement, the VSCode team states they choose to implement this feature natively to address performance issues.

I recently uninstalled the extension and thought, let's try to use the editor without any bracket color extension. I cannot. I've been using the extension [as long as I remember](https://amanhimself.dev/blog/how-i-configure-vscode-for-everything/) and I cannot go back to plain, colorless brackets.

![ss1](https://i.imgur.com/JBOVcnV.png)

Recently, I came across [Rachel Leggett's tweet](https://twitter.com/rleggos/status/1433800613083729921) that describes how to enable this setting. Open the `settings.json` file for the VSCode editor and add the following.

```json
{
  // ...
  "editor.bracketPairColorization.enabled": true,
  "workbench.colorCustomizations": {
    "editorBracketHighlight.foreground1": "#ffb86c",
    "editorBracketHighlight.foreground2": "#8be9fd",
    "editorBracketHighlight.foreground3": "#bd93f9",
    "editorBracketHighlight.foreground4": "#50fa7b",
    "editorBracketHighlight.foreground5": "#f1fa8c",
    "editorBracketHighlight.foreground6": "#abb2c0",
    "editorBracketHighlight.unexpectedBracket.foreground": "#ff5555"
  }
}
```

And tweak the colors according to your style!

![ss2](https://i.imgur.com/tSgx02e.png)

By the way, the above colors are from [Dracula theme's 🧛‍♂️ color palette](https://draculatheme.com/contribute) to match the overall editor theme I am currently using.
