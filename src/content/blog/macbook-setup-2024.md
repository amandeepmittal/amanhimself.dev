---
title: My 2024 Macbook setup
author: Aman Mittal
pubDatetime: 2024-04-05T03:42:51Z
modDatetime: 2025-01-30T00:00:01Z
slug: macbook-setup-2024
featured: false
draft: false
tags:
  - macos
description: 'A guide on setting up Apple Macbook for daily work.'
---

## A brief history of this guide

I documented my entire setup when I first switched to a MacBook Pro with Apple Silicon in 2020. Since then, I have upgraded to two different Macbooks and made some changes and adjustments to my personal setup by adopting new tools and leaving the old ones behind.

After recently revisiting [my old setup guide](/blog/setup-macbook-m1/) while reconfiguring a previous laptop, I noticed significant changes and decided an update was in order. This post reflects my current setup strategy.

## Initial setup

In this section, set up or configure the system and install essential tools required for development or configuring other tools.

### Updating macOS

After logging in, ensure the macOS is on the latest release version. If not, navigate to System Settings and update the macOS software.

### Disable annoying

Once the macOS version is up to date, I turn off some annoying settings. They might not annoy you, so feel free to skip this section.

- Go to System Settings > Battery > Options > Disable **Slightly dim the display on battery**.
- Go to Lock Screen and
  - Set Start the screen saver when in active for **1 hour**.
  - Set the turn display off on the battery when it is inactive for **3 hours**.
  - Set the display off on power adapter when inactive for **3 hours**.

> **Tip**: Verify that the user account on the MacBook has Admin privileges. To verify, go to Settings > Users & Groups and see if the user account has **Admin** role. All Mac users with an Admin role can use `sudo` to run command-line utilities with administrative (root) privileges.

### Secure data with FileVault

FileVault offers full-disk encryption to safeguard your data from unauthorized physical access. Activating it adds an essential layer of security. To enable it:

- Go to System Settings > FileVault > Enable **Turn On**.

### Install Xcode and Command Line Tools

The following tools must be installed before proceeding with the rest of the guide:

