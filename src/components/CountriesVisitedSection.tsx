import { VStack, Heading, Text } from '@chakra-ui/react';

const CountriesVisitedSection = () => {
  return (
    <VStack w="full" alignItems="flex-start" spacing={4} as="section" mt={16}>
      <Heading size="md">Countries I&#39;ve Visited</Heading>
      <Text spacing={6} fontSize="lg">
        I love to travel: 🇦🇪 🇵🇱 🇨🇿 🇦🇹 🇸🇰 🇩🇪 🇧🇪 🇳🇱
      </Text>
    </VStack>
  );
};

export default CountriesVisitedSection;
