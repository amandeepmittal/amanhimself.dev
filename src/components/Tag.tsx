import React from 'react';
import Link from 'next/link';
import { Link as ChakraLink, Flex, Text } from '@chakra-ui/react';

const Tag = ({ children, url }) => {
  <Flex marginRight="0.5rem"></Flex>;

  let tag = (
    <Flex mx="0.5rem">
      <Text _hover={{ textDecoration: 'underline' }} color={'white'}>
        # {children}
      </Text>
    </Flex>
  );

  if (url) {
    tag = (
      <ChakraLink as={Link} href={url}>
        <a>{tag}</a>
      </ChakraLink>
    );
  }
  return tag;
};

export default Tag;
