import {
  VStack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Divider,
  HStack,
  Icon,
  useColorModeValue,
  Box
} from '@chakra-ui/react';

import {
  SiBluesky,
  SiDevdotto,
  SiExpo,
  SiGithub,
  SiGoodreads,
  SiLetterboxd,
  SiLinkedin,
  SiMedium,
  SiRss,
  SiTinyletter,
  SiTwitter
} from 'react-icons/si';

import { DocumentHead } from '../src/components';
import {
  MEDIUM,
  TWITTER,
  RSS,
  EMAIL,
  DEVTO,
  GOODREADS,
  LINKEDIN,
  BLUESKY
} from '../src/data/socialLinks';
import { BiSolidEnvelope } from 'react-icons/bi';

export default function LinksPage() {
  const iconColor = useColorModeValue('gray.600', 'white');

  return (
    <>
      <DocumentHead pageTitle="Aman Mittal - All Links" postPath="/links" />
      <VStack
        spacing={1.5}
        alignItems="flex-start"
        w="full"
        as="section"
        pt={28}
      >
        <Heading size="2xl" as="h2" paddingBottom="30px">
          Links
        </Heading>
        <Text lineHeight="175%" fontSize="md" paddingBottom="20px">
          Find Aman on the internet:
        </Text>
        <Box paddingLeft="10px">
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiGithub} w={8} h={8} display="inline" />
            <Link isExternal href={MEDIUM} color="purple.500" fontSize="30px">
              GitHub
            </Link>
          </HStack>
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiTwitter} w={8} h={8} display="inline" />
            <Link isExternal href={TWITTER} color="purple.500" fontSize="30px">
              X.com
            </Link>
          </HStack>
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiLinkedin} w={8} h={8} display="inline" />
            <Link isExternal href={LINKEDIN} color="purple.500" fontSize="30px">
              LinkedIn
            </Link>
          </HStack>
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={BiSolidEnvelope} w={8} h={8} display="inline" />
            <Link isExternal href={EMAIL} color="purple.500" fontSize="30px">
              Email
            </Link>
          </HStack>
          {/* <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiTinyletter} w={8} h={8} display="inline" />
            <Link isExternal href={NEWSLETTER} color="purple.500" fontSize="30px">
              NEWSLETTER
            </Link>
          </HStack> */}
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiMedium} w={8} h={8} display="inline" />
            <Link isExternal href={MEDIUM} color="purple.500" fontSize="30px">
              Medium
            </Link>
          </HStack>
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiDevdotto} w={8} h={8} display="inline" />
            <Link isExternal href={DEVTO} color="purple.500" fontSize="30px">
              Dev.to
            </Link>
          </HStack>
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiBluesky} w={8} h={8} display="inline" />
            <Link isExternal href={BLUESKY} color="purple.500" fontSize="30px">
              Bluesky
            </Link>
          </HStack>
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiGoodreads} w={8} h={8} display="inline" />
            <Link
              isExternal
              href={GOODREADS}
              color="purple.500"
              fontSize="30px"
            >
              Goodreads
            </Link>
          </HStack>
          <HStack spacing={2} paddingBottom="10px">
            <Icon as={SiRss} w={8} h={8} display="inline" />
            <Link isExternal href={RSS} color="purple.500" fontSize="30px">
              RSS
            </Link>
          </HStack>
        </Box>
      </VStack>
    </>
  );
}
