import React from 'react';
import NextLink from 'next/link';
import { Heading, Text, Flex, Box, Link } from '@chakra-ui/core';
import { format, parseISO } from 'date-fns';

const BlogPost = frontMatter => {
  const { title, publishedAt, thumbnail } = frontMatter;
  const secondaryTextColor = 'gray.700';

  const slug = frontMatter.__resourcePath
    .replace('blog/', '')
    .replace('.mdx', '');

  return (
    <NextLink href={`blog/${slug}`} passHref>
      {/* <Link w="100%" _hover={{ textDecoration: 'none' }}> */}
      <Link
        mb={4}
        _hover={{
          boxShadow: '0px 4px 20px rgba(159,122,234, 0.3)',
          textDecoration: 'none'
        }}
      >
        <Flex
          align="center"
          border="1px solid"
          borderColor="gray.200"
          borderRadius={4}
          p={3}
        >
          <Box mb={6} display="block" width="100%">
            <Flex
              width="100%"
              align="flex-start"
              justifyContent="space-between"
              flexDirection={['column', 'row']}
            >
              <Heading size="md" as="h3" mb={2} fontWeight="medium">
                {title}
              </Heading>
              <Text
                color="gray.500"
                minWidth="105px"
                textAlign={['left', 'right']}
                mb={[4, 0]}
              ></Text>
            </Flex>
            <Text color={secondaryTextColor} fontSize="sm" color="gray.500">
              {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
            </Text>
          </Box>
          <Box aria-label="thumbnail" size="100px" ml={0.5} mr={2}>
            <img src={thumbnail} />
          </Box>
        </Flex>
      </Link>
    </NextLink>
  );
};

export default BlogPost;
