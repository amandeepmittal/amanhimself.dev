import React from 'react';

import '../../styles/global.scss';
import * as styles from './layout.module.scss';
import Header from '../header';
import Footer from '../footer';

const Layout = ({ children }) => {
  return (
    <>
      <div className={styles.layoutContainer}>
        <Header />
        <main className={styles.layoutContent}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
