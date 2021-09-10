import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import { Layout, SEO, PostCard } from '../components';
import { config } from '../helpers';

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const message = totalCount === 1 ? ' post found.' : ' posts found.';
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <Helmet title={`Posts tagged: ${tag} | ${config.siteTitle}`} />
      <SEO />

      <div className="blogContainer">
        <h1>Posts tagged under: "{tag}"</h1>
        <h3 style={{ color: '#6a5acd' }}>
          {totalCount} - {message}
        </h3>
        {posts.map(post => {
          return <PostCard post={post} />;
        })}
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        id
        timeToRead
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 40, height: 40)
            }
          }
        }
      }
    }
  }
`;

export default TagTemplate;
