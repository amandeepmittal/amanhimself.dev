import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Container from '../components/Container';
import { getSimplifiedPosts } from '../utils/helpers';
import { BlogConfig } from '../../blog-config';
import Heading from '../components/Heading';
import Search from '../components/Search';

export default function BlogIndex({ data, ...props }) {
  const posts = data.allMarkdownRemark.edges;
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts]);

  return (
    <Layout>
      <Helmet title={`Blog | ${BlogConfig.username}`} />
      <SEO customDescription='A collection of articles, tutorials, and writings.' />
      <Container as='main' noMargin className='md:px-4 space-y-14'>
        <div className='flex flex-col max-w-screen-lg mx-8 items-center justify-center'>
          <Heading size='h1'>Blog Posts - {posts.length}</Heading>
          <p className='text-lg text-gray-500 my-4'>
            A collection of articles, tutorials, and writings.
          </p>
          {!posts.length && 'No posts found.'}
          <section>
            <div className='container'>
              <Search posts={simplifiedPosts} {...props} />
            </div>
          </section>
        </div>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 48, height: 48) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
