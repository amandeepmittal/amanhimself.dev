---
title: How to permanently hide folders from graph view in Obsidian
author: Aman Mittal
pubDatetime: 2024-07-11T03:42:51Z
slug: hide-folders-from-graph-view-obsidian
featured: false
draft: false
tags:
  - obsidian
description: ''
---

I've been using Obsidian for more than a year, and it has become more than a commonplace note-taking app. I use one vault to store all of my notes. They are related to work, projects, bookmarks, and sometimes my journal.

## Graph view - a useful tool

One of the fascinating tools I've found that Obsidian provides is the Graph view. The Graph view is an opportunity to view all of your notes in one place and see the connections between different notes. It's not only visual but also interactive. Clicking a node in the graph opens the note.

<img src="/images/obsidian/graphv-1.png" alt="Graph view in Obsidian" class="sm:w-2/3 mx-auto"/>

As you can see in the above graph, the nodes are colored in three ways: _black, green, and gray_. The _green_ ones are the tags that I'm using in some of my notes.

<img src="/images/obsidian/graphv-2.png" alt="Green nodes in Graph view" class="sm:w-2/3 mx-auto"/>

I often use it as a visual tool to see all my all tagged notes. This helps me identify the existing tags I am using and understand their connections. Clicking the magic wand icon, also isolates the tags and displays them in the Graph view.

After clicking a node in the graph, the view opens the Obsidian search panel. It displays all the notes using that tag. It also allows showing a view for a specific tag using **Filters**.

<img src="/images/obsidian/graphv-4.png" alt="Filters in Graph view" class="sm:w-2/4 mx-auto"/>

## Excluding notes from Graph view

Sometimes, I want to keep some of my notes hidden from this Graph view. There can be many reasons why would one want to do that. For example, you may have notes inside an Archive folder. You want to keep them for a while but don't want to remember them all the time. I have quite a few folders in my personal vault where I keep archiving notes. I also have an Attachment folder to keep all the screenshots used in different notes, inside one folder. It doesn't make sense to me to have them appear in the Graph view. It's just clutter.

Excluding files and folders from the graph view, search, and so on, by defining their paths.

- Click **Settings** in the Obsidian desktop app, and in the menu, click **Files & links**.
- Under **Excluded files**, click **Manage** to define the paths to the folders where these notes live. A path can include a top-level folder or a nested folder path.

<img src="/images/obsidian/graphv-3.png" alt="Excluding notes from Graph view setting in Obsidian" class="sm mx-auto"/>
