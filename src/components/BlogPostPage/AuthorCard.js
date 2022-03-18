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
      borderRadius="14px"
      padding="8px 12px"
      alignItems="center"
      border="1px solid #805AD5"
    >
      <HStack justifyContent="flex-start">
        <VStack alignItems="stretch" as="section" pt={2}>
          <HStack justifyContent="space-between">
            <Text fontSize="md" fontWeight="600" color={textMode}>
              AMAN MITTAL{' '}
              <Text fontSize="sm" color="purple.500" as="i">
                author
              </Text>
            </Text>
            <HStack justifyContent="flex-end">
              <Box
                borderRadius="4px"
                padding="2px 2px"
                alignItems="center"
                border="1px solid #805AD5"
              >
                <Link
                  isExternal
                  href="https://github.com/sponsors/amandeepmittal?frequency=one-time"
                >
                  <Text fontSize="13px" color="purple.500">
                    Buy me coffee
                  </Text>
                </Link>
              </Box>
              <Box
                borderRadius="4px"
                padding="2px 2px"
                alignItems="center"
                border="1px solid #805AD5"
              >
                <Link isExternal href="https://twitter.com/amanhimself">
                  <Text fontSize="13px" color="purple.500">
                    Follow
                  </Text>
                </Link>
              </Box>
            </HStack>
          </HStack>
          <Text fontSize="md" color={textMode}>
            Software Developer and Technical Writer since 2017. Senior Content
            Developer at Vercel. Loves learning and writing about Node.js,
            React, React Native & Expo. Occasional speaker. Previously, a
            Developer Advocate.
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default AuthorCard;
