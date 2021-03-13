import * as React from 'react';

import { Layout, SEO } from '../components';

const NotFoundPage = () => (
  <Layout>
    <SEO />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
