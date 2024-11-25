---
title: Tracking notes created in Obsidian with Dataview
author: Aman Mittal
pubDatetime: 2024-08-08T03:42:51Z
slug: tracking-notes-in-obsidian-with-dataview
featured: false
draft: false
tags:
  - obsidian
description: ''
---

My daily note is the starting point for capturing workday information. To record this information, I either create a fleeting note or add it to my daily note. Creating too many new notes can be cumbersome and overwhelming at the end of a week when I'm going through them for my weekly review sessions.

To review the notes created during the week, I do this by keeping track of the files created each day inside that day's daily note.

At the end of each daily note, I include a section for "Notes created today". Inside this, a live data query runs which provides a list of notes created on that day. The query links to the note titles using Obsidian's link `[[...]]` syntax.

Here's an example of today's notes listed in the daily note:

<img src="/images/obsidian/daily-3.png" alt="Graph view in Obsidian" class="sm:w-2/3 mx-auto"/>

The Dataview plugin runs the data query inside the callout.

## Prerequisites

Install the following Obsidian plugins to follow the instructions further:

- [Dataview](https://obsidian.md/plugins?id=dataview)
- Daily note (comes installed by default, enable it)

In the Daily note and Dataview plugin, I've set the date format to be `YYYY-MM-DD`:

<img src="/images/obsidian/daily-1.png" alt="Graph view in Obsidian" class="sm:w-3/3 mx-auto"/>

<img src="/images/obsidian/daily-2.png" alt="Graph view in Obsidian" class="sm:w-3/3 mx-auto"/>

## What is the Dataview plugin

Dataview is an Obsidian plugin that allows you to query metadata in real-time from files or folders within your vault. It lets you create dynamic lists, tables, and views of your notes based on their metadata.

For example, to list all of your notes in the Obsidian vault, use the following syntax:

````md
```dataview
LIST
```
````

The Dataview plugin supports writing queries with the [Dataview Query Language (DQL)](https://blacksmithgu.github.io/obsidian-dataview/queries/dql-js-inline/#dataview-query-language-dql) or as inline statements. For more complex queries, you can also use JavaScript.

For the purpose of this post, using the Dataview Query Language is enough.

## Using a query to view a list of notes created for a date

Notes created each day can be viewed using the following query:

````md
```dataview
LIST
WHERE file.cday = this.file.day
SORT file.ctime asc
```
````

If you are new to this syntax, it might initially seem confusing. Let's break down the components of the query:

- `LIST`: This command lists all notes that match the query criteria.
- `WHERE`: This statement filters results based on a specific condition. In the above example, the condition is `file.cday = this.file.day`.
  - Here, `file` refers to the note being queried for its metadata. `cday` is the "created date" of the note, and `file.day` refers to the date in the daily note's title. The `=` operator is used to compare the file's creation date with the daily note's date.
- `SORT`: This statement orders the query results. In this case, notes are sorted in ascending order by their creation time (`ctime`).

While the query effectively lists files created on a specific date, it also includes files from the ‘Daily notes’ and ‘Templates’ folders, which is useless for my use case. To exclude files from those folders, update the query as follows:

````md
```dataview
>LIST
>WHERE file.cday = this.file.day
>WHERE !contains(file.path, "Daily notes/")
>WHERE !contains(file.path, "Templates/")
>SORT file.ctime asc
```
````

In the updated query, the `contains` function checks the path of the file (`file.path`) inside the directories (`Daily notes/` and `Templates/`). Using the `!` operator, any file in those directories is excluded from the Dataview query. This helps me avoid listing files I don't want to see inside this Dataview.

## Conclusion

Metadata is powerful in Obsidian notes. What's even more powerful is the ease of using metadata fields to create custom views with the Dataview plugin.

### References

- [Dataview sources documentation](https://blacksmithgu.github.io/obsidian-dataview/reference/sources)
- [Metadata pages and implicit fields](https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-pages/#implicit-fields)
- [Functions in Dataview](https://blacksmithgu.github.io/obsidian-dataview/reference/functions/)
