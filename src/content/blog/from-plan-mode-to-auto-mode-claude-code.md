---
title: 'From plan mode to auto mode in Claude Code'
author: Aman Mittal
pubDatetime: 2026-08-09T00:00:01Z
slug: from-plan-mode-to-auto-mode-claude-code
draft: false
tags:
  - claude-code
  - llms
description: ''
---

I am using Claude Code since February 2026 and recently I have completely stopped using "plan mode" in Claude Code most of the time and using "auto mode" most of the time during my workday.

## Is plan mode necessary?

The feature _plan mode_ was introduced in Claude Code on June 5, 2025 in v1.0.14. It was initially shipped quietly.

I think plan mode is necessary when I am exploring something from scratch or I want Claude to plan a series of tasks that I can come back to, in another session or on different system. I also think plan mode plays role when I, the user, have to make a decision and I don't want to delegate that part to Claude. It acts as a guardrail that prohibits editing files in a codebase.

## I want to control interactions

Although, another workaround I have found when exploring something, is to ask Claude Code explicitly "to not touch or edit any file…". This works 100 percent of the time with new top frontier models like Opus 5 and Fable 5 and doesn't require me selecting plan mode in Claude Code.

This is also known as being a **human-in-the-loop**. Some of the ways I indulge in interactions is by adding one of the following in a prompt:

- "list all options I have to do this task"
- "do not edit any files and list/discuss options"

The emphasis here is to have Claude list all the options before I proceed on a given task. After it lists all the options to do X task, I can interact with by asking questions and offer personal opinions and select the direction I want it to go to perform the action. This way, you can also say, the person initiating the Claude Code session becomes the orchestrator.

Multiple back and forth exchanges are required for the complex tasks or larger tasks in my opinion. Without having any sort of interactions I won't know what is Claude working on and I still don't completely trust LLMs to make decisions on their own, all the time.

## If not plan mode, then what mode am I using?

In most sessions with Claude Code, I am using _auto mode_. I have multiple sessions open at one time in my terminal app and I try to go through them as quickly as I can be depending on the nature of each session. I only want to be a bottleneck where my attention is required.

For example, a documentation pull request (PR) review can be done with my custom skill. It doesn't require my attention when I have given the context. A session can itself trigger the skill and have the review ready in the pending state. My attention in this process is only required when the comments on the PR are posted in the pending the state on GitHub. Then, I can go through what Claude posted and if there's anything I have to add further for the benefit of the PR author.

Another example of using auto mode is when I have already investigate the problem and have a good idea on how to solve it. Consider a linear issue with an appropriate title and a description that contains enough context for an LLM to go through and implement the solution. I have also instructed Claude to check out a Git branch based on the Linear issue and then proceed with the rest of the issue. This way, I am not the bottleneck and the approach works for low and/or none complex tasks.
