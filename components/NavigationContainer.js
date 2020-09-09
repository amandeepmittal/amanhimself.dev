import React from 'react';
import NextLink from 'next/link';
import { Button, Flex, Box, Heading } from '@chakra-ui/core';
import styled from '@emotion/styled';

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const NavLink = styled(Button)`
  text-decoration: none;
  border-bottom: #9f7aea 0.2em solid;
`;

const NavigationContainer = () => {
  return (
    <StickyNav
      flexDirection="row"
      justifyContent="space-between"
      align="center"
      maxWidth="900px"
      width="100%"
      as="nav"
      px={3}
      py={4}
      mt={[0, 6]}
      mb={8}
      mx="auto"
      bg="white"
    >
      <Flex align="center" mr={5}>
        <NextLink href="/" passHref>
          <NavLink
            as="a"
            variant="ghost"
            _hover={{ bg: 'purple.400', color: 'white' }}
          >
            <Heading as="h1" size="lg">
              Aman Mittal
            </Heading>
          </NavLink>
        </NextLink>
      </Flex>
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-evenly"
      >
        <NextLink href="/blog" passHref>
          <NavLink
            as="a"
            variant="ghost"
            _hover={{ bg: 'purple.400', color: 'white' }}
            mr={4}
          >
            Blog
          </NavLink>
        </NextLink>
        <NextLink href="https://ko-fi.com/amanhimself" passHref>
          <NavLink
            as="a"
            variant="ghost"
            _hover={{ bg: 'purple.400', color: 'white' }}
          >
            ☕
          </NavLink>
        </NextLink>
      </Box>
    </StickyNav>
  );
};

export default NavigationContainer;
