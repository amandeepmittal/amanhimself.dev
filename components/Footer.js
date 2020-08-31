import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';

import CustomLink from './CustomLink';

const Footer = () => {
  return (
    <Flex align="center" mb={8} direction="row" justifyContent="center">
      <Text color="gray.600" mr={4}>
        &copy;{new Date().getFullYear()} Aman Mittal
      </Text>
      <CustomLink
        href="/blog"
        isExternal
        color="gray.600"
        style={{ borderBottom: 0 }}
        _hover={{
          color: 'gray.300'
        }}
        mr={4}
      >
        {'Blog'}
      </CustomLink>
      <CustomLink
        href="https://tinyletter.com/amanhimself/"
        isExternal
        color="gray.600"
        style={{ borderBottom: 0 }}
        _hover={{
          color: 'gray.300'
        }}
        mr={4}
      >
        {'Newsletter'}
      </CustomLink>
      <CustomLink
        href="https://twitter.com/amanhimself"
        isExternal
        color="gray.600"
        style={{ borderBottom: 0 }}
        _hover={{
          color: 'gray.300'
        }}
        mr={4}
      >
        {'Twitter'}
      </CustomLink>
      <CustomLink
        href="https://ko-fi.com/amanhimself"
        isExternal
        color="gray.600"
        style={{ borderBottom: 0 }}
        _hover={{
          color: 'gray.300'
        }}
        mr={4}
      >
        {'Buy me a coffee'}
      </CustomLink>
    </Flex>
  );
};

export default Footer;
