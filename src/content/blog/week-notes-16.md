---
title: Week notes 16
author: Aman Mittal
pubDatetime: 2026-04-12T00:00:01Z
slug: week-notes-16
featured: false
draft: false
tags:
  - notes
description: ''
---

Mixed week. A small side-project release, a couple of satisfying wins on the work side, and a lot of late-night ideas I want to act on coming week.

- 🚀 Shipped [SkillsBar](https://github.com/amandeepmittal/skillsbar) v1.7.0. The big addition is Codex plugin support and adding custom collections view where one can organize their skills based on a theme or topic or work repository. Codex plugins now show up under User Skills in the Codex tab, alongside the Claude Code skills SkillsBar already tracked. Also fixed a quiet bug where the Usage Stats screen was silently dropping historical data beyond four weeks. This is a major update, and I used GPT 5.4 to add more tweaks apart from doing this major update.
- 💼 One Vale win on the Expo docs side. First, `lint-prose` had quietly drifted from around 6 seconds back up to 13. Turned out the `out/` directory was not actually being excluded the way I thought, because `.vale.ini` exclusions run after Vale walks the tree. Patched the script to use CLI glob negation and the time dropped back down. Second, got the Vale install script checksum verification. Now Vale can be installed locally by any member of the team and have 5 seconds reduction when running `lint-prose` command.
- 📝 Published a post on [Replacing rm command with trash in Claude Code](/blog/replacing-rm-with-trash-in-claude-code/).
- 🧪 Started looking into AI evals and automation for documentation. There's so much ground to cover.
