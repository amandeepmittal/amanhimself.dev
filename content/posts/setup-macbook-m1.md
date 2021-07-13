---
title: 'Setup Macbook M1 for Web and React Native development'
slug: 'blog/setup-macbook-m1'
date: 2021-03-14
thumbnail: '../thumbnails/vscode.png'
template: post
tags:
  - tools
---

> Updated on: July 9, 2021

![cover_image](https://i.imgur.com/tAJjTOU.png)

I recently upgraded from [Macbook Air 2017](https://www.instagram.com/p/B6lInd3AhsN/) to Macbook Pro with an M1 chip. My four year old Macbook Air was giving up. The performance to run heavy tasks like using the iOS simulator when developing and working on React Native apps was declining. I had long given up using the Android emulator and have been using a real Android device for testing. December 2020 was the time I decided its time to upgrade.

I had a long internal discussion with myself for almost a month that whether should I upgrade to M1 or stick with Intel-based chips and spend them bucks. Don't get me wrong here, M1 is not cheap either as I did go for a RAM upgrade to max limits which is currently 16GB in the base model. The kind of performance I was expecting after going through some online reviews and research, has been worth it so far (it is fast, no doubt). I received it two weeks back at the time of writing this post and since then I have installed all the necessary tools and utilities that help me work on Web development and React Native apps.

My local environment currently includes:

- Rosetta 2
- Homebrew
- Git
- Node.js
- npm
- Zsh
- Oh My Zsh
- iTerm
- Xcode
- yarn
- VSCode Insiders Edition
- Testing GatsbyJS builds

**OS apps**:

- Google Chrome
  - set to default
    - First things to do:
      - **Log in to:**  Gmail, Twitter, GitHub, Outlook
      - **Developer mode on**
    - Extensions:      
      - [Detailed SEO extension](https://chrome.google.com/webstore/detail/detailed-seo-extension/pfjdepjjfjjahkjfpkcgfmfhmnakjfba?hl=en)
      - [Code Copy](https://chrome.google.com/webstore/detail/codecopy/fkbfebkcoelajmhanocgppanfoojcdmg)
      - [Redefined GitHub](https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf)
      - [Octolinker](https://chrome.google.com/webstore/detail/octolinker/jlmafbaeoofdegohdhinkhilhclaklkp/related?hl=en)
      - [Twemex: Sidebar for Twitter](https://chrome.google.com/webstore/detail/twemex-sidebar-for-twitte/amoldiondpmjdnllknhklocndiibkcoe?hl=en)
      - [Minimal Twitter](https://chrome.google.com/webstore/detail/minimal-twitter/pobhoodpcipjmedfenaigbeloiidbflp?hl=en)
      - [Medium Enhanced Stats](https://chrome.google.com/webstore/detail/medium-enhanced-stats/jnomnfoenpdinfkpaaigokicgcfkomjo?hl=en)
      - [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)
      - Grammarly      
- Brave
- Firefox Developer Edition
- Android Studio
- [Insomnia](https://insomnia.rest/) as REST API client
- Xcode
- Android Studio
- Slack or Discord
- There (for team mates timezone)
- LICEcap (for gifs)
- Zoom
- [Cleanshot](https://cleanshot.com/) (for screenshots)

**System Settings**:
- Disable Ask Siri
- Disable Spotlight search except Applications, Calculator, Definition, and System Preferences.
- Trackpad:
  - Fix direction: Trackpad > Scroll & Zoom - Natural off
  - Disable dictionary lookup: Trackpad > Point & Click > Look up & data detectors off
  - More gestures > Swipe between pages off & App Exposé off    
- Finder settings:
  - Preferences > Advanced > Show filename extensions
  - Enable show path bar: View > Show Path Bar
- Dock:
  -  Turn auto hiding on

> Copy [dotfiles](https://github.com/amandeepmittal/dotfiles)


## Rosetta 2

[Rosetta 2](https://developer.apple.com/documentation/apple_silicon/about_the_rosetta_translation_environment) is the lifeline that allows you to run apps designed for Intel-based chips that use `x86` architecture on ARM-based chips (in this case M1). This solution is provided by Apple in form of an emulator and doesn't come pre-installed. You have to install it manually. Fire up the Terminal application that comes pre-installed on the Big Sur and let your first command to execute be:

```shell
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

If you decide not to put the flag ` --agree-to-license`, you will be prompted by Apple's interactive install and you will have to agree to their terms and license conditions in order to use it.

## iTerm

My favorite terminal app that I have been using for years is [iTerm](https://iterm2.com/downloads.html). I am currently using two versions of iTerm on my setup. One with Rosetta 2 enabled and the default one. This way, I can only use the Rosetta 2 emulator when required. There are no performance issues I have found with using iTerm with Rosetta 2 for ARM-based applications.

![ss0](https://i.imgur.com/yOAV1or.png)

If you'd like a similar setup, go to the `Applications` folder in your Macbook and duplicate the `iTerm` application.

![ss1](https://i.imgur.com/2C5jrsb.png)

You can rename the duplicated iTerm app. I have renamed it to `iTerm_rosetta` to differentiate between the two. Right-click the duplicated app and click **Get Info**. In the **General** check the box where it says **Open using Rosetta**.

![ss2](https://i.imgur.com/7ipJmzM.png)

Now, if you open the second terminal, it will be using Rosetta 2 emulator by default.

**Other iTerm profile settings that I use:**

Recently I started using [Jetbrains Mono font](https://www.jetbrains.com/lp/mono/).

![ss6](https://i.imgur.com/8Gwhdq4.png)

For the overall looks and appearance, I use [Dracula Pro Color Presets created by Zen Rocha](https://draculatheme.com/pro).

![ss7](https://i.imgur.com/5VSskf7.gif)

And my last favorite thing is to split the working directory into two more different tabs using `Command + D` for horizontal panes. Make sure to have the following setting configured from **General > Working Directory > select Advanced Configuration > click button Edit... > select Reuse previous session's directory under Working Directory for New Split Panes.**

![ss8](https://i.imgur.com/NDdHDch.png)

For terminal prompt, I use [Spaceship ZSH](https://github.com/denysdovhan/spaceship-prompt).

## Homebrew

On December 1, 2020, the Homebrew team made an official announcement on their [website](https://brew.sh/2020/12/01/homebrew-2.6.0/) about the version release `2.6.0`. The most significant changes among others they listed were the support for macOS Big Sur, using `brew` commands instead of `brew cask` and beginning to support macOS M1 and Apple Silicon or ARM-based chips.

This is the tricky part. At the time of writing this post, some formulae that you may like to use, might not work. It's better to track at the [GitHub issue here](https://github.com/Homebrew/brew/issues/7857) in the Brew's official repository which is maintained by their team. I am thankful to the whole team behind the Homebrew for making it accessible and appreciate their hard work on making things work in such a short time.

Using the terminal, you can install the Homebrew by executing the default command:

```shell
/bin/bash -c
"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Recently I found that it can be installed natively on a Macbook. You can run the above command in a native terminal environment as well without using the Rosetta terminal environment.

**Other brew installs**:
- libev
- libuv
- yarn
- scrcpy
- node/npm

## Git

I did install Git using brew command: `brew install git`.

To authenticate GitHub to be used from the terminal environment, I'd recommend you to check out the [official document](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) on creating and accessing personal tokens.

## Xcode

After installing Git, for me, the next step is to install [Xcode app](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from Apple's App Store.

After installing it, make sure to open it for the first time, from the menu bar, open **Xcode > Preferences > Locations** and make sure that **Command Line Tools** point towards the current Xcode app.

![ss3](https://i.imgur.com/ZXS88QM.png)

## ZSH and Oh My Zsh

[ZSH](https://github.com/zsh-users/zsh) is the default shell that macOS Big Sur comes with. I like to use [Oh My Zsh](https://ohmyz.sh/) to manage ZSH configuration and some plugins and a theme to prettify the terminal.

To install, run the command below:

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/
robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

After installation, make sure that the file `zshrc` is exporting the below path:

```shell
# Path to your oh-my-zsh installation.
export ZSH="/Users/<USERNAME>/.oh-my-zsh/oh-my-zsh.sh"
```

The first I like to do after setting up the bare minimum ZSH configuration is to install a plugin called [
zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md). It provides syntax highlighting for the ZSH shell. Execute the series below commands in the terminal window:

```shell
cd $HOME/.oh-my-zsh/oh-my-zsh.sh/plugins

# OR depending on the /plugins folder in your local setup
cd $HOME/.oh-my-zsh/plugins

# then clone the git repository
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highligh
ting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

In a nutshell, this is [my initial ZSH configuration](https://github.com/amandeepmittal/dotfiles/blob/master/.zshrc) in the file `~/.zshrc` file:

```shell
# Path to your oh-my-zsh installation.
export ZSH="/Users/amanhimself/.oh-my-zsh/oh-my-zsh.sh"

export PATH=/opt/homebrew/bin:$PATH

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

ZSH_THEME="spaceship"


plugins=(
  git
  node
  vscode
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh
source /Users/[USER_NAME]/.oh-my-zsh/oh-my-zsh.sh/plugins/
zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

After installing the syntax highlight plugin, it starts to recognize the commands:

![ss4](https://i.imgur.com/UxRzm98.png)

## VSCode

~~VSCode does not have native M1 support yet.~~

VSCode and VS Code Insiders edition both support ARM chips now (as of March, 13, 2021). Download the installer for Insiders edition from [here](https://code.visualstudio.com/insiders/) and for VSCode [here](https://code.visualstudio.com/download).

![ss5](https://i.imgur.com/Yd4wQ10.png)

I am still using the same VSCode configuration from my previous setup:

```json
{
  "editor.tabSize": 2,
  "editor.fontSize": 14,
  "editor.fontFamily": "Jetbrains Mono, 'Courier New', monospace",
  "workbench.colorTheme": "Cyberpunk",
  "workbench.iconTheme": "material-icon-theme",
  "editor.minimap.enabled": false,
  "editor.cursorBlinking": "expand",
  "editor.fontLigatures": false,
  "editor.wordWrap": "on",
  "editor.cursorSmoothCaretAnimation": true,
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.suggestFontSize": 12,
  "editor.suggestLineHeight": 12,
  "workbench.editor.enablePreview": false,
  "window.restoreFullscreen": true,
  "window.title": "${activeEditorShort}${separator}${rootName}",
  "search.exclude": {
    "**/node_modules": true,
    "**/*.code-search": true,
    "ios/": true,
    "android/": true,
    "dist/": true,
    "yarn.lock": true,
    "package-lock.json": true,
    ".gitignore": true,
    ".expo": true,
    ".vscode": true
  },
  "explorer.confirmDelete": false,
  "workbench.editor.tabSizing": "shrink",
  "breadcrumbs.enabled": true,
  "explorer.openEditors.visible": 0,

  // Integrated Terminal
  "terminal.integrated.profiles.osx": {
    "bash": {
      "path": "bash",
      "icon": "terminal-bash"
    },
    "zsh": {
      "path": "zsh"
    }
  },
  "terminal.external.osxExec": "iTerm.app",
  "terminal.integrated.fontSize": 12,

  // Extensions
  "extensions.autoUpdate": false,
  "json.schemas": [
    {
      "name": "vscode-expo-manifest",
      "url": "file:///Users/amanhimself/Library/Application%20Support/Code/User/globalStorage/bycedric.vscode-expo/manifest-42.0.0.json",
      "fileMatch": [
        "app.json",
        "app.config.json"
      ]
    }
  ],
  "codestats.apikey": "<api-key>",
  "readTime.enabled": true,
  "bracket-pair-colorizer-2.colors": ["#F72585", "#94b4a4", "#a3d8f4"],
  "highlight-matching-tag.styles": {
    "opening": {
      "name": {
        // surround is border
        "surround": "yellow"
      }
    }
  },
  "npm-intellisense.importES6": true,  

  // Prettier
  "prettier.singleQuote": true,
  "prettier.jsxSingleQuote": true,
  "prettier.trailingComma": "none",
  "prettier.arrowParens": "avoid",
  "prettier.proseWrap": "preserve",
  "prettier.quoteProps": "as-needed",
  "prettier.jsxBracketSameLine": false,
  "prettier.bracketSpacing": true,
  "prettier.tabWidth": 2,

  // Macros
  "macros": {
    "collapseAndClose": [
      "workbench.files.action.collapseExplorerFolders",
      "workbench.action.closeAllEditors"
    ]
  },

  // Markdown
  "[markdown]": {
    "editor.quickSuggestions": true,
    "editor.defaultFormatter": "yzhang.markdown-all-in-one"
  },

  // JSON
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // JavaScript
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // JavaScript + React
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // TypeScript
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // TypeScript + React
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "cSpell.userWords": [
    "Draftbit",
    "Draftbit's",
    "Favouriting",
    "Ionicons",
    "Macbook",
    "Postgres",
    "Pressable",
    "SIGNUP",
    "Supabase",
    "Twilio",
    "destructured",
    "favourite",
    "favourites",
    "firestore",
    "rerender",
    "unfollow",
    "unsubscriber"
  ],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "explorer.confirmDragAndDrop": false,
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.startupEditor": "welcomePage",

  // for fairyFloss theme only
  "editor.tokenColorCustomizations": {
    "[fairyfloss]": {
      "comments": {
        "foreground": "#8d99ae"
      }
    }
  },
  // Error Lens
  "errorLens.fontSize": "11",
  "errorLens.onSave": true,
  "errorLens.enabledDiagnosticLevels": ["error", "warning", "hint"],
  "workbench.colorCustomizations": {
    "errorLens.hintForeground": "#ffc600A1",
    "errorLens.hintBackground": "#ff00dd2f",
    "errorLens.errorBackground": "#ff000005",
    "editor.selectionBackground": "#ff1493",
    "editor.selectionHighlightBackground": "#ff1493",
    "editor.findMatchBackground": "#ff1493",
    "editor.findMatchHighlightBackground": "#3cb371"
  },
  "errorLens.exclude": ["never (read|used)"],
  "javascript.updateImportsOnFileMove.enabled": "always",

  // GitHub Copilot
  "editor.inlineSuggest.enabled": true,
  "github.copilot.inlineSuggest.enable": true,
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false,
    "javascript": true,
    "markdown": true,
    "javascriptreact": true,
    "typescript": true,
    "typescriptreact": true
  },
  "emmet.triggerExpansionOnTab": false
}
```

### Themes

![ss9](https://i.imgur.com/C9u6wZs.png)

I usually like to switch between a dark and a light theme.

- For the dark theme where I spent most of my time, I am was previously using [morgan.codes-theme](https://marketplace.visualstudio.com/items?itemName=morgan-codes.morgan-codes-vscode-theme) but now I am using [fairyFloss](https://marketplace.visualstudio.com/items?itemName=nopjmp.fairyfloss).
  - Other themes I switch between: 
    - [Apollo Midnight Color theme](https://marketplace.visualstudio.com/items?itemName=jglovier.apollo-midnight-color-theme)
    - [Cyberpunk](https://marketplace.visualstudio.com/items?itemName=max-SS.cyberpunk)
- For the light version, I am using the theme called Quiet Light which comes pre-installed with a new VSCode installation.
- For file icons, I love [Material-Icon-Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme).
- For terminal prompt, I use [Spaceship ZSH](https://github.com/denysdovhan/spaceship-prompt).
- Font: [Jetbrains Mono font](https://www.jetbrains.com/lp/mono/).

### Extensions

I use VSCode editor for both writing code and writing blog posts. Thus, the list of extensions below is the combination of extensions that fulfills both of my purposes.

- [Auto Close tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Code::Stats](https://codestats.net/)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [ESLint](https://eslint.org/)
- [Expo Tools](https://marketplace.visualstudio.com/items?itemName=byCedric.vscode-expo)
- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
- [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
- [Indent rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [iOS common files](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-ios-common-files)
- [macros](https://marketplace.visualstudio.com/items?itemName=geddski.macros)
- [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
- [npm intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Path intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Prettier](https://prettier.io/)
- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
- [Read Time](https://marketplace.visualstudio.com/items?itemName=johnpapa.read-time)
- [SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [Word Count](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount)
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

## Global NPM Packages I use

- [gatsby-cli](https://www.npmjs.com/package/gatsby-cli) To build and test out [my personal blog built with Gatsby](https://amanhimself.dev/).
- [expo-cli](https://docs.expo.io/workflow/expo-cli/)
- [npm-check](https://www.npmjs.com/package/npm-check) to check for outdated, incorrect, and unused dependencies.

## For React Native Development

- install [Watchman](https://facebook.github.io/watchman/) to watch changes in the filesystem using the command: `brew install watchman`.
- install Java Development Kit using the command: `brew install --cask adoptopenjdk/openjdk/adoptopenjdk8`.
- install [Android Studio](https://developer.android.com/studio?gclid=CjwKCAiA9bmABhBbEiwASb35V7JvsI6uP_3wVfdVLmGE5ysvvzOKqy9EB0x1hs8-itZwlP66bOKpxxoCHqAQAvD_BwE&gclsrc=aw.ds)
  - Then install Android SDK.

For more instructions on how to setup development environment for React Native, please follow the [official documentation here](https://reactnative.dev/docs/environment-setup).

## For Gatsby Sites

~~If you have a project that uses GatsbyJS, chances are you are going to face the issue [https://github.com/lovell/sharp/issues/2460](https://github.com/lovell/sharp/issues/2460).~~ Gatsby uses a C based library called Sharp that needs to be compiled under the ARM architecture. It did not work for me and the only way I could solve was to install `vips` formulae from Homebrew as mentioned in the GitHub issue itself.

![ss10](https://i.imgur.com/bbp3mWy.png)

## Conclusion

That’s the setup I now use for my JavaScript, Node.js, React and React Native. I think it's a good machine. Hopefully, M1 is just the beginning of a new era of powerful computers for daily use.

🤔 The only thing left for me is to find a way to transfer all laptop swag/stickers from my Macbook Air to Pro. I miss having them on this one.

[**isapplesiliconready.com**](https://isapplesiliconready.com/for/developer) is another useful link I found sometime back to check what is compatible to work on Apple Silicon chips natively or using Rosetta or not optimized at all.
