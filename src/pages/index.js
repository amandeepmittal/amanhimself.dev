import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/hero';
import Posts from '../components/posts';

const IndexPage = ({ data }) => {
  const {
    allMdx: { nodes: posts }
  } = data;

  return (
    <Layout>
      <SEO title="Home" />
      <div className="page-center">
        <Hero />
        <Posts posts={posts} title="Latest Posts" />
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allMdx(sort: { fields: frontmatter___date, order: DESC }, limit: 10) {
      nodes {
        excerpt
        id
        frontmatter {
          title
          slug
          date(formatString: "MMMM Do, YYYY")
          category
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        timeToRead
      }
    }
  }
`;

export default IndexPage;
