import NextLink from 'next/link';
import {
  Stack,
  VStack,
  Divider,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import {
  TWITTER,
  INSTAGRAM,
  DEVTO,
  MEDIUM,
  GITHUB,
  GOODREADS,
  NEWSLETTER,
  EMAIL,
  HASHNODE,
  POLYWORK,
  KOFI
} from '../data/socialLinks';

const firstGroup = [
  {
    href: '/',
    label: 'Home'
  },
  {
    href: '/blog',
    label: 'Blog'
  },
  {
    href: NEWSLETTER,
    label: 'Newsletter'
  },
  {
    href: '/about',
    label: 'About me'
  },
  {
    href: '/speaking',
    label: 'Speaking'
  },
  {
    href: EMAIL,
    label: 'Email'
  }
];

const secondGroup = [
  {
    href: TWITTER,
    label: 'Twitter'
  },
  {
    href: GITHUB,
    label: 'GitHub'
  },
  {
    href: MEDIUM,
    label: 'Medium'
  },
  {
    href: DEVTO,
    label: 'Dev.to'
  },
  {
    href: HASHNODE,
    label: 'Hashnode'
  }
];

const thirdGroup = [
  {
    href: '/uses',
    label: 'Uses/Gear'
  },

  {
    href: POLYWORK,
    label: 'Polywork'
  },
  {
    href: INSTAGRAM,
    label: 'Instagram'
  },
  {
    href: GOODREADS,
    label: 'Goodreads'
  },
  {
    href: KOFI,
    label: 'Buy me coffee'
  }
];

const Footer = () => {
  const linkColor = useColorModeValue('gray.600', 'white');

  return (
    <VStack pb={8} spacing={8} as="footer" alignItems="flex-start">
      <Divider />
      <Stack
        direction={{ base: 'row', md: 'row' }}
        justifyContent="space-between"
        w="full"
        spacing={{ base: 2, md: 8 }}
      >
        <VStack alignItems="flex-start">
          {firstGroup.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link isExternal={href.startsWith('http')} color={linkColor}>
                {label}
              </Link>
            </NextLink>
          ))}
        </VStack>
        <VStack alignItems="flex-start">
          {secondGroup.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link
                isExternal={href.startsWith('http')}
                target="_blank"
                color={linkColor}
              >
                {label}
              </Link>
            </NextLink>
          ))}
        </VStack>
        <VStack alignItems="flex-start">
          {thirdGroup.map(({ href, label }) => (
            <NextLink key={href} href={href} passHref>
              <Link isExternal={href.startsWith('http')} color={linkColor}>
                {label}
              </Link>
            </NextLink>
          ))}
        </VStack>
      </Stack>
      <Stack
        w="full"
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent={{ base: 'center', md: 'space-between' }}
        spacing={0}
        gridRowGap={4}
      >
        <Text color={linkColor}>
          Copyright &copy;&nbsp; 2019-
          {`${new Date().getFullYear()} Aman Mittal · All Rights Reserved.`}
        </Text>
      </Stack>
    </VStack>
  );
};

export default Footer;
