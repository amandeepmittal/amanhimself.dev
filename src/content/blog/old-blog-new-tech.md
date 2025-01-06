---
title: Old blog, new tech
author: Aman Mittal
pubDatetime: 2025-01-06T00:00:01Z
slug: old-blog-new-tech
featured: false
draft: false
tags:
  - blogging
description: ''
---

Since 2016, I’ve been blogging, and I launched this website in 2019. Before that, I primarily wrote for various publications on Medium and other platforms, including respected sites like FreeCodeCamp and Logrocket. This website was built with Gatsby, my first experience using a static site generator and the React framework to create something substantial.

In 2020, I started using Next.js and decided to migrate the blog to it in the middle of the year. I was writing and publishing posts a lot more at that time than I do now. Part of the reason for creating a personal blog was to write and post things that publications rejected, but they were good ideas.

Another reason was to have one place to keep or link all of my online content. With time, things on the internet multiplied and got hard to track. Writing mostly tutorials at that time was closer to a portfolio for me in the world of tech writing.

## Back to using Next.js

As a React framework, Next.js was more flexible than Gatsby but too flexible for me as things started to get overwhelming when I migrated this blog. The initial migration appeared encouraging, but soon, I faced issues with the build configuration. The build times increased significantly, taking approximately 10 minutes to complete.

After struggling with optimization attempts for a few weeks, I [reverted back to Gatsby](/blog/year-rewind-2020/#i-moved-my-blog-from-gatsby-to-nextjs-and-back-to-gatsby-again). By implementing that change, I reduced the build time with Next.js, which had been around 10 minutes, by 70%. This made me recognize that I was achieving better results with Gatsby that I couldn't with Next.js.

At the end of 2021, I was offered a role to join Vercel's documentation team. Before that offer, I had experimented with Next.js for hobby projects since 2020 and wanted to get something running in the weeks between jobs. I decided to dive into Next.js documentation and some tutorials to learn more about the framework and took this blog as a dogfooding project. I was happy with the state in which this blog ended up.

Over the span of the next three years, maintaining a static blog with Next.js became difficult. Between breaking major upgrades, API changes, and the new app router, I spent more time maintaining the blog rather than writing new posts.

## The new setup with Astro

In the middle of 2024, tired of the amount of maintenance I had to do, I came across [Astro](https://astro.build/) and thought it had a lower barrier to entry. It is compatible with React as a templating library, so I decided to migrate this blog to use Astro. The migration introduced multiple enhancements compared to my Next.js setup: quicker build times, easier content management using Markdown files, and default zero-JavaScript, leading to improved performance.

Right now, I'm using Astro to generate this site and deploy it on Vercel. I have chosen [AstroPaper](https://github.com/satnaing/astro-paper) as the primary theme, which comes with minimal configuration &mdash; all I needed to get started, though I have done some customizations.

Some of the customizations I have done are:

- **Layout Changes**: Modified the header to include my social links and adjusted the main content width for better readability

- **Dark Mode Tweaks**: Customized the light and dark mode color palettes to use a different color palette than the default one that came with AstroPaper

- **Typography**: Switched to `Helvetica Neue` as the primary font

- **Code Blocks**: Switched to a different code syntax highlighting with [Catppuccin](https://github.com/catppuccin) VS Code-inspired theme colors and added copy-to-clipboard functionality

The best experience so far is how lightweight Astro and AstroPaper are. Upgrading major versions for Astro is also a nice experience. With the recent version 5 upgrade, there were no breaking changes this time that affected this blog.

While I don’t intend to undertake significant customizations, I’ve discovered that it’s feasible either by developing custom React components or by utilizing basic JavaScript. The styling of this blog is written and handled by Tailwind CSS. Even though I haven't written as much as I wanted in 2024, I've also spent less time maintaining the site.

Since I have been bad at capturing screenshots and keeping a historical record of how this blog has looked, here is one from 2024:

<img src="/images/old-blog.png" alt="amanhimself.dev's landing pages screenshot." class="sm:w-2/3 mx-auto" />

## Looking forward

These migrations over the years have taught me valuable lessons about static-site web development and why simpler is often better for personal projects like this blog. While it is tempting to use the latest and most flexible frameworks, what matters most is having a stable platform that allows you to focus on writing more than maintenance.

Some key takeaways from this migration reflection:

- Start with your core needs. A blog primarily needs good content management. Usually, a blog like this is all about putting content in markdown files, and those files are sourced from one folder.

- Don't over-engineer it. Focus on features you need, and most of the time, they are already available with an open-source theme/template.

- Consider the long-term maintenance to focus more on writing.

This journey from Gatsby to Next.js and Astro has been a good one.
