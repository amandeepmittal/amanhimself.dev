import type { NextPage } from 'next';
import { VStack, Heading, Text, List, ListItem } from '@chakra-ui/react';

import { DocumentHead, ExternalLink } from '../src/components';

const UsesPage: NextPage = () => {
  return (
    <>
      <DocumentHead pageTitle="Aman Mittal - Uses" postPath="/uses" />
      <VStack spacing={3} alignItems="flex-start" w="full" as="section" pt={28}>
        <Heading size="lg" as="h1">
          ⚙️ What I use
        </Heading>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          {`I almost never get asked about what's my setup is or what I use.
          Nonetheless, here is what I use on daily basis.`}
        </Text>
        <Heading size="md" as="h2" pt={8}>
          Coding Software
        </Heading>

        <List spacing={4}>
          <ListItem fontSize="lg">
            <ExternalLink href="https://code.visualstudio.com/">
              Visual Studio Code
            </ExternalLink>
            - My friend{' '}
            <ExternalLink href="https://twitter.com/spences10">
              Scott Spences
            </ExternalLink>{' '}
            introduced me to VS Code. At that time, we were both using Atom. I
            have never looked back.
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.jetbrains.com/lp/mono/">
              Jetbrains Mono
            </ExternalLink>
            - I like this font.
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://brave.com/">Brave</ExternalLink>- as my
            personal browser. I also use Chrome and sometimes Safari and
            Firefox.
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://marketplace.visualstudio.com/items?itemName=nopjmp.fairyfloss">
              fairyFloss
            </ExternalLink>
            - As much as I love to try new themes in VSCode, I always come back
            to fairyFloss.
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://iterm2.com/">item2</ExternalLink>- My
            terminal of choice, with ZSH shell.
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://cheatsheets.xyz/homebrew/">
              Homebrew
            </ExternalLink>
            - For installing other libs and softwares.
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.cockos.com/licecap/">
              LICEcap
            </ExternalLink>
            - For creating GIFs.
          </ListItem>
        </List>
        <Text>
          Find out more about what VSCode extensions I regularly use{' '}
          <ExternalLink href="https://amanhimself.dev/blog/setup-macbook-m1/">
            here
          </ExternalLink>
          .
        </Text>
        <Heading size="md" as="h2" pt={8}>
          Gear
        </Heading>

        <List spacing={4}>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.apple.com/in/shop/buy-mac/macbook-pro">
              Macbook Pro 13&rdquo;
            </ExternalLink>
            - Apple M1 chip.
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://amanhimself.dev/about">
              Desk & Chair
            </ExternalLink>
            - Pretty much, any flat surface.
          </ListItem>
        </List>
      </VStack>
    </>
  );
};

export default UsesPage;
