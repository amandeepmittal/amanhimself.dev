---
title: "Convert png to jpg using ffmpeg"
author: Aman Mittal
pubDatetime: 2023-04-01T03:42:51Z
slug: convert-png-to-jpg-using-ffmpeg
featured: false
draft: false
tags:
  - cli
description: ""
---

As a documentarian, I've used [ffmpeg](https://ffmpeg.org/) command-line tool for a while now. It is a powerful tool that can do a lot of things. At work, I use it to convert videos and images.

## Prerequisites

Install [`ffmpeg` using homebrew](https://formulae.brew.sh/formula/ffmpeg).

## Why use ffmpeg?

On macOS, Cleanshot X app by default captures the screenshot in **png** format. These files are large in file size and have a large resolution (not usually suitable for a web page).

## How to use ffmpeg to convert png to jpg?

A **jpg** can have a smaller file size and is preferred for web pages. To convert a **png** to **jpg** using ffmpeg, use the following command:

```shell
ffmpeg -i input.png -preset ultrafast output.jpg
```
