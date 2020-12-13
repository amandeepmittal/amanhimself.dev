import React from 'react';
import Helmet from 'react-helmet';

import avatar from '../../content/assets/avatar.jpg';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel='shortcut icon' type='image/png' href={avatar} />
      </Helmet>
      <div
        className='grid min-h-screen antialiased font-open-sans'
        style={{ gridTemplateRows: 'auto 1fr auto' }}
      >
        {/* Navigation Header */}
        <Header />
        {children}
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
