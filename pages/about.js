import React from 'react'
import {NextSeo} from 'next-seo';
import Image from 'next/image';

import {TWHeading} from '../components/ui/Heading';
import TWBlogCard from '../components/ui/TWBlogCard';
import TWContainer from '../components/ui/TWContainer';
import TWCustomLink from '../components/ui/TWCustomLink';
import {BlogConfig, SavedTweets} from '../blog-config.js'

const url = 'https://amanhimself.dev/';
const title = 'Blog – Aman Mittal';
const description = 'Software developer and React Native enthusiast.';

const AboutPage = () => {  
  return (
  <>
    <NextSeo 
        title={title} 
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
        }} 
    />
    <TWContainer as="main" noMargin className="md:px-4 space-y-14">
      <div className="flex flex-col max-w-screen-lg mx-8 items-center justify-center">
        <TWHeading size="h1">About Me</TWHeading>
        <picture className="relative flex-none w-40 h-40 rounded-full shadow-xl md:h-44 md:w-44 mb-2">
        <Image
          className="absolute flex-none object-cover w-40 h-40 rounded-full md:h-44 md:w-44"
          src="/static/avatar.jpg"
          alt="Me"
          width={176}
          height={176}
        />        
      </picture>
        <p className="text-lg text-gray-600 my-4">
          Hi, I'm Aman. I currently live in New Delhi, India and I'm
              currently working as an independent contract developer and a
              part-time technical writer. I've a background in Computer Science
              and since 2017 I've been working as a professional with various
              web and mobile technologies such as Node.js, React, React Native
              and Expo.
        </p>
        <p className="text-lg text-gray-600 my-4">
          I love contributing in open-source as much as my knowledge allows
              me to. Back in 2018 I made my first open-source contribution by
              writing a Twitter Bot (the original one) in Node.js for{' '}
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to={BlogConfig.twitterBotRepo}>
                freeCodeCamp{' '}
              </TWCustomLink>
              and{' '}
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to={BlogConfig.hundredDaysOfCodeBot}>
                #100DaysOfCode
              </TWCustomLink>{' '}
              campaign which in recent years has gained a lot of attention
              (100k+ followers) among people who are getting into web
              development.
        </p>
        <p className="text-lg text-gray-600 my-4">
          Over the years I've made some contributions to some projects and
              organizations such as Node.js, Gatsbyjs and freeCodeCamp both as a
              contributor and maintainer. In past, I've been awarded among{' '}
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to={SavedTweets.topContributorFreeCodeCamp2018}>
                Top 200 Open Source Contributors by freeCodeCamp.org in 2018
              </TWCustomLink>
              .
        </p>
        <p className="text-lg text-gray-600 my-4">
          When I am not writing code or working on a blog post, I'm probably
              spending my time either{' '}
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to={BlogConfig.goodreads}>
                reading a book
              </TWCustomLink>{' '}
              or <TWCustomLink className="underline text-purple-600 hover:no-underline" to={BlogConfig.instagram}>
                taveling
              </TWCustomLink>.
        </p>
        <TWHeading size="h1">Me & Technical Writing</TWHeading>
        <p className="text-lg text-gray-600 my-4">
         I started my writing on{' '}
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to={BlogConfig.medium}>
                Medium
              </TWCustomLink>{' '}in 2017, sharing what I was learning. I've got over{' '}
              or <TWCustomLink className="underline text-purple-600 hover:no-underline" to={SavedTweets.twoMillionViews}>
                2 Million+ views
              </TWCustomLink>&nbsp;&#127881; on Medium. I love writing about code and documenting what I
              learn. I specifically write on JavaScript frameworks such as
              Node.js, React, and React Native.
        </p>
        <p className="text-lg text-gray-600 my-4">
         I started my writing on{' '}
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to={BlogConfig.medium}>
                Medium
              </TWCustomLink>{' '}in 2017, sharing what I was learning. I've got over{' '}
              or <TWCustomLink className="underline text-purple-600 hover:no-underline" to={SavedTweets.twoMillionViews}>
                2 Million+ views
              </TWCustomLink>&nbsp;&#127881; on Medium. I love writing about code and documenting what I
              learn. I specifically write on JavaScript frameworks such as
              Node.js, React, and React Native.
              <ul class="list-inside list-disc">
          <li className="text-gray-600 my-4">Written over <strong style={{ color: '#333' }}>150+ </strong>
                  blog posts and complete tutorials.</li>
                  <li className="text-gray-600 my-4"> Written for <strong style={{ color: '#333' }}>20+ </strong>{' '}
                  organizational blogs and tech publications.</li>
                  <li className="text-gray-600 my-4">Fulfilled the responsibility of creating a curriculum for an
                  online educative learning platform Zeolearn on Node.js.</li>
        </ul>
        </p>        
        <p className="text-lg text-gray-600 my-4 w-full">
          Some of the notable publications I've written are:        
        <ul class="list-inside list-disc">
          <li>            
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to="https://www.freecodecamp.org/news/author/amanhimself/">
                freeCodeCamp
              </TWCustomLink>
            </li>
            <li>  
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to="https://blog.expo.io/@amanhimself">
                Expo.io
              </TWCustomLink>
              </li>
              <li>
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to="https://blog.crowdbotics.com/author/amanhimself/">
                Crowdbotics
              </TWCustomLink>
              </li>
              <li>
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to="https://blog.logrocket.com/author/amanmittal/">
                Logrocket
              </TWCustomLink>
              </li>
              <li>
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to="https://heartbeat.fritz.ai/@amanhimself">
                Heartbeat.Fritz.ai
              </TWCustomLink>
              </li>
              <li>
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to="https://blog.jscrambler.com/author/aman-mittal">
                Jscrambler
              </TWCustomLink>
              </li>
              <li>
              <TWCustomLink className="underline text-purple-600 hover:no-underline" to="https://community.draftbit.com/u/amanhimself/activity/topics">
                Draftbit
              </TWCustomLink>
          </li>  
        </ul>
        </p>
        <p className="text-lg text-gray-600 my-4">
          <strong style={{ color: '#333' }}>Other notable publications:</strong> Hackernoon, Rising Stack,
              Codeburst.io, ZeoLearn.com, Art + Marketing, 42hire.com, ITNext,
              Eduonix, The Startup, JavaBeginnersTutorial.com, Alligator.io,
              LevelUp Gitconnected, Better Programming, React Native Training,
              Pusher, Instamobile, Newline.co (by Fullstack.io), Soshace &
              HarperDB.
        </p>
        <p className="text-lg text-gray-600 my-4">
          Currently, I am also writing a{' '}
          <TWCustomLink className="underline text-purple-600 hover:no-underline" to={BlogConfig.newsletter}>
                bi-weekly newsletter
              </TWCustomLink>{' '}
              and sharing any new content I create on React Native, Expo,
              React.js, Node.js and Web Development in general. More than 1000+ devs have
              signed up.

        </p>
        <TWHeading size="h1">Work History</TWHeading>
        <p className="text-lg text-gray-900 my-4 w-full">
          Contract Developer (2018- Now)
          <ul class="list-inside list-disc">
          <li className="text-gray-600 my-4">Crowdbotics (Fullstack Consultant & Technical Writer, 2018 -
                  Present)</li>
                  <li className="text-gray-600 my-4">Heartbeat (React Native Technical Writer, 2019 - 2020)</li>
                  <li className="text-gray-600 my-4">Jscrambler (React Native Technical Writer, 2018 - Present)</li>
        </ul>
        </p>
        <p className="text-lg text-gray-900 my-4 w-full">
          Freelance (Fullstack role, 2017 - 2018)
          <ul class="list-inside list-disc">
          <li className="text-gray-600 my-4">Danco Solutions ( Responsible for building a Fullstack app
                  using Node.js and Reactjs)</li>
                  <li className="text-gray-600 my-4">Zeolearn (Responsible for creating a curriculum for an online
                  course on Node.js)</li>
                  <li className="text-gray-600 my-4">JBL Technologies (Responsible for creating backend APIs using
                  Node.js and JavaScript)</li>
        </ul>
        </p>
<p className="text-lg text-gray-900 my-4 w-full">
          Node.js Developer (2016 - 2017)
          <ul class="list-inside list-disc">
          <li className="text-gray-600 my-4">Unique Touch Solutions (Worked on Web
                  based applications with primary focus on Node.js. Fulfilled
                  responsibility of writing reusable, testable and efficient
                  code)</li>                  
        </ul>
        </p>        
      </div>
    </TWContainer>  
  </>
  )
}

export default AboutPage;