- **Xcode**: Open App Store, install [Xcode](https://apps.apple.com/in/app/xcode/id497799835?mt=12). It's a large download and will take a while.
- **Terminal**: [iTerm2](https://iterm2.com/downloads.html) &mdash; primary terminal app

After the Xcode installation finishes, install **Command Line Tools**. Open the terminal app (iTerm) and run:

```shell
xcode-select --install && sudo xcodebuild -license
```

Let's verify that Command Line Tools have been installed properly and install iOS simulators (only required if you are into mobile app development):

- **Verify Command Line Tools** installation: Open Xcode from the menu bar, go to **Xcode > Preferences > Location**, and make sure that **Command Line Tools** point towards the current Xcode app.
- When opening Xcode for the first time, you'll be prompted to **select platforms for development**. Select iOS 17 and click **Download and install** to download iOS simulators. _This behavior changed with macOS Sonoma._

The initial setup is complete! You've now reached a point where you can proceed further.

## Other macOS system settings tweaks

Let's update some System Settings to navigate through the macOS with ease and familiar (habitual) settings.

> **Note**: These are some custom settings that I use on my MacBook. Feel free to skip this section or take time to apply yours.

Click **Apple Icon** from the menu bar and open **System Settings** to change or apply the settings below:

<!-- vale off -->

- **Siri:** Disable it (if not already)
- **Spotlight**:
  - Under Search results, disable search except for Applications, Calculator, Conversion, Definition, Developer, Events & Reminders, and System Settings
- **Desktop & Dock**:
  - Enable: Automatically hide and show the Dock
  - Disable: Show suggested and recent apps in Dock
  - Size: 30%
  - Magnification: 45%-50%
  - Click wallpaper to reveal Desktop: Only in Stage Manager
  - Widgets > Show Widgets: Disable
  - Mission Control: Disable Automatically rearrange Spaces
  - Hot Corners: Disable all
- **Trackpad**:
  - Point & Click
    - Enable secondary click with the bottom right corner
    - Enable Tap to click with one finger
    - Tracking speed: 90%
    - Click: Medium
    - Force click and haptic feedback: Disable
    - Look up & data detectors: Disable
  - Scroll & Zoom
    - Natural scrolling: Disable
  - More Gestures
    - Swipe between pages: Off
- **Keyboard**
  - Key repeat rate: Fast
  - Delay until repeat: Short
- **Finder settings**:
  - General > Enable Hard disks, disable CDs, DVDs, and iPods
    - Set New Finder windows show to Downloads
  - Tags: Switch off all
  - Advanced > Show filename extensions
  - Enable showing hidden files (hold Cmd + Shift dot(`.`) in a Finder window)
  - Enable: View > Show Path Bar, Show Status Bar
- **Change Launchpad icon grid layout:**

```shell
# Specify the number of columns to be used.
defaults write com.apple.dock springboard-columns -int 12

# Specify the number of rows to be used.
defaults write com.apple.dock springboard-rows -int 10

# Restart the Dock to apply the changes.
killall Dock
```

### Modify other default re-writes

Preferences are stored in `~/Library/Preferences/`. The following are some of the default settings that I change:

```shell
# Disable .DS_Store files
defaults write com.apple.desktopservices DSDontWriteNetworkStores true

# Disable autocorrect
defaults write NSGlobalDomain NSAutomaticSpellingCorrectionEnabled -bool false

# Set key-repeat values
# Source: https://mac-key-repeat.zaymon.dev/
defaults write -g InitialKeyRepeat -int 12
defaults write -g KeyRepeat -int 2

# Show Library folder
chflags nohidden ~/Library

# Show hidden files
defaults write com.apple.finder AppleShowAllFiles YES
```

<!-- vale on -->

## Install Homebrew: macOS package manager

An important step in installing development-related tools is using Homebrew, a package manager I've trusted for nearly eight years.

To install Homebrew, open iTerm and run the command:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After installing, add the Homebrew to the `PATH`:

```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/amanhimself/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"
```

> **Note**: If you don't have a `.zshrc`, create one at `/Users/user-name/`.

Then, add the following to `.zshrc`:

```shell
export PATH=/opt/homebrew/bin:$PATH
```

## Install apps from Homebrew bundle

I keep a list of must install apps in a Homebrew bundle inside my dotfiles repo. [Download the file](https://github.com/amandeepmittal/dotfiles/blob/master/brewfile.sh) from the repo and run the following command to install the apps:

```shell
brew bundle --file=brewfile.sh
```

> **Tip**: Git is already installed as part of Xcode Command Line Tools. However, I prefer to install the latest version from `brew` and avoid using the outdated version installed by Apple. After installing `git`, run `git --version` in a new terminal window. If you run this command in the same terminal window, it will show the Apple Git version.

### Git global configurations

After installing Git, apply the following global configurations:

- Set up the default branch for any new project to `main` (This was introduced in Git version `2.28`):

```shell
git config --global init.defaultBranch main
```

- Enable colors in command output:

```shell
git config --global color.uni auto
```

- Set up real name and email:

```shell
git config --global user.name "Real name"
git config --global user.email email@domain.com
```

To check or verify the global git config, run:

```shell
git config -l --global
```

## Install Oh My Zsh

To manage ZSH configuration and plugins, install [Oh My Zsh](https://ohmyz.sh/):

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

After the installation, ensure the `.zshrc` file exports the path below at the top. To view, run `nano .zshrc` in the terminal.

```shell
# Path to your oh-my-zsh installation
export ZSH="$HOME/.oh-my-zsh"
```

The `$HOME` is `/Users/your-macOS-username`. To verify this, you can run:

```shell
echo $HOME
```

Install [`zsh-syntax-highlighting`](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md). It provides syntax highlighting for the ZSH shell. Run the following commands:

```shell
# Depending on the /plugins folder in your local setup
cd $HOME/.oh-my-zsh/plugins

# Then clone the git repository
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

After installing the syntax highlight plugin on iterm2, restart it or open a new instance for it to start recognizing the commands.

### Configure .zshrc

Copy and paste the `.zshrc` from [`dotfiles`](https://github.com/amandeepmittal/dotfiles) to `Users/user-name/.zshrc`. The file is organized in such a way that it should work without any additional configuration.

### Configure Starship prompt

I have been using Spaceship as my command line prompt for a long time, but it has been having some problems lately. I learned about Starship a few months ago and decided to try it out. It meets all my requirements, so I continued using it.

Since Starship is already installed in the brew bundle step, ensure the following is added to the end of `~/.zshrc`:

```shell
eval "$(starship init zsh)"
```

To use the pre-defined configuration, copy `starship.toml` from the [`dotfiles`](https://github.com/amandeepmittal/dotfiles) repo to `Users/user-name/config`. The file is organized in such a way that it should work without any additional configuration.

## Configure iTerm

- Open iTerm > Preferences > Profiles and Import `iterm-default.json` from [`dotfiles`](https://github.com/amandeepmittal/dotfiles) repo.
- Profiles> Colors > Import `Dracula.itermcolors` from `dotfiles` repo for Color Presets and apply it.
- Text > Font, select **JetBrainsMono Nerd Font**.
- Text > Non-ASCII Font, select **Hack Nerd Font Mono**.
- Appearance > General > Theme > set to **Minimal**.
- Terminal > Show mark indicators > **Disable**.
- General > Selection > Clicking on command selects it to restrict Find and Filter > **Disable**.

## Setup a primary web browser

By now, you will need a primary web browser to set up and do some things further.

- Arc for personal and primary browser
  - Log in to the primary email
- Chrome for work
  - Log in to work email

### Shared extensions to install for both browsers

- Grammarly login and extension install
- Install [Detailed SEO extension](https://chrome.google.com/webstore/detail/detailed-seo-extension/pfjdepjjfjjahkjfpkcgfmfhmnakjfba?hl=en)
- Install [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)
- 1Password

### Shared configuration or steps required in both browsers

- Create a Google meet, and share and record the screen. This will get all required permissions to be working, and you don't have to restart the browser in an actual meeting.
- Log in to GitHub, Gmail, and Calendar.

## GitHub setup and configuration

To configure an account on GitHub.com and use an SSH key, follow the steps from GitHub documentation:

- [Generate a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)

- [Add SSH key to ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent)

- [Add new SSH key to GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account#adding-a-new-ssh-key-to-your-account)

> **Note:** After configuring SSH key with GitHub, download GitHub desktop app and clone `dotfiles` repository because you will need the configuration files from it in the next few steps.

## Install Node.js and npm

To install Node.js and npm, use Node Version Manager (NVM). [Read the entire blog post on how to install Node.js using NVM](https://amanhimself.dev/blog/install-nodejs-using-nvm-on-macos-m1/).

### After installing Node.js and npm

Node.js comes with the default package manager **npm**. Set defaults for it:

```shell
npm config set init-author-name "your name"

npm config set init-author-url "example.com"

npm config set init-license MIT
```

Install the following global npm packages:

- [eas-cli](https://www.npmjs.com/package/eas-cli): For work and personal use.

```shell
npm i -g eas-cli
```

Also, I use the following command to update global packages:

```shell
npx npm-check -gu
```

## Install Java

To install Java17, run:

```shell
brew install --cask zulu@17
```

Add the `JAVA_HOME` environment variable in  **~/.zshrc**:

```shell
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
```

> **Note**: Already configured in `.zshrc` if copied dotfiles were setup correctly.

## VS Code

VS Code has supported ARM chips since March 13, 2021. Download the [installer for VS Code](https://code.visualstudio.com/download). I am using the following VS Code configuration:

```json
{
  "security.workspace.trust.untrustedFiles": "open",
  "editor.tabSize": 2,
  "workbench.editor.tabSizing": "shrink",
  "editor.cursorBlinking": "phase",
  "editor.fontLigatures": false,
  "editor.wordWrap": "on",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.tabCompletion": "on",
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "git.openRepositoryInParentFolders": "always",
  "editor.semanticHighlighting.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.bracketPairColorization.enabled": true,
  "files.trimTrailingWhitespace": true,
  "readTime.enabled": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "cSpell.language": "en,en-US",
  "cSpell.enableFiletypes": ["markdown", "mdx"],
  "editor.inlineSuggest.enabled": true,
  "editor.minimap.enabled": true,
  "editor.fontSize": 13,
  "workbench.iconTheme": "catppuccin-latte",
  "terminal.integrated.fontFamily": "JetBrainsMono Nerd Font",
  "workbench.colorTheme": "Expo Light",
  "workbench.activityBar.location": "top",
  "editor.fontFamily": "JetBrains Mono ",
  "editor.fontWeight": "normal",
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
    "editor.defaultFormatter": "vscode.json-language-features"
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
  // CODE::STATS EXTENSION
  "codestats.apikey": "add-your-api-key",
  "files.associations": {
    ".env*": "dotenv"
  },
  "editor.accessibilitySupport": "off",
  "vale.doNotShowWarningForFileToBeSavedBeforeLinting": true,
  "react-native-tools.showUserTips": false,
  "mdx.validate.validateFileLinks": "ignore",
  "workbench.editor.enablePreview": false,
  "explorer.confirmDelete": false,
  "editor.renderLineHighlight": "line",
  "githubPullRequests.pullBranch": "never",
  "editor.linkedEditing": true,
  "workbench.startupEditor": "none",
  "update.mode": "manual",
  "telemetry.telemetryLevel": "crash"
}
```

### Setup VS Code as the default editor

To set up VS Code as the default editor, use `code .` to open a directory directly from the command line to the editor, you need to install `code` command in the `PATH`.

- Open VS Code, and open the command palette.
- Type **Shell** and select **Shell Command: Install 'code' command in PATH**.

![Installing code command in Path in VS Code](/images/macbook-setup-shell.png)

### VS Code themes

I usually switch between the following themes:

- Quiet Light (built-in)
- [Expo Light](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-theme) (based on [Expo Docs](https://docs.expo.dev/))

### VS Code extensions

- [Auto Close tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- VSCode supports colored bracket pairs natively. See [How to configure VSCode Bracket Pair Colors Natively](https://amanhimself.dev/blog/how-to-configure-vscode-bracket-colors-natively/)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [Code::Stats](https://codestats.net/)
- [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
- [Catppuccin Icons](https://marketplace.visualstudio.com/items?itemName=Catppuccin.catppuccin-vsc-icons)
- [ESLint](https://eslint.org/)
- Even Better Toml
- [Expo Tools](https://marketplace.visualstudio.com/items?itemName=byCedric.vscode-expo)
- [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- Git Lens
- [Highlight Matching Tag](https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag)
- [Indent rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
- [iOS common files](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-ios-common-files)
- [Kotlin Language](https://marketplace.visualstudio.com/items?itemName=mathiasfrohlich.Kotlin)
- [MDX](https://marketplace.visualstudio.com/items?itemName=silvenon.mdx) - For syntax highlighting of `.mdx` files
- [npm IntelliSense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
- [Prettier](https://prettier.io/)
- [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)
- [Read Time](https://marketplace.visualstudio.com/items?itemName=johnpapa.read-time)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Vale VSCode](https://marketplace.visualstudio.com/items?itemName=ChrisChinchilla.vale-vscode)
- [WakaTime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime)
- [Word Count](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount)

## Conclusion

That's the setup I now use for my JavaScript, Node.js, React, React Native, Expo, and documentation work.
