import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/Layout';
import Posts from '../components/Posts';
import SEO from '../components/SEO';
import Container from '../components/Container';
import Heading from '../components/Heading';

import { getSimplifiedPosts } from '../utils/helpers';
import config from '../utils/config';

export default function TagTemplate({ data, pageContext }) {
  const { tag } = pageContext;
  const { totalCount } = data.allMarkdownRemark;
  const posts = data.allMarkdownRemark.edges;
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts]);
  const message = totalCount === 1 ? ' post found.' : ' posts found.';

  return (
    <Layout>
      <Helmet title={`Posts tagged: ${tag} | ${config.siteTitle}`} />
      <SEO />
      <Container as='main' noMargin className='md:px-4 space-y-14'>
        <div className='flex flex-col max-w-screen-lg mx-8 items-center justify-center'>
          <Heading size='h1'>Posts tagged: {tag}</Heading>
          <p className='text-lg text-gray-500 my-4'>
            {totalCount}
            {message}
          </p>
          <section className='container'>
            <Posts data={simplifiedPosts} />
          </section>
        </div>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
