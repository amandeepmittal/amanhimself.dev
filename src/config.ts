import type { Site, SocialObjects } from './types';

export const SITE: Site = {
  website: 'https://amanhimself.dev/', // replace this with your deployed domain
  author: 'Aman Mittal',
  desc: "I'm Aman Mittal (@amanhimself). Software Developer and Tech Writer. Welcome to my blog!",
  title: 'amanhimself.dev',
  ogImage: 'astropaper-og.jpg',
  lightAndDarkMode: true,
  postPerPage: 100,
  scheduledPostMargin: 15 * 60 * 1000 // 15 minutes
};

export const LOCALE = {
  lang: 'en', // html lang code. Set this empty and default will be "en"
  langTag: ['en-EN'] // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false, // Enable/Disable logo image
  svg: true,
  width: 216,
  height: 46
};

export const SOCIALS: SocialObjects = [
  {
    name: 'Github',
    href: 'https://github.com/amandeepmittal',
    linkTitle: ` ${SITE.title} on Github`,
    active: true
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aman-mittal-05a239117/',
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true
  },
  {
    name: 'Mail',
    href: 'mailto:amanmittal.work@gmail.com',
    linkTitle: `Send an email to ${SITE.title}`,
    active: true
  },
  {
    name: 'X',
    href: 'https://x.com/amanhimself',
    linkTitle: `${SITE.title} on X`,
    active: true
  },
  {
    name: 'Bluesky',
    href: 'https://bsky.app/profile/aman.bsky.social',
    linkTitle: `${SITE.title} on Bluesky`,
    active: true
  }
  // {
  //   name: "Twitch",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Twitch`,
  //   active: false,
  // },
  // {
  //   name: "YouTube",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on YouTube`,
  //   active: false,
  // },
  // {
  //   name: "WhatsApp",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on WhatsApp`,
  //   active: false,
  // },
  // {
  //   name: "Snapchat",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Snapchat`,
  //   active: false,
  // },
  // {
  //   name: "Pinterest",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Pinterest`,
  //   active: false,
  // },
  // {
  //   name: "TikTok",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on TikTok`,
  //   active: false,
  // },
  // {
  //   name: "CodePen",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on CodePen`,
  //   active: false,
  // },
  // {
  //   name: "Discord",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Discord`,
  //   active: false,
  // },
  // {
  //   name: "GitLab",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on GitLab`,
  //   active: false,
  // },
  // {
  //   name: "Reddit",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Reddit`,
  //   active: false,
  // },
  // {
  //   name: "Skype",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Skype`,
  //   active: false,
  // },
  // {
  //   name: "Steam",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Steam`,
  //   active: false,
  // },
  // {
  //   name: "Telegram",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Telegram`,
  //   active: false,
  // },
  // {
  //   name: "Mastodon",
  //   href: "https://github.com/satnaing/astro-paper",
  //   linkTitle: `${SITE.title} on Mastodon`,
  //   active: false,
  // },
];
