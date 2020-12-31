import React, { useMemo } from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import { TiPencil } from 'react-icons/ti';
import { SiGithub, SiExpo, SiApplepodcasts, SiHashnode } from 'react-icons/si';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Container from '../components/Container';
import Hero from '../components/Hero';
import { BlogConfig } from '../../blog-config';
import Heading from '../components/Heading';
import ProjectCard from '../components/ProjectCard';
import { getSimplifiedPosts } from '../utils/helpers';
import Posts from '../components/Posts';

const IndexPage = ({ data, ...props }) => {
  const posts = data.allMarkdownRemark.edges;
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts]);

  return (
    <Layout>
      <Helmet
        title={BlogConfig.username}
        links={[
          {
            rel: 'canonical',
            href: BlogConfig.siteUrl
          }
        ]}
      />
      <SEO />
      <Container as='main' noMargin className='md:px-4 space-y-14'>
        <Hero />
        {/* Stack of Most Popular Blog posts/Latest Blog Posts will go here*/}
        <div className='flex flex-col max-w-screen-lg mx-8 items-center justify-center'>
          <div className='flex flex-row space-around'>
            <Heading size='h3' className='px-2'>
              Recently Published
            </Heading>
            <p className='text-base mt-14 mb-6 items-center justify-center px-2'>
              <Link
                className='text-gray-700 p-2 rounded-lg	bg-purple-200 hover:no-underline hover:text-purple-600'
                to='/blog'
              >
                View All
              </Link>
            </p>
          </div>
          <Posts data={simplifiedPosts} />
          <Heading size='h3'>Projects</Heading>
          <ProjectCard
            title='Quarantine Pro'
            description="Built using React Native and Expo, about how long you have been quarantining. As a user, you input the date when you started isolating and the app is going to display a fun message to tell you how far you have come in the quarantine 'game'."
            href='https://expo.io/@amanhimself/quarantinepro'
            icon={<SiExpo />}
          />
          <ProjectCard
            title='expo-firebase-starter'
            description='Currently building and maintaining a quicker way to start with Expo + Firebase projects. Based on latest Expo SDK, provides. Part of expo-community.'
            href='https://github.com/expo-community/expo-firebase-starter'
            icon={<SiExpo />}
          />
          <ProjectCard
            title='100DaysOfCode'
            description='Twitter bot for #100DaysOfCode community hosted by freeCodeCamp. Written in Node.js and currently hosted on a private repository.'
            href='https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot'
            icon={<SiGithub />}
          />
          <ProjectCard
            title='gatsby-bulma-quickstart'
            description='A quick Way to bootstrap a Gatsby project with Bulma CSS. Supports responsive design, Google Analytics integration and few more.'
            href='https://github.com/amandeepmittal/gatsby-bulma-quickstart'
            icon={<SiGithub />}
          />
          <Heading size='h3'>Speaking</Heading>
          <ProjectCard
            title='How to write consistently?'
            description="At Hashnode's Technical Writing Bootcamp, a free virtual Bootcamp to help beginner technical writers to improve their writing skill."
            href='https://www.youtube.com/watch?v=YIRxTUCY0NQ'
            icon={<SiHashnode />}
          />
          <Heading size='h3'>Guest Podcast Appearances & Interviews</Heading>
          <ProjectCard
            title='React Round Up 006'
            description='Setting Up and Getting Used to Gatsby with Charles Max Wood, Cory House, Tara Manicsic and Kent C Dodds'
            href='https://dev.to/reactroundup/rru-006-setting-up-and-getting-used-to-gatsby-with-aman-mittal'
            icon={<SiApplepodcasts />}
          />
          <ProjectCard
            title='Dev Bites'
            description=' Development Trends on the Horizon with Hoss on remote work and serverless - hosted by Hoss.com'
            href='https://www.hoss.com/blog/dev-bites-development-trends-on-the-horizon-aman-mittal'
            icon={<TiPencil />}
          />
          <Heading size='h3'>Currently Using</Heading>
          <ul className='text-lg text-gray-900 list-disc'>
            <li>Computer: MacBook Air 2017</li>
            <li>Editor: Visual Studio Code</li>
            <li>Static Site Generator: Gatsbyjs</li>
            {/* <li>Syntax Highlighting: Prismjs</li> */}
            <li>Code Syntax Theme: fairyFloss, Morgan.codes</li>
            <li>Terminal: iTerm with ZSH shell</li>
            <li>Manage Blog posts pipeline: Notion</li>
            <li>Newsletter: Substack (free)</li>
          </ul>
          <Heading size='h3'>Countries I've Visited (8)</Heading>
          <p className='text-lg text-gray-900 my-4'>
            I love to travel: 🇦🇪 🇵🇱 🇨🇿 🇦🇹 🇸🇰 🇩🇪 🇧🇪 🇳🇱
          </p>
          <Heading size='h3'>Questions?</Heading>
          <p className='text-lg text-gray-900 my-4'>
            If you have any questions or if you are looking forward to
            collaborate and would like to know more, drop me an email at{' '}
            <Link
              className='underline text-purple-600 hover:no-underline'
              to={BlogConfig.mailAddress}
            >
              amanmittal.work@gmail.com
            </Link>
          </p>
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 10
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
            thumbnail {
              childImageSharp {
                fixed(width: 48, height: 48) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
