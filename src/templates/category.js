import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PostListing from '../components/PostListing';
import config from '../data/site-config';

export default function CategoryTemplate(props) {
  const { category } = props.pageContext;
  const postEdges = props.data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Helmet title={`Posts in category "${category}" – ${config.siteTitle}`} />
      <div className='container'>
        <h1>{category}</h1>
        <PostListing postEdges={postEdges} />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
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
