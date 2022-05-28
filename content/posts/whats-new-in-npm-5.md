---
title: 'What’s New in npm 5?'
date: '2017-08-24'
thumbnail: '/thumbnails/node.png'
slug: 'whats-new-in-npm-5'
tag: 'nodejs'
canonicalUrl: 'https://amanhimself.dev/blog/whats-new-in-npm-5/'
---

In May, in the very last week, [**npm**](https://npmjs.com/) announced the new major release for the JavaScript package manager. **5.0.0**, hopefully, will be shipped with upcoming version of [**Nodejs**](https://nodejs.org/en/) **(>=8.0.0)**as well. It seems a big step towards providing better tooling with significantly improved performance as quite a lot of developers made a switch to `yarn`, just because it could download the packages from the `npm` registery at a faster rate. However, this point is debatable, so let’s not get into that.

## A Peek at Major Changes

Some of the major changes which I want to hightlight in this article and am eagerly looking forward to are:

- `npm will --save` is available by default now. See the [demo](https://twitter.com/maybekatz/status/859229741676625920) with your own eyes.
- Running `npm` while offline will no longer insist on retrying network requests. npm will now immediately fall back to cache if possible, or fail.
- `--cache-min` and `--cache-max` have been deprecated, so, existing npm caches will no longer be used.
- A new `--prefer-offline` option will make npm skip any conditional requests for stale cache data, and only hit the network if something is missing from the cache.
- A new `--prefer-online` option that will force npm to revalidate cached data, ignoring any staleness checks, and refreshing the cache with revalidated, fresh data.
- A new `--offline` option will force npm to use the cache or exit. It will error with an `ENOTCACHED` code if anything it tries to install isn’t already in the cache.
- A standardised lockfile feature is available by default and will be for cross-package-manager compatibility (`package-lock.json`), and a new format and semantics for shrinkwrap.
- Downloads for large packages are streamed in and out of disk. npm is now able to install packages of any size without running out of memory.
- Last, it’s a bit faster. [Demo here](https://twitter.com/maybekatz/status/865393382260056064?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed&ref_url=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Ftype%3Dtext%252Fhtml%26key%3Da19fcc184b9711e1b4764040d3dc5c07%26schema%3Dtwitter%26url%3Dhttps%253A%2F%2Ftwitter.com%2Fmaybekatz%2Fstatus%2F865393382260056064%26image%3Dhttps%253A%2F%2Fi.embed.ly%2F1%2Fimage%253Furl%253Dhttps%25253A%25252F%25252Fpbs.twimg.com%25252Fprofile_images%25252F848625085942349824%25252FBZtSBqtV_400x400.jpg%2526key%253Da19fcc184b9711e1b4764040d3dc5c07)

Hopefully, they update their docs quickly with this new update and more users like me will be able to switch or access much of these key features. For detailed look into npm5’s features have a look at their [official blog post](http://blog.npmjs.org/post/161081169345/v500) in which they have listed every other breaking change coming with the new release.

To start using the latest version of npm, you can in your terminal window or preferable shell:

```shell
npm install -g npm@next

# Or

npm install -g npm@latest
```
