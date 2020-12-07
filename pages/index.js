import React from 'react';
import { TiPencil } from 'react-icons/ti';
import { SiGithub, SiExpo, SiApplepodcasts, SiHashnode } from 'react-icons/si';
import { NextSeo } from 'next-seo';

import {BlogConfig} from '../blog-config.js'
import TWContainer from '../components/ui/TWContainer';
import TWCustomLink from '../components/ui/TWCustomLink';
import About from '../components/ui/About';
import TWBlogCard from '../components/ui/TWBlogCard';
import { TWHeading } from '../components/ui/Heading';
import TWProjectCard from '../components/ui/TWProjectCard';

import { frontMatter as blogPosts } from './blog/**/*.mdx';

const url = 'https://amanhimself.dev/';
const title = 'Aman Mittal';

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
      {/* Main Container Starts Here */}
      <TWContainer as="main" noMargin className="md:px-4 space-y-14">
        <About />
        {/* Stack of Most Popular Blog posts/Latest Blog Posts will go here*/}
        <div className="flex flex-col max-w-screen-lg mx-8 items-center justify-center">
          <div className="flex flex-row space-around">
            <TWHeading size="h3" className="px-2">Recently Published</TWHeading>
            <p className="text-base mt-14 mb-6 items-center justify-center px-2">
               <TWCustomLink  className="text-gray-700 p-2 rounded-lg	bg-purple-200 hover:no-underline hover:text-purple-600" to='/blog'>
                View All
              </TWCustomLink>
            </p>
          </div>
          {filteredBlogPosts.map(frontMatter => (
            <TWBlogCard key={frontMatter.title} {...frontMatter} />
          ))}
          <TWHeading size="h3">Projects</TWHeading>
          <TWProjectCard
              title="Quarantine Pro"
              description="Built using React Native and Expo, about how long you have been quarantining. As a user, you input the date when you started isolating and the app is going to display a fun message to tell you how far you have come in the quarantine 'game'."
              href="https://expo.io/@amanhimself/quarantinepro"
              icon={<SiExpo/>}              
            />      
            <TWProjectCard
              title="expo-firebase-starter"
              description="Currently building and maintaining a quicker way to start with Expo + Firebase projects. Based on latest Expo SDK, provides. Part of expo-community."
              href="https://github.com/expo-community/expo-firebase-starter"
              icon={<SiExpo/>}      
            />
            <TWProjectCard
              title="100DaysOfCode"
              description="Twitter bot for #100DaysOfCode community hosted by freeCodeCamp. Written in Node.js and currently hosted on a private repository."
              href="https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot"
              icon={<SiGithub/>}
            />
            <TWProjectCard
              title="gatsby-bulma-quickstart"
              description="A quick Way to bootstrap a Gatsby project with Bulma CSS. Supports responsive design, Google Analytics integration and few more."
              href="https://github.com/amandeepmittal/gatsby-bulma-quickstart"
              icon={<SiGithub/>}
            />  
          <TWHeading size="h3">Speaking</TWHeading>
          <TWProjectCard
              title="How to write consistently?"
              description="At Hashnode's Technical Writing Bootcamp, a free virtual Bootcamp to help beginner technical writers to improve their writing skill."
              href="https://hashnode.com/bootcamp/batch-2"
              icon={<SiHashnode />}
            />
            <TWHeading size="h3">Guest Podcast Appearance & Interviews
</TWHeading>
            <TWProjectCard
              title="React Round Up 006"
              description="Setting Up and Getting Used to Gatsby with Charles Max Wood, Cory House, Tara Manicsic and Kent C Dodds"
              href="https://dev.to/reactroundup/rru-006-setting-up-and-getting-used-to-gatsby-with-aman-mittal"
              icon={<SiApplepodcasts />}
            />
            <TWProjectCard
              title="Dev Bites"
              description=" Development Trends on the Horizon with Hoss on remote work and serverless - hosted by Hoss.com"
              href="https://www.hoss.com/blog/dev-bites-development-trends-on-the-horizon-aman-mittal"
              icon={<TiPencil />}
            />
            <TWHeading size="h3">Currently Using</TWHeading>
            <ul className="text-lg text-gray-900 list-disc">
              <li>Computer: MacBook Air 2017</li>
              <li>Editor: Visual Studio Code</li>
              <li>Static Site Generator: Next.js</li>
              <li>Syntax Highlighting: Prismjs</li>
              <li>Code Syntax Theme: fairyFloss, Morgan.codes</li>
              <li>Terminal: iTerm with ZSH shell</li>
              <li>Manage Blog posts pipeline: Notion</li>
              <li>Newsletter: Substack (free)</li>
            </ul>
            <TWHeading size="h3">Countries I've Visited (8)</TWHeading>
            <p className="text-lg text-gray-900 my-4">I love to travel: 🇦🇪 🇵🇱 🇨🇿 🇦🇹 🇸🇰 🇩🇪 🇧🇪 🇳🇱</p>
            <TWHeading size="h3">Questions?</TWHeading>
            <p className="text-lg text-gray-900 my-4">
              If you have any questions or if you are looking forward to
              collaborate and would like to know more, drop me an email at{' '}
              <TWCustomLink  className="underline text-purple-600 hover:no-underline" to={BlogConfig.mailAddress}>
                amanmittal.work@gmail.com
              </TWCustomLink>
              </p>
        </div>        
      </TWContainer>
    </>
  );
};

export default Index;
