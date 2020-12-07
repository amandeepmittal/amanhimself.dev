import React from 'react';

import Header from './Header';
import TWFooter from './TWFooter';

const Layout = ({ children }) => {
  return (
    <div
      className="grid min-h-screen antialiased font-open-sans"
      style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Header />
      {children}
      <TWFooter />
    </div>
  );
};

export default Layout;
