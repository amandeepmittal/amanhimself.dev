const config = {
  siteTitle: 'Aman Mittal - Developer',
  siteTitleShort: 'Aman Mittal',
  siteTitleAlt: 'Aman Mittal',
  siteLogo: '/images/amanhimself-logo.png',
  siteUrl: 'https://amanhimself.dev',
  repo: 'https://github.com/amandeepmittal/amanhimself.dev',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'Aman Mittal - Fullstack JavaScript Developer, React Native enthusiast and Technical writer.',
  siteRss: 'rss.xml',
  googleAnalyticsID: 'UA-143759180-1',
  postDefaultCategoryID: 'Tech',
  newsletter: 'https://tinyletter.com/amanhimself',
  userName: 'Aman',
  userEmail: 'amanmittal.work@gmail.com',
  userTwitter: 'amanhimself',
  menuLinks: [
    {
      name: 'About me',
      link: '/'
    },
    {
      name: 'Blog',
      link: '/blog'
    },
    {
      name: 'Testimonials',
      link: '/testimonials'
    }
  ],
  themeColor: '#503D81', // Used for setting manifest and progress theme colors.
  backgroundColor: '#f8f8f2'
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = '';
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/')
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/')
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
