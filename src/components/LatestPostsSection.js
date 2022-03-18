import {
  VStack,
  Heading,
  List,
  ListItem,
  Text,
  Link,
  HStack,
  Box
} from '@chakra-ui/react';

import BlogPostCard from './BlogPostCard';

const LatestPostsSection = ({ posts }) => {
  return (
    <VStack
      w="full"
      alignItems="flex-start"
      justifyContent="center"
      as="section"
    >
      <HStack justifyContent="center" alignItems="center">
        <Heading size="lg">Latest Posts</Heading>
        <HStack justifyContent="flex-end">
          <Link href="/blog">
            <Text fontSize="lg" color="purple.500" textAlign="center">
              See all
            </Text>
          </Link>
        </HStack>
      </HStack>
      <List spacing={6}>
        {posts.map(post => (
          <ListItem key={post.slug}>
            <BlogPostCard {...post} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default LatestPostsSection;
