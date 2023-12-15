import {
  VStack,
  Heading,
  List,
  ListItem,
  Text,
  Link,
  HStack
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
        <Text color="gray.500" mx={2}>
          •
        </Text>
        <Heading size="lg" color="purple.500" textAlign="center">
          <Link href="/blog">See all</Link>
        </Heading>
      </HStack>
      <List spacing={2}>
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
