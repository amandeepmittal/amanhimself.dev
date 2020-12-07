import React from 'react';
import { parseISO, format } from 'date-fns';
import {
  Heading,
  Text,
  Flex,
  Stack,
  Avatar,
  Box,
  Divider
} from '@chakra-ui/core';

import Container from '../components/Container';
import BlogSeo from '../components/BlogSeo';
import ReadingProgress from '../components/ReadingProgress';
import AuthorCard from '../components/AuthorCard';
import CustomLink from '../components/CustomLink';
import FooterBanner from '../components/FooterBanner';

const shareOnTwitter = (slug, frontMatter) =>
  `http://twitter.com/share?text=${encodeURIComponent(
    frontMatter.title
  )}&url=https://amanhimself.dev/blog/${slug}/&via=amanhimself`;

const Layout = ({ frontMatter, children }) => {
  const slug = frontMatter.__resourcePath
    .replace('blog/', '')
    .replace('.mdx', '');

  return (
    <>
      <Container>
        <BlogSeo
          url={`https://amanhimself.dev/blog/${slug}`}
          {...frontMatter}
        />
        <Stack
          as="article"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
          w="100%"
        >
          <ReadingProgress />
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            w="100%"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
              {frontMatter.title}
            </Heading>
            <Flex
              justify="space-between"
              align={['initial', 'center']}
              direction={['column', 'row']}
              mt={2}
              w="100%"
              mb={4}
            >
              <Flex align="center">
                <Avatar
                  size="xs"
                  name="Aman Mittal"
                  src="https://avatars3.githubusercontent.com/u/10234615?s=460&u=766dec2f37fe330f9d12722074a6fbee326eac78&v=4"
                  mr={2}
                />
                <Text fontSize="sm" color="gray.500">
                  {frontMatter.by}
                  {'Aman Mittal'}
                  {` • `}
                  {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
                {frontMatter.readingTime.text}
                {` • `}
                {frontMatter.wordCount} words
              </Text>
            </Flex>
          </Flex>
          <Box>
            <img src={frontMatter.image} />
          </Box>
          {children}
          <Box>
            <Divider borderColor="purple.400" />
            <CustomLink
              href={shareOnTwitter(slug, frontMatter)}
              isExternal
              color="gray.900"
              fontSize="xl"
              style={{ borderBottom: 0 }}
            >
              {'🐦  Share on Twitter'}
            </CustomLink>
            {` • `}
            <CustomLink
              href="https://ko-fi.com/amanhimself"
              isExternal
              color="gray.900"
              fontSize="xl"
              style={{ borderBottom: 0 }}
            >
              {'☕  Buy me a Coffee'}
            </CustomLink>
            {` • `}
            <CustomLink
              href="https://amanhimself.substack.com/"
              isExternal
              color="gray.900"
              fontSize="xl"
              style={{ borderBottom: 0 }}
            >
              {'💌  Subscribe Newsletter'}
            </CustomLink>
          </Box>
          <Box>
            <FooterBanner />
          </Box>
          {/* <Box>
            <AuthorCard />
          </Box> */}
        </Stack>
      </Container>
    </>
  );
};

export default Layout;
