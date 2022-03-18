import { MDXRemote } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import { serialize } from 'next-mdx-remote/serialize';
import NextLink from 'next/link';
import matter from 'gray-matter';
import { VStack, Heading, HStack, Text, Divider, Link } from '@chakra-ui/react';
import { promises as fs } from 'fs';
import path from 'path';
import dayjs from 'dayjs';
import readingTime from 'reading-time';

import { getAllBlogPosts } from './index';
import {
  DocumentHead,
  MDXComponents,
  SubscribeBox
} from '../../src/components';
import imageMetadata from '../../src/utils/imageMetaData';
import Tag from '../../src/components/BlogPostPage/Tag';

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
          <Heading size="lg">{title}</Heading>
          <HStack
            divider={
              <Text color="gray.500" mx={2}>
                •
              </Text>
            }
          >
            <Text color="gray.500" fontSize="sm">
              {dayjs(date).format('MMM D, YYYY')}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {timeToRead}
            </Text>

            {/* Tag */}
            <Tag tag={tag} />
          </HStack>
        </VStack>
        <MDXRemote {...source} components={MDXComponents} />
        <Divider />

        <HStack justifyContent="space-between">
          {previousArticle !== null ? (
            <NextLink href={previousArticle.slug}>
              <Link>
                <Text as="h2" fontSize="md" fontWeight="600" _hover={{}}>
                  ⬅️ Previous: {previousArticle.title}
                </Text>
              </Link>
            </NextLink>
          ) : null}
          {nextArticle !== null ? (
            <NextLink href={nextArticle.slug}>
              <Link>
                <Text as="h2" fontSize="md" fontWeight="600">
                  Next: {nextArticle.title} ➡️
                </Text>
              </Link>
            </NextLink>
          ) : null}
        </HStack>
      </VStack>
      <SubscribeBox />
    </>
  );
};

export default BlogPostPage;
