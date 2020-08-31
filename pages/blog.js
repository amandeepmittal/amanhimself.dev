import React, { useState } from 'react';
import {
  Heading,
  Text,
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Icon
} from '@chakra-ui/core';
import { NextSeo } from 'next-seo';

import Container from '../components/Container';
import BlogPost from '../components/BlogPost';

import { frontMatter as blogPosts } from './blog/**/*.mdx';

const url = 'https://amanhimself.dev/';
const title = 'Blog – Aman Mittal';
const description = 'Software developer and React Native enthusiast.';

const Blog = () => {
  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = blogPosts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .filter(frontMatter =>
      frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }}
      />
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              All Blog Posts - {blogPosts.length}
            </Heading>
            <Text color="gray.500" fontSize="lg" mb={2}>
              A collection of articles, tutorials, writings and more.
            </Text>
            <InputGroup my={4} mr={4} w="100%">
              <Input
                aria-label="Search posts"
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Search a post here... "
                focusBorderColor="purple.400"
              />
              <InputRightElement>
                <Icon name="search" color="gray.500" />
              </InputRightElement>
            </InputGroup>
          </Flex>
          {!searchValue && (
            <Flex
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              maxWidth="700px"
              mt={3}
            ></Flex>
          )}
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            mt={8}
          >
            {!filteredBlogPosts.length && 'No posts found.'}
            {filteredBlogPosts.map(frontMatter => (
              <BlogPost key={frontMatter.title} {...frontMatter} />
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Blog;
