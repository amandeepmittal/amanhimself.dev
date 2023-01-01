import {
  Box,
  Text,
  VStack,
  Link,
  useColorModeValue,
  HStack,
  useMediaQuery
} from '@chakra-ui/react';

const SubscribeCard = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const textMode = useColorModeValue('black', 'white');
  return (
    <Box
      borderRadius="md"
      padding="8px 12px"
      alignItems="center"
      border="1px solid #805AD5"
    >
      <VStack alignItems="stetch" as="section" pt={2}>
        <HStack justifyContent="space-between">
          <Text as="h2" fontSize="lg" fontWeight="600" color={textMode}>
            Join <strong>1300+ devs</strong>{' '}
            <Link isExternal href="https://amanhimself.substack.com/">
              & subscribe to my newsletter!
            </Link>
          </Text>
          {isMobile ? null : (
            <Text fontSize="sm" color="purple.500" as="i">
              NEWSLETTER
            </Text>
          )}
        </HStack>
        {/* <Text fontSize="md" color={textMode}>
          Subscribe to my newsletter to get the latest content by email.
          Unsubscribe any time.
        </Text> */}
        <Link isExternal href="https://amanhimself.substack.com/">
          <Text fontSize="md" fontWeight="700" color="purple.500">
            🔗 Subscribe on Revue
          </Text>
        </Link>
      </VStack>
    </Box>
  );
};

export default SubscribeCard;
