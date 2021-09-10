import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Layout, Now, SEO } from '../components';
import { config } from '../helpers';

const Uses = ({ data }) => {
  const { html } = data.contact;

  return (
    <Layout>
      <Helmet title={`Uses | ${config.username}`} />
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
      fileAbsolutePath: { regex: "/content/pages/uses/" }
    ) {
      html
    }
  }
`;

export default Uses;
