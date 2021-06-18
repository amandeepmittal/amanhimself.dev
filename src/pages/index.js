import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import { Layout, Hero, SEO, PostInfo, InfoCard } from '../components';
import { config } from '../helpers';

const CenterEverything = styled.div`
  text-align: center;
`;

const IndexPage = ({ data }) => {
  const posts = data.posts.nodes;
  return (
    <Layout>
      <Helmet title={`Home | ${config.username}`} />
      <SEO />
      <Hero />
      <div>
        <CenterEverything>
          <h2>
            <span role="img" aria-label="sparkle emoji">
              ✨{' '}
            </span>
            If you want to read latest posts, you should read one of the
            following:
          </h2>
          {posts.map(post => {
            return <PostInfo post={post} />;
          })}
        </CenterEverything>
        <CenterEverything>
          <h2>
            <span role="img" aria-label="compass emoji">
              🧭{' '}
            </span>
            Some of the open source projects I've worked on:
          </h2>
          <InfoCard
            title="Quarantine Pro app"
            description="Built using React Native and Expo, it's a small game that displays a func message on how long you have been quarantining."
            href="https://expo.io/@amanhimself/quarantinepro"
            expoIcon
            reactIcon
          />
          <InfoCard
            title="Expo Firebase Starter"
            description="A quicker way to start with Expo + Firebase JS projects. Based on latest Expo SDK, provides. Part of expo-community."
            href="https://github.com/expo-community/expo-firebase-starter"
            expoIcon
            firebaseIcon
          />
          <InfoCard
            title="100DaysOfCode Twitter Bot"
            description="Twitter bot for #100DaysOfCode community hosted by freeCodeCamp. Written in Node.js and currently hosted on a private repository."
            href="https://github.com/freeCodeCamp/100DaysOfCode-twitter-bot"
            githubIcon
          />
        </CenterEverything>
        <CenterEverything>
          <h2>
            <span role="img" aria-label="speech bubble emoji">
              💬{' '}
            </span>
            Speaking:
          </h2>
          <InfoCard
            title="How to write consistently?"
            description="At Hashnode's Technical Writing Bootcamp, a free virtual Bootcamp to help beginner technical writers to improve their writing skill."
            href="https://www.youtube.com/watch?v=YIRxTUCY0NQ"
            youtubeIcon
          />
          <InfoCard
            title="React Native Panel"
            description="React Native Panel Discussion member at React Day Bangalore 2021 with Evan Bacon, Satyajit Sahoo & Sanket Sahu."
            href="https://www.youtube.com/watch?v=_HKzhe8f47Y"
            youtubeIcon
          />
          <InfoCard
            title="The Rise of No-Code and a Guide to Using Draftbit"
            href="https://www.youtube.com/watch?v=sSbAuEcjjJA"
            youtubeIcon
          />
        </CenterEverything>
        <CenterEverything>
          <h2>
            <span role="img" aria-label="headphone emoji">
              🎧{' '}
            </span>
            Guest Podcast Appearances & Interviews:
          </h2>
          <InfoCard
            title="React Round Up 006"
            description="Setting Up and Getting Used to Gatsby with Charles Max Wood, Cory House, Tara Manicsic and Kent C Dodds."
            href="https://dev.to/reactroundup/rru-006-setting-up-and-getting-used-to-gatsby-with-aman-mittal"
            podcastIcon
          />
          <InfoCard
            title="Dev Bites"
            description=" Development Trends on the Horizon with Hoss on remote work and serverless - hosted by Hoss.com"
            href="https://www.hoss.com/blog/dev-bites-development-trends-on-the-horizon-aman-mittal"
          />
        </CenterEverything>
        <CenterEverything>
          <h2>
            <span role="img" aria-label="laptop emoji">
              💻{' '}
            </span>
            Uses:
          </h2>
          <div>
            <ul style={{ listStyleType: 'none', fontSize: '1.2rem' }}>
              <li>Computer: MacBook Pro 2020</li>
              <li>Editor: Visual Studio Code</li>
              <li>Static Site Generator: Gatsbyjs</li>
              {/* <li>Syntax Highlighting: Prismjs</li> */}
              <li>Code Syntax Theme: fairyFloss, Morgan.codes</li>
              <li>Terminal: iTerm with ZSH shell</li>
              <li>Manage Blog posts pipeline: Notion</li>
              <li>Newsletter: Substack (free)</li>
            </ul>
          </div>
        </CenterEverything>

        <CenterEverything>
          <h2>
            <span role="img" aria-label="aeroplane emoji">
              ✈️{' '}
            </span>
            Countries I've Visited (8):
          </h2>
          <span
            role="img"
            aria-label="flag emojis"
            style={{ fontSize: '1.2rem' }}
          >
            I love to travel: 🇦🇪 🇵🇱 🇨🇿 🇦🇹 🇸🇰 🇩🇪 🇧🇪 🇳🇱
          </span>
        </CenterEverything>
      </div>
    </Layout>
  );
};

export const blogPageQuery = graphql`
  {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/posts/" } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      nodes {
        id
        timeToRead
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
          tags
          thumbnail {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 40, height: 40)
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
