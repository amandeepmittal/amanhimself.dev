---
title: 'How to install Node.js using NVM on macOS M1'
date: '2022-02-06'
slug: 'install-nodejs-using-nvm-on-macos-m1'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://amanhimself.dev/blog/install-nodejs-using-nvm-on-macos-m1/'
---

> Updated on July 24, 2023

Node.js can be installed in different ways. I recently started working on an organization repository that requires using different Node.js versions. Using [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) it is possible to switch between different Node.js versions on the fly. It also allows testing code with older Node.js versions.

NVM is a shell script used for installing and managing Node.js on a Unix based system. It allows switching between different versions of Node.js via the command line quickly. It also works with any [POSIX](https://en.wikipedia.org/wiki/POSIX) shell such as `zsh`.

## Prerequisites

Make sure you have installed the following before proceeding:

- [Command line tools](https://amanhimself.dev/blog/setup-macbook-m1/#xcode)
- [Homebrew](https://amanhimself.dev/blog/setup-macbook-m1/#homebrew)
- [Git](https://amanhimself.dev/blog/setup-macbook-m1/#git)
- [zsh](https://amanhimself.dev/blog/setup-macbook-m1/#zsh-and-oh-my-zsh)

## Remove existing installed Node.js version

> This step is optional. If you haven't installed Node.js previously using Homebrew, skip this.

If you have an existing Node.js version installed, please remove it before installing NVM. For example, my machine already has a node version installed via Homebrew.

Open the terminal window and run:

```shell
brew uninstall --ignore-dependencies node
brew uninstall --force node
```

## Install NVM via Homebrew

Install NVM using Homebrew:

```shell
brew install nvm
```

After the above command runs, create a directory for NVM at the home working directory:

```shell
mkdir ~/.nvm
```

When using the `zsh` shell, add the following config inside `~/.zshrc`:

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

Now, either restart the terminal app or execute `source ~/.zshrc` to re-load the latest config for the `zsh` shell from the file.

Run the command `nvm --version` to verify. For example, if the config has loaded, this command would display a version.

## Install Node.js via NVM

Node.js is available in two different versions:

- Long Term Support (LTS)
- Current with latest features

Although I used to love using the Current version with the latest features on my personal machine, I use the LTS version for work. At the time of writing this post, the current LTS version is `16`.

Running the command `nvm install node` would install the current version with the latest features.

To install the current LTS Node.js version, execute:

```shell
nvm install --lts
```

Then, verify the version by running:

```shell
node --version

# Output: v16.13.2
```

## Multiple Node.js versions

To install different versions of Node.js, you can run:

```shell
# nvm install Version-Number
nvm install 14
```

## Use a specific Node.js version

After installing multiple versions, use the command below to set a specific version as the default version and use it:

```shell
nvm use 16
```

## Uninstall a Node.js version

Before uninstalling a Node.js version, make sure it is not the active version or currently used version on the machine. Switch to a different version and then run the command:

```shell
nvm uninstall 14
```

## List all installed Node.js versions

To check for all the installed Node.js versions via nvm, run:

```shell
nvm ls
```

## Set the latest Node.js version as the default

To always set the latest Node.js version as the default in the shell, run:

```shell
nvm alias default node
```

## Update to the latest version

To update to the latest version `nvm` provides the following command:

```shell
nvm install --lts
```

After installing the latest version, to re-install any global packages installed with the previous version, run:

```shell
nvm reinstall-packages previous_version
```
