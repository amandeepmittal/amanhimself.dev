---
title: 'Setup Macbook M1 for Web and React Native development'
slug: 'setup-macbook-m1'
date: '2021-03-14'
thumbnail: '/thumbnails/vscode.png'
tag: 'vscode'
canonicalUrl: 'https://amanhimself.dev/blog/setup-macbook-m1/'
---

> 🕑 Updated on: July 13, 2022

![cover_image](https://i.imgur.com/tAJjTOU.png)

It's 2022 and I am still coming back to this article. I wrote this originally in 2021 to keep track of what I need to get started when setting up a new laptop. Since then, I have two Macbook Pros both using Apple Silicon processor (M1). I try to keep this article up to date.

## First steps

When setting up a fresh Macbook, here are the initial steps I take:

- **Downloads**:

  - **Browser**: Download [Brave Browser](https://brave.com/download/), [Google Chrome](https://www.google.com/chrome/?brand=YTUH&gclid=EAIaIQobChMI9vmFxpL0-AIVDJ1LBR11UATAEAAYASAAEgJBQPD_BwE&gclsrc=aw.ds)
  - **Terminal**: Download iTerm 2 and set it to default
  - **Editor/IDE**: VSCode
  - **Other downloads**: CleanMyMac X, Xcode

- **Log in**
  - Gmail, GitHub, Outlook

## macOS Settings and Preferences

System preferences and settings that I prefer. These settings are to be found in Systems and Preferences app:

- **Siri**:

  - Disable Ask Siri

- **Dock & Menu Bar**:

  - Enable "Automatically hide and show the Dock"
  - Enable "Automatically hide and show the menu bar in full screen"
  - Disable Siri

- **Mission Control**:

  - Disable "Automatically rearrange Spaces based on most recent use"
  - Hot Corners: remove everything

- **Trackpad**:

  - Point & click
    - Enable secondary click with bottom right corner
    - Enable Tap to click with one finger
  - Scroll & zoom:
    - Disable Scroll Direction: Natural
  - More gestures:
    - Disable Swipe between pages and App Exposé

- **Spotlight**:

  - Disable search except Applications, Calculator, Conversion, Definition, and System Preferences.

- **Finder settings**:

  - Preferences > Advanced > Show filename extensions
  - Enable showing hidden files (hold Cmd + Shift dot(`.`) in a Finder window)
  - Enable: View -> Show Path Bar, Show Status Bar

- **Chrome settings**:
  - Sync settings and switch **"Developer Mode"** on.
  - **Extensions** that I use:
    - [Detailed SEO extension](https://chrome.google.com/webstore/detail/detailed-seo-extension/pfjdepjjfjjahkjfpkcgfmfhmnakjfba?hl=en)
    - [Redefined GitHub](https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf)
    - [Twemex: Sidebar for Twitter](https://chrome.google.com/webstore/detail/twemex-sidebar-for-twitte/amoldiondpmjdnllknhklocndiibkcoe?hl=en) - [Minimal Twitter](https://chrome.google.com/webstore/detail/minimal-twitter/pobhoodpcipjmedfenaigbeloiidbflp?hl=en)
    - [Medium Enhanced Stats](https://chrome.google.com/webstore/detail/medium-enhanced-stats/jnomnfoenpdinfkpaaigokicgcfkomjo?hl=en)
    - [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)
    - Grammarly
    - [Toby](https://www.gettoby.com/) to organize tabs
    - [DF Tube (Distraction Free for YouTube™)](https://chrome.google.com/webstore/detail/df-tube-distraction-free/mjdepdfccjgcndkmemponafgioodelna?hl=en)

## Setting up the development machine

- **Other apps on my macOS**:
  - Brave
  - Android Studio
  - [Insomnia](https://insomnia.rest/) as REST API client
  - Slack or Discord (for work and community)
  - There (to track team mate's timezones)
  - LICEcap (for recoding gifs)
  - Zoom (for work)
  - GitHub Desktop App
  - [Cleanshot](https://cleanshot.com/) (for screenshots and recording videos)
  - Spotify
  - Bandwidth +
  - Linear (for work)
  - Skype
  - Discord
  - The Unarchiver
  - HiddenMe
  - Numbers
  - Notion
  - Telegram

## ZSH and Oh My Zsh

[ZSH](https://github.com/zsh-users/zsh) is the default shell in macOS Big Sur. However, I like to use [Oh My Zsh](https://ohmyz.sh/) to manage the ZSH configuration, plugins, and a theme to prettify the terminal.

To install, run the command below:

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

After installation, make sure that the file `.zshrc` is exporting the below path at the top:

```shell
# Path to your oh-my-zsh installation
export ZSH="/Users/<USERNAME>/.oh-my-zsh"
```

The first I like to do after setting up the bare minimum ZSH configuration is to install a plugin called [
zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md). It provides syntax highlighting for the ZSH shell. Execute the series below commands in the terminal window:

```shell
# depending on the /plugins folder in your local setup
cd $HOME/.oh-my-zsh/plugins

# then clone the git repository
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

Next step is to install [spaceship-prompt](https://github.com/spaceship-prompt/spaceship-prompt) theme. Follow the steps described in [oh-my-sh](https://github.com/spaceship-prompt/spaceship-prompt#oh-my-zsh) section.

This is [my final ZSH configuration](https://github.com/amandeepmittal/dotfiles/blob/master/.zshrc) in the file `~/.zshrc` file:

```shell
# Path to your oh-my-zsh installation
export ZSH="/Users/amanhimself/.oh-my-zsh"

export PATH=/opt/homebrew/bin:$PATH

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

ZSH_THEME="spaceship"

# Uncomment the following line to disable bi-weekly auto-update checks.
DISABLE_AUTO_UPDATE="true"

plugins=(
  git
  node
  vscode
  zsh-syntax-highlighting
)

source $ZSH/oh-my-zsh.sh
source /Users/amanhimself/.oh-my-zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

After installing the syntax highlight plugin, it starts to recognize the commands:

![ss4](https://i.imgur.com/UxRzm98.png)

> Copy [dotfiles](https://github.com/amandeepmittal/dotfiles)

## Setting up terminal: iTerm

My favorite terminal app that I have been using for years is [iTerm](https://iterm2.com/downloads.html).

- Enable Working Directory for New Split Panes: General -> Advance Configuration

![iterm1](https://i.imgur.com/3aJWgxM.jpg)

- Text:

![iterm2](https://i.imgur.com/O4P9XjN.jpg)

- Colors: For the overall looks and appearance, I use [Dracula Pro Color Presets created by Zen Rocha](https://draculatheme.com/pro).

![iterm3](https://i.imgur.com/lu2R7Mr.jpg)

- Window:
  - Transparency: 5
  - Blur: 20

## Installing Homebrew

On December 1, 2020, the Homebrew team announced on their [website](https://brew.sh/2020/12/01/homebrew-2.6.0/) about the version release `2.6.0`. The most significant changes among others they listed were the support for macOS Big Sur, using `brew` commands instead of `brew cask` and beginning to support macOS M1 and Apple Silicon or ARM-based chips.

Using the terminal, you can install the Homebrew by executing the default command:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**brew installs**:

- Node.js and npm via Node Version Manager (NVM). [Read the complete blog post on how to install Node.js using NVM](https://amanhimself.dev/blog/install-nodejs-using-nvm-on-macos-m1/).
- [scrcpy](https://github.com/Genymobile/scrcpy) (control Android devices connect via USB on mac)
- ~~Karabiner-Elements (remapping function keys for Macbook Air or with Macbooks without touchbar)~~
- install [Watchman](https://facebook.github.io/watchman/) to watch changes in the filesystem using the command: `brew install watchman`

## Install git

I did install Git using brew command:

```shell
brew install git
```

To authenticate GitHub to be used from the terminal environment, I'd recommend you to check out the [official document](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) on creating and accessing personal tokens.

> _🔥 Tip:_ As of Git version `2.28` there is a new config option to set the default branch to `main`. Set it globally and forget about it.

```shell
git config --global init.defaultBranch main
```

## Xcode

After installing Git, for me, the next step is to install [Xcode app](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from Apple's App Store.

Then, install "command line tools". It is required by many of the formulae in Homebrew.

```shell
xcode-select --install
```

After installing it, make sure to open it for the first time, from the menu bar, open **Xcode > Preferences > Locations** and make sure that **Command Line Tools** point towards the current Xcode app.

![ss3](https://i.imgur.com/ZXS88QM.png)

### After installing Node.js

Node.js comes with default package manager `npm`. Set defaults for it:

```shell
npm set init.author.name "your name"
npm set init.author.email "you@example.com"
npm set init.author.url "example.com"
```

### Optional: Karabiner-Elements to remap function keys

> No longer using Karabiner-Elements as I gave up my Macbook Air

When I bought Macbook Air M1, it had function keys (that got me excited), but I don't understand why Apple decided to replace function keys that would allow me to control Keyboard Brightness! And moreover, replace it with "Do Not Disturb".

_Why? That got me confused 🤷_

I found this tool called [karabiner Elements](https://karabiner-elements.pqrs.org/) that can be installed as a brew formula:

```shell
brew install karabiner-elements
```

![screenshot-of-function-keys-on-macbbok-air-m1-2020](https://i.imgur.com/n1jGglG.jpg)

Here are the key mappings I am using now:

![key-mappings-with karabiner-elements](https://i.imgur.com/uoqR0Ht.png)

## VSCode

VSCode and VS Code Insiders are currently supported on ARM chips (as of March 13, 2021). Download the installer for Insiders edition from [here](https://code.visualstudio.com/insiders/) and for VSCode [here](https://code.visualstudio.com/download).

![ss5](https://i.imgur.com/Yd4wQ10.png)

I am still using the same VSCode configuration from my previous setup:

```json
{
  // VSCODE EDITOR
  "workbench.colorTheme": "fairyfloss",
  "workbench.startupEditor": "welcomePage",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.editor.tabSizing": "shrink",
  "security.workspace.trust.untrustedFiles": "open",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "workbench.editor.enablePreview": false,
  "window.restoreFullscreen": true,
  "editor.tabSize": 2,
  "editor.fontSize": 14,
  "editor.minimap.enabled": false,
  "editor.cursorBlinking": "phase",
  "editor.fontLigatures": false,
  "editor.wordWrap": "on",
  "editor.cursorSmoothCaretAnimation": true,
  "editor.tabCompletion": "on",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.semanticHighlighting.enabled": true,
  "editor.guides.bracketPairs": true,
  "breadcrumbs.enabled": false,
  "explorer.openEditors.visible": 0,
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
  "extensions.autoUpdate": false,
  // --------------------------------------
  // EXPO TOOLS
  "json.schemas": [
    {
      "name": "vscode-expo-manifest",
      "url": "file:///Users/amanhimself/Library/Application%20Support/Code/User/globalStorage/bycedric.vscode-expo/manifest-42.0.0.json",
      "fileMatch": ["app.json", "app.config.json"]
    }
  ],
  // --------------------------------------
  // CODE::STATS EXTENSION
  "codestats.apikey": "api-key",
  // --------------------------------------
  // READ TIME EXTENSION
  "readTime.enabled": true,
  // --------------------------------------
  // HIGHLIGHT MATCHING TAG EXTENSION
  "highlight-matching-tag.styles": {
    "opening": {
      "name": {
        // surround is border
        "surround": "yellow"
      }
    }
  },
  // --------------------------------------
  // INTEGRATED TERMINAL
  // "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.external.osxExec": "iTerm.app",
  "terminal.integrated.fontSize": 12,
  // --------------------------------------
  // NPM
  "npm-intellisense.importES6": true,
  // --------------------------------------
  // TS IMPORT SUGGESTION
  "typescript.suggest.paths": false,
  // --------------------------------------
  // NATIVE BRACKET PAIR COLOR SETTINGS
  "editor.bracketPairColorization.enabled": true,
  "workbench.colorCustomizations": {
    "editorBracketHighlight.foreground1": "#ffb86c",
    "editorBracketHighlight.foreground2": "#8be9fd",
    "editorBracketHighlight.foreground3": "#bd93f9",
    "editorBracketHighlight.foreground4": "#50fa7b",
    "editorBracketHighlight.foreground5": "#f1fa8c",
    "editorBracketHighlight.foreground6": "#abb2c0",
    "editorBracketHighlight.unexpectedBracket.foreground": "#ff5555"
  },
  // --------------------------------------
  // PRETTIER ----------------------------------
  "prettier.singleQuote": true,
  "prettier.jsxSingleQuote": true,
  "prettier.trailingComma": "none",
  "prettier.arrowParens": "avoid",
  "prettier.proseWrap": "preserve",
  "prettier.quoteProps": "as-needed",
  "prettier.jsxBracketSameLine": false,
  "prettier.bracketSpacing": true,
  "prettier.tabWidth": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // Markdown
  "[markdown]": {
    "editor.quickSuggestions": true
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
  // JSON with Comments
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // HTML
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // ----------------------------------
  // ESLINT
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  // --------------------------------------
  // LANGUAGES SPECIFIC
  "javascript.updateImportsOnFileMove.enabled": "always",
  "security.workspace.trust.banner": "never",
  "emmet.includeLanguages": {
    "typescript": "typescriptreact",
    "javascript": "javascriptreact"
  }
}
```

### Themes

I usually like to switch between a dark and a light theme.

- For the dark theme where I spent most of my time, I am was previously using [morgan.codes-theme](https://marketplace.visualstudio.com/items?itemName=morgan-codes.morgan-codes-vscode-theme), but now I am using [fairyFloss](https://marketplace.visualstudio.com/items?itemName=nopjmp.fairyfloss).
  - Other themes I switch between:
    - Quiet Light
    - [Cyberpunk](https://marketplace.visualstudio.com/items?itemName=max-SS.cyberpunk)
- For file icons, I love [Material-Icon-Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme).
- For terminal prompt, I use [Spaceship ZSH](https://github.com/denysdovhan/spaceship-prompt).
- Font: [Jetbrains Mono font](https://www.jetbrains.com/lp/mono/).

### Extensions

I use VSCode editor for both writing code and writing blog posts. Thus, the list of extensions below is the combination of extensions that fulfills both of my purposes.

- [Auto Close tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
- ~~Bracket Pair Colorizer 2~~ - VSCode now supports this natively. Check out my post 👉 [How to configure VSCode Bracket Pair Colors Natively](https://amanhimself.dev/blog/how-to-configure-vscode-bracket-colors-natively/)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Code::Stats](https://codestats.net/)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [ESLint](https://eslint.org/)
- [Expo Tools](https://marketplace.visualstudio.com/items?itemName=byCedric.vscode-expo)
- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
- [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
- [Indent rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [iOS common files](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-ios-common-files)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [MDX](https://marketplace.visualstudio.com/items?itemName=silvenon.mdx) - For syntax highlighting of `.mdx` files
- ~~[npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)~~ Deprecated by VSCode team
- [npm intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Path intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Prettier](https://prettier.io/)
- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
- [Read Time](https://marketplace.visualstudio.com/items?itemName=johnpapa.read-time)
- [SVG Viewer](https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [Word Count](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount)
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

## Global NPM Packages I use

- ~~[gatsby-cli](https://www.npmjs.com/package/gatsby-cli) To build and test out [my personal blog built with Gatsby](https://amanhimself.dev/).~~
- [expo-cli](https://docs.expo.io/workflow/expo-cli/)
- [npm-check](https://www.npmjs.com/package/npm-check) to check for outdated, incorrect, and unused dependencies.
- [git-watch-log](https://github.com/sukima/git-watch-log) to watch a git repo and recent changes.

## For React Native Development

- install following [cocoapods](https://formulae.brew.sh/formula/cocoapods): `brew install cocoapods`
- According to [a post by React Native guru Jamon Holmgren](https://shift.infinite.red/dont-use-the-wrong-jdk-for-react-native-if-you-re-using-an-m1-mac-252533dd47a2), I learned that all this time I've been using installing JDK wrong on my m1 machine 😱. To learn more how to install "the m1 way", go to his post and give it a read (and leave an appreciation clap 😄)
- Versions later than Arctic Fox Canary now supports [Apple's Silicon based machines](https://androidstudio.googleblog.com/2021/04/android-studio-arctic-fox-canary-15.html) for Android Studio. You can also check out the [archive](https://developer.android.com/studio/archive) to see what beta/canary version supports Silicon machines
- Then install Android SDK (I do not prefer AVD and use an actual device for testing)
- [scrcpy](https://github.com/Genymobile/scrcpy) to display and control Android devices connect via USB on Mac

<br />

> ⚛️ For more instructions on how to set up a development environment for React Native, please follow the [official documentation here](https://reactnative.dev/docs/environment-setup).

## Rosetta 2

> Update: I am not using the Rosetta environment to install anything on the secondary machine since August 2021. That is the reason I've mentioned it at the end of the post.

[Rosetta 2](https://developer.apple.com/documentation/apple_silicon/about_the_rosetta_translation_environment) is the lifeline that allows you to run apps designed for Intel-based chips that use `x86` architecture on ARM-based chips (in this case M1). This solution is provided by Apple in the form of an emulator and doesn't come pre-installed. You have to install it manually. Fire up the Terminal application that comes pre-installed on the Big Sur and let your first command to execute be:

```shell
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

If you decide not to put the flag ` --agree-to-license`, you will be prompted by Apple's interactive install, and you will have to agree to their terms and license conditions to use it.

## Conclusion

That’s the setup I now use for my JavaScript, Node.js, React and React Native. I think it's a good machine. Hopefully, M1 is just the beginning of a new era of powerful computers for daily work use 🤞

🤔 The only thing left for me is to find a way to transfer all laptop swag/stickers from my Macbook Air 2017 to Pro. I miss having them on this one.

[**isapplesiliconready.com**](https://isapplesiliconready.com/for/developer) is another helpful link I found to check what is compatible to work on Apple Silicon chips natively or using Rosetta or not optimized at all.
