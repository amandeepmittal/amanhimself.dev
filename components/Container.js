import React from 'react';
import { useColorMode, Button, Flex, Box, IconButton } from '@chakra-ui/core';

import NavigationContainer from './NavigationContainer';
import Footer from './Footer';

const Container = ({ children }) => {
  return (
    <>
      <NavigationContainer />
      <Flex as="main" justifyContent="center" flexDirection="column" px={8}>
        {children}
        <Footer />
      </Flex>
    </>
  );
};

export default Container;
