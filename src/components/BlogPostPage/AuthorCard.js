import {
  Box,
  Text,
  VStack,
  Link,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';

const AuthorCard = () => {
  const textMode = useColorModeValue('black', 'white');
  return (
    <Box
      borderRadius="md"
      padding="8px 12px"
      alignItems="center"
      border="1px solid #805AD5"
    >
      <HStack justifyContent="flex-start">
        <VStack alignItems="stretch" as="section" pt={2}>
          <HStack justifyContent="space-between">
            <Text fontSize="md" fontWeight="600" color={textMode}>
              <Link href="/about">Aman Mittal</Link>{' '}
              <Text fontSize="sm" color="purple.500" as="i">
                author
              </Text>
            </Text>
            <HStack justifyContent="flex-end">
              {/* <Box
                borderRadius="md"
                padding="2px 2px"
                alignItems="center"
                border="1px solid #805AD5"
              > */}
              <Link isExternal href="https://ko-fi.com/amanhimself">
                <Text fontSize="13px" color="purple.500" fontWeight="bold">
                  Buy me coffee
                </Text>
              </Link>
              {/* </Box> */}
              <Box>&nbsp;</Box>
              <Link
                isExternal
                href="https://www.getrevue.co/profile/amanhimself"
              >
                <Text fontSize="13px" color="purple.500" fontWeight="bold">
                  Newsletter
                </Text>
              </Link>
              {/* </Box> */}
              <Box>&nbsp;</Box>
              {/* <Box
                borderRadius="md"
                padding="2px 2px"
                alignItems="center"
                border="1px solid #805AD5"
              > */}
              <Link isExternal href="https://twitter.com/amanhimself">
                <Text fontSize="13px" color="purple.500" fontWeight="bold">
                  Twitter
                </Text>
              </Link>
              {/* </Box> */}
            </HStack>
          </HStack>
          {/* <Text fontSize="md" color={textMode}>
            Software Developer and Technical Writer since 2017. Loves learning
            and writing about Node.js, React, React Native & Expo. Previously,
            worked as Developer Advocate, independent consultant, and technical
            writer with companies like Draftbit, Vercel and Crowdbotics.
          </Text> */}
          <Text fontSize="md" color={textMode}>
            I'm a software developer and a technical writer. In this blog, I
            write about Technical writing, Node.js, React Native and Expo.
            <br />
            <br />
            Currently, working at Expo. Previously, I've worked as a Developer
            Advocate, independent consultant, and content developer for
            companies like Draftbit, Vercel and Crowdbotics.
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AuthorCard;
