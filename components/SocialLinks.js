import React from 'react';
import { Box, Link, IconButton } from '@chakra-ui/core';
import { SiGithub, SiMedium } from 'react-icons/si';
import { FaTwitter, FaInstagram, FaDev } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const SocialLinks = () => {
  return (
    <Box mb={2}>
      <Link href="https://twitter.com/amanhimself" title="Twitter" isExternal>
        <IconButton
          aria-label="Twitter"
          icon={FaTwitter}
          fontSize={24}
          color="purple.400"
          variant="ghost"
          _hover={{
            backgroundColor: 'purple.100'
          }}
        />
      </Link>
      <Link href="https://github.com/amandeepmittal" title="GitHub" isExternal>
        <IconButton
          aria-label="GitHub"
          icon={SiGithub}
          fontSize={22}
          color="purple.400"
          variant="ghost"
          _hover={{
            backgroundColor: 'purple.100'
          }}
        />
      </Link>
      <Link
        href="https://www.instagram.com/amanhimselfcodes/"
        title="Instagram"
        isExternal
      >
        <IconButton
          aria-label="Instagram"
          icon={FaInstagram}
          fontSize={24}
          color="purple.400"
          variant="ghost"
          _hover={{
            backgroundColor: 'purple.100'
          }}
        />
      </Link>
      <Link href="https://medium.com/@amanhimself" title="Medium" isExternal>
        <IconButton
          aria-label="Medium"
          icon={SiMedium}
          fontSize={22}
          color="purple.400"
          variant="ghost"
          _hover={{
            backgroundColor: 'purple.100'
          }}
        />
      </Link>
      <Link href="https://dev.to/amanhimself" title="Dev-to" isExternal>
        <IconButton
          aria-label="Dev"
          icon={FaDev}
          fontSize={25}
          color="purple.400"
          variant="ghost"
          _hover={{
            backgroundColor: 'purple.100'
          }}
        />
      </Link>
      <Link href="mailto:amanmittal.work@gmail.com" title="Email" isExternal>
        <IconButton
          aria-label="Email"
          icon={HiOutlineMail}
          // size="lg"
          fontSize={24}
          color="purple.400"
          variant="ghost"
          _hover={{
            backgroundColor: 'purple.100'
          }}
        />
      </Link>
    </Box>
  );
};

export default SocialLinks;
