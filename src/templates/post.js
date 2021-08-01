import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import { Layout, SEO, LinkButton } from '../components';
import { config, slugify } from '../helpers';
import { link } from '../styles/partials';
// import banner from '../images/dev-apis-banner.png';

const PostWrapper = styled.article`
  overflow: auto;
`;

const PostTitleWrapper = styled.div`
  h1 {
    margin: 0rem;
    font-size: 2.5rem;
    line-height: 1.1;
    @media (max-width: 750px) {
      font-size: 1.75rem;
      line-height: 1.3;
    }
  }
  a {
    color: ${({ theme }) => theme.colors.black};
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const PostMetaWrapper = styled.div`
  margin-top: 0.5rem;
  p {
    margin: 0rem;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const PostBodyWrapper = styled.section`
  margin: 2.25rem 0rem;
  font-size: 1.15rem;
  ${link}
  .twitter-tweet {
    margin: 0 auto;
  }
`;

const PostFooterWrapper = styled.section`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  margin-top: 0.75rem;
`;

const PostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  const { slug, title, date, tags } = post.frontmatter;

  // const sponsoredLink = 'https://nocodeapi.com/devapis';

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} by ${config.siteTitle}`} />
      <SEO postPath={`blog/${post.fields.slug}`} postNode={post} postSEO />
      <PostWrapper>
        {/* Post Header */}
        <section>
          {/* Post Title */}
          <PostTitleWrapper>
            <h1>{title}</h1>
          </PostTitleWrapper>
          {/* Post Meta */}
          <PostMetaWrapper>
            {/* <blockquote style={{ marginTop: '15px' }}>
              <span role="img" aria-label="left hand pointer emoji">
                🕒
              </span>{' '}
              Published on {date}{' '}
              <span role="img" aria-label="left hand pointer emoji">
                ⚡️
              </span>{' '}
              {post.timeToRead} minutes read
            </blockquote> */}
            <small>
              {/* <span role="img" aria-label="left hand pointer emoji">
                🕒
              </span>{' '} */}
              {date}{' '}
              <span role="img" aria-label="left hand pointer emoji">
                ☕️
              </span>{' '}
              {post.timeToRead} minutes read{' '}
              <span role="img" aria-label="tag emoji">
                🔖{' '}
              </span>
              {tags.map(tag => (
                <Link key={tag} to={`/tags/${slugify(tag)}`}>
                  #{tag}{' '}
                </Link>
              ))}
            </small>
          </PostMetaWrapper>
        </section>
        {/* Post Body */}
        <PostBodyWrapper
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
        <PostFooterWrapper>
          {previous && (
            <LinkButton to={previous.fields.slug} rel="prev">
              <span role="img" aria-label="left hand pointer emoji">
                👈{' '}
              </span>
              Previous post - {previous.frontmatter.title}
            </LinkButton>
          )}
          {/* <LinkButton to={config.kofi} rel="prev">
            Buy me coffee{' '}
            <span role="img" aria-label="coffee emoji">
              ☕️{' '}
            </span>
          </LinkButton> */}
          <div style={{ padding: 20 }} />
          {next && (
            <LinkButton to={next.fields.slug} rel="next">
              Next post - {next.frontmatter.title}{' '}
              <span role="img" aria-label="right hand pointer emoji">
                👉
              </span>
            </LinkButton>
          )}
        </PostFooterWrapper>
        <PostFooterWrapper>
          <LinkButton
            to={`http://twitter.com/share?text=${encodeURIComponent(
              title
            )}&url=https://amanhimself.dev/${slug}/&via=amanhimself`}
            rel="twitter"
          >
            Share on Twitter{' '}
            <span role="img" aria-label="bubble emoji">
              💬{' '}
            </span>
          </LinkButton>
          <LinkButton to={config.newsletter} rel="prev">
            {/* Join {config.subscribersCount} developers getting updates{' '} */}
            Get the newsletter{' '}
            <span role="img" aria-label="love letter emoji">
              💌{' '}
            </span>
          </LinkButton>
        </PostFooterWrapper>
        <div
          style={{
            marginTop: 28,
            marginBottom: 28
          }}
        >
          <hr />
        </div>
        {/* Use below PostFooterWrapper + LinkButton to display Sponsored Links */}
        {/* <PostFooterWrapper>
          <LinkButton to={sponsoredLink} rel="prev">
            <strong>Sponsored Link:</strong> DEV APIs is a complete APIs suite
            for your software development, and business to power-up. Click here{' '}
            <span role="img" aria-label="down finger point emoji">
              👇{' '}
            </span>
            <img src={banner} alt="sponsored link banner" />
          </LinkButton>
        </PostFooterWrapper> */}
      </PostWrapper>
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
      }
    }
  }
`;

export default PostTemplate;
