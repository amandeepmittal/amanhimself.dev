import React from 'react';
import {
  Heading,
  Text,
  Flex,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  ButtonGroup,
  Link
} from '@chakra-ui/core';
import { TiPencil } from 'react-icons/ti';
import { SiGithub, SiExpo, SiApplepodcasts, SiHashnode } from 'react-icons/si';
import { NextSeo } from 'next-seo';

import Container from '../components/Container';
import CustomLink from '../components/CustomLink';
import ProjectCard from '../components/ProjectCard';
import SocialLinks from '../components/SocialLinks';
import BlogPost from '../components/BlogPost';

import { frontMatter as blogPosts } from './blog/**/*.mdx';

const url = 'https://amanhimself.dev/';
const title = 'About – Aman Mittal';

const Index = () => {
  const secondaryTextColor = 'gray.800';

  const filteredBlogPosts = blogPosts
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    )
    .slice(0, 10);

  return (
    <>
      {/* SEO COMPONENT GOES HERE */}
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      <Container>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
          >
            <Heading letterSpacing="tight" mb={2} as="h1" size="xl">
              👋 Hey! I’m Aman Mittal
            </Heading>
            <Heading letterSpacing="tight" mb={2} as="h1" size="lg">
              I’m a software developer and a technical writer.
            </Heading>
            <SocialLinks />
            <Text color={secondaryTextColor} fontSize="lg" mb={4}>
              This website is a collection of all posts I've written in my
              journey of learning web and mobile development. You can read the{' '}
              <CustomLink href="/blog">blog</CustomLink> or learn more about me
              below.
            </Text>
            <ButtonGroup spacing={4}>
              <Button
                leftIcon="email"
                backgroundColor="purple.400"
                color="white"
                variant="solid"
                _hover={{
                  backgroundColor: 'purple.300'
                }}
              >
                <Link
                  href="https://amanhimself.substack.com/"
                  isExternal
                  _hover={{
                    textDecoration: 'none'
                  }}
                >
                  Subscribe Newsletter
                </Link>
              </Button>
            </ButtonGroup>
          </Flex>
          {/* Stack of Most Popular Blog posts/Latest Blog Posts will go here*/}
          <Heading letterSpacing="tight" mt={4} mb={2} as="h3" size="lg">
            Latest Posts
          </Heading>
          {filteredBlogPosts.map(frontMatter => (
            <BlogPost key={frontMatter.title} {...frontMatter} />
          ))}
          <Heading letterSpacing="tight" mt={4} mb={2} as="h2" size="xl">
            About Me
          </Heading>
          <Text color={secondaryTextColor} fontSize="md">
            Hi, I'm Aman. I currently live in New Delhi, India and I'm currently
            working as an independent contract developer and a part-time
            technical writer. I've a background in Computer Science and since
            2017 I've been working as a professional with various web and mobile
            technologies such as Node.js, React, React Native and Expo.
          </Text>
          <Text color={secondaryTextColor} mb={2} fontSize="md">
            I love contributing in open-source as much as my knowledge allows me
            to. Back in 2018 I made my first open-source contribution by writing
            a Twitter Bot (the original one) in Node.js for{' '}
            <CustomLink href="https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot">
              freeCodeCamp{' '}
            </CustomLink>
            and{' '}
            <CustomLink href="https://twitter.com/_100Daysofcode">
              #100DaysOfCode
            </CustomLink>{' '}
            campaign which in recent years has gained a lot of attention (100k+
            followers) among people who are getting into web development.
          </Text>
          <Text color={secondaryTextColor} mb={2} fontSize="md">
            Over the years I've made some contributions to some projects and
            organizations such as Node.js, Gatsbyjs and freeCodeCamp both as a
            contributor and maintainer. In past, I've been awarded among{' '}
            <CustomLink href="https://www.freecodecamp.org/news/announcing-our-freecodecamp-2018-top-contributor-award-winners-861da08a77e1/">
              Top 200 Open Source Contributors by freeCodeCamp.org in 2018
            </CustomLink>
            .
          </Text>
          <Text color={secondaryTextColor} mb={2} fontSize="md">
            When I am not writing code or working on a blog post, I'm probably
            spending my time either{' '}
            <CustomLink href="https://www.goodreads.com/author/show/17657541.Aman_Mittal">
              reading a book
            </CustomLink>{' '}
            or traveling.
          </Text>
          <Heading letterSpacing="tight" mt={8} mb={2} as="h2" size="xl">
            Me & Technical Writing
          </Heading>
          <Text color={secondaryTextColor} fontSize="md">
            I started my writing on{' '}
            <CustomLink href="https://medium.com/@amanhimself">
              Medium
            </CustomLink>{' '}
            in 2017, sharing what I was learning. I've got over{' '}
            <CustomLink href="https://twitter.com/amanhimself/status/1285554115464982528">
              {' '}
              2 Million+ views
            </CustomLink>{' '}
            🎉 on Medium. I love writing about code and documenting what I
            learn. I specifically write on JavaScript frameworks such as
            Node.js, React, and React Native.
          </Text>
          <Text color={secondaryTextColor} mb={2} fontSize="md">
            <List styleType="disc">
              <ListItem>
                Written over <strong style={{ color: '#333' }}>150+ </strong>
                blog posts and complete tutorials.
              </ListItem>
              <ListItem>
                Written for <strong style={{ color: '#333' }}>20+ </strong>{' '}
                organizational blogs and tech publications.
              </ListItem>
              <ListItem>
                Fulfilled the responsibility of creating a curriculum for an
                online educative learning platform Zeolearn on Node.js.
              </ListItem>
            </List>
          </Text>
          <Text color={secondaryTextColor} mb={2} fontSize="md">
            Some of the notable publications I've written are:
            <List spacing={2} mb={4}>
              <ListItem>
                <ListIcon icon={TiPencil} color="gray.500" />
                <CustomLink href="https://www.freecodecamp.org/news/author/amanhimself/">
                  freeCodeCamp
                </CustomLink>
              </ListItem>
              <ListItem>
                <ListIcon icon={TiPencil} color="gray.500" />
                <CustomLink href="https://blog.expo.io/@amanhimself">
                  Expo.io
                </CustomLink>
              </ListItem>
              <ListItem>
                <ListIcon icon={TiPencil} color="gray.500" />
                <CustomLink href="https://blog.expo.io/@amanhimself">
                  Crowdbotics
                </CustomLink>
              </ListItem>
              <ListItem>
                <ListIcon icon={TiPencil} color="gray.500" />
                <CustomLink href="https://blog.logrocket.com/author/amanmittal/">
                  Logrocket
                </CustomLink>
              </ListItem>
              <ListItem>
                <ListIcon icon={TiPencil} color="gray.500" />
                <CustomLink href="https://heartbeat.fritz.ai/@amanhimself">
                  Heartbeat.Fritz.ai
                </CustomLink>
              </ListItem>
              <ListItem>
                <ListIcon icon={TiPencil} color="gray.500" />
                <CustomLink href="https://blog.jscrambler.com/author/aman-mittal">
                  Jscrambler
                </CustomLink>
              </ListItem>
              <ListItem>
                <ListIcon icon={TiPencil} color="gray.500" />
                <CustomLink href="https://www.sitepoint.com/premium/books/serverless-react-native-app-development-with-aws-amplify">
                  Sitepoint
                </CustomLink>
              </ListItem>
              <ListItem>
                <ListIcon icon={TiPencil} color="gray.500" />
                <CustomLink href="https://community.draftbit.com/u/amanhimself/activity/topics">
                  Draftbit
                </CustomLink>
              </ListItem>
            </List>
          </Text>
          <Text color={secondaryTextColor} mb={2} fontSize="md">
            Other notable publications: Hackernoon, Rising Stack, Codeburst.io,
            ZeoLearn.com, Art + Marketing, 42hire.com, ITNext, Eduonix, The
            Startup, JavaBeginnersTutorial.com, Alligator.io, LevelUp
            Gitconnected, Better Programming, React Native Training, Pusher,
            Instamobile, Newline.co (by Fullstack.io), Soshace & HarperDB.
          </Text>
          <Text color={secondaryTextColor} mb={2} fontSize="md">
            Currently, I am also writing a{' '}
            <CustomLink href="https://amanhimself.substack.com/">
              bi-weekly newsletter
            </CustomLink>{' '}
            and sharing any new content I create on React Native, Expo, Reactjs
            and Web Development in general. More than 1000+ devs have signed up.
          </Text>
          <Heading letterSpacing="tight" mt={8} mb={2} as="h2" size="xl">
            Work History
          </Heading>
          <Text color={secondaryTextColor} mb={2} fontSize="md">
            <Text mb={2} color="gray.600">
              Contract Developer (2018- Now)
            </Text>
            <List styleType="disc" mb={3}>
              <ListItem>
                Crowdbotics (Full-Stack role, Technical Writer, 2018 - Present)
              </ListItem>
              <ListItem>Hearbeat (Technical Writer, 2019 - 2020)</ListItem>
              <ListItem>JScrambler (Technical Writer, 2018 - Present)</ListItem>
            </List>
            <Text mb={2} color="gray.600">
              Freelance (Fullstack role, 2017 - 2019)
            </Text>
            <List styleType="disc" mb={3}>
              <ListItem>
                Danco Solutions ( Responsible for building a Fullstack app using
                Node.js and Reactjs)
              </ListItem>
              <ListItem>
                Zeolearn (Responsible for creating a curriculum for an online
                course on Node.js)
              </ListItem>
              <ListItem>
                Huksa Private Networks (Responsible for creating backend APIs
                using Node.js and JavaScript)
              </ListItem>
              <ListItem>
                JBL Technologies (Responsible for creating backend APIs using
                Node.js and JavaScript)
              </ListItem>
            </List>
            <Text mb={2} color="gray.600">
              Unique Touch Solutions (2016 - 2017)
            </Text>
            <List styleType="disc" mb={3}>
              <ListItem>
                Associate Software Engineer/Node.js Developer (Worked on Web
                based applications with primary focus on Node.js. Fulfilled
                responsibility of writing reusable, testable and efficient
                code).
              </ListItem>
            </List>
          </Text>
          <Heading letterSpacing="tight" mt={8} mb={2} as="h2" size="xl">
            Projects
          </Heading>
          <ProjectCard
            title="Quarantine Pro"
            description="Built using React Native and Expo, about how long you have been quarantining. As a user, you input the date when you started isolating and the app is going to display a fun message to tell you how far you have come in the quarantine 'game'."
            href="https://expo.io/@amanhimself/quarantinepro"
            icon={SiExpo}
          />
          <ProjectCard
            title="expo-firebase-starter"
            description="Currently building and maintaining a quicker way to start with Expo + Firebase projects. Based on latest Expo SDK, provides. Part of expo-community."
            href="https://github.com/expo-community/expo-firebase-starter"
            icon={SiExpo}
          />
          <ProjectCard
            title="100DaysOfCode"
            description="Twitter bot for #100DaysOfCode community hosted by freeCodeCamp. Written in Node.js and currently hosted on a private repository."
            href="https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot"
            icon={SiGithub}
          />
          <ProjectCard
            title="gatsby-bulma-quickstart"
            description="A quick Way to bootstrap a Gatsby project with Bulma CSS. Supports responsive design, Google Analytics integration and few more."
            href="https://github.com/amandeepmittal/gatsby-bulma-quickstart"
            icon={SiGithub}
          />
          <Heading letterSpacing="tight" mt={8} mb={2} as="h2" size="xl">
            Currently Using
          </Heading>
          <List mb={2} styleType="disc" color={secondaryTextColor}>
            <ListItem>Computer: MacBook Air 2017</ListItem>
            <ListItem>Editor: Visual Studio Code</ListItem>
            <ListItem>Static Site Generator: Next.js</ListItem>
            <ListItem>Syntax Highlighting: Prismjs</ListItem>
            <ListItem>Code Syntax Theme: fairyFloss, Morgan.codes</ListItem>
            <ListItem>Terminal: iTerm with ZSH shell</ListItem>
            <ListItem>Manage Blog posts pipeline: Notion</ListItem>
            <ListItem>Newsletter: Substack (free)</ListItem>
          </List>
          <Heading letterSpacing="tight" mt={8} mb={2} as="h2" size="xl">
            Speaking
          </Heading>
          <ProjectCard
            title="How to write consistently?"
            description="Talked at Hashnode's Technical Writing Bootcamp, a free virtual Bootcamp to help beginner technical writers to improve their writing skill."
            href="https://hashnode.com/bootcamp/batch-2"
            icon={SiHashnode}
          />
          <Heading letterSpacing="tight" mt={8} mb={2} as="h2" size="xl">
            Guest Podcast Appearance & Interviews
          </Heading>
          <ProjectCard
            title="React Round Up 006"
            description="Setting Up and Getting Used to Gatsby with Charles Max Wood, Cory House, Tara Manicsic and Kent C Dodds"
            href="https://dev.to/reactroundup/rru-006-setting-up-and-getting-used-to-gatsby-with-aman-mittal"
            icon={SiApplepodcasts}
          />
          <ProjectCard
            title="Dev Bites"
            description=" Development Trends on the Horizon with Hoss on remote work and serverless - hosted by Hoss.com"
            href="https://www.hoss.com/blog/dev-bites-development-trends-on-the-horizon-aman-mittal"
            icon={TiPencil}
          />
          <Heading letterSpacing="tight" mt={8} mb={2} as="h2" size="xl">
            Countries I've Visited (8)
          </Heading>
          <Text mb={2} color={secondaryTextColor}>
            I love to travel.
          </Text>
          <Text mb={2}>🇦🇪 🇵🇱 🇨🇿 🇦🇹 🇸🇰 🇩🇪 🇧🇪 🇳🇱</Text>
          <Heading letterSpacing="tight" mt={8} mb={2} as="h2" size="xl">
            Questions?
          </Heading>
          <Text mb={2} color={secondaryTextColor}>
            If you have any questions or if you are looking forward to
            collaborate and would like to know more, drop me an email at{' '}
            <CustomLink href="mailto:amanmittal.work@gmail.com">
              amanmittal.work@gmail.com
            </CustomLink>
          </Text>
        </Stack>
      </Container>
    </>
  );
};

export default Index;
