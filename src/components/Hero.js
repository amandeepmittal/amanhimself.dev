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
            I&apos;m a software developer and a technical writer. I love working
            with open source technologies and writing about what I learn.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            I&apos;ve been writing online since 2017, mostly cross-platform
            mobile development and sometimes on web. I&apos;ve written over 150
            articles and tutorials for more than 30 publications and
            organizations across the internet. Hence, I started this blog to
            share my software development journey.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            Currently, working on documentation at{' '}
            <ExternalLink href="https://expo.dev/">Expo</ExternalLink>.
            Previously, I&apos;ve worked as{' '}
            <ExternalLink href="https://amanhimself.dev/blog/first-three-months-as-developer-advocate/">
              Developer Advocate
            </ExternalLink>
            , and Senior Content Developer with companies like Draftbit and
            Vercel.
          </Text>
          <ExternalLinksCloud />
        </VStack>
        <HeroImage />
      </Stack>
    </Box>
  );
};

export default Hero;
