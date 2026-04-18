---
title: My Mac setup
author: Aman Mittal
pubDatetime: 2026-04-18T00:00:01Z
slug: mac-setup
featured: false
draft: false
tags:
  - macos
description: 'A guide on setting up Apple Mac for daily work.'
---

In past I have documented my entire setup when I switched to MacBook Pro with Apple Silicon in December, 2020. Since then I have also [documented my setups on different MacBooks with adjustments and changes](/blog/macbook-setup-2024/). This guide is mostly about my latest setup, which includes using tools from AI and some new tools on my Mac.

## Initial setup

First few things I like to set up or configure are the system settings and install essential tools that are required for my daily workflow.

## Updating macOS

As usual after logging in, I have to ensure the macOS is on the latest version. This time I decided to upgrade it to macOS Tahoe.

## Xcode and Command Line Tools

The following tools must be installed before proceeding with the rest of the guide:

- **Xcode**: Open App Store, install [Xcode](https://apps.apple.com/in/app/xcode/id497799835?mt=12). It's a large download and will take awhile.
- **Terminal**: iTerm2 as the primary terminal app.

After the Xcode installation finishes, install **Command Line Tools**. Open the terminal app and run:

```
xcode-select --install && sudo xcodebuild -license
```

Let's verify that Command Line Tools have been installed properly and install iOS simulators (only required if you are into mobile app development):

- **Verify Command Line Tools** installation: Open Xcode from the menu bar, go to **Xcode > Preferences > Location**, and make sure that **Command Line Tools** point towards the current Xcode app.
- When opening Xcode for the first time, you'll be prompted to **select platforms for development**. Select iOS 26.2 and click **Download and install** to download iOS simulators.

The initial setup is complete! You've now reached a point where you can proceed further.

## Fix the default macOS settings

In my previous setup guides, I went through each setting manually in the System Settings app. This time, I'm using `defaults write` commands in the terminal to apply them all at once.

### Dock

```shell
# Automatically hide and show the Dock
defaults write com.apple.dock autohide -bool true # false for other devices

# Disable suggested and recent apps in Dock
defaults write com.apple.dock show-recents -bool false

# Set Dock size to 30%
defaults write com.apple.dock tilesize -int 36

# Enable magnification and set to ~50%
defaults write com.apple.dock magnification -bool true
defaults write com.apple.dock largesize -int 54

# Disable automatically rearrange Spaces
defaults write com.apple.dock mru-spaces -bool false

# Disable click wallpaper to reveal Desktop
defaults write com.apple.WindowManager EnableStandardClickToShowDesktop -bool false

# Disable Widgets
defaults write com.apple.WindowManager StandardHideWidgets -bool true

# Disable all hot corners
defaults write com.apple.dock wvous-tl-corner -int 0
defaults write com.apple.dock wvous-tr-corner -int 0
defaults write com.apple.dock wvous-bl-corner -int 0
defaults write com.apple.dock wvous-br-corner -int 0

# Restart Dock to apply changes
killall Dock
```

### Finder

```shell
# Show hidden files
defaults write com.apple.finder AppleShowAllFiles -bool true

# Show Path Bar and Status Bar
defaults write com.apple.finder ShowPathbar -bool true
defaults write com.apple.finder ShowStatusBar -bool true

# Show filename extensions
defaults write NSGlobalDomain AppleShowAllExtensions -bool true

# Set new Finder windows to open in Downloads
defaults write com.apple.finder NewWindowTarget -string "PfLo"
defaults write com.apple.finder NewWindowTargetPath -string "file://${HOME}/Downloads/"

# Disable .DS_Store files on network and USB volumes
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool true
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true

# Show hard disks on desktop
defaults write com.apple.finder ShowHardDrivesOnDesktop -bool true

# Hide CDs, DVDs, and iPods on desktop
defaults write com.apple.finder ShowRemovableMediaOnDesktop -bool false

# Show Library folder
chflags nohidden ~/Library

# Restart Finder to apply changes
killall Finder
```

### Keyboard and input

```shell
# Key repeat rate: Fast
defaults write NSGlobalDomain KeyRepeat -int 2

# Delay until repeat: Short
defaults write NSGlobalDomain InitialKeyRepeat -int 15

# Disable autocorrect
defaults write NSGlobalDomain NSAutomaticSpellingCorrectionEnabled -bool false
```

### Trackpad

```shell
# Enable tap to click
defaults write com.apple.AppleMultitouchTrackpad Clicking -bool true

# Set tracking speed (0.0 to 3.0, default is 1.0)
defaults write NSGlobalDomain com.apple.trackpad.scaling -float 2.5

# Disable natural scrolling
defaults write NSGlobalDomain com.apple.swipescrolldirection -bool false

# Disable force click and haptic feedback
defaults write com.apple.AppleMultitouchTrackpad ForceSuppressed -bool true

# Enable secondary click with bottom right corner
defaults write com.apple.AppleMultitouchTrackpad TrackpadCornerSecondaryClick -int 2
defaults write com.apple.AppleMultitouchTrackpad TrackpadRightClick -bool true

# Disable Look up & data detectors
defaults write com.apple.AppleMultitouchTrackpad TrackpadThreeFingerTapGesture -int 0

# Disable swipe between pages
defaults write NSGlobalDomain AppleEnableSwipeNavigateWithScrolls -bool false
```

### Lock Screen and Battery

```shell
# Set screen saver to start after 1 hour (in seconds)
defaults -currentHost write com.apple.screensaver idleTime -int 3600

# Set display off on battery after 3 hours (in minutes)
sudo pmset -b displaysleep 180

# Set display off on power adapter after 3 hours (in minutes)
sudo pmset -c displaysleep 180

# Disable slightly dim the display on battery
sudo pmset -b lessbright 0
```

### Other

```shell
# Disable Siri
defaults write com.apple.assistant.support "Assistant Enabled" -bool false
```

A few settings still need to be changed manually in System Settings:

- **Privacy & Security > FileVault**: Turn on
- **Spotlight**: Disable all search categories except Apps, Files, Folders, Menu Items, Calculator, Conversion, Dictionary, and System Settings
- **Trackpad > Point & Click**: Set click to Medium
- **Finder > Tags**: Switch off all

## Install Homebrew: macOS package manager

An important step in installing development-related tools is using Homebrew, a package manager I've trusted for nearly eight years.

To install Homebrew, open iTerm and run the command:

```shell

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

```

After installing, add the Homebrew to the `PATH`:

```shell

echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/username/.zshrc

eval "$(/opt/homebrew/bin/brew shellenv)"

```

> **Note**: If you don't have a `.zshrc`, create one at `/Users/username/`.

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

## Configure .zshrc

In previous setup guides, I used Oh My Zsh as a shell framework. This time, I'm skipping it entirely. I already use Starship for my prompt, so Oh My Zsh was just adding shell startup lag for features I wasn't using. The only plugin I need is syntax highlighting, which can be installed directly via brew.

Install zsh-syntax-highlighting:

```shell
brew install zsh-syntax-highlighting
```

The key additions to `.zshrc`:

```shell
# Auto cd into directories without typing cd
setopt AUTO_CD

# Mise (version manager for Node.js, bun, pnpm)
eval "$(mise activate zsh)"

# Starship prompt
eval "$(starship init zsh)"

# Syntax highlighting (must be last)
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

Copy the full `.zshrc` from [`dotfiles`](https://github.com/amandeepmittal/dotfiles) to `~/.zshrc`.

## Configure Starship prompt

I have been using Starship as my command line prompt for a while now. It's fast, configurable, and works across shells.

Since Starship is already installed from the brew bundle step, copy `starship.toml` from the [`dotfiles`](https://github.com/amandeepmittal/dotfiles) repo to `~/.config/starship.toml`.

## Configure iTerm

- Open iTerm > Preferences > Profiles and Import `iterm-default.json` from [`dotfiles`](https://github.com/amandeepmittal/dotfiles) repo.
- Profiles > Terminal > Show mark indicators > **Disable**.
- Text > Font, select **JetBrainsMono Font**.
- Text > Non-ASCII Font, select **JetBrainsMono Nerd Font**.
- Appearance > General > Theme > set to **Minimal**.
- General > Selection > Clicking on command selects it to restrict Find and Filter > **Disable**.

## Setup a primary web browser

By now, you will need a primary web browser to set up and do some things further.

- Chrome for work
  - Log in to work email
    - Extensions: 1 Password, Cuik SEO, and Harper
- Chrome Canary for personal
  - Log in to personal email
    - Extensions: 1 Password, Cuik SEO, and Harper

### Shared configuration or steps required in both browsers

- Create a Google meet, and share and record the screen. This will get all required permissions to be working, and you don't have to restart the browser in an actual meeting.
- Log in to GitHub, Gmail, and Calendar.

## GitHub setup and configuration

To configure an account on GitHub.com and use an SSH key, follow the steps from GitHub documentation:

- [Generate a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key)
- [Add SSH key to ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent)
- [Add new SSH key to GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account#adding-a-new-ssh-key-to-your-account)

## Install Node.js, bun, and pnpm

In previous setup guides, I used NVM (Node Version Manager) to install and manage Node.js versions. This time, I'm using [mise](https://mise.jdx.dev/), a polyglot version manager written in Rust. It replaces nvm, pyenv, and similar tools with one consistent interface. It's faster (no shell startup lag), auto-switches versions when you `cd` into a project, and reads existing `.nvmrc` files.

Since mise is already installed from the brew bundle step, activate it in the shell:

```shell
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
source ~/.zshrc
```

Install Node.js, bun, and pnpm:

```shell
mise use --global node@22
mise use --global bun@latest
mise use --global pnpm@latest
```

Verify the installations:

```shell
node --version
bun --version
pnpm --version
```

### After installing Node.js

Node.js comes with the default package manager **npm**. Set defaults for it:

```shell
npm config set init-author-name "your name"
npm config set init-author-url "example.com"
npm config set init-license MIT
```

Install global npm packages:

```shell
npm i -g eas-cli
```

### Useful mise commands

```shell
# Update Node.js to latest patch
mise upgrade node@22

# Install a different version for a specific project
mise use node@20

# List installed tools
mise ls

# List available remote versions
mise ls-remote node
```

## VS Code

My current setup supports JavaScript, TypeScript, Node.js, React, React Native, Expo, and documentation work.

### Setup VS Code as the default editor

After installing VS Code from the brew bundle step, open it and set up the `code` command in PATH. Open the command palette (**Cmd + Shift + P**) and search for **Shell Command: Install 'code' command in PATH**.

![Installing code command in Path in VS Code](/images/macbook-setup-shell.png)

### Settings

Copy the `vscode_settings.jsonc` from the [`dotfiles`](https://github.com/amandeepmittal/dotfiles) repo to `~/Library/Application Support/Code/User/settings.json`.

Here is what the settings file includes:

```jsonc
{
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
  "readTime.fileTypes": ["markdown", "plaintext", "yaml", "mdx"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "cSpell.language": "en,en-US",
  "cSpell.enabledFileTypes": {
    "markdown": true,
    "mdx": true
  },
  "editor.inlineSuggest.enabled": true,
  "editor.minimap.enabled": true,
  "editor.fontSize": 13.5,
  "terminal.integrated.fontFamily": "JetBrainsMono Nerd Font",
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontWeight": "normal",
  "[markdown]": {
    "editor.quickSuggestions": {
      "comments": "on",
      "strings": "on",
      "other": "on"
    }
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "markdown"
  ],
  "files.associations": {
    ".env*": "dotenv"
  },
  "mdx.validate.validateFileLinks": "ignore",
  "workbench.editor.enablePreview": false,
  "explorer.confirmDelete": false,
  "editor.renderLineHighlight": "line",
  "githubPullRequests.pullBranch": "never",
  "editor.linkedEditing": true,
  "workbench.startupEditor": "none",
  "update.mode": "manual",
  "telemetry.telemetryLevel": "crash",
  "redhat.telemetry.enabled": false,
  "errorLens.enabledDiagnosticLevels": ["error", "warning"],
  "extensions.ignoreRecommendations": true,
  "window.commandCenter": true,
  "explorer.confirmDragAndDrop": false,
  "claudeCode.preferredLocation": "panel",
  "github.copilot.nextEditSuggestions.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true,
    "scminput": false
  },
  "workbench.colorTheme": "Light 2026"
}
```

### Extensions

Install all extensions with the following commands:

```shell
code --install-extension anthropic.claude-code
code --install-extension astro-build.astro-vscode
code --install-extension atishay-jain.all-autocomplete
code --install-extension bradlc.vscode-tailwindcss
code --install-extension christian-kohler.npm-intellisense
code --install-extension dbaeumer.vscode-eslint
code --install-extension eamodio.gitlens
code --install-extension esbenp.prettier-vscode
code --install-extension expo.vscode-expo-tools
code --install-extension formulahendry.auto-close-tag
code --install-extension formulahendry.auto-complete-tag
code --install-extension formulahendry.auto-rename-tag
code --install-extension github.copilot-chat
code --install-extension github.vscode-pull-request-github
code --install-extension johnpapa.read-time
code --install-extension mathiasfrohlich.kotlin
code --install-extension naumovs.color-highlight
code --install-extension oderwat.indent-rainbow
code --install-extension openai.chatgpt
code --install-extension orta.vscode-ios-common-files
code --install-extension oxc.oxc-vscode
code --install-extension redhat.vscode-yaml
code --install-extension riussi.code-stats-vscode
code --install-extension streetsidesoftware.code-spell-checker
code --install-extension tamasfe.even-better-toml
code --install-extension unifiedjs.vscode-mdx
code --install-extension usernamehw.errorlens
code --install-extension vincaslt.highlight-matching-tag
code --install-extension wakatime.vscode-wakatime
```

This list of extensions can be generated by running `code --list-extensions` in the terminal.

## AI tools and services

Currently, I am using the following tools from different providers:

- Claude Code
- Codex CLI
- Codex desktop app
- LM Studio

## Wrap up

These configurations and tools are what I am currently using on my Mac. It is a work in progress as I expect to make adjustments and changes to it over time.
