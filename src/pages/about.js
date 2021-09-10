import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import { Layout, SEO } from '../components';
import { config } from '../helpers';

const About = ({ data }) => {
  const { node } = data.nows.edges[0];
  const { html } = node;

  return (
    <Layout>
      <Helmet title={`About | ${config.username}`} />
      <SEO />
      <div className="infoContainer">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    nows: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/now/" } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 1
    ) {
      edges {
        node {
          html
          frontmatter {
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  }
`;

export default About;
