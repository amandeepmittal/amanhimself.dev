---
title: 'Setup Macbook M1 for Web and React Native development'
slug: 'setup-macbook-m1'
date: '2023-05-23'
thumbnail: '/thumbnails/apple.png'
tag: 'tools'
canonicalUrl: 'https://amanhimself.dev/blog/setup-macbook-m1/'
---

> 🕑 This article was originally written on March 14, 2021. Since then, it has been updated many times to reflect my setup process. In 2023, I decided to re-write this article from scratch.

![cover_image](https://i.imgur.com/tAJjTOU.png)

It's 2023, and I am still coming back to this article. I wrote this originally in 2021 to keep track of what I need to start when setting up a new laptop. Since then, I have had two Macbook Pros using an Apple Silicon processor (M1). I try to keep this article up to date.

I believe small optimizations help you go faster in the long run. Also, a flavor of personalization makes my developer experience more enjoyable. I like to keep two separate setups, one for work and the other for personal use and fun. However, often I end up switching between both. Having the same set of tools and configurations helps me just be me. It also helps me keep my setup portable and up-to-date (have had those days where I lost everything).

## Step 1: Install Xcode and Command Line Tools

To get started, open the App Store on the Mac and install [Xcode](https://apps.apple.com/in/app/xcode/id497799835?mt=12). It's a large download, so it might take a while.

Once installed, open the Terminal app on the Mac and run:

```shell
xcode-select --install && sudo xcodebuild -license
```

#### Step 1.1: Verify Command Line Tools installation

After installing Xcode and command line tools, open the app. Then, from the menu bar, open **Xcode > Preferences > Locations** and make sure that **Command Line Tools** point towards the current Xcode app.

![ss3](https://i.imgur.com/ZXS88QM.png)

## Step 2: Install Warp terminal

> Previously, I've used iTerm2 as y default terminal app over the years. Find more info about iterm2 in the Alternate tools section at the end of this post.

I recently started using [Warp](https://warp.dev) as my first choice for a terminal app on Mac. After downloading the app, start the app:

- Go to **Appearance**
- Set theme to Dracula
- Window Opacity: 95
- Window Blur Radius: 17

### Step 2.1: Install Oh My Zsh

[ZSH](https://github.com/zsh-users/zsh) is the default shell in macOS. However, I like to use [Oh My Zsh](https://ohmyz.sh/) to manage the ZSH configuration, plugins, and a theme to prettify the terminal (especially when using iterm2 previously).

To install, run the command below:

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

After installation, make sure that the file `.zshrc` is exporting the below path at the top:

```shell
# Path to your oh-my-zsh installation
export ZSH="$HOME/.oh-my-zsh"
```

The `$HOME` should be `/Users/<your-macos-username>`. You can verify this by running:

```shell
$ echo $HOME
```

### Step 2.2: Install syntax highlighting plugin

The first I like to do after setting up the bare minimum ZSH configuration is to install a plugin called [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md). It provides syntax highlighting for the ZSH shell. Execute the series below commands in the terminal window:

```shell
# depending on the /plugins folder in your local setup
cd $HOME/.oh-my-zsh/plugins

# then clone the git repository
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

On iterm2, after installing the syntax highlight plugin, it starts to recognize the commands:

![ss4](https://i.imgur.com/UxRzm98.png)

### Only for iterm2: Install a theme

The next step is to install [spaceship-prompt](https://github.com/spaceship-prompt/spaceship-prompt) theme. Follow the steps described in [oh-my-sh](https://github.com/spaceship-prompt/spaceship-prompt#oh-my-zsh) section.

### Final ZSH configuration

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

# ZSH_THEME="spaceship"

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

## Step 3: Change system settings

System preferences and settings that I prefer. These settings are available in the Systems Settings:

- **Siri**:
  - Disable Ask Siri
- **Desktop & Dock**:
  - Enable "Automatically hide and show the Dock"
  - Set "Automatically hide and show the menu bar in full screen" to "In Full Screen Only"
  - Set Recent documents, applications and servers to "None"
  - Size: 30%
  - Magnification: 45%-50%
- **Trackpad**:
  - Point & click
    - Enable secondary click with the bottom right corner
    - Enable Tap to click with one finger
    - Tracking speed: 90%
    - Click: Medium
    - Force click and haptic feedback: Disable
    - Look up & data detectors: Disable
  - Scroll & zoom
    - Natural scrolling: Disable
  - More Gestures
    - Swipe between pages: Off
- **Spotlight**:
  - Disable search except for Applications, Calculator, Conversion, Developer, Definition, and System Settings.
- **Finder settings**:
  - Advanced > Show filename extensions
  - Enable showing hidden files (hold Cmd + Shift dot(`.`) in a Finder window)
  - Enable: View -> Show Path Bar, Show Status Bar
- **Lock Screen**:
  - Start screen saver when inactive: 1 hour
  - Turn display off on battery when inactive: For 3 hours
  - Turn display off on power adapter when inactive: For 3 hours

## Step 4: Install homebrew

On December 1, 2020, the Homebrew team announced on their [website](https://brew.sh/2020/12/01/homebrew-2.6.0/) about the version release `2.6.0`. The most significant changes they listed were:

- The support for macOS Big Sur.
- Using `brew` commands instead of `brew cask`.
- Beginning to support macOS M1 and Apple Silicon or ARM-based chips.

Using the terminal, you can install the Homebrew by executing the default command:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Step 5: Install Git

To install Git, run the command:

```shell
brew install git
```

To authenticate GitHub to be used from the terminal environment, I recommend you check out the [official document](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) on creating and accessing personal tokens.

> _🔥 Tip:_ As of Git version `2.28`, there is a new config option to set the default branch to `main`. Set it globally and forget about it.

```shell
git config --global init.defaultBranch main
```

To enable colors in the output, run the command:

```shell
git config --global color.ui auto
```

## Step 6: Install homebrew packages

- Node.js and npm via Node Version Manager (NVM). [Read the entire blog post on how to install Node.js using NVM](https://amanhimself.dev/blog/install-nodejs-using-nvm-on-macos-m1/).

Run the following script to install other packages from homebrew:

```shell
brew install yarn
brew install scrcpy
brew install watchman
brew install exa
brew install imageoptim
```

Some highlights from the above script:

- [Watchman](https://facebook.github.io/watchman/) to watch changes in the filesystem.
- [scrcpy](https://github.com/Genymobile/scrcpy) (control Android devices connect via USB on Mac)
- [exa](https://github.com/ogham/exa#readme) a modern replacement for `ls`.
- [imageoptim]((https://imageoptim.com/mac) for compressing image files. See [ImageOptim Settings](#imageoptim-settings) for how to set it up.

## Step 7: After installing Node.js

Node.js comes with the default package manager `npm`. Set defaults for it:

```shell
npm config set init-author-name "your name"
npm config set init-author-url "example.com"
npm config set init-license MIT
```

### Step 8: Install global npm packages

- [eas-cli](https://www.npmjs.com/package/eas-cli) For work and personal use:

```shell
npm i -g eas-cli
```

Also, I use the following command to update global packages:

```shell
npx npm-check -gu
```

## Step 9: VSCode

VSCode and VS Code Insiders are currently supported on ARM chips (March 13, 2021). Download the installer for Insiders edition from [here](https://code.visualstudio.com/insiders/) and for VSCode [here](https://code.visualstudio.com/download).

![ss5](https://i.imgur.com/Yd4wQ10.png)

I am using the following VSCode configuration:

```json
{
  "workbench.startupEditor": "welcomePage",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.editor.tabSizing": "shrink",
  "security.workspace.trust.untrustedFiles": "open",
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "workbench.editor.enablePreview": false,
  "window.restoreFullscreen": true,
  "editor.tabSize": 2,
  "editor.fontSize": 13.5,
  "editor.minimap.enabled": false,
  "editor.cursorBlinking": "phase",
  "editor.fontLigatures": false,
  "editor.wordWrap": "on",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.tabCompletion": "on",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.semanticHighlighting.enabled": true,
  "editor.guides.bracketPairs": true,
  "explorer.openEditors.visible": 0,
  "files.trimTrailingWhitespace": true,
  "search.exclude": {
    "**/node_modules": true,
    "**/*.code-search": true,
    "dist/": true,
    "yarn.lock": true,
    "package-lock.json": true,
    ".gitignore": true,
    ".expo": true,
    ".vscode": true
  },
  "extensions.autoUpdate": false,
  // --------------------------------------
  // --------------------------------------
  // CODE::STATS EXTENSION
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
  "terminal.external.osxExec": "iTerm.app",
  // "terminal.external.osxExec": "warp.app",
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
    "editorBracketHighlight.unexpectedBracket.foreground": "#ff5555",
    "[morgan.codes]": {
      "gitDecoration.ignoredResourceForeground": "#434343"
    },
    "[Expo Dark]": {
      // "activityBar.background": "#635985",
      "activityBarBadge.background": "#fc4384",
      "activityBarBadge.foreground": "#ffffff",
      // "activityBar.activeBackground": "#bd93f9",
      "activityBar.activeBorder": "#fc4384",
      "gitDecoration.ignoredResourceForeground": "#434343",
      "statusBar.background": "#fc4384",
      "statusBar.noFolderBackground": "#fc4384",
      // Gutter
      "editorGutter.deletedBackground": "#ff0055",
      "editorGutter.addedBackground": "#fc4384",
      "editorGutter.modifiedBackground": "#9765c9",

      // Selection and matches
      "editor.selectionHighlightBorder": "#e18cc9",
      "editor.selectionHighlightBackground": "#635985",
      "editor.selectionForeground": "#eff8ff",
      "editor.findMatchHighlightBackground": "#ff2b7c8e",
      "editor.hoverHighlightBackground": "#ff000013",
      "editor.lineHighlightBackground": "#2b2b2b50",
      "editor.lineHighlightBorder": "#00000000",
      "editorOverviewRuler.bracketMatchForeground": "#635985"
    }
  },
  // --------------------------------------
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // Markdown
  "[markdown]": {
    "editor.quickSuggestions": {
      "comments": "on",
      "strings": "on",
      "other": "on"
    }
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
  // ERROR LENS
  // "errorLens.fontSize": "11",
  // "errorLens.onSave": true,
  // "errorLens.enabledDiagnosticLevels": ["error", "warning", "hint"],
  // "workbench.colorCustomizations": {
  //   "errorLens.hintForeground": "#ffc600A1",
  //   "errorLens.hintBackground": "#ff00dd2f",
  //   "errorLens.errorBackground": "#ff000005",
  //   "editor.selectionBackground": "#ff1493",
  //   "editor.selectionHighlightBackground": "#ff1493",
  //   "editor.findMatchBackground": "#ff1493",
  //   "editor.findMatchHighlightBackground": "#3cb371"
  // },
  // "errorLens.exclude": ["never (read|used)"],
  // --------------------------------------
  // LANGUAGES SPECIFIC
  "javascript.updateImportsOnFileMove.enabled": "always",
  "security.workspace.trust.banner": "never",
  "emmet.includeLanguages": {
    "typescript": "typescriptreact",
    "javascript": "javascriptreact"
  },
  "cSpell.userWords": [
    "Appbar",
    "asyncstorage",
    "backgrounded",
    "backoff",
    "Cacheable",
    "cancelation",
    "Chakra",
    "concurrencies",
    "Contentful",
    "Ecommerce",
    "Entypo",
    "Firestore",
    "Grammarly",
    "Ionicons",
    "launchable",
    "nocheck",
    "Parens",
    "Podfile",
    "prefetch",
    "Pressable",
    "Transifex",
    "Turborepo",
    "undeployed",
    "Vercel",
    "vercelians",
    "yantramanav",
    "zustand"
  ],
  "git.autofetch": true,
  "cSpell.language": "en,en-US",
  "cSpell.enableFiletypes": ["markdown", "mdx"],
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "plaintext": true,
    "markdown": true
  },
  "workbench.colorTheme": "Expo Light",
  "window.commandCenter": true,
  "customizeUI.fontSizeMap": {
    "13px": "12px",
    "12px": "11px",
    "window-title": "12px", // Window title font when using custom titlebar
    "tab-title": "12px", // Used for editor tab titles
    "monospace": "11px" // Used for monospace fonts in user interface
  },
  "react-native-tools.showUserTips": false,
  "errorLens.fontSize": "12",
  "grammarly.files.include": [
    "**/README.md",
    "**/readme.md",
    "**/*.txt",
    "**/*.md",
    "**/*.mdx"
  ],
  "css.lint.unknownAtRules": "ignore",
  "workbench.editorAssociations": {
    "*.js": "default"
  },
  "githubPullRequests.pullBranch": "never"
```

### VSCode themes

I usually like to switch between a dark and a light theme.

For a light theme, I prefer:

- Quiet Light (built-in)
- Expo Light (unreleased -- based on [Expo Docs](https://docs.expo.dev/))

For the dark theme where I spent most of my time with fairyFloss.

- [fairyFloss](https://marketplace.visualstudio.com/items?itemName=nopjmp.fairyfloss)
- Expo Dark theme (unreleased -- based on [Expo Docs](https://docs.expo.dev/))

For file icons, I love [Material-Icon-Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme).

### VSCode extensions

- [Auto Close tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Babel JavaScript](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel)
- ~~Bracket Pair Colorizer 2~~ - VSCode now supports this natively. See [How to configure VSCode Bracket Pair Colors Natively](https://amanhimself.dev/blog/how-to-configure-vscode-bracket-colors-natively/)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Code::Stats](https://codestats.net/)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Customize UI](https://marketplace.visualstudio.com/items?itemName=iocave.customize-ui)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [ESLint](https://eslint.org/)
- [Expo Tools](https://marketplace.visualstudio.com/items?itemName=byCedric.vscode-expo)
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [Grammarly](https://marketplace.visualstudio.com/items?itemName=znck.grammarly)
- [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
- [Indent rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [iOS common files](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-ios-common-files)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [MDX](https://marketplace.visualstudio.com/items?itemName=silvenon.mdx) - For syntax highlighting of `.mdx` files
- [npm intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Prettier](https://prettier.io/)
- [Paste JSON as code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)
- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
- [Read Time](https://marketplace.visualstudio.com/items?itemName=johnpapa.read-time)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Version Lens](https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens)
- [WakaTime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime)
- [Word Count](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount)

## Apps

### Step 10: Download browsers

- [Arc Browser](https://arc.net/) from Gmail as it is in private beta. Login to work Gmail and Calendar.
- [Google Chrome](https://www.google.com/chrome/?brand=YTUH&gclid=EAIaIQobChMI9vmFxpL0-AIVDJ1LBR11UATAEAAYASAAEgJBQPD_BwE&gclsrc=aw.ds) Login to work and personal Gmail.
- [Brave Browser](https://brave.com/download/).

Use Safari for personal email.

### Other apps on my macOS

- Android Studio
- [Insomnia](https://insomnia.rest/) as a REST API client
- Slack and Discord (for work and community)
- There (to track team mate's timezones)
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
- Telegram
- [Android file transfer](https://www.android.com/filetransfer/)

#### Chrome settings

- Sync settings and switch **"Developer Mode"** on.
- **Extensions** that I use:
  - [Detailed SEO extension](https://chrome.google.com/webstore/detail/detailed-seo-extension/pfjdepjjfjjahkjfpkcgfmfhmnakjfba?hl=en)
  - [Redefined GitHub](https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf)
  - [Twemex: Sidebar for Twitter](https://chrome.google.com/webstore/detail/twemex-sidebar-for-twitte/amoldiondpmjdnllknhklocndiibkcoe?hl=en)
  - [Minimal Twitter](https://chrome.google.com/webstore/detail/minimal-twitter/pobhoodpcipjmedfenaigbeloiidbflp?hl=en)
  - [Medium Enhanced Stats](https://chrome.google.com/webstore/detail/medium-enhanced-stats/jnomnfoenpdinfkpaaigokicgcfkomjo?hl=en)
  - [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)
  - Grammarly
  - [Toby](https://www.gettoby.com/) to organize tabs
  - [DF Tube (Distraction Free for YouTube™)](https://chrome.google.com/webstore/detail/df-tube-distraction-free/mjdepdfccjgcndkmemponafgioodelna?hl=en)

### ImageOptim settings

The custom config I use for ImageOptim app:

![General settings in ImageOptim](https://i.imgur.com/zkKRiyK.png)

![Quality settings in ImageOptim](https://i.imgur.com/2rMbsUW.png)

![Optimization settings in ImageOptim](https://i.imgur.com/CwQtSbL.png)

> Copy [dotfiles](https://github.com/amandeepmittal/dotfiles)

## For React Native Development

Follow [React Native documentation for info on how to install open JDK and Android Studio](https://reactnative.dev/docs/environment-setup?platform=android).

## Alternate tools

Tools and apps that I've used in the past that I may come back to one day.

### iterm2

My favorite terminal app that I have been using for years is [iTerm2](https://iterm2.com/downloads.html).

- Enable Working Directory for New Split Panes: General -> Advanced Configuration

![iterm1](https://i.imgur.com/3aJWgxM.jpg)

- Text:

![iterm2](https://i.imgur.com/VwIK2Be.jpg)

- Colors: For the overall looks and appearance, I use [Dracula Pro Color Presets created by Zen Rocha](https://draculatheme.com/pro).

![iterm3](https://i.imgur.com/lu2R7Mr.jpg)

- Window:
  - Transparency: 5
  - Blur: 20

## Rosetta 2

> Update: I am not using the Rosetta environment to install anything on the secondary machine since August 2021. That is why I've mentioned it at the end of the post.

[Rosetta 2](https://developer.apple.com/documentation/apple_silicon/about_the_rosetta_translation_environment) is the lifeline that allows you to run apps designed for Intel-based chips that use `x86` architecture on ARM-based chips (in this case M1). This solution is provided by Apple as an emulator and doesn't come pre-installed. You have to install it manually. Fire up the Terminal application that comes pre-installed on the macOS and execute the following command:

```shell
/usr/sbin/softwareupdate --install-rosetta --agree-to-license
```

If you decide not to put the flag ` --agree-to-license`, you will be prompted by Apple's interactive install, and you will have to agree to their terms and license conditions to use it.

## Conclusion

That’s the setup I now use for my JavaScript, Node.js, React, React Native and documentation work. I think it's a _great_ machine. Hopefully, M1 is just the beginning of a new era of powerful computers for daily work use.

🤔 The only thing left for me is to find a way to transfer all laptop swag/stickers from my Macbook Air 2017 to Pro. I miss having them on this one.

[**isapplesiliconready.com**](https://isapplesiliconready.com/for/developer) is another helpful link I found to check what is compatible to work on Apple Silicon chips natively or using Rosetta or not optimized at all.
