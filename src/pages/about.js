import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import { Layout, Now, SEO } from '../components';

const About = ({ data }) => {
  const { node } = data.nows.edges[0];
  console.log({ node });

  return (
    <Layout>
      <SEO />
      <Now data={node} />
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

Now.propTypes = {
  data: PropTypes.object.isRequired
};

export default About;
