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
];
