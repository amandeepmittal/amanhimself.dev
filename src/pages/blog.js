import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import PostsList from '../components/posts/posts-list';

const Blog = ({ data }) => {
  const {
    allMdx: { nodes: posts }
  } = data;

  return (
    <Layout>
      <SEO title="Blog" />
      <div className="about-page">
        <div>
          <h2 style={{ marginBottom: '2rem' }}>
            All Posts - <span>{data.allMdx.totalCount}</span>
          </h2>
        </div>
        <PostsList posts={posts} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          slug
          date(formatString: "MMMM Do, YYYY")
          category
        }
        timeToRead
      }
      totalCount
    }
  }
`;

export default Blog;
