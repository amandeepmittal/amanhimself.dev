import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import PostListing from '../components/PostListing';
import config from '../data/site-config';
import SEO from '../components/seo';
import Intro from '../components/intro';
import { ListLink, Text } from '../styles/GlobalStyles';

const IndexPage = props => {
  const { data } = props;
  const latestPostEdges = data.latest.edges;
  const popularPostEdges = data.popular.edges;
  return (
    <Layout>
      <Helmet title={`${config.siteTitle} - Developer`} />
      <SEO />
      <div className='container'>
        {/* All Home Page components go here 👇 */}
        <Intro />
        <div className='container front-page'>
          <section className='section'>
            <h2 style={{ color: '#444' }}>
              Latest Posts
              <Link to='/tutorials' className='view-all'>
                View all
              </Link>
              <Link to='/testimonials' className='view-all'>
                Testimonials
              </Link>
            </h2>
            <PostListing simple postEdges={latestPostEdges} />
            {/* <PostListing simple postEdges={popularPostEdges} /> */}
            <section className='section'>
              <h2 style={{ color: '#444' }}>
                Most Read
                <Link to='/categories/popular' className='view-all'>
                  View all
                </Link>
              </h2>
              <PostListing simple postEdges={popularPostEdges} />
            </section>
          </section>
        </div>
        <h2 style={{ color: '#444' }}>My Newsletter</h2>
        <Text>
          At least twice a month, I roll out a newsletter for fellow developers
          to enhance their skills on Nodejs, Reactjs, React Native, and
          Firebase. I publish new posts every week and and you can stay up to
          date by joining <strong>1000+ developers</strong>.{' '}
          <ListLink
            href='https://tinyletter.com/amanhimself'
            target='_blank'
            rel='noopener noreferrer'
          >
            {`Join here`}
          </ListLink>
        </Text>
        <h2 style={{ color: '#444' }}>{`Currently Using`}</h2>
        <ul style={{ color: '#718096' }}>
          <li>Computer: MacBook Air 2017</li>
          <li>Editor: Visual Studio Code</li>
          <li>
            Static Site Generator:{' '}
            <ListLink
              href='http://gatsbyjs.org/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`Gatsbyjs`}
            </ListLink>
          </li>
          <li>
            Hosting:{' '}
            <ListLink
              href='https://www.netlify.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`Netlify`}
            </ListLink>
          </li>
          <li>
            Syntax Highlighting:{' '}
            <ListLink
              href='http://prismjs.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`Prismjs`}
            </ListLink>
          </li>
          <li>
            Code Syntax Theme:{' '}
            <ListLink
              href='https://draculatheme.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`Dracula Pro`}
            </ListLink>
          </li>
          <li>
            Terminal:{' '}
            <ListLink
              href='https://www.iterm2.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`iTerm with ZSH shell`}
            </ListLink>
          </li>
          <li>
            Manage Blog posts pipeline:{' '}
            <ListLink
              href='https://www.notion.so/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`Notion`}
            </ListLink>
          </li>
          <li>
            Newsletter:{' '}
            <ListLink
              href='https://tinyletter.com/amanhimself'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`Tinyletter`}
            </ListLink>
          </li>
        </ul>
        <h2
          style={{ color: '#444' }}
        >{`Guest Podcast Appearance & Interviews`}</h2>
        <ul>
          <li>
            <ListLink
              href='https://tinyletter.com/amanhimself'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`React Round Up 006: Setting Up and Getting Used to Gatsby with Charles Max Wood, Cory House, Tara Manicsic and Kent C Dodds`}
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://dev.to/catalinmpit/my-patchy-journey-to-software-development-with-aman-mittal-1l1f'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`My Patchy Journey To Software Development with Catalin Pit`}
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://suprstory.com/how-passion-to-write-combined-with-love-for-technology-lead-this-dev-to-gain-mastery-at-tech-blogging/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`How passion to write combined with love for technology lead this dev to gain mastery at tech blogging.`}
            </ListLink>
          </li>
          <li>
            <ListLink
              href='https://www.hoss.com/blog/dev-bites-development-trends-on-the-horizon-aman-mittal/'
              target='_blank'
              rel='noopener noreferrer'
            >
              {`Dev Bites: Development Trends on the Horizon with Hoss`}
            </ListLink>
          </li>
        </ul>
        <h2 style={{ color: '#444' }}>{`Countries I've visited (8)`}</h2>
        <Text>I love to travel.</Text>
        <p style={{ fontSize: 24 }}>{`🇦🇪🇵🇱🇨🇿🇦🇹🇸🇰🇩🇪🇧🇪🇳🇱`}</p>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 10
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 9
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`;
