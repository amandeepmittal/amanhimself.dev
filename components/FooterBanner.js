import React from 'react';
import { Box, Flex, Heading, Text, Alert, AlertIcon } from '@chakra-ui/core';

const FooterBanner = () => {
  return (
    <Box mb={4} align="center" justifyContent="center">
      <Alert status="info" mb={2}>
        <AlertIcon />
        <Heading
          as="h5"
          size="sm"
          fontWeight="600"
          letterSpacing="tighter"
          lineHeight="1.3">
          Want to help support this blog and learn some cool things about
          JavaScript at the same time?
        </Heading>
      </Alert>
      <Text mb={2}>
        Click the banner below and sign up to{' '}
        <Box as="span" fontWeight="600">
          Bytes
        </Box>
        , one of the few newsletters I like to read.
      </Text>
      <Flex align="center" justifyContent="center">
        <a href="https://ui.dev/bytes/?r=aman" target="_blank">
          <img src="/static/uidev-banner.jpg" />
        </a>
      </Flex>
    </Box>
  );
};

export default FooterBanner;
