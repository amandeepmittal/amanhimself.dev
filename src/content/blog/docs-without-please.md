---
title: 'Docs without please'
author: Aman Mittal
pubDatetime: 2025-01-13T00:00:01Z
slug: docs-without-please
featured: false
draft: false
tags:
  - tech-writing
description: ''
---

Technical documentation serves one purpose: to help readers accomplish tasks efficiently. Politeness markers such as "thank you" or "please", don't serve this purpose. While politeness matters in conversation to an extent, in documentation, it can create weaker critical instructions.

Documentation isn't a conversation. It's a tool to inform your readers about any actionable steps they need to take to be successful in their own endeavors. When you write, "Please update the CLI version", you're trying to inform your readers about the action they need to take. However, adding "please" doesn't make the instruction more valid or actionable.

In some cases, words like "please" can add extra ambiguity. A reader may wonder one of the following when reading a sentence that contains this marker:

- Is this step truly required?
- Or is this a polite suggestion?
- Are documentation authors being ironic or sarcastic?

The last point isn't just theoretical. See ["Can I have a cup of tea please?" Politeness markers in the Spoken BNC2014](https://www.degruyter.com/document/doi/10.1515/pr-2022-0010/html?lang=en), which demonstrates how frequently the word "please" is used insincerely or counterproductively.

I am also not a fan of using "please" or placeholder words like "please note" in instructions for the sole reason that an instruction is meant to inform the reader about the next actionable step they need to take.

For example, consider this sentence: _Please ensure you have Node.js installed on your computer._ Now, the purpose of this sentence is to inform the reader that they need to install or have installed Node.js on their system to run the program and follow the instructions from the rest of the guide. Now, this is not something you can just ask the reader. This is a requirement to follow the instructions from the rest of the guide to be successful. Instead, this sentence can be written as: _Install Node.js on your computer_, or just: _Install Node.js_, which is concise enough to tell the reader what they need to do on their end.

Good and strong technical documentation uses direct, active statements that inform readers what they need to do. These conversation artifacts make their way into docs through habit rather than purpose.
