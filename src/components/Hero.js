import { Box, Stack, VStack, Heading, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';

import ExternalLink from './ExternalLink';
import ExternalLinksCloud from './ExternalLinksCloud';
import HeroImage from './HeroImage';

const RotateBox = styled.span`
  &:hover img {
    transform: rotate(20deg);
  }
`;

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
              <RotateBox>
                <Image
                  src="/handwave.png"
                  width={24}
                  height={24}
                  alt="Hand Wave Emoji"
                />
              </RotateBox>{' '}
              Hey, I&apos;m Aman
            </Heading>
          </Stack>

          <Text lineHeight="175%" as="h2" fontSize="lg">
            I&apos;m a software developer and a technical writer. Currently
            working as a Senior Content Developer at <strong>Vercel</strong>.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            Previously, I&apos;ve worked as{' '}
            <ExternalLink href="https://amanhimself.dev/blog/first-three-months-as-developer-advocate/">
              Developer Advocate
            </ExternalLink>
            , independent consultant, and technical writer for many online
            publications.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            I started this blog to share my software development learning,
            including Node.js, React, React Native, and Expo.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            I&apos;ve been writing online since 2017, mostly on web and mobile
            development. I&apos;ve written over 150 articles for more than 25
            publications and organizations across the internet.
          </Text>
          <ExternalLinksCloud />
        </VStack>
        <HeroImage />
      </Stack>
    </Box>
  );
};

export default Hero;
