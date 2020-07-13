import React from 'react';
import { Helmet } from 'react-helmet';

import config from '../data/site-config';
import favicon from '../images/favicons/favicon.ico';

export default function SEO({ lang = 'en', title }) {
  const metaDescription = config.siteDescription;
  const avatar = config.siteAvatar;
  title = config.siteTitle;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
    >
      {/* General tags */}
      <meta name='description' content={metaDescription} />
      <meta name='image' content={avatar} />
      <link rel='shortcut icon' type='image/png' href={favicon} />
      <link
        href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap'
        rel='stylesheet'
      />

      {/* OpenGraph tags */}
      <meta property='og:url' content={config.siteUrl} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={avatar} />

      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content={config.userTwitter} />
      <meta name='twitter:title' content={config.username} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:image' content={avatar} />
    </Helmet>
  );
}
