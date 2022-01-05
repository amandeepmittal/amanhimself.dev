import type { NextPage } from 'next';
import { VStack, Heading, Text, List, ListItem } from '@chakra-ui/react';

import { DocumentHead, ExternalLink } from '../src/components';

const SpeakingPage: NextPage = () => {
  return (
    <>
      <DocumentHead pageTitle="Aman Mittal - Speaking" postPath="/speaking" />
      <VStack spacing={3} alignItems="flex-start" w="full" as="section" pt={28}>
        <Heading size="lg" as="h1">
          Speaking
        </Heading>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          {`I almost never get asked about what's my setup is or what I use.
          Nonetheless, here is what I use on daily basis.`}
        </Text>
        <Heading size="md" as="h2" pt={8}>
          2021
        </Heading>

        <List spacing={4}>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.youtube.com/watch?v=WrhQKt5-QY8">
              Build Low-Code Apps using Hasura & Draftbit
            </ExternalLink>
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.youtube.com/watch?v=h9kWdOyQrSw">
              Building Attractive UIs with Draftbit at Explore Hacks
            </ExternalLink>
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.youtube.com/watch?v=bIXQYrBd1DE">
              Getting Started with Drafitbit- Aman Mittal at Hack The Mountains
              2.O
            </ExternalLink>
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.youtube.com/watch?v=sSbAuEcjjJA">
              The Rise of No-Code and a Guide to Using Draftbit
            </ExternalLink>
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.youtube.com/watch?v=_HKzhe8f47Y">
              React Native Panel Discussion with Sanket Sahu, Aman Mittal, Evan
              Bacon, Satyajit Sahoo
            </ExternalLink>
          </ListItem>
        </List>
        <Heading size="md" as="h2" pt={8}>
          2020
        </Heading>
        <List spacing={4}>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.youtube.com/watch?v=YIRxTUCY0NQ">
              How to write consistently at Hashnode&#39;s Technical Writing
              Bootcamp
            </ExternalLink>
          </ListItem>
        </List>
        <Heading size="md" as="h2" pt={8}>
          2018
        </Heading>
        <List spacing={4}>
          <ListItem fontSize="lg">
            <ExternalLink href="https://dev.to/reactroundup/rru-006-setting-up-and-getting-used-to-gatsby-with-aman-mittal">
              Setting Up and Getting Used to Gatsby with Charles Max Wood, Cory
              House, Tara Manicsic and Kent C. Dodds
            </ExternalLink>
          </ListItem>
        </List>
      </VStack>
    </>
  );
};

export default SpeakingPage;
