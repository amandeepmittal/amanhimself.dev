import React, { useEffect, useRef } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { VStack, Heading, HStack, Text, Divider, Box } from '@chakra-ui/react';
import { promises as fs } from 'fs';
import path from 'path';

import readingTime from 'reading-time';

import { getAllBlogPosts } from './index';
import { DocumentHead, MDXComponents } from '../../src/components';
import imageMetadata from '../../src/utils/imageMetaData';
import {
  AuthorCard,
  SubscribeCard,
  ShareArticle,
  ArticleNavigator,
  TimeToRead,
  PublishedDate,
  Tag,
  SponsorCard
} from '../../src/components/BlogPostPage';

export const readBlogPost = async slug => {
  const postPath = path.join(process.cwd(), './content/posts', `${slug}.md`);

  return await fs.readFile(postPath, 'utf8');
};

export const getStaticPaths = async () => {
  const posts = await getAllBlogPosts();

  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: false
  };
};

export const getStaticProps = async ctx => {
  const slug = ctx.params.slug;

  const postContent = await readBlogPost(slug);
  const { text: timeToRead } = readingTime(postContent);
  const allPosts = await getAllBlogPosts();

  const {
    content,
    data: { title, date, tag, canonicalUrl }
  } = matter(postContent);

  return {
    props: {
      source: await serialize(content, {
        mdxOptions: {
          rehypePlugins: [imageMetadata]
        }
      }),
      title,
      date,
      slug,
      timeToRead,
      allPosts,
      tag,
      canonicalUrl
    }
  };
};

const BlogPostPage = ({
  title,
  date,
  source,
  timeToRead,
  tag,
  allPosts,
  canonicalUrl
}) => {
  const { query } = useRouter();
  const slug = query.slug;

  const postIndex = allPosts.findIndex(post => post.slug === slug);
  const previousArticle = allPosts[postIndex - 1] || null;
  const nextArticle = allPosts[postIndex + 1] || null;

  // const reference = useRef();

  // useEffect(() => {
  //   reference.current.innerHTML = '';
  //   const s = document.createElement('script');
  //   s.id = '_carbonads_js';
  //   s.src = `"//cdn.carbonads.com/carbon.js?serve=CEAIE2JY&placement=amanhimselfdev`;
  //   reference.current.appendChild(s);
  // }, []);

  return (
    <>
      <DocumentHead
        pageTitle={`${title} by Aman Mittal`}
        postPath={`/${slug}/`}
        canonicalUrl={canonicalUrl}
      />
      <VStack spacing={8} alignItems="stetch" w="full" as="section" pt={28}>
        <VStack spacing={3} alignItems="flex-start">
          {/* Post Title */}
          <Heading size="lg">{title}</Heading>
          {/* Post Meta */}
          <HStack
            divider={
              <Text color="gray.500" mx={2}>
                •
              </Text>
            }
          >
            {/* Published Date */}
            <PublishedDate date={date} />
            {/* Time to read */}
            <TimeToRead timeToRead={timeToRead} />
            {/* Tag */}
            <Tag tag={tag} />
          </HStack>
        </VStack>
        {/* <Box
          ref={reference}
          sx={{
            '#carbonads *': {
              margin: 'initial',
              padding: 'initial',
              lineHeight: 'initial'
            },
            '#carbonads': {
              '--carbon-font-size': '16px',
              '--carbon-padding-size': '12px'
            },
            '#carbonads': {
              zIndex: 100,
              display: 'inline-block',
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 'var(--carbon-font-size)'
            },
            '#carbonads > span': {
              minWidth: '18.75em',
              maxWidth: 'calc(130px + 25ch)',
              minHeight: '100px',
              backgroundColor: 'hsl(0, 0%, 10%)',
              boxShadow:
                '0 0 1px hsl(0deg 0% 0% / 0.085), 0 0 2px hsl(0deg 0% 0% / 0.085),0 0 4px hsl(0deg 0% 0% / 0.085), 0 0 8px hsl(0deg 0% 0% / 0.085)'
            },
            '#carbonads a': {
              textDecoration: 'none',
              color: '#ddd'
            },
            '#carbonads a:hover': {
              color: '#ddd'
            },
            '#carbonads span': {
              display: 'block',
              position: 'relative'
            },
            '#carbonads .carbon-wrap': {
              display: 'flex'
            },
            '#carbonads .carbon-img': {
              height: '100px',
              width: '130px'
            },
            '#carbonads .carbon-img img': {
              display: 'block'
            },
            '#carbonads .carbon-text': {
              padding: '0.625em 1em',
              fontSize: '0.8125em',
              marginBottom: '1em',
              lineHeight: 1.4,
              textAlign: 'left'
            },
            '#carbonads .carbon-poweredby': {
              display: 'block',
              padding: '6px 8px',
              color: '#aaa',
              background: '#1e2021',
              textAlign: 'center',
              textRransform: 'uppercase',
              letterSpacing: '0.1ch',
              fontWeight: 600,
              fontSize: '0.5em',
              lineHeight: 1,
              borderRopLeftRadius: '3px',
              position: 'absolute',
              bottom: 0,
              right: 0
            }
          }}
        /> */}
        <MDXRemote {...source} components={MDXComponents} />
        {/* Sponsor - only uncomment when there is an actual sponsor */}
        {/* <SponsorCard /> */}
        {/* Share article on Twitter */}
        <HStack justifyContent="center">
          <ShareArticle title={title} slug={slug} />
        </HStack>
        <Divider />
        {/* Article Navigator */}
        <ArticleNavigator
          previousArticle={previousArticle}
          nextArticle={nextArticle}
        />
        {/* Subscribe Card */}
        {/* <SubscribeCard /> */}
        {/* Author Card */}
        <AuthorCard />
      </VStack>
    </>
  );
};

export default BlogPostPage;
