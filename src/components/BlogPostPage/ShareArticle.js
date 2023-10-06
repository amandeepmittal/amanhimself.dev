import { HStack, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { FaSquareXTwitter } from 'react-icons/fa6';

const ShareArticle = ({ title, slug }) => {
  const textMode = useColorModeValue('black', 'white');

  let productSlug = `https://amanhimself.dev/blog/${slug}/`;

  let xComShareString = `https://x.com/intent/tweet?text=I'm currently reading 👉 ${title}&url=${productSlug} via @amanhimself`;
  return (
    <Link isExternal href={xComShareString}>
      <HStack justifyContent="flex-start" paddingTop="10">
        <FaSquareXTwitter color={textMode} size="20px" />
        <Text fontWeight="600" color={textMode} fontSize="xl">
          Share this article on X (Twitter)
        </Text>
      </HStack>
    </Link>
  );
};

export default ShareArticle;
