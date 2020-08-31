import React from 'react';
import { Box, Flex, Heading, Text, Stack } from '@chakra-ui/core';

const AuthorCard = () => {
  const borderColor = 'purple.200';

  return (
    <Box mb={4} backgroundColor="purple.50" borderRadius={8}>
      <Flex
        align="center"
        justifyContent="center"
        border="1px solid"
        borderColor={borderColor}
        borderRadius={4}
        p={4}
      >
        <img
          src="/static/avatar.jpg"
          style={{ width: 130, height: 130, borderRadius: 65, marginRight: 10 }}
        />
        <Stack>
          <Heading
            as="h4"
            size="md"
            fontWeight="600"
            mb={4}
            letterSpacing="tighter"
          >
            About the author
          </Heading>
          <Text lineHeight="1">
            👋 Hey! I’m Aman Mittal. I’m a software developer and a technical
            writer.
          </Text>
          <Text lineHeight="1">
            This website is a collection of all posts I've written in my journey
            of learning web and mobile development.
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default AuthorCard;
