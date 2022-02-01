import {
  Box,
  Stack,
  VStack,
  Heading,
  Text,
  Button,
  Link
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';

import ExternalLink from './ExternalLink';
import HeroImage from './HeroImage';
import { NEWSLETTER, TWITTER, GITHUB } from '../data/socialLinks';

const socialLinks = [
  {
    href: NEWSLETTER,
    label: 'Newsletter',
    color: 'purple.500'
  },
  {
    href: TWITTER,
    label: 'Twitter',
    color: 'twitter'
  },
  {
    href: GITHUB,
    label: 'GitHub'
  }
];

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
            working as a Senior Content Developer at{' '}
            <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            I started this blog to put together my thoughts and share my
            learnings in software development including Node.js, Reactjs, React
            Native, and Expo.
          </Text>
          <Text lineHeight="175%" as="h2" fontSize="lg">
            I&apos;ve been writing online since 2017, mostly on web and mobile
            development. I&apos;ve written over 150 articles for more than 25
            publications and organizations across the internet.
          </Text>
          <Text>
            <ExternalLink href="https://amanhimself.dev/about">
              Learn more about me
            </ExternalLink>
          </Text>

          <Stack spacing={3} direction={{ base: 'row', md: 'row' }}>
            {socialLinks.map(({ href, label, color }) => (
              <Button
                key={href}
                as={Link}
                variant="outline"
                color={color}
                href={href}
                target="_blank"
                px={2}
                justifyContent={{ base: 'flex-start', md: 'center' }}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </VStack>
        <HeroImage />
      </Stack>
    </Box>
  );
};

export default Hero;
