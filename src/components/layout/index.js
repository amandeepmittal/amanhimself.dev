import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';

import { GlobalStyles, theme } from '../../styles';
import Header from '../header';
import Footer from '../footer';

const Container = styled.div`
  min-height: 100vh;
  max-width: 640px;
  margin: auto;
  display: grid;
  grid-template-rows: auto 1fr auto;
  row-gap: 2.5rem;
`;

const Content = styled.main`
  box-sizing: border-box;
  width: 100%;
  display: grid;
  max-width: 640px;
  justify-self: center;
  padding: 0rem 1.25rem;
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
