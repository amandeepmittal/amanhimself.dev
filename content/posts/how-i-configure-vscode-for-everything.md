---
title: 'How I Configure VSCode for Everything'
slug: 'how-i-configure-vscode-for-everything'
date: '2019-04-22'
thumbnail: '/thumbnails/vscode.png'
tag: 'vscode'
canonicalUrl: 'https://medium.com/better-programming/how-i-configure-vscode-for-everything-7df65a316a52'
---

![cover](https://i.imgur.com/hJ7W51N.jpg)

[**I made updates to this post here**](https://amanhimself.dev/blog/setup-macbook-m1/) **with additions to setup a new Macbook Pro based on M1 chip in 2021!**

Recently, I was at the Boryspil Airport in Ukraine, working on a blog article, when suddenly my VS Code stopped working. It actually crashed! Not once, but twice in less than 30 minutes. Some of the content was autosaved, but some of it was gone forever.

I was frustrated at first as to why it had to crash at that moment. After re-opening the editor, I was angry with myself because I had to write some of the stuff that didn’t get saved again.

Before this experience, it did at times feel that I had too many extensions that I wasn’t using, as I stopped working with some of the frameworks in recent months (Angular, for example).

What did I do? The emotions weren’t helping; I had to find a better way. So, I re-installed [VS Code](https://code.visualstudio.com/).

VS Code uses [Electron](https://electronjs.org/) as its base which enables it to be cross-platform and work on macOS, Windows, and Linux. It is built using [Node.js](https://nodejs.org/) and has complete support for any JavaScript developer.

Now, that’s what I call win-win. It’s fast compared to the previous editors ([Atom](https://atom.io/)) and IDE’s ([Webstorm](https://www.jetbrains.com/webstorm/)) I have used.

## Themes

The first thing I did was install themes that I see all day. I like my editor to be charming and appealing. Thus, I used the following themes for different purposes.

- fairyFloss (most of the time, because I love purple backgrounds).
- Dracula Official (I used this with my [iTerm](https://www.iterm2.com/) setup and switch between it and fairyFloss).
- Night Owl (just to try something new).
- Material-Icon-Theme (for file icons).

<img src='https://cdn-images-1.medium.com/max/800/1*7utI1vJayaK97t7lYhrv_A.jpeg' />

## Configuring VS Code

Next, I changed a few things that I remembered from my previous settings.

- Set `Tab` size to two spaces.
- Enabled [Emmet](https://emmet.io/) for HTML and JavaScript.
- Enabled `autoSave` with a delay of 5 seconds.
- Used OS’s terminal setup and shell ([Zsh](https://ohmyz.sh/)).
- Enabled formatting of files on save and pasting snippets from elsewhere.
- Disabled Minimap as I like to save space and we write modular functions modules these days.
- Also, enabled `wordwrap`.

### Extensions

Next step for me is to make this editor work like a charm with the help of some well maintained and free extensions.

- [emojisense](https://marketplace.visualstudio.com/items?itemName=bierner.emojisense):
- [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) (I write a lot of blog posts in VS Code.)
- [Code::Stats](https://codestats.net/) (a small stats tool, for fun.)
- [ESLint](https://eslint.org/)
- [Indent 4-to-2](https://marketplace.visualstudio.com/items?itemName=Compulim.indent4to2) (converts tab indentation from four spaces to two.)
- [Express.js](https://expressjs.com/) (a snippets package written by me.)
- [markdownlint](https://github.com/markdownlint/markdownlint) (I sometimes write more Markdown in a day than JavaScript code.)
- [GitHub pull requests](https://help.github.com/en/articles/about-pull-requests).
- [GraphQL](https://graphql.org/) (published by Prisma.)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Pug](https://marketplace.visualstudio.com/items?itemName=amandeepmittal.pug) (another snippet by me for Jade and Pug template languages, for some old projects.)
- [IntelliSense for CSS class names](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
- [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync) (one of the most important extensions I have mentioned here)
- [Word Count](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount)
- [Prettier](https://prettier.io/) (Code formatter I can’t live without.)

With Prettier, I like to use my own set of configurations, as described below.

```json
{
  "prettier.jsxSingleQuote": true,
  "prettier.printWidth": 100,
  "prettier.semi": false,
  "prettier.useTabs": true,
  "prettier.tabWidth": 2
}
```

## Conclusion

That’s the setup I now use for my JavaScript, Node.js, [React](https://reactjs.org/) and React Native work. What type of VS Code configuration do you use? What does it look like? I hope you enjoyed reading this post.

Happy Coding!

[Originally published at Better Programming](https://medium.com/better-programming/how-i-configure-vscode-for-everything-7df65a316a52)
