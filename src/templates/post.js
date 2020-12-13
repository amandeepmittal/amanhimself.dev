import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import Suggested from '../components/Suggested';
import SEO from '../components/SEO';
import config from '../utils/config';
import Container from '../components/Container';
import Heading from '../components/Heading';
import TWBlogFooterBanner from '../components/TWBlogFooterBanner';
import ReadingProgress from '../components/ReadingProgress';
import TWButton from '../components/TWButton';
import CustomTags from '../components/CustomTags';

export default function PostTemplate({ data, pageContext }) {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
  const { tags, thumbnail, slug, title, date } = post.frontmatter;

  console.log({ slug });

  const shareOnTwitter = (slug, title) =>
    `http://twitter.com/share?text=${encodeURIComponent(
      title
    )}&url=https://amanhimself.dev/${slug}/&via=amanhimself`;

  const handleSocialShare = React.useCallback(
    (url, name, windowSize) => e => {
      e.preventDefault();
      window.open(url, name, windowSize);
    },
    []
  );

  return (
    <Layout>
      <Helmet title={`${post.frontmatter.title} by ${config.siteTitle}`} />
      <SEO postPath={`blog/${post.fields.slug}`} postNode={post} postSEO />
      <ReadingProgress />
      <Container as='main' className='md:px-4 space-y-14'>
        <article className='relative flex flex-col md:px-4 xl:grid xl:grid-cols-4 xl:col-gap-6'>
          <div className='pb-4 md:mr-8 xl:pb-0 xl:mb-8 xl:col-span-3'>
            <Heading noMargin>{title}</Heading>
          </div>
          <div className='order-1 space-y-8 md:mr-8 xl:order-none xl:col-span-3'>
            {/* <img src={frontMatter.image} /> */}
            <div
              className='flex flex-col markdown'
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <TWBlogFooterBanner />
          </div>
          <aside className='pb-10'>
            <div className='sticky top-0 flex flex-col items-start pt-4 border-t border-gray-200 xl:pl-4 sm:flex-row xl:border-l xl:border-t-0 xl:space-y-8 xl:block'>
              <Img fixed={thumbnail.childImageSharp.fixed} objectFit='cover' />
              <div className='flex flex-wrap xl:block xl:space-y-8'>
                <dl className='p-2 mt-4 mr-8 xl:mt-0 xl:mr-0'>
                  <dt className='font-semibold font-source-sans-pro'>
                    Published on
                  </dt>
                  <dd className='text-base font-medium leading-6 text-time'>
                    {date}
                  </dd>
                </dl>
                {/* <dl className="mt-4 md:mr-8 xl:mt-0 xl:mr-0">
                  <dt className="font-semibold font-source-sans-pro">
                    Word Count
                  </dt>
                  <dd className="text-base font-medium leading-6 text-time">
                    {frontMatter.wordCount} words
                  </dd>
                </dl> */}
                <dl className='p-2 w-full mt-4 md:mr-8 md:w-auto xl:mt-0 xl:mr-0'>
                  <dt className='font-semibold font-source-sans-pro'>Tags</dt>
                  <dd className='text-base font-medium leading-6 text-time'>
                    <CustomTags tags={tags} />
                    {/* {tags && (
                      <div className='tags'>
                        {tags.map(tag => (
                          <Link
                            key={tag}
                            to={`/tags/${slugify(tag)}`}
                            className={`tag-${tag}`}
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )} */}
                  </dd>
                </dl>
                <dl className='w-full mt-4 lg:mr-8 sm:mt-2 xl:space-y-2 xl:mt-0 xl:mr-0'>
                  <dd className='mt-2 text-base font-medium leading-6 xl:mt-0 text-time'>
                    <ul className='space-y-2 sm:items-start sm:space-x-2 sm:space-y-0 xl:space-y-2 sm:flex xl:space-x-0 xl:block'>
                      <li className='w-full'>
                        <TWButton
                          onClick={handleSocialShare(
                            shareOnTwitter(slug, title)
                          )}
                          variant='twitter'
                        >
                          Share on Twitter
                        </TWButton>
                      </li>
                      <li className='w-full'>
                        <TWButton
                          onClick={handleSocialShare(
                            `https://ko-fi.com/amanhimself`
                          )}
                          variant='coffee'
                        >
                          Buy me coffee
                        </TWButton>
                      </li>
                      <li className='w-full'>
                        <TWButton
                          onClick={handleSocialShare(
                            `https://amanhimself.substack.com/`
                          )}
                          variant='primary'
                        >
                          Join Newsletter
                        </TWButton>
                      </li>
                      <li className='w-full'>
                        <div>
                          <Suggested previous={previous} next={next} />
                        </div>
                      </li>
                    </ul>
                  </dd>
                </dl>
              </div>
            </div>
          </aside>
        </article>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
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
`;
