import React from 'react';
import Helmet from 'react-helmet';
import Navigation from './Navigation';
import Footer from './Footer';
import config from '../data/site-config';
import favicon from '../images/favicons/favicon.ico';
import '../styles/main.scss';

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <meta name='description' content={config.siteDescription} />
        <link rel='shortcut icon' type='image/png' href={favicon} />
      </Helmet>
      <Navigation menuLinks={config.menuLinks} />
      <main id='main-content'>{children}</main>
      {/* TODO: Add footer here */}
      <Footer />
    </>
  );
}
