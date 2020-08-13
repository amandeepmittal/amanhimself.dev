import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import PostsList from '../components/posts/posts-list';

const CategoryTemplate = props => {
  const {
    pageContext: { category }
  } = props;
  const {
    data: {
      categories: { nodes: posts }
    }
  } = props;

  return (
    <Layout>
      <div className="about-page">
        <div>
          <h2 style={{ marginBottom: '2rem' }}>
            {category.toUpperCase()} Posts
          </h2>
        </div>
        <PostsList posts={posts} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query GetCategories($category: String) {
    categories: allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
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
      totalCount
    }
  }
`;

export default CategoryTemplate;
