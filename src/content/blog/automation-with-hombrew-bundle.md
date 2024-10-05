---
title: Automate installing apps and utilities with Homebrew bundle
author: Aman Mittal
pubDatetime: 2024-10-05T20:51:31Z
slug: automation-with-homebrew-bundle
featured: false
draft: false
tags:
  - macos
description: ''
---

If you are like me and like to set up your Macbook once in a while from scratch, you might get frustrated about the manual work that goes into setting it up each time.

Homebrew to the rescue. It's a macOS package manager that I've used since I started using macOS. It allows creating a "bundle" file that can automate the process of installing many command-line utilities, applications, and apps from the App Store.

## Create a bundle file

In my dotfiles repository, I've created a `brewfile.sh`, which contains the following list:

```shell
# Specify directory to install
cask_args appdir: "/Applications"

# Install packages
tap 'homebrew/bundle'
brew 'mas'
brew 'direnv'
brew 'git'
brew 'git-crypt'
brew 'git-lfs'
brew 'readline'
brew 'scrcpy'
brew 'yarn'
brew 'watchman'
brew 'vale'
brew 'cocoapods'
brew 'typos-cli'

# Images, Video
brew 'ffmpeg'

# Fonts
cask 'font-jetbrains-mono'
cask 'font-hack-nerd-font'

# Other apps
cask 'insomnia'
cask 'visual-studio-code'
cask 'google-chrome'
cask 'google-chrome@canary'
cask 'brave-browser'
cask 'arc'
cask 'imageoptim'
cask 'expo-orbit'

## App Store apps
mas "1Password 7", id: 1333542190
mas "Slack", id: 803453959
mas 'Bandwidth+', id: 490461369
```

When I am setting up my Macbook, I download this file and run the following command to install everything from this file:

```shell
brew bundle --file=brewfile.sh
```

## Dissection of the bundle file

The important piece from the above configuration is to define a path for the applications to install inside the `Applications` directory. Otherwise, MacOS might recognize an app or warn you to manually move it inside that directory. The `cask_args` allows passing the directory path.

```shell
cask_args appdir: "/Applications"
```

Then, adding third-party repos from Homebrew allows installing packages from external sources.

```shell
tap 'homebrew/bundle'
tap "homebrew/core"
```

The next step is to install packages and other applications that I'd be installing manually otherwise.

Also, I recently found out that [`mas`](https://github.com/mas-cli/mas) is a command line interface for macOS App Store and allows an app from the store with its product identifier and can be used with brew. For example:

```shell
mas 'Bandwidth+', id: 490461369
```

Searching an app's product identifier is easy and requires searching the app using `mas search app-name`. For example:

```shell
mas search 1Password
  1333542190  1Password 7 - Password Manager                  (7.9.11)
```

I like this way of installing necessary stuff when I set it up from scratch.
