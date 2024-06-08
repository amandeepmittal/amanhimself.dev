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

const AboutPage = () => {
  return (
    <>
      <DocumentHead pageTitle="Aman Mittal - About" postPath="/about" />
      <VStack
        spacing={1.5}
        alignItems="flex-start"
        w="full"
        as="section"
        pt={28}
      >
        <Heading size="lg" as="h1">
          About Me
        </Heading>
        <small>Last Update: Dec 17, 2023</small>
        <Text lineHeight="175%" as="h2" fontSize="lg" pt={2}>
          Hi! My name is Aman Mittal. I am a software developer, and a technical
          writer. I love working with open source technologies and writing about
          what I learn.
        </Text>
        <Text lineHeight="175%" as="h2" fontSize="lg" pt={2}>
          Currently, I&apos;m working on documentation at Expo. Previously,
          I&apos;ve worked as a Developer Advocate at Draftbit, and Senior
          Content Developer at Vercel.
        </Text>
        {/* <Text lineHeight="175%" as="h2" fontSize="lg">
          I write a{' '}
          <ExternalLink href="https://amanhimself.substack.com/">
            newsletter
          </ExternalLink>{' '}
          in which I share my latest tutorials and articles.
        </Text> */}
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
          Work History
        </Heading>
        <List spacing={4}>
          <ListItem>
            🚀 Software consultant and documentation lead at Expo (2022 -
            Present)
          </ListItem>
          <ListItem> 📝 Senior Content Developer at Vercel (2022)</ListItem>
          <ListItem>🥑 Developer Advocate at Draftbit (2021 - 2022)</ListItem>
          <ListItem>
            💻 📝 Software consultant and Tech Writer
            <List spacing={2}>
              <ListItem>Crowdbotics (2018 - 2021)</ListItem>
              <ListItem>Logrocket (Tech Writer, 2020 - 2023)</ListItem>
              <ListItem>
                Heartbeat (React Native Technical Writer, 2019 - 2020)
              </ListItem>
              <ListItem>
                Jscrambler (React Native Technical Writer, 2018 - 2022)
              </ListItem>
            </List>
          </ListItem>
        </List>
        <Heading size="lg" as="h1" pt={8}>
          Open Source & Me
        </Heading>
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
          campaign which in recent years has gained a lot of attention (200k+
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
            In 2019, became an{' '}
            <ExternalLink href="https://amplify.aws/community/contributors">
              AWS Amplify Community contributor
            </ExternalLink>{' '}
            after creating tutorials for AWS Amplify community.
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
            In November, 2021, became got certified from{' '}
            <ExternalLink href="https://dzone.com/users/4503532/amanhimself.html">
              DZone
            </ExternalLink>{' '}
            as a DZone Core member.
          </ListItem>
          <ListItem fontSize="lg">
            <ListIcon as={MdCheckCircle} color="green.500" />
            By 2022, worked with more than 30+ organizations and tech
            publications and have written over more than 100+ articles and
            tutorials.
          </ListItem>
        </List>
        <Text lineHeight="175%" as="h2" fontSize="lg" pt={2}>
          Some of the publications I&#39;ve worked with:{' '}
          <ExternalLink href="https://blog.logrocket.com/author/amanmittal/">
            LogRocket
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://jscrambler.com/blog/implementing-infinite-scroll-with-react-query-and-flatlist-in-react-native">
            Jscrambler
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://www.freecodecamp.org/news/author/amanhimself/">
            freeCodeCamp
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://blog.expo.dev/building-a-minimalist-weather-app-with-react-native-and-expo-fe7066e02c09">
            Expo.io
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://blog.sentry.io/authors/aman-mittal">
            Sentry
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://blog.appsignal.com/authors/aman-mittal">
            AppSignal
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://blog.flycode.com/how-to-use-flycode-to-update-your-react-apps-on-the-fly">
            FlyCode
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://blog.crowdbotics.com/author/amanhimself/">
            Crowdbotics
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://www.educative.io/profile/view/4727790119157760">
            Educative Edpresso
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://heartbeat.fritz.ai/@amanhimself">
            Heartbeat.fritz.ai
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://community.draftbit.com/u/amanhimself/activity/topics">
            Draftbit
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://dzone.com/users/4503532/amanhimself.html">
            Dzone
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://blog.openreplay.com/authors/aman-mittal">
            Open Replay
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://harperdb.io/product/featured-projects/rest-api-with-node-js/?utm_source=amanmittal">
            HarperDB
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://hackernoon.com/u/amanhimself">
            Hackernoon
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://www.digitalocean.com/community/tutorials/react-geolocation-react-native">
            Alligator.io/Digital Ocean
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://www.newline.co/@amandeepmittal/how-to-build-react-native-apps-with-graphql-and-apollo--d74eb12e">
            Newline.co
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://medium.com/geekculture/11-best-no-code-and-low-code-back-ends-for-2021-138066ca81f6">
            Geek Culture
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://javascript.plainenglish.io/create-a-custom-hook-for-show-hide-password-visibility-in-react-native-db184a48126e">
            JavaScript Plain English
          </ExternalLink>
          .
        </Text>
        <Text>
          <strong>Other notable publications and organizations:</strong> Rising
          Stack, Codeburst.io, ZeoLearn.com, Art + Marketing, 42hire.com,
          ITNext, Eduonix, The Startup, JavaBeginnersTutorial.com, LevelUp
          Gitconnected, Better Programming, React Native Training, Pusher,
          Instamobile, Soshace and Transifex Native.
        </Text>
        {/* TODO: Add info about posts listed in Newsletters */}
        <Text lineHeight="175%" as="h2" fontSize="lg" fontWeight="700" pt={2}>
          Some of my blog articles and tutorials have featured in esteemed
          Newsletters:{' '}
          <ExternalLink href="https://nodeweekly.com/issues/190">
            Node Weekly
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://react.statuscode.com/issues/148">
            React Status
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://mobiledevweekly.com/issues/201">
            Mobile Dev Weekly
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://daily.dev/blog/weekly-picks-73-development-posts">
            Daily.dev Weekly Picks
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://issues.mobiledeveloperscafe.com/issues/weekly-issue-33-985474">
            Mobile Developers Café
          </ExternalLink>
          , and{' '}
          <ExternalLink href="https://reactnative.cc/issues/2021/08-17-2021.html">
            React Native Newsletter
          </ExternalLink>
          .
        </Text>
        <Heading size="lg" as="h2" pt={8}>
          Speaking
        </Heading>
        <Heading size="md" as="h2" pt={8}>
          2023
        </Heading>
        <List spacing={4}>
          <ListItem fontSize="lg">
            <ExternalLink href="https://twitter.com/appjsconf/status/1653746880738742272">
              Developing and deploying React Native apps with Expo and EAS
              (Workshop at App.js 2023)
            </ExternalLink>
          </ListItem>
        </List>
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
              Podcast: Setting Up and Getting Used to Gatsby with Charles Max
              Wood, Cory House, Tara Manicsic and Kent C. Dodds
            </ExternalLink>
          </ListItem>
        </List>
        <Heading size="lg" as="h1" pt={8}>
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
            <ExternalLink href="https://brave.com/">Brave</ExternalLink>- as my
            personal browser. I also use Chrome and sometimes Safari.
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
              CleanShot X
            </ExternalLink>
            - For capturing screenshots on macOS devices.
          </ListItem>
        </List>
        <Text>
          Find out more about what VS Code extensions I regularly use{' '}
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
              M1 Macbook Pro 14&rdquo; 2021
            </ExternalLink>
          </ListItem>
          <ListItem fontSize="lg">
            <ExternalLink href="https://amanhimself.dev/about">
              Desk & Chair
            </ExternalLink>
            - Pretty much, any flat surface.
          </ListItem>
        </List>
        <Heading size="lg" as="h1" pt={8}>
          Awards and recognition
        </Heading>
        <List spacing={4}>
          <ListItem fontSize="lg">
            <ExternalLink href="https://www.noonies.tech/2022/programming/2022-most-authentic-developer-advocate-of-the-year">
              Won Most Authentic Developer Advocate of the Year 2022 at
              #Noonies2022 by Hackernoon
            </ExternalLink>
          </ListItem>
        </List>
      </VStack>
    </>
  );
};

export default AboutPage;
