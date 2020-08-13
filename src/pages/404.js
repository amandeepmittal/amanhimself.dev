import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="Not found" />
    <div className="error-page">
      <h2>
        <span role="img" aria-label="sweaty-emoji">
          😅
        </span>
      </h2>
      <p>
        The page you are looking for does not exist. Please go back to the{' '}
        <Link to="/blog">blog</Link>.
      </p>
    </div>
  </Layout>
);

export default NotFoundPage;
