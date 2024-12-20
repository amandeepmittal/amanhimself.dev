---
title: Block unwanted external links using Google Search Console's Disavow
author: Aman Mittal
pubDatetime: 2024-12-12T03:42:51Z
slug: block-unwanted-external-links-using-google-search-console-disavow
featured: false
draft: false
tags:
  - notes
description: ''
---

When managing a docs site SEO, you might encounter situations when external websites link to incorrect or non-existent pages from your site. These unwanted backlinks can impact your site's search performance and create unnecessary 5xx errors.

Solution is to use Google Search Console's [disavow links tool](https://support.google.com/webmasters/answer/2648487?hl=en) to create a list of unwanted backlinks.

## Detecting incorrect external links

Recently, I encountered an interesting case where a (spammy looking) website linked to Expo documentation with a typo in the URL. Google Search Console reported this as a 5xx Page not indexed.

![ss1](/images/disavow-1.png)

Now, even though the page exists, requesting a re-index validation in Google Search Console wouldn't solve this problem (I tried this and that's how I stumbled upon the solution).

This is a common issue many website owners face, external sites linking to incorrect URLs that you don't have direct control over.

## Understanding the impact

Incorrect external links can cause multiple issues such as: 404 error reports and 5xx Page not indexed. Having multiple error pages for too long can potentially affect your site's performance.

## Using Google's Disavow links tool

Google Search Console provides adding disavow links tool, which tells Google to ignore specific backlinks when assessing your site during the next crawl.

To use it, you can :

1. Gather a list of all the external links that are broken
2. Create a text (`.txt`) file containing these URLs you want Google to ignore

```txt
# Pages to disavow
https://example.com/incorrect-page
https://another-site.com/wrong-link
```

- If required, you can also also disavow the complete domain by adding it to the text file

```txt
# Site's to disavow
domain:example.com
```

3. Open Google Search Console's [disavow links tool page](https://search.google.com/search-console/disavow-links) and select your domain property under **Select property**
4. Upload your disavow file and confirm the submission

![ss2](/images/disavow-2.png)

## Summary

The Google Search Console disavow links tool is a valuable resource for managing unwanted or incorrect external links. While it shouldn't be your first solution as per [Google's documentation](https://support.google.com/webmasters/answer/2648487?hl=en), it's an effective way to handle situations where you can't get incorrect links modified at their source.
