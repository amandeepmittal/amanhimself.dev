import Head from 'next/head';

const siteURL = 'https://amanhimself.dev';
const author = 'Aman Mittal';
const shortname = 'amanhimself';
const description =
  "I'm Aman Mittal (@amanhimself). Software Developer and Tech Writer. Currently working as a Senior Content Developer. Welcome to my digital garden!";
const socialBanner = '/card.png';

const DocumentHead = ({
  pageTitle,

  postPath,
  canonicalUrl
}) => {
  let postUrl = `${siteURL}`;

  if (postPath) {
    postUrl = `${siteURL}${postPath}/`;
  }

  return (
    <Head>
      <title>{pageTitle}</title>
      <link rel="icon" href="/favicon.jpg" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta content="#6B46C1" name="theme-color" />
      <meta content="#6B46C1" name="msapplication-TileColor" />
      <link rel="canonical" href={canonicalUrl} />

      <link rel="apple-touch-icon" href="/favivon.jpg" />
      <meta content={description} name="description" />
      <meta name="author" content={author} />
      <meta name="author" content={shortname} />
      <meta name="publisher" content={author} />
      <meta
        name="keywords"
        content="Aman Mittal, amamhimself, blog, Node.js, React, React Native Expo"
      />

      <meta name="robots" content="index,follow" />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="bingbot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      <meta property="og:title" content={pageTitle} />
      <meta name="og:description" content={description} />
      <meta name="og:image:alt" content={socialBanner} />
      <meta property="og:url" content={postPath ? postUrl : siteURL} />
      <meta property="og:type" content={postPath ? 'article' : 'website'} />
      <meta property="og:site_name" content="Aman Mittal's Blog" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={shortname} />
      <meta name="twitter:title" content="Aman Mittal's Blog" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialBanner} />
    </Head>
  );
};

export default DocumentHead;
