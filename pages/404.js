import React from 'react';
import NextLink from 'next/link';
import { Heading, Text, Flex, Stack, Button } from '@chakra-ui/core';

import Container from '../components/Container';

const Error = () => {
  return (
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
            😅 I've am yet to write the post you're looking for.
          </Heading>
          <Text color="gray.700" my={4}></Text>
          <NextLink href="/" passHref>
            <Button
              as="a"
              p={[1, 4]}
              backgroundColor="purple.400"
              color="white"
              variant="solid"
              fontWeight="bold"
              my="2rem"
              mx="2rem"
              _hover={{
                backgroundColor: 'purple.300'
              }}
            >
              May be you'd like to return home?
            </Button>
          </NextLink>
          <NextLink href="/blog" passHref>
            <Button
              as="a"
              p={[1, 4]}
              backgroundColor="purple.400"
              color="white"
              variant="solid"
              fontWeight="bold"
              my="2rem"
              mx="2rem"
              _hover={{
                backgroundColor: 'purple.300'
              }}
            >
              Or would you like to read another blog post?
            </Button>
          </NextLink>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Error;
