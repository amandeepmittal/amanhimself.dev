import {
  Stack,
  VStack,
  Divider,
  Link,
  Text,
  useColorModeValue,
  HStack,
  useMediaQuery
} from '@chakra-ui/react';

import {
  TWITTER,
  DEVTO,
  MEDIUM,
  GITHUB,
  NEWSLETTER,
  RSS
} from '../data/socialLinks';

const Footer = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const linkColor = useColorModeValue('gray.600', 'white');
  const textMode = useColorModeValue('gray.500', 'gray.500');

  return (
    <VStack pb={8} as="footer" alignItems="flex-start">
      <Divider />

      <Stack
        w="full"
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent={{ base: 'center', md: 'space-between' }}
      >
        <Text color={linkColor}>
          Copyright &copy;&nbsp; 2019-
          {`${new Date().getFullYear()} Aman Mittal · All Rights Reserved.`}
        </Text>
      </Stack>
      <HStack
        justifyContent="space-between"
        divider={
          <Text color="gray.500" mx={2}>
            •
          </Text>
        }
      >
        {isMobile ? (
          <HStack
            justifyContent="space-between"
            divider={
              <Text color="gray.500" mx={2}>
                •
              </Text>
            }
          >
            <Link isExternal href={NEWSLETTER}>
              <Text fontSize="sm" color={textMode}>
                Newsletter
              </Text>
            </Link>
            <Link isExternal href={TWITTER}>
              <Text fontSize="sm" color={textMode}>
                Twitter
              </Text>
            </Link>
            <Link isExternal href={RSS}>
              <Text fontSize="sm" color={textMode}>
                RSS
              </Text>
            </Link>
          </HStack>
        ) : (
          <HStack
            justifyContent="space-between"
            divider={
              <Text color="gray.500" mx={2}>
                •
              </Text>
            }
          >
            <Link isExternal href={NEWSLETTER}>
              <Text fontSize="sm" color={textMode}>
                Newsletter
              </Text>
            </Link>
            <Link isExternal href={TWITTER}>
              <Text fontSize="sm" color={textMode}>
                Twitter
              </Text>
            </Link>
            <Link isExternal href={MEDIUM}>
              <Text fontSize="sm" color={textMode}>
                Medium
              </Text>
            </Link>
            <Link isExternal href={DEVTO}>
              <Text fontSize="sm" color={textMode}>
                Dev.to
              </Text>
            </Link>
            <Link isExternal href={GITHUB}>
              <Text fontSize="sm" color={textMode}>
                GitHub
              </Text>
            </Link>
            <Link isExternal href={RSS}>
              <Text fontSize="sm" color={textMode}>
                RSS
              </Text>
            </Link>
          </HStack>
        )}
      </HStack>
    </VStack>
  );
};

export default Footer;
