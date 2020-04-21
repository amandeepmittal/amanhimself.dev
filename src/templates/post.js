import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/Layout';
import BlogPostFooter from '../components/BlogPostFooter.js';
import PostTags from '../components/PostTags';
import SEO from '../components/SEO';
import config from '../data/site-config';
import { formatDate } from '../utils';

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
          {/* TODO: REMOVE thumbnail from blog post */}
          {/* {thumbnail && <Img fixed={post.thumbnail.childImageSharp.fixed} />} */}
          <div className='flex'>
            <h1>{post.title}</h1>
            <div className='post-meta'>
              {/* <Link to='/me'>
                <img src={avatar} className='avatar-small' alt='Aman' />
              </Link> */}
              <time className='date'>Published on {date}</time> -
              <a
                className='twitter-link'
                href={twitterShare}
                target='_blank'
                rel='noopener noreferrer'
              >
                Share on Twitter
              </a>
              {/* <a
                className='github-link'
                href={githubLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                Edit ✏️
              </a> */}
            </div>
            <PostTags tags={post.tags} />
          </div>
        </header>

        <div
          className='post'
          dangerouslySetInnerHTML={{ __html: postNode.html }}
        />
      </article>
      <BlogPostFooter />
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
