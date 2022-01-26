import { useState } from 'react';
import { Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';
import { getAllBlogPosts } from '../blog';
import { BlogPostCard, DocumentHead } from '../../src/components';

export const getStaticPaths = async () => {
  const posts = await getAllBlogPosts();

  return {
    paths: posts.map(({ tag }) => ({ params: { tag } })),
    fallback: false
  };
};

export const getAllPostsByTag = async query => {
  const posts = await getAllBlogPosts();

  return posts.filter(post => post.tag.includes(query));
};

export const getStaticProps = async ({ params }) => {
  const { tag } = params;
  const props = {
    posts: await getAllPostsByTag(tag),
    tag
  };

  return {
    props
  };
};

const TagPage = ({ posts, tag }) => {
  const [displayPosts] = useState(posts);
  let filteredPostsLength = displayPosts.length;

  return (
    <>
      <DocumentHead pageTitle={`Search by - ${tag}`} postPath="/tags" />
      <VStack spacing={3} alignItems="flex-start" w="full" as="section" pt={28}>
        <Heading size="xl" as="h1">
          🔥 {filteredPostsLength} Posts filtered by tag &quot;{tag}&quot;
        </Heading>
      </VStack>
      <List spacing={1} w="full">
        {displayPosts.map(post => (
          <ListItem key={post.slug}>
            <BlogPostCard {...post} />
          </ListItem>
        ))}
      </List>
      {displayPosts.length === 0 && (
        <Text fontSize="xl" fontWeight="600">
          No articles for that query
        </Text>
      )}
    </>
  );
};

export default TagPage;
