import React from 'react';
import { ThemeProvider } from 'styled-components';

import '../../styles/global.scss';
import { GlobalStyles, theme } from '../../styles';
import * as styles from './layout.module.scss';
import Header from '../header';
import Footer from '../footer';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className={styles.layoutContainer}>
        <Header />
        <main className={styles.layoutContent}>{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
