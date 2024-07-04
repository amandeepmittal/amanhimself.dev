import { Box, Stack, VStack, Heading, Text, Icon } from '@chakra-ui/react';

import ExternalLink from './ExternalLink';
import ExternalLinksCloud from './ExternalLinksCloud';
import HeroImage from './HeroImage';
import { SiExpo } from 'react-icons/si';

const Hero = () => {
  return (
    <Box pt={28}>
      <Stack
        alignItems="center"
        spacing={12}
        w="full"
        direction={{ base: 'column-reverse', md: 'row' }}
        as="section"
      >
        <VStack spacing={3} alignItems="flex-start" w="full">
          <Stack
            spacing={3}
            w="full"
            direction={{ base: 'column', md: 'row' }}
            justifyContent={{ base: 'center', md: 'flex-start' }}
            alignItems="center"
          >
            <Heading size="lg" as="h1">
              <span role="emoji">👋</span> Hey, I&apos;m Aman
            </Heading>
          </Stack>

          <Text lineHeight="175%" as="h2" fontSize="lg">
            I&apos;m a software developer and a technical writer. I love working
            with open source technologies and writing about what I learn.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            I mainly enjoy working with React Native and Expo. Currently,
            working as the documentation lead at{' '}
            <span
              style={{
                backgroundColor: '#e5e7eb',
                padding: '2px 4px',
                borderRadius: '4px'
              }}
            >
              <span role="img" aria-label="expo">
                <Icon as={SiExpo} w={3.5} h={3.5} display="inline" />
              </span>{' '}
              <ExternalLink href="https://expo.dev/">Expo</ExternalLink>
            </span>{' '}
            among other hats.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            I&apos;ve been writing online since 2017, mostly cross-platform
            mobile development and sometimes on web. I&apos;ve written over 150
            articles and tutorials for more than 30 publications and
            organizations across the internet. Hence, I started this blog to
            share my software development journey.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            Previously, I&apos;ve worked as{' '}
            <ExternalLink href="https://amanhimself.dev/blog/first-three-months-as-developer-advocate/">
              Developer Advocate
            </ExternalLink>{' '}
            at Draftbit, and Senior Content Developer at Vercel.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            Read more about me on the{' '}
            <ExternalLink href="https://amanhimself.dev/about/">
              About page
            </ExternalLink>
            .
          </Text>
          <ExternalLinksCloud />
        </VStack>
        <HeroImage />
      </Stack>
    </Box>
  );
};

export default Hero;
