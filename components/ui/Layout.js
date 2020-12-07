import React from 'react';

import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div
      className="grid min-h-screen antialiased font-open-sans"
      style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
