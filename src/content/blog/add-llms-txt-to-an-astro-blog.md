---
title: How I added llms.txt to my Astro blog
author: Aman Mittal
pubDatetime: 2025-12-24T00:00:01Z
slug: add-llms-txt-to-an-astro-blog
featured: false
draft: false
tags:
  - blogging
  - ai
description: ''
---

At the end of 2024, there was a growing interest in tech writing community around publishing an `llms.txt` file. The purpose of this file is to provide structure or full context that an LLM vendor can use to understand a site owner's intention and consume a site's content in a structured way.

The whole concept is beneficial for AI crawlers. Instead of navigating through a site's HTML, CSS, and JavaScript to extract content, a file like `llms.txt` provide them with clean, pre-formatted content. I'd like to think that this file provides a structured sitemap for AI consumption.

As someone who writes technical content and wants to make it accessible to both humans and AI systems, having a single canonical source of all a site's readable content made perfect sense. Instead of AI crawlers potentially missing content or extracting it incorrectly from HTML templates, I could provide them with the raw markdown content.

In the following post shares the approach I took to add `llms.txt` for my Astro-based blog.

## The implementation plan

Let's talk about "how". The plan is straightforward and assumes that your blog follows the standard structure of such site powered by Astro framework. It could be broken down into the following steps:

- Include the site's metadata at the top of the file to provide context
- Find all markdown files. In my case, they live inside one specific directory: `src/content/blog`
- Read each file and parse YAML frontmatter to get a post's title
- Strip the rest of the frontmatter from the body of the post and only keep the actual markdown content
- Concatenate all posts together with clear separators
- Write to `public/llms.txt`, which is the final file served

As I said, the approach is straightforward. With help of Node.js utilities, all of the above can be systematically achieved in a script. I chose to write a standalone script, but you can also integrate such script in your blog's build process.

## Reading stie metadata for the header

The first thing to tackle is to create a meaningful header for the `llms.txt` file. This includes a blog's actual title, author name, description.

In my case, this information lives inside `src/config.ts` file and is exported as a `SITE` object. However, there's a challenge: `config.ts` is TypeScript, and I didn't want to add the overhead of TypeScript compilation or complex parsing libraries just to extract three fields.

The solution I went with is to use lightweight regex parsing. It might not be the most elegant approach but is a reliable approach to read a few string fields:

```js
async function readSiteMeta() {
  const configPath = path.join(ROOT, 'src', 'config.ts');
  const raw = await readFile(configPath, 'utf-8');
  const siteMatch = raw.match(/export const SITE[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!siteMatch) throw new Error('SITE export not found');
  const siteBlock = siteMatch[1];
  const title = matchField(siteBlock, 'title');
  const author = matchField(siteBlock, 'author');
  const desc = matchField(siteBlock, 'desc');
  return { title, author, desc };
}

function matchField(block, field) {
  const regex = new RegExp(`${field}\\s*:\\s*([\\'\"\\`])(.*?)\\1,`);
  const m = block.match(regex);
  if (!m) throw new Error(`Could not read ${field}`);
  return m[2];
}
```

Let me break down what's happening here:

1. **Read the config file**: Read `src/config.ts` as a plain text file
2. **Extract the SITE object**: The first regex matches everything between `export const SITE = {` and the closing `};`
3. **Extract individual fields**: The `matchField` helper function uses another regex to find each field by name and capture its string value (handling single quotes, double quotes, or backticks)
4. **Fail loudly**: If any field is missing or the structure doesn't match, the script throws an error

This approach is intentionally brittle. If I change the structure of my `SITE` object in a way that breaks the regex, the script will fail immediately, forcing me to update it. I prefer this to silent failures or outdated data.'

With the blog's metadata extracted, you can assemble the header:

```js
const siteMeta = await readSiteMeta();
const header = [
  siteMeta.title,
  siteMeta.author,
  siteMeta.desc,
  '',
  `Generated on ${new Date().toISOString()}`,
  'Contains the markdown content of each blog post.'
].join('\n');
```

Now you have a clean, informative header that tells anything consuming this file exactly what they are looking at and when it was generated. The timestamp could be particularly useful for cache invalidation.

## Traverse blog directory

The next is finding all blog posts from `src/content/blog` directory path. This is done by using `path` module and the reading markdown files from the directory is done by `readdir()`. Ensure that the files read are filtered based on their file extension (`.md`).

```js
const contentDir = path.join(ROOT, 'src', 'content', 'blog');
const files = await readdir(contentDir);
const markdownFiles = files.filter(f => f.endsWith('.md')).sort();
```

I am using `.sort()` to sort the filenames alphabetically but this is not important and you should do whatever you want here.

## Extracting title and body from each post

The core logic of the script is going to extract title and content when processing each markdown file. The title is stored in frontmatter which can be effectively identified by the YAML syntax.

Typically, a markdown file can have a YAML frontmatter at the top (delimited by `---`). It contains metadata such as title, date, tags, and so on. When using a markdown files to render your blog's content the changes such frontmatter is high.

```js
const frontMatterMatch = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
let title = file.replace(/\.md$/, '');
let body = raw;

if (frontMatterMatch) {
  const fm = frontMatterMatch[1];
  const t = fm.match(/title:\s*['\"]?(.+?)['\"]?\s*$/m);
  if (t) title = t[1];
  body = raw.slice(frontMatterMatch[0].length);
}

sections.push(
  [`## ${title}`, `Slug: ${file.replace(/\.md$/, '')}`, '', body.trim()].join(
    '\n'
  )
);
```

The above code block does three things:

- Parses the frontmatter to get the post title using the regex: `/^---\s*\n([\s\S]*?)\n---\s*\n?/` and then uses another regex to match the title
- Strips frontmatter from the content
- Keeps the actual markdown body for structure

## Combine everything and write it to `llms.txt`

With all the sections collected, the final step is combining them into a single output file:

```js
const output = [header, ...sections].join('\n\n---\n\n');
await writeFile(outputPath, output, 'utf-8');
```

The `join('\n\n---\n\n')` creates clear visual separators between each section. The triple-dash (`---`) is a common markdown horizontal rule, so it renders nicely if anyone views the file in a markdown previewer, while also being unambiguous as a separator for programmatic parsing.

The structure of the final file looks like this:

```
[Site Title]
[Author]
[Description]

Generated on [timestamp]
Contains the markdown content of each blog post.

---

## [Post 1 Title]
Slug: [post-1-slug]

[Post 1 content...]

---

## [Post 2 Title]
Slug: [post-2-slug]

[Post 2 content...]

---

... and so on
```

### Why `public/` directory

In Astro (and many other static site generators), the `public/` directory has special behavior: its contents are copied verbatim to the build output without any processing. This means:

- A file at `public/llms.txt` becomes accessible at `https://yourdomain.com/llms.txt`
- No routing configuration needed
- No build-time transformations

## Running the script

Once the script is in place, using it is straightforward:

```bash
node scripts/generate-llms.mjs
```

You can add it to the your `package.json` file:

```json
{
  "scripts": {
    "generate:llms": "node scripts/generate-llms.mjs",
    "prebuild": "npm run generate:llms"
  }
}
```

## Wrapping up

Implementing `llms.txt` for my Astro blog turned out to be one of those satisfying tasks where the solution is simpler than you initially expect.

If you want to see the live result of this implementation, you can check out my blog's [`llms.txt` file](https://amanhimself.dev/llms.txt) or check out the [complete source code on GitHub](https://github.com/amandeepmittal/amanhimself.dev/blob/master/scripts/generate-llms.mjs).
