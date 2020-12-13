import React from 'react';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { BlogConfig } from '../../blog-config';
import Container from '../components/Container';

const NotFoundPage = () => (
  <Layout>
    <Helmet
      title='404: Not found'
      links={[
        {
          rel: 'canonical',
          href: BlogConfig.siteUrl
        }
      ]}
    />
    <SEO />
    <Container as='main' noMargin className='md:px-4 space-y-14'>
      <div className='flex flex-col max-w-screen-lg mx-8 items-center justify-center'>
        <p className='text-lg text-gray-600 my-4'>
          &#128517; I've yet to write the post you're looking for.
        </p>
      </div>
    </Container>
  </Layout>
);

export default NotFoundPage;
