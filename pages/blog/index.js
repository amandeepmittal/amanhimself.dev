import React, { useState } from 'react';
import { Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

import { BlogPostCard, DocumentHead } from '../../src/components';
import TagsCloud from '../../src/components/BlogIndexPage/TagsCloud';

// Fetch all posts
export const getAllBlogPosts = async () => {
  const result = [];
  const dir = path.join(process.cwd(), './content/posts');
  const blogPosts = await fs.readdir(dir);

  await Promise.all(
    blogPosts.map(async post => {
      const postPath = path.join(dir, post);
      const slug = post.replace('.md', '');
      const fileContent = await fs.readFile(postPath, 'utf8');

      const { text: timeToRead } = readingTime(fileContent);

      const {
        data: { title, date, thumbnail, tag }
      } = matter(fileContent);

      result.push({
        title,
        date,
        slug,
        thumbnail,
        timeToRead,
        tag,
        fileContent
      });
    })
  );

  return result.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
};

export const getStaticProps = async () => {
  const posts = await getAllBlogPosts();
  const props = {
    posts
  };

  return {
    props
  };
};

const Blog = ({ posts }) => {
  const [displayPosts, setDisplayPosts] = useState(posts);

  // const onSearch = () => {
  //   console.log(event);
  //   const query = event.currentTarget.value;

  //   const filteredPosts = posts.filter(post =>
  //     post.title.toLowerCase().includes(query)
  //   );

  //   setDisplayPosts(filteredPosts);
  // };

  return (
    <>
      <DocumentHead pageTitle="Aman Mittal - Blog" postPath="/blog" />
      <VStack spacing={3} alignItems="flex-start" w="full" as="section" pt={28}>
        <Heading size="xl" as="h1">
          Blog
        </Heading>
        <Text fontSize="xl">
          Recent Web development and React Native tutorials and blog posts.
        </Text>
        <Text fontSize="xl">
          In total I&#39;ve written <strong>{Object.keys(posts).length}</strong>{' '}
          tutorials and posts on internet. This site is a collection of most of
          the them.
        </Text>
        {/* <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={HiOutlineSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search a post by title, or topic..."
            variant="filled"
            onChange={onSearch}
          />
        </InputGroup> */}
        {/* Common Tags cloud */}
        <TagsCloud />
      </VStack>
      <List spacing={1} w="full">
        {displayPosts.map(post => (
          <ListItem key={post.slug}>
            <BlogPostCard {...post} />
          </ListItem>
        ))}
      </List>
      {displayPosts.length === 0 && (
        <Text fontSize="xl" fontWeight="600">
          No articles for that query
        </Text>
      )}
    </>
  );
};

export default Blog;
