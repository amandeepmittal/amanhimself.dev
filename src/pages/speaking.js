import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Layout, SEO } from '../components';
import { config } from '../helpers';

const Speaking = ({ data }) => {
  const { html } = data.contact;

  return (
    <Layout>
      <Helmet title={`Speaking | ${config.username}`} />
      <SEO />
      <div className="infoContainer">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    contact: markdownRemark(
      fileAbsolutePath: { regex: "/content/pages/speaking/" }
    ) {
      html
    }
  }
`;

export default Speaking;
