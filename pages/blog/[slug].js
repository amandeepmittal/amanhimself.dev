import { MDXRemote } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import { VStack, Heading, HStack, Text, Divider } from '@chakra-ui/react';
import { promises as fs } from 'fs';
import path from 'path';

import readingTime from 'reading-time';

import { getAllBlogPosts } from './index';
import {
  DocumentHead,
  MDXComponents,
  SubscribeBox
} from '../../src/components';
import imageMetadata from '../../src/utils/imageMetaData';
import Tag from '../../src/components/BlogPostPage/Tag';
import PublishedDate from '../../src/components/BlogPostPage/PublishedDate';
import TimeToRead from '../../src/components/BlogPostPage/TimeToRead';
import ArticleNavigator from '../../src/components/BlogPostPage/ArticleNavigator';
import ShareArticle from '../../src/components/BlogPostPage/ShareArticle';

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
        <MDXRemote {...source} components={MDXComponents} />
        <ShareArticle title={title} slug={slug} />
        <Divider />
        {/* Article Navigator */}
        <ArticleNavigator
          previousArticle={previousArticle}
          nextArticle={nextArticle}
        />
      </VStack>
      <SubscribeBox />
    </>
  );
};

export default BlogPostPage;
