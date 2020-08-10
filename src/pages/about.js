import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/seo';

import {
  Container,
  Box,
  Heading,
  Text,
  ListLink
} from '../styles/GlobalStyles';

const About = () => (
  <Layout>
    <SEO title='About' />
    <Container>
      <Box>
        <Heading>About me</Heading>
        <Text>
          Hi! I'm Aman Mittal, a Software Developer, currently working as an
          independent contract developer. I've a background in Computer Science
          (Bachelor of Technology) and since mid 2016 I've been working as a
          professional with various web and mobile technologies using
          JavaScript, specifically with Node.js, React and React Native (💙
          Expo).
        </Text>
        <Text>
          I am also keen about{' '}
          <strong style={{ color: '#444' }}>
            contributing in open-source{' '}
          </strong>
          . Back in 2018 I made my first open-source contribution by writing a
          Twitter Bot (the original one) in Node.js for{' '}
          <a
            href='https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot'
            target='_blank'
            rel='noopener noreferrer'
          >
            freeCodeCamp
          </a>{' '}
          and{' '}
          <a
            href='https://twitter.com/_100Daysofcode'
            target='_blank'
            rel='noopener noreferrer'
          >
            #100DaysOfCode campaign
          </a>{' '}
          which in recent years has gained a lot of attention (
          <strong style={{ color: '#333' }}>90k+ followers</strong>) among
          people who are getting into web development.
        </Text>
        <Text>
          Over the years I've made some contributions to some projects and
          organizations such as Node.js, Gatsbyjs and freeCodeCamp both as a
          contributor and maintainer. In past, I've been awarded among{' '}
          <a
            href='https://medium.freecodecamp.org/announcing-our-freecodecamp-2018-top-contributor-award-winners-861da08a77e1'
            target='_blank'
            rel='noopener noreferrer'
          >
            Top 200 Open Source Contributors by freeCodeCamp.org in 2018
          </a>
          .
        </Text>

        <Heading>Me & Technical writing</Heading>
        <Text>
          I started my blogging journey as a technical writer at{' '}
          <a
            href='https://medium.com/@amanhimself'
            target='_blank'
            rel='noopener noreferrer'
          >
            Medium
          </a>{' '}
          in 2018 where I've got over{' '}
          <a
            href='https://twitter.com/amanhimself/status/1285554115464982528'
            target='_blank'
            rel='noopener noreferrer'
          >
            2 Million+ views
          </a>
          🎉. I love writing about code and documenting what I learn. I
          specifically{' '}
          <a
            href='https://amanhimself.dev/tutorials/'
            target='_blank'
            rel='noopener noreferrer'
          >
            write
          </a>{' '}
          on JavaScript frameworks including Node.js, React, React Native, and
          Firebase.
        </Text>

        <ul style={{ color: '#718096' }}>
          <li>
            I've written over <strong style={{ color: '#333' }}>150+ </strong>
            blog posts and complete tutorials
          </li>
          <li>
            Written for <strong style={{ color: '#333' }}>20+ </strong>{' '}
            organizational blogs and tech publications
          </li>
          <li>
            Fulfilled the responsibility of creating a curriculum for an online
            educative learning platform Zeolearn on Node.js.
          </li>
        </ul>

        <Text>Some of the notable publications I've written are:</Text>
        <ul style={{ color: '#718096' }}>
          <li>
            <ListLink
              href='https://www.freecodecamp.org/news/author/amanhimself/'
              target='_blank'
              rel='noopener noreferrer'
            >
              freeCodeCamp
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://blog.expo.io/@amanhimself'
              target='_blank'
              rel='noopener noreferrer'
            >
              Expo.io
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://blog.crowdbotics.com/author/amanhimself/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Crowdbotics
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://blog.logrocket.com/author/amanmittal/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Logrocket
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://heartbeat.fritz.ai/@amanhimself'
              target='_blank'
              rel='noopener noreferrer'
            >
              Heartbeat.Fritz.ai
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://blog.jscrambler.com/author/aman-mittal'
              target='_blank'
              rel='noopener noreferrer'
            >
              Jscrambler
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://www.sitepoint.com/premium/books/serverless-react-native-app-development-with-aws-amplify'
              target='_blank'
              rel='noopener noreferrer'
            >
              Sitepoint
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://community.draftbit.com/u/amanhimself/activity/topics'
              target='_blank'
              rel='noopener noreferrer'
            >
              Draftbit
            </ListLink>
          </li>
        </ul>

        <Text>
          Other notable publications: Hackernoon, Rising Stack, Codeburst.io,
          ZeoLearn.com, Art + Marketing, 42hire.com, ITNext, Eduonix, The
          Startup, JavaBeginnersTutorial.com, Alligator.io, LevelUp
          Gitconnected, Better Programming, React Native Training, Pusher,
          Instamobile, Newline.co (by Fullstack.io), Soshace & HarperDB.
        </Text>

        <Text>
          Currently, I am also writing a{' '}
          <a
            href='https://tinyletter.com/amanhimself'
            target='_blank'
            rel='noopener noreferrer'
          >
            bi-weekly newsletter
          </a>{' '}
          and sharing any new content I create on React Native, Expo and web
          development in general. More than{' '}
          <strong style={{ color: '#333' }}>1000+ devs</strong> have signed up.
        </Text>
        <Heading>Work History</Heading>
        <strong style={{ color: '#718096' }}>
          Contract Developer (2018- Now)
        </strong>
        <ul style={{ color: '#718096' }}>
          <li>
            Crowdbotics (Full-Stack role, Technical Writer, 2018 - Present)
          </li>
          <li>Hearbeat (Technical Writer, 2019 - 2020)</li>
          <li>JScrambler (Technical Writer, 2018 - Present)</li>
        </ul>
        <span style={{ color: '#718096' }}>
          Freelance (Fullstack role, 2017 - 2019)
        </span>
        <ul style={{ color: '#718096' }}>
          <li>
            Danco Solutions ( Responsible for building a Fullstack app using
            Node.js and Reactjs)
          </li>
          <li>
            Zeolearn (Responsible for creating a curriculum for an online course
            on Node.js)
          </li>
          <li>
            Huksa Private Networks (Responsible for creating backend APIs using
            Node.js and JavaScript)
          </li>
          <li>
            JBL Technologies (Responsible for creating backend APIs using
            Node.js and JavaScript)
          </li>
        </ul>
        <span style={{ color: '#718096' }}>
          Unique Touch Solutions (2016 - 2017)
        </span>
        <ul style={{ color: '#718096' }}>
          <li>
            Associate Software Engineer/Node.js Developer (Worked on Web based
            applications with primary focus on Node.js. Fulfilled responsibility
            of writing reusable, testable and efficient code)
          </li>
        </ul>
        <Heading>Projects</Heading>
        <ul style={{ color: '#718096' }}>
          <li>
            <ListLink
              href='https://expo.io/@amanhimself/quarantinepro'
              target='_blank'
              rel='noopener noreferrer'
            >
              Quarantine Pro:
            </ListLink>{' '}
            The app is built in{' '}
            <strong style={{ color: '#444' }}>React Native and Expo</strong> all
            about how long you have been quarantining. As a user, you input the
            date when you started isolating and the app is going to display a
            fun message to tell you how far you have come in the quarantine
            “game”. This app is built for a fun project for{' '}
            <strong style={{ color: '#444' }}>Jscrambler blog</strong> and
            demonstrates various Expo modules such fonts (useFonts hook), and
            other modules like date-time-picker-modal, momentjs and using a
            custom font.
          </li>
          <li>
            <ListLink
              href='https://github.com/expo-community/expo-firebase-starter'
              target='_blank'
              rel='noopener noreferrer'
            >
              expo-firebase-starter:
            </ListLink>{' '}
            currently building and maintaining a quicker way to start with Expo
            + Firebase projects. Based on latest Expo SDK, provides. Part of
            expo-community.
          </li>
          <li>
            <ListLink
              href='https://github.com/amandeepmittal/gatsby-bulma-quickstart'
              target='_blank'
              rel='noopener noreferrer'
            >
              gatsby-bulma-quickstart:
            </ListLink>{' '}
            a quick Way to bootstrap your next Gatsby + Bulma site.
          </li>
          <li>
            <ListLink
              href='https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot'
              target='_blank'
              rel='noopener noreferrer'
            >
              100DaysOfCode:
            </ListLink>{' '}
            Twitter bot for #100DaysOfCode community hosted by freeCodeCamp.
            Written in Node.js.
          </li>
          <li>
            <ListLink
              href='https://github.com/amandeepmittal/projectEuler100-twitter-bot'
              target='_blank'
              rel='noopener noreferrer'
            >
              ProjectEuler100
            </ListLink>{' '}
            Twitter bot for #ProjectEuler100 community hosted by freeCodeCamp.
            Written in Node.js.
          </li>
          <li>
            <ListLink
              href='https://github.com/amandeepmittal/awscertified-twitter-bot'
              target='_blank'
              rel='noopener noreferrer'
            >
              AWSCertifiedBot:
            </ListLink>{' '}
            Twitter bot for #AWSCertified community hosted by freeCodeCamp.
            Written in Node.js.
          </li>
        </ul>
        <Heading>Contact</Heading>
        <Text>
          If you are interested in working with me just drop me a short mail at{' '}
          <strong style={{ color: '#333' }}>amanmittal.work@gmail.com</strong>
        </Text>
      </Box>
    </Container>
  </Layout>
);

export default About;
