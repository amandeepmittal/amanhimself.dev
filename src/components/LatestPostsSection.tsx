import {
  VStack,
  Heading,
  List,
  ListItem,
  Button,
  Link,
  HStack
} from '@chakra-ui/react';

import BlogPostCard from './BlogPostCard';

const LatestPostsSection = ({ posts }) => {
  return (
    <VStack w="full" alignItems="flex-start" spacing={4} as="section" mt={16}>
      <HStack justifyContent="center" alignItems="center">
        <Heading size="md">Latest Posts</Heading>
        <Button as={Link} variant="outline" href="/blog" px={1} size="sm">
          View all
        </Button>
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
