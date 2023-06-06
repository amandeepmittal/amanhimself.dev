import {
  Box,
  Text,
  VStack,
  Link,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';

const SponsorCard = () => {
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
          <Text as="h2" fontSize="2xl" fontWeight="600" color={textMode}>
            Sponsor Title
          </Text>
          <Text fontSize="xs" color="purple.500" as="i">
            SPONSOR
          </Text>
        </HStack>
        <Text fontSize="md" color={textMode}>
          This blog post is sponsored by amanhimself. Your copy for the
          sponsorship message will go here.
        </Text>
        <Link isExternal href="https://amanhimself.substack.com/">
          <Text fontSize="lg" fontWeight="700" color="purple.500">
            🔗 Have look and try it for free!
          </Text>
        </Link>
      </VStack>
    </Box>
  );
};

export default SponsorCard;
