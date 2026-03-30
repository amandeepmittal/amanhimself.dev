---
title: Color-coding my Claude Code sessions
author: Aman Mittal
pubDatetime: 2026-03-14T00:00:01Z
slug: color-coding-claude-code-sessions
featured: false
draft: false
tags:
  - ai
  - cli
  - claude-code
description: ''
---

I usually have two or more sessions running at a time either in the same or different project directories. One of the longest and most used sessions I have is in my [notes directory](/blog/claude-code-tokens-usage/), where I am constantly creating specs or taking notes on the stuff I am working on.

One problem when running multiple Claude Code sessions in different terminal windows or tabs is visually distinguishing them.

Claude's team recently released `/color` and `/rename` slash commands in Claude Code in [v2.1.75](https://code.claude.com/docs/en/changelog). Together, they can turn anonymous Claude Code sessions into visually distinct workspaces. And this kind of solves the problem of visually separate multiple sessions on my end.

The `/color` allows changing the color of the prompt bar. For example, if I type `/color orange` in a currently active session, I immediately see it. Below is an example of two sessions running in the same directory. The first session has the default prompt color which matches my iTerm2 theme and the second session's prompt bar:

<img src="/images/color-coding-claude-code/cc01.png" alt="Two Claude Code sessions side by side, one with default color and one with orange prompt bar" width="800" />

Before `/color`, these sessions looked identical. I'd glance at a terminal tab, guess which session it was, and then had to look a bit deeper to recall what the session was about.

For a full list of available colors, see the [official docs](https://code.claude.com/docs/en/commands).

Also, notice that both sessions say "Claude Code (node)" in the header of each terminal tab in iTerm. This can be modified using `/rename`, which lets me name a session and also affects the prompt bar.

<img src="/images/color-coding-claude-code/cc02.png" alt="Claude Code session with renamed prompt bar" width="800" />

By default, `/rename` command without an argument will auto-generate a name based on a session. I can override this by `/rename your-session-name`:

<img src="/images/color-coding-claude-code/cc03.png" alt="Claude Code session with custom name on prompt bar" width="800" />

`/rename` command also affects the name of the terminal session window/tab. After setting it up or using the auto-generated session name, in iTerm2, the header reflects the same value.

This solves a huge problem for me because iTerm2 has profile-based coloring and I use the default profile for all sessions.

Now, I can also trigger a new session that has the color set by default for that session:

```shell
claude "/color yellow"
```

The above command will automatically trigger the session with the prompt bar's color already set to the color yellow.

<img src="/images/color-coding-claude-code/cc04.png" alt="Claude Code session launched with color set via CLI argument" width="800" />

However, this does not allow chaining slash commands yet. This means, I cannot run `claude "/color yellow" "/rename notes"`. If you want to automate this, one little thing I've done is set a specific color at the start of a session for a specific project by creating an alias in my `.zshrc` like:

```shell
alias cnotes="claude '/color yellow'"
```

This way, I can run the alias command when starting a new session in the specific directory every time.
