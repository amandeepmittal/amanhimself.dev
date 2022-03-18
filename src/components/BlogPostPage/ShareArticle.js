import { HStack, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { FaTwitterSquare } from 'react-icons/fa';

const ShareArticle = ({ title, slug }) => {
  const textMode = useColorModeValue('black', 'white');

  let productSlug = `https://amanhimself.dev/blog/${slug}/`;

  let twitterShareString = `https://twitter.com/intent/tweet?text=I'm currently reading 👉 ${title}&url=${productSlug} via @amanhimself`;
  return (
    <Link isExternal href={twitterShareString}>
      <HStack justifyContent="flex-start">
        <FaTwitterSquare color={textMode} size="20px" />
        <Text fontWeight="600" color={textMode} fontSize="lg">
          Share this article on Twitter
        </Text>
      </HStack>
    </Link>
  );
};

export default ShareArticle;
