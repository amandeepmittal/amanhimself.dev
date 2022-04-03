import { HStack, Box, Text, Link, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

const ArticleNavigator = ({ previousArticle, nextArticle }) => {
  const bgColor = useColorModeValue('gray.200', 'purple.700');
  const textMode = useColorModeValue('black', 'white');
  return (
    <>
      <HStack justifyContent="space-between">
        <Text as="h2" fontSize="2xl" fontWeight="600" color={textMode}>
          More Posts
        </Text>
        <NextLink href="/blog">
          <Link>
            <Text fontWeight="600" color="purple.500">
              Browse all posts
            </Text>
          </Link>
        </NextLink>
      </HStack>
      <HStack justifyContent="space-between">
        {previousArticle !== null ? (
          <Box
            borderRadius="md"
            bgColor={bgColor}
            padding="8px 12px"
            alignItems="center"
          >
            <NextLink href={previousArticle.slug}>
              <Link>
                <Text as="h2" fontSize="md" fontWeight="600" color={textMode}>
                  ⬅️ Previous: {previousArticle.title}
                </Text>
              </Link>
            </NextLink>
          </Box>
        ) : null}
        {nextArticle !== null ? (
          <Box
            borderRadius="md"
            bgColor={bgColor}
            padding="8px 12px"
            alignItems="center"
            justifyContent="center"
          >
            <NextLink href={nextArticle.slug}>
              <Link>
                <Text as="h2" fontSize="md" fontWeight="600" color={textMode}>
                  Next: {nextArticle.title} ➡️
                </Text>
              </Link>
            </NextLink>
          </Box>
        ) : null}
      </HStack>
    </>
  );
};

export default ArticleNavigator;
