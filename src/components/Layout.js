import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import Navigation from './Navigation';
import Footer from './Footer';
import config from '../data/site-config';
import favicon from '../images/favicons/favicon.ico';
import '../styles/main.scss';
import { GlobalStylesWrapper } from '../styles/GlobalStyles';
import SEO from './seo';

const ContentWrapper = styled.main`  
  ${breakpoint('tablet')`
      margin-top: 30px;
      padding: 20px 0 0;
    `}

  ${breakpoint('mobile')`
      margin-top: 20px;
      padding: 10px 0 0;
    `}

    ${breakpoint('desktop')`
      margin-top: 60px;
      padding: 10px 0 0;
    `}

  padding: 30px 0 0;
`;

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Helmet>
        <meta name='description' content={config.siteDescription} />
        <link rel='shortcut icon' type='image/png' href={favicon} />
      </Helmet>
      <GlobalStylesWrapper />
      <SEO />
      <Navigation menuLinks={config.menuLinks} />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </React.Fragment>
  );
}
