---
title: 'Replacing rm command with trash in Claude Code'
author: Aman Mittal
pubDatetime: 2026-04-11T00:00:01Z
slug: replacing-rm-with-trash-in-claude-code
featured: false
draft: false
tags:
  - ai
  - claude-code
description: ''
---

The fear of losing a file is a big deal using Claude Code since it has access to bash tools and can run bash commands on its own. This is possible whenever `--dangerously-skip-permissions` is enabled or I have accepted edits inside a particular session.

A workaround for this can be to skip running `rm` command inside Claude Code settings. I have added `"Bash(rm:*)"` to a "deny" list inside Claude Code's global settings file (`~/.claude-code/global-settings.json`):

```json
{
  "permissions": {
    "deny": ["Bash(rm:*)"]
  }
}
```

The deny list in `settings.json` lives outside of the conversation/session, which means Claude cannot run `rm` even if it wants to during a session. It will trigger the command during a session but the tool call will get blocked and the command will fail to run.

This is a good workaround to prevent accidental file deletions. However, it also means that if I want Claude Code to delete a file, I will have to manually keep track of each file from the session and delete it myself. That is tiresome and ideal for me.

**_What if I could allow Claude Code to safely delete those files instead of permanently delete them?_**

There is a tool exactly for deleting files safely without permanently deleting them. It is called [`trash`](https://hasseg.org/trash/), a CLI that moves a file or a directory to the Finder trash on macOS. To install it, you can use Homebrew:

```shell
brew install trash
```

Running a command like `trash file.txt`, will move the `file.txt` inside the Finder trash. This is normal macOS trash behavior. I added `trash` in my Claude's global `CLAUDE.md` file with the following instruction:

```markdown CLAUDE.md
## No `rm` Rule

Never use `rm` or `rm -f` to delete files. Always use `trash` instead (e.g., `trash .eslintcache`). This ensures files can be recovered.
```

Now, instead of `rm`, Claude reaches for `trash` on its own. The deny list keeps on handling the edge case where the initial intent is to use `rm` fails and the Claude picks up `trash`.

Here is an example of how it works in practice from a real session, where I was working on migrating from ESLint to OxLint:

```shell
trash ~/.claude/skills/docs-freshness/SKILL.md
trash ~/.claude/scripts/docs-freshness.sh ~/Library/LaunchAgents/com.claude.docs-freshness.plist
trash .oxlintrc-test.json
trash .oxlintrc.json.bak
trash .eslintcache
trash scripts/oxlint-migration-status.ts
```

Each of the above files would have been permanently deleted with `rm`. With `trash`, they all went to the Finder trash where I can recover them if I need to. I have stopped thinking about losing an important file permanently. I just approve the cleanup step and move on.
