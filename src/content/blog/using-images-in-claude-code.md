---
title: Using images in Claude Code
author: Aman Mittal
pubDatetime: 2026-02-18T00:00:05Z
slug: using-images-in-claude-code
featured: false
draft: false
tags:
  - ai
  - cli
description: ''
---

Recently I wrote a post on [Running headless Codex CLI inside Claude Code](/blog/running-headless-codex-cli-inside-claude-code/), which describes a way to use Codex models in a headless way when you have Claude Code installed on your local machine. I ended up creating a skill for it where Claude Code will ask you to go through a series of questions to select which Codex model and its reasoning level. It also goes through the task you want to achieve with Codex without leaving your session inside Claude Code.

During the development of that skill, I found because an LLM can have stale training data, it might not choose the right set of models. This is exactly what happened on the first iteration of the skill development. Opus 4.6 initially had GPT 4 models added to the skill and I only found out about it after running the skill manually (and no, I didn't read the skill file when it was created for the first time).

To have the current set of models presented when running this skill, I asked Claude Code to adjust the skill itself. I ran `/model` picker inside Codex CLI, took a bunch of screenshots of the currently available models and their reasoning levels and gave them to Claude Code without further explanation. I found that it is easier for an LLM to pick information from an image.

Claude Code was able to rectify its own mistake. Most modern LLMs available are multimodal, including Claude and GPT models. They can process images natively without the need of converting them to text first.

In Claude Code specifically, you can paste screenshots with Cmd+V (on macOS), drag-drop files, or reference image paths from your machine's filesystem. Think of it like giving someone directions to your house. You can either describe the route over a phone call or text including nearest landmarks or you can just drop a pin in an instant messaging app which will allow them to view the dropped pin (capture of the location using a maps app). The pin can't be misinterpreted easily.

With the help of screenshots, you can also eliminate a lot of back and forth for what you want to describe. Images are first-class content blocks in Claude. They are interpreted as tokens using a formula as per [official Claude's documentation](https://platform.claude.com/docs/en/build-with-claude/vision#calculate-image-costs). A 1000 by 1000 px image is roughly 1334 tokens. Not exactly too much considering the context length and the level the latest LLMs operate these days.

Next time you are stuck at explaining something in the input field in Claude Code or are looking for a way to move things faster, take a screenshot and paste it in your terminal window.
