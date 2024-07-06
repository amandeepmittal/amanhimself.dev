---
title: "Change comment color visibility in a VS Code theme"
author: Aman Mittal
pubDatetime: 2023-12-21T03:42:51Z
slug: change-comment-color-visibility-in-a-vs-code-theme
featured: false
draft: false
tags:
  - vscode
description: ""
---

Switching to a different theme in VS Code can often lead to a mismatch in personal preferences. I enjoy personalizing themes with subtle modifications, especially when I find one theme that suits my taste.

I recently started using [Digi-Angler Dark theme](https://marketplace.visualstudio.com/items?itemName=Digi-Angler.digi-angler-dark-theme), a variant of the renowned [Dracula color scheme](https://draculatheme.com/). Returning to a dark theme after a while felt like familiar territory, reminiscent of my years using the Dracula theme in VS Code.

## The issue with the comment color

Using Digi-Angler, one thing that is a bit too much for me is the color value used for code comments. I prefer comment colors that blend into the background, a preference shaped by my experiences across various code editors, terminal apps, and even while reading code on documentation sites. The sharp, eye-catching color used for comments in this theme didn't sit well with me.

## Customizing comment color in VS Code

To address this, I stumbled upon `editor.tokenColorCustomizations` in VS Code. It is a feature that allows altering specific color values in the active theme. You add this property to your editor's `settings.json` file and specify the scope for the desired change.

## Using textMateRules for Token Customization

VS Code's tokenization engine is based on [TextMate grammars](https://macromates.com/manual/en/language_grammars), and the customization is done within `textMateRules`. Here's how you can change the comment color:

```json
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "comment",
        "settings": {
          "foreground": "#9c9c9c"
        }
      }
    ]
  }
}
```

The above code snippet applies the comment color `#9c9c9c` to all themes you use inside VS Code. It also means when you switch from one theme to another, this comment will remain consistent.

## Theme specific customization

To tweak the token value for a particular theme, wrap `textMateRules` with the theme name. The following examples demonstrate defining the name of the `[theme]` only applies the comment color `#9c9c9c` for that theme.

```json
{
  "editor.tokenColorCustomizations": {
    "[Digi-Angler Dark Theme]": {
      "textMateRules": [
        {
          "scope": "comment",
          "settings": {
            "foreground": "#9c9c9c"
          }
        }
      ]
    }
  }
}
```

## Conclusion

VS Code's flexibility in customization is a significant advantage. It allows you to tailor any theme to your liking. To learn more about syntax highlighting, tokens, and scopes, see [VS Code documentation](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#textmate-tokens-and-scopes).
