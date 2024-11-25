---
title: Adding Bluesky icon to my Astro blog
author: Aman Mittal
pubDatetime: 2024-11-22T03:42:51Z
slug: add-bluesky-icon-to-astropaper
featured: false
draft: false
tags:
  - notes
description: ''
---

I use [AstroPaper](https://github.com/satnaing/astro-paper) as the default theme for my blog. It is a minimal, responsive and SEO-friendly Astro blog theme.. Astro is a modern static site builder that allows you to build faster websites with less client-side JavaScript. This theme is minimal and customization-friendly.

With [Bluesky growing rapidly, adding over one million users daily](https://www.cnet.com/tech/bluesky-explained-why-this-social-media-network-is-now-growing-by-1-million-users-daily-luke-skywalker/), is built using Expo (yes the place where I'm working right now), and "tech Twitter" (yes, Twitter, not X) is moving to this platform, the overall vibes I get from it is good days of using Twitter.

I decided to look into [AstroPaper's GitHub repository](https://github.com/satnaing/astro-paper) to see if there are any new updates for adding this new icon. The instructions in this post are from [this closed PR](https://github.com/satnaing/astro-paper/pull/209).

---

Lucky for us, all the significant social icons are defined and stored in one file called `src/assets/socialIcons.ts`:

```ts
const socialIcons = {
  // All social SVG icons...
};
```

Let's update the `socialIcons` object by adding a new SVG icon called `Bluesky`, with the following code:

```ts
const socialIcons = {
  // Other social svgs...
  Bluesky: `<svg class="icon-tabler" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
<path fill="currentColor" d="M27.5,25.73c-1.6-3.1-5.94-8.89-9.98-11.74c-3.87-2.73-5.35-2.26-6.31-1.82c-1.12,0.51-1.32,2.23-1.32,3.24
c0,1.01,0.55,8.3,0.92,9.51c1.2,4.02,5.45,5.38,9.37,4.94c0.2-0.03,0.4-0.06,0.61-0.08c-0.2,0.03-0.41,0.06-0.61,0.08
c-5.74,0.85-10.85,2.94-4.15,10.39c7.36,7.62,10.09-1.63,11.49-6.33c1.4,4.69,3.01,13.61,11.35,6.33c6.27-6.33,1.72-9.54-4.02-10.39
c-0.2-0.02-0.41-0.05-0.61-0.08c0.21,0.03,0.41,0.05,0.61,0.08c3.92,0.44,8.18-0.92,9.37-4.94c0.36-1.22,0.92-8.5,0.92-9.51
c0-1.01-0.2-2.73-1.32-3.24c-0.97-0.44-2.44-0.91-6.31,1.82C33.44,16.85,29.1,22.63,27.5,25.73z" />
</svg>`
};
```

In the AstroPaper theme, the `SOCIALS` array inside the `stc/config.ts` controls the active social profiles displayed on the blog. Let's add the `Bluesky` social link to this array so that the link will appear on its own.

```ts
export const SOCIALS: SocialObjects = [
  // Other social links...
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/aman.bsky.social',
    linkTitle: `${SITE.title} on Bluesky`,
    active: true
  }
];
```

Here's what's happening in the snippet above:

- **`name`**: The name of the social media platform.
- **`href`**: Your Bluesky profile URL.
- **`linkTitle`**: Tooltip text shown on hover.
- **`active`**: Displays the icon when set to `true`.

After making this change, the icon will appear (depending on how you customized the AstroPaper theme for your blog) in the hero section and the footer:

![Bluesky icon in hero section](/images/bluesky-icon/ss2.png)

![Bluesky icon in footer](/images/bluesky-icon/ss1.png)

This is great, and you are done! However, I wouldn't say I liked how the icon is filled with the current color. To match it with the rest of the icons and make it appear outline, set the value of `fill` to `none` and add the `stroke-width` to `4` inside the `src/assets/socailIcons.ts` file:

```ts
const socialIcons = {
  // Other social svgs...
  Bluesky: `<svg class="icon-tabler" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
<path fill="none" stroke-width="4" d="M27.5,25.73c-1.6-3.1-5.94-8.89-9.98-11.74c-3.87-2.73-5.35-2.26-6.31-1.82c-1.12,0.51-1.32,2.23-1.32,3.24
c0,1.01,0.55,8.3,0.92,9.51c1.2,4.02,5.45,5.38,9.37,4.94c0.2-0.03,0.4-0.06,0.61-0.08c-0.2,0.03-0.41,0.06-0.61,0.08
c-5.74,0.85-10.85,2.94-4.15,10.39c7.36,7.62,10.09-1.63,11.49-6.33c1.4,4.69,3.01,13.61,11.35,6.33c6.27-6.33,1.72-9.54-4.02-10.39
c-0.2-0.02-0.41-0.05-0.61-0.08c0.21,0.03,0.41,0.05,0.61,0.08c3.92,0.44,8.18-0.92,9.37-4.94c0.36-1.22,0.92-8.5,0.92-9.51
c0-1.01-0.2-2.73-1.32-3.24c-0.97-0.44-2.44-0.91-6.31,1.82C33.44,16.85,29.1,22.63,27.5,25.73z" />
</svg>`
};
```

You can always change the stroke width (`stroke-width`) as you like. Now, the updated icon will match the other social icons:

![Updated Bluesky icon in hero section](/images/bluesky-icon/ss3.png)

Following the instructions above, you can add whichever icon you'd like. I personally find AstroPaper's customization options to keep my blog up to date with minimal effort. What customizations have you tried? Let me know on [Bluesky](https://bsky.app/profile/aman.bsky.social)!
