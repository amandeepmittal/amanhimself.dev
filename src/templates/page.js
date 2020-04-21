import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import config from '../data/site-config';
import SEO from '../components/SEO';

export default function PageTemplate(props) {
  const { slug } = props.pageContext;
  const postNode = props.data.markdownRemark;
  const page = postNode.frontmatter;

  if (!page.id) {
    page.id = slug;
  }

  return (
    <Layout>
      <Helmet>
        <title>{`${page.title} – ${config.siteTitle}`}</title>
      </Helmet>
      <SEO />
      <div className='container'>
        <article>
          <header className='page-header'>
            <h1>{page.title}</h1>
          </header>
          <div
            className='page'
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />
        </article>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        template
      }
      fields {
        slug
        date
      }
    }
  }
`;
