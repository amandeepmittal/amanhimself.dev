const title = 'Aman Mittal – Developer, & Technical Writer.';
const description = 'Software developer and React Native enthusiast.';

const SEO = {
  title,
  description,
  canonical: 'https://amanhimself.dev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amanhimself.dev',
    title,
    description,
    images: [
      {
        url: 'https://amanhimself.dev/static/og.jpg',
        alt: title,
        width: 1280,
        height: 720
      }
    ]
  },
  twitter: {
    handle: '@amanhimself',
    site: '@amanhimself',
    cardType: 'summary_large_image'
  }
};

export default SEO;
