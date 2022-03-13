---
title: 'Setup Macbook M1 for Web and React Native development'
slug: 'setup-macbook-m1'
date: '2021-03-14'
thumbnail: '/thumbnails/vscode.png'
tag: 'tools'
canonicalUrl: 'https://amanhimself.dev/blog/setup-macbook-m1/'
---

> 🕑 Updated on: March 14, 2022

![cover_image](https://i.imgur.com/tAJjTOU.png)

_Note:_ Most of this article was updated in August 2021. The Macbook Pro M1 I was using crashed and stopped working without any reason on [August 25, 2021](https://twitter.com/amanhimself/status/1430788513226702849). In just seven months of use.

It took time to get it repaired. That forced me to buy another laptop. While setting up the new laptop, I thought it is an excellent time to update this post.

I recently upgraded from [Macbook Air 2017](https://www.instagram.com/p/B6lInd3AhsN/) to Macbook Pro with an M1 chip. My four-year-old Macbook Air was giving up. The performance to run heavy tasks like using the iOS simulator when developing and working on React Native apps was declining. I had long given up using the Android emulator and used an actual Android device for testing. December 2020 was the time I decided its time to upgrade.

I had a long internal discussion with myself for almost a month about whether I should upgrade to M1 or stick with Intel-based chips and spend them bucks. Don't get me wrong here, M1 is not cheap either as I did go for a RAM upgrade to max limits, which is currently 16GB in the base model.

After going through some online reviews and research, the kind of performance I was expecting has been worth it so far (it is fast, no doubt). I received it two weeks back when writing this post, and since then, I have installed all the necessary tools and utilities that help me work on [Web development](https://learnersbucket.com/) and React Native apps.

**My local environment currently includes:**

- Homebrew ([supports Apple Silicon machines](https://brew.sh/2020/12/01/homebrew-2.6.0/) since `2.6.0`)
- Git
- Node.js
- npm
- Zsh
- Oh My Zsh
- iTerm
- Xcode
- yarn
- VSCode
- Rosetta 2

**OS apps**:

- Brave
- Android Studio
- [Insomnia](https://insomnia.rest/) as REST API client
- Xcode
- Slack or Discord (for work and community)
- There (to track team mate's timezone)
- LICEcap (for gifs)
- Zoom (for work)
- GitHub Desktop App
- [Cleanshot](https://cleanshot.com/) (for screenshots)
- Google Chrome
  - set to default
    - First things to do:
      - **Log in to:** Gmail, Twitter, GitHub, Outlook
      - **Developer mode on**
    - Extensions:
      - [Detailed SEO extension](https://chrome.google.com/webstore/detail/detailed-seo-extension/pfjdepjjfjjahkjfpkcgfmfhmnakjfba?hl=en)
      - [Redefined GitHub](https://chrome.google.com/webstore/detail/refined-github/hlepfoohegkhhmjieoechaddaejaokhf)
      - [Octolinker](https://chrome.google.com/webstore/detail/octolinker/jlmafbaeoofdegohdhinkhilhclaklkp/related?hl=en)
      - [Twemex: Sidebar for Twitter](https://chrome.google.com/webstore/detail/twemex-sidebar-for-twitte/amoldiondpmjdnllknhklocndiibkcoe?hl=en)
      - [Minimal Twitter](https://chrome.google.com/webstore/detail/minimal-twitter/pobhoodpcipjmedfenaigbeloiidbflp?hl=en)
      - [Medium Enhanced Stats](https://chrome.google.com/webstore/detail/medium-enhanced-stats/jnomnfoenpdinfkpaaigokicgcfkomjo?hl=en)
      - [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)
      - Grammarly
      - [Toby](https://www.gettoby.com/) to organize tabs

**System Settings**:

- Disable Ask Siri
- Disable Spotlight search except Applications, Calculator, Conversion, Definition, and System Preferences.
- Trackpad:
  - Fix direction: Scroll & Zoom > Natural off
  - Right click: Point & Click > Secondary Click
  - Disable dictionary lookup: Point & Click > Look up & data detectors off
  - More gestures > Swipe between pages off & App Exposé off
- Finder settings:
  - Preferences > Advanced > Show filename extensions
  - Enable show path bar: View > Show Path Bar
- Dock:
  - Turn auto hiding on

> Copy [dotfiles](https://github.com/amandeepmittal/dotfiles).

## System Preferences

Override default system preferences with from a terminal window:

```shell
# show hidden files
defaults write com.apple.finder AppleShowAllFiles YES

# show status bar
defaults write com.apple.finder ShowStatusBar -bool true

killall Finder;
```

## iTerm

My favorite terminal app that I have been using for years is [iTerm](https://iterm2.com/downloads.html). I am currently using two versions of iTerm on my setup. One with Rosetta 2 enabled and the default one. This way, I can only use the Rosetta 2 emulator when required. There are no performance issues I have found with using iTerm with Rosetta 2 for ARM-based applications.

![ss0](https://i.imgur.com/yOAV1or.png)

If you'd like a similar setup, go to the `Applications` folder in your Macbook and duplicate the `iTerm` application.

![ss1](https://i.imgur.com/2C5jrsb.png)

You can rename the duplicated iTerm app. I have renamed it to `iTerm_rosetta` to differentiate between the two. Right-click the duplicated app and click **Get Info**. In the **General**, check the box where it says **Open using Rosetta**.

![ss2](https://i.imgur.com/7ipJmzM.png)

Now, if you open the second terminal, it will be using Rosetta 2 emulator by default.

**Other iTerm profile settings that I use:**

Recently I started using [Jetbrains Mono font](https://www.jetbrains.com/lp/mono/).

![ss6](https://i.imgur.com/8Gwhdq4.png)

For the overall looks and appearance, I use [Dracula Pro Color Presets created by Zen Rocha](https://draculatheme.com/pro).

![ss7](https://i.imgur.com/5VSskf7.gif)

And my last favorite thing is to split the working directory into two more different tabs using `Command + D` for horizontal panes.

Make sure to have the following setting configured from

**General > Working Directory > select Advanced Configuration > click button Edit... > select Reuse previous session's directory under Working Directory for New Split Panes.**

![ss8](https://i.imgur.com/NDdHDch.png)

For terminal prompt, I use [Spaceship ZSH](https://github.com/denysdovhan/spaceship-prompt).

## Homebrew

On December 1, 2020, the Homebrew team announced on their [website](https://brew.sh/2020/12/01/homebrew-2.6.0/) about the version release `2.6.0`. The most significant changes among others they listed were the support for macOS Big Sur, using `brew` commands instead of `brew cask` and beginning to support macOS M1 and Apple Silicon or ARM-based chips.

Using the terminal, you can install the Homebrew by executing the default command:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**brew installs**:

- Node.js and npm via Node Version Manager (NVM). [Read the complete blog post on how to install Node.js using NVM](https://amanhimself.dev/blog/install-nodejs-using-nvm-on-macos-m1/).
- [scrcpy](https://github.com/Genymobile/scrcpy) (control Android devices connect via USB on mac)
- JDK (required for React Native)
- Karabiner-Elements (remapping function keys for Macbook Air or with Macbooks without touchbar)
- watchman (required for React Native)

### After installing Node.js

Node.js comes with default package manager `npm`. Set defaults for it:

```shell
npm set init.author.name "your name"
npm set init.author.email "you@example.com"
npm set init.author.url "example.com"
```

## Xcode

After installing Git, for me, the next step is to install [Xcode app](https://apps.apple.com/us/app/xcode/id497799835?mt=12) from Apple's App Store.

Then, install "command line tools". It is required by many of the formulae in Homebrew.

```shell
xcode-select --install
```

After installing it, make sure to open it for the first time, from the menu bar, open **Xcode > Preferences > Locations** and make sure that **Command Line Tools** point towards the current Xcode app.

![ss3](https://i.imgur.com/ZXS88QM.png)

### What is Karabiner-Elements?

When I bought Macbook Air M1, it had function keys (that got me excited), but I don't understand why Apple decided to replace function keys that would allow me to control Keyboard Brightness?! And moreover, replace it with "Do Not Disturb".

Why? That got me confused 🤷

I found this tool called [karabiner Elements](https://karabiner-elements.pqrs.org/) that can be installed as a brew formula:

```shell
brew install karabiner-elements
```

![screenshot-of-function-keys-on-macbbok-air-m1-2020](https://i.imgur.com/n1jGglG.jpg)

Here are the key mappings I am using now:

![key-mappings-with karabiner-elements](https://i.imgur.com/uoqR0Ht.png)

## Git

I did install Git using brew command:

```shell
brew install git
```

To authenticate GitHub to be used from the terminal environment, I'd recommend you to check out the [official document](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) on creating and accessing personal tokens.

> _🔥 Tip:_ As of Git version `2.28` there is a new config option to set the default branch to `main`. Set it globally and forget about it.

```shell
git config --global init.defaultBranch main
```

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
  // NATIVE BRACKER PAIR COLOR SETTINGS
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
- [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
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

- [install Node.js](http://localhost:3000/blog/install-nodejs-using-nvm-on-macos-m1/)
- install [Watchman](https://facebook.github.io/watchman/) to watch changes in the filesystem using the command: `brew install watchman`
- install following [cocoapods](https://formulae.brew.sh/formula/cocoapods): `brew install cocoapods`
- According to [a post by React Native guru Jamon Holmgren](https://shift.infinite.red/dont-use-the-wrong-jdk-for-react-native-if-you-re-using-an-m1-mac-252533dd47a2) that all this time I've been using installing JDK wrong on my m1 machine 😱. To learn more how to install "the m1 way", go to his post and give it a read (and leave an appreciation clap 😄)
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
