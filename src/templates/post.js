import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';

import { Layout, SEO } from '../components';
import { config, slugify } from '../helpers';

const PostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  const { slug, title, date, tags } = post.frontmatter;

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} by ${config.siteTitle}`} />
      <SEO postPath={`${post.fields.slug}`} postNode={post} postSEO />
      <div className="postLayout">
        <h1>{title}</h1>
        <div className="postMetaWrapper">
          <small
            style={{
              fontSize: '16px'
            }}
          >
            {date}{' '}
            <span role="img" aria-label="left hand pointer emoji">
              ☕️
            </span>{' '}
            {post.timeToRead} min read{' '}
            <span role="img" aria-label="tag emoji">
              🔖{' '}
            </span>
            {tags.map(tag => (
              <Link
                key={tag}
                to={`/tags/${slugify(tag)}`}
                style={{
                  background: '#6a5acd',
                  color: '#fff',
                  marginRight: '10px',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                  borderRadius: '0.3rem'
                }}
              >
                #{tag}{' '}
              </Link>
            ))}{' '}
          </small>
        </div>
        {/* Post Body */}
        <section
          className="postBodyWrapper"
          dangerouslySetInnerHTML={{
            __html: post.html
          }}
        />
        <div
          style={{
            marginTop: 28,
            marginBottom: 28
          }}
        >
          <hr />
        </div>
        {/* Post Footer */}
        <section className="postFooterWrapper">
          <div className="newsletter">
            <p
              style={{
                color: 'rgb(106, 90, 205, 0.9)',
                fontWeight: '700',
                fontSize: '24px'
              }}
            >
              Enjoyed this post? Subscribe to the newsletter!
            </p>
            <p>
              A newsletter in the realm between web & mobile development.{' '}
              <span style={{ fontWeight: '700' }}>Join 1200+ devs </span>and get
              updates when I share something new. No spam, unsubcribe at any
              time! And, it's free.
            </p>
            <p className="heroButtons">
              <a
                href="https://amanhimself.substack.com/subscribe"
                className="button"
                rel="noopener noreferrer"
                aria-label="Substack Newsletter page redirect"
              >
                Subscribe on Substack
              </a>
            </p>
          </div>
        </section>
        <section className="postFooterWrapper">
          {previous && (
            <Link
              style={{ textDecoration: 'none' }}
              to={previous.fields.slug}
              rel="prev"
              className="linkButton"
            >
              <span role="img" aria-label="left hand pointer emoji">
                👈{' '}
              </span>
              Previous - {previous.frontmatter.title}
            </Link>
          )}
          <div style={{ padding: 20 }} />
          {next && (
            <Link to={next.fields.slug} rel="next" className="linkButton">
              Next - {next.frontmatter.title}{' '}
              <span role="img" aria-label="right hand pointer emoji">
                👉
              </span>
            </Link>
          )}
        </section>
      </div>
    </Layout>
  );
};

export const postTemplateQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      timeToRead
      frontmatter {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        tags
        canonicalUrl
      }
    }
  }
`;

export default PostTemplate;
