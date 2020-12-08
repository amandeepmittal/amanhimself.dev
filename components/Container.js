import React from 'react';
import { useColorMode, Button, Flex, Box, IconButton } from '@chakra-ui/core';

const Container = ({ children }) => {
  return (
    <>
      {/* <NavigationContainer /> */}
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {children}
      </Flex>
    </>
  );
};

export default Container;
