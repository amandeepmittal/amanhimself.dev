---
title: My Starship prompt setup
author: Aman Mittal
pubDatetime: 2026-03-22T00:00:01Z
slug: my-starship-prompt-setup
featured: false
draft: false
tags:
  - cli
description: ''
---

The _prompt_ is the line you stare at before every command in a terminal app. It can be as minimal as a symbol like `$` or `>`. By default, the Terminal app on macOS uses zsh with a plain prompt that shows your macOS username. While it shows some information, it tells you nothing about the current directory you are working in.

There are various configurations you can use with zsh or the shell of your choice. Right now, I am using zsh and I prefer a clean setup. I have been using [Starship](https://starship.rs/) for a while now and recently went through a major rewrite of my configuration.

## Getting started with Starship

Starship is a cross-shell prompt written in Rust. It works with zsh, bash, fish, and more. You typically configure it with a single TOML file and it handles showing you things like the current directory, git branch, and other toolchain versions. All of these _status_ related configurations depend completely on you and how you configure it.

Installing Starship is easy via Homebrew:

```shell
brew install starship
```

Once you have it installed, add the following eval at the end of your `.zshrc` file:

```shell
eval "$(starship init zsh)"
```

Starship looks for its configuration at `~/.config/starship.toml`. Create the file if it doesn't exist.

## Why did I rewrite my Starship configuration

My old Starship config had Nord theme colors hardcoded as hex values. Values like `#88C0D0` for cyan and `#D8DEE9` for white. These looked perfect in a dark terminal with a Nord color scheme. When I switched to a light theme, the prompt became unreadable. Yellow text became invisible on a white background. The light blue Nord colors had zero contrast against a light background.

The fix was to use ANSI color names like `blue`, `cyan`, `green` and so on. These names map to whatever the terminal theme defines. So `cyan` in a dark theme looks like dark-theme cyan, and `cyan` in a light theme looks like light-theme cyan. The terminal handles the contrast, not the Starship config.

If you switch between light and dark themes, or might switch terminals someday, use ANSI color names instead of hex values.

## Using a two-line prompt

Previously, I used a single-line prompt with the directory name on the left and git branch and toolchain versions on the right.

I wanted to split this into two lines. Line 1 shows the directory, git info, and toolchain versions. Line 2 is just the prompt character waiting for input.

Starship provides a `right_format` option, but it renders on the same line as the prompt character. So if your format splits into two lines, the right-aligned content ends up next to `❯` on line 2, not next to the directory on line 1.

The trick is to use the `$fill` module instead of `right_format`. It fills the space between left and right content on the same line. Instead of splitting across `format` and `right_format`, you put everything in `format` with `$fill` as the separator:

```toml
format = """$directory$fill$git_branch$git_status$cmd_duration$package$nodejs$python$docker_context
$character"""
```

The above configuration piece splits directory name on the left, a gap in the middle, and then all other information pushed towards the right. This way, the line 2 holds `>` character and waits for your input.

## Using Nerd font icons

Next configuration I did is to show icons for the git branches, Node.js, Python, and other toolchain versions. These icons come from Nerd Fonts, which are patched versions of regular programming fonts that include thousands of extra glyphs.

Since I use JetBrainsMono font in my terminal previously, and to match that, I switched to use `jetbrains-mono-nerd-font`. It can be installed via Homebrew:

```shell
brew install --cask font-jetbrains-mono-nerd-font
```

You also need to configure your terminal app to use the Nerd font variant. For example, in [Ghostty](https://amanhimself.dev/blog/using-ghostty/), it's one line of configuration in the global configuration:

```text
font-family = JetBrainsMono Nerd Font
```

In iTerm2, you can set this up by going to Settings > Profiles > Your default profile > Text > Non-ASCII Font and then select JetBrainsMono Nerd Font in the drop down next to it.

> **Note:** If your icons aren't showing, your editor may have silently stripped the glyph characters from the TOML file during copy-paste or save. You can use TOML Unicode escapes (`\uXXXX`) instead of literal glyphs as a workaround:
>
> ```toml
> [git_branch]
> symbol = "\ue0a0 "
>
> [nodejs]
> symbol = "\ue718 "
> ```

## Complete Starship configuration

Here's my complete starship configuration. I have a few toolchain stuff disabled since I either find them annoying or don't consider them important enough to be displayed all the time.

```toml
"$schema" = 'https://starship.rs/config-schema.json'

add_newline = true
format = """$directory$fill$git_branch$git_status$cmd_duration$package$nodejs$python$docker_context
$character"""
command_timeout = 10000

[fill]
symbol = ' '

[character]
success_symbol = '[❯](bold green)'
error_symbol = '[❯](bold red)'
vimcmd_symbol = '[❮](bold purple)'

[cmd_duration]
min_time = 2_000
format = "[\uf252 $duration]($style)"
style = 'bold purple'

[directory]
style = 'bold blue'
format = "[\uf115 $path]($style)[$read_only]($read_only_style)"
read_only_style = 'bold red'
read_only = "\uf023 "

[git_branch]
format = '[$symbol$branch(:$remote_branch)]($style) '
style = 'bold cyan'
symbol = "\ue0a0 "

[git_status]
format = '[$all_status$ahead_behind]($style)'
style = 'bold cyan'
conflicted = "\uf0e7 "
ahead = '⇡${count} '
behind = '⇣${count} '
diverged = '⇕⇡${ahead_count}⇣${behind_count} '
untracked = "\uf128 "
stashed = "\uf01c "
modified = "\uf044 "
staged = "\uf067 "
renamed = '󰑕 '
deleted = "\uf014 "

[gcloud]
disabled = true

[nodejs]
format = '[ $symbol($version)]($style)'
symbol = "\ue718 "
style = 'green'

[python]
format = '[ $symbol$version]($style)'
symbol = "\ue73c "
style = 'purple'

[rust]
disabled = true

[golang]
disabled = true

[docker_context]
format = '[ $symbol$context]($style)'
symbol = "\uf308 "
style = 'blue'

[package]
format = '[ $symbol$version]($style)'
symbol = '󰏗 '
style = 'blue'
```

Between iTerm2 and Ghostty, my terminal is a configuration file powered by Starship and I can easily switch or explore new terminal apps.
