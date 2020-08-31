import React from 'react';
import {
  ThemeProvider,
  CSSReset,
  useColorMode,
  ColorModeProvider
} from '@chakra-ui/core';
import { DefaultSeo } from 'next-seo';
import { MDXProvider } from '@mdx-js/react';
import { Global, css } from '@emotion/core';

import SEO from '../next-seo.config';
import theme from '../shared/theme';
import MDXComponents from '../components/MDXComponents';
import { prismDarkTheme } from '../shared/prism';

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          ${colorMode === 'light' ? prismDarkTheme : prismDarkTheme};
        `}
      />
      {children}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={MDXComponents}>
        <ColorModeProvider value="light">
          <GlobalStyle>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </GlobalStyle>
        </ColorModeProvider>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default App;
