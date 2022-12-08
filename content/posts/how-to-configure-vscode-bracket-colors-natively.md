---
title: 'How to configure VSCode Bracket Pair Colors Natively'
date: '2021-10-12'
slug: 'how-to-configure-vscode-bracket-colors-natively'
thumbnail: '/thumbnails/vscode.png'
tag: 'vscode'
canonicalUrl: 'https://amanhimself.dev/blog/how-to-configure-vscode-bracket-colors-natively/'
---

![cover image](https://res.cloudinary.com/practicaldev/image/fetch/s--lgaAXnJK--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r84rtekdnk3qd4r4v31e.png)

With an [update in August 2021](https://code.visualstudio.com/updates/v1_60#_high-performance-bracket-pair-colorization), VSCode started supporting Bracket pair colorization natively. It means there is no need to use the [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) extension (_which I love_).

In their official announcement, the VSCode team states they choose to implement this feature natively to address performance issues.

I recently uninstalled the extension and thought, let's try to use the editor without any bracket color extension. I cannot. I've been using the extension [as long as I remember](https://amanhimself.dev/blog/how-i-configure-vscode-for-everything/) and I cannot go back to plain, colorless brackets.

![ss1](https://i.imgur.com/JBOVcnV.png)

To enable this setting, open the `settings.json` file for the VSCode editor and add the following:

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
