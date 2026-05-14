---
title: Moving away from Oh My Zsh (OMZ)
author: Aman Mittal
pubDatetime: 2026-05-14T00:00:01Z
slug: moving-away-from-oh-my-zsh
featured: false
draft: false
tags:
  - macos
description: ''
---

I've been running Oh My Zsh (OMZ) on every workstation I've ever owned. It was one of the first things I'd install when setting up a new machine or cleanly updating an existing one. For years, I've blindly copied my workstation configuration from one Macbook to the next, without questioning whether I still needed something in the current day and age, or whether it had quietly been replaced by something better.

The first time I wrote about my setup was in [2023](/blog/setup-macbook-m1/) and since then I've written about it every year: [2024 and 2025](/blog/macbook-setup-2024/) and recently in [2026](/blog/mac-setup/). The last post is a result of me taking my time and making conscious decisions. Somewhere in that process, I realized that my setup and especially my terminal setup, was bloated.

That realization has been growing strong over a period of last few months. I didn't have the time to act on. But a few weeks back, I reconfigured my Starship prompt and [wrote about it](/blog/my-starship-prompt-setup/). During the process, I opened up `.zshrc` to do some cleanup and that is when I noticed I had quietly stopped using Oh My Zsh a while ago, and don't need it anymore.

Started in 2009 by Robby Russell as a [personal config](https://www.freecodecamp.org/news/d-oh-my-zsh-af99ca54212c/), OMZ solves a real problem when Robby was asked by his coworkers on setting up `zsh` on their machines. Rather than walking them through the same commands every time, he packaged his dotfiles into a single install.

That is the exact problem OMZ has solved for me. Especially, the `plugins` were my favorite feature even though I've narrowed it down to only four plugins:

```shell
plugins=(
    git
    node
    vscode
    direnv
)
```

`ZSH_THEME="robbyrussell"` was commented out. Had been for over a year, since Starship started running my prompt. Auto-updates were disabled. zsh-syntax-highlighting was being sourced manually, with its full path written by hand, sitting outside the plugin system entirely

However, now when I am writing it, I am realizing it I never took its advantage to full. Primarily, because adding more plugins would slow down the shell startup. I use iTerm2 and recently started using Ghostty as well, and the shell startup was noticeably slow in both. I haven't done the profiling with `zprof` but a friend of mine, Scott Spence has written about it here [Speeding Up My ZSH Shell](https://scottspence.com/posts/speeding-up-my-zsh-shell). _Go read it if you are interested about the details and you might end up listening to the tips Scott has to share._

After replacing Oh My Zsh framework, here's how my `.zshrc` file looks like. It has more alias that I use daily and less configuration:

```shell
export PATH=/opt/homebrew/bin:$PATH

# Required for Expo and React Native local app development
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home

# Android specific paths after installing Android Studio
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

# To stop brew from auto updating
export HOMEBREW_NO_AUTO_UPDATE=1

## Compilation flags
export ARCHFLAGS="-arch x86_64"

## Enable AUTO_CD to automatically change to a directory when you `cd` into it
setopt AUTO_CD

## Opening various directory
alias g="cd $HOME/github/"
alias n="cd $HOME/github/notes/"

## Show touch on iOS simulator
alias showtouch="defaults write com.apple.iphonesimulator ShowSingleTouches 1"

## Hide touch on iOS simulator
alias hidetouch="defaults write com.apple.iphonesimulator ShowSingleTouches 0"

## Show/Hide hidden files in Finder
alias show="defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder"
alias hide="defaults write com.apple.finder AppleShowAllFiles -bool false && killall Finder"
alias killds="find . -type f -name '*.DS_Store' -ls -delete"
alias kdock="killall Dock"

## git shorthands
alias gall="git add ."
alias ga="git add"
alias gc="git commit -m"
alias gs="git status"
alias gpush="git push -u origin"
alias glog="git log --oneline --graph --decorate --color"
alias gap="git add -p"
alias gck="git checkout"
alias gb="git branch"
alias gslog="git shortlog -s"

eval "$(/opt/homebrew/bin/brew shellenv)"

# Starship
eval "$(starship init zsh)"

# mise
eval "$(mise activate zsh)"

# Enable syntax highlighting
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

OMZ solved a real problem for me for a long time. It collected the good parts and gave me a single install command. For its time, it was a genuinely useful piece of software, and it deserves credit for the role it played in making `zsh` approachable when I had no idea what I was doing.
