import type { NextPage } from 'next';
import {
  VStack,
  Heading,
  Text,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

import { DocumentHead, ExternalLink } from '../src/components';

const AboutPage: NextPage = () => {
  return (
    <>
      <DocumentHead pageTitle="Aman Mittal - About" postPath="/about" />
      <VStack spacing={3} alignItems="flex-start" w="full" as="section" pt={28}>
        <Heading size="lg" as="h1">
          About Me
        </Heading>
        <small>Last Update: January 4, 2022</small>
        <Text lineHeight="175%" as="h2" fontSize="lg" pt={2}>
          Hi! My name is Aman Mittal. Currently working as a Senior Content
          Developer at{' '}
          <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>. Before
          that, I&#39;ve been working as a independent contract developer and a
          technical writer.
        </Text>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          I run a{' '}
          <ExternalLink href="https://www.getrevue.co/profile/amanhimself">
            bi-weekly newsletter
          </ExternalLink>{' '}
          and love sharing and helping people become better developers.
        </Text>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          When I am not writing code or working on a blog post, I&#39;m probably
          spending my time either{' '}
          <ExternalLink href="https://www.goodreads.com/author/show/17657541.Aman_Mittal">
            reading a book
          </ExternalLink>{' '}
          or{' '}
          <ExternalLink href="https://www.instagram.com/amanhimselfcodes/">
            traveling.
          </ExternalLink>
        </Text>

        <Heading size="lg" as="h1" pt={8}>
          Open Source & Me
        </Heading>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          I love contributing to Open Source.
        </Text>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          Back in 2018 I made my first open-source contribution by writing a
          Twitter Bot (the original one) in Node.js for{' '}
          <ExternalLink href="https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot">
            freeCodeCamp
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://twitter.com/_100Daysofcode">
            #100DaysOfCode
          </ExternalLink>{' '}
          campaign which in recent years has gained a lot of attention (150k+
          followers) among people who are getting into web development.
        </Text>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          Over the years I&#39;ve made some contributions to some projects and
          organizations such as Node.js, Gatsbyjs and freeCodeCamp both as a
          contributor and maintainer. In past, I&#39;ve been awarded among{' '}
          <ExternalLink href="https://www.freecodecamp.org/news/announcing-our-freecodecamp-2018-top-contributor-award-winners-861da08a77e1/">
            Top 200 Open Source Contributors by freeCodeCamp.org in 2018.
          </ExternalLink>
        </Text>

        <Heading size="lg" as="h1" pt={8}>
          Technical Writing
        </Heading>
        <Text lineHeight="175%" as="h2" fontSize="lg">
          I specifically write on JavaScript frameworks such as Node.js,
          Reactjs, and React Native (Expo).
        </Text>
        <List spacing={4}>
          <ListItem fontSize="lg">
            <ListIcon as={MdCheckCircle} color="green.500" />
            Started Writing on{' '}
            <ExternalLink href="https://medium.com/@amanhimself">
              Medium
            </ExternalLink>{' '}
            in 2017.
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={MdCheckCircle} color="green.500" />
            <ExternalLink href="https://twitter.com/amanhimself/status/1285554115464982528">
              On July 21, 2020
            </ExternalLink>{' '}
            reached a milestone of <strong>2 million + views</strong> on Medium.
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={MdCheckCircle} color="green.500" />
            In December 2020, recognized as a Distinguished author and a
            moderator by{' '}
            <ExternalLink href="https://dev.to/amanhimself">
              Dev.to
            </ExternalLink>
            .
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={MdCheckCircle} color="green.500" />
            In 2021, one of my post on{' '}
            <ExternalLink href="https://amanhimself.dev/blog/firebase-authentication-with-expo/">
              integrating Firebase auth in an Expo app
            </ExternalLink>{' '}
            was recommended as an official resource by{' '}
            <ExternalLink href="https://devlibrary.withgoogle.com/products/firebase">
              Google&#39;s Dev Library
            </ExternalLink>
            .
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={MdCheckCircle} color="green.500" />
            By 2022, Worked with more than 25+ organizations and tech
            publications and have written over more than 100+ articles and
            tutorials.
          </ListItem>
        </List>
        <Text lineHeight="175%" as="h2" fontSize="lg" pt={2}>
          Some of the publications I&#39;ve worked with:
        </Text>
        <List spacing={4}>
          <ListItem>
            <ExternalLink href="https://blog.logrocket.com/author/amanmittal/">
              LogRocket
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://www.freecodecamp.org/news/author/amanhimself/">
              freeCodeCamp
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://blog.crowdbotics.com/author/amanhimself/">
              Crowdbotics
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://blog.expo.dev/building-a-minimalist-weather-app-with-react-native-and-expo-fe7066e02c09">
              Expo.io
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://blog.jscrambler.com/author/aman-mittal">
              Jscrambler
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://heartbeat.fritz.ai/@amanhimself">
              Heartbeat.fritz.ai
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://community.draftbit.com/u/amanhimself/activity/topics">
              Draftbit
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://dzone.com/users/4503532/amanhimself.html">
              Dzone
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://blog.openreplay.com/authors/aman-mittal">
              Open Replay
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://harperdb.io/product/featured-projects/rest-api-with-node-js/?utm_source=amanmittal">
              HarperDB
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://hackernoon.com/u/amanhimself">
              Hackernoon
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://www.digitalocean.com/community/tutorials/react-geolocation-react-native">
              Alligator.io/Digital Ocean
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://www.newline.co/@amandeepmittal/how-to-build-react-native-apps-with-graphql-and-apollo--d74eb12e">
              Newline.co
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://medium.com/geekculture/11-best-no-code-and-low-code-back-ends-for-2021-138066ca81f6">
              Geek Culture
            </ExternalLink>
          </ListItem>
          <ListItem>
            <ExternalLink href="https://javascript.plainenglish.io/create-a-custom-hook-for-show-hide-password-visibility-in-react-native-db184a48126e">
              JavaScript Plain English
            </ExternalLink>
          </ListItem>
          <ListItem>
            <strong>Other notable publications:</strong> Rising Stack,
            Codeburst.io, ZeoLearn.com, Art + Marketing, 42hire.com, ITNext,
            Eduonix, The Startup, JavaBeginnersTutorial.com, LevelUp
            Gitconnected, Better Programming, React Native Training, Pusher,
            Instamobile, & Soshace.
          </ListItem>
        </List>
        <Heading size="lg" as="h1" pt={8}>
          Work History
        </Heading>
        <List spacing={4}>
          <ListItem>🥑 Developer Advocate at Draftbit (2021 - 2022)</ListItem>
          <ListItem>
            💻 📝 Contract Developer & Tech Writer
            <List spacing={2}>
              <ListItem>
                Crowdbotics (Fullstack Consultant & Technical Writer, 2018 -
                2021)
              </ListItem>
              <ListItem>Logrocket (Tech Writer, 2020 - Present)</ListItem>
              <ListItem>
                Heartbeat (React Native Technical Writer, 2019 - 2020)
              </ListItem>
              <ListItem>
                Jscrambler (React Native Technical Writer, 2018 - Present)
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            Node.js Developer (2016 - 2017) at Unique Touch Solution
          </ListItem>
        </List>
      </VStack>
    </>
  );
};

export default AboutPage;
