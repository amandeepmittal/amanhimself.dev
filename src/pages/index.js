import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import PostListing from '../components/PostListing';
import config from '../data/site-config';
import HeaderIntro from '../components/HeaderIntro';
import About from '../components/About';
import SEO from '../components/SEO';

const IndexPage = props => {
  const { data } = props;
  const latestPostEdges = data.latest.edges;
  const popularPostEdges = data.popular.edges;
  return (
    <Layout>
      <Helmet title={`${config.siteTitle} - Fullstack software developer`} />
      <SEO />
      <div className='container'>
        {/* All Home Page components go here 👇 */}
        <HeaderIntro />
        <div className='container front-page'>
          <section className='section'>
            <h2>
              Latest Posts
              <Link to='/tutorials' className='view-all'>
                View all
              </Link>
              <Link to='/testimonials' className='view-all'>
                Testimonials
              </Link>
            </h2>
            <PostListing simple postEdges={latestPostEdges} />
            {/* <PostListing simple postEdges={popularPostEdges} /> */}
            <section className='section'>
              <h2>
                Most Read
                <Link to='/categories/popular' className='view-all'>
                  View all
                </Link>
              </h2>
              <PostListing simple postEdges={popularPostEdges} />
            </section>
          </section>
          <About />
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 10
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 9
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`;
