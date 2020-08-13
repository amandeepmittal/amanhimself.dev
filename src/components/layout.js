import React, { useState } from 'react';

import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
