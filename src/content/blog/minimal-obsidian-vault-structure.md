---
title: A minimal Obsidian vault structure that sticks
author: Aman Mittal
pubDatetime: 2026-07-08T00:00:01Z
slug: minimal-obsidian-vault-structure
featured: false
draft: false
tags:
  - obsidian
description: ''
---

My Obsidian vault has 291 notes captured over the last three years. Some are long-form notes, prompts for tools like Claude Code, or quick captures from reading on the internet.

When I created this vault, I started with 8 folders, but over time the number has grown to 16. I like to keep this vault minimal so it stays useful, but a lack of timely archiving has turned it into a disorganized mess.

My quick capture system was a single file called `_inbox.md`, which grew to 139 KB across 23 sections titled by week over six months. Each section held whatever I threw at it. As a system for thinking, it was a graveyard with good intentions.

Last weekend, I spent a few hours organizing the vault before things got further out of hand. The first problem I tackled was getting the folder structure back to minimal and useful.

## Existing systems aren't enough

Over the last 5 years, I have tried keeping up with the PKM and Obsidian communities and have spent countless hours trying to understand systems like [PARA, Zettelkasten, Johnny Decimal, or a hybrid of all three](https://studio-obsidian.com/obsidian-folder-structure/).

After reading the comparisons and trying to apply them to whatever my notes looked like at the time, I ended up dissatisfied.

## Folders encode lifecycle, links encode topics

One common pattern I took away from the existing systems:

- A folder should answer _what kind of note is this, and where should it live?_
- A folder should not answer _what topic is this about?_

Topics belong to links. A note about a technical documentation approach belongs to "docs testing" and "CI" at the same time, yet it can only sit in one folder.

Forcing topics into folders creates friction: every capture begins with a filing decision, which gets in the way of capturing the information at all.

The solution is to let links carry topics and meaning, and let folders group notes by their kind. [Obsidian Rocks argues folders should manage workflow, not subject](https://obsidian.rocks/how-i-use-folders-in-obsidian/). Andy Matuschak goes further and argues [hierarchies fuzz conceptual edges because they force singular placement](https://notes.andymatuschak.org/Prefer_associative_ontologies_to_hierarchical_taxonomies).

The honest counter-position is Steph Ango, Obsidian's CEO, who [avoids folders almost entirely](https://stephango.com/vault) and organizes with properties and links alone. I respect all of the above creators' methods, but avoiding folders altogether horrifies me.

Not because I can't, but because I use my Obsidian vault not only to capture information but also to do my long-form writing. The post you are reading started as a Markdown file in the vault named "Untitled 2" (_I couldn't come up with a title at the time_).

From now on, I am going to call them lifecycle folders and treat them as the _lifecycle_ of my system. I consider them training wheels that might never come off.

## How many folders is too many?

This is my current entire structure, annotated with the rule that keeps each folder honest:

| Folder      | Holds                           | The rule                                   |
| ----------- | ------------------------------- | ------------------------------------------ |
| `inbox/`    | Every capture                   | Emptied every Saturday                     |
| `notes/`    | Atomic notes                    | Flat, no subfolders, titles are claims     |
| `sources/`  | Literature notes                | One note per book, article, or talk        |
| `journal/`  | Daily and meeting notes         | Sources to mine, never things to convert   |
| `projects/` | Active work, drafts in progress | The only survivor from the old structure   |
| `blog/`     | Finished drafts                 | Final drafts for my blog, ready to publish |
| `writing/`  | Personal writing                | Long-form stays long-form                  |
| `archive/`  | Everything retired              | Keep, don't delete                         |

I also created a `_meta/` folder that contains my templates, plus a `README.md` that holds the table above.

_Why?_ As a reminder to myself of why the vault is structured this way and as context for tools like Claude Code when they access my notes from a terminal session.
