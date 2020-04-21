import React from 'react';
import Helmet from 'react-helmet';
import config from '../data/site-config';
import avatar from '../images/avatar.jpg';

export default function SEO() {
  return (
    <Helmet>
      <meta name='description' content={config.siteDescription} />
      <meta name='image' content={avatar} />

      <meta property='og:url' content={config.siteUrl} />
      <meta property='og:title' content={config.siteTitle} />
      <meta property='og:description' content={config.siteDescription} />
      <meta property='og:image' content={avatar} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content={config.userTwitter} />
      <meta name='twitter:title' content={config.username} />
      <meta name='twitter:description' content={config.siteDescription} />
      <meta name='twitter:image' content={avatar} />
    </Helmet>
  );
}
