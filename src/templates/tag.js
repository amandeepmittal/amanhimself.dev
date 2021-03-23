import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Layout, SEO, PostInfo } from '../components';
import { config } from '../helpers';

const TagMetaWrapper = styled.div`
  margin: 0rem 0rem 3.75rem 0rem;
  text-align: center;
  h1 {
    margin: 0rem;
  }
`;

const TagTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const message = totalCount === 1 ? ' post found.' : ' posts found.';
  const posts = data.allMarkdownRemark.nodes;

  return (
    <Layout>
      <Helmet title={`Posts tagged: ${tag} | ${config.siteTitle}`} />
      <SEO />
      <TagMetaWrapper>
        <h1>Posts tagged under: "{tag}"</h1>
        <h3>
          {totalCount} - {message}
        </h3>
        {posts.map(post => {
          return <PostInfo post={post} />;
        })}
      </TagMetaWrapper>
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
