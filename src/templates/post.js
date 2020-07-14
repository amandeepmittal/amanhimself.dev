import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import BlogPostFooter from '../components/BlogPostFooter.js';
import PostTags from '../components/PostTags';
import SEO from '../components/seo';
import config from '../data/site-config';
import { formatDate } from '../utils';
import { Text } from '../styles/GlobalStyles';

export default function PostTemplate(props) {
  const { slug } = props.pageContext;
  const postNode = props.data.markdownRemark;
  const post = postNode.frontmatter;
  let thumbnail;

  if (!post.id) {
    post.id = slug;
  }

  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  if (post.thumbnail) {
    thumbnail = post.thumbnail.childImageSharp.fixed;
  }

  const date = formatDate(post.date);
  //  const githubLink = editOnGithub(post);
  const twitterShare = `http://twitter.com/share?text=${encodeURIComponent(
    post.title
  )}&url=${config.siteUrl}/${post.slug}/&via=amanhimself`;

  return (
    <Layout>
      <Helmet>
        <title>{`${post.title} – ${config.siteTitle}`}</title>
      </Helmet>
      <SEO />
      <article className='single container'>
        <header className={`single-header ${!thumbnail ? 'no-thumbnail' : ''}`}>
          <div className='flex'>
            <h1 style={{ marginTop: 20 }}>{post.title}</h1>
            <div className='post-meta' style={{ marginTop: 10 }}>
              <time className='date'>Published on {date}</time>
            </div>
            {/* <PostTags tags={post.tags} /> */}
          </div>
        </header>

        <div
          className='post'
          dangerouslySetInnerHTML={{ __html: postNode.html }}
        />
      </article>
      <div className='single container'>
        {/* <hr /> */}
        {/*   <div>
          <img
            src='https://i.imgur.com/r2C4QXc.jpg'
            alt='banner'
            style={{ width: 600, height: 300 }}
          />
          <br />
          Manning publications are offering a 40% off on their JavaScript and
          GraphQL collection of ebooks, and video courses exclusively for the
          readers of this blog{' '}
          <a
            href='http://mng.bz/lGzy'
            target='_blank'
            rel='noopener noreferrer'
          >
            <strong>here</strong>
          </a>
          .
        </div> */}

        <hr />
        <div style={{ textAlign: 'center' }}>
          <Text>
            <span role='image'>🙏</span>&nbsp; Share with your friends on{' '}
            <a
              id='twitter-share'
              href={twitterShare}
              target='_blank'
              rel='noopener noreferrer'
            >
              Twitter
            </a>{' '}
          </Text>
        </div>
        <div>
          <div
            style={{
              marginRight: 5,
              textAlign: 'center'
            }}
          >
            <p style={{ fontSize: 16, color: '#718096', textAlign: 'center' }}>
              <span role='right-down'>👇</span>&nbsp; Find more posts on the
              following topics
            </p>
            <PostTags tags={post.tags} />
          </div>
        </div>
        <BlogPostFooter />
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        thumbnail {
          childImageSharp {
            fixed(width: 100, height: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        slug
        date
        categories
        tags
        template
      }
      fields {
        slug
        date
      }
    }
  }
`;
