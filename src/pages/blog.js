import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import { Layout, SEO, PostCard } from '../components';
import { config, slugify } from '../helpers';

const AllTagsWrapper = styled.div`
  margin-bottom: 2rem;
  line-height: 2rem;
`;

const BlogPage = ({ data }) => {
  const allPosts = data.posts.nodes;
  const emptyQuery = '';
  const allTags = data.posts.group;

  const [state, stateSet] = useState({
    filteredData: [],
    query: emptyQuery
  });

  const handleInputChange = e => {
    const query = e.target.value;
    const posts = data.posts.nodes || [];

    const filteredData = posts.filter(post => {
      const { title, tags } = post.frontmatter;
      return (
        title.toLowerCase().includes(query.toLowerCase()) ||
        (tags && tags.join('').toLowerCase().includes(query.toLowerCase()))
      );
    });

    stateSet({ query, filteredData });
  };

  const { filteredData, query } = state;
  const hasSearchResults = filteredData && query !== emptyQuery;
  const posts = hasSearchResults ? filteredData : allPosts;

  return (
    <Layout>
      <Helmet title={`Blog | ${config.username}`} />
      <SEO customDescription="A collection of articles, tutorials, and writings." />

      <div className="blogContainer">
        <h1>Blog</h1>
        <p style={{ fontSize: '1.2rem' }}>
          I've been writing online since 2017, mostly on web and mobile
          development. In total, I've written{' '}
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: '#6a5acd'
            }}
          >
            {Object.keys(posts).length}
          </span>{' '}
          articles on internet. This site is a collection of articles I've
          published here or elsewhere.
        </p>
        <input
          className="input"
          type="text"
          aria-label="Search"
          placeholder="Search a post by title, topic or tag..."
          onChange={handleInputChange}
        />

        <div
          style={{
            marginTop: '20px',
            marginBottom: '40px'
          }}
        >
          <span
            style={{
              fontSize: '18px'
            }}
          >
            Tags:{' '}
          </span>

          {allTags.map(tag => {
            return (
              <Link
                key={tag.fieldValue}
                to={`/tags/${slugify(tag.fieldValue)}`}
                className="tagButton"
              >
                {' '}
                {tag.fieldValue} - {tag.totalCount} &nbsp;&nbsp;&nbsp;
              </Link>
            );
          })}
        </div>

        {posts.map(post => {
          return <PostCard post={post} />;
        })}
      </div>
    </Layout>
  );
};

export const blogPageQuery = graphql`
  {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
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
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default BlogPage;
