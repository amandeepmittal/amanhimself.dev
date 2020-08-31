import React from 'react';
import { Box, Flex, Link, Heading, Text, Stack } from '@chakra-ui/core';

const ProjectCard = ({ title, description, href, icon }) => {
  const borderColor = 'gray.200';
  const iconColor = 'gray.1000';

  return (
    <Link
      mb={4}
      href={href}
      title={title}
      isExternal
      _hover={{
        boxShadow: '0px 4px 20px rgba(159,122,234, 0.3)',
        textDecoration: 'none'
      }}
    >
      <Flex
        align="center"
        border="1px solid"
        borderColor={borderColor}
        borderRadius={4}
        p={4}
      >
        <Box
          aria-label="GitHub"
          as={icon}
          color={iconColor}
          size="50px"
          ml={2}
          mr={6}
        />
        <Stack>
          <Heading
            as="h4"
            size="md"
            fontWeight="bold"
            mb={4}
            letterSpacing="tighter"
          >
            {title}
          </Heading>
          <Text lineHeight="1">{description}</Text>
        </Stack>
      </Flex>
    </Link>
  );
};

export default ProjectCard;
